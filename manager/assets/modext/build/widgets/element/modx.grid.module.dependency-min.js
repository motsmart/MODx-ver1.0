MODx.grid.ModuleDep=function(A){A=A||{};Ext.applyIf(A,{title:_("module_deps"),url:MODx.config.connectors_url+"element/module_dependency.php",baseParams:{action:"getList",module:A.module},fields:["id","name","class_key","resource","menu"],width:800,autosave:true,paging:true,remoteSort:true,id:"grid-module-dep",tbar:[{text:_("module_dep_add"),handler:{xtype:"window-module-dep-create",blankValues:true,module:A.module}}],columns:[{header:_("id"),dataIndex:"id",width:50},{header:_("name"),dataIndex:"name",width:350,sortable:true},{header:_("class_key"),dataIndex:"class_key",width:200,sortable:true,editor:{xtype:"combo-class-key"},editable:false},{header:_("object_id"),dataIndex:"resource",width:100}]});MODx.grid.ModuleDep.superclass.constructor.call(this,A)};Ext.extend(MODx.grid.ModuleDep,MODx.grid.Grid,{});Ext.reg("grid-module-dep",MODx.grid.ModuleDep);MODx.window.CreateModuleDep=function(A){A=A||{};Ext.applyIf(A,{title:_("module_dep_create"),url:MODx.config.connectors_url+"element/module_dependency.php",action:"create",fields:[{xtype:"combo-class-key",fieldLabel:_("class_key"),description:_("class_key_desc"),allowBlank:true,listeners:{change:{fn:this.updateObjField,scope:this}}},{xtype:"combo-object",fieldLabel:_("object"),description:_("object_id_desc"),id:"combo-object",name:"object"},{xtype:"hidden",name:"module",value:A.module}]});MODx.window.CreateModuleDep.superclass.constructor.call(this,A)};Ext.extend(MODx.window.CreateModuleDep,MODx.Window,{updateObjField:function(D,A,B){var C=Ext.getCmp("combo-object");C.store.baseParams.class_key=D.getValue();C.store.reload({params:{start:0,limit:10}});C.clearValue();C.reset()},submit:function(){MODx.window.CreateModuleDep.superclass.submit.call(this);Ext.getCmp("grid-module-dep").getStore().reload()}});Ext.reg("window-module-dep-create",MODx.window.CreateModuleDep);