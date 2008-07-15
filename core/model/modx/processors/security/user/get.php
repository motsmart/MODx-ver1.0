<?php
/**
 * @package modx
 * @subpackage processors.security.user
 */

require_once MODX_PROCESSORS_PATH.'index.php';
$modx->lexicon->load('user');

if (!isset($_POST['id'])) $modx->error->failure($modx->lexicon('user_err_ns'));
$user = $modx->getObject('modUser',$_POST['id']);
if ($user == null) $error->failure($modx->lexicon('user_err_not_found'));

$user->profile = $user->getOne('modUserProfile');
$ua = $user->toArray();
$ua = array_merge($ua,$user->profile->toArray());
$ua['dob'] = $ua['dob'] != '0'
    ? strftime('%m/%d/%Y',$ua['dob'])
    : '';

$modx->error->success('',$ua);
