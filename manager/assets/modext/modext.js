
/**
MODExt Revolution 1.0
Copyright (c) 2007-2008, Shaun McCormick
All rights reserved
MODx-specific JS extension for ExtJS 2.2

-------------

The MODExt JS extension is distributed under the terms of the GNU GPLv3 license.
It extends ExtJS, distributed under the Open Source GPL 3.0 license.

http://www.gnu.org/licenses/gpl.html

-------------

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
General Public License for more details.
*/
MODx.toolbar.ActionButtons=function(A){A=A||{};MODx.toolbar.ActionButtons.superclass.constructor.call(this,A);this.id=id;Ext.applyIf(A,{actions:{close:MODx.action.welcome},params:{}});if(A.loadStay==true){if(!A.items){A.items=[]}A.items.push(this.getStayMenu())}this.config=A;this.render("modAB")};Ext.extend(MODx.toolbar.ActionButtons,Ext.Toolbar,{id:"",buttons:[],options:{a_close:"welcome"},stay:"stay",create:function(){var a=arguments,l=a.length;for(var i=0;i<l;i++){var options=a[i];if(options=="-"){this.add(this,"-");continue}Ext.applyIf(options,{xtype:"button"});if(options.icon){options.cls="x-btn-icon bmenu"}if(options.button){this.add(this,options);continue}Ext.applyIf(options,{cls:"x-btn-text bmenu",scope:this});if(options.handler==null&&options.menu==null){options.handler=this.checkConfirm}else{if(options.handler){if(options.confirm){var f=options.handler;var c=options.confirm;var s=options.scope||this;options.handler=function(){Ext.Msg.confirm(_("warning"),c,function(e){if(e=="yes"){Ext.callback(f,this)}},s)}}}}var b=new Ext.Toolbar.Button(options);if(options.javascript){b.addListener("click",function(itm,e){if(!eval(itm.javascript)){e.stopEvent();e.preventDefault()}},this)}this.add(this,b);if(options.keys){var map=new Ext.KeyMap(Ext.get(document));var c=options.keys.length;for(var i=0;i<c;i++){var k=options.keys[i];Ext.applyIf(k,{scope:this,stopEvent:true,fn:function(e){this.checkConfirm(b,e)}});map.addBinding(k)}}}return false},checkConfirm:function(B,A){if(B.confirm!=null){this.confirm(B,function(){this.handleClick(B,A)},this)}else{this.handleClick(B,A)}return false},confirm:function(C,B,A){if(C.confirm==null){return true}Ext.Msg.confirm("",C.confirm,function(D){if(D=="yes"){if(B==null){return true}if(typeof (B)=="function"){Ext.callback(B,A||this,[C])}else{location.href=B}}},this)},checkOnComplete:function(B,C,A){if(C.hasListener("success")&&A.success){C.fireEvent("success",{r:A})}if(C.onComplete){Ext.callback(C.onComplete,C.onCompleteScope||this,[B,C,A]);if(C.reload){Ext.callback(this.reloadPage,this,[],1000)}Ext.Msg.hide();Ext.callback(this.redirectStay,this,[B,C,A],1000);return false}else{this.redirectStay(B,C,A)}},reloadPage:function(){location.href=location.href},handleClick:function(E,A){var C=this.config;switch(E.method){case"remote":MODx.util.Progress.reset();Ext.Msg.show({title:_("please_wait"),msg:_("saving"),width:240,progress:true,closable:false});if(C.formpanel!=undefined&&C.formpanel!=""&&C.formpanel!=null){C.form=Ext.getCmp(C.formpanel).getForm()}if(C.form!=undefined){if(C.form.isValid()){Ext.applyIf(C.params,{action:E.process,"modx-ab-stay":MODx.config.stay});C.form.submit({params:C.params,reset:false,scope:this,failure:function(G,F){MODx.form.Handler.errorExt(F.result,G)},success:function(G,F){MODx.util.Progress.time(5,MODx.util.Progress.id,_("refreshing_tree"));if(F.result.message!=""&&!E.onComplete){Ext.Msg.alert(_("success"),F.result.message,function(){if(this.checkOnComplete(C,E,F.result)){C.refreshTree?C.refreshTree.refresh():parent.Ext.get("modx_document_tree").refresh()}},this)}else{if(this.checkOnComplete(C,E,F.result)){C.refreshTree?C.refreshTree.refresh():parent.Ext.get("modx_document_tree").refresh()}}}})}else{Ext.Msg.alert(_("error"),_("correct_errors"))}}else{MODx.form.Handler.send(C.form_id,E.process,function(F,G,H){H=Ext.decode(H.responseText);if(H.success){MODx.util.Progress.time(5,MODx.util.Progress.id,_("refreshing_tree"));C.refreshTree?C.refreshTree.refresh():parent.Ext.get("modx_document_tree").refresh();this.checkOnComplete(C,E,H)}else{MODx.form.Handler.errorJSON(H)}},this)}break;default:var D=C.id||0;Ext.applyIf(E.params||{},C.baseParams||{});var B="index.php?id="+D+"&"+Ext.urlEncode(E.params);location.href=B;break}return false},checkStay:function(B,A){this.stay=B.value},redirectStay:function(C,D,B){C=this.config;Ext.applyIf(D.params||{},C.baseParams);var A=Ext.urlEncode(D.params);switch(MODx.config.stay){case"new":location.href="index.php?a="+C.actions["new"]+"&"+A;break;case"stay":if((D.process=="create"||D.process=="duplicate"||D.reload)&&B.object.id!=null){location.href="index.php?a="+C.actions.edit+"&id="+B.object.id+"&"+A}else{if(D.process=="delete"){location.href="index.php?a="+C.actions.cancel+"&"+A}else{Ext.Msg.hide()}}break;case"close":location.href="index.php?a="+C.actions.cancel+"&"+A;break}},loadStay:function(){this.add("-",this.getStayMenu()," "," "," ")},getStayMenu:function(){return{xtype:"switch",id:"stayMenu",activeItem:MODx.config.stay=="new"?0:1,items:[{tooltip:_("stay_new"),value:"new",menuIndex:0,iconCls:"icon-list-new"},{tooltip:_("stay"),value:"stay",menuIndex:1,iconCls:"icon-mark-active"},{tooltip:_("close"),value:"close",menuIndex:2,iconCls:"icon-mark-complete"}],listeners:{change:function(A,B){MODx.config.stay=B.value},scope:this,delay:10}}},refreshTreeNode:function(A,D,B){var C=parent.Ext.getCmp(A);C.refreshNode(D,B||false);return false}});Ext.reg("modx-actionbuttons",MODx.toolbar.ActionButtons);MODx.Component=function(A){A=A||{};MODx.Component.superclass.constructor.call(this,A);this.config=A;this._loadForm();this._loadActionButtons();if(this.config.tabs){this._loadTabs()}this._loadComponents()};Ext.extend(MODx.Component,Ext.Component,{fields:{},_loadForm:function(){if(!this.config.form){return false}this.form=new Ext.form.BasicForm(Ext.get(this.config.form),{errorReader:MODx.util.JSONReader});if(this.config.fields){for(var A in this.config.fields){var B=this.config.fields[A];if(B.xtype){B=Ext.ComponentMgr.create(B)}this.fields[A]=B;this.form.add(B)}}this.form.render()},_loadActionButtons:function(){if(!this.config.buttons){return false}this.ab=new MODx.toolbar.ActionButtons({form:this.form||null,formpanel:this.config.formpanel||null,actions:this.config.actions||null,id:this.config.id||null});if(!this.config.buttons){this.config.buttons=[]}var B=this.config.buttons.length;for(var C=0;C<B;C++){var A=this.config.buttons[C];if(A.refresh){A.onComplete=this.ab.refreshTreeNode.createDelegate(this,[A.refresh.tree,A.refresh.node,A.refresh.self||false])}this.ab.create(A)}if(this.config.loadStay){this.ab.loadStay()}},_loadTabs:function(){if(!this.config.tabs){return false}MODx.load({xtype:"modx-tabs",renderTo:this.config.tabs_div||"tabs_div",items:this.config.tabs})},_loadComponents:function(){if(!this.config.components){return false}var A=this.config.components.length;for(var B=0;B<A;B++){Ext.ComponentMgr.create(this.config.components[B])}}});Ext.reg("modx-component",MODx.Component);MODx.form.Handler=function(A){A=A||{};MODx.form.Handler.superclass.constructor.call(this,A)};Ext.extend(MODx.form.Handler,Ext.Component,{fields:[],send:function(E,A,D,C){var B=Ext.get(E);this.unhighlightFields();Ext.Ajax.request({url:B.dom.action+"?action="+A,params:Ext.Ajax.serializeForm(E),method:"post",scope:C||this,callback:D==null?this.handle:D});return false},handle:function(C,A,B){B=Ext.decode(B.responseText);if(!B.success){this.showError(B.message);return false}return true},highlightField:function(B){if(B.id!="undefined"&&B.id!="forEach"&&B.id!=""){Ext.get(B.id).dom.style.border="1px solid red";var A=Ext.get(B.id+"_error");if(A){A.innerHTML=B.msg}this.fields.push(B.id)}},unhighlightFields:function(){for(var B=0;B<this.fields.length;B++){Ext.get(this.fields[B]).dom.style.border="";var A=Ext.get(this.fields[B]+"_error");if(A){A.innerHTML=""}}this.fields=[]},errorJSON:function(B){if(B==""){return this.showError(B)}if(B.data!=null){for(var A=0;A<B.data.length;A++){this.highlightField(B.data[A])}}this.showError(B.message);return false},errorExt:function(A,B){this.unhighlightFields();if(A.errors!=null&&B){B.markInvalid(A.errors)}if(A.message!=undefined&&A.message!=""){this.showError(A.message)}else{MODx.msg.hide()}return false},unescapeJson:function(C){for(var D in C){if($type(C[D])=="object"){for(var B in C[D]){C[D][B]=unescape(C[D][B])}}else{if($type(C[D])=="string"){C[D]=unescape(C[D])}else{if($type(C[D])=="array"){for(var A=0;A<C[D].length;A++){for(var B in C[D][A]){C[D][A]=this.unescapeJson(C[D][A])}}}}}}return C},showError:function(A){A==""?MODx.msg.hide():MODx.msg.alert(_("error"),A,function(){})},closeError:function(){MODx.msg.hide()}});Ext.reg("modx-form-handler",MODx.form.Handler);MODx.DataView=function(A){A=A||{};this._loadStore(A);Ext.applyIf(A.listeners||{},{loadexception:{fn:this.onLoadException,scope:this},beforeselect:{fn:function(B){return B.store.getRange().length>0}},contextmenu:{fn:this._showContextMenu,scope:this}});Ext.applyIf(A,{store:this.store,singleSelect:true,overClass:"x-view-over",itemSelector:"div.thumb-wrap",emptyText:'<div style="padding:10px;">'+_("file_err_filter")+"</div>"});MODx.DataView.superclass.constructor.call(this,A);this.config=A;this.cm=new Ext.menu.Menu(Ext.id())};Ext.extend(MODx.DataView,Ext.DataView,{lookup:{},onLoadException:function(){this.getEl().update('<div style="padding:10px;">'+_("data_err_load")+"</div>")},_addContextMenuItem:function(items){var a=items,l=a.length;for(var i=0;i<l;i++){var options=a[i];if(options=="-"){this.cm.add("-");continue}if(options.handler){var h=eval(options.handler)}else{var h=function(itm,e){var o=itm.options;var id=this.cm.activeNode.id.split("_");id=id[1];var w=Ext.get("modx_content");if(o.confirm){Ext.Msg.confirm("",o.confirm,function(e){if(e=="yes"){var a=Ext.urlEncode(o.params||{action:o.action});var s="index.php?id="+id+"&"+a;if(w==null){location.href=s}else{w.dom.src=s}}},this)}else{var a=Ext.urlEncode(o.params);var s="index.php?id="+id+"&"+a;if(w==null){location.href=s}else{w.dom.src=s}}}}this.cm.add({id:options.id,text:options.text,scope:this,options:options,handler:h})}},_loadStore:function(A){this.store=new Ext.data.JsonStore({url:A.url,baseParams:A.baseParams||{action:"getList"},root:A.root||"results",fields:A.fields,listeners:{load:{fn:function(){this.select(0)},scope:this,single:true}}});this.store.load()},_showContextMenu:function(B,C,F,E){E.preventDefault();var D=this.lookup[F.id];var A=this.cm;A.removeAll();if(D.menu){this._addContextMenuItem(D.menu);A.show(F,"t?")}A.activeNode=F}});Ext.reg("modx-dataview",MODx.DataView);Ext.EventManager=function(){var Y,R,N=false;var O,X,H,T;var Q=Ext.lib.Event;var S=Ext.lib.Dom;var A="Ext";var K={};var P=function(c,E,b,a,Z){var e=Ext.id(c);if(!K[e]){K[e]={}}var d=K[e];if(!d[E]){d[E]=[]}var D=d[E];D.push({id:e,ename:E,fn:b,wrap:a,scope:Z});Q.on(c,E,a);if(E=="mousewheel"&&c.addEventListener){c.addEventListener("DOMMouseScroll",a,false);Q.on(window,"unload",function(){c.removeEventListener("DOMMouseScroll",a,false)})}if(E=="mousedown"&&c==document){Ext.EventManager.stoppedMouseDownEvent.addListener(a)}};var I=function(Z,b,f,h){Z=Ext.getDom(Z);var D=Ext.id(Z),g=K[D],E;if(g){var d=g[b],a;if(d){for(var c=0,e=d.length;c<e;c++){a=d[c];if(a.fn==f&&(!h||a.scope==h)){E=a.wrap;Q.un(Z,b,E);d.splice(c,1);break}}}}if(b=="mousewheel"&&Z.addEventListener&&E){Z.removeEventListener("DOMMouseScroll",E,false)}if(b=="mousedown"&&Z==document&&E){Ext.EventManager.stoppedMouseDownEvent.removeListener(E)}};var F=function(b){b=Ext.getDom(b);var d=Ext.id(b),c=K[d],E;if(c){for(var a in c){if(c.hasOwnProperty(a)){E=c[a];for(var Z=0,D=E.length;Z<D;Z++){Q.un(b,a,E[Z].wrap);E[Z]=null}}c[a]=null}delete K[d]}};var C=function(){if(!N){N=true;Ext.isReady=true;if(R){clearInterval(R)}if(Ext.isGecko||Ext.isOpera){document.removeEventListener("DOMContentLoaded",C,false)}if(Ext.isIE){var D=document.getElementById("ie-deferred-loader");if(D){D.onreadystatechange=null;D.parentNode.removeChild(D)}}if(Y){Y.fire();Y.clearListeners()}}};var B=function(){Y=new Ext.util.Event();if(Ext.isGecko||Ext.isOpera){document.addEventListener("DOMContentLoaded",C,false)}else{if(Ext.isIE){document.write('<script id="ie-deferred-loader" defer="defer" src="//:"><\/script>');var D=document.getElementById("ie-deferred-loader");D.onreadystatechange=function(){if(this.readyState=="complete"){C()}}}else{if(Ext.isSafari){R=setInterval(function(){var E=document.readyState;if(E=="complete"){C()}},10)}}}Q.on(window,"load",C)};var W=function(E,Z){var D=new Ext.util.DelayedTask(E);return function(a){a=new Ext.EventObjectImpl(a);D.delay(Z.buffer,E,null,[a])}};var U=function(a,Z,D,E){return function(b){Ext.EventManager.removeListener(Z,D,E);a(b)}};var G=function(D,E){return function(Z){Z=new Ext.EventObjectImpl(Z);setTimeout(function(){D(Z)},E.delay||10)}};var M=function(Z,E,D,d,c){var e=(!D||typeof D=="boolean")?{}:D;d=d||e.fn;c=c||e.scope;var b=Ext.getDom(Z);if(!b){throw'Error listening for "'+E+'". Element "'+Z+"\" doesn't exist."}var a=function(g){g=Ext.EventObject.setEvent(g);var f;if(e.delegate){f=g.getTarget(e.delegate,b);if(!f){return }}else{f=g.target}if(e.stopEvent===true){g.stopEvent()}if(e.preventDefault===true){g.preventDefault()}if(e.stopPropagation===true){g.stopPropagation()}if(e.normalized===false){g=g.browserEvent}d.call(c||b,g,f,e)};if(e.delay){a=G(a,e)}if(e.single){a=U(a,b,E,d)}if(e.buffer){a=W(a,e)}d._handlers=d._handlers||[];d._handlers.push([Ext.id(b),E,a]);Q.on(b,E,a);if(E=="mousewheel"&&b.addEventListener){b.addEventListener("DOMMouseScroll",a,false);Q.on(window,"unload",function(){b.removeEventListener("DOMMouseScroll",a,false)})}if(E=="mousedown"&&b==document){Ext.EventManager.stoppedMouseDownEvent.addListener(a)}return a};var J=function(E,Z,e){var D=Ext.id(E),f=e._handlers,c=e;if(f){for(var a=0,d=f.length;a<d;a++){var b=f[a];if(b[0]==D&&b[1]==Z){c=b[2];f.splice(a,1);break}}}Q.un(E,Z,c);E=Ext.getDom(E);if(Z=="mousewheel"&&E.addEventListener){E.removeEventListener("DOMMouseScroll",c,false)}if(Z=="mousedown"&&E==document){Ext.EventManager.stoppedMouseDownEvent.removeListener(c)}};var L=/^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/;var V={addListener:function(Z,D,b,a,E){if(typeof D=="object"){var d=D;for(var c in d){if(L.test(c)){continue}if(typeof d[c]=="function"){M(Z,c,d,d[c],d.scope)}else{M(Z,c,d[c])}}return }return M(Z,D,E,b,a)},removeListener:function(E,D,Z){return J(E,D,Z)},removeAll:function(D){return F(D)},onDocumentReady:function(Z,E,D){if(N){Y.addListener(Z,E,D);Y.fire();Y.clearListeners();return }if(!Y){B()}D=D||{};if(!D.delay){D.delay=1}Y.addListener(Z,E,D)},onWindowResize:function(Z,E,D){if(!O){O=new Ext.util.Event();X=new Ext.util.DelayedTask(function(){O.fire(S.getViewWidth(),S.getViewHeight())});Q.on(window,"resize",this.fireWindowResize,this)}O.addListener(Z,E,D)},fireWindowResize:function(){if(O){if((Ext.isIE||Ext.isAir)&&X){X.delay(50)}else{O.fire(S.getViewWidth(),S.getViewHeight())}}},onTextResize:function(a,Z,D){if(!H){H=new Ext.util.Event();var E=new Ext.Element(document.createElement("div"));E.dom.className="x-text-resize";E.dom.innerHTML="X";E.appendTo(document.body);T=E.dom.offsetHeight;setInterval(function(){if(E.dom.offsetHeight!=T){H.fire(T,T=E.dom.offsetHeight)}},this.textResizeInterval)}H.addListener(a,Z,D)},removeResizeListener:function(E,D){if(O){O.removeListener(E,D)}},fireResize:function(){if(O){O.fire(S.getViewWidth(),S.getViewHeight())}},ieDeferSrc:false,textResizeInterval:50};V.on=V.addListener;V.un=V.removeListener;V.stoppedMouseDownEvent=new Ext.util.Event();return V}();Ext.onReady=Ext.EventManager.onDocumentReady;Ext.onReady(function(){var B=Ext.getBody();if(!B){return }var A=[Ext.isIE?"ext-ie "+(Ext.isIE6?"ext-ie6":"ext-ie7"):Ext.isGecko?"ext-gecko":Ext.isOpera?"ext-opera":Ext.isSafari?"ext-safari":""];if(Ext.isMac){A.push("ext-mac")}if(Ext.isLinux){A.push("ext-linux")}if(Ext.isBorderBox){A.push("ext-border-box")}if(Ext.isStrict){var C=B.dom.parentNode;if(C){C.className+=" ext-strict"}}B.addClass(A.join(" "))});Ext.namespace("MODx.form");MODx.form.Handler=function(A){A=A||{};MODx.form.Handler.superclass.constructor.call(this,A)};Ext.extend(MODx.form.Handler,Ext.Component,{fields:[],send:function(E,A,D,C){var B=Ext.get(E);this.unhighlightFields();Ext.Ajax.request({url:B.dom.action+"?action="+A,params:Ext.Ajax.serializeForm(E),method:"post",scope:C||this,callback:D==null?this.handle:D});return false},handle:function(C,A,B){B=Ext.decode(B.responseText);if(!B.success){this.showError(B.message);return false}return true},highlightField:function(B){if(B.id!="undefined"&&B.id!="forEach"&&B.id!=""){Ext.get(B.id).dom.style.border="1px solid red";var A=Ext.get(B.id+"_error");if(A){A.innerHTML=B.msg}this.fields.push(B.id)}},unhighlightFields:function(){for(var B=0;B<this.fields.length;B++){Ext.get(this.fields[B]).dom.style.border="";var A=Ext.get(this.fields[B]+"_error");if(A){A.innerHTML=""}}this.fields=[]},errorJSON:function(B){if(B==""){return this.showError(B)}if(B.data!=null){for(var A=0;A<B.data.length;A++){this.highlightField(B.data[A])}}this.showError(B.message);return false},errorExt:function(A,B){this.unhighlightFields();if(A.errors!=null&&B){B.markInvalid(A.errors)}if(A.message!=undefined&&A.message!=""){this.showError(A.message)}else{MODx.msg.hide()}return false},unescapeJson:function(C){for(var D in C){if($type(C[D])=="object"){for(var B in C[D]){C[D][B]=unescape(C[D][B])}}else{if($type(C[D])=="string"){C[D]=unescape(C[D])}else{if($type(C[D])=="array"){for(var A=0;A<C[D].length;A++){for(var B in C[D][A]){C[D][A]=this.unescapeJson(C[D][A])}}}}}}return C},showError:function(A){A==""?MODx.msg.hide():MODx.msg.alert(_("error"),A,function(){})},closeError:function(){MODx.msg.hide()}});Ext.reg("modx-form-handler",MODx.form.Handler);var _hourfields,_minfields,_ampmfields,_datefields,_textfields,_comboboxes,_textareas,_radios,_checkboxes,_hiddens;Ext.onReady(function(){var E=Ext.DomHelper;_hourfields={};var D=new Ext.data.SimpleStore({fields:["hour"],data:[[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12]]});var C=Ext.get(Ext.query("select.hourfield"));C.each(function(H){var G=E.insertBefore(H,{tag:"span"});var I=new Ext.form.ComboBox({el:H.dom,store:D,displayField:"hour",mode:"local",triggerAction:"all",value:H.dom.value||1,forceSelection:true,selectOnFocus:true,editable:false,hiddenName:H.dom.name,typeAhead:false,width:50,validateOnBlur:false,transform:H.dom.id});var F=H.dom.onchange;if(F&&F!=undefined){I.on("change",F)}I.render(G);_hourfields[H.dom.id]=I});_minfields={};var B=new Ext.data.SimpleStore({fields:["min"],data:[["00"],["15"],["30"],["45"]]});var C=Ext.get(Ext.query("select.minutefield"));C.each(function(H){var G=E.insertBefore(H,{tag:"span"});var I=new Ext.form.ComboBox({el:H.dom,store:B,displayField:"min",mode:"local",triggerAction:"all",rowHeight:false,value:H.dom.value||"00",forceSelection:true,editable:false,transform:H.dom.id,hiddenName:H.dom.name,typeAhead:false,width:50});var F=H.dom.onchange;if(F&&F!=undefined){I.on("change",F)}I.render(G);_minfields[H.dom.id]=I});_ampmfields={};var A=new Ext.data.SimpleStore({fields:["min"],data:[["am"],["pm"]]});var C=Ext.get(Ext.query("select.ampmfield"));C.each(function(H){var G=E.insertBefore(H,{tag:"span"});var I=new Ext.form.ComboBox({el:H.dom,store:A,displayField:"min",mode:"local",triggerAction:"all",rowHeight:false,value:H.dom.value||"am",forceSelection:true,editable:false,transform:H.dom.id,hiddenName:H.dom.name,typeAhead:false,width:50});var F=H.dom.onchange;if(F&&F!=undefined){I.on("change",F)}I.render(G);_ampmfields[H.dom.id]=I});_textfields={};var C=Ext.get(Ext.query("input.textfield"));C.each(function(H){var G=E.insertBefore(H,{tag:"span"});var J=H.getAttributeNS("modx","allowblank");var I=new Ext.form.TextField({width:H.getAttributeNS("modx","width")||300,maxLength:H.getAttributeNS("modx","maxlength"),inputType:H.getAttributeNS("modx","inputtype")||"text",allowBlank:J&&J==false?false:true,applyTo:H.dom.id});var F=H.dom.onchange;if(F&&F!=undefined){I.on("change",F)}_textfields[H.dom.id]=I});_comboboxes={};var C=Ext.get(Ext.query("select.combobox"));C.each(function(J){var I=E.insertBefore(J,{tag:"span"});var H=J.getAttributeNS("modx","editable");var F=J.getAttributeNS("modx","forceselection");var K=new Ext.form.ComboBox({el:J.dom,value:J.dom.value,forceSelection:F&&F==false?false:true,typeAhead:J.getAttributeNS("modx","typeahead")?true:false,editable:H&&H==false?false:true,triggerAction:"all",transform:J.dom.id,hiddenName:J.dom.name,width:J.getAttributeNS("modx","width"),listWidth:J.getAttributeNS("modx","listwidth")||300});var G=J.dom.onchange;if(G&&G!=undefined){K.on("blur",G)}K.render(I);_comboboxes[J.dom.id]=K});_textareas={};var C=Ext.get(Ext.query("textarea.textarea"));C.each(function(H){var G=E.insertBefore(H,{tag:"span"});var I=new Ext.form.TextArea({grow:H.getAttributeNS("modx","grow")?true:false,width:H.getAttributeNS("modx","width"),applyTo:H.dom.id});var F=H.dom.onchange;if(F&&F!=undefined){I.on("change",F)}_textareas[H.dom.id]=I});_datefields={};var C=Ext.get(Ext.query("input.datefield"));C.each(function(H){var G=E.insertBefore(H,{tag:"span"});var I=H.getAttributeNS("modx","format");var J=new Ext.form.DateField({el:H.dom,value:H.dom.value,allowBlank:H.getAttributeNS("modx","allowblank")?true:false,format:I&&I!=undefined?I:"d-m-Y H:i:s"});var F=H.dom.onchange;if(F&&F!=undefined){J.on("change",F)}J.render(G);_datefields[H.dom.id]=J});_radios={};var C=Ext.get(Ext.query("input.radio"));C.each(function(G){var H=new Ext.form.Radio({name:G.dom.name,value:G.dom.value,boxLabel:G.dom.title,checked:G.dom.checked,disabled:G.dom.disabled?true:false,inputType:"radio",applyTo:G.dom.id});var F=G.dom.onchange;if(F&&F!=undefined){H.on("change",F)}_radios[G.dom.id]=H});_checkboxes={};var C=Ext.get(Ext.query("input.checkbox"));C.each(function(G){var H=new Ext.form.Radio({name:G.dom.name,value:G.dom.value,boxLabel:G.dom.title,checked:G.dom.checked,disabled:G.dom.disabled?true:false,inputType:"checkbox",applyTo:G.dom.id});var F=G.dom.onchange;if(F&&F!=undefined){H.on("change",F)}_checkboxes[G.dom.id]=H});_hiddens={};var C=Ext.get(Ext.query("input.hidden"));C.each(function(F){var G=new Ext.form.Field({name:F.dom.name,value:F.dom.value,inputType:"hidden",width:0,labelSeparator:"",applyTo:F.dom.id});_hiddens[F.dom.id]=G})});Ext.Spotlight=function(A){Ext.apply(this,A)};Ext.Spotlight.prototype={active:false,animate:true,animated:false,duration:0.25,easing:"easeNone",createElements:function(){var A=Ext.getBody();this.right=A.createChild({cls:"x-spotlight"});this.left=A.createChild({cls:"x-spotlight"});this.top=A.createChild({cls:"x-spotlight"});this.bottom=A.createChild({cls:"x-spotlight"});this.all=new Ext.CompositeElement([this.right,this.left,this.top,this.bottom])},show:function(B,C,A){if(this.animated){this.show.defer(50,this,[B,C,A]);return }this.el=Ext.get(B);if(!this.right){this.createElements()}if(!this.active){this.all.setDisplayed("");this.applyBounds(true,false);this.active=true;Ext.EventManager.onWindowResize(this.syncSize,this);this.applyBounds(false,this.animate,false,C,A)}else{this.applyBounds(false,false,false,C,A)}},hide:function(B,A){if(this.animated){this.hide.defer(50,this,[B,A]);return }Ext.EventManager.removeResizeListener(this.syncSize,this);this.applyBounds(true,this.animate,true,B,A)},doHide:function(){this.active=false;this.all.setDisplayed(false)},syncSize:function(){this.applyBounds(false,false)},applyBounds:function(D,C,I,H,J){var G=this.el.getRegion();var A=Ext.lib.Dom.getViewWidth(true);var F=Ext.lib.Dom.getViewHeight(true);var E=0,B=false;if(C){B={callback:function(){E++;if(E==4){this.animated=false;if(I){this.doHide()}Ext.callback(H,J,[this])}},scope:this,duration:this.duration,easing:this.easing};this.animated=true}this.right.setBounds(G.right,D?F:G.top,A-G.right,D?0:(F-G.top),B);this.left.setBounds(0,0,G.left,D?0:G.bottom,B);this.top.setBounds(D?A:G.left,0,D?0:A-G.left,G.top,B);this.bottom.setBounds(0,G.bottom,D?0:G.right,F-G.bottom,B);if(!C){if(I){this.doHide()}if(H){Ext.callback(H,J,[this])}}},destroy:function(){this.doHide();Ext.destroy(this.right,this.left,this.top,this.bottom);delete this.el;delete this.all}};Ext.SwitchButton=Ext.extend(Ext.Component,{initComponent:function(){Ext.SwitchButton.superclass.initComponent.call(this);var A=new Ext.util.MixedCollection();A.addAll(this.items);this.items=A;this.addEvents("change");if(this.handler){this.on("change",this.handler,this.scope||this)}},onRender:function(E,D){var A=document.createElement("table");A.cellSpacing=0;A.className="x-rbtn";A.id=this.id;var K=document.createElement("tr");A.appendChild(K);var F=this.items.length;var H=F-1;this.activeItem=this.items.get(this.activeItem);for(var B=0;B<F;B++){var J=this.items.itemAt(B);var G=K.appendChild(document.createElement("td"));G.id=this.id+"-rbi-"+B;var I=B==0?"x-rbtn-first":(B==H?"x-rbtn-last":"x-rbtn-item");J.baseCls=I;if(this.activeItem==J){I+="-active"}G.className=I;var C=document.createElement("button");C.innerHTML="&#160;";C.className=J.iconCls;C.qtip=J.tooltip;G.appendChild(C);J.cell=G}this.el=Ext.get(E.dom.appendChild(A));this.el.on("click",this.onClick,this)},getActiveItem:function(){return this.activeItem},setActiveItem:function(A){if(typeof A!="object"&&A!==null){A=this.items.get(A)}var B=this.getActiveItem();if(A!=B){if(B){Ext.fly(B.cell).removeClass(B.baseCls+"-active")}if(A){Ext.fly(A.cell).addClass(A.baseCls+"-active")}this.activeItem=A;this.fireEvent("change",this,A)}return A},onClick:function(B){var A=B.getTarget("td",2);if(!this.disabled&&A){this.setActiveItem(parseInt(A.id.split("-rbi-")[1],10))}}});Ext.reg("switch",Ext.SwitchButton);Ext.namespace("MODx.util.Progress");MODx.util.LoadingBox=function(A){A=A||{};Ext.Ajax.on("beforerequest",this.show,this);Ext.Ajax.on("requestcomplete",this.hide,this);Ext.Ajax.on("requestexception",this.hide,this)};Ext.override(MODx.util.LoadingBox,{enabled:true,hide:function(){if(this.enabled){Ext.Msg.hide()}},show:function(){if(this.enabled){Ext.Msg.show({title:_("please_wait"),msg:_("loading"),width:240,progress:true,closable:false})}},disable:function(){this.enabled=false},enable:function(){this.enabled=true}});Ext.reg("modx-loading-box",MODx.util.LoadingBox);MODx.util.JSONReader=function(A){A=A||{};Ext.applyIf(A,{successProperty:"success",totalProperty:"total",root:"data"});MODx.util.JSONReader=new Ext.data.JsonReader(A,["id","msg"])};Ext.reg("modx-json-reader",MODx.util.JSONReader);MODx.util.Progress={id:0,time:function(A,C,B){B=B||_("saving");if(MODx.util.Progress.id==C&&A<11){Ext.MessageBox.updateProgress(A/10,B)}},reset:function(){MODx.util.Progress.id=MODx.util.Progress.id+1}};MODx.StaticTextField=Ext.extend(Ext.form.TextField,{fieldClass:"x-static-text-field",onRender:function(){this.readOnly=true;this.disabled=!this.initialConfig.submitValue;MODx.StaticTextField.superclass.onRender.apply(this,arguments)}});Ext.reg("statictextfield",MODx.StaticTextField);MODx.StaticBoolean=Ext.extend(Ext.form.TextField,{fieldClass:"x-static-text-field",onRender:function(A){this.readOnly=true;this.disabled=!this.initialConfig.submitValue;MODx.StaticBoolean.superclass.onRender.apply(this,arguments);this.on("change",this.onChange,this)},setValue:function(A){if(A==1){this.addClass("green");A=_("yes")}else{this.addClass("red");A=_("no")}MODx.StaticBoolean.superclass.setValue.apply(this,arguments)}});Ext.reg("staticboolean",MODx.StaticBoolean);function $(B){if(!B){return null}var A=Ext.type(B);if(A=="string"){B=document.getElementById(B);A=(B)?"element":false}if(A!="element"){return null}return B}Array.prototype.in_array=function(A){for(var C=0,B=this.length;C<B;C++){if(this[C]==A){return true}}return false};Ext.form.setCheckboxValues=function(B,E,A){var C,D=0;while((C=B.findField(E+D))!=null){C.setValue((A&(1<<D))?"true":"false");D++}};Ext.form.getCheckboxMask=function(D){var B="";if(typeof (D)!="undefined"){if((typeof (D)=="string")){B=D+""}else{for(var C=0,A=D.length;C<A;C++){B+=(B!=""?",":"")+(D[C]-0)}}}return B};Ext.form.BasicForm.prototype.append=function(){var C=new Ext.form.Layout();var A=[];C.stack.push.apply(C.stack,arguments);for(var B=0;B<arguments.length;B++){if(arguments[B].isFormField){A.push(arguments[B])}}C.render(this.el);if(A.length>0){this.items.addAll(A);for(var B=0;B<A.length;B++){A[B].render("x-form-el-"+A[B].id)}}return this};Ext.form.AMPMField=function(B,A){return new Ext.form.ComboBox({store:new Ext.data.SimpleStore({fields:["ampm"],data:[["am"],["pm"]]}),displayField:"ampm",hiddenName:B,mode:"local",editable:false,forceSelection:true,triggerAction:"all",width:60,value:A||"am"})};Ext.form.HourField=function(C,B,A){return new Ext.form.ComboBox({store:new Ext.data.SimpleStore({fields:["hour"],data:[[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12]]}),displayField:"hour",mode:"local",triggerAction:"all",width:60,forceSelection:true,rowHeight:false,editable:false,value:A||1,transform:C})};Ext.override(Ext.tree.TreeNodeUI,{hasClass:function(B){var A=Ext.fly(this.elNode);return B&&(" "+A.dom.className+" ").indexOf(" "+B+" ")!=-1}});Ext.override(Ext.form.Action.Submit,{handleResponse:function(D){var B=Ext.decode(D.responseText);if(this.form.errorReader){var C=this.form.errorReader.read(D);var G=[];if(C.records){for(var E=0,A=C.records.length;E<A;E++){var F=C.records[E];G[E]=F.data}}if(G.length<1){G=null}return{success:C.success,message:B.message,object:B.object,errors:G}}return Ext.decode(D.responseText)}});Ext.form.ColorField=function(A){Ext.form.ColorField.superclass.constructor.call(this,A);this.on("render",this.handleRender)};Ext.extend(Ext.form.ColorField,Ext.form.TriggerField,{showHexValue:true,triggerClass:"x-form-color-trigger",defaultAutoCreate:{tag:"input",type:"text",size:"10",autocomplete:"off",maxlength:"6"},lengthText:"Color hex values must be either 3 or 6 characters.",blankText:"Must have a hexidecimal value in the format ABCDEF.",defaultColor:"",maskRe:/[a-f0-9]/i,regex:/[a-f0-9]/i,curColor:"",validateValue:function(A){if(!this.showHexValue){return true}if(A.length<1){this.el.setStyle({"background-color":"#"+this.defaultColor});if(!this.allowBlank){this.markInvalid(String.format(this.blankText,A));return false}return true}this.setColor(A);return true},validateBlur:function(){return !this.menu||!this.menu.isVisible()},markInvalid:function(A){Ext.form.ColorField.superclass.markInvalid.call(this,A);this.el.setStyle({"background-image":"url(../lib/resources/images/default/grid/invalid_line.gif)"})},getValue:function(){return this.curValue||this.defaultValue||"FFFFFF"},setValue:function(A){Ext.form.ColorField.superclass.setValue.call(this,A);this.setColor(A)},setColor:function(A){this.curColor=A;h=A.substr(0,1)!="#"?"#"+A:A;this.el.setStyle({"background-color":h,"background-image":"none"});if(!this.showHexValue){}},handleRender:function(){this.setDefaultColor()},setDefaultColor:function(){this.setValue(this.defaultColor)},menuListeners:{select:function(A,B){this.setValue(B)},show:function(){this.onFocus()},hide:function(){this.focus();var A=this.menuListeners;this.menu.un("select",A.select,this);this.menu.un("show",A.show,this);this.menu.un("hide",A.hide,this)}},handleSelect:function(B,A){this.setValue(A)},onTriggerClick:function(){if(this.disabled){return }if(this.menu==null){this.menu=new Ext.menu.ColorMenu();this.menu.palette.on("select",this.handleSelect,this)}this.menu.on(Ext.apply({},this.menuListeners,{scope:this}));this.menu.show(this.el,"tl-bl?")}});Ext.form.Field.prototype.afterRender=Ext.form.Field.prototype.afterRender.createSequence(function(){if(this.description){Ext.QuickTips.register({target:this.getEl(),text:this.description,enabled:true});var A=Ext.form.Field.findLabel(this);if(A){Ext.QuickTips.register({target:A,text:this.description,enabled:true})}}});Ext.applyIf(Ext.form.Field,{findLabel:function(C){var B=null;var A=null;B=C.getEl().up("div.x-form-element");if(B){A=B.child("label")}if(A){return A}B=C.getEl().up("div.x-form-item");if(B){A=B.child("label")}if(A){return A}}});Ext.onReady(function(){MODx.util.LoadingBox=MODx.load({xtype:"modx-loading-box"});MODx.util.JSONReader=MODx.load({xtype:"modx-json-reader"});MODx.form.Handler=MODx.load({xtype:"modx-form-handler"});MODx.msg=MODx.load({xtype:"modx-msg"})});