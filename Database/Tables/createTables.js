const {sqlConfig, mssql } = require("../../Config/Config");

const createNoteTable = async () => {
    try {
        const noteTable = `
        BEGIN TRY
        CREATE TABLE Note (
            ID VARCHAR(200) NOT NULL PRIMARY KEY,
            Title VARCHAR(100) NOT NULL,
            Content NVARCHAR(MAX) NOT NULL,
            CreatedAt DATETIME NOT NULL
        )
        END TRY

        BEGIN CATCH
            PRINT 'Note table already exists'
        END CATCH
        `;

        const pool = await mssql.connect(sqlConfig);
        const request = await pool.request();
        request.query(noteTable);
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    createNoteTable
}