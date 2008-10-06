<?php
// check permissions
if (!$modx->hasPermission('new_document')) $modx->error->failure($modx->lexicon('access_denied'));

$resourceClass= isset ($_REQUEST['class_key']) ? $_REQUEST['class_key'] : 'modSymLink';
$resourceDir= strtolower(substr($resourceClass, 3));

$delegateView= dirname(__FILE__) . '/' . $resourceDir . '/' . basename(__FILE__);
if (file_exists($delegateView)) {
    $overridden= include_once ($delegateView);
    if ($overridden !== false) {
        return;
    }
}

$resource = $modx->newObject($resourceClass);

// restore saved form
$formRestored = false;
if ($modx->request->hasFormValues()) {
    $modx->request->loadFormValues();
    $formRestored = true;
}

if ($formRestored == true || isset ($_REQUEST['newtemplate'])) {
	foreach ($_POST as $key => $val) {
		$resource->set($key,$val);
	}
    $resource->set('content',$_POST['ta']);
    if (!empty ($resource->pub_date) && $resource->pub_date != '') {
        $pub_date = $resource->pub_date;
        list ($d, $m, $Y, $H, $M, $S) = sscanf($pub_date, "%2d-%2d-%4d %2d:%2d:%2d");
        $pub_date = strtotime("$m/$d/$Y $H:$M:$S");
        $resource->set('pub_date',$pub_date);
    }
    if (!empty ($resource->unpub_date) && $resource->unpub_date != '') {
        $unpub_date = $resource->unpub_date;
        list ($d, $m, $Y, $H, $M, $S) = sscanf($unpub_date, "%2d-%2d-%4d %2d:%2d:%2d");
        $unpub_date = strtotime("$m/$d/$Y $H:$M:$S");
        $resource->set('unpub_date',$unpub_date);
    }
}

// increase menu index if this is a new document
if (!isset($modx->config['auto_menuindex']) || $modx->config['auto_menuindex'])
	$menuindex = $modx->getCount('modResource',array('parent' => intval($_REQUEST['parent'])));
$resource->set('menuindex',isset($menuindex) ? $menuindex : 0);


// invoke OnDocFormPrerender event
$onDocFormPrerender = $modx->invokeEvent('OnDocFormPrerender',array('id' => 0));
if (is_array($onDocFormPrerender))
    $onDocFormPrerender = implode('',$onDocFormPrerender);
$modx->smarty->assign('onDocFormPrerender',$onDocFormPrerender);

// PARENT DOCUMENT
if (isset ($_REQUEST['id'])) {
	if ($_REQUEST['id'] == 0) {
		$parentname = $modx->config['site_name'];
	} else {
		$parent = $modx->getObject('modResource',$_REQUEST['id']);
		if ($parent == NULL) {
			$e->setError(8);
			$e->dumpError();
		}
		$parentname = $parent->pagetitle;
		$resource->set('parent',$parent->id);
	}
} else {
	$parentname = $modx->config['site_name'];
    $resource->set('parent',0);
}
$modx->smarty->assign('parentname',$parentname);

// KEYWORDS AND METATAGS
if($modx->hasPermission('edit_doc_metatags')) {

	// get list of site keywords - code by stevew! modified by Raymond
	$keywords = array ();
	$c = $modx->newQuery('modKeyword');
	$c = $c->sortby('keyword','ASC');
	$keywords = $modx->getCollection('modKeyword',$c);
	$modx->smarty->assign('keywords',$keywords);

	// get list of site META tags
	$metatags = $modx->getCollection('modMetatag');
	$modx->smarty->assign('metatags',$metatags);

}

$templateId = 0;
if (isset ($_REQUEST['newtemplate'])) {
    $templateId = $_REQUEST['newtemplate'];
}
//if (!$templateId) {
//    $templateId = $modx->config['default_template'];
//}
if (!$templateId || (!$template = $modx->getObject('modTemplate', $templateId))) {
    $templateId = 0;
}
$resource->set('template',$templateId);

$groupsarray = array ();
// set permissions on the document based on the permissions of the parent document
if (!empty ($_REQUEST['parent'])) {
    $dgds = $modx->getCollection('modResourceGroupResource',array('document' => $_REQUEST['parent']));
    foreach ($dgds as $dgd)
        $groupsarray[$dgd->id] = $dgd->document_group;
}

// retain selected doc groups between post
if (isset($_POST['docgroups'])) {
    $groupsarray = array_merge($groupsarray, $_POST['docgroups']);
}

$c = $modx->newQuery('modResourceGroup');
$c = $c->sortby('name','ASC');
$docgroups = $modx->getCollection('modResourceGroup',$c);
foreach ($docgroups as $docgroup) {
    $checked = in_array($docgroup->id,$groupsarray);
    $docgroup->selected= $checked;
}

$modx->smarty->assign('docgroups',$docgroups);
$modx->smarty->assign('hasdocgroups',count($docgroups) > 0);


// invoke OnDocFormRender event
$onDocFormRender = $modx->invokeEvent('OnDocFormRender',array('id' => 0));
if (is_array($onDocFormRender))
    $onDocFormRender = implode('',$onDocFormRender);
$modx->smarty->assign('onDocFormRender',$onDocFormRender);

$modx->smarty->assign('resource',$resource);

$modx->smarty->display('resource/symlink/create.tpl');

?>