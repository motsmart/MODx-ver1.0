<?php
/**
 * @package modx
 * @subpackage transport.mysql
 */
require_once (strtr(realpath(dirname(dirname(__FILE__))), '\\', '/') . '/modtransportprovider.class.php');
class modTransportProvider_mysql extends modTransportProvider {
    function modTransportProvider_mysql(& $xpdo) {
        $this->__construct($xpdo);
    }
    function __construct(& $xpdo) {
        parent :: __construct($xpdo);
    }
}
?>