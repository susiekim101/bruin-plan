// Create a mock execute function
const mockExecute = jest.fn();
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

import { getPlanId } from "../controllers/addCoursesToQuarter.ts";
import { fetchUserCourses } from "../controllers/fetchUserCourses.ts";

// Start with clean state each time
beforeEach(() => {
  jest.clearAllMocks();
});

test('fetchUserCourses should estabish connection to database', async () => {
  mockExecute.mockResolvedValueOnce([[]]);
  await fetchUserCourses({userId: -1, yearIndex: -1, quarterName: 'Fall' });
  expect(mockGetConnection).toHaveBeenCalledTimes(1);
});


test('query with a userId, yearIndex, and quarterName should return no courses', async () => {
  const result = await fetchUserCourses({ userId: 3, yearIndex: 1, quarterName: 'Fall' });
  expect(mockExecute).toHaveBeenCalledWith('SELECT course_id FROM Plan_Items WHERE plan_id = ? AND year = ? AND quarter = ?;', [18, 1, 'Fall']);
  expect(result).toEqual([]);
});

