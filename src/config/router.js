import indexRouter from '../routes/index';

export default function (app) {
  app.use('/', indexRouter);
}
