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

const { fetchCoursesByMajor } = require('../controllers/fetchCoursesByMajor');

// Start with clean state each time
beforeEach(() => {
  jest.clearAllMocks();
});

test('loadCourseCards should estabish connection to database', async () => {
  await fetchCoursesByMajor();
  expect(mockGetConnection).toHaveBeenCalledTimes(1);
});


test('query with no specified major should return no courses', async () => {
  const result = await fetchCoursesByMajor(-1);
  expect(mockExecute).toHaveBeenCalledWith('SELECT * FROM Courses WHERE major_id = ?', [-1]);
  expect(result).toEqual([]);
});

test('query with a specified major returns all courses with that major ID', async () => {
  mockExecute.mockResolvedValueOnce([[{major_id: 1, course_name: 'Test Course'}]])
  const result = await fetchCoursesByMajor(1);
  expect(mockExecute).toHaveBeenCalledWith('SELECT * FROM Courses WHERE major_id = ?', [1]);
  expect(result).toEqual([{major_id: 1, course_name: 'Test Course'}]);
});