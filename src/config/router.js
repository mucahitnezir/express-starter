import authRouter from '../routes/auth';
import indexRouter from '../routes/index';

export default function (app) {
  app.use('/', indexRouter);
  app.use('/auth', authRouter);
}
