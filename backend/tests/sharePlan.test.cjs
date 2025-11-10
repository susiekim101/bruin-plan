const { sharePlan } = require("../controllers/sharePlan");
const { connection } = require('../src/database');

const mockUserId = 123

jest.mock('../src/database');

const mockConnection = connection;

const mockExecute = jest.fn();

beforeAll(() => {
    mockConnection.execute = mockExecute;
})

beforeEach(() => {
    mockExecute.mockClear()
});

test('execute query once with two parameters', async () => {
    const mock_OkPackage = {
        insertId: 1,
        affectedRows: 1
    };
    const mock_result = [mock_OkPackage, []];
    mockExecute.mockResolvedValueOnce(mock_result);

    await sharePlan(mockUserId);
    expect(mockExecute).toHaveBeenCalledTimes(1);
})