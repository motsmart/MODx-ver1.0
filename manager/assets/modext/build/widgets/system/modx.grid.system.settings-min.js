MODx.grid.SystemSettings=function(A){A=A||{};Ext.applyIf(A,{title:_("system_settings"),url:MODx.config.connectors_url+"system/settings.php"});MODx.grid.SystemSettings.superclass.constructor.call(this,A)};Ext.extend(MODx.grid.SystemSettings,MODx.grid.SettingsGrid);Ext.reg("grid-system-settings",MODx.grid.SystemSettings);