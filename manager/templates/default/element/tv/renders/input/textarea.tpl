<textarea id="tv{$tv->id}" name="tv{$tv->id}" cols="40" rows="15">{$tv->get('value')|escape}</textarea>

<script type="text/javascript">
// <![CDATA[
{literal}
MODx.load({
{/literal}
    xtype: 'textarea'
    ,applyTo: 'tv{$tv->id}'
    ,value: '{$tv->get('value')|escape:'javascript'}'
    ,height: 140
    ,enableKeyEvents: true
{literal}
    ,listeners: { 'keydown': { fn:MODx.fireResourceFormChange, scope:this}}
});
{/literal}
// ]]>
</script>