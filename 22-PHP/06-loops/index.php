<?php
  // // 'while loop'
  // $i = 1;
  // while($i <= 10) {
  //   echo $i . " ";
  //   $i++;
  // }

  // echo "<br> <br>";

  // // 'do while loop'
  // $y = 100;
  // do {
  //   echo $y . " ";
  //   $y--;
  // } while($y >= 0);

  // echo "<br> <br>";

  // // 'for loop'
  // for($i = 1; $i <= 10; $i++) {
  //   echo $i . " ";
  // }

  // echo "<br> <br>";

  // 'for loop' for multiplication table
  // for($i = 1; $i <= 10; $i++) {
  //   echo $i !== 1 ? "<br>" : '';
  //   for($j = 1; $j <= 10; $j++) {
  //     echo "$i x $j = " . $i * $j . "<br>";
  //   }
  // }
?>

<html>
  <head>
    <title>php loops</title>
    <style>
      *{
        margin: 0;
        padding: 0;
        text-align: center;
      }
      h1{
        margin: 20px;
      }
      table {
        margin: 0 auto;
        border-collapse: collapse;
      }
      td {
        border: 1px solid black;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <h1>Multiplication Table</h1>
    <table>
      <thead>
        <tr>
          <td></td>
          <?php
            for($i = 1; $i <= 10; $i++) {
              echo "<td style='background-color: #f0f0f0;'>" . $i . "</td>";
            }
          ?>
        </tr>
      </thead>
      <tbody>
      <?php 
        for($i = 1; $i <= 10; $i++) {
          echo "<tr>";
          echo "<td style='background-color: #f0f0f0;'>" . $i . "</td>";
          for($j = 1; $j <= 10; $j++) {
            echo "<td>" . $i * $j . "</td>";
            }
            echo "</tr>";
          }
        ?>
      </tbody>
    </table>
  </body>
</html>