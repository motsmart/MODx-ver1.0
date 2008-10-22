<?php
/**
 * Contains logic to upgrade existing Revolution repositories only.
 *
 * WARNING: Do not attempt to upgrade MODx Evolution releases using this script.
 *
 * @todo Make upgrades smarter by detecting specific versions and/or providing
 * auto-migration capabilities via xPDO (i.e. detect differences between actual
 * table and current map).
 *
 * @package setup
 */

$results = array ();

// put new classes here to have tables created on upgrade (if they don't exist)
$classes = array (
    'modAccessAction',
    'modAccessElement',
    'modAccessMenu',
    'modAccessPolicy',
    'modAccessResource',
    'modAccessResourceGroup',
    'modAccessTemplateVar',
    'modAction',
    'modContextResource',
    'modContentType',
    'modManagerLog',
    'modMenu',
    'modWorkspace',
    'transport.modTransportPackage',
    'transport.modTransportProvider',
    'modNamespace',
    'modLexiconEntry',
    'modLexiconLanguage',
);

$this->xpdo->setPackage('modx', MODX_CORE_PATH . 'model/');
$connected = $this->xpdo->connect();
if ($connected) {
    $this->xpdo->getManager();
    foreach ($classes as $class) {
        if (!$dbcreated = $this->xpdo->manager->createObjectContainer($class)) {
            $results[] = array (
                'class' => 'failed',
                'msg' => '<p class="notok">Error creating table for class ' . $class . '</p>'
            );
        } else {
            $results[] = array (
                'class' => 'success',
                'msg' => '<p class="ok">Successfully created table for class ' . $class . '</p>'
            );
        }
    }

    // add table structure changes here for upgrades to previous Revolution installations
    $class = 'modResource';
    $table = $this->xpdo->getTableName($class);
    $sql = "ALTER TABLE {$table} DROP INDEX `content_ft_idx`";
    $description = 'Removed full-text index `content_ft_idx`.';
    $removedOldFullTextIndex = processResults($this->xpdo,$results,$class,$description,$sql);

    $sql = "ALTER TABLE {$table} ADD COLUMN `content_type` INT(11) unsigned NOT NULL DEFAULT 0 ";
    $description = 'Added `content_type` column.';
    processResults($this->xpdo,$results,$class,$description,$sql);

    if ($removedOldFullTextIndex) {
        $sql = "ALTER TABLE {$table} ADD FULLTEXT INDEX `content_ft_idx` (`pagetitle`, `longtitle`, `description`, `introtext`, `content`)";
        $description = 'Added new `content_ft_idx` full-text index on the fields `pagetitle`, `longtitle`, `description`, `introtext`, `content`.';
        processResults($this->xpdo,$results,$class,$description,$sql);
    }
    
    $sql = "ALTER TABLE {$table} ADD INDEX `published` (`published`)";
    $description = 'Added new index on `published`.';
    processResults($this->xpdo, $results, $class, $description, $sql);

    $sql = "ALTER TABLE {$table} ADD INDEX `pub_date` (`pub_date`)";
    $description = 'Added new index on `pub_date`.';
    processResults($this->xpdo, $results, $class, $description, $sql);

    $sql = "ALTER TABLE {$table} ADD INDEX `unpub_date` (`unpub_date`)";
    $description = 'Added new index on `unpub_date`.';
    processResults($this->xpdo, $results, $class, $description, $sql);

    $sql = "ALTER TABLE {$table} ADD INDEX `menuindex` (`menuindex`)";
    $description = 'Added new index on `menuindex`.';
    processResults($this->xpdo, $results, $class, $description, $sql);

    $sql = "ALTER TABLE {$table} ADD INDEX `isfolder` (`isfolder`)";
    $description = 'Added new index on `isfolder`.';
    processResults($this->xpdo, $results, $class, $description, $sql);

    $sql = "ALTER TABLE {$table} ADD INDEX `template` (`template`)";
    $description = 'Added new index on `published`.';
    processResults($this->xpdo, $results, $class, $description, $sql);

    $sql = "ALTER TABLE {$table} ADD INDEX `searchable` (`searchable`)";
    $description = 'Added new index on `searchable`.';
    processResults($this->xpdo, $results, $class, $description, $sql);

    $sql = "ALTER TABLE {$table} ADD INDEX `cacheable` (`cacheable`)";
    $description = 'Added new index on `cacheable`.';
    processResults($this->xpdo, $results, $class, $description, $sql);

    $sql = "ALTER TABLE {$table} ADD INDEX `hidemenu` (`hidemenu`)";
    $description = 'Added new index on `hidemenu`.';
    processResults($this->xpdo, $results, $class, $description, $sql);

    $sql = "ALTER TABLE {$table} ADD INDEX `context_key` (`context_key`)";
    $description = 'Added new index on `context_key`.';
    processResults($this->xpdo, $results, $class, $description, $sql);

    $class = 'modUserGroup';
    $table = $this->xpdo->getTableName($class);
    $description = 'Added new column `parent`.';
    $sql = "ALTER TABLE {$table} ADD COLUMN `parent` INT(11) unsigned NOT NULL DEFAULT 0";
    processResults($this->xpdo,$results,$class,$description,$sql);

    $description = 'Added new index on `parent`.';
    $sql = "ALTER TABLE {$table} ADD INDEX `parent` (`parent`)";
    processResults($this->xpdo,$results,$class,$description,$sql);

    $class = 'modUserGroupMember';
    $table = $this->xpdo->getTableName($class);
    $description = 'Added new column `role`.';
    $sql = "ALTER TABLE {$table} ADD COLUMN `role` INT(10) unsigned NOT NULL DEFAULT 0";
    processResults($this->xpdo,$results,$class,$description,$sql);

    $description = 'Added new index on `role`.';
    $sql = "ALTER TABLE {$table} ADD INDEX `role` (`role`)";
    processResults($this->xpdo,$results,$class,$description,$sql);

    $class = 'modModule';
    $table = $this->xpdo->getTableName($class);
    $description = 'Added disabled field missing in early Revolution releases';
    $sql = "ALTER TABLE {$table} ADD COLUMN `disabled` TINYINT(1) unsigned NOT NULL DEFAULT 0 AFTER `category`";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Added index on `category` missing in early Revolution releases';
    $sql = "ALTER TABLE {$table} ADD INDEX `category` (`category`)";
    processResults($this->xpdo,$results,$class,$description,$sql);

    $class = 'modPlugin';
    $table = $this->xpdo->getTableName($class);
    $description = 'Added index on `locked` missing in early Revolution releases';
    $sql = "ALTER TABLE {$table} ADD INDEX `locked` (`locked`)";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Added index on `disabled` missing in early Revolution releases';
    $sql = "ALTER TABLE {$table} ADD INDEX `disabled` (`disabled`)";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Added index on `moduleguid` missing in early Revolution releases';
    $sql = "ALTER TABLE {$table} ADD INDEX `moduleguid` (`moduleguid`)";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Added index on `category` missing in early Revolution releases';
    $sql = "ALTER TABLE {$table} ADD INDEX `category` (`category`)";
    processResults($this->xpdo,$results,$class,$description,$sql);

    $class = 'modSnippet';
    $table = $this->xpdo->getTableName($class);
    $description = 'Added index on `locked` missing in early Revolution releases';
    $sql = "ALTER TABLE {$table} ADD INDEX `locked` (`locked`)";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Added index on `category` missing in early Revolution releases';
    $sql = "ALTER TABLE {$table} ADD INDEX `category` (`category`)";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Added index on `moduleguid` missing in early Revolution releases';
    $sql = "ALTER TABLE {$table} ADD INDEX `moduleguid` (`moduleguid`)";
    processResults($this->xpdo,$results,$class,$description,$sql);

    $class = 'modTemplate';
    $table = $this->xpdo->getTableName($class);
    $description = 'Added properties field missing in early Revolution releases';
    $sql = "ALTER TABLE {$table} ADD COLUMN `properties` TEXT AFTER `locked`";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Added index on `category` missing in early Revolution releases';
    $sql = "ALTER TABLE {$table} ADD INDEX `category` (`category`)";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Added index on `locked` missing in early Revolution releases';
    $sql = "ALTER TABLE {$table} ADD INDEX `locked` (`locked`)";
    processResults($this->xpdo,$results,$class,$description,$sql);

    $class = 'modTemplateVar';
    $table = $this->xpdo->getTableName($class);
    $description = 'Added properties field missing in early Revolution releases';
    $sql = "ALTER TABLE {$table} ADD COLUMN `properties` TEXT AFTER `default_text`";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Added index on `category` missing in early Revolution releases';
    $sql = "ALTER TABLE {$table} ADD INDEX `category` (`category`)";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Added index on `locked` missing in early Revolution releases';
    $sql = "ALTER TABLE {$table} ADD INDEX `locked` (`locked`)";
    processResults($this->xpdo,$results,$class,$description,$sql);

    $class = 'modChunk';
    $table = $this->xpdo->getTableName($class);
    $description = 'Added properties field missing in early Revolution releases';
    $sql = "ALTER TABLE {$table} ADD COLUMN `properties` TEXT AFTER `locked`";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Add FK index on `category` missing in early Revolution releases';
    $sql = "ALTER TABLE {$table} ADD INDEX `category` (`category`)";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Add index on `locked` missing in early Revolution releases';
    $sql = "ALTER TABLE {$table} ADD INDEX `locked` (`locked`)";
    processResults($this->xpdo,$results,$class,$description,$sql);

    $class = 'modUser';
    $table = $this->xpdo->getTableName($class);
    $description = 'Added cachepwd field missing in early Revolution releases';
    $sql = "ALTER TABLE {$table} ADD COLUMN `cachepwd` VARCHAR(100) NOT NULL DEFAULT '' AFTER `password`";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Added class_key field to support modUser derivatives';
    $sql = "ALTER TABLE {$table} ADD COLUMN `class_key` VARCHAR(100) NOT NULL DEFAULT 'modUser' AFTER `cachepwd`";
    processResults($this->xpdo,$results,$class,$description,$sql);

    $class = 'modActiveUser';
    $table = $this->xpdo->getTableName($class);
    $description = 'Modified modActiveUser `action` field to allow longer action labels';
    $sql = "ALTER TABLE {$table} MODIFY COLUMN `action` VARCHAR(255)";
    processResults($this->xpdo,$results,$class,$description,$sql);

    $class = 'modAction';
    $table = $this->xpdo->getTableName($class);
    $description = 'Added modAction `lang_foci` field.';
    $sql = "ALTER TABLE {$table} ADD COLUMN `lang_foci` TEXT AFTER `haslayout`";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Renamed modAction `lang_foci` field to `lang_topics`.';
    $sql = "ALTER TABLE {$table} CHANGE COLUMN `lang_foci` `lang_topics` TEXT";
    processResults($this->xpdo,$results,$class,$description,$sql);

    $class = 'modSystemSetting';
    $table = $this->xpdo->getTableName($class);
    $description = 'Changed modSystemSetting `setting_name` field to `key`.';
    $sql = "ALTER TABLE {$table} CHANGE COLUMN `setting_name` `key` VARCHAR(50) NOT NULL";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Changed modSystemSetting `setting_value` field to `value`.';
    $sql = "ALTER TABLE {$table} CHANGE COLUMN `setting_value` `value` TEXT NOT NULL";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Added modSystemSetting `xtype`.';
    $sql = "ALTER TABLE {$table} ADD COLUMN `xtype` VARCHAR(75) NOT NULL DEFAULT 'textfield'";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Added modSystemSetting `namespace`.';
    $sql = "ALTER TABLE {$table} ADD COLUMN `namespace` VARCHAR(40) NOT NULL DEFAULT 'core'";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Added modSystemSetting `editedon`.';
    $sql = "ALTER TABLE {$table} ADD COLUMN `editedon` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Added modSystemSetting `area`.';
    $sql = "ALTER TABLE {$table} ADD COLUMN `area` VARCHAR(255) NOT NULL";
    processResults($this->xpdo,$results,$class,$description,$sql);


    $class = 'modContextSetting';
    $table = $this->xpdo->getTableName($class);
    $description = 'Added modContextSetting `xtype`.';
    $sql = "ALTER TABLE {$table} ADD COLUMN `xtype` VARCHAR(75) NOT NULL DEFAULT 'textfield'";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Added modContextSetting `namespace`.';
    $sql = "ALTER TABLE {$table} ADD COLUMN `namespace` VARCHAR(40) NOT NULL DEFAULT 'core'";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Added modContextSetting `editedon`.';
    $sql = "ALTER TABLE {$table} ADD COLUMN `editedon` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Added modContextSetting `area`.';
    $sql = "ALTER TABLE {$table} ADD COLUMN `area` VARCHAR(255) NOT NULL";
    processResults($this->xpdo,$results,$class,$description,$sql);

    $class = 'modUserSetting';
    $table = $this->xpdo->getTableName($class);
    $description = 'Changed modUserSetting `setting_name` field to `key`.';
    $sql = "ALTER TABLE {$table} CHANGE COLUMN `setting_name` `key` VARCHAR(50) NOT NULL";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Changed modUserSetting `setting_value` field to `value`.';
    $sql = "ALTER TABLE {$table} CHANGE COLUMN `setting_value` `value` TEXT NOT NULL";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Added modUserSetting `xtype`.';
    $sql = "ALTER TABLE {$table} ADD COLUMN `xtype` VARCHAR(75) NOT NULL DEFAULT 'textfield'";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Added modUserSetting `namespace`.';
    $sql = "ALTER TABLE {$table} ADD COLUMN `namespace` VARCHAR(40) NOT NULL DEFAULT 'core'";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Added modUserSetting `editedon`.';
    $sql = "ALTER TABLE {$table} ADD COLUMN `editedon` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Added modUserSetting `area`.';
    $sql = "ALTER TABLE {$table} ADD COLUMN `area` VARCHAR(255) NOT NULL";
    processResults($this->xpdo,$results,$class,$description,$sql);


    $class = 'modManagerLog';
    $table = $this->xpdo->getTableName($class);
    $description = 'Changed modManagerLog `class_key` field to `classKey`.';
    $sql = "ALTER TABLE {$table} CHANGE COLUMN `class_key` `classKey` VARCHAR(100) NOT NULL";
    processResults($this->xpdo,$results,$class,$description,$sql);

    $class = 'modUserMessage';
    $table = $this->xpdo->getTableName($class);
    $description = 'Changed modUserMessage `postdate` field from an INT to a DATETIME and to name `date_sent`.';
    $sql = "ALTER TABLE {$table} CHANGE COLUMN `postdate` `date_sent` DATETIME NOT NULL";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Changed modUserMessage `subject` field from VARCHAR(60) to VARCHAR(255).';
    $sql = "ALTER TABLE {$table} CHANGE COLUMN `subject` `subject` VARCHAR(255) NOT NULL";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Changed modUserMessage `messageread` field to `read`.';
    $sql = "ALTER TABLE {$table} CHANGE COLUMN `messageread` `read` TINYINT(1) NOT NULL";
    processResults($this->xpdo,$results,$class,$description,$sql);


    $class = 'modLexiconFocus';
    $table = $this->config['table_prefix'].'lexicon_foci';
    $description = 'Dropped modLexiconFocus PRIMARY KEY';
    $sql = "ALTER TABLE {$table} DROP PRIMARY KEY";
    processResults($this->xpdo,$results,$class,$description,$sql);
    $description = 'Added modLexiconFocus `id` column.';
    $sql = "ALTER TABLE {$table} ADD COLUMN `id` INT( 10 ) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST";
    $lexiconFocusChanged = processResults($this->xpdo,$results,$class,$description,$sql);
    if (!$lexiconFocusChanged) {
        $description = 'Added modLexiconFocus PRIMARY KEY to `id` column';
        $sql = "ALTER TABLE {$table} ADD PRIMARY KEY (`id`)";
        processResults($this->xpdo,$results,$class,$description,$sql);
    }
    $description = 'Changed modLexiconFocus `name` from PRIMARY KEY to UNIQUE KEY';
    $sql = "ALTER TABLE {$table} ADD UNIQUE INDEX `foci` (`name`,`namespace`)";
    processResults($this->xpdo,$results,$class,$description,$sql);


    $class = 'modLexiconEntry';
    $focusTable = $this->config['table_prefix'].'lexicon_foci';
    $table = $this->xpdo->getTableName($class);
    $description = 'Changed modLexiconEntry `createdon` to allow NULL.';
    $sql = "ALTER TABLE {$table} CHANGE COLUMN `createdon` `createdon` DATETIME NULL";
    processResults($this->xpdo,$results,$class,$description,$sql);
    if ($lexiconFocusChanged) {
        $description = 'Updated modLexiconEntry `focus` column data from string to new int foreign key from modLexiconTopic.';
        $sql = "UPDATE {$table} `e`, {$focusTable} `f` SET `e`.`focus` = `f`.`id` WHERE `e`.`focus` = `f`.`name` AND `e`.`namespace` = `f`.`namespace`";
        processResults($this->xpdo,$results,$class,$description,$sql);
    }
    $description = 'Renamed modLexiconEntry `focus` to `topic`';
    $sql = "ALTER TABLE {$table} CHANGE `focus` `topic` INT( 10 ) UNSIGNED NOT NULL DEFAULT '1'";
    processResults($this->xpdo,$results,$class,$description,$sql);

    $description = 'Renamed modx_lexicon_foci to modx_lexicon_topics';
    $topicTable = $this->xpdo->getTableName('modLexiconTopic');
    $sql = "RENAME TABLE {$focusTable} TO {$topicTable}";
    processResults($this->xpdo,$results,$class,$description,$sql);

}
return $results;


function processResults(&$xpdo,&$results,$class,$description,$sql) {
    if (!$xpdo->exec($sql)) {
        $results[] = array (
            'class' => 'warning',
            'msg' => '<p class="notok">Error upgrading table for class ' . $class . '<br /><small>' . nl2br(print_r($xpdo->errorInfo(), true)) . '</small></p>'
        );
        return false;
    } else {
        $results[] = array (
            'class' => 'success',
            'msg' => '<p class="ok">Successfully upgraded table for class ' . $class . '<br /><small>' . $description . '</small></p>'
        );
        return true;
    }
}