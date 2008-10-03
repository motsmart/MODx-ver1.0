/**
 * Loads the create resource page
 * 
 * @class MODx.page.CreateSymLink
 * @extends MODx.Component
 * @param {Object} config An object of config properties
 * @xtype page-symlink-create
 */
MODx.page.CreateSymLink = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        url: MODx.config.connectors_url+'resource/document.php'
        ,formpanel: 'panel-symlink'
        ,which_editor: 'none'
        ,actions: {
            'new': MODx.action['resource/symlink/create']
            ,edit: MODx.action['resource/symlink/update']
            ,cancel: MODx.action['welcome']
        }
        ,buttons: [{
            process: 'create'
            ,text: _('save')
            ,method: 'remote'
            ,javascript: config.which_editor != 'none' ? "cleanupRTE('"+config.which_editor+"');" : ';'
            ,listeners: {
                'click': {fn:function(btn,e) {
                    var g = Ext.getCmp('grid-resource-security');
                    Ext.apply(this.ab.config.params,{
                        resource_groups: g.encodeModified()
                    });
                },scope:this}
                ,'success': function(o,i,r) {
                    Ext.getCmp('grid-resource-security').getStore().commitChanges();
                    var t = parent.Ext.getCmp('modx_document_tree');
                    t.refresh();
                }
            }
        },{
            process: 'cancel'
            ,text: _('cancel')
            ,params: { a: MODx.action['welcome'] }
        }]
        ,loadStay: true
        ,components: [{
            xtype: 'panel-symlink'
            ,renderTo: 'panel-symlink'
            ,resource: 0
            ,class_key: config.class_key
            ,publish_document: config.publish_document
            ,edit_doc_metatags: config.edit_doc_metatags
            ,access_permissions: config.access_permissions
            ,template: config.template
            ,parent: config.parent
        },{
            xtype: 'grid-resource-security'
            ,renderTo: 'grid-resource-security'
            ,id: 'grid-resource-security'
        },{
            xtype: 'panel-resource-tv'
            ,id: 'panel-resource-tv'
            ,class_key: config.class_key
            ,resource: 0
        }]
    });
    MODx.page.CreateSymLink.superclass.constructor.call(this,config);
};
Ext.extend(MODx.page.CreateSymLink,MODx.Component);
Ext.reg('page-symlink-create',MODx.page.CreateSymLink);