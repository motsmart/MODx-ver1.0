MODx.grid.TemplateTV=function(A){A=A||{};Ext.applyIf(A,{title:_("template_assignedtv_tab"),url:MODx.config.connectors_url+"element/template/tv.php",fields:["id","name","description","rank","access","menu"],baseParams:{action:"getList",template:A.template},saveParams:{template:A.template},width:800,paging:true,columns:[{header:_("name"),dataIndex:"name",width:150,editor:{xtype:"textfield",allowBlank:false}},{header:_("description"),dataIndex:"description",width:350,editor:{xtype:"textfield"}},{header:_("access"),dataIndex:"access",width:100,editor:{xtype:"combo-boolean",renderer:"boolean"}},{header:_("rank"),dataIndex:"rank",width:100,editor:{xtype:"textfield",allowBlank:false}}]});MODx.grid.TemplateTV.superclass.constructor.call(this,A)};Ext.extend(MODx.grid.TemplateTV,MODx.grid.Grid);Ext.reg("grid-template-tv",MODx.grid.TemplateTV);