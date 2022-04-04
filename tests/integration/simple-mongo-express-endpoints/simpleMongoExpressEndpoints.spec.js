const R = require('ramda');
const {
  getApiHandler,
  closeServer,
  clearMongoDB,
  startServer,
} = require('./setup');

let apiHandler;

describe('SimpleMongoExpressEndpoints', () => {
  beforeAll(async () => {
    await startServer();
    apiHandler = getApiHandler();
  });

  beforeEach(async () => {
    await clearMongoDB();
  });

  afterAll(async () => {
    await closeServer();
  });

  describe('getAll, (This is tested more with other tests (post, etc))', () => {
    it('should return empty array when DB is empty', async () => {
      const { body } = await apiHandler.get('/api/test').expect(200);
      expect(body).toMatchObject([]);
    });
  });

  describe('get', () => {
    it('should return empty array when DB is empty', async () => {
      const data = { name: 'test', otherValue: 123 };
      const { body } = await apiHandler.post('/api/test').send(data).expect(201);
      const { body: getResult } = await apiHandler.get(`/api/test/${body._id}`).expect(200);

      expect(R.pick(['name', 'otherValue'], getResult)).toMatchObject(data);
    });
    it('should return error when getting malformed id', async () => {
      const { body } = await apiHandler.get('/api/test/notexisting').expect(400);

      console.log(body);
    });
  });

  describe('add', () => {
    it('should add new value to the database', async () => {
      const data = { name: 'test', otherValue: 123 };
      const { body } = await apiHandler.post('/api/test').send(data).expect(201);

      expect(R.pick(['name', 'otherValue'], body)).toMatchObject(data);

      const { body: existingDBEntries } = await apiHandler.get('/api/test').send(data).expect(200);

      expect(R.pick(['name', 'otherValue'], existingDBEntries[0])).toMatchObject(data);
    });
  });

  describe('update', () => {
    it('should update new values to the db', async () => {
      const data = { name: 'test', otherValue: 123 };
      const newValue = { otherValue: 668 };
      const { body } = await apiHandler.post('/api/test').send(data).expect(201);

      const { body: getResult } = await apiHandler.get(`/api/test/${body._id}`).expect(200);
      expect(R.pick(['name', 'otherValue'], getResult)).toMatchObject(data);

      await apiHandler.patch(`/api/test/${body._id}`).send(newValue).expect(200);

      const { body: getResult2 } = await apiHandler.get(`/api/test/${body._id}`).expect(200);
      expect(R.pick(['name', 'otherValue'], getResult2)).toMatchObject({ name: data.name, otherValue: newValue.otherValue });
    });
  });

  describe('replace', () => {
    it('should change the object to the db', async () => {
      const data = { name: 'test', otherValue: 123 };
      const newObject = { name: 'newName', otherValue: 321 };
      const { body } = await apiHandler.post('/api/test').send(data).expect(201);

      const { body: getResult } = await apiHandler.get(`/api/test/${body._id}`).expect(200);
      expect(R.pick(['name', 'otherValue'], getResult)).toMatchObject(data);

      await apiHandler.put(`/api/test/${body._id}`).send(newObject).expect(200);

      const { body: getResult2 } = await apiHandler.get(`/api/test/${body._id}`).expect(200);
      expect(R.pick(['name', 'otherValue'], getResult2)).toMatchObject(newObject);
    });
  });

  describe('delete', () => {
    it('should delete existing object from the db', async () => {
      const data = { name: 'test', otherValue: 123 };
      const { body } = await apiHandler.post('/api/test').send(data).expect(201);

      const { body: getResult } = await apiHandler.get(`/api/test/${body._id}`).expect(200);
      expect(R.pick(['name', 'otherValue'], getResult)).toMatchObject(data);

      await apiHandler.delete(`/api/test/${body._id}`).expect(204);

      const { body: getResult2 } = await apiHandler.get('/api/test/').expect(200);
      expect(getResult2.length).toBe(0);
    });
  });
});
