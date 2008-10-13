<?php
/**
 * @package modx
 * @subpackage processors.context.setting
 */
require_once MODX_PROCESSORS_PATH.'index.php';
$modx->lexicon->load('setting');

if (!$modx->hasPermission('settings')) $modx->error->failure($modx->lexicon('permission_denied'));

if (!isset($_POST['key'],$_POST['context_key'])) $modx->error->failure($modx->lexicon('setting_err_ns'));
if (!$context = $modx->getObject('modContext', $_POST['context_key'])) $modx->error->failure($modx->lexicon('setting_err_nf'));

if (!$context->checkPolicy('view')) $modx->error->failure($modx->lexicon('permission_denied'));

$setting = $modx->getObject('modContextSetting',array(
    'key' => $_POST['key'],
    'context_key' => $_POST['context_key'],
));
if ($setting == null) $modx->error->failure($modx->lexicon('setting_err_nf'));

$modx->error->success('',$setting);