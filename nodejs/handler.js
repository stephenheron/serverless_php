const UserFetcher = require('./UserFetcher.js');

exports.handler = function(event, context) {
  const userFetcher = new UserFetcher();
  const nearestUserId = userFetcher.getNearestUserId();

  context.succeed({
    userId: nearestUserId
  });
};
