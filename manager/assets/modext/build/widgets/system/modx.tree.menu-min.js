MODx.tree.Menu=function(A){A=A||{};Ext.applyIf(A,{root_id:"n_0",root_name:_("menu_top"),title:_("menu_top"),rootVisible:true,expandFirst:true,enableDrag:true,enableDrop:true,url:MODx.config.connectors_url+"system/menu.php",action:"getNodes"});MODx.tree.Menu.superclass.constructor.call(this,A)};Ext.extend(MODx.tree.Menu,MODx.tree.Tree,{windows:{},create:function(A,B){var A=this.cm.activeNode;var C=A.id.split("_");C=C[1];Ext.Ajax.request({url:this.config.url,params:{action:"get",id:C},scope:this,success:function(D,E){D=Ext.decode(D.responseText);Ext.applyIf(D.object,{parent:D.object.id,parent_text:D.object.text});if(!this.windows.create_menu){this.windows.create_menu=MODx.load({xtype:"window-menu-create",scope:this,success:this.refresh,record:D.object})}else{this.windows.create_menu.setValues(D.object)}this.windows.create_menu.show(B.target)}})},update:function(A,B){var A=this.cm.activeNode;var C=A.id.split("_");C=C[1];Ext.Ajax.request({url:this.config.url,params:{action:"get",id:C},scope:this,success:function(D,E){D=Ext.decode(D.responseText);Ext.applyIf(D.object,{action_id:D.object.action});if(!this.windows.update_menu){this.windows.update_menu=MODx.load({xtype:"window-menu-update",scope:this,success:this.refresh,record:D.object})}else{this.windows.update_menu.setValues(D.object)}this.windows.update_menu.show(B.target)}})},remove:function(A,B){var A=this.cm.activeNode;var C=A.id.split("_");C=C[1];MODx.msg.confirm({title:_("warning"),text:_("menu_confirm_remove"),url:this.config.url,params:{action:"remove",id:C},scope:this,success:this.refresh})}});Ext.reg("tree-menu",MODx.tree.Menu);MODx.window.CreateMenu=function(A){A=A||{};Ext.applyIf(A,{title:_("menu_create"),width:480,height:400,url:MODx.config.connectors_url+"system/menu.php",action:"create",fields:[{fieldLabel:_("text"),name:"text",xtype:"textfield",allowBlank:false,width:200},{fieldLabel:_("action"),name:"action_id",hiddenName:"action_id",xtype:"combo-action"},{fieldLabel:_("menu_parent"),name:"parent",hiddenName:"parent",xtype:"combo-menu",hideTrigger:true,width:200},{fieldLabel:_("icon"),name:"icon",xtype:"textfield",allowBlank:true,width:200},{fieldLabel:_("parameters"),name:"params",xtype:"textfield",width:200},{fieldLabel:_("handler"),name:"handler",xtype:"textarea",width:320,grow:false}]});MODx.window.CreateMenu.superclass.constructor.call(this,A)};Ext.extend(MODx.window.CreateMenu,MODx.Window);Ext.reg("window-menu-create",MODx.window.CreateMenu);MODx.window.UpdateMenu=function(A){A=A||{};Ext.applyIf(A,{title:_("menu_update"),width:480,height:400,url:MODx.config.connectors_url+"system/menu.php",action:"update",fields:[{name:"id",xtype:"hidden"},{fieldLabel:_("text"),name:"text",xtype:"textfield",allowBlank:false,width:200},{fieldLabel:_("action"),name:"action_id",hiddenName:"action_id",xtype:"combo-action"},{fieldLabel:_("menu_parent"),name:"parent",hiddenName:"parent",xtype:"combo-menu",readOnly:true,hideTrigger:true,width:200},{fieldLabel:_("icon"),name:"icon",xtype:"textfield",allowBlank:true,width:200},{fieldLabel:_("parameters"),name:"params",xtype:"textfield",width:200},{fieldLabel:_("handler"),name:"handler",xtype:"textarea",width:320,grow:false}]});MODx.window.UpdateMenu.superclass.constructor.call(this,A)};Ext.extend(MODx.window.UpdateMenu,MODx.Window);Ext.reg("window-menu-update",MODx.window.UpdateMenu);MODx.combo.Action=function(A){A=A||{};Ext.applyIf(A,{name:"action",hiddenName:"action",url:MODx.config.connectors_url+"system/action.php",fields:["id","controller"],displayField:"controller",valueField:"id",listWidth:300});MODx.combo.Action.superclass.constructor.call(this,A)};Ext.extend(MODx.combo.Action,MODx.combo.ComboBox);Ext.reg("combo-action",MODx.combo.Action);MODx.combo.Menu=function(A){A=A||{};Ext.applyIf(A,{name:"menu",hiddenName:"menu",url:MODx.config.connectors_url+"system/menu.php",fields:["id","text"],displayField:"text",valueField:"id",listWidth:300});MODx.combo.Menu.superclass.constructor.call(this,A)};Ext.extend(MODx.combo.Menu,MODx.combo.ComboBox);Ext.reg("combo-menu",MODx.combo.Menu);