const { createUser } = require('../controllers/createUser');


test('database establishes connection', async () => {
  await expect(createUser()).resolves.toBeDefined();
});