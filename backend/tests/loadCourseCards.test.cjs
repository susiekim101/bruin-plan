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

const { loadCourseCards } = require('../controllers/loadCourseCards');

// Start with clean state each time
beforeEach(() => {
  mockExecute.mockClear()
});

test('loadCourseCards should estabish connection to database', async () => {
    const result = await loadCourseCards();
    expect(result).toBe('');
});