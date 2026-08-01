async function An(m={}){var u;(function(){function e(d){for(var _=(d=d.split("-")[0]).split(".").slice(0,3);_.length<3;)_.push("00");return(_=_.map((h,v,y)=>h.padStart(2,"0"))).join("")}var n=d=>[d/1e4|0,(d/100|0)%100,d%100].join("."),t=typeof process<"u"&&process.versions?.node?e(process.versions.node):2147483647;if(t<16e4)throw new Error(`This emscripten-generated code requires node v${n(16e4)} (detected v${n(t)})`);var s=typeof navigator<"u"&&navigator.userAgent;if(s){var o=s.includes("Safari/")&&!s.includes("Chrome/")&&s.match(/Version\/(\d+\.?\d*\.?\d*)/)?e(s.match(/Version\/(\d+\.?\d*\.?\d*)/)[1]):2147483647;if(o<15e4)throw new Error(`This emscripten-generated code requires Safari v${n(15e4)} (detected v${o})`);var a=s.match(/Firefox\/(\d+(?:\.\d+)?)/)?parseFloat(s.match(/Firefox\/(\d+(?:\.\d+)?)/)[1]):2147483647;if(a<79)throw new Error(`This emscripten-generated code requires Firefox v79 (detected v${a})`);var l=s.match(/Chrome\/(\d+(?:\.\d+)?)/)?parseFloat(s.match(/Chrome\/(\d+(?:\.\d+)?)/)[1]):2147483647;if(l<85)throw new Error(`This emscripten-generated code requires Chrome v85 (detected v${l})`)}})();var i=m,b=!!globalThis.window,w=!!globalThis.WorkerGlobalScope,T=globalThis.process?.versions?.node&&globalThis.process?.type!="renderer",x=!b&&!T&&!w;if(T){const{createRequire:e}=await import("./__vite-browser-external-9wXp6ZBx.js");var R=e(import.meta.url)}var N,p,U=import.meta.url,S="";if(T){if(!(globalThis.process?.versions?.node&&globalThis.process?.type!="renderer"))throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");var O=R("node:fs");U.startsWith("file:")&&(S=R("node:path").dirname(R("node:url").fileURLToPath(U))+"/"),p=e=>{e=pe(e)?new URL(e):e;var n=O.readFileSync(e);return c(Buffer.isBuffer(n)),n},N=async(e,n=!0)=>{e=pe(e)?new URL(e):e;var t=O.readFileSync(e,n?void 0:"utf8");return c(n?Buffer.isBuffer(t):typeof t=="string"),t},process.argv.length>1&&process.argv[1].replace(/\\/g,"/"),process.argv.slice(2)}else if(!x){if(!b&&!w)throw new Error("environment detection error");try{S=new URL(".",U).href}catch{}if(!globalThis.window&&!globalThis.WorkerGlobalScope)throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");w&&(p=e=>{var n=new XMLHttpRequest;return n.open("GET",e,!1),n.responseType="arraybuffer",n.send(null),new Uint8Array(n.response)}),N=async e=>{if(pe(e))return new Promise((t,s)=>{var o=new XMLHttpRequest;o.open("GET",e,!0),o.responseType="arraybuffer",o.onload=()=>{o.status==200||o.status==0&&o.response?t(o.response):s(o.status)},o.onerror=s,o.send(null)});var n=await fetch(e,{credentials:"same-origin"});if(n.ok)return n.arrayBuffer();throw new Error(n.status+" : "+n.url)}}var z,J=console.log.bind(console),L=console.error.bind(console);c(!x,"shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable."),globalThis.WebAssembly||L("no native wasm support detected");var ve=!1;function c(e,n){e||A("Assertion failed"+(n?": "+n:""))}var pe=e=>e.startsWith("file://");function De(){if(!ve){var e=ze();e==0&&(e+=4);var n=D[e>>2],t=D[e+4>>2];n==34821223&&t==2310721022||A(`Stack overflow! Stack cookie has been overwritten at ${ge(e)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ge(t)} ${ge(n)}`),D[0]!=1668509029&&A("Runtime error: The application has corrupted its heap memory area (address zero)!")}}var Me,Ce,He,Xe,Y,me,le,te,D,Ae,Re,W;function we(e){Object.getOwnPropertyDescriptor(i,e)||Object.defineProperty(i,e,{configurable:!0,set(){A(`Attempt to set \`Module.${e}\` after it has already been processed.  This can happen, for example, when code is injected via '--post-js' rather than '--pre-js'`)}})}function k(e){return()=>c(!1,`call to '${e}' via reference taken before Wasm module initialization`)}function Fe(e){Object.getOwnPropertyDescriptor(i,e)&&A(`\`Module.${e}\` was supplied but \`${e}\` not included in INCOMING_MODULE_JS_API`)}function Ye(e){Object.getOwnPropertyDescriptor(i,e)||Object.defineProperty(i,e,{configurable:!0,get(){var n,t=`'${e}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;((n=e)==="FS_createPath"||n==="FS_createDataFile"||n==="FS_createPreloadedFile"||n==="FS_preloadFile"||n==="FS_unlink"||n==="addRunDependency"||n==="FS_createLazyFile"||n==="FS_createDevice"||n==="removeRunDependency")&&(t+=". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you"),A(t)}})}Me=new Int16Array(1),Ce=new Int8Array(Me.buffer),Me[0]=25459,Ce[0]===115&&Ce[1]===99||A("Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)");var Oe,he=!1;function $e(){var e=xe.buffer;Y=new Int8Array(e),le=new Int16Array(e),i.HEAPU8=me=new Uint8Array(e),te=new Int32Array(e),D=new Uint32Array(e),Ae=new Float32Array(e),Re=new Float64Array(e),W=new BigInt64Array(e),new BigUint64Array(e)}function A(e){i.onAbort?.(e),L(e="Aborted("+e+")"),ve=!0;var n=new WebAssembly.RuntimeError(e);throw Xe?.(n),n}function I(e,n){return(...t)=>{c(he,`native function \`${e}\` called before runtime initialization`);var s=be[e];return c(s,`exported native function \`${e}\` not found`),c(t.length<=n,`native function \`${e}\` called with ${t.length} args but expects ${n}`),s(...t)}}function En(){return i.locateFile?(e="micropython.wasm",i.locateFile?i.locateFile(e,S):S+e):new URL("/assets/micropython-DXFUqjrr.wasm",import.meta.url).href;var e}async function xn(e){if(!z)try{var n=await N(e);return new Uint8Array(n)}catch{}return function(t){if(t==Oe&&z)return new Uint8Array(z);if(p)return p(t);throw"both async and sync fetching of the wasm failed"}(e)}async function kn(e,n,t){if(!e&&!pe(n)&&!T)try{var s=fetch(n,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(s,t)}catch(o){L(`wasm streaming compile failed: ${o}`),L("falling back to ArrayBuffer instantiation")}return async function(o,a){try{var l=await xn(o);return await WebAssembly.instantiate(l,a)}catch(d){L(`failed to asynchronously prepare wasm: ${d}`),pe(o)&&L(`warning: Loading from a file URI (${o}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`),A(d)}}(n,t)}c(globalThis.Int32Array&&globalThis.Float64Array&&Int32Array.prototype.subarray&&Int32Array.prototype.set,"JS engine does not provide full typed array support");var Je=e=>{for(;e.length>0;)e.shift()(i)},Qe=[],Tn=e=>Qe.push(e),Ze=[],Pn=e=>Ze.push(e);function Le(e,n="i8"){switch(n.endsWith("*")&&(n="*"),n){case"i1":case"i8":return Y[e];case"i16":return le[e>>1];case"i32":return te[e>>2];case"i64":return W[e>>3];case"float":return Ae[e>>2];case"double":return Re[e>>3];case"*":return D[e>>2];default:A(`invalid type for getValue: ${n}`)}}var ge=e=>(c(typeof e=="number","ptrToString expects a number, got "+typeof e),"0x"+(e>>>=0).toString(16).padStart(8,"0")),K=e=>pn(e),H=()=>hn(),de=e=>{de.shown||={},de.shown[e]||(de.shown[e]=1,T&&(e="warning: "+e),L(e))},M={isAbs:e=>e.charAt(0)==="/",splitPath:e=>/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(e).slice(1),normalizeArray:(e,n)=>{for(var t=0,s=e.length-1;s>=0;s--){var o=e[s];o==="."?e.splice(s,1):o===".."?(e.splice(s,1),t++):t&&(e.splice(s,1),t--)}if(n)for(;t;t--)e.unshift("..");return e},normalize:e=>{var n=M.isAbs(e),t=e.slice(-1)==="/";return(e=M.normalizeArray(e.split("/").filter(s=>!!s),!n).join("/"))||n||(e="."),e&&t&&(e+="/"),(n?"/":"")+e},dirname:e=>{var n=M.splitPath(e),t=n[0],s=n[1];return t||s?(s&&(s=s.slice(0,-1)),t+s):"."},basename:e=>e&&e.match(/([^\/]+|\/)\/*$/)[1],join:(...e)=>M.normalize(e.join("/")),join2:(e,n)=>M.normalize(e+"/"+n)},en=e=>{(en=(()=>{if(T){var n=R("node:crypto");return t=>n.randomFillSync(t)}return t=>crypto.getRandomValues(t)})())(e)},re={resolve:(...e)=>{for(var n="",t=!1,s=e.length-1;s>=-1&&!t;s--){var o=s>=0?e[s]:r.cwd();if(typeof o!="string")throw new TypeError("Arguments to path.resolve must be strings");if(!o)return"";n=o+"/"+n,t=M.isAbs(o)}return(t?"/":"")+(n=M.normalizeArray(n.split("/").filter(a=>!!a),!t).join("/"))||"."},relative:(e,n)=>{function t(h){for(var v=0;v<h.length&&h[v]==="";v++);for(var y=h.length-1;y>=0&&h[y]==="";y--);return v>y?[]:h.slice(v,y-v+1)}e=re.resolve(e).slice(1),n=re.resolve(n).slice(1);for(var s=t(e.split("/")),o=t(n.split("/")),a=Math.min(s.length,o.length),l=a,d=0;d<a;d++)if(s[d]!==o[d]){l=d;break}var _=[];for(d=l;d<s.length;d++)_.push("..");return(_=_.concat(o.slice(l))).join("/")}},nn=globalThis.TextDecoder&&new TextDecoder,ce=(e,n=0,t,s)=>{var o=((v,y,f,g)=>{var C=y+f;if(g)return C;for(;v[y]&&!(y>=C);)++y;return y})(e,n,t,s);if(o-n>16&&e.buffer&&nn)return nn.decode(e.subarray(n,o));for(var a="";n<o;){var l=e[n++];if(128&l){var d=63&e[n++];if((224&l)!=192){var _=63&e[n++];if((240&l)==224?l=(15&l)<<12|d<<6|_:((248&l)!=240&&de("Invalid UTF-8 leading byte "+ge(l)+" encountered when deserializing a UTF-8 string in wasm memory to a JS string!"),l=(7&l)<<18|d<<12|_<<6|63&e[n++]),l<65536)a+=String.fromCharCode(l);else{var h=l-65536;a+=String.fromCharCode(55296|h>>10,56320|1023&h)}}else a+=String.fromCharCode((31&l)<<6|d)}else a+=String.fromCharCode(l)}return a},je=[],Se=e=>{for(var n=0,t=0;t<e.length;++t){var s=e.charCodeAt(t);s<=127?n++:s<=2047?n+=2:s>=55296&&s<=57343?(n+=4,++t):n+=3}return n},tn=(e,n,t,s)=>{if(c(typeof e=="string",`stringToUTF8Array expects a string (got ${typeof e})`),!(s>0))return 0;for(var o=t,a=t+s-1,l=0;l<e.length;++l){var d=e.codePointAt(l);if(d<=127){if(t>=a)break;n[t++]=d}else if(d<=2047){if(t+1>=a)break;n[t++]=192|d>>6,n[t++]=128|63&d}else if(d<=65535){if(t+2>=a)break;n[t++]=224|d>>12,n[t++]=128|d>>6&63,n[t++]=128|63&d}else{if(t+3>=a)break;d>1114111&&de("Invalid Unicode code point "+ge(d)+" encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF)."),n[t++]=240|d>>18,n[t++]=128|d>>12&63,n[t++]=128|d>>6&63,n[t++]=128|63&d,l++}}return n[t]=0,t-o},Ue=(e,n,t)=>{var s=Se(e)+1,o=new Array(s),a=tn(e,o,0,o.length);return o.length=a,o},se={ttys:[],init(){},shutdown(){},register(e,n){se.ttys[e]={input:[],output:[],ops:n},r.registerDevice(e,se.stream_ops)},stream_ops:{open(e){var n=se.ttys[e.node.rdev];if(!n)throw new r.ErrnoError(43);e.tty=n,e.seekable=!1},close(e){e.tty.ops.fsync(e.tty)},fsync(e){e.tty.ops.fsync(e.tty)},read(e,n,t,s,o){if(!e.tty||!e.tty.ops.get_char)throw new r.ErrnoError(60);for(var a=0,l=0;l<s;l++){var d;try{d=e.tty.ops.get_char(e.tty)}catch{throw new r.ErrnoError(29)}if(d===void 0&&a===0)throw new r.ErrnoError(6);if(d==null)break;a++,n[t+l]=d}return a&&(e.node.atime=Date.now()),a},write(e,n,t,s,o){if(!e.tty||!e.tty.ops.put_char)throw new r.ErrnoError(60);try{for(var a=0;a<s;a++)e.tty.ops.put_char(e.tty,n[t+a])}catch{throw new r.ErrnoError(29)}return s&&(e.node.mtime=e.node.ctime=Date.now()),a}},default_tty_ops:{get_char:e=>(()=>{if(!je.length){var n=null;if(T){var t=Buffer.alloc(256),s=0,o=process.stdin.fd;try{s=O.readSync(o,t,0,256)}catch(a){if(!a.toString().includes("EOF"))throw a;s=0}s>0&&(n=t.slice(0,s).toString("utf-8"))}else globalThis.window?.prompt&&(n=window.prompt("Input: "))!==null&&(n+=`
`);if(!n)return null;je=Ue(n)}return je.shift()})(),put_char(e,n){n===null||n===10?(J(ce(e.output)),e.output=[]):n!=0&&e.output.push(n)},fsync(e){e.output?.length>0&&(J(ce(e.output)),e.output=[])},ioctl_tcgets:e=>({c_iflag:25856,c_oflag:5,c_cflag:191,c_lflag:35387,c_cc:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}),ioctl_tcsets:(e,n,t)=>0,ioctl_tiocgwinsz:e=>[24,80]},default_tty1_ops:{put_char(e,n){n===null||n===10?(L(ce(e.output)),e.output=[]):n!=0&&e.output.push(n)},fsync(e){e.output?.length>0&&(L(ce(e.output)),e.output=[])}}},rn=e=>{A("internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported")},E={ops_table:null,mount:e=>E.createNode(null,"/",16895,0),createNode(e,n,t,s){if(r.isBlkdev(t)||r.isFIFO(t))throw new r.ErrnoError(63);E.ops_table||={dir:{node:{getattr:E.node_ops.getattr,setattr:E.node_ops.setattr,lookup:E.node_ops.lookup,mknod:E.node_ops.mknod,rename:E.node_ops.rename,unlink:E.node_ops.unlink,rmdir:E.node_ops.rmdir,readdir:E.node_ops.readdir,symlink:E.node_ops.symlink},stream:{llseek:E.stream_ops.llseek}},file:{node:{getattr:E.node_ops.getattr,setattr:E.node_ops.setattr},stream:{llseek:E.stream_ops.llseek,read:E.stream_ops.read,write:E.stream_ops.write,mmap:E.stream_ops.mmap,msync:E.stream_ops.msync}},link:{node:{getattr:E.node_ops.getattr,setattr:E.node_ops.setattr,readlink:E.node_ops.readlink},stream:{}},chrdev:{node:{getattr:E.node_ops.getattr,setattr:E.node_ops.setattr},stream:r.chrdev_stream_ops}};var o=r.createNode(e,n,t,s);return r.isDir(o.mode)?(o.node_ops=E.ops_table.dir.node,o.stream_ops=E.ops_table.dir.stream,o.contents={}):r.isFile(o.mode)?(o.node_ops=E.ops_table.file.node,o.stream_ops=E.ops_table.file.stream,o.usedBytes=0,o.contents=null):r.isLink(o.mode)?(o.node_ops=E.ops_table.link.node,o.stream_ops=E.ops_table.link.stream):r.isChrdev(o.mode)&&(o.node_ops=E.ops_table.chrdev.node,o.stream_ops=E.ops_table.chrdev.stream),o.atime=o.mtime=o.ctime=Date.now(),e&&(e.contents[n]=o,e.atime=e.mtime=e.ctime=o.atime),o},getFileDataAsTypedArray:e=>e.contents?e.contents.subarray?e.contents.subarray(0,e.usedBytes):new Uint8Array(e.contents):new Uint8Array(0),expandFileStorage(e,n){var t=e.contents?e.contents.length:0;if(!(t>=n)){n=Math.max(n,t*(t<1048576?2:1.125)>>>0),t!=0&&(n=Math.max(n,256));var s=e.contents;e.contents=new Uint8Array(n),e.usedBytes>0&&e.contents.set(s.subarray(0,e.usedBytes),0)}},resizeFileStorage(e,n){if(e.usedBytes!=n)if(n==0)e.contents=null,e.usedBytes=0;else{var t=e.contents;e.contents=new Uint8Array(n),t&&e.contents.set(t.subarray(0,Math.min(n,e.usedBytes))),e.usedBytes=n}},node_ops:{getattr(e){var n={};return n.dev=r.isChrdev(e.mode)?e.id:1,n.ino=e.id,n.mode=e.mode,n.nlink=1,n.uid=0,n.gid=0,n.rdev=e.rdev,r.isDir(e.mode)?n.size=4096:r.isFile(e.mode)?n.size=e.usedBytes:r.isLink(e.mode)?n.size=e.link.length:n.size=0,n.atime=new Date(e.atime),n.mtime=new Date(e.mtime),n.ctime=new Date(e.ctime),n.blksize=4096,n.blocks=Math.ceil(n.size/n.blksize),n},setattr(e,n){for(const t of["mode","atime","mtime","ctime"])n[t]!=null&&(e[t]=n[t]);n.size!==void 0&&E.resizeFileStorage(e,n.size)},lookup(e,n){throw new r.ErrnoError(44)},mknod:(e,n,t,s)=>E.createNode(e,n,t,s),rename(e,n,t){var s;try{s=r.lookupNode(n,t)}catch{}if(s){if(r.isDir(e.mode))for(var o in s.contents)throw new r.ErrnoError(55);r.hashRemoveNode(s)}delete e.parent.contents[e.name],n.contents[t]=e,e.name=t,n.ctime=n.mtime=e.parent.ctime=e.parent.mtime=Date.now()},unlink(e,n){delete e.contents[n],e.ctime=e.mtime=Date.now()},rmdir(e,n){var t=r.lookupNode(e,n);for(var s in t.contents)throw new r.ErrnoError(55);delete e.contents[n],e.ctime=e.mtime=Date.now()},readdir:e=>[".","..",...Object.keys(e.contents)],symlink(e,n,t){var s=E.createNode(e,n,41471,0);return s.link=t,s},readlink(e){if(!r.isLink(e.mode))throw new r.ErrnoError(28);return e.link}},stream_ops:{read(e,n,t,s,o){var a=e.node.contents;if(o>=e.node.usedBytes)return 0;var l=Math.min(e.node.usedBytes-o,s);if(c(l>=0),l>8&&a.subarray)n.set(a.subarray(o,o+l),t);else for(var d=0;d<l;d++)n[t+d]=a[o+d];return l},write(e,n,t,s,o,a){if(c(!(n instanceof ArrayBuffer)),n.buffer===Y.buffer&&(a=!1),!s)return 0;var l=e.node;if(l.mtime=l.ctime=Date.now(),n.subarray&&(!l.contents||l.contents.subarray)){if(a)return c(o===0,"canOwn must imply no weird position inside the file"),l.contents=n.subarray(t,t+s),l.usedBytes=s,s;if(l.usedBytes===0&&o===0)return l.contents=n.slice(t,t+s),l.usedBytes=s,s;if(o+s<=l.usedBytes)return l.contents.set(n.subarray(t,t+s),o),s}if(E.expandFileStorage(l,o+s),l.contents.subarray&&n.subarray)l.contents.set(n.subarray(t,t+s),o);else for(var d=0;d<s;d++)l.contents[o+d]=n[t+d];return l.usedBytes=Math.max(l.usedBytes,o+s),s},llseek(e,n,t){var s=n;if(t===1?s+=e.position:t===2&&r.isFile(e.node.mode)&&(s+=e.node.usedBytes),s<0)throw new r.ErrnoError(28);return s},mmap(e,n,t,s,o){if(!r.isFile(e.node.mode))throw new r.ErrnoError(43);var a,l,d=e.node.contents;if(2&o||!d||d.buffer!==Y.buffer){if(l=!0,!(a=rn()))throw new r.ErrnoError(48);d&&((t>0||t+n<d.length)&&(d=d.subarray?d.subarray(t,t+n):Array.prototype.slice.call(d,t,t+n)),Y.set(d,a))}else l=!1,a=d.byteOffset;return{ptr:a,allocated:l}},msync:(e,n,t,s,o)=>(E.stream_ops.write(e,n,0,s,t,!1),0)}},Be=(e,n)=>{var t=0;return e&&(t|=365),n&&(t|=146),t},Q=(e,n,t)=>(c(typeof e=="number",`UTF8ToString expects a number (got ${typeof e})`),e?ce(me,e,n,t):""),sn={EPERM:63,ENOENT:44,ESRCH:71,EINTR:27,EIO:29,ENXIO:60,E2BIG:1,ENOEXEC:45,EBADF:8,ECHILD:12,EAGAIN:6,EWOULDBLOCK:6,ENOMEM:48,EACCES:2,EFAULT:21,ENOTBLK:105,EBUSY:10,EEXIST:20,EXDEV:75,ENODEV:43,ENOTDIR:54,EISDIR:31,EINVAL:28,ENFILE:41,EMFILE:33,ENOTTY:59,ETXTBSY:74,EFBIG:22,ENOSPC:51,ESPIPE:70,EROFS:69,EMLINK:34,EPIPE:64,EDOM:18,ERANGE:68,ENOMSG:49,EIDRM:24,ECHRNG:106,EL2NSYNC:156,EL3HLT:107,EL3RST:108,ELNRNG:109,EUNATCH:110,ENOCSI:111,EL2HLT:112,EDEADLK:16,ENOLCK:46,EBADE:113,EBADR:114,EXFULL:115,ENOANO:104,EBADRQC:103,EBADSLT:102,EDEADLOCK:16,EBFONT:101,ENOSTR:100,ENODATA:116,ETIME:117,ENOSR:118,ENONET:119,ENOPKG:120,EREMOTE:121,ENOLINK:47,EADV:122,ESRMNT:123,ECOMM:124,EPROTO:65,EMULTIHOP:36,EDOTDOT:125,EBADMSG:9,ENOTUNIQ:126,EBADFD:127,EREMCHG:128,ELIBACC:129,ELIBBAD:130,ELIBSCN:131,ELIBMAX:132,ELIBEXEC:133,ENOSYS:52,ENOTEMPTY:55,ENAMETOOLONG:37,ELOOP:32,EOPNOTSUPP:138,EPFNOSUPPORT:139,ECONNRESET:15,ENOBUFS:42,EAFNOSUPPORT:5,EPROTOTYPE:67,ENOTSOCK:57,ENOPROTOOPT:50,ESHUTDOWN:140,ECONNREFUSED:14,EADDRINUSE:3,ECONNABORTED:13,ENETUNREACH:40,ENETDOWN:38,ETIMEDOUT:73,EHOSTDOWN:142,EHOSTUNREACH:23,EINPROGRESS:26,EALREADY:7,EDESTADDRREQ:17,EMSGSIZE:35,EPROTONOSUPPORT:66,ESOCKTNOSUPPORT:137,EADDRNOTAVAIL:4,ENETRESET:39,EISCONN:30,ENOTCONN:53,ETOOMANYREFS:141,EUSERS:136,EDQUOT:19,ESTALE:72,ENOTSUP:138,ENOMEDIUM:148,EILSEQ:25,EOVERFLOW:61,ECANCELED:11,ENOTRECOVERABLE:56,EOWNERDEAD:62,ESTRPIPE:135},oe=0,ye=null,_e={},ne=null,on=[],an=async(e,n,t,s,o,a,l,d)=>{var _,h=n?re.resolve(M.join2(e,n)):e,v=(f=>{for(var g=f;;){if(!_e[f])return f;f=g+Math.random()}})(`cp ${h}`);_=v,oe++,i.monitorRunDependencies?.(oe),c(_,"addRunDependency requires an ID"),c(!_e[_]),_e[_]=1,ne===null&&globalThis.setInterval&&(ne=setInterval(()=>{if(ve)return clearInterval(ne),void(ne=null);var f=!1;for(var g in _e)f||(f=!0,L("still waiting on run dependencies:")),L(`dependency: ${g}`);f&&L("(end of list)")},1e4),ne.unref?.());try{var y=t;typeof t=="string"&&(y=await(async f=>{var g=await N(f);return c(g,`Loading data file "${f}" failed (no arrayBuffer).`),new Uint8Array(g)})(t)),y=await(async(f,g)=>{for(var C of(typeof Browser<"u"&&Browser.init(),on))if(C.canHandle(g))return c(C.handle.constructor.name==="AsyncFunction","Filesystem plugin handlers must be async functions (See #24914)"),C.handle(f,g);return f})(y,h),d?.(),a||((...f)=>{r.createDataFile(...f)})(e,n,y,s,o,l)}finally{(f=>{if(oe--,i.monitorRunDependencies?.(oe),c(f,"removeRunDependency requires an ID"),c(_e[f]),delete _e[f],oe==0&&(ne!==null&&(clearInterval(ne),ne=null),ye)){var g=ye;ye=null,g()}})(v)}},r={root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:!1,ignorePermissions:!0,filesystems:null,syncFSRequests:0,ErrnoError:class extends Error{name="ErrnoError";constructor(e){for(var n in super(he?(t=>Q(fn(t)))(e):""),this.errno=e,sn)if(sn[n]===e){this.code=n;break}}},FSStream:class{shared={};get object(){return this.node}set object(e){this.node=e}get isRead(){return(2097155&this.flags)!=1}get isWrite(){return!!(2097155&this.flags)}get isAppend(){return 1024&this.flags}get flags(){return this.shared.flags}set flags(e){this.shared.flags=e}get position(){return this.shared.position}set position(e){this.shared.position=e}},FSNode:class{node_ops={};stream_ops={};readMode=365;writeMode=146;mounted=null;constructor(e,n,t,s){e||(e=this),this.parent=e,this.mount=e.mount,this.id=r.nextInode++,this.name=n,this.mode=t,this.rdev=s,this.atime=this.mtime=this.ctime=Date.now()}get read(){return(this.mode&this.readMode)===this.readMode}set read(e){e?this.mode|=this.readMode:this.mode&=~this.readMode}get write(){return(this.mode&this.writeMode)===this.writeMode}set write(e){e?this.mode|=this.writeMode:this.mode&=~this.writeMode}get isFolder(){return r.isDir(this.mode)}get isDevice(){return r.isChrdev(this.mode)}},lookupPath(e,n={}){if(!e)throw new r.ErrnoError(44);n.follow_mount??=!0,M.isAbs(e)||(e=r.cwd()+"/"+e);e:for(var t=0;t<40;t++){for(var s=e.split("/").filter(h=>!!h),o=r.root,a="/",l=0;l<s.length;l++){var d=l===s.length-1;if(d&&n.parent)break;if(s[l]!==".")if(s[l]!==".."){a=M.join2(a,s[l]);try{o=r.lookupNode(o,s[l])}catch(h){if(h?.errno===44&&d&&n.noent_okay)return{path:a};throw h}if(!r.isMountpoint(o)||d&&!n.follow_mount||(o=o.mounted.root),r.isLink(o.mode)&&(!d||n.follow)){if(!o.node_ops.readlink)throw new r.ErrnoError(52);var _=o.node_ops.readlink(o);M.isAbs(_)||(_=M.dirname(a)+"/"+_),e=_+"/"+s.slice(l+1).join("/");continue e}}else{if(a=M.dirname(a),r.isRoot(o)){e=a+"/"+s.slice(l+1).join("/"),t--;continue e}o=o.parent}}return{path:a,node:o}}throw new r.ErrnoError(32)},getPath(e){for(var n;;){if(r.isRoot(e)){var t=e.mount.mountpoint;return n?t[t.length-1]!=="/"?`${t}/${n}`:t+n:t}n=n?`${e.name}/${n}`:e.name,e=e.parent}},hashName(e,n){for(var t=0,s=0;s<n.length;s++)t=(t<<5)-t+n.charCodeAt(s)|0;return(e+t>>>0)%r.nameTable.length},hashAddNode(e){var n=r.hashName(e.parent.id,e.name);e.name_next=r.nameTable[n],r.nameTable[n]=e},hashRemoveNode(e){var n=r.hashName(e.parent.id,e.name);if(r.nameTable[n]===e)r.nameTable[n]=e.name_next;else for(var t=r.nameTable[n];t;){if(t.name_next===e){t.name_next=e.name_next;break}t=t.name_next}},lookupNode(e,n){var t=r.mayLookup(e);if(t)throw new r.ErrnoError(t);for(var s=r.hashName(e.id,n),o=r.nameTable[s];o;o=o.name_next){var a=o.name;if(o.parent.id===e.id&&a===n)return o}return r.lookup(e,n)},createNode(e,n,t,s){c(typeof e=="object");var o=new r.FSNode(e,n,t,s);return r.hashAddNode(o),o},destroyNode(e){r.hashRemoveNode(e)},isRoot:e=>e===e.parent,isMountpoint:e=>!!e.mounted,isFile:e=>(61440&e)==32768,isDir:e=>(61440&e)==16384,isLink:e=>(61440&e)==40960,isChrdev:e=>(61440&e)==8192,isBlkdev:e=>(61440&e)==24576,isFIFO:e=>(61440&e)==4096,isSocket:e=>!(49152&~e),flagsToPermissionString(e){var n=["r","w","rw"][3&e];return 512&e&&(n+="w"),n},nodePermissions:(e,n)=>r.ignorePermissions||(!n.includes("r")||292&e.mode)&&(!n.includes("w")||146&e.mode)&&(!n.includes("x")||73&e.mode)?0:2,mayLookup(e){if(!r.isDir(e.mode))return 54;var n=r.nodePermissions(e,"x");return n||(e.node_ops.lookup?0:2)},mayCreate(e,n){if(!r.isDir(e.mode))return 54;try{return r.lookupNode(e,n),20}catch{}return r.nodePermissions(e,"wx")},mayDelete(e,n,t){var s;try{s=r.lookupNode(e,n)}catch(a){return a.errno}var o=r.nodePermissions(e,"wx");if(o)return o;if(t){if(!r.isDir(s.mode))return 54;if(r.isRoot(s)||r.getPath(s)===r.cwd())return 10}else if(r.isDir(s.mode))return 31;return 0},mayOpen(e,n){if(!e)return 44;if(r.isLink(e.mode))return 32;var t=r.flagsToPermissionString(n);return r.isDir(e.mode)&&(t!=="r"||576&n)?31:r.nodePermissions(e,t)},checkOpExists(e,n){if(!e)throw new r.ErrnoError(n);return e},MAX_OPEN_FDS:4096,nextfd(){for(var e=0;e<=r.MAX_OPEN_FDS;e++)if(!r.streams[e])return e;throw new r.ErrnoError(33)},getStreamChecked(e){var n=r.getStream(e);if(!n)throw new r.ErrnoError(8);return n},getStream:e=>r.streams[e],createStream:(e,n=-1)=>(c(n>=-1),e=Object.assign(new r.FSStream,e),n==-1&&(n=r.nextfd()),e.fd=n,r.streams[n]=e,e),closeStream(e){r.streams[e]=null},dupStream(e,n=-1){var t=r.createStream(e,n);return t.stream_ops?.dup?.(t),t},doSetAttr(e,n,t){var s=e?.stream_ops.setattr,o=s?e:n;s??=n.node_ops.setattr,r.checkOpExists(s,63),s(o,t)},chrdev_stream_ops:{open(e){var n=r.getDevice(e.node.rdev);e.stream_ops=n.stream_ops,e.stream_ops.open?.(e)},llseek(){throw new r.ErrnoError(70)}},major:e=>e>>8,minor:e=>255&e,makedev:(e,n)=>e<<8|n,registerDevice(e,n){r.devices[e]={stream_ops:n}},getDevice:e=>r.devices[e],getMounts(e){for(var n=[],t=[e];t.length;){var s=t.pop();n.push(s),t.push(...s.mounts)}return n},syncfs(e,n){typeof e=="function"&&(n=e,e=!1),r.syncFSRequests++,r.syncFSRequests>1&&L(`warning: ${r.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);var t=r.getMounts(r.root.mount),s=0;function o(d){return c(r.syncFSRequests>0),r.syncFSRequests--,n(d)}function a(d){if(d)return a.errored?void 0:(a.errored=!0,o(d));++s>=t.length&&o(null)}for(var l of t)l.type.syncfs?l.type.syncfs(l,e,a):a(null)},mount(e,n,t){if(typeof e=="string")throw e;var s,o=t==="/",a=!t;if(o&&r.root)throw new r.ErrnoError(10);if(!o&&!a){var l=r.lookupPath(t,{follow_mount:!1});if(t=l.path,s=l.node,r.isMountpoint(s))throw new r.ErrnoError(10);if(!r.isDir(s.mode))throw new r.ErrnoError(54)}var d={type:e,opts:n,mountpoint:t,mounts:[]},_=e.mount(d);return _.mount=d,d.root=_,o?r.root=_:s&&(s.mounted=d,s.mount&&s.mount.mounts.push(d)),_},unmount(e){var n=r.lookupPath(e,{follow_mount:!1});if(!r.isMountpoint(n.node))throw new r.ErrnoError(28);var t=n.node,s=t.mounted,o=r.getMounts(s);for(var[a,l]of Object.entries(r.nameTable))for(;l;){var d=l.name_next;o.includes(l.mount)&&r.destroyNode(l),l=d}t.mounted=null;var _=t.mount.mounts.indexOf(s);c(_!==-1),t.mount.mounts.splice(_,1)},lookup:(e,n)=>e.node_ops.lookup(e,n),mknod(e,n,t){var s=r.lookupPath(e,{parent:!0}).node,o=M.basename(e);if(!o)throw new r.ErrnoError(28);if(o==="."||o==="..")throw new r.ErrnoError(20);var a=r.mayCreate(s,o);if(a)throw new r.ErrnoError(a);if(!s.node_ops.mknod)throw new r.ErrnoError(63);return s.node_ops.mknod(s,o,n,t)},statfs:e=>r.statfsNode(r.lookupPath(e,{follow:!0}).node),statfsStream:e=>r.statfsNode(e.node),statfsNode(e){var n={bsize:4096,frsize:4096,blocks:1e6,bfree:5e5,bavail:5e5,files:r.nextInode,ffree:r.nextInode-1,fsid:42,flags:2,namelen:255};return e.node_ops.statfs&&Object.assign(n,e.node_ops.statfs(e.mount.opts.root)),n},create:(e,n=438)=>(n&=4095,n|=32768,r.mknod(e,n,0)),mkdir:(e,n=511)=>(n&=1023,n|=16384,r.mknod(e,n,0)),mkdirTree(e,n){var t=e.split("/"),s="";for(var o of t)if(o){(s||M.isAbs(e))&&(s+="/"),s+=o;try{r.mkdir(s,n)}catch(a){if(a.errno!=20)throw a}}},mkdev:(e,n,t)=>(t===void 0&&(t=n,n=438),n|=8192,r.mknod(e,n,t)),symlink(e,n){if(!re.resolve(e))throw new r.ErrnoError(44);var t=r.lookupPath(n,{parent:!0}).node;if(!t)throw new r.ErrnoError(44);var s=M.basename(n),o=r.mayCreate(t,s);if(o)throw new r.ErrnoError(o);if(!t.node_ops.symlink)throw new r.ErrnoError(63);return t.node_ops.symlink(t,s,e)},rename(e,n){var t,s,o=M.dirname(e),a=M.dirname(n),l=M.basename(e),d=M.basename(n);if(t=r.lookupPath(e,{parent:!0}).node,s=r.lookupPath(n,{parent:!0}).node,!t||!s)throw new r.ErrnoError(44);if(t.mount!==s.mount)throw new r.ErrnoError(75);var _,h=r.lookupNode(t,l),v=re.relative(e,a);if(v.charAt(0)!==".")throw new r.ErrnoError(28);if((v=re.relative(n,o)).charAt(0)!==".")throw new r.ErrnoError(55);try{_=r.lookupNode(s,d)}catch{}if(h!==_){var y=r.isDir(h.mode),f=r.mayDelete(t,l,y);if(f)throw new r.ErrnoError(f);if(f=_?r.mayDelete(s,d,y):r.mayCreate(s,d))throw new r.ErrnoError(f);if(!t.node_ops.rename)throw new r.ErrnoError(63);if(r.isMountpoint(h)||_&&r.isMountpoint(_))throw new r.ErrnoError(10);if(s!==t&&(f=r.nodePermissions(t,"w")))throw new r.ErrnoError(f);r.hashRemoveNode(h);try{t.node_ops.rename(h,s,d),h.parent=s}catch(g){throw g}finally{r.hashAddNode(h)}}},rmdir(e){var n=r.lookupPath(e,{parent:!0}).node,t=M.basename(e),s=r.lookupNode(n,t),o=r.mayDelete(n,t,!0);if(o)throw new r.ErrnoError(o);if(!n.node_ops.rmdir)throw new r.ErrnoError(63);if(r.isMountpoint(s))throw new r.ErrnoError(10);n.node_ops.rmdir(n,t),r.destroyNode(s)},readdir(e){var n=r.lookupPath(e,{follow:!0}).node;return r.checkOpExists(n.node_ops.readdir,54)(n)},unlink(e){var n=r.lookupPath(e,{parent:!0}).node;if(!n)throw new r.ErrnoError(44);var t=M.basename(e),s=r.lookupNode(n,t),o=r.mayDelete(n,t,!1);if(o)throw new r.ErrnoError(o);if(!n.node_ops.unlink)throw new r.ErrnoError(63);if(r.isMountpoint(s))throw new r.ErrnoError(10);n.node_ops.unlink(n,t),r.destroyNode(s)},readlink(e){var n=r.lookupPath(e).node;if(!n)throw new r.ErrnoError(44);if(!n.node_ops.readlink)throw new r.ErrnoError(28);return n.node_ops.readlink(n)},stat(e,n){var t=r.lookupPath(e,{follow:!n}).node;return r.checkOpExists(t.node_ops.getattr,63)(t)},fstat(e){var n=r.getStreamChecked(e),t=n.node,s=n.stream_ops.getattr,o=s?n:t;return s??=t.node_ops.getattr,r.checkOpExists(s,63),s(o)},lstat:e=>r.stat(e,!0),doChmod(e,n,t,s){r.doSetAttr(e,n,{mode:4095&t|-4096&n.mode,ctime:Date.now(),dontFollow:s})},chmod(e,n,t){var s;typeof e=="string"?s=r.lookupPath(e,{follow:!t}).node:s=e,r.doChmod(null,s,n,t)},lchmod(e,n){r.chmod(e,n,!0)},fchmod(e,n){var t=r.getStreamChecked(e);r.doChmod(t,t.node,n,!1)},doChown(e,n,t){r.doSetAttr(e,n,{timestamp:Date.now(),dontFollow:t})},chown(e,n,t,s){var o;typeof e=="string"?o=r.lookupPath(e,{follow:!s}).node:o=e,r.doChown(null,o,s)},lchown(e,n,t){r.chown(e,n,t,!0)},fchown(e,n,t){var s=r.getStreamChecked(e);r.doChown(s,s.node,!1)},doTruncate(e,n,t){if(r.isDir(n.mode))throw new r.ErrnoError(31);if(!r.isFile(n.mode))throw new r.ErrnoError(28);var s=r.nodePermissions(n,"w");if(s)throw new r.ErrnoError(s);r.doSetAttr(e,n,{size:t,timestamp:Date.now()})},truncate(e,n){if(n<0)throw new r.ErrnoError(28);var t;typeof e=="string"?t=r.lookupPath(e,{follow:!0}).node:t=e,r.doTruncate(null,t,n)},ftruncate(e,n){var t=r.getStreamChecked(e);if(n<0||!(2097155&t.flags))throw new r.ErrnoError(28);r.doTruncate(t,t.node,n)},utime(e,n,t){var s=r.lookupPath(e,{follow:!0}).node;r.checkOpExists(s.node_ops.setattr,63)(s,{atime:n,mtime:t})},open(e,n,t=438){if(e==="")throw new r.ErrnoError(44);var s,o;if(t=64&(n=typeof n=="string"?(h=>{var v={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090}[h];if(v===void 0)throw new Error(`Unknown file open mode: ${h}`);return v})(n):n)?4095&t|32768:0,typeof e=="object")s=e;else{o=e.endsWith("/");var a=r.lookupPath(e,{follow:!(131072&n),noent_okay:!0});s=a.node,e=a.path}var l=!1;if(64&n)if(s){if(128&n)throw new r.ErrnoError(20)}else{if(o)throw new r.ErrnoError(31);s=r.mknod(e,511|t,0),l=!0}if(!s)throw new r.ErrnoError(44);if(r.isChrdev(s.mode)&&(n&=-513),65536&n&&!r.isDir(s.mode))throw new r.ErrnoError(54);if(!l){var d=r.mayOpen(s,n);if(d)throw new r.ErrnoError(d)}512&n&&!l&&r.truncate(s,0),n&=-131713;var _=r.createStream({node:s,path:r.getPath(s),flags:n,seekable:!0,position:0,stream_ops:s.stream_ops,ungotten:[],error:!1});return _.stream_ops.open&&_.stream_ops.open(_),l&&r.chmod(s,511&t),_},close(e){if(r.isClosed(e))throw new r.ErrnoError(8);e.getdents&&(e.getdents=null);try{e.stream_ops.close&&e.stream_ops.close(e)}catch(n){throw n}finally{r.closeStream(e.fd)}e.fd=null},isClosed:e=>e.fd===null,llseek(e,n,t){if(r.isClosed(e))throw new r.ErrnoError(8);if(!e.seekable||!e.stream_ops.llseek)throw new r.ErrnoError(70);if(t!=0&&t!=1&&t!=2)throw new r.ErrnoError(28);return e.position=e.stream_ops.llseek(e,n,t),e.ungotten=[],e.position},read(e,n,t,s,o){if(c(t>=0),s<0||o<0)throw new r.ErrnoError(28);if(r.isClosed(e))throw new r.ErrnoError(8);if((2097155&e.flags)==1)throw new r.ErrnoError(8);if(r.isDir(e.node.mode))throw new r.ErrnoError(31);if(!e.stream_ops.read)throw new r.ErrnoError(28);var a=o!==void 0;if(a){if(!e.seekable)throw new r.ErrnoError(70)}else o=e.position;var l=e.stream_ops.read(e,n,t,s,o);return a||(e.position+=l),l},write(e,n,t,s,o,a){if(c(t>=0),s<0||o<0)throw new r.ErrnoError(28);if(r.isClosed(e))throw new r.ErrnoError(8);if(!(2097155&e.flags))throw new r.ErrnoError(8);if(r.isDir(e.node.mode))throw new r.ErrnoError(31);if(!e.stream_ops.write)throw new r.ErrnoError(28);e.seekable&&1024&e.flags&&r.llseek(e,0,2);var l=o!==void 0;if(l){if(!e.seekable)throw new r.ErrnoError(70)}else o=e.position;var d=e.stream_ops.write(e,n,t,s,o,a);return l||(e.position+=d),d},mmap(e,n,t,s,o){if(2&s&&!(2&o)&&(2097155&e.flags)!=2)throw new r.ErrnoError(2);if((2097155&e.flags)==1)throw new r.ErrnoError(2);if(!e.stream_ops.mmap)throw new r.ErrnoError(43);if(!n)throw new r.ErrnoError(28);return e.stream_ops.mmap(e,n,t,s,o)},msync:(e,n,t,s,o)=>(c(t>=0),e.stream_ops.msync?e.stream_ops.msync(e,n,t,s,o):0),ioctl(e,n,t){if(!e.stream_ops.ioctl)throw new r.ErrnoError(59);return e.stream_ops.ioctl(e,n,t)},readFile(e,n={}){n.flags=n.flags||0,n.encoding=n.encoding||"binary",n.encoding!=="utf8"&&n.encoding!=="binary"&&A(`Invalid encoding type "${n.encoding}"`);var t=r.open(e,n.flags),s=r.stat(e).size,o=new Uint8Array(s);return r.read(t,o,0,s,0),n.encoding==="utf8"&&(o=ce(o)),r.close(t),o},writeFile(e,n,t={}){t.flags=t.flags||577;var s=r.open(e,t.flags,t.mode);typeof n=="string"&&(n=new Uint8Array(Ue(n))),ArrayBuffer.isView(n)?r.write(s,n,0,n.byteLength,void 0,t.canOwn):A("Unsupported data type"),r.close(s)},cwd:()=>r.currentPath,chdir(e){var n=r.lookupPath(e,{follow:!0});if(n.node===null)throw new r.ErrnoError(44);if(!r.isDir(n.node.mode))throw new r.ErrnoError(54);var t=r.nodePermissions(n.node,"x");if(t)throw new r.ErrnoError(t);r.currentPath=n.path},createDefaultDirectories(){r.mkdir("/tmp"),r.mkdir("/home"),r.mkdir("/home/web_user")},createDefaultDevices(){r.mkdir("/dev"),r.registerDevice(r.makedev(1,3),{read:()=>0,write:(s,o,a,l,d)=>l,llseek:()=>0}),r.mkdev("/dev/null",r.makedev(1,3)),se.register(r.makedev(5,0),se.default_tty_ops),se.register(r.makedev(6,0),se.default_tty1_ops),r.mkdev("/dev/tty",r.makedev(5,0)),r.mkdev("/dev/tty1",r.makedev(6,0));var e=new Uint8Array(1024),n=0,t=()=>(n===0&&(en(e),n=e.byteLength),e[--n]);r.createDevice("/dev","random",t),r.createDevice("/dev","urandom",t),r.mkdir("/dev/shm"),r.mkdir("/dev/shm/tmp")},createSpecialDirectories(){r.mkdir("/proc");var e=r.mkdir("/proc/self");r.mkdir("/proc/self/fd"),r.mount({mount(){var n=r.createNode(e,"fd",16895,73);return n.stream_ops={llseek:E.stream_ops.llseek},n.node_ops={lookup(t,s){var o=+s,a=r.getStreamChecked(o),l={parent:null,mount:{mountpoint:"fake"},node_ops:{readlink:()=>a.path},id:o+1};return l.parent=l,l},readdir:()=>Array.from(r.streams.entries()).filter(([t,s])=>s).map(([t,s])=>t.toString())},n}},{},"/proc/self/fd")},createStandardStreams(e,n,t){e?r.createDevice("/dev","stdin",e):r.symlink("/dev/tty","/dev/stdin"),n?r.createDevice("/dev","stdout",null,n):r.symlink("/dev/tty","/dev/stdout"),t?r.createDevice("/dev","stderr",null,t):r.symlink("/dev/tty1","/dev/stderr");var s=r.open("/dev/stdin",0),o=r.open("/dev/stdout",1),a=r.open("/dev/stderr",1);c(s.fd===0,`invalid handle for stdin (${s.fd})`),c(o.fd===1,`invalid handle for stdout (${o.fd})`),c(a.fd===2,`invalid handle for stderr (${a.fd})`)},staticInit(){r.nameTable=new Array(4096),r.mount(E,{},"/"),r.createDefaultDirectories(),r.createDefaultDevices(),r.createSpecialDirectories(),r.filesystems={MEMFS:E}},init(e,n,t){c(!r.initialized,"FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)"),r.initialized=!0,e??=i.stdin,n??=i.stdout,t??=i.stderr,r.createStandardStreams(e,n,t)},quit(){for(var e of(r.initialized=!1,_n(0),r.streams))e&&r.close(e)},findObject(e,n){var t=r.analyzePath(e,n);return t.exists?t.object:null},analyzePath(e,n){try{e=(s=r.lookupPath(e,{follow:!n})).path}catch{}var t={isRoot:!1,exists:!1,error:0,name:null,path:null,object:null,parentExists:!1,parentPath:null,parentObject:null};try{var s=r.lookupPath(e,{parent:!0});t.parentExists=!0,t.parentPath=s.path,t.parentObject=s.node,t.name=M.basename(e),s=r.lookupPath(e,{follow:!n}),t.exists=!0,t.path=s.path,t.object=s.node,t.name=s.node.name,t.isRoot=s.path==="/"}catch(o){t.error=o.errno}return t},createPath(e,n,t,s){e=typeof e=="string"?e:r.getPath(e);for(var o=n.split("/").reverse();o.length;){var a=o.pop();if(a){var l=M.join2(e,a);try{r.mkdir(l)}catch(d){if(d.errno!=20)throw d}e=l}}return l},createFile(e,n,t,s,o){var a=M.join2(typeof e=="string"?e:r.getPath(e),n),l=Be(s,o);return r.create(a,l)},createDataFile(e,n,t,s,o,a){var l=n;e&&(e=typeof e=="string"?e:r.getPath(e),l=n?M.join2(e,n):e);var d=Be(s,o),_=r.create(l,d);if(t){if(typeof t=="string"){for(var h=new Array(t.length),v=0,y=t.length;v<y;++v)h[v]=t.charCodeAt(v);t=h}r.chmod(_,146|d);var f=r.open(_,577);r.write(f,t,0,t.length,0,a),r.close(f),r.chmod(_,d)}},createDevice(e,n,t,s){var o=M.join2(typeof e=="string"?e:r.getPath(e),n),a=Be(!!t,!!s);r.createDevice.major??=64;var l=r.makedev(r.createDevice.major++,0);return r.registerDevice(l,{open(d){d.seekable=!1},close(d){s?.buffer?.length&&s(10)},read(d,_,h,v,y){for(var f=0,g=0;g<v;g++){var C;try{C=t()}catch{throw new r.ErrnoError(29)}if(C===void 0&&f===0)throw new r.ErrnoError(6);if(C==null)break;f++,_[h+g]=C}return f&&(d.node.atime=Date.now()),f},write(d,_,h,v,y){for(var f=0;f<v;f++)try{s(_[h+f])}catch{throw new r.ErrnoError(29)}return v&&(d.node.mtime=d.node.ctime=Date.now()),f}}),r.mkdev(o,a,l)},forceLoadFile(e){if(e.isDevice||e.isFolder||e.link||e.contents)return!0;if(globalThis.XMLHttpRequest)A("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");else try{e.contents=p(e.url)}catch{throw new r.ErrnoError(29)}},createLazyFile(e,n,t,s,o){class a{lengthKnown=!1;chunks=[];get(y){if(!(y>this.length-1||y<0)){var f=y%this.chunkSize,g=y/this.chunkSize|0;return this.getter(g)[f]}}setDataGetter(y){this.getter=y}cacheLength(){var y=new XMLHttpRequest;y.open("HEAD",t,!1),y.send(null),y.status>=200&&y.status<300||y.status===304||A("Couldn't load "+t+". Status: "+y.status);var f,g=Number(y.getResponseHeader("Content-length")),C=(f=y.getResponseHeader("Accept-Ranges"))&&f==="bytes",B=(f=y.getResponseHeader("Content-Encoding"))&&f==="gzip",q=1048576;C||(q=g);var G=this;G.setDataGetter(fe=>{var Cn=fe*q,qe=(fe+1)*q-1;return qe=Math.min(qe,g-1),G.chunks[fe]===void 0&&(G.chunks[fe]=((Ge,ke)=>{Ge>ke&&A("invalid range ("+Ge+", "+ke+") or no bytes requested!"),ke>g-1&&A("only "+g+" bytes available! programmer error!");var V=new XMLHttpRequest;return V.open("GET",t,!1),g!==q&&V.setRequestHeader("Range","bytes="+Ge+"-"+ke),V.responseType="arraybuffer",V.overrideMimeType&&V.overrideMimeType("text/plain; charset=x-user-defined"),V.send(null),V.status>=200&&V.status<300||V.status===304||A("Couldn't load "+t+". Status: "+V.status),V.response!==void 0?new Uint8Array(V.response||[]):Ue(V.responseText||"")})(Cn,qe)),G.chunks[fe]===void 0&&A("doXHR failed!"),G.chunks[fe]}),!B&&g||(q=g=1,g=this.getter(0).length,q=g,J("LazyFiles on gzip forces download of the whole file when length is accessed")),this._length=g,this._chunkSize=q,this.lengthKnown=!0}get length(){return this.lengthKnown||this.cacheLength(),this._length}get chunkSize(){return this.lengthKnown||this.cacheLength(),this._chunkSize}}if(globalThis.XMLHttpRequest){w||A("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc");var l={isDevice:!1,contents:new a}}else l={isDevice:!1,url:t};var d=r.createFile(e,n,l,s,o);l.contents?d.contents=l.contents:l.url&&(d.contents=null,d.url=l.url),Object.defineProperties(d,{usedBytes:{get:function(){return this.contents.length}}});var _={};for(const[v,y]of Object.entries(d.stream_ops))_[v]=(...f)=>(r.forceLoadFile(d),y(...f));function h(v,y,f,g,C){var B=v.node.contents;if(C>=B.length)return 0;var q=Math.min(B.length-C,g);if(c(q>=0),B.slice)for(var G=0;G<q;G++)y[f+G]=B[C+G];else for(G=0;G<q;G++)y[f+G]=B.get(C+G);return q}return _.read=(v,y,f,g,C)=>(r.forceLoadFile(d),h(v,y,f,g,C)),_.mmap=(v,y,f,g,C)=>{r.forceLoadFile(d);var B=rn();if(!B)throw new r.ErrnoError(48);return h(v,Y,B,y,f),{ptr:B,allocated:!0}},d.stream_ops=_,d},absolutePath(){A("FS.absolutePath has been removed; use PATH_FS.resolve instead")},createFolder(){A("FS.createFolder has been removed; use FS.mkdir instead")},createLink(){A("FS.createLink has been removed; use FS.symlink instead")},joinPath(){A("FS.joinPath has been removed; use PATH.join instead")},mmapAlloc(){A("FS.mmapAlloc has been replaced by the top level function mmapAlloc")},standardizePath(){A("FS.standardizePath has been removed; use PATH.normalize instead")}},P={calculateAt(e,n,t){if(M.isAbs(n))return n;var s;if(e===-100?s=r.cwd():s=P.getStreamFromFD(e).path,n.length==0){if(!t)throw new r.ErrnoError(44);return s}return s+"/"+n},writeStat(e,n){D[e>>2]=n.dev,D[e+4>>2]=n.mode,D[e+8>>2]=n.nlink,D[e+12>>2]=n.uid,D[e+16>>2]=n.gid,D[e+20>>2]=n.rdev,W[e+24>>3]=BigInt(n.size),te[e+32>>2]=4096,te[e+36>>2]=n.blocks;var t=n.atime.getTime(),s=n.mtime.getTime(),o=n.ctime.getTime();return W[e+40>>3]=BigInt(Math.floor(t/1e3)),D[e+48>>2]=t%1e3*1e3*1e3,W[e+56>>3]=BigInt(Math.floor(s/1e3)),D[e+64>>2]=s%1e3*1e3*1e3,W[e+72>>3]=BigInt(Math.floor(o/1e3)),D[e+80>>2]=o%1e3*1e3*1e3,W[e+88>>3]=BigInt(n.ino),0},writeStatFs(e,n){D[e+4>>2]=n.bsize,D[e+60>>2]=n.bsize,W[e+8>>3]=BigInt(n.blocks),W[e+16>>3]=BigInt(n.bfree),W[e+24>>3]=BigInt(n.bavail),W[e+32>>3]=BigInt(n.files),W[e+40>>3]=BigInt(n.ffree),D[e+48>>2]=n.fsid,D[e+64>>2]=n.flags,D[e+56>>2]=n.namelen},doMsync(e,n,t,s,o){if(!r.isFile(n.node.mode))throw new r.ErrnoError(43);if(2&s)return 0;var a=me.slice(e,e+t);r.msync(n,a,o,t,s)},getStreamFromFD:e=>r.getStreamChecked(e),varargs:void 0,getStr:e=>Q(e)},Ee=(e,n,t)=>(c(typeof t=="number","stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"),tn(e,me,n,t)),Nn=(e,n)=>(c(n,"alignment argument is required"),Math.ceil(e/n)*n),In=e=>{var n=xe.buffer.byteLength,t=(e-n+65535)/65536|0;try{return xe.grow(t),$e(),1}catch(s){L(`growMemory: Attempted to grow heap from ${n} bytes to ${e} bytes, but got error: ${s}`)}},ln=[],$=e=>{var n=ln[e];return n||(ln[e]=n=We.get(e)),c(We.get(e)==n,"JavaScript-side Wasm function table mirror is out of date!"),n},dn=e=>mn(e),cn=(e,n,t,s,o)=>{var a={string:f=>{var g=0;return f!=null&&f!==0&&(g=(C=>{var B=Se(C)+1,q=dn(B);return Ee(C,q,B),q})(f)),g},array:f=>{var g,C,B=dn(f.length);return C=B,c((g=f).length>=0,"writeArrayToMemory array must have a length (should be an array or typed array)"),Y.set(g,C),B}},l=(f=>{var g=i["_"+f];return c(g,"Cannot call unknown function "+f+", make sure it is exported"),g})(e),d=[],_=0;if(c(n!=="array",'Return type should not be "array".'),s)for(var h=0;h<s.length;h++){var v=a[t[h]];v?(_===0&&(_=H()),d[h]=v(s[h])):d[h]=s[h]}var y=l(...d);return y=function(f){return _!==0&&K(_),function(g){return n==="string"?Q(g):n==="boolean"?!!g:g}(f)}(y)};r.createPreloadedFile=(e,n,t,s,o,a,l,d,_,h)=>{an(e,n,t,s,o,d,_,h).then(a).catch(l)},r.preloadFile=an,r.staticInit(),globalThis.crypto===void 0&&(globalThis.crypto=R("crypto"));var Dn=Date.now();if(i.noExitRuntime&&i.noExitRuntime,i.preloadPlugins&&(on=i.preloadPlugins),i.print&&(J=i.print),i.printErr&&(L=i.printErr),i.wasmBinary&&(z=i.wasmBinary),Fe("fetchSettings"),Fe("logReadFiles"),Fe("loadSplitModule"),i.arguments&&i.arguments,i.thisProgram&&i.thisProgram,c(i.memoryInitializerPrefixURL===void 0,"Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead"),c(i.pthreadMainPrefixURL===void 0,"Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead"),c(i.cdInitializerPrefixURL===void 0,"Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead"),c(i.filePackagePrefixURL===void 0,"Module.filePackagePrefixURL option was removed, use Module.locateFile instead"),c(i.read===void 0,"Module.read option was removed"),c(i.readAsync===void 0,"Module.readAsync option was removed (modify readAsync in JS)"),c(i.readBinary===void 0,"Module.readBinary option was removed (modify readBinary in JS)"),c(i.setWindowTitle===void 0,"Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)"),c(i.TOTAL_MEMORY===void 0,"Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY"),c(i.ENVIRONMENT===void 0,"Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)"),c(i.STACK_SIZE===void 0,"STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time"),c(i.wasmMemory===void 0,"Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally"),c(i.INITIAL_MEMORY===void 0,"Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically"),i.preInit)for(typeof i.preInit=="function"&&(i.preInit=[i.preInit]);i.preInit.length>0;)i.preInit.shift()();we("preInit"),i.ccall=cn,i.cwrap=(e,n,t,s)=>(...o)=>cn(e,n,t,o),i.setValue=function(e,n,t="i8"){switch(t.endsWith("*")&&(t="*"),t){case"i1":case"i8":Y[e]=n;break;case"i16":le[e>>1]=n;break;case"i32":te[e>>2]=n;break;case"i64":W[e>>3]=BigInt(n);break;case"float":Ae[e>>2]=n;break;case"double":Re[e>>3]=n;break;case"*":D[e>>2]=n;break;default:A(`invalid type for setValue: ${t}`)}},i.getValue=Le,i.PATH=M,i.PATH_FS=re,i.UTF8ToString=Q,i.stringToUTF8=Ee,i.lengthBytesUTF8=Se,i.FS=r,["writeI53ToI64","writeI53ToI64Clamped","writeI53ToI64Signaling","writeI53ToU64Clamped","writeI53ToU64Signaling","readI53FromI64","readI53FromU64","convertI32PairToI53","convertI32PairToI53Checked","convertU32PairToI53","getTempRet0","setTempRet0","createNamedFunction","zeroMemory","exitJS","withStackSave","inetPton4","inetNtop4","inetPton6","inetNtop6","readSockaddr","writeSockaddr","readEmAsmArgs","jstoi_q","getExecutableName","autoResumeAudioContext","getDynCaller","dynCall","handleException","keepRuntimeAlive","runtimeKeepalivePush","runtimeKeepalivePop","callUserCallback","maybeExit","asmjsMangle","HandleAllocator","addOnInit","addOnPostCtor","addOnPreMain","addOnExit","STACK_SIZE","STACK_ALIGN","POINTER_SIZE","ASSERTIONS","convertJsFunctionToWasm","getEmptyTableSlot","updateTableMap","getFunctionAddress","addFunction","removeFunction","intArrayToString","AsciiToString","stringToAscii","UTF16ToString","stringToUTF16","lengthBytesUTF16","UTF32ToString","stringToUTF32","lengthBytesUTF32","stringToNewUTF8","registerKeyEventCallback","maybeCStringToJsString","findEventTarget","getBoundingClientRect","fillMouseEventData","registerMouseEventCallback","registerWheelEventCallback","registerUiEventCallback","registerFocusEventCallback","fillDeviceOrientationEventData","registerDeviceOrientationEventCallback","fillDeviceMotionEventData","registerDeviceMotionEventCallback","screenOrientation","fillOrientationChangeEventData","registerOrientationChangeEventCallback","fillFullscreenChangeEventData","registerFullscreenChangeEventCallback","JSEvents_requestFullscreen","JSEvents_resizeCanvasForFullscreen","registerRestoreOldStyle","hideEverythingExceptGivenElement","restoreHiddenElements","setLetterbox","softFullscreenResizeWebGLRenderTarget","doRequestFullscreen","fillPointerlockChangeEventData","registerPointerlockChangeEventCallback","registerPointerlockErrorEventCallback","requestPointerLock","fillVisibilityChangeEventData","registerVisibilityChangeEventCallback","registerTouchEventCallback","fillGamepadEventData","registerGamepadEventCallback","registerBeforeUnloadEventCallback","fillBatteryEventData","registerBatteryEventCallback","setCanvasElementSize","getCanvasElementSize","jsStackTrace","getCallstack","convertPCtoSourceLocation","getEnvStrings","checkWasiClock","wasiRightsToMuslOFlags","wasiOFlagsToMuslOFlags","safeSetTimeout","setImmediateWrapped","safeRequestAnimationFrame","clearImmediateWrapped","registerPostMainLoop","registerPreMainLoop","getPromise","makePromise","idsToPromises","makePromiseCallback","ExceptionInfo","findMatchingCatch","Browser_asyncPrepareDataCounter","isLeapYear","ydayFromDate","arraySum","addDays","getSocketFromFD","getSocketAddress","FS_mkdirTree","_setNetworkCallback","heapObjectForWebGLType","toTypedArrayIndex","webgl_enable_ANGLE_instanced_arrays","webgl_enable_OES_vertex_array_object","webgl_enable_WEBGL_draw_buffers","webgl_enable_WEBGL_multi_draw","webgl_enable_EXT_polygon_offset_clamp","webgl_enable_EXT_clip_control","webgl_enable_WEBGL_polygon_mode","emscriptenWebGLGet","computeUnpackAlignedImageSize","colorChannelsInGlTextureFormat","emscriptenWebGLGetTexPixelData","emscriptenWebGLGetUniform","webglGetUniformLocation","webglPrepareUniformLocationsBeforeFirstUse","webglGetLeftBracePos","emscriptenWebGLGetVertexAttrib","__glGetActiveAttribOrUniform","writeGLArray","registerWebGlEventCallback","runAndAbortIfError","ALLOC_NORMAL","ALLOC_STACK","allocate","writeStringToMemory","writeAsciiToMemory","allocateUTF8","allocateUTF8OnStack","demangle","stackTrace","getNativeTypeSize"].forEach(function(e){Ye(e)}),["run","out","err","callMain","abort","wasmExports","HEAPF32","HEAPF64","HEAP8","HEAP16","HEAPU16","HEAP32","HEAPU32","HEAP64","HEAPU64","writeStackCookie","checkStackCookie","INT53_MAX","INT53_MIN","bigintToI53Checked","stackSave","stackRestore","stackAlloc","ptrToString","getHeapMax","growMemory","ENV","ERRNO_CODES","strError","DNS","Protocols","Sockets","timers","warnOnce","readEmAsmArgsArray","asyncLoad","alignMemory","mmapAlloc","wasmTable","wasmMemory","getUniqueRunDependency","noExitRuntime","addRunDependency","removeRunDependency","addOnPreRun","addOnPostRun","freeTableIndexes","functionsInTableMap","UTF8Decoder","UTF8ArrayToString","stringToUTF8Array","intArrayFromString","UTF16Decoder","stringToUTF8OnStack","writeArrayToMemory","JSEvents","specialHTMLTargets","findCanvasEventTarget","currentFullscreenStrategy","restoreOldWindowedStyle","UNWIND_CACHE","ExitStatus","doReadv","doWritev","initRandomFill","randomFill","emSetImmediate","emClearImmediate_deps","emClearImmediate","promiseMap","uncaughtExceptionCount","exceptionLast","exceptionCaught","Browser","requestFullscreen","requestFullScreen","setCanvasSize","getUserMedia","createContext","getPreloadedImageData__data","wget","MONTH_DAYS_REGULAR","MONTH_DAYS_LEAP","MONTH_DAYS_REGULAR_CUMULATIVE","MONTH_DAYS_LEAP_CUMULATIVE","SYSCALLS","preloadPlugins","FS_createPreloadedFile","FS_preloadFile","FS_modeStringToFlags","FS_getMode","FS_stdin_getChar_buffer","FS_stdin_getChar","FS_unlink","FS_createPath","FS_createDevice","FS_readFile","FS_root","FS_mounts","FS_devices","FS_streams","FS_nextInode","FS_nameTable","FS_currentPath","FS_initialized","FS_ignorePermissions","FS_filesystems","FS_syncFSRequests","FS_lookupPath","FS_getPath","FS_hashName","FS_hashAddNode","FS_hashRemoveNode","FS_lookupNode","FS_createNode","FS_destroyNode","FS_isRoot","FS_isMountpoint","FS_isFile","FS_isDir","FS_isLink","FS_isChrdev","FS_isBlkdev","FS_isFIFO","FS_isSocket","FS_flagsToPermissionString","FS_nodePermissions","FS_mayLookup","FS_mayCreate","FS_mayDelete","FS_mayOpen","FS_checkOpExists","FS_nextfd","FS_getStreamChecked","FS_getStream","FS_createStream","FS_closeStream","FS_dupStream","FS_doSetAttr","FS_chrdev_stream_ops","FS_major","FS_minor","FS_makedev","FS_registerDevice","FS_getDevice","FS_getMounts","FS_syncfs","FS_mount","FS_unmount","FS_lookup","FS_mknod","FS_statfs","FS_statfsStream","FS_statfsNode","FS_create","FS_mkdir","FS_mkdev","FS_symlink","FS_rename","FS_rmdir","FS_readdir","FS_readlink","FS_stat","FS_fstat","FS_lstat","FS_doChmod","FS_chmod","FS_lchmod","FS_fchmod","FS_doChown","FS_chown","FS_lchown","FS_fchown","FS_doTruncate","FS_truncate","FS_ftruncate","FS_utime","FS_open","FS_close","FS_isClosed","FS_llseek","FS_read","FS_write","FS_mmap","FS_msync","FS_ioctl","FS_writeFile","FS_cwd","FS_chdir","FS_createDefaultDirectories","FS_createDefaultDevices","FS_createSpecialDirectories","FS_createStandardStreams","FS_staticInit","FS_init","FS_quit","FS_findObject","FS_analyzePath","FS_createFile","FS_createDataFile","FS_forceLoadFile","FS_createLazyFile","FS_absolutePath","FS_createFolder","FS_createLink","FS_joinPath","FS_mmapAlloc","FS_standardizePath","MEMFS","TTY","PIPEFS","SOCKFS","tempFixedLengthArray","miniTempWebGLFloatBuffers","miniTempWebGLIntBuffers","GL","AL","GLUT","EGL","GLEW","IDBStore","SDL","SDL_gfx","print","printErr","jstoi_s"].forEach(Ye),i._free=k("_free"),i._malloc=k("_malloc"),i._mp_sched_keyboard_interrupt=k("_mp_sched_keyboard_interrupt"),i._mp_js_init=k("_mp_js_init"),i._mp_js_register_js_module=k("_mp_js_register_js_module"),i._mp_js_do_import=k("_mp_js_do_import"),i._proxy_convert_mp_to_js_obj_cside=k("_proxy_convert_mp_to_js_obj_cside"),i._mp_js_do_exec=k("_mp_js_do_exec"),i._mp_js_do_exec_async=k("_mp_js_do_exec_async"),i._mp_js_repl_init=k("_mp_js_repl_init"),i._mp_js_repl_process_char=k("_mp_js_repl_process_char"),i._mp_js_register_romfs=k("_mp_js_register_romfs"),i._mp_hal_get_interrupt_char=k("_mp_hal_get_interrupt_char"),i._proxy_c_init=k("_proxy_c_init"),i._proxy_c_free_obj=k("_proxy_c_free_obj"),i._proxy_c_to_js_call=k("_proxy_c_to_js_call"),i._proxy_c_to_js_dir=k("_proxy_c_to_js_dir"),i._proxy_c_to_js_has_attr=k("_proxy_c_to_js_has_attr"),i._proxy_c_to_js_lookup_attr=k("_proxy_c_to_js_lookup_attr"),i._proxy_c_to_js_store_attr=k("_proxy_c_to_js_store_attr"),i._proxy_c_to_js_delete_attr=k("_proxy_c_to_js_delete_attr"),i._proxy_c_to_js_get_type=k("_proxy_c_to_js_get_type"),i._proxy_c_to_js_get_array=k("_proxy_c_to_js_get_array"),i._proxy_c_to_js_get_dict=k("_proxy_c_to_js_get_dict"),i._proxy_c_to_js_get_iter=k("_proxy_c_to_js_get_iter"),i._proxy_c_to_js_iternext=k("_proxy_c_to_js_iternext"),i._proxy_c_to_js_resume=k("_proxy_c_to_js_resume");var _n=k("_fflush"),fn=k("_strerror"),ze=k("_emscripten_stack_get_end"),X=k("_setThrew"),un=k("_emscripten_stack_init"),pn=k("__emscripten_stack_restore"),mn=k("__emscripten_stack_alloc"),hn=k("_emscripten_stack_get_current"),xe=k("wasmMemory"),We=k("wasmTable"),gn,be,yn={__syscall_chdir:function(e){try{return e=P.getStr(e),r.chdir(e),0}catch(n){if(r===void 0||n.name!=="ErrnoError")throw n;return-n.errno}},__syscall_fstat64:function(e,n){try{return P.writeStat(n,r.fstat(e))}catch(t){if(r===void 0||t.name!=="ErrnoError")throw t;return-t.errno}},__syscall_getcwd:function(e,n){try{if(n===0)return-28;var t=r.cwd(),s=Se(t)+1;return n<s?-68:(Ee(t,e,n),s)}catch(o){if(r===void 0||o.name!=="ErrnoError")throw o;return-o.errno}},__syscall_getdents64:function(e,n,t){try{var s=P.getStreamFromFD(e);s.getdents||=r.readdir(s.path);for(var o=0,a=r.llseek(s,0,1),l=Math.floor(a/280),d=Math.min(s.getdents.length,l+Math.floor(t/280)),_=l;_<d;_++){var h,v,y=s.getdents[_];if(y===".")h=s.node.id,v=4;else if(y==="..")h=r.lookupPath(s.path,{parent:!0}).node.id,v=4;else{var f;try{f=r.lookupNode(s.node,y)}catch(g){if(g?.errno===28)continue;throw g}h=f.id,v=r.isChrdev(f.mode)?2:r.isDir(f.mode)?4:r.isLink(f.mode)?10:8}c(h),W[n+o>>3]=BigInt(h),W[n+o+8>>3]=BigInt(280*(_+1)),le[n+o+16>>1]=280,Y[n+o+18]=v,Ee(y,n+o+19,256),o+=280}return r.llseek(s,280*_,0),o}catch(g){if(r===void 0||g.name!=="ErrnoError")throw g;return-g.errno}},__syscall_lstat64:function(e,n){try{return e=P.getStr(e),P.writeStat(n,r.lstat(e))}catch(t){if(r===void 0||t.name!=="ErrnoError")throw t;return-t.errno}},__syscall_mkdirat:function(e,n,t){try{return n=P.getStr(n),n=P.calculateAt(e,n),r.mkdir(n,t,0),0}catch(s){if(r===void 0||s.name!=="ErrnoError")throw s;return-s.errno}},__syscall_newfstatat:function(e,n,t,s){try{n=P.getStr(n);var o=256&s,a=4096&s;return c(!(s&=-6401),`unknown flags in __syscall_newfstatat: ${s}`),n=P.calculateAt(e,n,a),P.writeStat(t,o?r.lstat(n):r.stat(n))}catch(l){if(r===void 0||l.name!=="ErrnoError")throw l;return-l.errno}},__syscall_openat:function(e,n,t,s){P.varargs=s;try{n=P.getStr(n),n=P.calculateAt(e,n);var o=s?(()=>{c(P.varargs!=null);var a=te[+P.varargs>>2];return P.varargs+=4,a})():0;return r.open(n,t,o).fd}catch(a){if(r===void 0||a.name!=="ErrnoError")throw a;return-a.errno}},__syscall_poll:function(e,n,t){try{for(var s=0,o=0;o<n;o++){var a=e+8*o,l=te[a>>2],d=le[a+4>>1],_=32,h=r.getStream(l);h&&(_=h.stream_ops.poll?h.stream_ops.poll(h,-1):5),(_&=24|d)&&s++,le[a+6>>1]=_}return s||t==0||de("non-zero poll() timeout not supported: "+t),s}catch(v){if(r===void 0||v.name!=="ErrnoError")throw v;return-v.errno}},__syscall_renameat:function(e,n,t,s){try{return n=P.getStr(n),s=P.getStr(s),n=P.calculateAt(e,n),s=P.calculateAt(t,s),r.rename(n,s),0}catch(o){if(r===void 0||o.name!=="ErrnoError")throw o;return-o.errno}},__syscall_rmdir:function(e){try{return e=P.getStr(e),r.rmdir(e),0}catch(n){if(r===void 0||n.name!=="ErrnoError")throw n;return-n.errno}},__syscall_stat64:function(e,n){try{return e=P.getStr(e),P.writeStat(n,r.stat(e))}catch(t){if(r===void 0||t.name!=="ErrnoError")throw t;return-t.errno}},__syscall_statfs64:function(e,n,t){try{return c(n===88),P.writeStatFs(t,r.statfs(P.getStr(e))),0}catch(s){if(r===void 0||s.name!=="ErrnoError")throw s;return-s.errno}},__syscall_unlinkat:function(e,n,t){try{if(n=P.getStr(n),n=P.calculateAt(e,n),t){if(t!==512)return-28;r.rmdir(n)}else r.unlink(n);return 0}catch(s){if(r===void 0||s.name!=="ErrnoError")throw s;return-s.errno}},_abort_js:()=>A("native code called abort()"),_emscripten_throw_longjmp:()=>{throw 1/0},call0:function(e,n){j((0,proxy_js_ref[e])(),n)},call0_kwarg:function(e,n,t,s,o,a){const l=proxy_js_ref[e],d={};for(let h=0;h<t;++h){const v=Q(Le(s+4*h,"i32")),y=F(o+3*h*4);d[v]=y}let _;_=n?l.call(d):l(d),j(_,a)},call1:function(e,n,t,s){const o=F(t),a=proxy_js_ref[e];let l;l=n?a.call(o):a(o),j(l,s)},call2:function(e,n,t,s,o){const a=F(t),l=F(s),d=proxy_js_ref[e];let _;_=n?d.call(a,l):d(a,l),j(_,o)},calln:function(e,n,t,s,o){const a=proxy_js_ref[e],l=[];for(let _=0;_<t;++_){const h=F(s+3*_*4);l.push(h)}let d;d=n?a.call(...l):a(...l),j(d,o)},calln_kwarg:function(e,n,t,s,o,a,l,d){const _=proxy_js_ref[e],h=[];for(let f=0;f<t;++f){const g=F(s+3*f*4);h.push(g)}const v={};for(let f=0;f<o;++f){const g=Q(Le(a+4*f,"i32")),C=F(l+3*f*4);v[g]=C}let y;y=n?_.call(...h,v):_(...h,v),j(y,d)},create_promise:function(e,n){const t=F(e);j(new Promise(t),n)},emscripten_resize_heap:e=>{var n=me.length;if(c((e>>>=0)>n),e>2147483648)return L(`Cannot enlarge memory, requested ${e} bytes, but the limit is 2147483648 bytes!`),!1;for(var t=1;t<=4;t*=2){var s=n*(1+.2/t);s=Math.min(s,e+100663296);var o=Math.min(2147483648,Nn(Math.max(e,s),65536));if(In(o))return!0}return L(`Failed to grow the heap from ${n} bytes to ${o} bytes, not enough memory!`),!1},fd_close:function(e){try{var n=P.getStreamFromFD(e);return r.close(n),0}catch(t){if(r===void 0||t.name!=="ErrnoError")throw t;return t.errno}},fd_read:function(e,n,t,s){try{var o=((a,l,d,_)=>{for(var h=0,v=0;v<d;v++){var y=D[l>>2],f=D[l+4>>2];l+=8;var g=r.read(a,Y,y,f,_);if(g<0)return-1;if(h+=g,g<f)break;_!==void 0&&(_+=g)}return h})(P.getStreamFromFD(e),n,t);return D[s>>2]=o,0}catch(a){if(r===void 0||a.name!=="ErrnoError")throw a;return a.errno}},fd_seek:function(e,n,t,s){var o;n=(o=n)<-9007199254740992||o>9007199254740992?NaN:Number(o);try{if(isNaN(n))return 61;var a=P.getStreamFromFD(e);return r.llseek(a,n,t),W[s>>3]=BigInt(a.position),a.getdents&&n===0&&t===0&&(a.getdents=null),0}catch(l){if(r===void 0||l.name!=="ErrnoError")throw l;return l.errno}},fd_sync:function(e){try{var n=P.getStreamFromFD(e),t=n.stream_ops?.fsync?.(n);return t}catch(s){if(r===void 0||s.name!=="ErrnoError")throw s;return s.errno}},fd_write:function(e,n,t,s){try{var o=((a,l,d,_)=>{for(var h=0,v=0;v<d;v++){var y=D[l>>2],f=D[l+4>>2];l+=8;var g=r.write(a,Y,y,f,_);if(g<0)return-1;if(h+=g,g<f)break;_!==void 0&&(_+=g)}return h})(P.getStreamFromFD(e),n,t);return D[s>>2]=o,0}catch(a){if(r===void 0||a.name!=="ErrnoError")throw a;return a.errno}},has_attr:function(e,n){const t=proxy_js_ref[e];return Q(n)in t},invoke_i:function(e){var n=H();try{return $(e)()}catch(t){if(K(n),t!==t+0)throw t;X(1,0)}},invoke_ii:function(e,n){var t=H();try{return $(e)(n)}catch(s){if(K(t),s!==s+0)throw s;X(1,0)}},invoke_iii:function(e,n,t){var s=H();try{return $(e)(n,t)}catch(o){if(K(s),o!==o+0)throw o;X(1,0)}},invoke_iiii:function(e,n,t,s){var o=H();try{return $(e)(n,t,s)}catch(a){if(K(o),a!==a+0)throw a;X(1,0)}},invoke_iiiii:function(e,n,t,s,o){var a=H();try{return $(e)(n,t,s,o)}catch(l){if(K(a),l!==l+0)throw l;X(1,0)}},invoke_iiiiii:function(e,n,t,s,o,a){var l=H();try{return $(e)(n,t,s,o,a)}catch(d){if(K(l),d!==d+0)throw d;X(1,0)}},invoke_v:function(e){var n=H();try{$(e)()}catch(t){if(K(n),t!==t+0)throw t;X(1,0)}},invoke_vi:function(e,n){var t=H();try{$(e)(n)}catch(s){if(K(t),s!==s+0)throw s;X(1,0)}},invoke_vii:function(e,n,t){var s=H();try{$(e)(n,t)}catch(o){if(K(s),o!==o+0)throw o;X(1,0)}},invoke_viii:function(e,n,t,s){var o=H();try{$(e)(n,t,s)}catch(a){if(K(o),a!==a+0)throw a;X(1,0)}},invoke_viiii:function(e,n,t,s,o){var a=H();try{$(e)(n,t,s,o)}catch(l){if(K(a),l!==l+0)throw l;X(1,0)}},js_check_existing:function(e){return function(n){const t=globalThis.proxy_js_map.get(n)?.deref();if(t===void 0)return-1;for(let s=0;s<globalThis.proxy_js_existing.length;++s)if(globalThis.proxy_js_existing[s]===void 0)return globalThis.proxy_js_existing[s]=t,s;return globalThis.proxy_js_existing.push(t),globalThis.proxy_js_existing.length-1}(e)},js_get_error_info:function(e,n,t){const s=proxy_js_ref[e];j(s.name,n),j(s.message,t)},js_get_iter:function(e,n){j(proxy_js_ref[e][Symbol.iterator](),n)},js_get_proxy_js_ref_info:function(e){let n=0;for(const t of proxy_js_ref)t!==void 0&&++n;i.setValue(e,proxy_js_ref.length,"i32"),i.setValue(e+4,n,"i32")},js_iter_next:function(e,n){const t=proxy_js_ref[e].next();return!t.done&&(j(t.value,n),!0)},js_reflect_construct:function(e,n,t,s){const o=proxy_js_ref[e],a=[];for(let l=0;l<n;++l)a.push(F(t+3*l*4));j(Reflect.construct(o,a),s)},js_subscr_load:function(e,n,t){const s=proxy_js_ref[e],o=function(a,l){let d=l;if(typeof d=="number"&&(d<0&&(d+=a.length),d<0||d>=a.length))throw new wn("IndexError","index out of range");return d}(s,F(n));j(s[o],t)},js_subscr_store:function(e,n,t){proxy_js_ref[e][F(n)]=F(t)},js_then_continue:function(e,n,t,s,o){const a=F(n),l=F(t),d=F(s);j(proxy_js_ref[e].then(_=>{a(_,null,l,d)},_=>{a(null,_,l,d)}),o)},js_then_reject:function(e,n){let t;try{t=F(e)}catch(s){t=s}F(n)(t)},js_then_resolve:function(e,n){const t=F(e);F(n)(t)},lookup_attr:function(e,n,t){const s=proxy_js_ref[e],o=Q(n);let a=s[o];return a!==void 0||o in s?(j(a,t),typeof a!="function"||"_ref"in a?1:2):0},mp_js_random_u32:()=>globalThis.crypto.getRandomValues(new Uint32Array(1))[0],mp_js_ticks_ms:()=>Date.now()-Dn,mp_js_time_ms:()=>Date.now(),proxy_convert_mp_to_js_then_js_to_js_then_js_to_mp_obj_jsside:function(e){const n=F(e);j(ee.toJs(n),e)},proxy_convert_mp_to_js_then_js_to_mp_obj_jsside:function(e){(function(n,t){Sn(n,t,!1)})(F(e),e)},proxy_js_free_obj:function(e){e>=vn&&(proxy_js_ref_map.delete(proxy_js_ref[e]),proxy_js_ref[e]=void 0,e<proxy_js_ref_next&&(proxy_js_ref_next=e))},store_attr:function(e,n,t){const s=Q(n),o=F(t);proxy_js_ref[e][s]=o}};function Mn(){var e;un(),c(!(3&(e=ze()))),e==0&&(e+=4),D[e>>2]=34821223,D[e+4>>2]=2310721022,D[0]=1668509029}be=await async function(){function e(s,o){return function(a){c(a.free!==void 0,"missing Wasm export: free"),c(a.malloc!==void 0,"missing Wasm export: malloc"),c(a.mp_sched_keyboard_interrupt!==void 0,"missing Wasm export: mp_sched_keyboard_interrupt"),c(a.mp_js_init!==void 0,"missing Wasm export: mp_js_init"),c(a.mp_js_register_js_module!==void 0,"missing Wasm export: mp_js_register_js_module"),c(a.mp_js_do_import!==void 0,"missing Wasm export: mp_js_do_import"),c(a.proxy_convert_mp_to_js_obj_cside!==void 0,"missing Wasm export: proxy_convert_mp_to_js_obj_cside"),c(a.mp_js_do_exec!==void 0,"missing Wasm export: mp_js_do_exec"),c(a.mp_js_do_exec_async!==void 0,"missing Wasm export: mp_js_do_exec_async"),c(a.mp_js_repl_init!==void 0,"missing Wasm export: mp_js_repl_init"),c(a.mp_js_repl_process_char!==void 0,"missing Wasm export: mp_js_repl_process_char"),c(a.mp_js_register_romfs!==void 0,"missing Wasm export: mp_js_register_romfs"),c(a.mp_hal_get_interrupt_char!==void 0,"missing Wasm export: mp_hal_get_interrupt_char"),c(a.proxy_c_init!==void 0,"missing Wasm export: proxy_c_init"),c(a.proxy_c_free_obj!==void 0,"missing Wasm export: proxy_c_free_obj"),c(a.proxy_c_to_js_call!==void 0,"missing Wasm export: proxy_c_to_js_call"),c(a.proxy_c_to_js_dir!==void 0,"missing Wasm export: proxy_c_to_js_dir"),c(a.proxy_c_to_js_has_attr!==void 0,"missing Wasm export: proxy_c_to_js_has_attr"),c(a.proxy_c_to_js_lookup_attr!==void 0,"missing Wasm export: proxy_c_to_js_lookup_attr"),c(a.proxy_c_to_js_store_attr!==void 0,"missing Wasm export: proxy_c_to_js_store_attr"),c(a.proxy_c_to_js_delete_attr!==void 0,"missing Wasm export: proxy_c_to_js_delete_attr"),c(a.proxy_c_to_js_get_type!==void 0,"missing Wasm export: proxy_c_to_js_get_type"),c(a.proxy_c_to_js_get_array!==void 0,"missing Wasm export: proxy_c_to_js_get_array"),c(a.proxy_c_to_js_get_dict!==void 0,"missing Wasm export: proxy_c_to_js_get_dict"),c(a.proxy_c_to_js_get_iter!==void 0,"missing Wasm export: proxy_c_to_js_get_iter"),c(a.proxy_c_to_js_iternext!==void 0,"missing Wasm export: proxy_c_to_js_iternext"),c(a.proxy_c_to_js_resume!==void 0,"missing Wasm export: proxy_c_to_js_resume"),c(a.fflush!==void 0,"missing Wasm export: fflush"),c(a.strerror!==void 0,"missing Wasm export: strerror"),c(a.emscripten_stack_get_end!==void 0,"missing Wasm export: emscripten_stack_get_end"),c(a.emscripten_stack_get_base!==void 0,"missing Wasm export: emscripten_stack_get_base"),c(a.setThrew!==void 0,"missing Wasm export: setThrew"),c(a.emscripten_stack_init!==void 0,"missing Wasm export: emscripten_stack_init"),c(a.emscripten_stack_get_free!==void 0,"missing Wasm export: emscripten_stack_get_free"),c(a._emscripten_stack_restore!==void 0,"missing Wasm export: _emscripten_stack_restore"),c(a._emscripten_stack_alloc!==void 0,"missing Wasm export: _emscripten_stack_alloc"),c(a.emscripten_stack_get_current!==void 0,"missing Wasm export: emscripten_stack_get_current"),c(a.memory!==void 0,"missing Wasm export: memory"),c(a.__indirect_function_table!==void 0,"missing Wasm export: __indirect_function_table"),i._free=I("free",1),i._malloc=I("malloc",1),i._mp_sched_keyboard_interrupt=I("mp_sched_keyboard_interrupt",0),i._mp_js_init=I("mp_js_init",2),i._mp_js_register_js_module=I("mp_js_register_js_module",2),i._mp_js_do_import=I("mp_js_do_import",2),i._proxy_convert_mp_to_js_obj_cside=I("proxy_convert_mp_to_js_obj_cside",2),i._mp_js_do_exec=I("mp_js_do_exec",3),i._mp_js_do_exec_async=I("mp_js_do_exec_async",3),i._mp_js_repl_init=I("mp_js_repl_init",0),i._mp_js_repl_process_char=I("mp_js_repl_process_char",1),i._mp_js_register_romfs=I("mp_js_register_romfs",2),i._mp_hal_get_interrupt_char=I("mp_hal_get_interrupt_char",0),i._proxy_c_init=I("proxy_c_init",0),i._proxy_c_free_obj=I("proxy_c_free_obj",1),i._proxy_c_to_js_call=I("proxy_c_to_js_call",4),i._proxy_c_to_js_dir=I("proxy_c_to_js_dir",2),i._proxy_c_to_js_has_attr=I("proxy_c_to_js_has_attr",2),i._proxy_c_to_js_lookup_attr=I("proxy_c_to_js_lookup_attr",3),i._proxy_c_to_js_store_attr=I("proxy_c_to_js_store_attr",3),i._proxy_c_to_js_delete_attr=I("proxy_c_to_js_delete_attr",2),i._proxy_c_to_js_get_type=I("proxy_c_to_js_get_type",1),i._proxy_c_to_js_get_array=I("proxy_c_to_js_get_array",2),i._proxy_c_to_js_get_dict=I("proxy_c_to_js_get_dict",2),i._proxy_c_to_js_get_iter=I("proxy_c_to_js_get_iter",1),i._proxy_c_to_js_iternext=I("proxy_c_to_js_iternext",2),i._proxy_c_to_js_resume=I("proxy_c_to_js_resume",2),_n=I("fflush",1),fn=I("strerror",1),ze=a.emscripten_stack_get_end,a.emscripten_stack_get_base,X=I("setThrew",2),un=a.emscripten_stack_init,a.emscripten_stack_get_free,pn=a._emscripten_stack_restore,mn=a._emscripten_stack_alloc,hn=a.emscripten_stack_get_current,xe=a.memory,We=a.__indirect_function_table}(be=s.exports),$e(),be}var n=i,t={env:yn,wasi_snapshot_preview1:yn};return i.instantiateWasm?new Promise((s,o)=>{try{i.instantiateWasm(t,(a,l)=>{s(e(a))})}catch(a){L(`Module.instantiateWasm callback failed with error: ${a}`),o(a)}}):(Oe??=En(),function(s){return c(i===n,"the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?"),n=null,e(s.instance)}(await kn(z,Oe,t)))}(),function e(){function n(){c(!gn),gn=!0,i.calledRun=!0,ve||(c(!he),he=!0,De(),i.noFSInit||r.initialized||r.init(),be.__wasm_call_ctors(),r.ignorePermissions=!1,He?.(i),i.onRuntimeInitialized?.(),we("onRuntimeInitialized"),c(!i._main,'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]'),function(){if(De(),i.postRun)for(typeof i.postRun=="function"&&(i.postRun=[i.postRun]);i.postRun.length;)Tn(i.postRun.shift());we("postRun"),Je(Qe)}())}oe>0?ye=e:(Mn(),function(){if(i.preRun)for(typeof i.preRun=="function"&&(i.preRun=[i.preRun]);i.preRun.length;)Pn(i.preRun.shift());we("preRun"),Je(Ze)}(),oe>0?ye=e:(i.setStatus?(i.setStatus("Running..."),setTimeout(()=>{setTimeout(()=>i.setStatus(""),1),n()},1)):n(),De()))}(),u=he?i:new Promise((e,n)=>{He=e,Xe=n});for(const e of Object.keys(i))e in m||Object.defineProperty(m,e,{configurable:!0,get(){A(`Access to module property ('${e}') is no longer possible via the module constructor argument; Instead, use the result of the module constructor.`)}});return u}async function Ke(m){const{pystack:u,heapsize:i,url:b,stdin:w,stdout:T,stderr:x,linebuffer:R,romfs:N}=Object.assign({pystack:2048,heapsize:1048576,linebuffer:!0},m);let p={locateFile:(S,O)=>b||O+S};p._textDecoder=new TextDecoder,w!==void 0&&(p.stdin=w),T!==void 0&&(R?(p._stdoutBuffer=[],p.stdout=S=>{S===10?(T(p._textDecoder.decode(new Uint8Array(p._stdoutBuffer))),p._stdoutBuffer=[]):p._stdoutBuffer.push(S)}):p.stdout=S=>T(new Uint8Array([S]))),x!==void 0&&(R?(p._stderrBuffer=[],p.stderr=S=>{S===10?(x(p._textDecoder.decode(new Uint8Array(p._stderrBuffer))),p._stderrBuffer=[]):p._stderrBuffer.push(S)}):p.stderr=S=>x(new Uint8Array([S]))),p=await An(p),globalThis.Module=p,nt();const U=S=>{const O=p._malloc(12);return p.ccall("mp_js_do_import","null",["string","pointer"],[S,O]),ie(O)};if(N!==void 0){const S=p._malloc(N.length);p.HEAPU8.set(N,S),p.ccall("mp_js_register_romfs","null",["pointer","number"],[S,N.length])}return p.ccall("mp_js_init","null",["number","number"],[u,i]),p.ccall("proxy_c_init","null",[],[]),{_module:p,PyProxy:ee,FS:p.FS,globals:{__dict__:U("__main__").__dict__,get(S){return this.__dict__[S]},set(S,O){this.__dict__[S]=O},delete(S){delete this.__dict__[S]}},registerJsModule(S,O){const z=p._malloc(12);j(O,z),p.ccall("mp_js_register_js_module","null",["string","pointer"],[S,z]),p._free(z)},pyimport:U,runPython(S){const O=p.lengthBytesUTF8(S),z=p._malloc(O+1);p.stringToUTF8(S,z,O+1);const J=p._malloc(12);return p.ccall("mp_js_do_exec","number",["pointer","number","pointer"],[z,O,J]),p._free(z),ie(J)},runPythonAsync(S){const O=p.lengthBytesUTF8(S),z=p._malloc(O+1);p.stringToUTF8(S,z,O+1);const J=p._malloc(12);p.ccall("mp_js_do_exec_async","number",["pointer","number","pointer"],[z,O,J]),p._free(z);const L=ie(J);return L instanceof Ie?Promise.resolve(L):L},replInit(){p.ccall("mp_js_repl_init","null",["null"])},replProcessChar:S=>p.ccall("mp_js_repl_process_char","number",["number"],[S]),replProcessCharWithAsyncify:async S=>p.ccall("mp_js_repl_process_char","number",["number"],[S],{async:!0})}}if(globalThis.loadMicroPython=Ke,typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string"&&process.argv.length>1){const m=await import("./__vite-browser-external-9wXp6ZBx.js"),u=await import("./__vite-browser-external-9wXp6ZBx.js"),i=m.resolve(u.fileURLToPath(import.meta.url)),b=m.resolve(process.argv[1]);i.includes(b)&&async function(){const w=await import("./__vite-browser-external-9wXp6ZBx.js");let T=131072,x="",R=!0;for(let p=2;p<process.argv.length;p++)if(process.argv[p]==="-X"&&p<process.argv.length-1){if(process.argv[p+1].includes("heapsize=")){T=parseInt(process.argv[p+1].split("heapsize=")[1]);const U=process.argv[p+1].substr(-1).toLowerCase();U==="k"?T*=1024:U==="m"&&(T*=1048576),++p}}else x+=w.readFileSync(process.argv[p],"utf8"),R=!1;process.stdin.isTTY===!1&&(x=w.readFileSync(0,"utf8"),R=!1);const N=await Ke({heapsize:T,stdout:p=>process.stdout.write(p),linebuffer:!1});if(R)N.replInit(),process.stdin.setRawMode(!0),process.stdin.on("data",p=>{for(let U=0;U<p.length;U++)N.replProcessCharWithAsyncify(p[U]).then(S=>{S&&process.exit()})});else{if(x.endsWith(`asyncio.run(main())
`)){const p=N.pyimport("asyncio");p.run=async U=>{await p.create_task(U)}}try{N.runPython(x)}catch(p){if(p.name!=="PythonError")throw p;p.type==="SystemExit"||console.error(p.message)}}}()}class ee{constructor(u){this._ref=u}static toJs(u){if(!(u instanceof ee))return u;const i=Module.ccall("proxy_c_to_js_get_type","number",["number"],[u._ref]);if(i===1||i===2){const b=Module._malloc(8),w=Module._malloc(12);Module.ccall("proxy_c_to_js_get_array","null",["number","pointer"],[u._ref,b]);const T=Module.getValue(b,"i32"),x=Module.getValue(b+4,"i32"),R=[];for(let N=0;N<T;++N){Module.ccall("proxy_convert_mp_to_js_obj_cside","null",["pointer","pointer"],[Module.getValue(x+4*N,"i32"),w]);const p=F(w);R.push(ee.toJs(p))}return Module._free(b),Module._free(w),R}if(i===3){const b=Module._malloc(8),w=Module._malloc(12);Module.ccall("proxy_c_to_js_get_dict","null",["number","pointer"],[u._ref,b]);const T=Module.getValue(b,"i32"),x=Module.getValue(b+4,"i32"),R={};for(let N=0;N<T;++N){const p=Module.getValue(x+8*N,"i32");if(p>8){Module.ccall("proxy_convert_mp_to_js_obj_cside","null",["pointer","pointer"],[p,w]);const U=F(w),S=Module.getValue(x+8*N+4,"i32");Module.ccall("proxy_convert_mp_to_js_obj_cside","null",["pointer","pointer"],[S,w]);const O=F(w);R[U]=ee.toJs(O)}}return Module._free(b),Module._free(w),R}return u}}const Rn={isExtensible:()=>!0,ownKeys(m){const u=Module._malloc(12);Module.ccall("proxy_c_to_js_dir","null",["number","pointer"],[m._ref,u]);const i=ie(u);return ee.toJs(i).filter(b=>!b.startsWith("__"))},getOwnPropertyDescriptor:(m,u)=>({value:m[u],enumerable:!0,writable:!0,configurable:!0}),has:(m,u)=>typeof u!="string"?u===Symbol.iterator:Module.ccall("proxy_c_to_js_has_attr","number",["number","string"],[m._ref,u]),get(m,u){if(u==="_ref")return m._ref;if(u==="then"||typeof u!="string"){if(u===Symbol.iterator){const b=Module.ccall("proxy_c_to_js_get_iter","number",["number"],[m._ref]);return function*(){const w=Module._malloc(12);for(;Module.ccall("proxy_c_to_js_iternext","number",["number","pointer"],[b,w]);)yield F(w);Module._free(w)}}return}const i=Module._malloc(12);return Module.ccall("proxy_c_to_js_lookup_attr","null",["number","string","pointer"],[m._ref,u,i]),ie(i)},set(m,u,i){const b=Module._malloc(12);j(i,b);const w=Module.ccall("proxy_c_to_js_store_attr","number",["number","string","number"],[m._ref,u,b]);return Module._free(b),w},deleteProperty:(m,u)=>Module.ccall("proxy_c_to_js_delete_attr","number",["number","string"],[m._ref,u])};class Ie{constructor(u){this._ref=u}then(u,i){const b=Module._malloc(36);return j(u,b+12),j(i,b+24),Module.ccall("proxy_c_to_js_resume","null",["number","pointer"],[this._ref,b]),ie(b)}}const vn=2,Fn=-1,On=0,Ln=1,jn=2,Un=3,Bn=4,zn=5,Wn=6,qn=7,Gn=9,Vn=10,Kn=0,Hn=1,Xn=2,Yn=3,$n=4,Jn=5,Qn=6,Zn=7,et=8;class wn extends Error{constructor(u,i){super(i),this.name="PythonError",this.type=u}}function nt(){globalThis.proxy_js_ref=[globalThis,void 0],globalThis.proxy_js_ref_next=vn,globalThis.proxy_js_ref_map=new Map,globalThis.proxy_js_ref_map.set(globalThis,0),globalThis.proxy_js_map=new Map,globalThis.proxy_js_existing=[void 0],globalThis.pyProxyFinalizationRegistry=new FinalizationRegistry(m=>{globalThis.proxy_js_map.delete(m),Module.ccall("proxy_c_free_obj","null",["number"],[m])})}function Sn(m,u,i){let b;if(m===void 0)b=Kn;else if(m===null)b=Hn;else if(typeof m=="boolean")b=Xn,Module.setValue(u+4,m,"i32");else if(typeof m=="number")if(Number.isInteger(m))b=Yn,Module.setValue(u+4,m,"i32");else{b=$n;const w=u+4&-8;Module.setValue(w,m,"double");const T=Module.getValue(w,"i32"),x=Module.getValue(w+4,"i32");Module.setValue(u+4,T,"i32"),Module.setValue(u+8,x,"i32")}else if(typeof m=="string"){b=Jn;const w=Module.lengthBytesUTF8(m),T=Module._malloc(w+1);Module.stringToUTF8(m,T,w+1),Module.setValue(u+4,w,"i32"),Module.setValue(u+8,T,"i32")}else if(i&&(m instanceof ee||typeof m=="function"&&"_ref"in m||m instanceof Ie))b=et,Module.setValue(u+4,m._ref,"i32");else{let w;const T=proxy_js_ref_map.get(m);T!==void 0?(b=Qn,w=T):(b=Zn,w=function(x){for(;proxy_js_ref_next<proxy_js_ref.length;){if(proxy_js_ref[proxy_js_ref_next]===void 0){const N=proxy_js_ref_next;return++proxy_js_ref_next,proxy_js_ref[N]=x,proxy_js_ref_map.set(x,N),N}++proxy_js_ref_next}const R=proxy_js_ref.length;return proxy_js_ref[R]=x,proxy_js_ref_next=proxy_js_ref.length,proxy_js_ref_map.set(x,R),R}(m)),Module.setValue(u+4,w,"i32")}Module.setValue(u+0,b,"i32")}function j(m,u){Sn(m,u,!0)}function F(m){const u=Module.getValue(m,"i32");let i;if(u===Fn){const b=Module.getValue(m+4,"i32"),w=Module.getValue(m+8,"i32"),T=Module.UTF8ToString(w,b);Module._free(w);const x=T.split("");throw new wn(x[0],x[1])}if(u===On)throw new Error("NULL object");if(u===Ln)i=null;else if(u===jn)i=!!Module.getValue(m+4,"i32");else if(u===Un)i=Module.getValue(m+4,"i32");else if(u===Bn){const b=m+4&-8,w=Module.getValue(m+4,"i32"),T=Module.getValue(m+8,"i32");Module.setValue(b,w,"i32"),Module.setValue(b+4,T,"i32"),i=Module.getValue(b,"double")}else if(u===zn){const b=Module.getValue(m+4,"i32"),w=Module.getValue(m+8,"i32");i=Module.UTF8ToString(w,b)}else if(u===Gn){const b=Module.getValue(m+4,"i32");i=proxy_js_ref[b]}else if(u===Vn){const b=Module.getValue(m+4,"i32");i=globalThis.proxy_js_existing[b],globalThis.proxy_js_existing[b]=void 0}else{const b=Module.getValue(m+4,"i32");if(u===Wn)i=(...w)=>function(T,x){let R=0;for(;x.length>0&&x[x.length-1]===void 0;)x.pop();if(x.length>0){R=Module._malloc(3*x.length*4);for(const U in x)j(x[U],R+3*U*4)}const N=Module._malloc(12);Module.ccall("proxy_c_to_js_call","null",["number","number","number","pointer"],[T,x.length,R,N]),x.length>0&&Module._free(R);const p=ie(N);return p instanceof Ie?Promise.resolve(p):p}(b,w),i._ref=b;else if(u===qn)i=new Ie(b);else{const w=new ee(b);i=new Proxy(w,Rn)}globalThis.pyProxyFinalizationRegistry.register(i,b),globalThis.proxy_js_map.set(b,new WeakRef(i))}return i}function ie(m){const u=F(m);return Module._free(m),u}var tt="/assets/micropython-DXFUqjrr.wasm";const rt=`
def __snakie_install_machine():
    import sys, math, time
    # MicroPython's minimal types module has no ModuleType, so use a class as the
    # module namespace -- sys.modules can hold any object with the right attrs.
    class _machine_ns:
        pass
    m = _machine_ns

    class Pin:
        IN=0; OUT=1; OPEN_DRAIN=2
        PULL_UP=1; PULL_DOWN=2; PULL_HOLD=4
        IRQ_RISING=1; IRQ_FALLING=2
        def __init__(self, id, mode=-1, pull=-1, value=None):
            self.id=id; self._mode=mode; self._pull=pull
            self._v=1 if value else 0
        def init(self, mode=-1, pull=-1, value=None):
            if value is not None: self._v=1 if value else 0
        def value(self, v=None):
            if v is None: return self._v
            self._v=1 if v else 0
        def on(self): self._v=1
        def off(self): self._v=0
        def high(self): self._v=1
        def low(self): self._v=0
        def toggle(self): self._v^=1
        def irq(self, *a, **k): return None
        def __call__(self, v=None): return self.value(v)
    m.Pin=Pin

    class Signal(Pin):
        def __init__(self, pin, invert=False, **k):
            super().__init__(getattr(pin,'id',pin)); self._inv=invert

    class PWM:
        def __init__(self, dest, freq=None, duty_u16=None, duty_ns=None):
            self._pin=dest; self._freq=freq or 0; self._duty=duty_u16 or 0
        def freq(self, f=None):
            if f is None: return self._freq
            self._freq=f
        def duty_u16(self, d=None):
            if d is None: return self._duty
            self._duty=d
        def duty_ns(self, d=None):
            if d is None: return 0
        def duty(self, d=None):
            if d is None: return self._duty>>10
            self._duty=d<<10
        def init(self, *a, **k): pass
        def deinit(self): pass
    m.PWM=PWM

    class ADC:
        CORE_TEMP=4
        def __init__(self, pin, **k): self._pin=pin
        def read_u16(self):
            # gently varying so a plotted "sensor" moves
            return int(32768 + 24000*math.sin(time.ticks_ms()/700.0)) & 0xFFFF
        def read_uv(self): return self.read_u16()*50
        def read(self): return self.read_u16()>>4
    m.ADC=ADC

    class _Bus:
        def __init__(self, *a, **k): pass
        def scan(self): return []
        def readfrom(self, addr, n, *a): return bytes(n)
        def readfrom_into(self, addr, buf, *a): return None
        def writeto(self, addr, buf, *a): return len(buf) if hasattr(buf,'__len__') else 0
        def readfrom_mem(self, addr, memaddr, n, *a): return bytes(n)
        def writeto_mem(self, addr, memaddr, buf, *a): return None
        def read(self, n=1, *a): return bytes(n)
        def write(self, buf, *a): return None
        def init(self, *a, **k): pass
        def deinit(self): pass
        def any(self): return 0
    m.I2C=_Bus; m.SoftI2C=_Bus; m.SPI=_Bus; m.SoftSPI=_Bus; m.UART=_Bus

    class Timer:
        ONE_SHOT=0; PERIODIC=1
        def __init__(self, *a, **k): pass
        def init(self, *a, **k): pass   # callbacks don't fire on the blocking sim
        def deinit(self): pass
    m.Timer=Timer

    class RTC:
        def __init__(self, *a, **k): pass
        def datetime(self, dt=None): return (2026,1,1,3,0,0,0,0)
        def init(self, *a, **k): pass
    m.RTC=RTC

    class WDT:
        def __init__(self, *a, **k): pass
        def feed(self): pass
    m.WDT=WDT

    def freq(f=None): return 125000000 if f is None else None
    def unique_id(): return b'SNAKIEsim'
    def reset(): pass
    def soft_reset(): pass
    def disable_irq(): return 0
    def enable_irq(state=0): pass
    def idle(): pass
    def lightsleep(*a): pass
    def deepsleep(*a): pass
    def bootloader(*a): pass
    for _n,_f in (('freq',freq),('unique_id',unique_id),('reset',reset),
                  ('soft_reset',soft_reset),('disable_irq',disable_irq),
                  ('enable_irq',enable_irq),('idle',idle),('lightsleep',lightsleep),
                  ('deepsleep',deepsleep),('bootloader',bootloader)):
        setattr(m,_n,_f)

    sys.modules['machine']=m

__snakie_install_machine()
del __snakie_install_machine
`;var st=`# SPDX-License-Identifier: MIT
"""Piezo-buzzer tone + RTTTL melody helper (Snakie module #120).

This is the driver behind the dock **Buzzer** instrument. It plays single tones
and parses/plays RTTTL ringtone strings on a PWM-driven piezo buzzer.

Usage on a board::

    from buzzer import Buzzer
    bz = Buzzer(pin=15)
    bz.tone(440, 200)                    # A4 for 200 ms
    bz.play_rtttl('beep:d=4,o=5,b=120:c,e,g')

The note-name → frequency mapping (\`note_to_freq\`) and the RTTTL header/note
parser (\`parse_rtttl\`) are pure and unit-testable under CPython without PWM.
"""

# Equal-tempered semitone offsets from C within an octave.
_SEMITONE = {"c": 0, "d": 2, "e": 4, "f": 5, "g": 7, "a": 9, "b": 11}


def note_to_freq(name, octave):
    """Return the frequency (Hz, rounded) of a note like \`\`'c'\`\` / \`\`'a#'\`\`. Pure.

    \`octave\` is the scientific octave (A4 = 440 Hz at octave 4). A rest (\`\`'p'\`\`)
    returns \`\`0\`\` so the player just delays silently.
    """
    name = name.lower()
    if name.startswith("p"):
        return 0
    semitone = _SEMITONE[name[0]]
    if len(name) > 1 and name[1] == "#":
        semitone += 1
    # MIDI note number, with A4 (440 Hz) = MIDI 69.
    midi = (octave + 1) * 12 + semitone
    return int(round(440.0 * (2.0 ** ((midi - 69) / 12.0))))


def parse_rtttl(tune):
    """Parse an RTTTL string into a list of \`\`(freq_hz, duration_ms)\`\` notes. Pure.

    Format: \`\`name:d=<dur>,o=<octave>,b=<bpm>:<note>,<note>,…\`\` where each note is
    \`\`[duration]note[#][.][octave]\`\`. Returns the playable note list so the player
    (and the IDE) can drive it without a buzzer attached.
    """
    name_part, defaults, notes_part = tune.split(":")
    d, o, b = 4, 5, 63
    for setting in defaults.split(","):
        setting = setting.strip()
        if not setting:
            continue
        key, _, val = setting.partition("=")
        if key == "d":
            d = int(val)
        elif key == "o":
            o = int(val)
        elif key == "b":
            b = int(val)
    # Whole-note duration in ms = 4 beats * (60000 / bpm).
    whole_ms = 4 * 60000 / b
    out = []
    for token in notes_part.split(","):
        token = token.strip().lower()
        if not token:
            continue
        i = 0
        while i < len(token) and token[i].isdigit():
            i += 1
        dur = int(token[:i]) if i else d
        rest = token[i:]
        note = rest[0] if rest else "p"
        rest = rest[1:]
        if rest[:1] == "#":
            note += "#"
            rest = rest[1:]
        dotted = False
        if rest[:1] == ".":
            dotted = True
            rest = rest[1:]
        octv = int(rest) if rest.isdigit() else o
        ms = whole_ms / dur
        if dotted:
            ms *= 1.5
        out.append((note_to_freq(note, octv), int(round(ms))))
    return out


class Buzzer:
    """A piezo buzzer on a PWM-capable \`pin\`."""

    def __init__(self, pin):
        from machine import Pin, PWM

        self._pwm = PWM(pin if isinstance(pin, Pin) else Pin(pin))
        self._pwm.duty_u16(0)

    def tone(self, freq, ms):
        """Play \`freq\` Hz for \`ms\` milliseconds (a rest if \`freq\` <= 0)."""
        import time

        if freq > 0:
            self._pwm.freq(int(freq))
            self._pwm.duty_u16(32768)  # 50% duty
        time.sleep_ms(ms)
        self._pwm.duty_u16(0)

    def play_rtttl(self, tune):
        """Parse and play an RTTTL melody string."""
        for freq, ms in parse_rtttl(tune):
            self.tone(freq, ms)

    def off(self):
        """Silence the buzzer."""
        self._pwm.duty_u16(0)
`,ot=`# SPDX-License-Identifier: MIT
"""Grove Ultrasonic Ranger driver (Snakie module #120).

A small, self-contained MIT-licensed driver for Seeed's **Grove Ultrasonic
Ranger**, another driver behind the dock **Range** instrument (#112).

Unlike the HC-SR04 (see \`hcsr04.py\`), this module has **one signal wire that is
both trigger and echo**. The pin is driven as an output to send the burst, then
immediately flipped to an input to time the return. That single-pin dance is the
whole difference, and it is why the HC-SR04 driver cannot be pointed at one:
\`HCSR04(trigger=p, echo=p)\` fights itself over the pin direction.

Usage on a board::

    from grove_ultrasonic import GroveUltrasonic
    import instruments as inst

    sensor = GroveUltrasonic(0)          # a single Grove digital pin
    while True:
        inst.distance(sensor.distance_mm())   # -> Range instrument

The conversion (\`echo_to_distance_mm\`) is pure, so it can be unit-tested under
CPython without hardware.
"""

# Speed of sound ~= 343 m/s = 0.343 mm/us. The echo covers the round trip (out
# and back), so distance = (pulse_us * 0.343) / 2.
_MM_PER_US = 0.343

#: ~30 ms bounds the wait at roughly 5 m, past this sensor's useful range.
DEFAULT_TIMEOUT_US = 30000


def echo_to_distance_mm(pulse_us):
    """Convert a measured echo pulse width (microseconds) to a distance in mm.

    A negative \`pulse_us\` (the timeout sentinel from \`machine.time_pulse_us\`)
    yields \`\`-1\`\` to signal "out of range / no echo" rather than a bogus value.
    Pure — no hardware needed, so the IDE can unit-test it.
    """
    if pulse_us is None or pulse_us < 0:
        return -1
    return (pulse_us * _MM_PER_US) / 2


class GroveUltrasonic:
    """Driver for a Grove Ultrasonic Ranger on a single digital pin.

    \`pin\` is a pin number (or a \`machine.Pin\` object — its direction is
    reconfigured on every reading, which is inherent to the one-wire design).
    """

    def __init__(self, pin, echo_timeout_us=DEFAULT_TIMEOUT_US):
        # Imported lazily so this module imports cleanly under CPython for tests.
        from machine import Pin

        self._timeout = echo_timeout_us
        # Keep the pin NUMBER: the direction is re-set per reading, so we
        # re-make the Pin each time rather than hold one fixed mode.
        self._pin = pin.id() if hasattr(pin, "id") else pin

    def _pulse_us(self):
        from machine import Pin, time_pulse_us
        import time

        # Trigger: a clean low, then a 10 us high burst, on the pin as OUTPUT.
        trig = Pin(self._pin, Pin.OUT)
        trig.value(0)
        time.sleep_us(2)
        trig.value(1)
        time.sleep_us(10)
        trig.value(0)
        # Now hand the SAME pin over to the echo measurement as an input.
        echo = Pin(self._pin, Pin.IN)
        try:
            return time_pulse_us(echo, 1, self._timeout)
        except OSError:
            return -1

    def distance_mm(self):
        """Measure and return the distance in millimetres (\`\`-1\`\` if no echo)."""
        return echo_to_distance_mm(self._pulse_us())

    def distance_cm(self):
        """Measure and return the distance in centimetres (\`\`-1\`\` if no echo)."""
        mm = self.distance_mm()
        return -1 if mm < 0 else mm / 10
`,at=`# SPDX-License-Identifier: MIT
"""HC-SR04 ultrasonic range finder driver (Snakie module #120).

A tiny, self-contained MIT-licensed driver for the HC-SR04: pulse the *trigger*
pin high for 10 us, then time the *echo* pulse and convert to a distance. This is
the driver behind the dock **Range** instrument (#112).

Usage on a board::

    from machine import Pin
    from hcsr04 import HCSR04
    import instruments as inst

    sensor = HCSR04(trigger=3, echo=2)
    while True:
        inst.distance(sensor.distance_mm())   # -> Range instrument

The pure conversion (\`echo_to_distance_mm\`) is split out so it can be unit-tested
under CPython without any \`machine\` hardware.
"""

# Speed of sound ~= 343 m/s = 0.343 mm/us. The echo pulse covers the round trip
# (out and back), so distance = (pulse_us * 0.343) / 2.
_MM_PER_US = 0.343


def echo_to_distance_mm(pulse_us):
    """Convert a measured echo pulse width (microseconds) to a distance in mm.

    A negative \`pulse_us\` (the timeout sentinel from \`machine.time_pulse_us\`)
    yields \`\`-1\`\` to signal "out of range / no echo" rather than a bogus value.
    Pure — no hardware needed, so the IDE can unit-test it.
    """
    if pulse_us is None or pulse_us < 0:
        return -1
    return (pulse_us * _MM_PER_US) / 2


class HCSR04:
    """Driver for an HC-SR04 ultrasonic range finder.

    \`trigger\` / \`echo\` are pin numbers (or \`machine.Pin\` objects). \`echo_timeout_us\`
    bounds the wait so a missing/too-far target returns \`\`-1\`\` instead of blocking.
    """

    def __init__(self, trigger, echo, echo_timeout_us=30000):
        # Imported lazily so this module imports cleanly under CPython for tests.
        from machine import Pin

        self._timeout = echo_timeout_us
        self._trigger = trigger if isinstance(trigger, Pin) else Pin(trigger, Pin.OUT)
        self._echo = echo if isinstance(echo, Pin) else Pin(echo, Pin.IN)
        self._trigger.value(0)

    def _pulse_us(self):
        from machine import time_pulse_us
        import time

        # 10 us trigger pulse (datasheet), after a short settle low.
        self._trigger.value(0)
        time.sleep_us(5)
        self._trigger.value(1)
        time.sleep_us(10)
        self._trigger.value(0)
        try:
            return time_pulse_us(self._echo, 1, self._timeout)
        except OSError:
            return -1

    def distance_mm(self):
        """Measure and return the distance in millimetres (\`\`-1\`\` if no echo)."""
        return echo_to_distance_mm(self._pulse_us())

    def distance_cm(self):
        """Measure and return the distance in centimetres (\`\`-1\`\` if no echo)."""
        mm = self.distance_mm()
        return -1 if mm < 0 else mm / 10
`,it=`# SPDX-License-Identifier: MIT
"""LSM6DS3 6-axis IMU driver (Snakie module #120).

A small, self-contained MIT-licensed register driver for the ST LSM6DS3 (3-axis
accelerometer + 3-axis gyroscope over I²C) — the sensor on Seeed's **Grove 6-Axis
Accelerometer & Gyroscope**. This is a driver behind the dock **IMU** instrument
(#111), alongside the MPU-6050.

Why not the existing \`lsm6ds\` catalog entry: that one installs a **LSM6DSOX**
driver, a different part whose \`\`WHO_AM_I\`\` is \`\`0x6C\`\`. An LSM6DS3 answers
\`\`0x69\`\` and would be rejected by it.

Usage on a board::

    from machine import I2C, Pin
    from lsm6ds3 import LSM6DS3
    import instruments as inst

    # The Grove I2C port is D4/D5 on every XIAO, but the GPIO NUMBERS behind
    # those silk names differ by board:
    #     XIAO RP2040 / RP2350   sda=Pin(6),  scl=Pin(7)
    #     XIAO ESP32-S3          sda=Pin(5),  scl=Pin(6)
    imu = LSM6DS3(I2C(1, sda=Pin(5), scl=Pin(6)), addr=0x6B)   # XIAO ESP32-S3
    while True:
        ax, ay, az = imu.accel()          # g
        gx, gy, gz = imu.gyro()           # degrees/second
        inst.imu(*imu.euler_estimate())   # -> IMU instrument

Mounting
--------
The tilt maths assumes the module lies flat with **Z up**. A chassis rarely
allows that, and a module on its edge reports gravity on Y — which shows up as a
permanent ~90 deg roll and sends rotations to the wrong axis. Pass \`\`axes\`\` to
say how it is mounted:

    imu = LSM6DS3(i2c, addr=0x6B, axes=('x', 'z', '-y'))   # module on its edge

\`axes_for_resting(imu.accel())\` works the map out for you from one reading of a
stationary board.

Addressing
----------
The chip's own default is \`\`0x6A\`\` (SA0 low). **Seeed's Grove module ships SA0
high, so it answers on 0x6B** — pass \`\`addr=0x6B\`\` for that board. \`b0_scan.py\`
style bus census is the reliable way to tell.

The register decode (\`raw_to_g\`, \`raw_to_dps\`) and the config-byte builders
(\`ctrl1_xl\`, \`ctrl2_g\`) are pure, so they can be unit-tested under CPython
without an I²C bus — which is where a wrong full-scale bit pattern would
otherwise hide, silently mis-scaling every reading.
"""

import math

# --- Register map (the subset needed for accel + gyro) -----------------------
_WHO_AM_I = 0x0F
_CTRL1_XL = 0x10  # accelerometer: ODR | full-scale | anti-alias bandwidth
_CTRL2_G = 0x11  # gyroscope: ODR | full-scale
_CTRL3_C = 0x12  # BDU / IF_INC / SW_RESET
_OUT_TEMP_L = 0x20
_OUTX_L_G = 0x22  # gyro block, 6 bytes
_OUTX_L_XL = 0x28  # accel block, 6 bytes

#: Both addresses the part can take: SA0 low, SA0 high. Seeed's Grove 6-Axis
#: ships SA0 HIGH, so it answers on 0x6B rather than the chip's 0x6A default.
ADDRESSES = (0x6A, 0x6B)

_DEFAULT_ADDR = 0x6A  # SA0 low. Seeed's Grove module is 0x6B (SA0 high).

# \`WHO_AM_I\` answers we accept: the LSM6DS3 proper, and the LSM6DS3TR-C variant
# that is register-compatible for everything this driver touches.
WHO_AM_I_VALUES = (0x69, 0x6A)

# CTRL3_C: BDU (don't tear a sample across a read) + IF_INC (auto-increment the
# register pointer, so a 6-byte block read works).
_CTRL3_BDU = 0x40
_CTRL3_IF_INC = 0x04
_CTRL3_SW_RESET = 0x01

# --- Full-scale encodings ----------------------------------------------------
# NOTE the accelerometer's ordering: ±16 g sits at 0b01, NOT at the end. Getting
# this "obviously" sequential would silently mis-scale 4/8/16 g. Verified against
# the LSM6DS3 register map.
_FS_XL = {2: 0x00, 16: 0x04, 4: 0x08, 8: 0x0C}
_FS_G = {245: 0x00, 500: 0x04, 1000: 0x08, 2000: 0x0C}
_FS_125_BIT = 0x02  # CTRL2_G: the 125 dps range is its own enable bit

# Output data rates → the ODR nibble shared by CTRL1_XL and CTRL2_G.
_ODR = {
    0: 0x00,  # power-down
    13: 0x10,
    26: 0x20,
    52: 0x30,
    104: 0x40,
    208: 0x50,
    416: 0x60,
    833: 0x70,
    1660: 0x80,
}

# Sensitivities, in mg and mdps per LSB (datasheet; they scale with full scale).
_ACCEL_MG_PER_LSB = {2: 0.061, 4: 0.122, 8: 0.244, 16: 0.488}
_GYRO_MDPS_PER_LSB = {125: 4.375, 245: 8.75, 500: 17.5, 1000: 35.0, 2000: 70.0}


def _twos16(lo, hi):
    """Combine two bytes (LITTLE-endian, as the LSM6DS3 emits them) into a
    signed 16-bit int. Pure.

    Note the byte order differs from the MPU-6050, which is big-endian — reading
    this device with that decode gives plausible-looking nonsense.
    """
    val = (hi << 8) | lo
    return val - 65536 if val >= 32768 else val


def raw_to_g(lo, hi, g_range=2):
    """Decode an accelerometer axis (two raw bytes, low first) to g. Pure."""
    return _twos16(lo, hi) * _ACCEL_MG_PER_LSB[g_range] / 1000.0


def raw_to_dps(lo, hi, dps_range=245):
    """Decode a gyroscope axis (two raw bytes, low first) to degrees/second. Pure."""
    return _twos16(lo, hi) * _GYRO_MDPS_PER_LSB[dps_range] / 1000.0


def ctrl1_xl(odr_hz=104, g_range=2):
    """Build the CTRL1_XL byte for an accelerometer rate + full scale. Pure."""
    if odr_hz not in _ODR:
        raise ValueError("unsupported accel ODR: %r" % (odr_hz,))
    if g_range not in _FS_XL:
        raise ValueError("unsupported accel range: %r g" % (g_range,))
    return _ODR[odr_hz] | _FS_XL[g_range]


def ctrl2_g(odr_hz=104, dps_range=245):
    """Build the CTRL2_G byte for a gyroscope rate + full scale. Pure.

    \`\`125\`\` dps is not part of the FS_G field — it has its own enable bit, and
    the FS_G bits must read 0 alongside it.
    """
    if odr_hz not in _ODR:
        raise ValueError("unsupported gyro ODR: %r" % (odr_hz,))
    if dps_range == 125:
        return _ODR[odr_hz] | _FS_125_BIT
    if dps_range not in _FS_G:
        raise ValueError("unsupported gyro range: %r dps" % (dps_range,))
    return _ODR[odr_hz] | _FS_G[dps_range]


# --- Axis mapping (mounting orientation) -------------------------------------
# A sensor is almost never mounted the way a driver assumes. The tilt maths here
# takes Z as "up", but a chassis usually dictates the orientation, and a module
# stood on its edge reports gravity on Y — which reads as a permanent ~90 deg roll
# and sends every rotation to the wrong axis of the display.
#
# Rather than make every sketch re-derive it, the driver remaps ONCE at the source
# so \`accel\`, \`gyro\` and \`euler_estimate\` are all in the board's frame.

_AXIS_NAMES = ("x", "y", "z")


def parse_axes(spec):
    """Parse an axis map into \`\`[(source_index, sign), ...]\`\` for output X, Y, Z.

    \`spec\` names which SENSOR axis supplies each output axis, optionally negated:
    \`\`('x', 'z', '-y')\`\` means output Z is the negated sensor Y. Accepts a string
    (\`\`"x z -y"\`\` or \`\`"x,z,-y"\`\`) or any 3-sequence. \`\`None\`\` means no remapping.

    Raises \`ValueError\` on anything that isn't a clean right-handed map — see
    :func:\`axes_determinant\` for why a mirrored one is refused rather than used.
    """
    if spec is None:
        return None
    parts = spec.replace(",", " ").split() if isinstance(spec, str) else list(spec)
    if len(parts) != 3:
        raise ValueError("axes needs three entries, e.g. ('x','z','-y')")
    out = []
    for p in parts:
        p = str(p).strip().lower()
        sign = 1
        if p[:1] == "-":
            sign, p = -1, p[1:]
        elif p[:1] == "+":
            p = p[1:]
        if p not in _AXIS_NAMES:
            raise ValueError("axis %r is not one of x/y/z" % (p,))
        out.append((_AXIS_NAMES.index(p), sign))
    if len(set(i for i, _ in out)) != 3:
        raise ValueError("axes must use x, y and z exactly once (got %r)" % (spec,))
    if axes_determinant(out) != 1:
        raise ValueError(
            "axes %r is mirrored (left-handed) — negate one entry. A mirrored map "
            "reads plausibly at rest and then turns every rotation the wrong way, "
            "which is far harder to spot than an error here." % (spec,)
        )
    return out


def axes_determinant(mapped):
    """Determinant of a parsed axis map: \`\`+1\`\` right-handed, \`\`-1\`\` mirrored. Pure.

    Worth checking explicitly. A left-handed map still puts gravity where you want
    it, so it looks correct on a stationary board — but it inverts the SENSE of
    rotation, so roll runs backwards and no amount of staring at a resting reading
    reveals it.
    """
    m = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    for row, (i, sign) in enumerate(mapped):
        m[row][i] = sign
    return (
        m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
        - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])
        + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
    )


def apply_axes(mapped, v):
    """Apply a parsed axis map to an \`\`(x, y, z)\`\` reading. Pure; \`None\` = identity."""
    if not mapped:
        return v
    return tuple(v[i] * sign for i, sign in mapped)


def axes_for_resting(reading):
    """Suggest an axis map from ONE accelerometer sample of a board sitting still.

    Hold the board the way it will be mounted, take a reading, and this returns the
    \`axes\` that puts gravity back on +Z where the tilt maths expects it — turning
    "work out your axis map" into one call.

    Only the vertical axis is determined by gravity: any rotation ABOUT vertical
    leaves the reading identical, which is the same reason yaw is unobservable
    without a magnetometer. So of the several valid answers this returns the one
    that disturbs X and Y least, and it is a starting point, not a survey.

    A wrong guess at that quarter-turn is what "roll and pitch are swapped" looks
    like — tilting the nose up reads as roll. Use :func:\`axes_from_two\` to settle
    it rather than trying the other three by hand.

    Pass a reading from :meth:\`LSM6DS3.raw_accel\` (or a driver with no \`axes\` set):
    an already-mapped reading yields a map relative to the one in force.
    """
    d, up_sign = _dominant(reading)
    rest = [i for i in range(3) if i != d]
    for sign in (1, -1):
        cand = [(rest[0], 1), (rest[1], sign), (d, up_sign)]
        if axes_determinant(cand) == 1:
            return tuple(
                ("-" if s < 0 else "") + _AXIS_NAMES[i] for i, s in cand
            )
    raise ValueError("could not build a right-handed map from %r" % (reading,))


#: Cross product of two signed unit basis vectors: \`\`(a, b) -> (index, sign)\`\`.
_CROSS = {
    (0, 1): (2, 1), (1, 2): (0, 1), (2, 0): (1, 1),
    (1, 0): (2, -1), (2, 1): (0, -1), (0, 2): (1, -1),
}


def axes_from_two(level, nose_down):
    """The full axis map from TWO resting readings — the complete calibration.

    Gravity gives you the vertical direction and nothing else. That fixes roll and
    pitch, but leaves the rotation ABOUT vertical free, which is precisely the
    ambiguity :func:\`axes_for_resting\` has to guess at: get it wrong by 90 deg and
    tilting the nose up still shows as roll. A second pose collapses it.

      1. \`level\`     — the board sitting as it is mounted, still.
      2. \`nose_down\` — the same board with its FORWARD direction pointing at the
         floor.

    In pose 2 gravity lies along the robot's forward axis, so it names that axis
    the way pose 1 names the vertical one. Between them the frame is fully
    determined, and the third axis follows from the right-hand rule rather than
    from another measurement.

    Returns an \`axes\` tuple for the constructor. Raises \`ValueError\` if the two
    poses aren't distinct enough to be telling us different things.

    Both readings must come from :meth:\`LSM6DS3.raw_accel\` (or a driver with no
    \`axes\` set) — an already-mapped reading derives a map relative to the one in
    force, which looks like it worked and is wrong by exactly the correction
    already applied.
    """
    iz, sz = _dominant(level)
    ix, sx = _dominant(nose_down)
    # Pose 2 has the nose pointing DOWN, so the axis reading +1g there is the
    # nose's opposite.
    sx = -sx
    if iz == ix:
        raise ValueError(
            "both readings put gravity on the same axis — pose 2 should have the "
            "board's FORWARD direction pointing at the floor, about 90 deg from pose 1"
        )
    iy, cross_sign = _CROSS[(iz, ix)]
    sy = sz * sx * cross_sign
    out = [(ix, sx), (iy, sy), (iz, sz)]
    return tuple(("-" if s < 0 else "") + _AXIS_NAMES[i] for i, s in out)


def _dominant(reading):
    """\`\`(index, sign)\`\` of the axis carrying gravity in a resting reading. Pure."""
    mags = (abs(reading[0]), abs(reading[1]), abs(reading[2]))
    d = mags.index(max(mags))
    return d, (-1 if reading[d] < 0 else 1)


def accel_to_euler(ax, ay, az):
    """Estimate (roll, pitch) in degrees from an accelerometer vector (g).

    Yaw is unobservable from gravity alone, so it is returned as \`\`0.0\`\`. Pure —
    feeds the dock IMU instrument's 3-D attitude view without a fusion step.
    """
    roll = math.degrees(math.atan2(ay, az)) if (ay or az) else 0.0
    pitch = math.degrees(math.atan2(-ax, math.sqrt(ay * ay + az * az)))
    return roll, pitch, 0.0


class LSM6DS3:
    """Driver for an LSM6DS3 6-axis IMU on an I²C bus.

    \`g_range\` is 2/4/8/16 (g) and \`dps_range\` is 125/245/500/1000/2000 — both
    also select the conversion factor, so a reading is always in real units.

    \`axes\` describes how the module is MOUNTED — see :func:\`parse_axes\`. Leave it
    out for a board lying flat with its component face up; set it once when the
    chassis dictates otherwise, and every reading arrives in the board's frame.
    """

    def __init__(
        self, i2c, addr=_DEFAULT_ADDR, odr_hz=104, g_range=2, dps_range=245, check=True, axes=None
    ):
        self._i2c = i2c
        self._addr = addr
        self._g_range = g_range
        self._dps_range = dps_range
        # Mounting orientation. Validated HERE, at construction, so a bad map is a
        # clear error at the line that set it rather than silently wrong readings
        # for the life of the program.
        self._axes = parse_axes(axes)
        # IDENTIFY before configuring. Blind-writing the three control registers
        # turns a wrong address, the wrong bus, or a half-seated Grove lead into a
        # bare \`OSError: [Errno 5] EIO\` from whichever write happened to go first,
        # which tells you nothing about which of those it was.
        #
        # Pass \`check=False\` to skip, e.g. for a register-compatible variant whose
        # WHO_AM_I isn't one we know.
        if check:
            try:
                who = i2c.readfrom_mem(addr, _WHO_AM_I, 1)[0]
            except OSError:
                # Before blaming the wiring, look at the OTHER address this part
                # can take. The chip's default is 0x6A (SA0 low) but Seeed's Grove
                # module ships SA0 HIGH, so \`LSM6DS3(i2c)\` on that board misses by
                # one address — a confusing failure with an obvious cause.
                other = ADDRESSES[1] if addr == ADDRESSES[0] else ADDRESSES[0]
                sibling = None
                try:
                    sibling = i2c.readfrom_mem(other, _WHO_AM_I, 1)[0]
                except OSError:
                    pass
                if sibling in WHO_AM_I_VALUES:
                    raise OSError(
                        "no LSM6DS3 at 0x%02x, but one answered at 0x%02x — "
                        "pass addr=0x%02x. (Seeed's Grove 6-Axis ships SA0 high.)"
                        % (addr, other, other)
                    )
                if sibling is not None:
                    # Readable but wrong: say WHAT it read. Reporting only "nothing
                    # at 0x6a" hides the far more useful fact that the other address
                    # replied with rubbish, which is a different fault entirely.
                    raise OSError(
                        "no LSM6DS3 at 0x%02x. A device at 0x%02x replied but its "
                        "WHO_AM_I is 0x%02x, not %s — 0xff means it is ACKing without "
                        "driving data, which is a power or connection fault on that "
                        "module rather than the wrong address."
                        % (addr, other, sibling, " or ".join("0x%02x" % v for v in WHO_AM_I_VALUES))
                    )
                raise OSError(
                    "no reply from an I2C device at 0x%02x. Check the bus pins and "
                    "reseat the lead, then run i2c.scan() to see what is really there. "
                    "A device that shows up in scan() but fails here is usually a "
                    "half-seated Grove connector." % addr
                )
            if who not in WHO_AM_I_VALUES:
                raise RuntimeError(
                    "the device at 0x%02x is not an LSM6DS3: WHO_AM_I read 0x%02x, "
                    "expected %s. (0xff usually means a marginal lead rather than the "
                    "wrong chip.)"
                    % (addr, who, " or ".join("0x%02x" % v for v in WHO_AM_I_VALUES))
                )
        # Block-data-update + register auto-increment, so a 6-byte burst read is
        # coherent and actually advances.
        self._i2c.writeto_mem(addr, _CTRL3_C, bytes([_CTRL3_BDU | _CTRL3_IF_INC]))
        self._i2c.writeto_mem(addr, _CTRL1_XL, bytes([ctrl1_xl(odr_hz, g_range)]))
        self._i2c.writeto_mem(addr, _CTRL2_G, bytes([ctrl2_g(odr_hz, dps_range)]))

    def whoami(self):
        """Read \`\`WHO_AM_I\`\`. An LSM6DS3 answers \`\`0x69\`\`."""
        return self._i2c.readfrom_mem(self._addr, _WHO_AM_I, 1)[0]

    def present(self):
        """True when the device on this address identifies as an LSM6DS3."""
        try:
            return self.whoami() in WHO_AM_I_VALUES
        except OSError:
            return False

    def accel(self):
        """Return the (x, y, z) acceleration in g, in the BOARD's frame."""
        return apply_axes(self._axes, self.raw_accel())

    def raw_accel(self):
        """Acceleration in the SENSOR's own frame, ignoring any \`axes\` map.

        What the calibration helpers need. Feeding them :meth:\`accel\` from a driver
        that ALREADY has a map would derive a map relative to that one — it would
        look like it worked and be wrong by exactly the correction already applied.
        """
        b = self._i2c.readfrom_mem(self._addr, _OUTX_L_XL, 6)
        r = self._g_range
        return (
            raw_to_g(b[0], b[1], r),
            raw_to_g(b[2], b[3], r),
            raw_to_g(b[4], b[5], r),
        )

    def gyro(self):
        """Return the (x, y, z) angular rate in degrees/second, in the BOARD's frame.

        Remapped with the same \`axes\` as :meth:\`accel\` — they MUST agree, or a
        fusion step would be blending two different coordinate frames.
        """
        b = self._i2c.readfrom_mem(self._addr, _OUTX_L_G, 6)
        r = self._dps_range
        return apply_axes(
            self._axes,
            (
                raw_to_dps(b[0], b[1], r),
                raw_to_dps(b[2], b[3], r),
                raw_to_dps(b[4], b[5], r),
            ),
        )

    def temperature(self):
        """Return the die temperature in °C (25 °C at zero, 256 LSB/°C)."""
        b = self._i2c.readfrom_mem(self._addr, _OUT_TEMP_L, 2)
        return 25.0 + _twos16(b[0], b[1]) / 256.0

    def euler_estimate(self):
        """Return an accel-only (roll, pitch, yaw=0) attitude estimate in degrees."""
        return accel_to_euler(*self.accel())

    def reset(self):
        """Software-reset the device (it clears the bit when done)."""
        self._i2c.writeto_mem(self._addr, _CTRL3_C, bytes([_CTRL3_SW_RESET]))
`,lt=`# SPDX-License-Identifier: MIT
"""MPU-6050 6-axis IMU driver (Snakie module #120).

A small, self-contained MIT-licensed register driver for the InvenSense MPU-6050
(3-axis accelerometer + 3-axis gyroscope over I²C). This is the driver behind the
dock **IMU** instrument (#111).

Usage on a board::

    from machine import I2C, Pin
    from mpu6050 import MPU6050
    import instruments as inst

    # Example pins — check your board. On a XIAO the Grove I2C port is D4/D5,
    # which is Pin(6)/Pin(7) on an RP2040/RP2350 and Pin(5)/Pin(6) on an ESP32-S3.
    imu = MPU6050(I2C(0, sda=Pin(0), scl=Pin(1)))
    while True:
        ax, ay, az = imu.accel()
        inst.imu(*imu.euler_estimate())   # -> IMU instrument

The raw register decode (\`raw_to_g\`, \`raw_to_dps\`) and the accel→euler estimate
(\`accel_to_euler\`) are split out so they can be unit-tested under CPython without
an I²C bus.
"""

import math

# Register map (subset needed for accel + gyro).
_PWR_MGMT_1 = 0x6B
_ACCEL_XOUT_H = 0x3B
_DEFAULT_ADDR = 0x68

# Full-scale defaults after reset: accel ±2 g, gyro ±250 °/s.
_ACCEL_LSB_PER_G = 16384.0
_GYRO_LSB_PER_DPS = 131.0


def _twos16(hi, lo):
    """Combine two bytes (big-endian) into a signed 16-bit int. Pure."""
    val = (hi << 8) | lo
    return val - 65536 if val >= 32768 else val


def raw_to_g(hi, lo, lsb_per_g=_ACCEL_LSB_PER_G):
    """Decode an accelerometer axis (two raw bytes) to g. Pure."""
    return _twos16(hi, lo) / lsb_per_g


def raw_to_dps(hi, lo, lsb_per_dps=_GYRO_LSB_PER_DPS):
    """Decode a gyroscope axis (two raw bytes) to degrees/second. Pure."""
    return _twos16(hi, lo) / lsb_per_dps


def accel_to_euler(ax, ay, az):
    """Estimate (roll, pitch) in degrees from an accelerometer vector (g).

    Yaw is unobservable from gravity alone, so it is returned as \`\`0.0\`\`. Pure —
    feeds the dock IMU instrument's 3-D attitude view without a gyro fusion step.
    """
    roll = math.degrees(math.atan2(ay, az)) if (ay or az) else 0.0
    pitch = math.degrees(math.atan2(-ax, math.sqrt(ay * ay + az * az)))
    return roll, pitch, 0.0


class MPU6050:
    """Driver for an MPU-6050 IMU on an I²C bus."""

    def __init__(self, i2c, addr=_DEFAULT_ADDR):
        self._i2c = i2c
        self._addr = addr
        # Wake the device (clear the SLEEP bit it powers up with).
        self._i2c.writeto_mem(addr, _PWR_MGMT_1, b"\\x00")

    def _read_accel_block(self):
        # 6 bytes: ax_h, ax_l, ay_h, ay_l, az_h, az_l.
        return self._i2c.readfrom_mem(self._addr, _ACCEL_XOUT_H, 6)

    def accel(self):
        """Return the (x, y, z) acceleration in g."""
        b = self._read_accel_block()
        return raw_to_g(b[0], b[1]), raw_to_g(b[2], b[3]), raw_to_g(b[4], b[5])

    def euler_estimate(self):
        """Return an accel-only (roll, pitch, yaw=0) attitude estimate in degrees."""
        return accel_to_euler(*self.accel())
`,dt=`# SPDX-License-Identifier: MIT
"""WS2812 / NeoPixel addressable-LED helper (Snakie module #120).

This is the driver behind the dock **LED** instrument (#114) for *addressable*
RGB strips. On most MicroPython ports a frozen \`\`neopixel\`\` module already exists;
this module is a tiny, self-contained wrapper that uses it when present and falls
back to a \`machine.bitstream\` bit-bang otherwise — so the dock LED panel has a
uniform API regardless of port.

Usage on a board::

    from neopixel_ws2812 import NeoStrip
    strip = NeoStrip(pin=0, n=8)
    strip.fill((0, 40, 0)); strip.write()      # all green

The colour helpers (\`wheel\`, \`scale\`) are pure and unit-testable under CPython.
"""


def scale(color, brightness):
    """Scale an \`\`(r, g, b)\`\` tuple by \`\`brightness\`\` in 0.0–1.0. Pure.

    Clamps brightness to [0, 1] and each channel to [0, 255] integers — handy for
    dimming the whole strip without losing hue.
    """
    b = 0.0 if brightness < 0 else (1.0 if brightness > 1 else brightness)
    return tuple(max(0, min(255, int(round(c * b)))) for c in color)


def wheel(pos):
    """Map a position 0–255 to an \`\`(r, g, b)\`\` colour-wheel value. Pure.

    The classic Adafruit colour wheel — useful for rainbow demos driven from the
    dock LED instrument. Wraps \`pos\` into range first.
    """
    pos = pos % 256
    if pos < 85:
        return (255 - pos * 3, pos * 3, 0)
    if pos < 170:
        pos -= 85
        return (0, 255 - pos * 3, pos * 3)
    pos -= 170
    return (pos * 3, 0, 255 - pos * 3)


class NeoStrip:
    """A WS2812 strip of \`n\` pixels on \`pin\`, with a uniform fill/set/write API."""

    def __init__(self, pin, n):
        from machine import Pin

        self._n = n
        self._pin = pin if isinstance(pin, Pin) else Pin(pin, Pin.OUT)
        self._buf = [(0, 0, 0)] * n
        try:
            import neopixel

            self._np = neopixel.NeoPixel(self._pin, n)
        except ImportError:
            # No frozen neopixel; we'll bit-bang in write().
            self._np = None

    def __len__(self):
        return self._n

    def fill(self, color):
        """Set every pixel to \`color\` (an \`\`(r, g, b)\`\` tuple)."""
        self._buf = [color] * self._n

    def set(self, i, color):
        """Set pixel \`i\` to \`color\`."""
        self._buf[i] = color

    def write(self):
        """Flush the buffer to the strip (frozen \`neopixel\` or a bitstream)."""
        if self._np is not None:
            for i, c in enumerate(self._buf):
                self._np[i] = c
            self._np.write()
            return
        # Fallback: WS2812 wants GRB order, 800 kHz (timing in ns).
        data = bytearray()
        for r, g, b in self._buf:
            data += bytes((g, r, b))
        self._pin.bitstream(1, (400, 850, 800, 450), data)
`,ct=`# SPDX-License-Identifier: MIT
"""PCF8563 real-time clock driver (Snakie module #120).

A small, self-contained MIT-licensed register driver for the NXP PCF8563 — the RTC
on Seeed's **XIAO Expansion Base** (and most cheap I²C clock breakouts), at address
\`\`0x51\`\`.

Usage on a board::

    from machine import I2C, Pin
    from pcf8563 import PCF8563

    # D4/D5 on a XIAO — the GPIOs behind those names are board-specific:
    #     RP2040 / RP2350   sda=Pin(6), scl=Pin(7)
    #     ESP32-S3          sda=Pin(5), scl=Pin(6)
    rtc = PCF8563(I2C(1, sda=Pin(5), scl=Pin(6)))   # XIAO ESP32-S3
    if rtc.unset():
        rtc.datetime((2026, 7, 30, 9, 30, 0, 3))   # Y, M, D, h, m, s, weekday
    print(rtc.datetime())

Every field is **BCD** with status bits sharing the same byte, so each one has to
be masked before decoding — the mask is not cosmetic. In particular the seconds
register's top bit is the **VL (voltage-low) flag**, not part of the seconds: read
it unmasked and you get times like ":83". :meth:\`unset\` exposes that flag, because
a PCF8563 whose backup cell has been flat is not slow — it is *lying*, and the only
honest answer is to re-set it.

The BCD conversions are pure, so they can be unit-tested under CPython without an
I²C bus.
"""

_DEFAULT_ADDR = 0x51

# Register map. The time block is 7 consecutive registers from 0x02.
_CTRL1 = 0x00
_CTRL2 = 0x01
_VL_SECONDS = 0x02

#: Per-register masks for the time block, in read order. Each register carries
#: status/padding bits alongside its BCD value and MUST be masked:
#:   0x02 seconds  bit 7  = VL (voltage-low) flag
#:   0x04 hours    bits 5-0 only
#:   0x05 days     bits 5-0 only
#:   0x06 weekday  bits 2-0 only
#:   0x07 months   bit 7  = century
_TIME_MASKS = (0x7F, 0x7F, 0x3F, 0x3F, 0x07, 0x1F, 0xFF)

#: The century the year register counts from (it holds 00..99).
CENTURY = 2000


def from_bcd(value):
    """Decode a packed BCD byte to an int (\`\`0x59\`\` → \`\`59\`\`). Pure."""
    return (value >> 4) * 10 + (value & 0x0F)


def to_bcd(value):
    """Encode an int 0..99 as a packed BCD byte (\`\`59\`\` → \`\`0x59\`\`). Pure."""
    v = int(value)
    if not 0 <= v <= 99:
        raise ValueError("BCD range is 0..99, got %r" % (value,))
    return ((v // 10) << 4) | (v % 10)


def decode_time(raw):
    """Decode the 7-byte time block to \`\`(year, month, day, hour, minute, second,
    weekday, unset)\`\`. Pure.

    \`raw\` is registers \`\`0x02\`\`..\`\`0x08\`\` as read. \`\`unset\`\` is the VL flag: the
    clock lost power and the time is not trustworthy.
    """
    if raw is None or len(raw) < 7:
        raise ValueError("need 7 bytes of PCF8563 time registers")
    masked = [raw[i] & _TIME_MASKS[i] for i in range(7)]
    return (
        CENTURY + from_bcd(masked[6]),
        from_bcd(masked[5]),
        from_bcd(masked[3]),
        from_bcd(masked[2]),
        from_bcd(masked[1]),
        from_bcd(masked[0]),
        masked[4],
        bool(raw[0] & 0x80),
    )


def encode_time(year, month, day, hour, minute, second, weekday=0):
    """Encode a time into the 7 bytes written to \`\`0x02\`\`..\`\`0x08\`\`. Pure.

    Writing seconds also clears the VL flag (its bit is left at 0), which is what
    marks the clock as trustworthy again.
    """
    return bytes(
        [
            to_bcd(second),  # bit 7 = 0 clears VL
            to_bcd(minute),
            to_bcd(hour),
            to_bcd(day),
            int(weekday) & 0x07,
            to_bcd(month),  # bit 7 (century) left clear
            to_bcd(int(year) - CENTURY),
        ]
    )


class PCF8563:
    """Driver for a PCF8563 real-time clock on an I²C bus."""

    def __init__(self, i2c, addr=_DEFAULT_ADDR):
        self._i2c = i2c
        self._addr = addr

    def _read_block(self):
        return self._i2c.readfrom_mem(self._addr, _VL_SECONDS, 7)

    def datetime(self, value=None):
        """Get or set the time.

        With no argument, returns \`\`(year, month, day, hour, minute, second,
        weekday)\`\`. Pass that same tuple to SET the clock (\`\`weekday\`\` optional).
        """
        if value is None:
            y, mo, d, h, mi, s, wd, _unset = decode_time(self._read_block())
            return (y, mo, d, h, mi, s, wd)
        y, mo, d, h, mi, s = value[:6]
        wd = value[6] if len(value) > 6 else 0
        self._i2c.writeto_mem(self._addr, _VL_SECONDS, encode_time(y, mo, d, h, mi, s, wd))
        return self.datetime()

    def unset(self):
        """True when the VL flag is set — the clock lost power, so the time is junk.

        Check this before trusting a reading. A flat backup cell does not make the
        clock slow, it makes it wrong.
        """
        return bool(self._read_block()[0] & 0x80)

    def start(self):
        """Start the clock (clear the STOP bit in Control_status_1)."""
        self._i2c.writeto_mem(self._addr, _CTRL1, b"\\x00")

    def stop(self):
        """Stop the clock (set the STOP bit) — the registers hold their values."""
        self._i2c.writeto_mem(self._addr, _CTRL1, b"\\x20")

    def clear_alarms(self):
        """Clear the alarm/timer interrupt flags in Control_status_2."""
        self._i2c.writeto_mem(self._addr, _CTRL2, b"\\x00")

    def isoformat(self):
        """The current time as \`\`YYYY-MM-DD HH:MM:SS\`\` — handy for a log line."""
        y, mo, d, h, mi, s = self.datetime()[:6]
        return "%04d-%02d-%02d %02d:%02d:%02d" % (y, mo, d, h, mi, s)
`,_t=`# SPDX-License-Identifier: MIT
"""Quadrature rotary-encoder helper (Snakie module #120).

This is the driver behind the dock **Encoder** instrument (#117). It decodes the
two-bit Gray-code transitions of a quadrature rotary encoder into a running step
count + direction.

Usage on a board::

    from rotary import Rotary
    import instruments as inst

    enc = Rotary(clk=2, dt=3)
    while True:
        inst.plot(steps=enc.value())   # -> Encoder / Plotter

The pure transition decode (\`step_delta\`) is split out so it can be unit-tested
under CPython with no pins — the IDE drives it with synthetic state sequences.
"""

# Quadrature transition table: index by (prev_state << 2) | new_state, where each
# 2-bit state is (clk << 1) | dt. +1 = clockwise step, -1 = counter-clockwise,
# 0 = no movement / invalid (bounce) transition.
_TABLE = (
    0, -1, 1, 0,
    1, 0, 0, -1,
    -1, 0, 0, 1,
    0, 1, -1, 0,
)


def step_delta(prev_state, new_state):
    """Return the step delta (-1, 0, +1) for a quadrature transition. Pure.

    \`prev_state\` / \`new_state\` are 2-bit values \`\`(clk << 1) | dt\`\`. Invalid /
    bounce transitions yield \`\`0\`\`. This is the whole decode logic, hardware-free
    so the IDE can unit-test the direction handling.
    """
    return _TABLE[((prev_state & 0b11) << 2) | (new_state & 0b11)]


class Rotary:
    """Polled quadrature rotary encoder on the \`clk\` and \`dt\` pins."""

    def __init__(self, clk, dt):
        from machine import Pin

        self._clk = clk if isinstance(clk, Pin) else Pin(clk, Pin.IN, Pin.PULL_UP)
        self._dt = dt if isinstance(dt, Pin) else Pin(dt, Pin.IN, Pin.PULL_UP)
        self._count = 0
        self._state = (self._clk.value() << 1) | self._dt.value()

    def poll(self):
        """Sample the pins, fold in any step, and return the latest count.

        Call this often (e.g. each loop iteration); it is non-blocking.
        """
        new_state = (self._clk.value() << 1) | self._dt.value()
        self._count += step_delta(self._state, new_state)
        self._state = new_state
        return self._count

    def value(self):
        """Return the current accumulated step count (after \`poll\`)."""
        return self._count

    def reset(self):
        """Reset the step count to zero."""
        self._count = 0
`,ft=`# SPDX-License-Identifier: MIT
"""Grove I²C Motor Driver (TB6612FNG) driver (Snakie module #120).

A small, self-contained MIT-licensed driver for Seeed's **Grove - I²C Motor
Driver (TB6612FNG)** — two DC motor channels commanded over I²C.

Careful, there are two different Grove motor drivers:

* This one (SKU 105020001) has an on-board MCU, ships on **0x14**, and takes
  single-byte *commands* (\`\`[cmd, channel, speed]\`\`).
* The older **Grove I²C Motor Driver V1.x** is a different board on **0x0F**
  with a different protocol (\`\`0x82\`\` speed-set, \`\`0xAA\`\` direction-set). This
  driver will not drive it.

Usage on a board::

    from machine import I2C, Pin
    from tb6612 import GroveMotorDriver, CH_A, CH_B

    # D4/D5 on a XIAO — the GPIOs behind those names are board-specific:
    #     RP2040 / RP2350   sda=Pin(6), scl=Pin(7)
    #     ESP32-S3          sda=Pin(5), scl=Pin(6)
    m = GroveMotorDriver(I2C(1, sda=Pin(5), scl=Pin(6)))   # XIAO ESP32-S3
    m.wake()                # leave standby before anything will turn
    m.run(CH_A, 200)        # forward, 0..255
    m.run(CH_B, -200)       # reverse
    m.brake(CH_A)           # short the windings (active stop)
    m.stop(CH_B)            # coast

Both motors off is \`stop\`/\`brake\` per channel; \`standby()\` disables the H-bridge
outputs entirely and is the safe state to leave the robot in.

The frame builders (\`run_frame\`, \`brake_frame\`, …) are pure and return the exact
bytes put on the wire, so the command encoding is unit-testable under CPython
without an I²C bus.
"""

# --- Protocol ----------------------------------------------------------------
# Commands, verified against Seeed's Grove_Motor_Driver_TB6612FNG library.
# Every frame is [command, arg...] written to the device address.
_CMD_BRAKE = 0x00
_CMD_STOP = 0x01
_CMD_CW = 0x02
_CMD_CCW = 0x03
_CMD_STANDBY = 0x04
_CMD_NOT_STANDBY = 0x05
_CMD_SET_ADDR = 0x11

DEFAULT_ADDR = 0x14

#: Motor channel ids, as the board numbers them.
CH_A = 0
CH_B = 1

#: Max magnitude of a speed value (8-bit PWM).
MAX_SPEED = 255


def run_frame(channel, speed):
    """Bytes for "drive \`channel\` at \`speed\`". Pure.

    \`speed\` is -255..255; the sign picks the direction command (\`\`0x02\`\` CW /
    \`\`0x03\`\` CCW) and the magnitude is sent as the PWM value. Out-of-range
    speeds are clamped rather than rejected, matching the vendor library.
    """
    if speed > MAX_SPEED:
        speed = MAX_SPEED
    elif speed < -MAX_SPEED:
        speed = -MAX_SPEED
    cmd = _CMD_CW if speed >= 0 else _CMD_CCW
    return bytes([cmd, channel, abs(speed)])


def power_to_speed(power):
    """Map a signed power in [-1.0, 1.0] to a -255..255 speed. Pure.

    This is the seam with \`teleop.arcade_mix\`, which speaks in normalised wheel
    powers — so a gamepad can drive this board without either module knowing
    about the other's units.
    """
    if power > 1.0:
        power = 1.0
    elif power < -1.0:
        power = -1.0
    return int(round(power * MAX_SPEED))


def brake_frame(channel):
    """Bytes for "brake \`channel\`" — an active stop, windings shorted. Pure."""
    return bytes([_CMD_BRAKE, channel])


def stop_frame(channel):
    """Bytes for "stop \`channel\`" — outputs released, the motor coasts. Pure."""
    return bytes([_CMD_STOP, channel])


def standby_frame(on=True):
    """Bytes for entering (\`on\`) or leaving standby. Pure."""
    return bytes([_CMD_STANDBY if on else _CMD_NOT_STANDBY, 0x00])


def set_addr_frame(addr):
    """Bytes for permanently re-addressing the board. Pure.

    Valid addresses are \`\`0x01\`\`..\`\`0x7F\`\`; the change persists across power
    cycles, so the board will no longer answer on its old address.
    """
    if not 0x00 < addr < 0x80:
        raise ValueError("I2C address out of range: 0x%02x" % addr)
    return bytes([_CMD_SET_ADDR, addr])


class GroveMotorDriver:
    """Driver for a Grove I²C Motor Driver (TB6612FNG) on an I²C bus."""

    def __init__(self, i2c, addr=DEFAULT_ADDR):
        self._i2c = i2c
        self._addr = addr

    @property
    def addr(self):
        """The I²C address this instance is talking to."""
        return self._addr

    def _send(self, frame):
        from time import sleep_ms

        self._i2c.writeto(self._addr, frame)
        # The board's firmware needs a moment between commands; the vendor
        # library delays 1 ms after every one.
        sleep_ms(1)

    def run(self, channel, speed):
        """Drive \`channel\` (\`CH_A\`/\`CH_B\`) at \`speed\`, -255..255."""
        self._send(run_frame(channel, speed))

    def brake(self, channel):
        """Actively brake \`channel\` (shorts the windings)."""
        self._send(brake_frame(channel))

    def stop(self, channel):
        """Release \`channel\`'s outputs so the motor coasts."""
        self._send(stop_frame(channel))

    def stop_all(self):
        """Coast both motors — the usual "end of move" state."""
        self.stop(CH_A)
        self.stop(CH_B)

    def drive(self, left_power, right_power):
        """Apply signed powers in [-1, 1] to channel A (left) and B (right).

        Pairs directly with \`teleop.arcade_mix\`::

            drive.drive(*arcade_mix(lx, ly))
        """
        self.run(CH_A, power_to_speed(left_power))
        self.run(CH_B, power_to_speed(right_power))

    def standby(self):
        """Disable both H-bridges. The safe state to leave the robot in."""
        self._send(standby_frame(True))

    def wake(self):
        """Leave standby. Nothing will turn until this has been called."""
        self._send(standby_frame(False))

    def set_address(self, addr):
        """PERMANENTLY re-address the board (persists across power cycles)."""
        from time import sleep_ms

        self._i2c.writeto(self._addr, set_addr_frame(addr))
        self._addr = addr
        sleep_ms(100)
`,ut=`# SPDX-License-Identifier: MIT
"""Teleop receiver — gamepad axes -> motor outputs (Snakie module #120).

This is the helper behind the dock **Gamepad** instrument. The IDE writes control
lines (\`\`SNKCMD teleop axes=lx:0.5,ly:-0.2 …\`\`) which the on-device
\`\`instruments.control\`\` helper parses; this module turns those normalised
\`\`lx\`\`/\`\`ly\`\` axes into per-wheel drive values for a differential-drive robot.

Usage on a board::

    from machine import Pin, PWM
    from teleop import arcade_mix, TeleopDrive
    import instruments as inst

    drive = TeleopDrive(left=PWM(Pin(16)), right=PWM(Pin(17)))
    while True:
        inst.control.poll()
        ax = inst.control.axes('teleop')          # {'lx':…, 'ly':…}
        drive.apply(ax.get('lx', 0), ax.get('ly', 0))

\`arcade_mix\` (and \`clamp\`) are pure and unit-testable under CPython with no PWM.
"""


def clamp(value, lo=-1.0, hi=1.0):
    """Clamp \`value\` to the inclusive [\`lo\`, \`hi\`] range. Pure."""
    if value < lo:
        return lo
    if value > hi:
        return hi
    return value


def arcade_mix(throttle, steering):
    """Mix a throttle + steering axis into \`\`(left, right)\`\` wheel values. Pure.

    \`throttle\` (forward/back) and \`steering\` (turn) are normalised in [-1, 1];
    the result is each wheel's signed power in [-1, 1] (arcade/single-stick
    mixing). This is the whole teleop maths, hardware-free so the IDE can test it.
    """
    throttle = clamp(throttle)
    steering = clamp(steering)
    return clamp(throttle + steering), clamp(throttle - steering)


def _duty_u16(power):
    """Map a signed power [-1, 1] to a 16-bit PWM duty magnitude. Pure helper."""
    return int(round(abs(clamp(power)) * 65535))


class TeleopDrive:
    """Differential-drive mixer that applies gamepad axes to two PWM motors.

    \`left\` / \`right\` are \`machine.PWM\` objects (or anything exposing
    \`\`duty_u16\`\`). Direction pins are optional; without them only magnitude is
    driven (suitable for a simple ESC / a single-direction test).
    """

    def __init__(self, left, right, left_dir=None, right_dir=None):
        self._left = left
        self._right = right
        self._left_dir = left_dir
        self._right_dir = right_dir

    def apply(self, throttle, steering):
        """Mix and drive both motors from a throttle + steering axis."""
        lp, rp = arcade_mix(throttle, steering)
        self._set(self._left, self._left_dir, lp)
        self._set(self._right, self._right_dir, rp)
        return lp, rp

    @staticmethod
    def _set(motor, dir_pin, power):
        if dir_pin is not None:
            dir_pin.value(1 if power >= 0 else 0)
        motor.duty_u16(_duty_u16(power))

    def stop(self):
        """Cut power to both motors."""
        self._left.duty_u16(0)
        self._right.duty_u16(0)
`,pt=`"""Snakie Instruments — the on-device robotics telemetry + control toolkit.

Copy this file onto your MicroPython board (a Pico, etc.) and \`\`import\`\` it.
Instead of the IDE polling the board over the raw REPL (which interrupts a
running program), your program *prints* readings with these helpers and the
IDE *parses the serial stream* — so it works non-invasively, even inside a
tight \`\`while True:\`\` loop. The reverse direction (IDE → board) is the
**control channel**: the IDE writes \`\`SNKCMD …\`\` lines and the \`\`control\`\`
helper here polls stdin non-blockingly and hands you the latest values.

Quick start
-----------

::

    import time
    from machine import ADC, PWM, Pin
    import instruments as inst

    pwm = PWM(Pin(0)); pwm.freq(1000); pwm.duty_u16(32768)
    adc = ADC(26)

    while True:
        inst.read_pwm(pwm, ch="pwm")        # -> Oscilloscope
        inst.read_adc(adc, ch="adc0")       # -> Multimeter
        inst.plot(temp=21.4, light=80)      # -> Plotter
        inst.imu(0.0, 1.2, 90.0)            # -> 3-D attitude
        inst.distance(123)                  # -> range view
        inst.control.poll()                 # <- read IDE commands
        ax = inst.control.axes("teleop")    # {'lx': 0.5, 'ly': -0.2, ...}
        time.sleep(0.1)

The telemetry protocol
----------------------

Each emitter does a single \`\`print()\`\` of ONE line, prefixed with the sentinel
token \`\`SNK\`\` so the IDE can route the line to the right instrument and hide it
from the console. One reading per line, ASCII, space-delimited::

    SNK SCOPE <ch> <value>
    SNK METER <ch> <value> [<unit>]
    SNK PLOT  <tok> [<tok> ...]                 # each <tok> is name=value or a number
    SNK IMU   <ch> <roll> <pitch> <yaw>         # Euler angles, degrees
    SNK IMUQ  <ch> <w> <x> <y> <z>              # orientation quaternion
    SNK DIST  <ch> <mm> [<angle>]               # range mm, optional bearing deg
    SNK BTN   <name> <0|1>                       # button up(0)/down(1)
    SNK ENC   <ch> <count> [<0|1>]               # encoder count, optional press
    SNK SCR   <addr> text <row> [<row> ...]      # rows: spaces encoded as '_'
    SNK SCR   <addr> fb <w> <h> <enc> <data>     # framebuffer, enc in {b64,rle}
    SNK I2C   <addr> [<addr> ...]                # one bus-scan result set
    SNK WIFI  <ssid> <rssi> <ch> <sec>           # one network (SSID spaces -> '_')
    SNK BT    <name> <mac> <rssi>                # one BLE device (name spaces -> '_')

\`\`<ch>\`\`/\`\`<name>\`\` are user labels the IDE uses to match a reading to an open
instrument. The emitters are pure \`\`str\`\` formatting + one \`\`print\`\` (no
allocation-heavy work, no blocking) so they are safe to call at speed in a loop.
The **scanners** (\`\`i2c_scan\`\`/\`\`wifi_scan\`\`/\`\`bt_scan\`\`) block briefly to run
the scan, then emit the result set — call them occasionally, not every loop.

The control protocol (IDE -> board)
-----------------------------------

The IDE writes one line per command, mirroring the \`\`SNK\`\` sentinel so the
Terminal hides it::

    SNKCMD <target> <payload>

\`\`<target>\`\` names what to drive (\`\`teleop\`\`, \`\`led\`\`, \`\`buzzer\`\`, \`\`screen\`\`,
or a scan trigger like \`\`scan:i2c\`\`); \`\`<payload>\`\` is free-form for that
target. \`\`control\`\` stores the LATEST payload per target; poll it in your loop::

    inst.control.poll()                       # drain pending SNKCMD lines (non-blocking)
    inst.control.get("led")                   # latest raw payload string, or None
    inst.control.axes("teleop")               # {'lx': 0.5, ...} from axes=lx:0.5,...
    inst.control.pressed("teleop", "a")       # True if 'btn:a=1' present
"""

import sys

# Real machine.Pin / machine.PWM on a board; tiny no-op stubs under CPython (the
# Snakie simulator runs exported device code headless). Re-exported so generated
# code can fall back to \`from instruments import Pin, PWM\` and still run in the
# simulator, where the Servo emits SNK telemetry to drive the 3-D model anyway.
try:
    from machine import Pin, PWM  # noqa: F401 - re-exported for generated code
except ImportError:  # pragma: no cover - CPython simulator has no \`machine\`

    class Pin:  # noqa: N801 - mirror machine.Pin's name
        OUT = 1
        IN = 0

        def __init__(self, n, *args, **kwargs):
            self.id = n

        def value(self, *args):
            return 0

    class PWM:  # noqa: N801 - mirror machine.PWM's name
        def __init__(self, pin, *args, **kwargs):
            self.pin = pin

        def freq(self, *args):
            return 50

        def duty_u16(self, *args):
            return 0

        def deinit(self):
            pass


# Library version. Bump this on ANY change to this file — the IDE compares it
# against the copy installed on the board and offers a one-click UPDATE when they
# differ (a legacy copy with no __version__ reads as out-of-date). Keep the
# \`__version__ = "X.Y.Z"\` literal form so the IDE can parse it without importing.
__version__ = "0.10.0"

# The sentinel that prefixes every telemetry line. Kept short + ASCII so it is
# cheap to print and easy for the IDE to detect / strip.
SENTINEL = "SNK"

# The sentinel that prefixes IDE -> board control lines (issue #115). Mirrors
# SENTINEL so the IDE's Terminal hides the echo exactly as it hides telemetry.
CONTROL_SENTINEL = "SNKCMD"


# ---------------------------------------------------------------------------
# Emitters — telemetry, board -> IDE (read). Each is a single cheap print().
# ---------------------------------------------------------------------------

def scope(value, ch="ch1"):
    """Emit one oscilloscope sample \`\`value\`\` for channel \`\`ch\`\`.

    Prints \`\`SNK SCOPE <ch> <value>\`\`. Call repeatedly in a loop to feed a live
    waveform to an open Oscilloscope whose source matches \`\`ch\`\`.
    """
    print("%s SCOPE %s %s" % (SENTINEL, ch, value))


def meter(value, ch="adc0", unit="V"):
    """Emit one multimeter reading \`\`value\`\` (with \`\`unit\`\`) for channel \`\`ch\`\`.

    Prints \`\`SNK METER <ch> <value> <unit>\`\`. The IDE shows the latest value and
    folds it into the meter's MIN/MAX/AVG.
    """
    print("%s METER %s %s %s" % (SENTINEL, ch, value, unit))


def plot(*args, **kwargs):
    """Emit one plotter row of bare numbers and/or named series.

    \`\`plot(1, 2, 3)\`\` prints \`\`SNK PLOT 1 2 3\`\`; \`\`plot(temp=21.4, light=80)\`\`
    prints \`\`SNK PLOT temp=21.4 light=80\`\`; the two styles can be mixed. Each
    token uses the Plotter's own \`\`name=value\`\` / bare-number grammar.
    """
    toks = [str(a) for a in args]
    # \`kwargs\` preserves insertion order on MicroPython + CPython 3.7+, so the
    # series appear in the order the caller named them.
    for name, val in kwargs.items():
        toks.append("%s=%s" % (name, val))
    print("%s PLOT %s" % (SENTINEL, " ".join(toks)))


def imu(roll, pitch, yaw, ch="imu"):
    """Emit one IMU orientation as Euler angles (degrees) on channel \`\`ch\`\`.

    Prints \`\`SNK IMU <ch> <roll> <pitch> <yaw>\`\` for a live 3-D attitude view.
    """
    print("%s IMU %s %s %s %s" % (SENTINEL, ch, roll, pitch, yaw))


def imu_quat(w, x, y, z, ch="imu"):
    """Emit one IMU orientation as a quaternion (drift/gimbal-lock free).

    Prints \`\`SNK IMUQ <ch> <w> <x> <y> <z>\`\`.
    """
    print("%s IMUQ %s %s %s %s %s" % (SENTINEL, ch, w, x, y, z))


def env(temp, pressure, humidity, ch="env"):
    """Emit one environmental reading — temperature (°C), barometric pressure
    (hPa) and relative humidity (%RH) — on channel \`\`ch\`\`.

    Prints \`\`SNK ENV <ch> <temp> <pressure> <humidity>\`\` for the Barometer
    instrument (#216)::

        t, p, h = bme.read()
        inst.env(t, p, h)
    """
    print("%s ENV %s %s %s %s" % (SENTINEL, ch, temp, pressure, humidity))


def distance(mm, angle=None, ch="dist"):
    """Emit one distance reading in millimetres, with an optional bearing.

    Prints \`\`SNK DIST <ch> <mm>\`\` (or \`\`… <mm> <angle>\`\` when \`\`angle\`\` is given,
    e.g. a sweeping servo's degrees) for a range / proximity view.
    """
    if angle is None:
        print("%s DIST %s %s" % (SENTINEL, ch, mm))
    else:
        print("%s DIST %s %s %s" % (SENTINEL, ch, mm, angle))


def button(name, state):
    """Emit a button event \`\`name\`\` as down(1)/up(0).

    Prints \`\`SNK BTN <name> <0|1>\`\` — \`\`state\`\` is coerced to \`\`1\`\` if truthy.
    """
    print("%s BTN %s %s" % (SENTINEL, name, 1 if state else 0))


def encoder(count, ch="enc", pressed=None):
    """Emit a rotary-encoder \`\`count\`\` for channel \`\`ch\`\`, optionally its press.

    Prints \`\`SNK ENC <ch> <count>\`\` (or \`\`… <count> <0|1>\`\` when \`\`pressed\`\` is
    not \`\`None\`\`, for an encoder with an integrated push switch).
    """
    if pressed is None:
        print("%s ENC %s %s" % (SENTINEL, ch, count))
    else:
        print("%s ENC %s %s %s" % (SENTINEL, ch, count, 1 if pressed else 0))


def _scr_token(text):
    """Encode one screen row as a single ASCII token (spaces -> '_')."""
    return str(text).replace(" ", "_")


def screen(lines, addr="0x3C"):
    """Emit a small display's TEXT contents as rows.

    \`\`lines\`\` is an iterable of strings (one per row). Prints
    \`\`SNK SCR <addr> text <row> [<row> ...]\`\` with each row's spaces encoded as
    \`\`_\`\` so a row stays a single token (the IDE decodes them back). \`\`addr\`\` is
    the bus address label (default \`\`0x3C\`\`, a common SSD1306 OLED).
    """
    rows = " ".join(_scr_token(line) for line in lines)
    print("%s SCR %s text %s" % (SENTINEL, addr, rows))


def screen_fb(data, w, h, addr="0x3C", encoding="b64"):
    """Emit a small display's FRAMEBUFFER (a compact monochrome bitmap).

    \`\`data\`\` is the already-packed payload string; \`\`encoding\`\` documents the
    packing so the IDE can unpack it: \`\`b64\`\` (base64 of the raw 1-bpp buffer,
    row-major, MSB-first within each byte) or \`\`rle\`\` (a simple run-length form
    \`\`<count>x<0|1>\`\` repeated). Prints \`\`SNK SCR <addr> fb <w> <h> <enc> <data>\`\`.
    """
    print("%s SCR %s fb %s %s %s %s" % (SENTINEL, addr, w, h, encoding, data))


# ---------------------------------------------------------------------------
# Scanners — run a scan, then emit the result set. These BLOCK briefly; call
# them occasionally (emit-on-complete), not inside a tight loop. They tolerate a
# missing radio (no network/bluetooth) by degrading to no output.
# ---------------------------------------------------------------------------

def i2c_scan(i2c):
    """Scan an I²C bus and emit the responding addresses as one result set.

    Calls \`\`i2c.scan()\`\` and prints \`\`SNK I2C <addr> <addr> …\`\` (addresses as
    \`\`0x..\`\` hex; an empty bus prints a bare \`\`SNK I2C\`\`). \`\`i2c\`\` is a
    \`\`machine.I2C\`\`/\`\`SoftI2C\`\`.
    """
    addrs = list(i2c.scan())
    toks = " ".join("0x%02X" % a for a in addrs)
    print("%s I2C %s" % (SENTINEL, toks) if toks else "%s I2C" % SENTINEL)
    return addrs


def wifi_scan():
    """Scan for Wi-Fi networks (STA mode) and emit one line per network.

    Activates \`\`network.WLAN(STA_IF)\`\`, runs \`\`.scan()\`\` and prints one
    \`\`SNK WIFI <ssid> <rssi> <ch> <sec>\`\` per network (SSID spaces -> \`\`_\`\`).
    Degrades to no output (returns \`\`[]\`\`) when \`\`network\`\` is unavailable.
    """
    try:
        import network
    except ImportError:
        return []
    sta = network.WLAN(network.STA_IF)
    sta.active(True)
    nets = sta.scan()  # (ssid, bssid, channel, rssi, security, hidden)
    out = []
    for net in nets:
        ssid = net[0]
        if isinstance(ssid, (bytes, bytearray)):
            ssid = ssid.decode("utf-8", "replace")
        ssid = ssid or "?"
        ch = net[2]
        rssi = net[3]
        sec = net[4]
        print("%s WIFI %s %s %s %s" % (SENTINEL, _scr_token(ssid), rssi, ch, sec))
        out.append((ssid, rssi, ch, sec))
    return out


def _decode_adv_name(adv_data):
    """Extract the local name from BLE advertising data, or \`\`''\`\`.

    Advertising data is a run of AD structures \`\`<len><type><payload…>\`\`; AD type
    \`\`0x09\`\` is the Complete Local Name and \`\`0x08\`\` the Shortened Local Name.
    Pure + side-effect-free so it is unit-testable under CPython.
    """
    try:
        i = 0
        n = len(adv_data)
        while i + 1 < n:
            length = adv_data[i]
            if length == 0:
                break
            ad_type = adv_data[i + 1]
            if ad_type in (0x09, 0x08):
                return bytes(adv_data[i + 2:i + 1 + length]).decode("utf-8", "replace")
            i += 1 + length
    except Exception:
        pass
    return ""


def bt_scan(ms=4000):
    """Scan for Bluetooth (BLE) devices for ~\`\`ms\`\` and emit one line per device.

    Uses the low-level \`\`bluetooth\`\` module: actives the radio, registers a scan
    IRQ that collects each advertisement's (address, rssi, payload), runs an
    ACTIVE \`\`gap_scan\`\` for \`\`ms\`\` (active so devices return their names), then
    emits one \`\`SNK BT <name> <mac> <rssi>\`\` per unique device (strongest RSSI
    kept). Blocks for ~\`\`ms\`\` — call it on demand, not in a tight loop. Degrades
    to no output (returns \`\`[]\`\`) when \`\`bluetooth\`\` / the BLE radio is absent.
    """
    try:
        import bluetooth
    except ImportError:
        return []
    import time

    _IRQ_SCAN_RESULT = 5
    _IRQ_SCAN_DONE = 6
    found = {}        # addr bytes -> (rssi, adv payload bytes)
    done = [False]

    def _irq(event, data):
        # Scheduled (soft) callback, so small allocations are OK. Copy the addr +
        # payload (they're only valid during the call); keep the strongest RSSI.
        if event == _IRQ_SCAN_RESULT:
            addr_type, addr, adv_type, rssi, adv_data = data
            key = bytes(addr)
            prev = found.get(key)
            if prev is None or rssi > prev[0]:
                found[key] = (rssi, bytes(adv_data))
        elif event == _IRQ_SCAN_DONE:
            done[0] = True

    try:
        ble = bluetooth.BLE()
        ble.active(True)
        ble.irq(_irq)
        # gap_scan(duration_ms, interval_us, window_us, active=True): active scan
        # solicits scan responses so we get device names where advertised.
        ble.gap_scan(int(ms), 30000, 30000, True)
    except Exception:
        return []

    t0 = time.ticks_ms()
    while not done[0] and time.ticks_diff(time.ticks_ms(), t0) < int(ms) + 1500:
        time.sleep_ms(50)
    try:
        ble.gap_scan(None)  # stop scanning if it's still going
    except Exception:
        pass

    out = []
    for addr, (rssi, adv) in found.items():
        mac = ":".join("%02X" % b for b in addr)
        name = _decode_adv_name(adv) or "?"
        emit_bt(name, mac, rssi)
        out.append((name, mac, rssi))
    return out


def emit_bt(name, mac, rssi):
    """Emit one Bluetooth device result (use from your own BLE scan callback).

    Prints \`\`SNK BT <name> <mac> <rssi>\`\` (name spaces -> \`\`_\`\`).
    """
    print("%s BT %s %s %s" % (SENTINEL, _scr_token(name or "?"), mac or "?", rssi))


# ---------------------------------------------------------------------------
# Convenience read helpers — the only ones that touch hardware.
# ---------------------------------------------------------------------------

def read_adc(adc, ch="adc0"):
    """Read \`\`adc\`\` (a \`\`machine.ADC\`\`), emit a meter reading, and return volts.

    Converts the 16-bit \`\`read_u16()\`\` count to volts against a 3.3 V reference,
    \`\`meter\`\`s it on channel \`\`ch\`\` (unit \`\`V\`\`), and returns the volts so the
    caller can also use the value.
    """
    volts = adc.read_u16() / 65535 * 3.3
    meter(volts, ch=ch, unit="V")
    return volts


def read_pwm(pwm, ch="pwm"):
    """Read \`\`pwm\`\` (a \`\`machine.PWM\`\`) and emit a live PWM reading.

    Reads \`\`duty_u16()\`\` as a 0..1 fraction (\`\`/ 65535\`\`) plus \`\`freq()\`\` and
    prints \`\`SNK PWM <ch> <freq> <duty>\`\`. The Oscilloscope draws the idealised
    SQUARE WAVE at this duty/freq (animating as the duty changes) — a real PWM
    picture, not a raw value trace. Passive (friendly REPL), so it never
    interrupts a running loop. Returns the duty fraction.
    """
    duty = pwm.duty_u16() / 65535
    try:
        freq = pwm.freq()
    except Exception:
        freq = 0
    print("%s PWM %s %s %s" % (SENTINEL, ch, freq, duty))
    return duty


# ---------------------------------------------------------------------------
# Control channel — IDE -> board (write). Poll non-blockingly in your loop.
# ---------------------------------------------------------------------------

def parse_control_line(line):
    """Parse one \`\`SNKCMD <target> <payload>\`\` line -> \`\`(target, payload)\`\`.

    Returns \`\`None\`\` for a non-control / malformed line. \`\`payload\`\` is the rest
    of the line after the target (may be empty). Pure + side-effect-free so it is
    unit-testable under CPython.
    """
    if not line:
        return None
    line = line.strip()
    if line == CONTROL_SENTINEL or not line.startswith(CONTROL_SENTINEL + " "):
        return None
    rest = line[len(CONTROL_SENTINEL) + 1:].strip()
    if not rest:
        return None
    sp = rest.find(" ")
    if sp == -1:
        return (rest, "")
    return (rest[:sp], rest[sp + 1:].strip())


def parse_axes(payload):
    """Parse an \`\`axes=lx:0.5,ly:-0.2 …\`\` token out of \`\`payload\`\` -> a dict.

    Returns \`\`{name: float}\`\` for each \`\`name:value\`\` in the \`\`axes=\`\` token
    (bad numbers skipped). An absent \`\`axes=\`\` token yields \`\`{}\`\`. Pure.
    """
    out = {}
    if not payload:
        return out
    for tok in payload.split(" "):
        if not tok.startswith("axes="):
            continue
        for pair in tok[len("axes="):].split(","):
            if ":" not in pair:
                continue
            name, _, val = pair.partition(":")
            try:
                out[name] = float(val)
            except (ValueError, TypeError):
                pass
    return out


def parse_pressed(payload, btn):
    """Is \`\`btn:<btn>=1\`\` present in \`\`payload\`\`? Returns a bool. Pure."""
    if not payload:
        return False
    needle = "btn:%s=1" % btn
    for tok in payload.split(" "):
        if tok == needle:
            return True
    return False


class Control:
    """Non-blocking reader for the IDE -> board control channel (issue #115).

    Call :meth:\`poll\` once per loop iteration: it drains any pending \`\`SNKCMD\`\`
    lines from stdin WITHOUT blocking and stores the LATEST payload per target.
    Then read with :meth:\`get\` / :meth:\`axes\` / :meth:\`pressed\`. Designed to be
    safe inside \`\`while True:\`\` — it never blocks, never corrupts your own
    \`\`print()\`\` output, and degrades gracefully when stdin is not pollable
    (then it is simply inert until you feed it lines yourself via :meth:\`feed\`).
    """

    def __init__(self):
        self._latest = {}        # target -> latest payload string
        self._buf = ""           # partial trailing line between polls
        self._poll = None        # uselect.poll() over stdin, when available
        self._handlers = {}      # target -> callable(payload) registry
        self._last_beat = None   # ticks of the last SNK READY heartbeat
        self._setup_poll()

    def _setup_poll(self):
        """Wire up a non-blocking stdin poller if the platform supports one."""
        try:
            import uselect
            stream = getattr(sys.stdin, "buffer", sys.stdin)
            poller = uselect.poll()
            poller.register(stream, uselect.POLLIN)
            self._poll = (uselect, poller, stream)
        except Exception:
            # No uselect / un-pollable stdin (e.g. CPython host, USB CDC quirks):
            # stay inert; feed() can still drive it for tests / custom transports.
            self._poll = None

    def _read_available(self):
        """Return any bytes/str currently waiting on stdin, or '' (never blocks).

        Reads ONE byte at a time, gated by \`\`poll(0)\`\` each iteration. This is
        the critical bit on a Pico: \`\`stream.read(64)\`\` on USB-CDC stdin BLOCKS
        until 64 bytes arrive (there's no EOF), which would wedge the polling
        loop; \`\`read(1)\`\` after \`\`poll(0)\`\` confirms a byte is ready returns at
        once, so a burst is drained byte-by-byte without ever blocking.
        """
        if self._poll is None:
            return ""
        uselect, poller, stream = self._poll
        chunks = []
        while poller.poll(0):
            try:
                data = stream.read(1)
            except Exception:
                break
            if not data:
                break
            if isinstance(data, (bytes, bytearray)):
                data = data.decode("utf-8", "replace")
            chunks.append(data)
        return "".join(chunks)

    def feed(self, text):
        """Feed raw stdin \`\`text\`\` into the parser (used by :meth:\`poll\`/tests).

        Buffers a partial trailing line across calls; for each COMPLETE line it
        parses a \`\`SNKCMD\`\` and records the latest payload per target (firing any
        registered handler). Non-control lines are ignored. Never blocks/throws.
        """
        self._buf += text
        while True:
            nl = self._buf.find("\\n")
            if nl == -1:
                break
            line = self._buf[:nl]
            self._buf = self._buf[nl + 1:]
            parsed = parse_control_line(line)
            if parsed is None:
                continue
            target, payload = parsed
            self._latest[target] = payload
            handler = self._handlers.get(target)
            if handler is not None:
                try:
                    handler(payload)
                except Exception:
                    pass

    def poll(self):
        """Service the control channel: drain pending commands + heartbeat.

        Call once per main-loop iteration. It reads any waiting \`\`SNKCMD\`\` lines
        (non-blocking) AND emits a \`\`SNK READY\`\` heartbeat ~every 2 s so the IDE
        knows this program is alive and servicing control. Safe inside a tight
        \`\`while True:\`\` — it never blocks.
        """
        text = self._read_available()
        if text:
            self.feed(text)
        self._beat()

    def _beat(self):
        """Emit a \`\`SNK READY\`\` heartbeat ~every 2 s (the IDE's presence signal).

        Caps are the registered handler targets (\`\`scan:wifi\`\`, \`\`buzzer\`\`, …).
        Hidden from the console like all \`\`SNK …\`\` lines.
        """
        try:
            import time
            now = time.ticks_ms() if hasattr(time, "ticks_ms") else int(time.time() * 1000)
            if self._last_beat is not None:
                if hasattr(time, "ticks_diff"):
                    if time.ticks_diff(now, self._last_beat) < 2000:
                        return
                elif (now - self._last_beat) < 2000:
                    return
            self._last_beat = now
            print("%s READY %s" % (SENTINEL, " ".join(self._handlers)))
        except Exception:
            pass

    def get(self, target):
        """The latest payload string for \`\`target\`\`, or \`\`None\`\` if none yet."""
        return self._latest.get(target)

    def axes(self, target):
        """The parsed \`\`axes=…\`\` dict from \`\`target\`\`'s latest payload (\`\`{}\`\`)."""
        return parse_axes(self._latest.get(target))

    def pressed(self, target, btn):
        """Is button \`\`btn\`\` currently pressed in \`\`target\`\`'s latest payload?"""
        return parse_pressed(self._latest.get(target), btn)

    def on(self, target, handler):
        """Register \`\`handler(payload)\`\` to fire when \`\`target\`\` is updated.

        Handy for scan triggers (e.g. \`\`control.on('scan:i2c', do_scan)\`\`); the
        handler runs inside :meth:\`poll\` when a matching command arrives.
        """
        self._handlers[target] = handler


# The shared singleton most programs use: \`\`inst.control.poll()\`\` each loop.
control = Control()


# ---------------------------------------------------------------------------
# Background service — run the control channel + built-in scan triggers on the
# SECOND CORE, so a robot's main loop stays responsive while the IDE drives
# scans / teleop. Built on MicroPython's \`\`_thread\`\` (RP2040 runs it on core 1).
# ---------------------------------------------------------------------------

# What the board can do, announced to the IDE as \`\`SNK READY <caps...>\`\` so a
# panel knows a Snakie program is live (and which triggers it services).
READY_CAPS = ("scan:wifi", "scan:bt", "teleop", "led", "buzzer", "range", "screen", "servo", "servos", "watch")

_service_running = False


def _sleep_ms(ms):
    """Sleep \`\`ms\`\` milliseconds on MicroPython (\`\`sleep_ms\`\`) or CPython."""
    import time
    if hasattr(time, "sleep_ms"):
        time.sleep_ms(ms)
    else:
        time.sleep(ms / 1000.0)


def ready(extra=()):
    """Announce readiness to the IDE: \`\`SNK READY <caps...>\`\`.

    The IDE listens for this to know a Snakie program is running and servicing
    the control channel — so a SCAN button can drive it instead of asking you to
    run a program. \`\`extra\`\` adds capability tokens (e.g. \`\`scan:i2c\`\`).
    """
    caps = list(READY_CAPS) + list(extra)
    print("%s READY %s" % (SENTINEL, " ".join(caps)))


def start(i2c=None, buzzer_pin=None, range_trig=None, range_echo=None,
          screen_sda=None, screen_scl=None, screen_addr=0x3C,
          screen_sck=None, screen_mosi=None, screen_dc=None, screen_rst=None,
          screen_cs=None, screen_w=240, screen_h=240,
          servo_pin=None, background=False, hz=50):
    """Register the built-in control handlers + attach the buzzer, then announce.

    Then call \`\`control.poll()\`\` in your main loop to SERVICE commands — it drains
    the control channel non-blockingly AND emits the \`\`SNK READY\`\` heartbeat the
    IDE uses to detect a running program. Registers:

      * \`\`scan:wifi\`\` / \`\`scan:bt\`\` (and \`\`scan:i2c\`\` when you pass an \`\`i2c\`\` bus),
      * the \`\`buzzer\`\` receiver when you pass \`\`buzzer_pin\`\` — attaches the shared
        :data:\`buzzer\` to \`\`PWM(Pin(n))\`\` so the IDE's Buzzer panel can drive a
        speaker (\`\`tone\`\`/\`\`seq\`\`/\`\`stop\`\`/\`\`pin\`\`),
      * the \`\`range\`\` receiver when you pass BOTH \`\`range_trig\`\` and \`\`range_echo\`\` —
        attaches the shared :data:\`ranger\` to an HC-SR04 so the IDE's Range panel
        can retarget the wiring (\`\`pins <trig> <echo>\`\`); call \`\`inst.ranger.read()\`\`
        in your loop + \`\`inst.distance(mm)\`\` to feed the radar,
      * the \`\`screen\`\` receiver when you pass BOTH \`\`screen_sda\`\` and \`\`screen_scl\`\`
        — builds the shared :data:\`display\` on an I²C SSD1306 OLED so the IDE's
        Display panel can retarget the SDA/SCL pins + address and push text
        (\`\`pins <sda> <scl>\`\` / \`\`addr <0xNN>\`\` / \`\`text <row> …\`\`),
      * \`\`ping\`\` → an immediate \`\`SNK READY\`\` reply.

    The typical loop::

        inst.start(buzzer_pin=0)
        while True:
            inst.control.poll()
            time.sleep(0.02)

    \`\`background=True\`\` is EXPERIMENTAL: it spawns a second-core thread that polls
    for you, so the main loop needn't call \`\`control.poll()\`\`. It is UNRELIABLE on
    RP2040 — the thread shares stdin with the REPL, which can wedge the board on
    Stop / soft-reset — so it is OFF by default. Prefer main-loop polling above.
    """
    extra = ()
    control.on("scan:wifi", lambda payload: wifi_scan())
    control.on("scan:bt", lambda payload: bt_scan())
    if i2c is not None:
        control.on("scan:i2c", lambda payload: i2c_scan(i2c))
        extra = ("scan:i2c",)
    if buzzer_pin is not None:
        buzzer.set_pin(buzzer_pin)
        control.on("buzzer", lambda payload: buzzer_command(payload, buzzer))
    if range_trig is not None and range_echo is not None:
        ranger.set_pins(range_trig, range_echo)
        control.on("range", lambda payload: range_command(payload, ranger))
    # The \`screen\` receiver serves both an I²C SSD1306 (screen_sda/scl) and an
    # ST7789 SPI TFT (screen_sck/mosi/dc/rst). Pre-attach whichever bus was wired;
    # the panel can still retarget either at runtime (\`pins …\` / \`spi …\`).
    if screen_sda is not None and screen_scl is not None:
        display.set_pins(screen_sda, screen_scl, screen_addr)
        control.on("screen", lambda payload: screen_command(payload, display))
    elif screen_sck is not None and screen_mosi is not None:
        display.set_spi(screen_sck, screen_mosi, screen_dc, screen_rst, screen_cs,
                        screen_w, screen_h)
        control.on("screen", lambda payload: screen_command(payload, display))
    # The Servo panel attaches on the fly via \`pin <n>\`, so register it always;
    # pre-attach only if a servo_pin was given.
    if servo_pin is not None:
        servo.set_pin(servo_pin)
    control.on("servo", lambda payload: servo_command(payload, servo))
    # A Robot-View puppet slider drives many servos at once via \`servos\` (#416).
    control.on("servos", lambda payload: servos_command(payload))
    # \`watch\` drives whatever objects the user registered with inst.watch(...).
    control.on("watch", lambda payload: watch_command(payload, _watched))
    control.on("ping", lambda payload: ready(extra))
    ready(extra)
    if background:
        _start_thread(hz)


def _start_thread(hz):
    """EXPERIMENTAL: poll the control channel on the second core (see \`\`start\`\`)."""
    global _service_running
    if _service_running:
        return
    try:
        import _thread
    except ImportError:
        return  # no second core here — call control.poll() in your own loop
    _service_running = True
    _thread.start_new_thread(_service_loop, (hz,))


def _service_loop(hz):
    """Core-1 loop: just poll() (which drains commands + heartbeats) until stop()."""
    delay = max(1, int(1000 / hz)) if hz else 20
    while _service_running:
        try:
            control.poll()
        except Exception:
            pass
        _sleep_ms(delay)
        _sleep_ms(delay)


def stop():
    """Stop the background service + silence the buzzer.

    Sets the run flag false (the core-1 thread exits on its next tick) and aborts
    any in-progress buzzer sequence. Safe to call from the main loop's
    \`\`KeyboardInterrupt\`\` handler so Snakie's Stop button leaves the board quiet
    and the REPL usable.
    """
    global _service_running
    _service_running = False
    try:
        buzzer.stop()
    except Exception:
        pass


# ---------------------------------------------------------------------------
# Receiver helpers — thin actuators driven by the control channel. The protocol
# (the SNKCMD payload grammar) is the deliverable; actuation is minimal/illustrative
# and guards its hardware import so the module still imports under CPython.
# ---------------------------------------------------------------------------

def teleop(target="teleop", ctrl=None):
    """Return \`\`(axes, buttons_payload)\`\` for \`\`target\`\` from the control channel.

    \`\`axes\`\` is the parsed \`\`{name: float}\`\` dict; the raw payload (for custom
    button checks via \`\`ctrl.pressed\`\`) is the latest string. A thin convenience
    over :meth:\`Control.axes\` so a robot loop reads its joystick in one call.
    """
    ctrl = ctrl or control
    return ctrl.axes(target), ctrl.get(target)


class Buzzer:
    """Drive a passive buzzer/speaker from \`\`buzzer\`\` control commands.

    \`\`tone(freq, ms)\`\` plays a single tone; \`\`play_seq(pairs)\`\` plays a list of
    \`\`(freq, ms)\`\` notes in order (\`\`freq\`\` 0 = a silent rest); \`\`stop()\`\`
    silences immediately; \`\`set_pin(n)\`\` (re)targets the PWM pin. Pass a
    \`\`machine.PWM\`\` as \`\`pwm\`\` to actually sound, or build one with \`\`set_pin\`\`;
    with no PWM every call is a no-op (still importable + testable under CPython).

    The IDE pre-parses melodies/RTTTL and sends a compact \`\`seq\`\` note list, so
    the board needs no RTTTL parser. \`\`play(rtttl)\`\` is kept as a thin legacy hook.
    """

    def __init__(self, pwm=None):
        self._pwm = pwm
        # Set by stop() (possibly from the OTHER core) to abort an in-progress
        # play_seq between notes — so Snakie's Stop silences a long melody at once.
        self._abort = False
        # PWM duty (0..65535) used while a note sounds — the IDE's VOLUME slider
        # sets it via the \`vol\` command (set_volume); 32768 = 50% by default.
        self._duty = 32768

    def set_volume(self, level):
        """Set the sounding duty from a 0..1 \`\`level\`\` (the IDE VOLUME slider)."""
        try:
            self._duty = max(0, min(65535, int(float(level) * 65535)))
        except (ValueError, TypeError):
            pass

    def set_pin(self, n):
        """(Re)target the PWM pin: build \`\`PWM(Pin(n))\`\` (no-op without hardware).

        Silences any current tone first. Guards the \`\`machine\`\` import so the
        module stays importable/testable under CPython — when \`\`machine\`\` is
        unavailable this is inert and \`\`_pwm\`\` is left as-is.
        """
        self.stop()
        try:
            from machine import Pin, PWM
        except ImportError:
            return
        self._pwm = PWM(Pin(int(n)))

    def tone(self, freq, ms=200):
        """Sound \`\`freq\`\` Hz for \`\`ms\`\` (no-op without a PWM pin)."""
        if self._pwm is None:
            return
        import time
        self._pwm.freq(int(freq))
        self._pwm.duty_u16(self._duty)
        time.sleep_ms(int(ms)) if hasattr(time, "sleep_ms") else time.sleep(ms / 1000)
        self._pwm.duty_u16(0)

    def stop(self):
        """Silence the buzzer NOW (duty 0) and abort any running sequence.

        Safe without a PWM pin, and safe to call from the OTHER core (it only
        flips a flag + zeroes the duty), so the main loop's Ctrl-C handler can
        cut a melody that's mid-play on the service core.
        """
        self._abort = True
        if self._pwm is not None:
            self._pwm.duty_u16(0)

    def play_seq(self, pairs):
        """Play a list of \`\`(freq, ms)\`\` notes in order; \`\`freq\`\` 0 is a rest.

        Blocking (runs on core 1 in the background service): for each note it
        sets the frequency + duty and sleeps \`\`ms\`\`, then briefly silences before
        the next so adjacent same-pitch notes are distinct. A \`\`freq\`\` of 0 sleeps
        silently for \`\`ms\`\`. No-op without a PWM pin.
        """
        if self._pwm is None:
            return
        import time
        sleep_ms = time.sleep_ms if hasattr(time, "sleep_ms") else (
            lambda ms: time.sleep(ms / 1000)
        )
        self._abort = False
        for freq, ms in pairs:
            if self._abort:  # stop() was called (maybe from the other core)
                break
            freq = int(freq)
            ms = int(ms)
            if freq > 0:
                self._pwm.freq(freq)
                self._pwm.duty_u16(self._duty)
            else:
                self._pwm.duty_u16(0)
            sleep_ms(ms)
            self._pwm.duty_u16(0)
            sleep_ms(20)

    def play(self, rtttl):
        """Play an RTTTL string (legacy hook — the IDE prefers \`\`seq\`\`).

        Left minimal on purpose: the IDE pre-parses RTTTL and sends a \`\`seq\`\`
        note list, so a real RTTTL parser on-board is optional. Returns the input.
        """
        return rtttl


def parse_seq(payload):
    """Parse a \`\`seq\`\` payload (\`\`<freq:ms>,<freq:ms>,…\`\`) → \`\`[(freq, ms), …]\`\`.

    Each pair is \`\`freq:ms\`\` (\`\`freq\`\` 0 = a rest). Whitespace and malformed pairs
    are tolerated/skipped. Pure + side-effect-free so it is unit-testable under
    CPython. \`\`parse_seq("440:200,0:100")\`\` → \`\`[(440, 200), (0, 100)]\`\`.
    """
    out = []
    if not payload:
        return out
    for tok in payload.replace(" ", "").split(","):
        if not tok or ":" not in tok:
            continue
        fs, _, ds = tok.partition(":")
        try:
            out.append((int(fs), int(ds)))
        except (ValueError, TypeError):
            continue
    return out


def buzzer_command(payload, buz=None):
    """Drive \`\`buz\`\` (a :class:\`Buzzer\`) from one \`\`buzzer\`\` control payload.

    Parses the \`\`<verb> <args>\`\` grammar and actuates:

      * \`\`tone <freq> <ms>\`\` → \`\`buz.tone(freq, ms)\`\`
      * \`\`seq <freq:ms>,…\`\`  → \`\`buz.play_seq([...])\`\` (\`\`freq\`\` 0 = rest)
      * \`\`stop\`\`             → \`\`buz.stop()\`\`
      * \`\`pin <n>\`\`          → \`\`buz.set_pin(n)\`\`
      * \`\`vol <0..1>\`\`       → \`\`buz.set_volume(level)\`\` (PWM duty)

    Defaults \`\`buz\`\` to the shared :data:\`buzzer\` singleton. Never raises on a
    malformed payload (it is fed from the IDE). Returns the verb it handled (or
    \`\`None\`\`), which keeps it easy to unit-test against a fake PWM.
    """
    buz = buz if buz is not None else buzzer
    if not payload:
        return None
    payload = payload.strip()
    sp = payload.find(" ")
    if sp == -1:
        verb, args = payload, ""
    else:
        verb, args = payload[:sp], payload[sp + 1:].strip()
    try:
        if verb == "tone":
            parts = args.split()
            freq = int(parts[0]) if len(parts) >= 1 else 0
            ms = int(parts[1]) if len(parts) >= 2 else 200
            buz.tone(freq, ms)
        elif verb == "seq":
            buz.play_seq(parse_seq(args))
        elif verb == "stop":
            buz.stop()
        elif verb == "pin":
            buz.set_pin(int(args.split()[0]))
        elif verb == "vol":
            buz.set_volume(float(args.split()[0]))
        else:
            return None
    except (ValueError, IndexError, TypeError):
        return None
    return verb


def _us_to_mm(us):
    """Convert an HC-SR04 echo pulse width (µs) to a distance in mm.

    Sound travels ~343 m/s ≈ 0.343 mm/µs; the echo pulse times the round trip
    (out + back), so halve it: \`\`0.343 / 2 = 0.1715\`\` mm per µs. Pure + integer
    result so it is cheap to call in a loop and easy to unit-test under CPython.
    """
    return int(us * 0.1715)


class Rangefinder:
    """Read an HC-SR04 ultrasonic distance sensor from \`\`range\`\` control commands.

    Two pins: \`\`trig\`\` (an OUTPUT the board pulses ~10 µs high to fire a ping) and
    \`\`echo\`\` (an INPUT that goes high for the round-trip flight time). \`\`read()\`\`
    fires a ping and times the echo with \`\`machine.time_pulse_us\`\`, returning the
    distance in **mm** (or \`\`None\`\` on a timeout / no pins). \`\`set_pins(trig, echo)\`\`
    (re)targets the wiring; the IDE's Range panel sends \`\`range pins <trig> <echo>\`\`
    when its TRIG/ECHO selectors change. Guards the \`\`machine\`\` import so the module
    stays importable/testable under CPython — with no hardware \`\`read()\`\` returns
    \`\`None\`\` and every call is a safe no-op.
    """

    def __init__(self, trig=None, echo=None):
        self._trig = None
        self._echo = None
        if trig is not None and echo is not None:
            self.set_pins(trig, echo)

    def set_pins(self, trig, echo):
        """(Re)target the trig (OUT) + echo (IN) pins; idle trig low.

        Builds \`\`Pin(int(trig), Pin.OUT)\`\` + \`\`Pin(int(echo), Pin.IN)\`\` and drops
        trig low so the next \`\`read()\`\` starts from a clean state. Guards the
        \`\`machine\`\` import so the module stays importable under CPython — when
        \`\`machine\`\` is unavailable this is inert and the pins are left as-is.
        """
        try:
            from machine import Pin
        except ImportError:
            return
        self._trig = Pin(int(trig), Pin.OUT)
        self._echo = Pin(int(echo), Pin.IN)
        self._trig.value(0)

    def read(self):
        """Fire one ping and return the distance in mm, or \`\`None\`\`.

        Pulses trig high ~10 µs to launch a burst, then times the echo pulse with
        \`\`machine.time_pulse_us(echo, 1, 30000)\`\` (a 30 ms ≈ 5 m timeout). Returns
        \`\`None\`\` when there are no pins, \`\`machine\`\` is unavailable, or the pulse
        times out (\`\`time_pulse_us\`\` returns a negative value); otherwise converts
        the round-trip µs to mm via :func:\`_us_to_mm\`. Safe to call in a loop.
        """
        if self._trig is None or self._echo is None:
            return None
        try:
            import machine
            import time
        except ImportError:
            return None
        self._trig.value(0)
        time.sleep_us(2) if hasattr(time, "sleep_us") else time.sleep(0.000002)
        self._trig.value(1)
        time.sleep_us(10) if hasattr(time, "sleep_us") else time.sleep(0.00001)
        self._trig.value(0)
        try:
            dur = machine.time_pulse_us(self._echo, 1, 30000)
        except Exception:
            return None
        if dur < 0:
            return None
        return _us_to_mm(dur)


def range_command(payload, rf=None):
    """Drive \`\`rf\`\` (a :class:\`Rangefinder\`) from one \`\`range\`\` control payload.

    Parses the \`\`<verb> <args>\`\` grammar and actuates:

      * \`\`pins <trig> <echo>\`\` → \`\`rf.set_pins(trig, echo)\`\` (retarget the wiring)

    Defaults \`\`rf\`\` to the shared :data:\`ranger\` singleton. Never raises on a
    malformed payload (it is fed from the IDE). Returns the verb it handled (or
    \`\`None\`\`), which keeps it easy to unit-test against a fake/real Rangefinder.
    """
    rf = rf if rf is not None else ranger
    if not payload:
        return None
    payload = payload.strip()
    sp = payload.find(" ")
    if sp == -1:
        verb, args = payload, ""
    else:
        verb, args = payload[:sp], payload[sp + 1:].strip()
    try:
        if verb == "pins":
            parts = args.split()
            rf.set_pins(int(parts[0]), int(parts[1]))
        else:
            return None
    except (ValueError, IndexError, TypeError):
        return None
    return verb


class Led:
    """Drive an LED (on/off, PWM brightness, or RGB) from \`\`led\`\` commands.

    \`\`set(on)\`\` toggles a digital pin; \`\`pwm(level)\`\` sets 0..1 brightness on a
    PWM pin; \`\`rgb(r,g,b)\`\` sets three 0..255 channels. Construct with whichever
    of \`\`pin\`\` (digital), \`\`pwm\`\` (single PWM), or \`\`rgb\`\` (3-tuple of PWMs) you
    have; missing hardware -> the matching call is a no-op.
    """

    def __init__(self, pin=None, pwm=None, rgb=None):
        self._pin = pin
        self._pwm = pwm
        self._rgb = rgb

    def set(self, on):
        """Turn the digital LED on/off (no-op without a pin)."""
        if self._pin is not None:
            self._pin.value(1 if on else 0)

    def pwm(self, level):
        """Set 0..1 brightness on the PWM LED (no-op without a PWM pin)."""
        if self._pwm is not None:
            level = max(0.0, min(1.0, float(level)))
            self._pwm.duty_u16(int(level * 65535))

    def rgb(self, r, g, b):
        """Set an RGB LED's 0..255 channels (no-op without 3 PWMs)."""
        if self._rgb is not None:
            chans = (r, g, b)
            for pwm, val in zip(self._rgb, chans):
                pwm.duty_u16(int(max(0, min(255, int(val))) / 255 * 65535))


class Screen:
    """Drive a text display from \`\`screen\`\` commands + echo to the IDE.

    \`\`text(lines, addr=...)\`\` both pushes the rows to an attached \`\`display\`\`
    (anything with a \`\`.text\`\`/\`\`.show\`\` API, optional) AND emits a
    \`\`SNK SCR … text …\`\` telemetry line so the IDE mirrors it. With no display
    attached it is purely the telemetry echo.
    """

    def __init__(self, display=None, addr="0x3C"):
        self._display = display
        self._addr = addr

    def text(self, lines, addr=None):
        """Show + echo \`\`lines\`\` (an iterable of row strings)."""
        addr = addr or self._addr
        rows = list(lines)
        disp = self._display
        if disp is not None and hasattr(disp, "text") and hasattr(disp, "show"):
            try:
                disp.fill(0)
                for i, row in enumerate(rows):
                    disp.text(str(row), 0, i * 10)
                disp.show()
            except Exception:
                pass
        screen(rows, addr=addr)


# ---------------------------------------------------------------------------
# I²C display (SSD1306 OLED) — pin mux + a real driver + the \`screen\` receiver.
# ---------------------------------------------------------------------------

# The RP2040 (Pico) I²C pin mux: each block exposes SDA/SCL on a fixed set of
# GPIOs. A pair is valid iff BOTH pins belong to the SAME block (SDA from its SDA
# set AND SCL from its SCL set). These tables back :func:\`_i2c_block_for_pins\` and
# the IDE's invalid-pin warning, so keep them in lock-step with the panel's mux.
_I2C0_SDA = (0, 4, 8, 12, 16, 20)
_I2C0_SCL = (1, 5, 9, 13, 17, 21)
_I2C1_SDA = (2, 6, 10, 14, 18, 26)
_I2C1_SCL = (3, 7, 11, 15, 19, 27)


def _i2c_block_for_pins(sda, scl):
    """Return the RP2040 I²C block (0 or 1) a \`\`(sda, scl)\`\` pair selects, or None.

    A pair is valid only when both pins live in the SAME block's SDA/SCL sets
    (see the mux tables above): block 0 wants SDA∈{0,4,8,12,16,20} & SCL∈{1,5,9,
    13,17,21}; block 1 wants SDA∈{2,6,10,14,18,26} & SCL∈{3,7,11,15,19,27}. Any
    cross-block pair or an unknown pin yields \`\`None\`\` (the IDE warns and the driver
    raises a guided error). Pure + side-effect-free for unit tests.
    """
    try:
        sda = int(sda)
        scl = int(scl)
    except (TypeError, ValueError):
        return None
    if sda in _I2C0_SDA and scl in _I2C0_SCL:
        return 0
    if sda in _I2C1_SDA and scl in _I2C1_SCL:
        return 1
    return None


def _pins_str(xs):
    """\`0/4/8\` — a compact pin list for the guided pin-pair error messages."""
    return "/".join(str(x) for x in xs)


def _bad_i2c_pair_msg(sda, scl):
    """A guided error for an SDA/SCL pair that isn't on one I²C block — names the
    valid pins of each bus so the user can pick a matching pair (issue: XIAO I²C1)."""
    return (
        "SDA GP%s / SCL GP%s aren't a valid I2C pair. On the RP2040/RP2350 each pin "
        "is fixed to one bus: I2C0 = SDA(%s)+SCL(%s); I2C1 = SDA(%s)+SCL(%s). Use two "
        "pins from the same bus (the XIAO's onboard screen is SDA GP6 + SCL GP7 on I2C1)."
        % (sda, scl, _pins_str(_I2C0_SDA), _pins_str(_I2C0_SCL),
           _pins_str(_I2C1_SDA), _pins_str(_I2C1_SCL))
    )


# The RP2040 SPI pin mux: each block drives SCK/MOSI(TX) on a fixed set of GPIOs.
# A pair is valid iff both pins live in the SAME block. Backs :func:\`_spi_block_for_pins\`
# and the IDE's ST7789 invalid-pin warning (kept in lock-step with the panel's mux).
_SPI0_SCK = (2, 6, 18, 22)
_SPI0_TX = (3, 7, 19, 23)
_SPI1_SCK = (10, 14, 26)
_SPI1_TX = (11, 15, 27)


def _spi_block_for_pins(sck, mosi):
    """Return the RP2040 SPI block (0 or 1) a \`\`(sck, mosi)\`\` pair selects, or None.

    Valid only when both pins live in the SAME block's SCK/TX sets: block 0 wants
    SCK∈{2,6,18,22} & MOSI∈{3,7,19,23}; block 1 wants SCK∈{10,14,26} & MOSI∈{11,15,
    27}. Any cross-block pair or unknown pin yields \`\`None\`\` (the IDE warns and the
    driver raises a guided error). Pure + side-effect-free for unit tests.
    """
    try:
        sck = int(sck)
        mosi = int(mosi)
    except (TypeError, ValueError):
        return None
    if sck in _SPI0_SCK and mosi in _SPI0_TX:
        return 0
    if sck in _SPI1_SCK and mosi in _SPI1_TX:
        return 1
    return None


def _bad_spi_pair_msg(sck, mosi):
    """A guided error for an SCK/MOSI pair that isn't on one SPI block."""
    return (
        "SCK GP%s / MOSI GP%s aren't a valid SPI pair. On the RP2040/RP2350 each pin "
        "is fixed to one bus: SPI0 = SCK(%s)+MOSI(%s); SPI1 = SCK(%s)+MOSI(%s). Use two "
        "pins from the same bus."
        % (sck, mosi, _pins_str(_SPI0_SCK), _pins_str(_SPI0_TX),
           _pins_str(_SPI1_SCK), _pins_str(_SPI1_TX))
    )


# The standard SSD1306 init sequence (matches the canonical MicroPython driver).
_SSD1306_INIT = (
    0xAE, 0x20, 0x00, 0x40, 0xA1, 0xA8, 0x3F, 0xC8, 0xD3, 0x00,
    0xDA, 0x12, 0xD5, 0x80, 0xD9, 0xF1, 0xDB, 0x20, 0x81, 0xFF,
    0xA4, 0xA6, 0x8D, 0x14, 0xAF,
)


class _SSD1306:
    """A minimal bundled SSD1306 I²C OLED driver (fallback for no \`\`ssd1306\`\`).

    Uses \`\`framebuf\`\` (MONO_VLSB, the SSD1306 page format) for \`\`fill\`\`/\`\`text\`\`
    and pushes the buffer with \`\`i2c.writeto\`\` in the standard init + addressing
    sequence. Built ONLY when both \`\`framebuf\`\` and a working \`\`machine.I2C\`\` are
    present (guarded by the caller), so the module still imports under CPython.
    """

    def __init__(self, w, h, i2c, addr=0x3C):
        import framebuf
        self.w = w
        self.h = h
        self._i2c = i2c
        self._addr = addr
        self._buf = bytearray((h // 8) * w)
        self._fb = framebuf.FrameBuffer(self._buf, w, h, framebuf.MONO_VLSB)
        for cmd in _SSD1306_INIT:
            self._cmd(cmd)
        self.fill(0)
        self.show()

    def _cmd(self, c):
        self._i2c.writeto(self._addr, bytes((0x80, c)))

    def fill(self, c):
        self._fb.fill(c)

    def text(self, s, x, y, c=1):
        self._fb.text(s, x, y, c)

    def show(self):
        # Window the column/page address to the full panel, then stream the buffer.
        for c in (0x21, 0, self.w - 1, 0x22, 0, (self.h // 8) - 1):
            self._cmd(c)
        self._i2c.writeto(self._addr, b"\\x40" + self._buf)


# ST7789 colour TFT (SPI) — the RAM offset per common panel size, so the address
# window lands on the visible area (ST7789 RAM is 240×320; smaller/rotated panels
# sit at an offset). Keyed by (w, h); unknown sizes fall back to (0, 0).
_ST7789_OFFSETS = {
    (240, 240): (0, 0),
    (240, 320): (0, 0),
    (135, 240): (52, 40),
    (170, 320): (35, 0),
}


# Band height (rows) for the ST7789's chunked renderer. A small reusable strip
# buffer (w × this × 2 bytes ≈ 7.7 KB at 240 px wide) means we NEVER need a
# contiguous full-screen framebuffer — a 240×320 RGB565 frame is ~150 KB and fails
# to allocate on a Pico once a program + this library are loaded (issue: the panel
# looked dead because set_spi swallowed that MemoryError → telemetry-only).
_ST7789_BAND = 16


class _ST7789:
    """A minimal bundled ST7789 SPI TFT driver (no external driver needed).

    Exposes the SAME \`\`fill\`\`/\`\`text\`\`/\`\`show\`\` interface as :class:\`_SSD1306\` so
    :class:\`Display\` drives either transparently — but renders the screen in narrow
    horizontal BANDS through ONE small reusable \`\`framebuf\`\` strip (\`\`w\`\` ×
    :data:\`_ST7789_BAND\` px) instead of a full-screen buffer. The big buffer failed
    to allocate on a Pico once a user program was loaded, so the panel stayed dark;
    the band renderer is what makes it actually light up on real hardware.

    \`\`fill\`\`/\`\`text\`\` just RECORD the intent (a background colour + a list of text
    ops); \`\`show\`\` paints every band from that record. Text is the framebuf 8×8 font
    in white on black. Built ONLY when \`\`framebuf\`\` + \`\`machine\`\` are present.

    NOTE: intentionally illustrative — one text colour, one font, per-size offsets
    for the common panels; \`\`rst\`\` may be \`\`< 0\`\` for boards with NO reset GPIO
    (e.g. the Pimoroni Pico Explorer/Display, whose backlight is hard-wired on and
    whose GP20/21 are I²C). Odd variants may need a different offset/rotation —
    install a dedicated ST7789 driver for full control (mirror + push work either way).
    """

    def __init__(self, spi, dc, cs, rst, w, h):
        import framebuf
        from machine import Pin
        self.w = w
        self.h = h
        self._spi = spi
        self._dc = Pin(int(dc), Pin.OUT)
        self._cs = Pin(int(cs), Pin.OUT) if cs is not None and int(cs) >= 0 else None
        self._rst = Pin(int(rst), Pin.OUT) if rst is not None and int(rst) >= 0 else None
        self._xoff, self._yoff = _ST7789_OFFSETS.get((w, h), (0, 0))
        self._fill = 0x0000          # recorded background colour
        self._ops = []               # recorded (text, x, y, colour) draw ops
        # ONE reusable strip buffer (w × _ST7789_BAND px) — never a full frame.
        self._bandh = _ST7789_BAND
        self._buf = bytearray(w * self._bandh * 2)
        self._fb = framebuf.FrameBuffer(self._buf, w, self._bandh, framebuf.RGB565)
        self._mv = memoryview(self._buf)
        self._reset()
        self._init()
        self.fill(0)
        self.show()

    def _cs_low(self):
        if self._cs is not None:
            self._cs.value(0)

    def _cs_high(self):
        if self._cs is not None:
            self._cs.value(1)

    def _reset(self):
        import time
        if self._rst is not None:
            self._rst.value(1); time.sleep_ms(10)
            self._rst.value(0); time.sleep_ms(10)
            self._rst.value(1); time.sleep_ms(120)

    def _cmd(self, c, data=None):
        self._cs_low()
        self._dc.value(0)
        self._spi.write(bytes((c,)))
        if data is not None:
            self._dc.value(1)
            self._spi.write(bytes(data))
        self._cs_high()

    def _init(self):
        import time
        self._cmd(0x01)              # SWRESET (software — works with no reset GPIO)
        time.sleep_ms(150)
        self._cmd(0x11)              # SLPOUT
        time.sleep_ms(120)
        self._cmd(0x3A, (0x55,))     # COLMOD: 16-bit/px (RGB565)
        self._cmd(0x36, (0x00,))     # MADCTL: row/col order
        self._cmd(0x21)              # INVON — ST7789 needs inversion for true colour
        self._cmd(0x13)              # NORON
        self._cmd(0x29)              # DISPON
        time.sleep_ms(50)

    def fill(self, c):
        # Record the background (0 → black, non-zero → white) + clear text ops.
        self._fill = 0xFFFF if c else 0x0000
        self._ops = []

    def text(self, s, x, y, c=1):
        # Record a text op; show() paints it into whichever band(s) it lands in.
        self._ops.append((s, x, y, 0xFFFF if c else 0x0000))

    def _paint_band(self, top, rows):
        # Address-window this band (offset for smaller panels), then stream its strip.
        x1 = self._xoff + self.w - 1
        y0 = self._yoff + top
        y1 = self._yoff + top + rows - 1
        self._cmd(0x2A, (self._xoff >> 8, self._xoff & 0xFF, x1 >> 8, x1 & 0xFF))  # CASET
        self._cmd(0x2B, (y0 >> 8, y0 & 0xFF, y1 >> 8, y1 & 0xFF))                  # RASET
        self._cs_low()
        self._dc.value(0)
        self._spi.write(bytes((0x2C,)))  # RAMWR
        self._dc.value(1)
        self._spi.write(self._mv[: self.w * rows * 2])
        self._cs_high()

    def show(self):
        # Paint the whole panel band-by-band from the recorded fill + text ops.
        for top in range(0, self.h, self._bandh):
            rows = self._bandh if top + self._bandh <= self.h else self.h - top
            self._fb.fill(self._fill)
            for s, x, y, col in self._ops:
                self._fb.text(s, x, y - top, col)  # framebuf clips out-of-band rows
            self._paint_band(top, rows)


class Display:
    """Drive a real I²C SSD1306 OLED from \`\`screen\`\` commands + echo to the IDE.

    \`\`set_pins(sda, scl, addr=0x3C, w=128, h=64)\`\` derives the RP2040 I²C block
    from the pins (via :func:\`_i2c_block_for_pins\`; a cross-bus pair raises a guided
    error), builds \`\`I2C(block, sda=Pin(sda), scl=Pin(scl))\`\`, then a
    panel: the installed \`\`ssd1306.SSD1306_I2C\`\` if present, else the bundled
    :class:\`_SSD1306\`. \`\`text(lines)\`\` draws each row (\`\`y = i*10\`\`) on the real
    panel AND emits a \`\`SNK SCR <addr> text …\`\` line so the IDE mirrors it.

    Every hardware import is guarded so the module stays importable/testable under
    CPython — with no \`\`machine\`\`/\`\`framebuf\`\` \`\`set_pins\`\` is inert (no panel) and
    \`\`text\`\` is purely the telemetry echo (exactly like the legacy :class:\`Screen\`).
    """

    def __init__(self, addr="0x3C"):
        self._i2c = None
        self._oled = None
        self._addr = addr  # the bus-address LABEL for the SCR echo (e.g. "0x3C")

    def set_pins(self, sda, scl, addr=0x3C, w=128, h=64):
        """(Re)build the I²C bus + the SSD1306 panel on \`\`sda\`\`/\`\`scl\`\`.

        Derives the I²C block from the pins; a cross-bus pair raises a guided
        \`\`ValueError\`\` naming the valid pins (on hardware only — inert under CPython).
        Prefers an installed \`\`ssd1306\`\` driver, falling back to the bundled
        :class:\`_SSD1306\`. Guards every hardware import so it is inert under
        CPython (the panel is left unbuilt; \`\`text\`\` still echoes telemetry).
        """
        self._addr = "0x%02X" % int(addr) if isinstance(addr, int) else str(addr)
        block = _i2c_block_for_pins(sda, scl)
        try:
            from machine import Pin, I2C
        except ImportError:
            return  # no hardware (CPython) — inert; text() still echoes telemetry
        if block is None:
            # A cross-bus pair (e.g. SDA on I²C1, SCL on I²C0) — the hardware would
            # raise a cryptic "bad SDA pin". Fail with a guided message instead.
            raise ValueError(_bad_i2c_pair_msg(sda, scl))
        self._i2c = I2C(block, sda=Pin(int(sda)), scl=Pin(int(scl)))
        try:
            import ssd1306
            self._oled = ssd1306.SSD1306_I2C(w, h, self._i2c, int(addr))
            return
        except Exception:
            pass
        try:
            self._oled = _SSD1306(w, h, self._i2c, int(addr))
        except Exception:
            self._oled = None  # no framebuf / panel — telemetry-only

    def set_spi(self, sck, mosi, dc, rst, cs, w=240, h=240):
        """(Re)build an ST7789 colour TFT on an SPI bus (issue: SPI displays).

        Derives the SPI block from \`\`sck\`\`/\`\`mosi\`\` (a cross-bus pair raises a guided
        error), builds \`\`SPI(block, sck=Pin(sck), mosi=Pin(mosi))\`\` at 30 MHz, then
        the bundled :class:\`_ST7789\` on \`\`dc\`\`/\`\`rst\`\`/\`\`cs\`\` at \`\`w\`\`×\`\`h\`\`. \`\`cs\`\`
        may be \`\`None\`\` / \`\`< 0\`\` (tied low, no CS pin). The echo label becomes
        \`\`st7789\`\` so the IDE's mirror tags the source. Guards every hardware import
        (inert under CPython — the panel stays unbuilt; \`\`text\`\` still echoes
        telemetry); a buffer too big for RAM falls back to telemetry-only.
        """
        self._addr = "st7789"  # single-token label for the SNK SCR echo
        block = _spi_block_for_pins(sck, mosi)
        cs_pin = None if cs is None or int(cs) < 0 else int(cs)
        try:
            from machine import Pin, SPI
        except ImportError:
            self._oled = None
            return  # no hardware (CPython) — inert; text() still echoes telemetry
        if block is None:
            self._oled = None  # cross-bus SCK/MOSI — guide instead of a cryptic error
            raise ValueError(_bad_spi_pair_msg(sck, mosi))
        try:
            spi = SPI(block, baudrate=30_000_000, sck=Pin(int(sck)), mosi=Pin(int(mosi)))
            self._oled = _ST7789(spi, dc, cs_pin if cs_pin is not None else -1, rst, int(w), int(h))
        except Exception:
            self._oled = None  # no framebuf / not enough RAM — telemetry-only

    def set_addr(self, addr):
        """Set the bus-address label used in the \`\`SNK SCR\`\` echo (e.g. \`\`0x3D\`\`)."""
        self._addr = "0x%02X" % int(addr) if isinstance(addr, int) else str(addr)

    def text(self, lines):
        """Draw + echo \`\`lines\`\` (an iterable of row strings).

        Renders each row at \`\`y = i*10\`\` on the real SSD1306 (\`\`fill(0)\`\` →
        \`\`text\`\` per row → \`\`show\`\`) when a panel is attached, then ALWAYS emits a
        \`\`SNK SCR <addr> text …\`\` line so the IDE mirrors it. No-op on the panel
        without hardware; never raises.
        """
        rows = list(lines)
        oled = self._oled
        if oled is not None:
            try:
                oled.fill(0)
                for i, row in enumerate(rows):
                    oled.text(str(row), 0, i * 10)
                oled.show()
            except Exception:
                pass
        screen(rows, addr=self._addr)


def screen_command(payload, disp=None):
    """Drive \`\`disp\`\` (a :class:\`Display\`) from one \`\`screen\`\` control payload.

    Parses the \`\`<verb> <args>\`\` grammar and actuates:

      * \`\`pins <sda> <scl>\`\` → \`\`disp.set_pins(sda, scl)\`\` (retarget the I²C bus)
      * \`\`addr <0xNN>\`\`      → \`\`disp.set_addr(addr)\`\` (the SCR echo address)
      * \`\`text <row> [<row> …]\`\` → \`\`disp.text(rows)\`\` (each row is \`\`_\`\`-encoded ↔
        spaces, matching the \`\`SNK SCR text\`\` packing)

    Defaults \`\`disp\`\` to the shared :data:\`display\` singleton. Never raises on a
    malformed payload (it is fed from the IDE). Returns the verb it handled (or
    \`\`None\`\`), which keeps it easy to unit-test against a fake/real Display.
    """
    disp = disp if disp is not None else display
    if not payload:
        return None
    payload = payload.strip()
    sp = payload.find(" ")
    if sp == -1:
        verb, args = payload, ""
    else:
        verb, args = payload[:sp], payload[sp + 1:].strip()
    try:
        if verb == "pins":
            parts = args.split()
            disp.set_pins(int(parts[0]), int(parts[1]))
        elif verb == "spi":
            # spi <sck> <mosi> <dc> <rst> <cs> <w> <h> — retarget an ST7789 TFT.
            # cs may be -1 (tied). w/h default to 240 when omitted.
            p = args.split()
            cs = int(p[4]) if len(p) > 4 else -1
            w = int(p[5]) if len(p) > 5 else 240
            h = int(p[6]) if len(p) > 6 else 240
            disp.set_spi(int(p[0]), int(p[1]), int(p[2]), int(p[3]), cs, w, h)
        elif verb == "addr":
            if not args:
                return None
            disp.set_addr(int(args, 0) if args[:2].lower() == "0x" else int(args))
        elif verb == "text":
            rows = [tok.replace("_", " ") for tok in args.split(" ")] if args else []
            disp.text(rows)
        else:
            return None
    except (ValueError, IndexError, TypeError):
        return None
    return verb


class Servo:
    """Drive a hobby servo (SG90 etc.) from \`\`servo\`\` control commands.

    \`\`angle(deg)\`\` moves to an angle (0..180); \`\`set_pin(n)\`\` (re)attaches the PWM
    at 50 Hz; \`\`detach()\`\` releases it. Pass a \`\`machine.PWM\`\` as \`\`pwm\`\` to move
    real hardware, or build one with \`\`set_pin\`\` — with no PWM every call is a
    no-op (still importable + testable under CPython). Each \`\`angle\`\` also emits
    \`\`SNK PWM servo <freq> <duty>\`\` so the IDE Servo panel shows the position.
    """

    def __init__(self, pwm=None, freq=50, min_us=500, max_us=2500, pin=None):
        self._pwm = pwm
        self._freq = freq
        self._period_us = 1000000 // freq
        self.min_us = min_us
        self.max_us = max_us
        self.angle_deg = 90
        # The GPIO number, when known — emitted as pin-keyed SERVO telemetry so
        # Robot View can drive the mapped URDF joint (#313). Set here works even
        # with no \`\`machine\`\` (the simulator), so headless robots still animate.
        self.pin = None
        if pwm is not None:
            # A hand-built \`\`PWM(Pin(n))\`\` may not be at the servo frequency — set
            # it so \`\`Servo(PWM(Pin(n)))\`\` from generated code works electrically.
            try:
                pwm.freq(freq)
            except Exception:  # noqa: BLE001 - a fake/odd PWM without freq() is fine
                pass
            # \`\`Servo(pwm, pin=n)\`\` remembers the GPIO for SNK SERVO telemetry.
            if pin is not None:
                self.pin = int(pin)
        elif pin is not None:
            self.set_pin(pin)  # build the PWM from the pin

    def set_pin(self, n):
        """(Re)target the PWM pin: build \`\`PWM(Pin(n))\`\` at 50 Hz (no-op w/o hw)."""
        self.pin = int(n)  # remembered regardless of hardware, for SERVO telemetry
        try:
            from machine import Pin, PWM
        except ImportError:
            return
        self._pwm = PWM(Pin(int(n)))
        self._pwm.freq(self._freq)

    def _us(self, deg):
        deg = 0 if deg < 0 else 180 if deg > 180 else deg
        return self.min_us + (deg / 180.0) * (self.max_us - self.min_us)

    def angle(self, deg):
        """Move to \`\`deg\`\` (0..180); drive the PWM + report the position."""
        deg = int(0 if deg < 0 else 180 if deg > 180 else deg)
        self.angle_deg = deg
        duty = self._us(deg) / self._period_us
        if self._pwm is not None:
            self._pwm.duty_u16(int(duty * 65535))
        print("%s PWM servo %s %s" % (SENTINEL, self._freq, duty))
        # Pin-keyed position for Robot View's servo->joint binding (#313).
        if self.pin is not None:
            print("%s SERVO %s %s" % (SENTINEL, self.pin, deg))
        return deg

    def detach(self):
        """Release the servo (stop holding torque)."""
        if self._pwm is not None:
            self._pwm.duty_u16(0)


def servo_command(payload, servo=None):
    """Drive \`\`servo\`\` (a :class:\`Servo\`) from one \`\`servo\`\` control payload.

      * \`\`angle <deg>\`\` → \`\`servo.angle(deg)\`\`
      * \`\`pin <n>\`\`     → \`\`servo.set_pin(n)\`\` (attach on GP<n>)
      * \`\`detach\`\`      → \`\`servo.detach()\`\`

    Defaults to the shared :data:\`servo\` singleton. Never raises on a malformed
    payload; returns the verb handled (or \`\`None\`\`), so it is easy to unit-test.
    """
    srv = servo if servo is not None else globals().get("servo")
    if srv is None or not payload:
        return None
    payload = payload.strip()
    sp = payload.find(" ")
    if sp == -1:
        verb, args = payload, ""
    else:
        verb, args = payload[:sp], payload[sp + 1:].strip()
    try:
        if verb == "angle":
            srv.angle(int(float(args.split()[0])))
        elif verb == "pin":
            srv.set_pin(int(args.split()[0]))
        elif verb == "detach":
            srv.detach()
        else:
            return None
    except (ValueError, IndexError, TypeError):
        return None
    return verb


def servos_command(payload, factory=None):
    """Drive SEVERAL servos from one \`\`servos\`\` control payload (#416).

    The payload is space-separated \`\`<pin>:<deg>\`\` (or \`\`<pin>=<deg>\`\`) pairs, so a
    Robot-View puppet slider can move a whole limb at once::

        SNKCMD servos 0:90 1:45 15:120

    Each pin is attached/reused via :func:\`servo_on\` (override with \`\`factory\`\` for
    tests) and set to its angle. Never raises on a malformed token — the bad pair
    is skipped. Returns the number of servos driven, so it is easy to unit-test.
    """
    if not payload:
        return 0
    make = factory if factory is not None else globals().get("servo_on")
    if make is None:
        return 0
    driven = 0
    for tok in payload.split():
        sep = tok.find(":")
        if sep == -1:
            sep = tok.find("=")
        if sep <= 0:
            continue
        try:
            pin = int(tok[:sep])
            deg = int(float(tok[sep + 1:]))
        except (ValueError, IndexError):
            continue
        try:
            make(pin).angle(deg)
            driven += 1
        except Exception:  # a bad pin / no PWM — skip, keep driving the rest
            continue
    return driven


# ---------------------------------------------------------------------------
# Object binding (\`watch\`) — register REAL Python objects (a \`\`machine.PWM\`\` /
# \`\`I2C\`\` / \`\`ADC\`\` / \`\`Pin\`\`, or YOUR OWN driver) so the IDE can offer the right
# instrument BY TYPE. The library only CLASSIFIES (duck-typing, so it is portable
# across ports and works on code we didn't write) and RELAYS state/commands — it
# never owns the object. \`\`watch\`\` announces each object with \`\`SNK BIND\`\`; the
# IDE maps the kind to an instrument (PWM → Oscilloscope/Servo, ADC → Multimeter,
# …); \`\`update()\`\` then streams state on the EXISTING \`\`SNK\`\` telemetry so those
# panels render it live with no new wiring.
# ---------------------------------------------------------------------------

_watched = {}  # name -> object


def _is_imu(obj):
    """True for a 6-/9-DoF IMU driver, across common method names (ours,
    Pimoroni, generic): \`\`read_accel_gyro\`\` / \`\`read_accelerometer_gyro_data\`\` /
    \`\`read_accel\`\` + \`\`read_gyro\`\`."""
    return (
        hasattr(obj, "read_accel_gyro")
        or hasattr(obj, "read_accelerometer_gyro_data")
        or (hasattr(obj, "read_accel") and hasattr(obj, "read_gyro"))
        # \`accel()\` — the naming BOTH bundled drivers use (\`lsm6ds3\`, \`mpu6050\`).
        # Without this neither could be \`watch\`ed as an IMU: they fell through
        # every branch of \`_classify\` and bound as nothing at all.
        or hasattr(obj, "accel")
    )


def _is_env(obj):
    """True for an environmental sensor driver exposing \`\`temperature\`\` +
    \`\`pressure\`\` + \`\`humidity\`\` (e.g. the bundled BME280 driver)."""
    return (
        hasattr(obj, "temperature")
        and hasattr(obj, "pressure")
        and hasattr(obj, "humidity")
    )


def _classify(obj):
    """Best-effort object KIND by duck-typing (methods, most-specific first).

    Returns \`\`env\`\`/\`\`imu\`\`/\`\`servo\`\`/\`\`pwm\`\`/\`\`i2c\`\`/\`\`adc\`\`/\`\`pin\`\` or \`\`None\`\`.
    An environmental sensor (temperature+pressure+humidity, e.g. a BME280) and an
    IMU (accel+gyro reader) are checked first; a Servo-like driver (\`\`angle\`\`)
    before a bare \`\`Pin\`\` (\`\`value\`\`); a \`\`PWM\`\` (\`\`duty_u16\`\`) before an \`\`ADC\`\`
    (\`\`read_u16\`\`). Never raises.
    """
    if _is_env(obj):
        return "env"
    if _is_imu(obj):
        return "imu"
    if hasattr(obj, "angle"):
        return "servo"
    if hasattr(obj, "duty_u16") or hasattr(obj, "duty"):
        return "pwm"
    if hasattr(obj, "scan"):  # a machine.I2C / SoftI2C bus
        return "i2c"
    if hasattr(obj, "read_u16"):
        return "adc"
    if hasattr(obj, "value"):
        return "pin"
    return None


def watch(*args, **kwargs):
    """Register real object(s) to visualise, by name — \`\`SNK BIND <name> <kind>\`\`.

    \`\`watch(pwm=pwm, pot=adc)\`\` or \`\`watch("pwm", pwm)\`\`. The IDE reads the BIND
    descriptor to offer the matching instrument; call :func:\`update\` each loop to
    stream the objects' live state. Works with your OWN objects (only the methods
    matter — see :func:\`_classify\`).
    """
    pairs = dict(kwargs)
    if len(args) == 2 and isinstance(args[0], str):
        pairs[args[0]] = args[1]
    for name, obj in pairs.items():
        _watched[name] = obj
        print("%s BIND %s %s" % (SENTINEL, name, _classify(obj) or "other"))


def unwatch(name):
    """Stop watching \`\`name\`\` (emits \`\`SNK BIND <name> none\`\`)."""
    _watched.pop(name, None)
    print("%s BIND %s none" % (SENTINEL, name))


def _pwm_freq_duty(obj):
    """\`\`(freq_hz, duty 0..1)\`\` for a PWM-like object, best-effort (never raises)."""
    try:
        freq = obj.freq()
    except Exception:
        freq = 0
    try:
        duty = obj.duty_u16() / 65535
    except Exception:
        try:
            duty = obj.duty() / 1023  # legacy 10-bit duty (ESP8266 etc.)
        except Exception:
            duty = 0.0
    return freq, duty


def _imu_euler(obj):
    """\`\`(roll, pitch, yaw)\`\` in degrees from an IMU: roll/pitch are the
    accelerometer tilt (rotation about the board's X / Y axes), yaw the
    magnetometer heading (about Z, \`\`0\`\` when there's no readable magnetometer).

    Yaw uses only a **non-blocking continuous** \`\`read_mag\`\` gated on an explicit
    \`\`mag_supported\`\` flag — single-shot magnetometer drivers (which busy-wait per
    read) are skipped so a tight \`\`update()\`\` loop never stalls. A bad/short mag
    read degrades to \`\`yaw = 0\`\` while still emitting the valid roll/pitch."""
    from math import atan2, sqrt, degrees

    if hasattr(obj, "read_accel"):
        a = obj.read_accel()
    elif hasattr(obj, "read_accel_gyro"):
        a = obj.read_accel_gyro()
    elif hasattr(obj, "read_accelerometer_gyro_data"):
        a = obj.read_accelerometer_gyro_data()
    else:
        # The bundled drivers' naming (\`lsm6ds3\`, \`mpu6050\`). Checked LAST so an
        # existing driver's behaviour is untouched.
        a = obj.accel()
    ax, ay, az = a[0], a[1], a[2]
    roll = degrees(atan2(ay, az))
    pitch = degrees(atan2(-ax, sqrt(ay * ay + az * az)))
    yaw = 0.0
    try:
        if getattr(obj, "mag_supported", False) and hasattr(obj, "read_mag"):
            m = obj.read_mag()
            if m is not None and len(m) >= 2:
                yaw = degrees(atan2(m[1], m[0]))
    except Exception:
        pass
    return roll, pitch, yaw


def update():
    """Emit the live state of every :func:\`watch\`-ed object on the \`\`SNK\`\` stream.

    Call each loop (after \`\`control.poll()\`\`). Reuses the existing telemetry so the
    dock renders watched objects with no extra code: a PWM → \`\`SNK PWM <name>
    <freq> <duty>\`\` (Oscilloscope/Servo); an ADC → \`\`SNK METER <name> <volts>\`\`
    (Multimeter); an IMU → \`\`SNK IMU <name> <roll> <pitch> <yaw>\`\` (3-D attitude),
    with roll/pitch from the accelerometer tilt and yaw from the magnetometer.
    """
    for name, obj in _watched.items():
        kind = _classify(obj)
        if kind == "pwm" or kind == "servo":
            freq, duty = _pwm_freq_duty(obj)
            print("%s PWM %s %s %s" % (SENTINEL, name, freq, duty))
        elif kind == "adc":
            try:
                print("%s METER %s %s V" % (SENTINEL, name, obj.read_u16() / 65535 * 3.3))
            except Exception:
                pass
        elif kind == "imu":
            try:
                roll, pitch, yaw = _imu_euler(obj)
                print("%s IMU %s %s %s %s" % (SENTINEL, name, roll, pitch, yaw))
            except Exception:
                pass
        elif kind == "env":
            # An environmental sensor (#216): one burst read() when available
            # (atomic + cheapest), else the three properties.
            try:
                if hasattr(obj, "read"):
                    t, p, h = obj.read()
                else:
                    t, p, h = obj.temperature, obj.pressure, obj.humidity
                print("%s ENV %s %s %s %s" % (SENTINEL, name, t, p, h))
            except Exception:
                pass


def watch_command(payload, watched=None):
    """Apply one \`\`watch\`\` control command to a bound object.

    \`\`<name> <verb> <args>\`\`: a PWM takes \`\`duty <0..1>\`\` / \`\`freq <hz>\`\`; a
    servo-like object \`\`angle <deg>\`\`; a Pin \`\`value <0|1>\`\`. Defaults to the
    shared :data:\`_watched\` registry. Never raises; returns the verb (or \`\`None\`\`).
    """
    watched = watched if watched is not None else _watched
    if not payload:
        return None
    parts = payload.split()
    if len(parts) < 2:
        return None
    name, verb = parts[0], parts[1]
    args = parts[2:]
    obj = watched.get(name)
    if obj is None:
        return None
    try:
        if verb == "angle" and hasattr(obj, "angle"):
            obj.angle(int(float(args[0])))
        elif verb == "duty" and hasattr(obj, "duty_u16"):
            obj.duty_u16(int(float(args[0]) * 65535))
        elif verb == "freq" and hasattr(obj, "freq"):
            obj.freq(int(float(args[0])))
        elif verb == "value" and hasattr(obj, "value"):
            obj.value(int(float(args[0])))
        else:
            return None
    except (ValueError, IndexError, TypeError):
        return None
    return verb


# Shared, ready-to-use (hardware-less) singletons — attach hardware as needed,
# e.g. \`\`inst.led = inst.Led(pwm=PWM(Pin(15)))\`\`. NOTE: the rangefinder singleton
# is \`\`ranger\`\` (NOT \`\`range\`\` — that would shadow the Python builtin).
buzzer = Buzzer()
led = Led()
ranger = Rangefinder()
display = Display()
servo = Servo()


class Motor:
    """Drive a two-channel DC motor driver from \`\`motor\`\` control commands.

    Deliberately knows NOTHING about a particular driver chip. Pass any object
    exposing \`\`drive(a, b)\`\` / \`\`brake(ch)\`\` / \`\`stop(ch)\`\` / \`\`standby()\`\` /
    \`\`wake()\`\` — the bundled \`\`tb6612\`\` module's \`\`GroveMotorDriver\`\` has exactly
    that shape, but a hand-rolled PWM H-bridge wrapper works just as well. With no
    driver every call is a no-op (still importable + testable under CPython), so
    the IDE panel can be exercised with nothing attached.

    Powers are signed and normalised, \`\`-1.0\`\`..\`\`1.0\`\` — the same unit
    \`\`teleop.arcade_mix\`\` emits, so a gamepad and this panel speak the same
    language and the scaling to PWM counts stays the driver's business.

    Each change emits \`\`SNK MOTOR <a> <b>\`\`, so the IDE panel shows what the board
    actually applied rather than only what it asked for.
    """

    def __init__(self, driver=None):
        self.driver = driver
        self.a = 0.0
        self.b = 0.0
        self.standby_on = False

    def _report(self):
        print("%s MOTOR %s %s" % (SENTINEL, self.a, self.b))

    def _clamp(self, v):
        v = float(v)
        return -1.0 if v < -1.0 else 1.0 if v > 1.0 else v

    def drive(self, a, b):
        """Apply signed powers to channel A and B."""
        self.a = self._clamp(a)
        self.b = self._clamp(b)
        if self.driver is not None:
            self.driver.drive(self.a, self.b)
        self._report()
        return self.a, self.b

    def channel(self, ch, power):
        """Set ONE channel (\`\`'a'\`\`/\`\`'b'\`\`), leaving the other where it is."""
        if ch == "a":
            return self.drive(power, self.b)
        if ch == "b":
            return self.drive(self.a, power)
        return None

    def stop(self):
        """Release both channels — the motors coast to a halt."""
        self.a = self.b = 0.0
        if self.driver is not None:
            self.driver.stop_all()
        self._report()

    def brake(self):
        """Actively brake both channels (windings shorted)."""
        self.a = self.b = 0.0
        if self.driver is not None:
            # \`CH_A\`/\`CH_B\` are 0/1 in every driver we ship; pass the ints so this
            # stays independent of the driver module's constants.
            self.driver.brake(0)
            self.driver.brake(1)
        self._report()

    def standby(self, on=True):
        """Disable (\`\`on\`\`) or re-enable the driver's outputs.

        Entering standby zeroes the remembered powers too: the outputs really are
        off, and reporting a stale non-zero power would make the panel lie.
        """
        self.standby_on = bool(on)
        if on:
            self.a = self.b = 0.0
        if self.driver is not None:
            if on:
                self.driver.standby()
            else:
                self.driver.wake()
        self._report()


def motor_command(payload, motor=None):
    """Drive \`\`motor\`\` (a :class:\`Motor\`) from one \`\`motor\`\` control payload.

      * \`\`run <a> <b>\`\`   → \`\`motor.drive(a, b)\`\`
      * \`\`a <power>\`\`     → \`\`motor.channel('a', power)\`\`
      * \`\`b <power>\`\`     → \`\`motor.channel('b', power)\`\`
      * \`\`stop\`\`          → \`\`motor.stop()\`\` (coast)
      * \`\`brake\`\`         → \`\`motor.brake()\`\`
      * \`\`standby <0|1>\`\` → \`\`motor.standby(bool)\`\`

    Defaults to the shared :data:\`motor\` singleton. Never raises on a malformed
    payload; returns the verb handled (or \`\`None\`\`), so it is easy to unit-test.
    """
    mot = motor if motor is not None else globals().get("motor")
    if mot is None or not payload:
        return None
    payload = payload.strip()
    sp = payload.find(" ")
    if sp == -1:
        verb, args = payload, ""
    else:
        verb, args = payload[:sp], payload[sp + 1:].strip()
    try:
        if verb == "run":
            parts = args.split()
            mot.drive(float(parts[0]), float(parts[1]))
        elif verb in ("a", "b"):
            mot.channel(verb, float(args.split()[0]))
        elif verb == "stop":
            mot.stop()
        elif verb == "brake":
            mot.brake()
        elif verb == "standby":
            mot.standby(args.split()[0] not in ("0", "off", "false"))
        else:
            return None
    except (ValueError, IndexError, TypeError):
        return None
    return verb


#: The shared motor singleton \`motor_command\` drives by default. Defined here
#: rather than with the other singletons above because :class:\`Motor\` is declared
#: after them.
motor = Motor()


def servo_on(pin, freq=50):
    """A :class:\`Servo\` attached to GPIO \`\`pin\`\` for the Robot View (#313).

    Each \`\`angle(deg)\`\` emits \`\`SNK SERVO <pin> <deg>\`\` (pin-keyed), so the IDE
    maps this servo onto its bound URDF joint and animates the 3-D robot — even
    headless in the simulator (no \`\`machine\`\` needed). On a real board it also
    drives \`\`PWM(Pin(pin))\`\`. Use one per joint::

        import instruments as inst
        shoulder = inst.servo_on(0)
        elbow = inst.servo_on(1)
        shoulder.angle(90)   # -> SNK SERVO 0 90 -> the joint bound to pin 0 moves
    """
    return Servo(pin=pin, freq=freq)
`,mt='"""snakie — the friendly hardware layer for Snakie sketches.\n\nImport the things you *drive* from here, so your code reads\n``pin -> PWM -> Servo -> joint`` and never clashes with a vendor ``servo``\nmodule (Pimoroni\'s frozen ``servo``, etc.)::\n\n    from snakie import Servo, Buzzer, Led, Pin, PWM\n\n    base = Servo(PWM(Pin(0)), pin=0)   # a servo on GP0; pin= drives the 3-D model\n    base.angle(90)\n\nThese are re-exported from Snakie\'s on-device runtime (``instruments``), which\nkeeps the *measurement* tools (scope / meter / plotter). Same classes, friendlier\nname — ``snakie.Servo`` *is* ``instruments.Servo``. Uploaded to ``/lib/snakie.py``\nalongside ``instruments.py`` by the Board View\'s library installer.\n"""\n\n# Re-export ONLY the hardware/actuator classes + raw IO — the "connect pins to\n# things" layer. Scopes/meters/plotters stay in `instruments` (they\'re not things\n# you wire up, they\'re how you observe the ones you do).\nfrom instruments import Servo, Buzzer, Led, Pin, PWM  # noqa: F401 - re-exported API\n\n__all__ = ["Servo", "Buzzer", "Led", "Pin", "PWM"]\n';const ht=pt,gt=mt,yt=Object.assign({"../../../../micropython/modules/buzzer.py":st,"../../../../micropython/modules/grove_ultrasonic.py":ot,"../../../../micropython/modules/hcsr04.py":at,"../../../../micropython/modules/lsm6ds3.py":it,"../../../../micropython/modules/mpu6050.py":lt,"../../../../micropython/modules/neopixel_ws2812.py":dt,"../../../../micropython/modules/pcf8563.py":ct,"../../../../micropython/modules/rotary.py":_t,"../../../../micropython/modules/tb6612.py":ft,"../../../../micropython/modules/teleop.py":ut});Object.fromEntries(Object.entries(yt).map(([m,u])=>[m.split("/").pop()??m,u]));const Pe=new TextEncoder,bn=(m,u,i)=>{const b=Array.from(Pe.encode(i)).map(T=>T.toString(16).padStart(2,"0")).join(""),w=u.slice(0,u.lastIndexOf("/"))||"/";m.runPython(`import os
try:
    os.mkdir(${JSON.stringify(w)})
except OSError:
    pass
_d = bytes.fromhex(${JSON.stringify(b)})
_f = open(${JSON.stringify(u)}, 'wb')
_f.write(_d)
_f.close()
del _d, _f`)},bt=m=>{bn(m,"/lib/instruments.py",ht),bn(m,"/lib/snakie.py",gt)};let Z=null,Ne=[],ue=null;const Te=m=>{const u=ue??Ne;for(const i of m)u.push(i)},ae=()=>{if(ue||Ne.length===0)return;const m=Uint8Array.from(Ne);Ne=[],postMessage({type:"out",bytes:m})},Ve=[];self.onmessage=async m=>{if(m.data?.type!=="init"&&!Z){Ve.push(m.data);return}const u=m.data;if(u.type==="init"){Z=await Ke({url:tt,linebuffer:!1,stdout:Te,stderr:Te}),setInterval(ae,24);try{Z.runPython(rt)}catch{}try{bt(Z)}catch{}for(Z.replInit(),ae(),postMessage({type:"ready"});Ve.length>0;)self.onmessage?.(new MessageEvent("message",{data:Ve.shift()}));return}if(Z){if(u.type==="feed"){try{for(const i of Pe.encode(u.data))await Z.replProcessCharWithAsyncify(i);ae(),postMessage({type:"done",id:u.id})}catch(i){ae(),postMessage({type:"done",id:u.id,error:String(i)})}return}if(u.type==="run"){ae(),ue=[];try{Z.runPython(u.code),postMessage({type:"result",id:u.id,value:new TextDecoder().decode(Uint8Array.from(ue))})}catch(i){postMessage({type:"result",id:u.id,error:String(i)})}finally{ue=null}}if(u.type==="runStream"){ae(),ue=null;try{Z.runPython(u.code)}catch(i){const b=String(i?.message??i);Te(Pe.encode(b.endsWith(`
`)?b:b+`
`))}finally{Te(Pe.encode(`\r
>>> `)),ae(),postMessage({type:"done",id:u.id})}}}};
