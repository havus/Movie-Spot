const Redis = require('redis');
const Bluebird = require('bluebird');

Bluebird.promisifyAll(Redis.RedisClient.prototype);
Bluebird.promisifyAll(Redis.Multi.prototype);

const client = Redis.createClient(19053, "redis-19053.c1.asia-northeast1-1.gce.cloud.redislabs.com",  {no_ready_check: true});
client.auth('XVkjnfAlU2zSSfMXpA7AtMO66VhNtbrG', function (err) {
  if (err) throw err;
});

module.exports = client;