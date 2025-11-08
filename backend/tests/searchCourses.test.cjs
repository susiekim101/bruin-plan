const { search } = require('../controllers/userController');
const { connection } = require('../src/database');

// Create a fixture for my database
// Jest will replace my import with the mock object
jest.mock('../src/database');

const mockSearchTerm = ''

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

test('empty query to the Courses database returns nothing', async () => {
    const result = await search(mockSearchTerm);

    expect(mockExecute).toHaveBeenCalledTimes(1);
    expect(result).toBe('');
});