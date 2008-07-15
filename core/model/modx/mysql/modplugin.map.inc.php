<?php
/**
 * @package modx
 * @subpackage mysql
 */
$xpdo_meta_map['modPlugin']= array (
  'package' => 'modx',
  'table' => 'site_plugins',
  'fields' => 
  array (
    'cache_type' => '0',
    'plugincode' => '',
    'locked' => '0',
    'properties' => NULL,
    'disabled' => '0',
    'moduleguid' => '',
  ),
  'fieldMeta' => 
  array (
    'cache_type' => 
    array (
      'dbtype' => 'tinyint',
      'precision' => '1',
      'phptype' => 'integer',
      'null' => 'false',
      'default' => '0',
    ),
    'plugincode' => 
    array (
      'dbtype' => 'mediumtext',
      'phptype' => 'string',
      'null' => 'false',
      'default' => '',
    ),
    'locked' => 
    array (
      'dbtype' => 'tinyint',
      'precision' => '1',
      'attributes' => 'unsigned',
      'phptype' => 'boolean',
      'null' => 'false',
      'default' => '0',
    ),
    'properties' => 
    array (
      'dbtype' => 'text',
      'phptype' => 'string',
      'null' => 'true',
    ),
    'disabled' => 
    array (
      'dbtype' => 'tinyint',
      'precision' => '1',
      'attributes' => 'unsigned',
      'phptype' => 'boolean',
      'null' => 'false',
      'default' => '0',
    ),
    'moduleguid' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '32',
      'phptype' => 'string',
      'null' => 'false',
      'default' => '',
    ),
  ),
  'aggregates' => 
  array (
    'modModule' => 
    array (
      'class' => 'modModule',
      'key' => 'guid',
      'local' => 'moduleguid',
      'foreign' => 'guid',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
  ),
  'composites' => 
  array (
    'modPluginEvent' => 
    array (
      'class' => 'modPluginEvent',
      'local' => 'id',
      'foreign' => 'pluginid',
      'cardinality' => 'many',
      'owner' => 'local',
    ),
  ),
);
if (XPDO_PHP4_MODE) $xpdo_meta_map['modPlugin']['aggregates']= array_merge($xpdo_meta_map['modPlugin']['aggregates'], array_change_key_case($xpdo_meta_map['modPlugin']['aggregates']));
if (XPDO_PHP4_MODE) $xpdo_meta_map['modPlugin']['composites']= array_merge($xpdo_meta_map['modPlugin']['composites'], array_change_key_case($xpdo_meta_map['modPlugin']['composites']));
$xpdo_meta_map['modplugin']= & $xpdo_meta_map['modPlugin'];
