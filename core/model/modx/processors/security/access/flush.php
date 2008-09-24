<?php
/**
 * @package modx
 * @subpackage processors.security.access
 */

require_once MODX_PROCESSORS_PATH.'index.php';
if (!$modx->hasPermission('access_permissions')) $modx->error->failure($modx->lexicon('permission_denied'));

if ($modx->getUser()) {
    $modx->user->getAttributes(array(), '', true);
}
$error->success();