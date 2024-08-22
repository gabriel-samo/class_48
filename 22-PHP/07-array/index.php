<?php
  header("Content-Type: text/html");

  $arr1 = [10, 20, 30, "hi"];

  for ($i = 1; $i <= count($arr1); $i++) {
    // echo $arr1[$i] . "\n";
  }

  // #2 create an array
  $arr2 = [10, 20, 30, "hi"];

  // #3 - insert data into array
  for ($i = 1; $i <= 10; $i++) {
    $arr2[$i] = $i;
  }

  $arr3 = [];
  // #4  - insert data to last place, like push in js
  for ($i = 1; $i <= 10; $i++) {
    $arr3[] = $i;
  }

  // matrix 
  // to insert a value in row 2, col 2
  $arr4[2][2] = 4;

  // multiplycation table
  $arr5 = [];
  echo "<table border='1' cellpadding='10' style='border-collapse: collapse;'";

  for ($i = 1; $i <= 10; $i++) {
    echo "<tr style='text-align: center;'>";
    for ($j = 1; $j <= 10; $j++) {
      $arr5[$i][$j] = $i * $j;
      echo "<td>" . $arr5[$i][$j] . "</td>";
    }
    echo "</tr>";
  }
  echo "</table>";

  echo "<br> <br>";

  $students = ["John", "Jane", "Jim", "Jill"];
  foreach ($students as $item) {
    echo $item . "<br>";
  }

  echo "<br> <br>";

  $associativeArray = ["Name" => "John", "Age" => 20, "City" => "New York"];
  foreach ($associativeArray as $value) {
    echo $value . "<br>";
  }

  echo "<br> <br>";

  foreach ($associativeArray as $key => $value) {
    echo $key . " : " . $value . "<br>";
  }

  
?>