MODx.panel.ResourceTV=function(A){A=A||{};Ext.applyIf(A,{contentEl:"tab_tvs",id:"panel-resource-tv",title:_("settings_templvars"),class_key:"",resource:"",autoLoad:this.autoload(A)});MODx.panel.ResourceTV.superclass.constructor.call(this,A)};Ext.extend(MODx.panel.ResourceTV,MODx.Panel,{autoload:function(B){var C=Ext.getCmp("tpl");if(!C){return }var D=B.template?B.template:C.getValue();var A={url:MODx.config.manager_url+"index.php?a="+MODx.action["resource/tvs"],method:"GET",params:{a:MODx.action["resource/tvs"],class_key:B.class_key,template:D,resource:B.resource},scripts:true};return A}});Ext.reg("panel-resource-tv",MODx.panel.ResourceTV);