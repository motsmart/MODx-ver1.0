<?php
/**
 * @package modx
 * @subpackage processors.security.access
 */

require_once MODX_PROCESSORS_PATH.'index.php';
$modx->lexicon->load('access');

if (!isset($_REQUEST['type']) || !isset($_REQUEST['id'])) {
    $error->failure($modx->lexicon('access_type_err_ns'));
}
$accessClass = $_REQUEST['type'];
$accessId = $_REQUEST['id'];

if ($acl = $modx->getObject($accessClass, $accessId)) {
    $acl->fromArray($_REQUEST);
    $acl->save();
}
$error->success();