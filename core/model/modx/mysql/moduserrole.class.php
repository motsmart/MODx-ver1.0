<?php
/**
 * @package modx
 * @subpackage mysql
 * @deprecated 2.0.0
 */
include_once (strtr(realpath(dirname(__FILE__)), '\\', '/') . '/../moduserrole.class.php');
class modUserRole_mysql extends modUserRole {
    function modUserRole_mysql(& $xpdo) {
        $this->__construct($xpdo);
    }
    function __construct(& $xpdo) {
        parent :: __construct($xpdo);
    }
}