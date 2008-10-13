<?php
/**
 * @package modx
 * @subpackage processors.workspace.lexicon
 */
require_once MODX_PROCESSORS_PATH.'index.php';
$modx->lexicon->load('lexicon');

if (!$modx->hasPermission('lexicons')) $modx->error->failure($modx->lexicon('permission_denied'));

if (!isset($_POST['id'])) $modx->error->failure($modx->lexicon('entry_err_ns'));
$entry = $modx->getObject('modLexiconEntry',$_POST['id']);
if ($entry == null) {
    $modx->error->failure(sprintf($modx->lexicon('entry_err_nfs'),$_POST['id']));
}

if (!isset($_POST['topic'])) $modx->error->failure($modx->lexicon('topic_err_ns'));
$topic = $modx->getObject('modLexiconTopic',$_POST['focus']);
if ($topic == null) $modx->error->failure($modx->lexicon('topic_err_nf'));


$old_namespace = $entry->get('namespace');
$old_topic = $entry->getOne('modLexiconTopic');

if (!isset($_POST['name']) || $_POST['name'] == '') {
    $modx->error->failure($modx->lexicon('entry_err_ns_name'));
}

$entry->set('name',$_POST['name']);
$entry->set('value',$_POST['value']);
$entry->set('editedon',date('Y-m-d h:i:s'));
$entry->set('namespace',$_POST['namespace']);
$entry->set('topic',$topic->get('id'));
$entry->set('language',$_POST['language']);

if (!$entry->save()) $modx->error->failure($modx->lexicon('entry_err_save'));

$r = $modx->lexicon->clearCache($old_namespace.'/'.$old_topic->get('name').'.cache.php');
$r = $modx->lexicon->clearCache($entry->get('namespace').'/'.$topic->get('name').'.cache.php');

$modx->error->success();