MODx.Window=function(A){A=A||{};Ext.applyIf(A,{modal:false,layout:"fit",closeAction:"hide",shadow:true,resizable:true,collapsible:true,maximizable:true,autoHeight:true,width:450,buttons:[{text:_("cancel"),scope:this,handler:function(){this.hide()}},{text:_("save"),scope:this,handler:this.submit}],tools:[{id:"help",qtip:_("help"),handler:this.help,scope:this}],record:{}});MODx.Window.superclass.constructor.call(this,A);this.options=A;this.config=A;this.addEvents({success:true,failure:true});this._loadForm()};Ext.extend(MODx.Window,Ext.Window,{_loadForm:function(){if(this.checkIfLoaded(this.config.record||null)){return false}var C=this.config.record;if(this.config.fields){var A=this.config.fields.length;for(var B=0;B<A;B++){var D=this.config.fields[B];if(C[D.name]){if(D.xtype=="checkbox"||D.xtype=="radio"){D.checked=C[D.name]}else{D.value=C[D.name]}}}}this.fp=this.createForm({url:this.config.connector||this.config.url,baseParams:this.config.baseParams||{action:this.config.action||""},items:this.config.fields||[]});this.renderForm()},submit:function(){if(this.fp.getForm().isValid()){this.fp.getForm().submit({waitMsg:_("saving"),scope:this,failure:function(B,A){this.fireEvent("failure",B,A);MODx.form.Handler.errorExt(A.result,B)},success:function(B,A){if(this.config.success){Ext.callback(this.config.success,this.config.scope||this,[B,A])}this.fireEvent("success",{f:B,a:A});this.hide()}})}},createForm:function(A){A=A||{};Ext.applyIf(A,{labelAlign:"right",labelWidth:100,frame:true,border:false,bodyBorder:false,autoHeight:true,errorReader:MODx.util.JSONReader,url:this.config.connector||this.config.url,baseParams:this.config.baseParams||{},fileUpload:this.config.fileUpload||false});return new Ext.FormPanel(A)},renderForm:function(){this.add(this.fp)},checkIfLoaded:function(A){A=A||{};if(this.fp&&this.fp.getForm()){this.fp.getForm().reset();this.fp.getForm().setValues(A);return true}return false},setValues:function(A){if(A==null){return false}this.fp.getForm().setValues(A)},hideField:function(A){A.disable();A.hide();var B=A.getEl().up(".x-form-item");if(B){B.setDisplayed(false)}},showField:function(A){A.enable();A.show();var B=A.getEl().up(".x-form-item");if(B){B.setDisplayed(true)}},help:function(){Ext.Msg.alert(_("help"),_("help_not_yet"))}});Ext.reg("modx-window",MODx.Window);