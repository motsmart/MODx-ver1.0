<?php
/**
 * @package modx
 * @subpackage processors.browser.directory
 */

require_once MODX_PROCESSORS_PATH.'index.php';
$modx->lexicon->load('file');

if (!$modx->hasPermission('file_manager')) $modx->error->failure($modx->lexicon('permission_denied'));

$dir = !isset($_REQUEST['id']) || $_REQUEST['id'] == 'root' ? '' : str_replace('n_','',$_REQUEST['id']);
$da = array();
$directories = array();

$actions = $modx->request->getAllActionIDs();

$root = isset($_POST['path']) && $_POST['path'] != null
    ? $_POST['path']
    : $modx->config['base_path'].$modx->config['rb_base_dir'];
$fullpath = $root.($dir != '' ? $dir : '');
$odir = dir($fullpath);
while(false !== ($name = $odir->read())) {
	if(in_array($name,array('.','..','.svn','_notes'))) continue;

	$fullname = $fullpath.'/'.$name;
	if(!is_readable($fullname)) continue;

	// handle dirs
	if(is_dir($fullname)) {
		$directories[] = array(
			'id' => $dir.'/'.$name,
			'text' => $name,
			'cls' => 'folder',
			'type' => 'dir',
			'disabled' => is_writable($fullname),
            'leaf' => false,
            'menu' => array(
                array(
                    'text' => $modx->lexicon('file_folder_create_here'),
                    'handler' => 'this.createDirectory',
                ),
                array(
                    'text' => $modx->lexicon('file_folder_chmod'),
                    'handler' => 'this.chmodDirectory',
                ),
                '-',
                array(
                    'text' => $modx->lexicon('file_folder_remove'),
                    'handler' => 'this.remove.createDelegate(this,["file_folder_confirm_remove"])',
                ),
            ),
		);
	}

    // get files in current dir
    if (!is_dir($fullname) && !isset($_POST['hideFiles'])) {
        $directories[] = array(
            'id' => $dir.'/'.$name,
            'text' => $name,
            'cls' => 'file',
            'type' => 'file',
            'disabled' => is_writable($fullname),
            'menu' => array(
                array(
                    'text' => $modx->lexicon('file_edit'),
                    'params' => array(
                        'a' => $actions['system/file/edit'],
                        'file' => rawurlencode($fullname),
                    ),
                ),
                '-',
                array(
                    'text' => $modx->lexicon('file_remove'),
                    'handler' => 'this.removeFile',
                )
            ),
            'leaf' => true
        );
    }
}

echo $modx->toJSON($directories);