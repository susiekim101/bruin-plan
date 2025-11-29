jest.mock('../src/database.ts', () => ({
  connection: {
    execute: jest.fn(),
  }
}));

import { connection } from "../src/database.ts";
import { fetchMajors } from "../controllers/fetchMajors.ts";

const mockExecute = connection.execute as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

test('fetchMajors should estabish connection to database', async () => {
  mockExecute.mockResolvedValueOnce([[], []]);
  await fetchMajors();
  expect(mockExecute).toHaveBeenCalledTimes(1);
});

test('fetchMajors should query database with SELECT * FROM Majors', async () => {
  mockExecute.mockResolvedValueOnce([[], []]);
  await fetchMajors();
  expect(mockExecute).toHaveBeenCalledWith('SELECT * FROM Majors');
});

test('query should return all majors (name, ID) in Majors table', async () => {
    mockExecute.mockResolvedValueOnce([[{major_id: 1, major_name: "TestMajor1"}, {major_id: 2, major_name: "TestMajor2"}, {major_id: 1, major_name: "TestMajor3"}]]);
    const result = await fetchMajors();
    expect(result).toEqual(
            expect.arrayContaining([expect.objectContaining({major_id: 1, major_name: "TestMajor1"}, {major_id: 2, major_name: "TestMajor2"}, {major_id: 1, major_name: "TestMajor3"})])
    );
});