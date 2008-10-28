<?php
/**
 * @package modx
 * @subpackage processors.system.menu
 */
require_once MODX_PROCESSORS_PATH.'index.php';
$modx->lexicon->load('action','menu');

if (!isset($_REQUEST['id'])) return $modx->error->failure($modx->lexicon('menu_err_ns'));
$menu = $modx->getObject('modMenu',$_REQUEST['id']);
if ($menu == null) return $modx->error->failure($modx->lexicon('menu_err_nf'));

return $modx->error->success('',$menu);