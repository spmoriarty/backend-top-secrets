const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const { request } = require('../lib/app');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

describe('backend top secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
});
const newUser = {
  firstName: 'Testing',
  lastName: 'User',
  email: 'lamp@shade.com',
  password: 12345,
}

  it('creates a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(newUser);
    const { firstName, lastName, email } = newUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      firstName,
      lastName,
      email,
    });
  });

  //NEW TEST HERE

  afterAll(() => {
    pool.end();
  });
});
