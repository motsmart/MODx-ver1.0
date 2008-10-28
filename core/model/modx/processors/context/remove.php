<?php
/**
 * @package modx
 * @subpackage processors.context
 */

require_once MODX_PROCESSORS_PATH.'index.php';
$modx->lexicon->load('context');

if (!$modx->hasPermission('delete_context')) return $modx->error->failure($modx->lexicon('permission_denied'));

$context= $modx->getObject('modContext', $_REQUEST['key']);
if ($context == null) return $modx->error->failure($modx->lexicon('context_err_nf'));
if ($context->get('key') == 'web' || $context->get('key') == 'mgr' || $context->get('key') == 'connector') {
    return $modx->error->failure($modx->lexicon('permission_denied'));
}

if ($context->remove() == false) {
    return $modx->error->failure($modx->lexicon('context_err_remove'));
}

/* log manager action */
$modx->logManagerAction('context_delete','modContext',$context->get('id'));

/* clear cache */
$cacheManager= $modx->getCacheManager();
$cacheManager->clearCache();

return $modx->error->success();