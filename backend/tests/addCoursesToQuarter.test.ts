// test: course shows up in a specific quarter in a user's plan
import { connection } from '../src/database';
import { addCoursesToQuarter } from '../controllers/addCoursesToQuarter';

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

test('query to addCoursesToQuarter returns inserted course id', async () => {
  mockExecute.mockResolvedValueOnce([[{ plan_id: 18 }], []]);
  mockExecute.mockResolvedValueOnce([{ insertId: 111 }]);

  const id = await addCoursesToQuarter({
    userId: 3, 
    courseId: 1,
    yearIndex: 1,
    quarterName: 'Fall', 
  });

  expect(mockExecute).toHaveBeenCalledTimes(2);

  expect(mockExecute.mock.calls[0]).toEqual([
    expect.any(String),
    [3]
  ]);

  expect(mockExecute).toHaveBeenCalledWith(
    expect.any(String), 
    [18, 1, 1, 'Fall']
  );

  expect(id).toBe(111);
});