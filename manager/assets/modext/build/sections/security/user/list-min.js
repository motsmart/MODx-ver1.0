Ext.onReady(function(){MODx.load({xtype:"page-users"})});MODx.page.Users=function(A){A=A||{};Ext.applyIf(A,{actions:{"new":MODx.action["security/user/create"],cancel:MODx.action.welcome},buttons:[{type:"new",text:_("new"),params:{a:MODx.action["security/user/create"]}},"-",{type:"cancel",text:_("cancel"),params:{a:MODx.action.welcome}}],components:[{xtype:"grid-user",renderTo:"users_grid"}]});MODx.page.Users.superclass.constructor.call(this,A)};Ext.extend(MODx.page.Users,MODx.Component);Ext.reg("page-users",MODx.page.Users);