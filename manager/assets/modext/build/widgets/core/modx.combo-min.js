Ext.namespace("MODx.combo");MODx.combo.ComboBox=function(A,B){A=A||{};Ext.applyIf(A,{displayField:"name",valueField:"id",triggerAction:"all",fields:["id","name"],baseParams:{action:"getList"},width:150,listWidth:300,editable:true,resizable:true,typeAhead:true,lazyInit:true,minChars:3});Ext.applyIf(A,{store:new Ext.data.JsonStore({url:A.connector||A.url,root:"results",totalProperty:"total",fields:A.fields,errorReader:MODx.util.JSONReader,baseParams:A.baseParams||{},remoteSort:A.remoteSort||false})});if(B===true){A.store.load();return A.store}MODx.combo.ComboBox.superclass.constructor.call(this,A)};Ext.extend(MODx.combo.ComboBox,Ext.form.ComboBox,{isLoaded:false,setValue:function(B,A){if(this.isLoaded||A==true||this.mode=="local"){MODx.combo.ComboBox.superclass.setValue.call(this,B)}else{this.store.load({params:this.baseParams,callback:function(D,E,C){this.isLoaded=true;if(C){MODx.combo.ComboBox.superclass.setValue.call(this,B)}this.collapse()},scope:this})}}});MODx.combo.Renderer=function(B){var A=false;return(function(D){if(!B.store||!B.store.proxy){return D}if(!A){B.store.load();A=true;var C=B.store.find(B.valueField,D);var E=B.store.getAt(C);return(E==null?D:E.get(B.displayField))}else{var C=B.store.find(B.valueField,D);var E=B.store.getAt(C);return(E==null?D:E.get(B.displayField))}})};MODx.combo.Boolean=function(A){A=A||{};Ext.applyIf(A,{store:new Ext.data.SimpleStore({fields:["d","v"],data:[[_("yes"),true],[_("no"),false]]}),displayField:"d",valueField:"v",mode:"local",triggerAction:"all",editable:false,selectOnFocus:false});MODx.combo.Boolean.superclass.constructor.call(this,A)};Ext.extend(MODx.combo.Boolean,MODx.combo.ComboBox);Ext.reg("combo-boolean",MODx.combo.Boolean);MODx.combo.User=function(A){A=A||{};Ext.applyIf(A,{name:"user",hiddenName:"user",displayField:"username",valueField:"id",fields:["username","id"],url:MODx.config.connectors_url+"security/user.php"});MODx.combo.User.superclass.constructor.call(this,A)};Ext.extend(MODx.combo.User,MODx.combo.ComboBox);Ext.reg("combo-user",MODx.combo.User);MODx.combo.UserGroup=function(A){A=A||{};Ext.applyIf(A,{name:"group",hiddenName:"group",displayField:"name",valueField:"id",fields:["name","id"],listWidth:300,url:MODx.config.connectors_url+"security/group.php"});MODx.combo.UserGroup.superclass.constructor.call(this,A)};Ext.extend(MODx.combo.UserGroup,MODx.combo.ComboBox);Ext.reg("combo-usergroup",MODx.combo.UserGroup);MODx.combo.UserGroupRole=function(A){A=A||{};Ext.applyIf(A,{name:"role",hiddenName:"role",displayField:"name",valueField:"id",fields:["name","id"],url:MODx.config.connectors_url+"security/role.php"});MODx.combo.UserGroupRole.superclass.constructor.call(this,A)};Ext.extend(MODx.combo.UserGroupRole,MODx.combo.ComboBox);Ext.reg("combo-usergrouprole",MODx.combo.UserGroupRole);MODx.combo.ResourceGroup=function(A){A=A||{};Ext.applyIf(A,{name:"resourcegroup",hiddenName:"resourcegroup",displayField:"name",valueField:"id",fields:["name","id"],url:MODx.config.connectors_url+"security/resourcegroup.php"});MODx.combo.ResourceGroup.superclass.constructor.call(this,A)};Ext.extend(MODx.combo.ResourceGroup,MODx.combo.ComboBox);Ext.reg("combo-resourcegroup",MODx.combo.ResourceGroup);MODx.combo.Context=function(A){A=A||{};Ext.applyIf(A,{name:"context",hiddenName:"context",displayField:"key",valueField:"key",fields:["key"],url:MODx.config.connectors_url+"context/index.php"});MODx.combo.Context.superclass.constructor.call(this,A)};Ext.extend(MODx.combo.Context,MODx.combo.ComboBox);Ext.reg("combo-context",MODx.combo.Context);MODx.combo.Policy=function(A){A=A||{};Ext.applyIf(A,{name:"policy",hiddenName:"policy",displayField:"name",valueField:"id",fields:["name","id"],allowBlank:false,editable:false,url:MODx.config.connectors_url+"security/access/policy.php"});MODx.combo.Policy.superclass.constructor.call(this,A)};Ext.extend(MODx.combo.Policy,MODx.combo.ComboBox);Ext.reg("combo-policy",MODx.combo.Policy);MODx.combo.Template=function(A){A=A||{};Ext.applyIf(A,{name:"template",hiddenName:"template",displayField:"templatename",valueField:"id",fields:["id","templatename","description","category"],tpl:new Ext.XTemplate('<tpl for="."><div class="x-combo-list-item"><span style="font-weight: bold">{templatename}</span>',' - <span style="font-style:italic">{category}</span>',"<br />{description}</div></tpl>"),url:MODx.config.connectors_url+"element/template.php",listWidth:350,allowBlank:true});MODx.combo.Template.superclass.constructor.call(this,A)};Ext.extend(MODx.combo.Template,MODx.combo.ComboBox);Ext.reg("combo-template",MODx.combo.Template);MODx.combo.Category=function(A){A=A||{};Ext.applyIf(A,{name:"category",hiddenName:"category",displayField:"category",mode:"local",fields:["id","category"],forceSelection:false,typeAhead:false,allowBlank:true,enableKeyEvents:true,url:MODx.config.connectors_url+"element/category.php",listeners:{blur:{fn:this._onblur,scope:this}}});MODx.combo.Category.superclass.constructor.call(this,A)};Ext.extend(MODx.combo.Category,MODx.combo.ComboBox,{_onblur:function(B,C){var A=this.getRawValue();this.setRawValue(A);this.setValue(A,true)}});Ext.reg("combo-category",MODx.combo.Category);MODx.combo.Language=function(A){A=A||{};Ext.applyIf(A,{name:"language",hiddenName:"language",displayField:"name",valueField:"name",fields:["name"],forceSelection:true,typeAhead:false,editable:false,allowBlank:false,url:MODx.config.connectors_url+"system/language.php"});MODx.combo.Language.superclass.constructor.call(this,A)};Ext.extend(MODx.combo.Language,MODx.combo.ComboBox);Ext.reg("combo-language",MODx.combo.Language);MODx.combo.Charset=function(A){A=A||{};Ext.applyIf(A,{name:"charset",hiddenName:"charset",displayField:"text",valueField:"value",fields:["value","text"],forceSelection:true,typeAhead:false,editable:false,allowBlank:false,listWidth:300,url:MODx.config.connectors_url+"system/charset.php"});MODx.combo.Charset.superclass.constructor.call(this,A)};Ext.extend(MODx.combo.Charset,MODx.combo.ComboBox);Ext.reg("combo-charset",MODx.combo.Charset);MODx.combo.RTE=function(A){A=A||{};Ext.applyIf(A,{name:"rte",hiddenName:"rte",displayField:"value",valueField:"value",fields:["value"],forceSelection:true,typeAhead:false,editable:false,allowBlank:false,listWidth:300,url:MODx.config.connectors_url+"system/rte.php"});MODx.combo.RTE.superclass.constructor.call(this,A)};Ext.extend(MODx.combo.RTE,MODx.combo.ComboBox);Ext.reg("combo-rte",MODx.combo.RTE);MODx.combo.Role=function(A){A=A||{};Ext.applyIf(A,{name:"role",hiddenName:"role",forceSelection:true,typeAhead:false,editable:false,allowBlank:false,listWidth:300,url:MODx.config.connectors_url+"security/role.php",baseParams:{action:"getList",addNone:true}});MODx.combo.Role.superclass.constructor.call(this,A)};Ext.extend(MODx.combo.Role,MODx.combo.ComboBox);Ext.reg("combo-role",MODx.combo.Role);MODx.combo.ContentType=function(A){A=A||{};Ext.applyIf(A,{name:"content_type",hiddenName:"content_type",forceSelection:true,typeAhead:false,editable:false,allowBlank:false,listWidth:300,url:MODx.config.connectors_url+"system/contenttype.php",baseParams:{action:"getList"}});MODx.combo.ContentType.superclass.constructor.call(this,A)};Ext.extend(MODx.combo.ContentType,MODx.combo.ComboBox);Ext.reg("combo-contenttype",MODx.combo.ContentType);MODx.combo.ContentDisposition=function(A){A=A||{};Ext.applyIf(A,{store:new Ext.data.SimpleStore({fields:["d","v"],data:[[_("inline"),0],[_("attachment"),1]]}),name:"content_dispo",width:200,displayField:"d",valueField:"v",value:0,mode:"local",triggerAction:"all",editable:false,selectOnFocus:false});MODx.combo.ContentDisposition.superclass.constructor.call(this,A)};Ext.extend(MODx.combo.ContentDisposition,Ext.form.ComboBox);Ext.reg("combo-content-disposition",MODx.combo.ContentDisposition);MODx.combo.ClassKey=function(A){A=A||{};Ext.applyIf(A,{name:"classKey",hiddenName:"classKey",url:MODx.config.connectors_url+"workspace/builder/index.php",baseParams:{action:"getClassKeys"},displayField:"key",valueField:"key",fields:["key"],editable:false});MODx.combo.ClassKey.superclass.constructor.call(this,A)};Ext.extend(MODx.combo.ClassKey,MODx.combo.ComboBox);Ext.reg("combo-class-key",MODx.combo.ClassKey);MODx.combo.Object=function(A){A=A||{};Ext.applyIf(A,{name:"object",hiddenName:"object",url:MODx.config.connectors_url+"workspace/builder/index.php",baseParams:{action:"getAssocObject",class_key:"modResource"},displayField:"name",valueField:"id",fields:["id","name"],pageSize:10,editable:false});MODx.combo.Object.superclass.constructor.call(this,A)};Ext.extend(MODx.combo.Object,MODx.combo.ComboBox);Ext.reg("combo-object",MODx.combo.Object);MODx.combo.Namespace=function(A){A=A||{};Ext.applyIf(A,{name:"namespace",hiddenName:"namespace",forceSelection:true,typeAhead:false,editable:false,allowBlank:false,listWidth:300,url:MODx.config.connectors_url+"workspace/namespace.php",fields:["name"],displayField:"name",valueField:"name",baseParams:{action:"getList"}});MODx.combo.Namespace.superclass.constructor.call(this,A)};Ext.extend(MODx.combo.Namespace,MODx.combo.ComboBox);Ext.reg("combo-namespace",MODx.combo.Namespace);