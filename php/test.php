<?php

include('./UserFetcher.php');

$userFetcher = new UserFetcher();
echo $userFetcher->getNearestUserId() . "\n";
