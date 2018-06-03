<?php

include('./UserFetcher.php');

$userFetcher = new UserFetcher();
print_r($userFetcher->getNearestUserId());
