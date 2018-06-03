const getUsers = require('./data.js');

class UserFetcher {

  getNearestUserId() {
    const edinburghLat = 55.953251;
    const edinburghLng = -3.188267;

    let users = getUsers();

    users = users.map((user) => {
      user.distance = this.haversineDistance([edinburghLat, edinburghLng], [user.latitude, user.longitude], false);
      return user;
    });

    users.sort((a, b) => {
      a = a['distance'];
      b = b['distance'];
      if (a == b) {
        return 0;
      }
      return (a < b) ? -1 : 1;
    });

    const closestUser = users[0];

    return closestUser["_id"];
  }

  haversineDistance(latlngA, latlngB, isMiles) {
    const toRad = x => (x * Math.PI) / 180;
    const R = 6371; // km

    const dLat = toRad(latlngB[1] - latlngA[1]);
    const dLatSin = Math.sin(dLat / 2);
    const dLon = toRad(latlngB[0] - latlngA[0]);
    const dLonSin = Math.sin(dLon / 2);

    const a = (dLatSin * dLatSin) +
      (Math.cos(toRad(latlngA[1])) * Math.cos(toRad(latlngB[1])) * dLonSin * dLonSin);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;

    if (isMiles) distance /= 1.60934;

    return distance;
  }
}

module.exports = UserFetcher;