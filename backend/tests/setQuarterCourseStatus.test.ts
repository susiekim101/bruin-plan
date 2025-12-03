// test: course status is updated in a user's plan for a specific quarter
import { connection } from '../src/database';
import { setQuarterCourseStatus } from '../controllers/quarterCourses';

// create a fixture for database
jest.mock('../src/database');

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

test('query to setQuarterCourseStatus returns update result', async () => {
  mockExecute
  .mockResolvedValueOnce([[{ plan_id: 18 }], []]) // getPlanId
  .mockResolvedValueOnce([{}]); // update/set query
  
  // call function to set course status
    const result = await setQuarterCourseStatus({
        userId: 3, 
        yearIndex: 1,
        quarterName: 'Fall', 
        status: 'Completed'
    });

  // assert that mockExecute was called with correct queries and values
  expect(mockExecute).toHaveBeenCalledTimes(2);

  expect(mockExecute.mock.calls[0]).toEqual([
    expect.any(String),
    [3]
  ]);

  expect(mockExecute).toHaveBeenCalledWith(
    expect.any(String), 
    ['Taken', 18, 1, 'Fall']
  );

  // assert that the returned result is correct
  expect(result).toBeDefined();
});