<?php
/**
 * @package modx
 * @subpackage processors.system.settings
 */

require_once MODX_PROCESSORS_PATH.'index.php';
$modx->lexicon->load('user_setting','system_setting');
if (!isset($_REQUEST['start'])) $_REQUEST['start'] = 0;
if (!isset($_REQUEST['limit'])) $_REQUEST['limit'] = 10;
if (!isset($_REQUEST['sort'])) $_REQUEST['sort'] = 'key';
if (!isset($_REQUEST['dir'])) $_REQUEST['dir'] = 'ASC';

$wa = array(
    'user' => $_REQUEST['user'],
);
if (isset($_POST['key']) && $_POST['key'] != '') {
    $wa['key:LIKE'] = '%'.$_POST['key'].'%';
}

$c = $modx->newQuery('modUserSetting');
$c->where($wa);
$c->sortby('`'.$_REQUEST['sort'].'`',$_REQUEST['dir']);
$c->limit($_REQUEST['limit'],$_REQUEST['start']);
$settings = $modx->getCollection('modUserSetting',$c);

$cc = $modx->newQuery('modUserSetting');
$cc->where($wa);
$count = $modx->getCount('modUserSetting',$cc);

$ss = array();
foreach ($settings as $setting) {
    $sa = $setting->toArray();
    $k = 'setting_'.$sa['key'];
    $sa['description'] = $modx->lexicon->exists($k.'_desc')
        ? $modx->lexicon($k.'_desc')
        : '';
    $sa['name'] = $modx->lexicon->exists($k)
        ? $modx->lexicon($k)
        : $sa['key'];
           
    $sa['menu'] = array(
        array(
            'text' => $modx->lexicon('setting_remove'),
            'handler' => 'this.remove.createDelegate(this,["setting_remove_confirm"])',
        ),
    );
    $ss[] = $sa;
}
$this->outputArray($ss,$count);