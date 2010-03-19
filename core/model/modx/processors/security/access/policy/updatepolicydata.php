<?php
/**
 * Update a policy attribute value
 *
 * @param integer $id The ID of the policy
 * @param string $key The attribute key
 * @param boolean $value The value of the attribute
 *
 * @package modx
 * @subpackage processors.security.access.policy
 */
$modx->lexicon->load('policy');

if (!$modx->hasPermission('access_permissions')) return $modx->error->failure($modx->lexicon('permission_denied'));

if (!isset($scriptProperties['id'])) return $modx->error->failure('Policy id not specified!');

/* get policy */
$policy = $modx->getObject('modAccessPolicy',$scriptProperties['id']);
if ($policy == null) return $modx->error->failure('Policy not found!');

/* parse data from JSON */
$ar = $policy->get('data');

if (!isset($ar[$scriptProperties['key']])) return $modx->error->failure('Policy property not found!');

/* format policy value */
if ($scriptProperties['value'] === 'true') $scriptProperties['value'] = true;
if ($scriptProperties['value'] === 'false') $scriptProperties['value'] = false;

/* set policy value */
$ar[$scriptProperties['key']] = $scriptProperties['value'];

$policy->set('data',$modx->toJSON($ar));

/* save policy */
if ($policy->save() == false) {
    return $modx->error->failure('An error occurred while saving the policy data.');
}

return $modx->error->success();