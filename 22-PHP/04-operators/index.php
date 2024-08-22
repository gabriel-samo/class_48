<?php
  $a = 100;
  $b = 200;

  echo $a + $b; // 300
  echo $a - $b; // -100
  echo $a * $b; // 20000
  echo $a / $b; // 0.5

  // shorthand operators
  $x += 8; // $x = $x + 8;
  $x -= 8; // $x = $x - 8;
  $x *= 8; // $x = $x * 8;
  $x /= 8; // $x = $x / 8;
  $x %= 8; // $x = $x % 8;

  $a++; // $a = $a + 1;
  $b--; // $b = $b - 1;

  // a=100, b=200
  echo $a>$b; // ""
  echo $a<$b; // 1
  echo $a>=$b; // ""
  echo $a==$b; // ""
  echo $a!=$b; // 1
  echo $a===$b; // ""

  echo !($a>$b); // 1
?>