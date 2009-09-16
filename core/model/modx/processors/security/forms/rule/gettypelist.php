<?php
/**
 * Gets a list of rule types.
 *
 * @package modx
 * @subpackage processors.security.forms.rule
 */
if (!$modx->hasPermission('access_permissions')) return $modx->error->failure($modx->lexicon('permission_denied'));
$modx->lexicon->load('formcustomization');

$data = array(
    array('name' => $modx->lexicon('field_visible'), 'id' => 'fieldVisible'),
    array('name' => $modx->lexicon('field_label'), 'id' => 'fieldTitle'),
    array('name' => $modx->lexicon('field_default'), 'id' => 'fieldDefault'),
    array('name' => $modx->lexicon('tab_visible'), 'id' => 'tabVisible'),
    array('name' => $modx->lexicon('tab_title'), 'id' => 'tabTitle'),
    array('name' => $modx->lexicon('tv_visible'), 'id' => 'tvVisible'),
    array('name' => $modx->lexicon('tv_label'), 'id' => 'tvTitle'),
    array('name' => $modx->lexicon('tv_default'), 'id' => 'tvDefault'),
);

return $this->outputArray($data);