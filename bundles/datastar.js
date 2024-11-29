"use strict";(()=>{var D="datastar",Re="datastar-event",Ge="Datastar-Request";var Ke="type module";var N={Morph:"morph",Inner:"inner",Outer:"outer",Prepend:"prepend",Append:"append",Before:"before",After:"after",UpsertAttributes:"upsertAttributes"},qe=N.Morph,L={MergeFragments:"datastar-merge-fragments",MergeSignals:"datastar-merge-signals",RemoveFragments:"datastar-remove-fragments",RemoveSignals:"datastar-remove-signals",ExecuteScript:"datastar-execute-script"};var G=t=>{let e=new Error;return e.name=`${D}${t}`,e},y=G(400),X=G(409),W=G(404),F=G(403),ae=G(405),Je=G(503);function U(t){let e={};for(let[n,r]of Object.entries(t))n.startsWith("_")||(typeof r=="object"&&!Array.isArray(r)?e[n]=U(r):e[n]=r);return e}function le(t,e,n){let r={};if(!n)Object.assign(r,e);else for(let o in e){let i=t[o]?.value;i==null&&(r[o]=e[o])}return r}async function Ye(t,e){let n=t.getReader(),r;for(;!(r=await n.read()).done;)e(r.value)}function Ze(t){let e,n,r,o=!1;return function(s){e===void 0?(e=s,n=0,r=-1):e=wn(e,s);let a=e.length,u=0;for(;n<a;){o&&(e[n]===10&&(u=++n),o=!1);let m=-1;for(;n<a&&m===-1;++n)switch(e[n]){case 58:r===-1&&(r=n-u);break;case 13:o=!0;case 10:m=n;break}if(m===-1)break;t(e.subarray(u,m),r),u=n,r=-1}u===a?e=void 0:u!==0&&(e=e.subarray(u),n-=u)}}function Xe(t,e,n){let r=ze(),o=new TextDecoder;return function(s,a){if(s.length===0)n?.(r),r=ze();else if(a>0){let u=o.decode(s.subarray(0,a)),m=a+(s[a+1]===32?2:1),l=o.decode(s.subarray(m));switch(u){case"data":r.data=r.data?r.data+`
`+l:l;break;case"event":r.event=l;break;case"id":t(r.id=l);break;case"retry":let c=parseInt(l,10);isNaN(c)||e(r.retry=c);break}}}}function wn(t,e){let n=new Uint8Array(t.length+e.length);return n.set(t),n.set(e,t.length),n}function ze(){return{data:"",event:"",id:"",retry:void 0}}var et="text/event-stream",xn=1e3,Qe="last-event-id";function Pe(t,{signal:e,headers:n,onopen:r,onmessage:o,onclose:i,onerror:s,openWhenHidden:a,fetch:u,retryScaler:m=2,retryMaxWaitMs:l=3e4,retryMaxCount:c=10,...f}){return new Promise((g,_)=>{let E=0,b={...n};b.accept||(b.accept=et);let v;function p(){v.abort(),document.hidden||M()}a||document.addEventListener("visibilitychange",p);let d=xn,T=0;function h(){document.removeEventListener("visibilitychange",p),window.clearTimeout(T),v.abort()}e?.addEventListener("abort",()=>{h(),g()});let x=u??window.fetch,R=r??function(){};async function M(){v=new AbortController;try{let O=await x(t,{...f,headers:b,signal:v.signal});await R(O),await Ye(O.body,Ze(Xe(P=>{P?b[Qe]=P:delete b[Qe]},P=>{d=P},o))),i?.(),h(),g()}catch(O){if(!v.signal.aborted)try{let P=s?.(O)??d;window.clearTimeout(T),T=window.setTimeout(M,P),d*=m,d=Math.min(d,l),E++,E>=c?(h(),_(Je)):console.error(`Datastar failed to reach ${f.method}:${t.toString()} retry in ${P}ms`)}catch(P){h(),_(P)}}}M()})}var K=`${D}-sse`,Me=`${D}-settling`,$=`${D}-swapping`,ue="started",ce="finished";function k(t,e){document.addEventListener(K,n=>{if(n.detail.type!=t)return;let{argsRaw:r}=n.detail;e(r)})}var tt=t=>`${t}`.includes("text/event-stream");function De(t,e){document.dispatchEvent(new CustomEvent(K,{detail:{type:t,argsRaw:e}}))}function I(t){return async(e,n,r)=>{if(!n?.length)throw y;let o=r?.onlyRemoteSignals??!0,i=Object.assign({"Content-Type":"application/json",[Ge]:!0},r?.headers),s=e.signals().value,a=Object.assign({},s);o&&(a=U(a));let u=JSON.stringify(a),{el:{id:m}}=e;De(ue,{elID:m});let l=new URL(n,window.location.origin);t=t.toUpperCase();let c={method:t,headers:i,onmessage:f=>{if(!f.event.startsWith(D))return;let g=f.event,_={},E=f.data.split(`
`);for(let v of E){let p=v.indexOf(" "),d=v.slice(0,p),T=_[d];T||(T=[],_[d]=T);let h=v.slice(p+1).trim();T.push(h)}let b={};for(let[v,p]of Object.entries(_))b[v]=p.join(`
`);De(g,b)},onerror:f=>{if(tt(f))throw f;f&&console.error(f.message)},onclose:()=>{De(ce,{elID:m})}};if(t==="GET"){let f=new URLSearchParams(l.search);f.append(D,u),l.search=f.toString()}else c.body=u;try{let f=l.toString();await Pe(f,c)}catch(f){if(!tt(f))throw f}}}var nt={pluginType:3,name:"delete",method:I("delete")};var rt={pluginType:3,name:"get",method:I("get")};var ot={pluginType:3,name:"patch",method:I("patch")};var it={pluginType:3,name:"post",method:I("post")};var st={pluginType:3,name:"put",method:I("put")};var at={pluginType:3,name:"clipboard",method:(t,e)=>{if(!navigator.clipboard)throw F;navigator.clipboard.writeText(e)}};var lt={pluginType:3,name:"setAll",method:(t,e,n)=>{let r=new RegExp(e);t.walkSignals((o,i)=>r.test(o)&&(i.value=n))}};var ut={pluginType:3,name:"toggleAll",method:(t,e)=>{let n=new RegExp(e);t.walkSignals((r,o)=>n.test(r)&&(o.value=!o.value))}};var ct={pluginType:3,name:"clampFit",method:(t,e,n,r,o,i)=>Math.max(o,Math.min(i,(e-n)/(r-n)*(i-o)+o))};var ft={pluginType:3,name:"clampFitInt",method:(t,e,n,r,o,i)=>Math.round(Math.max(o,Math.min(i,(e-n)/(r-n)*(i-o)+o)))};var pt={pluginType:3,name:"fit",method:(t,e,n,r,o,i)=>(e-n)/(r-n)*(i-o)+o};var mt={pluginType:3,name:"fitInt",method:(t,e,n,r,o,i)=>Math.round((e-n)/(r-n)*(i-o)+o)};var Rn=`${D}-indicator`,_o=`${Rn}-loading`,dt={pluginType:1,name:"indicator",mustHaveEmptyKey:!0,onLoad:t=>{let{expression:e,upsertSignal:n,el:r}=t,i=n(e,!1),s=a=>{let{type:u,argsRaw:{elID:m}}=a.detail;if(m===r.id)switch(u){case ue:i.value=!0;break;case ce:i.value=!1;break}};return document.addEventListener(K,s),()=>{document.removeEventListener(K,s)}}};var gt={pluginType:1,name:"computed",mustNotEmptyKey:!0,onLoad:t=>{let e=t.signals();return e[t.key]=t.reactivity.computed(()=>t.expressionFn(t)),()=>{let n=t.signals();delete n[t.key]}}};var ht={pluginType:1,name:"mergeSignals",removeNewLines:!0,macros:{pre:[{pluginType:0,name:"signals",regexp:/(?<whole>.+)/g,replacer:t=>{let{whole:e}=t;return`Object.assign({...ctx.signals()}, ${e})`}}]},allowedModifiers:new Set(["ifmissing"]),onLoad:t=>{let e=t.expressionFn(t),n=le(t.signals(),e,t.modifiers.has("ifmissing"));t.mergeSignals(n),delete t.el.dataset[t.rawKey]}};var yt={pluginType:1,name:"star",onLoad:()=>{alert("YOU ARE PROBABLY OVERCOMPLICATING IT")}};var fe=t=>t.replace(/[A-Z]+(?![a-z])|[A-Z]/g,(e,n)=>(n?"-":"")+e.toLowerCase()),H=t=>t.trim()==="true";var Pn=/^data:(?<mime>[^;]+);base64,(?<contents>.*)$/,St=["change","input","keydown"],bt={pluginType:1,name:"bind",onLoad:t=>{let{el:e,expression:n,expressionFn:r,key:o,upsertSignal:i,reactivity:{effect:s}}=t,a=()=>{},u=()=>{},m=o==="";if(m){if(typeof n!="string")throw new Error("Invalid expression");if(n.includes("$"))throw new Error("Not an expression");let c=e.tagName.toLowerCase(),f="",g=c.includes("input"),_=e.getAttribute("type"),E=c.includes("checkbox")||g&&_==="checkbox";E&&(f=!1);let b=c.includes("select"),v=c.includes("radio")||g&&_==="radio",p=g&&_==="file";v&&(e.getAttribute("name")?.length||e.setAttribute("name",n));let d=i(n,f);a=()=>{let T="value"in e,h=d.value,x=`${h}`;if(E||v){let R=e;E?R.checked=h:v&&(R.checked=x===R.value)}else if(!p)if(b){let R=e;R.multiple?Array.from(R.options).forEach(M=>{M?.disabled||(M.selected=h.includes(M.value))}):R.value=x}else T?e.value=x:e.setAttribute("value",x)},u=async()=>{if(p){let x=[...e?.files||[]],R=[],M=[],O=[];await Promise.all(x.map(Be=>new Promise(_n=>{let Z=new FileReader;Z.onload=()=>{if(typeof Z.result!="string")throw y;let xe=Z.result.match(Pn);if(!xe?.groups)throw y;R.push(xe.groups.contents),M.push(xe.groups.mime),O.push(Be.name)},Z.onloadend=()=>_n(void 0),Z.readAsDataURL(Be)}))),d.value=R;let P=t.signals(),$e=`${n}Mimes`,je=`${n}Names`;$e in P&&(P[`${$e}`].value=M),je in P&&(P[`${je}`].value=O);return}let T=d.value,h=e||e;if(typeof T=="number")d.value=Number(h.value||h.getAttribute("value"));else if(typeof T=="string")d.value=h.value||h.getAttribute("value")||"";else if(typeof T=="boolean")E?d.value=h.checked||h.getAttribute("checked")==="true":d.value=!!(h.value||h.getAttribute("value"));else if(!(typeof T>"u"))if(typeof T=="bigint")d.value=BigInt(h.value||h.getAttribute("value")||"0");else if(Array.isArray(T)){if(b){let M=[...e.selectedOptions].map(O=>O.value);d.value=M}else d.value=JSON.parse(h.value).split(",");console.log(h.value)}else throw ae}}else{let c=fe(o);a=()=>{let f=r(t),g;typeof f=="string"?g=f:g=JSON.stringify(f),!g||g==="false"||g==="null"||g==="undefined"?e.removeAttribute(c):e.setAttribute(c,g)}}m&&St.forEach(c=>{e.addEventListener(c,u)});let l=s(async()=>{a()});return()=>{l(),m&&St.forEach(c=>{e.removeEventListener(c,u)})}}};var Et={pluginType:1,name:"class",mustHaveEmptyKey:!0,mustNotEmptyExpression:!0,onLoad:t=>t.reactivity.effect(()=>{let e=t.expressionFn(t);for(let[n,r]of Object.entries(e)){let o=n.split(" ");r?t.el.classList.add(...o):t.el.classList.remove(...o)}})};function Le(t){if(!t||t?.length===0)return 0;for(let e of t){if(e.endsWith("ms"))return Number(e.replace("ms",""));if(e.endsWith("s"))return Number(e.replace("s",""))*1e3;try{return parseFloat(e)}catch{}}return 0}function Q(t,e,n=!1){return t?t.includes(e)||n:!1}function vt(t,e,n=!1,r=!0){let o=-1,i=()=>o&&clearTimeout(o);return function(...a){i(),n&&!o&&t(...a),o=setTimeout(()=>{r&&t(...a),i()},e)}}function Tt(t,e,n=!0,r=!1){let o=!1;return function(...s){o||(n&&t(...s),o=!0,setTimeout(()=>{o=!1,r&&t(...s)},e))}}var Mn=new Set(["window","once","passive","capture","debounce","throttle","remote","outside"]),At="",_t={pluginType:1,name:"on",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,argumentNames:["evt"],onLoad:t=>{let{el:e,key:n,expressionFn:r}=t,o=t.el;t.modifiers.get("window")&&(o=window);let i=c=>{r(t,c)},s=t.modifiers.get("debounce");if(s){let c=Le(s),f=Q(s,"leading",!1),g=Q(s,"noTrail",!0);i=vt(i,c,f,g)}let a=t.modifiers.get("throttle");if(a){let c=Le(a),f=Q(a,"noLead",!0),g=Q(a,"noTrail",!1);i=Tt(i,c,f,g)}let u={capture:!0,passive:!1,once:!1};t.modifiers.has("capture")||(u.capture=!1),t.modifiers.has("passive")&&(u.passive=!0),t.modifiers.has("once")&&(u.once=!0),[...t.modifiers.keys()].filter(c=>!Mn.has(c)).forEach(c=>{let f=t.modifiers.get(c)||[],g=i;i=()=>{let E=event,b=E[c],v;if(typeof b=="function")v=b(...f);else if(typeof b=="boolean")v=b;else if(typeof b=="string"){let p=b.toLowerCase().trim(),d=f.join("").toLowerCase().trim();v=p===d}else throw y;v&&g(E)}});let l=fe(n).toLowerCase();switch(l){case"load":return i(),delete t.el.dataset.onLoad,()=>{};case"raf":let c,f=()=>{i(),c=requestAnimationFrame(f)};return c=requestAnimationFrame(f),()=>{c&&cancelAnimationFrame(c)};case"signals-change":return t.reactivity.effect(()=>{let E=t.signals().value;t.modifiers.has("remote")&&(E=U(E));let b=JSON.stringify(E);At!==b&&(At=b,i())});default:if(t.modifiers.has("outside")){o=document;let _=i,E=!1;i=v=>{let p=v?.target;if(!p)return;let d=e.id===p.id;d&&E&&(E=!1),!d&&!E&&(_(v),E=!0)}}return o.addEventListener(l,i,u),()=>{o.removeEventListener(l,i)}}}};var wt={pluginType:1,name:"ref",mustHaveEmptyKey:!0,mustNotEmptyExpression:!0,bypassExpressionFunctionCreation:()=>!0,onLoad:t=>{let e=t.expression;return t.upsertSignal(e,t.el),()=>{t.removeSignals(e)}}};var xt={pluginType:1,name:"text",mustHaveEmptyKey:!0,onLoad:t=>{let{el:e,expressionFn:n}=t;if(!(e instanceof HTMLElement))throw y;return t.reactivity.effect(()=>{let r=n(t);e.textContent=`${r}`})}};var Rt={pluginType:1,name:"persist",allowedModifiers:new Set(["local","session","remote"]),onLoad:t=>{let e=t.key||D,n=t.expression,r=new Set;if(n.trim()!==""){let l=t.expressionFn(t).split(" ");for(let c of l)r.add(c)}let o="",i=t.modifiers.has("session")?"session":"local",s=t.modifiers.has("remote"),a=m=>{let l=t.signals();if(s&&(l=U(l)),r.size>0){let f={};for(let g of r){let _=g.split("."),E=f,b=l;for(let p=0;p<_.length-1;p++){let d=_[p];E[d]||(E[d]={}),E=E[d],b=b[d]}let v=_[_.length-1];E[v]=b[v]}l=f}let c=JSON.stringify(l);c!==o&&(i==="session"?window.sessionStorage.setItem(e,c):window.localStorage.setItem(e,c),o=c)};window.addEventListener(Re,a);let u;if(i==="session"?u=window.sessionStorage.getItem(e):u=window.localStorage.getItem(e),u){let m=JSON.parse(u);for(let l in m)t.upsertSignal(l,m[l])}return()=>{window.removeEventListener(Re,a)}}};var Pt={pluginType:1,name:"replaceUrl",mustHaveEmptyKey:!0,mustNotEmptyExpression:!0,onLoad:t=>t.reactivity.effect(()=>{let e=t.expressionFn(t),n=window.location.href,r=new URL(e,n).toString();window.history.replaceState({},"",r)})};var Mt="once",Dt="half",Lt="full",Ot={pluginType:1,name:"intersects",allowedModifiers:new Set([Mt,Dt,Lt]),mustHaveEmptyKey:!0,onLoad:t=>{let{modifiers:e}=t,n={threshold:0};e.has(Lt)?n.threshold=1:e.has(Dt)&&(n.threshold=.5);let r=new IntersectionObserver(o=>{o.forEach(i=>{i.isIntersecting&&(t.expressionFn(t),e.has(Mt)&&(r.disconnect(),delete t.el.dataset[t.rawKey]))})},n);return r.observe(t.el),()=>r.disconnect()}};function Nt(t){if(t.id)return t.id;let e=0,n=o=>(e=(e<<5)-e+o,e&e),r=o=>o.split("").forEach(i=>n(i.charCodeAt(0)));for(;t.parentNode;){if(t.id){r(`${t.id}`);break}else if(t===t.ownerDocument.documentElement)r(t.tagName);else{for(let o=1,i=t;i.previousElementSibling;i=i.previousElementSibling,o++)n(o);t=t.parentNode}t=t.parentNode}return D+e}function kt(t,e,n=!0){if(!(t instanceof HTMLElement||t instanceof SVGElement))throw W;t.tabIndex||t.setAttribute("tabindex","0"),t.scrollIntoView(e),n&&t.focus()}var pe="smooth",Oe="instant",Ne="auto",It="hstart",Ct="hcenter",Ft="hend",Ht="hnearest",Vt="vstart",Wt="vcenter",Ut="vend",$t="vnearest",Dn="focus",me="center",jt="start",Bt="end",Gt="nearest",Kt={pluginType:1,name:"scrollIntoView",mustHaveEmptyKey:!0,mustHaveEmptyExpression:!0,allowedModifiers:new Set([pe,Oe,Ne,It,Ct,Ft,Ht,Vt,Wt,Ut,$t,Dn]),onLoad:({el:t,modifiers:e,rawKey:n})=>{t.tabIndex||t.setAttribute("tabindex","0");let r={behavior:pe,block:me,inline:me};return e.has(pe)&&(r.behavior=pe),e.has(Oe)&&(r.behavior=Oe),e.has(Ne)&&(r.behavior=Ne),e.has(It)&&(r.inline=jt),e.has(Ct)&&(r.inline=me),e.has(Ft)&&(r.inline=Bt),e.has(Ht)&&(r.inline=Gt),e.has(Vt)&&(r.block=jt),e.has(Wt)&&(r.block=me),e.has(Ut)&&(r.block=Bt),e.has($t)&&(r.block=Gt),kt(t,r,e.has("focus")),delete t.dataset[n],()=>{}}};var qt={pluginType:1,name:"show",mustHaveEmptyKey:!0,mustNotEmptyExpression:!0,onLoad:t=>t.reactivity.effect(async()=>{t.expressionFn(t)?t.el.style.display==="none"&&t.el.style.removeProperty("display"):t.el.style.setProperty("display","none")})};var ee=document,q=!!ee.startViewTransition;var ke="view-transition",Jt={pluginType:1,name:ke,onGlobalInit(){let t=!1;if(document.head.childNodes.forEach(e=>{e instanceof HTMLMetaElement&&e.name===ke&&(t=!0)}),!t){let e=document.createElement("meta");e.name=ke,e.content="same-origin",document.head.appendChild(e)}},onLoad:t=>{if(!q){console.error("Browser does not support view transitions");return}return t.reactivity.effect(()=>{let{el:e,expressionFn:n}=t,r=n(t);if(!r)return;let o=e.style;o.viewTransitionName=r})}};var zt="[a-zA-Z_$]+",Ln=zt+"[0-9a-zA-Z_$.]*";function de(t,e,n,r=!0){let o=r?Ln:zt;return new RegExp(`(?<whole>${t}(?<${e}>${o})${n})`,"g")}var Yt={name:"action",pluginType:0,regexp:de("@","action","(?<call>\\((?<args>.*)\\))",!1),replacer:({action:t,args:e})=>{let n=["ctx"];e&&n.push(...e.split(",").map(o=>o.trim()));let r=n.join(",");return`ctx.actions.${t}.method(${r})`}};var Zt={name:"signal",pluginType:0,regexp:de("\\$","signal","(?<method>\\([^\\)]*\\))?"),replacer:t=>{let{signal:e,method:n}=t,r="ctx.signals()";if(!n?.length)return`${r}.${e}.value`;let o=e.split("."),i=o.pop(),s=o.join(".");return`${r}.${s}.value.${i}${n}`}};var Xt={pluginType:2,name:L.ExecuteScript,onGlobalInit:async()=>{k(L.ExecuteScript,({autoRemove:t=`${!0}`,attributes:e=Ke,script:n})=>{let r=H(t);if(!n?.length)throw y;let o=document.createElement("script");e.split(`
`).forEach(i=>{let s=i.indexOf(" "),a=s?i.slice(0,s):i,u=s?i.slice(s):"";o.setAttribute(a.trim(),u.trim())}),o.text=n,document.head.appendChild(o),r&&o.remove()})}};var he=new WeakSet;function nn(t,e,n={}){t instanceof Document&&(t=t.documentElement);let r;typeof e=="string"?r=Fn(e):r=e;let o=Hn(r),i=kn(t,o,n);return rn(t,o,i)}function rn(t,e,n){if(n.head.block){let r=t.querySelector("head"),o=e.querySelector("head");if(r&&o){let i=sn(o,r,n);Promise.all(i).then(()=>{rn(t,e,Object.assign(n,{head:{block:!1,ignore:!0}}))});return}}if(n.morphStyle==="innerHTML")return on(e,t,n),t.children;if(n.morphStyle==="outerHTML"||n.morphStyle==null){let r=Wn(e,t,n);if(!r)throw W;let o=r?.previousSibling,i=r?.nextSibling,s=ye(t,r,n);return r?Vn(o,s,i):[]}else throw y}function ye(t,e,n){if(!(n.ignoreActive&&t===document.activeElement))if(e==null){if(n.callbacks.beforeNodeRemoved(t)===!1)return;t.remove(),n.callbacks.afterNodeRemoved(t);return}else{if(Se(t,e))return n.callbacks.beforeNodeMorphed(t,e)===!1?void 0:(t instanceof HTMLHeadElement&&n.head.ignore||(e instanceof HTMLHeadElement&&t instanceof HTMLHeadElement&&n.head.style!==N.Morph?sn(e,t,n):(Nn(e,t),on(e,t,n))),n.callbacks.afterNodeMorphed(t,e),t);if(n.callbacks.beforeNodeRemoved(t)===!1||n.callbacks.beforeNodeAdded(e)===!1)return;if(!t.parentElement)throw y;return t.parentElement.replaceChild(e,t),n.callbacks.afterNodeAdded(e),n.callbacks.afterNodeRemoved(t),e}}function on(t,e,n){let r=t.firstChild,o=e.firstChild,i;for(;r;){if(i=r,r=i.nextSibling,o==null){if(n.callbacks.beforeNodeAdded(i)===!1)return;e.appendChild(i),n.callbacks.afterNodeAdded(i),j(n,i);continue}if(an(i,o,n)){ye(o,i,n),o=o.nextSibling,j(n,i);continue}let s=In(t,e,i,o,n);if(s){o=Qt(o,s,n),ye(s,i,n),j(n,i);continue}let a=Cn(t,i,o,n);if(a){o=Qt(o,a,n),ye(a,i,n),j(n,i);continue}if(n.callbacks.beforeNodeAdded(i)===!1)return;e.insertBefore(i,o),n.callbacks.afterNodeAdded(i),j(n,i)}for(;o!==null;){let s=o;o=o.nextSibling,ln(s,n)}}function Nn(t,e){let n=t.nodeType;if(n===1){for(let r of t.attributes)e.getAttribute(r.name)!==r.value&&e.setAttribute(r.name,r.value);for(let r of e.attributes)t.hasAttribute(r.name)||e.removeAttribute(r.name)}if((n===Node.COMMENT_NODE||n===Node.TEXT_NODE)&&e.nodeValue!==t.nodeValue&&(e.nodeValue=t.nodeValue),t instanceof HTMLInputElement&&e instanceof HTMLInputElement&&t.type!=="file")e.value=t.value||"",ge(t,e,"value"),ge(t,e,"checked"),ge(t,e,"disabled");else if(t instanceof HTMLOptionElement)ge(t,e,"selected");else if(t instanceof HTMLTextAreaElement&&e instanceof HTMLTextAreaElement){let r=t.value,o=e.value;r!==o&&(e.value=r),e.firstChild&&e.firstChild.nodeValue!==r&&(e.firstChild.nodeValue=r)}}function ge(t,e,n){let r=t.getAttribute(n),o=e.getAttribute(n);r!==o&&(r?e.setAttribute(n,r):e.removeAttribute(n))}function sn(t,e,n){let r=[],o=[],i=[],s=[],a=n.head.style,u=new Map;for(let l of t.children)u.set(l.outerHTML,l);for(let l of e.children){let c=u.has(l.outerHTML),f=n.head.shouldReAppend(l),g=n.head.shouldPreserve(l);c||g?f?o.push(l):(u.delete(l.outerHTML),i.push(l)):a===N.Append?f&&(o.push(l),s.push(l)):n.head.shouldRemove(l)!==!1&&o.push(l)}s.push(...u.values());let m=[];for(let l of s){let c=document.createRange().createContextualFragment(l.outerHTML).firstChild;if(!c)throw y;if(n.callbacks.beforeNodeAdded(c)){if(c.hasAttribute("href")||c.hasAttribute("src")){let f,g=new Promise(_=>{f=_});c.addEventListener("load",function(){f(void 0)}),m.push(g)}e.appendChild(c),n.callbacks.afterNodeAdded(c),r.push(c)}}for(let l of o)n.callbacks.beforeNodeRemoved(l)!==!1&&(e.removeChild(l),n.callbacks.afterNodeRemoved(l));return n.head.afterHeadMorphed(e,{added:r,kept:i,removed:o}),m}function V(){}function kn(t,e,n){return{target:t,newContent:e,config:n,morphStyle:n.morphStyle,ignoreActive:n.ignoreActive,idMap:Bn(t,e),deadIds:new Set,callbacks:Object.assign({beforeNodeAdded:V,afterNodeAdded:V,beforeNodeMorphed:V,afterNodeMorphed:V,beforeNodeRemoved:V,afterNodeRemoved:V},n.callbacks),head:Object.assign({style:"merge",shouldPreserve:r=>r.getAttribute("im-preserve")==="true",shouldReAppend:r=>r.getAttribute("im-re-append")==="true",shouldRemove:V,afterHeadMorphed:V},n.head)}}function an(t,e,n){return!t||!e?!1:t.nodeType===e.nodeType&&t.tagName===e.tagName?t?.id?.length&&t.id===e.id?!0:te(n,t,e)>0:!1}function Se(t,e){return!t||!e?!1:t.nodeType===e.nodeType&&t.tagName===e.tagName}function Qt(t,e,n){for(;t!==e;){let r=t;if(t=t?.nextSibling,!r)throw y;ln(r,n)}return j(n,e),e.nextSibling}function In(t,e,n,r,o){let i=te(o,n,e),s=null;if(i>0){s=r;let a=0;for(;s!=null;){if(an(n,s,o))return s;if(a+=te(o,s,t),a>i)return null;s=s.nextSibling}}return s}function Cn(t,e,n,r){let o=n,i=e.nextSibling,s=0;for(;o&&i;){if(te(r,o,t)>0)return null;if(Se(e,o))return o;if(Se(i,o)&&(s++,i=i.nextSibling,s>=2))return null;o=o.nextSibling}return o}var en=new DOMParser;function Fn(t){let e=t.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim,"");if(e.match(/<\/html>/)||e.match(/<\/head>/)||e.match(/<\/body>/)){let n=en.parseFromString(t,"text/html");if(e.match(/<\/html>/))return he.add(n),n;{let r=n.firstChild;return r?(he.add(r),r):null}}else{let r=en.parseFromString(`<body><template>${t}</template></body>`,"text/html").body.querySelector("template")?.content;if(!r)throw W;return he.add(r),r}}function Hn(t){if(t==null)return document.createElement("div");if(he.has(t))return t;if(t instanceof Node){let e=document.createElement("div");return e.append(t),e}else{let e=document.createElement("div");for(let n of[...t])e.append(n);return e}}function Vn(t,e,n){let r=[],o=[];for(;t;)r.push(t),t=t.previousSibling;for(;r.length>0;){let i=r.pop();o.push(i),e?.parentElement?.insertBefore(i,e)}for(o.push(e);n;)r.push(n),o.push(n),n=n.nextSibling;for(;r.length;)e?.parentElement?.insertBefore(r.pop(),e.nextSibling);return o}function Wn(t,e,n){let r=t.firstChild,o=r,i=0;for(;r;){let s=Un(r,e,n);s>i&&(o=r,i=s),r=r.nextSibling}return o}function Un(t,e,n){return Se(t,e)?.5+te(n,t,e):0}function ln(t,e){j(e,t),e.callbacks.beforeNodeRemoved(t)!==!1&&(t.remove(),e.callbacks.afterNodeRemoved(t))}function $n(t,e){return!t.deadIds.has(e)}function jn(t,e,n){return t.idMap.get(n)?.has(e)||!1}function j(t,e){let n=t.idMap.get(e);if(n)for(let r of n)t.deadIds.add(r)}function te(t,e,n){let r=t.idMap.get(e);if(!r)return 0;let o=0;for(let i of r)$n(t,i)&&jn(t,i,n)&&++o;return o}function tn(t,e){let n=t.parentElement,r=t.querySelectorAll("[id]");for(let o of r){let i=o;for(;i!==n&&i;){let s=e.get(i);s==null&&(s=new Set,e.set(i,s)),s.add(o.id),i=i.parentElement}}}function Bn(t,e){let n=new Map;return tn(t,n),tn(e,n),n}var cn={pluginType:2,name:L.MergeFragments,onGlobalInit:async t=>{let e=document.createElement("template");k(L.MergeFragments,({fragments:n="<div></div>",selector:r="",mergeMode:o=qe,settleDuration:i=`${300}`,useViewTransition:s=`${!1}`})=>{let a=parseInt(i),u=H(s);e.innerHTML=n.trim(),[...e.content.children].forEach(l=>{if(!(l instanceof Element))throw y;let c=r||`#${l.getAttribute("id")}`,g=[...document.querySelectorAll(c)||[]];if(!g.length)throw y;q&&u?ee.startViewTransition(()=>un(t,o,a,l,g)):un(t,o,a,l,g)})})}};function un(t,e,n,r,o){for(let i of o){i.classList.add($);let s=i.outerHTML,a=i;switch(e){case N.Morph:let m=nn(a,r,{callbacks:{beforeNodeRemoved:(l,c)=>(t.cleanup(l),!0)}});if(!m?.length)throw y;a=m[0];break;case N.Inner:a.innerHTML=r.innerHTML;break;case N.Outer:a.replaceWith(r);break;case N.Prepend:a.prepend(r);break;case N.Append:a.append(r);break;case N.Before:a.before(r);break;case N.After:a.after(r);break;case N.UpsertAttributes:r.getAttributeNames().forEach(l=>{let c=r.getAttribute(l);a.setAttribute(l,c)});break;default:throw y}t.cleanup(a),a.classList.add($),t.applyPlugins(document.body),setTimeout(()=>{i.classList.remove($),a.classList.remove($)},n);let u=a.outerHTML;s!==u&&(a.classList.add(Me),setTimeout(()=>{a.classList.remove(Me)},n))}}var fn={pluginType:2,name:L.MergeSignals,onGlobalInit:async t=>{k(L.MergeSignals,({signals:e="{}",onlyIfMissing:n=`${!1}`})=>{let r=H(n),o=` return Object.assign({...ctx.signals()}, ${e})`;try{let s=new Function("ctx",o)(t),a=le(t.signals(),s,r);t.mergeSignals(a),t.applyPlugins(document.body)}catch(i){console.log(o),console.error(i);debugger}})}};var pn={pluginType:2,name:L.RemoveFragments,onGlobalInit:async()=>{k(L.RemoveFragments,({selector:t,settleDuration:e=`${300}`,useViewTransition:n=`${!1}`})=>{if(!t.length)throw y;let r=parseInt(e),o=H(n),i=document.querySelectorAll(t),s=()=>{for(let a of i)a.classList.add($);setTimeout(()=>{for(let a of i)a.remove()},r)};q&&o?ee.startViewTransition(()=>s()):s()})}};var mn={pluginType:2,name:L.RemoveSignals,onGlobalInit:async t=>{k(L.RemoveSignals,({paths:e=""})=>{let n=e.split(`
`).map(r=>r.trim());if(!n?.length)throw y;t.removeSignals(...n)})}};var Kn=Symbol.for("preact-signals"),C=1,J=2,oe=4,Y=8,be=16,z=32;function ve(){re++}function Te(){if(re>1){re--;return}let t,e=!1;for(;ne!==void 0;){let n=ne;for(ne=void 0,Fe++;n!==void 0;){let r=n._nextBatchedEffect;if(n._nextBatchedEffect=void 0,n._flags&=~J,!(n._flags&Y)&&hn(n))try{n._callback()}catch(o){e||(t=o,e=!0)}n=r}}if(Fe=0,re--,e)throw t}function dn(t){if(re>0)return t();ve();try{return t()}finally{Te()}}var A;var ne,re=0,Fe=0,Ee=0;function gn(t){if(A===void 0)return;let e=t._node;if(e===void 0||e._target!==A)return e={_version:0,_source:t,_prevSource:A._sources,_nextSource:void 0,_target:A,_prevTarget:void 0,_nextTarget:void 0,_rollbackNode:e},A._sources!==void 0&&(A._sources._nextSource=e),A._sources=e,t._node=e,A._flags&z&&t._subscribe(e),e;if(e._version===-1)return e._version=0,e._nextSource!==void 0&&(e._nextSource._prevSource=e._prevSource,e._prevSource!==void 0&&(e._prevSource._nextSource=e._nextSource),e._prevSource=A._sources,e._nextSource=void 0,A._sources._nextSource=e,A._sources=e),e}function w(t){this._value=t,this._version=0,this._node=void 0,this._targets=void 0}w.prototype.brand=Kn;w.prototype._refresh=function(){return!0};w.prototype._subscribe=function(t){this._targets!==t&&t._prevTarget===void 0&&(t._nextTarget=this._targets,this._targets!==void 0&&(this._targets._prevTarget=t),this._targets=t)};w.prototype._unsubscribe=function(t){if(this._targets!==void 0){let e=t._prevTarget,n=t._nextTarget;e!==void 0&&(e._nextTarget=n,t._prevTarget=void 0),n!==void 0&&(n._prevTarget=e,t._nextTarget=void 0),t===this._targets&&(this._targets=n)}};w.prototype.subscribe=function(t){return Ve(()=>{let e=this.value,n=A;A=void 0;try{t(e)}finally{A=n}})};w.prototype.valueOf=function(){return this.value};w.prototype.toString=function(){return this.value+""};w.prototype.toJSON=function(){return this.value};w.prototype.peek=function(){let t=A;A=void 0;try{return this.value}finally{A=t}};Object.defineProperty(w.prototype,"value",{get(){let t=gn(this);return t!==void 0&&(t._version=this._version),this._value},set(t){if(t!==this._value){if(Fe>100)throw y;this._value=t,this._version++,Ee++,ve();try{for(let e=this._targets;e!==void 0;e=e._nextTarget)e._target._notify()}finally{Te()}}}});function Ae(t){return new w(t)}function hn(t){for(let e=t._sources;e!==void 0;e=e._nextSource)if(e._source._version!==e._version||!e._source._refresh()||e._source._version!==e._version)return!0;return!1}function yn(t){for(let e=t._sources;e!==void 0;e=e._nextSource){let n=e._source._node;if(n!==void 0&&(e._rollbackNode=n),e._source._node=e,e._version=-1,e._nextSource===void 0){t._sources=e;break}}}function Sn(t){let e=t._sources,n;for(;e!==void 0;){let r=e._prevSource;e._version===-1?(e._source._unsubscribe(e),r!==void 0&&(r._nextSource=e._nextSource),e._nextSource!==void 0&&(e._nextSource._prevSource=r)):n=e,e._source._node=e._rollbackNode,e._rollbackNode!==void 0&&(e._rollbackNode=void 0),e=r}t._sources=n}function B(t){w.call(this,void 0),this._fn=t,this._sources=void 0,this._globalVersion=Ee-1,this._flags=oe}B.prototype=new w;B.prototype._refresh=function(){if(this._flags&=~J,this._flags&C)return!1;if((this._flags&(oe|z))===z||(this._flags&=~oe,this._globalVersion===Ee))return!0;if(this._globalVersion=Ee,this._flags|=C,this._version>0&&!hn(this))return this._flags&=~C,!0;let t=A;try{yn(this),A=this;let e=this._fn();(this._flags&be||this._value!==e||this._version===0)&&(this._value=e,this._flags&=~be,this._version++)}catch(e){this._value=e,this._flags|=be,this._version++}return A=t,Sn(this),this._flags&=~C,!0};B.prototype._subscribe=function(t){if(this._targets===void 0){this._flags|=oe|z;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._subscribe(e)}w.prototype._subscribe.call(this,t)};B.prototype._unsubscribe=function(t){if(this._targets!==void 0&&(w.prototype._unsubscribe.call(this,t),this._targets===void 0)){this._flags&=~z;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e)}};B.prototype._notify=function(){if(!(this._flags&J)){this._flags|=oe|J;for(let t=this._targets;t!==void 0;t=t._nextTarget)t._target._notify()}};Object.defineProperty(B.prototype,"value",{get(){if(this._flags&C)throw y;let t=gn(this);if(this._refresh(),t!==void 0&&(t._version=this._version),this._flags&be)throw this._value;return this._value}});function bn(t){return new B(t)}function En(t){let e=t._cleanup;if(t._cleanup=void 0,typeof e=="function"){ve();let n=A;A=void 0;try{e()}catch(r){throw t._flags&=~C,t._flags|=Y,He(t),r}finally{A=n,Te()}}}function He(t){for(let e=t._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e);t._fn=void 0,t._sources=void 0,En(t)}function qn(t){if(A!==this)throw y;Sn(this),A=t,this._flags&=~C,this._flags&Y&&He(this),Te()}function ie(t){this._fn=t,this._cleanup=void 0,this._sources=void 0,this._nextBatchedEffect=void 0,this._flags=z}ie.prototype._callback=function(){let t=this._start();try{if(this._flags&Y||this._fn===void 0)return;let e=this._fn();typeof e=="function"&&(this._cleanup=e)}finally{t()}};ie.prototype._start=function(){if(this._flags&C)throw y;this._flags|=C,this._flags&=~Y,En(this),yn(this),ve();let t=A;return A=this,qn.bind(this,t)};ie.prototype._notify=function(){this._flags&J||(this._flags|=J,this._nextBatchedEffect=ne,ne=this)};ie.prototype._dispose=function(){this._flags|=Y,this._flags&C||He(this)};function Ve(t){let e=new ie(t);try{e._callback()}catch(n){throw e._dispose(),n}return e._dispose.bind(e)}var _e=class{get value(){return We(this)}set value(e){dn(()=>Jn(this,e))}peek(){return We(this,{peek:!0})}},se=t=>Object.assign(new _e,Object.entries(t).reduce((e,[n,r])=>{if(["value","peek"].some(o=>o===n))throw F;return typeof r!="object"||r===null||Array.isArray(r)?e[n]=Ae(r):e[n]=se(r),e},{})),Jn=(t,e)=>Object.keys(e).forEach(n=>t[n].value=e[n]),We=(t,{peek:e=!1}={})=>Object.entries(t).reduce((n,[r,o])=>(o instanceof w?n[r]=e?o.peek():o.value:o instanceof _e&&(n[r]=We(o,{peek:e})),n),{});function Ue(t,e){if(typeof e!="object"||Array.isArray(e)||!e)return JSON.parse(JSON.stringify(e));if(typeof e=="object"&&e.toJSON!==void 0&&typeof e.toJSON=="function")return e.toJSON();let n=t;return typeof t!="object"&&(n={...e}),Object.keys(e).forEach(r=>{n.hasOwnProperty(r)||(n[r]=e[r]),e[r]===null?delete n[r]:n[r]=Ue(n[r],e[r])}),n}var vn="0.20.1";var zn=t=>t.pluginType===0,Yn=t=>t.pluginType===2,Zn=t=>t.pluginType===1,Xn=t=>t.pluginType===3,we=class{constructor(){this.plugins=[];this.signals=se({});this.macros=new Array;this.actions={};this.watchers=new Array;this.refs={};this.reactivity={signal:Ae,computed:bn,effect:Ve};this.removals=new Map;this.mergeRemovals=new Array;this.lastMarshalledSignals=""}get version(){return vn}load(...e){let n=new Set(this.plugins);e.forEach(r=>{if(r.requiredPlugins){for(let i of r.requiredPlugins)if(!n.has(i))throw F}let o;if(zn(r)){if(this.macros.includes(r))throw X;this.macros.push(r)}else if(Yn(r)){if(this.watchers.includes(r))throw X;this.watchers.push(r),o=r.onGlobalInit}else if(Xn(r)){if(this.actions[r.name])throw X;this.actions[r.name]=r}else if(Zn(r)){if(this.plugins.includes(r))throw X;this.plugins.push(r),o=r.onGlobalInit}else throw W;o&&o({signals:()=>this.signals,upsertSignal:this.upsertSignal.bind(this),mergeSignals:this.mergeSignals.bind(this),removeSignals:this.removeSignals.bind(this),actions:this.actions,reactivity:this.reactivity,applyPlugins:this.applyPlugins.bind(this),cleanup:this.cleanup.bind(this)}),n.add(r)}),this.applyPlugins(document.body)}cleanup(e){let n=this.removals.get(e);if(n){for(let r of n.set)r();this.removals.delete(e)}}mergeSignals(e){this.mergeRemovals.forEach(o=>o()),this.mergeRemovals=this.mergeRemovals.slice(0);let n=Ue(this.signals.value,e);this.signals=se(n),JSON.stringify(this.signals.value),this.lastMarshalledSignals}removeSignals(...e){let n={...this.signals.value},r=!1;for(let o of e){let i=o.split("."),s=i[0],a=n;for(let u=1;u<i.length;u++){let m=i[u];a[s]||(a[s]={}),a=a[s],s=m}delete a[s],r=!0}r&&(this.signals=se(n),this.applyPlugins(document.body))}upsertSignal(e,n){let r=e.split("."),o=this.signals;for(let u=0;u<r.length-1;u++){let m=r[u];o[m]||(o[m]={}),o=o[m]}let i=r[r.length-1],s=o[i];if(s)return s;let a=this.reactivity.signal(n);return o[i]=a,a}applyPlugins(e){let n=new Set;this.plugins.forEach((r,o)=>{this.walkDownDOM(e,i=>{o||this.cleanup(i);for(let s in i.dataset){let a=`${i.dataset[s]}`||"",u=a;if(!s.startsWith(r.name))continue;if(i.id.length||(i.id=Nt(i)),n.clear(),r.allowedTagRegexps){let p=i.tagName.toLowerCase();if(![...r.allowedTagRegexps].some(T=>p.match(T)))throw F}let m=s.slice(r.name.length),[l,...c]=m.split(".");if(r.mustHaveEmptyKey&&l.length>0)throw y;if(r.mustNotEmptyKey&&l.length===0)throw y;l.length&&(l=l[0].toLowerCase()+l.slice(1));let f=c.map(p=>{let[d,...T]=p.split("_");return{label:d,args:T}});if(r.allowedModifiers){for(let p of f)if(!r.allowedModifiers.has(p.label))throw F}let g=new Map;for(let p of f)g.set(p.label,p.args);if(r.mustHaveEmptyExpression&&u.length)throw y;if(r.mustNotEmptyExpression&&!u.length)throw y;let _=/;|\n/;r.removeNewLines&&(u=u.split(`
`).map(p=>p.trim()).join(" "));let E=[...r.macros?.pre||[],...this.macros,...r.macros?.post||[]];for(let p of E){if(n.has(p))continue;n.add(p);let d=u.split(_),T=[];d.forEach(h=>{let x=h,R=[...x.matchAll(p.regexp)];if(R.length)for(let M of R){if(!M.groups)continue;let{groups:O}=M,{whole:P}=O;x=x.replace(P,p.replacer(O))}T.push(x)}),u=T.join("; ")}let b={signals:()=>this.signals,mergeSignals:this.mergeSignals.bind(this),upsertSignal:this.upsertSignal.bind(this),removeSignals:this.removeSignals.bind(this),applyPlugins:this.applyPlugins.bind(this),cleanup:this.cleanup.bind(this),walkSignals:this.walkMySignals.bind(this),actions:this.actions,reactivity:this.reactivity,el:i,rawKey:s,key:l,rawExpression:a,expression:u,expressionFn:()=>{throw ae},modifiers:g};if(!r.bypassExpressionFunctionCreation?.(b)&&!r.mustHaveEmptyExpression&&u.length){let p=u.split(_).map(h=>h.trim()).filter(h=>h.length);p[p.length-1]=`return ${p[p.length-1]}`;let d=p.map(h=>`  ${h}`).join(`;
`),T=`try{${d}}catch(e){console.error(\`Error evaluating Datastar expression:
${d.replaceAll("`","\\`")}

Error: \${e.message}

Check if the expression is valid before raising an issue.\`.trim());debugger}`;try{let h=r.argumentNames||[],x=new Function("ctx",...h,T);b.expressionFn=x}catch(h){let x=new Error(`${h}
with
${T}`);console.error(x);debugger}}let v=r.onLoad(b);v&&(this.removals.has(i)||this.removals.set(i,{id:i.id,set:new Set}),this.removals.get(i).set.add(v))}})})}walkSignals(e,n){let r=Object.keys(e);for(let o=0;o<r.length;o++){let i=r[o],s=e[i],a=s instanceof w,u=typeof s=="object"&&Object.keys(s).length>0;if(a){n(i,s);continue}u&&this.walkSignals(s,n)}}walkMySignals(e){this.walkSignals(this.signals,e)}walkDownDOM(e,n,r=0){if(!e||!(e instanceof HTMLElement||e instanceof SVGElement))return null;for(n(e),r=0,e=e.firstElementChild;e;)this.walkDownDOM(e,n,r++),e=e.nextElementSibling}};var Tn=new we;Tn.load(yt,Yt,Zt,ht,gt);var An=Tn;An.load(bt,wt,dt,Pt,Et,_t,xt,Rt,Ot,Kt,qt,Jt,nt,rt,ot,it,st,at,lt,ut,ct,ft,pt,mt,cn,fn,pn,mn,Xt);})();
//# sourceMappingURL=datastar.js.map
