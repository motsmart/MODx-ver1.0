<?php
/**
 * @package modx
 * @subpackage processors.workspace.providers
 */

require_once MODX_PROCESSORS_PATH.'index.php';
$modx->lexicon->load('workspace');

if (!$modx->hasPermission('providers')) return $modx->error->failure($modx->lexicon('permission_denied'));

if (!isset($_POST['id'])) return $modx->error->failure($modx->lexicon('provider_err_ns'));
$provider = $modx->getObject('transport.modTransportProvider',$_POST['id']);
if ($provider == null) {
    return $modx->error->failure(sprintf($modx->lexicon('provider_err_nfs'),$_POST['id']));
}

if (!$provider->remove()) return $modx->error->failure($modx->lexicon('provider_err_remove'));

return $modx->error->success();