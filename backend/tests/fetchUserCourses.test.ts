jest.mock('../src/database.ts', () => ({
  connection: {
    execute: jest.fn(),
  }
}));

import { connection } from "../src/database.ts";
import { fetchUserCourses, fetchAllUserCourses } from "../controllers/fetchUserCourses.ts";

const mockExecute = connection.execute as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

test('fetchUserCourses should establish connection to database', async () => {
  mockExecute
    .mockResolvedValueOnce([[{ plan_id: 18 }], []])
    .mockResolvedValueOnce([[], []]);

  await fetchUserCourses({ userId: 2, yearIndex: 1, quarterName: 'Fall' });

  expect(mockExecute).toHaveBeenCalledTimes(2);
});

test('query with no specified user id should return no courses', async () => {
  mockExecute
    .mockResolvedValueOnce([[], []])

  const result = await fetchUserCourses({ 
    userId: -1, 
    yearIndex: 1, 
    quarterName: 'Fall' 
  });

  expect(mockExecute).toHaveBeenCalledTimes(1);

  expect(result).toEqual([]);
});

test('query with a userId, yearIndex, and quarterName should return no courses', async () => {

  mockExecute
    .mockResolvedValueOnce([[{ plan_id: 18 }], []])
    .mockResolvedValueOnce([
      [
        { 
          course_id: 38,
          course_number: 'COM SCI 1',
          course_name: 'Freshman Computer Science Seminar',
          course_units: 1,
          category: 'Major'
        }
      ],
      []
    ]);

  const result = await fetchUserCourses({ 
    userId: 3, 
    yearIndex: 1, 
    quarterName: 'Summer' 
  });

  expect(mockExecute).toHaveBeenCalledTimes(2);
  expect(mockExecute.mock.calls[1]).toEqual([
    `SELECT pi.course_id, c.course_number, c.course_name, c.course_units, c.category 
                    FROM Plan_Items pi JOIN Courses c ON pi.course_id = c.course_id 
                    WHERE plan_id = ? AND year = ? AND quarter = ?`,
    [18, 1, 'Summer']
  ]);

  expect(result).toEqual([
    {
      course_id: 38,
      course_number: 'COM SCI 1',
      course_name: 'Freshman Computer Science Seminar',
      course_units: 1,
      category: 'Major'
    }
  ]);
});

test('fetchAllUserCourses should establish connection to database', async () => {
  mockExecute.mockResolvedValueOnce([[], []]);

  await fetchAllUserCourses({ userId: 1});

  expect(mockExecute).toHaveBeenCalledTimes(1);
});