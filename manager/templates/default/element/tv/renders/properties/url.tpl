<div id="tv-wprops-form{$tv}"></div>
{literal}

<script type="text/javascript">
// <![CDATA[
var params = {
{/literal}{foreach from=$params key=k item=v name='p'}
 '{$k}': '{$v}'{if NOT $smarty.foreach.p.last},{/if}
{/foreach}{literal}
};
var oc = {'change':{fn:function(){Ext.getCmp('modx-panel-tv').markDirty();},scope:this}};
MODx.load({
    xtype: 'panel'
    ,layout: 'form'
    ,autoHeight: true
    ,labelWidth: 150
    ,border: false
    ,items: [{
        xtype: 'textfield' 
        ,fieldLabel: _('url_display_text')
        ,name: 'prop_text'
        ,value: params['text'] || ''
        ,listeners: oc
    },{
        xtype: 'textfield' 
        ,fieldLabel: _('title')
        ,name: 'prop_title'
        ,value: params['title'] || ''
        ,listeners: oc
    },{
        xtype: 'textfield' 
        ,fieldLabel: _('class')
        ,name: 'prop_class'
        ,value: params['class'] || ''
        ,listeners: oc
    },{
        xtype: 'textfield' 
        ,fieldLabel: _('style')
        ,name: 'prop_style'
        ,value: params['style'] || ''
        ,listeners: oc
    },{
        xtype: 'textfield' 
        ,fieldLabel: _('target')
        ,name: 'prop_target'
        ,value: params['target'] || ''
        ,listeners: oc
    },{
        xtype: 'textfield' 
        ,fieldLabel: _('attributes')
        ,name: 'prop_attrib'
        ,value: params['attrib'] || ''
        ,listeners: oc
    }]
    ,renderTo: 'tv-wprops-form{/literal}{$tv}{literal}'
});
// ]]>
</script>
{/literal}