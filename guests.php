<?php

  $lines = file('guests.csv');
  $data = [];
  $output = "{\n\t";
  foreach ($lines as $line)
  {
    
    $row = explode(' , ', $line);
    $row[1] = trim(preg_replace('/\s+/', ' ', $row[1]));
    print_r($row);
    $output .= "\t\"" . $row[0] . '"' . ": { \n\t\t" . '"' . 'addressee' . '"' . ': ' . '"' . $row[1] . '"' . "\n\t},\n";
  }
  $output .= "\n}";

  file_put_contents('guests.json', $output);
/*
  $uids = []; 

  $lines = file('guest_list.csv');

  $output = '';
  foreach ($lines as $line)
  {
    $uid = rand(1000,9999);
    
    while (in_array($uid, $uids))
    {
      $uid = rand(1000,9999);
    }
    array_push($uids, $uid);
    $output .= $uid . ' , ' . $line;
  }

  file_put_contents('guests.csv', $output);
*/
?>