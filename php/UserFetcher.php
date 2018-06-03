<?php

class UserFetcher {

    function getNearestUserId() {
      $edinburghLat = 55.953251;
      $edinburghLng = -3.188267;
      
      $users = json_decode(file_get_contents('data.json'), true);
      $users = array_map(function($person) use ($edinburghLat, $edinburghLng) {
          $person['distance'] = haversineGreatCircleDistance($edinburghLat, $edinburghLng, $person['latitude'], $person['longitude']);
          $person['numberOfFriends'] = count($person['friends']);
      
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
      
      return $closestUser['_id'];
    }

}


/**
 * Calculates the great-circle distance between two points, with
 * the Haversine formula.
 * @param float $latitudeFrom Latitude of start point in [deg decimal]
 * @param float $longitudeFrom Longitude of start point in [deg decimal]
 * @param float $latitudeTo Latitude of target point in [deg decimal]
 * @param float $longitudeTo Longitude of target point in [deg decimal]
 * @param float $earthRadius Mean earth radius in [m]
 * @return float Distance between points in [m] (same as earthRadius)
 */
function haversineGreatCircleDistance(
    $latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo, $earthRadius = 6371000)
{
    // convert from degrees to radians
    $latFrom = deg2rad($latitudeFrom);
    $lonFrom = deg2rad($longitudeFrom);
    $latTo = deg2rad($latitudeTo);
    $lonTo = deg2rad($longitudeTo);

    $latDelta = $latTo - $latFrom;
    $lonDelta = $lonTo - $lonFrom;

    $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) +
            cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)));
    return $angle * $earthRadius;
}
