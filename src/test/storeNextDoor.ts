process.env.NODE_ENV = 'test';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import { expect } from 'chai';

chai.use(chaiHttp);

const TOTAL_STORES_NEXT_DOOR = 225;
const testEndpoint = async (pathname: string) => {
  return chai.request(server).get(pathname);
};

describe('Stores Next Door', () => {
  describe('/GET storeNextDoor', () => {
    it('it should GET all the stores next door', async () => {
      const { body } = await testEndpoint('/storeNextDoor');

      expect(body).to.have.lengthOf(TOTAL_STORES_NEXT_DOOR);
    });
  });

  describe('/GET storeNextDoor/1', () => {
    it('it should GET the first store next door with an id of 1', async () => {
      const { body } = await testEndpoint('/storeNextDoor/1');

      expect(body.id).to.equal(1);
      expect(body.name).to.equal('P.F.E.T.A');
    });
  });

  describe('/GET storeNextDoor?limit=2', () => {
    it('it should GET the first two stores next door', async () => {
      const { body } = await testEndpoint('/storeNextDoor?limit=2');

      expect(body).to.have.lengthOf(2);
    });
  });

  describe('/GET storeNextDoor?skip=3', () => {
    it('it should GET the fourth store next door', async () => {
      const { body } = await testEndpoint('/storeNextDoor?skip=3');

      expect(body).to.have.lengthOf(TOTAL_STORES_NEXT_DOOR - 3);
    });
  });
});
