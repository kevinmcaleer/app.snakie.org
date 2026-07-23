async function Rn(m={}){var u;(function(){function e(d){for(var _=(d=d.split("-")[0]).split(".").slice(0,3);_.length<3;)_.push("00");return(_=_.map((h,b,g)=>h.padStart(2,"0"))).join("")}var n=d=>[d/1e4|0,(d/100|0)%100,d%100].join("."),t=typeof process<"u"&&process.versions?.node?e(process.versions.node):2147483647;if(t<16e4)throw new Error(`This emscripten-generated code requires node v${n(16e4)} (detected v${n(t)})`);var o=typeof navigator<"u"&&navigator.userAgent;if(o){var s=o.includes("Safari/")&&!o.includes("Chrome/")&&o.match(/Version\/(\d+\.?\d*\.?\d*)/)?e(o.match(/Version\/(\d+\.?\d*\.?\d*)/)[1]):2147483647;if(s<15e4)throw new Error(`This emscripten-generated code requires Safari v${n(15e4)} (detected v${s})`);var i=o.match(/Firefox\/(\d+(?:\.\d+)?)/)?parseFloat(o.match(/Firefox\/(\d+(?:\.\d+)?)/)[1]):2147483647;if(i<79)throw new Error(`This emscripten-generated code requires Firefox v79 (detected v${i})`);var l=o.match(/Chrome\/(\d+(?:\.\d+)?)/)?parseFloat(o.match(/Chrome\/(\d+(?:\.\d+)?)/)[1]):2147483647;if(l<85)throw new Error(`This emscripten-generated code requires Chrome v85 (detected v${l})`)}})();var a=m,v=!!globalThis.window,w=!!globalThis.WorkerGlobalScope,x=globalThis.process?.versions?.node&&globalThis.process?.type!="renderer",k=!v&&!x&&!w;if(x){const{createRequire:e}=await import("./__vite-browser-external-9wXp6ZBx.js");var C=e(import.meta.url)}var P,p,z=import.meta.url,E="";if(x){if(!(globalThis.process?.versions?.node&&globalThis.process?.type!="renderer"))throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");var j=C("node:fs");z.startsWith("file:")&&(E=C("node:path").dirname(C("node:url").fileURLToPath(z))+"/"),p=e=>{e=pe(e)?new URL(e):e;var n=j.readFileSync(e);return c(Buffer.isBuffer(n)),n},P=async(e,n=!0)=>{e=pe(e)?new URL(e):e;var t=j.readFileSync(e,n?void 0:"utf8");return c(n?Buffer.isBuffer(t):typeof t=="string"),t},process.argv.length>1&&process.argv[1].replace(/\\/g,"/"),process.argv.slice(2)}else if(!k){if(!v&&!w)throw new Error("environment detection error");try{E=new URL(".",z).href}catch{}if(!globalThis.window&&!globalThis.WorkerGlobalScope)throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");w&&(p=e=>{var n=new XMLHttpRequest;return n.open("GET",e,!1),n.responseType="arraybuffer",n.send(null),new Uint8Array(n.response)}),P=async e=>{if(pe(e))return new Promise((t,o)=>{var s=new XMLHttpRequest;s.open("GET",e,!0),s.responseType="arraybuffer",s.onload=()=>{s.status==200||s.status==0&&s.response?t(s.response):o(s.status)},s.onerror=o,s.send(null)});var n=await fetch(e,{credentials:"same-origin"});if(n.ok)return n.arrayBuffer();throw new Error(n.status+" : "+n.url)}}var B,J=console.log.bind(console),O=console.error.bind(console);c(!k,"shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable."),globalThis.WebAssembly||O("no native wasm support detected");var be=!1;function c(e,n){e||R("Assertion failed"+(n?": "+n:""))}var pe=e=>e.startsWith("file://");function Me(){if(!be){var e=Be();e==0&&(e+=4);var n=M[e>>2],t=M[e+4>>2];n==34821223&&t==2310721022||R(`Stack overflow! Stack cookie has been overwritten at ${ye(e)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ye(t)} ${ye(n)}`),M[0]!=1668509029&&R("Runtime error: The application has corrupted its heap memory area (address zero)!")}}var De,Fe,Ge,Ye,X,me,le,te,M,Re,Ce,W;function we(e){Object.getOwnPropertyDescriptor(a,e)||Object.defineProperty(a,e,{configurable:!0,set(){R(`Attempt to set \`Module.${e}\` after it has already been processed.  This can happen, for example, when code is injected via '--post-js' rather than '--pre-js'`)}})}function N(e){return()=>c(!1,`call to '${e}' via reference taken before Wasm module initialization`)}function Ae(e){Object.getOwnPropertyDescriptor(a,e)&&R(`\`Module.${e}\` was supplied but \`${e}\` not included in INCOMING_MODULE_JS_API`)}function Xe(e){Object.getOwnPropertyDescriptor(a,e)||Object.defineProperty(a,e,{configurable:!0,get(){var n,t=`'${e}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;((n=e)==="FS_createPath"||n==="FS_createDataFile"||n==="FS_createPreloadedFile"||n==="FS_preloadFile"||n==="FS_unlink"||n==="addRunDependency"||n==="FS_createLazyFile"||n==="FS_createDevice"||n==="removeRunDependency")&&(t+=". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you"),R(t)}})}De=new Int16Array(1),Fe=new Int8Array(De.buffer),De[0]=25459,Fe[0]===115&&Fe[1]===99||R("Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)");var je,he=!1;function $e(){var e=ke.buffer;X=new Int8Array(e),le=new Int16Array(e),a.HEAPU8=me=new Uint8Array(e),te=new Int32Array(e),M=new Uint32Array(e),Re=new Float32Array(e),Ce=new Float64Array(e),W=new BigInt64Array(e),new BigUint64Array(e)}function R(e){a.onAbort?.(e),O(e="Aborted("+e+")"),be=!0;var n=new WebAssembly.RuntimeError(e);throw Ye?.(n),n}function I(e,n){return(...t)=>{c(he,`native function \`${e}\` called before runtime initialization`);var o=ve[e];return c(o,`exported native function \`${e}\` not found`),c(t.length<=n,`native function \`${e}\` called with ${t.length} args but expects ${n}`),o(...t)}}function Sn(){return a.locateFile?(e="micropython.wasm",a.locateFile?a.locateFile(e,E):E+e):new URL("/assets/micropython-DXFUqjrr.wasm",import.meta.url).href;var e}async function kn(e){if(!B)try{var n=await P(e);return new Uint8Array(n)}catch{}return function(t){if(t==je&&B)return new Uint8Array(B);if(p)return p(t);throw"both async and sync fetching of the wasm failed"}(e)}async function Nn(e,n,t){if(!e&&!pe(n)&&!x)try{var o=fetch(n,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(o,t)}catch(s){O(`wasm streaming compile failed: ${s}`),O("falling back to ArrayBuffer instantiation")}return async function(s,i){try{var l=await kn(s);return await WebAssembly.instantiate(l,i)}catch(d){O(`failed to asynchronously prepare wasm: ${d}`),pe(s)&&O(`warning: Loading from a file URI (${s}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`),R(d)}}(n,t)}c(globalThis.Int32Array&&globalThis.Float64Array&&Int32Array.prototype.subarray&&Int32Array.prototype.set,"JS engine does not provide full typed array support");var Je=e=>{for(;e.length>0;)e.shift()(a)},Qe=[],xn=e=>Qe.push(e),Ze=[],Tn=e=>Ze.push(e);function Oe(e,n="i8"){switch(n.endsWith("*")&&(n="*"),n){case"i1":case"i8":return X[e];case"i16":return le[e>>1];case"i32":return te[e>>2];case"i64":return W[e>>3];case"float":return Re[e>>2];case"double":return Ce[e>>3];case"*":return M[e>>2];default:R(`invalid type for getValue: ${n}`)}}var ye=e=>(c(typeof e=="number","ptrToString expects a number, got "+typeof e),"0x"+(e>>>=0).toString(16).padStart(8,"0")),H=e=>pn(e),G=()=>hn(),de=e=>{de.shown||={},de.shown[e]||(de.shown[e]=1,x&&(e="warning: "+e),O(e))},D={isAbs:e=>e.charAt(0)==="/",splitPath:e=>/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(e).slice(1),normalizeArray:(e,n)=>{for(var t=0,o=e.length-1;o>=0;o--){var s=e[o];s==="."?e.splice(o,1):s===".."?(e.splice(o,1),t++):t&&(e.splice(o,1),t--)}if(n)for(;t;t--)e.unshift("..");return e},normalize:e=>{var n=D.isAbs(e),t=e.slice(-1)==="/";return(e=D.normalizeArray(e.split("/").filter(o=>!!o),!n).join("/"))||n||(e="."),e&&t&&(e+="/"),(n?"/":"")+e},dirname:e=>{var n=D.splitPath(e),t=n[0],o=n[1];return t||o?(o&&(o=o.slice(0,-1)),t+o):"."},basename:e=>e&&e.match(/([^\/]+|\/)\/*$/)[1],join:(...e)=>D.normalize(e.join("/")),join2:(e,n)=>D.normalize(e+"/"+n)},en=e=>{(en=(()=>{if(x){var n=C("node:crypto");return t=>n.randomFillSync(t)}return t=>crypto.getRandomValues(t)})())(e)},re={resolve:(...e)=>{for(var n="",t=!1,o=e.length-1;o>=-1&&!t;o--){var s=o>=0?e[o]:r.cwd();if(typeof s!="string")throw new TypeError("Arguments to path.resolve must be strings");if(!s)return"";n=s+"/"+n,t=D.isAbs(s)}return(t?"/":"")+(n=D.normalizeArray(n.split("/").filter(i=>!!i),!t).join("/"))||"."},relative:(e,n)=>{function t(h){for(var b=0;b<h.length&&h[b]==="";b++);for(var g=h.length-1;g>=0&&h[g]==="";g--);return b>g?[]:h.slice(b,g-b+1)}e=re.resolve(e).slice(1),n=re.resolve(n).slice(1);for(var o=t(e.split("/")),s=t(n.split("/")),i=Math.min(o.length,s.length),l=i,d=0;d<i;d++)if(o[d]!==s[d]){l=d;break}var _=[];for(d=l;d<o.length;d++)_.push("..");return(_=_.concat(s.slice(l))).join("/")}},nn=globalThis.TextDecoder&&new TextDecoder,ce=(e,n=0,t,o)=>{var s=((b,g,f,y)=>{var F=g+f;if(y)return F;for(;b[g]&&!(g>=F);)++g;return g})(e,n,t,o);if(s-n>16&&e.buffer&&nn)return nn.decode(e.subarray(n,s));for(var i="";n<s;){var l=e[n++];if(128&l){var d=63&e[n++];if((224&l)!=192){var _=63&e[n++];if((240&l)==224?l=(15&l)<<12|d<<6|_:((248&l)!=240&&de("Invalid UTF-8 leading byte "+ye(l)+" encountered when deserializing a UTF-8 string in wasm memory to a JS string!"),l=(7&l)<<18|d<<12|_<<6|63&e[n++]),l<65536)i+=String.fromCharCode(l);else{var h=l-65536;i+=String.fromCharCode(55296|h>>10,56320|1023&h)}}else i+=String.fromCharCode((31&l)<<6|d)}else i+=String.fromCharCode(l)}return i},Le=[],Ee=e=>{for(var n=0,t=0;t<e.length;++t){var o=e.charCodeAt(t);o<=127?n++:o<=2047?n+=2:o>=55296&&o<=57343?(n+=4,++t):n+=3}return n},tn=(e,n,t,o)=>{if(c(typeof e=="string",`stringToUTF8Array expects a string (got ${typeof e})`),!(o>0))return 0;for(var s=t,i=t+o-1,l=0;l<e.length;++l){var d=e.codePointAt(l);if(d<=127){if(t>=i)break;n[t++]=d}else if(d<=2047){if(t+1>=i)break;n[t++]=192|d>>6,n[t++]=128|63&d}else if(d<=65535){if(t+2>=i)break;n[t++]=224|d>>12,n[t++]=128|d>>6&63,n[t++]=128|63&d}else{if(t+3>=i)break;d>1114111&&de("Invalid Unicode code point "+ye(d)+" encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF)."),n[t++]=240|d>>18,n[t++]=128|d>>12&63,n[t++]=128|d>>6&63,n[t++]=128|63&d,l++}}return n[t]=0,t-s},ze=(e,n,t)=>{var o=Ee(e)+1,s=new Array(o),i=tn(e,s,0,s.length);return s.length=i,s},oe={ttys:[],init(){},shutdown(){},register(e,n){oe.ttys[e]={input:[],output:[],ops:n},r.registerDevice(e,oe.stream_ops)},stream_ops:{open(e){var n=oe.ttys[e.node.rdev];if(!n)throw new r.ErrnoError(43);e.tty=n,e.seekable=!1},close(e){e.tty.ops.fsync(e.tty)},fsync(e){e.tty.ops.fsync(e.tty)},read(e,n,t,o,s){if(!e.tty||!e.tty.ops.get_char)throw new r.ErrnoError(60);for(var i=0,l=0;l<o;l++){var d;try{d=e.tty.ops.get_char(e.tty)}catch{throw new r.ErrnoError(29)}if(d===void 0&&i===0)throw new r.ErrnoError(6);if(d==null)break;i++,n[t+l]=d}return i&&(e.node.atime=Date.now()),i},write(e,n,t,o,s){if(!e.tty||!e.tty.ops.put_char)throw new r.ErrnoError(60);try{for(var i=0;i<o;i++)e.tty.ops.put_char(e.tty,n[t+i])}catch{throw new r.ErrnoError(29)}return o&&(e.node.mtime=e.node.ctime=Date.now()),i}},default_tty_ops:{get_char:e=>(()=>{if(!Le.length){var n=null;if(x){var t=Buffer.alloc(256),o=0,s=process.stdin.fd;try{o=j.readSync(s,t,0,256)}catch(i){if(!i.toString().includes("EOF"))throw i;o=0}o>0&&(n=t.slice(0,o).toString("utf-8"))}else globalThis.window?.prompt&&(n=window.prompt("Input: "))!==null&&(n+=`
`);if(!n)return null;Le=ze(n)}return Le.shift()})(),put_char(e,n){n===null||n===10?(J(ce(e.output)),e.output=[]):n!=0&&e.output.push(n)},fsync(e){e.output?.length>0&&(J(ce(e.output)),e.output=[])},ioctl_tcgets:e=>({c_iflag:25856,c_oflag:5,c_cflag:191,c_lflag:35387,c_cc:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}),ioctl_tcsets:(e,n,t)=>0,ioctl_tiocgwinsz:e=>[24,80]},default_tty1_ops:{put_char(e,n){n===null||n===10?(O(ce(e.output)),e.output=[]):n!=0&&e.output.push(n)},fsync(e){e.output?.length>0&&(O(ce(e.output)),e.output=[])}}},rn=e=>{R("internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported")},S={ops_table:null,mount:e=>S.createNode(null,"/",16895,0),createNode(e,n,t,o){if(r.isBlkdev(t)||r.isFIFO(t))throw new r.ErrnoError(63);S.ops_table||={dir:{node:{getattr:S.node_ops.getattr,setattr:S.node_ops.setattr,lookup:S.node_ops.lookup,mknod:S.node_ops.mknod,rename:S.node_ops.rename,unlink:S.node_ops.unlink,rmdir:S.node_ops.rmdir,readdir:S.node_ops.readdir,symlink:S.node_ops.symlink},stream:{llseek:S.stream_ops.llseek}},file:{node:{getattr:S.node_ops.getattr,setattr:S.node_ops.setattr},stream:{llseek:S.stream_ops.llseek,read:S.stream_ops.read,write:S.stream_ops.write,mmap:S.stream_ops.mmap,msync:S.stream_ops.msync}},link:{node:{getattr:S.node_ops.getattr,setattr:S.node_ops.setattr,readlink:S.node_ops.readlink},stream:{}},chrdev:{node:{getattr:S.node_ops.getattr,setattr:S.node_ops.setattr},stream:r.chrdev_stream_ops}};var s=r.createNode(e,n,t,o);return r.isDir(s.mode)?(s.node_ops=S.ops_table.dir.node,s.stream_ops=S.ops_table.dir.stream,s.contents={}):r.isFile(s.mode)?(s.node_ops=S.ops_table.file.node,s.stream_ops=S.ops_table.file.stream,s.usedBytes=0,s.contents=null):r.isLink(s.mode)?(s.node_ops=S.ops_table.link.node,s.stream_ops=S.ops_table.link.stream):r.isChrdev(s.mode)&&(s.node_ops=S.ops_table.chrdev.node,s.stream_ops=S.ops_table.chrdev.stream),s.atime=s.mtime=s.ctime=Date.now(),e&&(e.contents[n]=s,e.atime=e.mtime=e.ctime=s.atime),s},getFileDataAsTypedArray:e=>e.contents?e.contents.subarray?e.contents.subarray(0,e.usedBytes):new Uint8Array(e.contents):new Uint8Array(0),expandFileStorage(e,n){var t=e.contents?e.contents.length:0;if(!(t>=n)){n=Math.max(n,t*(t<1048576?2:1.125)>>>0),t!=0&&(n=Math.max(n,256));var o=e.contents;e.contents=new Uint8Array(n),e.usedBytes>0&&e.contents.set(o.subarray(0,e.usedBytes),0)}},resizeFileStorage(e,n){if(e.usedBytes!=n)if(n==0)e.contents=null,e.usedBytes=0;else{var t=e.contents;e.contents=new Uint8Array(n),t&&e.contents.set(t.subarray(0,Math.min(n,e.usedBytes))),e.usedBytes=n}},node_ops:{getattr(e){var n={};return n.dev=r.isChrdev(e.mode)?e.id:1,n.ino=e.id,n.mode=e.mode,n.nlink=1,n.uid=0,n.gid=0,n.rdev=e.rdev,r.isDir(e.mode)?n.size=4096:r.isFile(e.mode)?n.size=e.usedBytes:r.isLink(e.mode)?n.size=e.link.length:n.size=0,n.atime=new Date(e.atime),n.mtime=new Date(e.mtime),n.ctime=new Date(e.ctime),n.blksize=4096,n.blocks=Math.ceil(n.size/n.blksize),n},setattr(e,n){for(const t of["mode","atime","mtime","ctime"])n[t]!=null&&(e[t]=n[t]);n.size!==void 0&&S.resizeFileStorage(e,n.size)},lookup(e,n){throw new r.ErrnoError(44)},mknod:(e,n,t,o)=>S.createNode(e,n,t,o),rename(e,n,t){var o;try{o=r.lookupNode(n,t)}catch{}if(o){if(r.isDir(e.mode))for(var s in o.contents)throw new r.ErrnoError(55);r.hashRemoveNode(o)}delete e.parent.contents[e.name],n.contents[t]=e,e.name=t,n.ctime=n.mtime=e.parent.ctime=e.parent.mtime=Date.now()},unlink(e,n){delete e.contents[n],e.ctime=e.mtime=Date.now()},rmdir(e,n){var t=r.lookupNode(e,n);for(var o in t.contents)throw new r.ErrnoError(55);delete e.contents[n],e.ctime=e.mtime=Date.now()},readdir:e=>[".","..",...Object.keys(e.contents)],symlink(e,n,t){var o=S.createNode(e,n,41471,0);return o.link=t,o},readlink(e){if(!r.isLink(e.mode))throw new r.ErrnoError(28);return e.link}},stream_ops:{read(e,n,t,o,s){var i=e.node.contents;if(s>=e.node.usedBytes)return 0;var l=Math.min(e.node.usedBytes-s,o);if(c(l>=0),l>8&&i.subarray)n.set(i.subarray(s,s+l),t);else for(var d=0;d<l;d++)n[t+d]=i[s+d];return l},write(e,n,t,o,s,i){if(c(!(n instanceof ArrayBuffer)),n.buffer===X.buffer&&(i=!1),!o)return 0;var l=e.node;if(l.mtime=l.ctime=Date.now(),n.subarray&&(!l.contents||l.contents.subarray)){if(i)return c(s===0,"canOwn must imply no weird position inside the file"),l.contents=n.subarray(t,t+o),l.usedBytes=o,o;if(l.usedBytes===0&&s===0)return l.contents=n.slice(t,t+o),l.usedBytes=o,o;if(s+o<=l.usedBytes)return l.contents.set(n.subarray(t,t+o),s),o}if(S.expandFileStorage(l,s+o),l.contents.subarray&&n.subarray)l.contents.set(n.subarray(t,t+o),s);else for(var d=0;d<o;d++)l.contents[s+d]=n[t+d];return l.usedBytes=Math.max(l.usedBytes,s+o),o},llseek(e,n,t){var o=n;if(t===1?o+=e.position:t===2&&r.isFile(e.node.mode)&&(o+=e.node.usedBytes),o<0)throw new r.ErrnoError(28);return o},mmap(e,n,t,o,s){if(!r.isFile(e.node.mode))throw new r.ErrnoError(43);var i,l,d=e.node.contents;if(2&s||!d||d.buffer!==X.buffer){if(l=!0,!(i=rn()))throw new r.ErrnoError(48);d&&((t>0||t+n<d.length)&&(d=d.subarray?d.subarray(t,t+n):Array.prototype.slice.call(d,t,t+n)),X.set(d,i))}else l=!1,i=d.byteOffset;return{ptr:i,allocated:l}},msync:(e,n,t,o,s)=>(S.stream_ops.write(e,n,0,o,t,!1),0)}},Ue=(e,n)=>{var t=0;return e&&(t|=365),n&&(t|=146),t},Q=(e,n,t)=>(c(typeof e=="number",`UTF8ToString expects a number (got ${typeof e})`),e?ce(me,e,n,t):""),on={EPERM:63,ENOENT:44,ESRCH:71,EINTR:27,EIO:29,ENXIO:60,E2BIG:1,ENOEXEC:45,EBADF:8,ECHILD:12,EAGAIN:6,EWOULDBLOCK:6,ENOMEM:48,EACCES:2,EFAULT:21,ENOTBLK:105,EBUSY:10,EEXIST:20,EXDEV:75,ENODEV:43,ENOTDIR:54,EISDIR:31,EINVAL:28,ENFILE:41,EMFILE:33,ENOTTY:59,ETXTBSY:74,EFBIG:22,ENOSPC:51,ESPIPE:70,EROFS:69,EMLINK:34,EPIPE:64,EDOM:18,ERANGE:68,ENOMSG:49,EIDRM:24,ECHRNG:106,EL2NSYNC:156,EL3HLT:107,EL3RST:108,ELNRNG:109,EUNATCH:110,ENOCSI:111,EL2HLT:112,EDEADLK:16,ENOLCK:46,EBADE:113,EBADR:114,EXFULL:115,ENOANO:104,EBADRQC:103,EBADSLT:102,EDEADLOCK:16,EBFONT:101,ENOSTR:100,ENODATA:116,ETIME:117,ENOSR:118,ENONET:119,ENOPKG:120,EREMOTE:121,ENOLINK:47,EADV:122,ESRMNT:123,ECOMM:124,EPROTO:65,EMULTIHOP:36,EDOTDOT:125,EBADMSG:9,ENOTUNIQ:126,EBADFD:127,EREMCHG:128,ELIBACC:129,ELIBBAD:130,ELIBSCN:131,ELIBMAX:132,ELIBEXEC:133,ENOSYS:52,ENOTEMPTY:55,ENAMETOOLONG:37,ELOOP:32,EOPNOTSUPP:138,EPFNOSUPPORT:139,ECONNRESET:15,ENOBUFS:42,EAFNOSUPPORT:5,EPROTOTYPE:67,ENOTSOCK:57,ENOPROTOOPT:50,ESHUTDOWN:140,ECONNREFUSED:14,EADDRINUSE:3,ECONNABORTED:13,ENETUNREACH:40,ENETDOWN:38,ETIMEDOUT:73,EHOSTDOWN:142,EHOSTUNREACH:23,EINPROGRESS:26,EALREADY:7,EDESTADDRREQ:17,EMSGSIZE:35,EPROTONOSUPPORT:66,ESOCKTNOSUPPORT:137,EADDRNOTAVAIL:4,ENETRESET:39,EISCONN:30,ENOTCONN:53,ETOOMANYREFS:141,EUSERS:136,EDQUOT:19,ESTALE:72,ENOTSUP:138,ENOMEDIUM:148,EILSEQ:25,EOVERFLOW:61,ECANCELED:11,ENOTRECOVERABLE:56,EOWNERDEAD:62,ESTRPIPE:135},se=0,ge=null,_e={},ne=null,sn=[],an=async(e,n,t,o,s,i,l,d)=>{var _,h=n?re.resolve(D.join2(e,n)):e,b=(f=>{for(var y=f;;){if(!_e[f])return f;f=y+Math.random()}})(`cp ${h}`);_=b,se++,a.monitorRunDependencies?.(se),c(_,"addRunDependency requires an ID"),c(!_e[_]),_e[_]=1,ne===null&&globalThis.setInterval&&(ne=setInterval(()=>{if(be)return clearInterval(ne),void(ne=null);var f=!1;for(var y in _e)f||(f=!0,O("still waiting on run dependencies:")),O(`dependency: ${y}`);f&&O("(end of list)")},1e4),ne.unref?.());try{var g=t;typeof t=="string"&&(g=await(async f=>{var y=await P(f);return c(y,`Loading data file "${f}" failed (no arrayBuffer).`),new Uint8Array(y)})(t)),g=await(async(f,y)=>{for(var F of(typeof Browser<"u"&&Browser.init(),sn))if(F.canHandle(y))return c(F.handle.constructor.name==="AsyncFunction","Filesystem plugin handlers must be async functions (See #24914)"),F.handle(f,y);return f})(g,h),d?.(),i||((...f)=>{r.createDataFile(...f)})(e,n,g,o,s,l)}finally{(f=>{if(se--,a.monitorRunDependencies?.(se),c(f,"removeRunDependency requires an ID"),c(_e[f]),delete _e[f],se==0&&(ne!==null&&(clearInterval(ne),ne=null),ge)){var y=ge;ge=null,y()}})(b)}},r={root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:!1,ignorePermissions:!0,filesystems:null,syncFSRequests:0,ErrnoError:class extends Error{name="ErrnoError";constructor(e){for(var n in super(he?(t=>Q(fn(t)))(e):""),this.errno=e,on)if(on[n]===e){this.code=n;break}}},FSStream:class{shared={};get object(){return this.node}set object(e){this.node=e}get isRead(){return(2097155&this.flags)!=1}get isWrite(){return!!(2097155&this.flags)}get isAppend(){return 1024&this.flags}get flags(){return this.shared.flags}set flags(e){this.shared.flags=e}get position(){return this.shared.position}set position(e){this.shared.position=e}},FSNode:class{node_ops={};stream_ops={};readMode=365;writeMode=146;mounted=null;constructor(e,n,t,o){e||(e=this),this.parent=e,this.mount=e.mount,this.id=r.nextInode++,this.name=n,this.mode=t,this.rdev=o,this.atime=this.mtime=this.ctime=Date.now()}get read(){return(this.mode&this.readMode)===this.readMode}set read(e){e?this.mode|=this.readMode:this.mode&=~this.readMode}get write(){return(this.mode&this.writeMode)===this.writeMode}set write(e){e?this.mode|=this.writeMode:this.mode&=~this.writeMode}get isFolder(){return r.isDir(this.mode)}get isDevice(){return r.isChrdev(this.mode)}},lookupPath(e,n={}){if(!e)throw new r.ErrnoError(44);n.follow_mount??=!0,D.isAbs(e)||(e=r.cwd()+"/"+e);e:for(var t=0;t<40;t++){for(var o=e.split("/").filter(h=>!!h),s=r.root,i="/",l=0;l<o.length;l++){var d=l===o.length-1;if(d&&n.parent)break;if(o[l]!==".")if(o[l]!==".."){i=D.join2(i,o[l]);try{s=r.lookupNode(s,o[l])}catch(h){if(h?.errno===44&&d&&n.noent_okay)return{path:i};throw h}if(!r.isMountpoint(s)||d&&!n.follow_mount||(s=s.mounted.root),r.isLink(s.mode)&&(!d||n.follow)){if(!s.node_ops.readlink)throw new r.ErrnoError(52);var _=s.node_ops.readlink(s);D.isAbs(_)||(_=D.dirname(i)+"/"+_),e=_+"/"+o.slice(l+1).join("/");continue e}}else{if(i=D.dirname(i),r.isRoot(s)){e=i+"/"+o.slice(l+1).join("/"),t--;continue e}s=s.parent}}return{path:i,node:s}}throw new r.ErrnoError(32)},getPath(e){for(var n;;){if(r.isRoot(e)){var t=e.mount.mountpoint;return n?t[t.length-1]!=="/"?`${t}/${n}`:t+n:t}n=n?`${e.name}/${n}`:e.name,e=e.parent}},hashName(e,n){for(var t=0,o=0;o<n.length;o++)t=(t<<5)-t+n.charCodeAt(o)|0;return(e+t>>>0)%r.nameTable.length},hashAddNode(e){var n=r.hashName(e.parent.id,e.name);e.name_next=r.nameTable[n],r.nameTable[n]=e},hashRemoveNode(e){var n=r.hashName(e.parent.id,e.name);if(r.nameTable[n]===e)r.nameTable[n]=e.name_next;else for(var t=r.nameTable[n];t;){if(t.name_next===e){t.name_next=e.name_next;break}t=t.name_next}},lookupNode(e,n){var t=r.mayLookup(e);if(t)throw new r.ErrnoError(t);for(var o=r.hashName(e.id,n),s=r.nameTable[o];s;s=s.name_next){var i=s.name;if(s.parent.id===e.id&&i===n)return s}return r.lookup(e,n)},createNode(e,n,t,o){c(typeof e=="object");var s=new r.FSNode(e,n,t,o);return r.hashAddNode(s),s},destroyNode(e){r.hashRemoveNode(e)},isRoot:e=>e===e.parent,isMountpoint:e=>!!e.mounted,isFile:e=>(61440&e)==32768,isDir:e=>(61440&e)==16384,isLink:e=>(61440&e)==40960,isChrdev:e=>(61440&e)==8192,isBlkdev:e=>(61440&e)==24576,isFIFO:e=>(61440&e)==4096,isSocket:e=>!(49152&~e),flagsToPermissionString(e){var n=["r","w","rw"][3&e];return 512&e&&(n+="w"),n},nodePermissions:(e,n)=>r.ignorePermissions||(!n.includes("r")||292&e.mode)&&(!n.includes("w")||146&e.mode)&&(!n.includes("x")||73&e.mode)?0:2,mayLookup(e){if(!r.isDir(e.mode))return 54;var n=r.nodePermissions(e,"x");return n||(e.node_ops.lookup?0:2)},mayCreate(e,n){if(!r.isDir(e.mode))return 54;try{return r.lookupNode(e,n),20}catch{}return r.nodePermissions(e,"wx")},mayDelete(e,n,t){var o;try{o=r.lookupNode(e,n)}catch(i){return i.errno}var s=r.nodePermissions(e,"wx");if(s)return s;if(t){if(!r.isDir(o.mode))return 54;if(r.isRoot(o)||r.getPath(o)===r.cwd())return 10}else if(r.isDir(o.mode))return 31;return 0},mayOpen(e,n){if(!e)return 44;if(r.isLink(e.mode))return 32;var t=r.flagsToPermissionString(n);return r.isDir(e.mode)&&(t!=="r"||576&n)?31:r.nodePermissions(e,t)},checkOpExists(e,n){if(!e)throw new r.ErrnoError(n);return e},MAX_OPEN_FDS:4096,nextfd(){for(var e=0;e<=r.MAX_OPEN_FDS;e++)if(!r.streams[e])return e;throw new r.ErrnoError(33)},getStreamChecked(e){var n=r.getStream(e);if(!n)throw new r.ErrnoError(8);return n},getStream:e=>r.streams[e],createStream:(e,n=-1)=>(c(n>=-1),e=Object.assign(new r.FSStream,e),n==-1&&(n=r.nextfd()),e.fd=n,r.streams[n]=e,e),closeStream(e){r.streams[e]=null},dupStream(e,n=-1){var t=r.createStream(e,n);return t.stream_ops?.dup?.(t),t},doSetAttr(e,n,t){var o=e?.stream_ops.setattr,s=o?e:n;o??=n.node_ops.setattr,r.checkOpExists(o,63),o(s,t)},chrdev_stream_ops:{open(e){var n=r.getDevice(e.node.rdev);e.stream_ops=n.stream_ops,e.stream_ops.open?.(e)},llseek(){throw new r.ErrnoError(70)}},major:e=>e>>8,minor:e=>255&e,makedev:(e,n)=>e<<8|n,registerDevice(e,n){r.devices[e]={stream_ops:n}},getDevice:e=>r.devices[e],getMounts(e){for(var n=[],t=[e];t.length;){var o=t.pop();n.push(o),t.push(...o.mounts)}return n},syncfs(e,n){typeof e=="function"&&(n=e,e=!1),r.syncFSRequests++,r.syncFSRequests>1&&O(`warning: ${r.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);var t=r.getMounts(r.root.mount),o=0;function s(d){return c(r.syncFSRequests>0),r.syncFSRequests--,n(d)}function i(d){if(d)return i.errored?void 0:(i.errored=!0,s(d));++o>=t.length&&s(null)}for(var l of t)l.type.syncfs?l.type.syncfs(l,e,i):i(null)},mount(e,n,t){if(typeof e=="string")throw e;var o,s=t==="/",i=!t;if(s&&r.root)throw new r.ErrnoError(10);if(!s&&!i){var l=r.lookupPath(t,{follow_mount:!1});if(t=l.path,o=l.node,r.isMountpoint(o))throw new r.ErrnoError(10);if(!r.isDir(o.mode))throw new r.ErrnoError(54)}var d={type:e,opts:n,mountpoint:t,mounts:[]},_=e.mount(d);return _.mount=d,d.root=_,s?r.root=_:o&&(o.mounted=d,o.mount&&o.mount.mounts.push(d)),_},unmount(e){var n=r.lookupPath(e,{follow_mount:!1});if(!r.isMountpoint(n.node))throw new r.ErrnoError(28);var t=n.node,o=t.mounted,s=r.getMounts(o);for(var[i,l]of Object.entries(r.nameTable))for(;l;){var d=l.name_next;s.includes(l.mount)&&r.destroyNode(l),l=d}t.mounted=null;var _=t.mount.mounts.indexOf(o);c(_!==-1),t.mount.mounts.splice(_,1)},lookup:(e,n)=>e.node_ops.lookup(e,n),mknod(e,n,t){var o=r.lookupPath(e,{parent:!0}).node,s=D.basename(e);if(!s)throw new r.ErrnoError(28);if(s==="."||s==="..")throw new r.ErrnoError(20);var i=r.mayCreate(o,s);if(i)throw new r.ErrnoError(i);if(!o.node_ops.mknod)throw new r.ErrnoError(63);return o.node_ops.mknod(o,s,n,t)},statfs:e=>r.statfsNode(r.lookupPath(e,{follow:!0}).node),statfsStream:e=>r.statfsNode(e.node),statfsNode(e){var n={bsize:4096,frsize:4096,blocks:1e6,bfree:5e5,bavail:5e5,files:r.nextInode,ffree:r.nextInode-1,fsid:42,flags:2,namelen:255};return e.node_ops.statfs&&Object.assign(n,e.node_ops.statfs(e.mount.opts.root)),n},create:(e,n=438)=>(n&=4095,n|=32768,r.mknod(e,n,0)),mkdir:(e,n=511)=>(n&=1023,n|=16384,r.mknod(e,n,0)),mkdirTree(e,n){var t=e.split("/"),o="";for(var s of t)if(s){(o||D.isAbs(e))&&(o+="/"),o+=s;try{r.mkdir(o,n)}catch(i){if(i.errno!=20)throw i}}},mkdev:(e,n,t)=>(t===void 0&&(t=n,n=438),n|=8192,r.mknod(e,n,t)),symlink(e,n){if(!re.resolve(e))throw new r.ErrnoError(44);var t=r.lookupPath(n,{parent:!0}).node;if(!t)throw new r.ErrnoError(44);var o=D.basename(n),s=r.mayCreate(t,o);if(s)throw new r.ErrnoError(s);if(!t.node_ops.symlink)throw new r.ErrnoError(63);return t.node_ops.symlink(t,o,e)},rename(e,n){var t,o,s=D.dirname(e),i=D.dirname(n),l=D.basename(e),d=D.basename(n);if(t=r.lookupPath(e,{parent:!0}).node,o=r.lookupPath(n,{parent:!0}).node,!t||!o)throw new r.ErrnoError(44);if(t.mount!==o.mount)throw new r.ErrnoError(75);var _,h=r.lookupNode(t,l),b=re.relative(e,i);if(b.charAt(0)!==".")throw new r.ErrnoError(28);if((b=re.relative(n,s)).charAt(0)!==".")throw new r.ErrnoError(55);try{_=r.lookupNode(o,d)}catch{}if(h!==_){var g=r.isDir(h.mode),f=r.mayDelete(t,l,g);if(f)throw new r.ErrnoError(f);if(f=_?r.mayDelete(o,d,g):r.mayCreate(o,d))throw new r.ErrnoError(f);if(!t.node_ops.rename)throw new r.ErrnoError(63);if(r.isMountpoint(h)||_&&r.isMountpoint(_))throw new r.ErrnoError(10);if(o!==t&&(f=r.nodePermissions(t,"w")))throw new r.ErrnoError(f);r.hashRemoveNode(h);try{t.node_ops.rename(h,o,d),h.parent=o}catch(y){throw y}finally{r.hashAddNode(h)}}},rmdir(e){var n=r.lookupPath(e,{parent:!0}).node,t=D.basename(e),o=r.lookupNode(n,t),s=r.mayDelete(n,t,!0);if(s)throw new r.ErrnoError(s);if(!n.node_ops.rmdir)throw new r.ErrnoError(63);if(r.isMountpoint(o))throw new r.ErrnoError(10);n.node_ops.rmdir(n,t),r.destroyNode(o)},readdir(e){var n=r.lookupPath(e,{follow:!0}).node;return r.checkOpExists(n.node_ops.readdir,54)(n)},unlink(e){var n=r.lookupPath(e,{parent:!0}).node;if(!n)throw new r.ErrnoError(44);var t=D.basename(e),o=r.lookupNode(n,t),s=r.mayDelete(n,t,!1);if(s)throw new r.ErrnoError(s);if(!n.node_ops.unlink)throw new r.ErrnoError(63);if(r.isMountpoint(o))throw new r.ErrnoError(10);n.node_ops.unlink(n,t),r.destroyNode(o)},readlink(e){var n=r.lookupPath(e).node;if(!n)throw new r.ErrnoError(44);if(!n.node_ops.readlink)throw new r.ErrnoError(28);return n.node_ops.readlink(n)},stat(e,n){var t=r.lookupPath(e,{follow:!n}).node;return r.checkOpExists(t.node_ops.getattr,63)(t)},fstat(e){var n=r.getStreamChecked(e),t=n.node,o=n.stream_ops.getattr,s=o?n:t;return o??=t.node_ops.getattr,r.checkOpExists(o,63),o(s)},lstat:e=>r.stat(e,!0),doChmod(e,n,t,o){r.doSetAttr(e,n,{mode:4095&t|-4096&n.mode,ctime:Date.now(),dontFollow:o})},chmod(e,n,t){var o;typeof e=="string"?o=r.lookupPath(e,{follow:!t}).node:o=e,r.doChmod(null,o,n,t)},lchmod(e,n){r.chmod(e,n,!0)},fchmod(e,n){var t=r.getStreamChecked(e);r.doChmod(t,t.node,n,!1)},doChown(e,n,t){r.doSetAttr(e,n,{timestamp:Date.now(),dontFollow:t})},chown(e,n,t,o){var s;typeof e=="string"?s=r.lookupPath(e,{follow:!o}).node:s=e,r.doChown(null,s,o)},lchown(e,n,t){r.chown(e,n,t,!0)},fchown(e,n,t){var o=r.getStreamChecked(e);r.doChown(o,o.node,!1)},doTruncate(e,n,t){if(r.isDir(n.mode))throw new r.ErrnoError(31);if(!r.isFile(n.mode))throw new r.ErrnoError(28);var o=r.nodePermissions(n,"w");if(o)throw new r.ErrnoError(o);r.doSetAttr(e,n,{size:t,timestamp:Date.now()})},truncate(e,n){if(n<0)throw new r.ErrnoError(28);var t;typeof e=="string"?t=r.lookupPath(e,{follow:!0}).node:t=e,r.doTruncate(null,t,n)},ftruncate(e,n){var t=r.getStreamChecked(e);if(n<0||!(2097155&t.flags))throw new r.ErrnoError(28);r.doTruncate(t,t.node,n)},utime(e,n,t){var o=r.lookupPath(e,{follow:!0}).node;r.checkOpExists(o.node_ops.setattr,63)(o,{atime:n,mtime:t})},open(e,n,t=438){if(e==="")throw new r.ErrnoError(44);var o,s;if(t=64&(n=typeof n=="string"?(h=>{var b={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090}[h];if(b===void 0)throw new Error(`Unknown file open mode: ${h}`);return b})(n):n)?4095&t|32768:0,typeof e=="object")o=e;else{s=e.endsWith("/");var i=r.lookupPath(e,{follow:!(131072&n),noent_okay:!0});o=i.node,e=i.path}var l=!1;if(64&n)if(o){if(128&n)throw new r.ErrnoError(20)}else{if(s)throw new r.ErrnoError(31);o=r.mknod(e,511|t,0),l=!0}if(!o)throw new r.ErrnoError(44);if(r.isChrdev(o.mode)&&(n&=-513),65536&n&&!r.isDir(o.mode))throw new r.ErrnoError(54);if(!l){var d=r.mayOpen(o,n);if(d)throw new r.ErrnoError(d)}512&n&&!l&&r.truncate(o,0),n&=-131713;var _=r.createStream({node:o,path:r.getPath(o),flags:n,seekable:!0,position:0,stream_ops:o.stream_ops,ungotten:[],error:!1});return _.stream_ops.open&&_.stream_ops.open(_),l&&r.chmod(o,511&t),_},close(e){if(r.isClosed(e))throw new r.ErrnoError(8);e.getdents&&(e.getdents=null);try{e.stream_ops.close&&e.stream_ops.close(e)}catch(n){throw n}finally{r.closeStream(e.fd)}e.fd=null},isClosed:e=>e.fd===null,llseek(e,n,t){if(r.isClosed(e))throw new r.ErrnoError(8);if(!e.seekable||!e.stream_ops.llseek)throw new r.ErrnoError(70);if(t!=0&&t!=1&&t!=2)throw new r.ErrnoError(28);return e.position=e.stream_ops.llseek(e,n,t),e.ungotten=[],e.position},read(e,n,t,o,s){if(c(t>=0),o<0||s<0)throw new r.ErrnoError(28);if(r.isClosed(e))throw new r.ErrnoError(8);if((2097155&e.flags)==1)throw new r.ErrnoError(8);if(r.isDir(e.node.mode))throw new r.ErrnoError(31);if(!e.stream_ops.read)throw new r.ErrnoError(28);var i=s!==void 0;if(i){if(!e.seekable)throw new r.ErrnoError(70)}else s=e.position;var l=e.stream_ops.read(e,n,t,o,s);return i||(e.position+=l),l},write(e,n,t,o,s,i){if(c(t>=0),o<0||s<0)throw new r.ErrnoError(28);if(r.isClosed(e))throw new r.ErrnoError(8);if(!(2097155&e.flags))throw new r.ErrnoError(8);if(r.isDir(e.node.mode))throw new r.ErrnoError(31);if(!e.stream_ops.write)throw new r.ErrnoError(28);e.seekable&&1024&e.flags&&r.llseek(e,0,2);var l=s!==void 0;if(l){if(!e.seekable)throw new r.ErrnoError(70)}else s=e.position;var d=e.stream_ops.write(e,n,t,o,s,i);return l||(e.position+=d),d},mmap(e,n,t,o,s){if(2&o&&!(2&s)&&(2097155&e.flags)!=2)throw new r.ErrnoError(2);if((2097155&e.flags)==1)throw new r.ErrnoError(2);if(!e.stream_ops.mmap)throw new r.ErrnoError(43);if(!n)throw new r.ErrnoError(28);return e.stream_ops.mmap(e,n,t,o,s)},msync:(e,n,t,o,s)=>(c(t>=0),e.stream_ops.msync?e.stream_ops.msync(e,n,t,o,s):0),ioctl(e,n,t){if(!e.stream_ops.ioctl)throw new r.ErrnoError(59);return e.stream_ops.ioctl(e,n,t)},readFile(e,n={}){n.flags=n.flags||0,n.encoding=n.encoding||"binary",n.encoding!=="utf8"&&n.encoding!=="binary"&&R(`Invalid encoding type "${n.encoding}"`);var t=r.open(e,n.flags),o=r.stat(e).size,s=new Uint8Array(o);return r.read(t,s,0,o,0),n.encoding==="utf8"&&(s=ce(s)),r.close(t),s},writeFile(e,n,t={}){t.flags=t.flags||577;var o=r.open(e,t.flags,t.mode);typeof n=="string"&&(n=new Uint8Array(ze(n))),ArrayBuffer.isView(n)?r.write(o,n,0,n.byteLength,void 0,t.canOwn):R("Unsupported data type"),r.close(o)},cwd:()=>r.currentPath,chdir(e){var n=r.lookupPath(e,{follow:!0});if(n.node===null)throw new r.ErrnoError(44);if(!r.isDir(n.node.mode))throw new r.ErrnoError(54);var t=r.nodePermissions(n.node,"x");if(t)throw new r.ErrnoError(t);r.currentPath=n.path},createDefaultDirectories(){r.mkdir("/tmp"),r.mkdir("/home"),r.mkdir("/home/web_user")},createDefaultDevices(){r.mkdir("/dev"),r.registerDevice(r.makedev(1,3),{read:()=>0,write:(o,s,i,l,d)=>l,llseek:()=>0}),r.mkdev("/dev/null",r.makedev(1,3)),oe.register(r.makedev(5,0),oe.default_tty_ops),oe.register(r.makedev(6,0),oe.default_tty1_ops),r.mkdev("/dev/tty",r.makedev(5,0)),r.mkdev("/dev/tty1",r.makedev(6,0));var e=new Uint8Array(1024),n=0,t=()=>(n===0&&(en(e),n=e.byteLength),e[--n]);r.createDevice("/dev","random",t),r.createDevice("/dev","urandom",t),r.mkdir("/dev/shm"),r.mkdir("/dev/shm/tmp")},createSpecialDirectories(){r.mkdir("/proc");var e=r.mkdir("/proc/self");r.mkdir("/proc/self/fd"),r.mount({mount(){var n=r.createNode(e,"fd",16895,73);return n.stream_ops={llseek:S.stream_ops.llseek},n.node_ops={lookup(t,o){var s=+o,i=r.getStreamChecked(s),l={parent:null,mount:{mountpoint:"fake"},node_ops:{readlink:()=>i.path},id:s+1};return l.parent=l,l},readdir:()=>Array.from(r.streams.entries()).filter(([t,o])=>o).map(([t,o])=>t.toString())},n}},{},"/proc/self/fd")},createStandardStreams(e,n,t){e?r.createDevice("/dev","stdin",e):r.symlink("/dev/tty","/dev/stdin"),n?r.createDevice("/dev","stdout",null,n):r.symlink("/dev/tty","/dev/stdout"),t?r.createDevice("/dev","stderr",null,t):r.symlink("/dev/tty1","/dev/stderr");var o=r.open("/dev/stdin",0),s=r.open("/dev/stdout",1),i=r.open("/dev/stderr",1);c(o.fd===0,`invalid handle for stdin (${o.fd})`),c(s.fd===1,`invalid handle for stdout (${s.fd})`),c(i.fd===2,`invalid handle for stderr (${i.fd})`)},staticInit(){r.nameTable=new Array(4096),r.mount(S,{},"/"),r.createDefaultDirectories(),r.createDefaultDevices(),r.createSpecialDirectories(),r.filesystems={MEMFS:S}},init(e,n,t){c(!r.initialized,"FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)"),r.initialized=!0,e??=a.stdin,n??=a.stdout,t??=a.stderr,r.createStandardStreams(e,n,t)},quit(){for(var e of(r.initialized=!1,_n(0),r.streams))e&&r.close(e)},findObject(e,n){var t=r.analyzePath(e,n);return t.exists?t.object:null},analyzePath(e,n){try{e=(o=r.lookupPath(e,{follow:!n})).path}catch{}var t={isRoot:!1,exists:!1,error:0,name:null,path:null,object:null,parentExists:!1,parentPath:null,parentObject:null};try{var o=r.lookupPath(e,{parent:!0});t.parentExists=!0,t.parentPath=o.path,t.parentObject=o.node,t.name=D.basename(e),o=r.lookupPath(e,{follow:!n}),t.exists=!0,t.path=o.path,t.object=o.node,t.name=o.node.name,t.isRoot=o.path==="/"}catch(s){t.error=s.errno}return t},createPath(e,n,t,o){e=typeof e=="string"?e:r.getPath(e);for(var s=n.split("/").reverse();s.length;){var i=s.pop();if(i){var l=D.join2(e,i);try{r.mkdir(l)}catch(d){if(d.errno!=20)throw d}e=l}}return l},createFile(e,n,t,o,s){var i=D.join2(typeof e=="string"?e:r.getPath(e),n),l=Ue(o,s);return r.create(i,l)},createDataFile(e,n,t,o,s,i){var l=n;e&&(e=typeof e=="string"?e:r.getPath(e),l=n?D.join2(e,n):e);var d=Ue(o,s),_=r.create(l,d);if(t){if(typeof t=="string"){for(var h=new Array(t.length),b=0,g=t.length;b<g;++b)h[b]=t.charCodeAt(b);t=h}r.chmod(_,146|d);var f=r.open(_,577);r.write(f,t,0,t.length,0,i),r.close(f),r.chmod(_,d)}},createDevice(e,n,t,o){var s=D.join2(typeof e=="string"?e:r.getPath(e),n),i=Ue(!!t,!!o);r.createDevice.major??=64;var l=r.makedev(r.createDevice.major++,0);return r.registerDevice(l,{open(d){d.seekable=!1},close(d){o?.buffer?.length&&o(10)},read(d,_,h,b,g){for(var f=0,y=0;y<b;y++){var F;try{F=t()}catch{throw new r.ErrnoError(29)}if(F===void 0&&f===0)throw new r.ErrnoError(6);if(F==null)break;f++,_[h+y]=F}return f&&(d.node.atime=Date.now()),f},write(d,_,h,b,g){for(var f=0;f<b;f++)try{o(_[h+f])}catch{throw new r.ErrnoError(29)}return b&&(d.node.mtime=d.node.ctime=Date.now()),f}}),r.mkdev(s,i,l)},forceLoadFile(e){if(e.isDevice||e.isFolder||e.link||e.contents)return!0;if(globalThis.XMLHttpRequest)R("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");else try{e.contents=p(e.url)}catch{throw new r.ErrnoError(29)}},createLazyFile(e,n,t,o,s){class i{lengthKnown=!1;chunks=[];get(g){if(!(g>this.length-1||g<0)){var f=g%this.chunkSize,y=g/this.chunkSize|0;return this.getter(y)[f]}}setDataGetter(g){this.getter=g}cacheLength(){var g=new XMLHttpRequest;g.open("HEAD",t,!1),g.send(null),g.status>=200&&g.status<300||g.status===304||R("Couldn't load "+t+". Status: "+g.status);var f,y=Number(g.getResponseHeader("Content-length")),F=(f=g.getResponseHeader("Accept-Ranges"))&&f==="bytes",U=(f=g.getResponseHeader("Content-Encoding"))&&f==="gzip",q=1048576;F||(q=y);var K=this;K.setDataGetter(fe=>{var Fn=fe*q,qe=(fe+1)*q-1;return qe=Math.min(qe,y-1),K.chunks[fe]===void 0&&(K.chunks[fe]=((Ke,Ne)=>{Ke>Ne&&R("invalid range ("+Ke+", "+Ne+") or no bytes requested!"),Ne>y-1&&R("only "+y+" bytes available! programmer error!");var V=new XMLHttpRequest;return V.open("GET",t,!1),y!==q&&V.setRequestHeader("Range","bytes="+Ke+"-"+Ne),V.responseType="arraybuffer",V.overrideMimeType&&V.overrideMimeType("text/plain; charset=x-user-defined"),V.send(null),V.status>=200&&V.status<300||V.status===304||R("Couldn't load "+t+". Status: "+V.status),V.response!==void 0?new Uint8Array(V.response||[]):ze(V.responseText||"")})(Fn,qe)),K.chunks[fe]===void 0&&R("doXHR failed!"),K.chunks[fe]}),!U&&y||(q=y=1,y=this.getter(0).length,q=y,J("LazyFiles on gzip forces download of the whole file when length is accessed")),this._length=y,this._chunkSize=q,this.lengthKnown=!0}get length(){return this.lengthKnown||this.cacheLength(),this._length}get chunkSize(){return this.lengthKnown||this.cacheLength(),this._chunkSize}}if(globalThis.XMLHttpRequest){w||R("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc");var l={isDevice:!1,contents:new i}}else l={isDevice:!1,url:t};var d=r.createFile(e,n,l,o,s);l.contents?d.contents=l.contents:l.url&&(d.contents=null,d.url=l.url),Object.defineProperties(d,{usedBytes:{get:function(){return this.contents.length}}});var _={};for(const[b,g]of Object.entries(d.stream_ops))_[b]=(...f)=>(r.forceLoadFile(d),g(...f));function h(b,g,f,y,F){var U=b.node.contents;if(F>=U.length)return 0;var q=Math.min(U.length-F,y);if(c(q>=0),U.slice)for(var K=0;K<q;K++)g[f+K]=U[F+K];else for(K=0;K<q;K++)g[f+K]=U.get(F+K);return q}return _.read=(b,g,f,y,F)=>(r.forceLoadFile(d),h(b,g,f,y,F)),_.mmap=(b,g,f,y,F)=>{r.forceLoadFile(d);var U=rn();if(!U)throw new r.ErrnoError(48);return h(b,X,U,g,f),{ptr:U,allocated:!0}},d.stream_ops=_,d},absolutePath(){R("FS.absolutePath has been removed; use PATH_FS.resolve instead")},createFolder(){R("FS.createFolder has been removed; use FS.mkdir instead")},createLink(){R("FS.createLink has been removed; use FS.symlink instead")},joinPath(){R("FS.joinPath has been removed; use PATH.join instead")},mmapAlloc(){R("FS.mmapAlloc has been replaced by the top level function mmapAlloc")},standardizePath(){R("FS.standardizePath has been removed; use PATH.normalize instead")}},T={calculateAt(e,n,t){if(D.isAbs(n))return n;var o;if(e===-100?o=r.cwd():o=T.getStreamFromFD(e).path,n.length==0){if(!t)throw new r.ErrnoError(44);return o}return o+"/"+n},writeStat(e,n){M[e>>2]=n.dev,M[e+4>>2]=n.mode,M[e+8>>2]=n.nlink,M[e+12>>2]=n.uid,M[e+16>>2]=n.gid,M[e+20>>2]=n.rdev,W[e+24>>3]=BigInt(n.size),te[e+32>>2]=4096,te[e+36>>2]=n.blocks;var t=n.atime.getTime(),o=n.mtime.getTime(),s=n.ctime.getTime();return W[e+40>>3]=BigInt(Math.floor(t/1e3)),M[e+48>>2]=t%1e3*1e3*1e3,W[e+56>>3]=BigInt(Math.floor(o/1e3)),M[e+64>>2]=o%1e3*1e3*1e3,W[e+72>>3]=BigInt(Math.floor(s/1e3)),M[e+80>>2]=s%1e3*1e3*1e3,W[e+88>>3]=BigInt(n.ino),0},writeStatFs(e,n){M[e+4>>2]=n.bsize,M[e+60>>2]=n.bsize,W[e+8>>3]=BigInt(n.blocks),W[e+16>>3]=BigInt(n.bfree),W[e+24>>3]=BigInt(n.bavail),W[e+32>>3]=BigInt(n.files),W[e+40>>3]=BigInt(n.ffree),M[e+48>>2]=n.fsid,M[e+64>>2]=n.flags,M[e+56>>2]=n.namelen},doMsync(e,n,t,o,s){if(!r.isFile(n.node.mode))throw new r.ErrnoError(43);if(2&o)return 0;var i=me.slice(e,e+t);r.msync(n,i,s,t,o)},getStreamFromFD:e=>r.getStreamChecked(e),varargs:void 0,getStr:e=>Q(e)},Se=(e,n,t)=>(c(typeof t=="number","stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"),tn(e,me,n,t)),Pn=(e,n)=>(c(n,"alignment argument is required"),Math.ceil(e/n)*n),In=e=>{var n=ke.buffer.byteLength,t=(e-n+65535)/65536|0;try{return ke.grow(t),$e(),1}catch(o){O(`growMemory: Attempted to grow heap from ${n} bytes to ${e} bytes, but got error: ${o}`)}},ln=[],$=e=>{var n=ln[e];return n||(ln[e]=n=We.get(e)),c(We.get(e)==n,"JavaScript-side Wasm function table mirror is out of date!"),n},dn=e=>mn(e),cn=(e,n,t,o,s)=>{var i={string:f=>{var y=0;return f!=null&&f!==0&&(y=(F=>{var U=Ee(F)+1,q=dn(U);return Se(F,q,U),q})(f)),y},array:f=>{var y,F,U=dn(f.length);return F=U,c((y=f).length>=0,"writeArrayToMemory array must have a length (should be an array or typed array)"),X.set(y,F),U}},l=(f=>{var y=a["_"+f];return c(y,"Cannot call unknown function "+f+", make sure it is exported"),y})(e),d=[],_=0;if(c(n!=="array",'Return type should not be "array".'),o)for(var h=0;h<o.length;h++){var b=i[t[h]];b?(_===0&&(_=G()),d[h]=b(o[h])):d[h]=o[h]}var g=l(...d);return g=function(f){return _!==0&&H(_),function(y){return n==="string"?Q(y):n==="boolean"?!!y:y}(f)}(g)};r.createPreloadedFile=(e,n,t,o,s,i,l,d,_,h)=>{an(e,n,t,o,s,d,_,h).then(i).catch(l)},r.preloadFile=an,r.staticInit(),globalThis.crypto===void 0&&(globalThis.crypto=C("crypto"));var Mn=Date.now();if(a.noExitRuntime&&a.noExitRuntime,a.preloadPlugins&&(sn=a.preloadPlugins),a.print&&(J=a.print),a.printErr&&(O=a.printErr),a.wasmBinary&&(B=a.wasmBinary),Ae("fetchSettings"),Ae("logReadFiles"),Ae("loadSplitModule"),a.arguments&&a.arguments,a.thisProgram&&a.thisProgram,c(a.memoryInitializerPrefixURL===void 0,"Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead"),c(a.pthreadMainPrefixURL===void 0,"Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead"),c(a.cdInitializerPrefixURL===void 0,"Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead"),c(a.filePackagePrefixURL===void 0,"Module.filePackagePrefixURL option was removed, use Module.locateFile instead"),c(a.read===void 0,"Module.read option was removed"),c(a.readAsync===void 0,"Module.readAsync option was removed (modify readAsync in JS)"),c(a.readBinary===void 0,"Module.readBinary option was removed (modify readBinary in JS)"),c(a.setWindowTitle===void 0,"Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)"),c(a.TOTAL_MEMORY===void 0,"Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY"),c(a.ENVIRONMENT===void 0,"Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)"),c(a.STACK_SIZE===void 0,"STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time"),c(a.wasmMemory===void 0,"Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally"),c(a.INITIAL_MEMORY===void 0,"Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically"),a.preInit)for(typeof a.preInit=="function"&&(a.preInit=[a.preInit]);a.preInit.length>0;)a.preInit.shift()();we("preInit"),a.ccall=cn,a.cwrap=(e,n,t,o)=>(...s)=>cn(e,n,t,s),a.setValue=function(e,n,t="i8"){switch(t.endsWith("*")&&(t="*"),t){case"i1":case"i8":X[e]=n;break;case"i16":le[e>>1]=n;break;case"i32":te[e>>2]=n;break;case"i64":W[e>>3]=BigInt(n);break;case"float":Re[e>>2]=n;break;case"double":Ce[e>>3]=n;break;case"*":M[e>>2]=n;break;default:R(`invalid type for setValue: ${t}`)}},a.getValue=Oe,a.PATH=D,a.PATH_FS=re,a.UTF8ToString=Q,a.stringToUTF8=Se,a.lengthBytesUTF8=Ee,a.FS=r,["writeI53ToI64","writeI53ToI64Clamped","writeI53ToI64Signaling","writeI53ToU64Clamped","writeI53ToU64Signaling","readI53FromI64","readI53FromU64","convertI32PairToI53","convertI32PairToI53Checked","convertU32PairToI53","getTempRet0","setTempRet0","createNamedFunction","zeroMemory","exitJS","withStackSave","inetPton4","inetNtop4","inetPton6","inetNtop6","readSockaddr","writeSockaddr","readEmAsmArgs","jstoi_q","getExecutableName","autoResumeAudioContext","getDynCaller","dynCall","handleException","keepRuntimeAlive","runtimeKeepalivePush","runtimeKeepalivePop","callUserCallback","maybeExit","asmjsMangle","HandleAllocator","addOnInit","addOnPostCtor","addOnPreMain","addOnExit","STACK_SIZE","STACK_ALIGN","POINTER_SIZE","ASSERTIONS","convertJsFunctionToWasm","getEmptyTableSlot","updateTableMap","getFunctionAddress","addFunction","removeFunction","intArrayToString","AsciiToString","stringToAscii","UTF16ToString","stringToUTF16","lengthBytesUTF16","UTF32ToString","stringToUTF32","lengthBytesUTF32","stringToNewUTF8","registerKeyEventCallback","maybeCStringToJsString","findEventTarget","getBoundingClientRect","fillMouseEventData","registerMouseEventCallback","registerWheelEventCallback","registerUiEventCallback","registerFocusEventCallback","fillDeviceOrientationEventData","registerDeviceOrientationEventCallback","fillDeviceMotionEventData","registerDeviceMotionEventCallback","screenOrientation","fillOrientationChangeEventData","registerOrientationChangeEventCallback","fillFullscreenChangeEventData","registerFullscreenChangeEventCallback","JSEvents_requestFullscreen","JSEvents_resizeCanvasForFullscreen","registerRestoreOldStyle","hideEverythingExceptGivenElement","restoreHiddenElements","setLetterbox","softFullscreenResizeWebGLRenderTarget","doRequestFullscreen","fillPointerlockChangeEventData","registerPointerlockChangeEventCallback","registerPointerlockErrorEventCallback","requestPointerLock","fillVisibilityChangeEventData","registerVisibilityChangeEventCallback","registerTouchEventCallback","fillGamepadEventData","registerGamepadEventCallback","registerBeforeUnloadEventCallback","fillBatteryEventData","registerBatteryEventCallback","setCanvasElementSize","getCanvasElementSize","jsStackTrace","getCallstack","convertPCtoSourceLocation","getEnvStrings","checkWasiClock","wasiRightsToMuslOFlags","wasiOFlagsToMuslOFlags","safeSetTimeout","setImmediateWrapped","safeRequestAnimationFrame","clearImmediateWrapped","registerPostMainLoop","registerPreMainLoop","getPromise","makePromise","idsToPromises","makePromiseCallback","ExceptionInfo","findMatchingCatch","Browser_asyncPrepareDataCounter","isLeapYear","ydayFromDate","arraySum","addDays","getSocketFromFD","getSocketAddress","FS_mkdirTree","_setNetworkCallback","heapObjectForWebGLType","toTypedArrayIndex","webgl_enable_ANGLE_instanced_arrays","webgl_enable_OES_vertex_array_object","webgl_enable_WEBGL_draw_buffers","webgl_enable_WEBGL_multi_draw","webgl_enable_EXT_polygon_offset_clamp","webgl_enable_EXT_clip_control","webgl_enable_WEBGL_polygon_mode","emscriptenWebGLGet","computeUnpackAlignedImageSize","colorChannelsInGlTextureFormat","emscriptenWebGLGetTexPixelData","emscriptenWebGLGetUniform","webglGetUniformLocation","webglPrepareUniformLocationsBeforeFirstUse","webglGetLeftBracePos","emscriptenWebGLGetVertexAttrib","__glGetActiveAttribOrUniform","writeGLArray","registerWebGlEventCallback","runAndAbortIfError","ALLOC_NORMAL","ALLOC_STACK","allocate","writeStringToMemory","writeAsciiToMemory","allocateUTF8","allocateUTF8OnStack","demangle","stackTrace","getNativeTypeSize"].forEach(function(e){Xe(e)}),["run","out","err","callMain","abort","wasmExports","HEAPF32","HEAPF64","HEAP8","HEAP16","HEAPU16","HEAP32","HEAPU32","HEAP64","HEAPU64","writeStackCookie","checkStackCookie","INT53_MAX","INT53_MIN","bigintToI53Checked","stackSave","stackRestore","stackAlloc","ptrToString","getHeapMax","growMemory","ENV","ERRNO_CODES","strError","DNS","Protocols","Sockets","timers","warnOnce","readEmAsmArgsArray","asyncLoad","alignMemory","mmapAlloc","wasmTable","wasmMemory","getUniqueRunDependency","noExitRuntime","addRunDependency","removeRunDependency","addOnPreRun","addOnPostRun","freeTableIndexes","functionsInTableMap","UTF8Decoder","UTF8ArrayToString","stringToUTF8Array","intArrayFromString","UTF16Decoder","stringToUTF8OnStack","writeArrayToMemory","JSEvents","specialHTMLTargets","findCanvasEventTarget","currentFullscreenStrategy","restoreOldWindowedStyle","UNWIND_CACHE","ExitStatus","doReadv","doWritev","initRandomFill","randomFill","emSetImmediate","emClearImmediate_deps","emClearImmediate","promiseMap","uncaughtExceptionCount","exceptionLast","exceptionCaught","Browser","requestFullscreen","requestFullScreen","setCanvasSize","getUserMedia","createContext","getPreloadedImageData__data","wget","MONTH_DAYS_REGULAR","MONTH_DAYS_LEAP","MONTH_DAYS_REGULAR_CUMULATIVE","MONTH_DAYS_LEAP_CUMULATIVE","SYSCALLS","preloadPlugins","FS_createPreloadedFile","FS_preloadFile","FS_modeStringToFlags","FS_getMode","FS_stdin_getChar_buffer","FS_stdin_getChar","FS_unlink","FS_createPath","FS_createDevice","FS_readFile","FS_root","FS_mounts","FS_devices","FS_streams","FS_nextInode","FS_nameTable","FS_currentPath","FS_initialized","FS_ignorePermissions","FS_filesystems","FS_syncFSRequests","FS_lookupPath","FS_getPath","FS_hashName","FS_hashAddNode","FS_hashRemoveNode","FS_lookupNode","FS_createNode","FS_destroyNode","FS_isRoot","FS_isMountpoint","FS_isFile","FS_isDir","FS_isLink","FS_isChrdev","FS_isBlkdev","FS_isFIFO","FS_isSocket","FS_flagsToPermissionString","FS_nodePermissions","FS_mayLookup","FS_mayCreate","FS_mayDelete","FS_mayOpen","FS_checkOpExists","FS_nextfd","FS_getStreamChecked","FS_getStream","FS_createStream","FS_closeStream","FS_dupStream","FS_doSetAttr","FS_chrdev_stream_ops","FS_major","FS_minor","FS_makedev","FS_registerDevice","FS_getDevice","FS_getMounts","FS_syncfs","FS_mount","FS_unmount","FS_lookup","FS_mknod","FS_statfs","FS_statfsStream","FS_statfsNode","FS_create","FS_mkdir","FS_mkdev","FS_symlink","FS_rename","FS_rmdir","FS_readdir","FS_readlink","FS_stat","FS_fstat","FS_lstat","FS_doChmod","FS_chmod","FS_lchmod","FS_fchmod","FS_doChown","FS_chown","FS_lchown","FS_fchown","FS_doTruncate","FS_truncate","FS_ftruncate","FS_utime","FS_open","FS_close","FS_isClosed","FS_llseek","FS_read","FS_write","FS_mmap","FS_msync","FS_ioctl","FS_writeFile","FS_cwd","FS_chdir","FS_createDefaultDirectories","FS_createDefaultDevices","FS_createSpecialDirectories","FS_createStandardStreams","FS_staticInit","FS_init","FS_quit","FS_findObject","FS_analyzePath","FS_createFile","FS_createDataFile","FS_forceLoadFile","FS_createLazyFile","FS_absolutePath","FS_createFolder","FS_createLink","FS_joinPath","FS_mmapAlloc","FS_standardizePath","MEMFS","TTY","PIPEFS","SOCKFS","tempFixedLengthArray","miniTempWebGLFloatBuffers","miniTempWebGLIntBuffers","GL","AL","GLUT","EGL","GLEW","IDBStore","SDL","SDL_gfx","print","printErr","jstoi_s"].forEach(Xe),a._free=N("_free"),a._malloc=N("_malloc"),a._mp_sched_keyboard_interrupt=N("_mp_sched_keyboard_interrupt"),a._mp_js_init=N("_mp_js_init"),a._mp_js_register_js_module=N("_mp_js_register_js_module"),a._mp_js_do_import=N("_mp_js_do_import"),a._proxy_convert_mp_to_js_obj_cside=N("_proxy_convert_mp_to_js_obj_cside"),a._mp_js_do_exec=N("_mp_js_do_exec"),a._mp_js_do_exec_async=N("_mp_js_do_exec_async"),a._mp_js_repl_init=N("_mp_js_repl_init"),a._mp_js_repl_process_char=N("_mp_js_repl_process_char"),a._mp_js_register_romfs=N("_mp_js_register_romfs"),a._mp_hal_get_interrupt_char=N("_mp_hal_get_interrupt_char"),a._proxy_c_init=N("_proxy_c_init"),a._proxy_c_free_obj=N("_proxy_c_free_obj"),a._proxy_c_to_js_call=N("_proxy_c_to_js_call"),a._proxy_c_to_js_dir=N("_proxy_c_to_js_dir"),a._proxy_c_to_js_has_attr=N("_proxy_c_to_js_has_attr"),a._proxy_c_to_js_lookup_attr=N("_proxy_c_to_js_lookup_attr"),a._proxy_c_to_js_store_attr=N("_proxy_c_to_js_store_attr"),a._proxy_c_to_js_delete_attr=N("_proxy_c_to_js_delete_attr"),a._proxy_c_to_js_get_type=N("_proxy_c_to_js_get_type"),a._proxy_c_to_js_get_array=N("_proxy_c_to_js_get_array"),a._proxy_c_to_js_get_dict=N("_proxy_c_to_js_get_dict"),a._proxy_c_to_js_get_iter=N("_proxy_c_to_js_get_iter"),a._proxy_c_to_js_iternext=N("_proxy_c_to_js_iternext"),a._proxy_c_to_js_resume=N("_proxy_c_to_js_resume");var _n=N("_fflush"),fn=N("_strerror"),Be=N("_emscripten_stack_get_end"),Y=N("_setThrew"),un=N("_emscripten_stack_init"),pn=N("__emscripten_stack_restore"),mn=N("__emscripten_stack_alloc"),hn=N("_emscripten_stack_get_current"),ke=N("wasmMemory"),We=N("wasmTable"),yn,ve,gn={__syscall_chdir:function(e){try{return e=T.getStr(e),r.chdir(e),0}catch(n){if(r===void 0||n.name!=="ErrnoError")throw n;return-n.errno}},__syscall_fstat64:function(e,n){try{return T.writeStat(n,r.fstat(e))}catch(t){if(r===void 0||t.name!=="ErrnoError")throw t;return-t.errno}},__syscall_getcwd:function(e,n){try{if(n===0)return-28;var t=r.cwd(),o=Ee(t)+1;return n<o?-68:(Se(t,e,n),o)}catch(s){if(r===void 0||s.name!=="ErrnoError")throw s;return-s.errno}},__syscall_getdents64:function(e,n,t){try{var o=T.getStreamFromFD(e);o.getdents||=r.readdir(o.path);for(var s=0,i=r.llseek(o,0,1),l=Math.floor(i/280),d=Math.min(o.getdents.length,l+Math.floor(t/280)),_=l;_<d;_++){var h,b,g=o.getdents[_];if(g===".")h=o.node.id,b=4;else if(g==="..")h=r.lookupPath(o.path,{parent:!0}).node.id,b=4;else{var f;try{f=r.lookupNode(o.node,g)}catch(y){if(y?.errno===28)continue;throw y}h=f.id,b=r.isChrdev(f.mode)?2:r.isDir(f.mode)?4:r.isLink(f.mode)?10:8}c(h),W[n+s>>3]=BigInt(h),W[n+s+8>>3]=BigInt(280*(_+1)),le[n+s+16>>1]=280,X[n+s+18]=b,Se(g,n+s+19,256),s+=280}return r.llseek(o,280*_,0),s}catch(y){if(r===void 0||y.name!=="ErrnoError")throw y;return-y.errno}},__syscall_lstat64:function(e,n){try{return e=T.getStr(e),T.writeStat(n,r.lstat(e))}catch(t){if(r===void 0||t.name!=="ErrnoError")throw t;return-t.errno}},__syscall_mkdirat:function(e,n,t){try{return n=T.getStr(n),n=T.calculateAt(e,n),r.mkdir(n,t,0),0}catch(o){if(r===void 0||o.name!=="ErrnoError")throw o;return-o.errno}},__syscall_newfstatat:function(e,n,t,o){try{n=T.getStr(n);var s=256&o,i=4096&o;return c(!(o&=-6401),`unknown flags in __syscall_newfstatat: ${o}`),n=T.calculateAt(e,n,i),T.writeStat(t,s?r.lstat(n):r.stat(n))}catch(l){if(r===void 0||l.name!=="ErrnoError")throw l;return-l.errno}},__syscall_openat:function(e,n,t,o){T.varargs=o;try{n=T.getStr(n),n=T.calculateAt(e,n);var s=o?(()=>{c(T.varargs!=null);var i=te[+T.varargs>>2];return T.varargs+=4,i})():0;return r.open(n,t,s).fd}catch(i){if(r===void 0||i.name!=="ErrnoError")throw i;return-i.errno}},__syscall_poll:function(e,n,t){try{for(var o=0,s=0;s<n;s++){var i=e+8*s,l=te[i>>2],d=le[i+4>>1],_=32,h=r.getStream(l);h&&(_=h.stream_ops.poll?h.stream_ops.poll(h,-1):5),(_&=24|d)&&o++,le[i+6>>1]=_}return o||t==0||de("non-zero poll() timeout not supported: "+t),o}catch(b){if(r===void 0||b.name!=="ErrnoError")throw b;return-b.errno}},__syscall_renameat:function(e,n,t,o){try{return n=T.getStr(n),o=T.getStr(o),n=T.calculateAt(e,n),o=T.calculateAt(t,o),r.rename(n,o),0}catch(s){if(r===void 0||s.name!=="ErrnoError")throw s;return-s.errno}},__syscall_rmdir:function(e){try{return e=T.getStr(e),r.rmdir(e),0}catch(n){if(r===void 0||n.name!=="ErrnoError")throw n;return-n.errno}},__syscall_stat64:function(e,n){try{return e=T.getStr(e),T.writeStat(n,r.stat(e))}catch(t){if(r===void 0||t.name!=="ErrnoError")throw t;return-t.errno}},__syscall_statfs64:function(e,n,t){try{return c(n===88),T.writeStatFs(t,r.statfs(T.getStr(e))),0}catch(o){if(r===void 0||o.name!=="ErrnoError")throw o;return-o.errno}},__syscall_unlinkat:function(e,n,t){try{if(n=T.getStr(n),n=T.calculateAt(e,n),t){if(t!==512)return-28;r.rmdir(n)}else r.unlink(n);return 0}catch(o){if(r===void 0||o.name!=="ErrnoError")throw o;return-o.errno}},_abort_js:()=>R("native code called abort()"),_emscripten_throw_longjmp:()=>{throw 1/0},call0:function(e,n){L((0,proxy_js_ref[e])(),n)},call0_kwarg:function(e,n,t,o,s,i){const l=proxy_js_ref[e],d={};for(let h=0;h<t;++h){const b=Q(Oe(o+4*h,"i32")),g=A(s+3*h*4);d[b]=g}let _;_=n?l.call(d):l(d),L(_,i)},call1:function(e,n,t,o){const s=A(t),i=proxy_js_ref[e];let l;l=n?i.call(s):i(s),L(l,o)},call2:function(e,n,t,o,s){const i=A(t),l=A(o),d=proxy_js_ref[e];let _;_=n?d.call(i,l):d(i,l),L(_,s)},calln:function(e,n,t,o,s){const i=proxy_js_ref[e],l=[];for(let _=0;_<t;++_){const h=A(o+3*_*4);l.push(h)}let d;d=n?i.call(...l):i(...l),L(d,s)},calln_kwarg:function(e,n,t,o,s,i,l,d){const _=proxy_js_ref[e],h=[];for(let f=0;f<t;++f){const y=A(o+3*f*4);h.push(y)}const b={};for(let f=0;f<s;++f){const y=Q(Oe(i+4*f,"i32")),F=A(l+3*f*4);b[y]=F}let g;g=n?_.call(...h,b):_(...h,b),L(g,d)},create_promise:function(e,n){const t=A(e);L(new Promise(t),n)},emscripten_resize_heap:e=>{var n=me.length;if(c((e>>>=0)>n),e>2147483648)return O(`Cannot enlarge memory, requested ${e} bytes, but the limit is 2147483648 bytes!`),!1;for(var t=1;t<=4;t*=2){var o=n*(1+.2/t);o=Math.min(o,e+100663296);var s=Math.min(2147483648,Pn(Math.max(e,o),65536));if(In(s))return!0}return O(`Failed to grow the heap from ${n} bytes to ${s} bytes, not enough memory!`),!1},fd_close:function(e){try{var n=T.getStreamFromFD(e);return r.close(n),0}catch(t){if(r===void 0||t.name!=="ErrnoError")throw t;return t.errno}},fd_read:function(e,n,t,o){try{var s=((i,l,d,_)=>{for(var h=0,b=0;b<d;b++){var g=M[l>>2],f=M[l+4>>2];l+=8;var y=r.read(i,X,g,f,_);if(y<0)return-1;if(h+=y,y<f)break;_!==void 0&&(_+=y)}return h})(T.getStreamFromFD(e),n,t);return M[o>>2]=s,0}catch(i){if(r===void 0||i.name!=="ErrnoError")throw i;return i.errno}},fd_seek:function(e,n,t,o){var s;n=(s=n)<-9007199254740992||s>9007199254740992?NaN:Number(s);try{if(isNaN(n))return 61;var i=T.getStreamFromFD(e);return r.llseek(i,n,t),W[o>>3]=BigInt(i.position),i.getdents&&n===0&&t===0&&(i.getdents=null),0}catch(l){if(r===void 0||l.name!=="ErrnoError")throw l;return l.errno}},fd_sync:function(e){try{var n=T.getStreamFromFD(e),t=n.stream_ops?.fsync?.(n);return t}catch(o){if(r===void 0||o.name!=="ErrnoError")throw o;return o.errno}},fd_write:function(e,n,t,o){try{var s=((i,l,d,_)=>{for(var h=0,b=0;b<d;b++){var g=M[l>>2],f=M[l+4>>2];l+=8;var y=r.write(i,X,g,f,_);if(y<0)return-1;if(h+=y,y<f)break;_!==void 0&&(_+=y)}return h})(T.getStreamFromFD(e),n,t);return M[o>>2]=s,0}catch(i){if(r===void 0||i.name!=="ErrnoError")throw i;return i.errno}},has_attr:function(e,n){const t=proxy_js_ref[e];return Q(n)in t},invoke_i:function(e){var n=G();try{return $(e)()}catch(t){if(H(n),t!==t+0)throw t;Y(1,0)}},invoke_ii:function(e,n){var t=G();try{return $(e)(n)}catch(o){if(H(t),o!==o+0)throw o;Y(1,0)}},invoke_iii:function(e,n,t){var o=G();try{return $(e)(n,t)}catch(s){if(H(o),s!==s+0)throw s;Y(1,0)}},invoke_iiii:function(e,n,t,o){var s=G();try{return $(e)(n,t,o)}catch(i){if(H(s),i!==i+0)throw i;Y(1,0)}},invoke_iiiii:function(e,n,t,o,s){var i=G();try{return $(e)(n,t,o,s)}catch(l){if(H(i),l!==l+0)throw l;Y(1,0)}},invoke_iiiiii:function(e,n,t,o,s,i){var l=G();try{return $(e)(n,t,o,s,i)}catch(d){if(H(l),d!==d+0)throw d;Y(1,0)}},invoke_v:function(e){var n=G();try{$(e)()}catch(t){if(H(n),t!==t+0)throw t;Y(1,0)}},invoke_vi:function(e,n){var t=G();try{$(e)(n)}catch(o){if(H(t),o!==o+0)throw o;Y(1,0)}},invoke_vii:function(e,n,t){var o=G();try{$(e)(n,t)}catch(s){if(H(o),s!==s+0)throw s;Y(1,0)}},invoke_viii:function(e,n,t,o){var s=G();try{$(e)(n,t,o)}catch(i){if(H(s),i!==i+0)throw i;Y(1,0)}},invoke_viiii:function(e,n,t,o,s){var i=G();try{$(e)(n,t,o,s)}catch(l){if(H(i),l!==l+0)throw l;Y(1,0)}},js_check_existing:function(e){return function(n){const t=globalThis.proxy_js_map.get(n)?.deref();if(t===void 0)return-1;for(let o=0;o<globalThis.proxy_js_existing.length;++o)if(globalThis.proxy_js_existing[o]===void 0)return globalThis.proxy_js_existing[o]=t,o;return globalThis.proxy_js_existing.push(t),globalThis.proxy_js_existing.length-1}(e)},js_get_error_info:function(e,n,t){const o=proxy_js_ref[e];L(o.name,n),L(o.message,t)},js_get_iter:function(e,n){L(proxy_js_ref[e][Symbol.iterator](),n)},js_get_proxy_js_ref_info:function(e){let n=0;for(const t of proxy_js_ref)t!==void 0&&++n;a.setValue(e,proxy_js_ref.length,"i32"),a.setValue(e+4,n,"i32")},js_iter_next:function(e,n){const t=proxy_js_ref[e].next();return!t.done&&(L(t.value,n),!0)},js_reflect_construct:function(e,n,t,o){const s=proxy_js_ref[e],i=[];for(let l=0;l<n;++l)i.push(A(t+3*l*4));L(Reflect.construct(s,i),o)},js_subscr_load:function(e,n,t){const o=proxy_js_ref[e],s=function(i,l){let d=l;if(typeof d=="number"&&(d<0&&(d+=i.length),d<0||d>=i.length))throw new wn("IndexError","index out of range");return d}(o,A(n));L(o[s],t)},js_subscr_store:function(e,n,t){proxy_js_ref[e][A(n)]=A(t)},js_then_continue:function(e,n,t,o,s){const i=A(n),l=A(t),d=A(o);L(proxy_js_ref[e].then(_=>{i(_,null,l,d)},_=>{i(null,_,l,d)}),s)},js_then_reject:function(e,n){let t;try{t=A(e)}catch(o){t=o}A(n)(t)},js_then_resolve:function(e,n){const t=A(e);A(n)(t)},lookup_attr:function(e,n,t){const o=proxy_js_ref[e],s=Q(n);let i=o[s];return i!==void 0||s in o?(L(i,t),typeof i!="function"||"_ref"in i?1:2):0},mp_js_random_u32:()=>globalThis.crypto.getRandomValues(new Uint32Array(1))[0],mp_js_ticks_ms:()=>Date.now()-Mn,mp_js_time_ms:()=>Date.now(),proxy_convert_mp_to_js_then_js_to_js_then_js_to_mp_obj_jsside:function(e){const n=A(e);L(ee.toJs(n),e)},proxy_convert_mp_to_js_then_js_to_mp_obj_jsside:function(e){(function(n,t){En(n,t,!1)})(A(e),e)},proxy_js_free_obj:function(e){e>=bn&&(proxy_js_ref_map.delete(proxy_js_ref[e]),proxy_js_ref[e]=void 0,e<proxy_js_ref_next&&(proxy_js_ref_next=e))},store_attr:function(e,n,t){const o=Q(n),s=A(t);proxy_js_ref[e][o]=s}};function Dn(){var e;un(),c(!(3&(e=Be()))),e==0&&(e+=4),M[e>>2]=34821223,M[e+4>>2]=2310721022,M[0]=1668509029}ve=await async function(){function e(o,s){return function(i){c(i.free!==void 0,"missing Wasm export: free"),c(i.malloc!==void 0,"missing Wasm export: malloc"),c(i.mp_sched_keyboard_interrupt!==void 0,"missing Wasm export: mp_sched_keyboard_interrupt"),c(i.mp_js_init!==void 0,"missing Wasm export: mp_js_init"),c(i.mp_js_register_js_module!==void 0,"missing Wasm export: mp_js_register_js_module"),c(i.mp_js_do_import!==void 0,"missing Wasm export: mp_js_do_import"),c(i.proxy_convert_mp_to_js_obj_cside!==void 0,"missing Wasm export: proxy_convert_mp_to_js_obj_cside"),c(i.mp_js_do_exec!==void 0,"missing Wasm export: mp_js_do_exec"),c(i.mp_js_do_exec_async!==void 0,"missing Wasm export: mp_js_do_exec_async"),c(i.mp_js_repl_init!==void 0,"missing Wasm export: mp_js_repl_init"),c(i.mp_js_repl_process_char!==void 0,"missing Wasm export: mp_js_repl_process_char"),c(i.mp_js_register_romfs!==void 0,"missing Wasm export: mp_js_register_romfs"),c(i.mp_hal_get_interrupt_char!==void 0,"missing Wasm export: mp_hal_get_interrupt_char"),c(i.proxy_c_init!==void 0,"missing Wasm export: proxy_c_init"),c(i.proxy_c_free_obj!==void 0,"missing Wasm export: proxy_c_free_obj"),c(i.proxy_c_to_js_call!==void 0,"missing Wasm export: proxy_c_to_js_call"),c(i.proxy_c_to_js_dir!==void 0,"missing Wasm export: proxy_c_to_js_dir"),c(i.proxy_c_to_js_has_attr!==void 0,"missing Wasm export: proxy_c_to_js_has_attr"),c(i.proxy_c_to_js_lookup_attr!==void 0,"missing Wasm export: proxy_c_to_js_lookup_attr"),c(i.proxy_c_to_js_store_attr!==void 0,"missing Wasm export: proxy_c_to_js_store_attr"),c(i.proxy_c_to_js_delete_attr!==void 0,"missing Wasm export: proxy_c_to_js_delete_attr"),c(i.proxy_c_to_js_get_type!==void 0,"missing Wasm export: proxy_c_to_js_get_type"),c(i.proxy_c_to_js_get_array!==void 0,"missing Wasm export: proxy_c_to_js_get_array"),c(i.proxy_c_to_js_get_dict!==void 0,"missing Wasm export: proxy_c_to_js_get_dict"),c(i.proxy_c_to_js_get_iter!==void 0,"missing Wasm export: proxy_c_to_js_get_iter"),c(i.proxy_c_to_js_iternext!==void 0,"missing Wasm export: proxy_c_to_js_iternext"),c(i.proxy_c_to_js_resume!==void 0,"missing Wasm export: proxy_c_to_js_resume"),c(i.fflush!==void 0,"missing Wasm export: fflush"),c(i.strerror!==void 0,"missing Wasm export: strerror"),c(i.emscripten_stack_get_end!==void 0,"missing Wasm export: emscripten_stack_get_end"),c(i.emscripten_stack_get_base!==void 0,"missing Wasm export: emscripten_stack_get_base"),c(i.setThrew!==void 0,"missing Wasm export: setThrew"),c(i.emscripten_stack_init!==void 0,"missing Wasm export: emscripten_stack_init"),c(i.emscripten_stack_get_free!==void 0,"missing Wasm export: emscripten_stack_get_free"),c(i._emscripten_stack_restore!==void 0,"missing Wasm export: _emscripten_stack_restore"),c(i._emscripten_stack_alloc!==void 0,"missing Wasm export: _emscripten_stack_alloc"),c(i.emscripten_stack_get_current!==void 0,"missing Wasm export: emscripten_stack_get_current"),c(i.memory!==void 0,"missing Wasm export: memory"),c(i.__indirect_function_table!==void 0,"missing Wasm export: __indirect_function_table"),a._free=I("free",1),a._malloc=I("malloc",1),a._mp_sched_keyboard_interrupt=I("mp_sched_keyboard_interrupt",0),a._mp_js_init=I("mp_js_init",2),a._mp_js_register_js_module=I("mp_js_register_js_module",2),a._mp_js_do_import=I("mp_js_do_import",2),a._proxy_convert_mp_to_js_obj_cside=I("proxy_convert_mp_to_js_obj_cside",2),a._mp_js_do_exec=I("mp_js_do_exec",3),a._mp_js_do_exec_async=I("mp_js_do_exec_async",3),a._mp_js_repl_init=I("mp_js_repl_init",0),a._mp_js_repl_process_char=I("mp_js_repl_process_char",1),a._mp_js_register_romfs=I("mp_js_register_romfs",2),a._mp_hal_get_interrupt_char=I("mp_hal_get_interrupt_char",0),a._proxy_c_init=I("proxy_c_init",0),a._proxy_c_free_obj=I("proxy_c_free_obj",1),a._proxy_c_to_js_call=I("proxy_c_to_js_call",4),a._proxy_c_to_js_dir=I("proxy_c_to_js_dir",2),a._proxy_c_to_js_has_attr=I("proxy_c_to_js_has_attr",2),a._proxy_c_to_js_lookup_attr=I("proxy_c_to_js_lookup_attr",3),a._proxy_c_to_js_store_attr=I("proxy_c_to_js_store_attr",3),a._proxy_c_to_js_delete_attr=I("proxy_c_to_js_delete_attr",2),a._proxy_c_to_js_get_type=I("proxy_c_to_js_get_type",1),a._proxy_c_to_js_get_array=I("proxy_c_to_js_get_array",2),a._proxy_c_to_js_get_dict=I("proxy_c_to_js_get_dict",2),a._proxy_c_to_js_get_iter=I("proxy_c_to_js_get_iter",1),a._proxy_c_to_js_iternext=I("proxy_c_to_js_iternext",2),a._proxy_c_to_js_resume=I("proxy_c_to_js_resume",2),_n=I("fflush",1),fn=I("strerror",1),Be=i.emscripten_stack_get_end,i.emscripten_stack_get_base,Y=I("setThrew",2),un=i.emscripten_stack_init,i.emscripten_stack_get_free,pn=i._emscripten_stack_restore,mn=i._emscripten_stack_alloc,hn=i.emscripten_stack_get_current,ke=i.memory,We=i.__indirect_function_table}(ve=o.exports),$e(),ve}var n=a,t={env:gn,wasi_snapshot_preview1:gn};return a.instantiateWasm?new Promise((o,s)=>{try{a.instantiateWasm(t,(i,l)=>{o(e(i))})}catch(i){O(`Module.instantiateWasm callback failed with error: ${i}`),s(i)}}):(je??=Sn(),function(o){return c(a===n,"the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?"),n=null,e(o.instance)}(await Nn(B,je,t)))}(),function e(){function n(){c(!yn),yn=!0,a.calledRun=!0,be||(c(!he),he=!0,Me(),a.noFSInit||r.initialized||r.init(),ve.__wasm_call_ctors(),r.ignorePermissions=!1,Ge?.(a),a.onRuntimeInitialized?.(),we("onRuntimeInitialized"),c(!a._main,'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]'),function(){if(Me(),a.postRun)for(typeof a.postRun=="function"&&(a.postRun=[a.postRun]);a.postRun.length;)xn(a.postRun.shift());we("postRun"),Je(Qe)}())}se>0?ge=e:(Dn(),function(){if(a.preRun)for(typeof a.preRun=="function"&&(a.preRun=[a.preRun]);a.preRun.length;)Tn(a.preRun.shift());we("preRun"),Je(Ze)}(),se>0?ge=e:(a.setStatus?(a.setStatus("Running..."),setTimeout(()=>{setTimeout(()=>a.setStatus(""),1),n()},1)):n(),Me()))}(),u=he?a:new Promise((e,n)=>{Ge=e,Ye=n});for(const e of Object.keys(a))e in m||Object.defineProperty(m,e,{configurable:!0,get(){R(`Access to module property ('${e}') is no longer possible via the module constructor argument; Instead, use the result of the module constructor.`)}});return u}async function He(m){const{pystack:u,heapsize:a,url:v,stdin:w,stdout:x,stderr:k,linebuffer:C,romfs:P}=Object.assign({pystack:2048,heapsize:1048576,linebuffer:!0},m);let p={locateFile:(E,j)=>v||j+E};p._textDecoder=new TextDecoder,w!==void 0&&(p.stdin=w),x!==void 0&&(C?(p._stdoutBuffer=[],p.stdout=E=>{E===10?(x(p._textDecoder.decode(new Uint8Array(p._stdoutBuffer))),p._stdoutBuffer=[]):p._stdoutBuffer.push(E)}):p.stdout=E=>x(new Uint8Array([E]))),k!==void 0&&(C?(p._stderrBuffer=[],p.stderr=E=>{E===10?(k(p._textDecoder.decode(new Uint8Array(p._stderrBuffer))),p._stderrBuffer=[]):p._stderrBuffer.push(E)}):p.stderr=E=>k(new Uint8Array([E]))),p=await Rn(p),globalThis.Module=p,nt();const z=E=>{const j=p._malloc(12);return p.ccall("mp_js_do_import","null",["string","pointer"],[E,j]),ae(j)};if(P!==void 0){const E=p._malloc(P.length);p.HEAPU8.set(P,E),p.ccall("mp_js_register_romfs","null",["pointer","number"],[E,P.length])}return p.ccall("mp_js_init","null",["number","number"],[u,a]),p.ccall("proxy_c_init","null",[],[]),{_module:p,PyProxy:ee,FS:p.FS,globals:{__dict__:z("__main__").__dict__,get(E){return this.__dict__[E]},set(E,j){this.__dict__[E]=j},delete(E){delete this.__dict__[E]}},registerJsModule(E,j){const B=p._malloc(12);L(j,B),p.ccall("mp_js_register_js_module","null",["string","pointer"],[E,B]),p._free(B)},pyimport:z,runPython(E){const j=p.lengthBytesUTF8(E),B=p._malloc(j+1);p.stringToUTF8(E,B,j+1);const J=p._malloc(12);return p.ccall("mp_js_do_exec","number",["pointer","number","pointer"],[B,j,J]),p._free(B),ae(J)},runPythonAsync(E){const j=p.lengthBytesUTF8(E),B=p._malloc(j+1);p.stringToUTF8(E,B,j+1);const J=p._malloc(12);p.ccall("mp_js_do_exec_async","number",["pointer","number","pointer"],[B,j,J]),p._free(B);const O=ae(J);return O instanceof Ie?Promise.resolve(O):O},replInit(){p.ccall("mp_js_repl_init","null",["null"])},replProcessChar:E=>p.ccall("mp_js_repl_process_char","number",["number"],[E]),replProcessCharWithAsyncify:async E=>p.ccall("mp_js_repl_process_char","number",["number"],[E],{async:!0})}}if(globalThis.loadMicroPython=He,typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string"&&process.argv.length>1){const m=await import("./__vite-browser-external-9wXp6ZBx.js"),u=await import("./__vite-browser-external-9wXp6ZBx.js"),a=m.resolve(u.fileURLToPath(import.meta.url)),v=m.resolve(process.argv[1]);a.includes(v)&&async function(){const w=await import("./__vite-browser-external-9wXp6ZBx.js");let x=131072,k="",C=!0;for(let p=2;p<process.argv.length;p++)if(process.argv[p]==="-X"&&p<process.argv.length-1){if(process.argv[p+1].includes("heapsize=")){x=parseInt(process.argv[p+1].split("heapsize=")[1]);const z=process.argv[p+1].substr(-1).toLowerCase();z==="k"?x*=1024:z==="m"&&(x*=1048576),++p}}else k+=w.readFileSync(process.argv[p],"utf8"),C=!1;process.stdin.isTTY===!1&&(k=w.readFileSync(0,"utf8"),C=!1);const P=await He({heapsize:x,stdout:p=>process.stdout.write(p),linebuffer:!1});if(C)P.replInit(),process.stdin.setRawMode(!0),process.stdin.on("data",p=>{for(let z=0;z<p.length;z++)P.replProcessCharWithAsyncify(p[z]).then(E=>{E&&process.exit()})});else{if(k.endsWith(`asyncio.run(main())
`)){const p=P.pyimport("asyncio");p.run=async z=>{await p.create_task(z)}}try{P.runPython(k)}catch(p){if(p.name!=="PythonError")throw p;p.type==="SystemExit"||console.error(p.message)}}}()}class ee{constructor(u){this._ref=u}static toJs(u){if(!(u instanceof ee))return u;const a=Module.ccall("proxy_c_to_js_get_type","number",["number"],[u._ref]);if(a===1||a===2){const v=Module._malloc(8),w=Module._malloc(12);Module.ccall("proxy_c_to_js_get_array","null",["number","pointer"],[u._ref,v]);const x=Module.getValue(v,"i32"),k=Module.getValue(v+4,"i32"),C=[];for(let P=0;P<x;++P){Module.ccall("proxy_convert_mp_to_js_obj_cside","null",["pointer","pointer"],[Module.getValue(k+4*P,"i32"),w]);const p=A(w);C.push(ee.toJs(p))}return Module._free(v),Module._free(w),C}if(a===3){const v=Module._malloc(8),w=Module._malloc(12);Module.ccall("proxy_c_to_js_get_dict","null",["number","pointer"],[u._ref,v]);const x=Module.getValue(v,"i32"),k=Module.getValue(v+4,"i32"),C={};for(let P=0;P<x;++P){const p=Module.getValue(k+8*P,"i32");if(p>8){Module.ccall("proxy_convert_mp_to_js_obj_cside","null",["pointer","pointer"],[p,w]);const z=A(w),E=Module.getValue(k+8*P+4,"i32");Module.ccall("proxy_convert_mp_to_js_obj_cside","null",["pointer","pointer"],[E,w]);const j=A(w);C[z]=ee.toJs(j)}}return Module._free(v),Module._free(w),C}return u}}const Cn={isExtensible:()=>!0,ownKeys(m){const u=Module._malloc(12);Module.ccall("proxy_c_to_js_dir","null",["number","pointer"],[m._ref,u]);const a=ae(u);return ee.toJs(a).filter(v=>!v.startsWith("__"))},getOwnPropertyDescriptor:(m,u)=>({value:m[u],enumerable:!0,writable:!0,configurable:!0}),has:(m,u)=>typeof u!="string"?u===Symbol.iterator:Module.ccall("proxy_c_to_js_has_attr","number",["number","string"],[m._ref,u]),get(m,u){if(u==="_ref")return m._ref;if(u==="then"||typeof u!="string"){if(u===Symbol.iterator){const v=Module.ccall("proxy_c_to_js_get_iter","number",["number"],[m._ref]);return function*(){const w=Module._malloc(12);for(;Module.ccall("proxy_c_to_js_iternext","number",["number","pointer"],[v,w]);)yield A(w);Module._free(w)}}return}const a=Module._malloc(12);return Module.ccall("proxy_c_to_js_lookup_attr","null",["number","string","pointer"],[m._ref,u,a]),ae(a)},set(m,u,a){const v=Module._malloc(12);L(a,v);const w=Module.ccall("proxy_c_to_js_store_attr","number",["number","string","number"],[m._ref,u,v]);return Module._free(v),w},deleteProperty:(m,u)=>Module.ccall("proxy_c_to_js_delete_attr","number",["number","string"],[m._ref,u])};class Ie{constructor(u){this._ref=u}then(u,a){const v=Module._malloc(36);return L(u,v+12),L(a,v+24),Module.ccall("proxy_c_to_js_resume","null",["number","pointer"],[this._ref,v]),ae(v)}}const bn=2,An=-1,jn=0,On=1,Ln=2,zn=3,Un=4,Bn=5,Wn=6,qn=7,Kn=9,Vn=10,Hn=0,Gn=1,Yn=2,Xn=3,$n=4,Jn=5,Qn=6,Zn=7,et=8;class wn extends Error{constructor(u,a){super(a),this.name="PythonError",this.type=u}}function nt(){globalThis.proxy_js_ref=[globalThis,void 0],globalThis.proxy_js_ref_next=bn,globalThis.proxy_js_ref_map=new Map,globalThis.proxy_js_ref_map.set(globalThis,0),globalThis.proxy_js_map=new Map,globalThis.proxy_js_existing=[void 0],globalThis.pyProxyFinalizationRegistry=new FinalizationRegistry(m=>{globalThis.proxy_js_map.delete(m),Module.ccall("proxy_c_free_obj","null",["number"],[m])})}function En(m,u,a){let v;if(m===void 0)v=Hn;else if(m===null)v=Gn;else if(typeof m=="boolean")v=Yn,Module.setValue(u+4,m,"i32");else if(typeof m=="number")if(Number.isInteger(m))v=Xn,Module.setValue(u+4,m,"i32");else{v=$n;const w=u+4&-8;Module.setValue(w,m,"double");const x=Module.getValue(w,"i32"),k=Module.getValue(w+4,"i32");Module.setValue(u+4,x,"i32"),Module.setValue(u+8,k,"i32")}else if(typeof m=="string"){v=Jn;const w=Module.lengthBytesUTF8(m),x=Module._malloc(w+1);Module.stringToUTF8(m,x,w+1),Module.setValue(u+4,w,"i32"),Module.setValue(u+8,x,"i32")}else if(a&&(m instanceof ee||typeof m=="function"&&"_ref"in m||m instanceof Ie))v=et,Module.setValue(u+4,m._ref,"i32");else{let w;const x=proxy_js_ref_map.get(m);x!==void 0?(v=Qn,w=x):(v=Zn,w=function(k){for(;proxy_js_ref_next<proxy_js_ref.length;){if(proxy_js_ref[proxy_js_ref_next]===void 0){const P=proxy_js_ref_next;return++proxy_js_ref_next,proxy_js_ref[P]=k,proxy_js_ref_map.set(k,P),P}++proxy_js_ref_next}const C=proxy_js_ref.length;return proxy_js_ref[C]=k,proxy_js_ref_next=proxy_js_ref.length,proxy_js_ref_map.set(k,C),C}(m)),Module.setValue(u+4,w,"i32")}Module.setValue(u+0,v,"i32")}function L(m,u){En(m,u,!0)}function A(m){const u=Module.getValue(m,"i32");let a;if(u===An){const v=Module.getValue(m+4,"i32"),w=Module.getValue(m+8,"i32"),x=Module.UTF8ToString(w,v);Module._free(w);const k=x.split("");throw new wn(k[0],k[1])}if(u===jn)throw new Error("NULL object");if(u===On)a=null;else if(u===Ln)a=!!Module.getValue(m+4,"i32");else if(u===zn)a=Module.getValue(m+4,"i32");else if(u===Un){const v=m+4&-8,w=Module.getValue(m+4,"i32"),x=Module.getValue(m+8,"i32");Module.setValue(v,w,"i32"),Module.setValue(v+4,x,"i32"),a=Module.getValue(v,"double")}else if(u===Bn){const v=Module.getValue(m+4,"i32"),w=Module.getValue(m+8,"i32");a=Module.UTF8ToString(w,v)}else if(u===Kn){const v=Module.getValue(m+4,"i32");a=proxy_js_ref[v]}else if(u===Vn){const v=Module.getValue(m+4,"i32");a=globalThis.proxy_js_existing[v],globalThis.proxy_js_existing[v]=void 0}else{const v=Module.getValue(m+4,"i32");if(u===Wn)a=(...w)=>function(x,k){let C=0;for(;k.length>0&&k[k.length-1]===void 0;)k.pop();if(k.length>0){C=Module._malloc(3*k.length*4);for(const z in k)L(k[z],C+3*z*4)}const P=Module._malloc(12);Module.ccall("proxy_c_to_js_call","null",["number","number","number","pointer"],[x,k.length,C,P]),k.length>0&&Module._free(C);const p=ae(P);return p instanceof Ie?Promise.resolve(p):p}(v,w),a._ref=v;else if(u===qn)a=new Ie(v);else{const w=new ee(v);a=new Proxy(w,Cn)}globalThis.pyProxyFinalizationRegistry.register(a,v),globalThis.proxy_js_map.set(v,new WeakRef(a))}return a}function ae(m){const u=A(m);return Module._free(m),u}var tt="/assets/micropython-DXFUqjrr.wasm";const rt=`
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
`;var ot=`# SPDX-License-Identifier: MIT
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
`,st=`# SPDX-License-Identifier: MIT
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
"""MPU-6050 6-axis IMU driver (Snakie module #120).

A small, self-contained MIT-licensed register driver for the InvenSense MPU-6050
(3-axis accelerometer + 3-axis gyroscope over I²C). This is the driver behind the
dock **IMU** instrument (#111).

Usage on a board::

    from machine import I2C, Pin
    from mpu6050 import MPU6050
    import instruments as inst

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
`,at=`# SPDX-License-Identifier: MIT
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
`,lt=`# SPDX-License-Identifier: MIT
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
`,dt=`# SPDX-License-Identifier: MIT
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
`,ct=`"""Snakie Instruments — the on-device robotics telemetry + control toolkit.

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
__version__ = "0.9.2"

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
    cross-block pair or an unknown pin yields \`\`None\`\` (the IDE then warns and the
    driver falls back to block 0). Pure + side-effect-free for unit tests.
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
    driver falls back to block 0). Pure + side-effect-free for unit tests.
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
    from the pins (via :func:\`_i2c_block_for_pins\`, block 0 if the pair is invalid
    — the IDE warns), builds \`\`I2C(block, sda=Pin(sda), scl=Pin(scl))\`\`, then a
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

        Derives the I²C block from the pins (block 0 when the pair is invalid).
        Prefers an installed \`\`ssd1306\`\` driver, falling back to the bundled
        :class:\`_SSD1306\`. Guards every hardware import so it is inert under
        CPython (the panel is left unbuilt; \`\`text\`\` still echoes telemetry).
        """
        self._addr = "0x%02X" % int(addr) if isinstance(addr, int) else str(addr)
        block = _i2c_block_for_pins(sda, scl)
        if block is None:
            block = 0  # invalid pair → fall back to block 0 (the IDE warns)
        try:
            from machine import Pin, I2C
        except ImportError:
            return  # no hardware (CPython) — inert; text() still echoes telemetry
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

        Derives the SPI block from \`\`sck\`\`/\`\`mosi\`\` (block 0 when invalid — the IDE
        warns), builds \`\`SPI(block, sck=Pin(sck), mosi=Pin(mosi))\`\` at 30 MHz, then
        the bundled :class:\`_ST7789\` on \`\`dc\`\`/\`\`rst\`\`/\`\`cs\`\` at \`\`w\`\`×\`\`h\`\`. \`\`cs\`\`
        may be \`\`None\`\` / \`\`< 0\`\` (tied low, no CS pin). The echo label becomes
        \`\`st7789\`\` so the IDE's mirror tags the source. Guards every hardware import
        (inert under CPython — the panel stays unbuilt; \`\`text\`\` still echoes
        telemetry); a buffer too big for RAM falls back to telemetry-only.
        """
        self._addr = "st7789"  # single-token label for the SNK SCR echo
        block = _spi_block_for_pins(sck, mosi)
        if block is None:
            block = 0  # invalid pair → block 0 (the IDE warns)
        cs_pin = None if cs is None or int(cs) < 0 else int(cs)
        try:
            from machine import Pin, SPI
        except ImportError:
            self._oled = None
            return  # no hardware (CPython) — inert; text() still echoes telemetry
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
    else:
        a = obj.read_accelerometer_gyro_data()
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
`,_t='"""snakie — the friendly hardware layer for Snakie sketches.\n\nImport the things you *drive* from here, so your code reads\n``pin -> PWM -> Servo -> joint`` and never clashes with a vendor ``servo``\nmodule (Pimoroni\'s frozen ``servo``, etc.)::\n\n    from snakie import Servo, Buzzer, Led, Pin, PWM\n\n    base = Servo(PWM(Pin(0)), pin=0)   # a servo on GP0; pin= drives the 3-D model\n    base.angle(90)\n\nThese are re-exported from Snakie\'s on-device runtime (``instruments``), which\nkeeps the *measurement* tools (scope / meter / plotter). Same classes, friendlier\nname — ``snakie.Servo`` *is* ``instruments.Servo``. Uploaded to ``/lib/snakie.py``\nalongside ``instruments.py`` by the Board View\'s library installer.\n"""\n\n# Re-export ONLY the hardware/actuator classes + raw IO — the "connect pins to\n# things" layer. Scopes/meters/plotters stay in `instruments` (they\'re not things\n# you wire up, they\'re how you observe the ones you do).\nfrom instruments import Servo, Buzzer, Led, Pin, PWM  # noqa: F401 - re-exported API\n\n__all__ = ["Servo", "Buzzer", "Led", "Pin", "PWM"]\n';const ft=ct,ut=_t,pt=Object.assign({"../../../../micropython/modules/buzzer.py":ot,"../../../../micropython/modules/hcsr04.py":st,"../../../../micropython/modules/mpu6050.py":it,"../../../../micropython/modules/neopixel_ws2812.py":at,"../../../../micropython/modules/rotary.py":lt,"../../../../micropython/modules/teleop.py":dt});Object.fromEntries(Object.entries(pt).map(([m,u])=>[m.split("/").pop()??m,u]));const Te=new TextEncoder,vn=(m,u,a)=>{const v=Array.from(Te.encode(a)).map(x=>x.toString(16).padStart(2,"0")).join(""),w=u.slice(0,u.lastIndexOf("/"))||"/";m.runPython(`import os
try:
    os.mkdir(${JSON.stringify(w)})
except OSError:
    pass
_d = bytes.fromhex(${JSON.stringify(v)})
_f = open(${JSON.stringify(u)}, 'wb')
_f.write(_d)
_f.close()
del _d, _f`)},mt=m=>{vn(m,"/lib/instruments.py",ft),vn(m,"/lib/snakie.py",ut)};let Z=null,Pe=[],ue=null;const xe=m=>{const u=ue??Pe;for(const a of m)u.push(a)},ie=()=>{if(ue||Pe.length===0)return;const m=Uint8Array.from(Pe);Pe=[],postMessage({type:"out",bytes:m})},Ve=[];self.onmessage=async m=>{if(m.data?.type!=="init"&&!Z){Ve.push(m.data);return}const u=m.data;if(u.type==="init"){Z=await He({url:tt,linebuffer:!1,stdout:xe,stderr:xe}),setInterval(ie,24);try{Z.runPython(rt)}catch{}try{mt(Z)}catch{}for(Z.replInit(),ie(),postMessage({type:"ready"});Ve.length>0;)self.onmessage?.(new MessageEvent("message",{data:Ve.shift()}));return}if(Z){if(u.type==="feed"){try{for(const a of Te.encode(u.data))await Z.replProcessCharWithAsyncify(a);ie(),postMessage({type:"done",id:u.id})}catch(a){ie(),postMessage({type:"done",id:u.id,error:String(a)})}return}if(u.type==="run"){ie(),ue=[];try{Z.runPython(u.code),postMessage({type:"result",id:u.id,value:new TextDecoder().decode(Uint8Array.from(ue))})}catch(a){postMessage({type:"result",id:u.id,error:String(a)})}finally{ue=null}}if(u.type==="runStream"){ie(),ue=null;try{Z.runPython(u.code)}catch(a){const v=String(a?.message??a);xe(Te.encode(v.endsWith(`
`)?v:v+`
`))}finally{xe(Te.encode(`\r
>>> `)),ie(),postMessage({type:"done",id:u.id})}}}};
