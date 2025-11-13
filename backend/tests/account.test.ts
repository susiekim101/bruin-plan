import express from 'express'
import cors from 'cors'
// const express = require('express');
// const cors = require('cors');
import { connection } from '../src/database'
import bcrypt from 'bcrypt'; // hashing passwords
import 'dotenv/config'

jest.mock('../src/database');

let server;
let mockConnection;
let app;
let mockExecute;

beforeAll(() => {
    app = express();
    app.use(cors());

    server = app.listen();
    mockConnection = connection;

    mockExecute = jest.fn();
    mockConnection.execute = mockExecute;
})

// Start with clean state each time
beforeEach(() => {
  mockExecute.mockClear()
});

afterEach(async () => {
    jest.clearAllMocks();
    server.close();
});

describe('Account Model', () => {
    // Find user by email, can create a user?
    describe('findByEmail()', () => {
        // Need to return email if found
        // Return an empty array if not found
        test('returns an empty array when email is not found', async () => {
            throw new Error("Test not implemented yet")
        });

        test('returns the email when results are found', async () => {
            throw new Error("Test not implemented yet");
        });
    });

    describe('createAccount()', () => {
        // Can't create an account if email is already in use
        test("throws error if email used is already found in database", async () => {
            throw new Error("Test not implemented yet");
        })

        test("successfully creates an account", async () => {
            throw new Error("Test not yet implemented");
        });
    });
});