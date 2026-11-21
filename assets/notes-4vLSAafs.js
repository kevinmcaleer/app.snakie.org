const a=`# The code and the board light up together

Point at a pin's name in your code and that pin glows on the mini board. Click a pin on the board and the editor jumps to the line that sets it up.
`,r=`# Animate your robot

Build has a new **Animate** mode. Drag the robot to pose it, or turn one joint with its ring.

- Mirror a pose from one side to the other as you go.
- Press **Save pose** to keep it on the pose shelf, then press a thumbnail to go back to it.
`,d=`# Get libraries and On this board

The Packages panel has two clearer tabs. **Get libraries** is everything you can add to your board. **On this board** shows what's already there and how full the board is.
`,l=`# Open in Snakie shows the code

Opening code from a kevsrobots lesson now always takes you to the code, even if you were last working in Electronics or Build.
`,h=`# Real 3-D parts in the browser

On app.snakie.org, parts you add to Build (like the SG90 servo or HC-SR04) now show their real 3-D model instead of a plain box. They download once and then work offline.
`,c=`# Side panels in Electronics and Build

Files, Packages and Inspect now open beside the Electronics and Build workspaces too. On phones and tablets they slide in as a drawer; tap outside to close it.
`,p=`# A program to try straight away

The first time you open Snakie, a short \`main.py\` is waiting that blinks the board's light. Press **Run** to see it work, on a real board or the simulated one.
`,u=`# Animate always tells you what to do next

Animate is never greyed out. If your robot can't move yet, it says why and offers a one-press fix.
`,_=`# A timeline for your robot's moves

Add poses to the Animate timeline (press **K**), drag the gaps to change the timing, and press **Space** to play. **Make walk cycle** turns two poses into a looping walk.
`,m=`# Electronics on a phone

The Electronics workspace on a phone is one tidy layout: Sync, ERC, Live and Help in a row at the top, and the board tools in a dock along the bottom.
`,b=`# Press and hold a part

In Build, press and hold a part (or right-click it) to open its menu: rename it, make it the base, delete it or set its joint.
`,y=`# Switch to the other kevsrobots apps

The grid button beside the Snakie logo lists Learn, Projects, Snakie and BetterCAD. The others open in a new tab, so nothing you're working on is lost.
`,g=`# More boards to flash

The firmware dialog now lists the Pimoroni Tiny 2040, Pico LiPo and Pico 2 W, and picks the right MicroPython download for the board you choose.
`,w=`# Pin a foot

In Animate, pin a foot to the floor and it stays planted while you pose, so the body moves over it. Walks play on the spot.
`,f=`# Render a movie

Turn your Animate timeline into a video (MP4, WebM or GIF) or a set of pictures, right on your computer. Pick the size, frame rate, camera and look.
`,v="# CircuitPython runs on the simulator\n\nCircuitPython code that uses `board`, `digitalio`, `pwmio` or `analogio` now runs on the simulated board, so you can try it without plugging anything in.\n",k=`# Drivers chip in the Code workspace

When a part in your project needs a driver, an amber **Drivers** chip now shows beside Find in the Code workspace. Tap it to install the driver onto your board. It opens over your code, so nothing gets pushed down.
`,P=`# Every file opens the same way in Code

Files you made in Blocks now open in the normal code editor in the Code workspace, just like any other MicroPython file. The block layout Snakie saves at the end of the file is tucked away, and Blocks still puts your blocks back where you left them.
`,T=`# Easier-to-read hover help

The help that pops up when you point at code now stands out from the code underneath it.
`,S=`# Install connects your board for you

In the Packages panel, Install always works. With no board connected, pressing it connects your board and installs as soon as it's ready.
`,A="# Python keywords autocomplete\n\nStart typing a keyword like `fro` or `imp` and Snakie offers `from` or `import`. Keywords only appear where they make sense, such as `elif` after an `if`.\n",O=`# More room for your code

The "MICROPYTHON" bar above the editor is gone, so your code gets that line back. The status bar still says which Python you're using.
`,x=`# One place for missing drivers and libraries

The **Drivers** chip beside your file tabs now covers everything your parts need: drivers, board libraries and missing imports. It shows for blocks programs too, so nothing pushes your code or canvas down any more.
`,C="# Switch the simulator to CircuitPython\n\nTap **MicroPython** in the status bar and choose **CircuitPython**. The simulator then runs CircuitPython code (`board`, `digitalio` and friends), and the help and code suggestions switch with it. On a real board, the same menu offers to put the other Python on it.\n",M=`# What's new

After an update, a short note lists the new features. Open **What's new** from the Help panel or the Help menu to read them all again.
`,E=Object.assign({"./notes/2026-11-18-code-and-board-light-up.md":a,"./notes/2026-11-19-animate-mode.md":r,"./notes/2026-11-19-get-libraries.md":d,"./notes/2026-11-19-open-in-snakie-shows-code.md":l,"./notes/2026-11-19-part-models-on-the-web.md":h,"./notes/2026-11-19-side-panels-everywhere.md":c,"./notes/2026-11-19-starter-program.md":p,"./notes/2026-11-20-animate-always-ready.md":u,"./notes/2026-11-20-animate-timeline.md":_,"./notes/2026-11-20-electronics-on-a-phone.md":m,"./notes/2026-11-20-hold-a-part.md":b,"./notes/2026-11-20-kevsrobots-apps.md":y,"./notes/2026-11-20-more-boards-to-flash.md":g,"./notes/2026-11-20-pin-a-foot.md":w,"./notes/2026-11-20-render-movie.md":f,"./notes/2026-11-21-circuitpython-simulator.md":v,"./notes/2026-11-21-drivers-in-code.md":k,"./notes/2026-11-21-every-file-in-code.md":P,"./notes/2026-11-21-hover-help-stands-out.md":T,"./notes/2026-11-21-install-connects-your-board.md":S,"./notes/2026-11-21-keyword-completions.md":A,"./notes/2026-11-21-more-room-for-code.md":O,"./notes/2026-11-21-one-drivers-chip.md":x,"./notes/2026-11-21-switch-simulator-language.md":C,"./notes/2026-11-21-whats-new.md":M}),I=/^(\d{4}-\d{2}-\d{2})-[a-z0-9]+(?:-[a-z0-9]+)*$/;function B(s,e){const o=I.exec(s)?.[1],t=/^#\s+(.+?)\s*\n([\s\S]*)$/.exec(e.replace(/\r\n/g,`
`).trimStart()+`
`);return!o||!t?null:{id:s,date:o,title:t[1],body:t[2].trim()}}function N(s){return Object.entries(s).map(([e,o])=>B(e.replace(/^.*\//,"").replace(/\.md$/,""),o)).filter(e=>e!==null).sort((e,o)=>e.id<o.id?1:e.id>o.id?-1:0)}const D=N(E);function W(s){const e=[];for(const o of s){const t=e[e.length-1];t?.date===o.date?t.notes.push(o):e.push({date:o.date,notes:[o]})}return e}const j=["January","February","March","April","May","June","July","August","September","October","November","December"];function R(s){const[e,o,t]=s.split("-").map(Number);return`${t} ${j[(o||1)-1]} ${e}`}function F(s){const e=[];for(const o of s.split(/\n\s*\n/)){const t=o.split(`
`).map(n=>n.trim()).filter(Boolean);if(t.length)if(t[0].startsWith("- ")){const n=[];for(const i of t)i.startsWith("- ")?n.push(i.slice(2).trim()):n.length&&(n[n.length-1]+=" "+i);e.push({kind:"ul",items:n})}else e.push({kind:"p",text:t.join(" ")})}return e}function H(s){const e=[],o=/\*\*(.+?)\*\*|`([^`]+)`/g;let t=0;for(let n=o.exec(s);n;n=o.exec(s))n.index>t&&e.push({kind:"text",text:s.slice(t,n.index)}),e.push(n[1]!==void 0?{kind:"strong",text:n[1]}:{kind:"code",text:n[2]}),t=n.index+n[0].length;return t<s.length&&e.push({kind:"text",text:s.slice(t)}),e}export{D as N,F as a,W as b,R as d,H as s};
