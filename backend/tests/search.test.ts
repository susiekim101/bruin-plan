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

import { search } from "../controllers/search.ts";

// Start with clean state each time
beforeEach(() => {
  jest.clearAllMocks();
});

test('search should estabish connection to database', async () => {
    mockExecute.mockResolvedValueOnce([[]]);
    await search('');
    expect(mockGetConnection).toHaveBeenCalledTimes(1);
})

test('search return all courses with course number containing query term', async () => {
    mockExecute.mockResolvedValueOnce([[{course_number: 'TEST 1', course_name: 'Course 1'}, {course_number: 'TEST 2', course_name: 'Course 2'}]]);
    const result = await search('TEST');
    expect(mockExecute).toHaveBeenCalledWith('SELECT * FROM Courses WHERE course_number LIKE %?%', ['TEST']);
    expect(result).toEqual([{course_number: 'TEST 1', course_name: 'Course 1'}, {course_number: 'TEST 2', course_name: 'Course 2'}]);
})