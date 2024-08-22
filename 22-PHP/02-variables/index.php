<?php
  $product1 = 10;
  $product2 = 20;
  $product3 = 30;
  $product4 = 40;
  $product5 = 50;

  $withVat = 1.16;

  echo "VAT 16% <br>";
  echo "Product 1: " . $product1 * $withVat . "<br>";
  echo "Product 2: " . $product2 * $withVat . "<br>";
  echo "Product 3: " . $product3 * $withVat . "<br>";
  echo "Product 4: " . $product4 * $withVat . "<br>";
  echo "Product 5: " . $product5 * $withVat . "<br>";
  echo "<br>";

  $withVat = 1.19;

  echo "VAT 19% <br>";
  echo "Product 1: " . $product1 * $withVat . "<br>";
  echo "Product 2: " . $product2 * $withVat . "<br>";
  echo "Product 3: " . $product3 * $withVat . "<br>";
  echo "Product 4: " . $product4 * $withVat . "<br>";
  echo "Product 5: " . $product5 * $withVat . "<br>";
  echo "<br>";
?>