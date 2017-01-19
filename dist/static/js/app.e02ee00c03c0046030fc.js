webpackJsonp([10,8],{0:function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}var r=n(297),o=s(r),a=n(31),u=s(a),i=n(431),d=s(i),l=n(430),c=s(l),f=n(631),p=s(f),m=n(5),j=s(m);j.default.use(p.default),j.default.use(c.default),j.default.http.options.root="/internal/api/v1",j.default.http.headers.common.Authorization=window.localStorage.token||"",d.default.forEach(function(t){j.default.http.interceptors.push(t)}),(0,u.default)(j.default.resource),document.body.addEventListener("touchstart",function(){}),o.default.run(),window.onload=function(){document.getElementById("loading").style.display="none"}},28:function(t,e){},31:function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}function r(t){e.sessions=u=t("sessions",{},{},O),e.accounts=i=t("accounts",{},{},O),e.products=d=t("virtual_assets/all",{},{},O),e.productOne=w=t("virtual_assets{/virtual_asset_id}{/action}",{},{},O),e.registerProducts=l=t("registered_products",{},{},O),e.subsist=c=t("statistics/balance",{},{},O),e.stock=f=t("statistics/balance/breakdown",{},{},O),e.liquidation=p=t("virtual_assets/settlement",{},{},O),e.updatedProducts=y=t("virtual_assets/updated",{},{},O),e.essentialInformation=m=t("virtual_assets{/virtual_asset_id}/detail",{},{},O),e.productLiquidation=j=t("virtual_assets{/virtual_asset_id}/settlement",{},{},O),e.update=v=t("virtual_assets{/virtual_asset_id}/updated",{},{},O),e.productExecute=h=t("virtual_assets{/virtual_asset_id}/execute",{},{},O),e.productStock=b=t("virtual_assets{/virtual_asset_id}/balance/trends",{},{},O),e.registeredProducts=g=t("virtual_assets{/virtual_asset_id}/registered_products",{},{},O),e.investors=_=t("registered_products{/registered_product_id}/investors",{},{},O),e.fees=k=t("virtual_assets{/virtual_asset_id}/fees",{},{},O),e.stockTrend=x=t("statistics/balance/trends",{},{},O),e.capitalTrend=z=t("statistics/fund/trends",{},{},O),e.consignees=P=t("consignees/list",{},{},O)}Object.defineProperty(e,"__esModule",{value:!0}),e.consignees=e.capitalTrend=e.stockTrend=e.fees=e.investors=e.registeredProducts=e.productStock=e.productExecute=e.update=e.productLiquidation=e.essentialInformation=e.updatedProducts=e.liquidation=e.stock=e.subsist=e.productOne=e.products=e.registerProducts=e.accounts=e.sessions=void 0,e.default=r;var o=n(5),a=s(o),u=void 0,i=void 0,d=void 0,l=void 0,c=void 0,f=void 0,p=void 0,m=void 0,j=void 0,v=void 0,h=void 0,b=void 0,g=void 0,_=void 0,k=void 0,y=void 0,w=void 0,x=void 0,z=void 0,P=void 0,S={},O={before:function(t){var e=a.default.url(t.url,t.params);S[e]&&S[e].abort(),S[e]=t}};e.sessions=u,e.accounts=i,e.registerProducts=l,e.products=d,e.productOne=w,e.subsist=c,e.stock=f,e.liquidation=p,e.updatedProducts=y,e.essentialInformation=m,e.productLiquidation=j,e.update=v,e.productExecute=h,e.productStock=b,e.registeredProducts=g,e.investors=_,e.fees=k,e.stockTrend=x,e.capitalTrend=z,e.consignees=P},90:function(t,e){},297:function(t,e,n){(function(t){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.router=void 0;var r=n(5),o=s(r),a=n(632),u=s(a),i=n(432),d=s(i),l=n(605),c=s(l),f=n(298),p=s(f);o.default.use(u.default);var m=new u.default({mode:"history",base:t,scrollBehavior:function(t,e,n){return n?n:{x:0,y:0}},routes:d.default});m.beforeEach(function(t,e,n){void 0!==t.name&&document.body.setAttribute("class",t.name);var s=p.default.getters.user,r=p.default.getters.token;!t.meta.needLogin||r&&s.email||n({name:"login"}),n()}),m.afterEach(function(t){t.meta.title&&(document.title=t.meta.title)}),e.default={run:function(){new o.default({render:function(t){return t(c.default)},store:p.default,router:m}).$mount("#app")}},e.router=m}).call(e,"/")},298:function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(5),o=s(r),a=n(256),u=s(a),i=n(435),d=s(i),l=n(434),c=s(l),f=n(433),p=s(f);n(448);var m={user:JSON.parse(window.localStorage.user||"{}"),token:window.localStorage.token};o.default.use(u.default);var j=new u.default.Store({state:m,getters:c.default,mutations:d.default,actions:p.default});e.default=j},430:function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(22),o=s(r),a=n(2),u=s(a),i=n(600),d=s(i);e.default={install:function(t,e){t.filter("ktCurrency",function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"￥",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return o.default.isNumber(t)?e+(0,d.default)(o.default.round(t,2)).format("0,0.00")+n:t}),t.filter("ktFlow",function(t){return t>0?t:-t}),t.filter("ktPercent",function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:100,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"%";return o.default.isNumber(t)?o.default.round(t*n,e).toFixed(e)+(s||""):""}),t.filter("ktRangePercent",function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2;return t=o.default.isNumber(t)?o.default.round(t,n).toFixed(n):"",e=o.default.isNumber(e)?o.default.round(e,n).toFixed(n):"",t===e?t+"%":t+"-"+e+"%"}),t.filter("ktRound",function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return o.default.round(t,e).toFixed(2)}),t.filter("ktAppend",function(t,e){return(o.default.isNil(t)?"":t)+e}),t.filter("ktPrepend",function(t,e){return e+(o.default.isNil(t)?"":t)}),t.filter("ktPositveNumber",function(t){return t>0&&o.default.isNumber(t)?"+"+t:t}),t.filter("ktNull",function(t,e){return t||e||"-"}),t.filter("moment",function(t,e){return(0,u.default)(t).format(e)})}}},431:function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(299),o=s(r),a=n(90),u=(s(a),n(28)),i=(s(u),n(89)),d=s(i),l=n(5),c=s(l),f=n(22),p=s(f),m=n(298),j=s(m),v=[],h={type:"error"};e.default=[function(t,e){var n=c.default.url(t.url,t.params);t.cache=p.default.includes(v,n.split("?")[0]),!t.params.no_cache&&sessionStorage.getItem(n)?e({status:200,ok:!0,headers:{},statusText:"OK",data:sessionStorage.getItem(n)||"{}",body:sessionStorage.getItem(n)||"{}",json:function(){return JSON.parse(sessionStorage.getItem(n)||"{}")}}):e()},function(t,e){e(function(e){if(419===e.status||401===e.status)t.params.noNeedLogin?j.default.dispatch("logout",!0):(d.default.alert(e.body.error||e.body.errors||"无访问权限！","提示",h),j.default.dispatch("logout"));else if(400===e.status)d.default.alert(e.body.error||e.body.errors||"请求失败！","提示",h);else if(403===e.status)d.default.alert(e.body.error||e.body.errors||"您无此权限！","提示",h);else if(500===e.status||502===e.status)d.default.alert("抱歉！服务器忙。","提示",h);else if(200===e.status&&t.cache){var n=c.default.url(t.url,t.params),s=p.default.isObject(e.body)?(0,o.default)(e.body):e.body;sessionStorage.setItem(n,s)}})}]},432:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=[{path:"/",redirect:"/ex/dashboard"},{path:"/login",name:"login",component:function(t){return n.e(3,function(e){var n=[e(617)];t.apply(null,n)}.bind(this))},meta:{title:"开通金融-交易所产品管理系统",needLogin:!1}},{path:"/ex",name:"ex",redirect:"/ex/dashboard",component:function(t){return n.e(6,function(e){var n=[e(616)];t.apply(null,n)}.bind(this))},children:[{path:"dashboard",name:"dashboard",component:function(t){return n.e(0,function(e){var n=[e(610)];t.apply(null,n)}.bind(this))},meta:{title:"开通金融-交易所产品管理系统-今日总览",needLogin:!0,crumbs:[{name:"产品管理",to:{name:"ex"}},{name:"产品总览",to:{name:"dashboard"}}]}},{path:"dashboard/:id",name:"productDashboard",component:function(t){return n.e(1,function(e){var n=[e(611)];t.apply(null,n)}.bind(this))},meta:{title:"开通金融-交易所产品管理系统-单个产品总览",needLogin:!0,crumbs:[{name:"产品管理",to:{name:"ex"}},{name:"产品列表",to:{name:"products"}},{id:"productName",name:"产品总览",to:{name:"productDashboard"}}]}},{path:"products",name:"products",redirect:"/ex/products/all",component:function(t){return n.e(7,function(e){var n=[e(612)];t.apply(null,n)}.bind(this))},children:[{path:"all",name:"productsAll",component:function(t){return n.e(5,function(e){var n=[e(613)];t.apply(null,n)}.bind(this))},meta:{title:"开通金融-交易所产品管理系统-产品总列表",needLogin:!0,crumbs:[{name:"产品管理",to:{name:"ex"}},{name:"产品列表",to:{name:"products"}}]}},{path:":id/edit",name:"productForm",component:function(t){return n.e(2,function(e){var n=[e(614)];t.apply(null,n)}.bind(this))},meta:{title:"开通金融-交易所产品管理系统-产品表单",needLogin:!0,crumbs:[{name:"产品管理",to:{name:"ex"}},{name:"产品列表",to:{name:"products"}},{name:"编辑产品",id:"productName",to:{name:"productForm"}}]}}]},{path:"register_products",name:"productsRegister",component:function(t){return n.e(4,function(e){var n=[e(615)];t.apply(null,n)}.bind(this))},meta:{title:"开通金融-交易所产品管理系统-登记产品总列表",needLogin:!0,crumbs:[{name:"产品管理",to:{name:"ex"}},{name:"登记产品列表",to:{name:"productsRegister"}}]}}]},{path:"*",redirect:"/"}]},433:function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(33),o=s(r),a=n(32),u=s(a),i=n(299),d=s(i),l=n(297),c=n(31),f=n(5),p=s(f);e.default={updateUser:function(t){var e=t.commit,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};window.localStorage.user=(0,d.default)(n),e("updateUser",n)},updateToken:function(t){var e=t.commit,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";window.localStorage.token=n,p.default.http.headers.common.Authorization=n,e("updateToken",n)},getUser:function(t){var e=this,n=(t.commit,t.dispatch);return(0,u.default)(o.default.mark(function t(){var s;return o.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.accounts.get().then(function(t){return t.json()});case 2:return s=t.sent,n("updateUser",s.account),t.abrupt("return",s);case 5:case"end":return t.stop()}},t,e)}))()},login:function(t,e){var n=this,s=(t.commit,t.dispatch);return(0,u.default)(o.default.mark(function t(){var r;return o.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.sessions.save({},e).then(function(t){return t.json()});case 2:return r=t.sent,s("updateToken",r.token),s("getUser"),t.abrupt("return",r);case 6:case"end":return t.stop()}},t,n)}))()},logout:function(t,e){var n=t.commit;window.localStorage.user="{}",window.localStorage.token="",n("updateUser",{}),n("updateToken"),e||l.router.push({name:"login"})}}},434:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={user:function(t){return t.user},token:function(t){return t.token}}},435:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={updateUser:function(t,e){t.user=e},updateToken:function(t,e){t.token=e}}},598:function(t,e){},599:function(t,e,n){function s(t){return n(r(t))}function r(t){return o[t]||function(){throw new Error("Cannot find module '"+t+"'.")}()}var o={"./af":321,"./af.js":321,"./ar":327,"./ar-dz":322,"./ar-dz.js":322,"./ar-ly":323,"./ar-ly.js":323,"./ar-ma":324,"./ar-ma.js":324,"./ar-sa":325,"./ar-sa.js":325,"./ar-tn":326,"./ar-tn.js":326,"./ar.js":327,"./az":328,"./az.js":328,"./be":329,"./be.js":329,"./bg":330,"./bg.js":330,"./bn":331,"./bn.js":331,"./bo":332,"./bo.js":332,"./br":333,"./br.js":333,"./bs":334,"./bs.js":334,"./ca":335,"./ca.js":335,"./cs":336,"./cs.js":336,"./cv":337,"./cv.js":337,"./cy":338,"./cy.js":338,"./da":339,"./da.js":339,"./de":341,"./de-at":340,"./de-at.js":340,"./de.js":341,"./dv":342,"./dv.js":342,"./el":343,"./el.js":343,"./en-au":344,"./en-au.js":344,"./en-ca":345,"./en-ca.js":345,"./en-gb":346,"./en-gb.js":346,"./en-ie":347,"./en-ie.js":347,"./en-nz":348,"./en-nz.js":348,"./eo":349,"./eo.js":349,"./es":351,"./es-do":350,"./es-do.js":350,"./es.js":351,"./et":352,"./et.js":352,"./eu":353,"./eu.js":353,"./fa":354,"./fa.js":354,"./fi":355,"./fi.js":355,"./fo":356,"./fo.js":356,"./fr":359,"./fr-ca":357,"./fr-ca.js":357,"./fr-ch":358,"./fr-ch.js":358,"./fr.js":359,"./fy":360,"./fy.js":360,"./gd":361,"./gd.js":361,"./gl":362,"./gl.js":362,"./he":363,"./he.js":363,"./hi":364,"./hi.js":364,"./hr":365,"./hr.js":365,"./hu":366,"./hu.js":366,"./hy-am":367,"./hy-am.js":367,"./id":368,"./id.js":368,"./is":369,"./is.js":369,"./it":370,"./it.js":370,"./ja":371,"./ja.js":371,"./jv":372,"./jv.js":372,"./ka":373,"./ka.js":373,"./kk":374,"./kk.js":374,"./km":375,"./km.js":375,"./ko":376,"./ko.js":376,"./ky":377,"./ky.js":377,"./lb":378,"./lb.js":378,"./lo":379,"./lo.js":379,"./lt":380,"./lt.js":380,"./lv":381,"./lv.js":381,"./me":382,"./me.js":382,"./mi":383,"./mi.js":383,"./mk":384,"./mk.js":384,"./ml":385,"./ml.js":385,"./mr":386,"./mr.js":386,"./ms":388,"./ms-my":387,"./ms-my.js":387,"./ms.js":388,"./my":389,"./my.js":389,"./nb":390,"./nb.js":390,"./ne":391,"./ne.js":391,"./nl":393,"./nl-be":392,"./nl-be.js":392,"./nl.js":393,"./nn":394,"./nn.js":394,"./pa-in":395,"./pa-in.js":395,"./pl":396,"./pl.js":396,"./pt":398,"./pt-br":397,"./pt-br.js":397,"./pt.js":398,"./ro":399,"./ro.js":399,"./ru":400,"./ru.js":400,"./se":401,"./se.js":401,"./si":402,"./si.js":402,"./sk":403,"./sk.js":403,"./sl":404,"./sl.js":404,"./sq":405,"./sq.js":405,"./sr":407,"./sr-cyrl":406,"./sr-cyrl.js":406,"./sr.js":407,"./ss":408,"./ss.js":408,"./sv":409,"./sv.js":409,"./sw":410,"./sw.js":410,"./ta":411,"./ta.js":411,"./te":412,"./te.js":412,"./tet":413,"./tet.js":413,"./th":414,"./th.js":414,"./tl-ph":415,"./tl-ph.js":415,"./tlh":416,"./tlh.js":416,"./tr":417,"./tr.js":417,"./tzl":418,"./tzl.js":418,"./tzm":420,"./tzm-latn":419,"./tzm-latn.js":419,"./tzm.js":420,"./uk":421,"./uk.js":421,"./uz":422,"./uz.js":422,"./vi":423,"./vi.js":423,"./x-pseudo":424,"./x-pseudo.js":424,"./yo":425,"./yo.js":425,"./zh-cn":426,"./zh-cn.js":426,"./zh-hk":427,"./zh-hk.js":427,"./zh-tw":428,"./zh-tw.js":428};s.keys=function(){return Object.keys(o)},s.resolve=r,t.exports=s,s.id=599},605:function(t,e,n){var s,r;n(598);var o=n(630);r=s=s||{},"object"!=typeof s.default&&"function"!=typeof s.default||(r=s=s.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=s},630:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app"},[n("router-view")],1)},staticRenderFns:[]}}});
//# sourceMappingURL=app.e02ee00c03c0046030fc.js.map