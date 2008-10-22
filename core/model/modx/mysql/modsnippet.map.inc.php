<?php
/**
 * @package modx
 * @subpackage mysql
 */
$xpdo_meta_map['modSnippet']= array (
  'package' => 'modx',
  'table' => 'site_snippets',
  'fields' => 
  array (
    'cache_type' => '0',
    'snippet' => NULL,
    'locked' => '0',
    'properties' => NULL,
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
    'snippet' => 
    array (
      'dbtype' => 'mediumtext',
      'phptype' => 'string',
    ),
    'locked' => 
    array (
      'dbtype' => 'tinyint',
      'precision' => '1',
      'attributes' => 'unsigned',
      'phptype' => 'boolean',
      'null' => 'false',
      'default' => '0',
      'index' => 'index',
    ),
    'properties' => 
    array (
      'dbtype' => 'text',
      'phptype' => 'array',
      'null' => 'true',
    ),
    'moduleguid' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '32',
      'phptype' => 'string',
      'null' => 'false',
      'default' => '',
      'index' => 'fk',
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
);
if (XPDO_PHP4_MODE) $xpdo_meta_map['modSnippet']['aggregates']= array_merge($xpdo_meta_map['modSnippet']['aggregates'], array_change_key_case($xpdo_meta_map['modSnippet']['aggregates']));
$xpdo_meta_map['modsnippet']= & $xpdo_meta_map['modSnippet'];
