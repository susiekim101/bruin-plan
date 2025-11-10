// const { createUser, getMajorId } = require('../controllers/createUser');
// const { connection } = require('../src/database');
import { createUser, getMajorId } from '../controllers/createUser';
import { connection } from '../src/database';

const mockUser = {
  first_name: 'Joe',
  last_name: 'Bruin',
  email: 'example@gmail.com',
  password: 'example',
  major: 'Computer Science'
}

const major_id = 3;

// Create a fixture for my database
// Jest will replace my import with the mock object
jest.mock('../src/database');

// Create a mock connection from my database
const mockConnection = connection;

// Create a mock execute function
const mockExecute = jest.fn();

// mockConnection should use mockExecute function
beforeAll(() => {
  mockConnection.execute = mockExecute;
});

// Start with clean state each time
beforeEach(() => {
  mockExecute.mockClear()
});

test('query to the Majors database returns a major_id', async () => {
  const mock_rows = [{major_id: 3}];
  const mock_result = [mock_rows, []];
  mockExecute.mockResolvedValueOnce(mock_result);

  const result = await getMajorId(mockUser)

  expect(mockExecute).toHaveBeenCalledTimes(1);
  expect(result).toBe(major_id);
});

test('query to add user returns inserted user id', async () => {
  const mock_rows = [{major_id: 3}];
  const mock_result = [mock_rows, []];
  mockExecute.mockResolvedValueOnce(mock_result);
  
  const mock_OkPackage = {
    insertId: 1,
    affectedRows: 1
  };
  const mock_user_result = [mock_OkPackage, []];
  mockExecute.mockResolvedValueOnce(mock_user_result);

  await createUser(mockUser);
  expect(mockExecute).toHaveBeenCalledTimes(3);
});