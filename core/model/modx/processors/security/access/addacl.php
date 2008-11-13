<?php
/**
 * @package modx
 * @subpackage processors.security.access
 */
$modx->lexicon->load('access');

if (!$modx->hasPermission('access_permissions')) return $modx->error->failure($modx->lexicon('permission_denied'));

if (!isset($_REQUEST['type'])) {
    return $modx->error->failure($modx->lexicon('access_type_err_ns'));
}
$accessClass = $_REQUEST['type'];
$targetClass = str_replace('Access', '', $accessClass);
$targetId = isset($_REQUEST['target']) ? $_REQUEST['target'] : 0;
$principalClass = isset($_REQUEST['principal_class']) ? $_REQUEST['principal_class'] : 'modUserGroup';
$principalId = isset($_REQUEST['principal']) ? intval($_REQUEST['principal']) : 0;

$authority = isset($_REQUEST['authority']) ? intval($_REQUEST['authority']) : 9999;
$policy = isset($_REQUEST['policy']) ? intval($_REQUEST['policy']) : 0;
$context = isset($_REQUEST['context_key']) ? $_REQUEST['context_key'] : null;



if (!$targetId || !$principalClass || !$principalId) {
    return $modx->error->failure($modx->lexicon('access_err_create_md'));
}
$c = array(
    'target' => $targetId,
    'principal_class' => $principalClass,
    'principal' => $principalId,
    'authority' => $authority,
    'policy' => $policy
);
if ($context !== null) $c['context_key'] = $context;

$acl = $modx->getObject($accessClass, $c);
if ($acl === null) {
    $acl = $modx->newObject($accessClass);
    $acl->fromArray($_REQUEST);
    if ($acl->save() == false) {
        return $modx->error->failure($modx->lexicon('access_err_save'));
    }
} else {
    return $modx->error->failure($modx->lexicon('access_err_ae'));
}

return $modx->error->success();