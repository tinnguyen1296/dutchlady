<?php
namespace Drupal\dutchlady_entity\Plugin\Derivative;

use Drupal\Component\Plugin\Derivative\DeriverBase;
use Drupal\Core\Plugin\Discovery\ContainerDeriverInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Derivative class that provides the menu links for the Products.
 */
class ProductMenuLink extends DeriverBase implements ContainerDeriverInterface {

    /**
     * @var EntityTypeManagerInterface $entityTypeManager.
     */
    protected $entityTypeManager;

    /**
     * Creates a ProductMenuLink instance.
     *
     * @param $base_plugin_id
     * @param EntityTypeManagerInterface $entity_type_manager
     */
    public function __construct($base_plugin_id, EntityTypeManagerInterface $entity_type_manager) {
        $this->entityTypeManager = $entity_type_manager;
    }

    /**
     * {@inheritdoc}
     */
    public static function create(ContainerInterface $container, $base_plugin_id) {
        return new static(
            $base_plugin_id,
            $container->get('entity_type.manager')
        );
    }

    /**
     * {@inheritdoc}
     */
    public function getDerivativeDefinitions($base_plugin_definition) {
        $links = [];

        // We assume we don't have too many...
        $products = $this->entityTypeManager->getStorage('commerce_product')->loadMultiple();
//        dump($products);
        foreach ($products as $id => $product) {
            $links[$id] = [
                    'title' => $product->label(),
                    'route_name' => $product->toUrl()->getRouteName(),
                    'route_parameters' => ['commerce_product' => $product->id()]
                ] + $base_plugin_definition;
        }
//        $links[1] = [
//            'title' => "a",
//            'route_name' => "dutchlady_entity.entity.commerce_product.canonical",
//            'route_parameters' => [ "product" => "5"],
//            'class' => "Drupal\dutchlady_entity\Plugin\Menu\ProductMenuLink",
//            'deriver' => "Drupal\dutchlady_entity\Plugin\Derivative\ProductMenuLink",
//            'menu_name' => "product",
//            'provider' => 'dutchlady_entity',
//            'id' => "dutchlady_entity.product_link"
//        ];
//        dump($base_plugin_definition);
//        dump($links);die;
        return $links;
    }
}