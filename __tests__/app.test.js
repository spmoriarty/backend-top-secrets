const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');




const newUser = {
  firstName: 'Testing',
  lastName: 'User',
  email: 'lamp@shade.com',
  password: '12345',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? newUser.password;
  const agent = request.agent(app);
  const user = await UserService.create({ ...newUser, ...userProps });
  const { email } = user;
  await agent.post('/api/v1/users/session').send({ email, password });
  return [agent, user];
};

describe('backend top secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new user', async () => {
    const agent = request.agent(app);
    const res = await agent.post('/api/v1/users').send(newUser);
    const { firstName, lastName, email } = newUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      firstName,
      lastName,
      email,
    });
  });


  it('#Post Sign in exisiting user', async () => {
    const agent = request.agent(app);
    await agent.post('/api/v1/users').send(newUser);
    const res = await agent
      .post('/api/v1/users/session')
      .send({ email: 'lamp@shade.com', password: '12345' });

    expect(res.status).toBe(200);
  });

  it('#Delete /session cookie', async () => {
    const [agent] = await registerAndLogin();
    const res = await agent.get('/api/v1/secrets');
    expect(res.status).toBe(200) ;
    const delUser = await agent.delete('/api/v1/users/session');
    expect(delUser.body).toEqual({
      success: true,
      message: 'Signed out successfully!' });

    const getUser =  await request(app).get('api/v1/secrets');
    expect(getUser.status).toBe(401);
  });

  //NEW TEST HERE

  afterAll(() => {
    pool.end();
  });
});
