import{r as i,j as r}from"./index-bYzTyJ2x.js";import{RobotView as D}from"./RobotView-U7G5r6TQ.js";import{S as M}from"./SyncControl-BLX1LAqh.js";import{cn as W,co as A,cp as I,U as V}from"./project-parts-MeQJqouK.js";import{c as H,u as Z,f as j}from"./InstrumentHost-Be3d0wuA.js";import{r as q}from"./krf-CfQeBPr9.js";import"./robot-mesh-load-Dj-lLQXc.js";import"./index-qsYtxawP.js";import"./monaco-BlnWn4Xm.js";import"./virtual-device-BM1Jb5mt.js";import"./env-DVOiy7K9.js";import"./robot-yaml-CGi6cbE9.js";import"./Terminal-DBQOAZ8Q.js";import"./control-Bc-EUMc5.js";import"./DeviceQueueDialog-CMKeGBLS.js";import"./use-history-Dz6KKi55.js";import"./SwatchPicker-BVrJk7fg.js";import"./gifenc.esm-CnQ3XFIa.js";const _=`<?xml version="1.0"?>
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
`;function ue({embedded:h=!1,full:d=!1,onPopOut:y}){const{currentFolder:s,openFile:b,openBuffer:C,openFolderPath:z}=H(),{setFocus:F}=Z(),[w,k]=i.useState(null),[N,x]=i.useState(""),[a,v]=i.useState(null),[R,O]=i.useState(0),[E,S]=i.useState(0),p=i.useRef(null),l=e=>{window.dispatchEvent(new CustomEvent("snakie:status",{detail:{text:e,priority:4}})),p.current&&clearTimeout(p.current),p.current=setTimeout(()=>window.dispatchEvent(new CustomEvent("snakie:status",{detail:{text:""}})),4e3)};i.useEffect(()=>()=>{p.current!=null&&clearTimeout(p.current)},[]),i.useEffect(()=>{let e=!0;return(async()=>{try{const n=await window.api.robot.load(s??void 0),t=q(n)?.urdf;if(t&&s){const o=`${s.replace(/[/\\]$/,"")}/${t.replace(/^[/\\]/,"")}`,c=await window.api.fs.readFile(o);if(e&&c.trim()){k(c),x(W(o)),v(o);return}}}catch{}e&&(k(_),x(""),v(null))})(),()=>{e=!1}},[s,R,E]),i.useEffect(()=>window.api.robot.onUrdfChanged(()=>S(e=>e+1)),[]);const P=()=>{a?b("local",a):C("demo-arm.urdf",w??_),F(!0)},m=e=>e.replace(/[/\\]+$/,"").split(/[/\\]/).pop()??e,u=e=>e.replace(/\\/g,"/").replace(/\/$/,"").replace(/^([a-zA-Z]):/,(n,t)=>`${t.toLowerCase()}:`),T=(e,n)=>{const t=u(e),o=u(n);return t!==o&&t.startsWith(o+"/")?t.slice(o.length+1):null},g=async(e,n)=>{if(!V(n))throw new Error(`"${m(n)}" isn't a .urdf — it can't be the robot`);const t=await window.api.robot.load(e);t.robot={...t.robot??{},version:1,urdf:n},await window.api.robot.save(e,t),j("local",`${e}/robot.yml`,""),O(o=>o+1)},U=async()=>{const e=await window.api.fs.openFileDialog({filters:[{name:"Robot model",extensions:["urdf","xacro"]},{name:"All files",extensions:["*"]}]});if(!e)return;const n=m(e),t=s?s.replace(/[/\\]$/,""):null;let o=t?T(e,t):null;if(!o&&t&&!/[/\\]/.test(e))try{await window.api.fs.readFile(`${t}/${e}`),o=e}catch{o=null}const c=t&&o?u(`${t}/${o}`):null;if(!!a&&c!=null&&c===u(a))l(`"${n}" is already this project's robot`);else if(t&&o)if(!a||window.confirm(`Link "${n}" as this project's robot?

This replaces the current robot (${m(a)}). The old file stays on disk.`))try{await g(t,o),l(`Linked "${n}" — now this project's robot`)}catch($){l(`Opened "${n}" — ${$ instanceof Error?$.message:"couldn't link it"}`)}else l(`Opened "${n}" (not linked)`);else l(`Opened "${n}" — it's outside the project, so it wasn't linked`);await b("local",e)},L=async()=>{if(a&&!window.confirm(`This project already has a robot linked (${m(a)}).

Create a new blank robot and make it the project robot instead? The current robot file stays on disk — reopen it any time with "Open…".`))return;let e=s;if(!e){if(e=await window.api.fs.openFolderDialog(),!e)return;z(e)}const n=e.replace(/[/\\]$/,"");let t="robot.urdf";for(let f=2;f<1e3;f++)try{await window.api.fs.readFile(`${n}/${t}`),t=`robot-${f}.urdf`}catch{break}const o=`${n}/${t}`,c=I("my_robot");try{await window.api.fs.writeFile(o,c),j("local",o,c);try{await g(n,t),l(`Created "${t}" — now this project's robot`)}catch{l(`Created "${t}" (couldn't link it to the project)`)}await b("local",o)}catch{l("Couldn’t create the new robot file")}},B=a!==null;return r.jsxs("div",{className:`robotdock${d?" robotdock--full":""}`,children:[w===null?r.jsx("div",{className:"robotdock__loading",children:"Loading 3D…"}):r.jsx(D,{urdfContent:w,urdfPath:a,basePath:N,compact:!d,homeOnMount:d}),d&&r.jsx("div",{className:"esync__float esync__float--right",children:r.jsx(M,{folder:s})}),h&&y&&r.jsx("button",{type:"button",className:"robotdock__popout",title:"Open the Build workspace","aria-label":"Open the Build workspace",onClick:y,children:r.jsx("svg",{width:"13",height:"13",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:r.jsx("path",{d:"M14 4h6v6M20 4l-8 8M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),!h&&!d&&r.jsxs("div",{className:"robotdock__actions",children:[r.jsx("button",{type:"button",className:`robotdock__btn${B?"":" robotdock__btn--cta"}`,title:"Create a new blank robot (.urdf) and open it in the pose tool",onClick:()=>void L(),children:"＋ New robot"}),r.jsxs("button",{type:"button",className:"robotdock__btn",title:"Open an existing robot (.urdf) full-screen",onClick:()=>void U(),children:[r.jsx(A,{size:13})," Open…"]}),r.jsx("button",{type:"button",className:"robotdock__btn",title:"Pop out full-screen (pose tool + assembly)",onClick:P,children:"⤢ Pop out"})]})]})}export{ue as RobotDockPanel,ue as default};
