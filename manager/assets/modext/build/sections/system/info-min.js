Ext.onReady(function(){MODx.load({xtype:"page-system-info"})});MODx.page.SystemInfo=function(A){A=A||{};Ext.applyIf(A,{components:[{xtype:"grid-databasetables",renderTo:"dt_grid"},{xtype:"grid-activedocuments",renderTo:"documents_grid"}],tabs:[{contentEl:"tab_server",title:_("server")},{contentEl:"tab_documents",title:_("activity_title")},{contentEl:"tab_database",title:_("database_tables")},{contentEl:"tab_users",title:_("onlineusers_title")}]});MODx.page.SystemInfo.superclass.constructor.call(this,A)};Ext.extend(MODx.page.SystemInfo,MODx.Component);Ext.reg("page-system-info",MODx.page.SystemInfo);var viewPHPInfo=function(){dontShowWorker=true;window.location.href=MODx.config.connectors_url+"system/phpinfo.php"};var truncate=function(A){Ext.getCmp("grid-dbtable").truncate(A)};var optimize=function(A){Ext.getCmp("grid-dbtable").optimize(A)};