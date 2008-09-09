<?php
/**
 * @package modx
 * @subpackage processors.context.setting
 */

require_once MODX_PROCESSORS_PATH.'index.php';
$modx->lexicon->load('setting');

$_POST['context_key'] = isset($_POST['fk']) ? $_POST['fk'] : 0;

$ae = $modx->getObject('modSystemSetting',array(
    'key' => $_POST['key'],
    'context_key' => $_POST['context_key'],
));
if ($ae != null) $modx->error->failure($modx->lexicon('setting_err_ae'));

$setting= $modx->newObject('modContextSetting');
$setting->fromArray($_POST,'',true);

// set lexicon name/description
$entry = $modx->getObject('modLexiconEntry',array(
    'namespace' => $namespace->name,
    'name' => 'setting_'.$_POST['key'],
));
if ($entry == null) {
    $entry = $modx->newObject('modLexiconEntry');
    $entry->set('namespace',$namespace->name);
    $entry->set('name','setting_'.$_POST['key']);
    $entry->set('value',$_POST['name']);
    $entry->save();
}
$description = $modx->getObject('modLexiconEntry',array(
    'namespace' => $namespace->name,
    'name' => 'setting_'.$_POST['key'].'_desc',
));
if ($description == null) {
    $description = $modx->newObject('modLexiconEntry');
    $description->set('namespace',$namespace->name);
    $description->set('name','setting_'.$_POST['key'].'_desc');
    $description->set('value',$_POST['description']);
    $description->save();
}


if ($setting->save() === false) {
    $modx->error->checkValidation($setting);
    $modx->error->failure($modx->lexicon('setting_err_save'));
}

$modx->reloadConfig();

$modx->error->success();