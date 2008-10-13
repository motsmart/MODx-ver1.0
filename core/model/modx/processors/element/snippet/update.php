<?php
/**
 * @package modx
 * @subpackage processors.element.snippet
 */
require_once MODX_PROCESSORS_PATH.'index.php';
$modx->lexicon->load('snippet','category');

if (!$modx->hasPermission('save_snippet')) $modx->error->failure($modx->lexicon('permission_denied'));

/* get snippet */
$snippet = $modx->getObject('modSnippet',$_REQUEST['id']);
if ($snippet == null) $modx->error->failure($modx->lexicon('snippet_err_not_found'));

/* check if locked, if so, prevent access */
if ($snippet->get('locked') && $modx->hasPermission('edit_locked') == false) {
    $modx->error->failure($modx->lexicon('snippet_err_locked'));
}

/* validation */
if ($_POST['name'] == '') $modx->error->addField('name',$modx->lexicon('snippet_err_not_specified_name'));

/* sanity check on name */
$_POST['name'] = str_replace('>','',$_POST['name']);
$_POST['name'] = str_replace('<','',$_POST['name']);

$name_exists = $modx->getObject('modSnippet',array(
	'id:!=' => $snippet->get('id'),
	'name' => $_POST['name']
));
if ($name_exists != null) $modx->error->addField('name',$modx->lexicon('snippet_err_exists_name'));

if ($modx->error->hasError()) $modx->error->failure();

/* category */
if (is_numeric($_POST['category'])) {
    $category = $modx->getObject('modCategory',array('id' => $_POST['category']));
} else {
    $category = $modx->getObject('modCategory',array('category' => $_POST['category']));
}
if ($category == null) {
	$category = $modx->newObject('modCategory');
	if ($_POST['category'] == '' || $_POST['category'] == 'null') {
		$category->set('id',0);
	} else {
		$category->set('category',$_POST['category']);
		if ($category->save() == false) {
            $modx->error->failure($modx->lexicon('category_err_save'));
        }
	}
}

/* invoke OnBeforeSnipFormSave event */
$modx->invokeEvent('OnBeforeSnipFormSave',array(
	'mode' => 'new',
	'id' => $snippet->get('id'),
));

$snippet->fromArray($_POST);
$snippet->set('locked',isset($_POST['locked']));
$snippet->set('category',$category->get('id'));

if ($snippet->save() == false) {
    $modx->error->failure($modx->lexicon('snippet_err_save'));
}

/* invoke OnSnipFormSave event */
$modx->invokeEvent('OnSnipFormSave',array(
	'mode' => 'new',
	'id' => $snippet->get('id'),
));

/* log manager action */
$modx->logManagerAction('snippet_update','modSnippet',$snippet->get('id'));

/* empty cache */
$cacheManager= $modx->getCacheManager();
$cacheManager->clearCache();

$modx->error->success();