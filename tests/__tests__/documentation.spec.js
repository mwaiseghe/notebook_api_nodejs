const mssql = require("mssql");
const { getNotes, getSingleNote, updateNote, deleteNote, createNote } = require("../Controllers/noteController");
const { checkIfNoteExists, fetchData } = require("./documentationController");

const req = {
    body: {
        title: "create test 1",
        content: "test content",
    },
};

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
};

describe("Check If Note Exists", () => {
    it("Should return an error if note with the same title and content exists", async () => {
        // arrange
        const req = {
            body: {
                title: "test",
                content: "test content",
            },
        };

        // act
        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            query: jest.fn().mockResolvedValueOnce({
                recordset: [{ title: "test", content: "test content" }],
            }),
        });

        await checkIfNoteExists(req, res);

        // assert
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Note with same title and content already exists",
        });
    });
});


describe("Asynchronous fetchData", () => {
    it("Should return post with id 1", async () => { // async keyword is required for this test
        const data = await fetchData();  // Note the await keyword
        expect(data).toBe({
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        });
    });
});

// Asynchronous testin   with timeout
describe("Asynchronous fetchData", () => {
    it("Should return post with id 1", async () => { // async keyword is required for this test
        const data = await fetchData();  // Note the await keyword
        expect(data).toBe({
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        });
    });

    it("Fetch failed with a timeout", async () => {
        // Expect the assertion to fail with a timeout
        expect.assertions(1);
        try {
            await fetchData();
        }
        catch (e) {
            // Error message should be "error"
            expect(e).toMatch("error");
        }
    });
});

