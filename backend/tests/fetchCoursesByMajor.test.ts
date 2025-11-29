jest.mock('../src/database.ts', () => ({
  connection: {
    execute: jest.fn(),
  }
}));

import { connection } from "../src/database.ts";
import { fetchCoursesByMajor } from "../controllers/fetchCoursesByMajor";

const mockExecute = connection.execute as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

test('fetchCoursesByMajor should estabish connection to database', async () => {
  mockExecute.mockResolvedValueOnce([[], []]);
  await fetchCoursesByMajor(-1);
  expect(mockExecute).toHaveBeenCalledTimes(1);
});


test('query with no specified major should return no courses', async () => {
  mockExecute.mockResolvedValueOnce([[], []]);
  const result = await fetchCoursesByMajor(-1);
  expect(mockExecute).toHaveBeenCalledWith('SELECT * FROM Courses WHERE major_id = ?', [-1]);
  expect(result).toEqual([]);
});

test('query with a specified major returns all courses with that major ID', async () => {
  mockExecute.mockResolvedValueOnce([[{major_id: 1, course_name: 'Test Course'}]]);
  const result = await fetchCoursesByMajor(1);
  expect(mockExecute).toHaveBeenCalledWith('SELECT * FROM Courses WHERE major_id = ?', [1]);
  expect(result).toEqual([{major_id: 1, course_name: 'Test Course'}]);
});