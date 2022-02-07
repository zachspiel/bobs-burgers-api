process.env.NODE_ENV = 'test';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import { expect } from 'chai';

chai.use(chaiHttp);

const TOTAL_EPISODES = 215;
const testEndpoint = async (pathname: string) => {
  return chai.request(server).get(pathname);
};

describe('Episodes', () => {
  describe('/GET episodes', () => {
    it('it should GET all the episodes', async () => {
      const { body } = await testEndpoint('/episodes');

      expect(body).to.have.lengthOf(TOTAL_EPISODES);
    });
  });

  describe('/GET episodes/1', () => {
    it('it should GET the first episode with an id of 1', async () => {
      const { body } = await testEndpoint('/episodes/1');

      expect(body.id).to.equal(1);
      expect(body.name).to.equal('"Human Flesh" (a.k.a. "Pilot")');
    });
  });

  describe('/GET episodes?limit=2', () => {
    it('it should GET the first two episodes', async () => {
      const { body } = await testEndpoint('/episodes?limit=2');

      expect(body).to.have.lengthOf(2);
    });
  });

  describe('/GET episodes?skip=3', () => {
    it('it should GET the fourth episode', async () => {
      const { body } = await testEndpoint('/episodes?skip=3');

      expect(body).to.have.lengthOf(TOTAL_EPISODES - 3);
    });
  });
});
