import{r as c,j as r}from"./index-Dpp4zuto.js";import{s as E}from"./index-BwvkZhsk.js";import{RobotView as M}from"./RobotView-CbAHIS-G.js";import{S as A}from"./SyncControl-Cm-RAWHm.js";import{b$ as T}from"./report-error-B9Ynzihk.js";import{ap as W,aq as I,G as V}from"./project-parts-3M0bt5mz.js";import{u as q,a as G,g as $}from"./workspace-BAklWWGe.js";import{r as H}from"./krf-BZ57fwaY.js";import"./monaco-CBcHKraa.js";import"./InstrumentHost-BWgoQcTv.js";import"./useDeviceStatus-Dt2xnchG.js";import"./instrument-telemetry-QRN8lURR.js";import"./control-Bc-EUMc5.js";import"./display-logic-BJoZ5AnH.js";import"./device-scratch-CsrS-Vrj.js";import"./virtual-device-BM1Jb5mt.js";import"./module-source-B-5EzF_4.js";import"./languages-BFzLDOdv.js";import"./use-blocks-language-C33fkqOH.js";import"./source-BHWcE_6w.js";import"./env-C5AMQ8CH.js";import"./dialect-nMkjRQZ0.js";import"./useHelpDialect-CaCdK6XX.js";import"./refactor-bus-BXNyULQw.js";import"./Terminal-GiJ82s_R.js";import"./public-api-DVJgXUrF.js";import"./unsaved-work-BaxMQwCY.js";import"./DeviceQueueDialog-CtZBE7Xp.js";/* empty css            */import"./robot-mesh-load-C4YQqogK.js";import"./use-history-7sALsxVm.js";import"./SwatchPicker-BeeFYKfV.js";import"./gifenc.esm-CnQ3XFIa.js";const j=`<?xml version="1.0"?>
<!-- Snakie demo arm (#311): a 3-DOF arm from URDF primitives — no external
     meshes, so it renders zero-setup in the Robot View. -->
<robot name="demo_arm">
  <link name="base">
    <visual>
      <geometry><cylinder radius="0.09" length="0.05"/></geometry>
      <material name="base_mat"><color rgba="0.30 0.34 0.40 1"/></material>
    </visual>
  </link>

  <joint name="shoulder" type="revolute">
    <parent link="base"/>
    <child link="upper_arm"/>
    <origin xyz="0 0 0.05" rpy="0 0 0"/>
    <axis xyz="0 0 1"/>
    <limit lower="-1.5708" upper="1.5708" effort="1" velocity="1"/>
  </joint>

  <link name="upper_arm">
    <visual>
      <origin xyz="0 0 0.16" rpy="0 0 0"/>
      <geometry><box size="0.055 0.055 0.30"/></geometry>
      <material name="arm_mat"><color rgba="0.90 0.62 0.22 1"/></material>
    </visual>
  </link>

  <joint name="elbow" type="revolute">
    <parent link="upper_arm"/>
    <child link="forearm"/>
    <origin xyz="0 0 0.31" rpy="0 0 0"/>
    <axis xyz="1 0 0"/>
    <limit lower="-2.2" upper="2.2" effort="1" velocity="1"/>
  </joint>

  <link name="forearm">
    <visual>
      <origin xyz="0 0 0.13" rpy="0 0 0"/>
      <geometry><box size="0.045 0.045 0.26"/></geometry>
      <material name="fore_mat"><color rgba="0.24 0.60 0.90 1"/></material>
    </visual>
  </link>

  <joint name="wrist" type="revolute">
    <parent link="forearm"/>
    <child link="gripper"/>
    <origin xyz="0 0 0.26" rpy="0 0 0"/>
    <axis xyz="1 0 0"/>
    <limit lower="-1.5708" upper="1.5708" effort="1" velocity="1"/>
  </joint>

  <link name="gripper">
    <visual>
      <origin xyz="0 0 0.03" rpy="0 0 0"/>
      <geometry><box size="0.09 0.025 0.06"/></geometry>
      <material name="grip_mat"><color rgba="0.85 0.86 0.90 1"/></material>
    </visual>
  </link>
</robot>
`;function No({embedded:h=!1,full:p=!1,onPopOut:w}){const{currentFolder:a,openFile:f,openBuffer:_,openFolderPath:z}=q(),{setFocus:C}=G(),[b,y]=c.useState(null),[F,k]=c.useState(""),[i,x]=c.useState(null),[N,O]=c.useState(0),[R,S]=c.useState(0),s=o=>E(o,{priority:4,clearAfterMs:4e3});c.useEffect(()=>{let o=!0;return(async()=>{try{const n=await window.api.robot.load(a??void 0),t=H(n)?.urdf;if(t&&a){const e=`${a.replace(/[/\\]$/,"")}/${t.replace(/^[/\\]/,"")}`,l=await window.api.fs.readFile(e);if(o&&l.trim()){y(l),k(T(e)),x(e);return}}}catch{}o&&(y(j),k(""),x(null))})(),()=>{o=!1}},[a,N,R]),c.useEffect(()=>window.api.robot.onUrdfChanged(()=>S(o=>o+1)),[]);const P=()=>{i?f("local",i):_("demo-arm.urdf",b??j),C(!0)},d=o=>o.replace(/[/\\]+$/,"").split(/[/\\]/).pop()??o,m=o=>o.replace(/\\/g,"/").replace(/\/$/,"").replace(/^([a-zA-Z]):/,(n,t)=>`${t.toLowerCase()}:`),L=(o,n)=>{const t=m(o),e=m(n);return t!==e&&t.startsWith(e+"/")?t.slice(e.length+1):null},g=async(o,n)=>{if(!V(n))throw new Error(`"${d(n)}" isn't a .urdf — it can't be the robot`);const t=await window.api.robot.load(o);t.robot={...t.robot??{},version:1,urdf:n},await window.api.robot.save(o,t),$("local",`${o}/robot.yml`,""),O(e=>e+1)},U=async()=>{const o=await window.api.fs.openFileDialog({filters:[{name:"Robot model",extensions:["urdf","xacro"]},{name:"All files",extensions:["*"]}]});if(!o)return;const n=d(o),t=a?a.replace(/[/\\]$/,""):null;let e=t?L(o,t):null;if(!e&&t&&!/[/\\]/.test(o))try{await window.api.fs.readFile(`${t}/${o}`),e=o}catch{e=null}const l=t&&e?m(`${t}/${e}`):null;if(!!i&&l!=null&&l===m(i))s(`"${n}" is already this project's robot`);else if(t&&e)if(!i||window.confirm(`Link "${n}" as this project's robot?

This replaces the current robot (${d(i)}). The old file stays on disk.`))try{await g(t,e),s(`Linked "${n}" — now this project's robot`)}catch(v){s(`Opened "${n}" — ${v instanceof Error?v.message:"couldn't link it"}`)}else s(`Opened "${n}" (not linked)`);else s(`Opened "${n}" — it's outside the project, so it wasn't linked`);await f("local",o)},B=async()=>{if(i&&!window.confirm(`This project already has a robot linked (${d(i)}).

Create a new blank robot and make it the project robot instead? The current robot file stays on disk — reopen it any time with "Open…".`))return;let o=a;if(!o){if(o=await window.api.fs.openFolderDialog(),!o)return;z(o)}const n=o.replace(/[/\\]$/,"");let t="robot.urdf";for(let u=2;u<1e3;u++)try{await window.api.fs.readFile(`${n}/${t}`),t=`robot-${u}.urdf`}catch{break}const e=`${n}/${t}`,l=I("my_robot");try{await window.api.fs.writeFile(e,l),$("local",e,l);try{await g(n,t),s(`Created "${t}" — now this project's robot`)}catch{s(`Created "${t}" (couldn't link it to the project)`)}await f("local",e)}catch{s("Couldn’t create the new robot file")}},D=i!==null;return r.jsxs("div",{className:`robotdock${p?" robotdock--full":""}`,children:[b===null?r.jsx("div",{className:"robotdock__loading",children:"Loading 3D…"}):r.jsx(M,{urdfContent:b,urdfPath:i,basePath:F,compact:!p,homeOnMount:p}),p&&r.jsx("div",{className:"esync__float esync__float--right",children:r.jsx(A,{folder:a})}),h&&w&&r.jsx("button",{type:"button",className:"robotdock__popout",title:"Open the Build workspace","aria-label":"Open the Build workspace",onClick:w,children:r.jsx("svg",{width:"13",height:"13",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:r.jsx("path",{d:"M14 4h6v6M20 4l-8 8M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),!h&&!p&&r.jsxs("div",{className:"robotdock__actions",children:[r.jsx("button",{type:"button",className:`robotdock__btn${D?"":" robotdock__btn--cta"}`,title:"Create a new blank robot (.urdf) and open it in the pose tool",onClick:()=>void B(),children:"＋ New robot"}),r.jsxs("button",{type:"button",className:"robotdock__btn",title:"Open an existing robot (.urdf) full-screen",onClick:()=>void U(),children:[r.jsx(W,{size:13})," Open…"]}),r.jsx("button",{type:"button",className:"robotdock__btn",title:"Pop out full-screen (pose tool + assembly)",onClick:P,children:"⤢ Pop out"})]})]})}export{No as RobotDockPanel,No as default};
