import{V as L,C as S,r as t,u as V,j as e,b as U,H as I,M as O,d as Y,O as _}from"./three-GazOUCAN.js";import{C}from"./index-CP9tW_Ma.js";import"./motion-CUOx85fv.js";const X={uniforms:{colorMap:{value:[new S("#427062"),new S("#33594E"),new S("#234549"),new S("#1E363F")]},brightnessThresholds:{value:[.9,.45,.001]},lightPosition:{value:new L(15,15,15)}},vertexShader:`
    // Set the precision for data types used in this shader
    precision highp float;
    precision highp int;

    // Variables to pass from vertex to fragment shader
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vNormal = normal;
      vPosition = position;

      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,fragmentShader:`
    precision highp float;
    precision highp int;

    // Default THREE.js uniforms available to both fragment and vertex shader
    uniform mat4 modelMatrix;

    uniform vec3 colorMap[4];
    uniform float brightnessThresholds[3];
    uniform vec3 lightPosition;

    // Variables passed from vertex to fragment shader
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vec3 worldPosition = ( modelMatrix * vec4( vPosition, 1.0 )).xyz;
      vec3 worldNormal = normalize( vec3( modelMatrix * vec4( vNormal, 0.0 ) ) );
      vec3 lightVector = normalize( lightPosition - worldPosition );
      float brightness = dot( worldNormal, lightVector );

      vec4 final;

      if (brightness > brightnessThresholds[0])
        final = vec4(colorMap[0], 1);
      else if (brightness > brightnessThresholds[1])
        final = vec4(colorMap[1], 1);
      else if (brightness > brightnessThresholds[2])
        final = vec4(colorMap[2], 1);
      else
        final = vec4(colorMap[3], 1);

      gl_FragColor = vec4( final );
    }`},w=t.forwardRef((o,a)=>{const{modelUrl:g="/Trees.glb",meshName:l,colors:d,thresholds:h=[.6,.35,.001],...i}=o,{nodes:n,scene:p}=V(g),u=t.useMemo(()=>{if(n&&l&&n[l])return n[l]},[n,l]),x=t.useMemo(()=>({colorMap:{value:d},brightnessThresholds:{value:h},lightPosition:{value:new L(15,15,15)}}),[d,h]),m=u||p;return e.jsx("group",{ref:a,...i,dispose:null,children:e.jsx("primitive",{object:m,children:e.jsx("shaderMaterial",{attach:"material",...X,uniforms:x})})})});w.preload=o=>V.preload(o);const F={blobColor:65535,blobNumber:10,maxRadius:6,lerpFactor:.05};function G({origin:o=[0,0,0],duration:a=2.5}){const g=t.useRef(),l=t.useRef(new L(o[0],o[1],o[2])),d=t.useRef(null);t.useEffect(()=>{l.current.set(o[0],o[1],o[2])},[o]);const h=t.useMemo(()=>{const i=[];for(let n=0;n<F.blobNumber;n++){const p=new L(Math.random()*2-1,Math.random()*2-1,Math.random()*2-1).normalize(),u=F.maxRadius*Math.random(),x=.5+Math.random()*.7;i.push({direction:p,maxDistance:u,scale:x})}return i},[]);return U(({clock:i})=>{if(!g.current)return;d.current===null&&(d.current=i.getElapsedTime());const n=i.getElapsedTime()-d.current,p=Math.min(1,n/a),x=(j=>1-Math.pow(1-j,3))(p),m=g.current.children;for(let j=0;j<m.length;j++){const R=m[j],b=h[j],E=l.current.clone().addScaledVector(b.direction,b.maxDistance*x);R.position.lerp(E,F.lerpFactor);const f=b.scale,k=.7+x;if(R.scale.setScalar(f*k),R.material){const H=1-p*p;R.material.opacity=H}}}),e.jsx("group",{ref:g,children:h.map(({position:i,scale:n,visible:p},u)=>e.jsxs("mesh",{position:l.current,scale:n,visible:!0,children:[e.jsx("sphereGeometry",{args:[.7,24,24]}),e.jsx("meshBasicMaterial",{color:F.blobColor,transparent:!0,opacity:1,fog:!1})]},u))})}function W(){const o=t.useRef(null),a=t.useRef(null),g=t.useRef(null),l=t.useRef(null),d=t.useRef(null),h=t.useRef(null),i=t.useRef(null),[n,p]=t.useState(!1),[u,x]=t.useState(!1),[m,j]=t.useState(!1),[R,b]=t.useState({base:!1,houses:!1,trees:!1}),E=t.useRef({x:0,y:0}),f=t.useRef({houses:null,treeA:null,treeB:null,base:null}),k=t.useRef({houses:.075,treeA:.075,treeB:.075,base:.075,dirt:.05}),H=t.useRef({houses:.6,treeA:.6,treeB:.6,base:.9});return t.useEffect(()=>{const r=s=>{const T=s.clientX/window.innerWidth*2-1,v=s.clientY/window.innerHeight*2-1;E.current={x:T,y:v}};return window.addEventListener("mousemove",r),()=>window.removeEventListener("mousemove",r)},[]),U(()=>{const r=c=>f.current[c]===null;if(o.current){const c=E.current.x*.4,y=-E.current.y*.2;o.current.rotation.y=O.lerp(o.current.rotation.y,c,.04),o.current.rotation.x=O.lerp(o.current.rotation.x,y,.04)}a.current&&r("houses")&&r("treeA")&&r("treeB")&&(a.current.rotation.y+=.0015),h.current&&r("base")&&(h.current.rotation.y+=.001),i.current&&(i.current.rotation.y+=.001);const s=performance.now()/1e3,T=c=>1-Math.pow(1-c,3),v=1e-4,M=(c,y)=>{const B=f.current[y];if(!B||!c.current)return;const P=H.current[y],N=Math.min(1,(s-B)/P),D=T(N),A=k.current[y],z=v+(A-v)*D;c.current.scale.setScalar(z),N>=1&&(c.current.scale.setScalar(A),f.current[y]=null)};M(g,"houses"),M(l,"treeA"),M(d,"treeB"),M(h,"base")}),t.useEffect(()=>{w.preload("/Base.glb"),w.preload("/Houses.glb"),w.preload("/Trees.glb"),w.preload("/Dirt.glb")},[]),t.useEffect(()=>{const r=[{id:"about",setter:p,key:"base",delay:220},{id:"projects",setter:x,key:"houses",delay:150},{id:"contact",setter:j,key:"trees",delay:130}],s=[];r.forEach(({id:v,setter:M,key:c,delay:y})=>{const B=document.getElementById(v);if(!B)return;const P=new IntersectionObserver(N=>{N.forEach(D=>{D.isIntersecting&&setTimeout(()=>M(!0),y)})},{root:null,threshold:.2});P.observe(B),s.push(P)});const T=()=>{const v=window.scrollY||0,M=document.documentElement.scrollHeight-window.innerHeight||1,c=v/M;c>.1&&!n&&setTimeout(()=>p(!0),220),c>.35&&!u&&setTimeout(()=>x(!0),150),c>.6&&!m&&setTimeout(()=>j(!0),130)};return T(),s.length===0&&(window.addEventListener("scroll",T,{passive:!0}),T()),()=>{s.forEach(v=>v.disconnect()),s.length===0&&window.removeEventListener("scroll",T)}},[]),t.useEffect(()=>{u&&g.current&&!f.current.houses&&(g.current.scale.setScalar(1e-4),f.current.houses=performance.now()/1e3)},[u]),t.useEffect(()=>{m&&l.current&&!f.current.treeA&&(l.current.scale.setScalar(1e-4),f.current.treeA=performance.now()/1e3),m&&d.current&&!f.current.treeB&&(d.current.scale.setScalar(1e-4),f.current.treeB=performance.now()/1e3)},[m]),t.useEffect(()=>{n&&h.current&&!f.current.base&&(h.current.scale.setScalar(1e-4),f.current.base=performance.now()/1e3)},[n]),t.useEffect(()=>{if(!u)return;b(s=>({...s,houses:!0}));const r=setTimeout(()=>b(s=>({...s,houses:!1})),2500);return()=>clearTimeout(r)},[u]),t.useEffect(()=>{if(!m)return;b(s=>({...s,trees:!0}));const r=setTimeout(()=>b(s=>({...s,trees:!1})),2500);return()=>clearTimeout(r)},[m]),t.useEffect(()=>{if(!n)return;b(s=>({...s,base:!0}));const r=setTimeout(()=>b(s=>({...s,base:!1})),2500);return()=>clearTimeout(r)},[n]),e.jsxs(e.Fragment,{children:[e.jsx("fog",{attach:"fog",args:["#000000",4,12]}),e.jsx("ambientLight",{intensity:1.2}),e.jsx("directionalLight",{color:"white",position:[15,15,15],castShadow:!0,"shadow-mapSize-width":4096,"shadow-mapSize-height":4096}),e.jsx(t.Suspense,{fallback:e.jsx(I,{center:!0,wrapperClass:"r3f-fallback",children:e.jsx("div",{className:"loader"})}),children:e.jsxs("group",{ref:o,children:[e.jsxs("group",{ref:a,position:[0,0,0],children:[u&&e.jsxs(e.Fragment,{children:[e.jsx(w,{ref:g,modelUrl:"/Houses.glb",meshName:"Houses",onClick:r=>{r.stopPropagation(),a.current&&(a.current.rotation.y+=.25)},colors:C.model.houses.map(r=>new S(r).convertLinearToSRGB())}),R.houses&&e.jsx(G,{origin:[0,.4,0],duration:2.5})]}),m&&e.jsxs(e.Fragment,{children:[e.jsx(w,{ref:l,modelUrl:"/Trees.glb",meshName:"Sphere005_1",onClick:r=>{r.stopPropagation(),a.current&&(a.current.rotation.y+=.25)},colors:C.model.treesFoliage.map(r=>new S(r).convertLinearToSRGB())}),e.jsx(w,{ref:d,modelUrl:"/Trees.glb",meshName:"Sphere005",onClick:r=>{r.stopPropagation(),a.current&&(a.current.rotation.y+=.25)},colors:C.model.treesBark.map(r=>new S(r).convertLinearToSRGB())}),R.trees&&e.jsx(G,{origin:[0,.2,0],duration:2.5})]})]}),n&&e.jsxs(e.Fragment,{children:[e.jsx(w,{ref:h,modelUrl:"/Base.glb",meshName:"Base",onClick:r=>{r.stopPropagation(),a.current&&(a.current.rotation.y+=.25)},colors:C.model.base.map(r=>new S(r).convertLinearToSRGB())}),R.base&&e.jsx(G,{origin:[0,0,0],duration:2.5})]}),e.jsx(w,{ref:i,modelUrl:"/Dirt.glb",meshName:"Dirt",scale:.05,onClick:r=>{r.stopPropagation(),i.current&&(i.current.rotation.y+=.25)},colors:C.model.dirt.map(r=>new S(r).convertLinearToSRGB())})]})})]})}function q(){return e.jsxs("mesh",{castShadow:!0,receiveShadow:!0,position:[0,-3.05,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("planeGeometry",{args:[100,100,1,1]}),e.jsx("shadowMaterial",{opacity:.4})]})}function Z(){return e.jsxs(Y,{camera:{position:[14.4666,2.0365,5.556165],fov:40},shadows:!0,gl:{alpha:!0},children:[e.jsx(W,{}),e.jsx(q,{}),e.jsx(_,{minDistance:1,maxDistance:200})]})}export{Z as FiberContainer};
