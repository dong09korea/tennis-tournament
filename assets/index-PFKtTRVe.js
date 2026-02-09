(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function bv(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var dm={exports:{}},Da={},fm={exports:{}},X={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ms=Symbol.for("react.element"),Ov=Symbol.for("react.portal"),Fv=Symbol.for("react.fragment"),jv=Symbol.for("react.strict_mode"),Uv=Symbol.for("react.profiler"),zv=Symbol.for("react.provider"),Bv=Symbol.for("react.context"),$v=Symbol.for("react.forward_ref"),Hv=Symbol.for("react.suspense"),Gv=Symbol.for("react.memo"),Wv=Symbol.for("react.lazy"),rf=Symbol.iterator;function qv(t){return t===null||typeof t!="object"?null:(t=rf&&t[rf]||t["@@iterator"],typeof t=="function"?t:null)}var pm={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},mm=Object.assign,gm={};function hi(t,e,n){this.props=t,this.context=e,this.refs=gm,this.updater=n||pm}hi.prototype.isReactComponent={};hi.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};hi.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function _m(){}_m.prototype=hi.prototype;function xc(t,e,n){this.props=t,this.context=e,this.refs=gm,this.updater=n||pm}var Nc=xc.prototype=new _m;Nc.constructor=xc;mm(Nc,hi.prototype);Nc.isPureReactComponent=!0;var sf=Array.isArray,ym=Object.prototype.hasOwnProperty,Vc={current:null},vm={key:!0,ref:!0,__self:!0,__source:!0};function wm(t,e,n){var r,i={},s=null,a=null;if(e!=null)for(r in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(s=""+e.key),e)ym.call(e,r)&&!vm.hasOwnProperty(r)&&(i[r]=e[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var u=Array(l),h=0;h<l;h++)u[h]=arguments[h+2];i.children=u}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:Ms,type:t,key:s,ref:a,props:i,_owner:Vc.current}}function Qv(t,e){return{$$typeof:Ms,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Dc(t){return typeof t=="object"&&t!==null&&t.$$typeof===Ms}function Kv(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var of=/\/+/g;function Dl(t,e){return typeof t=="object"&&t!==null&&t.key!=null?Kv(""+t.key):e.toString(36)}function Mo(t,e,n,r,i){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case Ms:case Ov:a=!0}}if(a)return a=t,i=i(a),t=r===""?"."+Dl(a,0):r,sf(i)?(n="",t!=null&&(n=t.replace(of,"$&/")+"/"),Mo(i,e,n,"",function(h){return h})):i!=null&&(Dc(i)&&(i=Qv(i,n+(!i.key||a&&a.key===i.key?"":(""+i.key).replace(of,"$&/")+"/")+t)),e.push(i)),1;if(a=0,r=r===""?".":r+":",sf(t))for(var l=0;l<t.length;l++){s=t[l];var u=r+Dl(s,l);a+=Mo(s,e,n,u,i)}else if(u=qv(t),typeof u=="function")for(t=u.call(t),l=0;!(s=t.next()).done;)s=s.value,u=r+Dl(s,l++),a+=Mo(s,e,n,u,i);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function co(t,e,n){if(t==null)return t;var r=[],i=0;return Mo(t,r,"","",function(s){return e.call(n,s,i++)}),r}function Yv(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var rt={current:null},Lo={transition:null},Xv={ReactCurrentDispatcher:rt,ReactCurrentBatchConfig:Lo,ReactCurrentOwner:Vc};function Em(){throw Error("act(...) is not supported in production builds of React.")}X.Children={map:co,forEach:function(t,e,n){co(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return co(t,function(){e++}),e},toArray:function(t){return co(t,function(e){return e})||[]},only:function(t){if(!Dc(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};X.Component=hi;X.Fragment=Fv;X.Profiler=Uv;X.PureComponent=xc;X.StrictMode=jv;X.Suspense=Hv;X.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Xv;X.act=Em;X.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=mm({},t.props),i=t.key,s=t.ref,a=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,a=Vc.current),e.key!==void 0&&(i=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(u in e)ym.call(e,u)&&!vm.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&l!==void 0?l[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var h=0;h<u;h++)l[h]=arguments[h+2];r.children=l}return{$$typeof:Ms,type:t.type,key:i,ref:s,props:r,_owner:a}};X.createContext=function(t){return t={$$typeof:Bv,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:zv,_context:t},t.Consumer=t};X.createElement=wm;X.createFactory=function(t){var e=wm.bind(null,t);return e.type=t,e};X.createRef=function(){return{current:null}};X.forwardRef=function(t){return{$$typeof:$v,render:t}};X.isValidElement=Dc;X.lazy=function(t){return{$$typeof:Wv,_payload:{_status:-1,_result:t},_init:Yv}};X.memo=function(t,e){return{$$typeof:Gv,type:t,compare:e===void 0?null:e}};X.startTransition=function(t){var e=Lo.transition;Lo.transition={};try{t()}finally{Lo.transition=e}};X.unstable_act=Em;X.useCallback=function(t,e){return rt.current.useCallback(t,e)};X.useContext=function(t){return rt.current.useContext(t)};X.useDebugValue=function(){};X.useDeferredValue=function(t){return rt.current.useDeferredValue(t)};X.useEffect=function(t,e){return rt.current.useEffect(t,e)};X.useId=function(){return rt.current.useId()};X.useImperativeHandle=function(t,e,n){return rt.current.useImperativeHandle(t,e,n)};X.useInsertionEffect=function(t,e){return rt.current.useInsertionEffect(t,e)};X.useLayoutEffect=function(t,e){return rt.current.useLayoutEffect(t,e)};X.useMemo=function(t,e){return rt.current.useMemo(t,e)};X.useReducer=function(t,e,n){return rt.current.useReducer(t,e,n)};X.useRef=function(t){return rt.current.useRef(t)};X.useState=function(t){return rt.current.useState(t)};X.useSyncExternalStore=function(t,e,n){return rt.current.useSyncExternalStore(t,e,n)};X.useTransition=function(){return rt.current.useTransition()};X.version="18.3.1";fm.exports=X;var be=fm.exports;const Jv=bv(be);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Zv=be,e0=Symbol.for("react.element"),t0=Symbol.for("react.fragment"),n0=Object.prototype.hasOwnProperty,r0=Zv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i0={key:!0,ref:!0,__self:!0,__source:!0};function Tm(t,e,n){var r,i={},s=null,a=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);for(r in e)n0.call(e,r)&&!i0.hasOwnProperty(r)&&(i[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:e0,type:t,key:s,ref:a,props:i,_owner:r0.current}}Da.Fragment=t0;Da.jsx=Tm;Da.jsxs=Tm;dm.exports=Da;var P=dm.exports,pu={},Im={exports:{}},vt={},Sm={exports:{}},Am={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(z,q){var Y=z.length;z.push(q);e:for(;0<Y;){var pe=Y-1>>>1,oe=z[pe];if(0<i(oe,q))z[pe]=q,z[Y]=oe,Y=pe;else break e}}function n(z){return z.length===0?null:z[0]}function r(z){if(z.length===0)return null;var q=z[0],Y=z.pop();if(Y!==q){z[0]=Y;e:for(var pe=0,oe=z.length,Ee=oe>>>1;pe<Ee;){var Qt=2*(pe+1)-1,Kt=z[Qt],Yt=Qt+1,Xt=z[Yt];if(0>i(Kt,Y))Yt<oe&&0>i(Xt,Kt)?(z[pe]=Xt,z[Yt]=Y,pe=Yt):(z[pe]=Kt,z[Qt]=Y,pe=Qt);else if(Yt<oe&&0>i(Xt,Y))z[pe]=Xt,z[Yt]=Y,pe=Yt;else break e}}return q}function i(z,q){var Y=z.sortIndex-q.sortIndex;return Y!==0?Y:z.id-q.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,l=a.now();t.unstable_now=function(){return a.now()-l}}var u=[],h=[],f=1,m=null,_=3,S=!1,x=!1,D=!1,L=typeof setTimeout=="function"?setTimeout:null,I=typeof clearTimeout=="function"?clearTimeout:null,w=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function A(z){for(var q=n(h);q!==null;){if(q.callback===null)r(h);else if(q.startTime<=z)r(h),q.sortIndex=q.expirationTime,e(u,q);else break;q=n(h)}}function N(z){if(D=!1,A(z),!x)if(n(u)!==null)x=!0,yi(F);else{var q=n(h);q!==null&&qt(N,q.startTime-z)}}function F(z,q){x=!1,D&&(D=!1,I(g),g=-1),S=!0;var Y=_;try{for(A(q),m=n(u);m!==null&&(!(m.expirationTime>q)||z&&!C());){var pe=m.callback;if(typeof pe=="function"){m.callback=null,_=m.priorityLevel;var oe=pe(m.expirationTime<=q);q=t.unstable_now(),typeof oe=="function"?m.callback=oe:m===n(u)&&r(u),A(q)}else r(u);m=n(u)}if(m!==null)var Ee=!0;else{var Qt=n(h);Qt!==null&&qt(N,Qt.startTime-q),Ee=!1}return Ee}finally{m=null,_=Y,S=!1}}var U=!1,v=null,g=-1,y=5,T=-1;function C(){return!(t.unstable_now()-T<y)}function R(){if(v!==null){var z=t.unstable_now();T=z;var q=!0;try{q=v(!0,z)}finally{q?E():(U=!1,v=null)}}else U=!1}var E;if(typeof w=="function")E=function(){w(R)};else if(typeof MessageChannel<"u"){var Et=new MessageChannel,Kn=Et.port2;Et.port1.onmessage=R,E=function(){Kn.postMessage(null)}}else E=function(){L(R,0)};function yi(z){v=z,U||(U=!0,E())}function qt(z,q){g=L(function(){z(t.unstable_now())},q)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(z){z.callback=null},t.unstable_continueExecution=function(){x||S||(x=!0,yi(F))},t.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):y=0<z?Math.floor(1e3/z):5},t.unstable_getCurrentPriorityLevel=function(){return _},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function(z){switch(_){case 1:case 2:case 3:var q=3;break;default:q=_}var Y=_;_=q;try{return z()}finally{_=Y}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(z,q){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var Y=_;_=z;try{return q()}finally{_=Y}},t.unstable_scheduleCallback=function(z,q,Y){var pe=t.unstable_now();switch(typeof Y=="object"&&Y!==null?(Y=Y.delay,Y=typeof Y=="number"&&0<Y?pe+Y:pe):Y=pe,z){case 1:var oe=-1;break;case 2:oe=250;break;case 5:oe=1073741823;break;case 4:oe=1e4;break;default:oe=5e3}return oe=Y+oe,z={id:f++,callback:q,priorityLevel:z,startTime:Y,expirationTime:oe,sortIndex:-1},Y>pe?(z.sortIndex=Y,e(h,z),n(u)===null&&z===n(h)&&(D?(I(g),g=-1):D=!0,qt(N,Y-pe))):(z.sortIndex=oe,e(u,z),x||S||(x=!0,yi(F))),z},t.unstable_shouldYield=C,t.unstable_wrapCallback=function(z){var q=_;return function(){var Y=_;_=q;try{return z.apply(this,arguments)}finally{_=Y}}}})(Am);Sm.exports=Am;var s0=Sm.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var o0=be,yt=s0;function O(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Cm=new Set,us={};function yr(t,e){Yr(t,e),Yr(t+"Capture",e)}function Yr(t,e){for(us[t]=e,t=0;t<e.length;t++)Cm.add(e[t])}var an=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),mu=Object.prototype.hasOwnProperty,a0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,af={},lf={};function l0(t){return mu.call(lf,t)?!0:mu.call(af,t)?!1:a0.test(t)?lf[t]=!0:(af[t]=!0,!1)}function u0(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function c0(t,e,n,r){if(e===null||typeof e>"u"||u0(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function it(t,e,n,r,i,s,a){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=a}var Ue={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Ue[t]=new it(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Ue[e]=new it(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Ue[t]=new it(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Ue[t]=new it(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Ue[t]=new it(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Ue[t]=new it(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Ue[t]=new it(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Ue[t]=new it(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Ue[t]=new it(t,5,!1,t.toLowerCase(),null,!1,!1)});var Mc=/[\-:]([a-z])/g;function Lc(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Mc,Lc);Ue[e]=new it(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Mc,Lc);Ue[e]=new it(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Mc,Lc);Ue[e]=new it(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Ue[t]=new it(t,1,!1,t.toLowerCase(),null,!1,!1)});Ue.xlinkHref=new it("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Ue[t]=new it(t,1,!1,t.toLowerCase(),null,!0,!0)});function bc(t,e,n,r){var i=Ue.hasOwnProperty(e)?Ue[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(c0(e,n,i,r)&&(n=null),r||i===null?l0(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):i.mustUseProperty?t[i.propertyName]=n===null?i.type===3?!1:"":n:(e=i.attributeName,r=i.attributeNamespace,n===null?t.removeAttribute(e):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var pn=o0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ho=Symbol.for("react.element"),xr=Symbol.for("react.portal"),Nr=Symbol.for("react.fragment"),Oc=Symbol.for("react.strict_mode"),gu=Symbol.for("react.profiler"),Rm=Symbol.for("react.provider"),Pm=Symbol.for("react.context"),Fc=Symbol.for("react.forward_ref"),_u=Symbol.for("react.suspense"),yu=Symbol.for("react.suspense_list"),jc=Symbol.for("react.memo"),wn=Symbol.for("react.lazy"),km=Symbol.for("react.offscreen"),uf=Symbol.iterator;function Vi(t){return t===null||typeof t!="object"?null:(t=uf&&t[uf]||t["@@iterator"],typeof t=="function"?t:null)}var _e=Object.assign,Ml;function zi(t){if(Ml===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Ml=e&&e[1]||""}return`
`+Ml+t}var Ll=!1;function bl(t,e){if(!t||Ll)return"";Ll=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(h){var r=h}Reflect.construct(t,[],e)}else{try{e.call()}catch(h){r=h}t.call(e.prototype)}else{try{throw Error()}catch(h){r=h}t()}}catch(h){if(h&&r&&typeof h.stack=="string"){for(var i=h.stack.split(`
`),s=r.stack.split(`
`),a=i.length-1,l=s.length-1;1<=a&&0<=l&&i[a]!==s[l];)l--;for(;1<=a&&0<=l;a--,l--)if(i[a]!==s[l]){if(a!==1||l!==1)do if(a--,l--,0>l||i[a]!==s[l]){var u=`
`+i[a].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=a&&0<=l);break}}}finally{Ll=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?zi(t):""}function h0(t){switch(t.tag){case 5:return zi(t.type);case 16:return zi("Lazy");case 13:return zi("Suspense");case 19:return zi("SuspenseList");case 0:case 2:case 15:return t=bl(t.type,!1),t;case 11:return t=bl(t.type.render,!1),t;case 1:return t=bl(t.type,!0),t;default:return""}}function vu(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Nr:return"Fragment";case xr:return"Portal";case gu:return"Profiler";case Oc:return"StrictMode";case _u:return"Suspense";case yu:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Pm:return(t.displayName||"Context")+".Consumer";case Rm:return(t._context.displayName||"Context")+".Provider";case Fc:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case jc:return e=t.displayName||null,e!==null?e:vu(t.type)||"Memo";case wn:e=t._payload,t=t._init;try{return vu(t(e))}catch{}}return null}function d0(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return vu(e);case 8:return e===Oc?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Un(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function xm(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function f0(t){var e=xm(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(a){r=""+a,s.call(this,a)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function fo(t){t._valueTracker||(t._valueTracker=f0(t))}function Nm(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=xm(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function Xo(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function wu(t,e){var n=e.checked;return _e({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function cf(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=Un(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Vm(t,e){e=e.checked,e!=null&&bc(t,"checked",e,!1)}function Eu(t,e){Vm(t,e);var n=Un(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Tu(t,e.type,n):e.hasOwnProperty("defaultValue")&&Tu(t,e.type,Un(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function hf(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Tu(t,e,n){(e!=="number"||Xo(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Bi=Array.isArray;function Br(t,e,n,r){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&r&&(t[n].defaultSelected=!0)}else{for(n=""+Un(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,r&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function Iu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(O(91));return _e({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function df(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(O(92));if(Bi(n)){if(1<n.length)throw Error(O(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Un(n)}}function Dm(t,e){var n=Un(e.value),r=Un(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function ff(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Mm(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Su(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Mm(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var po,Lm=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,i){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,i)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(po=po||document.createElement("div"),po.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=po.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function cs(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Yi={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},p0=["Webkit","ms","Moz","O"];Object.keys(Yi).forEach(function(t){p0.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Yi[e]=Yi[t]})});function bm(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Yi.hasOwnProperty(t)&&Yi[t]?(""+e).trim():e+"px"}function Om(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=bm(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,i):t[n]=i}}var m0=_e({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Au(t,e){if(e){if(m0[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(O(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(O(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(O(61))}if(e.style!=null&&typeof e.style!="object")throw Error(O(62))}}function Cu(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ru=null;function Uc(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Pu=null,$r=null,Hr=null;function pf(t){if(t=Os(t)){if(typeof Pu!="function")throw Error(O(280));var e=t.stateNode;e&&(e=Fa(e),Pu(t.stateNode,t.type,e))}}function Fm(t){$r?Hr?Hr.push(t):Hr=[t]:$r=t}function jm(){if($r){var t=$r,e=Hr;if(Hr=$r=null,pf(t),e)for(t=0;t<e.length;t++)pf(e[t])}}function Um(t,e){return t(e)}function zm(){}var Ol=!1;function Bm(t,e,n){if(Ol)return t(e,n);Ol=!0;try{return Um(t,e,n)}finally{Ol=!1,($r!==null||Hr!==null)&&(zm(),jm())}}function hs(t,e){var n=t.stateNode;if(n===null)return null;var r=Fa(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(O(231,e,typeof n));return n}var ku=!1;if(an)try{var Di={};Object.defineProperty(Di,"passive",{get:function(){ku=!0}}),window.addEventListener("test",Di,Di),window.removeEventListener("test",Di,Di)}catch{ku=!1}function g0(t,e,n,r,i,s,a,l,u){var h=Array.prototype.slice.call(arguments,3);try{e.apply(n,h)}catch(f){this.onError(f)}}var Xi=!1,Jo=null,Zo=!1,xu=null,_0={onError:function(t){Xi=!0,Jo=t}};function y0(t,e,n,r,i,s,a,l,u){Xi=!1,Jo=null,g0.apply(_0,arguments)}function v0(t,e,n,r,i,s,a,l,u){if(y0.apply(this,arguments),Xi){if(Xi){var h=Jo;Xi=!1,Jo=null}else throw Error(O(198));Zo||(Zo=!0,xu=h)}}function vr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function $m(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function mf(t){if(vr(t)!==t)throw Error(O(188))}function w0(t){var e=t.alternate;if(!e){if(e=vr(t),e===null)throw Error(O(188));return e!==t?null:t}for(var n=t,r=e;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return mf(i),t;if(s===r)return mf(i),e;s=s.sibling}throw Error(O(188))}if(n.return!==r.return)n=i,r=s;else{for(var a=!1,l=i.child;l;){if(l===n){a=!0,n=i,r=s;break}if(l===r){a=!0,r=i,n=s;break}l=l.sibling}if(!a){for(l=s.child;l;){if(l===n){a=!0,n=s,r=i;break}if(l===r){a=!0,r=s,n=i;break}l=l.sibling}if(!a)throw Error(O(189))}}if(n.alternate!==r)throw Error(O(190))}if(n.tag!==3)throw Error(O(188));return n.stateNode.current===n?t:e}function Hm(t){return t=w0(t),t!==null?Gm(t):null}function Gm(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Gm(t);if(e!==null)return e;t=t.sibling}return null}var Wm=yt.unstable_scheduleCallback,gf=yt.unstable_cancelCallback,E0=yt.unstable_shouldYield,T0=yt.unstable_requestPaint,Ie=yt.unstable_now,I0=yt.unstable_getCurrentPriorityLevel,zc=yt.unstable_ImmediatePriority,qm=yt.unstable_UserBlockingPriority,ea=yt.unstable_NormalPriority,S0=yt.unstable_LowPriority,Qm=yt.unstable_IdlePriority,Ma=null,Ut=null;function A0(t){if(Ut&&typeof Ut.onCommitFiberRoot=="function")try{Ut.onCommitFiberRoot(Ma,t,void 0,(t.current.flags&128)===128)}catch{}}var Mt=Math.clz32?Math.clz32:P0,C0=Math.log,R0=Math.LN2;function P0(t){return t>>>=0,t===0?32:31-(C0(t)/R0|0)|0}var mo=64,go=4194304;function $i(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function ta(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,i=t.suspendedLanes,s=t.pingedLanes,a=n&268435455;if(a!==0){var l=a&~i;l!==0?r=$i(l):(s&=a,s!==0&&(r=$i(s)))}else a=n&~i,a!==0?r=$i(a):s!==0&&(r=$i(s));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-Mt(e),i=1<<n,r|=t[n],e&=~i;return r}function k0(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function x0(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,i=t.expirationTimes,s=t.pendingLanes;0<s;){var a=31-Mt(s),l=1<<a,u=i[a];u===-1?(!(l&n)||l&r)&&(i[a]=k0(l,e)):u<=e&&(t.expiredLanes|=l),s&=~l}}function Nu(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Km(){var t=mo;return mo<<=1,!(mo&4194240)&&(mo=64),t}function Fl(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ls(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Mt(e),t[e]=n}function N0(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var i=31-Mt(n),s=1<<i;e[i]=0,r[i]=-1,t[i]=-1,n&=~s}}function Bc(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-Mt(n),i=1<<r;i&e|t[r]&e&&(t[r]|=e),n&=~i}}var ie=0;function Ym(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Xm,$c,Jm,Zm,eg,Vu=!1,_o=[],Pn=null,kn=null,xn=null,ds=new Map,fs=new Map,Tn=[],V0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function _f(t,e){switch(t){case"focusin":case"focusout":Pn=null;break;case"dragenter":case"dragleave":kn=null;break;case"mouseover":case"mouseout":xn=null;break;case"pointerover":case"pointerout":ds.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":fs.delete(e.pointerId)}}function Mi(t,e,n,r,i,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},e!==null&&(e=Os(e),e!==null&&$c(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function D0(t,e,n,r,i){switch(e){case"focusin":return Pn=Mi(Pn,t,e,n,r,i),!0;case"dragenter":return kn=Mi(kn,t,e,n,r,i),!0;case"mouseover":return xn=Mi(xn,t,e,n,r,i),!0;case"pointerover":var s=i.pointerId;return ds.set(s,Mi(ds.get(s)||null,t,e,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,fs.set(s,Mi(fs.get(s)||null,t,e,n,r,i)),!0}return!1}function tg(t){var e=rr(t.target);if(e!==null){var n=vr(e);if(n!==null){if(e=n.tag,e===13){if(e=$m(n),e!==null){t.blockedOn=e,eg(t.priority,function(){Jm(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function bo(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Du(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);Ru=r,n.target.dispatchEvent(r),Ru=null}else return e=Os(n),e!==null&&$c(e),t.blockedOn=n,!1;e.shift()}return!0}function yf(t,e,n){bo(t)&&n.delete(e)}function M0(){Vu=!1,Pn!==null&&bo(Pn)&&(Pn=null),kn!==null&&bo(kn)&&(kn=null),xn!==null&&bo(xn)&&(xn=null),ds.forEach(yf),fs.forEach(yf)}function Li(t,e){t.blockedOn===e&&(t.blockedOn=null,Vu||(Vu=!0,yt.unstable_scheduleCallback(yt.unstable_NormalPriority,M0)))}function ps(t){function e(i){return Li(i,t)}if(0<_o.length){Li(_o[0],t);for(var n=1;n<_o.length;n++){var r=_o[n];r.blockedOn===t&&(r.blockedOn=null)}}for(Pn!==null&&Li(Pn,t),kn!==null&&Li(kn,t),xn!==null&&Li(xn,t),ds.forEach(e),fs.forEach(e),n=0;n<Tn.length;n++)r=Tn[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<Tn.length&&(n=Tn[0],n.blockedOn===null);)tg(n),n.blockedOn===null&&Tn.shift()}var Gr=pn.ReactCurrentBatchConfig,na=!0;function L0(t,e,n,r){var i=ie,s=Gr.transition;Gr.transition=null;try{ie=1,Hc(t,e,n,r)}finally{ie=i,Gr.transition=s}}function b0(t,e,n,r){var i=ie,s=Gr.transition;Gr.transition=null;try{ie=4,Hc(t,e,n,r)}finally{ie=i,Gr.transition=s}}function Hc(t,e,n,r){if(na){var i=Du(t,e,n,r);if(i===null)Ql(t,e,r,ra,n),_f(t,r);else if(D0(i,t,e,n,r))r.stopPropagation();else if(_f(t,r),e&4&&-1<V0.indexOf(t)){for(;i!==null;){var s=Os(i);if(s!==null&&Xm(s),s=Du(t,e,n,r),s===null&&Ql(t,e,r,ra,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else Ql(t,e,r,null,n)}}var ra=null;function Du(t,e,n,r){if(ra=null,t=Uc(r),t=rr(t),t!==null)if(e=vr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=$m(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return ra=t,null}function ng(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(I0()){case zc:return 1;case qm:return 4;case ea:case S0:return 16;case Qm:return 536870912;default:return 16}default:return 16}}var Sn=null,Gc=null,Oo=null;function rg(){if(Oo)return Oo;var t,e=Gc,n=e.length,r,i="value"in Sn?Sn.value:Sn.textContent,s=i.length;for(t=0;t<n&&e[t]===i[t];t++);var a=n-t;for(r=1;r<=a&&e[n-r]===i[s-r];r++);return Oo=i.slice(t,1<r?1-r:void 0)}function Fo(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function yo(){return!0}function vf(){return!1}function wt(t){function e(n,r,i,s,a){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(s):s[l]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?yo:vf,this.isPropagationStopped=vf,this}return _e(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=yo)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=yo)},persist:function(){},isPersistent:yo}),e}var di={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Wc=wt(di),bs=_e({},di,{view:0,detail:0}),O0=wt(bs),jl,Ul,bi,La=_e({},bs,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:qc,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==bi&&(bi&&t.type==="mousemove"?(jl=t.screenX-bi.screenX,Ul=t.screenY-bi.screenY):Ul=jl=0,bi=t),jl)},movementY:function(t){return"movementY"in t?t.movementY:Ul}}),wf=wt(La),F0=_e({},La,{dataTransfer:0}),j0=wt(F0),U0=_e({},bs,{relatedTarget:0}),zl=wt(U0),z0=_e({},di,{animationName:0,elapsedTime:0,pseudoElement:0}),B0=wt(z0),$0=_e({},di,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),H0=wt($0),G0=_e({},di,{data:0}),Ef=wt(G0),W0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},q0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Q0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function K0(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Q0[t])?!!e[t]:!1}function qc(){return K0}var Y0=_e({},bs,{key:function(t){if(t.key){var e=W0[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Fo(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?q0[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:qc,charCode:function(t){return t.type==="keypress"?Fo(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Fo(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),X0=wt(Y0),J0=_e({},La,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Tf=wt(J0),Z0=_e({},bs,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:qc}),ew=wt(Z0),tw=_e({},di,{propertyName:0,elapsedTime:0,pseudoElement:0}),nw=wt(tw),rw=_e({},La,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),iw=wt(rw),sw=[9,13,27,32],Qc=an&&"CompositionEvent"in window,Ji=null;an&&"documentMode"in document&&(Ji=document.documentMode);var ow=an&&"TextEvent"in window&&!Ji,ig=an&&(!Qc||Ji&&8<Ji&&11>=Ji),If=" ",Sf=!1;function sg(t,e){switch(t){case"keyup":return sw.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function og(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Vr=!1;function aw(t,e){switch(t){case"compositionend":return og(e);case"keypress":return e.which!==32?null:(Sf=!0,If);case"textInput":return t=e.data,t===If&&Sf?null:t;default:return null}}function lw(t,e){if(Vr)return t==="compositionend"||!Qc&&sg(t,e)?(t=rg(),Oo=Gc=Sn=null,Vr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return ig&&e.locale!=="ko"?null:e.data;default:return null}}var uw={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Af(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!uw[t.type]:e==="textarea"}function ag(t,e,n,r){Fm(r),e=ia(e,"onChange"),0<e.length&&(n=new Wc("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var Zi=null,ms=null;function cw(t){yg(t,0)}function ba(t){var e=Lr(t);if(Nm(e))return t}function hw(t,e){if(t==="change")return e}var lg=!1;if(an){var Bl;if(an){var $l="oninput"in document;if(!$l){var Cf=document.createElement("div");Cf.setAttribute("oninput","return;"),$l=typeof Cf.oninput=="function"}Bl=$l}else Bl=!1;lg=Bl&&(!document.documentMode||9<document.documentMode)}function Rf(){Zi&&(Zi.detachEvent("onpropertychange",ug),ms=Zi=null)}function ug(t){if(t.propertyName==="value"&&ba(ms)){var e=[];ag(e,ms,t,Uc(t)),Bm(cw,e)}}function dw(t,e,n){t==="focusin"?(Rf(),Zi=e,ms=n,Zi.attachEvent("onpropertychange",ug)):t==="focusout"&&Rf()}function fw(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return ba(ms)}function pw(t,e){if(t==="click")return ba(e)}function mw(t,e){if(t==="input"||t==="change")return ba(e)}function gw(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var bt=typeof Object.is=="function"?Object.is:gw;function gs(t,e){if(bt(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!mu.call(e,i)||!bt(t[i],e[i]))return!1}return!0}function Pf(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function kf(t,e){var n=Pf(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Pf(n)}}function cg(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?cg(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function hg(){for(var t=window,e=Xo();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Xo(t.document)}return e}function Kc(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function _w(t){var e=hg(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&cg(n.ownerDocument.documentElement,n)){if(r!==null&&Kc(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!t.extend&&s>r&&(i=r,r=s,s=i),i=kf(n,s);var a=kf(n,r);i&&a&&(t.rangeCount!==1||t.anchorNode!==i.node||t.anchorOffset!==i.offset||t.focusNode!==a.node||t.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),t.removeAllRanges(),s>r?(t.addRange(e),t.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var yw=an&&"documentMode"in document&&11>=document.documentMode,Dr=null,Mu=null,es=null,Lu=!1;function xf(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Lu||Dr==null||Dr!==Xo(r)||(r=Dr,"selectionStart"in r&&Kc(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),es&&gs(es,r)||(es=r,r=ia(Mu,"onSelect"),0<r.length&&(e=new Wc("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=Dr)))}function vo(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Mr={animationend:vo("Animation","AnimationEnd"),animationiteration:vo("Animation","AnimationIteration"),animationstart:vo("Animation","AnimationStart"),transitionend:vo("Transition","TransitionEnd")},Hl={},dg={};an&&(dg=document.createElement("div").style,"AnimationEvent"in window||(delete Mr.animationend.animation,delete Mr.animationiteration.animation,delete Mr.animationstart.animation),"TransitionEvent"in window||delete Mr.transitionend.transition);function Oa(t){if(Hl[t])return Hl[t];if(!Mr[t])return t;var e=Mr[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in dg)return Hl[t]=e[n];return t}var fg=Oa("animationend"),pg=Oa("animationiteration"),mg=Oa("animationstart"),gg=Oa("transitionend"),_g=new Map,Nf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Gn(t,e){_g.set(t,e),yr(e,[t])}for(var Gl=0;Gl<Nf.length;Gl++){var Wl=Nf[Gl],vw=Wl.toLowerCase(),ww=Wl[0].toUpperCase()+Wl.slice(1);Gn(vw,"on"+ww)}Gn(fg,"onAnimationEnd");Gn(pg,"onAnimationIteration");Gn(mg,"onAnimationStart");Gn("dblclick","onDoubleClick");Gn("focusin","onFocus");Gn("focusout","onBlur");Gn(gg,"onTransitionEnd");Yr("onMouseEnter",["mouseout","mouseover"]);Yr("onMouseLeave",["mouseout","mouseover"]);Yr("onPointerEnter",["pointerout","pointerover"]);Yr("onPointerLeave",["pointerout","pointerover"]);yr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));yr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));yr("onBeforeInput",["compositionend","keypress","textInput","paste"]);yr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));yr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));yr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Hi="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ew=new Set("cancel close invalid load scroll toggle".split(" ").concat(Hi));function Vf(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,v0(r,e,void 0,t),t.currentTarget=null}function yg(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],i=r.event;r=r.listeners;e:{var s=void 0;if(e)for(var a=r.length-1;0<=a;a--){var l=r[a],u=l.instance,h=l.currentTarget;if(l=l.listener,u!==s&&i.isPropagationStopped())break e;Vf(i,l,h),s=u}else for(a=0;a<r.length;a++){if(l=r[a],u=l.instance,h=l.currentTarget,l=l.listener,u!==s&&i.isPropagationStopped())break e;Vf(i,l,h),s=u}}}if(Zo)throw t=xu,Zo=!1,xu=null,t}function ce(t,e){var n=e[Uu];n===void 0&&(n=e[Uu]=new Set);var r=t+"__bubble";n.has(r)||(vg(e,t,2,!1),n.add(r))}function ql(t,e,n){var r=0;e&&(r|=4),vg(n,t,r,e)}var wo="_reactListening"+Math.random().toString(36).slice(2);function _s(t){if(!t[wo]){t[wo]=!0,Cm.forEach(function(n){n!=="selectionchange"&&(Ew.has(n)||ql(n,!1,t),ql(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[wo]||(e[wo]=!0,ql("selectionchange",!1,e))}}function vg(t,e,n,r){switch(ng(e)){case 1:var i=L0;break;case 4:i=b0;break;default:i=Hc}n=i.bind(null,e,n,t),i=void 0,!ku||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function Ql(t,e,n,r,i){var s=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(a===4)for(a=r.return;a!==null;){var u=a.tag;if((u===3||u===4)&&(u=a.stateNode.containerInfo,u===i||u.nodeType===8&&u.parentNode===i))return;a=a.return}for(;l!==null;){if(a=rr(l),a===null)return;if(u=a.tag,u===5||u===6){r=s=a;continue e}l=l.parentNode}}r=r.return}Bm(function(){var h=s,f=Uc(n),m=[];e:{var _=_g.get(t);if(_!==void 0){var S=Wc,x=t;switch(t){case"keypress":if(Fo(n)===0)break e;case"keydown":case"keyup":S=X0;break;case"focusin":x="focus",S=zl;break;case"focusout":x="blur",S=zl;break;case"beforeblur":case"afterblur":S=zl;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":S=wf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":S=j0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":S=ew;break;case fg:case pg:case mg:S=B0;break;case gg:S=nw;break;case"scroll":S=O0;break;case"wheel":S=iw;break;case"copy":case"cut":case"paste":S=H0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":S=Tf}var D=(e&4)!==0,L=!D&&t==="scroll",I=D?_!==null?_+"Capture":null:_;D=[];for(var w=h,A;w!==null;){A=w;var N=A.stateNode;if(A.tag===5&&N!==null&&(A=N,I!==null&&(N=hs(w,I),N!=null&&D.push(ys(w,N,A)))),L)break;w=w.return}0<D.length&&(_=new S(_,x,null,n,f),m.push({event:_,listeners:D}))}}if(!(e&7)){e:{if(_=t==="mouseover"||t==="pointerover",S=t==="mouseout"||t==="pointerout",_&&n!==Ru&&(x=n.relatedTarget||n.fromElement)&&(rr(x)||x[ln]))break e;if((S||_)&&(_=f.window===f?f:(_=f.ownerDocument)?_.defaultView||_.parentWindow:window,S?(x=n.relatedTarget||n.toElement,S=h,x=x?rr(x):null,x!==null&&(L=vr(x),x!==L||x.tag!==5&&x.tag!==6)&&(x=null)):(S=null,x=h),S!==x)){if(D=wf,N="onMouseLeave",I="onMouseEnter",w="mouse",(t==="pointerout"||t==="pointerover")&&(D=Tf,N="onPointerLeave",I="onPointerEnter",w="pointer"),L=S==null?_:Lr(S),A=x==null?_:Lr(x),_=new D(N,w+"leave",S,n,f),_.target=L,_.relatedTarget=A,N=null,rr(f)===h&&(D=new D(I,w+"enter",x,n,f),D.target=A,D.relatedTarget=L,N=D),L=N,S&&x)t:{for(D=S,I=x,w=0,A=D;A;A=Cr(A))w++;for(A=0,N=I;N;N=Cr(N))A++;for(;0<w-A;)D=Cr(D),w--;for(;0<A-w;)I=Cr(I),A--;for(;w--;){if(D===I||I!==null&&D===I.alternate)break t;D=Cr(D),I=Cr(I)}D=null}else D=null;S!==null&&Df(m,_,S,D,!1),x!==null&&L!==null&&Df(m,L,x,D,!0)}}e:{if(_=h?Lr(h):window,S=_.nodeName&&_.nodeName.toLowerCase(),S==="select"||S==="input"&&_.type==="file")var F=hw;else if(Af(_))if(lg)F=mw;else{F=fw;var U=dw}else(S=_.nodeName)&&S.toLowerCase()==="input"&&(_.type==="checkbox"||_.type==="radio")&&(F=pw);if(F&&(F=F(t,h))){ag(m,F,n,f);break e}U&&U(t,_,h),t==="focusout"&&(U=_._wrapperState)&&U.controlled&&_.type==="number"&&Tu(_,"number",_.value)}switch(U=h?Lr(h):window,t){case"focusin":(Af(U)||U.contentEditable==="true")&&(Dr=U,Mu=h,es=null);break;case"focusout":es=Mu=Dr=null;break;case"mousedown":Lu=!0;break;case"contextmenu":case"mouseup":case"dragend":Lu=!1,xf(m,n,f);break;case"selectionchange":if(yw)break;case"keydown":case"keyup":xf(m,n,f)}var v;if(Qc)e:{switch(t){case"compositionstart":var g="onCompositionStart";break e;case"compositionend":g="onCompositionEnd";break e;case"compositionupdate":g="onCompositionUpdate";break e}g=void 0}else Vr?sg(t,n)&&(g="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(g="onCompositionStart");g&&(ig&&n.locale!=="ko"&&(Vr||g!=="onCompositionStart"?g==="onCompositionEnd"&&Vr&&(v=rg()):(Sn=f,Gc="value"in Sn?Sn.value:Sn.textContent,Vr=!0)),U=ia(h,g),0<U.length&&(g=new Ef(g,t,null,n,f),m.push({event:g,listeners:U}),v?g.data=v:(v=og(n),v!==null&&(g.data=v)))),(v=ow?aw(t,n):lw(t,n))&&(h=ia(h,"onBeforeInput"),0<h.length&&(f=new Ef("onBeforeInput","beforeinput",null,n,f),m.push({event:f,listeners:h}),f.data=v))}yg(m,e)})}function ys(t,e,n){return{instance:t,listener:e,currentTarget:n}}function ia(t,e){for(var n=e+"Capture",r=[];t!==null;){var i=t,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=hs(t,n),s!=null&&r.unshift(ys(t,s,i)),s=hs(t,e),s!=null&&r.push(ys(t,s,i))),t=t.return}return r}function Cr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Df(t,e,n,r,i){for(var s=e._reactName,a=[];n!==null&&n!==r;){var l=n,u=l.alternate,h=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&h!==null&&(l=h,i?(u=hs(n,s),u!=null&&a.unshift(ys(n,u,l))):i||(u=hs(n,s),u!=null&&a.push(ys(n,u,l)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var Tw=/\r\n?/g,Iw=/\u0000|\uFFFD/g;function Mf(t){return(typeof t=="string"?t:""+t).replace(Tw,`
`).replace(Iw,"")}function Eo(t,e,n){if(e=Mf(e),Mf(t)!==e&&n)throw Error(O(425))}function sa(){}var bu=null,Ou=null;function Fu(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var ju=typeof setTimeout=="function"?setTimeout:void 0,Sw=typeof clearTimeout=="function"?clearTimeout:void 0,Lf=typeof Promise=="function"?Promise:void 0,Aw=typeof queueMicrotask=="function"?queueMicrotask:typeof Lf<"u"?function(t){return Lf.resolve(null).then(t).catch(Cw)}:ju;function Cw(t){setTimeout(function(){throw t})}function Kl(t,e){var n=e,r=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){t.removeChild(i),ps(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);ps(e)}function Nn(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function bf(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var fi=Math.random().toString(36).slice(2),jt="__reactFiber$"+fi,vs="__reactProps$"+fi,ln="__reactContainer$"+fi,Uu="__reactEvents$"+fi,Rw="__reactListeners$"+fi,Pw="__reactHandles$"+fi;function rr(t){var e=t[jt];if(e)return e;for(var n=t.parentNode;n;){if(e=n[ln]||n[jt]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=bf(t);t!==null;){if(n=t[jt])return n;t=bf(t)}return e}t=n,n=t.parentNode}return null}function Os(t){return t=t[jt]||t[ln],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Lr(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(O(33))}function Fa(t){return t[vs]||null}var zu=[],br=-1;function Wn(t){return{current:t}}function he(t){0>br||(t.current=zu[br],zu[br]=null,br--)}function le(t,e){br++,zu[br]=t.current,t.current=e}var zn={},Xe=Wn(zn),lt=Wn(!1),cr=zn;function Xr(t,e){var n=t.type.contextTypes;if(!n)return zn;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=e[s];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=i),i}function ut(t){return t=t.childContextTypes,t!=null}function oa(){he(lt),he(Xe)}function Of(t,e,n){if(Xe.current!==zn)throw Error(O(168));le(Xe,e),le(lt,n)}function wg(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(O(108,d0(t)||"Unknown",i));return _e({},n,r)}function aa(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||zn,cr=Xe.current,le(Xe,t),le(lt,lt.current),!0}function Ff(t,e,n){var r=t.stateNode;if(!r)throw Error(O(169));n?(t=wg(t,e,cr),r.__reactInternalMemoizedMergedChildContext=t,he(lt),he(Xe),le(Xe,t)):he(lt),le(lt,n)}var tn=null,ja=!1,Yl=!1;function Eg(t){tn===null?tn=[t]:tn.push(t)}function kw(t){ja=!0,Eg(t)}function qn(){if(!Yl&&tn!==null){Yl=!0;var t=0,e=ie;try{var n=tn;for(ie=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}tn=null,ja=!1}catch(i){throw tn!==null&&(tn=tn.slice(t+1)),Wm(zc,qn),i}finally{ie=e,Yl=!1}}return null}var Or=[],Fr=0,la=null,ua=0,Tt=[],It=0,hr=null,nn=1,rn="";function er(t,e){Or[Fr++]=ua,Or[Fr++]=la,la=t,ua=e}function Tg(t,e,n){Tt[It++]=nn,Tt[It++]=rn,Tt[It++]=hr,hr=t;var r=nn;t=rn;var i=32-Mt(r)-1;r&=~(1<<i),n+=1;var s=32-Mt(e)+i;if(30<s){var a=i-i%5;s=(r&(1<<a)-1).toString(32),r>>=a,i-=a,nn=1<<32-Mt(e)+i|n<<i|r,rn=s+t}else nn=1<<s|n<<i|r,rn=t}function Yc(t){t.return!==null&&(er(t,1),Tg(t,1,0))}function Xc(t){for(;t===la;)la=Or[--Fr],Or[Fr]=null,ua=Or[--Fr],Or[Fr]=null;for(;t===hr;)hr=Tt[--It],Tt[It]=null,rn=Tt[--It],Tt[It]=null,nn=Tt[--It],Tt[It]=null}var gt=null,ft=null,de=!1,Dt=null;function Ig(t,e){var n=St(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function jf(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,gt=t,ft=Nn(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,gt=t,ft=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=hr!==null?{id:nn,overflow:rn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=St(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,gt=t,ft=null,!0):!1;default:return!1}}function Bu(t){return(t.mode&1)!==0&&(t.flags&128)===0}function $u(t){if(de){var e=ft;if(e){var n=e;if(!jf(t,e)){if(Bu(t))throw Error(O(418));e=Nn(n.nextSibling);var r=gt;e&&jf(t,e)?Ig(r,n):(t.flags=t.flags&-4097|2,de=!1,gt=t)}}else{if(Bu(t))throw Error(O(418));t.flags=t.flags&-4097|2,de=!1,gt=t}}}function Uf(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;gt=t}function To(t){if(t!==gt)return!1;if(!de)return Uf(t),de=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Fu(t.type,t.memoizedProps)),e&&(e=ft)){if(Bu(t))throw Sg(),Error(O(418));for(;e;)Ig(t,e),e=Nn(e.nextSibling)}if(Uf(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(O(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){ft=Nn(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}ft=null}}else ft=gt?Nn(t.stateNode.nextSibling):null;return!0}function Sg(){for(var t=ft;t;)t=Nn(t.nextSibling)}function Jr(){ft=gt=null,de=!1}function Jc(t){Dt===null?Dt=[t]:Dt.push(t)}var xw=pn.ReactCurrentBatchConfig;function Oi(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(O(309));var r=n.stateNode}if(!r)throw Error(O(147,t));var i=r,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(a){var l=i.refs;a===null?delete l[s]:l[s]=a},e._stringRef=s,e)}if(typeof t!="string")throw Error(O(284));if(!n._owner)throw Error(O(290,t))}return t}function Io(t,e){throw t=Object.prototype.toString.call(e),Error(O(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function zf(t){var e=t._init;return e(t._payload)}function Ag(t){function e(I,w){if(t){var A=I.deletions;A===null?(I.deletions=[w],I.flags|=16):A.push(w)}}function n(I,w){if(!t)return null;for(;w!==null;)e(I,w),w=w.sibling;return null}function r(I,w){for(I=new Map;w!==null;)w.key!==null?I.set(w.key,w):I.set(w.index,w),w=w.sibling;return I}function i(I,w){return I=Ln(I,w),I.index=0,I.sibling=null,I}function s(I,w,A){return I.index=A,t?(A=I.alternate,A!==null?(A=A.index,A<w?(I.flags|=2,w):A):(I.flags|=2,w)):(I.flags|=1048576,w)}function a(I){return t&&I.alternate===null&&(I.flags|=2),I}function l(I,w,A,N){return w===null||w.tag!==6?(w=ru(A,I.mode,N),w.return=I,w):(w=i(w,A),w.return=I,w)}function u(I,w,A,N){var F=A.type;return F===Nr?f(I,w,A.props.children,N,A.key):w!==null&&(w.elementType===F||typeof F=="object"&&F!==null&&F.$$typeof===wn&&zf(F)===w.type)?(N=i(w,A.props),N.ref=Oi(I,w,A),N.return=I,N):(N=Go(A.type,A.key,A.props,null,I.mode,N),N.ref=Oi(I,w,A),N.return=I,N)}function h(I,w,A,N){return w===null||w.tag!==4||w.stateNode.containerInfo!==A.containerInfo||w.stateNode.implementation!==A.implementation?(w=iu(A,I.mode,N),w.return=I,w):(w=i(w,A.children||[]),w.return=I,w)}function f(I,w,A,N,F){return w===null||w.tag!==7?(w=lr(A,I.mode,N,F),w.return=I,w):(w=i(w,A),w.return=I,w)}function m(I,w,A){if(typeof w=="string"&&w!==""||typeof w=="number")return w=ru(""+w,I.mode,A),w.return=I,w;if(typeof w=="object"&&w!==null){switch(w.$$typeof){case ho:return A=Go(w.type,w.key,w.props,null,I.mode,A),A.ref=Oi(I,null,w),A.return=I,A;case xr:return w=iu(w,I.mode,A),w.return=I,w;case wn:var N=w._init;return m(I,N(w._payload),A)}if(Bi(w)||Vi(w))return w=lr(w,I.mode,A,null),w.return=I,w;Io(I,w)}return null}function _(I,w,A,N){var F=w!==null?w.key:null;if(typeof A=="string"&&A!==""||typeof A=="number")return F!==null?null:l(I,w,""+A,N);if(typeof A=="object"&&A!==null){switch(A.$$typeof){case ho:return A.key===F?u(I,w,A,N):null;case xr:return A.key===F?h(I,w,A,N):null;case wn:return F=A._init,_(I,w,F(A._payload),N)}if(Bi(A)||Vi(A))return F!==null?null:f(I,w,A,N,null);Io(I,A)}return null}function S(I,w,A,N,F){if(typeof N=="string"&&N!==""||typeof N=="number")return I=I.get(A)||null,l(w,I,""+N,F);if(typeof N=="object"&&N!==null){switch(N.$$typeof){case ho:return I=I.get(N.key===null?A:N.key)||null,u(w,I,N,F);case xr:return I=I.get(N.key===null?A:N.key)||null,h(w,I,N,F);case wn:var U=N._init;return S(I,w,A,U(N._payload),F)}if(Bi(N)||Vi(N))return I=I.get(A)||null,f(w,I,N,F,null);Io(w,N)}return null}function x(I,w,A,N){for(var F=null,U=null,v=w,g=w=0,y=null;v!==null&&g<A.length;g++){v.index>g?(y=v,v=null):y=v.sibling;var T=_(I,v,A[g],N);if(T===null){v===null&&(v=y);break}t&&v&&T.alternate===null&&e(I,v),w=s(T,w,g),U===null?F=T:U.sibling=T,U=T,v=y}if(g===A.length)return n(I,v),de&&er(I,g),F;if(v===null){for(;g<A.length;g++)v=m(I,A[g],N),v!==null&&(w=s(v,w,g),U===null?F=v:U.sibling=v,U=v);return de&&er(I,g),F}for(v=r(I,v);g<A.length;g++)y=S(v,I,g,A[g],N),y!==null&&(t&&y.alternate!==null&&v.delete(y.key===null?g:y.key),w=s(y,w,g),U===null?F=y:U.sibling=y,U=y);return t&&v.forEach(function(C){return e(I,C)}),de&&er(I,g),F}function D(I,w,A,N){var F=Vi(A);if(typeof F!="function")throw Error(O(150));if(A=F.call(A),A==null)throw Error(O(151));for(var U=F=null,v=w,g=w=0,y=null,T=A.next();v!==null&&!T.done;g++,T=A.next()){v.index>g?(y=v,v=null):y=v.sibling;var C=_(I,v,T.value,N);if(C===null){v===null&&(v=y);break}t&&v&&C.alternate===null&&e(I,v),w=s(C,w,g),U===null?F=C:U.sibling=C,U=C,v=y}if(T.done)return n(I,v),de&&er(I,g),F;if(v===null){for(;!T.done;g++,T=A.next())T=m(I,T.value,N),T!==null&&(w=s(T,w,g),U===null?F=T:U.sibling=T,U=T);return de&&er(I,g),F}for(v=r(I,v);!T.done;g++,T=A.next())T=S(v,I,g,T.value,N),T!==null&&(t&&T.alternate!==null&&v.delete(T.key===null?g:T.key),w=s(T,w,g),U===null?F=T:U.sibling=T,U=T);return t&&v.forEach(function(R){return e(I,R)}),de&&er(I,g),F}function L(I,w,A,N){if(typeof A=="object"&&A!==null&&A.type===Nr&&A.key===null&&(A=A.props.children),typeof A=="object"&&A!==null){switch(A.$$typeof){case ho:e:{for(var F=A.key,U=w;U!==null;){if(U.key===F){if(F=A.type,F===Nr){if(U.tag===7){n(I,U.sibling),w=i(U,A.props.children),w.return=I,I=w;break e}}else if(U.elementType===F||typeof F=="object"&&F!==null&&F.$$typeof===wn&&zf(F)===U.type){n(I,U.sibling),w=i(U,A.props),w.ref=Oi(I,U,A),w.return=I,I=w;break e}n(I,U);break}else e(I,U);U=U.sibling}A.type===Nr?(w=lr(A.props.children,I.mode,N,A.key),w.return=I,I=w):(N=Go(A.type,A.key,A.props,null,I.mode,N),N.ref=Oi(I,w,A),N.return=I,I=N)}return a(I);case xr:e:{for(U=A.key;w!==null;){if(w.key===U)if(w.tag===4&&w.stateNode.containerInfo===A.containerInfo&&w.stateNode.implementation===A.implementation){n(I,w.sibling),w=i(w,A.children||[]),w.return=I,I=w;break e}else{n(I,w);break}else e(I,w);w=w.sibling}w=iu(A,I.mode,N),w.return=I,I=w}return a(I);case wn:return U=A._init,L(I,w,U(A._payload),N)}if(Bi(A))return x(I,w,A,N);if(Vi(A))return D(I,w,A,N);Io(I,A)}return typeof A=="string"&&A!==""||typeof A=="number"?(A=""+A,w!==null&&w.tag===6?(n(I,w.sibling),w=i(w,A),w.return=I,I=w):(n(I,w),w=ru(A,I.mode,N),w.return=I,I=w),a(I)):n(I,w)}return L}var Zr=Ag(!0),Cg=Ag(!1),ca=Wn(null),ha=null,jr=null,Zc=null;function eh(){Zc=jr=ha=null}function th(t){var e=ca.current;he(ca),t._currentValue=e}function Hu(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function Wr(t,e){ha=t,Zc=jr=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(at=!0),t.firstContext=null)}function Rt(t){var e=t._currentValue;if(Zc!==t)if(t={context:t,memoizedValue:e,next:null},jr===null){if(ha===null)throw Error(O(308));jr=t,ha.dependencies={lanes:0,firstContext:t}}else jr=jr.next=t;return e}var ir=null;function nh(t){ir===null?ir=[t]:ir.push(t)}function Rg(t,e,n,r){var i=e.interleaved;return i===null?(n.next=n,nh(e)):(n.next=i.next,i.next=n),e.interleaved=n,un(t,r)}function un(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var En=!1;function rh(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Pg(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function sn(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Vn(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,te&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,un(t,n)}return i=r.interleaved,i===null?(e.next=e,nh(r)):(e.next=i.next,i.next=e),r.interleaved=e,un(t,n)}function jo(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Bc(t,n)}}function Bf(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?i=s=e:s=s.next=e}else i=s=e;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function da(t,e,n,r){var i=t.updateQueue;En=!1;var s=i.firstBaseUpdate,a=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var u=l,h=u.next;u.next=null,a===null?s=h:a.next=h,a=u;var f=t.alternate;f!==null&&(f=f.updateQueue,l=f.lastBaseUpdate,l!==a&&(l===null?f.firstBaseUpdate=h:l.next=h,f.lastBaseUpdate=u))}if(s!==null){var m=i.baseState;a=0,f=h=u=null,l=s;do{var _=l.lane,S=l.eventTime;if((r&_)===_){f!==null&&(f=f.next={eventTime:S,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var x=t,D=l;switch(_=e,S=n,D.tag){case 1:if(x=D.payload,typeof x=="function"){m=x.call(S,m,_);break e}m=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=D.payload,_=typeof x=="function"?x.call(S,m,_):x,_==null)break e;m=_e({},m,_);break e;case 2:En=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,_=i.effects,_===null?i.effects=[l]:_.push(l))}else S={eventTime:S,lane:_,tag:l.tag,payload:l.payload,callback:l.callback,next:null},f===null?(h=f=S,u=m):f=f.next=S,a|=_;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;_=l,l=_.next,_.next=null,i.lastBaseUpdate=_,i.shared.pending=null}}while(!0);if(f===null&&(u=m),i.baseState=u,i.firstBaseUpdate=h,i.lastBaseUpdate=f,e=i.shared.interleaved,e!==null){i=e;do a|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);fr|=a,t.lanes=a,t.memoizedState=m}}function $f(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(O(191,i));i.call(r)}}}var Fs={},zt=Wn(Fs),ws=Wn(Fs),Es=Wn(Fs);function sr(t){if(t===Fs)throw Error(O(174));return t}function ih(t,e){switch(le(Es,e),le(ws,t),le(zt,Fs),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Su(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Su(e,t)}he(zt),le(zt,e)}function ei(){he(zt),he(ws),he(Es)}function kg(t){sr(Es.current);var e=sr(zt.current),n=Su(e,t.type);e!==n&&(le(ws,t),le(zt,n))}function sh(t){ws.current===t&&(he(zt),he(ws))}var me=Wn(0);function fa(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Xl=[];function oh(){for(var t=0;t<Xl.length;t++)Xl[t]._workInProgressVersionPrimary=null;Xl.length=0}var Uo=pn.ReactCurrentDispatcher,Jl=pn.ReactCurrentBatchConfig,dr=0,ge=null,Ce=null,Ne=null,pa=!1,ts=!1,Ts=0,Nw=0;function Ge(){throw Error(O(321))}function ah(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!bt(t[n],e[n]))return!1;return!0}function lh(t,e,n,r,i,s){if(dr=s,ge=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Uo.current=t===null||t.memoizedState===null?Lw:bw,t=n(r,i),ts){s=0;do{if(ts=!1,Ts=0,25<=s)throw Error(O(301));s+=1,Ne=Ce=null,e.updateQueue=null,Uo.current=Ow,t=n(r,i)}while(ts)}if(Uo.current=ma,e=Ce!==null&&Ce.next!==null,dr=0,Ne=Ce=ge=null,pa=!1,e)throw Error(O(300));return t}function uh(){var t=Ts!==0;return Ts=0,t}function Ft(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ne===null?ge.memoizedState=Ne=t:Ne=Ne.next=t,Ne}function Pt(){if(Ce===null){var t=ge.alternate;t=t!==null?t.memoizedState:null}else t=Ce.next;var e=Ne===null?ge.memoizedState:Ne.next;if(e!==null)Ne=e,Ce=t;else{if(t===null)throw Error(O(310));Ce=t,t={memoizedState:Ce.memoizedState,baseState:Ce.baseState,baseQueue:Ce.baseQueue,queue:Ce.queue,next:null},Ne===null?ge.memoizedState=Ne=t:Ne=Ne.next=t}return Ne}function Is(t,e){return typeof e=="function"?e(t):e}function Zl(t){var e=Pt(),n=e.queue;if(n===null)throw Error(O(311));n.lastRenderedReducer=t;var r=Ce,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var a=i.next;i.next=s.next,s.next=a}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var l=a=null,u=null,h=s;do{var f=h.lane;if((dr&f)===f)u!==null&&(u=u.next={lane:0,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),r=h.hasEagerState?h.eagerState:t(r,h.action);else{var m={lane:f,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null};u===null?(l=u=m,a=r):u=u.next=m,ge.lanes|=f,fr|=f}h=h.next}while(h!==null&&h!==s);u===null?a=r:u.next=l,bt(r,e.memoizedState)||(at=!0),e.memoizedState=r,e.baseState=a,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){i=t;do s=i.lane,ge.lanes|=s,fr|=s,i=i.next;while(i!==t)}else i===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function eu(t){var e=Pt(),n=e.queue;if(n===null)throw Error(O(311));n.lastRenderedReducer=t;var r=n.dispatch,i=n.pending,s=e.memoizedState;if(i!==null){n.pending=null;var a=i=i.next;do s=t(s,a.action),a=a.next;while(a!==i);bt(s,e.memoizedState)||(at=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,r]}function xg(){}function Ng(t,e){var n=ge,r=Pt(),i=e(),s=!bt(r.memoizedState,i);if(s&&(r.memoizedState=i,at=!0),r=r.queue,ch(Mg.bind(null,n,r,t),[t]),r.getSnapshot!==e||s||Ne!==null&&Ne.memoizedState.tag&1){if(n.flags|=2048,Ss(9,Dg.bind(null,n,r,i,e),void 0,null),Ve===null)throw Error(O(349));dr&30||Vg(n,e,i)}return i}function Vg(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=ge.updateQueue,e===null?(e={lastEffect:null,stores:null},ge.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Dg(t,e,n,r){e.value=n,e.getSnapshot=r,Lg(e)&&bg(t)}function Mg(t,e,n){return n(function(){Lg(e)&&bg(t)})}function Lg(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!bt(t,n)}catch{return!0}}function bg(t){var e=un(t,1);e!==null&&Lt(e,t,1,-1)}function Hf(t){var e=Ft();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Is,lastRenderedState:t},e.queue=t,t=t.dispatch=Mw.bind(null,ge,t),[e.memoizedState,t]}function Ss(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=ge.updateQueue,e===null?(e={lastEffect:null,stores:null},ge.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function Og(){return Pt().memoizedState}function zo(t,e,n,r){var i=Ft();ge.flags|=t,i.memoizedState=Ss(1|e,n,void 0,r===void 0?null:r)}function Ua(t,e,n,r){var i=Pt();r=r===void 0?null:r;var s=void 0;if(Ce!==null){var a=Ce.memoizedState;if(s=a.destroy,r!==null&&ah(r,a.deps)){i.memoizedState=Ss(e,n,s,r);return}}ge.flags|=t,i.memoizedState=Ss(1|e,n,s,r)}function Gf(t,e){return zo(8390656,8,t,e)}function ch(t,e){return Ua(2048,8,t,e)}function Fg(t,e){return Ua(4,2,t,e)}function jg(t,e){return Ua(4,4,t,e)}function Ug(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function zg(t,e,n){return n=n!=null?n.concat([t]):null,Ua(4,4,Ug.bind(null,e,t),n)}function hh(){}function Bg(t,e){var n=Pt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&ah(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function $g(t,e){var n=Pt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&ah(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function Hg(t,e,n){return dr&21?(bt(n,e)||(n=Km(),ge.lanes|=n,fr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,at=!0),t.memoizedState=n)}function Vw(t,e){var n=ie;ie=n!==0&&4>n?n:4,t(!0);var r=Jl.transition;Jl.transition={};try{t(!1),e()}finally{ie=n,Jl.transition=r}}function Gg(){return Pt().memoizedState}function Dw(t,e,n){var r=Mn(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Wg(t))qg(e,n);else if(n=Rg(t,e,n,r),n!==null){var i=nt();Lt(n,t,r,i),Qg(n,e,r)}}function Mw(t,e,n){var r=Mn(t),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Wg(t))qg(e,i);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var a=e.lastRenderedState,l=s(a,n);if(i.hasEagerState=!0,i.eagerState=l,bt(l,a)){var u=e.interleaved;u===null?(i.next=i,nh(e)):(i.next=u.next,u.next=i),e.interleaved=i;return}}catch{}finally{}n=Rg(t,e,i,r),n!==null&&(i=nt(),Lt(n,t,r,i),Qg(n,e,r))}}function Wg(t){var e=t.alternate;return t===ge||e!==null&&e===ge}function qg(t,e){ts=pa=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Qg(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Bc(t,n)}}var ma={readContext:Rt,useCallback:Ge,useContext:Ge,useEffect:Ge,useImperativeHandle:Ge,useInsertionEffect:Ge,useLayoutEffect:Ge,useMemo:Ge,useReducer:Ge,useRef:Ge,useState:Ge,useDebugValue:Ge,useDeferredValue:Ge,useTransition:Ge,useMutableSource:Ge,useSyncExternalStore:Ge,useId:Ge,unstable_isNewReconciler:!1},Lw={readContext:Rt,useCallback:function(t,e){return Ft().memoizedState=[t,e===void 0?null:e],t},useContext:Rt,useEffect:Gf,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,zo(4194308,4,Ug.bind(null,e,t),n)},useLayoutEffect:function(t,e){return zo(4194308,4,t,e)},useInsertionEffect:function(t,e){return zo(4,2,t,e)},useMemo:function(t,e){var n=Ft();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=Ft();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=Dw.bind(null,ge,t),[r.memoizedState,t]},useRef:function(t){var e=Ft();return t={current:t},e.memoizedState=t},useState:Hf,useDebugValue:hh,useDeferredValue:function(t){return Ft().memoizedState=t},useTransition:function(){var t=Hf(!1),e=t[0];return t=Vw.bind(null,t[1]),Ft().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=ge,i=Ft();if(de){if(n===void 0)throw Error(O(407));n=n()}else{if(n=e(),Ve===null)throw Error(O(349));dr&30||Vg(r,e,n)}i.memoizedState=n;var s={value:n,getSnapshot:e};return i.queue=s,Gf(Mg.bind(null,r,s,t),[t]),r.flags|=2048,Ss(9,Dg.bind(null,r,s,n,e),void 0,null),n},useId:function(){var t=Ft(),e=Ve.identifierPrefix;if(de){var n=rn,r=nn;n=(r&~(1<<32-Mt(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=Ts++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=Nw++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},bw={readContext:Rt,useCallback:Bg,useContext:Rt,useEffect:ch,useImperativeHandle:zg,useInsertionEffect:Fg,useLayoutEffect:jg,useMemo:$g,useReducer:Zl,useRef:Og,useState:function(){return Zl(Is)},useDebugValue:hh,useDeferredValue:function(t){var e=Pt();return Hg(e,Ce.memoizedState,t)},useTransition:function(){var t=Zl(Is)[0],e=Pt().memoizedState;return[t,e]},useMutableSource:xg,useSyncExternalStore:Ng,useId:Gg,unstable_isNewReconciler:!1},Ow={readContext:Rt,useCallback:Bg,useContext:Rt,useEffect:ch,useImperativeHandle:zg,useInsertionEffect:Fg,useLayoutEffect:jg,useMemo:$g,useReducer:eu,useRef:Og,useState:function(){return eu(Is)},useDebugValue:hh,useDeferredValue:function(t){var e=Pt();return Ce===null?e.memoizedState=t:Hg(e,Ce.memoizedState,t)},useTransition:function(){var t=eu(Is)[0],e=Pt().memoizedState;return[t,e]},useMutableSource:xg,useSyncExternalStore:Ng,useId:Gg,unstable_isNewReconciler:!1};function Nt(t,e){if(t&&t.defaultProps){e=_e({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Gu(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:_e({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var za={isMounted:function(t){return(t=t._reactInternals)?vr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=nt(),i=Mn(t),s=sn(r,i);s.payload=e,n!=null&&(s.callback=n),e=Vn(t,s,i),e!==null&&(Lt(e,t,i,r),jo(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=nt(),i=Mn(t),s=sn(r,i);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Vn(t,s,i),e!==null&&(Lt(e,t,i,r),jo(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=nt(),r=Mn(t),i=sn(n,r);i.tag=2,e!=null&&(i.callback=e),e=Vn(t,i,r),e!==null&&(Lt(e,t,r,n),jo(e,t,r))}};function Wf(t,e,n,r,i,s,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,s,a):e.prototype&&e.prototype.isPureReactComponent?!gs(n,r)||!gs(i,s):!0}function Kg(t,e,n){var r=!1,i=zn,s=e.contextType;return typeof s=="object"&&s!==null?s=Rt(s):(i=ut(e)?cr:Xe.current,r=e.contextTypes,s=(r=r!=null)?Xr(t,i):zn),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=za,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=s),e}function qf(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&za.enqueueReplaceState(e,e.state,null)}function Wu(t,e,n,r){var i=t.stateNode;i.props=n,i.state=t.memoizedState,i.refs={},rh(t);var s=e.contextType;typeof s=="object"&&s!==null?i.context=Rt(s):(s=ut(e)?cr:Xe.current,i.context=Xr(t,s)),i.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Gu(t,e,s,n),i.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&za.enqueueReplaceState(i,i.state,null),da(t,n,i,r),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308)}function ti(t,e){try{var n="",r=e;do n+=h0(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:i,digest:null}}function tu(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function qu(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var Fw=typeof WeakMap=="function"?WeakMap:Map;function Yg(t,e,n){n=sn(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){_a||(_a=!0,rc=r),qu(t,e)},n}function Xg(t,e,n){n=sn(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;n.payload=function(){return r(i)},n.callback=function(){qu(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){qu(t,e),typeof r!="function"&&(Dn===null?Dn=new Set([this]):Dn.add(this));var a=e.stack;this.componentDidCatch(e.value,{componentStack:a!==null?a:""})}),n}function Qf(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new Fw;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(n)||(i.add(n),t=Jw.bind(null,t,e,n),e.then(t,t))}function Kf(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Yf(t,e,n,r,i){return t.mode&1?(t.flags|=65536,t.lanes=i,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=sn(-1,1),e.tag=2,Vn(n,e,1))),n.lanes|=1),t)}var jw=pn.ReactCurrentOwner,at=!1;function et(t,e,n,r){e.child=t===null?Cg(e,null,n,r):Zr(e,t.child,n,r)}function Xf(t,e,n,r,i){n=n.render;var s=e.ref;return Wr(e,i),r=lh(t,e,n,r,s,i),n=uh(),t!==null&&!at?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,cn(t,e,i)):(de&&n&&Yc(e),e.flags|=1,et(t,e,r,i),e.child)}function Jf(t,e,n,r,i){if(t===null){var s=n.type;return typeof s=="function"&&!vh(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,Jg(t,e,s,r,i)):(t=Go(n.type,null,r,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&i)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:gs,n(a,r)&&t.ref===e.ref)return cn(t,e,i)}return e.flags|=1,t=Ln(s,r),t.ref=e.ref,t.return=e,e.child=t}function Jg(t,e,n,r,i){if(t!==null){var s=t.memoizedProps;if(gs(s,r)&&t.ref===e.ref)if(at=!1,e.pendingProps=r=s,(t.lanes&i)!==0)t.flags&131072&&(at=!0);else return e.lanes=t.lanes,cn(t,e,i)}return Qu(t,e,n,r,i)}function Zg(t,e,n){var r=e.pendingProps,i=r.children,s=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},le(zr,dt),dt|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,le(zr,dt),dt|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,le(zr,dt),dt|=r}else s!==null?(r=s.baseLanes|n,e.memoizedState=null):r=n,le(zr,dt),dt|=r;return et(t,e,i,n),e.child}function e_(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Qu(t,e,n,r,i){var s=ut(n)?cr:Xe.current;return s=Xr(e,s),Wr(e,i),n=lh(t,e,n,r,s,i),r=uh(),t!==null&&!at?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,cn(t,e,i)):(de&&r&&Yc(e),e.flags|=1,et(t,e,n,i),e.child)}function Zf(t,e,n,r,i){if(ut(n)){var s=!0;aa(e)}else s=!1;if(Wr(e,i),e.stateNode===null)Bo(t,e),Kg(e,n,r),Wu(e,n,r,i),r=!0;else if(t===null){var a=e.stateNode,l=e.memoizedProps;a.props=l;var u=a.context,h=n.contextType;typeof h=="object"&&h!==null?h=Rt(h):(h=ut(n)?cr:Xe.current,h=Xr(e,h));var f=n.getDerivedStateFromProps,m=typeof f=="function"||typeof a.getSnapshotBeforeUpdate=="function";m||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==r||u!==h)&&qf(e,a,r,h),En=!1;var _=e.memoizedState;a.state=_,da(e,r,a,i),u=e.memoizedState,l!==r||_!==u||lt.current||En?(typeof f=="function"&&(Gu(e,n,f,r),u=e.memoizedState),(l=En||Wf(e,n,l,r,_,u,h))?(m||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),a.props=r,a.state=u,a.context=h,r=l):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{a=e.stateNode,Pg(t,e),l=e.memoizedProps,h=e.type===e.elementType?l:Nt(e.type,l),a.props=h,m=e.pendingProps,_=a.context,u=n.contextType,typeof u=="object"&&u!==null?u=Rt(u):(u=ut(n)?cr:Xe.current,u=Xr(e,u));var S=n.getDerivedStateFromProps;(f=typeof S=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==m||_!==u)&&qf(e,a,r,u),En=!1,_=e.memoizedState,a.state=_,da(e,r,a,i);var x=e.memoizedState;l!==m||_!==x||lt.current||En?(typeof S=="function"&&(Gu(e,n,S,r),x=e.memoizedState),(h=En||Wf(e,n,h,r,_,x,u)||!1)?(f||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,x,u),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,x,u)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||l===t.memoizedProps&&_===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&_===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=x),a.props=r,a.state=x,a.context=u,r=h):(typeof a.componentDidUpdate!="function"||l===t.memoizedProps&&_===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&_===t.memoizedState||(e.flags|=1024),r=!1)}return Ku(t,e,n,r,s,i)}function Ku(t,e,n,r,i,s){e_(t,e);var a=(e.flags&128)!==0;if(!r&&!a)return i&&Ff(e,n,!1),cn(t,e,s);r=e.stateNode,jw.current=e;var l=a&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&a?(e.child=Zr(e,t.child,null,s),e.child=Zr(e,null,l,s)):et(t,e,l,s),e.memoizedState=r.state,i&&Ff(e,n,!0),e.child}function t_(t){var e=t.stateNode;e.pendingContext?Of(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Of(t,e.context,!1),ih(t,e.containerInfo)}function ep(t,e,n,r,i){return Jr(),Jc(i),e.flags|=256,et(t,e,n,r),e.child}var Yu={dehydrated:null,treeContext:null,retryLane:0};function Xu(t){return{baseLanes:t,cachePool:null,transitions:null}}function n_(t,e,n){var r=e.pendingProps,i=me.current,s=!1,a=(e.flags&128)!==0,l;if((l=a)||(l=t!==null&&t.memoizedState===null?!1:(i&2)!==0),l?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(i|=1),le(me,i&1),t===null)return $u(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(a=r.children,t=r.fallback,s?(r=e.mode,s=e.child,a={mode:"hidden",children:a},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=Ha(a,r,0,null),t=lr(t,r,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Xu(n),e.memoizedState=Yu,t):dh(e,a));if(i=t.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return Uw(t,e,a,r,l,i,n);if(s){s=r.fallback,a=e.mode,i=t.child,l=i.sibling;var u={mode:"hidden",children:r.children};return!(a&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=Ln(i,u),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?s=Ln(l,s):(s=lr(s,a,n,null),s.flags|=2),s.return=e,r.return=e,r.sibling=s,e.child=r,r=s,s=e.child,a=t.child.memoizedState,a=a===null?Xu(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=t.childLanes&~n,e.memoizedState=Yu,r}return s=t.child,t=s.sibling,r=Ln(s,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function dh(t,e){return e=Ha({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function So(t,e,n,r){return r!==null&&Jc(r),Zr(e,t.child,null,n),t=dh(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Uw(t,e,n,r,i,s,a){if(n)return e.flags&256?(e.flags&=-257,r=tu(Error(O(422))),So(t,e,a,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=r.fallback,i=e.mode,r=Ha({mode:"visible",children:r.children},i,0,null),s=lr(s,i,a,null),s.flags|=2,r.return=e,s.return=e,r.sibling=s,e.child=r,e.mode&1&&Zr(e,t.child,null,a),e.child.memoizedState=Xu(a),e.memoizedState=Yu,s);if(!(e.mode&1))return So(t,e,a,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,s=Error(O(419)),r=tu(s,r,void 0),So(t,e,a,r)}if(l=(a&t.childLanes)!==0,at||l){if(r=Ve,r!==null){switch(a&-a){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|a)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,un(t,i),Lt(r,t,i,-1))}return yh(),r=tu(Error(O(421))),So(t,e,a,r)}return i.data==="$?"?(e.flags|=128,e.child=t.child,e=Zw.bind(null,t),i._reactRetry=e,null):(t=s.treeContext,ft=Nn(i.nextSibling),gt=e,de=!0,Dt=null,t!==null&&(Tt[It++]=nn,Tt[It++]=rn,Tt[It++]=hr,nn=t.id,rn=t.overflow,hr=e),e=dh(e,r.children),e.flags|=4096,e)}function tp(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),Hu(t.return,e,n)}function nu(t,e,n,r,i){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function r_(t,e,n){var r=e.pendingProps,i=r.revealOrder,s=r.tail;if(et(t,e,r.children,n),r=me.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&tp(t,n,e);else if(t.tag===19)tp(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(le(me,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&fa(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),nu(e,!1,i,n,s);break;case"backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&fa(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}nu(e,!0,n,null,s);break;case"together":nu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Bo(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function cn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),fr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(O(153));if(e.child!==null){for(t=e.child,n=Ln(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Ln(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function zw(t,e,n){switch(e.tag){case 3:t_(e),Jr();break;case 5:kg(e);break;case 1:ut(e.type)&&aa(e);break;case 4:ih(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;le(ca,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(le(me,me.current&1),e.flags|=128,null):n&e.child.childLanes?n_(t,e,n):(le(me,me.current&1),t=cn(t,e,n),t!==null?t.sibling:null);le(me,me.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return r_(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),le(me,me.current),r)break;return null;case 22:case 23:return e.lanes=0,Zg(t,e,n)}return cn(t,e,n)}var i_,Ju,s_,o_;i_=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Ju=function(){};s_=function(t,e,n,r){var i=t.memoizedProps;if(i!==r){t=e.stateNode,sr(zt.current);var s=null;switch(n){case"input":i=wu(t,i),r=wu(t,r),s=[];break;case"select":i=_e({},i,{value:void 0}),r=_e({},r,{value:void 0}),s=[];break;case"textarea":i=Iu(t,i),r=Iu(t,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=sa)}Au(n,r);var a;n=null;for(h in i)if(!r.hasOwnProperty(h)&&i.hasOwnProperty(h)&&i[h]!=null)if(h==="style"){var l=i[h];for(a in l)l.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else h!=="dangerouslySetInnerHTML"&&h!=="children"&&h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(us.hasOwnProperty(h)?s||(s=[]):(s=s||[]).push(h,null));for(h in r){var u=r[h];if(l=i!=null?i[h]:void 0,r.hasOwnProperty(h)&&u!==l&&(u!=null||l!=null))if(h==="style")if(l){for(a in l)!l.hasOwnProperty(a)||u&&u.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in u)u.hasOwnProperty(a)&&l[a]!==u[a]&&(n||(n={}),n[a]=u[a])}else n||(s||(s=[]),s.push(h,n)),n=u;else h==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(s=s||[]).push(h,u)):h==="children"?typeof u!="string"&&typeof u!="number"||(s=s||[]).push(h,""+u):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&(us.hasOwnProperty(h)?(u!=null&&h==="onScroll"&&ce("scroll",t),s||l===u||(s=[])):(s=s||[]).push(h,u))}n&&(s=s||[]).push("style",n);var h=s;(e.updateQueue=h)&&(e.flags|=4)}};o_=function(t,e,n,r){n!==r&&(e.flags|=4)};function Fi(t,e){if(!de)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function We(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function Bw(t,e,n){var r=e.pendingProps;switch(Xc(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return We(e),null;case 1:return ut(e.type)&&oa(),We(e),null;case 3:return r=e.stateNode,ei(),he(lt),he(Xe),oh(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(To(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Dt!==null&&(oc(Dt),Dt=null))),Ju(t,e),We(e),null;case 5:sh(e);var i=sr(Es.current);if(n=e.type,t!==null&&e.stateNode!=null)s_(t,e,n,r,i),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(O(166));return We(e),null}if(t=sr(zt.current),To(e)){r=e.stateNode,n=e.type;var s=e.memoizedProps;switch(r[jt]=e,r[vs]=s,t=(e.mode&1)!==0,n){case"dialog":ce("cancel",r),ce("close",r);break;case"iframe":case"object":case"embed":ce("load",r);break;case"video":case"audio":for(i=0;i<Hi.length;i++)ce(Hi[i],r);break;case"source":ce("error",r);break;case"img":case"image":case"link":ce("error",r),ce("load",r);break;case"details":ce("toggle",r);break;case"input":cf(r,s),ce("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},ce("invalid",r);break;case"textarea":df(r,s),ce("invalid",r)}Au(n,s),i=null;for(var a in s)if(s.hasOwnProperty(a)){var l=s[a];a==="children"?typeof l=="string"?r.textContent!==l&&(s.suppressHydrationWarning!==!0&&Eo(r.textContent,l,t),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(s.suppressHydrationWarning!==!0&&Eo(r.textContent,l,t),i=["children",""+l]):us.hasOwnProperty(a)&&l!=null&&a==="onScroll"&&ce("scroll",r)}switch(n){case"input":fo(r),hf(r,s,!0);break;case"textarea":fo(r),ff(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=sa)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{a=i.nodeType===9?i:i.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Mm(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=a.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=a.createElement(n,{is:r.is}):(t=a.createElement(n),n==="select"&&(a=t,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):t=a.createElementNS(t,n),t[jt]=e,t[vs]=r,i_(t,e,!1,!1),e.stateNode=t;e:{switch(a=Cu(n,r),n){case"dialog":ce("cancel",t),ce("close",t),i=r;break;case"iframe":case"object":case"embed":ce("load",t),i=r;break;case"video":case"audio":for(i=0;i<Hi.length;i++)ce(Hi[i],t);i=r;break;case"source":ce("error",t),i=r;break;case"img":case"image":case"link":ce("error",t),ce("load",t),i=r;break;case"details":ce("toggle",t),i=r;break;case"input":cf(t,r),i=wu(t,r),ce("invalid",t);break;case"option":i=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},i=_e({},r,{value:void 0}),ce("invalid",t);break;case"textarea":df(t,r),i=Iu(t,r),ce("invalid",t);break;default:i=r}Au(n,i),l=i;for(s in l)if(l.hasOwnProperty(s)){var u=l[s];s==="style"?Om(t,u):s==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Lm(t,u)):s==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&cs(t,u):typeof u=="number"&&cs(t,""+u):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(us.hasOwnProperty(s)?u!=null&&s==="onScroll"&&ce("scroll",t):u!=null&&bc(t,s,u,a))}switch(n){case"input":fo(t),hf(t,r,!1);break;case"textarea":fo(t),ff(t);break;case"option":r.value!=null&&t.setAttribute("value",""+Un(r.value));break;case"select":t.multiple=!!r.multiple,s=r.value,s!=null?Br(t,!!r.multiple,s,!1):r.defaultValue!=null&&Br(t,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(t.onclick=sa)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return We(e),null;case 6:if(t&&e.stateNode!=null)o_(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(O(166));if(n=sr(Es.current),sr(zt.current),To(e)){if(r=e.stateNode,n=e.memoizedProps,r[jt]=e,(s=r.nodeValue!==n)&&(t=gt,t!==null))switch(t.tag){case 3:Eo(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Eo(r.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[jt]=e,e.stateNode=r}return We(e),null;case 13:if(he(me),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(de&&ft!==null&&e.mode&1&&!(e.flags&128))Sg(),Jr(),e.flags|=98560,s=!1;else if(s=To(e),r!==null&&r.dehydrated!==null){if(t===null){if(!s)throw Error(O(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(O(317));s[jt]=e}else Jr(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;We(e),s=!1}else Dt!==null&&(oc(Dt),Dt=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||me.current&1?Pe===0&&(Pe=3):yh())),e.updateQueue!==null&&(e.flags|=4),We(e),null);case 4:return ei(),Ju(t,e),t===null&&_s(e.stateNode.containerInfo),We(e),null;case 10:return th(e.type._context),We(e),null;case 17:return ut(e.type)&&oa(),We(e),null;case 19:if(he(me),s=e.memoizedState,s===null)return We(e),null;if(r=(e.flags&128)!==0,a=s.rendering,a===null)if(r)Fi(s,!1);else{if(Pe!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(a=fa(t),a!==null){for(e.flags|=128,Fi(s,!1),r=a.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)s=n,t=r,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,t=a.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return le(me,me.current&1|2),e.child}t=t.sibling}s.tail!==null&&Ie()>ni&&(e.flags|=128,r=!0,Fi(s,!1),e.lanes=4194304)}else{if(!r)if(t=fa(a),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Fi(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!de)return We(e),null}else 2*Ie()-s.renderingStartTime>ni&&n!==1073741824&&(e.flags|=128,r=!0,Fi(s,!1),e.lanes=4194304);s.isBackwards?(a.sibling=e.child,e.child=a):(n=s.last,n!==null?n.sibling=a:e.child=a,s.last=a)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Ie(),e.sibling=null,n=me.current,le(me,r?n&1|2:n&1),e):(We(e),null);case 22:case 23:return _h(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?dt&1073741824&&(We(e),e.subtreeFlags&6&&(e.flags|=8192)):We(e),null;case 24:return null;case 25:return null}throw Error(O(156,e.tag))}function $w(t,e){switch(Xc(e),e.tag){case 1:return ut(e.type)&&oa(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return ei(),he(lt),he(Xe),oh(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return sh(e),null;case 13:if(he(me),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(O(340));Jr()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return he(me),null;case 4:return ei(),null;case 10:return th(e.type._context),null;case 22:case 23:return _h(),null;case 24:return null;default:return null}}var Ao=!1,Ke=!1,Hw=typeof WeakSet=="function"?WeakSet:Set,B=null;function Ur(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){we(t,e,r)}else n.current=null}function Zu(t,e,n){try{n()}catch(r){we(t,e,r)}}var np=!1;function Gw(t,e){if(bu=na,t=hg(),Kc(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,l=-1,u=-1,h=0,f=0,m=t,_=null;t:for(;;){for(var S;m!==n||i!==0&&m.nodeType!==3||(l=a+i),m!==s||r!==0&&m.nodeType!==3||(u=a+r),m.nodeType===3&&(a+=m.nodeValue.length),(S=m.firstChild)!==null;)_=m,m=S;for(;;){if(m===t)break t;if(_===n&&++h===i&&(l=a),_===s&&++f===r&&(u=a),(S=m.nextSibling)!==null)break;m=_,_=m.parentNode}m=S}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ou={focusedElem:t,selectionRange:n},na=!1,B=e;B!==null;)if(e=B,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,B=t;else for(;B!==null;){e=B;try{var x=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var D=x.memoizedProps,L=x.memoizedState,I=e.stateNode,w=I.getSnapshotBeforeUpdate(e.elementType===e.type?D:Nt(e.type,D),L);I.__reactInternalSnapshotBeforeUpdate=w}break;case 3:var A=e.stateNode.containerInfo;A.nodeType===1?A.textContent="":A.nodeType===9&&A.documentElement&&A.removeChild(A.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(O(163))}}catch(N){we(e,e.return,N)}if(t=e.sibling,t!==null){t.return=e.return,B=t;break}B=e.return}return x=np,np=!1,x}function ns(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&t)===t){var s=i.destroy;i.destroy=void 0,s!==void 0&&Zu(e,n,s)}i=i.next}while(i!==r)}}function Ba(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function ec(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function a_(t){var e=t.alternate;e!==null&&(t.alternate=null,a_(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[jt],delete e[vs],delete e[Uu],delete e[Rw],delete e[Pw])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function l_(t){return t.tag===5||t.tag===3||t.tag===4}function rp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||l_(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function tc(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=sa));else if(r!==4&&(t=t.child,t!==null))for(tc(t,e,n),t=t.sibling;t!==null;)tc(t,e,n),t=t.sibling}function nc(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(nc(t,e,n),t=t.sibling;t!==null;)nc(t,e,n),t=t.sibling}var Me=null,Vt=!1;function vn(t,e,n){for(n=n.child;n!==null;)u_(t,e,n),n=n.sibling}function u_(t,e,n){if(Ut&&typeof Ut.onCommitFiberUnmount=="function")try{Ut.onCommitFiberUnmount(Ma,n)}catch{}switch(n.tag){case 5:Ke||Ur(n,e);case 6:var r=Me,i=Vt;Me=null,vn(t,e,n),Me=r,Vt=i,Me!==null&&(Vt?(t=Me,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Me.removeChild(n.stateNode));break;case 18:Me!==null&&(Vt?(t=Me,n=n.stateNode,t.nodeType===8?Kl(t.parentNode,n):t.nodeType===1&&Kl(t,n),ps(t)):Kl(Me,n.stateNode));break;case 4:r=Me,i=Vt,Me=n.stateNode.containerInfo,Vt=!0,vn(t,e,n),Me=r,Vt=i;break;case 0:case 11:case 14:case 15:if(!Ke&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&Zu(n,e,a),i=i.next}while(i!==r)}vn(t,e,n);break;case 1:if(!Ke&&(Ur(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){we(n,e,l)}vn(t,e,n);break;case 21:vn(t,e,n);break;case 22:n.mode&1?(Ke=(r=Ke)||n.memoizedState!==null,vn(t,e,n),Ke=r):vn(t,e,n);break;default:vn(t,e,n)}}function ip(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new Hw),e.forEach(function(r){var i=eE.bind(null,t,r);n.has(r)||(n.add(r),r.then(i,i))})}}function xt(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=t,a=e,l=a;e:for(;l!==null;){switch(l.tag){case 5:Me=l.stateNode,Vt=!1;break e;case 3:Me=l.stateNode.containerInfo,Vt=!0;break e;case 4:Me=l.stateNode.containerInfo,Vt=!0;break e}l=l.return}if(Me===null)throw Error(O(160));u_(s,a,i),Me=null,Vt=!1;var u=i.alternate;u!==null&&(u.return=null),i.return=null}catch(h){we(i,e,h)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)c_(e,t),e=e.sibling}function c_(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(xt(e,t),Ot(t),r&4){try{ns(3,t,t.return),Ba(3,t)}catch(D){we(t,t.return,D)}try{ns(5,t,t.return)}catch(D){we(t,t.return,D)}}break;case 1:xt(e,t),Ot(t),r&512&&n!==null&&Ur(n,n.return);break;case 5:if(xt(e,t),Ot(t),r&512&&n!==null&&Ur(n,n.return),t.flags&32){var i=t.stateNode;try{cs(i,"")}catch(D){we(t,t.return,D)}}if(r&4&&(i=t.stateNode,i!=null)){var s=t.memoizedProps,a=n!==null?n.memoizedProps:s,l=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{l==="input"&&s.type==="radio"&&s.name!=null&&Vm(i,s),Cu(l,a);var h=Cu(l,s);for(a=0;a<u.length;a+=2){var f=u[a],m=u[a+1];f==="style"?Om(i,m):f==="dangerouslySetInnerHTML"?Lm(i,m):f==="children"?cs(i,m):bc(i,f,m,h)}switch(l){case"input":Eu(i,s);break;case"textarea":Dm(i,s);break;case"select":var _=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var S=s.value;S!=null?Br(i,!!s.multiple,S,!1):_!==!!s.multiple&&(s.defaultValue!=null?Br(i,!!s.multiple,s.defaultValue,!0):Br(i,!!s.multiple,s.multiple?[]:"",!1))}i[vs]=s}catch(D){we(t,t.return,D)}}break;case 6:if(xt(e,t),Ot(t),r&4){if(t.stateNode===null)throw Error(O(162));i=t.stateNode,s=t.memoizedProps;try{i.nodeValue=s}catch(D){we(t,t.return,D)}}break;case 3:if(xt(e,t),Ot(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{ps(e.containerInfo)}catch(D){we(t,t.return,D)}break;case 4:xt(e,t),Ot(t);break;case 13:xt(e,t),Ot(t),i=t.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(mh=Ie())),r&4&&ip(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(Ke=(h=Ke)||f,xt(e,t),Ke=h):xt(e,t),Ot(t),r&8192){if(h=t.memoizedState!==null,(t.stateNode.isHidden=h)&&!f&&t.mode&1)for(B=t,f=t.child;f!==null;){for(m=B=f;B!==null;){switch(_=B,S=_.child,_.tag){case 0:case 11:case 14:case 15:ns(4,_,_.return);break;case 1:Ur(_,_.return);var x=_.stateNode;if(typeof x.componentWillUnmount=="function"){r=_,n=_.return;try{e=r,x.props=e.memoizedProps,x.state=e.memoizedState,x.componentWillUnmount()}catch(D){we(r,n,D)}}break;case 5:Ur(_,_.return);break;case 22:if(_.memoizedState!==null){op(m);continue}}S!==null?(S.return=_,B=S):op(m)}f=f.sibling}e:for(f=null,m=t;;){if(m.tag===5){if(f===null){f=m;try{i=m.stateNode,h?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(l=m.stateNode,u=m.memoizedProps.style,a=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=bm("display",a))}catch(D){we(t,t.return,D)}}}else if(m.tag===6){if(f===null)try{m.stateNode.nodeValue=h?"":m.memoizedProps}catch(D){we(t,t.return,D)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===t)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===t)break e;for(;m.sibling===null;){if(m.return===null||m.return===t)break e;f===m&&(f=null),m=m.return}f===m&&(f=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:xt(e,t),Ot(t),r&4&&ip(t);break;case 21:break;default:xt(e,t),Ot(t)}}function Ot(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(l_(n)){var r=n;break e}n=n.return}throw Error(O(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(cs(i,""),r.flags&=-33);var s=rp(t);nc(t,s,i);break;case 3:case 4:var a=r.stateNode.containerInfo,l=rp(t);tc(t,l,a);break;default:throw Error(O(161))}}catch(u){we(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Ww(t,e,n){B=t,h_(t)}function h_(t,e,n){for(var r=(t.mode&1)!==0;B!==null;){var i=B,s=i.child;if(i.tag===22&&r){var a=i.memoizedState!==null||Ao;if(!a){var l=i.alternate,u=l!==null&&l.memoizedState!==null||Ke;l=Ao;var h=Ke;if(Ao=a,(Ke=u)&&!h)for(B=i;B!==null;)a=B,u=a.child,a.tag===22&&a.memoizedState!==null?ap(i):u!==null?(u.return=a,B=u):ap(i);for(;s!==null;)B=s,h_(s),s=s.sibling;B=i,Ao=l,Ke=h}sp(t)}else i.subtreeFlags&8772&&s!==null?(s.return=i,B=s):sp(t)}}function sp(t){for(;B!==null;){var e=B;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Ke||Ba(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!Ke)if(n===null)r.componentDidMount();else{var i=e.elementType===e.type?n.memoizedProps:Nt(e.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&$f(e,s,r);break;case 3:var a=e.updateQueue;if(a!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}$f(e,a,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var h=e.alternate;if(h!==null){var f=h.memoizedState;if(f!==null){var m=f.dehydrated;m!==null&&ps(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(O(163))}Ke||e.flags&512&&ec(e)}catch(_){we(e,e.return,_)}}if(e===t){B=null;break}if(n=e.sibling,n!==null){n.return=e.return,B=n;break}B=e.return}}function op(t){for(;B!==null;){var e=B;if(e===t){B=null;break}var n=e.sibling;if(n!==null){n.return=e.return,B=n;break}B=e.return}}function ap(t){for(;B!==null;){var e=B;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Ba(4,e)}catch(u){we(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(u){we(e,i,u)}}var s=e.return;try{ec(e)}catch(u){we(e,s,u)}break;case 5:var a=e.return;try{ec(e)}catch(u){we(e,a,u)}}}catch(u){we(e,e.return,u)}if(e===t){B=null;break}var l=e.sibling;if(l!==null){l.return=e.return,B=l;break}B=e.return}}var qw=Math.ceil,ga=pn.ReactCurrentDispatcher,fh=pn.ReactCurrentOwner,At=pn.ReactCurrentBatchConfig,te=0,Ve=null,Ae=null,Fe=0,dt=0,zr=Wn(0),Pe=0,As=null,fr=0,$a=0,ph=0,rs=null,st=null,mh=0,ni=1/0,en=null,_a=!1,rc=null,Dn=null,Co=!1,An=null,ya=0,is=0,ic=null,$o=-1,Ho=0;function nt(){return te&6?Ie():$o!==-1?$o:$o=Ie()}function Mn(t){return t.mode&1?te&2&&Fe!==0?Fe&-Fe:xw.transition!==null?(Ho===0&&(Ho=Km()),Ho):(t=ie,t!==0||(t=window.event,t=t===void 0?16:ng(t.type)),t):1}function Lt(t,e,n,r){if(50<is)throw is=0,ic=null,Error(O(185));Ls(t,n,r),(!(te&2)||t!==Ve)&&(t===Ve&&(!(te&2)&&($a|=n),Pe===4&&In(t,Fe)),ct(t,r),n===1&&te===0&&!(e.mode&1)&&(ni=Ie()+500,ja&&qn()))}function ct(t,e){var n=t.callbackNode;x0(t,e);var r=ta(t,t===Ve?Fe:0);if(r===0)n!==null&&gf(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&gf(n),e===1)t.tag===0?kw(lp.bind(null,t)):Eg(lp.bind(null,t)),Aw(function(){!(te&6)&&qn()}),n=null;else{switch(Ym(r)){case 1:n=zc;break;case 4:n=qm;break;case 16:n=ea;break;case 536870912:n=Qm;break;default:n=ea}n=v_(n,d_.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function d_(t,e){if($o=-1,Ho=0,te&6)throw Error(O(327));var n=t.callbackNode;if(qr()&&t.callbackNode!==n)return null;var r=ta(t,t===Ve?Fe:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=va(t,r);else{e=r;var i=te;te|=2;var s=p_();(Ve!==t||Fe!==e)&&(en=null,ni=Ie()+500,ar(t,e));do try{Yw();break}catch(l){f_(t,l)}while(!0);eh(),ga.current=s,te=i,Ae!==null?e=0:(Ve=null,Fe=0,e=Pe)}if(e!==0){if(e===2&&(i=Nu(t),i!==0&&(r=i,e=sc(t,i))),e===1)throw n=As,ar(t,0),In(t,r),ct(t,Ie()),n;if(e===6)In(t,r);else{if(i=t.current.alternate,!(r&30)&&!Qw(i)&&(e=va(t,r),e===2&&(s=Nu(t),s!==0&&(r=s,e=sc(t,s))),e===1))throw n=As,ar(t,0),In(t,r),ct(t,Ie()),n;switch(t.finishedWork=i,t.finishedLanes=r,e){case 0:case 1:throw Error(O(345));case 2:tr(t,st,en);break;case 3:if(In(t,r),(r&130023424)===r&&(e=mh+500-Ie(),10<e)){if(ta(t,0)!==0)break;if(i=t.suspendedLanes,(i&r)!==r){nt(),t.pingedLanes|=t.suspendedLanes&i;break}t.timeoutHandle=ju(tr.bind(null,t,st,en),e);break}tr(t,st,en);break;case 4:if(In(t,r),(r&4194240)===r)break;for(e=t.eventTimes,i=-1;0<r;){var a=31-Mt(r);s=1<<a,a=e[a],a>i&&(i=a),r&=~s}if(r=i,r=Ie()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*qw(r/1960))-r,10<r){t.timeoutHandle=ju(tr.bind(null,t,st,en),r);break}tr(t,st,en);break;case 5:tr(t,st,en);break;default:throw Error(O(329))}}}return ct(t,Ie()),t.callbackNode===n?d_.bind(null,t):null}function sc(t,e){var n=rs;return t.current.memoizedState.isDehydrated&&(ar(t,e).flags|=256),t=va(t,e),t!==2&&(e=st,st=n,e!==null&&oc(e)),t}function oc(t){st===null?st=t:st.push.apply(st,t)}function Qw(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!bt(s(),i))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function In(t,e){for(e&=~ph,e&=~$a,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Mt(e),r=1<<n;t[n]=-1,e&=~r}}function lp(t){if(te&6)throw Error(O(327));qr();var e=ta(t,0);if(!(e&1))return ct(t,Ie()),null;var n=va(t,e);if(t.tag!==0&&n===2){var r=Nu(t);r!==0&&(e=r,n=sc(t,r))}if(n===1)throw n=As,ar(t,0),In(t,e),ct(t,Ie()),n;if(n===6)throw Error(O(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,tr(t,st,en),ct(t,Ie()),null}function gh(t,e){var n=te;te|=1;try{return t(e)}finally{te=n,te===0&&(ni=Ie()+500,ja&&qn())}}function pr(t){An!==null&&An.tag===0&&!(te&6)&&qr();var e=te;te|=1;var n=At.transition,r=ie;try{if(At.transition=null,ie=1,t)return t()}finally{ie=r,At.transition=n,te=e,!(te&6)&&qn()}}function _h(){dt=zr.current,he(zr)}function ar(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,Sw(n)),Ae!==null)for(n=Ae.return;n!==null;){var r=n;switch(Xc(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&oa();break;case 3:ei(),he(lt),he(Xe),oh();break;case 5:sh(r);break;case 4:ei();break;case 13:he(me);break;case 19:he(me);break;case 10:th(r.type._context);break;case 22:case 23:_h()}n=n.return}if(Ve=t,Ae=t=Ln(t.current,null),Fe=dt=e,Pe=0,As=null,ph=$a=fr=0,st=rs=null,ir!==null){for(e=0;e<ir.length;e++)if(n=ir[e],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var a=s.next;s.next=i,r.next=a}n.pending=r}ir=null}return t}function f_(t,e){do{var n=Ae;try{if(eh(),Uo.current=ma,pa){for(var r=ge.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}pa=!1}if(dr=0,Ne=Ce=ge=null,ts=!1,Ts=0,fh.current=null,n===null||n.return===null){Pe=1,As=e,Ae=null;break}e:{var s=t,a=n.return,l=n,u=e;if(e=Fe,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var h=u,f=l,m=f.tag;if(!(f.mode&1)&&(m===0||m===11||m===15)){var _=f.alternate;_?(f.updateQueue=_.updateQueue,f.memoizedState=_.memoizedState,f.lanes=_.lanes):(f.updateQueue=null,f.memoizedState=null)}var S=Kf(a);if(S!==null){S.flags&=-257,Yf(S,a,l,s,e),S.mode&1&&Qf(s,h,e),e=S,u=h;var x=e.updateQueue;if(x===null){var D=new Set;D.add(u),e.updateQueue=D}else x.add(u);break e}else{if(!(e&1)){Qf(s,h,e),yh();break e}u=Error(O(426))}}else if(de&&l.mode&1){var L=Kf(a);if(L!==null){!(L.flags&65536)&&(L.flags|=256),Yf(L,a,l,s,e),Jc(ti(u,l));break e}}s=u=ti(u,l),Pe!==4&&(Pe=2),rs===null?rs=[s]:rs.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var I=Yg(s,u,e);Bf(s,I);break e;case 1:l=u;var w=s.type,A=s.stateNode;if(!(s.flags&128)&&(typeof w.getDerivedStateFromError=="function"||A!==null&&typeof A.componentDidCatch=="function"&&(Dn===null||!Dn.has(A)))){s.flags|=65536,e&=-e,s.lanes|=e;var N=Xg(s,l,e);Bf(s,N);break e}}s=s.return}while(s!==null)}g_(n)}catch(F){e=F,Ae===n&&n!==null&&(Ae=n=n.return);continue}break}while(!0)}function p_(){var t=ga.current;return ga.current=ma,t===null?ma:t}function yh(){(Pe===0||Pe===3||Pe===2)&&(Pe=4),Ve===null||!(fr&268435455)&&!($a&268435455)||In(Ve,Fe)}function va(t,e){var n=te;te|=2;var r=p_();(Ve!==t||Fe!==e)&&(en=null,ar(t,e));do try{Kw();break}catch(i){f_(t,i)}while(!0);if(eh(),te=n,ga.current=r,Ae!==null)throw Error(O(261));return Ve=null,Fe=0,Pe}function Kw(){for(;Ae!==null;)m_(Ae)}function Yw(){for(;Ae!==null&&!E0();)m_(Ae)}function m_(t){var e=y_(t.alternate,t,dt);t.memoizedProps=t.pendingProps,e===null?g_(t):Ae=e,fh.current=null}function g_(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=$w(n,e),n!==null){n.flags&=32767,Ae=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Pe=6,Ae=null;return}}else if(n=Bw(n,e,dt),n!==null){Ae=n;return}if(e=e.sibling,e!==null){Ae=e;return}Ae=e=t}while(e!==null);Pe===0&&(Pe=5)}function tr(t,e,n){var r=ie,i=At.transition;try{At.transition=null,ie=1,Xw(t,e,n,r)}finally{At.transition=i,ie=r}return null}function Xw(t,e,n,r){do qr();while(An!==null);if(te&6)throw Error(O(327));n=t.finishedWork;var i=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(O(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(N0(t,s),t===Ve&&(Ae=Ve=null,Fe=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Co||(Co=!0,v_(ea,function(){return qr(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=At.transition,At.transition=null;var a=ie;ie=1;var l=te;te|=4,fh.current=null,Gw(t,n),c_(n,t),_w(Ou),na=!!bu,Ou=bu=null,t.current=n,Ww(n),T0(),te=l,ie=a,At.transition=s}else t.current=n;if(Co&&(Co=!1,An=t,ya=i),s=t.pendingLanes,s===0&&(Dn=null),A0(n.stateNode),ct(t,Ie()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)i=e[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(_a)throw _a=!1,t=rc,rc=null,t;return ya&1&&t.tag!==0&&qr(),s=t.pendingLanes,s&1?t===ic?is++:(is=0,ic=t):is=0,qn(),null}function qr(){if(An!==null){var t=Ym(ya),e=At.transition,n=ie;try{if(At.transition=null,ie=16>t?16:t,An===null)var r=!1;else{if(t=An,An=null,ya=0,te&6)throw Error(O(331));var i=te;for(te|=4,B=t.current;B!==null;){var s=B,a=s.child;if(B.flags&16){var l=s.deletions;if(l!==null){for(var u=0;u<l.length;u++){var h=l[u];for(B=h;B!==null;){var f=B;switch(f.tag){case 0:case 11:case 15:ns(8,f,s)}var m=f.child;if(m!==null)m.return=f,B=m;else for(;B!==null;){f=B;var _=f.sibling,S=f.return;if(a_(f),f===h){B=null;break}if(_!==null){_.return=S,B=_;break}B=S}}}var x=s.alternate;if(x!==null){var D=x.child;if(D!==null){x.child=null;do{var L=D.sibling;D.sibling=null,D=L}while(D!==null)}}B=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,B=a;else e:for(;B!==null;){if(s=B,s.flags&2048)switch(s.tag){case 0:case 11:case 15:ns(9,s,s.return)}var I=s.sibling;if(I!==null){I.return=s.return,B=I;break e}B=s.return}}var w=t.current;for(B=w;B!==null;){a=B;var A=a.child;if(a.subtreeFlags&2064&&A!==null)A.return=a,B=A;else e:for(a=w;B!==null;){if(l=B,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Ba(9,l)}}catch(F){we(l,l.return,F)}if(l===a){B=null;break e}var N=l.sibling;if(N!==null){N.return=l.return,B=N;break e}B=l.return}}if(te=i,qn(),Ut&&typeof Ut.onPostCommitFiberRoot=="function")try{Ut.onPostCommitFiberRoot(Ma,t)}catch{}r=!0}return r}finally{ie=n,At.transition=e}}return!1}function up(t,e,n){e=ti(n,e),e=Yg(t,e,1),t=Vn(t,e,1),e=nt(),t!==null&&(Ls(t,1,e),ct(t,e))}function we(t,e,n){if(t.tag===3)up(t,t,n);else for(;e!==null;){if(e.tag===3){up(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Dn===null||!Dn.has(r))){t=ti(n,t),t=Xg(e,t,1),e=Vn(e,t,1),t=nt(),e!==null&&(Ls(e,1,t),ct(e,t));break}}e=e.return}}function Jw(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=nt(),t.pingedLanes|=t.suspendedLanes&n,Ve===t&&(Fe&n)===n&&(Pe===4||Pe===3&&(Fe&130023424)===Fe&&500>Ie()-mh?ar(t,0):ph|=n),ct(t,e)}function __(t,e){e===0&&(t.mode&1?(e=go,go<<=1,!(go&130023424)&&(go=4194304)):e=1);var n=nt();t=un(t,e),t!==null&&(Ls(t,e,n),ct(t,n))}function Zw(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),__(t,n)}function eE(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(O(314))}r!==null&&r.delete(e),__(t,n)}var y_;y_=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||lt.current)at=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return at=!1,zw(t,e,n);at=!!(t.flags&131072)}else at=!1,de&&e.flags&1048576&&Tg(e,ua,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;Bo(t,e),t=e.pendingProps;var i=Xr(e,Xe.current);Wr(e,n),i=lh(null,e,r,t,i,n);var s=uh();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,ut(r)?(s=!0,aa(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,rh(e),i.updater=za,e.stateNode=i,i._reactInternals=e,Wu(e,r,t,n),e=Ku(null,e,r,!0,s,n)):(e.tag=0,de&&s&&Yc(e),et(null,e,i,n),e=e.child),e;case 16:r=e.elementType;e:{switch(Bo(t,e),t=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=nE(r),t=Nt(r,t),i){case 0:e=Qu(null,e,r,t,n);break e;case 1:e=Zf(null,e,r,t,n);break e;case 11:e=Xf(null,e,r,t,n);break e;case 14:e=Jf(null,e,r,Nt(r.type,t),n);break e}throw Error(O(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Nt(r,i),Qu(t,e,r,i,n);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Nt(r,i),Zf(t,e,r,i,n);case 3:e:{if(t_(e),t===null)throw Error(O(387));r=e.pendingProps,s=e.memoizedState,i=s.element,Pg(t,e),da(e,r,null,n);var a=e.memoizedState;if(r=a.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=ti(Error(O(423)),e),e=ep(t,e,r,n,i);break e}else if(r!==i){i=ti(Error(O(424)),e),e=ep(t,e,r,n,i);break e}else for(ft=Nn(e.stateNode.containerInfo.firstChild),gt=e,de=!0,Dt=null,n=Cg(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Jr(),r===i){e=cn(t,e,n);break e}et(t,e,r,n)}e=e.child}return e;case 5:return kg(e),t===null&&$u(e),r=e.type,i=e.pendingProps,s=t!==null?t.memoizedProps:null,a=i.children,Fu(r,i)?a=null:s!==null&&Fu(r,s)&&(e.flags|=32),e_(t,e),et(t,e,a,n),e.child;case 6:return t===null&&$u(e),null;case 13:return n_(t,e,n);case 4:return ih(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=Zr(e,null,r,n):et(t,e,r,n),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Nt(r,i),Xf(t,e,r,i,n);case 7:return et(t,e,e.pendingProps,n),e.child;case 8:return et(t,e,e.pendingProps.children,n),e.child;case 12:return et(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,s=e.memoizedProps,a=i.value,le(ca,r._currentValue),r._currentValue=a,s!==null)if(bt(s.value,a)){if(s.children===i.children&&!lt.current){e=cn(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var l=s.dependencies;if(l!==null){a=s.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(s.tag===1){u=sn(-1,n&-n),u.tag=2;var h=s.updateQueue;if(h!==null){h=h.shared;var f=h.pending;f===null?u.next=u:(u.next=f.next,f.next=u),h.pending=u}}s.lanes|=n,u=s.alternate,u!==null&&(u.lanes|=n),Hu(s.return,n,e),l.lanes|=n;break}u=u.next}}else if(s.tag===10)a=s.type===e.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(O(341));a.lanes|=n,l=a.alternate,l!==null&&(l.lanes|=n),Hu(a,n,e),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===e){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}et(t,e,i.children,n),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,Wr(e,n),i=Rt(i),r=r(i),e.flags|=1,et(t,e,r,n),e.child;case 14:return r=e.type,i=Nt(r,e.pendingProps),i=Nt(r.type,i),Jf(t,e,r,i,n);case 15:return Jg(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Nt(r,i),Bo(t,e),e.tag=1,ut(r)?(t=!0,aa(e)):t=!1,Wr(e,n),Kg(e,r,i),Wu(e,r,i,n),Ku(null,e,r,!0,t,n);case 19:return r_(t,e,n);case 22:return Zg(t,e,n)}throw Error(O(156,e.tag))};function v_(t,e){return Wm(t,e)}function tE(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function St(t,e,n,r){return new tE(t,e,n,r)}function vh(t){return t=t.prototype,!(!t||!t.isReactComponent)}function nE(t){if(typeof t=="function")return vh(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Fc)return 11;if(t===jc)return 14}return 2}function Ln(t,e){var n=t.alternate;return n===null?(n=St(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Go(t,e,n,r,i,s){var a=2;if(r=t,typeof t=="function")vh(t)&&(a=1);else if(typeof t=="string")a=5;else e:switch(t){case Nr:return lr(n.children,i,s,e);case Oc:a=8,i|=8;break;case gu:return t=St(12,n,e,i|2),t.elementType=gu,t.lanes=s,t;case _u:return t=St(13,n,e,i),t.elementType=_u,t.lanes=s,t;case yu:return t=St(19,n,e,i),t.elementType=yu,t.lanes=s,t;case km:return Ha(n,i,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Rm:a=10;break e;case Pm:a=9;break e;case Fc:a=11;break e;case jc:a=14;break e;case wn:a=16,r=null;break e}throw Error(O(130,t==null?t:typeof t,""))}return e=St(a,n,e,i),e.elementType=t,e.type=r,e.lanes=s,e}function lr(t,e,n,r){return t=St(7,t,r,e),t.lanes=n,t}function Ha(t,e,n,r){return t=St(22,t,r,e),t.elementType=km,t.lanes=n,t.stateNode={isHidden:!1},t}function ru(t,e,n){return t=St(6,t,null,e),t.lanes=n,t}function iu(t,e,n){return e=St(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function rE(t,e,n,r,i){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Fl(0),this.expirationTimes=Fl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Fl(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function wh(t,e,n,r,i,s,a,l,u){return t=new rE(t,e,n,l,u),e===1?(e=1,s===!0&&(e|=8)):e=0,s=St(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},rh(s),t}function iE(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:xr,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function w_(t){if(!t)return zn;t=t._reactInternals;e:{if(vr(t)!==t||t.tag!==1)throw Error(O(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(ut(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(O(171))}if(t.tag===1){var n=t.type;if(ut(n))return wg(t,n,e)}return e}function E_(t,e,n,r,i,s,a,l,u){return t=wh(n,r,!0,t,i,s,a,l,u),t.context=w_(null),n=t.current,r=nt(),i=Mn(n),s=sn(r,i),s.callback=e??null,Vn(n,s,i),t.current.lanes=i,Ls(t,i,r),ct(t,r),t}function Ga(t,e,n,r){var i=e.current,s=nt(),a=Mn(i);return n=w_(n),e.context===null?e.context=n:e.pendingContext=n,e=sn(s,a),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=Vn(i,e,a),t!==null&&(Lt(t,i,a,s),jo(t,i,a)),a}function wa(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function cp(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Eh(t,e){cp(t,e),(t=t.alternate)&&cp(t,e)}function sE(){return null}var T_=typeof reportError=="function"?reportError:function(t){console.error(t)};function Th(t){this._internalRoot=t}Wa.prototype.render=Th.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(O(409));Ga(t,e,null,null)};Wa.prototype.unmount=Th.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;pr(function(){Ga(null,t,null,null)}),e[ln]=null}};function Wa(t){this._internalRoot=t}Wa.prototype.unstable_scheduleHydration=function(t){if(t){var e=Zm();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Tn.length&&e!==0&&e<Tn[n].priority;n++);Tn.splice(n,0,t),n===0&&tg(t)}};function Ih(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function qa(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function hp(){}function oE(t,e,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var h=wa(a);s.call(h)}}var a=E_(e,r,t,0,null,!1,!1,"",hp);return t._reactRootContainer=a,t[ln]=a.current,_s(t.nodeType===8?t.parentNode:t),pr(),a}for(;i=t.lastChild;)t.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var h=wa(u);l.call(h)}}var u=wh(t,0,!1,null,null,!1,!1,"",hp);return t._reactRootContainer=u,t[ln]=u.current,_s(t.nodeType===8?t.parentNode:t),pr(function(){Ga(e,u,n,r)}),u}function Qa(t,e,n,r,i){var s=n._reactRootContainer;if(s){var a=s;if(typeof i=="function"){var l=i;i=function(){var u=wa(a);l.call(u)}}Ga(e,a,t,i)}else a=oE(n,e,t,i,r);return wa(a)}Xm=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=$i(e.pendingLanes);n!==0&&(Bc(e,n|1),ct(e,Ie()),!(te&6)&&(ni=Ie()+500,qn()))}break;case 13:pr(function(){var r=un(t,1);if(r!==null){var i=nt();Lt(r,t,1,i)}}),Eh(t,1)}};$c=function(t){if(t.tag===13){var e=un(t,134217728);if(e!==null){var n=nt();Lt(e,t,134217728,n)}Eh(t,134217728)}};Jm=function(t){if(t.tag===13){var e=Mn(t),n=un(t,e);if(n!==null){var r=nt();Lt(n,t,e,r)}Eh(t,e)}};Zm=function(){return ie};eg=function(t,e){var n=ie;try{return ie=t,e()}finally{ie=n}};Pu=function(t,e,n){switch(e){case"input":if(Eu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var i=Fa(r);if(!i)throw Error(O(90));Nm(r),Eu(r,i)}}}break;case"textarea":Dm(t,n);break;case"select":e=n.value,e!=null&&Br(t,!!n.multiple,e,!1)}};Um=gh;zm=pr;var aE={usingClientEntryPoint:!1,Events:[Os,Lr,Fa,Fm,jm,gh]},ji={findFiberByHostInstance:rr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},lE={bundleType:ji.bundleType,version:ji.version,rendererPackageName:ji.rendererPackageName,rendererConfig:ji.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:pn.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Hm(t),t===null?null:t.stateNode},findFiberByHostInstance:ji.findFiberByHostInstance||sE,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ro=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ro.isDisabled&&Ro.supportsFiber)try{Ma=Ro.inject(lE),Ut=Ro}catch{}}vt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=aE;vt.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ih(e))throw Error(O(200));return iE(t,e,null,n)};vt.createRoot=function(t,e){if(!Ih(t))throw Error(O(299));var n=!1,r="",i=T_;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=wh(t,1,!1,null,null,n,!1,r,i),t[ln]=e.current,_s(t.nodeType===8?t.parentNode:t),new Th(e)};vt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(O(188)):(t=Object.keys(t).join(","),Error(O(268,t)));return t=Hm(e),t=t===null?null:t.stateNode,t};vt.flushSync=function(t){return pr(t)};vt.hydrate=function(t,e,n){if(!qa(e))throw Error(O(200));return Qa(null,t,e,!0,n)};vt.hydrateRoot=function(t,e,n){if(!Ih(t))throw Error(O(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",a=T_;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),e=E_(e,null,t,1,n??null,i,!1,s,a),t[ln]=e.current,_s(t),r)for(t=0;t<r.length;t++)n=r[t],i=n._getVersion,i=i(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,i]:e.mutableSourceEagerHydrationData.push(n,i);return new Wa(e)};vt.render=function(t,e,n){if(!qa(e))throw Error(O(200));return Qa(null,t,e,!1,n)};vt.unmountComponentAtNode=function(t){if(!qa(t))throw Error(O(40));return t._reactRootContainer?(pr(function(){Qa(null,null,t,!1,function(){t._reactRootContainer=null,t[ln]=null})}),!0):!1};vt.unstable_batchedUpdates=gh;vt.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!qa(n))throw Error(O(200));if(t==null||t._reactInternals===void 0)throw Error(O(38));return Qa(t,e,n,!1,r)};vt.version="18.3.1-next-f1338f8080-20240426";function I_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(I_)}catch(t){console.error(t)}}I_(),Im.exports=vt;var uE=Im.exports,dp=uE;pu.createRoot=dp.createRoot,pu.hydrateRoot=dp.hydrateRoot;/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var cE={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hE=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),mn=(t,e)=>{const n=be.forwardRef(({color:r="currentColor",size:i=24,strokeWidth:s=2,absoluteStrokeWidth:a,className:l="",children:u,...h},f)=>be.createElement("svg",{ref:f,...cE,width:i,height:i,stroke:r,strokeWidth:a?Number(s)*24/Number(i):s,className:["lucide",`lucide-${hE(t)}`,l].join(" "),...h},[...e.map(([m,_])=>be.createElement(m,_)),...Array.isArray(u)?u:[u]]));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dE=mn("AlertTriangle",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",key:"c3ski4"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fE=mn("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pE=mn("LogIn",[["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}],["polyline",{points:"10 17 15 12 10 7",key:"1ail0h"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mE=mn("PlayCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polygon",{points:"10 8 16 12 10 16 10 8",key:"1cimsy"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gE=mn("RefreshCcw",[["path",{d:"M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"14sxne"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16",key:"1hlbsb"}],["path",{d:"M16 16h5v5",key:"ccwih5"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fp=mn("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _E=mn("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yE=mn("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vE=mn("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]),wE=({children:t,activeTab:e,onTabChange:n,isAdmin:r,onToggleAdmin:i})=>P.jsxs("div",{className:"layout-container",children:[P.jsx("header",{className:"app-header",children:P.jsxs("div",{className:"header-content",children:[P.jsx(yE,{size:28,color:"var(--tennis-yellow)"}),P.jsx("h1",{children:"WIMBLEDON LIVE"})]})}),P.jsxs("nav",{className:"tab-nav",children:[P.jsx("button",{className:`tab-btn ${e==="match"?"active":""}`,onClick:()=>n("match"),children:"대진표"}),P.jsx("button",{className:`tab-btn ${e==="standings"?"active":""}`,onClick:()=>n("standings"),children:"순위표"})]}),P.jsx("main",{className:"app-main",children:t}),P.jsx("style",{children:`
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
          justify-content: space-between;
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
      `})]});var pp={};/**
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
 */const S_=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},EE=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],a=t[n++],l=t[n++],u=((i&7)<<18|(s&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const s=t[n++],a=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},A_={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],a=i+1<t.length,l=a?t[i+1]:0,u=i+2<t.length,h=u?t[i+2]:0,f=s>>2,m=(s&3)<<4|l>>4;let _=(l&15)<<2|h>>6,S=h&63;u||(S=64,a||(_=64)),r.push(n[f],n[m],n[_],n[S])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(S_(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):EE(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],l=i<t.length?n[t.charAt(i)]:0;++i;const h=i<t.length?n[t.charAt(i)]:64;++i;const m=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||l==null||h==null||m==null)throw new TE;const _=s<<2|l>>4;if(r.push(_),h!==64){const S=l<<4&240|h>>2;if(r.push(S),m!==64){const x=h<<6&192|m;r.push(x)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class TE extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const IE=function(t){const e=S_(t);return A_.encodeByteArray(e,!0)},Ea=function(t){return IE(t).replace(/\./g,"")},SE=function(t){try{return A_.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function AE(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const CE=()=>AE().__FIREBASE_DEFAULTS__,RE=()=>{if(typeof process>"u"||typeof pp>"u")return;const t=pp.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},PE=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&SE(t[1]);return e&&JSON.parse(e)},Sh=()=>{try{return CE()||RE()||PE()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},kE=t=>{var e,n;return(n=(e=Sh())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},xE=t=>{const e=kE(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},C_=()=>{var t;return(t=Sh())===null||t===void 0?void 0:t.config};/**
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
 */class NE{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function VE(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[Ea(JSON.stringify(n)),Ea(JSON.stringify(a)),""].join(".")}/**
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
 */function DE(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ME(){var t;const e=(t=Sh())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function LE(){return!ME()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function bE(){try{return typeof indexedDB=="object"}catch{return!1}}function OE(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}/**
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
 */const FE="FirebaseError";class pi extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=FE,Object.setPrototypeOf(this,pi.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,R_.prototype.create)}}class R_{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],a=s?jE(s,r):"Error",l=`${this.serviceName}: ${a} (${i}).`;return new pi(i,l,r)}}function jE(t,e){return t.replace(UE,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const UE=/\{\$([^}]+)}/g;function ac(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],a=e[i];if(mp(s)&&mp(a)){if(!ac(s,a))return!1}else if(s!==a)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function mp(t){return t!==null&&typeof t=="object"}/**
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
 */function Ht(t){return t&&t._delegate?t._delegate:t}class Cs{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */class zE{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new NE;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if($E(e))try{this.getOrInitializeService({instanceIdentifier:nr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=nr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=nr){return this.instances.has(e)}getOptions(e=nr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(s);r===l&&a.resolve(i)}return i}onInit(e,n){var r;const i=this.normalizeInstanceIdentifier(n),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const a=this.instances.get(i);return a&&e(a,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:BE(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=nr){return this.component?this.component.multipleInstances?e:nr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function BE(t){return t===nr?void 0:t}function $E(t){return t.instantiationMode==="EAGER"}/**
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
 */class HE{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new zE(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var ee;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ee||(ee={}));const GE={debug:ee.DEBUG,verbose:ee.VERBOSE,info:ee.INFO,warn:ee.WARN,error:ee.ERROR,silent:ee.SILENT},WE=ee.INFO,qE={[ee.DEBUG]:"log",[ee.VERBOSE]:"log",[ee.INFO]:"info",[ee.WARN]:"warn",[ee.ERROR]:"error"},QE=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=qE[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class P_{constructor(e){this.name=e,this._logLevel=WE,this._logHandler=QE,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ee))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?GE[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ee.DEBUG,...e),this._logHandler(this,ee.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ee.VERBOSE,...e),this._logHandler(this,ee.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ee.INFO,...e),this._logHandler(this,ee.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ee.WARN,...e),this._logHandler(this,ee.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ee.ERROR,...e),this._logHandler(this,ee.ERROR,...e)}}const KE=(t,e)=>e.some(n=>t instanceof n);let gp,_p;function YE(){return gp||(gp=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function XE(){return _p||(_p=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const k_=new WeakMap,lc=new WeakMap,x_=new WeakMap,su=new WeakMap,Ah=new WeakMap;function JE(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",a)},s=()=>{n(bn(t.result)),i()},a=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",a)});return e.then(n=>{n instanceof IDBCursor&&k_.set(n,t)}).catch(()=>{}),Ah.set(e,t),e}function ZE(t){if(lc.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",a),t.removeEventListener("abort",a)},s=()=>{n(),i()},a=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",a),t.addEventListener("abort",a)});lc.set(t,e)}let uc={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return lc.get(t);if(e==="objectStoreNames")return t.objectStoreNames||x_.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return bn(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function e1(t){uc=t(uc)}function t1(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(ou(this),e,...n);return x_.set(r,e.sort?e.sort():[e]),bn(r)}:XE().includes(t)?function(...e){return t.apply(ou(this),e),bn(k_.get(this))}:function(...e){return bn(t.apply(ou(this),e))}}function n1(t){return typeof t=="function"?t1(t):(t instanceof IDBTransaction&&ZE(t),KE(t,YE())?new Proxy(t,uc):t)}function bn(t){if(t instanceof IDBRequest)return JE(t);if(su.has(t))return su.get(t);const e=n1(t);return e!==t&&(su.set(t,e),Ah.set(e,t)),e}const ou=t=>Ah.get(t);function r1(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const a=indexedDB.open(t,e),l=bn(a);return r&&a.addEventListener("upgradeneeded",u=>{r(bn(a.result),u.oldVersion,u.newVersion,bn(a.transaction),u)}),n&&a.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),l.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",h=>i(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const i1=["get","getKey","getAll","getAllKeys","count"],s1=["put","add","delete","clear"],au=new Map;function yp(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(au.get(e))return au.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=s1.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||i1.includes(n)))return;const s=async function(a,...l){const u=this.transaction(a,i?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[n](...l),i&&u.done]))[0]};return au.set(e,s),s}e1(t=>({...t,get:(e,n,r)=>yp(e,n)||t.get(e,n,r),has:(e,n)=>!!yp(e,n)||t.has(e,n)}));/**
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
 */class o1{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(a1(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function a1(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const cc="@firebase/app",vp="0.10.13";/**
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
 */const hn=new P_("@firebase/app"),l1="@firebase/app-compat",u1="@firebase/analytics-compat",c1="@firebase/analytics",h1="@firebase/app-check-compat",d1="@firebase/app-check",f1="@firebase/auth",p1="@firebase/auth-compat",m1="@firebase/database",g1="@firebase/data-connect",_1="@firebase/database-compat",y1="@firebase/functions",v1="@firebase/functions-compat",w1="@firebase/installations",E1="@firebase/installations-compat",T1="@firebase/messaging",I1="@firebase/messaging-compat",S1="@firebase/performance",A1="@firebase/performance-compat",C1="@firebase/remote-config",R1="@firebase/remote-config-compat",P1="@firebase/storage",k1="@firebase/storage-compat",x1="@firebase/firestore",N1="@firebase/vertexai-preview",V1="@firebase/firestore-compat",D1="firebase",M1="10.14.1";/**
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
 */const hc="[DEFAULT]",L1={[cc]:"fire-core",[l1]:"fire-core-compat",[c1]:"fire-analytics",[u1]:"fire-analytics-compat",[d1]:"fire-app-check",[h1]:"fire-app-check-compat",[f1]:"fire-auth",[p1]:"fire-auth-compat",[m1]:"fire-rtdb",[g1]:"fire-data-connect",[_1]:"fire-rtdb-compat",[y1]:"fire-fn",[v1]:"fire-fn-compat",[w1]:"fire-iid",[E1]:"fire-iid-compat",[T1]:"fire-fcm",[I1]:"fire-fcm-compat",[S1]:"fire-perf",[A1]:"fire-perf-compat",[C1]:"fire-rc",[R1]:"fire-rc-compat",[P1]:"fire-gcs",[k1]:"fire-gcs-compat",[x1]:"fire-fst",[V1]:"fire-fst-compat",[N1]:"fire-vertex","fire-js":"fire-js",[D1]:"fire-js-all"};/**
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
 */const Ta=new Map,b1=new Map,dc=new Map;function wp(t,e){try{t.container.addComponent(e)}catch(n){hn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Ia(t){const e=t.name;if(dc.has(e))return hn.debug(`There were multiple attempts to register component ${e}.`),!1;dc.set(e,t);for(const n of Ta.values())wp(n,t);for(const n of b1.values())wp(n,t);return!0}function O1(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
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
 */const F1={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},On=new R_("app","Firebase",F1);/**
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
 */class j1{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Cs("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw On.create("app-deleted",{appName:this._name})}}/**
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
 */const U1=M1;function N_(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:hc,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw On.create("bad-app-name",{appName:String(i)});if(n||(n=C_()),!n)throw On.create("no-options");const s=Ta.get(i);if(s){if(ac(n,s.options)&&ac(r,s.config))return s;throw On.create("duplicate-app",{appName:i})}const a=new HE(i);for(const u of dc.values())a.addComponent(u);const l=new j1(n,r,a);return Ta.set(i,l),l}function z1(t=hc){const e=Ta.get(t);if(!e&&t===hc&&C_())return N_();if(!e)throw On.create("no-app",{appName:t});return e}function Qr(t,e,n){var r;let i=(r=L1[t])!==null&&r!==void 0?r:t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),a=e.match(/\s|\//);if(s||a){const l=[`Unable to register library "${i}" with version "${e}":`];s&&l.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&a&&l.push("and"),a&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),hn.warn(l.join(" "));return}Ia(new Cs(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const B1="firebase-heartbeat-database",$1=1,Rs="firebase-heartbeat-store";let lu=null;function V_(){return lu||(lu=r1(B1,$1,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Rs)}catch(n){console.warn(n)}}}}).catch(t=>{throw On.create("idb-open",{originalErrorMessage:t.message})})),lu}async function H1(t){try{const n=(await V_()).transaction(Rs),r=await n.objectStore(Rs).get(D_(t));return await n.done,r}catch(e){if(e instanceof pi)hn.warn(e.message);else{const n=On.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});hn.warn(n.message)}}}async function Ep(t,e){try{const r=(await V_()).transaction(Rs,"readwrite");await r.objectStore(Rs).put(e,D_(t)),await r.done}catch(n){if(n instanceof pi)hn.warn(n.message);else{const r=On.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});hn.warn(r.message)}}}function D_(t){return`${t.name}!${t.options.appId}`}/**
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
 */const G1=1024,W1=30*24*60*60*1e3;class q1{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new K1(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Tp();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const l=new Date(a.date).valueOf();return Date.now()-l<=W1}),this._storage.overwrite(this._heartbeatsCache))}catch(r){hn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Tp(),{heartbeatsToSend:r,unsentEntries:i}=Q1(this._heartbeatsCache.heartbeats),s=Ea(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return hn.warn(n),""}}}function Tp(){return new Date().toISOString().substring(0,10)}function Q1(t,e=G1){const n=[];let r=t.slice();for(const i of t){const s=n.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),Ip(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Ip(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class K1{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return bE()?OE().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await H1(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return Ep(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return Ep(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Ip(t){return Ea(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function Y1(t){Ia(new Cs("platform-logger",e=>new o1(e),"PRIVATE")),Ia(new Cs("heartbeat",e=>new q1(e),"PRIVATE")),Qr(cc,vp,t),Qr(cc,vp,"esm2017"),Qr("fire-js","")}Y1("");var X1="firebase",J1="10.14.1";/**
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
 */Qr(X1,J1,"app");var Sp=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ur,M_;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,g){function y(){}y.prototype=g.prototype,v.D=g.prototype,v.prototype=new y,v.prototype.constructor=v,v.C=function(T,C,R){for(var E=Array(arguments.length-2),Et=2;Et<arguments.length;Et++)E[Et-2]=arguments[Et];return g.prototype[C].apply(T,E)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(v,g,y){y||(y=0);var T=Array(16);if(typeof g=="string")for(var C=0;16>C;++C)T[C]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(C=0;16>C;++C)T[C]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=v.g[0],y=v.g[1],C=v.g[2];var R=v.g[3],E=g+(R^y&(C^R))+T[0]+3614090360&4294967295;g=y+(E<<7&4294967295|E>>>25),E=R+(C^g&(y^C))+T[1]+3905402710&4294967295,R=g+(E<<12&4294967295|E>>>20),E=C+(y^R&(g^y))+T[2]+606105819&4294967295,C=R+(E<<17&4294967295|E>>>15),E=y+(g^C&(R^g))+T[3]+3250441966&4294967295,y=C+(E<<22&4294967295|E>>>10),E=g+(R^y&(C^R))+T[4]+4118548399&4294967295,g=y+(E<<7&4294967295|E>>>25),E=R+(C^g&(y^C))+T[5]+1200080426&4294967295,R=g+(E<<12&4294967295|E>>>20),E=C+(y^R&(g^y))+T[6]+2821735955&4294967295,C=R+(E<<17&4294967295|E>>>15),E=y+(g^C&(R^g))+T[7]+4249261313&4294967295,y=C+(E<<22&4294967295|E>>>10),E=g+(R^y&(C^R))+T[8]+1770035416&4294967295,g=y+(E<<7&4294967295|E>>>25),E=R+(C^g&(y^C))+T[9]+2336552879&4294967295,R=g+(E<<12&4294967295|E>>>20),E=C+(y^R&(g^y))+T[10]+4294925233&4294967295,C=R+(E<<17&4294967295|E>>>15),E=y+(g^C&(R^g))+T[11]+2304563134&4294967295,y=C+(E<<22&4294967295|E>>>10),E=g+(R^y&(C^R))+T[12]+1804603682&4294967295,g=y+(E<<7&4294967295|E>>>25),E=R+(C^g&(y^C))+T[13]+4254626195&4294967295,R=g+(E<<12&4294967295|E>>>20),E=C+(y^R&(g^y))+T[14]+2792965006&4294967295,C=R+(E<<17&4294967295|E>>>15),E=y+(g^C&(R^g))+T[15]+1236535329&4294967295,y=C+(E<<22&4294967295|E>>>10),E=g+(C^R&(y^C))+T[1]+4129170786&4294967295,g=y+(E<<5&4294967295|E>>>27),E=R+(y^C&(g^y))+T[6]+3225465664&4294967295,R=g+(E<<9&4294967295|E>>>23),E=C+(g^y&(R^g))+T[11]+643717713&4294967295,C=R+(E<<14&4294967295|E>>>18),E=y+(R^g&(C^R))+T[0]+3921069994&4294967295,y=C+(E<<20&4294967295|E>>>12),E=g+(C^R&(y^C))+T[5]+3593408605&4294967295,g=y+(E<<5&4294967295|E>>>27),E=R+(y^C&(g^y))+T[10]+38016083&4294967295,R=g+(E<<9&4294967295|E>>>23),E=C+(g^y&(R^g))+T[15]+3634488961&4294967295,C=R+(E<<14&4294967295|E>>>18),E=y+(R^g&(C^R))+T[4]+3889429448&4294967295,y=C+(E<<20&4294967295|E>>>12),E=g+(C^R&(y^C))+T[9]+568446438&4294967295,g=y+(E<<5&4294967295|E>>>27),E=R+(y^C&(g^y))+T[14]+3275163606&4294967295,R=g+(E<<9&4294967295|E>>>23),E=C+(g^y&(R^g))+T[3]+4107603335&4294967295,C=R+(E<<14&4294967295|E>>>18),E=y+(R^g&(C^R))+T[8]+1163531501&4294967295,y=C+(E<<20&4294967295|E>>>12),E=g+(C^R&(y^C))+T[13]+2850285829&4294967295,g=y+(E<<5&4294967295|E>>>27),E=R+(y^C&(g^y))+T[2]+4243563512&4294967295,R=g+(E<<9&4294967295|E>>>23),E=C+(g^y&(R^g))+T[7]+1735328473&4294967295,C=R+(E<<14&4294967295|E>>>18),E=y+(R^g&(C^R))+T[12]+2368359562&4294967295,y=C+(E<<20&4294967295|E>>>12),E=g+(y^C^R)+T[5]+4294588738&4294967295,g=y+(E<<4&4294967295|E>>>28),E=R+(g^y^C)+T[8]+2272392833&4294967295,R=g+(E<<11&4294967295|E>>>21),E=C+(R^g^y)+T[11]+1839030562&4294967295,C=R+(E<<16&4294967295|E>>>16),E=y+(C^R^g)+T[14]+4259657740&4294967295,y=C+(E<<23&4294967295|E>>>9),E=g+(y^C^R)+T[1]+2763975236&4294967295,g=y+(E<<4&4294967295|E>>>28),E=R+(g^y^C)+T[4]+1272893353&4294967295,R=g+(E<<11&4294967295|E>>>21),E=C+(R^g^y)+T[7]+4139469664&4294967295,C=R+(E<<16&4294967295|E>>>16),E=y+(C^R^g)+T[10]+3200236656&4294967295,y=C+(E<<23&4294967295|E>>>9),E=g+(y^C^R)+T[13]+681279174&4294967295,g=y+(E<<4&4294967295|E>>>28),E=R+(g^y^C)+T[0]+3936430074&4294967295,R=g+(E<<11&4294967295|E>>>21),E=C+(R^g^y)+T[3]+3572445317&4294967295,C=R+(E<<16&4294967295|E>>>16),E=y+(C^R^g)+T[6]+76029189&4294967295,y=C+(E<<23&4294967295|E>>>9),E=g+(y^C^R)+T[9]+3654602809&4294967295,g=y+(E<<4&4294967295|E>>>28),E=R+(g^y^C)+T[12]+3873151461&4294967295,R=g+(E<<11&4294967295|E>>>21),E=C+(R^g^y)+T[15]+530742520&4294967295,C=R+(E<<16&4294967295|E>>>16),E=y+(C^R^g)+T[2]+3299628645&4294967295,y=C+(E<<23&4294967295|E>>>9),E=g+(C^(y|~R))+T[0]+4096336452&4294967295,g=y+(E<<6&4294967295|E>>>26),E=R+(y^(g|~C))+T[7]+1126891415&4294967295,R=g+(E<<10&4294967295|E>>>22),E=C+(g^(R|~y))+T[14]+2878612391&4294967295,C=R+(E<<15&4294967295|E>>>17),E=y+(R^(C|~g))+T[5]+4237533241&4294967295,y=C+(E<<21&4294967295|E>>>11),E=g+(C^(y|~R))+T[12]+1700485571&4294967295,g=y+(E<<6&4294967295|E>>>26),E=R+(y^(g|~C))+T[3]+2399980690&4294967295,R=g+(E<<10&4294967295|E>>>22),E=C+(g^(R|~y))+T[10]+4293915773&4294967295,C=R+(E<<15&4294967295|E>>>17),E=y+(R^(C|~g))+T[1]+2240044497&4294967295,y=C+(E<<21&4294967295|E>>>11),E=g+(C^(y|~R))+T[8]+1873313359&4294967295,g=y+(E<<6&4294967295|E>>>26),E=R+(y^(g|~C))+T[15]+4264355552&4294967295,R=g+(E<<10&4294967295|E>>>22),E=C+(g^(R|~y))+T[6]+2734768916&4294967295,C=R+(E<<15&4294967295|E>>>17),E=y+(R^(C|~g))+T[13]+1309151649&4294967295,y=C+(E<<21&4294967295|E>>>11),E=g+(C^(y|~R))+T[4]+4149444226&4294967295,g=y+(E<<6&4294967295|E>>>26),E=R+(y^(g|~C))+T[11]+3174756917&4294967295,R=g+(E<<10&4294967295|E>>>22),E=C+(g^(R|~y))+T[2]+718787259&4294967295,C=R+(E<<15&4294967295|E>>>17),E=y+(R^(C|~g))+T[9]+3951481745&4294967295,v.g[0]=v.g[0]+g&4294967295,v.g[1]=v.g[1]+(C+(E<<21&4294967295|E>>>11))&4294967295,v.g[2]=v.g[2]+C&4294967295,v.g[3]=v.g[3]+R&4294967295}r.prototype.u=function(v,g){g===void 0&&(g=v.length);for(var y=g-this.blockSize,T=this.B,C=this.h,R=0;R<g;){if(C==0)for(;R<=y;)i(this,v,R),R+=this.blockSize;if(typeof v=="string"){for(;R<g;)if(T[C++]=v.charCodeAt(R++),C==this.blockSize){i(this,T),C=0;break}}else for(;R<g;)if(T[C++]=v[R++],C==this.blockSize){i(this,T),C=0;break}}this.h=C,this.o+=g},r.prototype.v=function(){var v=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);v[0]=128;for(var g=1;g<v.length-8;++g)v[g]=0;var y=8*this.o;for(g=v.length-8;g<v.length;++g)v[g]=y&255,y/=256;for(this.u(v),v=Array(16),g=y=0;4>g;++g)for(var T=0;32>T;T+=8)v[y++]=this.g[g]>>>T&255;return v};function s(v,g){var y=l;return Object.prototype.hasOwnProperty.call(y,v)?y[v]:y[v]=g(v)}function a(v,g){this.h=g;for(var y=[],T=!0,C=v.length-1;0<=C;C--){var R=v[C]|0;T&&R==g||(y[C]=R,T=!1)}this.g=y}var l={};function u(v){return-128<=v&&128>v?s(v,function(g){return new a([g|0],0>g?-1:0)}):new a([v|0],0>v?-1:0)}function h(v){if(isNaN(v)||!isFinite(v))return m;if(0>v)return L(h(-v));for(var g=[],y=1,T=0;v>=y;T++)g[T]=v/y|0,y*=4294967296;return new a(g,0)}function f(v,g){if(v.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(v.charAt(0)=="-")return L(f(v.substring(1),g));if(0<=v.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=h(Math.pow(g,8)),T=m,C=0;C<v.length;C+=8){var R=Math.min(8,v.length-C),E=parseInt(v.substring(C,C+R),g);8>R?(R=h(Math.pow(g,R)),T=T.j(R).add(h(E))):(T=T.j(y),T=T.add(h(E)))}return T}var m=u(0),_=u(1),S=u(16777216);t=a.prototype,t.m=function(){if(D(this))return-L(this).m();for(var v=0,g=1,y=0;y<this.g.length;y++){var T=this.i(y);v+=(0<=T?T:4294967296+T)*g,g*=4294967296}return v},t.toString=function(v){if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(x(this))return"0";if(D(this))return"-"+L(this).toString(v);for(var g=h(Math.pow(v,6)),y=this,T="";;){var C=N(y,g).g;y=I(y,C.j(g));var R=((0<y.g.length?y.g[0]:y.h)>>>0).toString(v);if(y=C,x(y))return R+T;for(;6>R.length;)R="0"+R;T=R+T}},t.i=function(v){return 0>v?0:v<this.g.length?this.g[v]:this.h};function x(v){if(v.h!=0)return!1;for(var g=0;g<v.g.length;g++)if(v.g[g]!=0)return!1;return!0}function D(v){return v.h==-1}t.l=function(v){return v=I(this,v),D(v)?-1:x(v)?0:1};function L(v){for(var g=v.g.length,y=[],T=0;T<g;T++)y[T]=~v.g[T];return new a(y,~v.h).add(_)}t.abs=function(){return D(this)?L(this):this},t.add=function(v){for(var g=Math.max(this.g.length,v.g.length),y=[],T=0,C=0;C<=g;C++){var R=T+(this.i(C)&65535)+(v.i(C)&65535),E=(R>>>16)+(this.i(C)>>>16)+(v.i(C)>>>16);T=E>>>16,R&=65535,E&=65535,y[C]=E<<16|R}return new a(y,y[y.length-1]&-2147483648?-1:0)};function I(v,g){return v.add(L(g))}t.j=function(v){if(x(this)||x(v))return m;if(D(this))return D(v)?L(this).j(L(v)):L(L(this).j(v));if(D(v))return L(this.j(L(v)));if(0>this.l(S)&&0>v.l(S))return h(this.m()*v.m());for(var g=this.g.length+v.g.length,y=[],T=0;T<2*g;T++)y[T]=0;for(T=0;T<this.g.length;T++)for(var C=0;C<v.g.length;C++){var R=this.i(T)>>>16,E=this.i(T)&65535,Et=v.i(C)>>>16,Kn=v.i(C)&65535;y[2*T+2*C]+=E*Kn,w(y,2*T+2*C),y[2*T+2*C+1]+=R*Kn,w(y,2*T+2*C+1),y[2*T+2*C+1]+=E*Et,w(y,2*T+2*C+1),y[2*T+2*C+2]+=R*Et,w(y,2*T+2*C+2)}for(T=0;T<g;T++)y[T]=y[2*T+1]<<16|y[2*T];for(T=g;T<2*g;T++)y[T]=0;return new a(y,0)};function w(v,g){for(;(v[g]&65535)!=v[g];)v[g+1]+=v[g]>>>16,v[g]&=65535,g++}function A(v,g){this.g=v,this.h=g}function N(v,g){if(x(g))throw Error("division by zero");if(x(v))return new A(m,m);if(D(v))return g=N(L(v),g),new A(L(g.g),L(g.h));if(D(g))return g=N(v,L(g)),new A(L(g.g),g.h);if(30<v.g.length){if(D(v)||D(g))throw Error("slowDivide_ only works with positive integers.");for(var y=_,T=g;0>=T.l(v);)y=F(y),T=F(T);var C=U(y,1),R=U(T,1);for(T=U(T,2),y=U(y,2);!x(T);){var E=R.add(T);0>=E.l(v)&&(C=C.add(y),R=E),T=U(T,1),y=U(y,1)}return g=I(v,C.j(g)),new A(C,g)}for(C=m;0<=v.l(g);){for(y=Math.max(1,Math.floor(v.m()/g.m())),T=Math.ceil(Math.log(y)/Math.LN2),T=48>=T?1:Math.pow(2,T-48),R=h(y),E=R.j(g);D(E)||0<E.l(v);)y-=T,R=h(y),E=R.j(g);x(R)&&(R=_),C=C.add(R),v=I(v,E)}return new A(C,v)}t.A=function(v){return N(this,v).h},t.and=function(v){for(var g=Math.max(this.g.length,v.g.length),y=[],T=0;T<g;T++)y[T]=this.i(T)&v.i(T);return new a(y,this.h&v.h)},t.or=function(v){for(var g=Math.max(this.g.length,v.g.length),y=[],T=0;T<g;T++)y[T]=this.i(T)|v.i(T);return new a(y,this.h|v.h)},t.xor=function(v){for(var g=Math.max(this.g.length,v.g.length),y=[],T=0;T<g;T++)y[T]=this.i(T)^v.i(T);return new a(y,this.h^v.h)};function F(v){for(var g=v.g.length+1,y=[],T=0;T<g;T++)y[T]=v.i(T)<<1|v.i(T-1)>>>31;return new a(y,v.h)}function U(v,g){var y=g>>5;g%=32;for(var T=v.g.length-y,C=[],R=0;R<T;R++)C[R]=0<g?v.i(R+y)>>>g|v.i(R+y+1)<<32-g:v.i(R+y);return new a(C,v.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,M_=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,ur=a}).apply(typeof Sp<"u"?Sp:typeof self<"u"?self:typeof window<"u"?window:{});var Po=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var L_,Gi,b_,Wo,fc,O_,F_,j_;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,c,d){return o==Array.prototype||o==Object.prototype||(o[c]=d.value),o};function n(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Po=="object"&&Po];for(var c=0;c<o.length;++c){var d=o[c];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=n(this);function i(o,c){if(c)e:{var d=r;o=o.split(".");for(var p=0;p<o.length-1;p++){var k=o[p];if(!(k in d))break e;d=d[k]}o=o[o.length-1],p=d[o],c=c(p),c!=p&&c!=null&&e(d,o,{configurable:!0,writable:!0,value:c})}}function s(o,c){o instanceof String&&(o+="");var d=0,p=!1,k={next:function(){if(!p&&d<o.length){var V=d++;return{value:c(V,o[V]),done:!1}}return p=!0,{done:!0,value:void 0}}};return k[Symbol.iterator]=function(){return k},k}i("Array.prototype.values",function(o){return o||function(){return s(this,function(c,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function u(o){var c=typeof o;return c=c!="object"?c:o?Array.isArray(o)?"array":c:"null",c=="array"||c=="object"&&typeof o.length=="number"}function h(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function f(o,c,d){return o.call.apply(o.bind,arguments)}function m(o,c,d){if(!o)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var k=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(k,p),o.apply(c,k)}}return function(){return o.apply(c,arguments)}}function _(o,c,d){return _=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:m,_.apply(null,arguments)}function S(o,c){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function x(o,c){function d(){}d.prototype=c.prototype,o.aa=c.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(p,k,V){for(var j=Array(arguments.length-2),ae=2;ae<arguments.length;ae++)j[ae-2]=arguments[ae];return c.prototype[k].apply(p,j)}}function D(o){const c=o.length;if(0<c){const d=Array(c);for(let p=0;p<c;p++)d[p]=o[p];return d}return[]}function L(o,c){for(let d=1;d<arguments.length;d++){const p=arguments[d];if(u(p)){const k=o.length||0,V=p.length||0;o.length=k+V;for(let j=0;j<V;j++)o[k+j]=p[j]}else o.push(p)}}class I{constructor(c,d){this.i=c,this.j=d,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function w(o){return/^[\s\xa0]*$/.test(o)}function A(){var o=l.navigator;return o&&(o=o.userAgent)?o:""}function N(o){return N[" "](o),o}N[" "]=function(){};var F=A().indexOf("Gecko")!=-1&&!(A().toLowerCase().indexOf("webkit")!=-1&&A().indexOf("Edge")==-1)&&!(A().indexOf("Trident")!=-1||A().indexOf("MSIE")!=-1)&&A().indexOf("Edge")==-1;function U(o,c,d){for(const p in o)c.call(d,o[p],p,o)}function v(o,c){for(const d in o)c.call(void 0,o[d],d,o)}function g(o){const c={};for(const d in o)c[d]=o[d];return c}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function T(o,c){let d,p;for(let k=1;k<arguments.length;k++){p=arguments[k];for(d in p)o[d]=p[d];for(let V=0;V<y.length;V++)d=y[V],Object.prototype.hasOwnProperty.call(p,d)&&(o[d]=p[d])}}function C(o){var c=1;o=o.split(":");const d=[];for(;0<c&&o.length;)d.push(o.shift()),c--;return o.length&&d.push(o.join(":")),d}function R(o){l.setTimeout(()=>{throw o},0)}function E(){var o=q;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class Et{constructor(){this.h=this.g=null}add(c,d){const p=Kn.get();p.set(c,d),this.h?this.h.next=p:this.g=p,this.h=p}}var Kn=new I(()=>new yi,o=>o.reset());class yi{constructor(){this.next=this.g=this.h=null}set(c,d){this.h=c,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let qt,z=!1,q=new Et,Y=()=>{const o=l.Promise.resolve(void 0);qt=()=>{o.then(pe)}};var pe=()=>{for(var o;o=E();){try{o.h.call(o.g)}catch(d){R(d)}var c=Kn;c.j(o),100>c.h&&(c.h++,o.next=c.g,c.g=o)}z=!1};function oe(){this.s=this.s,this.C=this.C}oe.prototype.s=!1,oe.prototype.ma=function(){this.s||(this.s=!0,this.N())},oe.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ee(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}Ee.prototype.h=function(){this.defaultPrevented=!0};var Qt=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};l.addEventListener("test",d,c),l.removeEventListener("test",d,c)}catch{}return o}();function Kt(o,c){if(Ee.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget){if(F){e:{try{N(c.nodeName);var k=!0;break e}catch{}k=!1}k||(c=null)}}else d=="mouseover"?c=o.fromElement:d=="mouseout"&&(c=o.toElement);this.relatedTarget=c,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:Yt[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Kt.aa.h.call(this)}}x(Kt,Ee);var Yt={2:"touch",3:"pen",4:"mouse"};Kt.prototype.h=function(){Kt.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Xt="closure_listenable_"+(1e6*Math.random()|0),sv=0;function ov(o,c,d,p,k){this.listener=o,this.proxy=null,this.src=c,this.type=d,this.capture=!!p,this.ha=k,this.key=++sv,this.da=this.fa=!1}function Ws(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function qs(o){this.src=o,this.g={},this.h=0}qs.prototype.add=function(o,c,d,p,k){var V=o.toString();o=this.g[V],o||(o=this.g[V]=[],this.h++);var j=hl(o,c,p,k);return-1<j?(c=o[j],d||(c.fa=!1)):(c=new ov(c,this.src,V,!!p,k),c.fa=d,o.push(c)),c};function cl(o,c){var d=c.type;if(d in o.g){var p=o.g[d],k=Array.prototype.indexOf.call(p,c,void 0),V;(V=0<=k)&&Array.prototype.splice.call(p,k,1),V&&(Ws(c),o.g[d].length==0&&(delete o.g[d],o.h--))}}function hl(o,c,d,p){for(var k=0;k<o.length;++k){var V=o[k];if(!V.da&&V.listener==c&&V.capture==!!d&&V.ha==p)return k}return-1}var dl="closure_lm_"+(1e6*Math.random()|0),fl={};function id(o,c,d,p,k){if(Array.isArray(c)){for(var V=0;V<c.length;V++)id(o,c[V],d,p,k);return null}return d=ad(d),o&&o[Xt]?o.K(c,d,h(p)?!!p.capture:!1,k):av(o,c,d,!1,p,k)}function av(o,c,d,p,k,V){if(!c)throw Error("Invalid event type");var j=h(k)?!!k.capture:!!k,ae=ml(o);if(ae||(o[dl]=ae=new qs(o)),d=ae.add(c,d,p,j,V),d.proxy)return d;if(p=lv(),d.proxy=p,p.src=o,p.listener=d,o.addEventListener)Qt||(k=j),k===void 0&&(k=!1),o.addEventListener(c.toString(),p,k);else if(o.attachEvent)o.attachEvent(od(c.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function lv(){function o(d){return c.call(o.src,o.listener,d)}const c=uv;return o}function sd(o,c,d,p,k){if(Array.isArray(c))for(var V=0;V<c.length;V++)sd(o,c[V],d,p,k);else p=h(p)?!!p.capture:!!p,d=ad(d),o&&o[Xt]?(o=o.i,c=String(c).toString(),c in o.g&&(V=o.g[c],d=hl(V,d,p,k),-1<d&&(Ws(V[d]),Array.prototype.splice.call(V,d,1),V.length==0&&(delete o.g[c],o.h--)))):o&&(o=ml(o))&&(c=o.g[c.toString()],o=-1,c&&(o=hl(c,d,p,k)),(d=-1<o?c[o]:null)&&pl(d))}function pl(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[Xt])cl(c.i,o);else{var d=o.type,p=o.proxy;c.removeEventListener?c.removeEventListener(d,p,o.capture):c.detachEvent?c.detachEvent(od(d),p):c.addListener&&c.removeListener&&c.removeListener(p),(d=ml(c))?(cl(d,o),d.h==0&&(d.src=null,c[dl]=null)):Ws(o)}}}function od(o){return o in fl?fl[o]:fl[o]="on"+o}function uv(o,c){if(o.da)o=!0;else{c=new Kt(c,this);var d=o.listener,p=o.ha||o.src;o.fa&&pl(o),o=d.call(p,c)}return o}function ml(o){return o=o[dl],o instanceof qs?o:null}var gl="__closure_events_fn_"+(1e9*Math.random()>>>0);function ad(o){return typeof o=="function"?o:(o[gl]||(o[gl]=function(c){return o.handleEvent(c)}),o[gl])}function Be(){oe.call(this),this.i=new qs(this),this.M=this,this.F=null}x(Be,oe),Be.prototype[Xt]=!0,Be.prototype.removeEventListener=function(o,c,d,p){sd(this,o,c,d,p)};function Je(o,c){var d,p=o.F;if(p)for(d=[];p;p=p.F)d.push(p);if(o=o.M,p=c.type||c,typeof c=="string")c=new Ee(c,o);else if(c instanceof Ee)c.target=c.target||o;else{var k=c;c=new Ee(p,o),T(c,k)}if(k=!0,d)for(var V=d.length-1;0<=V;V--){var j=c.g=d[V];k=Qs(j,p,!0,c)&&k}if(j=c.g=o,k=Qs(j,p,!0,c)&&k,k=Qs(j,p,!1,c)&&k,d)for(V=0;V<d.length;V++)j=c.g=d[V],k=Qs(j,p,!1,c)&&k}Be.prototype.N=function(){if(Be.aa.N.call(this),this.i){var o=this.i,c;for(c in o.g){for(var d=o.g[c],p=0;p<d.length;p++)Ws(d[p]);delete o.g[c],o.h--}}this.F=null},Be.prototype.K=function(o,c,d,p){return this.i.add(String(o),c,!1,d,p)},Be.prototype.L=function(o,c,d,p){return this.i.add(String(o),c,!0,d,p)};function Qs(o,c,d,p){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();for(var k=!0,V=0;V<c.length;++V){var j=c[V];if(j&&!j.da&&j.capture==d){var ae=j.listener,De=j.ha||j.src;j.fa&&cl(o.i,j),k=ae.call(De,p)!==!1&&k}}return k&&!p.defaultPrevented}function ld(o,c,d){if(typeof o=="function")d&&(o=_(o,d));else if(o&&typeof o.handleEvent=="function")o=_(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(o,c||0)}function ud(o){o.g=ld(()=>{o.g=null,o.i&&(o.i=!1,ud(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class cv extends oe{constructor(c,d){super(),this.m=c,this.l=d,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:ud(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function vi(o){oe.call(this),this.h=o,this.g={}}x(vi,oe);var cd=[];function hd(o){U(o.g,function(c,d){this.g.hasOwnProperty(d)&&pl(c)},o),o.g={}}vi.prototype.N=function(){vi.aa.N.call(this),hd(this)},vi.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var _l=l.JSON.stringify,hv=l.JSON.parse,dv=class{stringify(o){return l.JSON.stringify(o,void 0)}parse(o){return l.JSON.parse(o,void 0)}};function yl(){}yl.prototype.h=null;function dd(o){return o.h||(o.h=o.i())}function fd(){}var wi={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function vl(){Ee.call(this,"d")}x(vl,Ee);function wl(){Ee.call(this,"c")}x(wl,Ee);var Yn={},pd=null;function Ks(){return pd=pd||new Be}Yn.La="serverreachability";function md(o){Ee.call(this,Yn.La,o)}x(md,Ee);function Ei(o){const c=Ks();Je(c,new md(c))}Yn.STAT_EVENT="statevent";function gd(o,c){Ee.call(this,Yn.STAT_EVENT,o),this.stat=c}x(gd,Ee);function Ze(o){const c=Ks();Je(c,new gd(c,o))}Yn.Ma="timingevent";function _d(o,c){Ee.call(this,Yn.Ma,o),this.size=c}x(_d,Ee);function Ti(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){o()},c)}function Ii(){this.g=!0}Ii.prototype.xa=function(){this.g=!1};function fv(o,c,d,p,k,V){o.info(function(){if(o.g)if(V)for(var j="",ae=V.split("&"),De=0;De<ae.length;De++){var ne=ae[De].split("=");if(1<ne.length){var $e=ne[0];ne=ne[1];var He=$e.split("_");j=2<=He.length&&He[1]=="type"?j+($e+"="+ne+"&"):j+($e+"=redacted&")}}else j=null;else j=V;return"XMLHTTP REQ ("+p+") [attempt "+k+"]: "+c+`
`+d+`
`+j})}function pv(o,c,d,p,k,V,j){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+k+"]: "+c+`
`+d+`
`+V+" "+j})}function Tr(o,c,d,p){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+gv(o,d)+(p?" "+p:"")})}function mv(o,c){o.info(function(){return"TIMEOUT: "+c})}Ii.prototype.info=function(){};function gv(o,c){if(!o.g)return c;if(!c)return null;try{var d=JSON.parse(c);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var p=d[o];if(!(2>p.length)){var k=p[1];if(Array.isArray(k)&&!(1>k.length)){var V=k[0];if(V!="noop"&&V!="stop"&&V!="close")for(var j=1;j<k.length;j++)k[j]=""}}}}return _l(d)}catch{return c}}var Ys={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},yd={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},El;function Xs(){}x(Xs,yl),Xs.prototype.g=function(){return new XMLHttpRequest},Xs.prototype.i=function(){return{}},El=new Xs;function gn(o,c,d,p){this.j=o,this.i=c,this.l=d,this.R=p||1,this.U=new vi(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new vd}function vd(){this.i=null,this.g="",this.h=!1}var wd={},Tl={};function Il(o,c,d){o.L=1,o.v=to(Jt(c)),o.m=d,o.P=!0,Ed(o,null)}function Ed(o,c){o.F=Date.now(),Js(o),o.A=Jt(o.v);var d=o.A,p=o.R;Array.isArray(p)||(p=[String(p)]),Ld(d.i,"t",p),o.C=0,d=o.j.J,o.h=new vd,o.g=Zd(o.j,d?c:null,!o.m),0<o.O&&(o.M=new cv(_(o.Y,o,o.g),o.O)),c=o.U,d=o.g,p=o.ca;var k="readystatechange";Array.isArray(k)||(k&&(cd[0]=k.toString()),k=cd);for(var V=0;V<k.length;V++){var j=id(d,k[V],p||c.handleEvent,!1,c.h||c);if(!j)break;c.g[j.key]=j}c=o.H?g(o.H):{},o.m?(o.u||(o.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,c)):(o.u="GET",o.g.ea(o.A,o.u,null,c)),Ei(),fv(o.i,o.u,o.A,o.l,o.R,o.m)}gn.prototype.ca=function(o){o=o.target;const c=this.M;c&&Zt(o)==3?c.j():this.Y(o)},gn.prototype.Y=function(o){try{if(o==this.g)e:{const He=Zt(this.g);var c=this.g.Ba();const Ar=this.g.Z();if(!(3>He)&&(He!=3||this.g&&(this.h.h||this.g.oa()||Bd(this.g)))){this.J||He!=4||c==7||(c==8||0>=Ar?Ei(3):Ei(2)),Sl(this);var d=this.g.Z();this.X=d;t:if(Td(this)){var p=Bd(this.g);o="";var k=p.length,V=Zt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Xn(this),Si(this);var j="";break t}this.h.i=new l.TextDecoder}for(c=0;c<k;c++)this.h.h=!0,o+=this.h.i.decode(p[c],{stream:!(V&&c==k-1)});p.length=0,this.h.g+=o,this.C=0,j=this.h.g}else j=this.g.oa();if(this.o=d==200,pv(this.i,this.u,this.A,this.l,this.R,He,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ae,De=this.g;if((ae=De.g?De.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!w(ae)){var ne=ae;break t}}ne=null}if(d=ne)Tr(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Al(this,d);else{this.o=!1,this.s=3,Ze(12),Xn(this),Si(this);break e}}if(this.P){d=!0;let kt;for(;!this.J&&this.C<j.length;)if(kt=_v(this,j),kt==Tl){He==4&&(this.s=4,Ze(14),d=!1),Tr(this.i,this.l,null,"[Incomplete Response]");break}else if(kt==wd){this.s=4,Ze(15),Tr(this.i,this.l,j,"[Invalid Chunk]"),d=!1;break}else Tr(this.i,this.l,kt,null),Al(this,kt);if(Td(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),He!=4||j.length!=0||this.h.h||(this.s=1,Ze(16),d=!1),this.o=this.o&&d,!d)Tr(this.i,this.l,j,"[Invalid Chunked Response]"),Xn(this),Si(this);else if(0<j.length&&!this.W){this.W=!0;var $e=this.j;$e.g==this&&$e.ba&&!$e.M&&($e.j.info("Great, no buffering proxy detected. Bytes received: "+j.length),Nl($e),$e.M=!0,Ze(11))}}else Tr(this.i,this.l,j,null),Al(this,j);He==4&&Xn(this),this.o&&!this.J&&(He==4?Kd(this.j,this):(this.o=!1,Js(this)))}else Mv(this.g),d==400&&0<j.indexOf("Unknown SID")?(this.s=3,Ze(12)):(this.s=0,Ze(13)),Xn(this),Si(this)}}}catch{}finally{}};function Td(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function _v(o,c){var d=o.C,p=c.indexOf(`
`,d);return p==-1?Tl:(d=Number(c.substring(d,p)),isNaN(d)?wd:(p+=1,p+d>c.length?Tl:(c=c.slice(p,p+d),o.C=p+d,c)))}gn.prototype.cancel=function(){this.J=!0,Xn(this)};function Js(o){o.S=Date.now()+o.I,Id(o,o.I)}function Id(o,c){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Ti(_(o.ba,o),c)}function Sl(o){o.B&&(l.clearTimeout(o.B),o.B=null)}gn.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(mv(this.i,this.A),this.L!=2&&(Ei(),Ze(17)),Xn(this),this.s=2,Si(this)):Id(this,this.S-o)};function Si(o){o.j.G==0||o.J||Kd(o.j,o)}function Xn(o){Sl(o);var c=o.M;c&&typeof c.ma=="function"&&c.ma(),o.M=null,hd(o.U),o.g&&(c=o.g,o.g=null,c.abort(),c.ma())}function Al(o,c){try{var d=o.j;if(d.G!=0&&(d.g==o||Cl(d.h,o))){if(!o.K&&Cl(d.h,o)&&d.G==3){try{var p=d.Da.g.parse(c)}catch{p=null}if(Array.isArray(p)&&p.length==3){var k=p;if(k[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)ao(d),so(d);else break e;xl(d),Ze(18)}}else d.za=k[1],0<d.za-d.T&&37500>k[2]&&d.F&&d.v==0&&!d.C&&(d.C=Ti(_(d.Za,d),6e3));if(1>=Cd(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Zn(d,11)}else if((o.K||d.g==o)&&ao(d),!w(c))for(k=d.Da.g.parse(c),c=0;c<k.length;c++){let ne=k[c];if(d.T=ne[0],ne=ne[1],d.G==2)if(ne[0]=="c"){d.K=ne[1],d.ia=ne[2];const $e=ne[3];$e!=null&&(d.la=$e,d.j.info("VER="+d.la));const He=ne[4];He!=null&&(d.Aa=He,d.j.info("SVER="+d.Aa));const Ar=ne[5];Ar!=null&&typeof Ar=="number"&&0<Ar&&(p=1.5*Ar,d.L=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const kt=o.g;if(kt){const uo=kt.g?kt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(uo){var V=p.h;V.g||uo.indexOf("spdy")==-1&&uo.indexOf("quic")==-1&&uo.indexOf("h2")==-1||(V.j=V.l,V.g=new Set,V.h&&(Rl(V,V.h),V.h=null))}if(p.D){const Vl=kt.g?kt.g.getResponseHeader("X-HTTP-Session-Id"):null;Vl&&(p.ya=Vl,ue(p.I,p.D,Vl))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),p=d;var j=o;if(p.qa=Jd(p,p.J?p.ia:null,p.W),j.K){Rd(p.h,j);var ae=j,De=p.L;De&&(ae.I=De),ae.B&&(Sl(ae),Js(ae)),p.g=j}else qd(p);0<d.i.length&&oo(d)}else ne[0]!="stop"&&ne[0]!="close"||Zn(d,7);else d.G==3&&(ne[0]=="stop"||ne[0]=="close"?ne[0]=="stop"?Zn(d,7):kl(d):ne[0]!="noop"&&d.l&&d.l.ta(ne),d.v=0)}}Ei(4)}catch{}}var yv=class{constructor(o,c){this.g=o,this.map=c}};function Sd(o){this.l=o||10,l.PerformanceNavigationTiming?(o=l.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ad(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Cd(o){return o.h?1:o.g?o.g.size:0}function Cl(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function Rl(o,c){o.g?o.g.add(c):o.h=c}function Rd(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}Sd.prototype.cancel=function(){if(this.i=Pd(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Pd(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const d of o.g.values())c=c.concat(d.D);return c}return D(o.i)}function vv(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(u(o)){for(var c=[],d=o.length,p=0;p<d;p++)c.push(o[p]);return c}c=[],d=0;for(p in o)c[d++]=o[p];return c}function wv(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(u(o)||typeof o=="string"){var c=[];o=o.length;for(var d=0;d<o;d++)c.push(d);return c}c=[],d=0;for(const p in o)c[d++]=p;return c}}}function kd(o,c){if(o.forEach&&typeof o.forEach=="function")o.forEach(c,void 0);else if(u(o)||typeof o=="string")Array.prototype.forEach.call(o,c,void 0);else for(var d=wv(o),p=vv(o),k=p.length,V=0;V<k;V++)c.call(void 0,p[V],d&&d[V],o)}var xd=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Ev(o,c){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var p=o[d].indexOf("="),k=null;if(0<=p){var V=o[d].substring(0,p);k=o[d].substring(p+1)}else V=o[d];c(V,k?decodeURIComponent(k.replace(/\+/g," ")):"")}}}function Jn(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Jn){this.h=o.h,Zs(this,o.j),this.o=o.o,this.g=o.g,eo(this,o.s),this.l=o.l;var c=o.i,d=new Ri;d.i=c.i,c.g&&(d.g=new Map(c.g),d.h=c.h),Nd(this,d),this.m=o.m}else o&&(c=String(o).match(xd))?(this.h=!1,Zs(this,c[1]||"",!0),this.o=Ai(c[2]||""),this.g=Ai(c[3]||"",!0),eo(this,c[4]),this.l=Ai(c[5]||"",!0),Nd(this,c[6]||"",!0),this.m=Ai(c[7]||"")):(this.h=!1,this.i=new Ri(null,this.h))}Jn.prototype.toString=function(){var o=[],c=this.j;c&&o.push(Ci(c,Vd,!0),":");var d=this.g;return(d||c=="file")&&(o.push("//"),(c=this.o)&&o.push(Ci(c,Vd,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(Ci(d,d.charAt(0)=="/"?Sv:Iv,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",Ci(d,Cv)),o.join("")};function Jt(o){return new Jn(o)}function Zs(o,c,d){o.j=d?Ai(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function eo(o,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);o.s=c}else o.s=null}function Nd(o,c,d){c instanceof Ri?(o.i=c,Rv(o.i,o.h)):(d||(c=Ci(c,Av)),o.i=new Ri(c,o.h))}function ue(o,c,d){o.i.set(c,d)}function to(o){return ue(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function Ai(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Ci(o,c,d){return typeof o=="string"?(o=encodeURI(o).replace(c,Tv),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Tv(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Vd=/[#\/\?@]/g,Iv=/[#\?:]/g,Sv=/[#\?]/g,Av=/[#\?@]/g,Cv=/#/g;function Ri(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function _n(o){o.g||(o.g=new Map,o.h=0,o.i&&Ev(o.i,function(c,d){o.add(decodeURIComponent(c.replace(/\+/g," ")),d)}))}t=Ri.prototype,t.add=function(o,c){_n(this),this.i=null,o=Ir(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(c),this.h+=1,this};function Dd(o,c){_n(o),c=Ir(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function Md(o,c){return _n(o),c=Ir(o,c),o.g.has(c)}t.forEach=function(o,c){_n(this),this.g.forEach(function(d,p){d.forEach(function(k){o.call(c,k,p,this)},this)},this)},t.na=function(){_n(this);const o=Array.from(this.g.values()),c=Array.from(this.g.keys()),d=[];for(let p=0;p<c.length;p++){const k=o[p];for(let V=0;V<k.length;V++)d.push(c[p])}return d},t.V=function(o){_n(this);let c=[];if(typeof o=="string")Md(this,o)&&(c=c.concat(this.g.get(Ir(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)c=c.concat(o[d])}return c},t.set=function(o,c){return _n(this),this.i=null,o=Ir(this,o),Md(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},t.get=function(o,c){return o?(o=this.V(o),0<o.length?String(o[0]):c):c};function Ld(o,c,d){Dd(o,c),0<d.length&&(o.i=null,o.g.set(Ir(o,c),D(d)),o.h+=d.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(var d=0;d<c.length;d++){var p=c[d];const V=encodeURIComponent(String(p)),j=this.V(p);for(p=0;p<j.length;p++){var k=V;j[p]!==""&&(k+="="+encodeURIComponent(String(j[p]))),o.push(k)}}return this.i=o.join("&")};function Ir(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function Rv(o,c){c&&!o.j&&(_n(o),o.i=null,o.g.forEach(function(d,p){var k=p.toLowerCase();p!=k&&(Dd(this,p),Ld(this,k,d))},o)),o.j=c}function Pv(o,c){const d=new Ii;if(l.Image){const p=new Image;p.onload=S(yn,d,"TestLoadImage: loaded",!0,c,p),p.onerror=S(yn,d,"TestLoadImage: error",!1,c,p),p.onabort=S(yn,d,"TestLoadImage: abort",!1,c,p),p.ontimeout=S(yn,d,"TestLoadImage: timeout",!1,c,p),l.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else c(!1)}function kv(o,c){const d=new Ii,p=new AbortController,k=setTimeout(()=>{p.abort(),yn(d,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:p.signal}).then(V=>{clearTimeout(k),V.ok?yn(d,"TestPingServer: ok",!0,c):yn(d,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(k),yn(d,"TestPingServer: error",!1,c)})}function yn(o,c,d,p,k){try{k&&(k.onload=null,k.onerror=null,k.onabort=null,k.ontimeout=null),p(d)}catch{}}function xv(){this.g=new dv}function Nv(o,c,d){const p=d||"";try{kd(o,function(k,V){let j=k;h(k)&&(j=_l(k)),c.push(p+V+"="+encodeURIComponent(j))})}catch(k){throw c.push(p+"type="+encodeURIComponent("_badmap")),k}}function no(o){this.l=o.Ub||null,this.j=o.eb||!1}x(no,yl),no.prototype.g=function(){return new ro(this.l,this.j)},no.prototype.i=function(o){return function(){return o}}({});function ro(o,c){Be.call(this),this.D=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}x(ro,Be),t=ro.prototype,t.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=c,this.readyState=1,ki(this)},t.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(c.body=o),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Pi(this)),this.readyState=0},t.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,ki(this)),this.g&&(this.readyState=3,ki(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;bd(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function bd(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}t.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?Pi(this):ki(this),this.readyState==3&&bd(this)}},t.Ra=function(o){this.g&&(this.response=this.responseText=o,Pi(this))},t.Qa=function(o){this.g&&(this.response=o,Pi(this))},t.ga=function(){this.g&&Pi(this)};function Pi(o){o.readyState=4,o.l=null,o.j=null,o.v=null,ki(o)}t.setRequestHeader=function(o,c){this.u.append(o,c)},t.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var d=c.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=c.next();return o.join(`\r
`)};function ki(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(ro.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Od(o){let c="";return U(o,function(d,p){c+=p,c+=":",c+=d,c+=`\r
`}),c}function Pl(o,c,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=Od(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):ue(o,c,d))}function ve(o){Be.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}x(ve,Be);var Vv=/^https?$/i,Dv=["POST","PUT"];t=ve.prototype,t.Ha=function(o){this.J=o},t.ea=function(o,c,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():El.g(),this.v=this.o?dd(this.o):dd(El),this.g.onreadystatechange=_(this.Ea,this);try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(V){Fd(this,V);return}if(o=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var k in p)d.set(k,p[k]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const V of p.keys())d.set(V,p.get(V));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(V=>V.toLowerCase()=="content-type"),k=l.FormData&&o instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Dv,c,void 0))||p||k||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[V,j]of d)this.g.setRequestHeader(V,j);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{zd(this),this.u=!0,this.g.send(o),this.u=!1}catch(V){Fd(this,V)}};function Fd(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.m=5,jd(o),io(o)}function jd(o){o.A||(o.A=!0,Je(o,"complete"),Je(o,"error"))}t.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Je(this,"complete"),Je(this,"abort"),io(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),io(this,!0)),ve.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Ud(this):this.bb())},t.bb=function(){Ud(this)};function Ud(o){if(o.h&&typeof a<"u"&&(!o.v[1]||Zt(o)!=4||o.Z()!=2)){if(o.u&&Zt(o)==4)ld(o.Ea,0,o);else if(Je(o,"readystatechange"),Zt(o)==4){o.h=!1;try{const j=o.Z();e:switch(j){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var d;if(!(d=c)){var p;if(p=j===0){var k=String(o.D).match(xd)[1]||null;!k&&l.self&&l.self.location&&(k=l.self.location.protocol.slice(0,-1)),p=!Vv.test(k?k.toLowerCase():"")}d=p}if(d)Je(o,"complete"),Je(o,"success");else{o.m=6;try{var V=2<Zt(o)?o.g.statusText:""}catch{V=""}o.l=V+" ["+o.Z()+"]",jd(o)}}finally{io(o)}}}}function io(o,c){if(o.g){zd(o);const d=o.g,p=o.v[0]?()=>{}:null;o.g=null,o.v=null,c||Je(o,"ready");try{d.onreadystatechange=p}catch{}}}function zd(o){o.I&&(l.clearTimeout(o.I),o.I=null)}t.isActive=function(){return!!this.g};function Zt(o){return o.g?o.g.readyState:0}t.Z=function(){try{return 2<Zt(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),hv(c)}};function Bd(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Mv(o){const c={};o=(o.g&&2<=Zt(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(w(o[p]))continue;var d=C(o[p]);const k=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const V=c[k]||[];c[k]=V,V.push(d)}v(c,function(p){return p.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function xi(o,c,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||c}function $d(o){this.Aa=0,this.i=[],this.j=new Ii,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=xi("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=xi("baseRetryDelayMs",5e3,o),this.cb=xi("retryDelaySeedMs",1e4,o),this.Wa=xi("forwardChannelMaxRetries",2,o),this.wa=xi("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Sd(o&&o.concurrentRequestLimit),this.Da=new xv,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=$d.prototype,t.la=8,t.G=1,t.connect=function(o,c,d,p){Ze(0),this.W=o,this.H=c||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.I=Jd(this,null,this.W),oo(this)};function kl(o){if(Hd(o),o.G==3){var c=o.U++,d=Jt(o.I);if(ue(d,"SID",o.K),ue(d,"RID",c),ue(d,"TYPE","terminate"),Ni(o,d),c=new gn(o,o.j,c),c.L=2,c.v=to(Jt(d)),d=!1,l.navigator&&l.navigator.sendBeacon)try{d=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!d&&l.Image&&(new Image().src=c.v,d=!0),d||(c.g=Zd(c.j,null),c.g.ea(c.v)),c.F=Date.now(),Js(c)}Xd(o)}function so(o){o.g&&(Nl(o),o.g.cancel(),o.g=null)}function Hd(o){so(o),o.u&&(l.clearTimeout(o.u),o.u=null),ao(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&l.clearTimeout(o.s),o.s=null)}function oo(o){if(!Ad(o.h)&&!o.s){o.s=!0;var c=o.Ga;qt||Y(),z||(qt(),z=!0),q.add(c,o),o.B=0}}function Lv(o,c){return Cd(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=c.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Ti(_(o.Ga,o,c),Yd(o,o.B)),o.B++,!0)}t.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const k=new gn(this,this.j,o);let V=this.o;if(this.S&&(V?(V=g(V),T(V,this.S)):V=this.S),this.m!==null||this.O||(k.H=V,V=null),this.P)e:{for(var c=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(c+=p,4096<c){c=d;break e}if(c===4096||d===this.i.length-1){c=d+1;break e}}c=1e3}else c=1e3;c=Wd(this,k,c),d=Jt(this.I),ue(d,"RID",o),ue(d,"CVER",22),this.D&&ue(d,"X-HTTP-Session-Id",this.D),Ni(this,d),V&&(this.O?c="headers="+encodeURIComponent(String(Od(V)))+"&"+c:this.m&&Pl(d,this.m,V)),Rl(this.h,k),this.Ua&&ue(d,"TYPE","init"),this.P?(ue(d,"$req",c),ue(d,"SID","null"),k.T=!0,Il(k,d,null)):Il(k,d,c),this.G=2}}else this.G==3&&(o?Gd(this,o):this.i.length==0||Ad(this.h)||Gd(this))};function Gd(o,c){var d;c?d=c.l:d=o.U++;const p=Jt(o.I);ue(p,"SID",o.K),ue(p,"RID",d),ue(p,"AID",o.T),Ni(o,p),o.m&&o.o&&Pl(p,o.m,o.o),d=new gn(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),c&&(o.i=c.D.concat(o.i)),c=Wd(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Rl(o.h,d),Il(d,p,c)}function Ni(o,c){o.H&&U(o.H,function(d,p){ue(c,p,d)}),o.l&&kd({},function(d,p){ue(c,p,d)})}function Wd(o,c,d){d=Math.min(o.i.length,d);var p=o.l?_(o.l.Na,o.l,o):null;e:{var k=o.i;let V=-1;for(;;){const j=["count="+d];V==-1?0<d?(V=k[0].g,j.push("ofs="+V)):V=0:j.push("ofs="+V);let ae=!0;for(let De=0;De<d;De++){let ne=k[De].g;const $e=k[De].map;if(ne-=V,0>ne)V=Math.max(0,k[De].g-100),ae=!1;else try{Nv($e,j,"req"+ne+"_")}catch{p&&p($e)}}if(ae){p=j.join("&");break e}}}return o=o.i.splice(0,d),c.D=o,p}function qd(o){if(!o.g&&!o.u){o.Y=1;var c=o.Fa;qt||Y(),z||(qt(),z=!0),q.add(c,o),o.v=0}}function xl(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Ti(_(o.Fa,o),Yd(o,o.v)),o.v++,!0)}t.Fa=function(){if(this.u=null,Qd(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Ti(_(this.ab,this),o)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ze(10),so(this),Qd(this))};function Nl(o){o.A!=null&&(l.clearTimeout(o.A),o.A=null)}function Qd(o){o.g=new gn(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var c=Jt(o.qa);ue(c,"RID","rpc"),ue(c,"SID",o.K),ue(c,"AID",o.T),ue(c,"CI",o.F?"0":"1"),!o.F&&o.ja&&ue(c,"TO",o.ja),ue(c,"TYPE","xmlhttp"),Ni(o,c),o.m&&o.o&&Pl(c,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=to(Jt(c)),d.m=null,d.P=!0,Ed(d,o)}t.Za=function(){this.C!=null&&(this.C=null,so(this),xl(this),Ze(19))};function ao(o){o.C!=null&&(l.clearTimeout(o.C),o.C=null)}function Kd(o,c){var d=null;if(o.g==c){ao(o),Nl(o),o.g=null;var p=2}else if(Cl(o.h,c))d=c.D,Rd(o.h,c),p=1;else return;if(o.G!=0){if(c.o)if(p==1){d=c.m?c.m.length:0,c=Date.now()-c.F;var k=o.B;p=Ks(),Je(p,new _d(p,d)),oo(o)}else qd(o);else if(k=c.s,k==3||k==0&&0<c.X||!(p==1&&Lv(o,c)||p==2&&xl(o)))switch(d&&0<d.length&&(c=o.h,c.i=c.i.concat(d)),k){case 1:Zn(o,5);break;case 4:Zn(o,10);break;case 3:Zn(o,6);break;default:Zn(o,2)}}}function Yd(o,c){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*c}function Zn(o,c){if(o.j.info("Error code "+c),c==2){var d=_(o.fb,o),p=o.Xa;const k=!p;p=new Jn(p||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Zs(p,"https"),to(p),k?Pv(p.toString(),d):kv(p.toString(),d)}else Ze(2);o.G=0,o.l&&o.l.sa(c),Xd(o),Hd(o)}t.fb=function(o){o?(this.j.info("Successfully pinged google.com"),Ze(2)):(this.j.info("Failed to ping google.com"),Ze(1))};function Xd(o){if(o.G=0,o.ka=[],o.l){const c=Pd(o.h);(c.length!=0||o.i.length!=0)&&(L(o.ka,c),L(o.ka,o.i),o.h.i.length=0,D(o.i),o.i.length=0),o.l.ra()}}function Jd(o,c,d){var p=d instanceof Jn?Jt(d):new Jn(d);if(p.g!="")c&&(p.g=c+"."+p.g),eo(p,p.s);else{var k=l.location;p=k.protocol,c=c?c+"."+k.hostname:k.hostname,k=+k.port;var V=new Jn(null);p&&Zs(V,p),c&&(V.g=c),k&&eo(V,k),d&&(V.l=d),p=V}return d=o.D,c=o.ya,d&&c&&ue(p,d,c),ue(p,"VER",o.la),Ni(o,p),p}function Zd(o,c,d){if(c&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Ca&&!o.pa?new ve(new no({eb:d})):new ve(o.pa),c.Ha(o.J),c}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function ef(){}t=ef.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function lo(){}lo.prototype.g=function(o,c){return new ht(o,c)};function ht(o,c){Be.call(this),this.g=new $d(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(o?o["X-WebChannel-Client-Profile"]=c.va:o={"X-WebChannel-Client-Profile":c.va}),this.g.S=o,(o=c&&c.Sb)&&!w(o)&&(this.g.m=o),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!w(c)&&(this.g.D=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new Sr(this)}x(ht,Be),ht.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ht.prototype.close=function(){kl(this.g)},ht.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=_l(o),o=d);c.i.push(new yv(c.Ya++,o)),c.G==3&&oo(c)},ht.prototype.N=function(){this.g.l=null,delete this.j,kl(this.g),delete this.g,ht.aa.N.call(this)};function tf(o){vl.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){e:{for(const d in c){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}x(tf,vl);function nf(){wl.call(this),this.status=1}x(nf,wl);function Sr(o){this.g=o}x(Sr,ef),Sr.prototype.ua=function(){Je(this.g,"a")},Sr.prototype.ta=function(o){Je(this.g,new tf(o))},Sr.prototype.sa=function(o){Je(this.g,new nf)},Sr.prototype.ra=function(){Je(this.g,"b")},lo.prototype.createWebChannel=lo.prototype.g,ht.prototype.send=ht.prototype.o,ht.prototype.open=ht.prototype.m,ht.prototype.close=ht.prototype.close,j_=function(){return new lo},F_=function(){return Ks()},O_=Yn,fc={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ys.NO_ERROR=0,Ys.TIMEOUT=8,Ys.HTTP_ERROR=6,Wo=Ys,yd.COMPLETE="complete",b_=yd,fd.EventType=wi,wi.OPEN="a",wi.CLOSE="b",wi.ERROR="c",wi.MESSAGE="d",Be.prototype.listen=Be.prototype.K,Gi=fd,ve.prototype.listenOnce=ve.prototype.L,ve.prototype.getLastError=ve.prototype.Ka,ve.prototype.getLastErrorCode=ve.prototype.Ba,ve.prototype.getStatus=ve.prototype.Z,ve.prototype.getResponseJson=ve.prototype.Oa,ve.prototype.getResponseText=ve.prototype.oa,ve.prototype.send=ve.prototype.ea,ve.prototype.setWithCredentials=ve.prototype.Ha,L_=ve}).apply(typeof Po<"u"?Po:typeof self<"u"?self:typeof window<"u"?window:{});const Ap="@firebase/firestore";/**
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
 */class Qe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Qe.UNAUTHENTICATED=new Qe(null),Qe.GOOGLE_CREDENTIALS=new Qe("google-credentials-uid"),Qe.FIRST_PARTY=new Qe("first-party-uid"),Qe.MOCK_USER=new Qe("mock-user");/**
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
 */const mr=new P_("@firebase/firestore");function Ui(){return mr.logLevel}function $(t,...e){if(mr.logLevel<=ee.DEBUG){const n=e.map(Ch);mr.debug(`Firestore (${mi}): ${t}`,...n)}}function dn(t,...e){if(mr.logLevel<=ee.ERROR){const n=e.map(Ch);mr.error(`Firestore (${mi}): ${t}`,...n)}}function ri(t,...e){if(mr.logLevel<=ee.WARN){const n=e.map(Ch);mr.warn(`Firestore (${mi}): ${t}`,...n)}}function Ch(t){if(typeof t=="string")return t;try{/**
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
 */function W(t="Unexpected state"){const e=`FIRESTORE (${mi}) INTERNAL ASSERTION FAILED: `+t;throw dn(e),new Error(e)}function se(t,e){t||W()}function K(t,e){return t}/**
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
 */const M={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class H extends pi{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Fn{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
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
 */class U_{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Z1{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(Qe.UNAUTHENTICATED))}shutdown(){}}class eT{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class tT{constructor(e){this.t=e,this.currentUser=Qe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){se(this.o===void 0);let r=this.i;const i=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let s=new Fn;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Fn,e.enqueueRetryable(()=>i(this.currentUser))};const a=()=>{const u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},l=u=>{$("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):($("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Fn)}},0),a()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?($("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(se(typeof r.accessToken=="string"),new U_(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return se(e===null||typeof e=="string"),new Qe(e)}}class nT{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=Qe.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class rT{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new nT(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(Qe.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class iT{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class sT{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){se(this.o===void 0);const r=s=>{s.error!=null&&$("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const a=s.token!==this.R;return this.R=s.token,$("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?n(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{$("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):$("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(se(typeof n.token=="string"),this.R=n.token,new iT(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function oT(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
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
 */class z_{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=oT(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<n&&(r+=e.charAt(i[s]%e.length))}return r}}function re(t,e){return t<e?-1:t>e?1:0}function ii(t,e,n){return t.length===e.length&&t.every((r,i)=>n(r,e[i]))}/**
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
 */class ke{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new H(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new H(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new H(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new H(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return ke.fromMillis(Date.now())}static fromDate(e){return ke.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new ke(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?re(this.nanoseconds,e.nanoseconds):re(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class Q{constructor(e){this.timestamp=e}static fromTimestamp(e){return new Q(e)}static min(){return new Q(new ke(0,0))}static max(){return new Q(new ke(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class Ps{constructor(e,n,r){n===void 0?n=0:n>e.length&&W(),r===void 0?r=e.length-n:r>e.length-n&&W(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return Ps.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Ps?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let i=0;i<r;i++){const s=e.get(i),a=n.get(i);if(s<a)return-1;if(s>a)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class fe extends Ps{construct(e,n,r){return new fe(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new H(M.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(i=>i.length>0))}return new fe(n)}static emptyPath(){return new fe([])}}const aT=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Oe extends Ps{construct(e,n,r){return new Oe(e,n,r)}static isValidIdentifier(e){return aT.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Oe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Oe(["__name__"])}static fromServerFormat(e){const n=[];let r="",i=0;const s=()=>{if(r.length===0)throw new H(M.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let a=!1;for(;i<e.length;){const l=e[i];if(l==="\\"){if(i+1===e.length)throw new H(M.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new H(M.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else l==="`"?(a=!a,i++):l!=="."||a?(r+=l,i++):(s(),i++)}if(s(),a)throw new H(M.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Oe(n)}static emptyPath(){return new Oe([])}}/**
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
 */class G{constructor(e){this.path=e}static fromPath(e){return new G(fe.fromString(e))}static fromName(e){return new G(fe.fromString(e).popFirst(5))}static empty(){return new G(fe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&fe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return fe.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new G(new fe(e.slice()))}}function lT(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,i=Q.fromTimestamp(r===1e9?new ke(n+1,0):new ke(n,r));return new Bn(i,G.empty(),e)}function uT(t){return new Bn(t.readTime,t.key,-1)}class Bn{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new Bn(Q.min(),G.empty(),-1)}static max(){return new Bn(Q.max(),G.empty(),-1)}}function cT(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=G.comparator(t.documentKey,e.documentKey),n!==0?n:re(t.largestBatchId,e.largestBatchId))}/**
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
 */const hT="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class dT{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function js(t){if(t.code!==M.FAILED_PRECONDITION||t.message!==hT)throw t;$("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class b{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&W(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new b((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(n,s).next(r,i)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof b?n:b.resolve(n)}catch(n){return b.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):b.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):b.reject(n)}static resolve(e){return new b((n,r)=>{n(e)})}static reject(e){return new b((n,r)=>{r(e)})}static waitFor(e){return new b((n,r)=>{let i=0,s=0,a=!1;e.forEach(l=>{++i,l.next(()=>{++s,a&&s===i&&n()},u=>r(u))}),a=!0,s===i&&n()})}static or(e){let n=b.resolve(!1);for(const r of e)n=n.next(i=>i?b.resolve(i):r());return n}static forEach(e,n){const r=[];return e.forEach((i,s)=>{r.push(n.call(this,i,s))}),this.waitFor(r)}static mapArray(e,n){return new b((r,i)=>{const s=e.length,a=new Array(s);let l=0;for(let u=0;u<s;u++){const h=u;n(e[h]).next(f=>{a[h]=f,++l,l===s&&r(a)},f=>i(f))}})}static doWhile(e,n){return new b((r,i)=>{const s=()=>{e()===!0?n().next(()=>{s()},i):r()};s()})}}function fT(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function Us(t){return t.name==="IndexedDbTransactionError"}/**
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
 */class Rh{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Rh.oe=-1;function Ka(t){return t==null}function Sa(t){return t===0&&1/t==-1/0}function pT(t){return typeof t=="number"&&Number.isInteger(t)&&!Sa(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
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
 */function Cp(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function wr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function B_(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
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
 */class ye{constructor(e,n){this.comparator=e,this.root=n||Le.EMPTY}insert(e,n){return new ye(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Le.BLACK,null,null))}remove(e){return new ye(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Le.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return n+r.left.size;i<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ko(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ko(this.root,e,this.comparator,!1)}getReverseIterator(){return new ko(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ko(this.root,e,this.comparator,!0)}}class ko{constructor(e,n,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=n?r(e.key,n):1,n&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Le{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??Le.RED,this.left=i??Le.EMPTY,this.right=s??Le.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,i,s){return new Le(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i.copy(null,n,null,null,null):i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Le.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,i=this;if(n(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),n(e,i.key)===0){if(i.right.isEmpty())return Le.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Le.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Le.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw W();const e=this.left.check();if(e!==this.right.check())throw W();return e+(this.isRed()?0:1)}}Le.EMPTY=null,Le.RED=!0,Le.BLACK=!1;Le.EMPTY=new class{constructor(){this.size=0}get key(){throw W()}get value(){throw W()}get color(){throw W()}get left(){throw W()}get right(){throw W()}copy(e,n,r,i,s){return this}insert(e,n,r){return new Le(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class je{constructor(e){this.comparator=e,this.data=new ye(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;n(i.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Rp(this.data.getIterator())}getIteratorFrom(e){return new Rp(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof je)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new je(this.comparator);return n.data=e,n}}class Rp{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class pt{constructor(e){this.fields=e,e.sort(Oe.comparator)}static empty(){return new pt([])}unionWith(e){let n=new je(Oe.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new pt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return ii(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
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
 */class $_ extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class ze{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new $_("Invalid base64 string: "+s):s}}(e);return new ze(n)}static fromUint8Array(e){const n=function(i){let s="";for(let a=0;a<i.length;++a)s+=String.fromCharCode(i[a]);return s}(e);return new ze(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return re(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ze.EMPTY_BYTE_STRING=new ze("");const mT=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function $n(t){if(se(!!t),typeof t=="string"){let e=0;const n=mT.exec(t);if(se(!!n),n[1]){let i=n[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Te(t.seconds),nanos:Te(t.nanos)}}function Te(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function gr(t){return typeof t=="string"?ze.fromBase64String(t):ze.fromUint8Array(t)}/**
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
 */function Ph(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function kh(t){const e=t.mapValue.fields.__previous_value__;return Ph(e)?kh(e):e}function ks(t){const e=$n(t.mapValue.fields.__local_write_time__.timestampValue);return new ke(e.seconds,e.nanos)}/**
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
 */class gT{constructor(e,n,r,i,s,a,l,u,h){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=h}}class xs{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new xs("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof xs&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const xo={mapValue:{}};function _r(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Ph(t)?4:yT(t)?9007199254740991:_T(t)?10:11:W()}function Gt(t,e){if(t===e)return!0;const n=_r(t);if(n!==_r(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return ks(t).isEqual(ks(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const a=$n(i.timestampValue),l=$n(s.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(i,s){return gr(i.bytesValue).isEqual(gr(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(i,s){return Te(i.geoPointValue.latitude)===Te(s.geoPointValue.latitude)&&Te(i.geoPointValue.longitude)===Te(s.geoPointValue.longitude)}(t,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return Te(i.integerValue)===Te(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const a=Te(i.doubleValue),l=Te(s.doubleValue);return a===l?Sa(a)===Sa(l):isNaN(a)&&isNaN(l)}return!1}(t,e);case 9:return ii(t.arrayValue.values||[],e.arrayValue.values||[],Gt);case 10:case 11:return function(i,s){const a=i.mapValue.fields||{},l=s.mapValue.fields||{};if(Cp(a)!==Cp(l))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(l[u]===void 0||!Gt(a[u],l[u])))return!1;return!0}(t,e);default:return W()}}function Ns(t,e){return(t.values||[]).find(n=>Gt(n,e))!==void 0}function si(t,e){if(t===e)return 0;const n=_r(t),r=_r(e);if(n!==r)return re(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return re(t.booleanValue,e.booleanValue);case 2:return function(s,a){const l=Te(s.integerValue||s.doubleValue),u=Te(a.integerValue||a.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(t,e);case 3:return Pp(t.timestampValue,e.timestampValue);case 4:return Pp(ks(t),ks(e));case 5:return re(t.stringValue,e.stringValue);case 6:return function(s,a){const l=gr(s),u=gr(a);return l.compareTo(u)}(t.bytesValue,e.bytesValue);case 7:return function(s,a){const l=s.split("/"),u=a.split("/");for(let h=0;h<l.length&&h<u.length;h++){const f=re(l[h],u[h]);if(f!==0)return f}return re(l.length,u.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,a){const l=re(Te(s.latitude),Te(a.latitude));return l!==0?l:re(Te(s.longitude),Te(a.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return kp(t.arrayValue,e.arrayValue);case 10:return function(s,a){var l,u,h,f;const m=s.fields||{},_=a.fields||{},S=(l=m.value)===null||l===void 0?void 0:l.arrayValue,x=(u=_.value)===null||u===void 0?void 0:u.arrayValue,D=re(((h=S==null?void 0:S.values)===null||h===void 0?void 0:h.length)||0,((f=x==null?void 0:x.values)===null||f===void 0?void 0:f.length)||0);return D!==0?D:kp(S,x)}(t.mapValue,e.mapValue);case 11:return function(s,a){if(s===xo.mapValue&&a===xo.mapValue)return 0;if(s===xo.mapValue)return 1;if(a===xo.mapValue)return-1;const l=s.fields||{},u=Object.keys(l),h=a.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){const _=re(u[m],f[m]);if(_!==0)return _;const S=si(l[u[m]],h[f[m]]);if(S!==0)return S}return re(u.length,f.length)}(t.mapValue,e.mapValue);default:throw W()}}function Pp(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return re(t,e);const n=$n(t),r=$n(e),i=re(n.seconds,r.seconds);return i!==0?i:re(n.nanos,r.nanos)}function kp(t,e){const n=t.values||[],r=e.values||[];for(let i=0;i<n.length&&i<r.length;++i){const s=si(n[i],r[i]);if(s)return s}return re(n.length,r.length)}function oi(t){return pc(t)}function pc(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=$n(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return gr(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return G.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",i=!0;for(const s of n.values||[])i?i=!1:r+=",",r+=pc(s);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let i="{",s=!0;for(const a of r)s?s=!1:i+=",",i+=`${a}:${pc(n.fields[a])}`;return i+"}"}(t.mapValue):W()}function mc(t){return!!t&&"integerValue"in t}function xh(t){return!!t&&"arrayValue"in t}function xp(t){return!!t&&"nullValue"in t}function Np(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function qo(t){return!!t&&"mapValue"in t}function _T(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function ss(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return wr(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=ss(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=ss(t.arrayValue.values[n]);return e}return Object.assign({},t)}function yT(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
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
 */class ot{constructor(e){this.value=e}static empty(){return new ot({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!qo(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=ss(n)}setAll(e){let n=Oe.emptyPath(),r={},i=[];e.forEach((a,l)=>{if(!n.isImmediateParentOf(l)){const u=this.getFieldsMap(n);this.applyChanges(u,r,i),r={},i=[],n=l.popLast()}a?r[l.lastSegment()]=ss(a):i.push(l.lastSegment())});const s=this.getFieldsMap(n);this.applyChanges(s,r,i)}delete(e){const n=this.field(e.popLast());qo(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return Gt(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=n.mapValue.fields[e.get(r)];qo(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=i),n=i}return n.mapValue.fields}applyChanges(e,n,r){wr(n,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new ot(ss(this.value))}}function H_(t){const e=[];return wr(t.fields,(n,r)=>{const i=new Oe([n]);if(qo(r)){const s=H_(r.mapValue).fields;if(s.length===0)e.push(i);else for(const a of s)e.push(i.child(a))}else e.push(i)}),new pt(e)}/**
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
 */class Ye{constructor(e,n,r,i,s,a,l){this.key=e,this.documentType=n,this.version=r,this.readTime=i,this.createTime=s,this.data=a,this.documentState=l}static newInvalidDocument(e){return new Ye(e,0,Q.min(),Q.min(),Q.min(),ot.empty(),0)}static newFoundDocument(e,n,r,i){return new Ye(e,1,n,Q.min(),r,i,0)}static newNoDocument(e,n){return new Ye(e,2,n,Q.min(),Q.min(),ot.empty(),0)}static newUnknownDocument(e,n){return new Ye(e,3,n,Q.min(),Q.min(),ot.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(Q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ot.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ot.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Q.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ye&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ye(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Aa{constructor(e,n){this.position=e,this.inclusive=n}}function Vp(t,e,n){let r=0;for(let i=0;i<t.position.length;i++){const s=e[i],a=t.position[i];if(s.field.isKeyField()?r=G.comparator(G.fromName(a.referenceValue),n.key):r=si(a,n.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Dp(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Gt(t.position[n],e.position[n]))return!1;return!0}/**
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
 */class Ca{constructor(e,n="asc"){this.field=e,this.dir=n}}function vT(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
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
 */class G_{}class Re extends G_{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new ET(e,n,r):n==="array-contains"?new ST(e,r):n==="in"?new AT(e,r):n==="not-in"?new CT(e,r):n==="array-contains-any"?new RT(e,r):new Re(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new TT(e,r):new IT(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(si(n,this.value)):n!==null&&_r(this.value)===_r(n)&&this.matchesComparison(si(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return W()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Wt extends G_{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new Wt(e,n)}matches(e){return W_(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function W_(t){return t.op==="and"}function q_(t){return wT(t)&&W_(t)}function wT(t){for(const e of t.filters)if(e instanceof Wt)return!1;return!0}function gc(t){if(t instanceof Re)return t.field.canonicalString()+t.op.toString()+oi(t.value);if(q_(t))return t.filters.map(e=>gc(e)).join(",");{const e=t.filters.map(n=>gc(n)).join(",");return`${t.op}(${e})`}}function Q_(t,e){return t instanceof Re?function(r,i){return i instanceof Re&&r.op===i.op&&r.field.isEqual(i.field)&&Gt(r.value,i.value)}(t,e):t instanceof Wt?function(r,i){return i instanceof Wt&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,a,l)=>s&&Q_(a,i.filters[l]),!0):!1}(t,e):void W()}function K_(t){return t instanceof Re?function(n){return`${n.field.canonicalString()} ${n.op} ${oi(n.value)}`}(t):t instanceof Wt?function(n){return n.op.toString()+" {"+n.getFilters().map(K_).join(" ,")+"}"}(t):"Filter"}class ET extends Re{constructor(e,n,r){super(e,n,r),this.key=G.fromName(r.referenceValue)}matches(e){const n=G.comparator(e.key,this.key);return this.matchesComparison(n)}}class TT extends Re{constructor(e,n){super(e,"in",n),this.keys=Y_("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class IT extends Re{constructor(e,n){super(e,"not-in",n),this.keys=Y_("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function Y_(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>G.fromName(r.referenceValue))}class ST extends Re{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return xh(n)&&Ns(n.arrayValue,this.value)}}class AT extends Re{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Ns(this.value.arrayValue,n)}}class CT extends Re{constructor(e,n){super(e,"not-in",n)}matches(e){if(Ns(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!Ns(this.value.arrayValue,n)}}class RT extends Re{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!xh(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>Ns(this.value.arrayValue,r))}}/**
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
 */class PT{constructor(e,n=null,r=[],i=[],s=null,a=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=a,this.endAt=l,this.ue=null}}function Mp(t,e=null,n=[],r=[],i=null,s=null,a=null){return new PT(t,e,n,r,i,s,a)}function Nh(t){const e=K(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>gc(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),Ka(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>oi(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>oi(r)).join(",")),e.ue=n}return e.ue}function Vh(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!vT(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!Q_(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Dp(t.startAt,e.startAt)&&Dp(t.endAt,e.endAt)}function _c(t){return G.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
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
 */class Ya{constructor(e,n=null,r=[],i=[],s=null,a="F",l=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=a,this.startAt=l,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function kT(t,e,n,r,i,s,a,l){return new Ya(t,e,n,r,i,s,a,l)}function Dh(t){return new Ya(t)}function Lp(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function xT(t){return t.collectionGroup!==null}function os(t){const e=K(t);if(e.ce===null){e.ce=[];const n=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),n.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new je(Oe.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(s=>{n.has(s.canonicalString())||s.isKeyField()||e.ce.push(new Ca(s,r))}),n.has(Oe.keyField().canonicalString())||e.ce.push(new Ca(Oe.keyField(),r))}return e.ce}function Bt(t){const e=K(t);return e.le||(e.le=NT(e,os(t))),e.le}function NT(t,e){if(t.limitType==="F")return Mp(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new Ca(i.field,s)});const n=t.endAt?new Aa(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new Aa(t.startAt.position,t.startAt.inclusive):null;return Mp(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function yc(t,e,n){return new Ya(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Xa(t,e){return Vh(Bt(t),Bt(e))&&t.limitType===e.limitType}function X_(t){return`${Nh(Bt(t))}|lt:${t.limitType}`}function Rr(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(i=>K_(i)).join(", ")}]`),Ka(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(i=>oi(i)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(i=>oi(i)).join(",")),`Target(${r})`}(Bt(t))}; limitType=${t.limitType})`}function Ja(t,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):G.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(t,e)&&function(r,i){for(const s of os(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(t,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(t,e)&&function(r,i){return!(r.startAt&&!function(a,l,u){const h=Vp(a,l,u);return a.inclusive?h<=0:h<0}(r.startAt,os(r),i)||r.endAt&&!function(a,l,u){const h=Vp(a,l,u);return a.inclusive?h>=0:h>0}(r.endAt,os(r),i))}(t,e)}function VT(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function J_(t){return(e,n)=>{let r=!1;for(const i of os(t)){const s=DT(i,e,n);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function DT(t,e,n){const r=t.field.isKeyField()?G.comparator(e.key,n.key):function(s,a,l){const u=a.data.field(s),h=l.data.field(s);return u!==null&&h!==null?si(u,h):W()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return W()}}/**
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
 */class gi{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,n]);i.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[n]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){wr(this.inner,(n,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return B_(this.inner)}size(){return this.innerSize}}/**
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
 */const MT=new ye(G.comparator);function fn(){return MT}const Z_=new ye(G.comparator);function Wi(...t){let e=Z_;for(const n of t)e=e.insert(n.key,n);return e}function ey(t){let e=Z_;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function or(){return as()}function ty(){return as()}function as(){return new gi(t=>t.toString(),(t,e)=>t.isEqual(e))}const LT=new ye(G.comparator),bT=new je(G.comparator);function J(...t){let e=bT;for(const n of t)e=e.add(n);return e}const OT=new je(re);function FT(){return OT}/**
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
 */function Mh(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Sa(e)?"-0":e}}function ny(t){return{integerValue:""+t}}function jT(t,e){return pT(e)?ny(e):Mh(t,e)}/**
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
 */class Za{constructor(){this._=void 0}}function UT(t,e,n){return t instanceof Ra?function(i,s){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Ph(s)&&(s=kh(s)),s&&(a.fields.__previous_value__=s),{mapValue:a}}(n,e):t instanceof Vs?iy(t,e):t instanceof Ds?sy(t,e):function(i,s){const a=ry(i,s),l=bp(a)+bp(i.Pe);return mc(a)&&mc(i.Pe)?ny(l):Mh(i.serializer,l)}(t,e)}function zT(t,e,n){return t instanceof Vs?iy(t,e):t instanceof Ds?sy(t,e):n}function ry(t,e){return t instanceof Pa?function(r){return mc(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class Ra extends Za{}class Vs extends Za{constructor(e){super(),this.elements=e}}function iy(t,e){const n=oy(e);for(const r of t.elements)n.some(i=>Gt(i,r))||n.push(r);return{arrayValue:{values:n}}}class Ds extends Za{constructor(e){super(),this.elements=e}}function sy(t,e){let n=oy(e);for(const r of t.elements)n=n.filter(i=>!Gt(i,r));return{arrayValue:{values:n}}}class Pa extends Za{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function bp(t){return Te(t.integerValue||t.doubleValue)}function oy(t){return xh(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}function BT(t,e){return t.field.isEqual(e.field)&&function(r,i){return r instanceof Vs&&i instanceof Vs||r instanceof Ds&&i instanceof Ds?ii(r.elements,i.elements,Gt):r instanceof Pa&&i instanceof Pa?Gt(r.Pe,i.Pe):r instanceof Ra&&i instanceof Ra}(t.transform,e.transform)}class $T{constructor(e,n){this.version=e,this.transformResults=n}}class Ct{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Ct}static exists(e){return new Ct(void 0,e)}static updateTime(e){return new Ct(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Qo(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class el{}function ay(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new Lh(t.key,Ct.none()):new zs(t.key,t.data,Ct.none());{const n=t.data,r=ot.empty();let i=new je(Oe.comparator);for(let s of e.fields)if(!i.has(s)){let a=n.field(s);a===null&&s.length>1&&(s=s.popLast(),a=n.field(s)),a===null?r.delete(s):r.set(s,a),i=i.add(s)}return new Qn(t.key,r,new pt(i.toArray()),Ct.none())}}function HT(t,e,n){t instanceof zs?function(i,s,a){const l=i.value.clone(),u=Fp(i.fieldTransforms,s,a.transformResults);l.setAll(u),s.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(t,e,n):t instanceof Qn?function(i,s,a){if(!Qo(i.precondition,s))return void s.convertToUnknownDocument(a.version);const l=Fp(i.fieldTransforms,s,a.transformResults),u=s.data;u.setAll(ly(i)),u.setAll(l),s.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(t,e,n):function(i,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,n)}function ls(t,e,n,r){return t instanceof zs?function(s,a,l,u){if(!Qo(s.precondition,a))return l;const h=s.value.clone(),f=jp(s.fieldTransforms,u,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null}(t,e,n,r):t instanceof Qn?function(s,a,l,u){if(!Qo(s.precondition,a))return l;const h=jp(s.fieldTransforms,u,a),f=a.data;return f.setAll(ly(s)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),l===null?null:l.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(m=>m.field))}(t,e,n,r):function(s,a,l){return Qo(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(t,e,n)}function GT(t,e){let n=null;for(const r of t.fieldTransforms){const i=e.data.field(r.field),s=ry(r.transform,i||null);s!=null&&(n===null&&(n=ot.empty()),n.set(r.field,s))}return n||null}function Op(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&ii(r,i,(s,a)=>BT(s,a))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class zs extends el{constructor(e,n,r,i=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Qn extends el{constructor(e,n,r,i,s=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function ly(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function Fp(t,e,n){const r=new Map;se(t.length===n.length);for(let i=0;i<n.length;i++){const s=t[i],a=s.transform,l=e.data.field(s.field);r.set(s.field,zT(a,l,n[i]))}return r}function jp(t,e,n){const r=new Map;for(const i of t){const s=i.transform,a=n.data.field(i.field);r.set(i.field,UT(s,a,e))}return r}class Lh extends el{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class WT extends el{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class qT{constructor(e,n,r,i){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&HT(s,e,r[i])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=ls(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=ls(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=ty();return this.mutations.forEach(i=>{const s=e.get(i.key),a=s.overlayedDocument;let l=this.applyToLocalView(a,s.mutatedFields);l=n.has(i.key)?null:l;const u=ay(a,l);u!==null&&r.set(i.key,u),a.isValidDocument()||a.convertToNoDocument(Q.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),J())}isEqual(e){return this.batchId===e.batchId&&ii(this.mutations,e.mutations,(n,r)=>Op(n,r))&&ii(this.baseMutations,e.baseMutations,(n,r)=>Op(n,r))}}class bh{constructor(e,n,r,i){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=i}static from(e,n,r){se(e.mutations.length===r.length);let i=function(){return LT}();const s=e.mutations;for(let a=0;a<s.length;a++)i=i.insert(s[a].key,r[a].version);return new bh(e,n,r,i)}}/**
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
 */class QT{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class KT{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
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
 */var Se,Z;function YT(t){switch(t){default:return W();case M.CANCELLED:case M.UNKNOWN:case M.DEADLINE_EXCEEDED:case M.RESOURCE_EXHAUSTED:case M.INTERNAL:case M.UNAVAILABLE:case M.UNAUTHENTICATED:return!1;case M.INVALID_ARGUMENT:case M.NOT_FOUND:case M.ALREADY_EXISTS:case M.PERMISSION_DENIED:case M.FAILED_PRECONDITION:case M.ABORTED:case M.OUT_OF_RANGE:case M.UNIMPLEMENTED:case M.DATA_LOSS:return!0}}function uy(t){if(t===void 0)return dn("GRPC error has no .code"),M.UNKNOWN;switch(t){case Se.OK:return M.OK;case Se.CANCELLED:return M.CANCELLED;case Se.UNKNOWN:return M.UNKNOWN;case Se.DEADLINE_EXCEEDED:return M.DEADLINE_EXCEEDED;case Se.RESOURCE_EXHAUSTED:return M.RESOURCE_EXHAUSTED;case Se.INTERNAL:return M.INTERNAL;case Se.UNAVAILABLE:return M.UNAVAILABLE;case Se.UNAUTHENTICATED:return M.UNAUTHENTICATED;case Se.INVALID_ARGUMENT:return M.INVALID_ARGUMENT;case Se.NOT_FOUND:return M.NOT_FOUND;case Se.ALREADY_EXISTS:return M.ALREADY_EXISTS;case Se.PERMISSION_DENIED:return M.PERMISSION_DENIED;case Se.FAILED_PRECONDITION:return M.FAILED_PRECONDITION;case Se.ABORTED:return M.ABORTED;case Se.OUT_OF_RANGE:return M.OUT_OF_RANGE;case Se.UNIMPLEMENTED:return M.UNIMPLEMENTED;case Se.DATA_LOSS:return M.DATA_LOSS;default:return W()}}(Z=Se||(Se={}))[Z.OK=0]="OK",Z[Z.CANCELLED=1]="CANCELLED",Z[Z.UNKNOWN=2]="UNKNOWN",Z[Z.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Z[Z.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Z[Z.NOT_FOUND=5]="NOT_FOUND",Z[Z.ALREADY_EXISTS=6]="ALREADY_EXISTS",Z[Z.PERMISSION_DENIED=7]="PERMISSION_DENIED",Z[Z.UNAUTHENTICATED=16]="UNAUTHENTICATED",Z[Z.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Z[Z.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Z[Z.ABORTED=10]="ABORTED",Z[Z.OUT_OF_RANGE=11]="OUT_OF_RANGE",Z[Z.UNIMPLEMENTED=12]="UNIMPLEMENTED",Z[Z.INTERNAL=13]="INTERNAL",Z[Z.UNAVAILABLE=14]="UNAVAILABLE",Z[Z.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function XT(){return new TextEncoder}/**
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
 */const JT=new ur([4294967295,4294967295],0);function Up(t){const e=XT().encode(t),n=new M_;return n.update(e),new Uint8Array(n.digest())}function zp(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new ur([n,r],0),new ur([i,s],0)]}class Oh{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new qi(`Invalid padding: ${n}`);if(r<0)throw new qi(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new qi(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new qi(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*e.length-n,this.Te=ur.fromNumber(this.Ie)}Ee(e,n,r){let i=e.add(n.multiply(ur.fromNumber(r)));return i.compare(JT)===1&&(i=new ur([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const n=Up(e),[r,i]=zp(n);for(let s=0;s<this.hashCount;s++){const a=this.Ee(r,i,s);if(!this.de(a))return!1}return!0}static create(e,n,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new Oh(s,i,n);return r.forEach(l=>a.insert(l)),a}insert(e){if(this.Ie===0)return;const n=Up(e),[r,i]=zp(n);for(let s=0;s<this.hashCount;s++){const a=this.Ee(r,i,s);this.Ae(a)}}Ae(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class qi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class tl{constructor(e,n,r,i,s){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const i=new Map;return i.set(e,Bs.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new tl(Q.min(),i,new ye(re),fn(),J())}}class Bs{constructor(e,n,r,i,s){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new Bs(r,n,J(),J(),J())}}/**
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
 */class Ko{constructor(e,n,r,i){this.Re=e,this.removedTargetIds=n,this.key=r,this.Ve=i}}class cy{constructor(e,n){this.targetId=e,this.me=n}}class hy{constructor(e,n,r=ze.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=i}}class Bp{constructor(){this.fe=0,this.ge=Hp(),this.pe=ze.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=J(),n=J(),r=J();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:n=n.add(i);break;case 1:r=r.add(i);break;default:W()}}),new Bs(this.pe,this.ye,e,n,r)}Ce(){this.we=!1,this.ge=Hp()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,se(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class ZT{constructor(e){this.Le=e,this.Be=new Map,this.ke=fn(),this.qe=$p(),this.Qe=new ye(re)}Ke(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(n,e.Ve):this.Ue(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.Ue(n,e.key,e.Ve)}We(e){this.forEachTarget(e,n=>{const r=this.Ge(n);switch(e.state){case 0:this.ze(n)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(e.resumeToken));break;default:W()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((r,i)=>{this.ze(i)&&n(i)})}He(e){const n=e.targetId,r=e.me.count,i=this.Je(n);if(i){const s=i.target;if(_c(s))if(r===0){const a=new G(s.path);this.Ue(n,a,Ye.newNoDocument(a,Q.min()))}else se(r===1);else{const a=this.Ye(n);if(a!==r){const l=this.Ze(e),u=l?this.Xe(l,e,a):1;if(u!==0){this.je(n);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,h)}}}}}Ze(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=n;let a,l;try{a=gr(r).toUint8Array()}catch(u){if(u instanceof $_)return ri("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new Oh(a,i,s)}catch(u){return ri(u instanceof qi?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.Ie===0?null:l}Xe(e,n,r){return n.me.count===r-this.nt(e,n.targetId)?0:2}nt(e,n){const r=this.Le.getRemoteKeysForTarget(n);let i=0;return r.forEach(s=>{const a=this.Le.tt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(l)||(this.Ue(n,s,null),i++)}),i}rt(e){const n=new Map;this.Be.forEach((s,a)=>{const l=this.Je(a);if(l){if(s.current&&_c(l.target)){const u=new G(l.target.path);this.ke.get(u)!==null||this.it(a,u)||this.Ue(a,u,Ye.newNoDocument(u,e))}s.be&&(n.set(a,s.ve()),s.Ce())}});let r=J();this.qe.forEach((s,a)=>{let l=!0;a.forEachWhile(u=>{const h=this.Je(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(s))}),this.ke.forEach((s,a)=>a.setReadTime(e));const i=new tl(e,n,this.Qe,this.ke,r);return this.ke=fn(),this.qe=$p(),this.Qe=new ye(re),i}$e(e,n){if(!this.ze(e))return;const r=this.it(e,n.key)?2:0;this.Ge(e).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e))}Ue(e,n,r){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,n)?i.Fe(n,1):i.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(e)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const n=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let n=this.Be.get(e);return n||(n=new Bp,this.Be.set(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new je(re),this.qe=this.qe.insert(e,n)),n}ze(e){const n=this.Je(e)!==null;return n||$("WatchChangeAggregator","Detected inactive target",e),n}Je(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Bp),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.Ue(e,n,null)})}it(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function $p(){return new ye(G.comparator)}function Hp(){return new ye(G.comparator)}const eI={asc:"ASCENDING",desc:"DESCENDING"},tI={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},nI={and:"AND",or:"OR"};class rI{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function vc(t,e){return t.useProto3Json||Ka(e)?e:{value:e}}function ka(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function dy(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function iI(t,e){return ka(t,e.toTimestamp())}function $t(t){return se(!!t),Q.fromTimestamp(function(n){const r=$n(n);return new ke(r.seconds,r.nanos)}(t))}function Fh(t,e){return wc(t,e).canonicalString()}function wc(t,e){const n=function(i){return new fe(["projects",i.projectId,"databases",i.database])}(t).child("documents");return e===void 0?n:n.child(e)}function fy(t){const e=fe.fromString(t);return se(yy(e)),e}function Ec(t,e){return Fh(t.databaseId,e.path)}function uu(t,e){const n=fy(e);if(n.get(1)!==t.databaseId.projectId)throw new H(M.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new H(M.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new G(my(n))}function py(t,e){return Fh(t.databaseId,e)}function sI(t){const e=fy(t);return e.length===4?fe.emptyPath():my(e)}function Tc(t){return new fe(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function my(t){return se(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function Gp(t,e,n){return{name:Ec(t,e),fields:n.value.mapValue.fields}}function oI(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:W()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(h,f){return h.useProto3Json?(se(f===void 0||typeof f=="string"),ze.fromBase64String(f||"")):(se(f===void 0||f instanceof Buffer||f instanceof Uint8Array),ze.fromUint8Array(f||new Uint8Array))}(t,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&function(h){const f=h.code===void 0?M.UNKNOWN:uy(h.code);return new H(f,h.message||"")}(a);n=new hy(r,i,s,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=uu(t,r.document.name),s=$t(r.document.updateTime),a=r.document.createTime?$t(r.document.createTime):Q.min(),l=new ot({mapValue:{fields:r.document.fields}}),u=Ye.newFoundDocument(i,s,a,l),h=r.targetIds||[],f=r.removedTargetIds||[];n=new Ko(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=uu(t,r.document),s=r.readTime?$t(r.readTime):Q.min(),a=Ye.newNoDocument(i,s),l=r.removedTargetIds||[];n=new Ko([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=uu(t,r.document),s=r.removedTargetIds||[];n=new Ko([],s,i,null)}else{if(!("filter"in e))return W();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,a=new KT(i,s),l=r.targetId;n=new cy(l,a)}}return n}function aI(t,e){let n;if(e instanceof zs)n={update:Gp(t,e.key,e.value)};else if(e instanceof Lh)n={delete:Ec(t,e.key)};else if(e instanceof Qn)n={update:Gp(t,e.key,e.data),updateMask:gI(e.fieldMask)};else{if(!(e instanceof WT))return W();n={verify:Ec(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(s,a){const l=a.transform;if(l instanceof Ra)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Vs)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Ds)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Pa)return{fieldPath:a.field.canonicalString(),increment:l.Pe};throw W()}(0,r))),e.precondition.isNone||(n.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:iI(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:W()}(t,e.precondition)),n}function lI(t,e){return t&&t.length>0?(se(e!==void 0),t.map(n=>function(i,s){let a=i.updateTime?$t(i.updateTime):$t(s);return a.isEqual(Q.min())&&(a=$t(s)),new $T(a,i.transformResults||[])}(n,e))):[]}function uI(t,e){return{documents:[py(t,e.path)]}}function cI(t,e){const n={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=py(t,i);const s=function(h){if(h.length!==0)return _y(Wt.create(h,"and"))}(e.filters);s&&(n.structuredQuery.where=s);const a=function(h){if(h.length!==0)return h.map(f=>function(_){return{field:Pr(_.field),direction:fI(_.dir)}}(f))}(e.orderBy);a&&(n.structuredQuery.orderBy=a);const l=vc(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{_t:n,parent:i}}function hI(t){let e=sI(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){se(r===1);const f=n.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];n.where&&(s=function(m){const _=gy(m);return _ instanceof Wt&&q_(_)?_.getFilters():[_]}(n.where));let a=[];n.orderBy&&(a=function(m){return m.map(_=>function(x){return new Ca(kr(x.field),function(L){switch(L){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(x.direction))}(_))}(n.orderBy));let l=null;n.limit&&(l=function(m){let _;return _=typeof m=="object"?m.value:m,Ka(_)?null:_}(n.limit));let u=null;n.startAt&&(u=function(m){const _=!!m.before,S=m.values||[];return new Aa(S,_)}(n.startAt));let h=null;return n.endAt&&(h=function(m){const _=!m.before,S=m.values||[];return new Aa(S,_)}(n.endAt)),kT(e,i,a,s,l,"F",u,h)}function dI(t,e){const n=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return W()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function gy(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=kr(n.unaryFilter.field);return Re.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=kr(n.unaryFilter.field);return Re.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=kr(n.unaryFilter.field);return Re.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=kr(n.unaryFilter.field);return Re.create(a,"!=",{nullValue:"NULL_VALUE"});default:return W()}}(t):t.fieldFilter!==void 0?function(n){return Re.create(kr(n.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return W()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return Wt.create(n.compositeFilter.filters.map(r=>gy(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return W()}}(n.compositeFilter.op))}(t):W()}function fI(t){return eI[t]}function pI(t){return tI[t]}function mI(t){return nI[t]}function Pr(t){return{fieldPath:t.canonicalString()}}function kr(t){return Oe.fromServerFormat(t.fieldPath)}function _y(t){return t instanceof Re?function(n){if(n.op==="=="){if(Np(n.value))return{unaryFilter:{field:Pr(n.field),op:"IS_NAN"}};if(xp(n.value))return{unaryFilter:{field:Pr(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(Np(n.value))return{unaryFilter:{field:Pr(n.field),op:"IS_NOT_NAN"}};if(xp(n.value))return{unaryFilter:{field:Pr(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Pr(n.field),op:pI(n.op),value:n.value}}}(t):t instanceof Wt?function(n){const r=n.getFilters().map(i=>_y(i));return r.length===1?r[0]:{compositeFilter:{op:mI(n.op),filters:r}}}(t):W()}function gI(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function yy(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
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
 */class _I{constructor(e){this.ct=e}}function yI(t){const e=hI({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?yc(e,e.limit,"L"):e}/**
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
 */class vI{constructor(){this.un=new wI}addToCollectionParentIndex(e,n){return this.un.add(n),b.resolve()}getCollectionParents(e,n){return b.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return b.resolve()}deleteFieldIndex(e,n){return b.resolve()}deleteAllFieldIndexes(e){return b.resolve()}createTargetIndexes(e,n){return b.resolve()}getDocumentsMatchingTarget(e,n){return b.resolve(null)}getIndexType(e,n){return b.resolve(0)}getFieldIndexes(e,n){return b.resolve([])}getNextCollectionGroupToUpdate(e){return b.resolve(null)}getMinOffset(e,n){return b.resolve(Bn.min())}getMinOffsetFromCollectionGroup(e,n){return b.resolve(Bn.min())}updateCollectionGroup(e,n,r){return b.resolve()}updateIndexEntries(e,n){return b.resolve()}}class wI{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n]||new je(fe.comparator),s=!i.has(r);return this.index[n]=i.add(r),s}has(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n];return i&&i.has(r)}getEntries(e){return(this.index[e]||new je(fe.comparator)).toArray()}}/**
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
 */class EI{constructor(){this.changes=new gi(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,Ye.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?b.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class TI{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
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
 */class II{constructor(e,n,r,i){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,n))).next(i=>(r!==null&&ls(r.mutation,i,pt.empty(),ke.now()),i))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,J()).next(()=>r))}getLocalViewOfDocuments(e,n,r=J()){const i=or();return this.populateOverlays(e,i,n).next(()=>this.computeViews(e,n,i,r).next(s=>{let a=Wi();return s.forEach((l,u)=>{a=a.insert(l,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,n){const r=or();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,J()))}populateOverlays(e,n,r){const i=[];return r.forEach(s=>{n.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((a,l)=>{n.set(a,l)})})}computeViews(e,n,r,i){let s=fn();const a=as(),l=function(){return as()}();return n.forEach((u,h)=>{const f=r.get(h.key);i.has(h.key)&&(f===void 0||f.mutation instanceof Qn)?s=s.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),ls(f.mutation,h,f.mutation.getFieldMask(),ke.now())):a.set(h.key,pt.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((h,f)=>a.set(h,f)),n.forEach((h,f)=>{var m;return l.set(h,new TI(f,(m=a.get(h))!==null&&m!==void 0?m:null))}),l))}recalculateAndSaveOverlays(e,n){const r=as();let i=new ye((a,l)=>a-l),s=J();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(a=>{for(const l of a)l.keys().forEach(u=>{const h=n.get(u);if(h===null)return;let f=r.get(u)||pt.empty();f=l.applyToLocalView(h,f),r.set(u,f);const m=(i.get(l.batchId)||J()).add(u);i=i.insert(l.batchId,m)})}).next(()=>{const a=[],l=i.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),h=u.key,f=u.value,m=ty();f.forEach(_=>{if(!s.has(_)){const S=ay(n.get(_),r.get(_));S!==null&&m.set(_,S),s=s.add(_)}}),a.push(this.documentOverlayCache.saveOverlays(e,h,m))}return b.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,i){return function(a){return G.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):xT(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,i):this.getDocumentsMatchingCollectionQuery(e,n,r,i)}getNextDocuments(e,n,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,i).next(s=>{const a=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,i-s.size):b.resolve(or());let l=-1,u=s;return a.next(h=>b.forEach(h,(f,m)=>(l<m.largestBatchId&&(l=m.largestBatchId),s.get(f)?b.resolve():this.remoteDocumentCache.getEntry(e,f).next(_=>{u=u.insert(f,_)}))).next(()=>this.populateOverlays(e,h,s)).next(()=>this.computeViews(e,u,h,J())).next(f=>({batchId:l,changes:ey(f)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new G(n)).next(r=>{let i=Wi();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,n,r,i){const s=n.collectionGroup;let a=Wi();return this.indexManager.getCollectionParents(e,s).next(l=>b.forEach(l,u=>{const h=function(m,_){return new Ya(_,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(n,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,h,r,i).next(f=>{f.forEach((m,_)=>{a=a.insert(m,_)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,n,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,s,i))).next(a=>{s.forEach((u,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,Ye.newInvalidDocument(f)))});let l=Wi();return a.forEach((u,h)=>{const f=s.get(u);f!==void 0&&ls(f.mutation,h,pt.empty(),ke.now()),Ja(n,h)&&(l=l.insert(u,h))}),l})}}/**
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
 */class SI{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return b.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(i){return{id:i.id,version:i.version,createTime:$t(i.createTime)}}(n)),b.resolve()}getNamedQuery(e,n){return b.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(i){return{name:i.name,query:yI(i.bundledQuery),readTime:$t(i.readTime)}}(n)),b.resolve()}}/**
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
 */class AI{constructor(){this.overlays=new ye(G.comparator),this.Ir=new Map}getOverlay(e,n){return b.resolve(this.overlays.get(n))}getOverlays(e,n){const r=or();return b.forEach(n,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((i,s)=>{this.ht(e,n,s)}),b.resolve()}removeOverlaysForBatchId(e,n,r){const i=this.Ir.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Ir.delete(r)),b.resolve()}getOverlaysForCollection(e,n,r){const i=or(),s=n.length+1,a=new G(n.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const u=l.getNext().value,h=u.getKey();if(!n.isPrefixOf(h.path))break;h.path.length===s&&u.largestBatchId>r&&i.set(u.getKey(),u)}return b.resolve(i)}getOverlaysForCollectionGroup(e,n,r,i){let s=new ye((h,f)=>h-f);const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===n&&h.largestBatchId>r){let f=s.get(h.largestBatchId);f===null&&(f=or(),s=s.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const l=or(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,f)=>l.set(h,f)),!(l.size()>=i)););return b.resolve(l)}ht(e,n,r){const i=this.overlays.get(r.key);if(i!==null){const a=this.Ir.get(i.largestBatchId).delete(r.key);this.Ir.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new QT(n,r));let s=this.Ir.get(n);s===void 0&&(s=J(),this.Ir.set(n,s)),this.Ir.set(n,s.add(r.key))}}/**
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
 */class CI{constructor(){this.sessionToken=ze.EMPTY_BYTE_STRING}getSessionToken(e){return b.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,b.resolve()}}/**
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
 */class jh{constructor(){this.Tr=new je(xe.Er),this.dr=new je(xe.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const r=new xe(e,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Vr(new xe(e,n))}mr(e,n){e.forEach(r=>this.removeReference(r,n))}gr(e){const n=new G(new fe([])),r=new xe(n,e),i=new xe(n,e+1),s=[];return this.dr.forEachInRange([r,i],a=>{this.Vr(a),s.push(a.key)}),s}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new G(new fe([])),r=new xe(n,e),i=new xe(n,e+1);let s=J();return this.dr.forEachInRange([r,i],a=>{s=s.add(a.key)}),s}containsKey(e){const n=new xe(e,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class xe{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return G.comparator(e.key,n.key)||re(e.wr,n.wr)}static Ar(e,n){return re(e.wr,n.wr)||G.comparator(e.key,n.key)}}/**
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
 */class RI{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new je(xe.Er)}checkEmpty(e){return b.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new qT(s,n,r,i);this.mutationQueue.push(a);for(const l of i)this.br=this.br.add(new xe(l.key,s)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return b.resolve(a)}lookupMutationBatch(e,n){return b.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,i=this.vr(r),s=i<0?0:i;return b.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return b.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return b.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new xe(n,0),i=new xe(n,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([r,i],a=>{const l=this.Dr(a.wr);s.push(l)}),b.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new je(re);return n.forEach(i=>{const s=new xe(i,0),a=new xe(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,a],l=>{r=r.add(l.wr)})}),b.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,i=r.length+1;let s=r;G.isDocumentKey(s)||(s=s.child(""));const a=new xe(new G(s),0);let l=new je(re);return this.br.forEachWhile(u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===i&&(l=l.add(u.wr)),!0)},a),b.resolve(this.Cr(l))}Cr(e){const n=[];return e.forEach(r=>{const i=this.Dr(r);i!==null&&n.push(i)}),n}removeMutationBatch(e,n){se(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return b.forEach(n.mutations,i=>{const s=new xe(i.key,n.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,n){const r=new xe(n,0),i=this.br.firstAfterOrEqual(r);return b.resolve(n.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,b.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
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
 */class PI{constructor(e){this.Mr=e,this.docs=function(){return new ye(G.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,i=this.docs.get(r),s=i?i.size:0,a=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return b.resolve(r?r.document.mutableCopy():Ye.newInvalidDocument(n))}getEntries(e,n){let r=fn();return n.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():Ye.newInvalidDocument(i))}),b.resolve(r)}getDocumentsMatchingQuery(e,n,r,i){let s=fn();const a=n.path,l=new G(a.child("")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||cT(uT(f),r)<=0||(i.has(f.key)||Ja(n,f))&&(s=s.insert(f.key,f.mutableCopy()))}return b.resolve(s)}getAllFromCollectionGroup(e,n,r,i){W()}Or(e,n){return b.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new kI(this)}getSize(e){return b.resolve(this.size)}}class kI extends EI{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?n.push(this.cr.addEntry(e,i)):this.cr.removeEntry(r)}),b.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
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
 */class xI{constructor(e){this.persistence=e,this.Nr=new gi(n=>Nh(n),Vh),this.lastRemoteSnapshotVersion=Q.min(),this.highestTargetId=0,this.Lr=0,this.Br=new jh,this.targetCount=0,this.kr=ai.Bn()}forEachTarget(e,n){return this.Nr.forEach((r,i)=>n(i)),b.resolve()}getLastRemoteSnapshotVersion(e){return b.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return b.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),b.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),b.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new ai(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,b.resolve()}updateTargetData(e,n){return this.Kn(n),b.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,b.resolve()}removeTargets(e,n,r){let i=0;const s=[];return this.Nr.forEach((a,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.Nr.delete(a),s.push(this.removeMatchingKeysForTargetId(e,l.targetId)),i++)}),b.waitFor(s).next(()=>i)}getTargetCount(e){return b.resolve(this.targetCount)}getTargetData(e,n){const r=this.Nr.get(n)||null;return b.resolve(r)}addMatchingKeys(e,n,r){return this.Br.Rr(n,r),b.resolve()}removeMatchingKeys(e,n,r){this.Br.mr(n,r);const i=this.persistence.referenceDelegate,s=[];return i&&n.forEach(a=>{s.push(i.markPotentiallyOrphaned(e,a))}),b.waitFor(s)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),b.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Br.yr(n);return b.resolve(r)}containsKey(e,n){return b.resolve(this.Br.containsKey(n))}}/**
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
 */class NI{constructor(e,n){this.qr={},this.overlays={},this.Qr=new Rh(0),this.Kr=!1,this.Kr=!0,this.$r=new CI,this.referenceDelegate=e(this),this.Ur=new xI(this),this.indexManager=new vI,this.remoteDocumentCache=function(i){return new PI(i)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new _I(n),this.Gr=new SI(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new AI,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.qr[e.toKey()];return r||(r=new RI(n,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,r){$("MemoryPersistence","Starting transaction:",e);const i=new VI(this.Qr.next());return this.referenceDelegate.zr(),r(i).next(s=>this.referenceDelegate.jr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Hr(e,n){return b.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,n)))}}class VI extends dT{constructor(e){super(),this.currentSequenceNumber=e}}class Uh{constructor(e){this.persistence=e,this.Jr=new jh,this.Yr=null}static Zr(e){return new Uh(e)}get Xr(){if(this.Yr)return this.Yr;throw W()}addReference(e,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),b.resolve()}removeReference(e,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),b.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),b.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(i=>this.Xr.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(i=>{i.forEach(s=>this.Xr.add(s.toString()))}).next(()=>r.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return b.forEach(this.Xr,r=>{const i=G.fromPath(r);return this.ei(e,i).next(s=>{s||n.removeEntry(i,Q.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return b.or([()=>b.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}/**
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
 */class zh{constructor(e,n,r,i){this.targetId=e,this.fromCache=n,this.$i=r,this.Ui=i}static Wi(e,n){let r=J(),i=J();for(const s of n.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new zh(e,n.fromCache,r,i)}}/**
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
 */class DI{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class MI{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return LE()?8:fT(DE())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,r,i){const s={result:null};return this.Yi(e,n).next(a=>{s.result=a}).next(()=>{if(!s.result)return this.Zi(e,n,i,r).next(a=>{s.result=a})}).next(()=>{if(s.result)return;const a=new DI;return this.Xi(e,n,a).next(l=>{if(s.result=l,this.zi)return this.es(e,n,a,l.size)})}).next(()=>s.result)}es(e,n,r,i){return r.documentReadCount<this.ji?(Ui()<=ee.DEBUG&&$("QueryEngine","SDK will not create cache indexes for query:",Rr(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),b.resolve()):(Ui()<=ee.DEBUG&&$("QueryEngine","Query:",Rr(n),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Hi*i?(Ui()<=ee.DEBUG&&$("QueryEngine","The SDK decides to create cache indexes for query:",Rr(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Bt(n))):b.resolve())}Yi(e,n){if(Lp(n))return b.resolve(null);let r=Bt(n);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(n.limit!==null&&i===1&&(n=yc(n,null,"F"),r=Bt(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const a=J(...s);return this.Ji.getDocuments(e,a).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const h=this.ts(n,l);return this.ns(n,h,a,u.readTime)?this.Yi(e,yc(n,null,"F")):this.rs(e,h,n,u)}))})))}Zi(e,n,r,i){return Lp(n)||i.isEqual(Q.min())?b.resolve(null):this.Ji.getDocuments(e,r).next(s=>{const a=this.ts(n,s);return this.ns(n,a,r,i)?b.resolve(null):(Ui()<=ee.DEBUG&&$("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Rr(n)),this.rs(e,a,n,lT(i,-1)).next(l=>l))})}ts(e,n){let r=new je(J_(e));return n.forEach((i,s)=>{Ja(e,s)&&(r=r.add(s))}),r}ns(e,n,r,i){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const s=e.limitType==="F"?n.last():n.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,n,r){return Ui()<=ee.DEBUG&&$("QueryEngine","Using full collection scan to execute query:",Rr(n)),this.Ji.getDocumentsMatchingQuery(e,n,Bn.min(),r)}rs(e,n,r,i){return this.Ji.getDocumentsMatchingQuery(e,r,i).next(s=>(n.forEach(a=>{s=s.insert(a.key,a)}),s))}}/**
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
 */class LI{constructor(e,n,r,i){this.persistence=e,this.ss=n,this.serializer=i,this.os=new ye(re),this._s=new gi(s=>Nh(s),Vh),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new II(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function bI(t,e,n,r){return new LI(t,e,n,r)}async function vy(t,e){const n=K(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let i;return n.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,n.ls(e),n.mutationQueue.getAllMutationBatches(r))).next(s=>{const a=[],l=[];let u=J();for(const h of i){a.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of s){l.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return n.localDocuments.getDocuments(r,u).next(h=>({hs:h,removedBatchIds:a,addedBatchIds:l}))})})}function OI(t,e){const n=K(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=n.cs.newChangeBuffer({trackRemovals:!0});return function(l,u,h,f){const m=h.batch,_=m.keys();let S=b.resolve();return _.forEach(x=>{S=S.next(()=>f.getEntry(u,x)).next(D=>{const L=h.docVersions.get(x);se(L!==null),D.version.compareTo(L)<0&&(m.applyToRemoteDocument(D,h),D.isValidDocument()&&(D.setReadTime(h.commitVersion),f.addEntry(D)))})}),S.next(()=>l.mutationQueue.removeMutationBatch(u,m))}(n,r,e,s).next(()=>s.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=J();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(u=u.add(l.batch.mutations[h].key));return u}(e))).next(()=>n.localDocuments.getDocuments(r,i))})}function wy(t){const e=K(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function FI(t,e){const n=K(t),r=e.snapshotVersion;let i=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const a=n.cs.newChangeBuffer({trackRemovals:!0});i=n.os;const l=[];e.targetChanges.forEach((f,m)=>{const _=i.get(m);if(!_)return;l.push(n.Ur.removeMatchingKeys(s,f.removedDocuments,m).next(()=>n.Ur.addMatchingKeys(s,f.addedDocuments,m)));let S=_.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(m)!==null?S=S.withResumeToken(ze.EMPTY_BYTE_STRING,Q.min()).withLastLimboFreeSnapshotVersion(Q.min()):f.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(f.resumeToken,r)),i=i.insert(m,S),function(D,L,I){return D.resumeToken.approximateByteSize()===0||L.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=3e8?!0:I.addedDocuments.size+I.modifiedDocuments.size+I.removedDocuments.size>0}(_,S,f)&&l.push(n.Ur.updateTargetData(s,S))});let u=fn(),h=J();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(s,f))}),l.push(jI(s,a,e.documentUpdates).next(f=>{u=f.Ps,h=f.Is})),!r.isEqual(Q.min())){const f=n.Ur.getLastRemoteSnapshotVersion(s).next(m=>n.Ur.setTargetsMetadata(s,s.currentSequenceNumber,r));l.push(f)}return b.waitFor(l).next(()=>a.apply(s)).next(()=>n.localDocuments.getLocalViewOfDocuments(s,u,h)).next(()=>u)}).then(s=>(n.os=i,s))}function jI(t,e,n){let r=J(),i=J();return n.forEach(s=>r=r.add(s)),e.getEntries(t,r).next(s=>{let a=fn();return n.forEach((l,u)=>{const h=s.get(l);u.isFoundDocument()!==h.isFoundDocument()&&(i=i.add(l)),u.isNoDocument()&&u.version.isEqual(Q.min())?(e.removeEntry(l,u.readTime),a=a.insert(l,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),a=a.insert(l,u)):$("LocalStore","Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",u.version)}),{Ps:a,Is:i}})}function UI(t,e){const n=K(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function zI(t,e){const n=K(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return n.Ur.getTargetData(r,e).next(s=>s?(i=s,b.resolve(i)):n.Ur.allocateTargetId(r).next(a=>(i=new Cn(e,a,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=n.os.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(e,r.targetId)),r})}async function Ic(t,e,n){const r=K(t),i=r.os.get(e),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!Us(a))throw a;$("LocalStore",`Failed to update sequence numbers for target ${e}: ${a}`)}r.os=r.os.remove(e),r._s.delete(i.target)}function Wp(t,e,n){const r=K(t);let i=Q.min(),s=J();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,h,f){const m=K(u),_=m._s.get(f);return _!==void 0?b.resolve(m.os.get(_)):m.Ur.getTargetData(h,f)}(r,a,Bt(e)).next(l=>{if(l)return i=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(a,l.targetId).next(u=>{s=u})}).next(()=>r.ss.getDocumentsMatchingQuery(a,e,n?i:Q.min(),n?s:J())).next(l=>(BI(r,VT(e),l),{documents:l,Ts:s})))}function BI(t,e,n){let r=t.us.get(e)||Q.min();n.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),t.us.set(e,r)}class qp{constructor(){this.activeTargetIds=FT()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class $I{constructor(){this.so=new qp,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,r){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new qp,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class HI{_o(e){}shutdown(){}}/**
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
 */class Qp{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){$("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){$("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let No=null;function cu(){return No===null?No=function(){return 268435456+Math.round(2147483648*Math.random())}():No++,"0x"+No.toString(16)}/**
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
 */const GI={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class WI{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
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
 */const qe="WebChannelConnection";class qI extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(n,r,i,s,a){const l=cu(),u=this.xo(n,r.toUriEncodedString());$("RestConnection",`Sending RPC '${n}' ${l}:`,u,i);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,s,a),this.No(n,u,h,i).then(f=>($("RestConnection",`Received RPC '${n}' ${l}: `,f),f),f=>{throw ri("RestConnection",`RPC '${n}' ${l} failed with error: `,f,"url: ",u,"request:",i),f})}Lo(n,r,i,s,a,l){return this.Mo(n,r,i,s,a)}Oo(n,r,i){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+mi}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,a)=>n[a]=s),i&&i.headers.forEach((s,a)=>n[a]=s)}xo(n,r){const i=GI[n];return`${this.Do}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,r,i){const s=cu();return new Promise((a,l)=>{const u=new L_;u.setWithCredentials(!0),u.listenOnce(b_.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case Wo.NO_ERROR:const f=u.getResponseJson();$(qe,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(f)),a(f);break;case Wo.TIMEOUT:$(qe,`RPC '${e}' ${s} timed out`),l(new H(M.DEADLINE_EXCEEDED,"Request time out"));break;case Wo.HTTP_ERROR:const m=u.getStatus();if($(qe,`RPC '${e}' ${s} failed with status:`,m,"response text:",u.getResponseText()),m>0){let _=u.getResponseJson();Array.isArray(_)&&(_=_[0]);const S=_==null?void 0:_.error;if(S&&S.status&&S.message){const x=function(L){const I=L.toLowerCase().replace(/_/g,"-");return Object.values(M).indexOf(I)>=0?I:M.UNKNOWN}(S.status);l(new H(x,S.message))}else l(new H(M.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new H(M.UNAVAILABLE,"Connection failed."));break;default:W()}}finally{$(qe,`RPC '${e}' ${s} completed.`)}});const h=JSON.stringify(i);$(qe,`RPC '${e}' ${s} sending request:`,i),u.send(n,"POST",h,r,15)})}Bo(e,n,r){const i=cu(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=j_(),l=F_(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,n,r),u.encodeInitMessageHeaders=!0;const f=s.join("");$(qe,`Creating RPC '${e}' stream ${i}: ${f}`,u);const m=a.createWebChannel(f,u);let _=!1,S=!1;const x=new WI({Io:L=>{S?$(qe,`Not sending because RPC '${e}' stream ${i} is closed:`,L):(_||($(qe,`Opening RPC '${e}' stream ${i} transport.`),m.open(),_=!0),$(qe,`RPC '${e}' stream ${i} sending:`,L),m.send(L))},To:()=>m.close()}),D=(L,I,w)=>{L.listen(I,A=>{try{w(A)}catch(N){setTimeout(()=>{throw N},0)}})};return D(m,Gi.EventType.OPEN,()=>{S||($(qe,`RPC '${e}' stream ${i} transport opened.`),x.yo())}),D(m,Gi.EventType.CLOSE,()=>{S||(S=!0,$(qe,`RPC '${e}' stream ${i} transport closed`),x.So())}),D(m,Gi.EventType.ERROR,L=>{S||(S=!0,ri(qe,`RPC '${e}' stream ${i} transport errored:`,L),x.So(new H(M.UNAVAILABLE,"The operation could not be completed")))}),D(m,Gi.EventType.MESSAGE,L=>{var I;if(!S){const w=L.data[0];se(!!w);const A=w,N=A.error||((I=A[0])===null||I===void 0?void 0:I.error);if(N){$(qe,`RPC '${e}' stream ${i} received error:`,N);const F=N.status;let U=function(y){const T=Se[y];if(T!==void 0)return uy(T)}(F),v=N.message;U===void 0&&(U=M.INTERNAL,v="Unknown error status: "+F+" with message "+N.message),S=!0,x.So(new H(U,v)),m.close()}else $(qe,`RPC '${e}' stream ${i} received:`,w),x.bo(w)}}),D(l,O_.STAT_EVENT,L=>{L.stat===fc.PROXY?$(qe,`RPC '${e}' stream ${i} detected buffering proxy`):L.stat===fc.NOPROXY&&$(qe,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{x.wo()},0),x}}function hu(){return typeof document<"u"?document:null}/**
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
 */function nl(t){return new rI(t,!0)}/**
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
 */class Ey{constructor(e,n,r=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,n-r);i>0&&$("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class Ty{constructor(e,n,r,i,s,a,l,u){this.ui=e,this.Ho=r,this.Jo=i,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Ey(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===M.RESOURCE_EXHAUSTED?(dn(n.toString()),dn("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===M.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Yo===n&&this.P_(r,i)},r=>{e(()=>{const i=new H(M.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(i)})})}P_(e,n){const r=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{r(()=>this.I_(i))}),this.stream.onMessage(i=>{r(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return $("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():($("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class QI extends Ty{constructor(e,n,r,i,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,i,a),this.serializer=s}T_(e,n){return this.connection.Bo("Listen",e,n)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const n=oI(this.serializer,e),r=function(s){if(!("targetChange"in s))return Q.min();const a=s.targetChange;return a.targetIds&&a.targetIds.length?Q.min():a.readTime?$t(a.readTime):Q.min()}(e);return this.listener.d_(n,r)}A_(e){const n={};n.database=Tc(this.serializer),n.addTarget=function(s,a){let l;const u=a.target;if(l=_c(u)?{documents:uI(s,u)}:{query:cI(s,u)._t},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=dy(s,a.resumeToken);const h=vc(s,a.expectedCount);h!==null&&(l.expectedCount=h)}else if(a.snapshotVersion.compareTo(Q.min())>0){l.readTime=ka(s,a.snapshotVersion.toTimestamp());const h=vc(s,a.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const r=dI(this.serializer,e);r&&(n.labels=r),this.a_(n)}R_(e){const n={};n.database=Tc(this.serializer),n.removeTarget=e,this.a_(n)}}class KI extends Ty{constructor(e,n,r,i,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,i,a),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return se(!!e.streamToken),this.lastStreamToken=e.streamToken,se(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){se(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=lI(e.writeResults,e.commitTime),r=$t(e.commitTime);return this.listener.g_(r,n)}p_(){const e={};e.database=Tc(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>aI(this.serializer,r))};this.a_(n)}}/**
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
 */class YI extends class{}{constructor(e,n,r,i){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new H(M.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Mo(e,wc(n,r),i,s,a)).catch(s=>{throw s.name==="FirebaseError"?(s.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new H(M.UNKNOWN,s.toString())})}Lo(e,n,r,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Lo(e,wc(n,r),i,a,l,s)).catch(a=>{throw a.name==="FirebaseError"?(a.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new H(M.UNKNOWN,a.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class XI{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(dn(n),this.D_=!1):$("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
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
 */class JI{constructor(e,n,r,i,s){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o(a=>{r.enqueueAndForget(async()=>{Er(this)&&($("RemoteStore","Restarting streams for network reachability change."),await async function(u){const h=K(u);h.L_.add(4),await $s(h),h.q_.set("Unknown"),h.L_.delete(4),await rl(h)}(this))})}),this.q_=new XI(r,i)}}async function rl(t){if(Er(t))for(const e of t.B_)await e(!0)}async function $s(t){for(const e of t.B_)await e(!1)}function Iy(t,e){const n=K(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),Gh(n)?Hh(n):_i(n).r_()&&$h(n,e))}function Bh(t,e){const n=K(t),r=_i(n);n.N_.delete(e),r.r_()&&Sy(n,e),n.N_.size===0&&(r.r_()?r.o_():Er(n)&&n.q_.set("Unknown"))}function $h(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Q.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}_i(t).A_(e)}function Sy(t,e){t.Q_.xe(e),_i(t).R_(e)}function Hh(t){t.Q_=new ZT({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),_i(t).start(),t.q_.v_()}function Gh(t){return Er(t)&&!_i(t).n_()&&t.N_.size>0}function Er(t){return K(t).L_.size===0}function Ay(t){t.Q_=void 0}async function ZI(t){t.q_.set("Online")}async function e2(t){t.N_.forEach((e,n)=>{$h(t,e)})}async function t2(t,e){Ay(t),Gh(t)?(t.q_.M_(e),Hh(t)):t.q_.set("Unknown")}async function n2(t,e,n){if(t.q_.set("Online"),e instanceof hy&&e.state===2&&e.cause)try{await async function(i,s){const a=s.cause;for(const l of s.targetIds)i.N_.has(l)&&(await i.remoteSyncer.rejectListen(l,a),i.N_.delete(l),i.Q_.removeTarget(l))}(t,e)}catch(r){$("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await xa(t,r)}else if(e instanceof Ko?t.Q_.Ke(e):e instanceof cy?t.Q_.He(e):t.Q_.We(e),!n.isEqual(Q.min()))try{const r=await wy(t.localStore);n.compareTo(r)>=0&&await function(s,a){const l=s.Q_.rt(a);return l.targetChanges.forEach((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=s.N_.get(h);f&&s.N_.set(h,f.withResumeToken(u.resumeToken,a))}}),l.targetMismatches.forEach((u,h)=>{const f=s.N_.get(u);if(!f)return;s.N_.set(u,f.withResumeToken(ze.EMPTY_BYTE_STRING,f.snapshotVersion)),Sy(s,u);const m=new Cn(f.target,u,h,f.sequenceNumber);$h(s,m)}),s.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(r){$("RemoteStore","Failed to raise snapshot:",r),await xa(t,r)}}async function xa(t,e,n){if(!Us(e))throw e;t.L_.add(1),await $s(t),t.q_.set("Offline"),n||(n=()=>wy(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{$("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await rl(t)})}function Cy(t,e){return e().catch(n=>xa(t,n,e))}async function il(t){const e=K(t),n=Hn(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;r2(e);)try{const i=await UI(e.localStore,r);if(i===null){e.O_.length===0&&n.o_();break}r=i.batchId,i2(e,i)}catch(i){await xa(e,i)}Ry(e)&&Py(e)}function r2(t){return Er(t)&&t.O_.length<10}function i2(t,e){t.O_.push(e);const n=Hn(t);n.r_()&&n.V_&&n.m_(e.mutations)}function Ry(t){return Er(t)&&!Hn(t).n_()&&t.O_.length>0}function Py(t){Hn(t).start()}async function s2(t){Hn(t).p_()}async function o2(t){const e=Hn(t);for(const n of t.O_)e.m_(n.mutations)}async function a2(t,e,n){const r=t.O_.shift(),i=bh.from(r,e,n);await Cy(t,()=>t.remoteSyncer.applySuccessfulWrite(i)),await il(t)}async function l2(t,e){e&&Hn(t).V_&&await async function(r,i){if(function(a){return YT(a)&&a!==M.ABORTED}(i.code)){const s=r.O_.shift();Hn(r).s_(),await Cy(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await il(r)}}(t,e),Ry(t)&&Py(t)}async function Kp(t,e){const n=K(t);n.asyncQueue.verifyOperationInProgress(),$("RemoteStore","RemoteStore received new credentials");const r=Er(n);n.L_.add(3),await $s(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await rl(n)}async function u2(t,e){const n=K(t);e?(n.L_.delete(2),await rl(n)):e||(n.L_.add(2),await $s(n),n.q_.set("Unknown"))}function _i(t){return t.K_||(t.K_=function(n,r,i){const s=K(n);return s.w_(),new QI(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Eo:ZI.bind(null,t),Ro:e2.bind(null,t),mo:t2.bind(null,t),d_:n2.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),Gh(t)?Hh(t):t.q_.set("Unknown")):(await t.K_.stop(),Ay(t))})),t.K_}function Hn(t){return t.U_||(t.U_=function(n,r,i){const s=K(n);return s.w_(),new KI(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:s2.bind(null,t),mo:l2.bind(null,t),f_:o2.bind(null,t),g_:a2.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await il(t)):(await t.U_.stop(),t.O_.length>0&&($("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
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
 */class Wh{constructor(e,n,r,i,s){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Fn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,i,s){const a=Date.now()+r,l=new Wh(e,n,a,i,s);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new H(M.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function qh(t,e){if(dn("AsyncQueue",`${e}: ${t}`),Us(t))return new H(M.UNAVAILABLE,`${e}: ${t}`);throw t}/**
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
 */class Kr{constructor(e){this.comparator=e?(n,r)=>e(n,r)||G.comparator(n.key,r.key):(n,r)=>G.comparator(n.key,r.key),this.keyedMap=Wi(),this.sortedSet=new ye(this.comparator)}static emptySet(e){return new Kr(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Kr)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
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
 */class Yp{constructor(){this.W_=new ye(G.comparator)}track(e){const n=e.doc.key,r=this.W_.get(n);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(n,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(n):e.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):W():this.W_=this.W_.insert(n,e)}G_(){const e=[];return this.W_.inorderTraversal((n,r)=>{e.push(r)}),e}}class li{constructor(e,n,r,i,s,a,l,u,h){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,n,r,i,s){const a=[];return n.forEach(l=>{a.push({type:0,doc:l})}),new li(e,n,Kr.emptySet(n),a,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Xa(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let i=0;i<n.length;i++)if(n[i].type!==r[i].type||!n[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
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
 */class c2{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class h2{constructor(){this.queries=Xp(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const i=K(n),s=i.queries;i.queries=Xp(),s.forEach((a,l)=>{for(const u of l.j_)u.onError(r)})})(this,new H(M.ABORTED,"Firestore shutting down"))}}function Xp(){return new gi(t=>X_(t),Xa)}async function ky(t,e){const n=K(t);let r=3;const i=e.query;let s=n.queries.get(i);s?!s.H_()&&e.J_()&&(r=2):(s=new c2,r=e.J_()?0:1);try{switch(r){case 0:s.z_=await n.onListen(i,!0);break;case 1:s.z_=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(a){const l=qh(a,`Initialization of query '${Rr(e.query)}' failed`);return void e.onError(l)}n.queries.set(i,s),s.j_.push(e),e.Z_(n.onlineState),s.z_&&e.X_(s.z_)&&Qh(n)}async function xy(t,e){const n=K(t),r=e.query;let i=3;const s=n.queries.get(r);if(s){const a=s.j_.indexOf(e);a>=0&&(s.j_.splice(a,1),s.j_.length===0?i=e.J_()?0:1:!s.H_()&&e.J_()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function d2(t,e){const n=K(t);let r=!1;for(const i of e){const s=i.query,a=n.queries.get(s);if(a){for(const l of a.j_)l.X_(i)&&(r=!0);a.z_=i}}r&&Qh(n)}function f2(t,e,n){const r=K(t),i=r.queries.get(e);if(i)for(const s of i.j_)s.onError(n);r.queries.delete(e)}function Qh(t){t.Y_.forEach(e=>{e.next()})}var Sc,Jp;(Jp=Sc||(Sc={})).ea="default",Jp.Cache="cache";class Ny{constructor(e,n,r){this.query=e,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new li(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.na?this.ia(e)&&(this.ta.next(e),n=!0):this.sa(e,this.onlineState)&&(this.oa(e),n=!0),this.ra=e,n}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),n=!0),n}sa(e,n){if(!e.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(e){e=li.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Sc.Cache}}/**
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
 */class Vy{constructor(e){this.key=e}}class Dy{constructor(e){this.key=e}}class p2{constructor(e,n){this.query=e,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=J(),this.mutatedKeys=J(),this.Aa=J_(e),this.Ra=new Kr(this.Aa)}get Va(){return this.Ta}ma(e,n){const r=n?n.fa:new Yp,i=n?n.Ra:this.Ra;let s=n?n.mutatedKeys:this.mutatedKeys,a=i,l=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,h=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,m)=>{const _=i.get(f),S=Ja(this.query,m)?m:null,x=!!_&&this.mutatedKeys.has(_.key),D=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let L=!1;_&&S?_.data.isEqual(S.data)?x!==D&&(r.track({type:3,doc:S}),L=!0):this.ga(_,S)||(r.track({type:2,doc:S}),L=!0,(u&&this.Aa(S,u)>0||h&&this.Aa(S,h)<0)&&(l=!0)):!_&&S?(r.track({type:0,doc:S}),L=!0):_&&!S&&(r.track({type:1,doc:_}),L=!0,(u||h)&&(l=!0)),L&&(S?(a=a.add(S),s=D?s.add(f):s.delete(f)):(a=a.delete(f),s=s.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),s=s.delete(f.key),r.track({type:1,doc:f})}return{Ra:a,fa:r,ns:l,mutatedKeys:s}}ga(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,i){const s=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const a=e.fa.G_();a.sort((f,m)=>function(S,x){const D=L=>{switch(L){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return W()}};return D(S)-D(x)}(f.type,m.type)||this.Aa(f.doc,m.doc)),this.pa(r),i=i!=null&&i;const l=n&&!i?this.ya():[],u=this.da.size===0&&this.current&&!i?1:0,h=u!==this.Ea;return this.Ea=u,a.length!==0||h?{snapshot:new li(this.query,e.Ra,s,a,e.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Yp,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(n=>this.Ta=this.Ta.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ta=this.Ta.delete(n)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=J(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const n=[];return e.forEach(r=>{this.da.has(r)||n.push(new Dy(r))}),this.da.forEach(r=>{e.has(r)||n.push(new Vy(r))}),n}ba(e){this.Ta=e.Ts,this.da=J();const n=this.ma(e.documents);return this.applyChanges(n,!0)}Da(){return li.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class m2{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class g2{constructor(e){this.key=e,this.va=!1}}class _2{constructor(e,n,r,i,s,a){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new gi(l=>X_(l),Xa),this.Ma=new Map,this.xa=new Set,this.Oa=new ye(G.comparator),this.Na=new Map,this.La=new jh,this.Ba={},this.ka=new Map,this.qa=ai.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function y2(t,e,n=!0){const r=jy(t);let i;const s=r.Fa.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=await My(r,e,n,!0),i}async function v2(t,e){const n=jy(t);await My(n,e,!0,!1)}async function My(t,e,n,r){const i=await zI(t.localStore,Bt(e)),s=i.targetId,a=t.sharedClientState.addLocalQueryTarget(s,n);let l;return r&&(l=await w2(t,e,s,a==="current",i.resumeToken)),t.isPrimaryClient&&n&&Iy(t.remoteStore,i),l}async function w2(t,e,n,r,i){t.Ka=(m,_,S)=>async function(D,L,I,w){let A=L.view.ma(I);A.ns&&(A=await Wp(D.localStore,L.query,!1).then(({documents:v})=>L.view.ma(v,A)));const N=w&&w.targetChanges.get(L.targetId),F=w&&w.targetMismatches.get(L.targetId)!=null,U=L.view.applyChanges(A,D.isPrimaryClient,N,F);return em(D,L.targetId,U.wa),U.snapshot}(t,m,_,S);const s=await Wp(t.localStore,e,!0),a=new p2(e,s.Ts),l=a.ma(s.documents),u=Bs.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",i),h=a.applyChanges(l,t.isPrimaryClient,u);em(t,n,h.wa);const f=new m2(e,n,a);return t.Fa.set(e,f),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),h.snapshot}async function E2(t,e,n){const r=K(t),i=r.Fa.get(e),s=r.Ma.get(i.targetId);if(s.length>1)return r.Ma.set(i.targetId,s.filter(a=>!Xa(a,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Ic(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),n&&Bh(r.remoteStore,i.targetId),Ac(r,i.targetId)}).catch(js)):(Ac(r,i.targetId),await Ic(r.localStore,i.targetId,!0))}async function T2(t,e){const n=K(t),r=n.Fa.get(e),i=n.Ma.get(r.targetId);n.isPrimaryClient&&i.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Bh(n.remoteStore,r.targetId))}async function I2(t,e,n){const r=x2(t);try{const i=await function(a,l){const u=K(a),h=ke.now(),f=l.reduce((S,x)=>S.add(x.key),J());let m,_;return u.persistence.runTransaction("Locally write mutations","readwrite",S=>{let x=fn(),D=J();return u.cs.getEntries(S,f).next(L=>{x=L,x.forEach((I,w)=>{w.isValidDocument()||(D=D.add(I))})}).next(()=>u.localDocuments.getOverlayedDocuments(S,x)).next(L=>{m=L;const I=[];for(const w of l){const A=GT(w,m.get(w.key).overlayedDocument);A!=null&&I.push(new Qn(w.key,A,H_(A.value.mapValue),Ct.exists(!0)))}return u.mutationQueue.addMutationBatch(S,h,I,l)}).next(L=>{_=L;const I=L.applyToLocalDocumentSet(m,D);return u.documentOverlayCache.saveOverlays(S,L.batchId,I)})}).then(()=>({batchId:_.batchId,changes:ey(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(a,l,u){let h=a.Ba[a.currentUser.toKey()];h||(h=new ye(re)),h=h.insert(l,u),a.Ba[a.currentUser.toKey()]=h}(r,i.batchId,n),await Hs(r,i.changes),await il(r.remoteStore)}catch(i){const s=qh(i,"Failed to persist write");n.reject(s)}}async function Ly(t,e){const n=K(t);try{const r=await FI(n.localStore,e);e.targetChanges.forEach((i,s)=>{const a=n.Na.get(s);a&&(se(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?a.va=!0:i.modifiedDocuments.size>0?se(a.va):i.removedDocuments.size>0&&(se(a.va),a.va=!1))}),await Hs(n,r,e)}catch(r){await js(r)}}function Zp(t,e,n){const r=K(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const i=[];r.Fa.forEach((s,a)=>{const l=a.view.Z_(e);l.snapshot&&i.push(l.snapshot)}),function(a,l){const u=K(a);u.onlineState=l;let h=!1;u.queries.forEach((f,m)=>{for(const _ of m.j_)_.Z_(l)&&(h=!0)}),h&&Qh(u)}(r.eventManager,e),i.length&&r.Ca.d_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function S2(t,e,n){const r=K(t);r.sharedClientState.updateQueryState(e,"rejected",n);const i=r.Na.get(e),s=i&&i.key;if(s){let a=new ye(G.comparator);a=a.insert(s,Ye.newNoDocument(s,Q.min()));const l=J().add(s),u=new tl(Q.min(),new Map,new ye(re),a,l);await Ly(r,u),r.Oa=r.Oa.remove(s),r.Na.delete(e),Kh(r)}else await Ic(r.localStore,e,!1).then(()=>Ac(r,e,n)).catch(js)}async function A2(t,e){const n=K(t),r=e.batch.batchId;try{const i=await OI(n.localStore,e);Oy(n,r,null),by(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Hs(n,i)}catch(i){await js(i)}}async function C2(t,e,n){const r=K(t);try{const i=await function(a,l){const u=K(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return u.mutationQueue.lookupMutationBatch(h,l).next(m=>(se(m!==null),f=m.keys(),u.mutationQueue.removeMutationBatch(h,m))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>u.localDocuments.getDocuments(h,f))})}(r.localStore,e);Oy(r,e,n),by(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Hs(r,i)}catch(i){await js(i)}}function by(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function Oy(t,e,n){const r=K(t);let i=r.Ba[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(n?s.reject(n):s.resolve(),i=i.remove(e)),r.Ba[r.currentUser.toKey()]=i}}function Ac(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Ma.get(e))t.Fa.delete(r),n&&t.Ca.$a(r,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(r=>{t.La.containsKey(r)||Fy(t,r)})}function Fy(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);n!==null&&(Bh(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),Kh(t))}function em(t,e,n){for(const r of n)r instanceof Vy?(t.La.addReference(r.key,e),R2(t,r)):r instanceof Dy?($("SyncEngine","Document no longer in limbo: "+r.key),t.La.removeReference(r.key,e),t.La.containsKey(r.key)||Fy(t,r.key)):W()}function R2(t,e){const n=e.key,r=n.path.canonicalString();t.Oa.get(n)||t.xa.has(r)||($("SyncEngine","New document in limbo: "+n),t.xa.add(r),Kh(t))}function Kh(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new G(fe.fromString(e)),r=t.qa.next();t.Na.set(r,new g2(n)),t.Oa=t.Oa.insert(n,r),Iy(t.remoteStore,new Cn(Bt(Dh(n.path)),r,"TargetPurposeLimboResolution",Rh.oe))}}async function Hs(t,e,n){const r=K(t),i=[],s=[],a=[];r.Fa.isEmpty()||(r.Fa.forEach((l,u)=>{a.push(r.Ka(u,e,n).then(h=>{var f;if((h||n)&&r.isPrimaryClient){const m=h?!h.fromCache:(f=n==null?void 0:n.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,m?"current":"not-current")}if(h){i.push(h);const m=zh.Wi(u.targetId,h);s.push(m)}}))}),await Promise.all(a),r.Ca.d_(i),await async function(u,h){const f=K(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>b.forEach(h,_=>b.forEach(_.$i,S=>f.persistence.referenceDelegate.addReference(m,_.targetId,S)).next(()=>b.forEach(_.Ui,S=>f.persistence.referenceDelegate.removeReference(m,_.targetId,S)))))}catch(m){if(!Us(m))throw m;$("LocalStore","Failed to update sequence numbers: "+m)}for(const m of h){const _=m.targetId;if(!m.fromCache){const S=f.os.get(_),x=S.snapshotVersion,D=S.withLastLimboFreeSnapshotVersion(x);f.os=f.os.insert(_,D)}}}(r.localStore,s))}async function P2(t,e){const n=K(t);if(!n.currentUser.isEqual(e)){$("SyncEngine","User change. New user:",e.toKey());const r=await vy(n.localStore,e);n.currentUser=e,function(s,a){s.ka.forEach(l=>{l.forEach(u=>{u.reject(new H(M.CANCELLED,a))})}),s.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Hs(n,r.hs)}}function k2(t,e){const n=K(t),r=n.Na.get(e);if(r&&r.va)return J().add(r.key);{let i=J();const s=n.Ma.get(e);if(!s)return i;for(const a of s){const l=n.Fa.get(a);i=i.unionWith(l.view.Va)}return i}}function jy(t){const e=K(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=Ly.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=k2.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=S2.bind(null,e),e.Ca.d_=d2.bind(null,e.eventManager),e.Ca.$a=f2.bind(null,e.eventManager),e}function x2(t){const e=K(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=A2.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=C2.bind(null,e),e}class Na{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=nl(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return bI(this.persistence,new MI,e.initialUser,this.serializer)}Ga(e){return new NI(Uh.Zr,this.serializer)}Wa(e){return new $I}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Na.provider={build:()=>new Na};class Cc{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Zp(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=P2.bind(null,this.syncEngine),await u2(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new h2}()}createDatastore(e){const n=nl(e.databaseInfo.databaseId),r=function(s){return new qI(s)}(e.databaseInfo);return function(s,a,l,u){return new YI(s,a,l,u)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,i,s,a,l){return new JI(r,i,s,a,l)}(this.localStore,this.datastore,e.asyncQueue,n=>Zp(this.syncEngine,n,0),function(){return Qp.D()?new Qp:new HI}())}createSyncEngine(e,n){return function(i,s,a,l,u,h,f){const m=new _2(i,s,a,l,u,h);return f&&(m.Qa=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(i){const s=K(i);$("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await $s(s),s.k_.shutdown(),s.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}Cc.provider={build:()=>new Cc};/**
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
 */class Uy{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):dn("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
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
 */class N2{constructor(e,n,r,i,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=i,this.user=Qe.UNAUTHENTICATED,this.clientId=z_.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async a=>{$("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>($("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Fn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=qh(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function du(t,e){t.asyncQueue.verifyOperationInProgress(),$("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async i=>{r.isEqual(i)||(await vy(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function tm(t,e){t.asyncQueue.verifyOperationInProgress();const n=await V2(t);$("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>Kp(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,i)=>Kp(e.remoteStore,i)),t._onlineComponents=e}async function V2(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){$("FirestoreClient","Using user provided OfflineComponentProvider");try{await du(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(i){return i.name==="FirebaseError"?i.code===M.FAILED_PRECONDITION||i.code===M.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(n))throw n;ri("Error using user provided cache. Falling back to memory cache: "+n),await du(t,new Na)}}else $("FirestoreClient","Using default OfflineComponentProvider"),await du(t,new Na);return t._offlineComponents}async function zy(t){return t._onlineComponents||(t._uninitializedComponentsProvider?($("FirestoreClient","Using user provided OnlineComponentProvider"),await tm(t,t._uninitializedComponentsProvider._online)):($("FirestoreClient","Using default OnlineComponentProvider"),await tm(t,new Cc))),t._onlineComponents}function D2(t){return zy(t).then(e=>e.syncEngine)}async function Rc(t){const e=await zy(t),n=e.eventManager;return n.onListen=y2.bind(null,e.syncEngine),n.onUnlisten=E2.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=v2.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=T2.bind(null,e.syncEngine),n}function M2(t,e,n={}){const r=new Fn;return t.asyncQueue.enqueueAndForget(async()=>function(s,a,l,u,h){const f=new Uy({next:_=>{f.Za(),a.enqueueAndForget(()=>xy(s,m)),_.fromCache&&u.source==="server"?h.reject(new H(M.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(_)},error:_=>h.reject(_)}),m=new Ny(l,f,{includeMetadataChanges:!0,_a:!0});return ky(s,m)}(await Rc(t),t.asyncQueue,e,n,r)),r.promise}/**
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
 */function By(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
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
 */const nm=new Map;/**
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
 */function $y(t,e,n){if(!n)throw new H(M.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function L2(t,e,n,r){if(e===!0&&r===!0)throw new H(M.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function rm(t){if(!G.isDocumentKey(t))throw new H(M.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function im(t){if(G.isDocumentKey(t))throw new H(M.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Yh(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":W()}function on(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new H(M.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Yh(t);throw new H(M.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
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
 */class sm{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new H(M.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new H(M.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}L2("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=By((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new H(M.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new H(M.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new H(M.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class sl{constructor(e,n,r,i){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new sm({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new H(M.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new H(M.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new sm(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Z1;switch(r.type){case"firstParty":return new rT(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new H(M.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=nm.get(n);r&&($("ComponentProvider","Removing Datastore"),nm.delete(n),r.terminate())}(this),Promise.resolve()}}function b2(t,e,n,r={}){var i;const s=(t=on(t,sl))._getSettings(),a=`${e}:${n}`;if(s.host!=="firestore.googleapis.com"&&s.host!==a&&ri("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},s),{host:a,ssl:!1})),r.mockUserToken){let l,u;if(typeof r.mockUserToken=="string")l=r.mockUserToken,u=Qe.MOCK_USER;else{l=VE(r.mockUserToken,(i=t._app)===null||i===void 0?void 0:i.options.projectId);const h=r.mockUserToken.sub||r.mockUserToken.user_id;if(!h)throw new H(M.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new Qe(h)}t._authCredentials=new eT(new U_(l,u))}}/**
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
 */class Gs{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Gs(this.firestore,e,this._query)}}class _t{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new jn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new _t(this.firestore,e,this._key)}}class jn extends Gs{constructor(e,n,r){super(e,n,Dh(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new _t(this.firestore,null,new G(e))}withConverter(e){return new jn(this.firestore,e,this._path)}}function Rn(t,e,...n){if(t=Ht(t),$y("collection","path",e),t instanceof sl){const r=fe.fromString(e,...n);return im(r),new jn(t,null,r)}{if(!(t instanceof _t||t instanceof jn))throw new H(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(fe.fromString(e,...n));return im(r),new jn(t.firestore,null,r)}}function Qi(t,e,...n){if(t=Ht(t),arguments.length===1&&(e=z_.newId()),$y("doc","path",e),t instanceof sl){const r=fe.fromString(e,...n);return rm(r),new _t(t,null,new G(r))}{if(!(t instanceof _t||t instanceof jn))throw new H(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(fe.fromString(e,...n));return rm(r),new _t(t.firestore,t instanceof jn?t.converter:null,new G(r))}}/**
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
 */class om{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Ey(this,"async_queue_retry"),this.Vu=()=>{const r=hu();r&&$("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=hu();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=hu();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new Fn;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Us(e))throw e;$("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const i=function(a){let l=a.message||"";return a.stack&&(l=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),l}(r);throw dn("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const i=Wh.createAndSchedule(this,e,n,r,s=>this.yu(s));return this.Tu.push(i),i}fu(){this.Eu&&W()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}function am(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const i=n;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(t,["next","error","complete"])}class ui extends sl{constructor(e,n,r,i){super(e,n,r,i),this.type="firestore",this._queue=new om,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new om(e),this._firestoreClient=void 0,await e}}}function O2(t,e){const n=typeof t=="object"?t:z1(),r=typeof t=="string"?t:"(default)",i=O1(n,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=xE("firestore");s&&b2(i,...s)}return i}function ol(t){if(t._terminated)throw new H(M.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||F2(t),t._firestoreClient}function F2(t){var e,n,r;const i=t._freezeSettings(),s=function(l,u,h,f){return new gT(l,u,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,By(f.experimentalLongPollingOptions),f.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,i);t._componentsProvider||!((n=i.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),t._firestoreClient=new N2(t._authCredentials,t._appCheckCredentials,t._queue,s,t._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(t._componentsProvider))}/**
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
 */class ci{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ci(ze.fromBase64String(e))}catch(n){throw new H(M.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new ci(ze.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class al{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new H(M.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Oe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class Xh{constructor(e){this._methodName=e}}/**
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
 */class Jh{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new H(M.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new H(M.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return re(this._lat,e._lat)||re(this._long,e._long)}}/**
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
 */class Zh{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}}/**
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
 */const j2=/^__.*__$/;class U2{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Qn(e,this.data,this.fieldMask,n,this.fieldTransforms):new zs(e,this.data,n,this.fieldTransforms)}}class Hy{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new Qn(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function Gy(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw W()}}class ed{constructor(e,n,r,i,s,a){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new ed(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Fu({path:r,xu:!1});return i.Ou(e),i}Nu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Fu({path:r,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return Va(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(Gy(this.Cu)&&j2.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class z2{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||nl(e)}Qu(e,n,r,i=!1){return new ed({Cu:e,methodName:n,qu:r,path:Oe.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Wy(t){const e=t._freezeSettings(),n=nl(t._databaseId);return new z2(t._databaseId,!!e.ignoreUndefinedProperties,n)}function qy(t,e,n,r,i,s={}){const a=t.Qu(s.merge||s.mergeFields?2:0,e,n,i);td("Data must be an object, but it was:",a,r);const l=Qy(r,a);let u,h;if(s.merge)u=new pt(a.fieldMask),h=a.fieldTransforms;else if(s.mergeFields){const f=[];for(const m of s.mergeFields){const _=Pc(e,m,n);if(!a.contains(_))throw new H(M.INVALID_ARGUMENT,`Field '${_}' is specified in your field mask but missing from your input data.`);Yy(f,_)||f.push(_)}u=new pt(f),h=a.fieldTransforms.filter(m=>u.covers(m.field))}else u=null,h=a.fieldTransforms;return new U2(new ot(l),u,h)}class ll extends Xh{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ll}}function B2(t,e,n,r){const i=t.Qu(1,e,n);td("Data must be an object, but it was:",i,r);const s=[],a=ot.empty();wr(r,(u,h)=>{const f=nd(e,u,n);h=Ht(h);const m=i.Nu(f);if(h instanceof ll)s.push(f);else{const _=ul(h,m);_!=null&&(s.push(f),a.set(f,_))}});const l=new pt(s);return new Hy(a,l,i.fieldTransforms)}function $2(t,e,n,r,i,s){const a=t.Qu(1,e,n),l=[Pc(e,r,n)],u=[i];if(s.length%2!=0)throw new H(M.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let _=0;_<s.length;_+=2)l.push(Pc(e,s[_])),u.push(s[_+1]);const h=[],f=ot.empty();for(let _=l.length-1;_>=0;--_)if(!Yy(h,l[_])){const S=l[_];let x=u[_];x=Ht(x);const D=a.Nu(S);if(x instanceof ll)h.push(S);else{const L=ul(x,D);L!=null&&(h.push(S),f.set(S,L))}}const m=new pt(h);return new Hy(f,m,a.fieldTransforms)}function ul(t,e){if(Ky(t=Ht(t)))return td("Unsupported field value:",e,t),Qy(t,e);if(t instanceof Xh)return function(r,i){if(!Gy(i.Cu))throw i.Bu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,i){const s=[];let a=0;for(const l of r){let u=ul(l,i.Lu(a));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),a++}return{arrayValue:{values:s}}}(t,e)}return function(r,i){if((r=Ht(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return jT(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=ke.fromDate(r);return{timestampValue:ka(i.serializer,s)}}if(r instanceof ke){const s=new ke(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:ka(i.serializer,s)}}if(r instanceof Jh)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof ci)return{bytesValue:dy(i.serializer,r._byteString)};if(r instanceof _t){const s=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(s))throw i.Bu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Fh(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Zh)return function(a,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map(u=>{if(typeof u!="number")throw l.Bu("VectorValues must only contain numeric values.");return Mh(l.serializer,u)})}}}}}}(r,i);throw i.Bu(`Unsupported field value: ${Yh(r)}`)}(t,e)}function Qy(t,e){const n={};return B_(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):wr(t,(r,i)=>{const s=ul(i,e.Mu(r));s!=null&&(n[r]=s)}),{mapValue:{fields:n}}}function Ky(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof ke||t instanceof Jh||t instanceof ci||t instanceof _t||t instanceof Xh||t instanceof Zh)}function td(t,e,n){if(!Ky(n)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(n)){const r=Yh(n);throw r==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+r)}}function Pc(t,e,n){if((e=Ht(e))instanceof al)return e._internalPath;if(typeof e=="string")return nd(t,e);throw Va("Field path arguments must be of type string or ",t,!1,void 0,n)}const H2=new RegExp("[~\\*/\\[\\]]");function nd(t,e,n){if(e.search(H2)>=0)throw Va(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new al(...e.split("."))._internalPath}catch{throw Va(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Va(t,e,n,r,i){const s=r&&!r.isEmpty(),a=i!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(s||a)&&(u+=" (found",s&&(u+=` in field ${r}`),a&&(u+=` in document ${i}`),u+=")"),new H(M.INVALID_ARGUMENT,l+t+u)}function Yy(t,e){return t.some(n=>n.isEqual(e))}/**
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
 */class Xy{constructor(e,n,r,i,s){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new _t(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new G2(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Jy("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class G2 extends Xy{data(){return super.data()}}function Jy(t,e){return typeof e=="string"?nd(t,e):e instanceof al?e._internalPath:e._delegate._internalPath}/**
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
 */function Zy(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new H(M.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class W2{convertValue(e,n="none"){switch(_r(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Te(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(gr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw W()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return wr(e,(i,s)=>{r[i]=this.convertValue(s,n)}),r}convertVectorValue(e){var n,r,i;const s=(i=(r=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(a=>Te(a.doubleValue));return new Zh(s)}convertGeoPoint(e){return new Jh(Te(e.latitude),Te(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=kh(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(ks(e));default:return null}}convertTimestamp(e){const n=$n(e);return new ke(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=fe.fromString(e);se(yy(r));const i=new xs(r.get(1),r.get(3)),s=new G(r.popFirst(5));return i.isEqual(n)||dn(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),s}}/**
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
 */function ev(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}/**
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
 */class Ki{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class tv extends Xy{constructor(e,n,r,i,s,a){super(e,n,r,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Yo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(Jy("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class Yo extends tv{data(e={}){return super.data(e)}}class nv{constructor(e,n,r,i){this._firestore=e,this._userDataWriter=n,this._snapshot=i,this.metadata=new Ki(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new Yo(this._firestore,this._userDataWriter,r.key,r,new Ki(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new H(M.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(l=>{const u=new Yo(i._firestore,i._userDataWriter,l.doc.key,l.doc,new Ki(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(l=>s||l.type!==3).map(l=>{const u=new Yo(i._firestore,i._userDataWriter,l.doc.key,l.doc,new Ki(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);let h=-1,f=-1;return l.type!==0&&(h=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),f=a.indexOf(l.doc.key)),{type:q2(l.type),doc:u,oldIndex:h,newIndex:f}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function q2(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return W()}}class rd extends W2{constructor(e){super(),this.firestore=e}convertBytes(e){return new ci(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new _t(this.firestore,null,n)}}function Vo(t){t=on(t,Gs);const e=on(t.firestore,ui),n=ol(e),r=new rd(e);return Zy(t._query),M2(n,t._query).then(i=>new nv(e,r,t,i))}function Q2(t,e,n){t=on(t,_t);const r=on(t.firestore,ui),i=ev(t.converter,e,n);return rv(r,[qy(Wy(r),"setDoc",t._key,i,t.converter!==null,n).toMutation(t._key,Ct.none())])}function Do(t,...e){var n,r,i;t=Ht(t);let s={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||am(e[a])||(s=e[a],a++);const l={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(am(e[a])){const m=e[a];e[a]=(n=m.next)===null||n===void 0?void 0:n.bind(m),e[a+1]=(r=m.error)===null||r===void 0?void 0:r.bind(m),e[a+2]=(i=m.complete)===null||i===void 0?void 0:i.bind(m)}let u,h,f;if(t instanceof _t)h=on(t.firestore,ui),f=Dh(t._key.path),u={next:m=>{e[a]&&e[a](K2(h,t,m))},error:e[a+1],complete:e[a+2]};else{const m=on(t,Gs);h=on(m.firestore,ui),f=m._query;const _=new rd(h);u={next:S=>{e[a]&&e[a](new nv(h,_,m,S))},error:e[a+1],complete:e[a+2]},Zy(t._query)}return function(_,S,x,D){const L=new Uy(D),I=new Ny(S,L,x);return _.asyncQueue.enqueueAndForget(async()=>ky(await Rc(_),I)),()=>{L.Za(),_.asyncQueue.enqueueAndForget(async()=>xy(await Rc(_),I))}}(ol(h),f,l,u)}function rv(t,e){return function(r,i){const s=new Fn;return r.asyncQueue.enqueueAndForget(async()=>I2(await D2(r),i,s)),s.promise}(ol(t),e)}function K2(t,e,n){const r=n.docs.get(e._key),i=new rd(t);return new tv(t,i,e._key,r,new Ki(n.hasPendingWrites,n.fromCache),e.converter)}/**
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
 */class Y2{constructor(e,n){this._firestore=e,this._commitHandler=n,this._mutations=[],this._committed=!1,this._dataReader=Wy(e)}set(e,n,r){this._verifyNotCommitted();const i=fu(e,this._firestore),s=ev(i.converter,n,r),a=qy(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(a.toMutation(i._key,Ct.none())),this}update(e,n,r,...i){this._verifyNotCommitted();const s=fu(e,this._firestore);let a;return a=typeof(n=Ht(n))=="string"||n instanceof al?$2(this._dataReader,"WriteBatch.update",s._key,n,r,i):B2(this._dataReader,"WriteBatch.update",s._key,n),this._mutations.push(a.toMutation(s._key,Ct.exists(!0))),this}delete(e){this._verifyNotCommitted();const n=fu(e,this._firestore);return this._mutations=this._mutations.concat(new Lh(n._key,Ct.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new H(M.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function fu(t,e){if((t=Ht(t)).firestore!==e)throw new H(M.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return t}/**
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
 */function iv(t){return ol(t=on(t,ui)),new Y2(t,e=>rv(t,e))}(function(e,n=!0){(function(i){mi=i})(U1),Ia(new Cs("firestore",(r,{instanceIdentifier:i,options:s})=>{const a=r.getProvider("app").getImmediate(),l=new ui(new tT(r.getProvider("auth-internal")),new sT(r.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new H(M.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new xs(h.options.projectId,f)}(a,i),a);return s=Object.assign({useFetchStreams:n},s),l._setSettings(s),l},"PUBLIC").setMultipleInstances(!0)),Qr(Ap,"4.7.3",e),Qr(Ap,"4.7.3","esm2017")})();const X2={apiKey:"AIzaSyDcd71aoujH4yccQpMpGFixfvY15G_gPeA",authDomain:"donghyeon-match.firebaseapp.com",databaseURL:"https://donghyeon-match-default-rtdb.firebaseio.com",projectId:"donghyeon-match",storageBucket:"donghyeon-match.firebasestorage.app",messagingSenderId:"576708595535",appId:"1:576708595535:web:3deacb1e1b0986b78fbf3a",measurementId:"G-8SBR5KKRV0"},J2=N_(X2),tt=O2(J2),mt={MATCHES:"tennis_matches",TEAMS:"tennis_teams",GROUPS:"tennis_groups",COURTS:"tennis_courts"},Z2=t=>{const e=Do(Rn(tt,mt.MATCHES),s=>{const a=s.docs.map(l=>({id:l.id,...l.data()}));a.length>0?t(l=>({...l,matches:a})):t(l=>({...l,matches:[]}))}),n=Do(Rn(tt,mt.TEAMS),s=>{const a=s.docs.map(l=>({id:l.id,...l.data()}));a.length>0?t(l=>({...l,teams:a})):t(l=>({...l,teams:[]}))}),r=Do(Rn(tt,mt.GROUPS),s=>{const a=s.docs.map(l=>({id:l.id,...l.data()}));a.length>0?t(l=>({...l,groups:a})):t(l=>({...l,groups:[]}))}),i=Do(Rn(tt,mt.COURTS),s=>{const a=s.docs.map(u=>({id:u.id,...u.data()})),l=a.sort((u,h)=>Number(u.id)-Number(h.id));a.length>0?t(u=>({...u,courts:l})):t(u=>({...u,courts:[]}))});return()=>{e(),n(),r(),i()}},kc=async t=>{try{console.log("Starting upload...");const e=JSON.parse(JSON.stringify(t)),n=iv(tt);e.teams.forEach(i=>{const s=Qi(tt,mt.TEAMS,i.id);n.set(s,i)}),e.groups.forEach(i=>{const s=Qi(tt,mt.GROUPS,String(i.id));n.set(s,i)}),e.matches.forEach(i=>{const s=Qi(tt,mt.MATCHES,i.id);n.set(s,i)}),e.courts&&e.courts.forEach(i=>{const s=Qi(tt,mt.COURTS,String(i.id));n.set(s,i)});const r=new Promise((i,s)=>setTimeout(()=>s(new Error("Request timed out.")),1e4));await Promise.race([n.commit(),r]),console.log("Data uploaded successfully!")}catch(e){throw console.error("Error uploading data: ",e),e}},lm=async(t,e)=>{try{const n=Qi(tt,mt.MATCHES,t);await Q2(n,e,{merge:!0})}catch(n){throw console.error("Error updating match: ",n),n}},eS=async()=>{try{console.log("Starting full reset...");const t=iv(tt),e=await Vo(Rn(tt,mt.MATCHES)),n=await Vo(Rn(tt,mt.TEAMS)),r=await Vo(Rn(tt,mt.GROUPS)),i=await Vo(Rn(tt,mt.COURTS));e.forEach(s=>{t.delete(s.ref)}),n.forEach(s=>{t.delete(s.ref)}),r.forEach(s=>{t.delete(s.ref)}),i.forEach(s=>{t.delete(s.ref)}),await t.commit(),console.log("All data reset successfully!")}catch(t){throw console.error("Error resetting data: ",t),t}},um=({match:t,teamA:e,teamB:n,isAdmin:r})=>{const i=t.status==="COMPLETED",s=t.status==="LIVE",a=m=>({color:m?"var(--tennis-yellow)":"#fff",fontSize:m?"1.5rem":"1.2rem",fontWeight:"800",opacity:m?1:.7}),l=t.winner_id,u=async(m,_)=>{const S=m==="A"?"score_a":"score_b",x=Math.max(0,(t[S]||0)+_);await lm(t.id,{[S]:x})},h=async m=>{let _={status:m};if(m==="COMPLETED"){const S=t.score_a||0,x=t.score_b||0;S>x?_.winner_id=t.team_a_id:x>S&&(_.winner_id=t.team_b_id)}else _.winner_id=null;await lm(t.id,_)},f={background:"#444",color:"#fff",border:"none",borderRadius:"4px",width:"24px",height:"24px",cursor:"pointer",fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center"};return P.jsxs("div",{className:`match-card ${s?"live":""} ${i?"completed":""}`,children:[P.jsxs("div",{className:"card-header",children:[P.jsxs("span",{className:"match-info",children:[t.group_id," - R",t.round]}),P.jsxs("div",{style:{display:"flex",gap:"5px"},children:[s&&P.jsx("span",{className:"live-badge",children:"● LIVE"}),i&&P.jsx("span",{className:"completed-badge",children:"종료"}),r&&P.jsxs("select",{value:t.status,onChange:m=>h(m.target.value),style:{background:"#333",color:"white",border:"1px solid #555",fontSize:"0.7rem",padding:"2px"},children:[P.jsx("option",{value:"SCHEDULED",children:"대기"}),P.jsx("option",{value:"LIVE",children:"진행"}),P.jsx("option",{value:"COMPLETED",children:"종료"})]})]})]}),P.jsxs("div",{className:"team-row",children:[P.jsxs("div",{className:"team-info",children:[P.jsx("span",{className:`team-name ${l===e.id?"winner":""}`,children:e.name}),P.jsxs("span",{className:"team-players",children:[e.player1,", ",e.player2]})]}),P.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"5px"},children:[r&&P.jsx("button",{onClick:()=>u("A",-1),style:f,children:"-"}),P.jsx("div",{className:"score",style:a(l===e.id),children:t.score_a}),r&&P.jsx("button",{onClick:()=>u("A",1),style:f,children:"+"})]})]}),P.jsx("div",{className:"divider"}),P.jsxs("div",{className:"team-row",children:[P.jsxs("div",{className:"team-info",children:[P.jsx("span",{className:`team-name ${l===n.id?"winner":""}`,children:n.name}),P.jsxs("span",{className:"team-players",children:[n.player1,", ",n.player2]})]}),P.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"5px"},children:[r&&P.jsx("button",{onClick:()=>u("B",-1),style:f,children:"-"}),P.jsx("div",{className:"score",style:a(l===n.id),children:t.score_b}),r&&P.jsx("button",{onClick:()=>u("B",1),style:f,children:"+"})]})]}),P.jsx("style",{children:`
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
      `})]})},tS=({matches:t,teams:e,courts:n,isAdmin:r})=>{const i=[{id:"16강",label:"Round of 16"},{id:"8강",label:"Quarter Finals"},{id:"4강",label:"Semi Finals"},{id:"결승",label:"Final"}],s=h=>e.find(f=>f.id===h)||{name:"TBD",player1:"",player2:""},a=t.filter(h=>!isNaN(parseInt(h.group_id))),l=t.some(h=>["16강","8강","4강","결승"].includes(h.group_id)),u=h=>{if(!n)return null;const f=n.find(m=>m.id===h);return!f||!f.match_id?null:t.find(m=>m.id===f.match_id)};return P.jsxs("div",{className:"bracket-wrapper",children:[n&&P.jsxs("div",{className:"court-grid-section",children:[P.jsx("h3",{className:"section-title",children:"🎾 실시간 코트 현황 (Live Courts)"}),P.jsx("div",{className:"court-grid",children:n.map(h=>{const f=u(h.id),m=f?s(f.team_a_id):null,_=f?s(f.team_b_id):null;return P.jsxs("div",{className:`court-card ${f?"active":"empty"}`,children:[P.jsxs("div",{className:"court-header",children:["Court ",h.id]}),f?P.jsxs("div",{className:"court-match-info",children:[P.jsxs("div",{className:"court-team",children:[P.jsx("span",{className:"team-name",children:m.name}),P.jsx("span",{className:"team-score",children:f.score_a||0})]}),P.jsx("div",{className:"vs-divider",children:"VS"}),P.jsxs("div",{className:"court-team",children:[P.jsx("span",{className:"team-name",children:_.name}),P.jsx("span",{className:"team-score",children:f.score_b||0})]}),P.jsxs("div",{className:"match-status-badge",children:[f.group_id,"조"]})]}):P.jsx("div",{className:"court-empty-state",children:"빈 코트"})]},h.id)})})]}),P.jsxs("div",{className:"bracket-container",children:[!l&&a.length>0&&P.jsxs("div",{className:"bracket-round",children:[P.jsx("h3",{className:"round-title",children:"예선 조별리그 (Group Stage)"}),P.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[a.slice(0,10).map(h=>P.jsx(um,{match:h,teamA:s(h.team_a_id),teamB:s(h.team_b_id),isAdmin:r},h.id)),a.length>10&&P.jsxs("div",{style:{textAlign:"center",color:"#888"},children:["... + ",a.length-10," more matches"]})]})]}),i.map(h=>{const f=t.filter(m=>m.group_id===h.id);return f.length===0?null:P.jsxs("div",{className:"bracket-round",children:[P.jsx("h3",{className:"round-title",children:h.label}),f.map(m=>P.jsx(um,{match:m,teamA:s(m.team_a_id),teamB:s(m.team_b_id),isAdmin:r},m.id))]},h.id)}),P.jsx("style",{children:`
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
      `})]})]})},nS=({teams:t,groups:e})=>P.jsxs("div",{className:"standings-container",children:[e.map(n=>{const i=[...n.team_ids.map(s=>t.find(a=>a.id===s)).filter(Boolean)].sort((s,a)=>a.points-s.points||a.games_won-s.games_won);return P.jsxs("div",{className:"group-card",children:[P.jsx("h3",{className:"group-title",children:n.name}),P.jsxs("table",{className:"standings-table",children:[P.jsx("thead",{children:P.jsxs("tr",{children:[P.jsx("th",{children:"Rank"}),P.jsx("th",{children:"Team"}),P.jsx("th",{children:"P"}),P.jsx("th",{children:"W"}),P.jsx("th",{children:"L"}),P.jsx("th",{children:"Pts"})]})}),P.jsx("tbody",{children:i.map((s,a)=>P.jsxs("tr",{children:[P.jsx("td",{children:a+1}),P.jsx("td",{className:"team-cell",children:P.jsx("div",{className:"t-name",children:s.name})}),P.jsx("td",{children:s.wins+s.losses+s.draws}),P.jsx("td",{children:s.wins}),P.jsx("td",{children:s.losses}),P.jsx("td",{className:"points",children:s.points})]},s.id))})]})]},n.id)}),P.jsx("style",{children:`
        .standings-container {
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
          .standings-container {
            grid-template-columns: 1fr;
          }
          .t-name {
            max-width: 140px; /* More space on mobile list */
          }
        }
      `})]}),rS=(t,e=8)=>{const n=Array.from({length:e},(r,i)=>({id:i+1,name:`${i+1}조`,team_ids:[]}));return t.forEach((r,i)=>{const s=i%e;n[s].team_ids.push(r.id)}),n},iS=t=>{const e=[];return t.forEach(n=>{const r=n.team_ids,i=r.length;if(i<2)return;let s=1;for(let a=0;a<i;a++)for(let l=a+1;l<i;l++){const u=`g${n.id}_m${s}`;e.push({id:u,group_id:n.id,round:s,team_a_id:r[a],team_b_id:r[l],score_a:0,score_b:0,status:"PENDING",court_id:null,winner_id:null}),s++}}),e},cm=(t,e)=>{let n=JSON.parse(JSON.stringify(t)),r=JSON.parse(JSON.stringify(e));const i=new Set;n.filter(l=>l.status==="LIVE").forEach(l=>{i.add(l.team_a_id),i.add(l.team_b_id)});const s=r.filter(l=>l.match_id===null);if(s.length===0)return{matches:n,courts:r};let a=n.filter(l=>l.status==="PENDING"&&!l.court_id);a.sort((l,u)=>l.round===u.round?l.group_id-u.group_id:l.round-u.round);for(const l of s){const u=a.findIndex(h=>!i.has(h.team_a_id)&&!i.has(h.team_b_id));if(u!==-1){const h=a[u],f=n.find(m=>m.id===h.id);f.status="LIVE",f.court_id=l.id,l.match_id=h.id,i.add(h.team_a_id),i.add(h.team_b_id),a.splice(u,1)}}return{matches:n,courts:r}},sS=({data:t,onUpdateData:e,isAdmin:n,onLogin:r})=>{const[i,s]=be.useState(""),[a,l]=be.useState(8),[u,h]=be.useState(10),[f,m]=be.useState(""),[_,S]=be.useState(""),[x,D]=be.useState(!1),L=N=>{N.preventDefault(),f==="admin"?r(!0):alert("비밀번호가 틀렸습니다.")},I=async()=>{if(!i.trim()){alert("참가자 명단을 입력해주세요.");return}D(!0),S("데이터 처리 중...");try{const F=i.split(`
`).filter(R=>R.trim()).map((R,E)=>({id:`t${E+1}`,name:R.trim(),player1:"",player2:""}));if(F.length<a&&!confirm(`팀 수(${F.length})가 조 개수(${a})보다 적습니다.계속 진행할까요?`)){D(!1);return}const U=rS(F,a),v=iS(U),g=Array.from({length:u},(R,E)=>({id:E+1,match_id:null})),{matches:y,courts:T}=cm(v,g);await kc({teams:F,groups:U,matches:y,courts:T}),S("✅ 대회 생성 및 업로드 완료!"),setTimeout(()=>S(""),3e3)}catch(N){console.error(N),S("❌ 오류: "+N.message)}finally{D(!1)}},w=async()=>{if(confirm("정말로 모든 대회를 초기화하시겠습니까? (데이터 삭제됨)")){D(!0);try{await eS(),S("🗑️ 데이터가 초기화되었습니다."),setTimeout(()=>S(""),3e3)}catch(N){console.error("초기화 실패:",N),S("❌ 초기화 실패: "+N.message)}finally{D(!1)}}},A=async()=>{D(!0);try{const{matches:N,courts:F}=cm(t.matches,t.courts),U={...t,matches:N,courts:F};await kc(U),S("⚡ 코트 배정 완료!"),setTimeout(()=>S(""),3e3)}catch(N){console.error(N)}finally{D(!1)}};return n?P.jsxs("div",{className:"dashboard-container",children:[P.jsxs("div",{className:"dashboard-header",children:[P.jsxs("h2",{children:[P.jsx(fp,{className:"icon-gap"})," 대회 운영 대시보드"]}),P.jsx("div",{className:"status-badge",children:x?"🔄 처리 중...":"✅ 시스템 준비됨"})]}),P.jsxs("div",{className:"dashboard-grid",children:[P.jsxs("div",{className:"glass-card setup-card",children:[P.jsx("div",{className:"card-header",children:P.jsxs("h3",{children:[P.jsx(vE,{className:"icon-gap"})," 참가자 및 조 편성"]})}),P.jsxs("div",{className:"form-section",children:[P.jsx("label",{children:"참가 팀 명단 (한 줄에 한 팀)"}),P.jsx("textarea",{className:"modern-textarea",placeholder:`홍길동/이순신
김철수/박영희
Team A
Team B`,value:i,onChange:N=>s(N.target.value)}),P.jsxs("div",{className:"input-row",children:[P.jsxs("div",{className:"input-group",children:[P.jsx("label",{children:"조(Group) 개수"}),P.jsx("input",{type:"number",className:"modern-input",value:a,onChange:N=>l(Number(N.target.value))})]}),P.jsxs("div",{className:"input-group",children:[P.jsx("label",{children:"코트(Court) 개수"}),P.jsx("input",{type:"number",className:"modern-input",value:u,onChange:N=>h(Number(N.target.value))})]})]}),P.jsxs("div",{className:"action-buttons",children:[P.jsxs("button",{onClick:I,disabled:x,className:"modern-button primary",children:[P.jsx(mE,{size:18})," 대진표 생성 및 시작"]}),P.jsxs("button",{onClick:w,disabled:x,className:"modern-button danger",children:[P.jsx(_E,{size:18})," 대회 초기화"]})]}),_&&P.jsx("div",{className:"status-message",children:_})]})]}),P.jsxs("div",{className:"right-col",children:[P.jsxs("div",{className:"glass-card status-card",children:[P.jsx("div",{className:"card-header",children:P.jsxs("h3",{children:[P.jsx(fE,{className:"icon-gap"})," 현재 상태"]})}),P.jsxs("div",{className:"stat-grid",children:[P.jsxs("div",{className:"stat-item",children:[P.jsx("span",{className:"stat-label",children:"진행 중"}),P.jsx("span",{className:"stat-value live",children:t.matches.filter(N=>N.status==="LIVE").length})]}),P.jsxs("div",{className:"stat-item",children:[P.jsx("span",{className:"stat-label",children:"대기 중"}),P.jsx("span",{className:"stat-value",children:t.matches.filter(N=>N.status==="PENDING").length})]}),P.jsxs("div",{className:"stat-item",children:[P.jsx("span",{className:"stat-label",children:"완료됨"}),P.jsx("span",{className:"stat-value completed",children:t.matches.filter(N=>N.status==="COMPLETED").length})]})]})]}),P.jsxs("div",{className:"glass-card control-card",children:[P.jsx("div",{className:"card-header",children:P.jsxs("h3",{children:[P.jsx(gE,{className:"icon-gap"})," 경기 배정"]})}),P.jsx("p",{className:"card-desc",children:"빈 코트가 생기면 대기 중인 경기를 자동으로 배정합니다."}),P.jsx("button",{onClick:A,disabled:x,className:"modern-button secondary full-width",children:"⚡ 코트 자동 배정 (수동 실행)"})]}),P.jsxs("div",{className:"glass-card help-card",children:[P.jsx("div",{className:"card-header",children:P.jsxs("h3",{children:[P.jsx(dE,{className:"icon-gap"})," 관리자 가이드"]})}),P.jsxs("ul",{className:"help-list",children:[P.jsxs("li",{children:["• 참가자 명단을 입력하고 ",P.jsx("strong",{children:"[생성]"}),"을 누르면 대회가 시작됩니다."]}),P.jsxs("li",{children:["• ",P.jsx("strong",{children:"[대진표]"})," 탭에서 경기 점수를 입력할 수 있습니다."]}),P.jsxs("li",{children:["• 경기가 끝나면 ",P.jsx("strong",{children:"[자동 배정]"}),"을 눌러 다음 경기를 투입하세요."]})]})]})]})]}),P.jsx("style",{children:`
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
}
                .help-list li {
    margin-bottom: 0.5rem;
    line-height: 1.4;
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
`})]}):P.jsxs("div",{className:"login-container glass-panel",children:[P.jsxs("div",{className:"login-box",children:[P.jsx("div",{className:"icon-wrapper",children:P.jsx(fp,{size:48,color:"var(--tennis-yellow)"})}),P.jsx("h2",{children:"운영자 로그인"}),P.jsx("p",{children:"대회 설정을 위해 관리자 권한이 필요합니다."}),P.jsxs("form",{onSubmit:L,children:[P.jsx("input",{type:"password",placeholder:"비밀번호 입력",value:f,onChange:N=>m(N.target.value),className:"modern-input",autoFocus:!0}),P.jsxs("button",{type:"submit",className:"modern-button primary full-width",children:[P.jsx(pE,{size:18})," 로그인"]})]})]}),P.jsx("style",{children:`
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
`})]})},oS={num_teams:32,num_groups:8,num_courts:6},aS=[{id:"t1",name:"김동현, 샤라포바",player1:"김동현",player2:"샤라포바",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:1},{id:"t2",name:"김연아, 방탄소년단 진",player1:"김연아",player2:"방탄소년단 진",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:1},{id:"t3",name:"손흥민, 방탄소년단 슈가",player1:"손흥민",player2:"방탄소년단 슈가",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:1},{id:"t4",name:"방탄소년단 RM, 방탄소년단 제이홉",player1:"방탄소년단 RM",player2:"방탄소년단 제이홉",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:1},{id:"t5",name:"안기린, 성범",player1:"안기린",player2:"성범",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:2},{id:"t6",name:"방탄소년단 지민, 아이유",player1:"방탄소년단 지민",player2:"아이유",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:2},{id:"t7",name:"방탄소년단 뷔, 박보검",player1:"방탄소년단 뷔",player2:"박보검",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:2},{id:"t8",name:"방탄소년단 정국, 송중기",player1:"방탄소년단 정국",player2:"송중기",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:2},{id:"t9",name:"살쾡이, 벨두광",player1:"살쾡이",player2:"벨두광",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:3},{id:"t10",name:"블랙핑크 지수, 블랙핑크 리사",player1:"블랙핑크 지수",player2:"블랙핑크 리사",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:3},{id:"t11",name:"블랙핑크 제니, 전지현",player1:"블랙핑크 제니",player2:"전지현",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:3},{id:"t12",name:"블랙핑크 로제, 이정재",player1:"블랙핑크 로제",player2:"이정재",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:3},{id:"t13",name:"가지코, 뻭가",player1:"가지코",player2:"뻭가",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:4},{id:"t14",name:"정우성, 손예진",player1:"정우성",player2:"손예진",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:4},{id:"t15",name:"공유, 강동원",player1:"공유",player2:"강동원",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:4},{id:"t16",name:"현빈, 마동석",player1:"현빈",player2:"마동석",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:4},{id:"t17",name:"신건주, 오렝지",player1:"신건주",player2:"오렝지",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:5},{id:"t18",name:"유재석, 박명수",player1:"유재석",player2:"박명수",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:5},{id:"t19",name:"강호동, 이효리",player1:"강호동",player2:"이효리",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:5},{id:"t20",name:"신동엽, 지드래곤",player1:"신동엽",player2:"지드래곤",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:5},{id:"t21",name:"짹짹이, 보람",player1:"짹짹이",player2:"보람",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:6},{id:"t22",name:"태연, 김수현",player1:"태연",player2:"김수현",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:6},{id:"t23",name:"수지, 김우빈",player1:"수지",player2:"김우빈",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:6},{id:"t24",name:"박서준, 이병헌",player1:"박서준",player2:"이병헌",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:6},{id:"t25",name:"산쵸황쵸, 인퀀",player1:"산쵸황쵸",player2:"인퀀",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:7},{id:"t26",name:"김혜수, 영탁",player1:"김혜수",player2:"영탁",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:7},{id:"t27",name:"하정우, 장원영",player1:"하정우",player2:"장원영",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:7},{id:"t28",name:"임영웅, 안유진",player1:"임영웅",player2:"안유진",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:7},{id:"t29",name:"호민, 김상수",player1:"호민",player2:"김상수",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:8},{id:"t30",name:"카리나, 크러쉬",player1:"카리나",player2:"크러쉬",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:8},{id:"t31",name:"윈터, 잔나비",player1:"윈터",player2:"잔나비",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:8},{id:"t32",name:"전소미, 원숭이",player1:"전소미",player2:"원숭이",wins:0,draws:0,losses:0,points:0,games_won:0,pre_group:8}],lS=[{id:1,name:"1조",team_ids:["t1","t2","t3","t4"]},{id:2,name:"2조",team_ids:["t5","t6","t7","t8"]},{id:3,name:"3조",team_ids:["t9","t10","t11","t12"]},{id:4,name:"4조",team_ids:["t13","t14","t15","t16"]},{id:5,name:"5조",team_ids:["t17","t18","t19","t20"]},{id:6,name:"6조",team_ids:["t21","t22","t23","t24"]},{id:7,name:"7조",team_ids:["t25","t26","t27","t28"]},{id:8,name:"8조",team_ids:["t29","t30","t31","t32"]}],uS=[{id:"g1_m1",group_id:1,round:1,team_a_id:"t1",team_b_id:"t2",score_a:5,score_b:5,point_a:0,point_b:0,status:"COMPLETED",court_id:null,winner_id:null,is_draw:!0},{id:"g1_m2",group_id:1,round:2,team_a_id:"t1",team_b_id:"t3",score_a:6,score_b:0,point_a:0,point_b:0,status:"COMPLETED",court_id:null,winner_id:"t1",is_draw:!1},{id:"g1_m3",group_id:1,round:3,team_a_id:"t1",team_b_id:"t4",score_a:5,score_b:5,point_a:0,point_b:0,status:"COMPLETED",court_id:null,winner_id:null,is_draw:!0},{id:"g1_m4",group_id:1,round:4,team_a_id:"t2",team_b_id:"t3",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g1_m5",group_id:1,round:5,team_a_id:"t2",team_b_id:"t4",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g1_m6",group_id:1,round:6,team_a_id:"t3",team_b_id:"t4",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g2_m1",group_id:2,round:1,team_a_id:"t5",team_b_id:"t6",score_a:0,score_b:0,point_a:0,point_b:0,status:"LIVE",court_id:2,winner_id:null,is_draw:!1},{id:"g2_m2",group_id:2,round:2,team_a_id:"t5",team_b_id:"t7",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g2_m3",group_id:2,round:3,team_a_id:"t5",team_b_id:"t8",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g2_m4",group_id:2,round:4,team_a_id:"t6",team_b_id:"t7",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g2_m5",group_id:2,round:5,team_a_id:"t6",team_b_id:"t8",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g2_m6",group_id:2,round:6,team_a_id:"t7",team_b_id:"t8",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g3_m1",group_id:3,round:1,team_a_id:"t9",team_b_id:"t10",score_a:0,score_b:0,point_a:0,point_b:0,status:"LIVE",court_id:3,winner_id:null,is_draw:!1},{id:"g3_m2",group_id:3,round:2,team_a_id:"t9",team_b_id:"t11",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g3_m3",group_id:3,round:3,team_a_id:"t9",team_b_id:"t12",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g3_m4",group_id:3,round:4,team_a_id:"t10",team_b_id:"t11",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g3_m5",group_id:3,round:5,team_a_id:"t10",team_b_id:"t12",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g3_m6",group_id:3,round:6,team_a_id:"t11",team_b_id:"t12",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g4_m1",group_id:4,round:1,team_a_id:"t13",team_b_id:"t14",score_a:0,score_b:0,point_a:0,point_b:0,status:"LIVE",court_id:4,winner_id:null,is_draw:!1},{id:"g4_m2",group_id:4,round:2,team_a_id:"t13",team_b_id:"t15",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g4_m3",group_id:4,round:3,team_a_id:"t13",team_b_id:"t16",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g4_m4",group_id:4,round:4,team_a_id:"t14",team_b_id:"t15",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g4_m5",group_id:4,round:5,team_a_id:"t14",team_b_id:"t16",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g4_m6",group_id:4,round:6,team_a_id:"t15",team_b_id:"t16",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g5_m1",group_id:5,round:1,team_a_id:"t17",team_b_id:"t18",score_a:0,score_b:0,point_a:0,point_b:0,status:"LIVE",court_id:5,winner_id:null,is_draw:!1},{id:"g5_m2",group_id:5,round:2,team_a_id:"t17",team_b_id:"t19",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g5_m3",group_id:5,round:3,team_a_id:"t17",team_b_id:"t20",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g5_m4",group_id:5,round:4,team_a_id:"t18",team_b_id:"t19",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g5_m5",group_id:5,round:5,team_a_id:"t18",team_b_id:"t20",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g5_m6",group_id:5,round:6,team_a_id:"t19",team_b_id:"t20",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g6_m1",group_id:6,round:1,team_a_id:"t21",team_b_id:"t22",score_a:0,score_b:0,point_a:0,point_b:0,status:"LIVE",court_id:6,winner_id:null,is_draw:!1},{id:"g6_m2",group_id:6,round:2,team_a_id:"t21",team_b_id:"t23",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g6_m3",group_id:6,round:3,team_a_id:"t21",team_b_id:"t24",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g6_m4",group_id:6,round:4,team_a_id:"t22",team_b_id:"t23",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g6_m5",group_id:6,round:5,team_a_id:"t22",team_b_id:"t24",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g6_m6",group_id:6,round:6,team_a_id:"t23",team_b_id:"t24",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g7_m1",group_id:7,round:1,team_a_id:"t25",team_b_id:"t26",score_a:6,score_b:0,point_a:0,point_b:0,status:"COMPLETED",court_id:null,winner_id:"t25",is_draw:!1},{id:"g7_m2",group_id:7,round:2,team_a_id:"t25",team_b_id:"t27",score_a:0,score_b:6,point_a:0,point_b:0,status:"COMPLETED",court_id:null,winner_id:"t27",is_draw:!1},{id:"g7_m3",group_id:7,round:3,team_a_id:"t25",team_b_id:"t28",score_a:0,score_b:0,point_a:0,point_b:0,status:"LIVE",court_id:1,winner_id:null,is_draw:!1},{id:"g7_m4",group_id:7,round:4,team_a_id:"t26",team_b_id:"t27",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g7_m5",group_id:7,round:5,team_a_id:"t26",team_b_id:"t28",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g7_m6",group_id:7,round:6,team_a_id:"t27",team_b_id:"t28",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g8_m1",group_id:8,round:1,team_a_id:"t29",team_b_id:"t30",score_a:6,score_b:0,point_a:0,point_b:0,status:"COMPLETED",court_id:null,winner_id:"t29",is_draw:!1},{id:"g8_m2",group_id:8,round:2,team_a_id:"t29",team_b_id:"t31",score_a:6,score_b:0,point_a:0,point_b:0,status:"COMPLETED",court_id:null,winner_id:"t29",is_draw:!1},{id:"g8_m3",group_id:8,round:3,team_a_id:"t29",team_b_id:"t32",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g8_m4",group_id:8,round:4,team_a_id:"t30",team_b_id:"t31",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g8_m5",group_id:8,round:5,team_a_id:"t30",team_b_id:"t32",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1},{id:"g8_m6",group_id:8,round:6,team_a_id:"t31",team_b_id:"t32",score_a:0,score_b:0,point_a:0,point_b:0,status:"PENDING",court_id:null,winner_id:null,is_draw:!1}],cS=[{id:1,match_id:"g7_m3"},{id:2,match_id:"g2_m1"},{id:3,match_id:"g3_m1"},{id:4,match_id:"g4_m1"},{id:5,match_id:"g5_m1"},{id:6,match_id:"g6_m1"}],hS={is_active:!1,pot_1:[],pot_2:[],matches:[],current_drawer_idx:0,round_history:[],current_round_name:"16강"},dS=[],hm={config:oS,teams:aS,groups:lS,matches:uS,courts:cS,knockout_draw:hS,logs:dS};function fS(){const[t,e]=be.useState("match"),[n,r]=be.useState(hm),[i,s]=be.useState(""),[a,l]=be.useState(!1);be.useEffect(()=>{const h=Z2(r);return()=>h()},[]);const u=async()=>{if(confirm("현재 데이터를 Firebase에 업로드하시겠습니까? (기존 데이터 덮어쓰기)")){s("업로드 중...");try{await kc(hm),s("업로드 완료! (성공)"),setTimeout(()=>s(""),3e3)}catch(h){s("업로드 실패: "+h.message)}}};return P.jsxs(wE,{activeTab:t,onTabChange:e,isAdmin:a,onToggleAdmin:()=>{a?(l(!1),e("match")):e("admin")},children:[t!=="admin"&&P.jsxs("div",{style:{position:"fixed",bottom:"20px",right:"20px",zIndex:9999,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"10px"},children:[i&&P.jsx("div",{style:{background:"rgba(0,0,0,0.8)",color:"white",padding:"10px",borderRadius:"8px"},children:i}),a&&P.jsx("button",{onClick:u,style:{padding:"10px 15px",background:"#d32f2f",color:"white",border:"none",borderRadius:"8px",cursor:"pointer",opacity:.9,boxShadow:"0 2px 5px rgba(0,0,0,0.3)"},children:"DB 초기화 (주의)"}),P.jsx("button",{onClick:()=>e("admin"),style:{padding:"10px 15px",background:"#444",color:"white",border:"1px solid #666",borderRadius:"8px",cursor:"pointer",opacity:.9,boxShadow:"0 2px 5px rgba(0,0,0,0.3)"},children:"⚙️ 운영자 모드"})]}),t==="admin"?P.jsx(sS,{data:n,isAdmin:a,onLogin:h=>l(h)}):t==="match"?P.jsx(tS,{matches:n.matches,teams:n.teams,courts:n.courts,isAdmin:a}):P.jsx(nS,{teams:n.teams,groups:n.groups})]})}pu.createRoot(document.getElementById("root")).render(P.jsx(Jv.StrictMode,{children:P.jsx(fS,{})}));
