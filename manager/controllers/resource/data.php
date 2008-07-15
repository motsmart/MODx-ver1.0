<?php
/**
 * Loads the resource data page 
 * 
 * @package modx
 * @subpackage manager.resource
 */

$resource = $modx->getObject('modResource', $_REQUEST['id']);
if ($resource == null) $modx->error('Resource with ID '.$_REQUEST['id'].' not found! ');

$resourceClass= isset ($_REQUEST['class_key']) ? $_REQUEST['class_key'] : $resource->get('class_key');
$resourceDir= strtolower(substr($resourceClass, 3));

$delegateView= dirname(__FILE__) . '/' . $resourceDir . '/' . basename(__FILE__);
if (file_exists($delegateView)) {
    $overridden= include_once ($delegateView);
    if ($overridden !== false) {
        return;
    }
}

$resource->getOne('CreatedBy');
$resource->getOne('EditedBy');
$resource->getOne('modTemplate');

$_SESSION['itemname'] = $resource->pagetitle;

$dkws = $resource->getMany('modResourceKeyword');
$resource->keywords = array();
foreach ($dkws as $dkw) {
	$resource->keywords[$dkw->keyword_id] = $dkw->getOne('modKeyword');
}
$keywords = array();
foreach ($resource->keywords as $kw) {
	$keywords[] = $kw->keyword;
}
$keywords = join($keywords,',');
$modx->smarty->assign('keywords',$keywords);

$server_offset_time= intval($modx->config['server_offset_time']);
$resource->set('createdon_adjusted',strftime('%c', $resource->createdon + $server_offset_time));
$resource->set('editedon_adjusted',strftime('%c', $resource->editedon + $server_offset_time));

$buffer = '';
$resource->_contextKey= $resource->get('context_key');
$cache_file = $modx->getCachePath() . $resource->getCacheFileName();
if (file_exists($cache_file)) {
    $handle = @fopen($cache_file, 'r');
    if ($handle) {
    	while (!feof($handle)) {
    		$buffer .= fgets($handle, 4096);
    	}
    	fclose ($handle);
    	$modx->smarty->assign('buffer', htmlspecialchars($buffer));
    }
}

$modx->smarty->assign('resource',$resource);

$modx->smarty->display('resource/data.tpl');