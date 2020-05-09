import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';

import server from '@/app';

chai.should();
chai.use(chaiHttp);

describe('Node Server', () => {
  it('(GET /) returns the homepage', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
