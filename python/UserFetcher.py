import math
import data as Data

class UserFetcher:
   def getNearestUserId(self):
        edinburghLat = 55.953251
        edinburghLng = -3.188267

        users = Data.getUsers()

        def addDistanceToUser(user):
            user['distance'] = self.getDistanceFromLatLonInKm(edinburghLat,edinburghLng,user["latitude"],user["longitude"])
            return user

        users = map(addDistanceToUser, users);

        users = sorted(users, key = lambda k: k["distance"])

        closestUser = users[0]

        return closestUser["_id"]


   def getDistanceFromLatLonInKm(self,lat1,lon1,lat2,lon2):
        radius = 6371 # km

        dlat = math.radians(lat2-lat1)
        dlon = math.radians(lon2-lon1)
        a = math.sin(dlat/2) * math.sin(dlat/2) + math.cos(math.radians(lat1)) \
    	    * math.cos(math.radians(lat2)) * math.sin(dlon/2) * math.sin(dlon/2)
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
        d = radius * c

        return d
