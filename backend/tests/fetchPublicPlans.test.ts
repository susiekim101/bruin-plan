import { getAllPublicPlans, getMajorById, getPlanItems } from "../controllers/fetchPlanItems";
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
        const query = 'SELECT plan_id, major_id FROM User_Plans WHERE is_shared = 1';
        expect(mockExecute).toHaveBeenCalledWith(query);
        expect(plans).toHaveLength(2);
    });


    test('getAllPublicPlans() returns empty array if no public plans exist', async () => {
        const mockRows = [];
        const mockResult = [mockRows, []];
        mockExecute.mockResolvedValueOnce(mockResult);

        const plans = await getAllPublicPlans();

        expect(mockExecute).toHaveBeenCalledTimes(1);
        const query = 'SELECT plan_id, major_id FROM User_Plans WHERE is_shared = 1';
        expect(mockExecute).toHaveBeenCalledWith(query);
        expect(plans).toHaveLength(0);
    });
});

describe('getMajorById()', () => {
    test('getMajorById() returns a string representing a major name', async () => {
        const mockRows = ["Computer Science"];
        const mockResult = [mockRows, []];

        mockExecute.mockResolvedValueOnce(mockResult);

        const majorName = await getMajorById({major_id: 1});
        const majorId = 1;

        expect(mockExecute).toHaveBeenCalledTimes(1);
        const query = 'SELECT major_name FROM Majors WHERE major_id = ?';
        expect(mockExecute).toHaveBeenCalledWith(query, [majorId]);
        expect(majorName).toStrictEqual(["Computer Science"]);
    });

    test('getMajorById() returns empty array if unknown major_id', async () => {
        const mockRows = [];
        const mockResult = [mockRows, []];

        mockExecute.mockResolvedValueOnce(mockResult);

        const majorName = await getMajorById({major_id: 5});
        const majorId = 5;

        expect(mockExecute).toHaveBeenCalledTimes(1);
        const query = 'SELECT major_name FROM Majors WHERE major_id = ?';
        expect(mockExecute).toHaveBeenCalledWith(query, [majorId]);
        expect(majorName).toStrictEqual([]);
    })
});

describe('getPlanItems()', () => {
    test('getPlanItems() returns an object representing all planItems for plan_id', async () => {
        const mockRows = [{
                course_number: "MATH 32A",
                course_name: "Calculus",
                year: 'Fall',
                quarter: 'Completed'
            }
        ];
        const mockResult = [mockRows, []];

        mockExecute.mockResolvedValueOnce(mockResult);

        const planItems = await getPlanItems({plan_id: 1});
        const planId = 1;

        expect(mockExecute).toHaveBeenCalledTimes(1);
        const query = 'SELECT c.course_number, c.course_name, pi.year, pi.quarter FROM Plan_Items pi JOIN Courses c ON pi.course_id = c.course_id WHERE plan_id = ?';
        expect(mockExecute).toHaveBeenCalledWith(query, [planId]);
        expect(planItems).toStrictEqual(mockRows);
    });

    test('getPlanItems() returns empty array if unknown plan_id', async () => {
        const mockRows = [];
        const mockResult = [mockRows, []];

        mockExecute.mockResolvedValueOnce(mockResult);

        const planItems = await getPlanItems({plan_id: 5});
        const plan_id = 5;

        expect(mockExecute).toHaveBeenCalledTimes(1);
        const query = 'SELECT c.course_number, c.course_name, pi.year, pi.quarter FROM Plan_Items pi JOIN Courses c ON pi.course_id = c.course_id WHERE plan_id = ?';
        expect(mockExecute).toHaveBeenCalledWith(query, [plan_id]);
        expect(planItems).toStrictEqual([]);
    })
});