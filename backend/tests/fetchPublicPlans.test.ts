import { getAllPublicPlans } from "../controllers/fetchPlanItems";
jest.mock('../src/database');
import { connection } from "../src/database";
const mockConnection = connection;

const mockExecute = jest.fn();

beforeAll(() => {
    mockConnection.execute = mockExecute;

    mockConnection.execute = mockExecute;

})

// Start with clean state each time
beforeEach(() => {
  mockExecute.mockClear()
});

afterEach(async () => {
    jest.clearAllMocks();
});

describe('getAllPublicPlans()', () => {

    test('getAllPublicPlans() returns array of objects where is_shared == 1', async () => {
        const mockRows = [{plan_id: 1, major_id: 1}, {plan_id: 2, major_id: 2}];
        const mockResult = [mockRows, []];
        mockExecute.mockResolvedValueOnce(mockResult);

        const plans = await getAllPublicPlans();

        expect(mockExecute).toHaveBeenCalledTimes(1);
        const query = 'SELECT (plan_id, major_id) FROM User_Plans WHERE is_shared = 1';
        expect(mockExecute).toHaveBeenCalledWith(query);
        expect(plans).toHaveLength(2);
    });


    test('getAllPublicPlans() returns empty array if no public plans exist', async () => {
        const mockRows = [];
        const mockResult = [mockRows, []];
        mockExecute.mockResolvedValueOnce(mockResult);

        const plans = await getAllPublicPlans();

        expect(mockExecute).toHaveBeenCalledTimes(1);
        const query = 'SELECT (plan_id, major_id) FROM User_Plans WHERE is_shared = 1';
        expect(mockExecute).toHaveBeenCalledWith(query);
        expect(plans).toHaveLength(0);
    });
});
