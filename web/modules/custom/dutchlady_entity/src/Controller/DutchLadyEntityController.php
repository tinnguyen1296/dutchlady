<?php
namespace Drupal\dutchlady_entity\Controller;

class DutchLadyEntityController {
    public function myPage() {
        $element = array(
            '#markup' => 'Hello cxzczczx!',
        );
        return $element;
    }
}