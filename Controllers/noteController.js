const { v4 } = require("uuid");
const { createNoteTable } = require("../Database/Tables/createTables");
const { mssql, sqlConfig } = require("../Config/Config");

const createNote = async (req, res) => {
  try {
    createNoteTable();
    const { title, content } = req.body;

    // Check if title and content are empty
    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const id = v4();
    const createdAt = new Date();

    const pool = await mssql.connect(sqlConfig);

    // validate if note with same content exists
    const find_note = await mssql.connect(sqlConfig);
    const find_note_request = await find_note
      .request()
      .input("Title", mssql.VarChar, title)
      .input("Content", mssql.NVarChar, content)
      .execute("checkNoteWithExistingContentProc");

    if (find_note_request.rowsAffected[0] === 1) {
      return res.status(400).json({
        message: "Note with same content and already exists",
      });
    }

    const request = await pool
      .request()
      .input("ID", mssql.VarChar, id)
      .input("Title", mssql.VarChar, title)
      .input("Content", mssql.NVarChar, content)
      .input("CreatedAt", mssql.DateTime, createdAt)
      .execute("createNoteProc");

    if (request.rowsAffected[0] === 1) {
      return res.status(201).json({
        message: "Note created successfully",
      });
    }
    return res.status(400).json({
      message: "Note not created",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getNotes = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const request = await pool.request().execute("getNotesProc");
    return res.status(200).json({
        notes: request.recordset
    }
      );
  } catch (error) {
    return res.status(500).json({
        error: error.message
     });
  }
};

const getSingleNote = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const request = await pool
      .request()
      .input("ID", mssql.VarChar, id)
      .execute("getSingleNoteProc");
    if (request.rowsAffected[0] === 0) {
      return res.status(404).json({ 
        message: "Note does not exist" 
      });
    }
    return res.status(200).json({
        note: request.recordset[0]
    });
  } catch (error) {
    return res.status(500).json({ 
      error: error.message
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    const find_note = await mssql.connect(sqlConfig);
    const find_note_request = await find_note
      .request()
      .input("ID", mssql.VarChar, id)
      .execute("getSingleNoteProc");

    if (find_note_request.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            message: "Title and content are required"
        });
    }

    const pool = await mssql.connect(sqlConfig);
    const request = await pool
      .request()
      .input("ID", mssql.VarChar, id)
      .input("Title", mssql.VarChar, title)
      .input("Content", mssql.NVarChar, content)
      .execute("updateNoteProc");

    if (request.rowsAffected[0] === 1) {
      return res.status(200).json({ 
        message: "Note updated successfully" 
      });
    }
    return res.status(400).json({ 
      message: "Note not updated" 
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await mssql.connect(sqlConfig);
    // validate if note exists
    const find_note = await mssql.connect(sqlConfig);
    const find_note_request = await find_note
      .request()
      .input("ID", mssql.VarChar, id)
      .execute("getSingleNoteProc");

    if (find_note_request.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Note not found" });
    }
    
    const request = await pool
      .request()
      .input("ID", mssql.VarChar, id)
      .execute("deleteNoteProc");
    if (request.rowsAffected[0] === 1) {
      return res.status(200).json({ message: "Note deleted successfully" });
    }
    return res.status(400).json({ message: "Note not deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNote,
  getNotes,
  getSingleNote,
  updateNote,
  deleteNote,
};
