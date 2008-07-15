<?php
/**
 * @package modx
 * @subpackage processors.system.filesys.folder
 */

require_once MODX_PROCESSORS_PATH.'index.php';

if (!$modx->hasPermission('file_manager')) $error->failure($modx->lexicon('permission_denied'));

$dir = $_POST['path'].$_POST['folder'];

if (!file_exists($dir))
	$error->failure($modx->lexicon('file_folder_err_nf'));

if (!@rmdirr($dir))
	$error->failure($modx->lexicon('file_folder_err_remove'));



function rmdirr($dirname) {
	ob_start();
    if (!is_dir($dirname))
        return false;
    $dscan = array(realpath($dirname));
    $darr = array();
    while (!empty($dscan)) {
        $dcur = array_pop($dscan);
        $darr[] = $dcur;
        if ($d=opendir($dcur)) {
            while ($f=readdir($d)) {
                if ($f=='.' || $f=='..')
                    continue;
                $f=$dcur.'/'.$f;
                if (is_dir($f))
                    $dscan[] = $f;
                else
                    unlink($f);
            }
            closedir($d);
        }
    }
    for ($i=count($darr)-1; $i>=0; $i--) {
		@rmdir($darr[$i]);
    }
	ob_flush();
    return !is_dir($dirname);
}

$error->success();