MODx.grid.TVSecurity=function(A){A=A||{};Ext.applyIf(A,{title:_("access_permissions"),url:MODx.config.connectors_url+"element/tv/resourcegroup.php",baseParams:{action:"getList",tv:A.tv},fields:["id","name","access","menu"],paging:true,remoteSort:true,columns:[{header:_("name"),dataIndex:"name",width:200,sortable:true},{header:_("access"),dataIndex:"access",width:80,sortable:true,editor:{xtype:"combo-boolean",renderer:"boolean"}}]});MODx.grid.TVSecurity.superclass.constructor.call(this,A)};Ext.extend(MODx.grid.TVSecurity,MODx.grid.Grid);Ext.reg("grid-tv-security",MODx.grid.TVSecurity);