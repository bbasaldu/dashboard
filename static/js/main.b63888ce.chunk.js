(this.webpackJsonpdashboard=this.webpackJsonpdashboard||[]).push([[0],{10:function(t,e,n){t.exports={container:"Dashboard_container__10juk",levelOneGrowVertical:"Dashboard_levelOneGrowVertical__242AT",flexGrow:"Dashboard_flexGrow__27Wti",levelOneBlank:"Dashboard_levelOneBlank__2xGDD",dropDownSpace:"Dashboard_dropDownSpace__3X_0S"}},11:function(t,e,n){t.exports={svg:"PieChart_svg__3X8vH",container:"PieChart_container__9GyYc",vertical:"PieChart_vertical__3LQfp",pieLegend:"PieChart_pieLegend__24I4M",textTop:"PieChart_textTop__3STK7",textBottom:"PieChart_textBottom__-AmS-"}},12:function(t,e,n){t.exports={container:"LineDropDownMenu_container__1wVd5",btn:"LineDropDownMenu_btn__2IxLT",options:"LineDropDownMenu_options__BPLh-",lineLegend:"LineDropDownMenu_lineLegend__2G6jv",lineColor:"LineDropDownMenu_lineColor__2avNp"}},16:function(t,e,n){t.exports={svg:"buildBarChart_svg__6FUTy",xAxis:"buildBarChart_xAxis__6QdKK",yAxis:"buildBarChart_yAxis__1Z2BA",tooltip:"buildBarChart_tooltip__3e8nX"}},178:function(t,e,n){},187:function(t,e,n){"use strict";n.r(e);var a=n(2),i=n.n(a),r=n(24),c=n.n(r),o=(n(178),n(5)),l=n(39),s=n.n(l),d=n(10),u=n.n(d),p=n(57),f=n.n(p),h=n(0),b=function(t){return Object(h.jsx)("div",{className:"".concat(f.a.container," ").concat("undefined"===typeof t.className?"":t.className),children:t.children})},v=n(58),j=n.n(v),_=function(t){return Object(h.jsxs)("div",{className:"".concat(j.a.container," ").concat("undefined"===typeof t.className?"":t.className),children:[Object(h.jsx)("div",{children:t.title}),Object(h.jsx)("div",{children:t.value})]})},x=n(40),g=n.n(x),m=function(t){var e=t.headers;return Object(h.jsx)("div",{className:g.a.container,children:e.map((function(t,e){return Object(h.jsx)("span",{className:g.a.header,children:t},"".concat(t,"_").concat(e))}))})},O=n(59),w=n.n(O),y=n(1),C=n(8),D=n.n(C),A=function(t,e){var n=t.append("text").text(e),a=n.node().getBoundingClientRect();return n.remove(),a},k=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],i=n.theme,r=y.w("body").append("div").attr("class",D.a.tooltip).attr("id","".concat(t,"_tooltip")).style("opacity",0).style("top","0px").style("left","0px");r.append("div").attr("id","".concat(t,"_tooltip_top")).attr("class",D.a.tooltipTop),r.append("div").attr("id","".concat(t,"_tooltip_bottom")).attr("class",D.a.tooltipBottom);var c=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Dec"],o=y.w("#".concat(t)),l=parseFloat(o.style("width")),s=parseFloat(o.style("height")),d=o.attr("class",D.a.svg).append("svg").attr("id","".concat(t,"_svg")).attr("width",l).attr("height",s),u=1e3,p=y.j,f=5,h=6,b=A(d,c[0]+""),v=y.p(e,(function(t){return y.p(t.pointData,(function(t){return t.y}))})),j=y.o(e,(function(t){return y.o(t.pointData,(function(t){return t.y}))})),_=y.y(0,j,10),x=A(d,_[_.length-1]+""),g={left:h+x.width+.02*l,right:b.width/2+.02*l,bottom:h+b.height,top:.05*s},m=l-g.right,O=s-g.bottom,w=y.v().domain([new Date("2020-01-01T00:00:00"),new Date("2020-12-30T00:00:00")]).range([g.left,m]).nice(),C=d.append("g").attr("class",D.a.xAxis).attr("id","".concat(t,"_xAxis")).attr("transform","translate(".concat(0,", ",O,")")).call(y.c(w).tickSize(h).tickFormat(y.z("%b"))),k=C.selectAll(".tick").selectAll("text");k.attr("id",(function(t,e){return y.z("%b%y")(t)}));var L=y.u().domain([v,j]).range([O,g.top]).nice(),S=d.append("g").attr("class",D.a.yAxis).attr("id","".concat(t,"_yAxis")).attr("transform","translate(".concat(g.left,", ",0,")")).call(y.d(L).tickSize(h).ticks(f));S.selectAll("line").attr("stroke",i.first);var N=function(){return y.c(w)},E=d.append("g");E.append("g").attr("class",D.a.grid).attr("transform","translate(0,"+O+")").call(N().tickSize(-O).tickFormat("")),E.selectAll("line").attr("stroke",i.second);var M=y.n().x((function(t,e){return w(t.x)})).y((function(t,e){return L(t.y)})).curve(y.e.alpha(.5)),T=d.append("path").attr("id","path").datum(e[0].pointData).attr("fill","none").attr("stroke",i.third).attr("stroke-width","2").attr("stroke-linecap","round").attr("d",M);if(a){var F=T.node().getTotalLength();T.attr("stroke-dasharray",F+" "+F).attr("stroke-dashoffset",F).transition().duration(u).ease(p).attr("stroke-dashoffset",0)}d.selectAll("text").attr("color",i.second);var B=[];e[0].pointData.forEach((function(t){var e,n;e=w(t.x),n=L(v),B.push([e,n])}));var R=4,V=y.a.from(B),z=function(n){var a=d.select("#".concat(t,"_pointMarker")),r=B[n][0],c=L(e[0].pointData[n].y);if(a.empty()){var o=d.append("g").attr("id","".concat(t,"_pointMarker")).attr("transform","translate(".concat(r,", ").concat(c,")"));o.append("circle").attr("fill","white").attr("stroke",i.second).attr("stroke-width",.5).attr("r",R+1),o.append("circle").attr("fill",i.third).attr("r",R)}else a.attr("transform","translate(".concat(r,", ").concat(c,")"))},I=function(t){var e=t.getBoundingClientRect();return{top:e.top+window.pageYOffset,right:e.right+window.pageXOffset,bottom:e.bottom+window.pageYOffset,left:e.left+window.pageXOffset}},Y=function(n){var a=B[n][0],i=L(e[0].pointData[n].y),c=r.node().getBoundingClientRect(),o=I(d.node()),l=y.k(",")(e[0].pointData[n].y.toFixed(3));r.style("opacity",1).style("left","".concat(o.left+a-c.width/2,"px")).style("top","".concat(o.top+i-c.height-7-14,"px")),y.w("#".concat(t,"_tooltip_top")).html(l),y.w("#".concat(t,"_tooltip_bottom")).html(y.z("Numbers for %m/%d/%y")(e[0].pointData[n].x))},G=null,H=function(t){var n=y.i,a=e[0].pointData[t],r=y.z("%b%y")(a.x),c=y.w("#".concat(r));null===G?c.transition().duration(500).style("fill",i.third):null!==G&&G.attr("id")!==c.attr("id")&&(c.transition().duration(500).style("fill",i.third),G.transition().duration(500).ease(n).style("fill",i.second)),G=c},P=function(e){var n=B[e][0];y.w("#".concat(t,"_YAxisHighlight")).remove(),d.append("line").attr("id","".concat(t,"_YAxisHighlight")).attr("x1",n).attr("x2",n).attr("y1",O).attr("y2",0).attr("stroke",i.third).attr("stroke-width",1).attr("stroke-dasharray",4)};d.on("mousemove",(function(t){var e=y.r(t),n=V.find(e[0],L(v));z(n),Y(n),H(n),P(n)})),d.on("mouseleave",(function(){var e=d.select("#".concat(t,"_pointMarker"));e.empty()||e.remove(),null!==G&&G.transition().duration(500).ease(y.i).style("fill",i.second),G=null,r.style("opacity",0),y.w("#".concat(t,"_YAxisHighlight")).remove()})),d.on("touchstart",(function(t){t.preventDefault();var e=y.s(t)[0],n=V.find(e[0],L(v));z(n),Y(n),H(n),P(n),z(n),Y(n),H(n),P(n)})).on("touchmove",(function(t){t.preventDefault();var e=y.s(t)[0],n=V.find(e[0],L(v));z(n),Y(n),H(n),P(n)})).on("touchend",(function(){var e=d.select("#".concat(t,"_pointMarker"));e.empty()||e.remove(),null!==G&&G.transition().duration(500).ease(y.i).style("fill",i.second),G=null,r.style("opacity",0),y.w("#".concat(t,"_YAxisHighlight")).remove()}));var K={};return K},L=function(t){var e=Object(o.c)((function(t){return t.resizeState.resized})),n=Object(a.useRef)();return Object(a.useEffect)((function(){if(e){var n={theme:{first:"steelblue",second:"#C0C0C0",third:"#2cd9d0"}};!function(t){var e=y.w("#".concat(t));y.w("#".concat(t,"_tooltip")).remove(),e.selectAll("svg").remove()}(t.id),k(t.id,t.data,n,!1)}}),[e,t]),Object(a.useEffect)((function(){var e={theme:{first:"steelblue",second:"#C0C0C0",third:"#2cd9d0"}};k(t.id,t.data,e,!0)}),[t]),Object(h.jsx)("div",{className:w.a.container,id:t.id,ref:n})},S=n(27),N=n.n(S),E=function(t){var e=t.positive,n=t.value;return Object(h.jsxs)("div",{className:"".concat(N.a.container," ").concat(t.className),children:[Object(h.jsx)("span",{children:n}),Object(h.jsx)("div",{className:e?N.a.arrowUp:N.a.arrowDown})]})},M=n(3),T=n(11),F=n.n(T),B=n(60),R=n.n(B),V=function(t){return Object(h.jsx)("div",{className:"".concat(R.a.container," ").concat(t.className),children:t.children})},z=n(42),I=n.n(z),Y=function(t){var e=t.data;return Object(h.jsxs)("div",{className:I.a.container,children:[e.map((function(t,n){return Object(h.jsx)("span",{className:I.a.row,children:t},"".concat(e[0],"_").concat(n))})),t.children]})},G=n(61),H=n.n(G),P=function(t){var e=t.color;return Object(h.jsx)("div",{className:H.a.container,style:{backgroundColor:e}})},K=function(t){var e=t.getBoundingClientRect();return e.bottom-e.height/2<=window.innerHeight},J=function(t,e){var n=t.append("text").text(e),a=n.node().getBoundingClientRect();return n.remove(),a},X=["#2cd9d0","#5eacc9","#e4970f","#cc3035"],U=function(t){return Object(h.jsx)(P,{color:t})},Q=function(t,e,n,a){var i=y.w(t);i.selectAll("path").attr("transform","rotate(-180)").transition().ease(y.g.amplitude(1).period(.99)).duration(2e3).attr("transform","rotate(0)").attrTween("d",(function(t,a){return function(t,e,n){var a=y.l({startAngle:t,endAngle:t},e);return function(t){return n(a(t))}}(0===a?0:e[a-1].endAngle,e[a],n)})).on("end",(function(){return a(!1)})),i.select("path").raise()},Z=["Legend","Label","Value"];var W=function(t){var e=Object(o.c)((function(t){return t.resizeState.resized})),n=Object(a.useRef)(),i=Object(a.useRef)(),r=Object(a.useState)(null),c=Object(M.a)(r,2),l=c[0],s=c[1],d=Object(a.useState)(!0),u=Object(M.a)(d,2),p=u[0],f=u[1],b=Object(a.useState)(!1),v=Object(M.a)(b,2),j=v[0],_=v[1],x=t.data,g=x.total,O=x.pieData,w=y.q().value((function(t){return t.value}))(O);w.forEach((function(t){t.startAngle*=.95,t.endAngle*=1.05}));var C=function(){var t=y.w(n.current),e=parseFloat(t.style("width")),a=parseFloat(t.style("height")),i=Math.min(e,a)/2,r={inner:.65*i,outer:1*i},c=y.b().innerRadius(r.inner).outerRadius(r.outer).cornerRadius(15);s({w:e,h:a,r:i,arc:c})};return Object(a.useEffect)((function(){e&&j&&C()}),[e,j]),Object(a.useEffect)((function(){var t=function t(){K(n.current)&&(window.removeEventListener("scroll",t),_(!0))};window.addEventListener("scroll",t),t(),j&&C()}),[j]),Object(a.useEffect)((function(){null!==l&&p&&Q(i.current,w,l.arc,f)}),[l,w,p]),Object(h.jsxs)("div",{className:F.a.vertical,children:[Object(h.jsxs)(V,{className:F.a.pieLegend,children:[Object(h.jsx)(m,{headers:Z}),Object(h.jsx)(Y,{data:[U(X[0]),"label1",25]}),Object(h.jsx)(Y,{data:[U(X[1]),"label2",25]}),Object(h.jsx)(Y,{data:[U(X[2]),"label3",25]}),Object(h.jsx)(Y,{data:[U(X[3]),"label4",25]})]}),Object(h.jsx)("div",{className:F.a.container,ref:n,children:null!==l&&Object(h.jsx)("svg",{className:F.a.svg,id:"".concat(t.id,"_svg"),children:Object(h.jsxs)("g",{transform:"translate(".concat(l.w/2,",").concat(l.h/2,")"),ref:i,children:[p&&w.map((function(t,e){return Object(h.jsx)("path",{id:"arc_".concat(e),fill:X[e]},"arc_".concat(e))})),!p&&w.map((function(t,e){var n=e===w.length-1?0:e+1,a=w[n];return Object(h.jsx)("path",{id:"arc_".concat(n),fill:X[n],d:l.arc.startAngle(a.startAngle).endAngle(a.endAngle)()},"arc_".concat(n))})),Object(h.jsx)("text",{className:F.a.textTop,fill:X[0],children:g}),Object(h.jsx)("text",{className:F.a.textBottom,dy:"1.5em",children:"Total"})]})})})]})},q=n(28),$=n.n(q),tt=new Event("dataChange"),et=function(t){var e=Object(a.useRef)(),n=t.options,i=Object(a.useState)(n[0]),r=Object(M.a)(i,2),c=r[0],o=r[1],l=Object(a.useState)(n.filter((function(t){return t!==c}))),s=Object(M.a)(l,2),d=s[0],u=s[1],p=Object(a.useState)(!1),f=Object(M.a)(p,2),b=f[0],v=f[1];Object(a.useEffect)((function(){u(n.filter((function(t){return t!==c}))),e.current.dispatchEvent(tt)}),[c,n]);var j=function(t){o(t.target.innerHTML),v((function(t){return!t}))};return Object(h.jsxs)("div",{className:$.a.container,children:[Object(h.jsx)("button",{className:$.a.btn,type:"button",onClick:function(){v((function(t){return!t}))},ref:e,id:"".concat(t.id,"_dropdown"),children:c}),Object(h.jsx)("ul",{className:$.a.options,style:{visibility:b?"visible":"hidden"},children:d.map((function(t,e){return Object(h.jsx)("li",{onClick:j,children:t},"dropDownElem".concat(e))}))})]})},nt=n(62),at=n.n(nt),it=n(16),rt=n.n(it),ct=function(t,e){var n=t.append("text").text(e),a=n.node().getBoundingClientRect();return n.remove(),a},ot=function(t,e,n){var a=n.findIndex((function(e){return e===t})),i=Array.from(e);return 0===a?i.sort((function(t,e){return t.label.localeCompare(e.label)})):1===a?i.sort((function(t,e){return t.value-e.value})):2===a&&i.sort((function(t,e){return e.value-t.value})),i},lt=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],i=arguments.length>4?arguments[4]:void 0,r=n.theme,c=n.selectionOptions,o=y.w("#".concat(t));o.selectAll("svg").remove(),y.w("#".concat(t,"_tooltip")).remove();var l=y.w("body").append("div").attr("class",rt.a.tooltip).attr("id","".concat(t,"_tooltip")).style("opacity",0).style("top","0px").style("left","0px"),s=parseFloat(o.style("width")),d=parseFloat(o.style("height")),u=o.append("svg").attr("class",rt.a.svg).attr("id","".concat(t,"_svg")).attr("width",s).attr("height",d),p=y.o(e,(function(t){return t.value})),f=ct(u,e[0].label),h=6,b=y.f,v=1e3,j={left:0,right:0,bottom:h+f.height,top:0},_=s-j.right,x=d-j.bottom,g=y.t().domain(e.map((function(t){return t.label}))).range([j.left,_]).padding(.05),m=u.append("g").attr("class",rt.a.xAxis).attr("id","".concat(t,"_xAxis")).attr("transform","translate(".concat(0,", ",x,")")).call(y.c(g)),O=y.u().domain([0,p]).range([x,j.top]);u.append("g").attr("class",rt.a.yAxis).attr("id","".concat(t,"_yAxis")).attr("transform","translate(".concat(j.left,", ",0,")")).call(y.d(O));var w=u.append("g"),C=function(){w.selectAll("bottles").data(e).enter().append("rect").attr("x",(function(t){return g(t.label)})).attr("y",(function(t){return O(p)})).attr("width",g.bandwidth()).attr("height",(function(t){return x-O(p)})).attr("rx",20).attr("fill",r.fourth)},D=function(t,e){var n=l.node().getBoundingClientRect();l.html(e.value).style("left","".concat(t[0]-n.width/2,"px")).style("top","".concat(t[1]-n.height-7,"px"))},A=u.append("g").attr("id","".concat(t,"_rects")),k=function(t){g.domain(t.map((function(t){return t.label}))),m.transition().duration(1e3).call(y.c(g)),A.selectAll("rect").data(t,(function(t){return t.label})).join((function(t){return L(t)}),(function(t){return S(t)}),(function(t){}))},L=function(t){a?t.append("rect").attr("x",(function(t){return g(t.label)})).attr("width",g.bandwidth()).attr("y",(function(t){return x})).attr("rx",20).attr("fill",r.third).transition().duration(v).ease(b).attr("height",(function(t){return x-O(t.value)})).attr("y",(function(t){return O(t.value)})):t.append("rect").attr("x",(function(t){return g(t.label)})).attr("y",(function(t){return O(t.value)})).attr("width",g.bandwidth()).attr("height",(function(t){return x-O(t.value)})).attr("rx",20).attr("fill",r.third)},S=function(t){t.transition().duration(1e3).attr("x",(function(t){return g(t.label)}))};u.selectAll("text").attr("color",r.second),C();var N=function(){A.selectAll("rect").on("mouseenter",(function(){l.style("opacity",1)})).on("mousemove",(function(t,e){var n=y.r(t,u);D(n,e)})).on("mouseleave",(function(){l.style("opacity",0)}))};if(a){var E=function n(){y.w("#".concat(t)).node().removeEventListener("isVisible",n),k(e),N()};y.w("#".concat(t)).node().addEventListener("isVisible",E)}else k(e),N();y.w("#".concat(t,"_dropdown")).on("dataChange",(function(t){var n=ot(t.target.innerHTML,e,c);k(n),i(n)}))},st=["sort alphabetically","sort value ascending","sort value descending"],dt={theme:{first:"steelblue",second:"#C0C0C0",third:"#2cd9d0",fourth:"#F5F5F5"},selectionOptions:st},ut=new Event("isVisible"),pt=function(t){var e=Object(a.useRef)(),n=Object(o.c)((function(t){return t.resizeState.resized})),i=Object(a.useState)(t.data),r=Object(M.a)(i,2),c=r[0],l=r[1],s=Object(a.useState)(!1),d=Object(M.a)(s,2),u=d[0],p=d[1],f=function(t){l(t)};return Object(a.useEffect)((function(){n&&u&&lt(t.id,c,dt,!1,f)}),[n,t,c,u]),Object(a.useEffect)((function(){lt(t.id,t.data,dt,!0,f);var n=function t(){K(e.current)&&(e.current.dispatchEvent(ut),window.removeEventListener("scroll",t),p(!0))};window.addEventListener("scroll",n),n()}),[t]),Object(h.jsx)("div",{className:at.a.container,id:t.id,ref:e,children:Object(h.jsx)(et,{options:st,id:t.id})})},ft=n(63),ht=n.n(ft),bt=function(t){return Object(h.jsx)("div",{className:ht.a.container,children:t.children})},vt=n(9),jt=n.n(vt),_t=n.p+"static/media/fi-rr-interrogation.da36bdf3.svg";var xt=function(t){return t.includes(".")?t.split(".")[1].length:0},gt=function(t){var e=t.percentValue,n=t.lastValue,i=t.value,r=t.positive,c=t.icon,o=Object(a.useRef)(),l=Object(a.useRef)(),s=Object(a.useRef)(),d=Object(a.useRef)(),u=Object(a.useState)(!1),p=Object(M.a)(u,2),f=p[0],b=p[1],v=i[i.length-1],j=i,_="";return isNaN(v)&&(j=i.slice(0,i.length-1),_=v),Object(a.useEffect)((function(){y.A(c).then((function(t){var e=t.documentElement.cloneNode(!0),n=o.current.appendChild(e);y.w(n).attr("width","100%").attr("height","100%").attr("fill","#2cd9d0")})),y.A(_t).then((function(t){var e=t.documentElement.cloneNode(!0),n=l.current.appendChild(e);y.w(n).attr("width","100%").attr("height","100%").attr("fill","#2cd9d0")}))}),[c]),Object(a.useEffect)((function(){var t,e,a,i=function t(){K(d.current)&&(window.removeEventListener("scroll",t),b(!0))};window.addEventListener("scroll",i),i(),f&&(j.includes(":")||(t=n,e=j,a=s.current,y.w(a).transition().duration(2e3).ease(y.h.exponent(3)).textTween((function(){return n=t,a=e,i=xt(e),function(t){return(n*(1-t)+a*t).toFixed(i)};var n,a,i}))))}),[j,n,f]),Object(h.jsxs)("div",{className:jt.a.container,ref:d,children:[Object(h.jsxs)("div",{className:jt.a.top,children:[Object(h.jsx)("div",{className:jt.a.svgIcon,ref:o}),Object(h.jsx)(E,{value:e,positive:r,className:jt.a.flexEnd})]}),Object(h.jsxs)("div",{className:jt.a.middle,children:[Object(h.jsx)("span",{ref:s,children:n||"00:03:27"}),Object(h.jsx)("span",{children:_})]}),Object(h.jsxs)("div",{className:jt.a.bottom,children:[Object(h.jsx)("span",{children:t.children}),Object(h.jsx)("div",{className:jt.a.helpIcon,ref:l})]})]})},mt=n.p+"static/media/fi-rr-book.f8977565.svg",Ot=n.p+"static/media/fi-rr-clock.04fbd2c6.svg",wt=n.p+"static/media/fi-rr-users.7a091b6e.svg",yt=n.p+"static/media/fi-rr-screen.8f5af3df.svg",Ct=n(64),Dt=n.n(Ct),At=n(6),kt=n.n(At),Lt=["#98DDCA","#D5ECC2","#FFD3B4","#FFAAA7","#EDCCDC"],St=Lt.map((function(t){return y.m(t,"#777")(.3)})),Nt=function(t,e){var n=t.id,a=t.theme,i=t.w,r=t.h,c=t.tickSize,o=(t.xTickDim,t.yMin,t.yMax,t.yTickDim,t.yTicks),l=t.margin,s=(t.width,t.height),d=t.xScale,u=t.yScale;t.line,t.animate;y.w("#".concat(n,"_tooltipTop")).empty()&&y.w("body").append("div").attr("class",kt.a.tooltipTop).attr("id","".concat(n,"_tooltipTop")).style("opacity",0).style("top","0px").style("left","0px").html("00/00/00");var p=y.w("#".concat(n,"_svg"));p.selectAll("*").remove(),p.attr("width",i).attr("height",r),p.append("g").attr("class",kt.a.xAxis).attr("id","".concat(n,"_xAxis")).attr("transform","translate(".concat(0,", ",s,")")).call(y.c(d).tickSize(c).tickFormat(y.z("%b"))).selectAll(".tick").selectAll("text").attr("id",(function(t,e){return y.z("%b%y")(t)}));p.append("g").attr("class",kt.a.yAxis).attr("id","".concat(n,"_yAxis")).attr("transform","translate(".concat(l.left,", ",0,")")).call(y.d(u).tickSize(c).ticks(o));var f=p.append("g");f.append("g").attr("class",kt.a.grid).attr("transform","translate(0,"+s+")").call(y.c(d).tickSize(-s).tickFormat("")),f.selectAll("line").attr("stroke",a.second),p.append("g").attr("id","".concat(n,"_pathGroup")),p.append("line").attr("id","".concat(n,"_YAxisHighlight"))},Et=function(t,e){var n=t.id,a=t.line,i=t.height,r=t.theme,c=t.xScale,o=t.yScale,l=t.yMin,s=(t.yMax,y.w("#".concat(n,"_svg"))),d=function(t){var e=t.getBoundingClientRect();return{top:e.top+window.pageYOffset,right:e.right+window.pageXOffset,bottom:e.bottom+window.pageYOffset,left:e.left+window.pageXOffset}}(s.node()),u=y.w("#".concat(n,"_tooltipTop")),p=u.node().getBoundingClientRect(),f=function(t){var a=b[t][0],i=y.z("%m/%d/%y")(e[0].pointData[t].x);u.style("left","".concat(d.left+a-p.width/2,"px")).style("top","".concat(d.top-p.height,"px")).html(i);var r=[];e.forEach((function(n,a){var i=o(n.pointData[t].y);e.forEach((function(e,c){if(a!==c&&!r.some((function(t){return t===a}))&&n.showing&&e.showing){var l=o(e.pointData[t].y);i+4>=l-4&&i<=l&&(r.push(a),r.push(c))}}))})),e.forEach((function(e,i){var c=y.w("#".concat(n,"_tooltip_").concat(i));if(e.showing){c.style("opacity","unset");var l=o(e.pointData[t].y),s=y.k(",")(e.pointData[t].y.toFixed(3)),p=r.findIndex((function(t){return t===i}));p=0===p||-1===p?6:50*p+6;var f=u.node().getBoundingClientRect();if(f.right>=d.right)p=-1*p-c.node().getBoundingClientRect().width;c.style("left","".concat(d.left+a+p,"px")).style("top","".concat(d.top+l-f.height/2,"px")).style("color",St[i]).html(s)}else c.style("opacity",0)}))},h=function(t){var a="".concat(n,"_pointMarkerGroup"),i=s.select("#".concat(a)),r=b[t][0];i.empty()?(i=s.append("g").attr("id",a).attr("class",kt.a.pointMarkers),e.forEach((function(e,n){i.append("g").attr("id","".concat(e.label,"_pointMarker")).attr("transform","translate(".concat(r,", ").concat(o(e.pointData[t].y),")")).attr("opacity",e.showing?1:0).append("circle").attr("fill","none").attr("stroke",St[n]).attr("stroke-width",2).attr("stroke-dasharray","2 2").attr("r",4)}))):e.forEach((function(e,n){var a=o(e.pointData[t].y);y.w("#".concat(e.label,"_pointMarker")).attr("transform","translate(".concat(r,", ").concat(a,")")).attr("opacity",e.showing?1:0)}))},b=[];e[0].pointData.forEach((function(t){var e,n;e=c(t.x),n=o(l),b.push([e,n])}));var v=y.a.from(b),j=function(t){var e=b[t][0],a="".concat(n,"_YAxisHighlight"),c=y.w("#".concat(a));c.empty()&&s.append("line").attr("id","".concat(a)),c.attr("x1",e).attr("x2",e).attr("y1",i).attr("y2",0).attr("stroke",r.third).attr("stroke-width",1).attr("stroke-dasharray",4)};s.on("mousemove",(function(t){var e=y.r(t),a=v.find(e[0],o(l));j(a),h(a),y.w("#".concat(n,"_tooltipTop")).style("opacity",1),y.x(".".concat(kt.a.tooltip)).style("opacity",1),f(a)})),s.on("mouseleave",(function(){var t=s.select("#".concat(n,"_pointMarkerGroup"));t.empty()||t.remove(),y.w("#".concat(n,"_YAxisHighlight")).remove(),y.w("#".concat(n,"_tooltipTop")).style("opacity",0),y.x(".".concat(kt.a.tooltip)).style("opacity",0)})),s.on("touchstart",(function(t){t.preventDefault();var e=y.s(t)[0],n=v.find(e[0],o(l));h(n),f(n),j(n),h(n),f(n),j(n)})).on("touchmove",(function(t){t.preventDefault();var e=y.s(t)[0],a=v.find(e[0],o(l));h(a),y.w("#".concat(n,"_tooltipTop")).style("opacity",1),y.x(".".concat(kt.a.tooltip)).style("opacity",1),f(a),j(a)})).on("touchend",(function(){var t=s.select("#".concat(n,"_pointMarkerGroup"));t.empty()||t.remove(),y.w("#".concat(n,"_YAxisHighlight")).remove(),y.w("#".concat(n,"_tooltipTop")).style("opacity",0),y.x(".".concat(kt.a.tooltip)).style("opacity",0)}));s.select("#".concat(n,"_pathGroup")).selectAll("path").data(e,(function(t){return t.label})).join((function(e){return function(e){var i=e.append("path").attr("fill","none").attr("stroke",(function(t,e){return Lt[e]})).attr("stroke-width","2").attr("stroke-linecap","round").attr("d",(function(t){return a(t.pointData)}));i.attr("data-len",(function(){return this.getTotalLength()})).attr("stroke-dasharray",(function(){var t=y.w(this).attr("data-len");return"".concat(t," ").concat(t)})).attr("stroke-dashoffset",(function(t){return t.showing?0:y.w(this).attr("data-len")})),e.each((function(t,e){y.w("#".concat(n,"_tooltip_").concat(e)).empty()&&y.w("body").append("div").attr("class",kt.a.tooltip).attr("id","".concat(n,"_tooltip_").concat(e)).style("opacity",0).style("top","0px").style("left","0px")})),t.animate&&i.attr("stroke-dasharray",(function(){var t=y.w(this).attr("data-len");return"".concat(t," ").concat(t)})).attr("stroke-dashoffset",(function(){return y.w(this).attr("data-len")})).transition().duration(1e3).attr("stroke-dashoffset",0)}(e)}),(function(t){!function(t){t.each((function(t){t.showing?y.w(this).transition().duration(1e3).attr("stroke-dashoffset",0):y.w(this).transition().duration(1e3).attr("stroke-dashoffset",(function(){return y.w(this).attr("data-len")}))}))}(t)}),(function(t){return function(t){t.transition().duration(1e3).attr("stroke-dashoffset",(function(){return y.w(this).attr("data-len")})).remove()}(t)}))},Mt=n(12),Tt=n.n(Mt),Ft=["#98DDCA","#D5ECC2","#FFD3B4","#FFAAA7","#EDCCDC"],Bt=function(t){var e=t.data,n=t.id,i=t.handleDataChange,r=Object(a.useRef)(),c=Object(a.useState)(!1),o=Object(M.a)(c,2),l=o[0],s=o[1],d=function(t){var n=Array.from(e),a=t.target.value,r=t.target.checked;n[a].showing=r,i(n)};return Object(a.useEffect)((function(){e.forEach((function(t,e){document.getElementById("".concat(n,"_").concat(t.label)).setAttribute("checked",!0)}))}),[e,n]),Object(h.jsxs)("div",{className:Tt.a.container,children:[Object(h.jsx)("button",{className:Tt.a.btn,type:"button",onClick:function(){s((function(t){return!t}))},ref:r,children:"Select Lines"}),Object(h.jsx)("ul",{className:Tt.a.options,style:{visibility:l?"visible":"hidden"},children:e.map((function(t,e){var a="".concat(n,"_").concat(t.label);return Object(h.jsxs)("li",{children:[Object(h.jsx)("input",{type:"checkbox",id:"".concat(a),name:t.label,value:e,onClick:d}),Object(h.jsx)("label",{htmlFor:"".concat(a),children:Object(h.jsxs)("div",{className:Tt.a.lineLegend,children:[Object(h.jsx)("div",{className:Tt.a.lineLabel,children:t.label}),Object(h.jsx)("div",{className:Tt.a.lineColor,style:{backgroundColor:Ft[e]}})]})})]},"".concat(a))}))})]})},Rt=function(t){for(var e=[],n=1,a=1;a<=12;a++)for(var i=1;i<=30;i++)if(2!==a||30!==i){var r=a<10?"0".concat(a):a,c=i<10?"0".concat(i):i,o={x:new Date("2020-".concat(r,"-").concat(c,"T00:00:00")),y:t(n)};e.push(o),n+=.1}return e},Vt=[{label:"line1",pointData:Rt((function(t){return 40*Math.sin(t)+50})),showing:!0},{label:"line2",pointData:Rt((function(t){return 40*Math.sin(t/20)+30})),showing:!0},{label:"line3",pointData:Rt((function(t){return 30*Math.cos(t/10)})),showing:!0},{label:"line4",pointData:Rt((function(t){return 30*Math.cos(t/20)})),showing:!0}],zt=(y.j,["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Dec"]),It={first:"steelblue",second:"#C0C0C0",third:"#2cd9d0"},Yt=function(t){var e=Object(a.useRef)(),n=Object(a.useState)(Vt),i=Object(M.a)(n,2),r=i[0],c=i[1],l=Object(a.useState)(!1),s=Object(M.a)(l,2),d=s[0],u=s[1],p=Object(o.c)((function(t){return t.resizeState.resized})),f=Object(a.useState)(!0),b=Object(M.a)(f,2),v=(b[0],b[1],Object(a.useCallback)((function(n){var a=y.w(e.current),i=a.select("svg"),c=parseFloat(a.style("width")),o=parseFloat(a.style("height")),l=J(i,zt[0]+""),s=y.p(r,(function(t){return y.p(t.pointData,(function(t){return t.y}))})),d=y.o(r,(function(t){return y.o(t.pointData,(function(t){return t.y}))})),u=y.y(0,d,10),p=J(i,u[u.length-1]+""),f={left:6+p.width+.02*c,right:l.width/2+.02*c,bottom:6+l.height,top:.05*o},h=c-f.right,b=o-f.bottom,v=y.v().domain([new Date("2020-01-01T00:00:00"),new Date("2020-12-30T00:00:00")]).range([f.left,h]).nice(),j=y.u().domain([s,d]).range([b,f.top]).nice(),_=y.n().x((function(t,e){return v(t.x)})).y((function(t,e){return j(t.y)})).curve(y.e.alpha(.5));return{id:t.id,theme:It,w:c,h:o,tickSize:6,xTickDim:l,yMin:s,yMax:d,yTickDim:p,yTicks:5,margin:f,width:h,height:b,xScale:v,yScale:j,line:_,animate:n}}),[t.id,r]));Object(a.useEffect)((function(){if(p&&!d){var t=v(!1);Nt(t)}else if(p&&d){var e=v(!1);Nt(e),Et(e,r)}}),[p,v,r,d]),Object(a.useEffect)((function(){if(!d){var t=v(!0);Nt(t);var n=function t(){K(e.current)&&(window.removeEventListener("scroll",t),u(!0))};window.addEventListener("scroll",n),n()}}),[v,d]),Object(a.useEffect)((function(){if(d){var t=v(!0);Et(t,r)}}),[r,v,d]);return Object(h.jsxs)(a.Fragment,{children:[Object(h.jsx)(Bt,{id:t.id,data:Vt,handleDataChange:function(t){c(t)}}),Object(h.jsx)("div",{className:Dt.a.container,ref:e,children:Object(h.jsx)("svg",{id:"".concat(t.id,"_svg")})})]})},Gt=function(){for(var t=[{label:"line2",pointData:[]}],e=1,n=1;n<=12;n++)for(var a=1;a<=30;a++)if(2!==n||30!==a){var i=n<10?"0".concat(n):n,r=a<10?"0".concat(a):a,c={x:new Date("2020-".concat(i,"-").concat(r,"T00:00:00")),y:Math.pow(e,3)};t[0].pointData.push(c),e+=.1}var o=["Label","Value","% from Total","% Change"],l=["Label1","80,000","20%"],s=["Label2","60,000","42%"],d=["Label3","3,400","12%"],p=["Label4","114,000","10%"];return Object(h.jsxs)("div",{className:u.a.container,children:[Object(h.jsxs)(b,{children:[Object(h.jsx)(_,{title:"Year Total",value:"49,836"}),Object(h.jsx)(L,{id:"lineChart1",data:t})]}),Object(h.jsxs)(b,{className:u.a.levelOneBlank,children:[Object(h.jsxs)(bt,{children:[Object(h.jsx)(gt,{lastValue:"43.19",value:"43.40%",percentValue:"".concat(12,"%"),positive:!0,icon:yt,children:"Rate of Something"}),Object(h.jsx)(gt,{lastValue:"4.20",value:"4.90",percentValue:"".concat(1.2,"%"),positive:!0,icon:mt,children:"Pages Read per Vist"})]}),Object(h.jsxs)(bt,{children:[Object(h.jsx)(gt,{lastValue:"200",value:"320K",percentValue:"".concat(2.1,"%"),positive:!1,icon:wt,children:"Monthly Visitors"}),Object(h.jsx)(gt,{value:"00:03:27",percentValue:"".concat(2.4,"%"),positive:!1,icon:Ot,children:"Avg. Time Spent"})]})]}),Object(h.jsxs)(b,{children:[Object(h.jsx)(_,{title:"Totals"}),Object(h.jsx)(W,{id:"pieChart1",data:{total:100,pieData:[{label:"label1",value:25},{label:"label2",value:25},{label:"label3",value:25},{label:"label4",value:25}]}})]}),Object(h.jsxs)(b,{className:u.a.levelOneGrowVertical,children:[Object(h.jsx)(_,{title:"Table Label"}),Object(h.jsxs)(V,{children:[Object(h.jsx)(m,{headers:o}),Object(h.jsx)(Y,{data:l,children:Object(h.jsx)(E,{value:"".concat(24,"%"),positive:!0})}),Object(h.jsx)(Y,{data:s,children:Object(h.jsx)(E,{value:"".concat(24,"%"),positive:!0})}),Object(h.jsx)(Y,{data:d,children:Object(h.jsx)(E,{value:"".concat(24,"%"),positive:!0})}),Object(h.jsx)(Y,{data:p,children:Object(h.jsx)(E,{value:"".concat(24,"%"),positive:!1})})]})]}),Object(h.jsxs)(b,{children:[Object(h.jsx)(_,{title:"Max Value",value:20}),Object(h.jsx)(pt,{id:"barChart1",data:[{label:"A",value:10},{label:"B",value:15},{label:"C",value:20},{label:"D",value:10},{label:"E",value:13},{label:"F",value:4},{label:"G",value:16}]})]}),Object(h.jsxs)(b,{className:u.a.levelOneBlank,children:[Object(h.jsxs)(bt,{children:[Object(h.jsx)(gt,{lastValue:"43.19",value:"43.40%",percentValue:"".concat(12,"%"),positive:!0,icon:yt,children:"Rate of Something"}),Object(h.jsx)(gt,{lastValue:"4.20",value:"4.90",percentValue:"".concat(1.2,"%"),positive:!0,icon:mt,children:"Pages Read per Vist"})]}),Object(h.jsxs)(bt,{children:[Object(h.jsx)(gt,{lastValue:"200",value:"320K",percentValue:"".concat(2.1,"%"),positive:!1,icon:wt,children:"Monthly Visitors"}),Object(h.jsx)(gt,{value:"00:03:27",percentValue:"".concat(2.4,"%"),positive:!1,icon:Ot,children:"Avg. Time Spent"})]})]}),Object(h.jsxs)(b,{children:[Object(h.jsx)(_,{className:u.a.dropDownSpace,title:"Year Total",value:"49,836"}),Object(h.jsx)(Yt,{id:"multiLineChart1"})]}),Object(h.jsxs)(b,{className:u.a.levelOneGrowVertical,children:[Object(h.jsx)(_,{title:"Table Label"}),Object(h.jsxs)(V,{children:[Object(h.jsx)(m,{headers:o}),Object(h.jsx)(Y,{data:l,children:Object(h.jsx)(E,{value:"".concat(24,"%"),positive:!0})}),Object(h.jsx)(Y,{data:s,children:Object(h.jsx)(E,{value:"".concat(24,"%"),positive:!0})}),Object(h.jsx)(Y,{data:d,children:Object(h.jsx)(E,{value:"".concat(24,"%"),positive:!0})}),Object(h.jsx)(Y,{data:p,children:Object(h.jsx)(E,{value:"".concat(24,"%"),positive:!1})})]})]})]})},Ht=n(65),Pt=n.n(Ht),Kt=n(66),Jt=n.n(Kt),Xt=function(){return Object(h.jsx)("div",{className:Jt.a.selectbar,children:"Mock Analytics Dashboard"})},Ut=function(){return Object(h.jsxs)("div",{className:Pt.a.main,children:[Object(h.jsx)(Xt,{}),Object(h.jsx)(Gt,{})]})},Qt=(n(43),n(26)),Zt=Object(Qt.b)({name:"charts",initialState:{resized:!1},reducers:{setResized:function(t,e){t.resized=e.payload}}}),Wt=Zt.actions,qt=Zt.reducer;var $t=function(){var t=Object(o.b)();return window.onresize=function(){t(Wt.setResized(!0)),t(Wt.setResized(!1))},Object(h.jsx)("div",{className:s.a.App,children:Object(h.jsx)("div",{className:s.a.layout,children:Object(h.jsx)(Ut,{})})})},te=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,188)).then((function(e){var n=e.getCLS,a=e.getFID,i=e.getFCP,r=e.getLCP,c=e.getTTFB;n(t),a(t),i(t),r(t),c(t)}))},ee=Object(Qt.a)({reducer:{resizeState:qt}});c.a.render(Object(h.jsx)(i.a.StrictMode,{children:Object(h.jsx)(o.a,{store:ee,children:Object(h.jsx)($t,{})})}),document.getElementById("root")),te()},27:function(t,e,n){t.exports={container:"PercentChange_container__2ASLI",arrowUp:"PercentChange_arrowUp__1WoH5",arrowDown:"PercentChange_arrowDown__2yyvd"}},28:function(t,e,n){t.exports={container:"DropDownMenu_container__5bQOh",btn:"DropDownMenu_btn__3vJvR",options:"DropDownMenu_options__1DcEQ"}},39:function(t,e,n){t.exports={App:"App_App__16ZpL",layout:"App_layout__1LipR"}},40:function(t,e,n){t.exports={container:"Headers_container__3LdGs",header:"Headers_header__3vThf"}},42:function(t,e,n){t.exports={container:"Row_container__2hmA0",row:"Row_row__2Ln26"}},43:function(t,e,n){t.exports={container:"SideBar_container__1ft4H",sidebar:"SideBar_sidebar__dmEA8"}},57:function(t,e,n){t.exports={container:"LevelOneContainer_container__1b5Wl"}},58:function(t,e,n){t.exports={container:"TitleCard_container__UO_J1"}},59:function(t,e,n){t.exports={container:"LineChart_container__2IKgB",tooltip:"LineChart_tooltip__3ui2X",tooltipInner:"LineChart_tooltipInner__3K3e8",tooltipArrow:"LineChart_tooltipArrow__1DKTD"}},6:function(t,e,n){t.exports={xAxis:"buildMultiLineChart_xAxis__1iLYC",yAxis:"buildMultiLineChart_yAxis__1a4i4",grid:"buildMultiLineChart_grid__2NNd2",svg:"buildMultiLineChart_svg__2O-de",tooltip:"buildMultiLineChart_tooltip__2u_RY",tooltipTop:"buildMultiLineChart_tooltipTop__nORYs",tooltipGroup:"buildMultiLineChart_tooltipGroup__sKxeV"}},60:function(t,e,n){t.exports={container:"Table_container__2ycDO"}},61:function(t,e,n){t.exports={container:"LegendColor_container__3rFSF"}},62:function(t,e,n){t.exports={container:"BarChart_container__2SEPi"}},63:function(t,e,n){t.exports={container:"QuadRowCard_container__3Fzwx"}},64:function(t,e,n){t.exports={container:"MultiLineChart_container__3ej4L"}},65:function(t,e,n){t.exports={main:"Main_main__1L4bc"}},66:function(t,e,n){t.exports={selectbar:"SelectionBar_selectbar__2KPlu"}},8:function(t,e,n){t.exports={xAxis:"buildLineChart_xAxis__3KYmU",yAxis:"buildLineChart_yAxis__3XVSa",grid:"buildLineChart_grid__33mdl",svg:"buildLineChart_svg__1zljM",tooltip:"buildLineChart_tooltip__2I8uK",tooltipTop:"buildLineChart_tooltipTop__2l4CK",tooltipBottom:"buildLineChart_tooltipBottom__31rZp"}},9:function(t,e,n){t.exports={container:"StatCard_container__IPgV5",top:"StatCard_top__1clFy",middle:"StatCard_middle__1pe-c",bottom:"StatCard_bottom__1b495",flexEnd:"StatCard_flexEnd__67D_H",helpIcon:"StatCard_helpIcon__3INBY",svgIcon:"StatCard_svgIcon__jkMZO"}}},[[187,1,2]]]);