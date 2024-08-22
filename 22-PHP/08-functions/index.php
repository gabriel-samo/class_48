<?php
  echo "<h1 style='text-align: center; margin: 2rem; border-bottom: 1px solid black;'>Functions</h1>";

  function sayHi(){
    echo "Hi";
  }

  function teacherPunish($message , $times=100){
    for ($i=0; $i < $times; $i++) { 
      echo $message . "<br>";
    }
  }

  // sayHi();
  // echo "<br> <br>";
  // teacherPunish("I will do my homework" ,500);

  // exersice: function that will show unknown number of arguments
  // and show their bigest number, smallest number, and average

  echo "<p style='text-align: center;'>
    Exersice: function that will show unknown number of arguments and show their bigest number, smallest number, and average:
  </p>";

  function showNumbers($arr){
    $bigest = $arr[0];
    $smallest = $arr[0];
    $average = 0;
    foreach ($arr as $number) {
      $bigest = $number > $bigest ? $number : $bigest;
      $smallest = $number < $smallest ? $number : $smallest;
      $average += $number;
    }
    $average = $average / count($arr);
    echo "<p style='text-align: center;'>Bigest number: " . $bigest . "</p>";
    echo "<p style='text-align: center;'>Smallest number: " . $smallest . "</p>";
    echo "<p style='text-align: center;'>Average: " . $average . "</p>";
  }

  showNumbers([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
?>