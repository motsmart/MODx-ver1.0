<?php
/**
 * @package modx
 * @subpackage processors.security.resourcegroup
 */
if (!$modx->hasPermission('access_permissions')) return $modx->error->failure($modx->lexicon('permission_denied'));

if (!isset($_REQUEST['start'])) $_REQUEST['start'] = 0;
if (!isset($_REQUEST['limit'])) $_REQUEST['limit'] = 10;
if (!isset($_REQUEST['sort'])) $_REQUEST['sort'] = 'name';
if (!isset($_REQUEST['dir'])) $_REQUEST['dir'] = 'ASC';

$c = $modx->newQuery('modResourceGroup');
$c->sortby($_REQUEST['sort'],$_REQUEST['dir']);
$groups = $modx->getCollection('modResourceGroup',$c);

$gs = array();
foreach ($groups as $g) {
	$gs[] = $g->toArray();
}
$count= count($gs);
return $this->outputArray($gs,$count);