Ext.namespace('MODx','MODx.combo');
/**
 * Displays a dropdown list of modTransportProviders
 * 
 * @class MODx.combo.Provider
 * @extends MODx.combo.ComboBox
 * @constructor
 * @param {Object} config An object of options.
 * @xtype combo-provider
 */
MODx.combo.Provider = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        name: 'provider'
        ,hiddenName: 'provider'
        ,url: MODx.config.connectors_url+'workspace/providers.php'
        ,editable: false
    });
    MODx.combo.Provider.superclass.constructor.call(this,config);
};
Ext.extend(MODx.combo.Provider,MODx.combo.ComboBox);
Ext.reg('combo-provider',MODx.combo.Provider);

/**
 * Displays a dropdown list of modWorkspaces
 * 
 * @class MODx.combo.Workspace
 * @extends MODx.combo.ComboBox
 * @constructor
 * @param {Object} config An object of options.
 * @xtype combo-workspace
 */
MODx.combo.Workspace = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        name: 'workspace'
        ,hiddenName: 'workspace'
        ,url: MODx.config.connectors_url+'workspace/index.php'
        ,editable: false
    });
    MODx.combo.Workspace.superclass.constructor.call(this,config);
};
Ext.extend(MODx.combo.Workspace,MODx.combo.ComboBox);
Ext.reg('combo-workspace',MODx.combo.Workspace);