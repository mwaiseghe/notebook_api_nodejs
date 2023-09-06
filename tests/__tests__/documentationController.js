const mssql = require("mssql");

const { getNotes, getSingleNote, updateNote, deleteNote, createNote } = require("../Controllers/noteController");


const checkIfNoteExists = async (req, res) => {
    const { title, content } = req.body;

    try {
        const pool = await mssql.connect(dbConfig);
        const result = await pool
            .request()
            .input("title", mssql.VarChar, title)
            .input("content", mssql.VarChar, content)
            .query(
                "SELECT * FROM Notes WHERE Title = @title AND Content = @content"
            );

        if (result.recordset.length > 0) {
            return res.status(400).json({
                message: "Note with same content and already exists",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

function fetchData(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id: id, title: 'test' });
        }, 2000); // 2 seconds
    });
}


module.exports = {
    checkIfNoteExists,
    fetchData
};