<?php
/**
 * cpConnectorRequest
 *
 * @package cp
 */
/**
 * This is the Connector Request handler for ReleaseMe.
 *
 * It serves to redirect connector requests to their appropriate processors,
 * while validating for security.
 *
 * @package rm
 */
class rmConnectorRequest extends modConnectorRequest {
    /**
     * @var string The processors directory path.
     * @access private
     */
    var $_directory;

    function rmConnectorRequest(&$modx) {
        $this->__construct($modx);
    }
    /**
     * Construct the object, and make sure the default processor path is set.
     *
     * @param MODx $modx A reference to the MODx instance.
     */
    function __construct(&$modx) {
        parent::__construct($modx);
        $this->setDirectory();
    }

    /**
     * Set the request handler's processor directory. This allows for dynamic
     * processor locations.
     *
     * @access public
     * @param string $dir The directory to set as the processors directory.
     */
    function setDirectory($dir = '') {
        if ($dir == '') {
            $this->_directory = RM_PROCESSORS_PATH;
        } else {
            $this->_directory = $dir;
        }
    }

    /**
     * Handles all requests specified by the action param and prepares for loading.
     *
     * @access public
     * @param string $location The base subdirectory in which to look for the processor.
     * @param string $action The requested processor to load.
     */
    function handleRequest($location = '',$action = '') {
        if (!is_string($action)) return false;
        if ($action == '' && isset($_REQUEST['action'])) $action = $_REQUEST['action'];

        parent :: handleRequest();
        // Load JSON error processing class for output to browser.
        $this->loadErrorHandler('modJSONError');

        if (!isset ($_SESSION['mgrValidated']) && $action != 'login' && $location != 'security') {
            $this->modx->error->failure('Access Denied');
            exit();
        }

        // Cleanup action and store.
        $this->action = strtolower($action);
        $this->_prepareResponse($location);
    }

    /**
     * Prepares the output and redirects to the specified processor.
     *
     * @access private
     * @param string $location The subdirectory to load from.
     */
    function _prepareResponse($location = '') {
        // variable assigning for easier access
        $modx =& $this->modx;

        // redirect to proper controller/template
        if ($this->action === null || $this->action == '') {
            $this->modx->error->failure('Action not found.');
        } else {
            $file = $this->_directory.strtr($location.$this->action,'\\','/').'.php';

            // verify processor exists
            if (!file_exists($file)) {
                $this->modx->error->failure('Processor not found: '.$file);
            }
            // go load the correct processor
            @include $file;
        }
        exit();
    }

    /**
     * Used for outputting arrays of objects to the output buffer, for
     * list results and such.
     *
     * @access public
     * @param array $array An array of files.
     * @count mixed The total number of objects. Used for pagination.
     */
    function outputArray($array,$count = false) {
        if (!is_array($array)) return false;
        if ($count === false) { $count = count($array); }

        die('({"total":"'.$count.'","results":'.$this->modx->toJSON($array).'})');
    }
}