/**
 * Loads a grid for managing lexicon topics.
 * 
 * @class MODx.grid.LexiconTopic
 * @extends MODx.grid.Grid
 * @param {Object} config An object of configuration properties
 * @xtype modx-grid-lexicon-topic
 */
MODx.grid.LexiconTopic = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('lexicon_topics')
        ,id: 'modx-grid-lexicon-topic'
        ,url: MODx.config.connectors_url+'workspace/lexicon/topic.php'
        ,fields: ['id','name','namespace','menu']
        ,baseParams: {
            action: 'getList'
            ,'namespace': 'core'
        }
        ,saveParams: {
        	'namespace': 'core'
        }
        ,width: '97%'
        ,paging: true
        ,autosave: true
        ,columns: [{
            header: _('name')
            ,dataIndex: 'name'
            ,width: 200
            ,sortable: true
        },{
            header: _('namespace')
            ,dataIndex: 'namespace'
            ,width: 500
            ,sortable: false
            ,editor: { 
                xtype: 'modx-combo-namespace'
                ,renderer: true
            }
        }]
        ,tbar: [{
            xtype: 'modx-combo-namespace'
            ,name: 'namespace'
            ,id: 'modx-lexicon-topic-filter-namespace'
            ,value: 'core'
            ,listeners: {
                'change': {fn:this.filter.createDelegate(this,['namespace'],true),scope:this}
            }
        },'->',{
            text: _('search_by_key')
        },{
            xtype: 'textfield'
            ,name: 'name'
            ,id: 'modx-lexicon-topic-filter-name'
            ,listeners: {
                'change': {fn:this.filter.createDelegate(this,['name'],true),scope:this}
                ,'render': {fn:function(tf) {
                    tf.getEl().addKeyListener(Ext.EventObject.ENTER,function() {
                        tf.fireEvent('change'); 
                    },this);
                }}
            }
        },{
            text: _('create_new')
            ,xtype: 'button'
            ,menu: [{
                text: _('topic')
                ,handler: this.loadWindow2.createDelegate(this,[{
                    xtype: 'modx-window-lexicon-topic-create'
                    ,listeners: {
                        'success':{fn:function() {
                            this.refresh();
                            var cb = Ext.getCmp('modx-lexicon-filter-topic');
                            if (cb) { cb.store.reload(); }
                        },scope: this}
                    }
                }],true)
                ,scope: this
            },{
                text: _('namespace')
                ,handler: this.loadWindow2.createDelegate(this,[{
                    xtype: 'modx-window-namespace-create'
                    ,listeners: {
                        'success':{fn:function() {
                            Ext.getCmp('modx-lexicon-topic-filter-namespace').store.reload();
                            var cb = Ext.getCmp('modx-lexicon-filter-namespace');
                            if (cb) { cb.store.reload(); }
                        },scope: this}
                    }
                }],true)
                ,scope: this
            }]
        }]
    });
    MODx.grid.LexiconTopic.superclass.constructor.call(this,config);
};
Ext.extend(MODx.grid.LexiconTopic,MODx.grid.Grid,{
    filter: function(cb,nv,ov,name) {
        if (!name) { return false; }
        this.getStore().baseParams[name] = nv;
        this.config.saveParams[name] = nv;
        this.getBottomToolbar().changePage(1);
        this.refresh();
    }
    ,loadWindow2: function(btn,e,o) {
        this.menu.record = {
            'namespace': Ext.getCmp('modx-lexicon-topic-filter-namespace').getValue()
        };
        this.loadWindow(btn,e,o);
    }
});
Ext.reg('modx-grid-lexicon-topic',MODx.grid.LexiconTopic);

/**
 * Generates the create lexicon topic window.
 *  
 * @class MODx.window.CreateLexiconTopic
 * @extends MODx.Window
 * @param {Object} config An object of options.
 * @xtype modx-window-lexicon-topic-create
 */
MODx.window.CreateLexiconTopic = function(config) {
    config = config || {};
    var r = config.record;
    Ext.applyIf(config,{
        title: _('topic_create')
        ,url: MODx.config.connectors_url+'workspace/lexicon/topic.php'
        ,action: 'create'
        ,fields: [{
            xtype: 'textfield'
            ,fieldLabel: _('name')
            ,name: 'name'
            ,id: 'modx-clt-name'
            ,width: 250
            ,maxLength: 100
        },{
            xtype: 'modx-combo-namespace'
            ,fieldLabel: _('namespace')
            ,name: 'namespace'
            ,id: 'modx-clt-namespace'
            ,value: r['namespace']
        }]
    });
    MODx.window.CreateLexiconTopic.superclass.constructor.call(this,config);
};
Ext.extend(MODx.window.CreateLexiconTopic,MODx.Window);
Ext.reg('modx-window-lexicon-topic-create',MODx.window.CreateLexiconTopic);
