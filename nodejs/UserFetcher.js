const getUsers = require('./data.js');

class UserFetcher {

  getNearestUserId() {
    const edinburghLat = 55.953251;
    const edinburghLng = -3.188267;

    let users = getUsers();

    users = users.map((user) => {
      user.distance = this.getDistanceFromLatLonInKm(edinburghLat, edinburghLng, user.latitude, user.longitude);
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

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

}

module.exports = UserFetcher;
