MODx.grid.ResourceSecurity=function(A){A=A||{};Ext.applyIf(A,{title:_("security"),url:MODx.config.connectors_url+"resource/resourcegroup.php",baseParams:{action:"getList",resource:A.resource},saveParams:{resource:A.resource},fields:["id","name","access","menu"],paging:true,remoteSort:true,columns:[{header:_("name"),dataIndex:"name",width:200,sortable:true},{header:_("access"),dataIndex:"access",width:80,sortable:true,editor:{xtype:"combo-boolean",renderer:"boolean"}}]});MODx.grid.ResourceSecurity.superclass.constructor.call(this,A)};Ext.extend(MODx.grid.ResourceSecurity,MODx.grid.Grid);Ext.reg("grid-resource-security",MODx.grid.ResourceSecurity);