Ext.namespace('MODx','MODx.grid','MODx.window');
/**
 * Loads a grid of content types
 * 
 * @class MODx.grid.ContentType
 * @extends MODx.grid.Grid
 * @constructor
 * @param {Object} config An object of options.
 * @xtype grid-contenttype
 */
MODx.grid.ContentType = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('content_types')
        ,url: MODx.config.connectors_url+'system/contenttype.php'
        ,fields: ['id','name','mime_type','file_extensions','headers','binary','description','menu']
        ,paging: true
        ,autosave: true
        ,remoteSort: true
        ,columns: [{
            header: _('id')
            ,dataIndex: 'id'
            ,width: 50
            ,sortable: true
        },{
            header: _('name')
            ,dataIndex: 'name'
            ,sortable: true
            ,editor: { xtype: 'textfield' }
        },{
            header: _('description')
            ,dataIndex: 'description'
            ,editor: { xtype: 'textfield' }
            ,width: 200
        },{
            header: _('mime_type')
            ,dataIndex: 'mime_type'
            ,sortable: true
            ,editor: { xtype: 'textfield' }
            ,width: 80
        },{
            header: _('file_extensions')
            ,dataIndex: 'file_extensions'
            ,sortable: true
            ,editor: { xtype: 'textfield' }
        },{
            header: _('binary')
            ,dataIndex: 'binary'
            ,width: 40
            ,sortable: true
            ,editor: { xtype: 'combo-boolean', renderer: 'boolean' }
        }]
        ,tbar: [{
            text: _('content_type_new')
            ,handler: { xtype: 'window-contenttype-create' ,blankValues: true }
        }]
    });
    MODx.grid.ContentType.superclass.constructor.call(this,config);
};
Ext.extend(MODx.grid.ContentType,MODx.grid.Grid);
Ext.reg('grid-contenttype',MODx.grid.ContentType);

/** 
 * Generates the ContentType window.
 *  
 * @class MODx.window.ContentType
 * @extends MODx.Window
 * @constructor
 * @param {Object} config An object of options.
 * @xtype window-contenttype-create
 */
MODx.window.CreateContentType = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('content_type_new')
        ,width: 350
        ,url: MODx.config.connectors_url+'system/contenttype.php'
        ,action: 'create'
        ,fields: [{
            fieldLabel: _('name')
            ,name: 'name'
            ,xtype: 'textfield'
            ,width: 200
            ,allowBlank: false
        },{
            fieldLabel: _('mime_type')
            ,name: 'mime_type'
            ,xtype: 'textfield'
            ,description: _('mime_type_desc')
            ,width: 200
            ,allowBlank: false
        },{
            fieldLabel: _('file_extensions')
            ,name: 'file_extensions'
            ,xtype: 'textfield'
            ,description: _('file_extensions_desc')
            ,width: 200
            ,allowBlank: false
        },{
            xtype: 'combo-boolean'
            ,fieldLabel: _('binary')
            ,name: 'binary'
            ,description: _('binary_desc')
            ,width: 60
            ,value: 0
        },{
            fieldLabel: _('description')
            ,name: 'description'
            ,xtype: 'textarea'
            ,width: 200
            ,grow: true
        }]
    });
    MODx.window.CreateContentType.superclass.constructor.call(this,config);
};
Ext.extend(MODx.window.CreateContentType,MODx.Window);
Ext.reg('window-contenttype-create',MODx.window.CreateContentType);