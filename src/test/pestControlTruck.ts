process.env.NODE_ENV = 'test';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import { expect } from 'chai';

chai.use(chaiHttp);

const TOTAL_PEST_CONTROL_TRUCKS = 225;
const testEndpoint = async (pathname: string) => {
  return chai.request(server).get(pathname);
};

describe('Pest Control Trucks', () => {
  describe('/GET pestControlTruck', () => {
    it('it should GET all the pest control trucks', async () => {
      const { body } = await testEndpoint('/pestControlTruck');

      expect(body).to.have.lengthOf(TOTAL_PEST_CONTROL_TRUCKS);
    });
  });

  describe('/GET pestControlTruck/1', () => {
    it('it should GET the first pest control truck with an id of 1', async () => {
      const { body } = await testEndpoint('/pestControlTruck/1');

      expect(body.id).to.equal(1);
      expect(body.name).to.equal(`Rat's all Folks! EXTERMINATORS`);
    });
  });

  describe('/GET pestControlTruck?limit=2', () => {
    it('it should GET the first two pest control trucks', async () => {
      const { body } = await testEndpoint('/pestControlTruck?limit=2');

      expect(body).to.have.lengthOf(2);
    });
  });

  describe('/GET pestControlTruck/[1,2,3]', () => {
    it('it should GET the first three pest control trucks', async () => {
      const { body } = await testEndpoint('/pestControlTruck/[1,2,3]');

      expect(body).to.have.lengthOf(3);
    });
  });

  describe('/GET pestControlTruck/1,2,3', () => {
    it('it should GET the first three pest control truck', async () => {
      const { body } = await testEndpoint('/pestControlTruck/1,2,3');

      expect(body).to.have.lengthOf(3);
    });
  });

  describe('/GET pestControlTruck?skip=3', () => {
    it('it should GET the fourth pest control truck', async () => {
      const { body } = await testEndpoint('/pestControlTruck?skip=3');

      expect(body).to.have.lengthOf(TOTAL_PEST_CONTROL_TRUCKS - 3);
    });
  });
});
