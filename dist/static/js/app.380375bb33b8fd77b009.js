webpackJsonp([9,7],{0:function(t,e,s){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var r=s(319),u=n(r),o=s(63),a=n(o),i=s(469),d=n(i),l=s(468),c=n(l),f=s(375),p=n(f),j=s(5),v=n(j);v.default.use(p.default),v.default.use(c.default),v.default.http.options.root="/internal/api/v1",v.default.http.headers.common.Authorization=window.localStorage.token||"",d.default.forEach(function(t){v.default.http.interceptors.push(t)}),(0,a.default)(v.default.resource),document.body.addEventListener("touchstart",function(){}),u.default.run(),window.onload=function(){document.getElementById("loading").style.display="none"}},45:function(t,e){},63:function(t,e,s){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function r(t){e.sessions=a=t("sessions",{},{},x),e.accounts=i=t("accounts",{},{},x),e.products=d=t("virtual_assets/all",{},{},x),e.registerProducts=l=t("registered_products",{},{},x),e.subsist=c=t("statistics/balance",{},{},x),e.stock=f=t("statistics/balance/breakdown",{},{},x),e.liquidation=p=t("virtual_assets/settlement",{},{},x),e.updatedProducts=y=t("virtual_assets/updated",{},{},x),e.essentialInformation=j=t("virtual_assets{/virtual_asset_id}/detail",{},{},x),e.productLiquidation=v=t("virtual_assets{/virtual_asset_id}/settlement",{},{},x),e.update=m=t("virtual_assets{/virtual_asset_id}/updated",{},{},x),e.productExecute=h=t("virtual_assets{/virtual_asset_id}/execute",{},{},x),e.productStock=b=t("virtual_assets{/virtual_asset_id}/balance/trends",{},{},x),e.registeredProducts=g=t("virtual_assets{/virtual_asset_id}/registered_products",{},{},x),e.investor=_=t("registered_products{/registered_product_id}/investors",{},{},x),e.fees=k=t("virtual_assets{/virtual_asset_id}/fees",{},{},x)}Object.defineProperty(e,"__esModule",{value:!0}),e.fees=e.investor=e.registeredProducts=e.productStock=e.productExecute=e.update=e.productLiquidation=e.essentialInformation=e.updatedProducts=e.liquidation=e.stock=e.subsist=e.products=e.registerProducts=e.accounts=e.sessions=void 0,e.default=r;var u=s(5),o=n(u),a=void 0,i=void 0,d=void 0,l=void 0,c=void 0,f=void 0,p=void 0,j=void 0,v=void 0,m=void 0,h=void 0,b=void 0,g=void 0,_=void 0,k=void 0,y=void 0,w={},x={before:function(t){var e=o.default.url(t.url,t.params);w[e]&&w[e].abort(),w[e]=t}};e.sessions=a,e.accounts=i,e.registerProducts=l,e.products=d,e.subsist=c,e.stock=f,e.liquidation=p,e.updatedProducts=y,e.essentialInformation=j,e.productLiquidation=v,e.update=m,e.productExecute=h,e.productStock=b,e.registeredProducts=g,e.investor=_,e.fees=k},196:function(t,e){},319:function(t,e,s){(function(t){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.router=void 0;var r=s(5),u=n(r),o=s(435),a=n(o),i=s(470),d=n(i),l=s(410),c=n(l),f=s(320),p=n(f);u.default.use(a.default);var j=new a.default({mode:"history",base:t,scrollBehavior:function(t,e,s){if(s)return s},routes:d.default});j.beforeEach(function(t,e,s){void 0!==t.name&&document.body.setAttribute("class",t.name);var n=p.default.getters.user,r=p.default.getters.token;!t.meta.needLogin||r&&n.email||s({name:"login"}),s()}),j.afterEach(function(t){t.meta.title&&(document.title=t.meta.title)}),e.default={run:function(){new u.default({render:function(t){return t(c.default)},store:p.default,router:j}).$mount("#app")}},e.router=j}).call(e,"/")},320:function(t,e,s){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=s(5),u=n(r),o=s(113),a=n(o),i=s(473),d=n(i),l=s(472),c=n(l),f=s(471),p=n(f),j={user:JSON.parse(window.localStorage.user||"{}"),token:window.localStorage.token};u.default.use(a.default);var v=new a.default.Store({state:j,getters:c.default,mutations:d.default,actions:p.default});e.default=v},367:function(t,e){},410:function(t,e,s){var n,r;s(367);var u=s(426);r=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(r=n=n.default),"function"==typeof r&&(r=r.options),r.render=u.render,r.staticRenderFns=u.staticRenderFns,t.exports=n},426:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"app"},[s("router-view")],1)},staticRenderFns:[]}},436:function(t,e,s){function n(t){return s(r(t))}function r(t){return u[t]||function(){throw new Error("Cannot find module '"+t+"'.")}()}var u={"./af":201,"./af.js":201,"./ar":207,"./ar-dz":202,"./ar-dz.js":202,"./ar-ly":203,"./ar-ly.js":203,"./ar-ma":204,"./ar-ma.js":204,"./ar-sa":205,"./ar-sa.js":205,"./ar-tn":206,"./ar-tn.js":206,"./ar.js":207,"./az":208,"./az.js":208,"./be":209,"./be.js":209,"./bg":210,"./bg.js":210,"./bn":211,"./bn.js":211,"./bo":212,"./bo.js":212,"./br":213,"./br.js":213,"./bs":214,"./bs.js":214,"./ca":215,"./ca.js":215,"./cs":216,"./cs.js":216,"./cv":217,"./cv.js":217,"./cy":218,"./cy.js":218,"./da":219,"./da.js":219,"./de":221,"./de-at":220,"./de-at.js":220,"./de.js":221,"./dv":222,"./dv.js":222,"./el":223,"./el.js":223,"./en-au":224,"./en-au.js":224,"./en-ca":225,"./en-ca.js":225,"./en-gb":226,"./en-gb.js":226,"./en-ie":227,"./en-ie.js":227,"./en-nz":228,"./en-nz.js":228,"./eo":229,"./eo.js":229,"./es":231,"./es-do":230,"./es-do.js":230,"./es.js":231,"./et":232,"./et.js":232,"./eu":233,"./eu.js":233,"./fa":234,"./fa.js":234,"./fi":235,"./fi.js":235,"./fo":236,"./fo.js":236,"./fr":239,"./fr-ca":237,"./fr-ca.js":237,"./fr-ch":238,"./fr-ch.js":238,"./fr.js":239,"./fy":240,"./fy.js":240,"./gd":241,"./gd.js":241,"./gl":242,"./gl.js":242,"./he":243,"./he.js":243,"./hi":244,"./hi.js":244,"./hr":245,"./hr.js":245,"./hu":246,"./hu.js":246,"./hy-am":247,"./hy-am.js":247,"./id":248,"./id.js":248,"./is":249,"./is.js":249,"./it":250,"./it.js":250,"./ja":251,"./ja.js":251,"./jv":252,"./jv.js":252,"./ka":253,"./ka.js":253,"./kk":254,"./kk.js":254,"./km":255,"./km.js":255,"./ko":256,"./ko.js":256,"./ky":257,"./ky.js":257,"./lb":258,"./lb.js":258,"./lo":259,"./lo.js":259,"./lt":260,"./lt.js":260,"./lv":261,"./lv.js":261,"./me":262,"./me.js":262,"./mi":263,"./mi.js":263,"./mk":264,"./mk.js":264,"./ml":265,"./ml.js":265,"./mr":266,"./mr.js":266,"./ms":268,"./ms-my":267,"./ms-my.js":267,"./ms.js":268,"./my":269,"./my.js":269,"./nb":270,"./nb.js":270,"./ne":271,"./ne.js":271,"./nl":273,"./nl-be":272,"./nl-be.js":272,"./nl.js":273,"./nn":274,"./nn.js":274,"./pa-in":275,"./pa-in.js":275,"./pl":276,"./pl.js":276,"./pt":278,"./pt-br":277,"./pt-br.js":277,"./pt.js":278,"./ro":279,"./ro.js":279,"./ru":280,"./ru.js":280,"./se":281,"./se.js":281,"./si":282,"./si.js":282,"./sk":283,"./sk.js":283,"./sl":284,"./sl.js":284,"./sq":285,"./sq.js":285,"./sr":287,"./sr-cyrl":286,"./sr-cyrl.js":286,"./sr.js":287,"./ss":288,"./ss.js":288,"./sv":289,"./sv.js":289,"./sw":290,"./sw.js":290,"./ta":291,"./ta.js":291,"./te":292,"./te.js":292,"./tet":293,"./tet.js":293,"./th":294,"./th.js":294,"./tl-ph":295,"./tl-ph.js":295,"./tlh":296,"./tlh.js":296,"./tr":297,"./tr.js":297,"./tzl":298,"./tzl.js":298,"./tzm":300,"./tzm-latn":299,"./tzm-latn.js":299,"./tzm.js":300,"./uk":301,"./uk.js":301,"./uz":302,"./uz.js":302,"./vi":303,"./vi.js":303,"./x-pseudo":304,"./x-pseudo.js":304,"./yo":305,"./yo.js":305,"./zh-cn":306,"./zh-cn.js":306,"./zh-hk":307,"./zh-hk.js":307,"./zh-tw":308,"./zh-tw.js":308};n.keys=function(){return Object.keys(u)},n.resolve=r,t.exports=n,n.id=436},468:function(t,e,s){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=s(20),u=n(r),o=s(2),a=n(o),i=s(434),d=n(i);e.default={install:function(t,e){t.filter("ktCurrency",function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"￥",s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return u.default.isNumber(t)?e+(0,d.default)(u.default.round(t,2)).format("0,0.00")+s:t}),t.filter("ktChangeData",function(t){return t||"-"}),t.filter("ktFlow",function(t){return t>0?t:-t}),t.filter("ktPercent",function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:100,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"%";return u.default.isNumber(t)?u.default.round(t*s,e).toFixed(e)+(n||""):""}),t.filter("ktRangePercent",function(t,e){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2;return t=u.default.isNumber(t)?u.default.round(t,s).toFixed(s):"",e=u.default.isNumber(e)?u.default.round(e,s).toFixed(s):"",t===e?t+"%":t+"-"+e+"%"}),t.filter("ktRound",function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return u.default.round(t,e)}),t.filter("ktAppend",function(t,e){return(u.default.isNil(t)?"":t)+e}),t.filter("ktPrepend",function(t,e){return e+(u.default.isNil(t)?"":t)}),t.filter("ktPositveNumber",function(t){return t>0&&u.default.isNumber(t)?"+"+t:t}),t.filter("ktNull",function(t,e){return t||e||"-"}),t.filter("moment",function(t,e){return(0,a.default)(t).format(e)})}}},469:function(t,e,s){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=s(321),u=n(r),o=s(196),a=(n(o),s(45)),i=(n(a),s(198)),d=n(i),l=s(5),c=n(l),f=s(20),p=n(f),j=s(320),v=n(j),m=[],h={type:"error"};e.default=[function(t,e){var s=c.default.url(t.url,t.params);t.cache=p.default.includes(m,s.split("?")[0]),!t.params.no_cache&&sessionStorage.getItem(s)?e({status:200,ok:!0,headers:{},statusText:"OK",data:sessionStorage.getItem(s)||"{}",body:sessionStorage.getItem(s)||"{}",json:function(){return JSON.parse(sessionStorage.getItem(s)||"{}")}}):e()},function(t,e){e(function(e){if(419===e.status||401===e.status)t.params.noNeedLogin?v.default.dispatch("logout",!0):(d.default.alert(e.body.error||e.body.errors||"无访问权限！","提示",h),v.default.dispatch("logout"));else if(400===e.status)d.default.alert(e.body.error||e.body.errors||"请求失败！","提示",h);else if(403===e.status)d.default.alert(e.body.error||e.body.errors||"您无此权限","提示",h);else if(500===e.status||502===e.status)d.default.alert("抱歉！服务器忙。","提示",h);else if(200===e.status&&t.cache){var s=c.default.url(t.url,t.params),n=p.default.isObject(e.body)?(0,u.default)(e.body):e.body;sessionStorage.setItem(s,n)}})}]},470:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=[{path:"/",redirect:"/ex/dashboard"},{path:"/login",name:"login",component:function(t){return s.e(2,function(e){var s=[e(421)];t.apply(null,s)}.bind(this))},meta:{title:"开通金融-交易所产品管理系统",needLogin:!1}},{path:"/ex",name:"ex",redirect:"/ex/dashboard",component:function(t){return s.e(5,function(e){var s=[e(420)];t.apply(null,s)}.bind(this))},children:[{path:"dashboard",name:"dashboard",component:function(t){return s.e(1,function(e){var s=[e(415)];t.apply(null,s)}.bind(this))},meta:{title:"开通金融-交易所产品管理系统-今日总览",needLogin:!0}},{path:"dashboard/:id",name:"productDashboard",component:function(t){return s.e(0,function(e){var s=[e(416)];t.apply(null,s)}.bind(this))},meta:{title:"开通金融-交易所产品管理系统-单个产品总览",needLogin:!0}},{path:"products",name:"products",redirect:"/ex/products/all",component:function(t){return s.e(6,function(e){var s=[e(417)];t.apply(null,s)}.bind(this))},children:[{path:"all",name:"productsAll",component:function(t){return s.e(3,function(e){var s=[e(418)];t.apply(null,s)}.bind(this))},meta:{title:"开通金融-交易所产品管理系统-产品总列表",needLogin:!0}},{path:"register",name:"productsRegister",component:function(t){return s.e(4,function(e){var s=[e(419)];t.apply(null,s)}.bind(this))},meta:{title:"开通金融-交易所产品管理系统-登记产品总列表",needLogin:!0}}]}]},{path:"*",redirect:"/"}]},471:function(t,e,s){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=s(71),u=n(r),o=s(69),a=n(o),i=s(321),d=n(i),l=s(319),c=s(63),f=s(5),p=n(f);e.default={updateUser:function(t){var e=t.commit,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};window.localStorage.user=(0,d.default)(s),e("updateUser",s)},updateToken:function(t){var e=t.commit,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";window.localStorage.token=s,p.default.http.headers.common.Authorization=s,e("updateToken",s)},getUser:function(t){var e=this,s=(t.commit,t.dispatch);return(0,a.default)(u.default.mark(function t(){var n;return u.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.accounts.get().then(function(t){return t.json()});case 2:return n=t.sent,s("updateUser",n.account),t.abrupt("return",n);case 5:case"end":return t.stop()}},t,e)}))()},login:function(t,e){var s=this,n=(t.commit,t.dispatch);return(0,a.default)(u.default.mark(function t(){var r;return u.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.sessions.save({},e).then(function(t){return t.json()});case 2:return r=t.sent,n("updateToken",r.token),n("getUser"),t.abrupt("return",r);case 6:case"end":return t.stop()}},t,s)}))()},logout:function(t,e){var s=t.commit;window.localStorage.user="{}",window.localStorage.token="",s("updateUser",{}),s("updateToken"),e||l.router.push({name:"login"})}}},472:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={user:function(t){return t.user},token:function(t){return t.token}}},473:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={updateUser:function(t,e){t.user=e},updateToken:function(t,e){t.token=e}}}});
//# sourceMappingURL=app.380375bb33b8fd77b009.js.map