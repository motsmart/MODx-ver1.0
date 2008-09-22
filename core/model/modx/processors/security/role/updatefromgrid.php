<?php
/**
 * @package modx
 * @subpackage processors.security.role
 */

require_once MODX_PROCESSORS_PATH.'index.php';
$modx->lexicon->load('role');

if (!$modx->hasPermission(array('access_permissions' => true, 'save_role' => true))) $modx->error->failure($modx->lexicon('permission_denied'));

$_DATA = $modx->fromJSON($_POST['data']);

$role = $modx->getObject('modUserGroupRole',$_DATA['id']);
if ($role == NULL) $error->failure($modx->lexicon('role_err_nf'));

$role->fromArray($_DATA);

if (!$role->save()) $error->failure($modx->lexicon('role_err_save'));

// log manager action
$modx->logManagerAction('role_update','modUserGroupRole',$role->id);

$error->success();