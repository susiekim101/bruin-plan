const { sharePlan } = require("../controllers/sharePlan");
const { connection } = require('../src/database');

const mockPlan = {
    'user_id': 1,
    'major_id': 1,
}

jest.mock('../src/database');

const mockConnection = connection;

const mockExecute = jest.fn();

beforeAll(() => {
    mockConnection.execute = mockExecute;
})

beforeEach(() => {
    mockExecute.mockClear()
});

test('execute query once to add passed in props to database', async () => {
    const mock_OkPackage = {
        insertId: 1,
        affectedRows: 1
    };
    const mock_result = [mock_OkPackage, []];
    mockExecute.mockResolvedValueOnce(mock_result);

    await sharePlan(mockPlan);
    expect(mockExecute).toHaveBeenCalledTimes(1);
})

test('function returns the new user_plan id')