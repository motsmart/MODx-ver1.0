<?php
/**
 * Defines an access control policy between a principal and a target object.
 *
 * {@internal Implement derivatives to define a policy relationship to a
 * specific target class, which must extend modAccessibleObject or
 * modAccessibleSimpleObject, and must have an integer or string primary key.}
 *
 * @abstract
 * @package modx
 * @subpackage mysql
 */
class modAccess extends xPDOSimpleObject {
    function modAccess(& $xpdo) {
        $this->__construct($xpdo);
    }
    function __construct(& $xpdo) {
        parent :: __construct($xpdo);
    }
}
?>