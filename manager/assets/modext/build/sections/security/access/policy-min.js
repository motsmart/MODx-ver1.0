Ext.onReady(function(){MODx.load({xtype:"page-access-policies"})});MODx.page.AccessPolicies=function(A){A=A||{};Ext.applyIf(A,{components:[{xtype:"grid-accesspolicy",renderTo:"policy_grid"}]});MODx.page.AccessPolicies.superclass.constructor.call(this,A)};Ext.extend(MODx.page.AccessPolicies,MODx.Component);Ext.reg("page-access-policies",MODx.page.AccessPolicies);