<select id="tv{$tv->id}" name="tv{$tv->id}"
	onchange="documentDirty=true;"
	size="8"
>
{foreach from=$opts item=item}
	<option value="{$item.value}" {if $item.selected} selected="selected"{/if}>{$item.text}</option>
{/foreach}
</select>