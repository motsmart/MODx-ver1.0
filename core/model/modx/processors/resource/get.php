<?php
/**
 * @package modx
 * @subpackage processors.resource
 */
require_once MODX_PROCESSORS_PATH . 'index.php';
$modx->lexicon->load('resource');

if (!isset($_REQUEST['id'])) {
    $modx->error->failure($modx->lexicon('document_not_specified'));
}
$resource = $modx->getObject('modResource', $_REQUEST['id']);
if ($resource == null) {
    $modx->error->failure($modx->lexicon('resource_err_nfs',array('id' => $_REQUEST['id'])));
}

if (!$resource->checkPolicy('view')) $modx->error->failure($modx->lexicon('permission_denied'));

if ($modx->config['use_editor'] == 1) {
    /* replace image path */
    $htmlcontent = $resource->get('content');
    if (!empty ($htmlcontent)) {
        if (substr($modx->config['rb_base_url'], -1) != '/') {
            $im_base_url = $modx->config['rb_base_url'] . '/';
        } else {
            $im_base_url = $modx->config['rb_base_url'];
        }
        $elements = parse_url($im_base_url);
        $image_path = $elements['path'];
        /* make sure image path ends with a /  */
        if (substr($image_path, -1) != '/') {
            $image_path .= '/';
        }
        $modx_root = $modx->config['base_path'];
        $image_prefix = substr($image_path, strlen($modx_root));
        if (substr($image_prefix, -1) != '/') {
            $image_prefix .= '/';
        }
        /* escape / in path */
        $image_prefix = str_replace('/', '\/', $image_prefix);
        $newcontent = preg_replace("/(<img[^>]+src=['\"])($image_prefix)([^'\"]+['\"][^>]*>)/", "\${1}$im_base_url\${3}", $resource->content);
        $htmlcontent = $newcontent;
    }
    $resource->set('content',$htmlcontent);
}


$ra = $resource->toArray();
$ra['pub_date'] = $ra['pub_date'] != '0' ? strftime('%Y-%m-%d',$ra['pub_date']) : '';
$ra['unpub_date'] = $ra['unpub_date'] != '0' ? strftime('%Y-%m-%d',$ra['unpub_date']) : '';

$modx->error->success('',$ra);