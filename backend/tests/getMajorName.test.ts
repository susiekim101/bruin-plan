jest.mock('../src/database.ts', () => ({
  connection: {
    execute: jest.fn(),
  }
}));

import { connection } from "../src/database.ts";
import { getMajorName } from "../controllers/getMajorName.ts";

const mockExecute = connection.execute as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

test('getMajorName should estabish connection to database', async () => {
  mockExecute.mockResolvedValueOnce([[], []]);
  await getMajorName(1);
  expect(mockExecute).toHaveBeenCalledTimes(1);
});

test('getMajorName should query database with "SELECT major_name FROM Majors WHERE major_id = ?"', async () => {
  mockExecute.mockResolvedValueOnce([[], []]);
  const major_id = 1;
  await getMajorName(major_id);
  expect(mockExecute).toHaveBeenCalledWith('SELECT major_name FROM Majors WHERE major_id = ?', [major_id]);
});

test('getMajorName should return major_name associated with major_id', async () => {
  const mockRows = [ { major_name: 'Test Major' } ];
  const mockResult = [mockRows, []];
  mockExecute.mockResolvedValueOnce(mockResult);

  const mockMajorID = 1;
  const result = await getMajorName(mockMajorID);
  expect(result).toEqual(
            expect.arrayContaining([expect.objectContaining({major_name: 'Test Major'})])
        );
});