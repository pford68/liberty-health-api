import {describe, expect, it, test} from '@jest/globals';
import request from "supertest";
import app from '../../app.js';

describe('GET /api/users', () => {
    it('returns a list of users', async () => {
        // Make a GET request to the endpoint
        const response = await request(app)
            .get('/api/users/')
            .expect('Content-Type', /json/)  // Check response header
            .expect(200);                      // Check status code

        // Assert on response body
        expect(response.body).toHaveProperty('users');
        expect(Array.isArray(response.body.users)).toBe(true);
    });

    it.skip('returns 401 when not authenticated', async () => {
        const response = await request(app)
            .get('/api/users/protected')
            .expect(401);

        expect(response.body.error).toBe('Unauthorized');
    });
});


describe.skip('POST /api/users', () => {
    it('creates a new user with valid data', async () => {
        const newUser = {
            email: 'test@example.com',
            name: 'Test User',
            password: 'securepassword123'
        };

        const response = await request(app)
            .post('/api/users')
            .send(newUser)                    // Send JSON body
            .set('Accept', 'application/json') // Set headers
            .expect(201);

        expect(response.body.user.email).toBe(newUser.email);
        expect(response.body.user).not.toHaveProperty('password'); // Should not expose password
    });

    it('returns 400 for invalid email', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({ email: 'not-an-email', name: 'Test', password: 'pass123' })
            .expect(400);

        expect(response.body.error).toContain('email');
    });
});


describe('GET /api/form/search', () => {
    it('returns basic information about a job applicant', async () => {
        // Make a GET request to the endpoint
        const response = await request(app)
            .get('/api/form/search?email=ldoncic@gmail.com')
            .expect('Content-Type', /json/)  // Check response header
            .expect(200);                      // Check status code

        // Assert on response body
        const {body} = response;
        expect(body).toHaveProperty('applicant');
    });

    it('returns 404 if the user is not found', async () => {
        // Make a GET request to the endpoint
        const response = await request(app)
            .get('/api/form/search?email=tromo@gmail.com')
            .expect('Content-Type', /json/)  // Check response header
            .expect(404);                      // Check status code
    });
});