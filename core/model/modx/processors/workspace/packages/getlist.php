<?php
/**
 * @package modx
 * @subpackage processors.workspace.packages
 */
require_once MODX_PROCESSORS_PATH.'index.php';
$modx->lexicon->load('workspace');

if (!isset($_REQUEST['workspace'])) $_REQUEST['workspace'] = 1;


$c = $modx->newQuery('transport.modTransportPackage', array ('workspace' => $_REQUEST['workspace']));
$c->sortby('`modTransportPackage`.`disabled`', 'ASC');
$c->sortby('`modTransportPackage`.`signature`', 'ASC');
$packages = $modx->getCollection('transport.modTransportPackage',$c);

$ps = array();
foreach ($packages as $package) {
    if ($package->installed == '0000-00-00 00:00:00') $package->set('installed',null);
    $pa = $package->toArray();

    /* format timestamps */
    if ($package->get('updated') != '0000-00-00 00:00:00' && $package->get('updated') != null) {
        $pa['updated'] = strftime('%b %e, %Y %I:%M %p',$package->get('updated'));
    } else {
        $pa['updated'] = '';
    }
    $pa['created']= strftime('%b %e, %Y %I:%M %p',strtotime($package->get('created')));
    if ($package->get('installed') == null || $package->get('installed') == '0000-00-00 00:00:00') {
        $not_installed = true;
        $pa['installed'] = null;
    } else {
        $not_installed = false;
        $pa['installed'] = strftime('%b %e, %Y %I:%M %p',strtotime($package->get('installed')));
    }

    $not_installed = $package->get('installed') == null || $package->get('installed') == '0000-00-00 00:00:00';
    $pa['menu'] = array(
        array(
            'text' => $modx->lexicon('package_update'),
            'handler' => 'this.update',
        ),
        array(
            'text' => ($not_installed)
                ? $modx->lexicon('package_install')
                : $modx->lexicon('package_reinstall'),
            'handler' => ($not_installed)
                ? 'this.install'
                : 'this.install',
        ),
    );
    $transport = $package->getTransport();
    if ($transport) {
        $pa['readme'] = $transport->getAttribute('readme');
        $pa['readme'] = nl2br($pa['readme']);
    }

    if ($not_installed == false) {
        $pa['menu'][] = array(
            'text' => $modx->lexicon('package_uninstall'),
            'handler' => 'this.uninstall',
        );
    }
    $pa['menu'][] = '-';
    $pa['menu'][] = array(
        'text' => $modx->lexicon('package_remove'),
        'handler' => 'this.remove',
    );
    $ps[] = $pa;
}

return $this->outputArray($ps);