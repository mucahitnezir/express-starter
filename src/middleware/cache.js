import redisClient from '@/libs/redis';

export default function (cache, evalString = null) {
  return (req, res, next) => {
    // Cache name
    let cacheName = cache;
    if (evalString) {
      cacheName += `:${eval(evalString)}`;
    }

    req.cacheName = cacheName;

    if (redisClient.connected) {
      return redisClient.get(cacheName, (err, data) => {
        if (err) {
          return res.status(500).send(err);
        }
        if (data !== null) {
          const parsedData = JSON.parse(data);
          return res.status(200).send(parsedData);
        }
        return next();
      });
    }
    return next();
  };
}
