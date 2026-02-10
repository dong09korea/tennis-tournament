(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function bv(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var cm={exports:{}},Va={},hm={exports:{}},X={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ds=Symbol.for("react.element"),Mv=Symbol.for("react.portal"),Lv=Symbol.for("react.fragment"),Ov=Symbol.for("react.strict_mode"),Fv=Symbol.for("react.profiler"),jv=Symbol.for("react.provider"),Uv=Symbol.for("react.context"),zv=Symbol.for("react.forward_ref"),Bv=Symbol.for("react.suspense"),$v=Symbol.for("react.memo"),Hv=Symbol.for("react.lazy"),nf=Symbol.iterator;function Wv(t){return t===null||typeof t!="object"?null:(t=nf&&t[nf]||t["@@iterator"],typeof t=="function"?t:null)}var dm={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},fm=Object.assign,pm={};function hi(t,e,n){this.props=t,this.context=e,this.refs=pm,this.updater=n||dm}hi.prototype.isReactComponent={};hi.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};hi.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function mm(){}mm.prototype=hi.prototype;function Pc(t,e,n){this.props=t,this.context=e,this.refs=pm,this.updater=n||dm}var kc=Pc.prototype=new mm;kc.constructor=Pc;fm(kc,hi.prototype);kc.isPureReactComponent=!0;var rf=Array.isArray,gm=Object.prototype.hasOwnProperty,Nc={current:null},_m={key:!0,ref:!0,__self:!0,__source:!0};function ym(t,e,n){var r,i={},s=null,a=null;if(e!=null)for(r in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(s=""+e.key),e)gm.call(e,r)&&!_m.hasOwnProperty(r)&&(i[r]=e[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var u=Array(l),h=0;h<l;h++)u[h]=arguments[h+2];i.children=u}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:Ds,type:t,key:s,ref:a,props:i,_owner:Nc.current}}function Gv(t,e){return{$$typeof:Ds,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Vc(t){return typeof t=="object"&&t!==null&&t.$$typeof===Ds}function qv(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var sf=/\/+/g;function Vl(t,e){return typeof t=="object"&&t!==null&&t.key!=null?qv(""+t.key):e.toString(36)}function Do(t,e,n,r,i){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case Ds:case Mv:a=!0}}if(a)return a=t,i=i(a),t=r===""?"."+Vl(a,0):r,rf(i)?(n="",t!=null&&(n=t.replace(sf,"$&/")+"/"),Do(i,e,n,"",function(h){return h})):i!=null&&(Vc(i)&&(i=Gv(i,n+(!i.key||a&&a.key===i.key?"":(""+i.key).replace(sf,"$&/")+"/")+t)),e.push(i)),1;if(a=0,r=r===""?".":r+":",rf(t))for(var l=0;l<t.length;l++){s=t[l];var u=r+Vl(s,l);a+=Do(s,e,n,u,i)}else if(u=Wv(t),typeof u=="function")for(t=u.call(t),l=0;!(s=t.next()).done;)s=s.value,u=r+Vl(s,l++),a+=Do(s,e,n,u,i);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function uo(t,e,n){if(t==null)return t;var r=[],i=0;return Do(t,r,"","",function(s){return e.call(n,s,i++)}),r}function Qv(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var st={current:null},bo={transition:null},Kv={ReactCurrentDispatcher:st,ReactCurrentBatchConfig:bo,ReactCurrentOwner:Nc};function vm(){throw Error("act(...) is not supported in production builds of React.")}X.Children={map:uo,forEach:function(t,e,n){uo(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return uo(t,function(){e++}),e},toArray:function(t){return uo(t,function(e){return e})||[]},only:function(t){if(!Vc(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};X.Component=hi;X.Fragment=Lv;X.Profiler=Fv;X.PureComponent=Pc;X.StrictMode=Ov;X.Suspense=Bv;X.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Kv;X.act=vm;X.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=fm({},t.props),i=t.key,s=t.ref,a=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,a=Nc.current),e.key!==void 0&&(i=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(u in e)gm.call(e,u)&&!_m.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&l!==void 0?l[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var h=0;h<u;h++)l[h]=arguments[h+2];r.children=l}return{$$typeof:Ds,type:t.type,key:i,ref:s,props:r,_owner:a}};X.createContext=function(t){return t={$$typeof:Uv,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:jv,_context:t},t.Consumer=t};X.createElement=ym;X.createFactory=function(t){var e=ym.bind(null,t);return e.type=t,e};X.createRef=function(){return{current:null}};X.forwardRef=function(t){return{$$typeof:zv,render:t}};X.isValidElement=Vc;X.lazy=function(t){return{$$typeof:Hv,_payload:{_status:-1,_result:t},_init:Qv}};X.memo=function(t,e){return{$$typeof:$v,type:t,compare:e===void 0?null:e}};X.startTransition=function(t){var e=bo.transition;bo.transition={};try{t()}finally{bo.transition=e}};X.unstable_act=vm;X.useCallback=function(t,e){return st.current.useCallback(t,e)};X.useContext=function(t){return st.current.useContext(t)};X.useDebugValue=function(){};X.useDeferredValue=function(t){return st.current.useDeferredValue(t)};X.useEffect=function(t,e){return st.current.useEffect(t,e)};X.useId=function(){return st.current.useId()};X.useImperativeHandle=function(t,e,n){return st.current.useImperativeHandle(t,e,n)};X.useInsertionEffect=function(t,e){return st.current.useInsertionEffect(t,e)};X.useLayoutEffect=function(t,e){return st.current.useLayoutEffect(t,e)};X.useMemo=function(t,e){return st.current.useMemo(t,e)};X.useReducer=function(t,e,n){return st.current.useReducer(t,e,n)};X.useRef=function(t){return st.current.useRef(t)};X.useState=function(t){return st.current.useState(t)};X.useSyncExternalStore=function(t,e,n){return st.current.useSyncExternalStore(t,e,n)};X.useTransition=function(){return st.current.useTransition()};X.version="18.3.1";hm.exports=X;var Ye=hm.exports;const Yv=bv(Ye);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xv=Ye,Jv=Symbol.for("react.element"),Zv=Symbol.for("react.fragment"),e0=Object.prototype.hasOwnProperty,t0=Xv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n0={key:!0,ref:!0,__self:!0,__source:!0};function wm(t,e,n){var r,i={},s=null,a=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);for(r in e)e0.call(e,r)&&!n0.hasOwnProperty(r)&&(i[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:Jv,type:t,key:s,ref:a,props:i,_owner:t0.current}}Va.Fragment=Zv;Va.jsx=wm;Va.jsxs=wm;cm.exports=Va;var I=cm.exports,fu={},Em={exports:{}},Tt={},Tm={exports:{}},Im={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(z,G){var Y=z.length;z.push(G);e:for(;0<Y;){var le=Y-1>>>1,ie=z[le];if(0<i(ie,G))z[le]=G,z[Y]=ie,Y=le;else break e}}function n(z){return z.length===0?null:z[0]}function r(z){if(z.length===0)return null;var G=z[0],Y=z.pop();if(Y!==G){z[0]=Y;e:for(var le=0,ie=z.length,me=ie>>>1;le<me;){var Vt=2*(le+1)-1,Dt=z[Vt],Jt=Vt+1,Zt=z[Jt];if(0>i(Dt,Y))Jt<ie&&0>i(Zt,Dt)?(z[le]=Zt,z[Jt]=Y,le=Jt):(z[le]=Dt,z[Vt]=Y,le=Vt);else if(Jt<ie&&0>i(Zt,Y))z[le]=Zt,z[Jt]=Y,le=Jt;else break e}}return G}function i(z,G){var Y=z.sortIndex-G.sortIndex;return Y!==0?Y:z.id-G.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,l=a.now();t.unstable_now=function(){return a.now()-l}}var u=[],h=[],f=1,m=null,_=3,A=!1,k=!1,V=!1,b=typeof setTimeout=="function"?setTimeout:null,S=typeof clearTimeout=="function"?clearTimeout:null,w=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function x(z){for(var G=n(h);G!==null;){if(G.callback===null)r(h);else if(G.startTime<=z)r(h),G.sortIndex=G.expirationTime,e(u,G);else break;G=n(h)}}function D(z){if(V=!1,x(z),!k)if(n(u)!==null)k=!0,Be(U);else{var G=n(h);G!==null&&at(D,G.startTime-z)}}function U(z,G){k=!1,V&&(V=!1,S(g),g=-1),A=!0;var Y=_;try{for(x(G),m=n(u);m!==null&&(!(m.expirationTime>G)||z&&!C());){var le=m.callback;if(typeof le=="function"){m.callback=null,_=m.priorityLevel;var ie=le(m.expirationTime<=G);G=t.unstable_now(),typeof ie=="function"?m.callback=ie:m===n(u)&&r(u),x(G)}else r(u);m=n(u)}if(m!==null)var me=!0;else{var Vt=n(h);Vt!==null&&at(D,Vt.startTime-G),me=!1}return me}finally{m=null,_=Y,A=!1}}var M=!1,y=null,g=-1,v=5,T=-1;function C(){return!(t.unstable_now()-T<v)}function R(){if(y!==null){var z=t.unstable_now();T=z;var G=!0;try{G=y(!0,z)}finally{G?E():(M=!1,y=null)}}else M=!1}var E;if(typeof w=="function")E=function(){w(R)};else if(typeof MessageChannel<"u"){var ke=new MessageChannel,St=ke.port2;ke.port1.onmessage=R,E=function(){St.postMessage(null)}}else E=function(){b(R,0)};function Be(z){y=z,M||(M=!0,E())}function at(z,G){g=b(function(){z(t.unstable_now())},G)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(z){z.callback=null},t.unstable_continueExecution=function(){k||A||(k=!0,Be(U))},t.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):v=0<z?Math.floor(1e3/z):5},t.unstable_getCurrentPriorityLevel=function(){return _},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function(z){switch(_){case 1:case 2:case 3:var G=3;break;default:G=_}var Y=_;_=G;try{return z()}finally{_=Y}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(z,G){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var Y=_;_=z;try{return G()}finally{_=Y}},t.unstable_scheduleCallback=function(z,G,Y){var le=t.unstable_now();switch(typeof Y=="object"&&Y!==null?(Y=Y.delay,Y=typeof Y=="number"&&0<Y?le+Y:le):Y=le,z){case 1:var ie=-1;break;case 2:ie=250;break;case 5:ie=1073741823;break;case 4:ie=1e4;break;default:ie=5e3}return ie=Y+ie,z={id:f++,callback:G,priorityLevel:z,startTime:Y,expirationTime:ie,sortIndex:-1},Y>le?(z.sortIndex=Y,e(h,z),n(u)===null&&z===n(h)&&(V?(S(g),g=-1):V=!0,at(D,Y-le))):(z.sortIndex=ie,e(u,z),k||A||(k=!0,Be(U))),z},t.unstable_shouldYield=C,t.unstable_wrapCallback=function(z){var G=_;return function(){var Y=_;_=G;try{return z.apply(this,arguments)}finally{_=Y}}}})(Im);Tm.exports=Im;var r0=Tm.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var i0=Ye,Et=r0;function F(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Sm=new Set,ls={};function yr(t,e){Yr(t,e),Yr(t+"Capture",e)}function Yr(t,e){for(ls[t]=e,t=0;t<e.length;t++)Sm.add(e[t])}var un=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),pu=Object.prototype.hasOwnProperty,s0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,of={},af={};function o0(t){return pu.call(af,t)?!0:pu.call(of,t)?!1:s0.test(t)?af[t]=!0:(of[t]=!0,!1)}function a0(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function l0(t,e,n,r){if(e===null||typeof e>"u"||a0(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function ot(t,e,n,r,i,s,a){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=a}var Ue={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Ue[t]=new ot(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Ue[e]=new ot(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Ue[t]=new ot(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Ue[t]=new ot(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Ue[t]=new ot(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Ue[t]=new ot(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Ue[t]=new ot(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Ue[t]=new ot(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Ue[t]=new ot(t,5,!1,t.toLowerCase(),null,!1,!1)});var Dc=/[\-:]([a-z])/g;function bc(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Dc,bc);Ue[e]=new ot(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Dc,bc);Ue[e]=new ot(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Dc,bc);Ue[e]=new ot(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Ue[t]=new ot(t,1,!1,t.toLowerCase(),null,!1,!1)});Ue.xlinkHref=new ot("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Ue[t]=new ot(t,1,!1,t.toLowerCase(),null,!0,!0)});function Mc(t,e,n,r){var i=Ue.hasOwnProperty(e)?Ue[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(l0(e,n,i,r)&&(n=null),r||i===null?o0(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):i.mustUseProperty?t[i.propertyName]=n===null?i.type===3?!1:"":n:(e=i.attributeName,r=i.attributeNamespace,n===null?t.removeAttribute(e):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var gn=i0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,co=Symbol.for("react.element"),kr=Symbol.for("react.portal"),Nr=Symbol.for("react.fragment"),Lc=Symbol.for("react.strict_mode"),mu=Symbol.for("react.profiler"),Am=Symbol.for("react.provider"),xm=Symbol.for("react.context"),Oc=Symbol.for("react.forward_ref"),gu=Symbol.for("react.suspense"),_u=Symbol.for("react.suspense_list"),Fc=Symbol.for("react.memo"),En=Symbol.for("react.lazy"),Cm=Symbol.for("react.offscreen"),lf=Symbol.iterator;function Ni(t){return t===null||typeof t!="object"?null:(t=lf&&t[lf]||t["@@iterator"],typeof t=="function"?t:null)}var ye=Object.assign,Dl;function Ui(t){if(Dl===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Dl=e&&e[1]||""}return`
`+Dl+t}var bl=!1;function Ml(t,e){if(!t||bl)return"";bl=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(h){var r=h}Reflect.construct(t,[],e)}else{try{e.call()}catch(h){r=h}t.call(e.prototype)}else{try{throw Error()}catch(h){r=h}t()}}catch(h){if(h&&r&&typeof h.stack=="string"){for(var i=h.stack.split(`
`),s=r.stack.split(`
`),a=i.length-1,l=s.length-1;1<=a&&0<=l&&i[a]!==s[l];)l--;for(;1<=a&&0<=l;a--,l--)if(i[a]!==s[l]){if(a!==1||l!==1)do if(a--,l--,0>l||i[a]!==s[l]){var u=`
`+i[a].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=a&&0<=l);break}}}finally{bl=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Ui(t):""}function u0(t){switch(t.tag){case 5:return Ui(t.type);case 16:return Ui("Lazy");case 13:return Ui("Suspense");case 19:return Ui("SuspenseList");case 0:case 2:case 15:return t=Ml(t.type,!1),t;case 11:return t=Ml(t.type.render,!1),t;case 1:return t=Ml(t.type,!0),t;default:return""}}function yu(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Nr:return"Fragment";case kr:return"Portal";case mu:return"Profiler";case Lc:return"StrictMode";case gu:return"Suspense";case _u:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case xm:return(t.displayName||"Context")+".Consumer";case Am:return(t._context.displayName||"Context")+".Provider";case Oc:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Fc:return e=t.displayName||null,e!==null?e:yu(t.type)||"Memo";case En:e=t._payload,t=t._init;try{return yu(t(e))}catch{}}return null}function c0(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return yu(e);case 8:return e===Lc?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function zn(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Rm(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function h0(t){var e=Rm(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(a){r=""+a,s.call(this,a)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function ho(t){t._valueTracker||(t._valueTracker=h0(t))}function Pm(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=Rm(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function Yo(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function vu(t,e){var n=e.checked;return ye({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function uf(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=zn(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function km(t,e){e=e.checked,e!=null&&Mc(t,"checked",e,!1)}function wu(t,e){km(t,e);var n=zn(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Eu(t,e.type,n):e.hasOwnProperty("defaultValue")&&Eu(t,e.type,zn(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function cf(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Eu(t,e,n){(e!=="number"||Yo(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var zi=Array.isArray;function Br(t,e,n,r){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&r&&(t[n].defaultSelected=!0)}else{for(n=""+zn(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,r&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function Tu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(F(91));return ye({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function hf(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(F(92));if(zi(n)){if(1<n.length)throw Error(F(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:zn(n)}}function Nm(t,e){var n=zn(e.value),r=zn(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function df(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Vm(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Iu(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Vm(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var fo,Dm=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,i){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,i)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(fo=fo||document.createElement("div"),fo.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=fo.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function us(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Ki={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},d0=["Webkit","ms","Moz","O"];Object.keys(Ki).forEach(function(t){d0.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Ki[e]=Ki[t]})});function bm(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Ki.hasOwnProperty(t)&&Ki[t]?(""+e).trim():e+"px"}function Mm(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=bm(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,i):t[n]=i}}var f0=ye({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Su(t,e){if(e){if(f0[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(F(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(F(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(F(61))}if(e.style!=null&&typeof e.style!="object")throw Error(F(62))}}function Au(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var xu=null;function jc(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Cu=null,$r=null,Hr=null;function ff(t){if(t=Ls(t)){if(typeof Cu!="function")throw Error(F(280));var e=t.stateNode;e&&(e=Oa(e),Cu(t.stateNode,t.type,e))}}function Lm(t){$r?Hr?Hr.push(t):Hr=[t]:$r=t}function Om(){if($r){var t=$r,e=Hr;if(Hr=$r=null,ff(t),e)for(t=0;t<e.length;t++)ff(e[t])}}function Fm(t,e){return t(e)}function jm(){}var Ll=!1;function Um(t,e,n){if(Ll)return t(e,n);Ll=!0;try{return Fm(t,e,n)}finally{Ll=!1,($r!==null||Hr!==null)&&(jm(),Om())}}function cs(t,e){var n=t.stateNode;if(n===null)return null;var r=Oa(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(F(231,e,typeof n));return n}var Ru=!1;if(un)try{var Vi={};Object.defineProperty(Vi,"passive",{get:function(){Ru=!0}}),window.addEventListener("test",Vi,Vi),window.removeEventListener("test",Vi,Vi)}catch{Ru=!1}function p0(t,e,n,r,i,s,a,l,u){var h=Array.prototype.slice.call(arguments,3);try{e.apply(n,h)}catch(f){this.onError(f)}}var Yi=!1,Xo=null,Jo=!1,Pu=null,m0={onError:function(t){Yi=!0,Xo=t}};function g0(t,e,n,r,i,s,a,l,u){Yi=!1,Xo=null,p0.apply(m0,arguments)}function _0(t,e,n,r,i,s,a,l,u){if(g0.apply(this,arguments),Yi){if(Yi){var h=Xo;Yi=!1,Xo=null}else throw Error(F(198));Jo||(Jo=!0,Pu=h)}}function vr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function zm(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function pf(t){if(vr(t)!==t)throw Error(F(188))}function y0(t){var e=t.alternate;if(!e){if(e=vr(t),e===null)throw Error(F(188));return e!==t?null:t}for(var n=t,r=e;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return pf(i),t;if(s===r)return pf(i),e;s=s.sibling}throw Error(F(188))}if(n.return!==r.return)n=i,r=s;else{for(var a=!1,l=i.child;l;){if(l===n){a=!0,n=i,r=s;break}if(l===r){a=!0,r=i,n=s;break}l=l.sibling}if(!a){for(l=s.child;l;){if(l===n){a=!0,n=s,r=i;break}if(l===r){a=!0,r=s,n=i;break}l=l.sibling}if(!a)throw Error(F(189))}}if(n.alternate!==r)throw Error(F(190))}if(n.tag!==3)throw Error(F(188));return n.stateNode.current===n?t:e}function Bm(t){return t=y0(t),t!==null?$m(t):null}function $m(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=$m(t);if(e!==null)return e;t=t.sibling}return null}var Hm=Et.unstable_scheduleCallback,mf=Et.unstable_cancelCallback,v0=Et.unstable_shouldYield,w0=Et.unstable_requestPaint,Ie=Et.unstable_now,E0=Et.unstable_getCurrentPriorityLevel,Uc=Et.unstable_ImmediatePriority,Wm=Et.unstable_UserBlockingPriority,Zo=Et.unstable_NormalPriority,T0=Et.unstable_LowPriority,Gm=Et.unstable_IdlePriority,Da=null,Wt=null;function I0(t){if(Wt&&typeof Wt.onCommitFiberRoot=="function")try{Wt.onCommitFiberRoot(Da,t,void 0,(t.current.flags&128)===128)}catch{}}var jt=Math.clz32?Math.clz32:x0,S0=Math.log,A0=Math.LN2;function x0(t){return t>>>=0,t===0?32:31-(S0(t)/A0|0)|0}var po=64,mo=4194304;function Bi(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function ea(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,i=t.suspendedLanes,s=t.pingedLanes,a=n&268435455;if(a!==0){var l=a&~i;l!==0?r=Bi(l):(s&=a,s!==0&&(r=Bi(s)))}else a=n&~i,a!==0?r=Bi(a):s!==0&&(r=Bi(s));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-jt(e),i=1<<n,r|=t[n],e&=~i;return r}function C0(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function R0(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,i=t.expirationTimes,s=t.pendingLanes;0<s;){var a=31-jt(s),l=1<<a,u=i[a];u===-1?(!(l&n)||l&r)&&(i[a]=C0(l,e)):u<=e&&(t.expiredLanes|=l),s&=~l}}function ku(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function qm(){var t=po;return po<<=1,!(po&4194240)&&(po=64),t}function Ol(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function bs(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-jt(e),t[e]=n}function P0(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var i=31-jt(n),s=1<<i;e[i]=0,r[i]=-1,t[i]=-1,n&=~s}}function zc(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-jt(n),i=1<<r;i&e|t[r]&e&&(t[r]|=e),n&=~i}}var se=0;function Qm(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Km,Bc,Ym,Xm,Jm,Nu=!1,go=[],Pn=null,kn=null,Nn=null,hs=new Map,ds=new Map,In=[],k0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function gf(t,e){switch(t){case"focusin":case"focusout":Pn=null;break;case"dragenter":case"dragleave":kn=null;break;case"mouseover":case"mouseout":Nn=null;break;case"pointerover":case"pointerout":hs.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":ds.delete(e.pointerId)}}function Di(t,e,n,r,i,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},e!==null&&(e=Ls(e),e!==null&&Bc(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function N0(t,e,n,r,i){switch(e){case"focusin":return Pn=Di(Pn,t,e,n,r,i),!0;case"dragenter":return kn=Di(kn,t,e,n,r,i),!0;case"mouseover":return Nn=Di(Nn,t,e,n,r,i),!0;case"pointerover":var s=i.pointerId;return hs.set(s,Di(hs.get(s)||null,t,e,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,ds.set(s,Di(ds.get(s)||null,t,e,n,r,i)),!0}return!1}function Zm(t){var e=rr(t.target);if(e!==null){var n=vr(e);if(n!==null){if(e=n.tag,e===13){if(e=zm(n),e!==null){t.blockedOn=e,Jm(t.priority,function(){Ym(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Mo(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Vu(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);xu=r,n.target.dispatchEvent(r),xu=null}else return e=Ls(n),e!==null&&Bc(e),t.blockedOn=n,!1;e.shift()}return!0}function _f(t,e,n){Mo(t)&&n.delete(e)}function V0(){Nu=!1,Pn!==null&&Mo(Pn)&&(Pn=null),kn!==null&&Mo(kn)&&(kn=null),Nn!==null&&Mo(Nn)&&(Nn=null),hs.forEach(_f),ds.forEach(_f)}function bi(t,e){t.blockedOn===e&&(t.blockedOn=null,Nu||(Nu=!0,Et.unstable_scheduleCallback(Et.unstable_NormalPriority,V0)))}function fs(t){function e(i){return bi(i,t)}if(0<go.length){bi(go[0],t);for(var n=1;n<go.length;n++){var r=go[n];r.blockedOn===t&&(r.blockedOn=null)}}for(Pn!==null&&bi(Pn,t),kn!==null&&bi(kn,t),Nn!==null&&bi(Nn,t),hs.forEach(e),ds.forEach(e),n=0;n<In.length;n++)r=In[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<In.length&&(n=In[0],n.blockedOn===null);)Zm(n),n.blockedOn===null&&In.shift()}var Wr=gn.ReactCurrentBatchConfig,ta=!0;function D0(t,e,n,r){var i=se,s=Wr.transition;Wr.transition=null;try{se=1,$c(t,e,n,r)}finally{se=i,Wr.transition=s}}function b0(t,e,n,r){var i=se,s=Wr.transition;Wr.transition=null;try{se=4,$c(t,e,n,r)}finally{se=i,Wr.transition=s}}function $c(t,e,n,r){if(ta){var i=Vu(t,e,n,r);if(i===null)ql(t,e,r,na,n),gf(t,r);else if(N0(i,t,e,n,r))r.stopPropagation();else if(gf(t,r),e&4&&-1<k0.indexOf(t)){for(;i!==null;){var s=Ls(i);if(s!==null&&Km(s),s=Vu(t,e,n,r),s===null&&ql(t,e,r,na,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else ql(t,e,r,null,n)}}var na=null;function Vu(t,e,n,r){if(na=null,t=jc(r),t=rr(t),t!==null)if(e=vr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=zm(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return na=t,null}function eg(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(E0()){case Uc:return 1;case Wm:return 4;case Zo:case T0:return 16;case Gm:return 536870912;default:return 16}default:return 16}}var An=null,Hc=null,Lo=null;function tg(){if(Lo)return Lo;var t,e=Hc,n=e.length,r,i="value"in An?An.value:An.textContent,s=i.length;for(t=0;t<n&&e[t]===i[t];t++);var a=n-t;for(r=1;r<=a&&e[n-r]===i[s-r];r++);return Lo=i.slice(t,1<r?1-r:void 0)}function Oo(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function _o(){return!0}function yf(){return!1}function It(t){function e(n,r,i,s,a){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(s):s[l]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?_o:yf,this.isPropagationStopped=yf,this}return ye(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=_o)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=_o)},persist:function(){},isPersistent:_o}),e}var di={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Wc=It(di),Ms=ye({},di,{view:0,detail:0}),M0=It(Ms),Fl,jl,Mi,ba=ye({},Ms,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Gc,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Mi&&(Mi&&t.type==="mousemove"?(Fl=t.screenX-Mi.screenX,jl=t.screenY-Mi.screenY):jl=Fl=0,Mi=t),Fl)},movementY:function(t){return"movementY"in t?t.movementY:jl}}),vf=It(ba),L0=ye({},ba,{dataTransfer:0}),O0=It(L0),F0=ye({},Ms,{relatedTarget:0}),Ul=It(F0),j0=ye({},di,{animationName:0,elapsedTime:0,pseudoElement:0}),U0=It(j0),z0=ye({},di,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),B0=It(z0),$0=ye({},di,{data:0}),wf=It($0),H0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},W0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},G0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function q0(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=G0[t])?!!e[t]:!1}function Gc(){return q0}var Q0=ye({},Ms,{key:function(t){if(t.key){var e=H0[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Oo(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?W0[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Gc,charCode:function(t){return t.type==="keypress"?Oo(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Oo(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),K0=It(Q0),Y0=ye({},ba,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ef=It(Y0),X0=ye({},Ms,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Gc}),J0=It(X0),Z0=ye({},di,{propertyName:0,elapsedTime:0,pseudoElement:0}),ew=It(Z0),tw=ye({},ba,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),nw=It(tw),rw=[9,13,27,32],qc=un&&"CompositionEvent"in window,Xi=null;un&&"documentMode"in document&&(Xi=document.documentMode);var iw=un&&"TextEvent"in window&&!Xi,ng=un&&(!qc||Xi&&8<Xi&&11>=Xi),Tf=" ",If=!1;function rg(t,e){switch(t){case"keyup":return rw.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ig(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Vr=!1;function sw(t,e){switch(t){case"compositionend":return ig(e);case"keypress":return e.which!==32?null:(If=!0,Tf);case"textInput":return t=e.data,t===Tf&&If?null:t;default:return null}}function ow(t,e){if(Vr)return t==="compositionend"||!qc&&rg(t,e)?(t=tg(),Lo=Hc=An=null,Vr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return ng&&e.locale!=="ko"?null:e.data;default:return null}}var aw={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Sf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!aw[t.type]:e==="textarea"}function sg(t,e,n,r){Lm(r),e=ra(e,"onChange"),0<e.length&&(n=new Wc("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var Ji=null,ps=null;function lw(t){gg(t,0)}function Ma(t){var e=Mr(t);if(Pm(e))return t}function uw(t,e){if(t==="change")return e}var og=!1;if(un){var zl;if(un){var Bl="oninput"in document;if(!Bl){var Af=document.createElement("div");Af.setAttribute("oninput","return;"),Bl=typeof Af.oninput=="function"}zl=Bl}else zl=!1;og=zl&&(!document.documentMode||9<document.documentMode)}function xf(){Ji&&(Ji.detachEvent("onpropertychange",ag),ps=Ji=null)}function ag(t){if(t.propertyName==="value"&&Ma(ps)){var e=[];sg(e,ps,t,jc(t)),Um(lw,e)}}function cw(t,e,n){t==="focusin"?(xf(),Ji=e,ps=n,Ji.attachEvent("onpropertychange",ag)):t==="focusout"&&xf()}function hw(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Ma(ps)}function dw(t,e){if(t==="click")return Ma(e)}function fw(t,e){if(t==="input"||t==="change")return Ma(e)}function pw(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var zt=typeof Object.is=="function"?Object.is:pw;function ms(t,e){if(zt(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!pu.call(e,i)||!zt(t[i],e[i]))return!1}return!0}function Cf(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Rf(t,e){var n=Cf(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Cf(n)}}function lg(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?lg(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function ug(){for(var t=window,e=Yo();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Yo(t.document)}return e}function Qc(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function mw(t){var e=ug(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&lg(n.ownerDocument.documentElement,n)){if(r!==null&&Qc(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!t.extend&&s>r&&(i=r,r=s,s=i),i=Rf(n,s);var a=Rf(n,r);i&&a&&(t.rangeCount!==1||t.anchorNode!==i.node||t.anchorOffset!==i.offset||t.focusNode!==a.node||t.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),t.removeAllRanges(),s>r?(t.addRange(e),t.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var gw=un&&"documentMode"in document&&11>=document.documentMode,Dr=null,Du=null,Zi=null,bu=!1;function Pf(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;bu||Dr==null||Dr!==Yo(r)||(r=Dr,"selectionStart"in r&&Qc(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Zi&&ms(Zi,r)||(Zi=r,r=ra(Du,"onSelect"),0<r.length&&(e=new Wc("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=Dr)))}function yo(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var br={animationend:yo("Animation","AnimationEnd"),animationiteration:yo("Animation","AnimationIteration"),animationstart:yo("Animation","AnimationStart"),transitionend:yo("Transition","TransitionEnd")},$l={},cg={};un&&(cg=document.createElement("div").style,"AnimationEvent"in window||(delete br.animationend.animation,delete br.animationiteration.animation,delete br.animationstart.animation),"TransitionEvent"in window||delete br.transitionend.transition);function La(t){if($l[t])return $l[t];if(!br[t])return t;var e=br[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in cg)return $l[t]=e[n];return t}var hg=La("animationend"),dg=La("animationiteration"),fg=La("animationstart"),pg=La("transitionend"),mg=new Map,kf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Gn(t,e){mg.set(t,e),yr(e,[t])}for(var Hl=0;Hl<kf.length;Hl++){var Wl=kf[Hl],_w=Wl.toLowerCase(),yw=Wl[0].toUpperCase()+Wl.slice(1);Gn(_w,"on"+yw)}Gn(hg,"onAnimationEnd");Gn(dg,"onAnimationIteration");Gn(fg,"onAnimationStart");Gn("dblclick","onDoubleClick");Gn("focusin","onFocus");Gn("focusout","onBlur");Gn(pg,"onTransitionEnd");Yr("onMouseEnter",["mouseout","mouseover"]);Yr("onMouseLeave",["mouseout","mouseover"]);Yr("onPointerEnter",["pointerout","pointerover"]);Yr("onPointerLeave",["pointerout","pointerover"]);yr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));yr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));yr("onBeforeInput",["compositionend","keypress","textInput","paste"]);yr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));yr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));yr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var $i="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),vw=new Set("cancel close invalid load scroll toggle".split(" ").concat($i));function Nf(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,_0(r,e,void 0,t),t.currentTarget=null}function gg(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],i=r.event;r=r.listeners;e:{var s=void 0;if(e)for(var a=r.length-1;0<=a;a--){var l=r[a],u=l.instance,h=l.currentTarget;if(l=l.listener,u!==s&&i.isPropagationStopped())break e;Nf(i,l,h),s=u}else for(a=0;a<r.length;a++){if(l=r[a],u=l.instance,h=l.currentTarget,l=l.listener,u!==s&&i.isPropagationStopped())break e;Nf(i,l,h),s=u}}}if(Jo)throw t=Pu,Jo=!1,Pu=null,t}function he(t,e){var n=e[ju];n===void 0&&(n=e[ju]=new Set);var r=t+"__bubble";n.has(r)||(_g(e,t,2,!1),n.add(r))}function Gl(t,e,n){var r=0;e&&(r|=4),_g(n,t,r,e)}var vo="_reactListening"+Math.random().toString(36).slice(2);function gs(t){if(!t[vo]){t[vo]=!0,Sm.forEach(function(n){n!=="selectionchange"&&(vw.has(n)||Gl(n,!1,t),Gl(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[vo]||(e[vo]=!0,Gl("selectionchange",!1,e))}}function _g(t,e,n,r){switch(eg(e)){case 1:var i=D0;break;case 4:i=b0;break;default:i=$c}n=i.bind(null,e,n,t),i=void 0,!Ru||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function ql(t,e,n,r,i){var s=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(a===4)for(a=r.return;a!==null;){var u=a.tag;if((u===3||u===4)&&(u=a.stateNode.containerInfo,u===i||u.nodeType===8&&u.parentNode===i))return;a=a.return}for(;l!==null;){if(a=rr(l),a===null)return;if(u=a.tag,u===5||u===6){r=s=a;continue e}l=l.parentNode}}r=r.return}Um(function(){var h=s,f=jc(n),m=[];e:{var _=mg.get(t);if(_!==void 0){var A=Wc,k=t;switch(t){case"keypress":if(Oo(n)===0)break e;case"keydown":case"keyup":A=K0;break;case"focusin":k="focus",A=Ul;break;case"focusout":k="blur",A=Ul;break;case"beforeblur":case"afterblur":A=Ul;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":A=vf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":A=O0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":A=J0;break;case hg:case dg:case fg:A=U0;break;case pg:A=ew;break;case"scroll":A=M0;break;case"wheel":A=nw;break;case"copy":case"cut":case"paste":A=B0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":A=Ef}var V=(e&4)!==0,b=!V&&t==="scroll",S=V?_!==null?_+"Capture":null:_;V=[];for(var w=h,x;w!==null;){x=w;var D=x.stateNode;if(x.tag===5&&D!==null&&(x=D,S!==null&&(D=cs(w,S),D!=null&&V.push(_s(w,D,x)))),b)break;w=w.return}0<V.length&&(_=new A(_,k,null,n,f),m.push({event:_,listeners:V}))}}if(!(e&7)){e:{if(_=t==="mouseover"||t==="pointerover",A=t==="mouseout"||t==="pointerout",_&&n!==xu&&(k=n.relatedTarget||n.fromElement)&&(rr(k)||k[cn]))break e;if((A||_)&&(_=f.window===f?f:(_=f.ownerDocument)?_.defaultView||_.parentWindow:window,A?(k=n.relatedTarget||n.toElement,A=h,k=k?rr(k):null,k!==null&&(b=vr(k),k!==b||k.tag!==5&&k.tag!==6)&&(k=null)):(A=null,k=h),A!==k)){if(V=vf,D="onMouseLeave",S="onMouseEnter",w="mouse",(t==="pointerout"||t==="pointerover")&&(V=Ef,D="onPointerLeave",S="onPointerEnter",w="pointer"),b=A==null?_:Mr(A),x=k==null?_:Mr(k),_=new V(D,w+"leave",A,n,f),_.target=b,_.relatedTarget=x,D=null,rr(f)===h&&(V=new V(S,w+"enter",k,n,f),V.target=x,V.relatedTarget=b,D=V),b=D,A&&k)t:{for(V=A,S=k,w=0,x=V;x;x=xr(x))w++;for(x=0,D=S;D;D=xr(D))x++;for(;0<w-x;)V=xr(V),w--;for(;0<x-w;)S=xr(S),x--;for(;w--;){if(V===S||S!==null&&V===S.alternate)break t;V=xr(V),S=xr(S)}V=null}else V=null;A!==null&&Vf(m,_,A,V,!1),k!==null&&b!==null&&Vf(m,b,k,V,!0)}}e:{if(_=h?Mr(h):window,A=_.nodeName&&_.nodeName.toLowerCase(),A==="select"||A==="input"&&_.type==="file")var U=uw;else if(Sf(_))if(og)U=fw;else{U=hw;var M=cw}else(A=_.nodeName)&&A.toLowerCase()==="input"&&(_.type==="checkbox"||_.type==="radio")&&(U=dw);if(U&&(U=U(t,h))){sg(m,U,n,f);break e}M&&M(t,_,h),t==="focusout"&&(M=_._wrapperState)&&M.controlled&&_.type==="number"&&Eu(_,"number",_.value)}switch(M=h?Mr(h):window,t){case"focusin":(Sf(M)||M.contentEditable==="true")&&(Dr=M,Du=h,Zi=null);break;case"focusout":Zi=Du=Dr=null;break;case"mousedown":bu=!0;break;case"contextmenu":case"mouseup":case"dragend":bu=!1,Pf(m,n,f);break;case"selectionchange":if(gw)break;case"keydown":case"keyup":Pf(m,n,f)}var y;if(qc)e:{switch(t){case"compositionstart":var g="onCompositionStart";break e;case"compositionend":g="onCompositionEnd";break e;case"compositionupdate":g="onCompositionUpdate";break e}g=void 0}else Vr?rg(t,n)&&(g="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(g="onCompositionStart");g&&(ng&&n.locale!=="ko"&&(Vr||g!=="onCompositionStart"?g==="onCompositionEnd"&&Vr&&(y=tg()):(An=f,Hc="value"in An?An.value:An.textContent,Vr=!0)),M=ra(h,g),0<M.length&&(g=new wf(g,t,null,n,f),m.push({event:g,listeners:M}),y?g.data=y:(y=ig(n),y!==null&&(g.data=y)))),(y=iw?sw(t,n):ow(t,n))&&(h=ra(h,"onBeforeInput"),0<h.length&&(f=new wf("onBeforeInput","beforeinput",null,n,f),m.push({event:f,listeners:h}),f.data=y))}gg(m,e)})}function _s(t,e,n){return{instance:t,listener:e,currentTarget:n}}function ra(t,e){for(var n=e+"Capture",r=[];t!==null;){var i=t,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=cs(t,n),s!=null&&r.unshift(_s(t,s,i)),s=cs(t,e),s!=null&&r.push(_s(t,s,i))),t=t.return}return r}function xr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Vf(t,e,n,r,i){for(var s=e._reactName,a=[];n!==null&&n!==r;){var l=n,u=l.alternate,h=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&h!==null&&(l=h,i?(u=cs(n,s),u!=null&&a.unshift(_s(n,u,l))):i||(u=cs(n,s),u!=null&&a.push(_s(n,u,l)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var ww=/\r\n?/g,Ew=/\u0000|\uFFFD/g;function Df(t){return(typeof t=="string"?t:""+t).replace(ww,`
`).replace(Ew,"")}function wo(t,e,n){if(e=Df(e),Df(t)!==e&&n)throw Error(F(425))}function ia(){}var Mu=null,Lu=null;function Ou(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Fu=typeof setTimeout=="function"?setTimeout:void 0,Tw=typeof clearTimeout=="function"?clearTimeout:void 0,bf=typeof Promise=="function"?Promise:void 0,Iw=typeof queueMicrotask=="function"?queueMicrotask:typeof bf<"u"?function(t){return bf.resolve(null).then(t).catch(Sw)}:Fu;function Sw(t){setTimeout(function(){throw t})}function Ql(t,e){var n=e,r=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){t.removeChild(i),fs(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);fs(e)}function Vn(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Mf(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var fi=Math.random().toString(36).slice(2),Ht="__reactFiber$"+fi,ys="__reactProps$"+fi,cn="__reactContainer$"+fi,ju="__reactEvents$"+fi,Aw="__reactListeners$"+fi,xw="__reactHandles$"+fi;function rr(t){var e=t[Ht];if(e)return e;for(var n=t.parentNode;n;){if(e=n[cn]||n[Ht]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Mf(t);t!==null;){if(n=t[Ht])return n;t=Mf(t)}return e}t=n,n=t.parentNode}return null}function Ls(t){return t=t[Ht]||t[cn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Mr(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(F(33))}function Oa(t){return t[ys]||null}var Uu=[],Lr=-1;function qn(t){return{current:t}}function de(t){0>Lr||(t.current=Uu[Lr],Uu[Lr]=null,Lr--)}function ue(t,e){Lr++,Uu[Lr]=t.current,t.current=e}var Bn={},Ze=qn(Bn),ht=qn(!1),cr=Bn;function Xr(t,e){var n=t.type.contextTypes;if(!n)return Bn;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=e[s];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=i),i}function dt(t){return t=t.childContextTypes,t!=null}function sa(){de(ht),de(Ze)}function Lf(t,e,n){if(Ze.current!==Bn)throw Error(F(168));ue(Ze,e),ue(ht,n)}function yg(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(F(108,c0(t)||"Unknown",i));return ye({},n,r)}function oa(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Bn,cr=Ze.current,ue(Ze,t),ue(ht,ht.current),!0}function Of(t,e,n){var r=t.stateNode;if(!r)throw Error(F(169));n?(t=yg(t,e,cr),r.__reactInternalMemoizedMergedChildContext=t,de(ht),de(Ze),ue(Ze,t)):de(ht),ue(ht,n)}var rn=null,Fa=!1,Kl=!1;function vg(t){rn===null?rn=[t]:rn.push(t)}function Cw(t){Fa=!0,vg(t)}function Qn(){if(!Kl&&rn!==null){Kl=!0;var t=0,e=se;try{var n=rn;for(se=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}rn=null,Fa=!1}catch(i){throw rn!==null&&(rn=rn.slice(t+1)),Hm(Uc,Qn),i}finally{se=e,Kl=!1}}return null}var Or=[],Fr=0,aa=null,la=0,At=[],xt=0,hr=null,sn=1,on="";function er(t,e){Or[Fr++]=la,Or[Fr++]=aa,aa=t,la=e}function wg(t,e,n){At[xt++]=sn,At[xt++]=on,At[xt++]=hr,hr=t;var r=sn;t=on;var i=32-jt(r)-1;r&=~(1<<i),n+=1;var s=32-jt(e)+i;if(30<s){var a=i-i%5;s=(r&(1<<a)-1).toString(32),r>>=a,i-=a,sn=1<<32-jt(e)+i|n<<i|r,on=s+t}else sn=1<<s|n<<i|r,on=t}function Kc(t){t.return!==null&&(er(t,1),wg(t,1,0))}function Yc(t){for(;t===aa;)aa=Or[--Fr],Or[Fr]=null,la=Or[--Fr],Or[Fr]=null;for(;t===hr;)hr=At[--xt],At[xt]=null,on=At[--xt],At[xt]=null,sn=At[--xt],At[xt]=null}var vt=null,gt=null,fe=!1,Ft=null;function Eg(t,e){var n=Ct(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Ff(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,vt=t,gt=Vn(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,vt=t,gt=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=hr!==null?{id:sn,overflow:on}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Ct(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,vt=t,gt=null,!0):!1;default:return!1}}function zu(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Bu(t){if(fe){var e=gt;if(e){var n=e;if(!Ff(t,e)){if(zu(t))throw Error(F(418));e=Vn(n.nextSibling);var r=vt;e&&Ff(t,e)?Eg(r,n):(t.flags=t.flags&-4097|2,fe=!1,vt=t)}}else{if(zu(t))throw Error(F(418));t.flags=t.flags&-4097|2,fe=!1,vt=t}}}function jf(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;vt=t}function Eo(t){if(t!==vt)return!1;if(!fe)return jf(t),fe=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Ou(t.type,t.memoizedProps)),e&&(e=gt)){if(zu(t))throw Tg(),Error(F(418));for(;e;)Eg(t,e),e=Vn(e.nextSibling)}if(jf(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(F(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){gt=Vn(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}gt=null}}else gt=vt?Vn(t.stateNode.nextSibling):null;return!0}function Tg(){for(var t=gt;t;)t=Vn(t.nextSibling)}function Jr(){gt=vt=null,fe=!1}function Xc(t){Ft===null?Ft=[t]:Ft.push(t)}var Rw=gn.ReactCurrentBatchConfig;function Li(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(F(309));var r=n.stateNode}if(!r)throw Error(F(147,t));var i=r,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(a){var l=i.refs;a===null?delete l[s]:l[s]=a},e._stringRef=s,e)}if(typeof t!="string")throw Error(F(284));if(!n._owner)throw Error(F(290,t))}return t}function To(t,e){throw t=Object.prototype.toString.call(e),Error(F(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Uf(t){var e=t._init;return e(t._payload)}function Ig(t){function e(S,w){if(t){var x=S.deletions;x===null?(S.deletions=[w],S.flags|=16):x.push(w)}}function n(S,w){if(!t)return null;for(;w!==null;)e(S,w),w=w.sibling;return null}function r(S,w){for(S=new Map;w!==null;)w.key!==null?S.set(w.key,w):S.set(w.index,w),w=w.sibling;return S}function i(S,w){return S=Ln(S,w),S.index=0,S.sibling=null,S}function s(S,w,x){return S.index=x,t?(x=S.alternate,x!==null?(x=x.index,x<w?(S.flags|=2,w):x):(S.flags|=2,w)):(S.flags|=1048576,w)}function a(S){return t&&S.alternate===null&&(S.flags|=2),S}function l(S,w,x,D){return w===null||w.tag!==6?(w=nu(x,S.mode,D),w.return=S,w):(w=i(w,x),w.return=S,w)}function u(S,w,x,D){var U=x.type;return U===Nr?f(S,w,x.props.children,D,x.key):w!==null&&(w.elementType===U||typeof U=="object"&&U!==null&&U.$$typeof===En&&Uf(U)===w.type)?(D=i(w,x.props),D.ref=Li(S,w,x),D.return=S,D):(D=Ho(x.type,x.key,x.props,null,S.mode,D),D.ref=Li(S,w,x),D.return=S,D)}function h(S,w,x,D){return w===null||w.tag!==4||w.stateNode.containerInfo!==x.containerInfo||w.stateNode.implementation!==x.implementation?(w=ru(x,S.mode,D),w.return=S,w):(w=i(w,x.children||[]),w.return=S,w)}function f(S,w,x,D,U){return w===null||w.tag!==7?(w=lr(x,S.mode,D,U),w.return=S,w):(w=i(w,x),w.return=S,w)}function m(S,w,x){if(typeof w=="string"&&w!==""||typeof w=="number")return w=nu(""+w,S.mode,x),w.return=S,w;if(typeof w=="object"&&w!==null){switch(w.$$typeof){case co:return x=Ho(w.type,w.key,w.props,null,S.mode,x),x.ref=Li(S,null,w),x.return=S,x;case kr:return w=ru(w,S.mode,x),w.return=S,w;case En:var D=w._init;return m(S,D(w._payload),x)}if(zi(w)||Ni(w))return w=lr(w,S.mode,x,null),w.return=S,w;To(S,w)}return null}function _(S,w,x,D){var U=w!==null?w.key:null;if(typeof x=="string"&&x!==""||typeof x=="number")return U!==null?null:l(S,w,""+x,D);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case co:return x.key===U?u(S,w,x,D):null;case kr:return x.key===U?h(S,w,x,D):null;case En:return U=x._init,_(S,w,U(x._payload),D)}if(zi(x)||Ni(x))return U!==null?null:f(S,w,x,D,null);To(S,x)}return null}function A(S,w,x,D,U){if(typeof D=="string"&&D!==""||typeof D=="number")return S=S.get(x)||null,l(w,S,""+D,U);if(typeof D=="object"&&D!==null){switch(D.$$typeof){case co:return S=S.get(D.key===null?x:D.key)||null,u(w,S,D,U);case kr:return S=S.get(D.key===null?x:D.key)||null,h(w,S,D,U);case En:var M=D._init;return A(S,w,x,M(D._payload),U)}if(zi(D)||Ni(D))return S=S.get(x)||null,f(w,S,D,U,null);To(w,D)}return null}function k(S,w,x,D){for(var U=null,M=null,y=w,g=w=0,v=null;y!==null&&g<x.length;g++){y.index>g?(v=y,y=null):v=y.sibling;var T=_(S,y,x[g],D);if(T===null){y===null&&(y=v);break}t&&y&&T.alternate===null&&e(S,y),w=s(T,w,g),M===null?U=T:M.sibling=T,M=T,y=v}if(g===x.length)return n(S,y),fe&&er(S,g),U;if(y===null){for(;g<x.length;g++)y=m(S,x[g],D),y!==null&&(w=s(y,w,g),M===null?U=y:M.sibling=y,M=y);return fe&&er(S,g),U}for(y=r(S,y);g<x.length;g++)v=A(y,S,g,x[g],D),v!==null&&(t&&v.alternate!==null&&y.delete(v.key===null?g:v.key),w=s(v,w,g),M===null?U=v:M.sibling=v,M=v);return t&&y.forEach(function(C){return e(S,C)}),fe&&er(S,g),U}function V(S,w,x,D){var U=Ni(x);if(typeof U!="function")throw Error(F(150));if(x=U.call(x),x==null)throw Error(F(151));for(var M=U=null,y=w,g=w=0,v=null,T=x.next();y!==null&&!T.done;g++,T=x.next()){y.index>g?(v=y,y=null):v=y.sibling;var C=_(S,y,T.value,D);if(C===null){y===null&&(y=v);break}t&&y&&C.alternate===null&&e(S,y),w=s(C,w,g),M===null?U=C:M.sibling=C,M=C,y=v}if(T.done)return n(S,y),fe&&er(S,g),U;if(y===null){for(;!T.done;g++,T=x.next())T=m(S,T.value,D),T!==null&&(w=s(T,w,g),M===null?U=T:M.sibling=T,M=T);return fe&&er(S,g),U}for(y=r(S,y);!T.done;g++,T=x.next())T=A(y,S,g,T.value,D),T!==null&&(t&&T.alternate!==null&&y.delete(T.key===null?g:T.key),w=s(T,w,g),M===null?U=T:M.sibling=T,M=T);return t&&y.forEach(function(R){return e(S,R)}),fe&&er(S,g),U}function b(S,w,x,D){if(typeof x=="object"&&x!==null&&x.type===Nr&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case co:e:{for(var U=x.key,M=w;M!==null;){if(M.key===U){if(U=x.type,U===Nr){if(M.tag===7){n(S,M.sibling),w=i(M,x.props.children),w.return=S,S=w;break e}}else if(M.elementType===U||typeof U=="object"&&U!==null&&U.$$typeof===En&&Uf(U)===M.type){n(S,M.sibling),w=i(M,x.props),w.ref=Li(S,M,x),w.return=S,S=w;break e}n(S,M);break}else e(S,M);M=M.sibling}x.type===Nr?(w=lr(x.props.children,S.mode,D,x.key),w.return=S,S=w):(D=Ho(x.type,x.key,x.props,null,S.mode,D),D.ref=Li(S,w,x),D.return=S,S=D)}return a(S);case kr:e:{for(M=x.key;w!==null;){if(w.key===M)if(w.tag===4&&w.stateNode.containerInfo===x.containerInfo&&w.stateNode.implementation===x.implementation){n(S,w.sibling),w=i(w,x.children||[]),w.return=S,S=w;break e}else{n(S,w);break}else e(S,w);w=w.sibling}w=ru(x,S.mode,D),w.return=S,S=w}return a(S);case En:return M=x._init,b(S,w,M(x._payload),D)}if(zi(x))return k(S,w,x,D);if(Ni(x))return V(S,w,x,D);To(S,x)}return typeof x=="string"&&x!==""||typeof x=="number"?(x=""+x,w!==null&&w.tag===6?(n(S,w.sibling),w=i(w,x),w.return=S,S=w):(n(S,w),w=nu(x,S.mode,D),w.return=S,S=w),a(S)):n(S,w)}return b}var Zr=Ig(!0),Sg=Ig(!1),ua=qn(null),ca=null,jr=null,Jc=null;function Zc(){Jc=jr=ca=null}function eh(t){var e=ua.current;de(ua),t._currentValue=e}function $u(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function Gr(t,e){ca=t,Jc=jr=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(ct=!0),t.firstContext=null)}function kt(t){var e=t._currentValue;if(Jc!==t)if(t={context:t,memoizedValue:e,next:null},jr===null){if(ca===null)throw Error(F(308));jr=t,ca.dependencies={lanes:0,firstContext:t}}else jr=jr.next=t;return e}var ir=null;function th(t){ir===null?ir=[t]:ir.push(t)}function Ag(t,e,n,r){var i=e.interleaved;return i===null?(n.next=n,th(e)):(n.next=i.next,i.next=n),e.interleaved=n,hn(t,r)}function hn(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Tn=!1;function nh(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function xg(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function an(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Dn(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,te&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,hn(t,n)}return i=r.interleaved,i===null?(e.next=e,th(r)):(e.next=i.next,i.next=e),r.interleaved=e,hn(t,n)}function Fo(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,zc(t,n)}}function zf(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?i=s=e:s=s.next=e}else i=s=e;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function ha(t,e,n,r){var i=t.updateQueue;Tn=!1;var s=i.firstBaseUpdate,a=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var u=l,h=u.next;u.next=null,a===null?s=h:a.next=h,a=u;var f=t.alternate;f!==null&&(f=f.updateQueue,l=f.lastBaseUpdate,l!==a&&(l===null?f.firstBaseUpdate=h:l.next=h,f.lastBaseUpdate=u))}if(s!==null){var m=i.baseState;a=0,f=h=u=null,l=s;do{var _=l.lane,A=l.eventTime;if((r&_)===_){f!==null&&(f=f.next={eventTime:A,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var k=t,V=l;switch(_=e,A=n,V.tag){case 1:if(k=V.payload,typeof k=="function"){m=k.call(A,m,_);break e}m=k;break e;case 3:k.flags=k.flags&-65537|128;case 0:if(k=V.payload,_=typeof k=="function"?k.call(A,m,_):k,_==null)break e;m=ye({},m,_);break e;case 2:Tn=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,_=i.effects,_===null?i.effects=[l]:_.push(l))}else A={eventTime:A,lane:_,tag:l.tag,payload:l.payload,callback:l.callback,next:null},f===null?(h=f=A,u=m):f=f.next=A,a|=_;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;_=l,l=_.next,_.next=null,i.lastBaseUpdate=_,i.shared.pending=null}}while(!0);if(f===null&&(u=m),i.baseState=u,i.firstBaseUpdate=h,i.lastBaseUpdate=f,e=i.shared.interleaved,e!==null){i=e;do a|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);fr|=a,t.lanes=a,t.memoizedState=m}}function Bf(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(F(191,i));i.call(r)}}}var Os={},Gt=qn(Os),vs=qn(Os),ws=qn(Os);function sr(t){if(t===Os)throw Error(F(174));return t}function rh(t,e){switch(ue(ws,e),ue(vs,t),ue(Gt,Os),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Iu(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Iu(e,t)}de(Gt),ue(Gt,e)}function ei(){de(Gt),de(vs),de(ws)}function Cg(t){sr(ws.current);var e=sr(Gt.current),n=Iu(e,t.type);e!==n&&(ue(vs,t),ue(Gt,n))}function ih(t){vs.current===t&&(de(Gt),de(vs))}var ge=qn(0);function da(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Yl=[];function sh(){for(var t=0;t<Yl.length;t++)Yl[t]._workInProgressVersionPrimary=null;Yl.length=0}var jo=gn.ReactCurrentDispatcher,Xl=gn.ReactCurrentBatchConfig,dr=0,_e=null,xe=null,Ve=null,fa=!1,es=!1,Es=0,Pw=0;function Ge(){throw Error(F(321))}function oh(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!zt(t[n],e[n]))return!1;return!0}function ah(t,e,n,r,i,s){if(dr=s,_e=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,jo.current=t===null||t.memoizedState===null?Dw:bw,t=n(r,i),es){s=0;do{if(es=!1,Es=0,25<=s)throw Error(F(301));s+=1,Ve=xe=null,e.updateQueue=null,jo.current=Mw,t=n(r,i)}while(es)}if(jo.current=pa,e=xe!==null&&xe.next!==null,dr=0,Ve=xe=_e=null,fa=!1,e)throw Error(F(300));return t}function lh(){var t=Es!==0;return Es=0,t}function $t(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ve===null?_e.memoizedState=Ve=t:Ve=Ve.next=t,Ve}function Nt(){if(xe===null){var t=_e.alternate;t=t!==null?t.memoizedState:null}else t=xe.next;var e=Ve===null?_e.memoizedState:Ve.next;if(e!==null)Ve=e,xe=t;else{if(t===null)throw Error(F(310));xe=t,t={memoizedState:xe.memoizedState,baseState:xe.baseState,baseQueue:xe.baseQueue,queue:xe.queue,next:null},Ve===null?_e.memoizedState=Ve=t:Ve=Ve.next=t}return Ve}function Ts(t,e){return typeof e=="function"?e(t):e}function Jl(t){var e=Nt(),n=e.queue;if(n===null)throw Error(F(311));n.lastRenderedReducer=t;var r=xe,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var a=i.next;i.next=s.next,s.next=a}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var l=a=null,u=null,h=s;do{var f=h.lane;if((dr&f)===f)u!==null&&(u=u.next={lane:0,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),r=h.hasEagerState?h.eagerState:t(r,h.action);else{var m={lane:f,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null};u===null?(l=u=m,a=r):u=u.next=m,_e.lanes|=f,fr|=f}h=h.next}while(h!==null&&h!==s);u===null?a=r:u.next=l,zt(r,e.memoizedState)||(ct=!0),e.memoizedState=r,e.baseState=a,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){i=t;do s=i.lane,_e.lanes|=s,fr|=s,i=i.next;while(i!==t)}else i===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Zl(t){var e=Nt(),n=e.queue;if(n===null)throw Error(F(311));n.lastRenderedReducer=t;var r=n.dispatch,i=n.pending,s=e.memoizedState;if(i!==null){n.pending=null;var a=i=i.next;do s=t(s,a.action),a=a.next;while(a!==i);zt(s,e.memoizedState)||(ct=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,r]}function Rg(){}function Pg(t,e){var n=_e,r=Nt(),i=e(),s=!zt(r.memoizedState,i);if(s&&(r.memoizedState=i,ct=!0),r=r.queue,uh(Vg.bind(null,n,r,t),[t]),r.getSnapshot!==e||s||Ve!==null&&Ve.memoizedState.tag&1){if(n.flags|=2048,Is(9,Ng.bind(null,n,r,i,e),void 0,null),De===null)throw Error(F(349));dr&30||kg(n,e,i)}return i}function kg(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=_e.updateQueue,e===null?(e={lastEffect:null,stores:null},_e.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Ng(t,e,n,r){e.value=n,e.getSnapshot=r,Dg(e)&&bg(t)}function Vg(t,e,n){return n(function(){Dg(e)&&bg(t)})}function Dg(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!zt(t,n)}catch{return!0}}function bg(t){var e=hn(t,1);e!==null&&Ut(e,t,1,-1)}function $f(t){var e=$t();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ts,lastRenderedState:t},e.queue=t,t=t.dispatch=Vw.bind(null,_e,t),[e.memoizedState,t]}function Is(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=_e.updateQueue,e===null?(e={lastEffect:null,stores:null},_e.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function Mg(){return Nt().memoizedState}function Uo(t,e,n,r){var i=$t();_e.flags|=t,i.memoizedState=Is(1|e,n,void 0,r===void 0?null:r)}function ja(t,e,n,r){var i=Nt();r=r===void 0?null:r;var s=void 0;if(xe!==null){var a=xe.memoizedState;if(s=a.destroy,r!==null&&oh(r,a.deps)){i.memoizedState=Is(e,n,s,r);return}}_e.flags|=t,i.memoizedState=Is(1|e,n,s,r)}function Hf(t,e){return Uo(8390656,8,t,e)}function uh(t,e){return ja(2048,8,t,e)}function Lg(t,e){return ja(4,2,t,e)}function Og(t,e){return ja(4,4,t,e)}function Fg(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function jg(t,e,n){return n=n!=null?n.concat([t]):null,ja(4,4,Fg.bind(null,e,t),n)}function ch(){}function Ug(t,e){var n=Nt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&oh(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function zg(t,e){var n=Nt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&oh(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function Bg(t,e,n){return dr&21?(zt(n,e)||(n=qm(),_e.lanes|=n,fr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,ct=!0),t.memoizedState=n)}function kw(t,e){var n=se;se=n!==0&&4>n?n:4,t(!0);var r=Xl.transition;Xl.transition={};try{t(!1),e()}finally{se=n,Xl.transition=r}}function $g(){return Nt().memoizedState}function Nw(t,e,n){var r=Mn(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Hg(t))Wg(e,n);else if(n=Ag(t,e,n,r),n!==null){var i=it();Ut(n,t,r,i),Gg(n,e,r)}}function Vw(t,e,n){var r=Mn(t),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Hg(t))Wg(e,i);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var a=e.lastRenderedState,l=s(a,n);if(i.hasEagerState=!0,i.eagerState=l,zt(l,a)){var u=e.interleaved;u===null?(i.next=i,th(e)):(i.next=u.next,u.next=i),e.interleaved=i;return}}catch{}finally{}n=Ag(t,e,i,r),n!==null&&(i=it(),Ut(n,t,r,i),Gg(n,e,r))}}function Hg(t){var e=t.alternate;return t===_e||e!==null&&e===_e}function Wg(t,e){es=fa=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Gg(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,zc(t,n)}}var pa={readContext:kt,useCallback:Ge,useContext:Ge,useEffect:Ge,useImperativeHandle:Ge,useInsertionEffect:Ge,useLayoutEffect:Ge,useMemo:Ge,useReducer:Ge,useRef:Ge,useState:Ge,useDebugValue:Ge,useDeferredValue:Ge,useTransition:Ge,useMutableSource:Ge,useSyncExternalStore:Ge,useId:Ge,unstable_isNewReconciler:!1},Dw={readContext:kt,useCallback:function(t,e){return $t().memoizedState=[t,e===void 0?null:e],t},useContext:kt,useEffect:Hf,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Uo(4194308,4,Fg.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Uo(4194308,4,t,e)},useInsertionEffect:function(t,e){return Uo(4,2,t,e)},useMemo:function(t,e){var n=$t();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=$t();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=Nw.bind(null,_e,t),[r.memoizedState,t]},useRef:function(t){var e=$t();return t={current:t},e.memoizedState=t},useState:$f,useDebugValue:ch,useDeferredValue:function(t){return $t().memoizedState=t},useTransition:function(){var t=$f(!1),e=t[0];return t=kw.bind(null,t[1]),$t().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=_e,i=$t();if(fe){if(n===void 0)throw Error(F(407));n=n()}else{if(n=e(),De===null)throw Error(F(349));dr&30||kg(r,e,n)}i.memoizedState=n;var s={value:n,getSnapshot:e};return i.queue=s,Hf(Vg.bind(null,r,s,t),[t]),r.flags|=2048,Is(9,Ng.bind(null,r,s,n,e),void 0,null),n},useId:function(){var t=$t(),e=De.identifierPrefix;if(fe){var n=on,r=sn;n=(r&~(1<<32-jt(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=Es++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=Pw++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},bw={readContext:kt,useCallback:Ug,useContext:kt,useEffect:uh,useImperativeHandle:jg,useInsertionEffect:Lg,useLayoutEffect:Og,useMemo:zg,useReducer:Jl,useRef:Mg,useState:function(){return Jl(Ts)},useDebugValue:ch,useDeferredValue:function(t){var e=Nt();return Bg(e,xe.memoizedState,t)},useTransition:function(){var t=Jl(Ts)[0],e=Nt().memoizedState;return[t,e]},useMutableSource:Rg,useSyncExternalStore:Pg,useId:$g,unstable_isNewReconciler:!1},Mw={readContext:kt,useCallback:Ug,useContext:kt,useEffect:uh,useImperativeHandle:jg,useInsertionEffect:Lg,useLayoutEffect:Og,useMemo:zg,useReducer:Zl,useRef:Mg,useState:function(){return Zl(Ts)},useDebugValue:ch,useDeferredValue:function(t){var e=Nt();return xe===null?e.memoizedState=t:Bg(e,xe.memoizedState,t)},useTransition:function(){var t=Zl(Ts)[0],e=Nt().memoizedState;return[t,e]},useMutableSource:Rg,useSyncExternalStore:Pg,useId:$g,unstable_isNewReconciler:!1};function Lt(t,e){if(t&&t.defaultProps){e=ye({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Hu(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:ye({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Ua={isMounted:function(t){return(t=t._reactInternals)?vr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=it(),i=Mn(t),s=an(r,i);s.payload=e,n!=null&&(s.callback=n),e=Dn(t,s,i),e!==null&&(Ut(e,t,i,r),Fo(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=it(),i=Mn(t),s=an(r,i);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Dn(t,s,i),e!==null&&(Ut(e,t,i,r),Fo(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=it(),r=Mn(t),i=an(n,r);i.tag=2,e!=null&&(i.callback=e),e=Dn(t,i,r),e!==null&&(Ut(e,t,r,n),Fo(e,t,r))}};function Wf(t,e,n,r,i,s,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,s,a):e.prototype&&e.prototype.isPureReactComponent?!ms(n,r)||!ms(i,s):!0}function qg(t,e,n){var r=!1,i=Bn,s=e.contextType;return typeof s=="object"&&s!==null?s=kt(s):(i=dt(e)?cr:Ze.current,r=e.contextTypes,s=(r=r!=null)?Xr(t,i):Bn),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Ua,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=s),e}function Gf(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&Ua.enqueueReplaceState(e,e.state,null)}function Wu(t,e,n,r){var i=t.stateNode;i.props=n,i.state=t.memoizedState,i.refs={},nh(t);var s=e.contextType;typeof s=="object"&&s!==null?i.context=kt(s):(s=dt(e)?cr:Ze.current,i.context=Xr(t,s)),i.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Hu(t,e,s,n),i.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&Ua.enqueueReplaceState(i,i.state,null),ha(t,n,i,r),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308)}function ti(t,e){try{var n="",r=e;do n+=u0(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:i,digest:null}}function eu(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Gu(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var Lw=typeof WeakMap=="function"?WeakMap:Map;function Qg(t,e,n){n=an(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){ga||(ga=!0,nc=r),Gu(t,e)},n}function Kg(t,e,n){n=an(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;n.payload=function(){return r(i)},n.callback=function(){Gu(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Gu(t,e),typeof r!="function"&&(bn===null?bn=new Set([this]):bn.add(this));var a=e.stack;this.componentDidCatch(e.value,{componentStack:a!==null?a:""})}),n}function qf(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new Lw;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(n)||(i.add(n),t=Yw.bind(null,t,e,n),e.then(t,t))}function Qf(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Kf(t,e,n,r,i){return t.mode&1?(t.flags|=65536,t.lanes=i,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=an(-1,1),e.tag=2,Dn(n,e,1))),n.lanes|=1),t)}var Ow=gn.ReactCurrentOwner,ct=!1;function nt(t,e,n,r){e.child=t===null?Sg(e,null,n,r):Zr(e,t.child,n,r)}function Yf(t,e,n,r,i){n=n.render;var s=e.ref;return Gr(e,i),r=ah(t,e,n,r,s,i),n=lh(),t!==null&&!ct?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,dn(t,e,i)):(fe&&n&&Kc(e),e.flags|=1,nt(t,e,r,i),e.child)}function Xf(t,e,n,r,i){if(t===null){var s=n.type;return typeof s=="function"&&!yh(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,Yg(t,e,s,r,i)):(t=Ho(n.type,null,r,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&i)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:ms,n(a,r)&&t.ref===e.ref)return dn(t,e,i)}return e.flags|=1,t=Ln(s,r),t.ref=e.ref,t.return=e,e.child=t}function Yg(t,e,n,r,i){if(t!==null){var s=t.memoizedProps;if(ms(s,r)&&t.ref===e.ref)if(ct=!1,e.pendingProps=r=s,(t.lanes&i)!==0)t.flags&131072&&(ct=!0);else return e.lanes=t.lanes,dn(t,e,i)}return qu(t,e,n,r,i)}function Xg(t,e,n){var r=e.pendingProps,i=r.children,s=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ue(zr,mt),mt|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ue(zr,mt),mt|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,ue(zr,mt),mt|=r}else s!==null?(r=s.baseLanes|n,e.memoizedState=null):r=n,ue(zr,mt),mt|=r;return nt(t,e,i,n),e.child}function Jg(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function qu(t,e,n,r,i){var s=dt(n)?cr:Ze.current;return s=Xr(e,s),Gr(e,i),n=ah(t,e,n,r,s,i),r=lh(),t!==null&&!ct?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,dn(t,e,i)):(fe&&r&&Kc(e),e.flags|=1,nt(t,e,n,i),e.child)}function Jf(t,e,n,r,i){if(dt(n)){var s=!0;oa(e)}else s=!1;if(Gr(e,i),e.stateNode===null)zo(t,e),qg(e,n,r),Wu(e,n,r,i),r=!0;else if(t===null){var a=e.stateNode,l=e.memoizedProps;a.props=l;var u=a.context,h=n.contextType;typeof h=="object"&&h!==null?h=kt(h):(h=dt(n)?cr:Ze.current,h=Xr(e,h));var f=n.getDerivedStateFromProps,m=typeof f=="function"||typeof a.getSnapshotBeforeUpdate=="function";m||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==r||u!==h)&&Gf(e,a,r,h),Tn=!1;var _=e.memoizedState;a.state=_,ha(e,r,a,i),u=e.memoizedState,l!==r||_!==u||ht.current||Tn?(typeof f=="function"&&(Hu(e,n,f,r),u=e.memoizedState),(l=Tn||Wf(e,n,l,r,_,u,h))?(m||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),a.props=r,a.state=u,a.context=h,r=l):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{a=e.stateNode,xg(t,e),l=e.memoizedProps,h=e.type===e.elementType?l:Lt(e.type,l),a.props=h,m=e.pendingProps,_=a.context,u=n.contextType,typeof u=="object"&&u!==null?u=kt(u):(u=dt(n)?cr:Ze.current,u=Xr(e,u));var A=n.getDerivedStateFromProps;(f=typeof A=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==m||_!==u)&&Gf(e,a,r,u),Tn=!1,_=e.memoizedState,a.state=_,ha(e,r,a,i);var k=e.memoizedState;l!==m||_!==k||ht.current||Tn?(typeof A=="function"&&(Hu(e,n,A,r),k=e.memoizedState),(h=Tn||Wf(e,n,h,r,_,k,u)||!1)?(f||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,k,u),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,k,u)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||l===t.memoizedProps&&_===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&_===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=k),a.props=r,a.state=k,a.context=u,r=h):(typeof a.componentDidUpdate!="function"||l===t.memoizedProps&&_===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&_===t.memoizedState||(e.flags|=1024),r=!1)}return Qu(t,e,n,r,s,i)}function Qu(t,e,n,r,i,s){Jg(t,e);var a=(e.flags&128)!==0;if(!r&&!a)return i&&Of(e,n,!1),dn(t,e,s);r=e.stateNode,Ow.current=e;var l=a&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&a?(e.child=Zr(e,t.child,null,s),e.child=Zr(e,null,l,s)):nt(t,e,l,s),e.memoizedState=r.state,i&&Of(e,n,!0),e.child}function Zg(t){var e=t.stateNode;e.pendingContext?Lf(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Lf(t,e.context,!1),rh(t,e.containerInfo)}function Zf(t,e,n,r,i){return Jr(),Xc(i),e.flags|=256,nt(t,e,n,r),e.child}var Ku={dehydrated:null,treeContext:null,retryLane:0};function Yu(t){return{baseLanes:t,cachePool:null,transitions:null}}function e_(t,e,n){var r=e.pendingProps,i=ge.current,s=!1,a=(e.flags&128)!==0,l;if((l=a)||(l=t!==null&&t.memoizedState===null?!1:(i&2)!==0),l?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(i|=1),ue(ge,i&1),t===null)return Bu(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(a=r.children,t=r.fallback,s?(r=e.mode,s=e.child,a={mode:"hidden",children:a},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=$a(a,r,0,null),t=lr(t,r,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Yu(n),e.memoizedState=Ku,t):hh(e,a));if(i=t.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return Fw(t,e,a,r,l,i,n);if(s){s=r.fallback,a=e.mode,i=t.child,l=i.sibling;var u={mode:"hidden",children:r.children};return!(a&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=Ln(i,u),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?s=Ln(l,s):(s=lr(s,a,n,null),s.flags|=2),s.return=e,r.return=e,r.sibling=s,e.child=r,r=s,s=e.child,a=t.child.memoizedState,a=a===null?Yu(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=t.childLanes&~n,e.memoizedState=Ku,r}return s=t.child,t=s.sibling,r=Ln(s,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function hh(t,e){return e=$a({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Io(t,e,n,r){return r!==null&&Xc(r),Zr(e,t.child,null,n),t=hh(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Fw(t,e,n,r,i,s,a){if(n)return e.flags&256?(e.flags&=-257,r=eu(Error(F(422))),Io(t,e,a,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=r.fallback,i=e.mode,r=$a({mode:"visible",children:r.children},i,0,null),s=lr(s,i,a,null),s.flags|=2,r.return=e,s.return=e,r.sibling=s,e.child=r,e.mode&1&&Zr(e,t.child,null,a),e.child.memoizedState=Yu(a),e.memoizedState=Ku,s);if(!(e.mode&1))return Io(t,e,a,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,s=Error(F(419)),r=eu(s,r,void 0),Io(t,e,a,r)}if(l=(a&t.childLanes)!==0,ct||l){if(r=De,r!==null){switch(a&-a){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|a)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,hn(t,i),Ut(r,t,i,-1))}return _h(),r=eu(Error(F(421))),Io(t,e,a,r)}return i.data==="$?"?(e.flags|=128,e.child=t.child,e=Xw.bind(null,t),i._reactRetry=e,null):(t=s.treeContext,gt=Vn(i.nextSibling),vt=e,fe=!0,Ft=null,t!==null&&(At[xt++]=sn,At[xt++]=on,At[xt++]=hr,sn=t.id,on=t.overflow,hr=e),e=hh(e,r.children),e.flags|=4096,e)}function ep(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),$u(t.return,e,n)}function tu(t,e,n,r,i){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function t_(t,e,n){var r=e.pendingProps,i=r.revealOrder,s=r.tail;if(nt(t,e,r.children,n),r=ge.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&ep(t,n,e);else if(t.tag===19)ep(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(ue(ge,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&da(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),tu(e,!1,i,n,s);break;case"backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&da(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}tu(e,!0,n,null,s);break;case"together":tu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function zo(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function dn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),fr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(F(153));if(e.child!==null){for(t=e.child,n=Ln(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Ln(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function jw(t,e,n){switch(e.tag){case 3:Zg(e),Jr();break;case 5:Cg(e);break;case 1:dt(e.type)&&oa(e);break;case 4:rh(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;ue(ua,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(ue(ge,ge.current&1),e.flags|=128,null):n&e.child.childLanes?e_(t,e,n):(ue(ge,ge.current&1),t=dn(t,e,n),t!==null?t.sibling:null);ue(ge,ge.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return t_(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),ue(ge,ge.current),r)break;return null;case 22:case 23:return e.lanes=0,Xg(t,e,n)}return dn(t,e,n)}var n_,Xu,r_,i_;n_=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Xu=function(){};r_=function(t,e,n,r){var i=t.memoizedProps;if(i!==r){t=e.stateNode,sr(Gt.current);var s=null;switch(n){case"input":i=vu(t,i),r=vu(t,r),s=[];break;case"select":i=ye({},i,{value:void 0}),r=ye({},r,{value:void 0}),s=[];break;case"textarea":i=Tu(t,i),r=Tu(t,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=ia)}Su(n,r);var a;n=null;for(h in i)if(!r.hasOwnProperty(h)&&i.hasOwnProperty(h)&&i[h]!=null)if(h==="style"){var l=i[h];for(a in l)l.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else h!=="dangerouslySetInnerHTML"&&h!=="children"&&h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(ls.hasOwnProperty(h)?s||(s=[]):(s=s||[]).push(h,null));for(h in r){var u=r[h];if(l=i!=null?i[h]:void 0,r.hasOwnProperty(h)&&u!==l&&(u!=null||l!=null))if(h==="style")if(l){for(a in l)!l.hasOwnProperty(a)||u&&u.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in u)u.hasOwnProperty(a)&&l[a]!==u[a]&&(n||(n={}),n[a]=u[a])}else n||(s||(s=[]),s.push(h,n)),n=u;else h==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(s=s||[]).push(h,u)):h==="children"?typeof u!="string"&&typeof u!="number"||(s=s||[]).push(h,""+u):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&(ls.hasOwnProperty(h)?(u!=null&&h==="onScroll"&&he("scroll",t),s||l===u||(s=[])):(s=s||[]).push(h,u))}n&&(s=s||[]).push("style",n);var h=s;(e.updateQueue=h)&&(e.flags|=4)}};i_=function(t,e,n,r){n!==r&&(e.flags|=4)};function Oi(t,e){if(!fe)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function qe(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function Uw(t,e,n){var r=e.pendingProps;switch(Yc(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return qe(e),null;case 1:return dt(e.type)&&sa(),qe(e),null;case 3:return r=e.stateNode,ei(),de(ht),de(Ze),sh(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(Eo(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Ft!==null&&(sc(Ft),Ft=null))),Xu(t,e),qe(e),null;case 5:ih(e);var i=sr(ws.current);if(n=e.type,t!==null&&e.stateNode!=null)r_(t,e,n,r,i),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(F(166));return qe(e),null}if(t=sr(Gt.current),Eo(e)){r=e.stateNode,n=e.type;var s=e.memoizedProps;switch(r[Ht]=e,r[ys]=s,t=(e.mode&1)!==0,n){case"dialog":he("cancel",r),he("close",r);break;case"iframe":case"object":case"embed":he("load",r);break;case"video":case"audio":for(i=0;i<$i.length;i++)he($i[i],r);break;case"source":he("error",r);break;case"img":case"image":case"link":he("error",r),he("load",r);break;case"details":he("toggle",r);break;case"input":uf(r,s),he("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},he("invalid",r);break;case"textarea":hf(r,s),he("invalid",r)}Su(n,s),i=null;for(var a in s)if(s.hasOwnProperty(a)){var l=s[a];a==="children"?typeof l=="string"?r.textContent!==l&&(s.suppressHydrationWarning!==!0&&wo(r.textContent,l,t),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(s.suppressHydrationWarning!==!0&&wo(r.textContent,l,t),i=["children",""+l]):ls.hasOwnProperty(a)&&l!=null&&a==="onScroll"&&he("scroll",r)}switch(n){case"input":ho(r),cf(r,s,!0);break;case"textarea":ho(r),df(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=ia)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{a=i.nodeType===9?i:i.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Vm(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=a.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=a.createElement(n,{is:r.is}):(t=a.createElement(n),n==="select"&&(a=t,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):t=a.createElementNS(t,n),t[Ht]=e,t[ys]=r,n_(t,e,!1,!1),e.stateNode=t;e:{switch(a=Au(n,r),n){case"dialog":he("cancel",t),he("close",t),i=r;break;case"iframe":case"object":case"embed":he("load",t),i=r;break;case"video":case"audio":for(i=0;i<$i.length;i++)he($i[i],t);i=r;break;case"source":he("error",t),i=r;break;case"img":case"image":case"link":he("error",t),he("load",t),i=r;break;case"details":he("toggle",t),i=r;break;case"input":uf(t,r),i=vu(t,r),he("invalid",t);break;case"option":i=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},i=ye({},r,{value:void 0}),he("invalid",t);break;case"textarea":hf(t,r),i=Tu(t,r),he("invalid",t);break;default:i=r}Su(n,i),l=i;for(s in l)if(l.hasOwnProperty(s)){var u=l[s];s==="style"?Mm(t,u):s==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Dm(t,u)):s==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&us(t,u):typeof u=="number"&&us(t,""+u):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(ls.hasOwnProperty(s)?u!=null&&s==="onScroll"&&he("scroll",t):u!=null&&Mc(t,s,u,a))}switch(n){case"input":ho(t),cf(t,r,!1);break;case"textarea":ho(t),df(t);break;case"option":r.value!=null&&t.setAttribute("value",""+zn(r.value));break;case"select":t.multiple=!!r.multiple,s=r.value,s!=null?Br(t,!!r.multiple,s,!1):r.defaultValue!=null&&Br(t,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(t.onclick=ia)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return qe(e),null;case 6:if(t&&e.stateNode!=null)i_(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(F(166));if(n=sr(ws.current),sr(Gt.current),Eo(e)){if(r=e.stateNode,n=e.memoizedProps,r[Ht]=e,(s=r.nodeValue!==n)&&(t=vt,t!==null))switch(t.tag){case 3:wo(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&wo(r.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Ht]=e,e.stateNode=r}return qe(e),null;case 13:if(de(ge),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(fe&&gt!==null&&e.mode&1&&!(e.flags&128))Tg(),Jr(),e.flags|=98560,s=!1;else if(s=Eo(e),r!==null&&r.dehydrated!==null){if(t===null){if(!s)throw Error(F(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(F(317));s[Ht]=e}else Jr(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;qe(e),s=!1}else Ft!==null&&(sc(Ft),Ft=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||ge.current&1?Re===0&&(Re=3):_h())),e.updateQueue!==null&&(e.flags|=4),qe(e),null);case 4:return ei(),Xu(t,e),t===null&&gs(e.stateNode.containerInfo),qe(e),null;case 10:return eh(e.type._context),qe(e),null;case 17:return dt(e.type)&&sa(),qe(e),null;case 19:if(de(ge),s=e.memoizedState,s===null)return qe(e),null;if(r=(e.flags&128)!==0,a=s.rendering,a===null)if(r)Oi(s,!1);else{if(Re!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(a=da(t),a!==null){for(e.flags|=128,Oi(s,!1),r=a.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)s=n,t=r,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,t=a.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ue(ge,ge.current&1|2),e.child}t=t.sibling}s.tail!==null&&Ie()>ni&&(e.flags|=128,r=!0,Oi(s,!1),e.lanes=4194304)}else{if(!r)if(t=da(a),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Oi(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!fe)return qe(e),null}else 2*Ie()-s.renderingStartTime>ni&&n!==1073741824&&(e.flags|=128,r=!0,Oi(s,!1),e.lanes=4194304);s.isBackwards?(a.sibling=e.child,e.child=a):(n=s.last,n!==null?n.sibling=a:e.child=a,s.last=a)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Ie(),e.sibling=null,n=ge.current,ue(ge,r?n&1|2:n&1),e):(qe(e),null);case 22:case 23:return gh(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?mt&1073741824&&(qe(e),e.subtreeFlags&6&&(e.flags|=8192)):qe(e),null;case 24:return null;case 25:return null}throw Error(F(156,e.tag))}function zw(t,e){switch(Yc(e),e.tag){case 1:return dt(e.type)&&sa(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return ei(),de(ht),de(Ze),sh(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return ih(e),null;case 13:if(de(ge),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(F(340));Jr()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return de(ge),null;case 4:return ei(),null;case 10:return eh(e.type._context),null;case 22:case 23:return gh(),null;case 24:return null;default:return null}}var So=!1,Xe=!1,Bw=typeof WeakSet=="function"?WeakSet:Set,B=null;function Ur(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Ee(t,e,r)}else n.current=null}function Ju(t,e,n){try{n()}catch(r){Ee(t,e,r)}}var tp=!1;function $w(t,e){if(Mu=ta,t=ug(),Qc(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,l=-1,u=-1,h=0,f=0,m=t,_=null;t:for(;;){for(var A;m!==n||i!==0&&m.nodeType!==3||(l=a+i),m!==s||r!==0&&m.nodeType!==3||(u=a+r),m.nodeType===3&&(a+=m.nodeValue.length),(A=m.firstChild)!==null;)_=m,m=A;for(;;){if(m===t)break t;if(_===n&&++h===i&&(l=a),_===s&&++f===r&&(u=a),(A=m.nextSibling)!==null)break;m=_,_=m.parentNode}m=A}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Lu={focusedElem:t,selectionRange:n},ta=!1,B=e;B!==null;)if(e=B,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,B=t;else for(;B!==null;){e=B;try{var k=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(k!==null){var V=k.memoizedProps,b=k.memoizedState,S=e.stateNode,w=S.getSnapshotBeforeUpdate(e.elementType===e.type?V:Lt(e.type,V),b);S.__reactInternalSnapshotBeforeUpdate=w}break;case 3:var x=e.stateNode.containerInfo;x.nodeType===1?x.textContent="":x.nodeType===9&&x.documentElement&&x.removeChild(x.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(F(163))}}catch(D){Ee(e,e.return,D)}if(t=e.sibling,t!==null){t.return=e.return,B=t;break}B=e.return}return k=tp,tp=!1,k}function ts(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&t)===t){var s=i.destroy;i.destroy=void 0,s!==void 0&&Ju(e,n,s)}i=i.next}while(i!==r)}}function za(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function Zu(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function s_(t){var e=t.alternate;e!==null&&(t.alternate=null,s_(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Ht],delete e[ys],delete e[ju],delete e[Aw],delete e[xw])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function o_(t){return t.tag===5||t.tag===3||t.tag===4}function np(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||o_(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function ec(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=ia));else if(r!==4&&(t=t.child,t!==null))for(ec(t,e,n),t=t.sibling;t!==null;)ec(t,e,n),t=t.sibling}function tc(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(tc(t,e,n),t=t.sibling;t!==null;)tc(t,e,n),t=t.sibling}var Me=null,Ot=!1;function wn(t,e,n){for(n=n.child;n!==null;)a_(t,e,n),n=n.sibling}function a_(t,e,n){if(Wt&&typeof Wt.onCommitFiberUnmount=="function")try{Wt.onCommitFiberUnmount(Da,n)}catch{}switch(n.tag){case 5:Xe||Ur(n,e);case 6:var r=Me,i=Ot;Me=null,wn(t,e,n),Me=r,Ot=i,Me!==null&&(Ot?(t=Me,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Me.removeChild(n.stateNode));break;case 18:Me!==null&&(Ot?(t=Me,n=n.stateNode,t.nodeType===8?Ql(t.parentNode,n):t.nodeType===1&&Ql(t,n),fs(t)):Ql(Me,n.stateNode));break;case 4:r=Me,i=Ot,Me=n.stateNode.containerInfo,Ot=!0,wn(t,e,n),Me=r,Ot=i;break;case 0:case 11:case 14:case 15:if(!Xe&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&Ju(n,e,a),i=i.next}while(i!==r)}wn(t,e,n);break;case 1:if(!Xe&&(Ur(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){Ee(n,e,l)}wn(t,e,n);break;case 21:wn(t,e,n);break;case 22:n.mode&1?(Xe=(r=Xe)||n.memoizedState!==null,wn(t,e,n),Xe=r):wn(t,e,n);break;default:wn(t,e,n)}}function rp(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new Bw),e.forEach(function(r){var i=Jw.bind(null,t,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Mt(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=t,a=e,l=a;e:for(;l!==null;){switch(l.tag){case 5:Me=l.stateNode,Ot=!1;break e;case 3:Me=l.stateNode.containerInfo,Ot=!0;break e;case 4:Me=l.stateNode.containerInfo,Ot=!0;break e}l=l.return}if(Me===null)throw Error(F(160));a_(s,a,i),Me=null,Ot=!1;var u=i.alternate;u!==null&&(u.return=null),i.return=null}catch(h){Ee(i,e,h)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)l_(e,t),e=e.sibling}function l_(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Mt(e,t),Bt(t),r&4){try{ts(3,t,t.return),za(3,t)}catch(V){Ee(t,t.return,V)}try{ts(5,t,t.return)}catch(V){Ee(t,t.return,V)}}break;case 1:Mt(e,t),Bt(t),r&512&&n!==null&&Ur(n,n.return);break;case 5:if(Mt(e,t),Bt(t),r&512&&n!==null&&Ur(n,n.return),t.flags&32){var i=t.stateNode;try{us(i,"")}catch(V){Ee(t,t.return,V)}}if(r&4&&(i=t.stateNode,i!=null)){var s=t.memoizedProps,a=n!==null?n.memoizedProps:s,l=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{l==="input"&&s.type==="radio"&&s.name!=null&&km(i,s),Au(l,a);var h=Au(l,s);for(a=0;a<u.length;a+=2){var f=u[a],m=u[a+1];f==="style"?Mm(i,m):f==="dangerouslySetInnerHTML"?Dm(i,m):f==="children"?us(i,m):Mc(i,f,m,h)}switch(l){case"input":wu(i,s);break;case"textarea":Nm(i,s);break;case"select":var _=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var A=s.value;A!=null?Br(i,!!s.multiple,A,!1):_!==!!s.multiple&&(s.defaultValue!=null?Br(i,!!s.multiple,s.defaultValue,!0):Br(i,!!s.multiple,s.multiple?[]:"",!1))}i[ys]=s}catch(V){Ee(t,t.return,V)}}break;case 6:if(Mt(e,t),Bt(t),r&4){if(t.stateNode===null)throw Error(F(162));i=t.stateNode,s=t.memoizedProps;try{i.nodeValue=s}catch(V){Ee(t,t.return,V)}}break;case 3:if(Mt(e,t),Bt(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{fs(e.containerInfo)}catch(V){Ee(t,t.return,V)}break;case 4:Mt(e,t),Bt(t);break;case 13:Mt(e,t),Bt(t),i=t.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(ph=Ie())),r&4&&rp(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(Xe=(h=Xe)||f,Mt(e,t),Xe=h):Mt(e,t),Bt(t),r&8192){if(h=t.memoizedState!==null,(t.stateNode.isHidden=h)&&!f&&t.mode&1)for(B=t,f=t.child;f!==null;){for(m=B=f;B!==null;){switch(_=B,A=_.child,_.tag){case 0:case 11:case 14:case 15:ts(4,_,_.return);break;case 1:Ur(_,_.return);var k=_.stateNode;if(typeof k.componentWillUnmount=="function"){r=_,n=_.return;try{e=r,k.props=e.memoizedProps,k.state=e.memoizedState,k.componentWillUnmount()}catch(V){Ee(r,n,V)}}break;case 5:Ur(_,_.return);break;case 22:if(_.memoizedState!==null){sp(m);continue}}A!==null?(A.return=_,B=A):sp(m)}f=f.sibling}e:for(f=null,m=t;;){if(m.tag===5){if(f===null){f=m;try{i=m.stateNode,h?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(l=m.stateNode,u=m.memoizedProps.style,a=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=bm("display",a))}catch(V){Ee(t,t.return,V)}}}else if(m.tag===6){if(f===null)try{m.stateNode.nodeValue=h?"":m.memoizedProps}catch(V){Ee(t,t.return,V)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===t)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===t)break e;for(;m.sibling===null;){if(m.return===null||m.return===t)break e;f===m&&(f=null),m=m.return}f===m&&(f=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:Mt(e,t),Bt(t),r&4&&rp(t);break;case 21:break;default:Mt(e,t),Bt(t)}}function Bt(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(o_(n)){var r=n;break e}n=n.return}throw Error(F(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(us(i,""),r.flags&=-33);var s=np(t);tc(t,s,i);break;case 3:case 4:var a=r.stateNode.containerInfo,l=np(t);ec(t,l,a);break;default:throw Error(F(161))}}catch(u){Ee(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Hw(t,e,n){B=t,u_(t)}function u_(t,e,n){for(var r=(t.mode&1)!==0;B!==null;){var i=B,s=i.child;if(i.tag===22&&r){var a=i.memoizedState!==null||So;if(!a){var l=i.alternate,u=l!==null&&l.memoizedState!==null||Xe;l=So;var h=Xe;if(So=a,(Xe=u)&&!h)for(B=i;B!==null;)a=B,u=a.child,a.tag===22&&a.memoizedState!==null?op(i):u!==null?(u.return=a,B=u):op(i);for(;s!==null;)B=s,u_(s),s=s.sibling;B=i,So=l,Xe=h}ip(t)}else i.subtreeFlags&8772&&s!==null?(s.return=i,B=s):ip(t)}}function ip(t){for(;B!==null;){var e=B;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Xe||za(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!Xe)if(n===null)r.componentDidMount();else{var i=e.elementType===e.type?n.memoizedProps:Lt(e.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Bf(e,s,r);break;case 3:var a=e.updateQueue;if(a!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Bf(e,a,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var h=e.alternate;if(h!==null){var f=h.memoizedState;if(f!==null){var m=f.dehydrated;m!==null&&fs(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(F(163))}Xe||e.flags&512&&Zu(e)}catch(_){Ee(e,e.return,_)}}if(e===t){B=null;break}if(n=e.sibling,n!==null){n.return=e.return,B=n;break}B=e.return}}function sp(t){for(;B!==null;){var e=B;if(e===t){B=null;break}var n=e.sibling;if(n!==null){n.return=e.return,B=n;break}B=e.return}}function op(t){for(;B!==null;){var e=B;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{za(4,e)}catch(u){Ee(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(u){Ee(e,i,u)}}var s=e.return;try{Zu(e)}catch(u){Ee(e,s,u)}break;case 5:var a=e.return;try{Zu(e)}catch(u){Ee(e,a,u)}}}catch(u){Ee(e,e.return,u)}if(e===t){B=null;break}var l=e.sibling;if(l!==null){l.return=e.return,B=l;break}B=e.return}}var Ww=Math.ceil,ma=gn.ReactCurrentDispatcher,dh=gn.ReactCurrentOwner,Rt=gn.ReactCurrentBatchConfig,te=0,De=null,Ae=null,Fe=0,mt=0,zr=qn(0),Re=0,Ss=null,fr=0,Ba=0,fh=0,ns=null,lt=null,ph=0,ni=1/0,nn=null,ga=!1,nc=null,bn=null,Ao=!1,xn=null,_a=0,rs=0,rc=null,Bo=-1,$o=0;function it(){return te&6?Ie():Bo!==-1?Bo:Bo=Ie()}function Mn(t){return t.mode&1?te&2&&Fe!==0?Fe&-Fe:Rw.transition!==null?($o===0&&($o=qm()),$o):(t=se,t!==0||(t=window.event,t=t===void 0?16:eg(t.type)),t):1}function Ut(t,e,n,r){if(50<rs)throw rs=0,rc=null,Error(F(185));bs(t,n,r),(!(te&2)||t!==De)&&(t===De&&(!(te&2)&&(Ba|=n),Re===4&&Sn(t,Fe)),ft(t,r),n===1&&te===0&&!(e.mode&1)&&(ni=Ie()+500,Fa&&Qn()))}function ft(t,e){var n=t.callbackNode;R0(t,e);var r=ea(t,t===De?Fe:0);if(r===0)n!==null&&mf(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&mf(n),e===1)t.tag===0?Cw(ap.bind(null,t)):vg(ap.bind(null,t)),Iw(function(){!(te&6)&&Qn()}),n=null;else{switch(Qm(r)){case 1:n=Uc;break;case 4:n=Wm;break;case 16:n=Zo;break;case 536870912:n=Gm;break;default:n=Zo}n=__(n,c_.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function c_(t,e){if(Bo=-1,$o=0,te&6)throw Error(F(327));var n=t.callbackNode;if(qr()&&t.callbackNode!==n)return null;var r=ea(t,t===De?Fe:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=ya(t,r);else{e=r;var i=te;te|=2;var s=d_();(De!==t||Fe!==e)&&(nn=null,ni=Ie()+500,ar(t,e));do try{Qw();break}catch(l){h_(t,l)}while(!0);Zc(),ma.current=s,te=i,Ae!==null?e=0:(De=null,Fe=0,e=Re)}if(e!==0){if(e===2&&(i=ku(t),i!==0&&(r=i,e=ic(t,i))),e===1)throw n=Ss,ar(t,0),Sn(t,r),ft(t,Ie()),n;if(e===6)Sn(t,r);else{if(i=t.current.alternate,!(r&30)&&!Gw(i)&&(e=ya(t,r),e===2&&(s=ku(t),s!==0&&(r=s,e=ic(t,s))),e===1))throw n=Ss,ar(t,0),Sn(t,r),ft(t,Ie()),n;switch(t.finishedWork=i,t.finishedLanes=r,e){case 0:case 1:throw Error(F(345));case 2:tr(t,lt,nn);break;case 3:if(Sn(t,r),(r&130023424)===r&&(e=ph+500-Ie(),10<e)){if(ea(t,0)!==0)break;if(i=t.suspendedLanes,(i&r)!==r){it(),t.pingedLanes|=t.suspendedLanes&i;break}t.timeoutHandle=Fu(tr.bind(null,t,lt,nn),e);break}tr(t,lt,nn);break;case 4:if(Sn(t,r),(r&4194240)===r)break;for(e=t.eventTimes,i=-1;0<r;){var a=31-jt(r);s=1<<a,a=e[a],a>i&&(i=a),r&=~s}if(r=i,r=Ie()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Ww(r/1960))-r,10<r){t.timeoutHandle=Fu(tr.bind(null,t,lt,nn),r);break}tr(t,lt,nn);break;case 5:tr(t,lt,nn);break;default:throw Error(F(329))}}}return ft(t,Ie()),t.callbackNode===n?c_.bind(null,t):null}function ic(t,e){var n=ns;return t.current.memoizedState.isDehydrated&&(ar(t,e).flags|=256),t=ya(t,e),t!==2&&(e=lt,lt=n,e!==null&&sc(e)),t}function sc(t){lt===null?lt=t:lt.push.apply(lt,t)}function Gw(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!zt(s(),i))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Sn(t,e){for(e&=~fh,e&=~Ba,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-jt(e),r=1<<n;t[n]=-1,e&=~r}}function ap(t){if(te&6)throw Error(F(327));qr();var e=ea(t,0);if(!(e&1))return ft(t,Ie()),null;var n=ya(t,e);if(t.tag!==0&&n===2){var r=ku(t);r!==0&&(e=r,n=ic(t,r))}if(n===1)throw n=Ss,ar(t,0),Sn(t,e),ft(t,Ie()),n;if(n===6)throw Error(F(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,tr(t,lt,nn),ft(t,Ie()),null}function mh(t,e){var n=te;te|=1;try{return t(e)}finally{te=n,te===0&&(ni=Ie()+500,Fa&&Qn())}}function pr(t){xn!==null&&xn.tag===0&&!(te&6)&&qr();var e=te;te|=1;var n=Rt.transition,r=se;try{if(Rt.transition=null,se=1,t)return t()}finally{se=r,Rt.transition=n,te=e,!(te&6)&&Qn()}}function gh(){mt=zr.current,de(zr)}function ar(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,Tw(n)),Ae!==null)for(n=Ae.return;n!==null;){var r=n;switch(Yc(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&sa();break;case 3:ei(),de(ht),de(Ze),sh();break;case 5:ih(r);break;case 4:ei();break;case 13:de(ge);break;case 19:de(ge);break;case 10:eh(r.type._context);break;case 22:case 23:gh()}n=n.return}if(De=t,Ae=t=Ln(t.current,null),Fe=mt=e,Re=0,Ss=null,fh=Ba=fr=0,lt=ns=null,ir!==null){for(e=0;e<ir.length;e++)if(n=ir[e],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var a=s.next;s.next=i,r.next=a}n.pending=r}ir=null}return t}function h_(t,e){do{var n=Ae;try{if(Zc(),jo.current=pa,fa){for(var r=_e.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}fa=!1}if(dr=0,Ve=xe=_e=null,es=!1,Es=0,dh.current=null,n===null||n.return===null){Re=1,Ss=e,Ae=null;break}e:{var s=t,a=n.return,l=n,u=e;if(e=Fe,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var h=u,f=l,m=f.tag;if(!(f.mode&1)&&(m===0||m===11||m===15)){var _=f.alternate;_?(f.updateQueue=_.updateQueue,f.memoizedState=_.memoizedState,f.lanes=_.lanes):(f.updateQueue=null,f.memoizedState=null)}var A=Qf(a);if(A!==null){A.flags&=-257,Kf(A,a,l,s,e),A.mode&1&&qf(s,h,e),e=A,u=h;var k=e.updateQueue;if(k===null){var V=new Set;V.add(u),e.updateQueue=V}else k.add(u);break e}else{if(!(e&1)){qf(s,h,e),_h();break e}u=Error(F(426))}}else if(fe&&l.mode&1){var b=Qf(a);if(b!==null){!(b.flags&65536)&&(b.flags|=256),Kf(b,a,l,s,e),Xc(ti(u,l));break e}}s=u=ti(u,l),Re!==4&&(Re=2),ns===null?ns=[s]:ns.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var S=Qg(s,u,e);zf(s,S);break e;case 1:l=u;var w=s.type,x=s.stateNode;if(!(s.flags&128)&&(typeof w.getDerivedStateFromError=="function"||x!==null&&typeof x.componentDidCatch=="function"&&(bn===null||!bn.has(x)))){s.flags|=65536,e&=-e,s.lanes|=e;var D=Kg(s,l,e);zf(s,D);break e}}s=s.return}while(s!==null)}p_(n)}catch(U){e=U,Ae===n&&n!==null&&(Ae=n=n.return);continue}break}while(!0)}function d_(){var t=ma.current;return ma.current=pa,t===null?pa:t}function _h(){(Re===0||Re===3||Re===2)&&(Re=4),De===null||!(fr&268435455)&&!(Ba&268435455)||Sn(De,Fe)}function ya(t,e){var n=te;te|=2;var r=d_();(De!==t||Fe!==e)&&(nn=null,ar(t,e));do try{qw();break}catch(i){h_(t,i)}while(!0);if(Zc(),te=n,ma.current=r,Ae!==null)throw Error(F(261));return De=null,Fe=0,Re}function qw(){for(;Ae!==null;)f_(Ae)}function Qw(){for(;Ae!==null&&!v0();)f_(Ae)}function f_(t){var e=g_(t.alternate,t,mt);t.memoizedProps=t.pendingProps,e===null?p_(t):Ae=e,dh.current=null}function p_(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=zw(n,e),n!==null){n.flags&=32767,Ae=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Re=6,Ae=null;return}}else if(n=Uw(n,e,mt),n!==null){Ae=n;return}if(e=e.sibling,e!==null){Ae=e;return}Ae=e=t}while(e!==null);Re===0&&(Re=5)}function tr(t,e,n){var r=se,i=Rt.transition;try{Rt.transition=null,se=1,Kw(t,e,n,r)}finally{Rt.transition=i,se=r}return null}function Kw(t,e,n,r){do qr();while(xn!==null);if(te&6)throw Error(F(327));n=t.finishedWork;var i=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(F(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(P0(t,s),t===De&&(Ae=De=null,Fe=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ao||(Ao=!0,__(Zo,function(){return qr(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Rt.transition,Rt.transition=null;var a=se;se=1;var l=te;te|=4,dh.current=null,$w(t,n),l_(n,t),mw(Lu),ta=!!Mu,Lu=Mu=null,t.current=n,Hw(n),w0(),te=l,se=a,Rt.transition=s}else t.current=n;if(Ao&&(Ao=!1,xn=t,_a=i),s=t.pendingLanes,s===0&&(bn=null),I0(n.stateNode),ft(t,Ie()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)i=e[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(ga)throw ga=!1,t=nc,nc=null,t;return _a&1&&t.tag!==0&&qr(),s=t.pendingLanes,s&1?t===rc?rs++:(rs=0,rc=t):rs=0,Qn(),null}function qr(){if(xn!==null){var t=Qm(_a),e=Rt.transition,n=se;try{if(Rt.transition=null,se=16>t?16:t,xn===null)var r=!1;else{if(t=xn,xn=null,_a=0,te&6)throw Error(F(331));var i=te;for(te|=4,B=t.current;B!==null;){var s=B,a=s.child;if(B.flags&16){var l=s.deletions;if(l!==null){for(var u=0;u<l.length;u++){var h=l[u];for(B=h;B!==null;){var f=B;switch(f.tag){case 0:case 11:case 15:ts(8,f,s)}var m=f.child;if(m!==null)m.return=f,B=m;else for(;B!==null;){f=B;var _=f.sibling,A=f.return;if(s_(f),f===h){B=null;break}if(_!==null){_.return=A,B=_;break}B=A}}}var k=s.alternate;if(k!==null){var V=k.child;if(V!==null){k.child=null;do{var b=V.sibling;V.sibling=null,V=b}while(V!==null)}}B=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,B=a;else e:for(;B!==null;){if(s=B,s.flags&2048)switch(s.tag){case 0:case 11:case 15:ts(9,s,s.return)}var S=s.sibling;if(S!==null){S.return=s.return,B=S;break e}B=s.return}}var w=t.current;for(B=w;B!==null;){a=B;var x=a.child;if(a.subtreeFlags&2064&&x!==null)x.return=a,B=x;else e:for(a=w;B!==null;){if(l=B,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:za(9,l)}}catch(U){Ee(l,l.return,U)}if(l===a){B=null;break e}var D=l.sibling;if(D!==null){D.return=l.return,B=D;break e}B=l.return}}if(te=i,Qn(),Wt&&typeof Wt.onPostCommitFiberRoot=="function")try{Wt.onPostCommitFiberRoot(Da,t)}catch{}r=!0}return r}finally{se=n,Rt.transition=e}}return!1}function lp(t,e,n){e=ti(n,e),e=Qg(t,e,1),t=Dn(t,e,1),e=it(),t!==null&&(bs(t,1,e),ft(t,e))}function Ee(t,e,n){if(t.tag===3)lp(t,t,n);else for(;e!==null;){if(e.tag===3){lp(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(bn===null||!bn.has(r))){t=ti(n,t),t=Kg(e,t,1),e=Dn(e,t,1),t=it(),e!==null&&(bs(e,1,t),ft(e,t));break}}e=e.return}}function Yw(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=it(),t.pingedLanes|=t.suspendedLanes&n,De===t&&(Fe&n)===n&&(Re===4||Re===3&&(Fe&130023424)===Fe&&500>Ie()-ph?ar(t,0):fh|=n),ft(t,e)}function m_(t,e){e===0&&(t.mode&1?(e=mo,mo<<=1,!(mo&130023424)&&(mo=4194304)):e=1);var n=it();t=hn(t,e),t!==null&&(bs(t,e,n),ft(t,n))}function Xw(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),m_(t,n)}function Jw(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(F(314))}r!==null&&r.delete(e),m_(t,n)}var g_;g_=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||ht.current)ct=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return ct=!1,jw(t,e,n);ct=!!(t.flags&131072)}else ct=!1,fe&&e.flags&1048576&&wg(e,la,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;zo(t,e),t=e.pendingProps;var i=Xr(e,Ze.current);Gr(e,n),i=ah(null,e,r,t,i,n);var s=lh();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,dt(r)?(s=!0,oa(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,nh(e),i.updater=Ua,e.stateNode=i,i._reactInternals=e,Wu(e,r,t,n),e=Qu(null,e,r,!0,s,n)):(e.tag=0,fe&&s&&Kc(e),nt(null,e,i,n),e=e.child),e;case 16:r=e.elementType;e:{switch(zo(t,e),t=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=eE(r),t=Lt(r,t),i){case 0:e=qu(null,e,r,t,n);break e;case 1:e=Jf(null,e,r,t,n);break e;case 11:e=Yf(null,e,r,t,n);break e;case 14:e=Xf(null,e,r,Lt(r.type,t),n);break e}throw Error(F(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Lt(r,i),qu(t,e,r,i,n);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Lt(r,i),Jf(t,e,r,i,n);case 3:e:{if(Zg(e),t===null)throw Error(F(387));r=e.pendingProps,s=e.memoizedState,i=s.element,xg(t,e),ha(e,r,null,n);var a=e.memoizedState;if(r=a.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=ti(Error(F(423)),e),e=Zf(t,e,r,n,i);break e}else if(r!==i){i=ti(Error(F(424)),e),e=Zf(t,e,r,n,i);break e}else for(gt=Vn(e.stateNode.containerInfo.firstChild),vt=e,fe=!0,Ft=null,n=Sg(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Jr(),r===i){e=dn(t,e,n);break e}nt(t,e,r,n)}e=e.child}return e;case 5:return Cg(e),t===null&&Bu(e),r=e.type,i=e.pendingProps,s=t!==null?t.memoizedProps:null,a=i.children,Ou(r,i)?a=null:s!==null&&Ou(r,s)&&(e.flags|=32),Jg(t,e),nt(t,e,a,n),e.child;case 6:return t===null&&Bu(e),null;case 13:return e_(t,e,n);case 4:return rh(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=Zr(e,null,r,n):nt(t,e,r,n),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Lt(r,i),Yf(t,e,r,i,n);case 7:return nt(t,e,e.pendingProps,n),e.child;case 8:return nt(t,e,e.pendingProps.children,n),e.child;case 12:return nt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,s=e.memoizedProps,a=i.value,ue(ua,r._currentValue),r._currentValue=a,s!==null)if(zt(s.value,a)){if(s.children===i.children&&!ht.current){e=dn(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var l=s.dependencies;if(l!==null){a=s.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(s.tag===1){u=an(-1,n&-n),u.tag=2;var h=s.updateQueue;if(h!==null){h=h.shared;var f=h.pending;f===null?u.next=u:(u.next=f.next,f.next=u),h.pending=u}}s.lanes|=n,u=s.alternate,u!==null&&(u.lanes|=n),$u(s.return,n,e),l.lanes|=n;break}u=u.next}}else if(s.tag===10)a=s.type===e.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(F(341));a.lanes|=n,l=a.alternate,l!==null&&(l.lanes|=n),$u(a,n,e),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===e){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}nt(t,e,i.children,n),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,Gr(e,n),i=kt(i),r=r(i),e.flags|=1,nt(t,e,r,n),e.child;case 14:return r=e.type,i=Lt(r,e.pendingProps),i=Lt(r.type,i),Xf(t,e,r,i,n);case 15:return Yg(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Lt(r,i),zo(t,e),e.tag=1,dt(r)?(t=!0,oa(e)):t=!1,Gr(e,n),qg(e,r,i),Wu(e,r,i,n),Qu(null,e,r,!0,t,n);case 19:return t_(t,e,n);case 22:return Xg(t,e,n)}throw Error(F(156,e.tag))};function __(t,e){return Hm(t,e)}function Zw(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ct(t,e,n,r){return new Zw(t,e,n,r)}function yh(t){return t=t.prototype,!(!t||!t.isReactComponent)}function eE(t){if(typeof t=="function")return yh(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Oc)return 11;if(t===Fc)return 14}return 2}function Ln(t,e){var n=t.alternate;return n===null?(n=Ct(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Ho(t,e,n,r,i,s){var a=2;if(r=t,typeof t=="function")yh(t)&&(a=1);else if(typeof t=="string")a=5;else e:switch(t){case Nr:return lr(n.children,i,s,e);case Lc:a=8,i|=8;break;case mu:return t=Ct(12,n,e,i|2),t.elementType=mu,t.lanes=s,t;case gu:return t=Ct(13,n,e,i),t.elementType=gu,t.lanes=s,t;case _u:return t=Ct(19,n,e,i),t.elementType=_u,t.lanes=s,t;case Cm:return $a(n,i,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Am:a=10;break e;case xm:a=9;break e;case Oc:a=11;break e;case Fc:a=14;break e;case En:a=16,r=null;break e}throw Error(F(130,t==null?t:typeof t,""))}return e=Ct(a,n,e,i),e.elementType=t,e.type=r,e.lanes=s,e}function lr(t,e,n,r){return t=Ct(7,t,r,e),t.lanes=n,t}function $a(t,e,n,r){return t=Ct(22,t,r,e),t.elementType=Cm,t.lanes=n,t.stateNode={isHidden:!1},t}function nu(t,e,n){return t=Ct(6,t,null,e),t.lanes=n,t}function ru(t,e,n){return e=Ct(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function tE(t,e,n,r,i){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ol(0),this.expirationTimes=Ol(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ol(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function vh(t,e,n,r,i,s,a,l,u){return t=new tE(t,e,n,l,u),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Ct(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},nh(s),t}function nE(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:kr,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function y_(t){if(!t)return Bn;t=t._reactInternals;e:{if(vr(t)!==t||t.tag!==1)throw Error(F(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(dt(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(F(171))}if(t.tag===1){var n=t.type;if(dt(n))return yg(t,n,e)}return e}function v_(t,e,n,r,i,s,a,l,u){return t=vh(n,r,!0,t,i,s,a,l,u),t.context=y_(null),n=t.current,r=it(),i=Mn(n),s=an(r,i),s.callback=e??null,Dn(n,s,i),t.current.lanes=i,bs(t,i,r),ft(t,r),t}function Ha(t,e,n,r){var i=e.current,s=it(),a=Mn(i);return n=y_(n),e.context===null?e.context=n:e.pendingContext=n,e=an(s,a),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=Dn(i,e,a),t!==null&&(Ut(t,i,a,s),Fo(t,i,a)),a}function va(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function up(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function wh(t,e){up(t,e),(t=t.alternate)&&up(t,e)}function rE(){return null}var w_=typeof reportError=="function"?reportError:function(t){console.error(t)};function Eh(t){this._internalRoot=t}Wa.prototype.render=Eh.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(F(409));Ha(t,e,null,null)};Wa.prototype.unmount=Eh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;pr(function(){Ha(null,t,null,null)}),e[cn]=null}};function Wa(t){this._internalRoot=t}Wa.prototype.unstable_scheduleHydration=function(t){if(t){var e=Xm();t={blockedOn:null,target:t,priority:e};for(var n=0;n<In.length&&e!==0&&e<In[n].priority;n++);In.splice(n,0,t),n===0&&Zm(t)}};function Th(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Ga(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function cp(){}function iE(t,e,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var h=va(a);s.call(h)}}var a=v_(e,r,t,0,null,!1,!1,"",cp);return t._reactRootContainer=a,t[cn]=a.current,gs(t.nodeType===8?t.parentNode:t),pr(),a}for(;i=t.lastChild;)t.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var h=va(u);l.call(h)}}var u=vh(t,0,!1,null,null,!1,!1,"",cp);return t._reactRootContainer=u,t[cn]=u.current,gs(t.nodeType===8?t.parentNode:t),pr(function(){Ha(e,u,n,r)}),u}function qa(t,e,n,r,i){var s=n._reactRootContainer;if(s){var a=s;if(typeof i=="function"){var l=i;i=function(){var u=va(a);l.call(u)}}Ha(e,a,t,i)}else a=iE(n,e,t,i,r);return va(a)}Km=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Bi(e.pendingLanes);n!==0&&(zc(e,n|1),ft(e,Ie()),!(te&6)&&(ni=Ie()+500,Qn()))}break;case 13:pr(function(){var r=hn(t,1);if(r!==null){var i=it();Ut(r,t,1,i)}}),wh(t,1)}};Bc=function(t){if(t.tag===13){var e=hn(t,134217728);if(e!==null){var n=it();Ut(e,t,134217728,n)}wh(t,134217728)}};Ym=function(t){if(t.tag===13){var e=Mn(t),n=hn(t,e);if(n!==null){var r=it();Ut(n,t,e,r)}wh(t,e)}};Xm=function(){return se};Jm=function(t,e){var n=se;try{return se=t,e()}finally{se=n}};Cu=function(t,e,n){switch(e){case"input":if(wu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var i=Oa(r);if(!i)throw Error(F(90));Pm(r),wu(r,i)}}}break;case"textarea":Nm(t,n);break;case"select":e=n.value,e!=null&&Br(t,!!n.multiple,e,!1)}};Fm=mh;jm=pr;var sE={usingClientEntryPoint:!1,Events:[Ls,Mr,Oa,Lm,Om,mh]},Fi={findFiberByHostInstance:rr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},oE={bundleType:Fi.bundleType,version:Fi.version,rendererPackageName:Fi.rendererPackageName,rendererConfig:Fi.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:gn.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Bm(t),t===null?null:t.stateNode},findFiberByHostInstance:Fi.findFiberByHostInstance||rE,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var xo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!xo.isDisabled&&xo.supportsFiber)try{Da=xo.inject(oE),Wt=xo}catch{}}Tt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=sE;Tt.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Th(e))throw Error(F(200));return nE(t,e,null,n)};Tt.createRoot=function(t,e){if(!Th(t))throw Error(F(299));var n=!1,r="",i=w_;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=vh(t,1,!1,null,null,n,!1,r,i),t[cn]=e.current,gs(t.nodeType===8?t.parentNode:t),new Eh(e)};Tt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(F(188)):(t=Object.keys(t).join(","),Error(F(268,t)));return t=Bm(e),t=t===null?null:t.stateNode,t};Tt.flushSync=function(t){return pr(t)};Tt.hydrate=function(t,e,n){if(!Ga(e))throw Error(F(200));return qa(null,t,e,!0,n)};Tt.hydrateRoot=function(t,e,n){if(!Th(t))throw Error(F(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",a=w_;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),e=v_(e,null,t,1,n??null,i,!1,s,a),t[cn]=e.current,gs(t),r)for(t=0;t<r.length;t++)n=r[t],i=n._getVersion,i=i(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,i]:e.mutableSourceEagerHydrationData.push(n,i);return new Wa(e)};Tt.render=function(t,e,n){if(!Ga(e))throw Error(F(200));return qa(null,t,e,!1,n)};Tt.unmountComponentAtNode=function(t){if(!Ga(t))throw Error(F(40));return t._reactRootContainer?(pr(function(){qa(null,null,t,!1,function(){t._reactRootContainer=null,t[cn]=null})}),!0):!1};Tt.unstable_batchedUpdates=mh;Tt.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!Ga(n))throw Error(F(200));if(t==null||t._reactInternals===void 0)throw Error(F(38));return qa(t,e,n,!1,r)};Tt.version="18.3.1-next-f1338f8080-20240426";function E_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(E_)}catch(t){console.error(t)}}E_(),Em.exports=Tt;var aE=Em.exports,hp=aE;fu.createRoot=hp.createRoot,fu.hydrateRoot=hp.hydrateRoot;const lE=({children:t,activeTab:e,onTabChange:n,isAdmin:r,onToggleAdmin:i})=>I.jsxs("div",{className:"layout-container",children:[I.jsx("header",{className:"app-header",children:I.jsxs("div",{className:"header-content",children:[I.jsx("span",{style:{fontSize:"28px"},children:"🏆"}),I.jsx("h1",{children:"WIMBLEDON LIVE"})]})}),I.jsxs("nav",{className:"tab-nav",children:[I.jsx("button",{className:`tab-btn ${e==="match"?"active":""}`,onClick:()=>n("match"),children:"대진표"}),I.jsx("button",{className:`tab-btn ${e==="standings"?"active":""}`,onClick:()=>n("standings"),children:"순위표"})]}),I.jsx("main",{className:"app-main",children:t}),I.jsx("style",{children:`
        .layout-container {
          width: 100%;
          min-height: 100vh;
          background-color: var(--bg-color);
          margin: 0 auto;
        }
        .app-header {
          padding: 1.5rem 2rem;
          background: linear-gradient(180deg, rgba(0,78,50,0.9) 0%, rgba(0,0,0,0) 100%);
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(5px);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .header-content {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .header-content h1 {
          font-size: 1.8rem;
          margin: 0;
          letter-spacing: 1px;
          color: white;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        .tab-nav {
          display: flex;
          gap: 1rem;
        }
        .tab-btn {
          padding: 0.8rem 1.5rem;
          background: rgba(255,255,255,0.05);
          color: #aaa;
          border-radius: 12px;
          border: 1px solid transparent;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .tab-btn.active {
          background: var(--tennis-yellow);
          color: var(--wimbledon-green);
          box-shadow: 0 0 15px rgba(213, 255, 0, 0.3);
          transform: translateY(-2px);
        }
        .app-main {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .app-header {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }
          .tab-nav {
            width: 100%;
          }
          .tab-btn {
            flex: 1;
            text-align: center;
          }
          .app-main {
            padding: 1rem;
          }
          .header-content h1 {
            font-size: 1.5rem;
          }
        }
      `})]});var dp={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const T_=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},uE=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],a=t[n++],l=t[n++],u=((i&7)<<18|(s&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const s=t[n++],a=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},I_={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],a=i+1<t.length,l=a?t[i+1]:0,u=i+2<t.length,h=u?t[i+2]:0,f=s>>2,m=(s&3)<<4|l>>4;let _=(l&15)<<2|h>>6,A=h&63;u||(A=64,a||(_=64)),r.push(n[f],n[m],n[_],n[A])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(T_(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):uE(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],l=i<t.length?n[t.charAt(i)]:0;++i;const h=i<t.length?n[t.charAt(i)]:64;++i;const m=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||l==null||h==null||m==null)throw new cE;const _=s<<2|l>>4;if(r.push(_),h!==64){const A=l<<4&240|h>>2;if(r.push(A),m!==64){const k=h<<6&192|m;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class cE extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const hE=function(t){const e=T_(t);return I_.encodeByteArray(e,!0)},wa=function(t){return hE(t).replace(/\./g,"")},dE=function(t){try{return I_.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fE(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pE=()=>fE().__FIREBASE_DEFAULTS__,mE=()=>{if(typeof process>"u"||typeof dp>"u")return;const t=dp.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},gE=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&dE(t[1]);return e&&JSON.parse(e)},Ih=()=>{try{return pE()||mE()||gE()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},_E=t=>{var e,n;return(n=(e=Ih())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},yE=t=>{const e=_E(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},S_=()=>{var t;return(t=Ih())===null||t===void 0?void 0:t.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vE{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wE(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[wa(JSON.stringify(n)),wa(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function EE(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function TE(){var t;const e=(t=Ih())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function IE(){return!TE()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function SE(){try{return typeof indexedDB=="object"}catch{return!1}}function AE(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xE="FirebaseError";class pi extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=xE,Object.setPrototypeOf(this,pi.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,A_.prototype.create)}}class A_{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],a=s?CE(s,r):"Error",l=`${this.serviceName}: ${a} (${i}).`;return new pi(i,l,r)}}function CE(t,e){return t.replace(RE,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const RE=/\{\$([^}]+)}/g;function oc(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],a=e[i];if(fp(s)&&fp(a)){if(!oc(s,a))return!1}else if(s!==a)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function fp(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kt(t){return t&&t._delegate?t._delegate:t}class As{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PE{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new vE;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(NE(e))try{this.getOrInitializeService({instanceIdentifier:nr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=nr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=nr){return this.instances.has(e)}getOptions(e=nr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(s);r===l&&a.resolve(i)}return i}onInit(e,n){var r;const i=this.normalizeInstanceIdentifier(n),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const a=this.instances.get(i);return a&&e(a,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:kE(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=nr){return this.component?this.component.multipleInstances?e:nr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function kE(t){return t===nr?void 0:t}function NE(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VE{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new PE(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ee;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ee||(ee={}));const DE={debug:ee.DEBUG,verbose:ee.VERBOSE,info:ee.INFO,warn:ee.WARN,error:ee.ERROR,silent:ee.SILENT},bE=ee.INFO,ME={[ee.DEBUG]:"log",[ee.VERBOSE]:"log",[ee.INFO]:"info",[ee.WARN]:"warn",[ee.ERROR]:"error"},LE=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=ME[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class x_{constructor(e){this.name=e,this._logLevel=bE,this._logHandler=LE,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ee))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?DE[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ee.DEBUG,...e),this._logHandler(this,ee.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ee.VERBOSE,...e),this._logHandler(this,ee.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ee.INFO,...e),this._logHandler(this,ee.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ee.WARN,...e),this._logHandler(this,ee.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ee.ERROR,...e),this._logHandler(this,ee.ERROR,...e)}}const OE=(t,e)=>e.some(n=>t instanceof n);let pp,mp;function FE(){return pp||(pp=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function jE(){return mp||(mp=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const C_=new WeakMap,ac=new WeakMap,R_=new WeakMap,iu=new WeakMap,Sh=new WeakMap;function UE(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",a)},s=()=>{n(On(t.result)),i()},a=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",a)});return e.then(n=>{n instanceof IDBCursor&&C_.set(n,t)}).catch(()=>{}),Sh.set(e,t),e}function zE(t){if(ac.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",a),t.removeEventListener("abort",a)},s=()=>{n(),i()},a=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",a),t.addEventListener("abort",a)});ac.set(t,e)}let lc={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return ac.get(t);if(e==="objectStoreNames")return t.objectStoreNames||R_.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return On(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function BE(t){lc=t(lc)}function $E(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(su(this),e,...n);return R_.set(r,e.sort?e.sort():[e]),On(r)}:jE().includes(t)?function(...e){return t.apply(su(this),e),On(C_.get(this))}:function(...e){return On(t.apply(su(this),e))}}function HE(t){return typeof t=="function"?$E(t):(t instanceof IDBTransaction&&zE(t),OE(t,FE())?new Proxy(t,lc):t)}function On(t){if(t instanceof IDBRequest)return UE(t);if(iu.has(t))return iu.get(t);const e=HE(t);return e!==t&&(iu.set(t,e),Sh.set(e,t)),e}const su=t=>Sh.get(t);function WE(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const a=indexedDB.open(t,e),l=On(a);return r&&a.addEventListener("upgradeneeded",u=>{r(On(a.result),u.oldVersion,u.newVersion,On(a.transaction),u)}),n&&a.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),l.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",h=>i(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const GE=["get","getKey","getAll","getAllKeys","count"],qE=["put","add","delete","clear"],ou=new Map;function gp(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(ou.get(e))return ou.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=qE.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||GE.includes(n)))return;const s=async function(a,...l){const u=this.transaction(a,i?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[n](...l),i&&u.done]))[0]};return ou.set(e,s),s}BE(t=>({...t,get:(e,n,r)=>gp(e,n)||t.get(e,n,r),has:(e,n)=>!!gp(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QE{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(KE(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function KE(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const uc="@firebase/app",_p="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fn=new x_("@firebase/app"),YE="@firebase/app-compat",XE="@firebase/analytics-compat",JE="@firebase/analytics",ZE="@firebase/app-check-compat",e1="@firebase/app-check",t1="@firebase/auth",n1="@firebase/auth-compat",r1="@firebase/database",i1="@firebase/data-connect",s1="@firebase/database-compat",o1="@firebase/functions",a1="@firebase/functions-compat",l1="@firebase/installations",u1="@firebase/installations-compat",c1="@firebase/messaging",h1="@firebase/messaging-compat",d1="@firebase/performance",f1="@firebase/performance-compat",p1="@firebase/remote-config",m1="@firebase/remote-config-compat",g1="@firebase/storage",_1="@firebase/storage-compat",y1="@firebase/firestore",v1="@firebase/vertexai-preview",w1="@firebase/firestore-compat",E1="firebase",T1="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cc="[DEFAULT]",I1={[uc]:"fire-core",[YE]:"fire-core-compat",[JE]:"fire-analytics",[XE]:"fire-analytics-compat",[e1]:"fire-app-check",[ZE]:"fire-app-check-compat",[t1]:"fire-auth",[n1]:"fire-auth-compat",[r1]:"fire-rtdb",[i1]:"fire-data-connect",[s1]:"fire-rtdb-compat",[o1]:"fire-fn",[a1]:"fire-fn-compat",[l1]:"fire-iid",[u1]:"fire-iid-compat",[c1]:"fire-fcm",[h1]:"fire-fcm-compat",[d1]:"fire-perf",[f1]:"fire-perf-compat",[p1]:"fire-rc",[m1]:"fire-rc-compat",[g1]:"fire-gcs",[_1]:"fire-gcs-compat",[y1]:"fire-fst",[w1]:"fire-fst-compat",[v1]:"fire-vertex","fire-js":"fire-js",[E1]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ea=new Map,S1=new Map,hc=new Map;function yp(t,e){try{t.container.addComponent(e)}catch(n){fn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Ta(t){const e=t.name;if(hc.has(e))return fn.debug(`There were multiple attempts to register component ${e}.`),!1;hc.set(e,t);for(const n of Ea.values())yp(n,t);for(const n of S1.values())yp(n,t);return!0}function A1(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x1={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Fn=new A_("app","Firebase",x1);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C1{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new As("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Fn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R1=T1;function P_(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:cc,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw Fn.create("bad-app-name",{appName:String(i)});if(n||(n=S_()),!n)throw Fn.create("no-options");const s=Ea.get(i);if(s){if(oc(n,s.options)&&oc(r,s.config))return s;throw Fn.create("duplicate-app",{appName:i})}const a=new VE(i);for(const u of hc.values())a.addComponent(u);const l=new C1(n,r,a);return Ea.set(i,l),l}function P1(t=cc){const e=Ea.get(t);if(!e&&t===cc&&S_())return P_();if(!e)throw Fn.create("no-app",{appName:t});return e}function Qr(t,e,n){var r;let i=(r=I1[t])!==null&&r!==void 0?r:t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),a=e.match(/\s|\//);if(s||a){const l=[`Unable to register library "${i}" with version "${e}":`];s&&l.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&a&&l.push("and"),a&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),fn.warn(l.join(" "));return}Ta(new As(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k1="firebase-heartbeat-database",N1=1,xs="firebase-heartbeat-store";let au=null;function k_(){return au||(au=WE(k1,N1,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(xs)}catch(n){console.warn(n)}}}}).catch(t=>{throw Fn.create("idb-open",{originalErrorMessage:t.message})})),au}async function V1(t){try{const n=(await k_()).transaction(xs),r=await n.objectStore(xs).get(N_(t));return await n.done,r}catch(e){if(e instanceof pi)fn.warn(e.message);else{const n=Fn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});fn.warn(n.message)}}}async function vp(t,e){try{const r=(await k_()).transaction(xs,"readwrite");await r.objectStore(xs).put(e,N_(t)),await r.done}catch(n){if(n instanceof pi)fn.warn(n.message);else{const r=Fn.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});fn.warn(r.message)}}}function N_(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D1=1024,b1=30*24*60*60*1e3;class M1{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new O1(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=wp();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const l=new Date(a.date).valueOf();return Date.now()-l<=b1}),this._storage.overwrite(this._heartbeatsCache))}catch(r){fn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=wp(),{heartbeatsToSend:r,unsentEntries:i}=L1(this._heartbeatsCache.heartbeats),s=wa(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return fn.warn(n),""}}}function wp(){return new Date().toISOString().substring(0,10)}function L1(t,e=D1){const n=[];let r=t.slice();for(const i of t){const s=n.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),Ep(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Ep(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class O1{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return SE()?AE().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await V1(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return vp(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return vp(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Ep(t){return wa(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F1(t){Ta(new As("platform-logger",e=>new QE(e),"PRIVATE")),Ta(new As("heartbeat",e=>new M1(e),"PRIVATE")),Qr(uc,_p,t),Qr(uc,_p,"esm2017"),Qr("fire-js","")}F1("");var j1="firebase",U1="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Qr(j1,U1,"app");var Tp=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ur,V_;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(y,g){function v(){}v.prototype=g.prototype,y.D=g.prototype,y.prototype=new v,y.prototype.constructor=y,y.C=function(T,C,R){for(var E=Array(arguments.length-2),ke=2;ke<arguments.length;ke++)E[ke-2]=arguments[ke];return g.prototype[C].apply(T,E)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(y,g,v){v||(v=0);var T=Array(16);if(typeof g=="string")for(var C=0;16>C;++C)T[C]=g.charCodeAt(v++)|g.charCodeAt(v++)<<8|g.charCodeAt(v++)<<16|g.charCodeAt(v++)<<24;else for(C=0;16>C;++C)T[C]=g[v++]|g[v++]<<8|g[v++]<<16|g[v++]<<24;g=y.g[0],v=y.g[1],C=y.g[2];var R=y.g[3],E=g+(R^v&(C^R))+T[0]+3614090360&4294967295;g=v+(E<<7&4294967295|E>>>25),E=R+(C^g&(v^C))+T[1]+3905402710&4294967295,R=g+(E<<12&4294967295|E>>>20),E=C+(v^R&(g^v))+T[2]+606105819&4294967295,C=R+(E<<17&4294967295|E>>>15),E=v+(g^C&(R^g))+T[3]+3250441966&4294967295,v=C+(E<<22&4294967295|E>>>10),E=g+(R^v&(C^R))+T[4]+4118548399&4294967295,g=v+(E<<7&4294967295|E>>>25),E=R+(C^g&(v^C))+T[5]+1200080426&4294967295,R=g+(E<<12&4294967295|E>>>20),E=C+(v^R&(g^v))+T[6]+2821735955&4294967295,C=R+(E<<17&4294967295|E>>>15),E=v+(g^C&(R^g))+T[7]+4249261313&4294967295,v=C+(E<<22&4294967295|E>>>10),E=g+(R^v&(C^R))+T[8]+1770035416&4294967295,g=v+(E<<7&4294967295|E>>>25),E=R+(C^g&(v^C))+T[9]+2336552879&4294967295,R=g+(E<<12&4294967295|E>>>20),E=C+(v^R&(g^v))+T[10]+4294925233&4294967295,C=R+(E<<17&4294967295|E>>>15),E=v+(g^C&(R^g))+T[11]+2304563134&4294967295,v=C+(E<<22&4294967295|E>>>10),E=g+(R^v&(C^R))+T[12]+1804603682&4294967295,g=v+(E<<7&4294967295|E>>>25),E=R+(C^g&(v^C))+T[13]+4254626195&4294967295,R=g+(E<<12&4294967295|E>>>20),E=C+(v^R&(g^v))+T[14]+2792965006&4294967295,C=R+(E<<17&4294967295|E>>>15),E=v+(g^C&(R^g))+T[15]+1236535329&4294967295,v=C+(E<<22&4294967295|E>>>10),E=g+(C^R&(v^C))+T[1]+4129170786&4294967295,g=v+(E<<5&4294967295|E>>>27),E=R+(v^C&(g^v))+T[6]+3225465664&4294967295,R=g+(E<<9&4294967295|E>>>23),E=C+(g^v&(R^g))+T[11]+643717713&4294967295,C=R+(E<<14&4294967295|E>>>18),E=v+(R^g&(C^R))+T[0]+3921069994&4294967295,v=C+(E<<20&4294967295|E>>>12),E=g+(C^R&(v^C))+T[5]+3593408605&4294967295,g=v+(E<<5&4294967295|E>>>27),E=R+(v^C&(g^v))+T[10]+38016083&4294967295,R=g+(E<<9&4294967295|E>>>23),E=C+(g^v&(R^g))+T[15]+3634488961&4294967295,C=R+(E<<14&4294967295|E>>>18),E=v+(R^g&(C^R))+T[4]+3889429448&4294967295,v=C+(E<<20&4294967295|E>>>12),E=g+(C^R&(v^C))+T[9]+568446438&4294967295,g=v+(E<<5&4294967295|E>>>27),E=R+(v^C&(g^v))+T[14]+3275163606&4294967295,R=g+(E<<9&4294967295|E>>>23),E=C+(g^v&(R^g))+T[3]+4107603335&4294967295,C=R+(E<<14&4294967295|E>>>18),E=v+(R^g&(C^R))+T[8]+1163531501&4294967295,v=C+(E<<20&4294967295|E>>>12),E=g+(C^R&(v^C))+T[13]+2850285829&4294967295,g=v+(E<<5&4294967295|E>>>27),E=R+(v^C&(g^v))+T[2]+4243563512&4294967295,R=g+(E<<9&4294967295|E>>>23),E=C+(g^v&(R^g))+T[7]+1735328473&4294967295,C=R+(E<<14&4294967295|E>>>18),E=v+(R^g&(C^R))+T[12]+2368359562&4294967295,v=C+(E<<20&4294967295|E>>>12),E=g+(v^C^R)+T[5]+4294588738&4294967295,g=v+(E<<4&4294967295|E>>>28),E=R+(g^v^C)+T[8]+2272392833&4294967295,R=g+(E<<11&4294967295|E>>>21),E=C+(R^g^v)+T[11]+1839030562&4294967295,C=R+(E<<16&4294967295|E>>>16),E=v+(C^R^g)+T[14]+4259657740&4294967295,v=C+(E<<23&4294967295|E>>>9),E=g+(v^C^R)+T[1]+2763975236&4294967295,g=v+(E<<4&4294967295|E>>>28),E=R+(g^v^C)+T[4]+1272893353&4294967295,R=g+(E<<11&4294967295|E>>>21),E=C+(R^g^v)+T[7]+4139469664&4294967295,C=R+(E<<16&4294967295|E>>>16),E=v+(C^R^g)+T[10]+3200236656&4294967295,v=C+(E<<23&4294967295|E>>>9),E=g+(v^C^R)+T[13]+681279174&4294967295,g=v+(E<<4&4294967295|E>>>28),E=R+(g^v^C)+T[0]+3936430074&4294967295,R=g+(E<<11&4294967295|E>>>21),E=C+(R^g^v)+T[3]+3572445317&4294967295,C=R+(E<<16&4294967295|E>>>16),E=v+(C^R^g)+T[6]+76029189&4294967295,v=C+(E<<23&4294967295|E>>>9),E=g+(v^C^R)+T[9]+3654602809&4294967295,g=v+(E<<4&4294967295|E>>>28),E=R+(g^v^C)+T[12]+3873151461&4294967295,R=g+(E<<11&4294967295|E>>>21),E=C+(R^g^v)+T[15]+530742520&4294967295,C=R+(E<<16&4294967295|E>>>16),E=v+(C^R^g)+T[2]+3299628645&4294967295,v=C+(E<<23&4294967295|E>>>9),E=g+(C^(v|~R))+T[0]+4096336452&4294967295,g=v+(E<<6&4294967295|E>>>26),E=R+(v^(g|~C))+T[7]+1126891415&4294967295,R=g+(E<<10&4294967295|E>>>22),E=C+(g^(R|~v))+T[14]+2878612391&4294967295,C=R+(E<<15&4294967295|E>>>17),E=v+(R^(C|~g))+T[5]+4237533241&4294967295,v=C+(E<<21&4294967295|E>>>11),E=g+(C^(v|~R))+T[12]+1700485571&4294967295,g=v+(E<<6&4294967295|E>>>26),E=R+(v^(g|~C))+T[3]+2399980690&4294967295,R=g+(E<<10&4294967295|E>>>22),E=C+(g^(R|~v))+T[10]+4293915773&4294967295,C=R+(E<<15&4294967295|E>>>17),E=v+(R^(C|~g))+T[1]+2240044497&4294967295,v=C+(E<<21&4294967295|E>>>11),E=g+(C^(v|~R))+T[8]+1873313359&4294967295,g=v+(E<<6&4294967295|E>>>26),E=R+(v^(g|~C))+T[15]+4264355552&4294967295,R=g+(E<<10&4294967295|E>>>22),E=C+(g^(R|~v))+T[6]+2734768916&4294967295,C=R+(E<<15&4294967295|E>>>17),E=v+(R^(C|~g))+T[13]+1309151649&4294967295,v=C+(E<<21&4294967295|E>>>11),E=g+(C^(v|~R))+T[4]+4149444226&4294967295,g=v+(E<<6&4294967295|E>>>26),E=R+(v^(g|~C))+T[11]+3174756917&4294967295,R=g+(E<<10&4294967295|E>>>22),E=C+(g^(R|~v))+T[2]+718787259&4294967295,C=R+(E<<15&4294967295|E>>>17),E=v+(R^(C|~g))+T[9]+3951481745&4294967295,y.g[0]=y.g[0]+g&4294967295,y.g[1]=y.g[1]+(C+(E<<21&4294967295|E>>>11))&4294967295,y.g[2]=y.g[2]+C&4294967295,y.g[3]=y.g[3]+R&4294967295}r.prototype.u=function(y,g){g===void 0&&(g=y.length);for(var v=g-this.blockSize,T=this.B,C=this.h,R=0;R<g;){if(C==0)for(;R<=v;)i(this,y,R),R+=this.blockSize;if(typeof y=="string"){for(;R<g;)if(T[C++]=y.charCodeAt(R++),C==this.blockSize){i(this,T),C=0;break}}else for(;R<g;)if(T[C++]=y[R++],C==this.blockSize){i(this,T),C=0;break}}this.h=C,this.o+=g},r.prototype.v=function(){var y=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);y[0]=128;for(var g=1;g<y.length-8;++g)y[g]=0;var v=8*this.o;for(g=y.length-8;g<y.length;++g)y[g]=v&255,v/=256;for(this.u(y),y=Array(16),g=v=0;4>g;++g)for(var T=0;32>T;T+=8)y[v++]=this.g[g]>>>T&255;return y};function s(y,g){var v=l;return Object.prototype.hasOwnProperty.call(v,y)?v[y]:v[y]=g(y)}function a(y,g){this.h=g;for(var v=[],T=!0,C=y.length-1;0<=C;C--){var R=y[C]|0;T&&R==g||(v[C]=R,T=!1)}this.g=v}var l={};function u(y){return-128<=y&&128>y?s(y,function(g){return new a([g|0],0>g?-1:0)}):new a([y|0],0>y?-1:0)}function h(y){if(isNaN(y)||!isFinite(y))return m;if(0>y)return b(h(-y));for(var g=[],v=1,T=0;y>=v;T++)g[T]=y/v|0,v*=4294967296;return new a(g,0)}function f(y,g){if(y.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(y.charAt(0)=="-")return b(f(y.substring(1),g));if(0<=y.indexOf("-"))throw Error('number format error: interior "-" character');for(var v=h(Math.pow(g,8)),T=m,C=0;C<y.length;C+=8){var R=Math.min(8,y.length-C),E=parseInt(y.substring(C,C+R),g);8>R?(R=h(Math.pow(g,R)),T=T.j(R).add(h(E))):(T=T.j(v),T=T.add(h(E)))}return T}var m=u(0),_=u(1),A=u(16777216);t=a.prototype,t.m=function(){if(V(this))return-b(this).m();for(var y=0,g=1,v=0;v<this.g.length;v++){var T=this.i(v);y+=(0<=T?T:4294967296+T)*g,g*=4294967296}return y},t.toString=function(y){if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(k(this))return"0";if(V(this))return"-"+b(this).toString(y);for(var g=h(Math.pow(y,6)),v=this,T="";;){var C=D(v,g).g;v=S(v,C.j(g));var R=((0<v.g.length?v.g[0]:v.h)>>>0).toString(y);if(v=C,k(v))return R+T;for(;6>R.length;)R="0"+R;T=R+T}},t.i=function(y){return 0>y?0:y<this.g.length?this.g[y]:this.h};function k(y){if(y.h!=0)return!1;for(var g=0;g<y.g.length;g++)if(y.g[g]!=0)return!1;return!0}function V(y){return y.h==-1}t.l=function(y){return y=S(this,y),V(y)?-1:k(y)?0:1};function b(y){for(var g=y.g.length,v=[],T=0;T<g;T++)v[T]=~y.g[T];return new a(v,~y.h).add(_)}t.abs=function(){return V(this)?b(this):this},t.add=function(y){for(var g=Math.max(this.g.length,y.g.length),v=[],T=0,C=0;C<=g;C++){var R=T+(this.i(C)&65535)+(y.i(C)&65535),E=(R>>>16)+(this.i(C)>>>16)+(y.i(C)>>>16);T=E>>>16,R&=65535,E&=65535,v[C]=E<<16|R}return new a(v,v[v.length-1]&-2147483648?-1:0)};function S(y,g){return y.add(b(g))}t.j=function(y){if(k(this)||k(y))return m;if(V(this))return V(y)?b(this).j(b(y)):b(b(this).j(y));if(V(y))return b(this.j(b(y)));if(0>this.l(A)&&0>y.l(A))return h(this.m()*y.m());for(var g=this.g.length+y.g.length,v=[],T=0;T<2*g;T++)v[T]=0;for(T=0;T<this.g.length;T++)for(var C=0;C<y.g.length;C++){var R=this.i(T)>>>16,E=this.i(T)&65535,ke=y.i(C)>>>16,St=y.i(C)&65535;v[2*T+2*C]+=E*St,w(v,2*T+2*C),v[2*T+2*C+1]+=R*St,w(v,2*T+2*C+1),v[2*T+2*C+1]+=E*ke,w(v,2*T+2*C+1),v[2*T+2*C+2]+=R*ke,w(v,2*T+2*C+2)}for(T=0;T<g;T++)v[T]=v[2*T+1]<<16|v[2*T];for(T=g;T<2*g;T++)v[T]=0;return new a(v,0)};function w(y,g){for(;(y[g]&65535)!=y[g];)y[g+1]+=y[g]>>>16,y[g]&=65535,g++}function x(y,g){this.g=y,this.h=g}function D(y,g){if(k(g))throw Error("division by zero");if(k(y))return new x(m,m);if(V(y))return g=D(b(y),g),new x(b(g.g),b(g.h));if(V(g))return g=D(y,b(g)),new x(b(g.g),g.h);if(30<y.g.length){if(V(y)||V(g))throw Error("slowDivide_ only works with positive integers.");for(var v=_,T=g;0>=T.l(y);)v=U(v),T=U(T);var C=M(v,1),R=M(T,1);for(T=M(T,2),v=M(v,2);!k(T);){var E=R.add(T);0>=E.l(y)&&(C=C.add(v),R=E),T=M(T,1),v=M(v,1)}return g=S(y,C.j(g)),new x(C,g)}for(C=m;0<=y.l(g);){for(v=Math.max(1,Math.floor(y.m()/g.m())),T=Math.ceil(Math.log(v)/Math.LN2),T=48>=T?1:Math.pow(2,T-48),R=h(v),E=R.j(g);V(E)||0<E.l(y);)v-=T,R=h(v),E=R.j(g);k(R)&&(R=_),C=C.add(R),y=S(y,E)}return new x(C,y)}t.A=function(y){return D(this,y).h},t.and=function(y){for(var g=Math.max(this.g.length,y.g.length),v=[],T=0;T<g;T++)v[T]=this.i(T)&y.i(T);return new a(v,this.h&y.h)},t.or=function(y){for(var g=Math.max(this.g.length,y.g.length),v=[],T=0;T<g;T++)v[T]=this.i(T)|y.i(T);return new a(v,this.h|y.h)},t.xor=function(y){for(var g=Math.max(this.g.length,y.g.length),v=[],T=0;T<g;T++)v[T]=this.i(T)^y.i(T);return new a(v,this.h^y.h)};function U(y){for(var g=y.g.length+1,v=[],T=0;T<g;T++)v[T]=y.i(T)<<1|y.i(T-1)>>>31;return new a(v,y.h)}function M(y,g){var v=g>>5;g%=32;for(var T=y.g.length-v,C=[],R=0;R<T;R++)C[R]=0<g?y.i(R+v)>>>g|y.i(R+v+1)<<32-g:y.i(R+v);return new a(C,y.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,V_=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,ur=a}).apply(typeof Tp<"u"?Tp:typeof self<"u"?self:typeof window<"u"?window:{});var Co=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var D_,Hi,b_,Wo,dc,M_,L_,O_;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,c,d){return o==Array.prototype||o==Object.prototype||(o[c]=d.value),o};function n(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Co=="object"&&Co];for(var c=0;c<o.length;++c){var d=o[c];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=n(this);function i(o,c){if(c)e:{var d=r;o=o.split(".");for(var p=0;p<o.length-1;p++){var P=o[p];if(!(P in d))break e;d=d[P]}o=o[o.length-1],p=d[o],c=c(p),c!=p&&c!=null&&e(d,o,{configurable:!0,writable:!0,value:c})}}function s(o,c){o instanceof String&&(o+="");var d=0,p=!1,P={next:function(){if(!p&&d<o.length){var N=d++;return{value:c(N,o[N]),done:!1}}return p=!0,{done:!0,value:void 0}}};return P[Symbol.iterator]=function(){return P},P}i("Array.prototype.values",function(o){return o||function(){return s(this,function(c,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function u(o){var c=typeof o;return c=c!="object"?c:o?Array.isArray(o)?"array":c:"null",c=="array"||c=="object"&&typeof o.length=="number"}function h(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function f(o,c,d){return o.call.apply(o.bind,arguments)}function m(o,c,d){if(!o)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var P=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(P,p),o.apply(c,P)}}return function(){return o.apply(c,arguments)}}function _(o,c,d){return _=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:m,_.apply(null,arguments)}function A(o,c){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function k(o,c){function d(){}d.prototype=c.prototype,o.aa=c.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(p,P,N){for(var j=Array(arguments.length-2),ae=2;ae<arguments.length;ae++)j[ae-2]=arguments[ae];return c.prototype[P].apply(p,j)}}function V(o){const c=o.length;if(0<c){const d=Array(c);for(let p=0;p<c;p++)d[p]=o[p];return d}return[]}function b(o,c){for(let d=1;d<arguments.length;d++){const p=arguments[d];if(u(p)){const P=o.length||0,N=p.length||0;o.length=P+N;for(let j=0;j<N;j++)o[P+j]=p[j]}else o.push(p)}}class S{constructor(c,d){this.i=c,this.j=d,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function w(o){return/^[\s\xa0]*$/.test(o)}function x(){var o=l.navigator;return o&&(o=o.userAgent)?o:""}function D(o){return D[" "](o),o}D[" "]=function(){};var U=x().indexOf("Gecko")!=-1&&!(x().toLowerCase().indexOf("webkit")!=-1&&x().indexOf("Edge")==-1)&&!(x().indexOf("Trident")!=-1||x().indexOf("MSIE")!=-1)&&x().indexOf("Edge")==-1;function M(o,c,d){for(const p in o)c.call(d,o[p],p,o)}function y(o,c){for(const d in o)c.call(void 0,o[d],d,o)}function g(o){const c={};for(const d in o)c[d]=o[d];return c}const v="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function T(o,c){let d,p;for(let P=1;P<arguments.length;P++){p=arguments[P];for(d in p)o[d]=p[d];for(let N=0;N<v.length;N++)d=v[N],Object.prototype.hasOwnProperty.call(p,d)&&(o[d]=p[d])}}function C(o){var c=1;o=o.split(":");const d=[];for(;0<c&&o.length;)d.push(o.shift()),c--;return o.length&&d.push(o.join(":")),d}function R(o){l.setTimeout(()=>{throw o},0)}function E(){var o=G;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class ke{constructor(){this.h=this.g=null}add(c,d){const p=St.get();p.set(c,d),this.h?this.h.next=p:this.g=p,this.h=p}}var St=new S(()=>new Be,o=>o.reset());class Be{constructor(){this.next=this.g=this.h=null}set(c,d){this.h=c,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let at,z=!1,G=new ke,Y=()=>{const o=l.Promise.resolve(void 0);at=()=>{o.then(le)}};var le=()=>{for(var o;o=E();){try{o.h.call(o.g)}catch(d){R(d)}var c=St;c.j(o),100>c.h&&(c.h++,o.next=c.g,c.g=o)}z=!1};function ie(){this.s=this.s,this.C=this.C}ie.prototype.s=!1,ie.prototype.ma=function(){this.s||(this.s=!0,this.N())},ie.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function me(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}me.prototype.h=function(){this.defaultPrevented=!0};var Vt=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};l.addEventListener("test",d,c),l.removeEventListener("test",d,c)}catch{}return o}();function Dt(o,c){if(me.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget){if(U){e:{try{D(c.nodeName);var P=!0;break e}catch{}P=!1}P||(c=null)}}else d=="mouseover"?c=o.fromElement:d=="mouseout"&&(c=o.toElement);this.relatedTarget=c,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:Jt[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Dt.aa.h.call(this)}}k(Dt,me);var Jt={2:"touch",3:"pen",4:"mouse"};Dt.prototype.h=function(){Dt.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Zt="closure_listenable_"+(1e6*Math.random()|0),rv=0;function iv(o,c,d,p,P){this.listener=o,this.proxy=null,this.src=c,this.type=d,this.capture=!!p,this.ha=P,this.key=++rv,this.da=this.fa=!1}function Ws(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Gs(o){this.src=o,this.g={},this.h=0}Gs.prototype.add=function(o,c,d,p,P){var N=o.toString();o=this.g[N],o||(o=this.g[N]=[],this.h++);var j=cl(o,c,p,P);return-1<j?(c=o[j],d||(c.fa=!1)):(c=new iv(c,this.src,N,!!p,P),c.fa=d,o.push(c)),c};function ul(o,c){var d=c.type;if(d in o.g){var p=o.g[d],P=Array.prototype.indexOf.call(p,c,void 0),N;(N=0<=P)&&Array.prototype.splice.call(p,P,1),N&&(Ws(c),o.g[d].length==0&&(delete o.g[d],o.h--))}}function cl(o,c,d,p){for(var P=0;P<o.length;++P){var N=o[P];if(!N.da&&N.listener==c&&N.capture==!!d&&N.ha==p)return P}return-1}var hl="closure_lm_"+(1e6*Math.random()|0),dl={};function rd(o,c,d,p,P){if(Array.isArray(c)){for(var N=0;N<c.length;N++)rd(o,c[N],d,p,P);return null}return d=od(d),o&&o[Zt]?o.K(c,d,h(p)?!!p.capture:!1,P):sv(o,c,d,!1,p,P)}function sv(o,c,d,p,P,N){if(!c)throw Error("Invalid event type");var j=h(P)?!!P.capture:!!P,ae=pl(o);if(ae||(o[hl]=ae=new Gs(o)),d=ae.add(c,d,p,j,N),d.proxy)return d;if(p=ov(),d.proxy=p,p.src=o,p.listener=d,o.addEventListener)Vt||(P=j),P===void 0&&(P=!1),o.addEventListener(c.toString(),p,P);else if(o.attachEvent)o.attachEvent(sd(c.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function ov(){function o(d){return c.call(o.src,o.listener,d)}const c=av;return o}function id(o,c,d,p,P){if(Array.isArray(c))for(var N=0;N<c.length;N++)id(o,c[N],d,p,P);else p=h(p)?!!p.capture:!!p,d=od(d),o&&o[Zt]?(o=o.i,c=String(c).toString(),c in o.g&&(N=o.g[c],d=cl(N,d,p,P),-1<d&&(Ws(N[d]),Array.prototype.splice.call(N,d,1),N.length==0&&(delete o.g[c],o.h--)))):o&&(o=pl(o))&&(c=o.g[c.toString()],o=-1,c&&(o=cl(c,d,p,P)),(d=-1<o?c[o]:null)&&fl(d))}function fl(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[Zt])ul(c.i,o);else{var d=o.type,p=o.proxy;c.removeEventListener?c.removeEventListener(d,p,o.capture):c.detachEvent?c.detachEvent(sd(d),p):c.addListener&&c.removeListener&&c.removeListener(p),(d=pl(c))?(ul(d,o),d.h==0&&(d.src=null,c[hl]=null)):Ws(o)}}}function sd(o){return o in dl?dl[o]:dl[o]="on"+o}function av(o,c){if(o.da)o=!0;else{c=new Dt(c,this);var d=o.listener,p=o.ha||o.src;o.fa&&fl(o),o=d.call(p,c)}return o}function pl(o){return o=o[hl],o instanceof Gs?o:null}var ml="__closure_events_fn_"+(1e9*Math.random()>>>0);function od(o){return typeof o=="function"?o:(o[ml]||(o[ml]=function(c){return o.handleEvent(c)}),o[ml])}function $e(){ie.call(this),this.i=new Gs(this),this.M=this,this.F=null}k($e,ie),$e.prototype[Zt]=!0,$e.prototype.removeEventListener=function(o,c,d,p){id(this,o,c,d,p)};function et(o,c){var d,p=o.F;if(p)for(d=[];p;p=p.F)d.push(p);if(o=o.M,p=c.type||c,typeof c=="string")c=new me(c,o);else if(c instanceof me)c.target=c.target||o;else{var P=c;c=new me(p,o),T(c,P)}if(P=!0,d)for(var N=d.length-1;0<=N;N--){var j=c.g=d[N];P=qs(j,p,!0,c)&&P}if(j=c.g=o,P=qs(j,p,!0,c)&&P,P=qs(j,p,!1,c)&&P,d)for(N=0;N<d.length;N++)j=c.g=d[N],P=qs(j,p,!1,c)&&P}$e.prototype.N=function(){if($e.aa.N.call(this),this.i){var o=this.i,c;for(c in o.g){for(var d=o.g[c],p=0;p<d.length;p++)Ws(d[p]);delete o.g[c],o.h--}}this.F=null},$e.prototype.K=function(o,c,d,p){return this.i.add(String(o),c,!1,d,p)},$e.prototype.L=function(o,c,d,p){return this.i.add(String(o),c,!0,d,p)};function qs(o,c,d,p){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();for(var P=!0,N=0;N<c.length;++N){var j=c[N];if(j&&!j.da&&j.capture==d){var ae=j.listener,be=j.ha||j.src;j.fa&&ul(o.i,j),P=ae.call(be,p)!==!1&&P}}return P&&!p.defaultPrevented}function ad(o,c,d){if(typeof o=="function")d&&(o=_(o,d));else if(o&&typeof o.handleEvent=="function")o=_(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(o,c||0)}function ld(o){o.g=ad(()=>{o.g=null,o.i&&(o.i=!1,ld(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class lv extends ie{constructor(c,d){super(),this.m=c,this.l=d,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:ld(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function yi(o){ie.call(this),this.h=o,this.g={}}k(yi,ie);var ud=[];function cd(o){M(o.g,function(c,d){this.g.hasOwnProperty(d)&&fl(c)},o),o.g={}}yi.prototype.N=function(){yi.aa.N.call(this),cd(this)},yi.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var gl=l.JSON.stringify,uv=l.JSON.parse,cv=class{stringify(o){return l.JSON.stringify(o,void 0)}parse(o){return l.JSON.parse(o,void 0)}};function _l(){}_l.prototype.h=null;function hd(o){return o.h||(o.h=o.i())}function dd(){}var vi={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function yl(){me.call(this,"d")}k(yl,me);function vl(){me.call(this,"c")}k(vl,me);var Yn={},fd=null;function Qs(){return fd=fd||new $e}Yn.La="serverreachability";function pd(o){me.call(this,Yn.La,o)}k(pd,me);function wi(o){const c=Qs();et(c,new pd(c))}Yn.STAT_EVENT="statevent";function md(o,c){me.call(this,Yn.STAT_EVENT,o),this.stat=c}k(md,me);function tt(o){const c=Qs();et(c,new md(c,o))}Yn.Ma="timingevent";function gd(o,c){me.call(this,Yn.Ma,o),this.size=c}k(gd,me);function Ei(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){o()},c)}function Ti(){this.g=!0}Ti.prototype.xa=function(){this.g=!1};function hv(o,c,d,p,P,N){o.info(function(){if(o.g)if(N)for(var j="",ae=N.split("&"),be=0;be<ae.length;be++){var ne=ae[be].split("=");if(1<ne.length){var He=ne[0];ne=ne[1];var We=He.split("_");j=2<=We.length&&We[1]=="type"?j+(He+"="+ne+"&"):j+(He+"=redacted&")}}else j=null;else j=N;return"XMLHTTP REQ ("+p+") [attempt "+P+"]: "+c+`
`+d+`
`+j})}function dv(o,c,d,p,P,N,j){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+P+"]: "+c+`
`+d+`
`+N+" "+j})}function Tr(o,c,d,p){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+pv(o,d)+(p?" "+p:"")})}function fv(o,c){o.info(function(){return"TIMEOUT: "+c})}Ti.prototype.info=function(){};function pv(o,c){if(!o.g)return c;if(!c)return null;try{var d=JSON.parse(c);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var p=d[o];if(!(2>p.length)){var P=p[1];if(Array.isArray(P)&&!(1>P.length)){var N=P[0];if(N!="noop"&&N!="stop"&&N!="close")for(var j=1;j<P.length;j++)P[j]=""}}}}return gl(d)}catch{return c}}var Ks={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},_d={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},wl;function Ys(){}k(Ys,_l),Ys.prototype.g=function(){return new XMLHttpRequest},Ys.prototype.i=function(){return{}},wl=new Ys;function _n(o,c,d,p){this.j=o,this.i=c,this.l=d,this.R=p||1,this.U=new yi(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new yd}function yd(){this.i=null,this.g="",this.h=!1}var vd={},El={};function Tl(o,c,d){o.L=1,o.v=eo(en(c)),o.m=d,o.P=!0,wd(o,null)}function wd(o,c){o.F=Date.now(),Xs(o),o.A=en(o.v);var d=o.A,p=o.R;Array.isArray(p)||(p=[String(p)]),bd(d.i,"t",p),o.C=0,d=o.j.J,o.h=new yd,o.g=Jd(o.j,d?c:null,!o.m),0<o.O&&(o.M=new lv(_(o.Y,o,o.g),o.O)),c=o.U,d=o.g,p=o.ca;var P="readystatechange";Array.isArray(P)||(P&&(ud[0]=P.toString()),P=ud);for(var N=0;N<P.length;N++){var j=rd(d,P[N],p||c.handleEvent,!1,c.h||c);if(!j)break;c.g[j.key]=j}c=o.H?g(o.H):{},o.m?(o.u||(o.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,c)):(o.u="GET",o.g.ea(o.A,o.u,null,c)),wi(),hv(o.i,o.u,o.A,o.l,o.R,o.m)}_n.prototype.ca=function(o){o=o.target;const c=this.M;c&&tn(o)==3?c.j():this.Y(o)},_n.prototype.Y=function(o){try{if(o==this.g)e:{const We=tn(this.g);var c=this.g.Ba();const Ar=this.g.Z();if(!(3>We)&&(We!=3||this.g&&(this.h.h||this.g.oa()||zd(this.g)))){this.J||We!=4||c==7||(c==8||0>=Ar?wi(3):wi(2)),Il(this);var d=this.g.Z();this.X=d;t:if(Ed(this)){var p=zd(this.g);o="";var P=p.length,N=tn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Xn(this),Ii(this);var j="";break t}this.h.i=new l.TextDecoder}for(c=0;c<P;c++)this.h.h=!0,o+=this.h.i.decode(p[c],{stream:!(N&&c==P-1)});p.length=0,this.h.g+=o,this.C=0,j=this.h.g}else j=this.g.oa();if(this.o=d==200,dv(this.i,this.u,this.A,this.l,this.R,We,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ae,be=this.g;if((ae=be.g?be.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!w(ae)){var ne=ae;break t}}ne=null}if(d=ne)Tr(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Sl(this,d);else{this.o=!1,this.s=3,tt(12),Xn(this),Ii(this);break e}}if(this.P){d=!0;let bt;for(;!this.J&&this.C<j.length;)if(bt=mv(this,j),bt==El){We==4&&(this.s=4,tt(14),d=!1),Tr(this.i,this.l,null,"[Incomplete Response]");break}else if(bt==vd){this.s=4,tt(15),Tr(this.i,this.l,j,"[Invalid Chunk]"),d=!1;break}else Tr(this.i,this.l,bt,null),Sl(this,bt);if(Ed(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),We!=4||j.length!=0||this.h.h||(this.s=1,tt(16),d=!1),this.o=this.o&&d,!d)Tr(this.i,this.l,j,"[Invalid Chunked Response]"),Xn(this),Ii(this);else if(0<j.length&&!this.W){this.W=!0;var He=this.j;He.g==this&&He.ba&&!He.M&&(He.j.info("Great, no buffering proxy detected. Bytes received: "+j.length),kl(He),He.M=!0,tt(11))}}else Tr(this.i,this.l,j,null),Sl(this,j);We==4&&Xn(this),this.o&&!this.J&&(We==4?Qd(this.j,this):(this.o=!1,Xs(this)))}else Vv(this.g),d==400&&0<j.indexOf("Unknown SID")?(this.s=3,tt(12)):(this.s=0,tt(13)),Xn(this),Ii(this)}}}catch{}finally{}};function Ed(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function mv(o,c){var d=o.C,p=c.indexOf(`
`,d);return p==-1?El:(d=Number(c.substring(d,p)),isNaN(d)?vd:(p+=1,p+d>c.length?El:(c=c.slice(p,p+d),o.C=p+d,c)))}_n.prototype.cancel=function(){this.J=!0,Xn(this)};function Xs(o){o.S=Date.now()+o.I,Td(o,o.I)}function Td(o,c){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Ei(_(o.ba,o),c)}function Il(o){o.B&&(l.clearTimeout(o.B),o.B=null)}_n.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(fv(this.i,this.A),this.L!=2&&(wi(),tt(17)),Xn(this),this.s=2,Ii(this)):Td(this,this.S-o)};function Ii(o){o.j.G==0||o.J||Qd(o.j,o)}function Xn(o){Il(o);var c=o.M;c&&typeof c.ma=="function"&&c.ma(),o.M=null,cd(o.U),o.g&&(c=o.g,o.g=null,c.abort(),c.ma())}function Sl(o,c){try{var d=o.j;if(d.G!=0&&(d.g==o||Al(d.h,o))){if(!o.K&&Al(d.h,o)&&d.G==3){try{var p=d.Da.g.parse(c)}catch{p=null}if(Array.isArray(p)&&p.length==3){var P=p;if(P[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)oo(d),io(d);else break e;Pl(d),tt(18)}}else d.za=P[1],0<d.za-d.T&&37500>P[2]&&d.F&&d.v==0&&!d.C&&(d.C=Ei(_(d.Za,d),6e3));if(1>=Ad(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Zn(d,11)}else if((o.K||d.g==o)&&oo(d),!w(c))for(P=d.Da.g.parse(c),c=0;c<P.length;c++){let ne=P[c];if(d.T=ne[0],ne=ne[1],d.G==2)if(ne[0]=="c"){d.K=ne[1],d.ia=ne[2];const He=ne[3];He!=null&&(d.la=He,d.j.info("VER="+d.la));const We=ne[4];We!=null&&(d.Aa=We,d.j.info("SVER="+d.Aa));const Ar=ne[5];Ar!=null&&typeof Ar=="number"&&0<Ar&&(p=1.5*Ar,d.L=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const bt=o.g;if(bt){const lo=bt.g?bt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(lo){var N=p.h;N.g||lo.indexOf("spdy")==-1&&lo.indexOf("quic")==-1&&lo.indexOf("h2")==-1||(N.j=N.l,N.g=new Set,N.h&&(xl(N,N.h),N.h=null))}if(p.D){const Nl=bt.g?bt.g.getResponseHeader("X-HTTP-Session-Id"):null;Nl&&(p.ya=Nl,ce(p.I,p.D,Nl))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),p=d;var j=o;if(p.qa=Xd(p,p.J?p.ia:null,p.W),j.K){xd(p.h,j);var ae=j,be=p.L;be&&(ae.I=be),ae.B&&(Il(ae),Xs(ae)),p.g=j}else Gd(p);0<d.i.length&&so(d)}else ne[0]!="stop"&&ne[0]!="close"||Zn(d,7);else d.G==3&&(ne[0]=="stop"||ne[0]=="close"?ne[0]=="stop"?Zn(d,7):Rl(d):ne[0]!="noop"&&d.l&&d.l.ta(ne),d.v=0)}}wi(4)}catch{}}var gv=class{constructor(o,c){this.g=o,this.map=c}};function Id(o){this.l=o||10,l.PerformanceNavigationTiming?(o=l.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Sd(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Ad(o){return o.h?1:o.g?o.g.size:0}function Al(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function xl(o,c){o.g?o.g.add(c):o.h=c}function xd(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}Id.prototype.cancel=function(){if(this.i=Cd(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Cd(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const d of o.g.values())c=c.concat(d.D);return c}return V(o.i)}function _v(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(u(o)){for(var c=[],d=o.length,p=0;p<d;p++)c.push(o[p]);return c}c=[],d=0;for(p in o)c[d++]=o[p];return c}function yv(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(u(o)||typeof o=="string"){var c=[];o=o.length;for(var d=0;d<o;d++)c.push(d);return c}c=[],d=0;for(const p in o)c[d++]=p;return c}}}function Rd(o,c){if(o.forEach&&typeof o.forEach=="function")o.forEach(c,void 0);else if(u(o)||typeof o=="string")Array.prototype.forEach.call(o,c,void 0);else for(var d=yv(o),p=_v(o),P=p.length,N=0;N<P;N++)c.call(void 0,p[N],d&&d[N],o)}var Pd=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function vv(o,c){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var p=o[d].indexOf("="),P=null;if(0<=p){var N=o[d].substring(0,p);P=o[d].substring(p+1)}else N=o[d];c(N,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function Jn(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Jn){this.h=o.h,Js(this,o.j),this.o=o.o,this.g=o.g,Zs(this,o.s),this.l=o.l;var c=o.i,d=new xi;d.i=c.i,c.g&&(d.g=new Map(c.g),d.h=c.h),kd(this,d),this.m=o.m}else o&&(c=String(o).match(Pd))?(this.h=!1,Js(this,c[1]||"",!0),this.o=Si(c[2]||""),this.g=Si(c[3]||"",!0),Zs(this,c[4]),this.l=Si(c[5]||"",!0),kd(this,c[6]||"",!0),this.m=Si(c[7]||"")):(this.h=!1,this.i=new xi(null,this.h))}Jn.prototype.toString=function(){var o=[],c=this.j;c&&o.push(Ai(c,Nd,!0),":");var d=this.g;return(d||c=="file")&&(o.push("//"),(c=this.o)&&o.push(Ai(c,Nd,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(Ai(d,d.charAt(0)=="/"?Tv:Ev,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",Ai(d,Sv)),o.join("")};function en(o){return new Jn(o)}function Js(o,c,d){o.j=d?Si(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function Zs(o,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);o.s=c}else o.s=null}function kd(o,c,d){c instanceof xi?(o.i=c,Av(o.i,o.h)):(d||(c=Ai(c,Iv)),o.i=new xi(c,o.h))}function ce(o,c,d){o.i.set(c,d)}function eo(o){return ce(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function Si(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Ai(o,c,d){return typeof o=="string"?(o=encodeURI(o).replace(c,wv),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function wv(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Nd=/[#\/\?@]/g,Ev=/[#\?:]/g,Tv=/[#\?]/g,Iv=/[#\?@]/g,Sv=/#/g;function xi(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function yn(o){o.g||(o.g=new Map,o.h=0,o.i&&vv(o.i,function(c,d){o.add(decodeURIComponent(c.replace(/\+/g," ")),d)}))}t=xi.prototype,t.add=function(o,c){yn(this),this.i=null,o=Ir(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(c),this.h+=1,this};function Vd(o,c){yn(o),c=Ir(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function Dd(o,c){return yn(o),c=Ir(o,c),o.g.has(c)}t.forEach=function(o,c){yn(this),this.g.forEach(function(d,p){d.forEach(function(P){o.call(c,P,p,this)},this)},this)},t.na=function(){yn(this);const o=Array.from(this.g.values()),c=Array.from(this.g.keys()),d=[];for(let p=0;p<c.length;p++){const P=o[p];for(let N=0;N<P.length;N++)d.push(c[p])}return d},t.V=function(o){yn(this);let c=[];if(typeof o=="string")Dd(this,o)&&(c=c.concat(this.g.get(Ir(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)c=c.concat(o[d])}return c},t.set=function(o,c){return yn(this),this.i=null,o=Ir(this,o),Dd(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},t.get=function(o,c){return o?(o=this.V(o),0<o.length?String(o[0]):c):c};function bd(o,c,d){Vd(o,c),0<d.length&&(o.i=null,o.g.set(Ir(o,c),V(d)),o.h+=d.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(var d=0;d<c.length;d++){var p=c[d];const N=encodeURIComponent(String(p)),j=this.V(p);for(p=0;p<j.length;p++){var P=N;j[p]!==""&&(P+="="+encodeURIComponent(String(j[p]))),o.push(P)}}return this.i=o.join("&")};function Ir(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function Av(o,c){c&&!o.j&&(yn(o),o.i=null,o.g.forEach(function(d,p){var P=p.toLowerCase();p!=P&&(Vd(this,p),bd(this,P,d))},o)),o.j=c}function xv(o,c){const d=new Ti;if(l.Image){const p=new Image;p.onload=A(vn,d,"TestLoadImage: loaded",!0,c,p),p.onerror=A(vn,d,"TestLoadImage: error",!1,c,p),p.onabort=A(vn,d,"TestLoadImage: abort",!1,c,p),p.ontimeout=A(vn,d,"TestLoadImage: timeout",!1,c,p),l.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else c(!1)}function Cv(o,c){const d=new Ti,p=new AbortController,P=setTimeout(()=>{p.abort(),vn(d,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:p.signal}).then(N=>{clearTimeout(P),N.ok?vn(d,"TestPingServer: ok",!0,c):vn(d,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(P),vn(d,"TestPingServer: error",!1,c)})}function vn(o,c,d,p,P){try{P&&(P.onload=null,P.onerror=null,P.onabort=null,P.ontimeout=null),p(d)}catch{}}function Rv(){this.g=new cv}function Pv(o,c,d){const p=d||"";try{Rd(o,function(P,N){let j=P;h(P)&&(j=gl(P)),c.push(p+N+"="+encodeURIComponent(j))})}catch(P){throw c.push(p+"type="+encodeURIComponent("_badmap")),P}}function to(o){this.l=o.Ub||null,this.j=o.eb||!1}k(to,_l),to.prototype.g=function(){return new no(this.l,this.j)},to.prototype.i=function(o){return function(){return o}}({});function no(o,c){$e.call(this),this.D=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(no,$e),t=no.prototype,t.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=c,this.readyState=1,Ri(this)},t.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(c.body=o),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ci(this)),this.readyState=0},t.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Ri(this)),this.g&&(this.readyState=3,Ri(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Md(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function Md(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}t.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?Ci(this):Ri(this),this.readyState==3&&Md(this)}},t.Ra=function(o){this.g&&(this.response=this.responseText=o,Ci(this))},t.Qa=function(o){this.g&&(this.response=o,Ci(this))},t.ga=function(){this.g&&Ci(this)};function Ci(o){o.readyState=4,o.l=null,o.j=null,o.v=null,Ri(o)}t.setRequestHeader=function(o,c){this.u.append(o,c)},t.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var d=c.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=c.next();return o.join(`\r
`)};function Ri(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(no.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Ld(o){let c="";return M(o,function(d,p){c+=p,c+=":",c+=d,c+=`\r
`}),c}function Cl(o,c,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=Ld(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):ce(o,c,d))}function we(o){$e.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(we,$e);var kv=/^https?$/i,Nv=["POST","PUT"];t=we.prototype,t.Ha=function(o){this.J=o},t.ea=function(o,c,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():wl.g(),this.v=this.o?hd(this.o):hd(wl),this.g.onreadystatechange=_(this.Ea,this);try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(N){Od(this,N);return}if(o=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var P in p)d.set(P,p[P]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const N of p.keys())d.set(N,p.get(N));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(N=>N.toLowerCase()=="content-type"),P=l.FormData&&o instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Nv,c,void 0))||p||P||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[N,j]of d)this.g.setRequestHeader(N,j);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ud(this),this.u=!0,this.g.send(o),this.u=!1}catch(N){Od(this,N)}};function Od(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.m=5,Fd(o),ro(o)}function Fd(o){o.A||(o.A=!0,et(o,"complete"),et(o,"error"))}t.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,et(this,"complete"),et(this,"abort"),ro(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ro(this,!0)),we.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?jd(this):this.bb())},t.bb=function(){jd(this)};function jd(o){if(o.h&&typeof a<"u"&&(!o.v[1]||tn(o)!=4||o.Z()!=2)){if(o.u&&tn(o)==4)ad(o.Ea,0,o);else if(et(o,"readystatechange"),tn(o)==4){o.h=!1;try{const j=o.Z();e:switch(j){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var d;if(!(d=c)){var p;if(p=j===0){var P=String(o.D).match(Pd)[1]||null;!P&&l.self&&l.self.location&&(P=l.self.location.protocol.slice(0,-1)),p=!kv.test(P?P.toLowerCase():"")}d=p}if(d)et(o,"complete"),et(o,"success");else{o.m=6;try{var N=2<tn(o)?o.g.statusText:""}catch{N=""}o.l=N+" ["+o.Z()+"]",Fd(o)}}finally{ro(o)}}}}function ro(o,c){if(o.g){Ud(o);const d=o.g,p=o.v[0]?()=>{}:null;o.g=null,o.v=null,c||et(o,"ready");try{d.onreadystatechange=p}catch{}}}function Ud(o){o.I&&(l.clearTimeout(o.I),o.I=null)}t.isActive=function(){return!!this.g};function tn(o){return o.g?o.g.readyState:0}t.Z=function(){try{return 2<tn(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),uv(c)}};function zd(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Vv(o){const c={};o=(o.g&&2<=tn(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(w(o[p]))continue;var d=C(o[p]);const P=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const N=c[P]||[];c[P]=N,N.push(d)}y(c,function(p){return p.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Pi(o,c,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||c}function Bd(o){this.Aa=0,this.i=[],this.j=new Ti,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Pi("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Pi("baseRetryDelayMs",5e3,o),this.cb=Pi("retryDelaySeedMs",1e4,o),this.Wa=Pi("forwardChannelMaxRetries",2,o),this.wa=Pi("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Id(o&&o.concurrentRequestLimit),this.Da=new Rv,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Bd.prototype,t.la=8,t.G=1,t.connect=function(o,c,d,p){tt(0),this.W=o,this.H=c||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.I=Xd(this,null,this.W),so(this)};function Rl(o){if($d(o),o.G==3){var c=o.U++,d=en(o.I);if(ce(d,"SID",o.K),ce(d,"RID",c),ce(d,"TYPE","terminate"),ki(o,d),c=new _n(o,o.j,c),c.L=2,c.v=eo(en(d)),d=!1,l.navigator&&l.navigator.sendBeacon)try{d=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!d&&l.Image&&(new Image().src=c.v,d=!0),d||(c.g=Jd(c.j,null),c.g.ea(c.v)),c.F=Date.now(),Xs(c)}Yd(o)}function io(o){o.g&&(kl(o),o.g.cancel(),o.g=null)}function $d(o){io(o),o.u&&(l.clearTimeout(o.u),o.u=null),oo(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&l.clearTimeout(o.s),o.s=null)}function so(o){if(!Sd(o.h)&&!o.s){o.s=!0;var c=o.Ga;at||Y(),z||(at(),z=!0),G.add(c,o),o.B=0}}function Dv(o,c){return Ad(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=c.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Ei(_(o.Ga,o,c),Kd(o,o.B)),o.B++,!0)}t.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const P=new _n(this,this.j,o);let N=this.o;if(this.S&&(N?(N=g(N),T(N,this.S)):N=this.S),this.m!==null||this.O||(P.H=N,N=null),this.P)e:{for(var c=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(c+=p,4096<c){c=d;break e}if(c===4096||d===this.i.length-1){c=d+1;break e}}c=1e3}else c=1e3;c=Wd(this,P,c),d=en(this.I),ce(d,"RID",o),ce(d,"CVER",22),this.D&&ce(d,"X-HTTP-Session-Id",this.D),ki(this,d),N&&(this.O?c="headers="+encodeURIComponent(String(Ld(N)))+"&"+c:this.m&&Cl(d,this.m,N)),xl(this.h,P),this.Ua&&ce(d,"TYPE","init"),this.P?(ce(d,"$req",c),ce(d,"SID","null"),P.T=!0,Tl(P,d,null)):Tl(P,d,c),this.G=2}}else this.G==3&&(o?Hd(this,o):this.i.length==0||Sd(this.h)||Hd(this))};function Hd(o,c){var d;c?d=c.l:d=o.U++;const p=en(o.I);ce(p,"SID",o.K),ce(p,"RID",d),ce(p,"AID",o.T),ki(o,p),o.m&&o.o&&Cl(p,o.m,o.o),d=new _n(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),c&&(o.i=c.D.concat(o.i)),c=Wd(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),xl(o.h,d),Tl(d,p,c)}function ki(o,c){o.H&&M(o.H,function(d,p){ce(c,p,d)}),o.l&&Rd({},function(d,p){ce(c,p,d)})}function Wd(o,c,d){d=Math.min(o.i.length,d);var p=o.l?_(o.l.Na,o.l,o):null;e:{var P=o.i;let N=-1;for(;;){const j=["count="+d];N==-1?0<d?(N=P[0].g,j.push("ofs="+N)):N=0:j.push("ofs="+N);let ae=!0;for(let be=0;be<d;be++){let ne=P[be].g;const He=P[be].map;if(ne-=N,0>ne)N=Math.max(0,P[be].g-100),ae=!1;else try{Pv(He,j,"req"+ne+"_")}catch{p&&p(He)}}if(ae){p=j.join("&");break e}}}return o=o.i.splice(0,d),c.D=o,p}function Gd(o){if(!o.g&&!o.u){o.Y=1;var c=o.Fa;at||Y(),z||(at(),z=!0),G.add(c,o),o.v=0}}function Pl(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Ei(_(o.Fa,o),Kd(o,o.v)),o.v++,!0)}t.Fa=function(){if(this.u=null,qd(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Ei(_(this.ab,this),o)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,tt(10),io(this),qd(this))};function kl(o){o.A!=null&&(l.clearTimeout(o.A),o.A=null)}function qd(o){o.g=new _n(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var c=en(o.qa);ce(c,"RID","rpc"),ce(c,"SID",o.K),ce(c,"AID",o.T),ce(c,"CI",o.F?"0":"1"),!o.F&&o.ja&&ce(c,"TO",o.ja),ce(c,"TYPE","xmlhttp"),ki(o,c),o.m&&o.o&&Cl(c,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=eo(en(c)),d.m=null,d.P=!0,wd(d,o)}t.Za=function(){this.C!=null&&(this.C=null,io(this),Pl(this),tt(19))};function oo(o){o.C!=null&&(l.clearTimeout(o.C),o.C=null)}function Qd(o,c){var d=null;if(o.g==c){oo(o),kl(o),o.g=null;var p=2}else if(Al(o.h,c))d=c.D,xd(o.h,c),p=1;else return;if(o.G!=0){if(c.o)if(p==1){d=c.m?c.m.length:0,c=Date.now()-c.F;var P=o.B;p=Qs(),et(p,new gd(p,d)),so(o)}else Gd(o);else if(P=c.s,P==3||P==0&&0<c.X||!(p==1&&Dv(o,c)||p==2&&Pl(o)))switch(d&&0<d.length&&(c=o.h,c.i=c.i.concat(d)),P){case 1:Zn(o,5);break;case 4:Zn(o,10);break;case 3:Zn(o,6);break;default:Zn(o,2)}}}function Kd(o,c){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*c}function Zn(o,c){if(o.j.info("Error code "+c),c==2){var d=_(o.fb,o),p=o.Xa;const P=!p;p=new Jn(p||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Js(p,"https"),eo(p),P?xv(p.toString(),d):Cv(p.toString(),d)}else tt(2);o.G=0,o.l&&o.l.sa(c),Yd(o),$d(o)}t.fb=function(o){o?(this.j.info("Successfully pinged google.com"),tt(2)):(this.j.info("Failed to ping google.com"),tt(1))};function Yd(o){if(o.G=0,o.ka=[],o.l){const c=Cd(o.h);(c.length!=0||o.i.length!=0)&&(b(o.ka,c),b(o.ka,o.i),o.h.i.length=0,V(o.i),o.i.length=0),o.l.ra()}}function Xd(o,c,d){var p=d instanceof Jn?en(d):new Jn(d);if(p.g!="")c&&(p.g=c+"."+p.g),Zs(p,p.s);else{var P=l.location;p=P.protocol,c=c?c+"."+P.hostname:P.hostname,P=+P.port;var N=new Jn(null);p&&Js(N,p),c&&(N.g=c),P&&Zs(N,P),d&&(N.l=d),p=N}return d=o.D,c=o.ya,d&&c&&ce(p,d,c),ce(p,"VER",o.la),ki(o,p),p}function Jd(o,c,d){if(c&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Ca&&!o.pa?new we(new to({eb:d})):new we(o.pa),c.Ha(o.J),c}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function Zd(){}t=Zd.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function ao(){}ao.prototype.g=function(o,c){return new pt(o,c)};function pt(o,c){$e.call(this),this.g=new Bd(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(o?o["X-WebChannel-Client-Profile"]=c.va:o={"X-WebChannel-Client-Profile":c.va}),this.g.S=o,(o=c&&c.Sb)&&!w(o)&&(this.g.m=o),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!w(c)&&(this.g.D=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new Sr(this)}k(pt,$e),pt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},pt.prototype.close=function(){Rl(this.g)},pt.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=gl(o),o=d);c.i.push(new gv(c.Ya++,o)),c.G==3&&so(c)},pt.prototype.N=function(){this.g.l=null,delete this.j,Rl(this.g),delete this.g,pt.aa.N.call(this)};function ef(o){yl.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){e:{for(const d in c){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}k(ef,yl);function tf(){vl.call(this),this.status=1}k(tf,vl);function Sr(o){this.g=o}k(Sr,Zd),Sr.prototype.ua=function(){et(this.g,"a")},Sr.prototype.ta=function(o){et(this.g,new ef(o))},Sr.prototype.sa=function(o){et(this.g,new tf)},Sr.prototype.ra=function(){et(this.g,"b")},ao.prototype.createWebChannel=ao.prototype.g,pt.prototype.send=pt.prototype.o,pt.prototype.open=pt.prototype.m,pt.prototype.close=pt.prototype.close,O_=function(){return new ao},L_=function(){return Qs()},M_=Yn,dc={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ks.NO_ERROR=0,Ks.TIMEOUT=8,Ks.HTTP_ERROR=6,Wo=Ks,_d.COMPLETE="complete",b_=_d,dd.EventType=vi,vi.OPEN="a",vi.CLOSE="b",vi.ERROR="c",vi.MESSAGE="d",$e.prototype.listen=$e.prototype.K,Hi=dd,we.prototype.listenOnce=we.prototype.L,we.prototype.getLastError=we.prototype.Ka,we.prototype.getLastErrorCode=we.prototype.Ba,we.prototype.getStatus=we.prototype.Z,we.prototype.getResponseJson=we.prototype.Oa,we.prototype.getResponseText=we.prototype.oa,we.prototype.send=we.prototype.ea,we.prototype.setWithCredentials=we.prototype.Ha,D_=we}).apply(typeof Co<"u"?Co:typeof self<"u"?self:typeof window<"u"?window:{});const Ip="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ke.UNAUTHENTICATED=new Ke(null),Ke.GOOGLE_CREDENTIALS=new Ke("google-credentials-uid"),Ke.FIRST_PARTY=new Ke("first-party-uid"),Ke.MOCK_USER=new Ke("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let mi="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mr=new x_("@firebase/firestore");function ji(){return mr.logLevel}function $(t,...e){if(mr.logLevel<=ee.DEBUG){const n=e.map(Ah);mr.debug(`Firestore (${mi}): ${t}`,...n)}}function pn(t,...e){if(mr.logLevel<=ee.ERROR){const n=e.map(Ah);mr.error(`Firestore (${mi}): ${t}`,...n)}}function ri(t,...e){if(mr.logLevel<=ee.WARN){const n=e.map(Ah);mr.warn(`Firestore (${mi}): ${t}`,...n)}}function Ah(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(t="Unexpected state"){const e=`FIRESTORE (${mi}) INTERNAL ASSERTION FAILED: `+t;throw pn(e),new Error(e)}function oe(t,e){t||q()}function K(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class H extends pi{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jn{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F_{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class z1{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(Ke.UNAUTHENTICATED))}shutdown(){}}class B1{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class $1{constructor(e){this.t=e,this.currentUser=Ke.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){oe(this.o===void 0);let r=this.i;const i=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let s=new jn;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new jn,e.enqueueRetryable(()=>i(this.currentUser))};const a=()=>{const u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},l=u=>{$("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):($("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new jn)}},0),a()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?($("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(oe(typeof r.accessToken=="string"),new F_(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return oe(e===null||typeof e=="string"),new Ke(e)}}class H1{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=Ke.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class W1{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new H1(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(Ke.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class G1{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class q1{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){oe(this.o===void 0);const r=s=>{s.error!=null&&$("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const a=s.token!==this.R;return this.R=s.token,$("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?n(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{$("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):$("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(oe(typeof n.token=="string"),this.R=n.token,new G1(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Q1(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j_{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=Q1(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<n&&(r+=e.charAt(i[s]%e.length))}return r}}function re(t,e){return t<e?-1:t>e?1:0}function ii(t,e,n){return t.length===e.length&&t.every((r,i)=>n(r,e[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new H(L.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new H(L.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new H(L.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new H(L.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Pe.fromMillis(Date.now())}static fromDate(e){return Pe.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new Pe(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?re(this.nanoseconds,e.nanoseconds):re(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q{constructor(e){this.timestamp=e}static fromTimestamp(e){return new Q(e)}static min(){return new Q(new Pe(0,0))}static max(){return new Q(new Pe(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs{constructor(e,n,r){n===void 0?n=0:n>e.length&&q(),r===void 0?r=e.length-n:r>e.length-n&&q(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return Cs.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Cs?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let i=0;i<r;i++){const s=e.get(i),a=n.get(i);if(s<a)return-1;if(s>a)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class pe extends Cs{construct(e,n,r){return new pe(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new H(L.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(i=>i.length>0))}return new pe(n)}static emptyPath(){return new pe([])}}const K1=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Oe extends Cs{construct(e,n,r){return new Oe(e,n,r)}static isValidIdentifier(e){return K1.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Oe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Oe(["__name__"])}static fromServerFormat(e){const n=[];let r="",i=0;const s=()=>{if(r.length===0)throw new H(L.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let a=!1;for(;i<e.length;){const l=e[i];if(l==="\\"){if(i+1===e.length)throw new H(L.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new H(L.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else l==="`"?(a=!a,i++):l!=="."||a?(r+=l,i++):(s(),i++)}if(s(),a)throw new H(L.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Oe(n)}static emptyPath(){return new Oe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{constructor(e){this.path=e}static fromPath(e){return new W(pe.fromString(e))}static fromName(e){return new W(pe.fromString(e).popFirst(5))}static empty(){return new W(pe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&pe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return pe.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new W(new pe(e.slice()))}}function Y1(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,i=Q.fromTimestamp(r===1e9?new Pe(n+1,0):new Pe(n,r));return new $n(i,W.empty(),e)}function X1(t){return new $n(t.readTime,t.key,-1)}class $n{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new $n(Q.min(),W.empty(),-1)}static max(){return new $n(Q.max(),W.empty(),-1)}}function J1(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=W.comparator(t.documentKey,e.documentKey),n!==0?n:re(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z1="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class eT{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fs(t){if(t.code!==L.FAILED_PRECONDITION||t.message!==Z1)throw t;$("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&q(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new O((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(n,s).next(r,i)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof O?n:O.resolve(n)}catch(n){return O.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):O.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):O.reject(n)}static resolve(e){return new O((n,r)=>{n(e)})}static reject(e){return new O((n,r)=>{r(e)})}static waitFor(e){return new O((n,r)=>{let i=0,s=0,a=!1;e.forEach(l=>{++i,l.next(()=>{++s,a&&s===i&&n()},u=>r(u))}),a=!0,s===i&&n()})}static or(e){let n=O.resolve(!1);for(const r of e)n=n.next(i=>i?O.resolve(i):r());return n}static forEach(e,n){const r=[];return e.forEach((i,s)=>{r.push(n.call(this,i,s))}),this.waitFor(r)}static mapArray(e,n){return new O((r,i)=>{const s=e.length,a=new Array(s);let l=0;for(let u=0;u<s;u++){const h=u;n(e[h]).next(f=>{a[h]=f,++l,l===s&&r(a)},f=>i(f))}})}static doWhile(e,n){return new O((r,i)=>{const s=()=>{e()===!0?n().next(()=>{s()},i):r()};s()})}}function tT(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function js(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xh{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}xh.oe=-1;function Qa(t){return t==null}function Ia(t){return t===0&&1/t==-1/0}function nT(t){return typeof t=="number"&&Number.isInteger(t)&&!Ia(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sp(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function wr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function U_(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e,n){this.comparator=e,this.root=n||Le.EMPTY}insert(e,n){return new ve(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Le.BLACK,null,null))}remove(e){return new ve(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Le.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return n+r.left.size;i<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ro(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ro(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ro(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ro(this.root,e,this.comparator,!0)}}class Ro{constructor(e,n,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=n?r(e.key,n):1,n&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Le{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??Le.RED,this.left=i??Le.EMPTY,this.right=s??Le.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,i,s){return new Le(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i.copy(null,n,null,null,null):i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Le.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,i=this;if(n(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),n(e,i.key)===0){if(i.right.isEmpty())return Le.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Le.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Le.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw q();const e=this.left.check();if(e!==this.right.check())throw q();return e+(this.isRed()?0:1)}}Le.EMPTY=null,Le.RED=!0,Le.BLACK=!1;Le.EMPTY=new class{constructor(){this.size=0}get key(){throw q()}get value(){throw q()}get color(){throw q()}get left(){throw q()}get right(){throw q()}copy(e,n,r,i,s){return this}insert(e,n,r){return new Le(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e){this.comparator=e,this.data=new ve(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;n(i.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Ap(this.data.getIterator())}getIteratorFrom(e){return new Ap(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof je)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new je(this.comparator);return n.data=e,n}}class Ap{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(e){this.fields=e,e.sort(Oe.comparator)}static empty(){return new _t([])}unionWith(e){let n=new je(Oe.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new _t(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return ii(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z_ extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new z_("Invalid base64 string: "+s):s}}(e);return new ze(n)}static fromUint8Array(e){const n=function(i){let s="";for(let a=0;a<i.length;++a)s+=String.fromCharCode(i[a]);return s}(e);return new ze(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return re(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ze.EMPTY_BYTE_STRING=new ze("");const rT=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Hn(t){if(oe(!!t),typeof t=="string"){let e=0;const n=rT.exec(t);if(oe(!!n),n[1]){let i=n[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Te(t.seconds),nanos:Te(t.nanos)}}function Te(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function gr(t){return typeof t=="string"?ze.fromBase64String(t):ze.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ch(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function Rh(t){const e=t.mapValue.fields.__previous_value__;return Ch(e)?Rh(e):e}function Rs(t){const e=Hn(t.mapValue.fields.__local_write_time__.timestampValue);return new Pe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iT{constructor(e,n,r,i,s,a,l,u,h){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=h}}class Ps{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new Ps("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Ps&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Po={mapValue:{}};function _r(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Ch(t)?4:oT(t)?9007199254740991:sT(t)?10:11:q()}function Yt(t,e){if(t===e)return!0;const n=_r(t);if(n!==_r(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Rs(t).isEqual(Rs(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const a=Hn(i.timestampValue),l=Hn(s.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(i,s){return gr(i.bytesValue).isEqual(gr(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(i,s){return Te(i.geoPointValue.latitude)===Te(s.geoPointValue.latitude)&&Te(i.geoPointValue.longitude)===Te(s.geoPointValue.longitude)}(t,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return Te(i.integerValue)===Te(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const a=Te(i.doubleValue),l=Te(s.doubleValue);return a===l?Ia(a)===Ia(l):isNaN(a)&&isNaN(l)}return!1}(t,e);case 9:return ii(t.arrayValue.values||[],e.arrayValue.values||[],Yt);case 10:case 11:return function(i,s){const a=i.mapValue.fields||{},l=s.mapValue.fields||{};if(Sp(a)!==Sp(l))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(l[u]===void 0||!Yt(a[u],l[u])))return!1;return!0}(t,e);default:return q()}}function ks(t,e){return(t.values||[]).find(n=>Yt(n,e))!==void 0}function si(t,e){if(t===e)return 0;const n=_r(t),r=_r(e);if(n!==r)return re(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return re(t.booleanValue,e.booleanValue);case 2:return function(s,a){const l=Te(s.integerValue||s.doubleValue),u=Te(a.integerValue||a.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(t,e);case 3:return xp(t.timestampValue,e.timestampValue);case 4:return xp(Rs(t),Rs(e));case 5:return re(t.stringValue,e.stringValue);case 6:return function(s,a){const l=gr(s),u=gr(a);return l.compareTo(u)}(t.bytesValue,e.bytesValue);case 7:return function(s,a){const l=s.split("/"),u=a.split("/");for(let h=0;h<l.length&&h<u.length;h++){const f=re(l[h],u[h]);if(f!==0)return f}return re(l.length,u.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,a){const l=re(Te(s.latitude),Te(a.latitude));return l!==0?l:re(Te(s.longitude),Te(a.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return Cp(t.arrayValue,e.arrayValue);case 10:return function(s,a){var l,u,h,f;const m=s.fields||{},_=a.fields||{},A=(l=m.value)===null||l===void 0?void 0:l.arrayValue,k=(u=_.value)===null||u===void 0?void 0:u.arrayValue,V=re(((h=A==null?void 0:A.values)===null||h===void 0?void 0:h.length)||0,((f=k==null?void 0:k.values)===null||f===void 0?void 0:f.length)||0);return V!==0?V:Cp(A,k)}(t.mapValue,e.mapValue);case 11:return function(s,a){if(s===Po.mapValue&&a===Po.mapValue)return 0;if(s===Po.mapValue)return 1;if(a===Po.mapValue)return-1;const l=s.fields||{},u=Object.keys(l),h=a.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){const _=re(u[m],f[m]);if(_!==0)return _;const A=si(l[u[m]],h[f[m]]);if(A!==0)return A}return re(u.length,f.length)}(t.mapValue,e.mapValue);default:throw q()}}function xp(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return re(t,e);const n=Hn(t),r=Hn(e),i=re(n.seconds,r.seconds);return i!==0?i:re(n.nanos,r.nanos)}function Cp(t,e){const n=t.values||[],r=e.values||[];for(let i=0;i<n.length&&i<r.length;++i){const s=si(n[i],r[i]);if(s)return s}return re(n.length,r.length)}function oi(t){return fc(t)}function fc(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=Hn(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return gr(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return W.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",i=!0;for(const s of n.values||[])i?i=!1:r+=",",r+=fc(s);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let i="{",s=!0;for(const a of r)s?s=!1:i+=",",i+=`${a}:${fc(n.fields[a])}`;return i+"}"}(t.mapValue):q()}function pc(t){return!!t&&"integerValue"in t}function Ph(t){return!!t&&"arrayValue"in t}function Rp(t){return!!t&&"nullValue"in t}function Pp(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Go(t){return!!t&&"mapValue"in t}function sT(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function is(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return wr(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=is(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=is(t.arrayValue.values[n]);return e}return Object.assign({},t)}function oT(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e){this.value=e}static empty(){return new ut({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!Go(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=is(n)}setAll(e){let n=Oe.emptyPath(),r={},i=[];e.forEach((a,l)=>{if(!n.isImmediateParentOf(l)){const u=this.getFieldsMap(n);this.applyChanges(u,r,i),r={},i=[],n=l.popLast()}a?r[l.lastSegment()]=is(a):i.push(l.lastSegment())});const s=this.getFieldsMap(n);this.applyChanges(s,r,i)}delete(e){const n=this.field(e.popLast());Go(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return Yt(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=n.mapValue.fields[e.get(r)];Go(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=i),n=i}return n.mapValue.fields}applyChanges(e,n,r){wr(n,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new ut(is(this.value))}}function B_(t){const e=[];return wr(t.fields,(n,r)=>{const i=new Oe([n]);if(Go(r)){const s=B_(r.mapValue).fields;if(s.length===0)e.push(i);else for(const a of s)e.push(i.child(a))}else e.push(i)}),new _t(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e,n,r,i,s,a,l){this.key=e,this.documentType=n,this.version=r,this.readTime=i,this.createTime=s,this.data=a,this.documentState=l}static newInvalidDocument(e){return new Je(e,0,Q.min(),Q.min(),Q.min(),ut.empty(),0)}static newFoundDocument(e,n,r,i){return new Je(e,1,n,Q.min(),r,i,0)}static newNoDocument(e,n){return new Je(e,2,n,Q.min(),Q.min(),ut.empty(),0)}static newUnknownDocument(e,n){return new Je(e,3,n,Q.min(),Q.min(),ut.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(Q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ut.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ut.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Q.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Je&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Je(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa{constructor(e,n){this.position=e,this.inclusive=n}}function kp(t,e,n){let r=0;for(let i=0;i<t.position.length;i++){const s=e[i],a=t.position[i];if(s.field.isKeyField()?r=W.comparator(W.fromName(a.referenceValue),n.key):r=si(a,n.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Np(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Yt(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Aa{constructor(e,n="asc"){this.field=e,this.dir=n}}function aT(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $_{}class Ce extends $_{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new uT(e,n,r):n==="array-contains"?new dT(e,r):n==="in"?new fT(e,r):n==="not-in"?new pT(e,r):n==="array-contains-any"?new mT(e,r):new Ce(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new cT(e,r):new hT(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(si(n,this.value)):n!==null&&_r(this.value)===_r(n)&&this.matchesComparison(si(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return q()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Xt extends $_{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new Xt(e,n)}matches(e){return H_(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function H_(t){return t.op==="and"}function W_(t){return lT(t)&&H_(t)}function lT(t){for(const e of t.filters)if(e instanceof Xt)return!1;return!0}function mc(t){if(t instanceof Ce)return t.field.canonicalString()+t.op.toString()+oi(t.value);if(W_(t))return t.filters.map(e=>mc(e)).join(",");{const e=t.filters.map(n=>mc(n)).join(",");return`${t.op}(${e})`}}function G_(t,e){return t instanceof Ce?function(r,i){return i instanceof Ce&&r.op===i.op&&r.field.isEqual(i.field)&&Yt(r.value,i.value)}(t,e):t instanceof Xt?function(r,i){return i instanceof Xt&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,a,l)=>s&&G_(a,i.filters[l]),!0):!1}(t,e):void q()}function q_(t){return t instanceof Ce?function(n){return`${n.field.canonicalString()} ${n.op} ${oi(n.value)}`}(t):t instanceof Xt?function(n){return n.op.toString()+" {"+n.getFilters().map(q_).join(" ,")+"}"}(t):"Filter"}class uT extends Ce{constructor(e,n,r){super(e,n,r),this.key=W.fromName(r.referenceValue)}matches(e){const n=W.comparator(e.key,this.key);return this.matchesComparison(n)}}class cT extends Ce{constructor(e,n){super(e,"in",n),this.keys=Q_("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class hT extends Ce{constructor(e,n){super(e,"not-in",n),this.keys=Q_("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function Q_(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>W.fromName(r.referenceValue))}class dT extends Ce{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Ph(n)&&ks(n.arrayValue,this.value)}}class fT extends Ce{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&ks(this.value.arrayValue,n)}}class pT extends Ce{constructor(e,n){super(e,"not-in",n)}matches(e){if(ks(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!ks(this.value.arrayValue,n)}}class mT extends Ce{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Ph(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>ks(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gT{constructor(e,n=null,r=[],i=[],s=null,a=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=a,this.endAt=l,this.ue=null}}function Vp(t,e=null,n=[],r=[],i=null,s=null,a=null){return new gT(t,e,n,r,i,s,a)}function kh(t){const e=K(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>mc(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),Qa(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>oi(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>oi(r)).join(",")),e.ue=n}return e.ue}function Nh(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!aT(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!G_(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Np(t.startAt,e.startAt)&&Np(t.endAt,e.endAt)}function gc(t){return W.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ka{constructor(e,n=null,r=[],i=[],s=null,a="F",l=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=a,this.startAt=l,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function _T(t,e,n,r,i,s,a,l){return new Ka(t,e,n,r,i,s,a,l)}function Vh(t){return new Ka(t)}function Dp(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function yT(t){return t.collectionGroup!==null}function ss(t){const e=K(t);if(e.ce===null){e.ce=[];const n=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),n.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new je(Oe.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(s=>{n.has(s.canonicalString())||s.isKeyField()||e.ce.push(new Aa(s,r))}),n.has(Oe.keyField().canonicalString())||e.ce.push(new Aa(Oe.keyField(),r))}return e.ce}function qt(t){const e=K(t);return e.le||(e.le=vT(e,ss(t))),e.le}function vT(t,e){if(t.limitType==="F")return Vp(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new Aa(i.field,s)});const n=t.endAt?new Sa(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new Sa(t.startAt.position,t.startAt.inclusive):null;return Vp(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function _c(t,e,n){return new Ka(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Ya(t,e){return Nh(qt(t),qt(e))&&t.limitType===e.limitType}function K_(t){return`${kh(qt(t))}|lt:${t.limitType}`}function Cr(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(i=>q_(i)).join(", ")}]`),Qa(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(i=>oi(i)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(i=>oi(i)).join(",")),`Target(${r})`}(qt(t))}; limitType=${t.limitType})`}function Xa(t,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):W.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(t,e)&&function(r,i){for(const s of ss(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(t,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(t,e)&&function(r,i){return!(r.startAt&&!function(a,l,u){const h=kp(a,l,u);return a.inclusive?h<=0:h<0}(r.startAt,ss(r),i)||r.endAt&&!function(a,l,u){const h=kp(a,l,u);return a.inclusive?h>=0:h>0}(r.endAt,ss(r),i))}(t,e)}function wT(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function Y_(t){return(e,n)=>{let r=!1;for(const i of ss(t)){const s=ET(i,e,n);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function ET(t,e,n){const r=t.field.isKeyField()?W.comparator(e.key,n.key):function(s,a,l){const u=a.data.field(s),h=l.data.field(s);return u!==null&&h!==null?si(u,h):q()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return q()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,n]);i.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[n]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){wr(this.inner,(n,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return U_(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TT=new ve(W.comparator);function mn(){return TT}const X_=new ve(W.comparator);function Wi(...t){let e=X_;for(const n of t)e=e.insert(n.key,n);return e}function J_(t){let e=X_;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function or(){return os()}function Z_(){return os()}function os(){return new gi(t=>t.toString(),(t,e)=>t.isEqual(e))}const IT=new ve(W.comparator),ST=new je(W.comparator);function J(...t){let e=ST;for(const n of t)e=e.add(n);return e}const AT=new je(re);function xT(){return AT}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dh(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ia(e)?"-0":e}}function ey(t){return{integerValue:""+t}}function CT(t,e){return nT(e)?ey(e):Dh(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ja{constructor(){this._=void 0}}function RT(t,e,n){return t instanceof xa?function(i,s){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Ch(s)&&(s=Rh(s)),s&&(a.fields.__previous_value__=s),{mapValue:a}}(n,e):t instanceof Ns?ny(t,e):t instanceof Vs?ry(t,e):function(i,s){const a=ty(i,s),l=bp(a)+bp(i.Pe);return pc(a)&&pc(i.Pe)?ey(l):Dh(i.serializer,l)}(t,e)}function PT(t,e,n){return t instanceof Ns?ny(t,e):t instanceof Vs?ry(t,e):n}function ty(t,e){return t instanceof Ca?function(r){return pc(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class xa extends Ja{}class Ns extends Ja{constructor(e){super(),this.elements=e}}function ny(t,e){const n=iy(e);for(const r of t.elements)n.some(i=>Yt(i,r))||n.push(r);return{arrayValue:{values:n}}}class Vs extends Ja{constructor(e){super(),this.elements=e}}function ry(t,e){let n=iy(e);for(const r of t.elements)n=n.filter(i=>!Yt(i,r));return{arrayValue:{values:n}}}class Ca extends Ja{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function bp(t){return Te(t.integerValue||t.doubleValue)}function iy(t){return Ph(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}function kT(t,e){return t.field.isEqual(e.field)&&function(r,i){return r instanceof Ns&&i instanceof Ns||r instanceof Vs&&i instanceof Vs?ii(r.elements,i.elements,Yt):r instanceof Ca&&i instanceof Ca?Yt(r.Pe,i.Pe):r instanceof xa&&i instanceof xa}(t.transform,e.transform)}class NT{constructor(e,n){this.version=e,this.transformResults=n}}class Pt{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Pt}static exists(e){return new Pt(void 0,e)}static updateTime(e){return new Pt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function qo(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Za{}function sy(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new bh(t.key,Pt.none()):new Us(t.key,t.data,Pt.none());{const n=t.data,r=ut.empty();let i=new je(Oe.comparator);for(let s of e.fields)if(!i.has(s)){let a=n.field(s);a===null&&s.length>1&&(s=s.popLast(),a=n.field(s)),a===null?r.delete(s):r.set(s,a),i=i.add(s)}return new Kn(t.key,r,new _t(i.toArray()),Pt.none())}}function VT(t,e,n){t instanceof Us?function(i,s,a){const l=i.value.clone(),u=Lp(i.fieldTransforms,s,a.transformResults);l.setAll(u),s.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(t,e,n):t instanceof Kn?function(i,s,a){if(!qo(i.precondition,s))return void s.convertToUnknownDocument(a.version);const l=Lp(i.fieldTransforms,s,a.transformResults),u=s.data;u.setAll(oy(i)),u.setAll(l),s.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(t,e,n):function(i,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,n)}function as(t,e,n,r){return t instanceof Us?function(s,a,l,u){if(!qo(s.precondition,a))return l;const h=s.value.clone(),f=Op(s.fieldTransforms,u,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null}(t,e,n,r):t instanceof Kn?function(s,a,l,u){if(!qo(s.precondition,a))return l;const h=Op(s.fieldTransforms,u,a),f=a.data;return f.setAll(oy(s)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),l===null?null:l.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(m=>m.field))}(t,e,n,r):function(s,a,l){return qo(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(t,e,n)}function DT(t,e){let n=null;for(const r of t.fieldTransforms){const i=e.data.field(r.field),s=ty(r.transform,i||null);s!=null&&(n===null&&(n=ut.empty()),n.set(r.field,s))}return n||null}function Mp(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&ii(r,i,(s,a)=>kT(s,a))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Us extends Za{constructor(e,n,r,i=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Kn extends Za{constructor(e,n,r,i,s=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function oy(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function Lp(t,e,n){const r=new Map;oe(t.length===n.length);for(let i=0;i<n.length;i++){const s=t[i],a=s.transform,l=e.data.field(s.field);r.set(s.field,PT(a,l,n[i]))}return r}function Op(t,e,n){const r=new Map;for(const i of t){const s=i.transform,a=n.data.field(i.field);r.set(i.field,RT(s,a,e))}return r}class bh extends Za{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class bT extends Za{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MT{constructor(e,n,r,i){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&VT(s,e,r[i])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=as(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=as(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=Z_();return this.mutations.forEach(i=>{const s=e.get(i.key),a=s.overlayedDocument;let l=this.applyToLocalView(a,s.mutatedFields);l=n.has(i.key)?null:l;const u=sy(a,l);u!==null&&r.set(i.key,u),a.isValidDocument()||a.convertToNoDocument(Q.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),J())}isEqual(e){return this.batchId===e.batchId&&ii(this.mutations,e.mutations,(n,r)=>Mp(n,r))&&ii(this.baseMutations,e.baseMutations,(n,r)=>Mp(n,r))}}class Mh{constructor(e,n,r,i){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=i}static from(e,n,r){oe(e.mutations.length===r.length);let i=function(){return IT}();const s=e.mutations;for(let a=0;a<s.length;a++)i=i.insert(s[a].key,r[a].version);return new Mh(e,n,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LT{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OT{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Se,Z;function FT(t){switch(t){default:return q();case L.CANCELLED:case L.UNKNOWN:case L.DEADLINE_EXCEEDED:case L.RESOURCE_EXHAUSTED:case L.INTERNAL:case L.UNAVAILABLE:case L.UNAUTHENTICATED:return!1;case L.INVALID_ARGUMENT:case L.NOT_FOUND:case L.ALREADY_EXISTS:case L.PERMISSION_DENIED:case L.FAILED_PRECONDITION:case L.ABORTED:case L.OUT_OF_RANGE:case L.UNIMPLEMENTED:case L.DATA_LOSS:return!0}}function ay(t){if(t===void 0)return pn("GRPC error has no .code"),L.UNKNOWN;switch(t){case Se.OK:return L.OK;case Se.CANCELLED:return L.CANCELLED;case Se.UNKNOWN:return L.UNKNOWN;case Se.DEADLINE_EXCEEDED:return L.DEADLINE_EXCEEDED;case Se.RESOURCE_EXHAUSTED:return L.RESOURCE_EXHAUSTED;case Se.INTERNAL:return L.INTERNAL;case Se.UNAVAILABLE:return L.UNAVAILABLE;case Se.UNAUTHENTICATED:return L.UNAUTHENTICATED;case Se.INVALID_ARGUMENT:return L.INVALID_ARGUMENT;case Se.NOT_FOUND:return L.NOT_FOUND;case Se.ALREADY_EXISTS:return L.ALREADY_EXISTS;case Se.PERMISSION_DENIED:return L.PERMISSION_DENIED;case Se.FAILED_PRECONDITION:return L.FAILED_PRECONDITION;case Se.ABORTED:return L.ABORTED;case Se.OUT_OF_RANGE:return L.OUT_OF_RANGE;case Se.UNIMPLEMENTED:return L.UNIMPLEMENTED;case Se.DATA_LOSS:return L.DATA_LOSS;default:return q()}}(Z=Se||(Se={}))[Z.OK=0]="OK",Z[Z.CANCELLED=1]="CANCELLED",Z[Z.UNKNOWN=2]="UNKNOWN",Z[Z.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Z[Z.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Z[Z.NOT_FOUND=5]="NOT_FOUND",Z[Z.ALREADY_EXISTS=6]="ALREADY_EXISTS",Z[Z.PERMISSION_DENIED=7]="PERMISSION_DENIED",Z[Z.UNAUTHENTICATED=16]="UNAUTHENTICATED",Z[Z.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Z[Z.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Z[Z.ABORTED=10]="ABORTED",Z[Z.OUT_OF_RANGE=11]="OUT_OF_RANGE",Z[Z.UNIMPLEMENTED=12]="UNIMPLEMENTED",Z[Z.INTERNAL=13]="INTERNAL",Z[Z.UNAVAILABLE=14]="UNAVAILABLE",Z[Z.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jT(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UT=new ur([4294967295,4294967295],0);function Fp(t){const e=jT().encode(t),n=new V_;return n.update(e),new Uint8Array(n.digest())}function jp(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new ur([n,r],0),new ur([i,s],0)]}class Lh{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new Gi(`Invalid padding: ${n}`);if(r<0)throw new Gi(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Gi(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new Gi(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*e.length-n,this.Te=ur.fromNumber(this.Ie)}Ee(e,n,r){let i=e.add(n.multiply(ur.fromNumber(r)));return i.compare(UT)===1&&(i=new ur([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const n=Fp(e),[r,i]=jp(n);for(let s=0;s<this.hashCount;s++){const a=this.Ee(r,i,s);if(!this.de(a))return!1}return!0}static create(e,n,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new Lh(s,i,n);return r.forEach(l=>a.insert(l)),a}insert(e){if(this.Ie===0)return;const n=Fp(e),[r,i]=jp(n);for(let s=0;s<this.hashCount;s++){const a=this.Ee(r,i,s);this.Ae(a)}}Ae(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class Gi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class el{constructor(e,n,r,i,s){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const i=new Map;return i.set(e,zs.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new el(Q.min(),i,new ve(re),mn(),J())}}class zs{constructor(e,n,r,i,s){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new zs(r,n,J(),J(),J())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qo{constructor(e,n,r,i){this.Re=e,this.removedTargetIds=n,this.key=r,this.Ve=i}}class ly{constructor(e,n){this.targetId=e,this.me=n}}class uy{constructor(e,n,r=ze.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=i}}class Up{constructor(){this.fe=0,this.ge=Bp(),this.pe=ze.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=J(),n=J(),r=J();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:n=n.add(i);break;case 1:r=r.add(i);break;default:q()}}),new zs(this.pe,this.ye,e,n,r)}Ce(){this.we=!1,this.ge=Bp()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,oe(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class zT{constructor(e){this.Le=e,this.Be=new Map,this.ke=mn(),this.qe=zp(),this.Qe=new ve(re)}Ke(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(n,e.Ve):this.Ue(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.Ue(n,e.key,e.Ve)}We(e){this.forEachTarget(e,n=>{const r=this.Ge(n);switch(e.state){case 0:this.ze(n)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(e.resumeToken));break;default:q()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((r,i)=>{this.ze(i)&&n(i)})}He(e){const n=e.targetId,r=e.me.count,i=this.Je(n);if(i){const s=i.target;if(gc(s))if(r===0){const a=new W(s.path);this.Ue(n,a,Je.newNoDocument(a,Q.min()))}else oe(r===1);else{const a=this.Ye(n);if(a!==r){const l=this.Ze(e),u=l?this.Xe(l,e,a):1;if(u!==0){this.je(n);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,h)}}}}}Ze(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=n;let a,l;try{a=gr(r).toUint8Array()}catch(u){if(u instanceof z_)return ri("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new Lh(a,i,s)}catch(u){return ri(u instanceof Gi?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.Ie===0?null:l}Xe(e,n,r){return n.me.count===r-this.nt(e,n.targetId)?0:2}nt(e,n){const r=this.Le.getRemoteKeysForTarget(n);let i=0;return r.forEach(s=>{const a=this.Le.tt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(l)||(this.Ue(n,s,null),i++)}),i}rt(e){const n=new Map;this.Be.forEach((s,a)=>{const l=this.Je(a);if(l){if(s.current&&gc(l.target)){const u=new W(l.target.path);this.ke.get(u)!==null||this.it(a,u)||this.Ue(a,u,Je.newNoDocument(u,e))}s.be&&(n.set(a,s.ve()),s.Ce())}});let r=J();this.qe.forEach((s,a)=>{let l=!0;a.forEachWhile(u=>{const h=this.Je(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(s))}),this.ke.forEach((s,a)=>a.setReadTime(e));const i=new el(e,n,this.Qe,this.ke,r);return this.ke=mn(),this.qe=zp(),this.Qe=new ve(re),i}$e(e,n){if(!this.ze(e))return;const r=this.it(e,n.key)?2:0;this.Ge(e).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e))}Ue(e,n,r){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,n)?i.Fe(n,1):i.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(e)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const n=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let n=this.Be.get(e);return n||(n=new Up,this.Be.set(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new je(re),this.qe=this.qe.insert(e,n)),n}ze(e){const n=this.Je(e)!==null;return n||$("WatchChangeAggregator","Detected inactive target",e),n}Je(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Up),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.Ue(e,n,null)})}it(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function zp(){return new ve(W.comparator)}function Bp(){return new ve(W.comparator)}const BT={asc:"ASCENDING",desc:"DESCENDING"},$T={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},HT={and:"AND",or:"OR"};class WT{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function yc(t,e){return t.useProto3Json||Qa(e)?e:{value:e}}function Ra(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function cy(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function GT(t,e){return Ra(t,e.toTimestamp())}function Qt(t){return oe(!!t),Q.fromTimestamp(function(n){const r=Hn(n);return new Pe(r.seconds,r.nanos)}(t))}function Oh(t,e){return vc(t,e).canonicalString()}function vc(t,e){const n=function(i){return new pe(["projects",i.projectId,"databases",i.database])}(t).child("documents");return e===void 0?n:n.child(e)}function hy(t){const e=pe.fromString(t);return oe(gy(e)),e}function wc(t,e){return Oh(t.databaseId,e.path)}function lu(t,e){const n=hy(e);if(n.get(1)!==t.databaseId.projectId)throw new H(L.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new H(L.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new W(fy(n))}function dy(t,e){return Oh(t.databaseId,e)}function qT(t){const e=hy(t);return e.length===4?pe.emptyPath():fy(e)}function Ec(t){return new pe(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function fy(t){return oe(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function $p(t,e,n){return{name:wc(t,e),fields:n.value.mapValue.fields}}function QT(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:q()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(h,f){return h.useProto3Json?(oe(f===void 0||typeof f=="string"),ze.fromBase64String(f||"")):(oe(f===void 0||f instanceof Buffer||f instanceof Uint8Array),ze.fromUint8Array(f||new Uint8Array))}(t,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&function(h){const f=h.code===void 0?L.UNKNOWN:ay(h.code);return new H(f,h.message||"")}(a);n=new uy(r,i,s,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=lu(t,r.document.name),s=Qt(r.document.updateTime),a=r.document.createTime?Qt(r.document.createTime):Q.min(),l=new ut({mapValue:{fields:r.document.fields}}),u=Je.newFoundDocument(i,s,a,l),h=r.targetIds||[],f=r.removedTargetIds||[];n=new Qo(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=lu(t,r.document),s=r.readTime?Qt(r.readTime):Q.min(),a=Je.newNoDocument(i,s),l=r.removedTargetIds||[];n=new Qo([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=lu(t,r.document),s=r.removedTargetIds||[];n=new Qo([],s,i,null)}else{if(!("filter"in e))return q();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,a=new OT(i,s),l=r.targetId;n=new ly(l,a)}}return n}function KT(t,e){let n;if(e instanceof Us)n={update:$p(t,e.key,e.value)};else if(e instanceof bh)n={delete:wc(t,e.key)};else if(e instanceof Kn)n={update:$p(t,e.key,e.data),updateMask:iI(e.fieldMask)};else{if(!(e instanceof bT))return q();n={verify:wc(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(s,a){const l=a.transform;if(l instanceof xa)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Ns)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Vs)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Ca)return{fieldPath:a.field.canonicalString(),increment:l.Pe};throw q()}(0,r))),e.precondition.isNone||(n.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:GT(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:q()}(t,e.precondition)),n}function YT(t,e){return t&&t.length>0?(oe(e!==void 0),t.map(n=>function(i,s){let a=i.updateTime?Qt(i.updateTime):Qt(s);return a.isEqual(Q.min())&&(a=Qt(s)),new NT(a,i.transformResults||[])}(n,e))):[]}function XT(t,e){return{documents:[dy(t,e.path)]}}function JT(t,e){const n={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=dy(t,i);const s=function(h){if(h.length!==0)return my(Xt.create(h,"and"))}(e.filters);s&&(n.structuredQuery.where=s);const a=function(h){if(h.length!==0)return h.map(f=>function(_){return{field:Rr(_.field),direction:tI(_.dir)}}(f))}(e.orderBy);a&&(n.structuredQuery.orderBy=a);const l=yc(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{_t:n,parent:i}}function ZT(t){let e=qT(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){oe(r===1);const f=n.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];n.where&&(s=function(m){const _=py(m);return _ instanceof Xt&&W_(_)?_.getFilters():[_]}(n.where));let a=[];n.orderBy&&(a=function(m){return m.map(_=>function(k){return new Aa(Pr(k.field),function(b){switch(b){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(_))}(n.orderBy));let l=null;n.limit&&(l=function(m){let _;return _=typeof m=="object"?m.value:m,Qa(_)?null:_}(n.limit));let u=null;n.startAt&&(u=function(m){const _=!!m.before,A=m.values||[];return new Sa(A,_)}(n.startAt));let h=null;return n.endAt&&(h=function(m){const _=!m.before,A=m.values||[];return new Sa(A,_)}(n.endAt)),_T(e,i,a,s,l,"F",u,h)}function eI(t,e){const n=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return q()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function py(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=Pr(n.unaryFilter.field);return Ce.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Pr(n.unaryFilter.field);return Ce.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Pr(n.unaryFilter.field);return Ce.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Pr(n.unaryFilter.field);return Ce.create(a,"!=",{nullValue:"NULL_VALUE"});default:return q()}}(t):t.fieldFilter!==void 0?function(n){return Ce.create(Pr(n.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return q()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return Xt.create(n.compositeFilter.filters.map(r=>py(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return q()}}(n.compositeFilter.op))}(t):q()}function tI(t){return BT[t]}function nI(t){return $T[t]}function rI(t){return HT[t]}function Rr(t){return{fieldPath:t.canonicalString()}}function Pr(t){return Oe.fromServerFormat(t.fieldPath)}function my(t){return t instanceof Ce?function(n){if(n.op==="=="){if(Pp(n.value))return{unaryFilter:{field:Rr(n.field),op:"IS_NAN"}};if(Rp(n.value))return{unaryFilter:{field:Rr(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(Pp(n.value))return{unaryFilter:{field:Rr(n.field),op:"IS_NOT_NAN"}};if(Rp(n.value))return{unaryFilter:{field:Rr(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Rr(n.field),op:nI(n.op),value:n.value}}}(t):t instanceof Xt?function(n){const r=n.getFilters().map(i=>my(i));return r.length===1?r[0]:{compositeFilter:{op:rI(n.op),filters:r}}}(t):q()}function iI(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function gy(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn{constructor(e,n,r,i,s=Q.min(),a=Q.min(),l=ze.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new Cn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new Cn(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Cn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Cn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sI{constructor(e){this.ct=e}}function oI(t){const e=ZT({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?_c(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aI{constructor(){this.un=new lI}addToCollectionParentIndex(e,n){return this.un.add(n),O.resolve()}getCollectionParents(e,n){return O.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return O.resolve()}deleteFieldIndex(e,n){return O.resolve()}deleteAllFieldIndexes(e){return O.resolve()}createTargetIndexes(e,n){return O.resolve()}getDocumentsMatchingTarget(e,n){return O.resolve(null)}getIndexType(e,n){return O.resolve(0)}getFieldIndexes(e,n){return O.resolve([])}getNextCollectionGroupToUpdate(e){return O.resolve(null)}getMinOffset(e,n){return O.resolve($n.min())}getMinOffsetFromCollectionGroup(e,n){return O.resolve($n.min())}updateCollectionGroup(e,n,r){return O.resolve()}updateIndexEntries(e,n){return O.resolve()}}class lI{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n]||new je(pe.comparator),s=!i.has(r);return this.index[n]=i.add(r),s}has(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n];return i&&i.has(r)}getEntries(e){return(this.index[e]||new je(pe.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ai{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new ai(0)}static kn(){return new ai(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uI{constructor(){this.changes=new gi(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,Je.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?O.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cI{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hI{constructor(e,n,r,i){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,n))).next(i=>(r!==null&&as(r.mutation,i,_t.empty(),Pe.now()),i))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,J()).next(()=>r))}getLocalViewOfDocuments(e,n,r=J()){const i=or();return this.populateOverlays(e,i,n).next(()=>this.computeViews(e,n,i,r).next(s=>{let a=Wi();return s.forEach((l,u)=>{a=a.insert(l,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,n){const r=or();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,J()))}populateOverlays(e,n,r){const i=[];return r.forEach(s=>{n.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((a,l)=>{n.set(a,l)})})}computeViews(e,n,r,i){let s=mn();const a=os(),l=function(){return os()}();return n.forEach((u,h)=>{const f=r.get(h.key);i.has(h.key)&&(f===void 0||f.mutation instanceof Kn)?s=s.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),as(f.mutation,h,f.mutation.getFieldMask(),Pe.now())):a.set(h.key,_t.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((h,f)=>a.set(h,f)),n.forEach((h,f)=>{var m;return l.set(h,new cI(f,(m=a.get(h))!==null&&m!==void 0?m:null))}),l))}recalculateAndSaveOverlays(e,n){const r=os();let i=new ve((a,l)=>a-l),s=J();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(a=>{for(const l of a)l.keys().forEach(u=>{const h=n.get(u);if(h===null)return;let f=r.get(u)||_t.empty();f=l.applyToLocalView(h,f),r.set(u,f);const m=(i.get(l.batchId)||J()).add(u);i=i.insert(l.batchId,m)})}).next(()=>{const a=[],l=i.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),h=u.key,f=u.value,m=Z_();f.forEach(_=>{if(!s.has(_)){const A=sy(n.get(_),r.get(_));A!==null&&m.set(_,A),s=s.add(_)}}),a.push(this.documentOverlayCache.saveOverlays(e,h,m))}return O.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,i){return function(a){return W.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):yT(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,i):this.getDocumentsMatchingCollectionQuery(e,n,r,i)}getNextDocuments(e,n,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,i).next(s=>{const a=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,i-s.size):O.resolve(or());let l=-1,u=s;return a.next(h=>O.forEach(h,(f,m)=>(l<m.largestBatchId&&(l=m.largestBatchId),s.get(f)?O.resolve():this.remoteDocumentCache.getEntry(e,f).next(_=>{u=u.insert(f,_)}))).next(()=>this.populateOverlays(e,h,s)).next(()=>this.computeViews(e,u,h,J())).next(f=>({batchId:l,changes:J_(f)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new W(n)).next(r=>{let i=Wi();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,n,r,i){const s=n.collectionGroup;let a=Wi();return this.indexManager.getCollectionParents(e,s).next(l=>O.forEach(l,u=>{const h=function(m,_){return new Ka(_,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(n,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,h,r,i).next(f=>{f.forEach((m,_)=>{a=a.insert(m,_)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,n,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,s,i))).next(a=>{s.forEach((u,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,Je.newInvalidDocument(f)))});let l=Wi();return a.forEach((u,h)=>{const f=s.get(u);f!==void 0&&as(f.mutation,h,_t.empty(),Pe.now()),Xa(n,h)&&(l=l.insert(u,h))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dI{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return O.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(i){return{id:i.id,version:i.version,createTime:Qt(i.createTime)}}(n)),O.resolve()}getNamedQuery(e,n){return O.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(i){return{name:i.name,query:oI(i.bundledQuery),readTime:Qt(i.readTime)}}(n)),O.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fI{constructor(){this.overlays=new ve(W.comparator),this.Ir=new Map}getOverlay(e,n){return O.resolve(this.overlays.get(n))}getOverlays(e,n){const r=or();return O.forEach(n,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((i,s)=>{this.ht(e,n,s)}),O.resolve()}removeOverlaysForBatchId(e,n,r){const i=this.Ir.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Ir.delete(r)),O.resolve()}getOverlaysForCollection(e,n,r){const i=or(),s=n.length+1,a=new W(n.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const u=l.getNext().value,h=u.getKey();if(!n.isPrefixOf(h.path))break;h.path.length===s&&u.largestBatchId>r&&i.set(u.getKey(),u)}return O.resolve(i)}getOverlaysForCollectionGroup(e,n,r,i){let s=new ve((h,f)=>h-f);const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===n&&h.largestBatchId>r){let f=s.get(h.largestBatchId);f===null&&(f=or(),s=s.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const l=or(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,f)=>l.set(h,f)),!(l.size()>=i)););return O.resolve(l)}ht(e,n,r){const i=this.overlays.get(r.key);if(i!==null){const a=this.Ir.get(i.largestBatchId).delete(r.key);this.Ir.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new LT(n,r));let s=this.Ir.get(n);s===void 0&&(s=J(),this.Ir.set(n,s)),this.Ir.set(n,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pI{constructor(){this.sessionToken=ze.EMPTY_BYTE_STRING}getSessionToken(e){return O.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,O.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fh{constructor(){this.Tr=new je(Ne.Er),this.dr=new je(Ne.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const r=new Ne(e,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Vr(new Ne(e,n))}mr(e,n){e.forEach(r=>this.removeReference(r,n))}gr(e){const n=new W(new pe([])),r=new Ne(n,e),i=new Ne(n,e+1),s=[];return this.dr.forEachInRange([r,i],a=>{this.Vr(a),s.push(a.key)}),s}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new W(new pe([])),r=new Ne(n,e),i=new Ne(n,e+1);let s=J();return this.dr.forEachInRange([r,i],a=>{s=s.add(a.key)}),s}containsKey(e){const n=new Ne(e,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class Ne{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return W.comparator(e.key,n.key)||re(e.wr,n.wr)}static Ar(e,n){return re(e.wr,n.wr)||W.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mI{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new je(Ne.Er)}checkEmpty(e){return O.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new MT(s,n,r,i);this.mutationQueue.push(a);for(const l of i)this.br=this.br.add(new Ne(l.key,s)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return O.resolve(a)}lookupMutationBatch(e,n){return O.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,i=this.vr(r),s=i<0?0:i;return O.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return O.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return O.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new Ne(n,0),i=new Ne(n,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([r,i],a=>{const l=this.Dr(a.wr);s.push(l)}),O.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new je(re);return n.forEach(i=>{const s=new Ne(i,0),a=new Ne(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,a],l=>{r=r.add(l.wr)})}),O.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,i=r.length+1;let s=r;W.isDocumentKey(s)||(s=s.child(""));const a=new Ne(new W(s),0);let l=new je(re);return this.br.forEachWhile(u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===i&&(l=l.add(u.wr)),!0)},a),O.resolve(this.Cr(l))}Cr(e){const n=[];return e.forEach(r=>{const i=this.Dr(r);i!==null&&n.push(i)}),n}removeMutationBatch(e,n){oe(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return O.forEach(n.mutations,i=>{const s=new Ne(i.key,n.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,n){const r=new Ne(n,0),i=this.br.firstAfterOrEqual(r);return O.resolve(n.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,O.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gI{constructor(e){this.Mr=e,this.docs=function(){return new ve(W.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,i=this.docs.get(r),s=i?i.size:0,a=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return O.resolve(r?r.document.mutableCopy():Je.newInvalidDocument(n))}getEntries(e,n){let r=mn();return n.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():Je.newInvalidDocument(i))}),O.resolve(r)}getDocumentsMatchingQuery(e,n,r,i){let s=mn();const a=n.path,l=new W(a.child("")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||J1(X1(f),r)<=0||(i.has(f.key)||Xa(n,f))&&(s=s.insert(f.key,f.mutableCopy()))}return O.resolve(s)}getAllFromCollectionGroup(e,n,r,i){q()}Or(e,n){return O.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new _I(this)}getSize(e){return O.resolve(this.size)}}class _I extends uI{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?n.push(this.cr.addEntry(e,i)):this.cr.removeEntry(r)}),O.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yI{constructor(e){this.persistence=e,this.Nr=new gi(n=>kh(n),Nh),this.lastRemoteSnapshotVersion=Q.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Fh,this.targetCount=0,this.kr=ai.Bn()}forEachTarget(e,n){return this.Nr.forEach((r,i)=>n(i)),O.resolve()}getLastRemoteSnapshotVersion(e){return O.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return O.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),O.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),O.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new ai(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,O.resolve()}updateTargetData(e,n){return this.Kn(n),O.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,O.resolve()}removeTargets(e,n,r){let i=0;const s=[];return this.Nr.forEach((a,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.Nr.delete(a),s.push(this.removeMatchingKeysForTargetId(e,l.targetId)),i++)}),O.waitFor(s).next(()=>i)}getTargetCount(e){return O.resolve(this.targetCount)}getTargetData(e,n){const r=this.Nr.get(n)||null;return O.resolve(r)}addMatchingKeys(e,n,r){return this.Br.Rr(n,r),O.resolve()}removeMatchingKeys(e,n,r){this.Br.mr(n,r);const i=this.persistence.referenceDelegate,s=[];return i&&n.forEach(a=>{s.push(i.markPotentiallyOrphaned(e,a))}),O.waitFor(s)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),O.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Br.yr(n);return O.resolve(r)}containsKey(e,n){return O.resolve(this.Br.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vI{constructor(e,n){this.qr={},this.overlays={},this.Qr=new xh(0),this.Kr=!1,this.Kr=!0,this.$r=new pI,this.referenceDelegate=e(this),this.Ur=new yI(this),this.indexManager=new aI,this.remoteDocumentCache=function(i){return new gI(i)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new sI(n),this.Gr=new dI(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new fI,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.qr[e.toKey()];return r||(r=new mI(n,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,r){$("MemoryPersistence","Starting transaction:",e);const i=new wI(this.Qr.next());return this.referenceDelegate.zr(),r(i).next(s=>this.referenceDelegate.jr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Hr(e,n){return O.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,n)))}}class wI extends eT{constructor(e){super(),this.currentSequenceNumber=e}}class jh{constructor(e){this.persistence=e,this.Jr=new Fh,this.Yr=null}static Zr(e){return new jh(e)}get Xr(){if(this.Yr)return this.Yr;throw q()}addReference(e,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),O.resolve()}removeReference(e,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),O.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),O.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(i=>this.Xr.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(i=>{i.forEach(s=>this.Xr.add(s.toString()))}).next(()=>r.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return O.forEach(this.Xr,r=>{const i=W.fromPath(r);return this.ei(e,i).next(s=>{s||n.removeEntry(i,Q.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return O.or([()=>O.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uh{constructor(e,n,r,i){this.targetId=e,this.fromCache=n,this.$i=r,this.Ui=i}static Wi(e,n){let r=J(),i=J();for(const s of n.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new Uh(e,n.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EI{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TI{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return IE()?8:tT(EE())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,r,i){const s={result:null};return this.Yi(e,n).next(a=>{s.result=a}).next(()=>{if(!s.result)return this.Zi(e,n,i,r).next(a=>{s.result=a})}).next(()=>{if(s.result)return;const a=new EI;return this.Xi(e,n,a).next(l=>{if(s.result=l,this.zi)return this.es(e,n,a,l.size)})}).next(()=>s.result)}es(e,n,r,i){return r.documentReadCount<this.ji?(ji()<=ee.DEBUG&&$("QueryEngine","SDK will not create cache indexes for query:",Cr(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),O.resolve()):(ji()<=ee.DEBUG&&$("QueryEngine","Query:",Cr(n),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Hi*i?(ji()<=ee.DEBUG&&$("QueryEngine","The SDK decides to create cache indexes for query:",Cr(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,qt(n))):O.resolve())}Yi(e,n){if(Dp(n))return O.resolve(null);let r=qt(n);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(n.limit!==null&&i===1&&(n=_c(n,null,"F"),r=qt(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const a=J(...s);return this.Ji.getDocuments(e,a).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const h=this.ts(n,l);return this.ns(n,h,a,u.readTime)?this.Yi(e,_c(n,null,"F")):this.rs(e,h,n,u)}))})))}Zi(e,n,r,i){return Dp(n)||i.isEqual(Q.min())?O.resolve(null):this.Ji.getDocuments(e,r).next(s=>{const a=this.ts(n,s);return this.ns(n,a,r,i)?O.resolve(null):(ji()<=ee.DEBUG&&$("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Cr(n)),this.rs(e,a,n,Y1(i,-1)).next(l=>l))})}ts(e,n){let r=new je(Y_(e));return n.forEach((i,s)=>{Xa(e,s)&&(r=r.add(s))}),r}ns(e,n,r,i){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const s=e.limitType==="F"?n.last():n.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,n,r){return ji()<=ee.DEBUG&&$("QueryEngine","Using full collection scan to execute query:",Cr(n)),this.Ji.getDocumentsMatchingQuery(e,n,$n.min(),r)}rs(e,n,r,i){return this.Ji.getDocumentsMatchingQuery(e,r,i).next(s=>(n.forEach(a=>{s=s.insert(a.key,a)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class II{constructor(e,n,r,i){this.persistence=e,this.ss=n,this.serializer=i,this.os=new ve(re),this._s=new gi(s=>kh(s),Nh),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new hI(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function SI(t,e,n,r){return new II(t,e,n,r)}async function _y(t,e){const n=K(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let i;return n.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,n.ls(e),n.mutationQueue.getAllMutationBatches(r))).next(s=>{const a=[],l=[];let u=J();for(const h of i){a.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of s){l.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return n.localDocuments.getDocuments(r,u).next(h=>({hs:h,removedBatchIds:a,addedBatchIds:l}))})})}function AI(t,e){const n=K(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=n.cs.newChangeBuffer({trackRemovals:!0});return function(l,u,h,f){const m=h.batch,_=m.keys();let A=O.resolve();return _.forEach(k=>{A=A.next(()=>f.getEntry(u,k)).next(V=>{const b=h.docVersions.get(k);oe(b!==null),V.version.compareTo(b)<0&&(m.applyToRemoteDocument(V,h),V.isValidDocument()&&(V.setReadTime(h.commitVersion),f.addEntry(V)))})}),A.next(()=>l.mutationQueue.removeMutationBatch(u,m))}(n,r,e,s).next(()=>s.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=J();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(u=u.add(l.batch.mutations[h].key));return u}(e))).next(()=>n.localDocuments.getDocuments(r,i))})}function yy(t){const e=K(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function xI(t,e){const n=K(t),r=e.snapshotVersion;let i=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const a=n.cs.newChangeBuffer({trackRemovals:!0});i=n.os;const l=[];e.targetChanges.forEach((f,m)=>{const _=i.get(m);if(!_)return;l.push(n.Ur.removeMatchingKeys(s,f.removedDocuments,m).next(()=>n.Ur.addMatchingKeys(s,f.addedDocuments,m)));let A=_.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(m)!==null?A=A.withResumeToken(ze.EMPTY_BYTE_STRING,Q.min()).withLastLimboFreeSnapshotVersion(Q.min()):f.resumeToken.approximateByteSize()>0&&(A=A.withResumeToken(f.resumeToken,r)),i=i.insert(m,A),function(V,b,S){return V.resumeToken.approximateByteSize()===0||b.snapshotVersion.toMicroseconds()-V.snapshotVersion.toMicroseconds()>=3e8?!0:S.addedDocuments.size+S.modifiedDocuments.size+S.removedDocuments.size>0}(_,A,f)&&l.push(n.Ur.updateTargetData(s,A))});let u=mn(),h=J();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(s,f))}),l.push(CI(s,a,e.documentUpdates).next(f=>{u=f.Ps,h=f.Is})),!r.isEqual(Q.min())){const f=n.Ur.getLastRemoteSnapshotVersion(s).next(m=>n.Ur.setTargetsMetadata(s,s.currentSequenceNumber,r));l.push(f)}return O.waitFor(l).next(()=>a.apply(s)).next(()=>n.localDocuments.getLocalViewOfDocuments(s,u,h)).next(()=>u)}).then(s=>(n.os=i,s))}function CI(t,e,n){let r=J(),i=J();return n.forEach(s=>r=r.add(s)),e.getEntries(t,r).next(s=>{let a=mn();return n.forEach((l,u)=>{const h=s.get(l);u.isFoundDocument()!==h.isFoundDocument()&&(i=i.add(l)),u.isNoDocument()&&u.version.isEqual(Q.min())?(e.removeEntry(l,u.readTime),a=a.insert(l,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),a=a.insert(l,u)):$("LocalStore","Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",u.version)}),{Ps:a,Is:i}})}function RI(t,e){const n=K(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function PI(t,e){const n=K(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return n.Ur.getTargetData(r,e).next(s=>s?(i=s,O.resolve(i)):n.Ur.allocateTargetId(r).next(a=>(i=new Cn(e,a,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=n.os.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(e,r.targetId)),r})}async function Tc(t,e,n){const r=K(t),i=r.os.get(e),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!js(a))throw a;$("LocalStore",`Failed to update sequence numbers for target ${e}: ${a}`)}r.os=r.os.remove(e),r._s.delete(i.target)}function Hp(t,e,n){const r=K(t);let i=Q.min(),s=J();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,h,f){const m=K(u),_=m._s.get(f);return _!==void 0?O.resolve(m.os.get(_)):m.Ur.getTargetData(h,f)}(r,a,qt(e)).next(l=>{if(l)return i=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(a,l.targetId).next(u=>{s=u})}).next(()=>r.ss.getDocumentsMatchingQuery(a,e,n?i:Q.min(),n?s:J())).next(l=>(kI(r,wT(e),l),{documents:l,Ts:s})))}function kI(t,e,n){let r=t.us.get(e)||Q.min();n.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),t.us.set(e,r)}class Wp{constructor(){this.activeTargetIds=xT()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class NI{constructor(){this.so=new Wp,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,r){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Wp,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VI{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gp{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){$("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){$("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ko=null;function uu(){return ko===null?ko=function(){return 268435456+Math.round(2147483648*Math.random())}():ko++,"0x"+ko.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DI={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bI{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qe="WebChannelConnection";class MI extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(n,r,i,s,a){const l=uu(),u=this.xo(n,r.toUriEncodedString());$("RestConnection",`Sending RPC '${n}' ${l}:`,u,i);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,s,a),this.No(n,u,h,i).then(f=>($("RestConnection",`Received RPC '${n}' ${l}: `,f),f),f=>{throw ri("RestConnection",`RPC '${n}' ${l} failed with error: `,f,"url: ",u,"request:",i),f})}Lo(n,r,i,s,a,l){return this.Mo(n,r,i,s,a)}Oo(n,r,i){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+mi}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,a)=>n[a]=s),i&&i.headers.forEach((s,a)=>n[a]=s)}xo(n,r){const i=DI[n];return`${this.Do}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,r,i){const s=uu();return new Promise((a,l)=>{const u=new D_;u.setWithCredentials(!0),u.listenOnce(b_.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case Wo.NO_ERROR:const f=u.getResponseJson();$(Qe,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(f)),a(f);break;case Wo.TIMEOUT:$(Qe,`RPC '${e}' ${s} timed out`),l(new H(L.DEADLINE_EXCEEDED,"Request time out"));break;case Wo.HTTP_ERROR:const m=u.getStatus();if($(Qe,`RPC '${e}' ${s} failed with status:`,m,"response text:",u.getResponseText()),m>0){let _=u.getResponseJson();Array.isArray(_)&&(_=_[0]);const A=_==null?void 0:_.error;if(A&&A.status&&A.message){const k=function(b){const S=b.toLowerCase().replace(/_/g,"-");return Object.values(L).indexOf(S)>=0?S:L.UNKNOWN}(A.status);l(new H(k,A.message))}else l(new H(L.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new H(L.UNAVAILABLE,"Connection failed."));break;default:q()}}finally{$(Qe,`RPC '${e}' ${s} completed.`)}});const h=JSON.stringify(i);$(Qe,`RPC '${e}' ${s} sending request:`,i),u.send(n,"POST",h,r,15)})}Bo(e,n,r){const i=uu(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=O_(),l=L_(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,n,r),u.encodeInitMessageHeaders=!0;const f=s.join("");$(Qe,`Creating RPC '${e}' stream ${i}: ${f}`,u);const m=a.createWebChannel(f,u);let _=!1,A=!1;const k=new bI({Io:b=>{A?$(Qe,`Not sending because RPC '${e}' stream ${i} is closed:`,b):(_||($(Qe,`Opening RPC '${e}' stream ${i} transport.`),m.open(),_=!0),$(Qe,`RPC '${e}' stream ${i} sending:`,b),m.send(b))},To:()=>m.close()}),V=(b,S,w)=>{b.listen(S,x=>{try{w(x)}catch(D){setTimeout(()=>{throw D},0)}})};return V(m,Hi.EventType.OPEN,()=>{A||($(Qe,`RPC '${e}' stream ${i} transport opened.`),k.yo())}),V(m,Hi.EventType.CLOSE,()=>{A||(A=!0,$(Qe,`RPC '${e}' stream ${i} transport closed`),k.So())}),V(m,Hi.EventType.ERROR,b=>{A||(A=!0,ri(Qe,`RPC '${e}' stream ${i} transport errored:`,b),k.So(new H(L.UNAVAILABLE,"The operation could not be completed")))}),V(m,Hi.EventType.MESSAGE,b=>{var S;if(!A){const w=b.data[0];oe(!!w);const x=w,D=x.error||((S=x[0])===null||S===void 0?void 0:S.error);if(D){$(Qe,`RPC '${e}' stream ${i} received error:`,D);const U=D.status;let M=function(v){const T=Se[v];if(T!==void 0)return ay(T)}(U),y=D.message;M===void 0&&(M=L.INTERNAL,y="Unknown error status: "+U+" with message "+D.message),A=!0,k.So(new H(M,y)),m.close()}else $(Qe,`RPC '${e}' stream ${i} received:`,w),k.bo(w)}}),V(l,M_.STAT_EVENT,b=>{b.stat===dc.PROXY?$(Qe,`RPC '${e}' stream ${i} detected buffering proxy`):b.stat===dc.NOPROXY&&$(Qe,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{k.wo()},0),k}}function cu(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tl(t){return new WT(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vy{constructor(e,n,r=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,n-r);i>0&&$("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wy{constructor(e,n,r,i,s,a,l,u){this.ui=e,this.Ho=r,this.Jo=i,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new vy(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===L.RESOURCE_EXHAUSTED?(pn(n.toString()),pn("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===L.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Yo===n&&this.P_(r,i)},r=>{e(()=>{const i=new H(L.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(i)})})}P_(e,n){const r=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{r(()=>this.I_(i))}),this.stream.onMessage(i=>{r(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return $("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():($("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class LI extends wy{constructor(e,n,r,i,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,i,a),this.serializer=s}T_(e,n){return this.connection.Bo("Listen",e,n)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const n=QT(this.serializer,e),r=function(s){if(!("targetChange"in s))return Q.min();const a=s.targetChange;return a.targetIds&&a.targetIds.length?Q.min():a.readTime?Qt(a.readTime):Q.min()}(e);return this.listener.d_(n,r)}A_(e){const n={};n.database=Ec(this.serializer),n.addTarget=function(s,a){let l;const u=a.target;if(l=gc(u)?{documents:XT(s,u)}:{query:JT(s,u)._t},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=cy(s,a.resumeToken);const h=yc(s,a.expectedCount);h!==null&&(l.expectedCount=h)}else if(a.snapshotVersion.compareTo(Q.min())>0){l.readTime=Ra(s,a.snapshotVersion.toTimestamp());const h=yc(s,a.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const r=eI(this.serializer,e);r&&(n.labels=r),this.a_(n)}R_(e){const n={};n.database=Ec(this.serializer),n.removeTarget=e,this.a_(n)}}class OI extends wy{constructor(e,n,r,i,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,i,a),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return oe(!!e.streamToken),this.lastStreamToken=e.streamToken,oe(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){oe(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=YT(e.writeResults,e.commitTime),r=Qt(e.commitTime);return this.listener.g_(r,n)}p_(){const e={};e.database=Ec(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>KT(this.serializer,r))};this.a_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FI extends class{}{constructor(e,n,r,i){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new H(L.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Mo(e,vc(n,r),i,s,a)).catch(s=>{throw s.name==="FirebaseError"?(s.code===L.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new H(L.UNKNOWN,s.toString())})}Lo(e,n,r,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Lo(e,vc(n,r),i,a,l,s)).catch(a=>{throw a.name==="FirebaseError"?(a.code===L.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new H(L.UNKNOWN,a.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class jI{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(pn(n),this.D_=!1):$("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UI{constructor(e,n,r,i,s){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o(a=>{r.enqueueAndForget(async()=>{Er(this)&&($("RemoteStore","Restarting streams for network reachability change."),await async function(u){const h=K(u);h.L_.add(4),await Bs(h),h.q_.set("Unknown"),h.L_.delete(4),await nl(h)}(this))})}),this.q_=new jI(r,i)}}async function nl(t){if(Er(t))for(const e of t.B_)await e(!0)}async function Bs(t){for(const e of t.B_)await e(!1)}function Ey(t,e){const n=K(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),Hh(n)?$h(n):_i(n).r_()&&Bh(n,e))}function zh(t,e){const n=K(t),r=_i(n);n.N_.delete(e),r.r_()&&Ty(n,e),n.N_.size===0&&(r.r_()?r.o_():Er(n)&&n.q_.set("Unknown"))}function Bh(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Q.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}_i(t).A_(e)}function Ty(t,e){t.Q_.xe(e),_i(t).R_(e)}function $h(t){t.Q_=new zT({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),_i(t).start(),t.q_.v_()}function Hh(t){return Er(t)&&!_i(t).n_()&&t.N_.size>0}function Er(t){return K(t).L_.size===0}function Iy(t){t.Q_=void 0}async function zI(t){t.q_.set("Online")}async function BI(t){t.N_.forEach((e,n)=>{Bh(t,e)})}async function $I(t,e){Iy(t),Hh(t)?(t.q_.M_(e),$h(t)):t.q_.set("Unknown")}async function HI(t,e,n){if(t.q_.set("Online"),e instanceof uy&&e.state===2&&e.cause)try{await async function(i,s){const a=s.cause;for(const l of s.targetIds)i.N_.has(l)&&(await i.remoteSyncer.rejectListen(l,a),i.N_.delete(l),i.Q_.removeTarget(l))}(t,e)}catch(r){$("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Pa(t,r)}else if(e instanceof Qo?t.Q_.Ke(e):e instanceof ly?t.Q_.He(e):t.Q_.We(e),!n.isEqual(Q.min()))try{const r=await yy(t.localStore);n.compareTo(r)>=0&&await function(s,a){const l=s.Q_.rt(a);return l.targetChanges.forEach((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=s.N_.get(h);f&&s.N_.set(h,f.withResumeToken(u.resumeToken,a))}}),l.targetMismatches.forEach((u,h)=>{const f=s.N_.get(u);if(!f)return;s.N_.set(u,f.withResumeToken(ze.EMPTY_BYTE_STRING,f.snapshotVersion)),Ty(s,u);const m=new Cn(f.target,u,h,f.sequenceNumber);Bh(s,m)}),s.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(r){$("RemoteStore","Failed to raise snapshot:",r),await Pa(t,r)}}async function Pa(t,e,n){if(!js(e))throw e;t.L_.add(1),await Bs(t),t.q_.set("Offline"),n||(n=()=>yy(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{$("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await nl(t)})}function Sy(t,e){return e().catch(n=>Pa(t,n,e))}async function rl(t){const e=K(t),n=Wn(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;WI(e);)try{const i=await RI(e.localStore,r);if(i===null){e.O_.length===0&&n.o_();break}r=i.batchId,GI(e,i)}catch(i){await Pa(e,i)}Ay(e)&&xy(e)}function WI(t){return Er(t)&&t.O_.length<10}function GI(t,e){t.O_.push(e);const n=Wn(t);n.r_()&&n.V_&&n.m_(e.mutations)}function Ay(t){return Er(t)&&!Wn(t).n_()&&t.O_.length>0}function xy(t){Wn(t).start()}async function qI(t){Wn(t).p_()}async function QI(t){const e=Wn(t);for(const n of t.O_)e.m_(n.mutations)}async function KI(t,e,n){const r=t.O_.shift(),i=Mh.from(r,e,n);await Sy(t,()=>t.remoteSyncer.applySuccessfulWrite(i)),await rl(t)}async function YI(t,e){e&&Wn(t).V_&&await async function(r,i){if(function(a){return FT(a)&&a!==L.ABORTED}(i.code)){const s=r.O_.shift();Wn(r).s_(),await Sy(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await rl(r)}}(t,e),Ay(t)&&xy(t)}async function qp(t,e){const n=K(t);n.asyncQueue.verifyOperationInProgress(),$("RemoteStore","RemoteStore received new credentials");const r=Er(n);n.L_.add(3),await Bs(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await nl(n)}async function XI(t,e){const n=K(t);e?(n.L_.delete(2),await nl(n)):e||(n.L_.add(2),await Bs(n),n.q_.set("Unknown"))}function _i(t){return t.K_||(t.K_=function(n,r,i){const s=K(n);return s.w_(),new LI(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Eo:zI.bind(null,t),Ro:BI.bind(null,t),mo:$I.bind(null,t),d_:HI.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),Hh(t)?$h(t):t.q_.set("Unknown")):(await t.K_.stop(),Iy(t))})),t.K_}function Wn(t){return t.U_||(t.U_=function(n,r,i){const s=K(n);return s.w_(),new OI(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:qI.bind(null,t),mo:YI.bind(null,t),f_:QI.bind(null,t),g_:KI.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await rl(t)):(await t.U_.stop(),t.O_.length>0&&($("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wh{constructor(e,n,r,i,s){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new jn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,i,s){const a=Date.now()+r,l=new Wh(e,n,a,i,s);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new H(L.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Gh(t,e){if(pn("AsyncQueue",`${e}: ${t}`),js(t))return new H(L.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kr{constructor(e){this.comparator=e?(n,r)=>e(n,r)||W.comparator(n.key,r.key):(n,r)=>W.comparator(n.key,r.key),this.keyedMap=Wi(),this.sortedSet=new ve(this.comparator)}static emptySet(e){return new Kr(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Kr)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new Kr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qp{constructor(){this.W_=new ve(W.comparator)}track(e){const n=e.doc.key,r=this.W_.get(n);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(n,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(n):e.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):q():this.W_=this.W_.insert(n,e)}G_(){const e=[];return this.W_.inorderTraversal((n,r)=>{e.push(r)}),e}}class li{constructor(e,n,r,i,s,a,l,u,h){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,n,r,i,s){const a=[];return n.forEach(l=>{a.push({type:0,doc:l})}),new li(e,n,Kr.emptySet(n),a,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ya(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let i=0;i<n.length;i++)if(n[i].type!==r[i].type||!n[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JI{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class ZI{constructor(){this.queries=Kp(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const i=K(n),s=i.queries;i.queries=Kp(),s.forEach((a,l)=>{for(const u of l.j_)u.onError(r)})})(this,new H(L.ABORTED,"Firestore shutting down"))}}function Kp(){return new gi(t=>K_(t),Ya)}async function Cy(t,e){const n=K(t);let r=3;const i=e.query;let s=n.queries.get(i);s?!s.H_()&&e.J_()&&(r=2):(s=new JI,r=e.J_()?0:1);try{switch(r){case 0:s.z_=await n.onListen(i,!0);break;case 1:s.z_=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(a){const l=Gh(a,`Initialization of query '${Cr(e.query)}' failed`);return void e.onError(l)}n.queries.set(i,s),s.j_.push(e),e.Z_(n.onlineState),s.z_&&e.X_(s.z_)&&qh(n)}async function Ry(t,e){const n=K(t),r=e.query;let i=3;const s=n.queries.get(r);if(s){const a=s.j_.indexOf(e);a>=0&&(s.j_.splice(a,1),s.j_.length===0?i=e.J_()?0:1:!s.H_()&&e.J_()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function eS(t,e){const n=K(t);let r=!1;for(const i of e){const s=i.query,a=n.queries.get(s);if(a){for(const l of a.j_)l.X_(i)&&(r=!0);a.z_=i}}r&&qh(n)}function tS(t,e,n){const r=K(t),i=r.queries.get(e);if(i)for(const s of i.j_)s.onError(n);r.queries.delete(e)}function qh(t){t.Y_.forEach(e=>{e.next()})}var Ic,Yp;(Yp=Ic||(Ic={})).ea="default",Yp.Cache="cache";class Py{constructor(e,n,r){this.query=e,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new li(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.na?this.ia(e)&&(this.ta.next(e),n=!0):this.sa(e,this.onlineState)&&(this.oa(e),n=!0),this.ra=e,n}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),n=!0),n}sa(e,n){if(!e.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(e){e=li.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Ic.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ky{constructor(e){this.key=e}}class Ny{constructor(e){this.key=e}}class nS{constructor(e,n){this.query=e,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=J(),this.mutatedKeys=J(),this.Aa=Y_(e),this.Ra=new Kr(this.Aa)}get Va(){return this.Ta}ma(e,n){const r=n?n.fa:new Qp,i=n?n.Ra:this.Ra;let s=n?n.mutatedKeys:this.mutatedKeys,a=i,l=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,h=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,m)=>{const _=i.get(f),A=Xa(this.query,m)?m:null,k=!!_&&this.mutatedKeys.has(_.key),V=!!A&&(A.hasLocalMutations||this.mutatedKeys.has(A.key)&&A.hasCommittedMutations);let b=!1;_&&A?_.data.isEqual(A.data)?k!==V&&(r.track({type:3,doc:A}),b=!0):this.ga(_,A)||(r.track({type:2,doc:A}),b=!0,(u&&this.Aa(A,u)>0||h&&this.Aa(A,h)<0)&&(l=!0)):!_&&A?(r.track({type:0,doc:A}),b=!0):_&&!A&&(r.track({type:1,doc:_}),b=!0,(u||h)&&(l=!0)),b&&(A?(a=a.add(A),s=V?s.add(f):s.delete(f)):(a=a.delete(f),s=s.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),s=s.delete(f.key),r.track({type:1,doc:f})}return{Ra:a,fa:r,ns:l,mutatedKeys:s}}ga(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,i){const s=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const a=e.fa.G_();a.sort((f,m)=>function(A,k){const V=b=>{switch(b){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return q()}};return V(A)-V(k)}(f.type,m.type)||this.Aa(f.doc,m.doc)),this.pa(r),i=i!=null&&i;const l=n&&!i?this.ya():[],u=this.da.size===0&&this.current&&!i?1:0,h=u!==this.Ea;return this.Ea=u,a.length!==0||h?{snapshot:new li(this.query,e.Ra,s,a,e.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Qp,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(n=>this.Ta=this.Ta.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ta=this.Ta.delete(n)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=J(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const n=[];return e.forEach(r=>{this.da.has(r)||n.push(new Ny(r))}),this.da.forEach(r=>{e.has(r)||n.push(new ky(r))}),n}ba(e){this.Ta=e.Ts,this.da=J();const n=this.ma(e.documents);return this.applyChanges(n,!0)}Da(){return li.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class rS{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class iS{constructor(e){this.key=e,this.va=!1}}class sS{constructor(e,n,r,i,s,a){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new gi(l=>K_(l),Ya),this.Ma=new Map,this.xa=new Set,this.Oa=new ve(W.comparator),this.Na=new Map,this.La=new Fh,this.Ba={},this.ka=new Map,this.qa=ai.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function oS(t,e,n=!0){const r=Oy(t);let i;const s=r.Fa.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=await Vy(r,e,n,!0),i}async function aS(t,e){const n=Oy(t);await Vy(n,e,!0,!1)}async function Vy(t,e,n,r){const i=await PI(t.localStore,qt(e)),s=i.targetId,a=t.sharedClientState.addLocalQueryTarget(s,n);let l;return r&&(l=await lS(t,e,s,a==="current",i.resumeToken)),t.isPrimaryClient&&n&&Ey(t.remoteStore,i),l}async function lS(t,e,n,r,i){t.Ka=(m,_,A)=>async function(V,b,S,w){let x=b.view.ma(S);x.ns&&(x=await Hp(V.localStore,b.query,!1).then(({documents:y})=>b.view.ma(y,x)));const D=w&&w.targetChanges.get(b.targetId),U=w&&w.targetMismatches.get(b.targetId)!=null,M=b.view.applyChanges(x,V.isPrimaryClient,D,U);return Jp(V,b.targetId,M.wa),M.snapshot}(t,m,_,A);const s=await Hp(t.localStore,e,!0),a=new nS(e,s.Ts),l=a.ma(s.documents),u=zs.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",i),h=a.applyChanges(l,t.isPrimaryClient,u);Jp(t,n,h.wa);const f=new rS(e,n,a);return t.Fa.set(e,f),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),h.snapshot}async function uS(t,e,n){const r=K(t),i=r.Fa.get(e),s=r.Ma.get(i.targetId);if(s.length>1)return r.Ma.set(i.targetId,s.filter(a=>!Ya(a,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Tc(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),n&&zh(r.remoteStore,i.targetId),Sc(r,i.targetId)}).catch(Fs)):(Sc(r,i.targetId),await Tc(r.localStore,i.targetId,!0))}async function cS(t,e){const n=K(t),r=n.Fa.get(e),i=n.Ma.get(r.targetId);n.isPrimaryClient&&i.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),zh(n.remoteStore,r.targetId))}async function hS(t,e,n){const r=yS(t);try{const i=await function(a,l){const u=K(a),h=Pe.now(),f=l.reduce((A,k)=>A.add(k.key),J());let m,_;return u.persistence.runTransaction("Locally write mutations","readwrite",A=>{let k=mn(),V=J();return u.cs.getEntries(A,f).next(b=>{k=b,k.forEach((S,w)=>{w.isValidDocument()||(V=V.add(S))})}).next(()=>u.localDocuments.getOverlayedDocuments(A,k)).next(b=>{m=b;const S=[];for(const w of l){const x=DT(w,m.get(w.key).overlayedDocument);x!=null&&S.push(new Kn(w.key,x,B_(x.value.mapValue),Pt.exists(!0)))}return u.mutationQueue.addMutationBatch(A,h,S,l)}).next(b=>{_=b;const S=b.applyToLocalDocumentSet(m,V);return u.documentOverlayCache.saveOverlays(A,b.batchId,S)})}).then(()=>({batchId:_.batchId,changes:J_(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(a,l,u){let h=a.Ba[a.currentUser.toKey()];h||(h=new ve(re)),h=h.insert(l,u),a.Ba[a.currentUser.toKey()]=h}(r,i.batchId,n),await $s(r,i.changes),await rl(r.remoteStore)}catch(i){const s=Gh(i,"Failed to persist write");n.reject(s)}}async function Dy(t,e){const n=K(t);try{const r=await xI(n.localStore,e);e.targetChanges.forEach((i,s)=>{const a=n.Na.get(s);a&&(oe(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?a.va=!0:i.modifiedDocuments.size>0?oe(a.va):i.removedDocuments.size>0&&(oe(a.va),a.va=!1))}),await $s(n,r,e)}catch(r){await Fs(r)}}function Xp(t,e,n){const r=K(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const i=[];r.Fa.forEach((s,a)=>{const l=a.view.Z_(e);l.snapshot&&i.push(l.snapshot)}),function(a,l){const u=K(a);u.onlineState=l;let h=!1;u.queries.forEach((f,m)=>{for(const _ of m.j_)_.Z_(l)&&(h=!0)}),h&&qh(u)}(r.eventManager,e),i.length&&r.Ca.d_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function dS(t,e,n){const r=K(t);r.sharedClientState.updateQueryState(e,"rejected",n);const i=r.Na.get(e),s=i&&i.key;if(s){let a=new ve(W.comparator);a=a.insert(s,Je.newNoDocument(s,Q.min()));const l=J().add(s),u=new el(Q.min(),new Map,new ve(re),a,l);await Dy(r,u),r.Oa=r.Oa.remove(s),r.Na.delete(e),Qh(r)}else await Tc(r.localStore,e,!1).then(()=>Sc(r,e,n)).catch(Fs)}async function fS(t,e){const n=K(t),r=e.batch.batchId;try{const i=await AI(n.localStore,e);My(n,r,null),by(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await $s(n,i)}catch(i){await Fs(i)}}async function pS(t,e,n){const r=K(t);try{const i=await function(a,l){const u=K(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return u.mutationQueue.lookupMutationBatch(h,l).next(m=>(oe(m!==null),f=m.keys(),u.mutationQueue.removeMutationBatch(h,m))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>u.localDocuments.getDocuments(h,f))})}(r.localStore,e);My(r,e,n),by(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await $s(r,i)}catch(i){await Fs(i)}}function by(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function My(t,e,n){const r=K(t);let i=r.Ba[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(n?s.reject(n):s.resolve(),i=i.remove(e)),r.Ba[r.currentUser.toKey()]=i}}function Sc(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Ma.get(e))t.Fa.delete(r),n&&t.Ca.$a(r,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(r=>{t.La.containsKey(r)||Ly(t,r)})}function Ly(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);n!==null&&(zh(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),Qh(t))}function Jp(t,e,n){for(const r of n)r instanceof ky?(t.La.addReference(r.key,e),mS(t,r)):r instanceof Ny?($("SyncEngine","Document no longer in limbo: "+r.key),t.La.removeReference(r.key,e),t.La.containsKey(r.key)||Ly(t,r.key)):q()}function mS(t,e){const n=e.key,r=n.path.canonicalString();t.Oa.get(n)||t.xa.has(r)||($("SyncEngine","New document in limbo: "+n),t.xa.add(r),Qh(t))}function Qh(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new W(pe.fromString(e)),r=t.qa.next();t.Na.set(r,new iS(n)),t.Oa=t.Oa.insert(n,r),Ey(t.remoteStore,new Cn(qt(Vh(n.path)),r,"TargetPurposeLimboResolution",xh.oe))}}async function $s(t,e,n){const r=K(t),i=[],s=[],a=[];r.Fa.isEmpty()||(r.Fa.forEach((l,u)=>{a.push(r.Ka(u,e,n).then(h=>{var f;if((h||n)&&r.isPrimaryClient){const m=h?!h.fromCache:(f=n==null?void 0:n.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,m?"current":"not-current")}if(h){i.push(h);const m=Uh.Wi(u.targetId,h);s.push(m)}}))}),await Promise.all(a),r.Ca.d_(i),await async function(u,h){const f=K(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>O.forEach(h,_=>O.forEach(_.$i,A=>f.persistence.referenceDelegate.addReference(m,_.targetId,A)).next(()=>O.forEach(_.Ui,A=>f.persistence.referenceDelegate.removeReference(m,_.targetId,A)))))}catch(m){if(!js(m))throw m;$("LocalStore","Failed to update sequence numbers: "+m)}for(const m of h){const _=m.targetId;if(!m.fromCache){const A=f.os.get(_),k=A.snapshotVersion,V=A.withLastLimboFreeSnapshotVersion(k);f.os=f.os.insert(_,V)}}}(r.localStore,s))}async function gS(t,e){const n=K(t);if(!n.currentUser.isEqual(e)){$("SyncEngine","User change. New user:",e.toKey());const r=await _y(n.localStore,e);n.currentUser=e,function(s,a){s.ka.forEach(l=>{l.forEach(u=>{u.reject(new H(L.CANCELLED,a))})}),s.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await $s(n,r.hs)}}function _S(t,e){const n=K(t),r=n.Na.get(e);if(r&&r.va)return J().add(r.key);{let i=J();const s=n.Ma.get(e);if(!s)return i;for(const a of s){const l=n.Fa.get(a);i=i.unionWith(l.view.Va)}return i}}function Oy(t){const e=K(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=Dy.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=_S.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=dS.bind(null,e),e.Ca.d_=eS.bind(null,e.eventManager),e.Ca.$a=tS.bind(null,e.eventManager),e}function yS(t){const e=K(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=fS.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=pS.bind(null,e),e}class ka{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=tl(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return SI(this.persistence,new TI,e.initialUser,this.serializer)}Ga(e){return new vI(jh.Zr,this.serializer)}Wa(e){return new NI}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ka.provider={build:()=>new ka};class Ac{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Xp(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=gS.bind(null,this.syncEngine),await XI(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new ZI}()}createDatastore(e){const n=tl(e.databaseInfo.databaseId),r=function(s){return new MI(s)}(e.databaseInfo);return function(s,a,l,u){return new FI(s,a,l,u)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,i,s,a,l){return new UI(r,i,s,a,l)}(this.localStore,this.datastore,e.asyncQueue,n=>Xp(this.syncEngine,n,0),function(){return Gp.D()?new Gp:new VI}())}createSyncEngine(e,n){return function(i,s,a,l,u,h,f){const m=new sS(i,s,a,l,u,h);return f&&(m.Qa=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(i){const s=K(i);$("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await Bs(s),s.k_.shutdown(),s.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}Ac.provider={build:()=>new Ac};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fy{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):pn("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vS{constructor(e,n,r,i,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=i,this.user=Ke.UNAUTHENTICATED,this.clientId=j_.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async a=>{$("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>($("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new jn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Gh(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function hu(t,e){t.asyncQueue.verifyOperationInProgress(),$("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async i=>{r.isEqual(i)||(await _y(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function Zp(t,e){t.asyncQueue.verifyOperationInProgress();const n=await wS(t);$("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>qp(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,i)=>qp(e.remoteStore,i)),t._onlineComponents=e}async function wS(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){$("FirestoreClient","Using user provided OfflineComponentProvider");try{await hu(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(i){return i.name==="FirebaseError"?i.code===L.FAILED_PRECONDITION||i.code===L.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(n))throw n;ri("Error using user provided cache. Falling back to memory cache: "+n),await hu(t,new ka)}}else $("FirestoreClient","Using default OfflineComponentProvider"),await hu(t,new ka);return t._offlineComponents}async function jy(t){return t._onlineComponents||(t._uninitializedComponentsProvider?($("FirestoreClient","Using user provided OnlineComponentProvider"),await Zp(t,t._uninitializedComponentsProvider._online)):($("FirestoreClient","Using default OnlineComponentProvider"),await Zp(t,new Ac))),t._onlineComponents}function ES(t){return jy(t).then(e=>e.syncEngine)}async function xc(t){const e=await jy(t),n=e.eventManager;return n.onListen=oS.bind(null,e.syncEngine),n.onUnlisten=uS.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=aS.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=cS.bind(null,e.syncEngine),n}function TS(t,e,n={}){const r=new jn;return t.asyncQueue.enqueueAndForget(async()=>function(s,a,l,u,h){const f=new Fy({next:_=>{f.Za(),a.enqueueAndForget(()=>Ry(s,m)),_.fromCache&&u.source==="server"?h.reject(new H(L.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(_)},error:_=>h.reject(_)}),m=new Py(l,f,{includeMetadataChanges:!0,_a:!0});return Cy(s,m)}(await xc(t),t.asyncQueue,e,n,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uy(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const em=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zy(t,e,n){if(!n)throw new H(L.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function IS(t,e,n,r){if(e===!0&&r===!0)throw new H(L.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function tm(t){if(!W.isDocumentKey(t))throw new H(L.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function nm(t){if(W.isDocumentKey(t))throw new H(L.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Kh(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":q()}function ln(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new H(L.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Kh(t);throw new H(L.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rm{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new H(L.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new H(L.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}IS("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Uy((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new H(L.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new H(L.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new H(L.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class il{constructor(e,n,r,i){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new rm({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new H(L.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new H(L.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new rm(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new z1;switch(r.type){case"firstParty":return new W1(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new H(L.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=em.get(n);r&&($("ComponentProvider","Removing Datastore"),em.delete(n),r.terminate())}(this),Promise.resolve()}}function SS(t,e,n,r={}){var i;const s=(t=ln(t,il))._getSettings(),a=`${e}:${n}`;if(s.host!=="firestore.googleapis.com"&&s.host!==a&&ri("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},s),{host:a,ssl:!1})),r.mockUserToken){let l,u;if(typeof r.mockUserToken=="string")l=r.mockUserToken,u=Ke.MOCK_USER;else{l=wE(r.mockUserToken,(i=t._app)===null||i===void 0?void 0:i.options.projectId);const h=r.mockUserToken.sub||r.mockUserToken.user_id;if(!h)throw new H(L.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new Ke(h)}t._authCredentials=new B1(new F_(l,u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Hs(this.firestore,e,this._query)}}class wt{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Un(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new wt(this.firestore,e,this._key)}}class Un extends Hs{constructor(e,n,r){super(e,n,Vh(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new wt(this.firestore,null,new W(e))}withConverter(e){return new Un(this.firestore,e,this._path)}}function Rn(t,e,...n){if(t=Kt(t),zy("collection","path",e),t instanceof il){const r=pe.fromString(e,...n);return nm(r),new Un(t,null,r)}{if(!(t instanceof wt||t instanceof Un))throw new H(L.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(pe.fromString(e,...n));return nm(r),new Un(t.firestore,null,r)}}function qi(t,e,...n){if(t=Kt(t),arguments.length===1&&(e=j_.newId()),zy("doc","path",e),t instanceof il){const r=pe.fromString(e,...n);return tm(r),new wt(t,null,new W(r))}{if(!(t instanceof wt||t instanceof Un))throw new H(L.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(pe.fromString(e,...n));return tm(r),new wt(t.firestore,t instanceof Un?t.converter:null,new W(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class im{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new vy(this,"async_queue_retry"),this.Vu=()=>{const r=cu();r&&$("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=cu();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=cu();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new jn;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!js(e))throw e;$("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const i=function(a){let l=a.message||"";return a.stack&&(l=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),l}(r);throw pn("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const i=Wh.createAndSchedule(this,e,n,r,s=>this.yu(s));return this.Tu.push(i),i}fu(){this.Eu&&q()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}function sm(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const i=n;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(t,["next","error","complete"])}class ui extends il{constructor(e,n,r,i){super(e,n,r,i),this.type="firestore",this._queue=new im,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new im(e),this._firestoreClient=void 0,await e}}}function AS(t,e){const n=typeof t=="object"?t:P1(),r=typeof t=="string"?t:"(default)",i=A1(n,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=yE("firestore");s&&SS(i,...s)}return i}function sl(t){if(t._terminated)throw new H(L.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||xS(t),t._firestoreClient}function xS(t){var e,n,r;const i=t._freezeSettings(),s=function(l,u,h,f){return new iT(l,u,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Uy(f.experimentalLongPollingOptions),f.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,i);t._componentsProvider||!((n=i.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),t._firestoreClient=new vS(t._authCredentials,t._appCheckCredentials,t._queue,s,t._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ci{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ci(ze.fromBase64String(e))}catch(n){throw new H(L.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new ci(ze.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ol{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new H(L.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Oe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yh{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xh{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new H(L.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new H(L.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return re(this._lat,e._lat)||re(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jh{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CS=/^__.*__$/;class RS{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Kn(e,this.data,this.fieldMask,n,this.fieldTransforms):new Us(e,this.data,n,this.fieldTransforms)}}class By{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new Kn(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function $y(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw q()}}class Zh{constructor(e,n,r,i,s,a){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new Zh(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Fu({path:r,xu:!1});return i.Ou(e),i}Nu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Fu({path:r,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return Na(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if($y(this.Cu)&&CS.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class PS{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||tl(e)}Qu(e,n,r,i=!1){return new Zh({Cu:e,methodName:n,qu:r,path:Oe.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Hy(t){const e=t._freezeSettings(),n=tl(t._databaseId);return new PS(t._databaseId,!!e.ignoreUndefinedProperties,n)}function Wy(t,e,n,r,i,s={}){const a=t.Qu(s.merge||s.mergeFields?2:0,e,n,i);ed("Data must be an object, but it was:",a,r);const l=Gy(r,a);let u,h;if(s.merge)u=new _t(a.fieldMask),h=a.fieldTransforms;else if(s.mergeFields){const f=[];for(const m of s.mergeFields){const _=Cc(e,m,n);if(!a.contains(_))throw new H(L.INVALID_ARGUMENT,`Field '${_}' is specified in your field mask but missing from your input data.`);Qy(f,_)||f.push(_)}u=new _t(f),h=a.fieldTransforms.filter(m=>u.covers(m.field))}else u=null,h=a.fieldTransforms;return new RS(new ut(l),u,h)}class al extends Yh{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof al}}function kS(t,e,n,r){const i=t.Qu(1,e,n);ed("Data must be an object, but it was:",i,r);const s=[],a=ut.empty();wr(r,(u,h)=>{const f=td(e,u,n);h=Kt(h);const m=i.Nu(f);if(h instanceof al)s.push(f);else{const _=ll(h,m);_!=null&&(s.push(f),a.set(f,_))}});const l=new _t(s);return new By(a,l,i.fieldTransforms)}function NS(t,e,n,r,i,s){const a=t.Qu(1,e,n),l=[Cc(e,r,n)],u=[i];if(s.length%2!=0)throw new H(L.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let _=0;_<s.length;_+=2)l.push(Cc(e,s[_])),u.push(s[_+1]);const h=[],f=ut.empty();for(let _=l.length-1;_>=0;--_)if(!Qy(h,l[_])){const A=l[_];let k=u[_];k=Kt(k);const V=a.Nu(A);if(k instanceof al)h.push(A);else{const b=ll(k,V);b!=null&&(h.push(A),f.set(A,b))}}const m=new _t(h);return new By(f,m,a.fieldTransforms)}function ll(t,e){if(qy(t=Kt(t)))return ed("Unsupported field value:",e,t),Gy(t,e);if(t instanceof Yh)return function(r,i){if(!$y(i.Cu))throw i.Bu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,i){const s=[];let a=0;for(const l of r){let u=ll(l,i.Lu(a));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),a++}return{arrayValue:{values:s}}}(t,e)}return function(r,i){if((r=Kt(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return CT(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=Pe.fromDate(r);return{timestampValue:Ra(i.serializer,s)}}if(r instanceof Pe){const s=new Pe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ra(i.serializer,s)}}if(r instanceof Xh)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof ci)return{bytesValue:cy(i.serializer,r._byteString)};if(r instanceof wt){const s=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(s))throw i.Bu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Oh(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Jh)return function(a,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map(u=>{if(typeof u!="number")throw l.Bu("VectorValues must only contain numeric values.");return Dh(l.serializer,u)})}}}}}}(r,i);throw i.Bu(`Unsupported field value: ${Kh(r)}`)}(t,e)}function Gy(t,e){const n={};return U_(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):wr(t,(r,i)=>{const s=ll(i,e.Mu(r));s!=null&&(n[r]=s)}),{mapValue:{fields:n}}}function qy(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Pe||t instanceof Xh||t instanceof ci||t instanceof wt||t instanceof Yh||t instanceof Jh)}function ed(t,e,n){if(!qy(n)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(n)){const r=Kh(n);throw r==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+r)}}function Cc(t,e,n){if((e=Kt(e))instanceof ol)return e._internalPath;if(typeof e=="string")return td(t,e);throw Na("Field path arguments must be of type string or ",t,!1,void 0,n)}const VS=new RegExp("[~\\*/\\[\\]]");function td(t,e,n){if(e.search(VS)>=0)throw Na(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new ol(...e.split("."))._internalPath}catch{throw Na(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Na(t,e,n,r,i){const s=r&&!r.isEmpty(),a=i!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(s||a)&&(u+=" (found",s&&(u+=` in field ${r}`),a&&(u+=` in document ${i}`),u+=")"),new H(L.INVALID_ARGUMENT,l+t+u)}function Qy(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ky{constructor(e,n,r,i,s){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new wt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new DS(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Yy("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class DS extends Ky{data(){return super.data()}}function Yy(t,e){return typeof e=="string"?td(t,e):e instanceof ol?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xy(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new H(L.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class bS{convertValue(e,n="none"){switch(_r(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Te(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(gr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw q()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return wr(e,(i,s)=>{r[i]=this.convertValue(s,n)}),r}convertVectorValue(e){var n,r,i;const s=(i=(r=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(a=>Te(a.doubleValue));return new Jh(s)}convertGeoPoint(e){return new Xh(Te(e.latitude),Te(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=Rh(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(Rs(e));default:return null}}convertTimestamp(e){const n=Hn(e);return new Pe(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=pe.fromString(e);oe(gy(r));const i=new Ps(r.get(1),r.get(3)),s=new W(r.popFirst(5));return i.isEqual(n)||pn(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jy(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qi{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Zy extends Ky{constructor(e,n,r,i,s,a){super(e,n,r,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Ko(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(Yy("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class Ko extends Zy{data(e={}){return super.data(e)}}class ev{constructor(e,n,r,i){this._firestore=e,this._userDataWriter=n,this._snapshot=i,this.metadata=new Qi(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new Ko(this._firestore,this._userDataWriter,r.key,r,new Qi(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new H(L.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(l=>{const u=new Ko(i._firestore,i._userDataWriter,l.doc.key,l.doc,new Qi(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(l=>s||l.type!==3).map(l=>{const u=new Ko(i._firestore,i._userDataWriter,l.doc.key,l.doc,new Qi(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);let h=-1,f=-1;return l.type!==0&&(h=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),f=a.indexOf(l.doc.key)),{type:MS(l.type),doc:u,oldIndex:h,newIndex:f}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function MS(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return q()}}class nd extends bS{constructor(e){super(),this.firestore=e}convertBytes(e){return new ci(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new wt(this.firestore,null,n)}}function No(t){t=ln(t,Hs);const e=ln(t.firestore,ui),n=sl(e),r=new nd(e);return Xy(t._query),TS(n,t._query).then(i=>new ev(e,r,t,i))}function LS(t,e,n){t=ln(t,wt);const r=ln(t.firestore,ui),i=Jy(t.converter,e,n);return tv(r,[Wy(Hy(r),"setDoc",t._key,i,t.converter!==null,n).toMutation(t._key,Pt.none())])}function Vo(t,...e){var n,r,i;t=Kt(t);let s={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||sm(e[a])||(s=e[a],a++);const l={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(sm(e[a])){const m=e[a];e[a]=(n=m.next)===null||n===void 0?void 0:n.bind(m),e[a+1]=(r=m.error)===null||r===void 0?void 0:r.bind(m),e[a+2]=(i=m.complete)===null||i===void 0?void 0:i.bind(m)}let u,h,f;if(t instanceof wt)h=ln(t.firestore,ui),f=Vh(t._key.path),u={next:m=>{e[a]&&e[a](OS(h,t,m))},error:e[a+1],complete:e[a+2]};else{const m=ln(t,Hs);h=ln(m.firestore,ui),f=m._query;const _=new nd(h);u={next:A=>{e[a]&&e[a](new ev(h,_,m,A))},error:e[a+1],complete:e[a+2]},Xy(t._query)}return function(_,A,k,V){const b=new Fy(V),S=new Py(A,b,k);return _.asyncQueue.enqueueAndForget(async()=>Cy(await xc(_),S)),()=>{b.Za(),_.asyncQueue.enqueueAndForget(async()=>Ry(await xc(_),S))}}(sl(h),f,l,u)}function tv(t,e){return function(r,i){const s=new jn;return r.asyncQueue.enqueueAndForget(async()=>hS(await ES(r),i,s)),s.promise}(sl(t),e)}function OS(t,e,n){const r=n.docs.get(e._key),i=new nd(t);return new Zy(t,i,e._key,r,new Qi(n.hasPendingWrites,n.fromCache),e.converter)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FS{constructor(e,n){this._firestore=e,this._commitHandler=n,this._mutations=[],this._committed=!1,this._dataReader=Hy(e)}set(e,n,r){this._verifyNotCommitted();const i=du(e,this._firestore),s=Jy(i.converter,n,r),a=Wy(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(a.toMutation(i._key,Pt.none())),this}update(e,n,r,...i){this._verifyNotCommitted();const s=du(e,this._firestore);let a;return a=typeof(n=Kt(n))=="string"||n instanceof ol?NS(this._dataReader,"WriteBatch.update",s._key,n,r,i):kS(this._dataReader,"WriteBatch.update",s._key,n),this._mutations.push(a.toMutation(s._key,Pt.exists(!0))),this}delete(e){this._verifyNotCommitted();const n=du(e,this._firestore);return this._mutations=this._mutations.concat(new bh(n._key,Pt.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new H(L.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function du(t,e){if((t=Kt(t)).firestore!==e)throw new H(L.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nv(t){return sl(t=ln(t,ui)),new FS(t,e=>tv(t,e))}(function(e,n=!0){(function(i){mi=i})(R1),Ta(new As("firestore",(r,{instanceIdentifier:i,options:s})=>{const a=r.getProvider("app").getImmediate(),l=new ui(new $1(r.getProvider("auth-internal")),new q1(r.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new H(L.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ps(h.options.projectId,f)}(a,i),a);return s=Object.assign({useFetchStreams:n},s),l._setSettings(s),l},"PUBLIC").setMultipleInstances(!0)),Qr(Ip,"4.7.3",e),Qr(Ip,"4.7.3","esm2017")})();const jS={apiKey:"AIzaSyDcd71aoujH4yccQpMpGFixfvY15G_gPeA",authDomain:"donghyeon-match.firebaseapp.com",databaseURL:"https://donghyeon-match-default-rtdb.firebaseio.com",projectId:"donghyeon-match",storageBucket:"donghyeon-match.firebasestorage.app",messagingSenderId:"576708595535",appId:"1:576708595535:web:3deacb1e1b0986b78fbf3a",measurementId:"G-8SBR5KKRV0"},US=P_(jS),rt=AS(US),yt={MATCHES:"tennis_matches",TEAMS:"tennis_teams",GROUPS:"tennis_groups",COURTS:"tennis_courts"},zS=t=>{const e=Vo(Rn(rt,yt.MATCHES),s=>{const a=s.docs.map(l=>({id:l.id,...l.data()}));a.length>0?t(l=>({...l,matches:a})):t(l=>({...l,matches:[]}))}),n=Vo(Rn(rt,yt.TEAMS),s=>{const a=s.docs.map(l=>({id:l.id,...l.data()}));a.length>0?t(l=>({...l,teams:a})):t(l=>({...l,teams:[]}))}),r=Vo(Rn(rt,yt.GROUPS),s=>{const a=s.docs.map(l=>({id:l.id,...l.data()}));a.length>0?t(l=>({...l,groups:a})):t(l=>({...l,groups:[]}))}),i=Vo(Rn(rt,yt.COURTS),s=>{const a=s.docs.map(u=>({id:u.id,...u.data()})),l=a.sort((u,h)=>Number(u.id)-Number(h.id));a.length>0?t(u=>({...u,courts:l})):t(u=>({...u,courts:[]}))});return()=>{e(),n(),r(),i()}},Rc=async t=>{try{console.log("Starting upload...");const e=JSON.parse(JSON.stringify(t)),n=nv(rt);e.teams.forEach(i=>{const s=qi(rt,yt.TEAMS,i.id);n.set(s,i)}),e.groups.forEach(i=>{const s=qi(rt,yt.GROUPS,String(i.id));n.set(s,i)}),e.matches.forEach(i=>{const s=qi(rt,yt.MATCHES,i.id);n.set(s,i)}),e.courts&&e.courts.forEach(i=>{const s=qi(rt,yt.COURTS,String(i.id));n.set(s,i)});const r=new Promise((i,s)=>setTimeout(()=>s(new Error("Request timed out.")),1e4));await Promise.race([n.commit(),r]),console.log("Data uploaded successfully!")}catch(e){throw console.error("Error uploading data: ",e),e}},om=async(t,e)=>{try{const n=qi(rt,yt.MATCHES,t);await LS(n,e,{merge:!0})}catch(n){throw console.error("Error updating match: ",n),n}},BS=async()=>{try{console.log("Starting full reset...");const t=nv(rt),e=await No(Rn(rt,yt.MATCHES)),n=await No(Rn(rt,yt.TEAMS)),r=await No(Rn(rt,yt.GROUPS)),i=await No(Rn(rt,yt.COURTS));e.forEach(s=>{t.delete(s.ref)}),n.forEach(s=>{t.delete(s.ref)}),r.forEach(s=>{t.delete(s.ref)}),i.forEach(s=>{t.delete(s.ref)}),await t.commit(),console.log("All data reset successfully!")}catch(t){throw console.error("Error resetting data: ",t),t}},am=({match:t,teamA:e,teamB:n,isAdmin:r})=>{const i=t.status==="COMPLETED",s=t.status==="LIVE",a=m=>({color:m?"var(--tennis-yellow)":"#fff",fontSize:m?"1.5rem":"1.2rem",fontWeight:"800",opacity:m?1:.7}),l=t.winner_id,u=async(m,_)=>{const A=m==="A"?"score_a":"score_b",k=Math.max(0,(t[A]||0)+_);await om(t.id,{[A]:k})},h=async m=>{let _={status:m};if(m==="COMPLETED"){const A=t.score_a||0,k=t.score_b||0;A>k?_.winner_id=t.team_a_id:k>A&&(_.winner_id=t.team_b_id)}else _.winner_id=null;await om(t.id,_)},f={background:"#444",color:"#fff",border:"none",borderRadius:"4px",width:"24px",height:"24px",cursor:"pointer",fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center"};return I.jsxs("div",{className:`match-card ${s?"live":""} ${i?"completed":""}`,children:[I.jsxs("div",{className:"card-header",children:[I.jsxs("span",{className:"match-info",children:[t.group_id," - R",t.round]}),I.jsxs("div",{style:{display:"flex",gap:"5px"},children:[s&&I.jsx("span",{className:"live-badge",children:"● LIVE"}),i&&I.jsx("span",{className:"completed-badge",children:"종료"}),r&&I.jsxs("select",{value:t.status,onChange:m=>h(m.target.value),style:{background:"#333",color:"white",border:"1px solid #555",fontSize:"0.7rem",padding:"2px"},children:[I.jsx("option",{value:"SCHEDULED",children:"대기"}),I.jsx("option",{value:"LIVE",children:"진행"}),I.jsx("option",{value:"COMPLETED",children:"종료"})]})]})]}),I.jsxs("div",{className:"team-row",children:[I.jsxs("div",{className:"team-info",children:[I.jsx("span",{className:`team-name ${l===e.id?"winner":""}`,children:e.name}),I.jsxs("span",{className:"team-players",children:[e.player1,", ",e.player2]})]}),I.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"5px"},children:[r&&I.jsx("button",{onClick:()=>u("A",-1),style:f,children:"-"}),I.jsx("div",{className:"score",style:a(l===e.id),children:t.score_a}),r&&I.jsx("button",{onClick:()=>u("A",1),style:f,children:"+"})]})]}),I.jsx("div",{className:"divider"}),I.jsxs("div",{className:"team-row",children:[I.jsxs("div",{className:"team-info",children:[I.jsx("span",{className:`team-name ${l===n.id?"winner":""}`,children:n.name}),I.jsxs("span",{className:"team-players",children:[n.player1,", ",n.player2]})]}),I.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"5px"},children:[r&&I.jsx("button",{onClick:()=>u("B",-1),style:f,children:"-"}),I.jsx("div",{className:"score",style:a(l===n.id),children:t.score_b}),r&&I.jsx("button",{onClick:()=>u("B",1),style:f,children:"+"})]})]}),I.jsx("style",{children:`
        .match-card {
          background: linear-gradient(145deg, #1a3c26 0%, #0d2615 100%);
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1rem;
          border-left: 5px solid #444;
          box-shadow: 0 4px 6px rgba(0,0,0,0.2);
          position: relative;
          overflow: hidden;
        }
        .match-card.live {
          border-left-color: var(--tennis-yellow);
          box-shadow: 0 0 15px rgba(213,255,0,0.1);
        }
        .match-card.completed {
          border-left-color: var(--wimbledon-green); /* Completed matches subtle */
          opacity: 0.9;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.8rem;
          font-size: 0.8rem;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .live-badge {
          color: var(--tennis-yellow);
          font-weight: bold;
          animation: pulse 2s infinite;
        }
        .completed-badge {
          color: #888;
        }
        .team-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
        }
        .team-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          overflow: hidden;
        }
        .team-name {
          font-weight: 700;
          font-size: 1.1rem;
          color: #ddd;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 200px;
        }
        .team-name.winner {
          color: #fff;
          text-shadow: 0 0 10px rgba(255,255,255,0.3);
        }
        .team-players {
          font-size: 0.75rem;
          color: #666;
        }
        .divider {
          height: 1px;
          background: rgba(255,255,255,0.1);
          margin: 0.5rem 0;
        }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `})]})},$S=({matches:t,teams:e,courts:n,isAdmin:r})=>{const i=[{id:"16강",label:"Round of 16"},{id:"8강",label:"Quarter Finals"},{id:"4강",label:"Semi Finals"},{id:"결승",label:"Final"}],s=h=>e.find(f=>f.id===h)||{name:"TBD",player1:"",player2:""},a=t.filter(h=>!isNaN(parseInt(h.group_id))),l=t.some(h=>["16강","8강","4강","결승"].includes(h.group_id)),u=h=>{if(!n)return null;const f=n.find(m=>m.id===h);return!f||!f.match_id?null:t.find(m=>m.id===f.match_id)};return I.jsxs("div",{className:"bracket-wrapper",children:[n&&I.jsxs("div",{className:"court-grid-section",children:[I.jsx("h3",{className:"section-title",children:"🎾 실시간 코트 현황 (Live Courts)"}),I.jsx("div",{className:"court-grid",children:n.map(h=>{const f=u(h.id),m=f?s(f.team_a_id):null,_=f?s(f.team_b_id):null;return I.jsxs("div",{className:`court-card ${f?"active":"empty"}`,children:[I.jsxs("div",{className:"court-header",children:["Court ",h.id]}),f?I.jsxs("div",{className:"court-match-info",children:[I.jsxs("div",{className:"court-team",children:[I.jsx("span",{className:"team-name",children:m.name}),I.jsx("span",{className:"team-score",children:f.score_a||0})]}),I.jsx("div",{className:"vs-divider",children:"VS"}),I.jsxs("div",{className:"court-team",children:[I.jsx("span",{className:"team-name",children:_.name}),I.jsx("span",{className:"team-score",children:f.score_b||0})]}),I.jsxs("div",{className:"match-status-badge",children:[f.group_id,"조"]})]}):I.jsx("div",{className:"court-empty-state",children:"빈 코트"})]},h.id)})})]}),I.jsxs("div",{className:"bracket-container",children:[!l&&a.length>0&&I.jsxs("div",{className:"bracket-round",children:[I.jsx("h3",{className:"round-title",children:"예선 조별리그 (Group Stage)"}),I.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[a.slice(0,10).map(h=>I.jsx(am,{match:h,teamA:s(h.team_a_id),teamB:s(h.team_b_id),isAdmin:r},h.id)),a.length>10&&I.jsxs("div",{style:{textAlign:"center",color:"#888"},children:["... + ",a.length-10," more matches"]})]})]}),i.map(h=>{const f=t.filter(m=>m.group_id===h.id);return f.length===0?null:I.jsxs("div",{className:"bracket-round",children:[I.jsx("h3",{className:"round-title",children:h.label}),f.map(m=>I.jsx(am,{match:m,teamA:s(m.team_a_id),teamB:s(m.team_b_id),isAdmin:r},m.id))]},h.id)}),I.jsx("style",{children:`
        .bracket-wrapper {
            display: flex;
            flex-direction: column;
            gap: 3rem;
        }

        /* --- COURT GRID STYLES --- */
        .court-grid-section {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 16px;
            padding: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .section-title {
            color: var(--tennis-yellow);
            margin-bottom: 1.5rem;
            font-size: 1.4rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .court-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 1rem;
        }
        @media (max-width: 1200px) { .court-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) { .court-grid { grid-template-columns: repeat(2, 1fr); } }

        .court-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        .court-card.active {
            border-color: var(--tennis-green);
            background: linear-gradient(135deg, rgba(0, 78, 50, 0.4) 0%, rgba(0,0,0,0) 100%);
        }
        .court-card.empty {
            opacity: 0.5;
        }
        
        .court-header {
            font-size: 0.8rem;
            color: #aaa;
            margin-bottom: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: bold;
        }
        
        .court-match-info {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .court-team {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.95rem;
        }
        .team-name { color: white; font-weight: 500; }
        .team-score { 
            font-weight: bold; 
            font-size: 1.1rem; 
            color: var(--tennis-yellow);
            background: rgba(0,0,0,0.3);
            padding: 2px 8px;
            border-radius: 4px;
            min-width: 24px;
            text-align: center;
        }
        
        .vs-divider {
            text-align: center;
            font-size: 0.7rem;
            color: #666;
            margin: -4px 0;
            display: none; /* Minimalist style */
        }
        
        .match-status-badge {
            margin-top: 0.5rem;
            font-size: 0.75rem;
            text-align: center;
            background: rgba(255,255,255,0.1);
            padding: 2px 0;
            border-radius: 4px;
            color: #ccc;
        }
        
        .court-empty-state {
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #555;
            font-style: italic;
        }


        /* --- EXISTING STYLES --- */
        .bracket-container {
          display: flex;
          gap: 2rem;
          padding-bottom: 2rem;
          overflow-x: auto; /* Allow scrolling if too wide */
        }
        
        .bracket-round {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          min-width: 280px;
          flex: 1;
        }

        .round-title {
          color: var(--tennis-yellow);
          font-size: 1.2rem;
          margin-bottom: 1rem;
          border-bottom: 2px solid rgba(255,255,255,0.1);
          padding-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-align: center;
        }

        /* Mobile Styles */
        @media (max-width: 1024px) {
          .bracket-container {
            flex-direction: column;
          }
          .bracket-round {
            width: 100%;
            min-width: auto;
          }
        }
      `})]})]})},HS=({teams:t,groups:e})=>{const[n,r]=Ye.useState("rankings");return n==="roster"?I.jsxs("div",{className:"standings-container",children:[I.jsxs("div",{className:"view-toggle",children:[I.jsx("button",{onClick:()=>r("rankings"),className:"toggle-btn",children:"📊 조별 순위"}),I.jsx("button",{onClick:()=>r("roster"),className:"toggle-btn active",children:"📋 참가자 명단"})]}),I.jsx("div",{className:"glass-card full-width",children:I.jsx("div",{className:"table-responsive",children:I.jsxs("table",{className:"roster-table",children:[I.jsx("thead",{children:I.jsxs("tr",{children:[I.jsx("th",{children:"클럽"}),I.jsx("th",{children:"이름(1)"}),I.jsx("th",{children:"성별"}),I.jsx("th",{children:"점수"}),I.jsx("th",{children:"이름(2)"}),I.jsx("th",{children:"성별"}),I.jsx("th",{children:"점수"}),I.jsx("th",{children:"합계"}),I.jsx("th",{children:"조"})]})}),I.jsx("tbody",{children:t.map(i=>{var s;return I.jsxs("tr",{children:[I.jsx("td",{children:i.club||"-"}),I.jsx("td",{children:i.player1}),I.jsx("td",{children:i.p1_gender||"-"}),I.jsx("td",{children:i.p1_score||"-"}),I.jsx("td",{children:i.player2}),I.jsx("td",{children:i.p2_gender||"-"}),I.jsx("td",{children:i.p2_score||"-"}),I.jsx("td",{className:"highlight",children:i.total_score||"-"}),I.jsx("td",{children:((s=e.find(a=>a.team_ids.includes(i.id)))==null?void 0:s.name)||"-"})]},i.id)})})]})})}),I.jsx("style",{children:`
            .standings-container {
                max-width: 1200px;
                margin: 0 auto;
            }
            .view-toggle {
                display: flex;
                gap: 10px;
                margin-bottom: 1.5rem;
                justify-content: center;
            }
            .toggle-btn {
                padding: 0.8rem 1.5rem;
                background: rgba(255,255,255,0.1);
                border: 1px solid rgba(255,255,255,0.2);
                color: #aaa;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.2s;
            }
            .toggle-btn.active {
                background: var(--tennis-yellow);
                color: black;
                font-weight: bold;
                border-color: var(--tennis-yellow);
            }
            
            .glass-card {
                background: rgba(30,30,30,0.6);
                backdrop-filter: blur(10px);
                border-radius: 12px;
                padding: 1rem;
                border: 1px solid rgba(255,255,255,0.05);
            }

            .table-responsive {
                overflow-x: auto;
            }

            .roster-table {
                width: 100%;
                border-collapse: collapse;
                min-width: 800px; /* Force scroll on mobile */
                font-size: 0.9rem;
            }
            .roster-table th {
                background: rgba(0,0,0,0.3);
                padding: 1rem;
                text-align: center;
                color: var(--tennis-yellow);
                border-bottom: 2px solid rgba(255,255,255,0.1);
                white-space: nowrap;
            }
            .roster-table td {
                padding: 0.8rem;
                text-align: center;
                border-bottom: 1px solid rgba(255,255,255,0.05);
                color: #ddd;
            }
            .roster-table tr:hover {
                background: rgba(255,255,255,0.05);
            }
            .highlight {
                color: var(--tennis-yellow);
                font-weight: bold;
            }
        `})]}):I.jsxs("div",{className:"standings-container",children:[I.jsxs("div",{className:"view-toggle",children:[I.jsx("button",{onClick:()=>r("rankings"),className:"toggle-btn active",children:"📊 조별 순위"}),I.jsx("button",{onClick:()=>r("roster"),className:"toggle-btn",children:"📋 참가자 명단"})]}),I.jsx("div",{className:"rankings-grid",children:e.map(i=>{const a=[...i.team_ids.map(l=>t.find(u=>u.id===l)).filter(Boolean)].sort((l,u)=>u.points-l.points||u.games_won-l.games_won);return I.jsxs("div",{className:"group-card",children:[I.jsx("h3",{className:"group-title",children:i.name}),I.jsxs("table",{className:"standings-table",children:[I.jsx("thead",{children:I.jsxs("tr",{children:[I.jsx("th",{children:"Rank"}),I.jsx("th",{children:"Team"}),I.jsx("th",{children:"P"}),I.jsx("th",{children:"W"}),I.jsx("th",{children:"L"}),I.jsx("th",{children:"Pts"})]})}),I.jsx("tbody",{children:a.map((l,u)=>I.jsxs("tr",{children:[I.jsx("td",{children:u+1}),I.jsx("td",{className:"team-cell",children:I.jsx("div",{className:"t-name",children:l.name})}),I.jsx("td",{children:l.wins+l.losses+l.draws}),I.jsx("td",{children:l.wins}),I.jsx("td",{children:l.losses}),I.jsx("td",{className:"points",children:l.points})]},l.id))})]})]},i.id)})}),I.jsx("style",{children:`
        /* Shared Toggle Styles */
        .view-toggle {
            display: flex;
            gap: 10px;
            margin-bottom: 1.5rem;
            justify-content: center;
        }
        .toggle-btn {
            padding: 0.8rem 1.5rem;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            color: #aaa;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .toggle-btn.active {
            background: var(--tennis-yellow);
            color: black;
            font-weight: bold;
            border-color: var(--tennis-yellow);
        }

        .standings-container {
             /* Wrapper */
        }

        .rankings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .group-card {
          background-color: var(--card-bg);
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.2);
          height: fit-content;
        }
        .group-title {
          margin-top: 0;
          border-left: 4px solid var(--tennis-yellow);
          padding-left: 10px;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          color: #fff;
        }
        .standings-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }
        .standings-table th {
          text-align: center;
          color: #888;
          font-weight: 600;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .standings-table td {
          text-align: center;
          padding: 0.8rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          color: #ddd;
        }
        .standings-table .team-cell {
          text-align: left;
          width: 40%;
        }
        .t-name {
          font-weight: bold;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100px;
        }
        .points {
          color: var(--tennis-yellow);
          font-weight: bold;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .rankings-grid {
            grid-template-columns: 1fr;
          }
          .t-name {
            max-width: 140px; /* More space on mobile list */
          }
        }
      `})]})},WS=(t,e=8)=>{const n=Array.from({length:e},(r,i)=>({id:i+1,name:`${i+1}조`,team_ids:[]}));return t.forEach((r,i)=>{let s;if(r.initial_group){const a=parseInt(r.initial_group);!isNaN(a)&&a>=1&&a<=e?s=a-1:s=i%e}else s=i%e;n[s]&&n[s].team_ids.push(r.id)}),n},GS=t=>{const e=[];return t.forEach(n=>{const r=n.team_ids,i=r.length;if(i<2)return;let s=1;for(let a=0;a<i;a++)for(let l=a+1;l<i;l++){const u=`g${n.id}_m${s}`;e.push({id:u,group_id:n.id,round:s,team_a_id:r[a],team_b_id:r[l],score_a:0,score_b:0,status:"PENDING",court_id:null,winner_id:null}),s++}}),e},lm=(t,e)=>{let n=JSON.parse(JSON.stringify(t)),r=JSON.parse(JSON.stringify(e));const i=new Set;n.filter(l=>l.status==="LIVE").forEach(l=>{i.add(l.team_a_id),i.add(l.team_b_id)});const s=r.filter(l=>l.match_id===null);if(s.length===0)return{matches:n,courts:r};let a=n.filter(l=>l.status==="PENDING"&&!l.court_id);a.sort((l,u)=>l.round===u.round?l.group_id-u.group_id:l.round-u.round);for(const l of s){const u=a.findIndex(h=>!i.has(h.team_a_id)&&!i.has(h.team_b_id));if(u!==-1){const h=a[u],f=n.find(m=>m.id===h.id);f.status="LIVE",f.court_id=l.id,l.match_id=h.id,i.add(h.team_a_id),i.add(h.team_b_id),a.splice(u,1)}}return{matches:n,courts:r}},qS=({data:t,onUpdateData:e,isAdmin:n,onLogin:r})=>{const[i,s]=Ye.useState(""),[a,l]=Ye.useState(8),[u,h]=Ye.useState(10),[f,m]=Ye.useState(""),[_,A]=Ye.useState(""),[k,V]=Ye.useState(!1),[b,S]=Ye.useState("settings"),w=M=>{M.preventDefault(),f==="admin"?r(!0):alert("비밀번호가 틀렸습니다.")},x=async()=>{if(!i.trim()){alert("참가자 명단을 입력해주세요.");return}V(!0),A("데이터 처리 중...");try{const y=i.split(`
`).filter(ke=>ke.trim()).map((ke,St)=>{const Be=ke.trim().split(/\s+/);if(Be.length>=8){const at=Be[0],z=Be[1],G=Be[2],Y=Be[3],le=Be[4],ie=Be[5],me=Be[6],Vt=Be[7],Dt=Be[8]||null;return{id:`t${St+1}`,name:`${z}/${le}`,player1:z,player2:le,club:at,p1_gender:G,p1_score:Y,p2_gender:ie,p2_score:me,total_score:Vt,initial_group:Dt}}else{const at=ke.trim(),z=at.split("/");return{id:`t${St+1}`,name:at,player1:z[0]||"",player2:z[1]||"",club:"",initial_group:null}}});if(y.length<a&&!confirm(`팀 수(${y.length})가 조 개수(${a})보다 적습니다.계속 진행할까요?`)){V(!1);return}const g=WS(y,a),v=GS(g),T=Array.from({length:u},(ke,St)=>({id:St+1,match_id:null})),{matches:C,courts:R}=lm(v,T);await Rc({teams:y,groups:g,matches:C,courts:R}),A("✅ 대회 생성 및 업로드 완료!"),setTimeout(()=>A(""),3e3)}catch(M){console.error(M),A("❌ 오류: "+M.message)}finally{V(!1)}},D=async()=>{if(confirm("정말로 모든 대회를 초기화하시겠습니까? (데이터 삭제됨)")){V(!0);try{await BS(),A("🗑️ 데이터가 초기화되었습니다."),setTimeout(()=>A(""),3e3)}catch(M){console.error("초기화 실패:",M),A("❌ 초기화 실패: "+M.message)}finally{V(!1)}}},U=async()=>{V(!0);try{const{matches:M,courts:y}=lm(t.matches,t.courts),g={...t,matches:M,courts:y};await Rc(g),A("⚡ 코트 배정 완료!"),setTimeout(()=>A(""),3e3)}catch(M){console.error(M)}finally{V(!1)}};return n?I.jsxs("div",{className:"dashboard-container",children:[I.jsxs("div",{className:"dashboard-header",children:[I.jsxs("h2",{children:[I.jsx("span",{className:"icon-gap",children:"⚙️"})," 대회 운영 대시보드"]}),I.jsx("div",{className:"status-badge",children:k?"🔄 처리 중...":"✅ 시스템 준비됨"})]}),I.jsxs("div",{className:"dashboard-grid",children:[I.jsxs("div",{className:"left-col",children:[I.jsxs("div",{className:"tab-navigation",children:[I.jsx("button",{className:`tab-btn ${b==="settings"?"active":""}`,onClick:()=>S("settings"),children:"⚙️ 대회 운영 설정"}),I.jsx("button",{className:`tab-btn ${b==="grouping"?"active":""}`,onClick:()=>S("grouping"),children:"👥 조 편성"})]}),I.jsxs("div",{className:"glass-card setup-card",children:[b==="settings"&&I.jsxs("div",{className:"tab-content fade-in",children:[I.jsx("div",{className:"card-header",children:I.jsxs("h3",{children:[I.jsx("span",{className:"icon-gap",children:"⚙️"})," 환경 설정"]})}),I.jsxs("div",{className:"form-section",children:[I.jsxs("div",{className:"input-group",children:[I.jsx("label",{children:"조(Group) 개수"}),I.jsx("input",{type:"number",className:"modern-input",value:a,onChange:M=>l(Number(M.target.value))}),I.jsx("p",{className:"field-hint",children:"전체 참가팀을 나눌 조의 개수입니다."})]}),I.jsxs("div",{className:"input-group",style:{marginTop:"1.5rem"},children:[I.jsx("label",{children:"코트(Court) 개수"}),I.jsx("input",{type:"number",className:"modern-input",value:u,onChange:M=>h(Number(M.target.value))}),I.jsx("p",{className:"field-hint",children:"운영할 테니스 코트의 총 개수입니다."})]}),I.jsxs("div",{className:"info-box",children:[I.jsx("span",{children:"⚠️"}),I.jsx("span",{children:"이 설정은 [대진표 생성] 시 적용됩니다."})]})]})]}),b==="grouping"&&I.jsxs("div",{className:"tab-content fade-in",children:[I.jsx("div",{className:"card-header",children:I.jsxs("h3",{children:[I.jsx("span",{className:"icon-gap",children:"👥"})," 참가자 명단"]})}),I.jsxs("div",{className:"form-section",children:[I.jsx("label",{children:"참가 팀 입력 (한 줄에 한 팀)"}),I.jsx("textarea",{className:"modern-textarea",placeholder:`예시 1 (간편):
홍길동/이순신
김철수/박영희

예시 2 (상세 - 띄어쓰기 구분):
클럽명 1참가자 남 4.0 2참가자 여 3.0 7.0 1
(클럽, 이름1, 성별, 점수, 이름2, 성별, 점수, 합계, 조)`,value:i,onChange:M=>s(M.target.value)}),I.jsxs("div",{className:"action-buttons",children:[I.jsx("button",{onClick:x,disabled:k,className:"modern-button primary",children:"▶️ 대진표 생성 및 시작"}),I.jsx("button",{onClick:D,disabled:k,className:"modern-button danger",children:"🗑️ 대회 초기화"})]})]})]}),_&&I.jsx("div",{className:"status-message",children:_})]})]}),I.jsxs("div",{className:"right-col",children:[I.jsxs("div",{className:"glass-card status-card",children:[I.jsx("div",{className:"card-header",children:I.jsxs("h3",{children:[I.jsx("span",{className:"icon-gap",children:"✅"})," 현재 상태"]})}),I.jsxs("div",{className:"stat-grid",children:[I.jsxs("div",{className:"stat-item",children:[I.jsx("span",{className:"stat-label",children:"진행 중"}),I.jsx("span",{className:"stat-value live",children:t.matches.filter(M=>M.status==="LIVE").length})]}),I.jsxs("div",{className:"stat-item",children:[I.jsx("span",{className:"stat-label",children:"대기 중"}),I.jsx("span",{className:"stat-value",children:t.matches.filter(M=>M.status==="PENDING").length})]}),I.jsxs("div",{className:"stat-item",children:[I.jsx("span",{className:"stat-label",children:"완료됨"}),I.jsx("span",{className:"stat-value completed",children:t.matches.filter(M=>M.status==="COMPLETED").length})]})]})]}),I.jsxs("div",{className:"glass-card control-card",children:[I.jsx("div",{className:"card-header",children:I.jsxs("h3",{children:[I.jsx("span",{className:"icon-gap",children:"⚡"})," 경기 배정"]})}),I.jsx("p",{className:"card-desc",children:"빈 코트가 생기면 대기 중인 경기를 자동으로 배정합니다."}),I.jsx("button",{onClick:U,disabled:k,className:"modern-button secondary full-width",children:"⚡ 코트 자동 배정 (수동 실행)"})]}),I.jsxs("div",{className:"glass-card help-card",children:[I.jsx("div",{className:"card-header",children:I.jsxs("h3",{children:[I.jsx("span",{className:"icon-gap",children:"ℹ️"})," 관리자 가이드"]})}),I.jsxs("ul",{className:"help-list",children:[I.jsxs("li",{children:["• ",I.jsx("strong",{children:"[대회 운영 설정]"}),"에서 코트/조 개수를 정합니다."]}),I.jsxs("li",{children:["• ",I.jsx("strong",{children:"[조 편성]"}),"에서 명단을 넣고 [생성]을 누르세요."]}),I.jsxs("li",{children:["• 대회가 진행되면 ",I.jsx("strong",{children:"[자동 배정]"}),"을 적극 활용하세요."]})]})]})]})]}),I.jsx("style",{children:`
    .dashboard-container {
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
    color: white;
}
                .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
                .dashboard-header h2 {
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    color: white; /* Header is white for contrast */
    margin: 0;
}
                .status-badge {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    color: var(--text-secondary);
}

                .dashboard-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1.5rem;
}

@media(max-width: 768px) {
                    .dashboard-grid {
        grid-template-columns: 1fr;
    }
}
                
                /* --- TAB STYLES --- */
                .tab-navigation {
    display: flex;
    gap: 10px;
    margin-bottom: 1rem;
}
                .tab-btn {
    padding: 0.8rem 1.2rem;
    background: rgba(0,0,0,0.3);
    border: 1px solid rgba(255,255,255,0.1);
    color: #888;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
    font-size: 1rem;
    transition: all 0.2s ease;
}
                .tab-btn:hover {
    background: rgba(255,255,255,0.05);
    color: white;
}
                .tab-btn.active {
    background: var(--tennis-yellow);
    color: black;
    border-color: var(--tennis-yellow);
    box-shadow: 0 0 15px rgba(213, 255, 0, 0.3);
}
                
                .field-hint {
    font-size: 0.85rem;
    color: #666;
    margin-top: 5px;
}
                .info-box {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255,255,255,0.05);
    padding: 1rem;
    border-radius: 8px;
    margin-top: 2rem;
    color: #aaa;
    font-size: 0.9rem;
}
                
                .fade-in {
    animation: fadeIn 0.3s ease;
}


                .glass-card {
    background: rgba(30, 30, 30, 0.6);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
                
                .card-header {
    margin-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    padding-bottom: 0.5rem;
}
                .card-header h3 {
    margin: 0;
    font-size: 1.2rem;
    color: var(--tennis-yellow);
    display: flex;
    align-items: center;
}

                .modern-input, .modern-textarea {
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    padding: 0.8rem;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.3s;
    box-sizing: border-box; /* Fix width overlap */
}
                .modern-input:focus, .modern-textarea:focus {
    outline: none;
    border-color: var(--tennis-yellow);
    background: rgba(0, 0, 0, 0.5);
}
                .modern-textarea {
    min-height: 200px;
    line-height: 1.5;
    resize: vertical;
}

                .input-row {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
}
                .input-group {
    flex: 1;
}
                .input-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #aaa;
    font-size: 0.9rem;
}

                .action-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}
                
                .modern-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 1rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
}
                .modern-button:hover:not(:disabled) {
    transform: translateY(-2px);
    filter: brightness(1.1);
}
                .modern-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
                
                .primary {
    background: var(--tennis-yellow);
    color: black;
    flex: 2;
}
                .secondary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
}
                .danger {
    background: rgba(255, 68, 68, 0.2);
    color: #ff4444;
    border: 1px solid #ff4444;
    flex: 1;
}

                .full-width {
    width: 100%;
}

                .icon-gap {
    margin-right: 8px;
}

                .stat-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    text-align: center;
}
                .stat-item {
    background: rgba(0, 0, 0, 0.2);
    padding: 1rem 0.5rem;
    border-radius: 8px;
}
                .stat-label {
    display: block;
    font-size: 0.8rem;
    color: #888;
    margin-bottom: 5px;
}
                .stat-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
}
                .stat-value.live { color: #ff4444; }
                .stat-value.completed { color: #4caf50; }

                .card-desc {
    color: #aaa;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    line-height: 1.4;
}

                .help-list {
    list-style: none;
    padding: 0;
    margin: 0;
    color: #ccc;
    font-size: 0.9rem;
    line-height: 1.6;
}
                
                .status-message {
    margin-top: 1rem;
    padding: 1rem;
    background: rgba(213, 255, 0, 0.1);
    color: var(--tennis-yellow);
    border-radius: 8px;
    text-align: center;
    font-weight: bold;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
}
`})]}):I.jsxs("div",{className:"login-container glass-panel",children:[I.jsxs("div",{className:"login-box",children:[I.jsx("div",{className:"icon-wrapper",children:I.jsx("span",{style:{fontSize:"48px"},children:"⚙️"})}),I.jsx("h2",{children:"운영자 로그인"}),I.jsx("p",{children:"대회 설정을 위해 관리자 권한이 필요합니다."}),I.jsxs("form",{onSubmit:w,children:[I.jsx("input",{type:"password",placeholder:"비밀번호 입력",value:f,onChange:M=>m(M.target.value),className:"modern-input",autoFocus:!0}),I.jsx("button",{type:"submit",className:"modern-button primary full-width",children:"🔑 로그인"})]})]}),I.jsx("style",{children:`
    .login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
}
                    .login-box {
    background: rgba(0, 0, 0, 0.4);
    padding: 3rem;
    border-radius: 20px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    max-width: 400px;
    width: 100%;
}
                    .icon-wrapper {
    margin-bottom: 1.5rem;
    background: rgba(213, 255, 0, 0.1);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
}
                    .login-box h2 {
    color: white;
    margin-bottom: 0.5rem;
}
                    .login-box p {
    color: #aaa;
    margin-bottom: 2rem;
}
`})]})},QS={num_teams:32,num_groups:8,num_courts:6},KS=[{id:"t1",name:"김동현, 샤라포바",player1:"김동현",player2:"샤라포바",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:1},{id:"t2",name:"김연아, 방탄소년단 진",player1:"김연아",player2:"방탄소년단 진",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:1},{id:"t3",name:"손흥민, 방탄소년단 슈가",player1:"손흥민",player2:"방탄소년단 슈가",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:1},{id:"t4",name:"방탄소년단 RM, 방탄소년단 제이홉",player1:"방탄소년단 RM",player2:"방탄소년단 제이홉",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:1},{id:"t5",name:"안기린, 성범",player1:"안기린",player2:"성범",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:2},{id:"t6",name:"방탄소년단 지민, 아이유",player1:"방탄소년단 지민",player2:"아이유",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:2},{id:"t7",name:"방탄소년단 뷔, 박보검",player1:"방탄소년단 뷔",player2:"박보검",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:2},{id:"t8",name:"방탄소년단 정국, 송중기",player1:"방탄소년단 정국",player2:"송중기",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:2},{id:"t9",name:"살쾡이, 벨두광",player1:"살쾡이",player2:"벨두광",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:3},{id:"t10",name:"블랙핑크 지수, 블랙핑크 리사",player1:"블랙핑크 지수",player2:"블랙핑크 리사",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:3},{id:"t11",name:"블랙핑크 제니, 전지현",player1:"블랙핑크 제니",player2:"전지현",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:3},{id:"t12",name:"블랙핑크 로제, 이정재",player1:"블랙핑크 로제",player2:"이정재",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:3},{id:"t13",name:"가지코, 뻭가",player1:"가지코",player2:"뻭가",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:4},{id:"t14",name:"정우성, 손예진",player1:"정우성",player2:"손예진",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:4},{id:"t15",name:"공유, 강동원",player1:"공유",player2:"강동원",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:4},{id:"t16",name:"현빈, 마동석",player1:"현빈",player2:"마동석",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:4},{id:"t17",name:"신건주, 오렝지",player1:"신건주",player2:"오렝지",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:5},{id:"t18",name:"유재석, 박명수",player1:"유재석",player2:"박명수",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:5},{id:"t19",name:"강호동, 이효리",player1:"강호동",player2:"이효리",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:5},{id:"t20",name:"신동엽, 지드래곤",player1:"신동엽",player2:"지드래곤",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:5},{id:"t21",name:"짹짹이, 보람",player1:"짹짹이",player2:"보람",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:6},{id:"t22",name:"태연, 김수현",player1:"태연",player2:"김수현",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:6},{id:"t23",name:"수지, 김우빈",player1:"수지",player2:"김우빈",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:6},{id:"t24",name:"박서준, 이병헌",player1:"박서준",player2:"이병헌",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:6},{id:"t25",name:"산쵸황쵸, 인퀀",player1:"산쵸황쵸",player2:"인퀀",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:7},{id:"t26",name:"김혜수, 영탁",player1:"김혜수",player2:"영탁",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:7},{id:"t27",name:"하정우, 장원영",player1:"하정우",player2:"장원영",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:7},{id:"t28",name:"임영웅, 안유진",player1:"임영웅",player2:"안유진",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:7},{id:"t29",name:"호민, 김상수",player1:"호민",player2:"김상수",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:8},{id:"t30",name:"카리나, 크러쉬",player1:"카리나",player2:"크러쉬",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:8},{id:"t31",name:"윈터, 잔나비",player1:"윈터",player2:"잔나비",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:8},{id:"t32",name:"전소미, 원숭이",player1:"전소미",player2:"원숭이",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:8}],YS=[{id:1,name:"1조",team_ids:["t1","t2","t3","t4"]},{id:2,name:"2조",team_ids:["t5","t6","t7","t8"]},{id:3,name:"3조",team_ids:["t9","t10","t11","t12"]},{id:4,name:"4조",team_ids:["t13","t14","t15","t16"]},{id:5,name:"5조",team_ids:["t17","t18","t19","t20"]},{id:6,name:"6조",team_ids:["t21","t22","t23","t24"]},{id:7,name:"7조",team_ids:["t25","t26","t27","t28"]},{id:8,name:"8조",team_ids:["t29","t30","t31","t32"]}],XS=[{id:"g1_m1",group_id:1,round:1,team_a_id:"t1",team_b_id:"t2",score_a:5,score_b:5,point_a:0,point_b:0,status:"COMPLETED",court_id:null,winner_id:null,is_draw:!0},{id:"g1_m2",group_id:1,round:2,team_a_id:"t1",team_b_id:"t3",score_a:6,score_b:0,point_a:0,point_b:0,status:"COMPLETED",court_id:null,winner_id:"t1",is_draw:!1},{id:"g1_m3",group_id:1,round:3,team_a_id:"t1",team_b_id:"t4",score_a:5,score_b:5,point_a:0,point_b:0,status:"COMPLETED",court_id:null,winner_id:null,is_draw:!0},{id:"g1_m4",group_id:1,round:4,team_a_id:"t2",team_b_id:"t3",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g1_m5",group_id:1,round:5,team_a_id:"t2",team_b_id:"t4",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g1_m6",group_id:1,round:6,team_a_id:"t3",team_b_id:"t4",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g2_m1",group_id:2,round:1,team_a_id:"t5",team_b_id:"t6",score_a:0,score_b:0,point_a:0,point_b:0,status:"LIVE",court_id:2,winner_id:null,is_draw:!1},{id:"g2_m2",group_id:2,round:2,team_a_id:"t5",team_b_id:"t7",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g2_m3",group_id:2,round:3,team_a_id:"t5",team_b_id:"t8",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g2_m4",group_id:2,round:4,team_a_id:"t6",team_b_id:"t7",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g2_m5",group_id:2,round:5,team_a_id:"t6",team_b_id:"t8",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g2_m6",group_id:2,round:6,team_a_id:"t7",team_b_id:"t8",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g3_m1",group_id:3,round:1,team_a_id:"t9",team_b_id:"t10",score_a:0,score_b:0,point_a:0,point_b:0,status:"LIVE",court_id:3,winner_id:null,is_draw:!1},{id:"g3_m2",group_id:3,round:2,team_a_id:"t9",team_b_id:"t11",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g3_m3",group_id:3,round:3,team_a_id:"t9",team_b_id:"t12",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g3_m4",group_id:3,round:4,team_a_id:"t10",team_b_id:"t11",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g3_m5",group_id:3,round:5,team_a_id:"t10",team_b_id:"t12",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g3_m6",group_id:3,round:6,team_a_id:"t11",team_b_id:"t12",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g4_m1",group_id:4,round:1,team_a_id:"t13",team_b_id:"t14",score_a:0,score_b:0,point_a:0,point_b:0,status:"LIVE",court_id:4,winner_id:null,is_draw:!1},{id:"g4_m2",group_id:4,round:2,team_a_id:"t13",team_b_id:"t15",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g4_m3",group_id:4,round:3,team_a_id:"t13",team_b_id:"t16",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g4_m4",group_id:4,round:4,team_a_id:"t14",team_b_id:"t15",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g4_m5",group_id:4,round:5,team_a_id:"t14",team_b_id:"t16",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g4_m6",group_id:4,round:6,team_a_id:"t15",team_b_id:"t16",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g5_m1",group_id:5,round:1,team_a_id:"t17",team_b_id:"t18",score_a:0,score_b:0,point_a:0,point_b:0,status:"LIVE",court_id:5,winner_id:null,is_draw:!1},{id:"g5_m2",group_id:5,round:2,team_a_id:"t17",team_b_id:"t19",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g5_m3",group_id:5,round:3,team_a_id:"t17",team_b_id:"t20",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g5_m4",group_id:5,round:4,team_a_id:"t18",team_b_id:"t19",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g5_m5",group_id:5,round:5,team_a_id:"t18",team_b_id:"t20",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g5_m6",group_id:5,round:6,team_a_id:"t19",team_b_id:"t20",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g6_m1",group_id:6,round:1,team_a_id:"t21",team_b_id:"t22",score_a:0,score_b:0,point_a:0,point_b:0,status:"LIVE",court_id:6,winner_id:null,is_draw:!1},{id:"g6_m2",group_id:6,round:2,team_a_id:"t21",team_b_id:"t23",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g6_m3",group_id:6,round:3,team_a_id:"t21",team_b_id:"t24",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g6_m4",group_id:6,round:4,team_a_id:"t22",team_b_id:"t23",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g6_m5",group_id:6,round:5,team_a_id:"t22",team_b_id:"t24",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g6_m6",group_id:6,round:6,team_a_id:"t23",team_b_id:"t24",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g7_m1",group_id:7,round:1,team_a_id:"t25",team_b_id:"t26",score_a:6,score_b:0,point_a:0,point_b:0,status:"COMPLETED",court_id:null,winner_id:"t25",is_draw:!1},{id:"g7_m2",group_id:7,round:2,team_a_id:"t25",team_b_id:"t27",score_a:0,score_b:6,point_a:0,point_b:0,status:"COMPLETED",court_id:null,winner_id:"t27",is_draw:!1},{id:"g7_m3",group_id:7,round:3,team_a_id:"t25",team_b_id:"t28",score_a:0,score_b:0,point_a:0,point_b:0,status:"LIVE",court_id:1,winner_id:null,is_draw:!1},{id:"g7_m4",group_id:7,round:4,team_a_id:"t26",team_b_id:"t27",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g7_m5",group_id:7,round:5,team_a_id:"t26",team_b_id:"t28",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g7_m6",group_id:7,round:6,team_a_id:"t27",team_b_id:"t28",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g8_m1",group_id:8,round:1,team_a_id:"t29",team_b_id:"t30",score_a:6,score_b:0,point_a:0,point_b:0,status:"COMPLETED",court_id:null,winner_id:"t29",is_draw:!1},{id:"g8_m2",group_id:8,round:2,team_a_id:"t29",team_b_id:"t31",score_a:6,score_b:0,point_a:0,point_b:0,status:"COMPLETED",court_id:null,winner_id:"t29",is_draw:!1},{id:"g8_m3",group_id:8,round:3,team_a_id:"t29",team_b_id:"t32",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g8_m4",group_id:8,round:4,team_a_id:"t30",team_b_id:"t31",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g8_m5",group_id:8,round:5,team_a_id:"t30",team_b_id:"t32",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g8_m6",group_id:8,round:6,team_a_id:"t31",team_b_id:"t32",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1}],JS=[{id:1,match_id:"g7_m3"},{id:2,match_id:"g2_m1"},{id:3,match_id:"g3_m1"},{id:4,match_id:"g4_m1"},{id:5,match_id:"g5_m1"},{id:6,match_id:"g6_m1"}],ZS={is_active:!1,pot_1:[],pot_2:[],matches:[],current_drawer_idx:0,round_history:[],current_round_name:"16강"},e2=[],um={config:QS,teams:KS,groups:YS,matches:XS,courts:JS,knockout_draw:ZS,logs:e2};function t2(){const[t,e]=Ye.useState("match"),[n,r]=Ye.useState(um),[i,s]=Ye.useState(""),[a,l]=Ye.useState(!1);Ye.useEffect(()=>{const h=zS(r);return()=>h()},[]);const u=async()=>{if(confirm("현재 데이터를 Firebase에 업로드하시겠습니까? (기존 데이터 덮어쓰기)")){s("업로드 중...");try{await Rc(um),s("업로드 완료! (성공)"),setTimeout(()=>s(""),3e3)}catch(h){s("업로드 실패: "+h.message)}}};return I.jsxs(lE,{activeTab:t,onTabChange:e,isAdmin:a,onToggleAdmin:()=>{a?(l(!1),e("match")):e("admin")},children:[t!=="admin"&&I.jsxs("div",{style:{position:"fixed",bottom:"20px",right:"20px",zIndex:9999,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"10px"},children:[I.jsx("button",{onClick:()=>e("admin"),style:{padding:"10px 15px",background:"#444",color:"white",border:"1px solid #666",borderRadius:"8px",cursor:"pointer",opacity:.9,boxShadow:"0 2px 5px rgba(0,0,0,0.3)"},children:"🔐 운영자 로그인"}),a&&I.jsx("button",{onClick:u,style:{padding:"10px 15px",background:"#d32f2f",color:"white",border:"none",borderRadius:"8px",cursor:"pointer",opacity:.9,boxShadow:"0 2px 5px rgba(0,0,0,0.3)"},children:"DB 초기화 (주의)"})]}),t==="admin"?I.jsx(qS,{data:n,isAdmin:a,onLogin:h=>l(h)}):t==="match"?I.jsx($S,{matches:n.matches,teams:n.teams,courts:n.courts,isAdmin:a}):I.jsx(HS,{teams:n.teams,groups:n.groups})]})}fu.createRoot(document.getElementById("root")).render(I.jsx(Yv.StrictMode,{children:I.jsx(t2,{})}));
