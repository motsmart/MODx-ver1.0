<?php
/**
 * Loads the context delete processor, via the controller. 
 * This should be deprecated - use ajax connectors instead.
 * 
 * @package modx
 * @subpackage manager.context
 * @deprecated
 */
// check permissions
if (!$modx->hasPermission('delete_context')) $modx->error->failure($modx->lexicon('access_denied'));

$modx->loadProcessor('context/delete.php');