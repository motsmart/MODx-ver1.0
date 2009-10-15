<?php
/**
 * Deletes a category. Resets all elements with that category to 0.
 *
 * TODO: Move this logic to the modCategory class. Possibly also change grabbing
 * each element class to just modElement.
 *
 * @package modx
 * @subpackage processors.element.category
 */
if (!$modx->hasPermission('remove')) return $modx->error->failure($modx->lexicon('permission_denied'));
$modx->lexicon->load('category');

/* get category */
if (empty($_POST['id'])) return $modx->error->failure($modx->lexicon('category_err_ns'));
$category = $modx->getObject('modCategory',$_POST['id']);
if ($category == null) return $modx->error->failure($modx->lexicon('category_err_nf'));

/* remove category */
if ($category->remove() == false) {
    return $modx->error->failure($modx->lexicon('category_err_remove'));
}

/* log manager action */
$modx->logManagerAction('category_delete','modCategory',$category->get('id'));

return $modx->error->success('',$category);