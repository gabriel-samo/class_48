<?php

  echo "Please enter your name: ";
  $name = trim(fgets(fopen('php://stdin', 'r')));
  
  echo "Enter your age: ";
  $age = (int)trim(fgets(fopen('php://stdin', 'r')));

  $year = 2024 - $age;

  echo "Hello, $name! You were born in $year.";
?>