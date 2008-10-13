<?php
/**
 * @package modx
 * @subpackage processors.security.access.policy
 */
require_once MODX_PROCESSORS_PATH.'index.php';
$modx->lexicon->load('policy');

if (!$modx->hasPermission('access_permissions')) $modx->error->failure($modx->lexicon('permission_denied'));

if (!isset($_REQUEST['id'])) $modx->error->failure('Policy id not specified!');

/* get policy */
$policy = $modx->getObject('modAccessPolicy',$_REQUEST['id']);
if ($policy == null) $modx->error->failure('Policy not found!');

/* parse data from JSON */
$ar = $modx->fromJSON($policy->get('data'));
if (!isset($ar[$_REQUEST['key']])) $modx->error->failure('Policy property not found!');

/* set policy value */
unset($ar[$_REQUEST['key']]);
$policy->set('data',$modx->toJSON($ar));

/* save policy */
if ($policy->save() == false) {
    $modx->error->failure('An error occurred while saving the policy data.');
}
$modx->error->success();