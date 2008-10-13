<?php
/**
 * Loads the
 *
 * @package modx
 * @subpackage manager.security.role
 */
if(!$modx->hasPermission('edit_role')) $modx->error->failure($modx->lexicon('access_denied'));

/* get role */
$role = $modx->getObject('modUserGroupRole',$_REQUEST['id']);
if ($role == null) $modx->error->failure($modx->lexicon('role_err_nf'));


$modx->smarty->assign('role',$role);
$modx->smarty->display('security/role/update.tpl');