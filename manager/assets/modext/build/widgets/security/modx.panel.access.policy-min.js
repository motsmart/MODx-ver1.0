MODx.panel.AccessPolicy=function(A){A=A||{};Ext.applyIf(A,{url:MODx.config.connectors_url+"security/access/policy.php",baseParams:{action:"update"},id:"panel-access-policy",class_key:"modAccessPolicy",plugin:"",bodyStyle:"",defaults:{collapsible:false,autoHeight:true},items:[{html:"<h2>"+_("policy")+": "+A.name+"</h2>",id:"policy-name",border:false},{html:"<p>"+_("policy_desc")+"</p>",border:false},{xtype:"hidden",name:"id",value:A.plugin},{xtype:"textfield",fieldLabel:_("name"),name:"name",width:300,maxLength:255,enableKeyEvents:true,allowBlank:false,listeners:{keyup:{scope:this,fn:function(B,C){Ext.getCmp("policy-name").getEl().update("<h2>"+_("policy")+": "+B.getValue()+"</h2>")}}}},{xtype:"textarea",fieldLabel:_("description"),name:"description",width:300,grow:true},{xtype:"button",text:_("save"),handler:this.submit,scope:this},{html:"<br /><h2>"+_("policy_data")+"</h2>",border:false},{xtype:"grid-policy-property",id:"grid-policy-property",policy:null,source:null}],listeners:{setup:{fn:this.setup,scope:this}}});MODx.panel.AccessPolicy.superclass.constructor.call(this,A)};Ext.extend(MODx.panel.AccessPolicy,MODx.FormPanel,{setup:function(){if(this.config.policy==""||this.config.policy==0){return }Ext.Ajax.request({url:this.config.url,params:{action:"get",id:this.config.policy},scope:this,success:function(B){B=Ext.decode(B.responseText);if(B.success){this.getForm().setValues(B.object);var C=Ext.util.JSON.decode(B.object.policy_data);var A=Ext.getCmp("grid-policy-property");A.setSource(C);A.config.policy=B.object.id;A.getView().refresh();Ext.getCmp("policy-name").getEl().update("<h2>"+_("policy")+": "+B.object.name+"</h2>")}else{MODx.form.Handler.errorJSON(B)}}})}});Ext.reg("panel-access-policy",MODx.panel.AccessPolicy);MODx.grid.PolicyProperty=function(A){A=A||{};Ext.applyIf(A,{source:null,height:300,maxHeight:300,autoHeight:true,minColumnWidth:250,autoExpandColumn:"name",autoWidth:true,collapsible:true,stripeRows:true,tbar:[{text:_("policy_property_new"),scope:this,handler:this.create}]});MODx.grid.PolicyProperty.superclass.constructor.call(this,A);this.config=A;this.on("afteredit",this.update,this);this.menu=new Ext.menu.Menu({defaultAlign:"tl-b?"});this.on("rowcontextmenu",this.showMenu,this)};Ext.extend(MODx.grid.PolicyProperty,Ext.grid.PropertyGrid,{create:function(){Ext.Msg.prompt(_("policy_property_create"),_("policy_property_specify_name"),function(B,A){if(B=="ok"){Ext.Ajax.request({url:MODx.config.connectors_url+"security/access/policy.php",params:{action:"createPolicyData",id:this.config.policy,key:A},scope:this,success:function(D,E){D=Ext.decode(D.responseText);if(D.success){var C=this.getSource();C[A]=true;this.setSource(C)}else{MODx.form.Handler.errorJSON(D)}}})}},this)},remove:function(){Ext.Ajax.request({url:MODx.config.connectors_url+"security/access/policy.php",params:{action:"removePolicyData",id:this.config.policy,key:this.menu.record},scope:this,success:function(B,C){B=Ext.decode(B.responseText);if(B.success){var A=this.getSource();A[this.menu.record]=null;this.setSource(A)}else{MODx.form.Handler.errorJSON(B)}}})},update:function(A){Ext.Ajax.request({url:MODx.config.connectors_url+"security/access/policy.php",params:{action:"updatePolicyData",id:this.config.policy,key:A.record.data.name,value:A.value},scope:this,success:function(B,C){B=Ext.decode(B.responseText);if(B.success){A.record.commit()}else{MODx.form.Handler.errorJSON(B)}}})},showMenu:function(B,A,C){C.stopEvent();C.preventDefault();var D=this.getSelectionModel();this.menu.removeAll();this.menu.record=D.selection.record.id;this.menu.add({text:_("policy_property_remove"),scope:this,handler:this.remove});this.menu.show(C.target)}});Ext.reg("grid-policy-property",MODx.grid.PolicyProperty);