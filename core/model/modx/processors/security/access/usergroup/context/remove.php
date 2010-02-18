<?php
/**
 * Remove a context ACL for a usergroup
 *
 * @param integer $id The ID of the ACL
 *
 * @package modx
 * @subpackage processors.security.access.usergroup
 */
if (!$modx->hasPermission('access_permissions')) return $modx->error->failure($modx->lexicon('permission_denied'));
$modx->lexicon->load('access');

/* get usergroup acl */
if (empty($_POST['id'])) return $modx->error->failure($modx->lexicon('access_context_err_ns'));
$acl = $modx->getObject('modAccessContext',$_POST['id']);
if (empty($acl)) return $modx->error->failure($modx->lexicon('access_context_err_nf').print_r($_POST,true));

/* remove acl */
if ($acl->remove() == false) {
    return $modx->error->failure($modx->lexicon('access_context_err_remove'));
}

return $modx->error->success();