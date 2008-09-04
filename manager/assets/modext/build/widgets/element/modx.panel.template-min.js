MODx.panel.Template=function(A){A=A||{};Ext.applyIf(A,{url:MODx.config.connectors_url+"element/template.php",baseParams:{},id:"panel-template",class_key:"modTemplate",template:"",bodyStyle:"",defaults:{collapsible:false,autoHeight:true},items:{xtype:"tabpanel",activeTab:0,deferredRender:false,border:false,defaults:{autoHeight:true,layout:"form",bodyStyle:"padding: 1.5em;",labelWidth:150},items:[{title:_("template_title"),defaults:{border:false,msgTarget:"side"},items:[{html:"<h2>"+_("template")+": </h2>",id:"template-name"},{html:"<p>"+_("template_msg")+"</p>"},{xtype:"hidden",name:"id",value:A.template},{xtype:"textfield",fieldLabel:_("template_name"),name:"templatename",width:300,maxLength:100,enableKeyEvents:true,allowBlank:false,listeners:{keyup:{scope:this,fn:function(B,C){Ext.getCmp("template-name").getEl().update("<h2>"+_("template")+": "+B.getValue()+"</h2>")}}}},{xtype:"textfield",fieldLabel:_("template_desc"),name:"description",width:300,maxLength:255},{xtype:"combo-category",fieldLabel:_("category"),name:"category",width:250,value:A.category||null},{xtype:"checkbox",fieldLabel:_("template_lock"),description:_("template_lock_msg"),name:"locked"},{html:"<br />"+_("template_code")},{xtype:"textarea",hideLabel:true,name:"content",width:"95%",height:400}]},{xtype:"grid-template-tv",id:"grid-template-tv",preventRender:true,template:A.template,bodyStyle:""}]},listeners:{setup:{fn:this.setup,scope:this}}});MODx.panel.Template.superclass.constructor.call(this,A)};Ext.extend(MODx.panel.Template,MODx.FormPanel,{setup:function(){if(this.config.template==""||this.config.template==0){return }Ext.Ajax.request({url:this.config.url,params:{action:"get",id:this.config.template},scope:this,success:function(A){A=Ext.decode(A.responseText);if(A.success){if(A.object.category=="0"){A.object.category=null}this.getForm().setValues(A.object);Ext.getCmp("template-name").getEl().update("<h2>"+_("template")+": "+A.object.templatename+"</h2>")}else{MODx.form.Handler.errorJSON(A)}}})}});Ext.reg("panel-template",MODx.panel.Template);