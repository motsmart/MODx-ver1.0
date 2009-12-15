<?php
/**
 * Loads the MODx.Browser page
 *
 * @package modx
 * @subpackage manager.browser
 */
if (!$modx->hasPermission('file_manager')) return $modx->error->failure($modx->lexicon('permission_denied'));

$modx->regClientStartupScript($modx->getOption('manager_url').'assets/modext/core/modx.view.js');
$modx->regClientStartupScript($modx->getOption('manager_url').'assets/modext/widgets/core/modx.browser.js');

/* invoke OnRichTextBrowserInit */
$rtecallback = $modx->invokeEvent('OnRichTextBrowserInit');
if (is_array($rtecallback)) $rtecallback = implode(',',$rtecallback);

$modx->smarty->assign('rtecallback',$rtecallback);

$modx->response->registerCssJs(false);
return $modx->smarty->fetch('browser/index.tpl');