<?php
/**
 * @package modx
 * @subpackage processors.security.group
 */

require_once MODX_PROCESSORS_PATH.'index.php';
$modx->lexicon->load('user');

$ugu = $modx->getObject('modUserGroupMember',array(
	'user_group' => $_POST['group_id'],
	'member' => $_POST['user_id'],
));
if ($ugu == null) $error->failure($modx->lexicon('user_group_member_err_not_found'));

if (!$ugu->remove()) $error->failure($modx->lexicon('user_group_member_err_remove'));

$error->success();