<?php
/**
 * @package modx
 * @subpackage processors.security.user
 */
require_once MODX_PROCESSORS_PATH.'index.php';
$modx->lexicon->load('user');

if (!$modx->hasPermission(array('access_permissions' => true, 'save_user' => true))) {
    return $modx->error->failure($modx->lexicon('permission_denied'));
}

$_DATA = $modx->fromJSON($_POST['data']);

$user = $modx->getObject('modUser',$_DATA['id']);
if ($user == null) return $modx->error->failure($modx->lexicon('user_not_found'));

$up = $user->getOne('modUserProfile');
if ($up == null) return $modx->error->failure($modx->lexicon('user_profile_err_not_found'));

$up->set('gender',$_DATA['gender']);
$up->set('fullname',$_DATA['fullname']);
$up->set('blocked',$_DATA['blocked']);
$up->set('email',$_DATA['email']);

if ($up->save() == false) {
    return $modx->error->failure($modx->lexicon('user_err_save'));
}

/* log manager action */
$modx->logManagerAction('user_update','modUser',$user->get('id'));

return $modx->error->success();