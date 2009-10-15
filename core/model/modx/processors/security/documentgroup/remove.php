<?php
/**
 * Remove a resource group
 *
 * @param integer $id The ID of the resource group
 *
 * @package modx
 * @subpackage processors.security.documentgroup
 */
if (!$modx->hasPermission('access_permissions')) return $modx->error->failure($modx->lexicon('permission_denied'));
$modx->lexicon->load('user','access');

/* get resource group */
if (empty($_POST['id'])) return $modx->error->failure($modx->lexicon('resource_group_err_ns'));
$resourceGroup = $modx->getObject('modResourceGroup',$_POST['id']);
if ($resourceGroup == null) return $modx->error->failure($modx->lexicon('resource_group_err_nf'));

$modx->invokeEvent('OnBeforeDocGroupRemove',array(
    'group' => &$resourceGroup,
));

/* remove resource group */
if ($resourceGroup->remove() == false) {
    return $modx->error->failure($modx->lexicon('resource_group_err_remove'));
}

$modx->invokeEvent('OnDocGroupRemove',array(
    'group' => &$resourceGroup,
));

/* log manager action */
$modx->logManagerAction('delete_resource_group','modResourceGroup',$resourceGroup->get('id'));

return $modx->error->success('',$resourceGroup);