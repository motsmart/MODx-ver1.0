<?php
/**
 * @package modx
 * @subpackage processors.element.plugin
 */
$modx->lexicon->load('plugin');

if (!isset($_REQUEST['start'])) $_REQUEST['start'] = 0;
if (!isset($_REQUEST['sort'])) $_REQUEST['sort'] = 'name';
if (!isset($_REQUEST['dir'])) $_REQUEST['dir'] = 'ASC';

$c = $modx->newQuery('modPlugin');
$c->sortby($_REQUEST['sort'],$_REQUEST['dir']);
if (isset($_REQUEST['limit'])) {
    $c->limit($_REQUEST['limit'],$_REQUEST['start']);
}

$plugins = $modx->getCollection('modPlugin',$c);
$count = $modx->getCount('modPlugin');

$cs = array();
foreach ($plugins as $plugin) {
    $cs[] = $plugin->toArray();
}

return $this->outputArray($cs,$count);