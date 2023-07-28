DROP DATABASE IF EXISTS NotebookAPI

-- Create a new database
CREATE DATABASE NotebookAPI

-- Connect to the new database
USE NotebookAPI

-- notebook table
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
GO

