<input id="tv{$tv->id}" name="tv{$tv->id}"
	type="text" class="datefield"
	value="{$tv->get('value')}"
	onblur="MODx.fireResourceFormChange();"
/>

<script type="text/javascript">
{literal}
MODx.load({
{/literal}
    xtype: 'datefield'
    ,applyTo: 'tv{$tv->id}'
    ,format: 'Y-m-d'
    ,width: 300
{literal}
});
{/literal}
</script>