MODx.grid.RecentlyEditedResourcesByUser=function(A){A=A||{};Ext.applyIf(A,{title:_("recent_docs"),url:MODx.config.connectors_url+"security/user.php",saveUrl:MODx.config.connectors_url+"resource/document.php",baseParams:{action:"getRecentlyEditedResources",user:A.user},fields:["id","pagetitle","description","editedon","deleted","published","menu"],columns:this.getColumns(),paging:true,autosave:true});MODx.grid.RecentlyEditedResourcesByUser.superclass.constructor.call(this,A)};Ext.extend(MODx.grid.RecentlyEditedResourcesByUser,MODx.grid.Grid,{getColumns:function(){return[{header:_("id"),dataIndex:"id",width:75},{header:_("pagetitle"),dataIndex:"pagetitle",width:150,editor:{xtype:"textfield",allowBlank:false}},{header:_("description"),dataIndex:"description",width:250,editor:{xtype:"textfield"}},{header:_("published"),dataIndex:"published",width:120,editor:{xtype:"combo-boolean",renderer:"boolean"}},{header:_("deleted"),dataIndex:"deleted",width:120,editor:{xtype:"combo-boolean",renderer:"boolean"}}]},preview:function(){window.open(MODx.config.base_url+"index.php?id="+this.menu.record.id)}});Ext.reg("grid-user-recent-resource",MODx.grid.RecentlyEditedResourcesByUser);