<?php
/**
 * Unpublishes a resource.
 *
 * @param integer $id The ID of the resource
 * @return array An array with the ID of the unpublished resource
 *
 * @package modx
 * @subpackage processors.resource
 */
$modx->lexicon->load('resource');

$resource = $modx->getObject('modResource',$_REQUEST['id']);
if ($resource == null) return $modx->error->failure($modx->lexicon('resource_err_nfs',array('id' => $_REQUEST['id'])));

if (!$modx->hasPermission('publish_document')) {
    return $modx->error->failure($modx->lexicon('permission_denied'));
}

/* check permissions on the resource */
if (!$resource->checkPolicy(array('save'=>true, 'unpublish'=>true))) {
    return $modx->error->failure($modx->lexicon('permission_denied'));
}

/* update the resource */
$resource->set('published',false);
$resource->set('pub_date',false);
$resource->set('unpub_date',false);
$resource->set('editedby',$modx->user->get('id'));
$resource->set('editedon',time());
$resource->set('publishedby',false);
$resource->set('publishedon',false);
if ($resource->save() == false) {
	return $modx->error->failure($modx->lexicon('resource_err_unpublish'));
}

/* invoke OnDocUnpublished event */
$modx->invokeEvent('OnDocUnpublished',array('docid' => $resource->get('id')));

/* log manager action */
$modx->logManagerAction('unpublish_resource','modResource',$resource->get('id'));

/* empty the cache */
$cacheManager= $modx->getCacheManager();
$cacheManager->clearCache();

return $modx->error->success('',$resource->get(array('id')));