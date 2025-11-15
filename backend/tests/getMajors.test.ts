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

import { fetchMajors } from "../controllers/fetchMajors.ts";

// Start with clean state each time
beforeEach(() => {
  jest.clearAllMocks();
});

test('getMajors should estabish connection to database', async () => {
  mockExecute.mockResolvedValueOnce([[]]);
  await fetchMajors();
  expect(mockGetConnection).toHaveBeenCalledTimes(1);
});

test('query should return all majors (name, ID) in Majors table', async () => {
    mockExecute.mockResolvedValueOnce([[{major_id: 1, major_name: "TestMajor1"}, {major_id: 2, major_name: "TestMajor2"}, {major_id: 1, major_name: "TestMajor3"}]]);
    const result = await fetchMajors();
    expect(mockExecute).toHaveBeenCalledWith('SELECT * FROM Majors');
    expect(result).toEqual([{major_id: 1, major_name: "TestMajor1"}, {major_id: 2, major_name: "TestMajor2"}, {major_id: 1, major_name: "TestMajor3"}]);
});