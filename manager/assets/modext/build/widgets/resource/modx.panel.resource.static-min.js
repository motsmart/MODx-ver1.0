MODx.panel.Static=function(A){A=A||{};Ext.applyIf(A,{url:MODx.config.connectors_url+"resource/document.php",baseParams:{},id:"panel-static",class_key:"modStaticResource",resource:"",bodyStyle:"",defaults:{collapsible:false,autoHeight:true},items:[{xtype:"tabpanel",activeTab:0,deferredRender:false,border:false,defaults:{autoHeight:true,layout:"form",bodyStyle:"padding: 1.5em;",labelWidth:150},items:[{title:_("document_setting"),defaults:{border:false,msgTarget:"side"},items:[{html:"<h2>"+_("general_settings")+"</h2>"},{xtype:"hidden",name:"id",value:A.resource},{xtype:"textfield",fieldLabel:_("document_title"),description:_("document_title_help"),name:"pagetitle",width:300,maxLength:255,allowBlank:false},{xtype:"textfield",fieldLabel:_("long_title"),description:_("document_long_title_help"),name:"longtitle",width:300,maxLength:255},{xtype:"textfield",fieldLabel:_("document_description"),description:_("document_description_help"),name:"description",width:300,maxLength:255},{xtype:"textfield",fieldLabel:_("document_alias"),description:_("document_alias_help"),name:"alias",width:300,maxLength:100},{xtype:"textfield",fieldLabel:_("link_attributes"),description:_("link_attributes_help"),name:"link_attributes",width:300,maxLength:255},{xtype:"textfield",fieldLabel:_("content"),name:"content",width:300,maxLength:255,value:""},{xtype:"textarea",fieldLabel:_("document_summary"),description:_("document_summary_help"),name:"introtext",width:300,grow:true},{xtype:"combo-template",fieldLabel:_("page_data_template"),description:_("page_data_template_help"),name:"template",id:"tpl",width:300,baseParams:{action:"getList",combo:"1"},listeners:{select:{fn:this.templateWarning,scope:this}},value:A.template},{xtype:"textfield",fieldLabel:_("document_opt_menu_title"),description:_("document_opt_menu_title_help"),name:"menutitle",width:300,maxLength:255},{xtype:"checkbox",fieldLabel:_("document_opt_show_menu"),description:_("document_opt_show_menu_help"),name:"hidemenu",inputValue:1,checked:true}]},{title:_("settings_page_settings"),defaults:{border:false,msgTarget:"side"},items:[{html:"<h2>"+_("resource_settings")+"</h2>"},{xtype:"checkbox",fieldLabel:_("document_opt_folder"),description:_("document_opt_folder_help"),name:"isfolder",inputValue:1},(A.publish_document?{xtype:"checkbox",fieldLabel:_("document_opt_published"),description:_("document_opt_published_help"),name:"published",inputValue:1,checked:MODx.config.publish_default=="1"?true:false}:{}),(A.publish_document?{xtype:"datefield",fieldLabel:_("page_data_publishdate"),description:_("page_data_publishdate_help"),name:"pub_date",format:"d-m-Y H:i:s",allowBlank:true,width:200}:{}),(A.publish_document?{xtype:"datefield",fieldLabel:_("page_data_unpublishdate"),description:_("page_data_unpublishdate_help"),name:"unpub_date",format:"d-m-Y H:i:s",allowBlank:true,width:200}:{}),{xtype:"checkbox",fieldLabel:_("page_data_searchable"),description:_("page_data_searchable_help"),name:"searchable",inputValue:1,checked:MODx.config.search_default=="1"?true:false},{xtype:"checkbox",fieldLabel:_("document_opt_emptycache"),description:_("document_opt_emptycache_help"),name:"syncsite",inputValue:1,checked:true},{xtype:"hidden",name:"parent",value:A.parent||0},{xtype:"hidden",name:"class_key",value:A.class_key||"modDocument"},{xtype:"hidden",name:"type",value:"document"},{xtype:"hidden",name:"context_key",value:A.context_key||"web"}]},{xtype:"panel-resource-tv",resource:A.resource,class_key:A.class_key,template:A.template},(A.access_permissions?{contentEl:"tab_access",title:_("access_permissions")}:{})]}],listeners:{setup:{fn:this.setup,scope:this}}});MODx.panel.Static.superclass.constructor.call(this,A)};Ext.extend(MODx.panel.Static,MODx.FormPanel,{setup:function(){if(this.config.resource==""||this.config.resource==0){return }Ext.Ajax.request({url:MODx.config.connectors_url+"resource/document.php",params:{action:"get",id:this.config.resource,class_key:this.config.class_key},scope:this,success:function(A){A=Ext.decode(A.responseText);if(A.success){if(A.object.pub_date=="0"){A.object.pub_date=""}if(A.object.unpub_date=="0"){A.object.unpub_date=""}this.getForm().setValues(A.object)}else{MODx.form.Handler.errorJSON(A)}}})},templateWarning:function(){var A=Ext.getCmp("tpl");if(!A){return }if(A.getValue()!=A.originalValue){Ext.Msg.confirm(_("tmplvar_change_template"),_("tmplvar_change_template_msg"),function(C){if(C=="yes"){var B=Ext.getCmp("panel-resource-tv");if(B&&B.body){this.tvum=B.body.getUpdater();this.tvum.update({url:"index.php?a="+MODx.action["resource/tvs"],params:{class_key:this.config.class_key,resource:this.config.resource,template:A.getValue()},discardUrl:true,scripts:true,nocache:true})}A.originalValue=A.getValue()}else{A.reset()}},this)}}});Ext.reg("panel-static",MODx.panel.Static);