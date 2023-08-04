const mssql = require("mssql");

const { sqlConfig } = require("../Config/Config");
const { getNotes, getSingleNote, updateNote, deleteNote, createNote } = require("../Controllers/noteController");

const req = {
    body: {
        title: "test",
        content: "test content",
    },
};

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
};

describe("Note Controller Tests", () => {
    describe("Getting All Notes", () => {
        it("Should return all notes", async () => {
            const notes = [
                {
                    "ID": "80d1410e-9c86-42c5-b64e-fcb811e03d28",
                    "Title": "Python Library With Test Message",
                    "Content": "Use the Python decouple lib to hide your secrets",
                    "CreatedAt": "2023-08-01T10:18:00.410Z"
                },
                {
                    "ID": "85702c7f-abc3-48ec-a72d-1b4a67c3c61c",
                    "Title": "Python Library With Test Message",
                    "Content": "Use the Python decouple lib to hide your secrets",
                    "CreatedAt": "2023-08-01T11:49:11.100Z"
                }
            ];

            //arrange

            const req = {};

            // act
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: notes,
                }),
            });

            await getNotes(req, res);

            // assert
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                notes,
            });
        });

        it("should return an error if there is an error", async () => {
            // arrange
            const req = {};

            // act
            jest.spyOn(mssql, "connect").mockRejectedValueOnce(new Error("Error"));

            await getNotes(req, res);

            // assert
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                error: "Error",
            });
        }
        );
    });

    describe("Getting a single note", () => {
        it("Should return a single note of the given id", async () => {
            const note_id = "80d1410e-9c86-42c5-b64e-fcb811e03d28";
            const single_note = {
                    "ID": "80d1410e-9c86-42c5-b64e-fcb811e03d28",
                    "Title": "Python Library With Test Message",
                    "Content": "Use the Python decouple lib to hide your secrets",
                    "CreatedAt": "2023-08-01T10:18:00.410Z"
                };

            //arrange
            const req = {
                params: {
                    id: note_id,
                },
            };

            // act
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: [single_note],
                    rowsAffected: [1],
                }),
            });

            await getSingleNote (req, res);

            // assert
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                note: single_note,
            });
        });


    });

    describe("Updating a note", () => {
        it("Should update a note of the given id", async () => {
            const note_id = "80d1410e-9c86-42c5-b64e-fcb811e03d28";
            const single_note = {
                "ID": "80d1410e-9c86-42c5-b64e-fcb811e03d28",
                "Title": "Python Library With Test Message",
                "Content": "Use the Python decouple lib to hide your secrets",
                "CreatedAt": "2023-08-01T10:18:00.410Z"
            };

            //arrange
            const req = {
                params: {
                    id: note_id,
                },
                body: {
                    title: "Updated Title",
                    content: "Updated Content",
                },
            };

            // act
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: [single_note],
                    rowsAffected: [1],
                }),
            });

            await updateNote (req, res);

            // assert
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Note updated successfully"
            });
        });

        it("Should ensure that title and content are provided", async () => {
            const note_id = "80d1410e-9c86-42c5-b64e-fcb811e03d28";

            //arrange
            const req = {
                params: {
                    id: note_id,
                },
                body: {
                    title: "",
                    content: "",
                },
            };

            // act
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [1],
                }),
            });

            await updateNote (req, res);

            // assert
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Title and content are required"
            });
        });
    });

    describe("Deleting a note", () => {

        it("Should return a 200 if the note is deleted", async () => {
            const note_id = "80d1410e-9c86-42c5-b64e-fcb811e03d28";

            //arrange
            const req = {
                params: {
                    id: note_id,
                },
            };

            // act
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [1],
                }),
            });

            await deleteNote (req, res);

            // assert
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Note deleted successfully"
            });
        });
    });

    describe("Creating a note", () => {
        it("Should return an error if title or content is not provided", async () => {
            // arrange
            const req = {
                body: {
                    title: "",
                    content: "",
                },
            };

            // act
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [1],
                }),
            });

            await createNote (req, res);

            // assert
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Title and content are required"
            });
        });

        it("check if note with the same title and content exists", async () => {
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
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [1],
                }),
            });

            await createNote (req, res);

            // assert
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Note with same content and already exists"
            });
        });

        it("Should return a 201 if the note is created", async () => {
            // arrange
            const req = {
                body: {
                    title: "test 4",
                    content: "test content",
                },
            };

            // act
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [1],
                }),
            });

            await createNote (req, res);

            // assert
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: "Note created successfully"
            });
        });
    });

    
});