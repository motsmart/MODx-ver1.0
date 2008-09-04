MODx.grid.AccessContext=function(A){A=A||{};Ext.applyIf(A,{title:_("ugc_grid_title"),url:MODx.config.connectors_url+"security/access/index.php",baseParams:{action:"getList",type:A.type||"modAccessContext"},fields:["id","target","target_name","principal_class","principal","principal_name","authority","policy","policy_name","menu"],type:"modAccessContext",paging:true,columns:[{header:_("id"),dataIndex:"id",width:40},{header:_("context_id"),dataIndex:"target",width:40},{header:_("context"),dataIndex:"target_name",width:150},{header:_("user_group_id"),dataIndex:"principal",width:40},{header:_("user_group"),dataIndex:"principal_name",width:150},{header:_("authority"),dataIndex:"authority",width:75},{header:_("policy"),dataIndex:"policy_name",width:175}],tbar:this.getToolbar()});MODx.grid.AccessContext.superclass.constructor.call(this,A)};Ext.extend(MODx.grid.AccessContext,MODx.grid.Grid,{combos:{},windows:{},createAcl:function(C,B){var A=this.menu.record||{};Ext.applyIf(A,{context:A.target,user_group:A.principal});if(!this.windows.create_acl){this.windows.create_acl=new MODx.window.AccessContext({scope:this,success:function(E,D){var F=D.result.object;this.getStore().baseParams={action:"getList",type:this.config.type,target:this.combos.ctx.getValue(),principal:this.combos.ug.getValue(),principal_class:"modUserGroup"};this.refresh()},record:A})}else{this.windows.create_acl.setValues(A)}this.windows.create_acl.show(B.target)},editAcl:function(C,B){var A=this.menu.record;Ext.applyIf(A,{context:A.target,user_group:A.principal});if(!this.windows.update_acl){this.windows.update_acl=new MODx.window.AccessContext({id:A.id,scope:this,success:this.refresh,record:A})}else{this.windows.update_acl.setValues(A)}this.windows.update_acl.show(B.target)},removeAcl:function(B,A){MODx.msg.confirm({title:_("ugc_remove"),text:_("access_confirm_remove"),connector:this.config.url,params:{action:"removeAcl",id:this.menu.record.id,type:this.config.type},scope:this,success:this.refresh})},clearFilter:function(A,B){this.getStore().baseParams={action:"getList",type:this.config.type,target:"",principal:"",principal_class:"modUserGroup"};this.combos.ug.setValue("");this.combos.ctx.setValue("");this.getStore().load()},getToolbar:function(){this.combos.ug=new MODx.combo.UserGroup();this.combos.ug.on("select",function(A,B){this.getStore().baseParams={action:"getList",type:this.config.type,target:this.combos.rg.getValue(),principal:this.combos.ug.getValue()};this.getStore().load()},this);this.combos.ctx=new MODx.combo.Context();this.combos.ctx.on("select",function(A,B){this.getStore().baseParams={action:"getList",type:this.config.type,target:this.combos.ctx.getValue(),principal:this.combos.ug.getValue()};this.getStore().load()},this);return[_("context")+": ",this.combos.ctx,"-",_("user_group")+": ",this.combos.ug,"-",{text:_("clear_filter"),scope:this,handler:this.clearFilter},"->",{text:_("add"),scope:this,handler:this.createAcl}]}});Ext.reg("grid-accesscontext",MODx.grid.AccessContext);MODx.window.AccessContext=function(A){A=A||{};Ext.applyIf(A,{title:_("ugc_mutate"),height:250,width:350,type:"modAccessContext",id:0});MODx.window.AccessContext.superclass.constructor.call(this,A)};Ext.extend(MODx.window.AccessContext,MODx.Window,{combos:{},_loadForm:function(){if(this.checkIfLoaded(this.config.record)){return false}if(this.config.id){Ext.Ajax.request({url:MODx.config.connectors_url+"security/access/index.php",params:{action:"getAcl",id:this.config.id,type:this.config.type},scope:this,success:this.prepareForm})}else{this.prepareForm(null,null)}},prepareForm:function(A,C){var B={};if(A){A=Ext.decode(A.responseText);if(A.success){B=A.object;this.config.baseParams={action:"updateAcl",type:this.config.type}}}this.config.values=B;this.fp=this.createForm({url:this.config.connector||MODx.config.connectors_url+"security/access/index.php",baseParams:this.config.baseParams||{action:"addAcl",type:this.config.type},items:[{fieldLabel:_("context"),name:"target",hiddenName:"target",xtype:"combo-context",value:B.context},{fieldLabel:_("user_group"),name:"principal",hiddenName:"principal",xtype:"combo-usergroup",value:B.principal||"",baseParams:{action:"getList",combo:"1"}},{fieldLabel:_("authority"),name:"authority",xtype:"textfield",width:40,value:B.authority},{fieldLabel:_("policy"),name:"policy",hiddenName:"policy",xtype:"combo-policy",value:B.policy||"",baseParams:{action:"getList",combo:"1"}},{name:"principal_class",xtype:"hidden",value:"modUserGroup"},{name:"id",xtype:"hidden",value:B.id}]});this.renderForm()}});Ext.reg("window-accesscontext",MODx.window.AccessContext);