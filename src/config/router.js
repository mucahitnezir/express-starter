import authRouter from '@/routes/auth';
import indexRouter from '@/routes/index';
import tweetRouter from '@/routes/tweet';

export default function (app) {
  app.use('/', indexRouter);
  app.use('/auth', authRouter);
  app.use('/tweets', tweetRouter);
}
