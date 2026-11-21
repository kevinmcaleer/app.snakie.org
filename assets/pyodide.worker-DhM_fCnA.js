const _=new TextDecoder;let s=null;const i=e=>postMessage({type:"out",text:e.replace(/\r?\n/g,`\r
`)}),a={write:e=>(i(_.decode(e,{stream:!0})),e.length)},n=e=>i(`\x1B[2m${e}\x1B[0m
`),c=`
import os, sys, builtins, code as _snk_code
os.environ['MPLBACKEND'] = 'AGG'
_snk_ns = {'__name__': '__main__', '__builtins__': builtins}

def _snk_input(prompt=''):
    raise RuntimeError("input() isn't supported in this embed yet. Put the value in the code instead.")
builtins.input = _snk_input

_snk_console = _snk_code.InteractiveConsole(_snk_ns, filename='<stdin>')

def _snk_show_figures(*args, **kwargs):
    import io, base64, _snk
    import matplotlib.pyplot as plt
    for num in plt.get_fignums():
        buf = io.BytesIO()
        plt.figure(num).savefig(buf, format='png', dpi=100, bbox_inches='tight')
        _snk.image(base64.b64encode(buf.getvalue()).decode('ascii'))
    plt.close('all')

def _snk_patch_mpl():
    if 'matplotlib' not in sys.modules:
        try:
            import matplotlib
        except ImportError:
            return
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    plt.show = _snk_show_figures

def _snk_flush_figures():
    if 'matplotlib.pyplot' in sys.modules:
        if sys.modules['matplotlib.pyplot'].get_fignums():
            _snk_show_figures()

def _snk_run(src, name):
    import traceback
    try:
        exec(compile(src, name, 'exec'), _snk_ns)
    except SystemExit:
        pass
    except BaseException:
        et, ev, tb = sys.exc_info()
        traceback.print_exception(et, ev, tb.tb_next)
    finally:
        sys.stdout.flush()
        sys.stderr.flush()
    try:
        _snk_flush_figures()
    except Exception as e:
        print('Could not draw the plot:', e, file=sys.stderr)

def _snk_push(line):
    try:
        more = _snk_console.push(line)
    except SystemExit:
        more = False
    if 'matplotlib.pyplot' in sys.modules and not more:
        _snk_patch_mpl()
        _snk_flush_figures()
    sys.stdout.flush()
    sys.stderr.flush()
    return more
`;async function u(e,t){n("Loading Python (about 6 MB, only the first time)…");const o=await(await import(`${e}pyodide.mjs`)).loadPyodide({indexURL:e});o.setStdout(a),o.setStderr(a),o.registerJsModule("_snk",{image:p=>postMessage({type:"image",png:p})}),o.runPython(c),t.length>0&&await o.loadPackage(t,{messageCallback:n,errorCallback:n}),s=o}async function d(e){if(e.type==="init"){try{await u(e.indexURL,e.packages??[]),postMessage({type:"ready"})}catch(t){postMessage({type:"failed",error:`Python couldn't load: ${String(t?.message??t)}`})}return}if(!s){postMessage({type:"done",id:e.id});return}if(e.type==="run"){try{await s.loadPackagesFromImports(e.code,{messageCallback:n,errorCallback:n}),s.runPython("_snk_patch_mpl()"),s.globals.set("_snk_src",e.code),s.runPython("_snk_run(_snk_src, '<main.py>')")}catch(t){i(`${String(t?.message??t)}
`)}i(">>> "),postMessage({type:"done",id:e.id});return}if(e.type==="line"){let t=!1;try{/\bimport\b/.test(e.line)&&await s.loadPackagesFromImports(e.line,{messageCallback:n,errorCallback:n}),s.globals.set("_snk_line",e.line),t=s.runPython("_snk_push(_snk_line)")===!0}catch(r){i(`${String(r?.message??r)}
`)}i(t?"... ":">>> "),postMessage({type:"done",id:e.id})}}let l=Promise.resolve();self.onmessage=e=>{l=l.then(()=>d(e.data))};
