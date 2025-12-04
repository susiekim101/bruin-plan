// mock the database module
jest.mock('../src/database.ts', () => ({
  connection: {
    execute: jest.fn(),
  }
}));

// import the mocked connection and the function to be tested
import { connection } from "../src/database.ts";
import { fetchUserCourses, fetchAllUserCourses } from "../controllers/quarterCourses.ts";

// create a mock execute function
const mockExecute = connection.execute as jest.Mock;

// clear mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

// tests for fetchUserCourses function
test('fetchUserCourses should establish connection to database', async () => {
  mockExecute
    .mockResolvedValueOnce([[{ plan_id: 18 }], []]) // getPlanId
    .mockResolvedValueOnce([[], []]); // fetchUserCourses

  // call function with test parameters
  await fetchUserCourses({ userId: 2, yearIndex: 1, quarterName: 'Fall' });

  // assert that mockExecute was called twice
  expect(mockExecute).toHaveBeenCalledTimes(2);
});

// test for no specified user id
test('query with no specified user id should return no courses', async () => {
  mockExecute
    .mockResolvedValueOnce([[]]); // getPlanId

  // call function with test parameters
  const result = await fetchUserCourses({ 
    userId: -1, 
    yearIndex: 1, 
    quarterName: 'Fall' 
  });

  // assert that mockExecute was called once, should not be called for fetching courses
  expect(mockExecute).toHaveBeenCalledTimes(1);

  // assert that the result is an empty array
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
    `SELECT pi.course_id, c.course_number, c.course_name, c.course_units, pi.status, c.category 
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
  mockExecute
    .mockResolvedValueOnce([[{ plan_id: 1 }], []])
    .mockResolvedValueOnce([[], []]);

  await fetchAllUserCourses(4);

  expect(mockExecute).toHaveBeenCalledTimes(2);
});


test(`fetchAllUserCourses should query database with
        SELECT pi.course_id, c.course_number, c.course_name, c.course_units, c.category 
        FROM Plan_Items pi JOIN Courses c ON pi.course_id = c.course_id 
        WHERE plan_id = ?`, async () => {
  
  const plan_id = 1;

  mockExecute
    .mockResolvedValueOnce([[{ plan_id: plan_id }], []])
    .mockResolvedValueOnce([[], []]);

  await fetchAllUserCourses(4);
  expect(mockExecute.mock.calls[1]).toEqual([
                  `SELECT pi.course_id, c.course_number, c.course_name, c.course_units, pi.status, c.category 
                        FROM Plan_Items pi JOIN Courses c ON pi.course_id = c.course_id 
                        WHERE plan_id = ?`, [plan_id]]);
});


test('fetchAllUserCourses should return all courses of a given plan_id', async () => {
  const plan_id = 1;
  mockExecute
    .mockResolvedValueOnce([[{ plan_id: plan_id }], []])
    .mockResolvedValueOnce([[
        { 
          course_id: 1,
          course_number: 'TEST 1',
          course_name: 'Test Course 1',
          course_units: 1,
          category: 'Major'
        },
        { 
          course_id: 2,
          course_number: 'TEST 2',
          course_name: 'Test Course 2',
          course_units: 1,
          category: 'Major'
        },
        { 
          course_id: 1,
          course_number: 'TEST 3',
          course_name: 'Test Course 3',
          course_units: 1,
          category: 'Major'
        }
    ], []]);
  
  const result = await fetchAllUserCourses(4);
  expect(result).toEqual([
    { 
      course_id: 1,
      course_number: 'TEST 1',
      course_name: 'Test Course 1',
      course_units: 1,
      category: 'Major'
    },
    { 
      course_id: 2,
      course_number: 'TEST 2',
      course_name: 'Test Course 2',
      course_units: 1,
      category: 'Major'
    },
    { 
      course_id: 1,
      course_number: 'TEST 3',
      course_name: 'Test Course 3',
      course_units: 1,
      category: 'Major'
    }
  ]);
});