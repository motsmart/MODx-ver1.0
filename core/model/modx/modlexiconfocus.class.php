<?php
/**
 * @package modx
 * @subpackage mysql
 */
class modLexiconFocus extends xPDOObject {
    function modLexiconFocus(& $xpdo) {
        $this->__construct($xpdo);
    }
    function __construct(& $xpdo) {
        parent :: __construct($xpdo);
    }
}
?>