/**
 * Loads the resource update page
 * 
 * @class MODx.page.UpdateResource
 * @extends MODx.Component
 * @param {Object} config An object of config properties
 * @xtype modx-page-resource-update
 */
MODx.page.UpdateResource = function(config) {
    config = config || {};
    Ext.applyIf(config,{
    	url: MODx.config.connectors_url+'resource/index.php'
        ,which_editor: 'none'
        ,formpanel: 'modx-panel-resource'
    	,actions: {
            'new': MODx.action['resource/create']
            ,edit: MODx.action['resource/update']
            ,preview: MODx.action['resource/preview']
            ,cancel: MODx.action['welcome']
        }
    	,loadStay: true
        ,components: [{
            xtype: 'modx-panel-resource'
            ,renderTo: 'modx-panel-resource'
            ,resource: config.id
            ,class_key: config.class_key
            ,publish_document: config.publish_document
            ,edit_doc_metatags: config.edit_doc_metatags
            ,access_permissions: config.access_permissions
            ,template: config.template
        }]
        ,buttons: [{
            process: 'update'
            ,javascript: config.which_editor != 'none' ? "cleanupRTE('"+config.which_editor+"');" : ';'
            ,text: _('save')
            ,method: 'remote'
            ,checkDirty: true
            ,keys: [{
                key: 's'
                ,alt: true
                ,ctrl: true
            }]
        },'-',{
            process: 'duplicate'
            ,text: _('duplicate')
            ,handler: this.duplicate
            ,scope:this
        },'-',{
            process: 'preview'
            ,text: _('preview')
            ,handler: this.preview.createDelegate(this,[config.id])
            ,scope: this
        },'-',{
            process: 'cancel'
            ,text: _('cancel')
            ,params: { a: MODx.action['welcome'] }
        }]
    });
    MODx.page.UpdateResource.superclass.constructor.call(this,config);
};
Ext.extend(MODx.page.UpdateResource,MODx.Component,{
    preview: function(id) {
        window.open(MODx.config.base_url+'index.php?id='+id);
        return false;
    }
    
    ,duplicate: function(btn,e) {
        MODx.msg.confirm({
            text: _('resource_duplicate_confirm')
            ,url: MODx.config.connectors_url+'resource/index.php'
            ,params: {
                action: 'duplicate'
                ,id: this.config.id
            }
            ,listeners: {
                success: {fn:function(r) {
                    location.href = '?a='+MODx.action['resource/update']+'&id='+r.object.id;
                },scope:this}
            }
        });
    }
});
Ext.reg('modx-page-resource-update',MODx.page.UpdateResource);