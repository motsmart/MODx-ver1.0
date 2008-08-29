MODx.grid.Package=function(A){A=A||{};Ext.applyIf(A,{title:_("packages"),url:MODx.config.connectors_url+"workspace/packages.php",fields:["signature","created","updated","installed","state","workspace","provider","disabled","source","manifest","attributes","menu"],columns:[{header:_("package_signature"),dataIndex:"signature"},{header:_("created"),dataIndex:"created"},{header:_("updated"),dataIndex:"updated"},{header:_("installed"),dataIndex:"installed",renderer:this._rins},{header:_("package_state"),dataIndex:"state"},{header:_("workspace"),dataIndex:"workspace",editor:{xtype:"combo-workspace",renderer:true}},{header:_("provisioner"),dataIndex:"provider",editor:{xtype:"combo-provider",renderer:true}},{header:_("disabled"),dataIndex:"disabled",editor:{xtype:"combo-boolean",renderer:"boolean"}}],primaryKey:"signature",paging:true,autosave:true,tbar:[{text:_("package_add"),handler:{xtype:"window-package-installer"}}]});MODx.grid.Package.superclass.constructor.call(this,A)};Ext.extend(MODx.grid.Package,MODx.grid.Grid,{update:function(){Ext.Msg.alert(_("information"),"This feature is not yet implemented.")},_rins:function(A,B){switch(A){case"":case null:B.css="not-installed";return _("not_installed");default:B.css="";return A}},install:function(B){var C=this.menu.record;var A=MODx.load({xtype:"modx-console",baseParams:{register:C.signature,topic:"install"}});A.show(B);Ext.Ajax.request({url:url,params:{action:"install"},scope:this,success:function(D,E){D=Ext.decode(D.responseText);A.complete();if(D.success){}else{MODx.form.Handler.errorJSON(D)}}})}});Ext.reg("grid-package",MODx.grid.Package);MODx.window.PackageInstaller=function(A){A=A||{};Ext.applyIf(A,{title:_("package_retriever"),id:"window-package-installer",layout:"card",activeItem:0,closeAction:"hide",resizable:true,collapsible:true,maximizable:true,autoHeight:true,width:750,firstPanel:"pi-start",lastPanel:"pi-selpackage",defaults:{border:false},modal:true,bbar:[{id:"pi-btn-bck",text:_("back"),handler:this.navHandler.createDelegate(this,[-1]),scope:this,disabled:true},{id:"pi-btn-fwd",text:_("next"),handler:this.navHandler.createDelegate(this,[1]),scope:this}],items:[{xtype:"panel-pi-first"},{xtype:"panel-pi-selprov"},{xtype:"panel-pi-newprov"},{xtype:"panel-pi-selpackage"}],listeners:{show:{fn:this.onShow,scope:this}}});MODx.window.PackageInstaller.superclass.constructor.call(this,A);this.config=A;this.lastActiveItem=this.config.firstPanel};Ext.extend(MODx.window.PackageInstaller,Ext.Window,{windows:{},onShow:function(){this.getBottomToolbar().items.item(1).setText(_("next"));this.proceed("pi-start")},navHandler:function(B){this.doLayout();var A=this.getLayout().activeItem;if(B==-1){this.proceed(A.config.back||A.config.id)}else{A.submit({scope:this,proceed:this.proceed})}},proceed:function(A){this.getLayout().setActiveItem(A);if(A==this.config.firstPanel){this.getBottomToolbar().items.item(0).setDisabled(true)}else{if(A==this.config.lastPanel){this.getBottomToolbar().items.item(1).setText(_("finish"))}else{this.getBottomToolbar().items.item(0).setDisabled(false);this.getBottomToolbar().items.item(1).setText(_("next"))}}}});Ext.reg("window-package-installer",MODx.window.PackageInstaller);MODx.panel.PiFirst=function(A){A=A||{};Ext.applyIf(A,{id:"pi-start",back:"pi-start",autoHeight:true,defaults:{labelSeparator:"",border:false},bodyStyle:"padding: 3em 3em",items:[{html:"<h2>"+_("package_retriever")+"</h2>"},{html:"<p>"+_("package_obtain_method")+"</p>",style:"padding-bottom: 2em"},{boxLabel:_("provider_select"),xtype:"radio",inputValue:"selprov",name:"method",checked:true},{boxLabel:_("provider_add"),xtype:"radio",inputValue:"newprov",name:"method"},{boxLabel:_("package_search_local_title"),xtype:"radio",inputValue:"local",name:"method"}]});MODx.panel.PiFirst.superclass.constructor.call(this,A);this.config=A};Ext.extend(MODx.panel.PiFirst,Ext.FormPanel,{submit:function(B){var A=this.getForm().getValues();if(!A.method){}else{if(A.method=="local"){this.searchLocal()}else{Ext.callback(B.proceed,B.scope||this,["pi-"+A.method])}}},searchLocal:function(){MODx.msg.confirm({title:_("package_search_local_title"),text:_("package_search_local_confirm"),connector:MODx.config.connectors_url+"workspace/packages.php",params:{action:"scanLocal"},scope:this,success:function(A){Ext.getCmp("grid-package").refresh();Ext.getCmp("window-package-installer").hide()}})}});Ext.reg("panel-pi-first",MODx.panel.PiFirst);MODx.panel.PiSelProv=function(A){A=A||{};Ext.applyIf(A,{id:"pi-selprov",back:"pi-start",autoHeight:true,defaults:{border:false},bodyStyle:"padding: 3em",items:[{html:"<h2>"+_("provider_select")+"</h2>"},{html:"<p>"+_("provider_select_desc")+"</p>",style:"padding-bottom: 2em;"},{fieldLabel:_("provisioner"),xtype:"combo-provider",allowBlank:false},{text:_("provider_add_or"),xtype:"button",style:"padding-top: 2em;",scope:this,handler:function(){Ext.getCmp("window-package-installer").proceed("pi-newprov")}}]});MODx.panel.PiSelProv.superclass.constructor.call(this,A);this.config=A};Ext.extend(MODx.panel.PiSelProv,Ext.FormPanel,{submit:function(A){if(this.getForm().isValid()){var B=this.getForm().getValues();Ext.getCmp("grid-package-download").setProvider(B.provider);Ext.callback(A.proceed,A.scope||this,["pi-selpackage"])}}});Ext.reg("panel-pi-selprov",MODx.panel.PiSelProv);MODx.panel.PiNewProv=function(A){A=A||{};Ext.applyIf(A,{id:"pi-newprov",back:"pi-start",autoHeight:true,defaults:{border:false},bodyStyle:"padding: 3em",url:MODx.config.connectors_url+"workspace/providers.php",baseParams:{action:"create"},items:[{html:"<h2>"+_("provider_add")+"</h2>"},{fieldLabel:_("name"),xtype:"textfield",name:"name",allowBlank:false,width:200},{fieldLabel:_("description"),xtype:"textarea",name:"description",width:200},{fieldLabel:_("provider_url"),xtype:"textfield",name:"service_url",vtype:"url",allowBlank:false,width:300}]});MODx.panel.PiNewProv.superclass.constructor.call(this,A);this.config=A};Ext.extend(MODx.panel.PiNewProv,Ext.FormPanel,{submit:function(A){if(this.getForm().isValid()){this.getForm().submit({waitMsg:_("saving"),scope:this,failure:function(C,B){MODx.form.Handler.errorExt(B.result,C)},success:function(D,B){var E=B.result.object;var C=Ext.getCmp("grid-package-download").setProvider(E.id);Ext.callback(A.proceed,A.scope||this,["pi-selpackage"])}})}}});Ext.reg("panel-pi-newprov",MODx.panel.PiNewProv);MODx.panel.PiSelPackage=function(A){A=A||{};Ext.applyIf(A,{id:"pi-selpackage",back:"pi-selprov",autoHeight:true,bodyStyle:"padding: 3em",url:MODx.config.connectors_url+"workspace/providers.php",baseParams:{action:"download"},items:[{html:"<h2>"+_("package_select_download")+"</h2>",border:false},{html:"<p>"+_("package_select_download_desc")+"</p>",style:"padding-bottom: 2em",border:false},{xtype:"grid-package-download",id:"grid-package-download"}]});MODx.panel.PiSelPackage.superclass.constructor.call(this,A);this.config=A};Ext.extend(MODx.panel.PiSelPackage,Ext.FormPanel,{submit:function(F){var D=Ext.getCmp("grid-package-download");var A=D.getSelectionModel().getSelections();var E=[];for(var C=0,B=A.length;C<B;C++){E.push(A[C].data)}if(E.length>0){this.getForm().submit({waitMsg:_("downloading"),params:{packages:Ext.encode(E)},scope:this,failure:function(H,G){MODx.form.Handler.errorExt(G.result,H)},success:function(H,G){Ext.getCmp("grid-package").refresh();D.getSelectionModel().clearSelections();Ext.getCmp("window-package-installer").hide()}})}else{Ext.Msg.alert("",_("package_select_download_ns"))}}});Ext.reg("panel-pi-selpackage",MODx.panel.PiSelPackage);MODx.grid.PackageDownload=function(A){A=A||{};Ext.applyIf(A,{title:_("packages"),url:MODx.config.connectors_url+"workspace/providers.php",baseParams:{action:"getPackages"},fields:["signature","name","version","release","description","location","menu"],paging:true,layout:"fit",preventRender:true,sm:new Ext.grid.RowSelectionModel({singleSelect:false}),columns:[new Ext.grid.CheckboxSelectionModel(),{header:_("name"),dataIndex:"signature"},{header:_("version"),dataIndex:"version"},{header:_("release"),dataIndex:"release"},{header:_("description"),dataIndex:"description"}]});MODx.grid.PackageDownload.superclass.constructor.call(this,A)};Ext.extend(MODx.grid.PackageDownload,MODx.grid.Grid,{setProvider:function(A){this.baseParams.provider=A;this.refresh()}});Ext.reg("grid-package-download",MODx.grid.PackageDownload);