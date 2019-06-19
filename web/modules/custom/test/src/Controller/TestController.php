<?php

namespace Drupal\test\Controller;

use Drupal\commerce_checkout\Plugin\Commerce\CheckoutPane\Login;
use Drupal\Core\Controller\ControllerBase;

/**
 * Class TestController.
 */
class TestController extends ControllerBase {

  /**
   * Testtest.
   *
   * @return string
   *   Return Hello string.
   */
  public function testtest() {
    return [
      '#type' => 'markup',
      '#markup' => $this->t('Implement method: testtest')
    ];
  }
}
