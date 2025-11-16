import express from 'express'
import cors from 'cors'
import axios from 'axios';
import 'dotenv/config'

const mockExecute = jest.fn();
jest.mock('../src/database.ts', () => ({
    connection: {
        execute: mockExecute
    }
}));

import userRouter from '../routes/userRouter';
import { createUser, findByEmail } from '../controllers/createUser.model';
axios.defaults.baseURL = process.env.AXIOS_URL

// import bcrypt from 'bcrypt'; // hashing passwords

let server;
let app;
let mockUser;

beforeAll(() => {
    app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/user', userRouter);
    server = app.listen();

    mockUser = {
        first_name: 'Joe',
        last_name: 'Bruin',
        email: 'example@gmail.com',
        password: 'example',
        major: 'Computer Science'
    }
})

// Start with clean state each time
beforeEach(() => {
  mockExecute.mockClear()
});

afterEach(async () => {
    jest.clearAllMocks();
    server.close();
});


// // Find user by email, can create a user?
describe('findByEmail()', () => {
    // Need to return email if found
    // Return an empty array if not found
    test('returns an empty array when email is not found', async () => {
        const mockRows = [];
        const mockResult = [mockRows, []];
        mockExecute.mockResolvedValueOnce(mockResult);

        const email = await findByEmail('test@example.com');

        expect(mockExecute).toHaveBeenCalledTimes(1);
        const query = 'SELECT email FROM Users WHERE email = ?';
        expect(mockExecute).toHaveBeenCalledWith(query, ['test@example.com']);
        expect(email).toHaveLength(0);
    });

    test('returns the email when results are found', async () => {
        const mockRows = [ { email: 'test@example.com'} ];
        const mockResult = [mockRows, []];
        mockExecute.mockResolvedValueOnce(mockResult);

        const mockEmail = 'test@example.com';
        const query = 'SELECT email FROM Users WHERE email = ?';
        const email = await findByEmail(mockEmail);

        expect(mockExecute).toHaveBeenCalledTimes(1);
        expect(mockExecute).toHaveBeenCalledWith(query, [mockEmail]);
        
        expect(email).toHaveLength(1);
        expect(email).toEqual(
            expect.arrayContaining([expect.objectContaining({ email: 'test@example.com'})])
        )
    });
});

describe('createUser()', () => {
    // Can't create an account if email is already in use
    test("throws error if email used is already found in database", async () => {
        const mockRow = [ { email: 'test@example.com', password: 'test'}];
        const mockResult = [mockRow, []];
        mockExecute.mockResolvedValueOnce(mockResult);
        
        // const account = await createUser(mockUser); 
        // expect(account.message).toBe('Email already exists');
        await expect(createUser(mockUser)).rejects.toThrow('Email already exists');
    })

    test("successfully creates an account", async () => {
        // findEmail()
        const mockFindEmailRow = [];
        const mockFindEmailResult = [mockFindEmailRow, []];
        mockExecute.mockResolvedValueOnce(mockFindEmailResult);

        // Find major_id
        const mockMajorRow = [ {major_id: 1} ];
        const mockMajorResult = [mockMajorRow, []];
        mockExecute.mockResolvedValueOnce(mockMajorResult);

        // Input the user
        const mockResult = [{insertId: 1}];
        mockExecute.mockResolvedValueOnce(mockResult);

        const result = await createUser(mockUser);
        expect(result).toBe(1);
    });
});

describe("User Controller", () => {

    describe("signup()", () => {
        test("rejects existing email", async () => {
            // Mock findByEmail call inside createUser
            const mockRow = [ { email: 'test@example.com' } ];
            const mockResult = [mockRow, []];
            mockExecute.mockResolvedValueOnce(mockResult);
            
            try {
                await axios.post('/user/signup', mockUser);
            } catch (error) {
                expect(error.response.status).toBe(400);
                expect(error.response.data).toBe('Existing email');
            }
        });

        test("password in database should not be same as password passed in", async () => {
            // Mock findByEmail call inside createUser
            const mockFindEmailRow = [];
            const mockFindEmailResult = [mockFindEmailRow, []];
            mockExecute.mockResolvedValueOnce(mockFindEmailResult);

            // Find major_id
            const mockMajorRow = [ {major_id: 1} ];
            const mockMajorResult = [mockMajorRow, []];
            mockExecute.mockResolvedValueOnce(mockMajorResult);

            // Input the user
            const mockResult = [{insertId: 1}];
            mockExecute.mockResolvedValueOnce(mockResult);

            // addToUserPlans()
            const mockPlanResult = [{affectedRows: 1}, []];
            mockExecute.mockResolvedValueOnce(mockPlanResult);
            
            try {
                const response = await axios.post('/user/signup', mockUser);
                expect(mockExecute).toHaveBeenCalledTimes(4);
                expect(response.status).toBe(202);
            } catch (error){
                console.log(error.response.status);
                expect(error.response.status).toBe(202);
            } 
        });

        // test("create query for account and return success", async () => {
        //     // findEmail()
        //     const mockFindEmailRow = [];
        //     const mockFindEmailResult = [mockFindEmailRow, []];
        //     mockExecute.mockResolvedValueOnce(mockFindEmailResult);

        //     // Find major_id
        //     const mockMajorRow = [ {major_id: 1} ];
        //     const mockMajorResult = [mockMajorRow, []];
        //     mockExecute.mockResolvedValueOnce(mockMajorResult);

        //     // Input the user
        //     const mockResult = [{insertId: 1}];
        //     mockExecute.mockResolvedValueOnce(mockResult);


        //     await axios.post('/users/signup', mockUser);
        //     expect(mockExecute).toHaveBeenCalledTimes(2);

        // });
    });

    // describe("login()", () => {
    //     test("rejects missing email", async () => {
    //         throw new Error('Test not implemented');
    //     });

    //     test("reects missing password", async () => {
    //         throw new Error('Test not implemented');
    //     });

    //     test('returns error if password is incorrect', async () => {
    //         throw new Error('Test not implemented');
    //     });

    //     test('successfully authenticate and logs in user', async () => {
    //         throw new Error('Test not implemented');
    //     });
    // });
});