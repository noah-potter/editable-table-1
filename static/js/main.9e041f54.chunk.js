(window["webpackJsonpeditable-table"]=window["webpackJsonpeditable-table"]||[]).push([[0],{40:function(e,t,n){e.exports=n(52)},45:function(e,t,n){},46:function(e,t,n){},52:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(17),c=n.n(o),u=(n(45),n(13)),i=n(14),l=(n(46),n(9)),s=n(15),d=n(66),f=n(73),m=n(67),b=n(68),p=n(69),v=n(70),O=n(74),g=n(71),j=n(75),y=n(72);function w(){var e=Object(i.a)(["\n  && {\n    &:hover {\n      cursor: pointer;\n      background: #0000000f;\n    }\n\n    font-weight: ",";\n  }\n"]);return w=function(){return e},e}function h(){var e=Object(i.a)(["\n  & > * {\n    margin-bottom: 12px;\n  }\n"]);return h=function(){return e},e}function E(){var e=Object(i.a)(["\n  .MuiInputBase-input {\n    padding: 12px;\n  }\n"]);return E=function(){return e},e}function C(){var e=Object(i.a)([""]);return C=function(){return e},e}function S(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function D(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?S(n,!0).forEach((function(t){Object(l.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):S(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var k,M=JSON.parse(window.localStorage.getItem("datumDelta")||"{}"),F=function(e,t){switch(t.type){case"setDelta":var n=D({},e,Object(l.a)({},t.id,D({},e[t.id],Object(l.a)({},t.attr,t.newValue))));return window.localStorage.setItem("datumDelta",JSON.stringify(n)),n;case"resetDeltas":return window.localStorage.setItem("datumDelta",JSON.stringify({})),{};default:throw new Error}};!function(e){e.Asc="asc",e.Desc="desc"}(k||(k={}));var P=Object(s.a)(d.a)(C()),x=Object(s.a)(f.a)(E()),A=function(e){var t=e.query,n=e.onChange;return a.a.createElement(P,null,a.a.createElement(x,{onChange:function(e){return n(e.target.value)},value:t,fullWidth:!0,placeholder:"Search..."}))},I=s.a.div(h()),J=Object(s.a)(m.a)(w(),(function(e){return e.bold?700:400})),B=function(e){var t=e.data,n=e.datumKey,o=e.boldCellFuncs,c=e.upperCaseColumns,i=Object(r.useReducer)(F,M),l=Object(u.a)(i,2),s=l[0],f=l[1];Object(r.useEffect)((function(){return function(){f({type:"resetDeltas"})}}),[]);var m=Object(r.useState)(""),w=Object(u.a)(m,2),h=w[0],E=w[1],C=Object(r.useMemo)((function(){return h.toLowerCase()}),[h]),S=Object(r.useState)(k.Asc),P=Object(u.a)(S,2),x=P[0],B=P[1],N=Object(r.useState)(null),W=Object(u.a)(N,2),q=W[0],K=W[1],L=Object(r.useState)(null),G=Object(u.a)(L,2),R=G[0],T=G[1],U=Object(r.useMemo)((function(){if(t.length){var e=t[0];return Object.keys(e).map((function(e){return e}))}return[]}),[t]),V=Object(r.useMemo)((function(){var e=t.map((function(e){var t=e[n];return D({},e,{},s[t])})).filter((function(e){return U.some((function(t){var n=e[t];return n&&n.toString().toLowerCase().includes(C)}))}));return q&&(e=e.sort((function(e,t){return e[q].toString().localeCompare(t[q].toString())}))),x===k.Desc&&e.reverse(),e}),[t,s,U,C,q,x,n]),$=function(e){B(e===q?function(e){return e===k.Asc?k.Desc:k.Asc}(x):k.Asc),K(e)};return a.a.createElement(I,null,a.a.createElement(A,{query:h,onChange:function(e){return E(e)}}),a.a.createElement(d.a,null,a.a.createElement(b.a,null,a.a.createElement(p.a,null,a.a.createElement(v.a,null,U.map((function(e){return a.a.createElement(J,{key:e},a.a.createElement(O.a,{active:q===e,direction:x,onClick:function(){return $(e)}},(t=e).charAt(0).toUpperCase()+t.slice(1)));var t})))),a.a.createElement(g.a,null,V.map((function(e){var t=e[n];return a.a.createElement(v.a,{key:t},U.map((function(r){var u=e[r].toString();if(R&&R.rowId===t&&R.header===r)return a.a.createElement(J,{key:r,onBlur:function(){return T(null)},onKeyDown:function(e){"Enter"===e.key&&T(null)}},a.a.createElement(j.a,{value:u,autoFocus:!0,labelWidth:0,onChange:function(e){f({type:"setDelta",attr:r,id:t,newValue:e.target.value})}}));var i=!1;if(c&&c.includes(r)&&(u=u.toUpperCase()),o){var l=o[r];l&&(i=l(u))}return a.a.createElement(J,{key:r,bold:i,onClick:function(){r!==n&&T({rowId:e[n],header:r})}},u)})))}))))),a.a.createElement(y.a,{variant:"contained",color:"primary",onClick:function(){return f({type:"resetDeltas"})}},"Reset Changes"))};function N(){var e=Object(i.a)(["\n  display: flex;\n  margin-bottom: 12px;\n  && > * {\n    margin-right: 12px;\n  }\n"]);return N=function(){return e},e}var W=function(e,t,n,r){return{id:e,subject:t,numberStudents:n,averageGrade:r}},q=[[{id:1,manufacturer:"Ford",model:"Focus"},{id:2,manufacturer:"Ford",model:"Mustang"},{id:3,manufacturer:"Ford",model:"F-150"},{id:4,manufacturer:"Chevrolet",model:"Corvette"},{id:5,manufacturer:"Chevrolet",model:"Equinox"},{id:6,manufacturer:"Tesla",model:"Model 3"},{id:7,manufacturer:"Toyota",model:"Camry"},{id:8,manufacturer:"Dodge",model:"Charger"},{id:9,manufacturer:"Dodge",model:"Challenger"}],[W(1,"Math",23,3.4),W(2,"Science",12,2.8),W(3,"English",23,2.9),W(4,"Social",23,3.8),W(5,"Gym",23,2.1),W(6,"Music",23,1.9)]],K=s.a.div(N()),L=function(){var e=Object(r.useState)(0),t=Object(u.a)(e,2),n=t[0],o=t[1],c=Object(r.useMemo)((function(){return q[n]}),[n]);return a.a.createElement("div",{className:"App"},a.a.createElement(K,null,a.a.createElement(y.a,{variant:0===n?"contained":"outlined",color:"secondary",onClick:function(){return o(0)}},"Data set 1"),a.a.createElement(y.a,{variant:1===n?"contained":"outlined",onClick:function(){return o(1)},color:"secondary"},"Data set 2")),a.a.createElement(B,{key:n,data:c,datumKey:"id",boldCellFuncs:{manufacturer:function(e){return"ford"===e.toString().toLowerCase()}},upperCaseColumns:["model"]}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(L,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[40,1,2]]]);
//# sourceMappingURL=main.9e041f54.chunk.js.map