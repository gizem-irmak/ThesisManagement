import "jest-extended";
const request = require('supertest');
const AuthenticationController = require('../../Controllers/AuthenticationController');

describe("Authentication Tests", () => {
    let req, res;
    beforeAll(() => {
        req = {
            isAuthenticated: () => true,
            user: {
                id: 1,
                email: "s317989@studenti.polito.it",
                role: "Student"
            }
        };

        res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
    });

    test("CheckSession - Success", async () => {
        AuthenticationController.session(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("CheckSession - Success, not student", async () => {
        req.user.role = 'lecturer';
        AuthenticationController.session(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("CheckSession - Unauthorized", async () => {
        req.isAuthenticated = () => false;
        AuthenticationController.session(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
    });
});