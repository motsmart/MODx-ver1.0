MODx.panel.GroupsRoles = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'modx-panel-groups-roles'
        ,defaults: { collapsible: false ,autoHeight: true }
        ,items: [{ 
             html: '<h2>'+_('access_permissions')+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
            ,id: 'modx-access-permissions-header'
        },{
            xtype: 'portal'
            ,items: [{
                columnWidth: 1
                ,style:'padding:10px;'
                ,defaults: {
                    collapsible: true
                    ,autoHeight: true
                    ,titleCollapse: true
                    ,draggable: true
                    ,style: 'padding: 5px 0;'
                    ,bodyStyle: 'padding: 10px'
                }
                ,items: [{
                    title: _('user_groups')
                    ,items: [{
                        html: '<p>'+_('user_group_management_msg')+'</p>'
                        ,border: false
                    },{
                        xtype: 'tree-usergroup'
                        ,title: ''
                        ,id: 'gr-tree-usergroup'
                    }]
                },{
                    title: _('roles')
                    ,items: [{
                        xtype: 'grid-role'
                        ,title: ''
                        ,preventRender: true
                    }]
                }]
            }]
        }]
    });
    MODx.panel.GroupsRoles.superclass.constructor.call(this,config);
};
Ext.extend(MODx.panel.GroupsRoles,MODx.FormPanel);
Ext.reg('panel-groups-roles',MODx.panel.GroupsRoles);