<?php

include 'data.php';

class UserFetcher {

    function getNearestUserId() {
      $edinburghLat = 55.953251;
      $edinburghLng = -3.188267;
      
      $users = getUsers();
      
      $users = array_map(function($person) use ($edinburghLat, $edinburghLng) {
          $person['distance'] = haversineGreatCircleDistance($edinburghLat, $edinburghLng, $person['latitude'], $person['longitude']);
          return $person;
      }, $users);
      
      usort($users, function($a, $b)  {
          $a = $a['distance'];
          $b = $b['distance'];
      
          if ($a == $b) {
              return 0;
          }
          return ($a < $b) ? -1 : 1;
      });
      
      $closestUser = reset($users);

      foreach($users as $user) {
         if($user['_id'] == '5b1435b8f8d283e91c6133c8') {
            print_r($user); exit;
         }
      }

      return $closestUser['_id'];
    }

}

function haversineGreatCircleDistance($fromLat, $fromLon, $toLat, $toLon) {
    $earth_radius = 6371;

    $dLat = deg2rad($toLat - $fromLat);
    $dLon = deg2rad($toLon - $fromLon);

    $a = sin($dLat/2) * sin($dLat/2) + cos(deg2rad($fromLat)) * cos(deg2rad($toLat)) * sin($dLon/2) * sin($dLon/2);
    $c = 2 * asin(sqrt($a));
    $d = $earth_radius * $c;

    return round($d);
}

