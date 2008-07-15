Ext.namespace('MODx','MODx.panel');

/**
 * Loads the Package Builder
 * 
 * @class MODx.panel.PackageBuilder
 * @extends MODx.panel.Wizard
 * @param {Object} config An object of config properties
 * @xtype panel-package-builder
 */
MODx.panel.PackageBuilder = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('package_builder')
        ,id: 'panel-package-builder'
        ,layout: 'card'
        ,firstPanel: 'pb-info'
        ,lastPanel: 'pb-build'
        ,txtFinish: _('build')
        ,items: [{
            xtype: 'panel-pb-info'
        },{
            xtype: 'panel-pb-selvehicle'
        },{
            xtype: 'panel-pb-build'
        }]
    });
    MODx.panel.PackageBuilder.superclass.constructor.call(this,config);
};
Ext.extend(MODx.panel.PackageBuilder,MODx.panel.Wizard);
Ext.reg('panel-package-builder',MODx.panel.PackageBuilder);

/**
 * 
 * @class MODx.panel.PackageInfo
 * @extends MODx.FormPanel
 * @param {Object} config An object of config properties
 * @xtype panel-pb-info
 */
MODx.panel.PackageInfo = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'pb-info'
        ,url: MODx.config.connectors_url+'workspace/builder/index.php'
        ,baseParams: {
            action: 'create'
        }
        ,bodyStyle: 'padding: 3em 3em'
        ,defaults: { labelSeparator: '', border: false }
        ,items: [{
            html: '<h2>'+_('package_info')+'</h2>'
        },{
            html: '<p>'+_('package_info_desc')+'</p>'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('name')
            ,name: 'name'
            ,allowBlank: false
        },{
            xtype: 'textfield'
            ,fieldLabel: _('version')
            ,name: 'version'
            ,allowBlank: false
        },{
            xtype: 'textfield'
            ,fieldLabel: _('release')
            ,name: 'release'
            ,allowBlank: false
        }]
        ,listeners: {
            'success': {fn:function(o) {
                var c = o.options;
                Ext.getCmp('grid-vehicle').refresh();
                Ext.callback(c.proceed,c.scope || this,['pb-selvehicle']);
            },scope:this}
        }
    });
    MODx.panel.PackageInfo.superclass.constructor.call(this,config);
};
Ext.extend(MODx.panel.PackageInfo,MODx.FormPanel);
Ext.reg('panel-pb-info',MODx.panel.PackageInfo);

/**
 * 
 * @class MODx.panel.SelectVehicles
 * @extends MODx.FormPanel
 * @param {Object} config An object of config properties
 * @xtype panel-pb-selvehicle
 */
MODx.panel.SelectVehicles = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'pb-selvehicle'
        ,back: 'pb-info'
        ,url: MODx.config.connectors_url+'workspace/builder/vehicle.php'
        ,baseParams: {
            action: 'create'
        }
        ,bodyStyle: 'padding: 3em 3em'
        ,defaults: { labelSeparator: '' }
        ,items: [{
            html: '<h2>'+_('vehicles_add')+'</h2>'
            ,border: false
        },{
            html: '<p>'+_('vehicles_desc')+'</p>'
            ,border: false
        },{
            xtype: 'grid-vehicle'
            ,id: 'grid-vehicle'
            ,preventRender: true
        }]
    });
    MODx.panel.SelectVehicles.superclass.constructor.call(this,config);
};
Ext.extend(MODx.panel.SelectVehicles,MODx.FormPanel,{
    submit: function(o) {
        Ext.callback(o.proceed,o.scope || this,['pb-build']);
    }
});
Ext.reg('panel-pb-selvehicle',MODx.panel.SelectVehicles);


/**
 * 
 * @class MODx.panel.BuildPackage
 * @extends MODx.FormPanel
 * @param {Object} config An object of config properties
 * @xtype panel-pb-build
 */
MODx.panel.BuildPackage = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'pb-build'
        ,back: 'pb-selvehicle'
        ,url: MODx.config.connectors_url+'workspace/builder/index.php'
        ,baseParams: {
            action: 'build'
        }
        ,bodyStyle: 'padding: 3em 3em'
        ,defaults: { labelSeparator: '', border: false }
        ,items: [{
            html: '<h2>'+_('package_build')+'</h2>'
        },{
            html: '<p>'+_('package_build_desc')+'</p>'
        }]
        ,listeners: {
            'success': {fn:function(o) {
                MODx.msg.alert('',_('package_built'),function() {
                    var c = o.options;
                    Ext.getCmp('pb-info').getForm().reset();
                    Ext.callback(c.proceed,c.scope || this,['pb-info']);
                },this);
            },scope:this}
        }
    });
    MODx.panel.BuildPackage.superclass.constructor.call(this,config);
};
Ext.extend(MODx.panel.BuildPackage,MODx.FormPanel);
Ext.reg('panel-pb-build',MODx.panel.BuildPackage);