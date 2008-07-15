<?php
/**
 * @package modx
 * @subpackage processors.system.contenttype
 */

require_once MODX_PROCESSORS_PATH.'index.php';
$modx->lexicon->load('content_type');

if (!isset($_POST['name']) || $_POST['name'] == '') {
    $modx->error->failure($modx->lexicon('content_type_err_ns_name'));
}

$ct = $modx->newObject('modContentType');
$ct->fromArray($_POST);

if (!$ct->save()) {
    $modx->error->checkValidation($ct);
    $modx->error->failure($modx->lexicon('content_type_err_create'));
}


// log manager action
$modx->logManagerAction('content_type_create','modContentType',$ct->id);

$error->success('',$ct);