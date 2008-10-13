<?php
/**
 * Scans for local packages to add to the workspace.
 *
 * @package modx
 * @subpackage processors.workspace.packages
 */
require_once MODX_PROCESSORS_PATH.'index.php';
$modx->lexicon->load('workspace');

if (!$modx->hasPermission('packages')) $modx->error->failure($modx->lexicon('permission_denied'));

if (!isset($_POST['workspace'])) $_POST['workspace'] = 1;
$workspace = $modx->getObject('modWorkspace',$_POST['workspace']);
if ($workspace == null) $modx->error->failure($modx->lexicon('workspace_err_nf'));

$packages = array();

$fullpath = $modx->config['core_path'].'packages/';
$odir = dir($fullpath);
while(false !== ($name = $odir->read())) {
	if(in_array($name,array('.','..','.svn','_notes'))) continue;

	$fullname = $fullpath.'/'.$name;
	/* dont add in unreadable files or directories */
	if(!is_readable($fullname) || is_dir($fullname)) continue;

	/* must be a .transport.zip file */
	if (strlen($name) < 14 || substr($name,strlen($name)-14,strlen($name)) != '.transport.zip') continue;
	$pname = substr($name,0,strlen($name)-14);

	/* must have a name and version at least */
	$p = split('-',$pname);
	if (count($p) < 2) continue;

	$packages[] = $pname;
}

foreach ($packages as $signature) {
	$package = $modx->getObject('transport.modTransportPackage',array(
		'signature' => $signature,
	));
	if ($package != null) continue;

	$package = $modx->newObject('transport.modTransportPackage');
	$package->set('signature',$signature);
	$package->set('state',1);
	$package->set('installed',0);
	$package->set('workspace',$workspace->get('id'));

	if ($package->save() === false) {
        $modx->error->failure($modx->lexicon('package_err_create'));
    }
}

$modx->error->success();
