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

import { getMajorName } from "../controllers/getMajorName.ts";

// Start with clean state each time
beforeEach(() => {
  jest.clearAllMocks();
});

test('getMajorName should estabish connection to database', async () => {
  mockExecute.mockResolvedValueOnce([[]]);
  await getMajorName();
  expect(mockGetConnection).toHaveBeenCalledTimes(1);
});