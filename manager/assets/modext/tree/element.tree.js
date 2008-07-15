Ext.namespace('MODx','MODx.tree');
/**
 * Generates the Element Tree in Ext
 * 
 * @class MODx.tree.Element
 * @extends MODx.tree.Tree
 * @constructor
 * @param {Object} config An object of options.
 * @xtype tree-element
 */
MODx.tree.Element = function(config) {
	config = config || {};
	Ext.applyIf(config,{
		rootVisible: false
		,enableDrag: true
		,enableDrop: true
		,title: ''
		,url: MODx.config.connectors_url+'layout/tree/element.php'
	});
	MODx.tree.Element.superclass.constructor.call(this,config);
};
Ext.extend(MODx.tree.Element,MODx.tree.Tree,{
	forms: {}
	,windows: {}
	,stores: {}
		
	,showNewCategory: function(node,e) {
		var id = this.cm.activeNode.id.substr(2);
		
		if (!this.windows.createCategory) {
			this.windows.createCategory = new MODx.window.CreateCategory({
				success: this.refresh
				,scope: this
			});
		}
		this.windows.createCategory.show(e.target);
	}
		
	,removeCategory: function(item,e) {
		var id = this.cm.activeNode.id.substr(2).split('_'); id = id[2];
		MODx.msg.confirm({
			title: _('warning')
			,text: _('category_confirm_delete')
			,connector: MODx.config.connectors_url+'element/category.php'
			,params: {
				action: 'delete'
				,id: id
			}
			,scope: this
			,success: this.refresh
		});
	}
	    
    ,duplicateElement: function(itm,e,id,type) {
        var r = {
            id: id
            ,type: type
            ,name: _('duplicate_of')+this.cm.activeNode.text
        };
        
        if (!this.windows.duplicateElement) {
            this.windows.duplicateElement = new MODx.window.DuplicateElement({
                success: this.refresh
                ,scope: this
                ,record: r
            });
        } else {
            var u = MODx.config.connectors_url+'element/'+type+'.php';
            this.windows.duplicateElement.fp.getForm().url = u;
        }
        this.windows.duplicateElement.setValues(r);
        this.windows.duplicateElement.show(e.target);
    }
	
	,removeElement: function(itm,e) {
		var id = this.cm.activeNode.id.substr(2);
		var oar = id.split('_');
		MODx.msg.confirm({
			title: _('warning')
			,text: _('remove_this_confirm')+' '+oar[0]+'?'
			,connector: MODx.config.connectors_url+'element/'+oar[0]+'.php'
			,params: {
				action: 'delete'
				,id: oar[2]
			}
			,scope: this
			,success: this.refresh
		});
	}
	
	,_createElement: function(item,e) {
		var id = this.cm.activeNode.id.substr(2);
		var oar = id.split('_');
		var type = oar[0] == 'type' ? oar[1] : oar[0];
		var cat_id = oar[0] == 'type' ? 0 : (oar[1] == 'category' ? oar[2] : oar[3]);
        var a = MODx.action['element/'+type+'/create'];
		this.redirect('index.php?a='+a+'&category='+cat_id);
		this.cm.hide();
		return false;
	}
		
	,_handleDrop: function(e) {
		var target = e.target;
		if(e.point == 'above' || e.point == 'below') {
			target = e.target.parentNode;
		}
        if (!this.isCorrectType(e.dropNode,target)) return false;
		
		return e.target.getDepth() > 0;
	}
    
    ,isCorrectType: function(dropNode,targetNode) {
        var r = false;
        // types must be the same
        if(targetNode.attributes.type == dropNode.attributes.type) {
            // don't allow nesting of categories or anything to be dropped on an element
            if(! (targetNode.parentNode && ((dropNode.attributes.cls == 'folder' && targetNode.attributes.cls == 'folder' && dropNode.parentNode.id == targetNode.parentNode.id) || targetNode.attributes.cls == 'file'))) {
                r = true;
            }
        }
        return r;
    }
});
Ext.reg('tree-element',MODx.tree.Element);


/** 
 * Generates the Duplicate Element window
 * 
 * @class MODx.window.DuplicateElement
 * @extends MODx.Window
 * @constructor
 * @param {Object} config An object of options.
 * @xtype window-element-duplicate
 */
MODx.window.DuplicateElement = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('element_duplicate')
        ,url: MODx.config.connectors_url+'element/'+config.record.type+'.php'
        ,action: 'duplicate'
        ,fields: [{
            xtype: 'hidden'
            ,name: 'id'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('element_name_new')
            ,name: 'name'
            ,width: 250
        }]
    });
    MODx.window.DuplicateElement.superclass.constructor.call(this,config);
};
Ext.extend(MODx.window.DuplicateElement,MODx.Window);
Ext.reg('window-element-duplicate',MODx.window.DuplicateElement);