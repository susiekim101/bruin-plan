// Create a mock execute function
const mockExecute = jest.fn();

// Create a mock connection from my database
jest.mock('../src/database', () => {
  return {
    connection: {
      execute: mockExecute
    }
  };
});

const { search } = require('../controllers/userController');

const mockSearchTerm = ''

// Start with clean state each time
beforeEach(() => {
  mockExecute.mockClear()
});

test('search function should connect to database', async () => {
    const result = await search(mockSearchTerm);
    expect(mockExecute).toHaveBeenCalledTimes(1);
});

test('empty query to the Courses database returns nothing', async () => {
    const result = await search(mockSearchTerm);
    expect(result).toBe('');
});