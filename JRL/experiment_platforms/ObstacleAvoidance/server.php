<?php

$workerid = $_POST['workerid'];
$trial = $_POST['trial'];
$trans = $_POST['trans'];
$control = $_POST['control'];
$score = $_POST['score'];
$time = $_POST['time'];
$collision = $_POST['collision'];
$reliance = $_POST['reliance'];
$trust = $_POST['trust'];
$conf = $_POST['conf'];
$perform = $_POST['perform'];
$autoAgree = $_POST['autoAgree'];
$d1 = $_POST['d1'];
$d2 = $_POST['d2'];
$d3 = $_POST['d3'];
$d4 = $_POST['d4'];
$d5 = $_POST['d5'];
$d6 = $_POST['d6'];

$fname = "./Results/" .$trans. "/" . $workerid . ".txt";//generates random name

$fullline = $trial . "\t". $trans . "\t". $control . "\t". $d1 . "\t". $d2 . "\t". $d3 . "\t". $d4 . "\t". $d5 . "\t". $d6 . "\t". $time . "\t". $collision . "\t". $reliance . "\t". $trust . "\t". $conf . "\t" . $autoAgree ."\n";

$file = fopen($fname, 'a');//creates new file
fwrite($file, $fullline);
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