import{r as c,a as S,j as r,bZ as B}from"./index-urgtWgyv.js";import{RobotView as D}from"./RobotView-CZ6YaiQ4.js";import{e as M,c as U}from"./robot-assembly-BpkiiyfL.js";import{u as W,b as A,c as j}from"./index-CHln4n61.js";import"./robot-yaml-COsFVOjx.js";import"./monaco-BlnWn4Xm.js";const $=`<?xml version="1.0"?>
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
`;function K({embedded:h=!1,full:p=!1,onPopOut:y}){const{currentFolder:l,openFile:b,openBuffer:_,openFolderPath:z}=W(),{setFocus:C}=A(),[f,k]=c.useState(null),[F,x]=c.useState(""),[a,v]=c.useState(null),[R,O]=c.useState(0),d=c.useRef(null),i=e=>{window.dispatchEvent(new CustomEvent("snakie:status",{detail:{text:e,priority:4}})),d.current&&clearTimeout(d.current),d.current=setTimeout(()=>window.dispatchEvent(new CustomEvent("snakie:status",{detail:{text:""}})),4e3)};c.useEffect(()=>()=>{d.current!=null&&clearTimeout(d.current)},[]),c.useEffect(()=>{let e=!0;return(async()=>{try{const n=await window.api.robot.load(l??void 0),t=S(n)?.urdf;if(t&&l){const o=`${l.replace(/[/\\]$/,"")}/${t.replace(/^[/\\]/,"")}`,s=await window.api.fs.readFile(o);if(e&&s.trim()){k(s),x(M(o)),v(o);return}}}catch{}e&&(k($),x(""),v(null))})(),()=>{e=!1}},[l,R]);const N=()=>{a?b("local",a):_("demo-arm.urdf",f??$),C(!0)},w=e=>e.replace(/[/\\]+$/,"").split(/[/\\]/).pop()??e,u=e=>e.replace(/\\/g,"/").replace(/\/$/,"").replace(/^([a-zA-Z]):/,(n,t)=>`${t.toLowerCase()}:`),E=(e,n)=>{const t=u(e),o=u(n);return t!==o&&t.startsWith(o+"/")?t.slice(o.length+1):null},g=async(e,n)=>{const t=await window.api.robot.load(e);t.robot={...t.robot??{},version:1,urdf:n},await window.api.robot.save(e,t),j("local",`${e}/robot.yml`,""),O(o=>o+1)},T=async()=>{const e=await window.api.fs.openFileDialog({filters:[{name:"Robot model",extensions:["urdf","xacro"]},{name:"All files",extensions:["*"]}]});if(!e)return;const n=w(e),t=l?l.replace(/[/\\]$/,""):null;let o=t?E(e,t):null;if(!o&&t&&!/[/\\]/.test(e))try{await window.api.fs.readFile(`${t}/${e}`),o=e}catch{o=null}const s=t&&o?u(`${t}/${o}`):null;if(!!a&&s!=null&&s===u(a))i(`"${n}" is already this project's robot`);else if(t&&o)if(!a||window.confirm(`Link "${n}" as this project's robot?

This replaces the current robot (${w(a)}). The old file stays on disk.`))try{await g(t,o),i(`Linked "${n}" — now this project's robot`)}catch{i(`Opened "${n}" — couldn't link it to the project`)}else i(`Opened "${n}" (not linked)`);else i(`Opened "${n}" — it's outside the project, so it wasn't linked`);await b("local",e)},L=async()=>{if(a&&!window.confirm(`This project already has a robot linked (${w(a)}).

Create a new blank robot and make it the project robot instead? The current robot file stays on disk — reopen it any time with "Open…".`))return;let e=l;if(!e){if(e=await window.api.fs.openFolderDialog(),!e)return;z(e)}const n=e.replace(/[/\\]$/,"");let t="robot.urdf";for(let m=2;m<1e3;m++)try{await window.api.fs.readFile(`${n}/${t}`),t=`robot-${m}.urdf`}catch{break}const o=`${n}/${t}`,s=U("my_robot");try{await window.api.fs.writeFile(o,s),j("local",o,s);try{await g(n,t),i(`Created "${t}" — now this project's robot`)}catch{i(`Created "${t}" (couldn't link it to the project)`)}await b("local",o)}catch{i("Couldn’t create the new robot file")}},P=a!==null;return r.jsxs("div",{className:`robotdock${p?" robotdock--full":""}`,children:[f===null?r.jsx("div",{className:"robotdock__loading",children:"Loading 3D…"}):r.jsx(D,{urdfContent:f,basePath:F,compact:!p,homeOnMount:p}),h&&y&&r.jsx("button",{type:"button",className:"robotdock__popout",title:"Open the Build workspace","aria-label":"Open the Build workspace",onClick:y,children:r.jsx("svg",{width:"13",height:"13",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:r.jsx("path",{d:"M14 4h6v6M20 4l-8 8M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),!h&&!p&&r.jsxs("div",{className:"robotdock__actions",children:[r.jsx("button",{type:"button",className:`robotdock__btn${P?"":" robotdock__btn--cta"}`,title:"Create a new blank robot (.urdf) and open it in the pose tool",onClick:()=>void L(),children:"＋ New robot"}),r.jsxs("button",{type:"button",className:"robotdock__btn",title:"Open an existing robot (.urdf) full-screen",onClick:()=>void T(),children:[r.jsx(B,{size:13})," Open…"]}),r.jsx("button",{type:"button",className:"robotdock__btn",title:"Pop out full-screen (pose tool + assembly)",onClick:N,children:"⤢ Pop out"})]})]})}export{K as RobotDockPanel,K as default};
