import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

const { NODE_ENV, SENTRY_DSN } = process.env;

export default (app) => ({
  dsn: SENTRY_DSN,
  environment: NODE_ENV,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
    new Tracing.Integrations.Postgres(),
  ],
  tracesSampleRate: 1.0,
});
