<?php
/**
 * @package modx
 * @subpackage processors.security.access
 */
require_once MODX_PROCESSORS_PATH.'index.php';
$modx->lexicon->load('access');

if (!$modx->hasPermission('access_permissions')) return $modx->error->failure($modx->lexicon('permission_denied'));

if (!isset($_REQUEST['type'])) {
    return $modx->error->failure($modx->lexicon('access_type_err_ns'));
}
$accessClass = $_REQUEST['type'];

if (!isset($_REQUEST['start'])) $_REQUEST['start'] = 0;
if (!isset($_REQUEST['limit'])) $_REQUEST['limit'] = 10;
if (!isset($_REQUEST['sort'])) $_REQUEST['sort'] = '';
if (!isset($_REQUEST['dir'])) $_REQUEST['dir'] = 'ASC';

$targetClass = str_replace('Access', '', $accessClass);
$targetId = isset($_REQUEST['target']) ? $_REQUEST['target'] : 0;
$principalClass = isset($_REQUEST['principal_class']) ? $_REQUEST['principal_class'] : 'modUserGroup';
$principalId = isset($_REQUEST['principal']) ? intval($_REQUEST['principal']) : 0;

$c = $modx->newQuery($accessClass);
if ($targetId) {
    $c->where(array('target' => $targetId));
}
$c->where(array('principal_class' => $principalClass));
if ($principalId) {
    $c->where(array('principal' => $principalId));
}
if ($_REQUEST['sort']) {
    $c->sortby($_REQUEST['sort'],$_REQUEST['dir']);
}
if ($_REQUEST['sort'] != 'target') $c->sortby('target', 'ASC');
if ($_REQUEST['sort'] != 'principal_class') $c->sortby('principal_class', 'DESC');
if ($_REQUEST['sort'] != 'principal') $c->sortby('principal', 'ASC');
if ($_REQUEST['sort'] != 'authority') $c->sortby('authority', 'ASC');
if ($_REQUEST['sort'] != 'policy') $c->sortby('policy', 'ASC');
$objectGraph = '{"Target":{},"Policy":{}}';
$collection = $modx->getCollectionGraph($accessClass, $objectGraph, $c);

$data = array();
foreach ($collection as $key => $object) {
    $principal = $modx->getObject($object->get('principal_class'), $object->get('principal'));
    $objdata= array(
        'id' => $object->get('id'),
        'target' => $object->get('target'),
        'target_name' => $accessClass == 'modAccessContext' ? $object->Target->get('key') : $object->Target->get('name'),
        'principal_class' => $object->get('principal_class'),
        'principal' => $object->get('principal'),
        'principal_name' => $principal->get('name'),
        'authority' => $object->get('authority'),
        'policy' => $object->get('policy'),
        'policy_name' => $object->Policy->get('name'),
    );
    if (isset($object->_fieldMeta['context_key'])) {
        $objdata['context_key']= $object->get('context_key');
    }

    $objdata['menu'] = array(
        array(
            'text' => $modx->lexicon('edit'),
            'handler' => 'this.editAcl',
        ),
        '-',
        array(
            'text' => $modx->lexicon('remove'),
            'handler' => 'this.removeAcl',
        ),
    );
    $data[] = $objdata;
}
return $this->outputArray($data);