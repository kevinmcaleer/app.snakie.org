import{r as c,j as r}from"./index-CvCsyvs3.js";import{s as E}from"./index-X248pqVA.js";import{RobotView as M}from"./RobotView-DrAXpZ2P.js";import{S as A}from"./SyncControl-Sy4xwafa.js";import{ct as T,cu as W,cv as I,_ as V}from"./project-parts-Bc8zVjf0.js";import{c as H,u as Z,f as $}from"./InstrumentHost-DXXdXIN2.js";import{r as q}from"./krf-CfQeBPr9.js";import"./monaco-BlnWn4Xm.js";import"./virtual-device-BM1Jb5mt.js";import"./env-DVOiy7K9.js";import"./unsaved-work-CLeIhPj9.js";import"./Terminal-DyB-PEHn.js";import"./control-Bc-EUMc5.js";import"./DeviceQueueDialog-BBxm226d.js";import"./robot-mesh-load-vsIA4m3m.js";import"./use-history-CFFSqwbw.js";import"./SwatchPicker-CdNZEwld.js";import"./gifenc.esm-CnQ3XFIa.js";const j=`<?xml version="1.0"?>
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
`;function fo({embedded:h=!1,full:d=!1,onPopOut:w}){const{currentFolder:i,openFile:f,openBuffer:_,openFolderPath:z}=H(),{setFocus:C}=Z(),[b,y]=c.useState(null),[F,k]=c.useState(""),[a,x]=c.useState(null),[N,O]=c.useState(0),[R,S]=c.useState(0),s=o=>E(o,{priority:4,clearAfterMs:4e3});c.useEffect(()=>{let o=!0;return(async()=>{try{const n=await window.api.robot.load(i??void 0),e=q(n)?.urdf;if(e&&i){const t=`${i.replace(/[/\\]$/,"")}/${e.replace(/^[/\\]/,"")}`,l=await window.api.fs.readFile(t);if(o&&l.trim()){y(l),k(T(t)),x(t);return}}}catch{}o&&(y(j),k(""),x(null))})(),()=>{o=!1}},[i,N,R]),c.useEffect(()=>window.api.robot.onUrdfChanged(()=>S(o=>o+1)),[]);const P=()=>{a?f("local",a):_("demo-arm.urdf",b??j),C(!0)},p=o=>o.replace(/[/\\]+$/,"").split(/[/\\]/).pop()??o,m=o=>o.replace(/\\/g,"/").replace(/\/$/,"").replace(/^([a-zA-Z]):/,(n,e)=>`${e.toLowerCase()}:`),L=(o,n)=>{const e=m(o),t=m(n);return e!==t&&e.startsWith(t+"/")?e.slice(t.length+1):null},v=async(o,n)=>{if(!V(n))throw new Error(`"${p(n)}" isn't a .urdf — it can't be the robot`);const e=await window.api.robot.load(o);e.robot={...e.robot??{},version:1,urdf:n},await window.api.robot.save(o,e),$("local",`${o}/robot.yml`,""),O(t=>t+1)},U=async()=>{const o=await window.api.fs.openFileDialog({filters:[{name:"Robot model",extensions:["urdf","xacro"]},{name:"All files",extensions:["*"]}]});if(!o)return;const n=p(o),e=i?i.replace(/[/\\]$/,""):null;let t=e?L(o,e):null;if(!t&&e&&!/[/\\]/.test(o))try{await window.api.fs.readFile(`${e}/${o}`),t=o}catch{t=null}const l=e&&t?m(`${e}/${t}`):null;if(!!a&&l!=null&&l===m(a))s(`"${n}" is already this project's robot`);else if(e&&t)if(!a||window.confirm(`Link "${n}" as this project's robot?

This replaces the current robot (${p(a)}). The old file stays on disk.`))try{await v(e,t),s(`Linked "${n}" — now this project's robot`)}catch(g){s(`Opened "${n}" — ${g instanceof Error?g.message:"couldn't link it"}`)}else s(`Opened "${n}" (not linked)`);else s(`Opened "${n}" — it's outside the project, so it wasn't linked`);await f("local",o)},B=async()=>{if(a&&!window.confirm(`This project already has a robot linked (${p(a)}).

Create a new blank robot and make it the project robot instead? The current robot file stays on disk — reopen it any time with "Open…".`))return;let o=i;if(!o){if(o=await window.api.fs.openFolderDialog(),!o)return;z(o)}const n=o.replace(/[/\\]$/,"");let e="robot.urdf";for(let u=2;u<1e3;u++)try{await window.api.fs.readFile(`${n}/${e}`),e=`robot-${u}.urdf`}catch{break}const t=`${n}/${e}`,l=I("my_robot");try{await window.api.fs.writeFile(t,l),$("local",t,l);try{await v(n,e),s(`Created "${e}" — now this project's robot`)}catch{s(`Created "${e}" (couldn't link it to the project)`)}await f("local",t)}catch{s("Couldn’t create the new robot file")}},D=a!==null;return r.jsxs("div",{className:`robotdock${d?" robotdock--full":""}`,children:[b===null?r.jsx("div",{className:"robotdock__loading",children:"Loading 3D…"}):r.jsx(M,{urdfContent:b,urdfPath:a,basePath:F,compact:!d,homeOnMount:d}),d&&r.jsx("div",{className:"esync__float esync__float--right",children:r.jsx(A,{folder:i})}),h&&w&&r.jsx("button",{type:"button",className:"robotdock__popout",title:"Open the Build workspace","aria-label":"Open the Build workspace",onClick:w,children:r.jsx("svg",{width:"13",height:"13",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:r.jsx("path",{d:"M14 4h6v6M20 4l-8 8M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),!h&&!d&&r.jsxs("div",{className:"robotdock__actions",children:[r.jsx("button",{type:"button",className:`robotdock__btn${D?"":" robotdock__btn--cta"}`,title:"Create a new blank robot (.urdf) and open it in the pose tool",onClick:()=>void B(),children:"＋ New robot"}),r.jsxs("button",{type:"button",className:"robotdock__btn",title:"Open an existing robot (.urdf) full-screen",onClick:()=>void U(),children:[r.jsx(W,{size:13})," Open…"]}),r.jsx("button",{type:"button",className:"robotdock__btn",title:"Pop out full-screen (pose tool + assembly)",onClick:P,children:"⤢ Pop out"})]})]})}export{fo as RobotDockPanel,fo as default};
