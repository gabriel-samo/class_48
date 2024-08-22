<?php
  $a = 10;

  if($a > 5) {
    echo "$a is greater than 5";
  } elseif($a < 5) {
    echo "$a is less than 5";
  } else {
    echo "$a is equal to 5";
  }

  echo "<br> <br>";
  $b = 666;

  switch($b) {
    case 1:
      echo "b is 1";
      break;
    case 2:
      echo "b is 2";
      break;
    case 3:
      echo "b is 3";
      break;
    default:
      echo "b is not 1, 2 or 3";
  }

  echo "<br> <br>";
  $str = "name";

  switch($str) {
    case "name1":
      echo "name1";
      break;
    case "name2":
      echo "name2";
      break;
    case "name3":
      echo "name3";
      break;
    default:
      echo "unknown";
  }

  echo "<br> <br>";
  $num1 = 10;
  $num2 = 20;

  echo $num1 > $num2 ? $num1 : $num2;
?>
