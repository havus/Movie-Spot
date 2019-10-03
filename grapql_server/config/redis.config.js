import Redis from 'redis';
import Bluebird from 'bluebird';

Bluebird.promisifyAll(Redis.RedisClient.prototype);
Bluebird.promisifyAll(Redis.Multi.prototype);

const client = Redis.createClient();

client
  .on('connect', function () {
    console.log('\x1b[32m\x1b[1m', '+ + + Redis Connected! + + +')
  })

export default client;