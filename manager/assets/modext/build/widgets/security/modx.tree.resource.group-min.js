MODx.tree.ResourceGroup=function(A){A=A||{};Ext.applyIf(A,{title:_("document_groups"),url:MODx.config.connectors_url+"security/documentgroup.php",root_id:"0",root_name:_("document_groups"),enableDrag:false,enableDrop:true,ddAppendOnly:true,useDefaultToolbar:true,tbar:[{text:_("create_document_group"),scope:this,handler:this.create}]});MODx.tree.ResourceGroup.superclass.constructor.call(this,A)};Ext.extend(MODx.tree.ResourceGroup,MODx.tree.Tree,{forms:{},windows:{},stores:{},removeResource:function(B,C){var E=this.cm.activeNode;var A=E.id.split("_");A=A[1];var D=E.parentNode.id.substr(2).split("_");D=D[1];MODx.msg.confirm({text:_("confirm_delete_document_group_document"),connector:this.config.url,params:{action:"removeDocument",document:A,document_group:D},scope:this,success:this.refresh})},remove:function(A,B){var D=this.cm.activeNode;var C=D.id.substr(2).split("_");C=C[1];MODx.msg.confirm({text:_("confirm_delete_document_group"),connector:this.config.url,params:{action:"remove",id:C},scope:this,success:this.refresh})},create:function(B,A){if(!this.windows.create){this.windows.create=new MODx.window.CreateDocumentGroup({success:this.refresh,scope:this})}this.windows.create.show(A.target)},_handleDrop:function(A){var C=A.dropNode;if(this.isDocCopy(A,C)){var B=new Ext.tree.TreeNode(Ext.apply({leaf:true,allowDelete:true,expanded:true},C.attributes));B.loader=undefined;if(A.target.attributes.options){A.target=this.createDGD(A.target,B.text)}A.dropNode=B;return true}return false},isDocCopy:function(C,D){var A=C.target.attributes;var B=D.attributes.id.split("_");B="n_"+B[1];if(C.target.findChild("id",B)!=null){return false}if(D.attributes.type!="modResource"){return false}if(C.point!="append"){return false}if(A.type!="modResourceGroup"){return false}if(A.leaf===true){return false}return true},createDGD:function(D,C){var B=this.getNodeById(D.attributes.cmpId);var A=new Ext.tree.TreeNode({text:C,cmpId:B.id,leaf:true,allowDelete:true,allowEdit:true,id:this._guid("o-")});B.childNodes[2].appendChild(A);B.childNodes[2].expand(false,false);return A},_handleDrag:function(B){Ext.Msg.show({title:_("please_wait"),msg:_("saving"),width:240,progress:true,closable:false});_resetProgress();for(var A=1;A<20;A++){setTimeout("MODx.util.Progress.time("+A+","+MODx.util.Progress.id+")",A*1000)}Ext.Ajax.request({url:this.config.url,scope:this,params:{resource:B.dropNode.attributes.id,resource_group:B.target.attributes.id,action:"updateDocumentsIn"},success:function(C,D){_resetProgress();Ext.Msg.hide();var C=Ext.decode(C.responseText);if(!C.success){Ext.Msg.alert(_("error"),C.message);this.refresh();return false}}})}});Ext.reg("tree-resourcegroup",MODx.tree.ResourceGroup);