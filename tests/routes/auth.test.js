const request = require("supertest");
const { app, mongoose } = require("../../server");

describe("Auth Routes - Unit Test", () => {
    jest.setTimeout(15000);

    afterAll(async () => {
        await mongoose.connection.close();
    });


    test("POST /api/auth/signup returns created user object (id, username, email)", async () => {
        const unique = Date.now();

        const payload = {
            name: "Datta",
            username: `dattureddy_${unique}`,
            email: `dattureddy_${unique}@test.com`,
            password: "Pora@12345",
        };

        const res = await request(app)
            .post("/api/auth/signup")
            .set("Content-Type", "application/json")
            .send(payload);

        expect([200, 201]).toContain(res.status);

        // Match your real response shape:
        expect(res.body).toHaveProperty("id");
        expect(typeof res.body.id).toBe("string");

        expect(res.body).toHaveProperty("username", payload.username);
        expect(res.body).toHaveProperty("email", payload.email);
        expect(res.body).toHaveProperty("name", payload.name);
    });
});
