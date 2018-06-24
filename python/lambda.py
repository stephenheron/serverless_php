def handler(event, context):
   import UserFetcher as UserFetcher
   
   userFetcher = UserFetcher.UserFetcher()
   nearestUserId = userFetcher.getNearestUserId()

   return {
      "userId": nearestUserId
   } 
