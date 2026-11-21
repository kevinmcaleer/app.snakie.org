import{j as e,r as p}from"./index-DKJAfnHN.js";import{b as A,s as M}from"./index-D6uM9iJy.js";import{RobotView as T}from"./RobotView-DXqBCxV6.js";import{S as I}from"./SyncControl-B8scYxbQ.js";import{by as W}from"./report-error-lWMc1BPI.js";import{R as H,ar as R,as as V,I as Y}from"./project-parts-DLxxulA2.js";import{a as K,c as Z,u as q,f as N}from"./workspace-DmmWsUds.js";import{r as G}from"./krf-BZ57fwaY.js";import"./modulepreload-polyfill-B5Qt9EMX.js";import"./monaco-Czo5b4XJ.js";import"./InstrumentHost-C-WxlXii.js";import"./board-layout-O4L4IbgC.js";import"./useDeviceStatus-7caiIb1D.js";import"./instrument-telemetry-QRN8lURR.js";import"./control-Bc-EUMc5.js";import"./display-logic-DNFtcWHK.js";import"./simulation-DG1UjfSh.js";import"./device-scratch-Dp7y6mNu.js";import"./virtual-device-BM1Jb5mt.js";import"./python-definitions-B7K_6kjp.js";import"./DriverInstallBanner-DaBnLKvK.js";import"./languages-BFzLDOdv.js";import"./install-file-progress-BKZK-rcL.js";import"./use-blocks-language-BHmGwEMi.js";import"./settings-HGJvAtsJ.js";import"./useFocusTrap-B3mPvDr3.js";import"./blocks-doc-DfuIM-Rd.js";import"./env-C5AMQ8CH.js";import"./dialect-B0S6lKdg.js";import"./unsaved-work-BQ7cCpa0.js";import"./useHelpDialect-do11lsJO.js";import"./robot-yaml-fJVEe5fH.js";import"./public-api-CEHFuAV4.js";import"./refactor-bus-BXNyULQw.js";import"./Terminal-DeL-OLnS.js";import"./DeviceQueueDialog-C1vXS5Q1.js";import"./700-Bm3EpaQ3.js";import"./source-Dd5wf65M.js";/* empty css            *//* empty css             */import"./kevsrobots-account-Dt3uS5le.js";import"./ColladaLoader-D0iHDH7A.js";import"./URDFLoader-CmXLbT9d.js";import"./robot-mesh-load-DIJwAiyJ.js";import"./use-history-c3uiH0qf.js";import"./SwatchPicker-D3hYehNf.js";import"./gifenc.esm-CnQ3XFIa.js";const C=`<?xml version="1.0"?>
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
`,J="snakie.build.emptyState.collapsed";function Q({onNewRobot:m,onOpenRobot:s}){const[u,i]=K(J,!1),d=()=>{window.api?.openExternal?.(A()).catch(()=>{})};return u?e.jsxs("button",{type:"button",className:"buildempty__pill",onClick:()=>i(!1),title:"This project has no robot yet. Show the ways to start one",children:[e.jsx(H,{size:14})," Start your robot"]}):e.jsxs("section",{className:"buildempty","aria-labelledby":"buildempty-title",children:[e.jsx("button",{type:"button",className:"buildempty__close",onClick:()=>i(!0),title:"Hide","aria-label":"Hide this suggestion",children:"×"}),e.jsx("p",{className:"buildempty__eyebrow",children:"No robot in this project yet"}),e.jsx("h2",{id:"buildempty-title",className:"buildempty__title",children:"Start your own robot"}),e.jsx("p",{className:"buildempty__body",children:"This is the demo arm. Build a robot from blocks here, open a URDF you already have, or design one in BetterCAD."}),e.jsxs("div",{className:"buildempty__actions",children:[e.jsx("button",{type:"button",className:"buildempty__btn buildempty__btn--primary",onClick:m,children:"＋ New robot"}),e.jsxs("button",{type:"button",className:"buildempty__btn",onClick:s,children:[e.jsx(R,{size:14})," Open URDF…"]})]}),e.jsx("button",{type:"button",className:"buildempty__bettercad",onClick:d,title:"Opens BetterCAD in your browser",children:e.jsxs("span",{className:"buildempty__bettercad-text",children:[e.jsxs("span",{className:"buildempty__bettercad-name",children:["Design it in BetterCAD ",e.jsx("span",{"aria-hidden":"true",children:"↗"})]}),e.jsx("span",{className:"buildempty__bettercad-by",children:"by kevsrobots"})]})}),e.jsx("p",{className:"buildempty__note",children:"In BetterCAD, export a URDF into this project folder, then choose Open URDF… to bring it in."})]})}function Kt({embedded:m=!1,full:s=!1,onPopOut:u}){const{currentFolder:i,openFile:d,openBuffer:S,openFolderPath:z}=Z(),{setFocus:D}=q(),[b,w]=p.useState(null),[F,k]=p.useState(""),[a,x]=p.useState(null),[O,B]=p.useState(0),[U,E]=p.useState(0),l=t=>M(t,{priority:4,clearAfterMs:4e3});p.useEffect(()=>{let t=!0;return(async()=>{try{const r=await window.api.robot.load(i??void 0),o=G(r)?.urdf;if(o&&i){const n=`${i.replace(/[/\\]$/,"")}/${o.replace(/^[/\\]/,"")}`,c=await window.api.fs.readFile(n);if(t&&c.trim()){w(c),k(W(n)),x(n);return}}}catch{}t&&(w(C),k(""),x(null))})(),()=>{t=!1}},[i,O,U]),p.useEffect(()=>window.api.robot.onUrdfChanged(()=>E(t=>t+1)),[]);const L=()=>{a?d("local",a):S("demo-arm.urdf",b??C),D(!0)},y=t=>t.replace(/[/\\]+$/,"").split(/[/\\]/).pop()??t,h=t=>t.replace(/\\/g,"/").replace(/\/$/,"").replace(/^([a-zA-Z]):/,(r,o)=>`${o.toLowerCase()}:`),P=(t,r)=>{const o=h(t),n=h(r);return o!==n&&o.startsWith(n+"/")?o.slice(n.length+1):null},_=async(t,r)=>{if(!Y(r))throw new Error(`"${y(r)}" isn't a .urdf — it can't be the robot`);const o=await window.api.robot.load(t);o.robot={...o.robot??{},version:1,urdf:r},await window.api.robot.save(t,o),N("local",`${t}/robot.yml`,""),B(n=>n+1)},j=async()=>{const t=await window.api.fs.openFileDialog({filters:[{name:"Robot model",extensions:["urdf","xacro"]},{name:"All files",extensions:["*"]}]});if(!t)return;const r=y(t),o=i?i.replace(/[/\\]$/,""):null;let n=o?P(t,o):null;if(!n&&o&&!/[/\\]/.test(t))try{await window.api.fs.readFile(`${o}/${t}`),n=t}catch{n=null}const c=o&&n?h(`${o}/${n}`):null;if(!!a&&c!=null&&c===h(a))l(`"${r}" is already this project's robot`);else if(o&&n)if(!a||window.confirm(`Link "${r}" as this project's robot?

This replaces the current robot (${y(a)}). The old file stays on disk.`))try{await _(o,n),l(`Linked "${r}" — now this project's robot`)}catch($){l(`Opened "${r}" — ${$ instanceof Error?$.message:"couldn't link it"}`)}else l(`Opened "${r}" (not linked)`);else l(`Opened "${r}" — it's outside the project, so it wasn't linked`);await d("local",t)},v=async()=>{if(a&&!window.confirm(`This project already has a robot linked (${y(a)}).

Create a new blank robot and make it the project robot instead? The current robot file stays on disk — reopen it any time with "Open…".`))return;let t=i;if(!t){if(t=await window.api.fs.openFolderDialog(),!t)return;z(t)}const r=t.replace(/[/\\]$/,"");let o="robot.urdf";for(let f=2;f<1e3;f++)try{await window.api.fs.readFile(`${r}/${o}`),o=`robot-${f}.urdf`}catch{break}const n=`${r}/${o}`,c=V("my_robot");try{await window.api.fs.writeFile(n,c),N("local",n,c);try{await _(r,o),l(`Created "${o}" — now this project's robot`)}catch{l(`Created "${o}" (couldn't link it to the project)`)}await d("local",n)}catch{l("Couldn’t create the new robot file")}},g=a!==null;return e.jsxs("div",{className:`robotdock${s?" robotdock--full":""}`,children:[b===null?e.jsx("div",{className:"robotdock__loading",children:"Loading 3D…"}):e.jsx(T,{urdfContent:b,urdfPath:a,basePath:F,compact:!s,homeOnMount:s}),s&&b!==null&&!g&&e.jsx(Q,{onNewRobot:()=>void v(),onOpenRobot:()=>void j()}),s&&e.jsx("div",{className:"esync__float esync__float--right",children:e.jsx(I,{folder:i})}),m&&u&&e.jsx("button",{type:"button",className:"robotdock__popout",title:"Open the Build workspace","aria-label":"Open the Build workspace",onClick:u,children:e.jsx("svg",{width:"13",height:"13",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:e.jsx("path",{d:"M14 4h6v6M20 4l-8 8M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),!m&&!s&&e.jsxs("div",{className:"robotdock__actions",children:[e.jsx("button",{type:"button",className:`robotdock__btn${g?"":" robotdock__btn--cta"}`,title:"Create a new blank robot (.urdf) and open it in the pose tool",onClick:()=>void v(),children:"＋ New robot"}),e.jsxs("button",{type:"button",className:"robotdock__btn",title:"Open an existing robot (.urdf) full-screen",onClick:()=>void j(),children:[e.jsx(R,{size:13})," Open…"]}),e.jsx("button",{type:"button",className:"robotdock__btn",title:"Pop out full-screen (pose tool + assembly)",onClick:L,children:"⤢ Pop out"})]})]})}export{Kt as RobotDockPanel,Kt as default};
