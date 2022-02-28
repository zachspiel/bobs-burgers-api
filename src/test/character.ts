process.env.NODE_ENV = 'test';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import { expect } from 'chai';

chai.use(chaiHttp);

const TOTAL_CHARACTERS = 501;
const testEndpoint = async (pathname: string) => {
  return chai.request(server).get(pathname);
};

describe('Characters', () => {
  describe('/GET characters', () => {
    it('it should GET all the characters', async () => {
      const { body } = await testEndpoint('/characters');

      expect(body).to.have.lengthOf(TOTAL_CHARACTERS);
    });
  });

  describe('/GET characters/1', () => {
    it('it should GET the first character with an id of 1', async () => {
      const { body } = await testEndpoint('/characters/1');

      expect(body.id).to.equal(1);
      expect(body.name).to.equal('"Dottie Minerva"');
    });
  });

  describe('/GET characters/1000', () => {
    it('it should GET an error for a character with id 1000', async () => {
      const { body } = await testEndpoint('/characters/1000');

      expect(body.error).to.equal(
        'Error while retreiving data with id 1000 in route characters.'
      );
    });
  });

  describe('/GET characters?limit=5', () => {
    it('it should GET the first five characters', async () => {
      const { body } = await testEndpoint('/characters?limit=5');

      expect(body).to.have.lengthOf(5);
    });
  });

  describe('/GET characters/[1,2,3]', () => {
    it('it should GET the first three characters', async () => {
      const { body } = await testEndpoint('/characters/[1,2,3]');

      expect(body).to.have.lengthOf(3);
    });
  });

  describe('/GET characters/1,2,3', () => {
    it('it should GET the first three characters', async () => {
      const { body } = await testEndpoint('/characters/1,2,3');

      expect(body).to.have.lengthOf(3);
    });
  });

  describe('/GET characters?skip=5', () => {
    it('it should skip the first five characters', async () => {
      const { body } = await testEndpoint('/characters?skip=5');

      expect(body).to.have.lengthOf(TOTAL_CHARACTERS - 5);
    });
  });

  describe('/GET characters?sortBy=name&OrderBy=desc&limit=1', () => {
    it('it should GET the last character Zeke', async () => {
      const { body } = await testEndpoint(
        '/characters?sortBy=name&OrderBy=desc&limit=1'
      );

      expect(body).to.have.lengthOf(1);
      expect(body[0].id).to.equal(TOTAL_CHARACTERS);
    });
  });
});
