<?php

$workerid = $_POST['workerid'];
$trans = $_POST['trans'];
$fname = "./Results/".$trans. "/" . $workerid . ".txt";//generates random name

$firstline = $workerid . "\n";
$file = fopen($fname, 'w');//creates new file
fwrite($file, $firstline);
fclose($file);




// $testing = $_POST["testdata"];
// $file = "logfile.txt"
// $new_line = $testing;
//    // Open the file to get existing content
//    $current = file_get_contents($file);

//    // Append a new person to the file
//       $current .= $new_line;

//    // Write the contents back to the file
//       file_put_contents($file, $current);

?>