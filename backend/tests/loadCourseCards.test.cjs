// Create a mock execute function
const mockExecute = jest.fn().mockResolvedValue([[]]);
const mockRelease = jest.fn();
const mockGetConnection = jest.fn().mockResolvedValue({
  execute: mockExecute,
  release: mockRelease
});

// Create a mock connection from my database
jest.mock('../src/database', () => ({
  connection: {
    getConnection: mockGetConnection
  }
}));

const { loadCourseCards } = require('../controllers/loadCourseCards');

// Start with clean state each time
beforeEach(() => {
  jest.clearAllMocks();
});

test('loadCourseCards should estabish connection to database', async () => {
  await loadCourseCards();
  expect(mockGetConnection).toHaveBeenCalledTimes(1);
});

test('query with no specified major should return no courses', async () => {
  const result = await loadCourseCards(-1);
  expect(mockExecute).toHaveBeenCalledWith('SELECT * FROM Courses WHERE major_id = ?', [-1]);
  expect(result).toEqual([]);
});