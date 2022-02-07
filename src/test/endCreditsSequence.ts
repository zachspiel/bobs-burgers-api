process.env.NODE_ENV = 'test';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import { expect } from 'chai';

chai.use(chaiHttp);

const TOTAL_END_CREDIT_SEQUENCES = 225;
const testEndpoint = async (pathname: string) => {
  return chai.request(server).get(pathname);
};

describe('End Credits Sequences', () => {
  describe('/GET endCreditsSequence', () => {
    it('it should GET all the end credits sequences', async () => {
      const { body } = await testEndpoint('/endCreditsSequence');

      expect(body).to.have.lengthOf(TOTAL_END_CREDIT_SEQUENCES);
    });
  });

  describe('/GET endCreditsSequence/1', () => {
    it('it should GET the first end credits sequence with an id of 1', async () => {
      const { body } = await testEndpoint('/endCreditsSequence/1');

      expect(body.id).to.equal(1);
    });
  });

  describe('/GET endCreditsSequence?limit=2', () => {
    it('it should GET the first two end credits sequences', async () => {
      const { body } = await testEndpoint('/endCreditsSequence?limit=2');

      expect(body).to.have.lengthOf(2);
    });
  });

  describe('/GET endCreditsSequence?skip=3', () => {
    it('it should GET the fourth end credits sequence', async () => {
      const { body } = await testEndpoint('/endCreditsSequence?skip=3');

      expect(body).to.have.lengthOf(TOTAL_END_CREDIT_SEQUENCES - 3);
    });
  });
});
