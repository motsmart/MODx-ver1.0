<?php
/**
 * Loads the main structure
 *
 * @package modx
 * @subpackage manager
 */
if (!$modx->hasPermission('frames')) {
    return $modx->error->failure($modx->lexicon('permission_denied'));
}
$modx->smarty->display('header.tpl');