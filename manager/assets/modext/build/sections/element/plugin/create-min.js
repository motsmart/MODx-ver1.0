MODx.page.CreatePlugin=function(A){A=A||{};Ext.applyIf(A,{formpanel:"panel-plugin",actions:{"new":MODx.action["element/plugin/create"],edit:MODx.action["element/plugin/update"],cancel:MODx.action.welcome},buttons:[{process:"create",text:_("save"),method:"remote",refresh:{tree:"modx_element_tree",node:"n_type_plugin"},listeners:{click:{fn:function(B,D){var C=Ext.getCmp("grid-plugin-event");Ext.apply(this.ab.config.params,{events:C.encodeModified()})},scope:this},success:function(D,B,C){Ext.getCmp("grid-plugin-event").getStore().commitChanges()}},keys:[{key:"s",alt:true,ctrl:true}]},{process:"cancel",text:_("cancel"),params:{a:MODx.action.welcome}}],loadStay:true,components:[{xtype:"panel-plugin",id:"panel-plugin",renderTo:"panel-plugin",plugin:A.id,category:A.category,name:""}]});MODx.page.CreatePlugin.superclass.constructor.call(this,A)};Ext.extend(MODx.page.CreatePlugin,MODx.Component);Ext.reg("page-plugin-create",MODx.page.CreatePlugin);