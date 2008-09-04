Ext.onReady(function(){MODx.load({xtype:"page-search"})});MODx.page.Search=function(A){A=A||{};Ext.applyIf(A,{components:[{xtype:"grid-search",renderTo:"search_grid"},{xtype:"panel-search",id:"panel-search"}]});MODx.page.Search.superclass.constructor.call(this,A)};Ext.extend(MODx.page.Search,MODx.Component);Ext.reg("page-search",MODx.page.Search);MODx.panel.Search=function(A){A=A||{};Ext.applyIf(A,{title:_("search_criteria"),renderTo:"search_panel",width:500,items:this.getFields()});MODx.panel.Search.superclass.constructor.call(this,A)};Ext.extend(MODx.panel.Search,MODx.FormPanel,{filters:{},getFields:function(){var A={change:{fn:this.filter,scope:this},render:{fn:this._addEnterKeyHandler}};var B={check:{fn:this.filter,scope:this}};return[{xtype:"textfield",name:"id",fieldLabel:_("id"),listeners:A},{xtype:"textfield",name:"pagetitle",fieldLabel:_("pagetitle"),listeners:A},{xtype:"textfield",name:"longtitle",fieldLabel:_("long_title"),listeners:A},{xtype:"textarea",name:"content",fieldLabel:_("content"),width:300,grow:true,listeners:A},{xtype:"checkbox",name:"published",fieldLabel:_("published"),listeners:B},{xtype:"checkbox",name:"unpublished",fieldLabel:_("unpublished"),listeners:B},{xtype:"checkbox",name:"deleted",fieldLabel:_("deleted"),listeners:B},{xtype:"checkbox",name:"undeleted",fieldLabel:_("undeleted"),listeners:B}]},filter:function(D,C,A){var B=this.getForm().getValues();B.start=0;B.limit=20;Ext.getCmp("grid-search").getStore().load({params:B,scope:this})},_addEnterKeyHandler:function(){this.getEl().addKeyListener(Ext.EventObject.ENTER,function(){this.fireEvent("change")},this)}});Ext.reg("panel-search",MODx.panel.Search);MODx.grid.Search=function(A){A=A||{};Ext.applyIf(A,{title:_("search_results"),id:"grid-search",url:MODx.config.connectors_url+"resource/document.php",baseParams:{action:"search"},fields:["id","pagetitle","description","published","deleted","menu"],paging:true,remoteSort:true,columns:[{header:_("id"),dataIndex:"id",width:20,sortable:true},{header:_("pagetitle"),dataIndex:"pagetitle",sortable:true},{header:_("description"),dataIndex:"description"},{header:_("published"),dataIndex:"published",width:30,editor:{xtype:"combo-boolean",renderer:"boolean"},editable:false},{header:_("deleted"),dataIndex:"deleted",width:30,editor:{xtype:"combo-boolean",renderer:"boolean"},editable:false}]});MODx.grid.Search.superclass.constructor.call(this,A)};Ext.extend(MODx.grid.Search,MODx.grid.Grid);Ext.reg("grid-search",MODx.grid.Search);