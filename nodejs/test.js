const UserFetcher = require('./UserFetcher.js');

const userFetcher = new UserFetcher();
const nearestUserId = userFetcher.getNearestUserId();

console.log(nearestUserId);
