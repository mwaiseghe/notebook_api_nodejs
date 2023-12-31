USE NotebookAPI
GO

-- notebook procedures
CREATE OR ALTER PROCEDURE getNotesProc
AS
BEGIN
    SELECT * FROM Note
END
GO

CREATE OR ALTER PROCEDURE getSingleNoteProc
    @id VARCHAR(200)
AS
BEGIN
    SELECT * FROM Note WHERE ID = @id
END
GO

CREATE OR ALTER PROCEDURE createNoteProc
    @id VARCHAR(200),
    @title VARCHAR(100),
    @content NVARCHAR(MAX),
    @createdAt DATETIME
AS
BEGIN
    INSERT INTO Note (ID, Title, Content, CreatedAt)
    VALUES (@id, @title, @content, @createdAt)
END
GO

CREATE OR ALTER PROCEDURE updateNoteProc
    @id VARCHAR(200),
    @title VARCHAR(100),
    @content NVARCHAR(MAX)
AS
BEGIN
    UPDATE Note
    SET Title = @title, Content = @content
    WHERE ID = @id
END
GO

CREATE OR ALTER PROCEDURE deleteNoteProc
    @id VARCHAR(200)
AS
BEGIN
    DELETE FROM Note WHERE ID = @id
END
GO

-- procedure to check if a note with the same content already exists
CREATE OR ALTER PROCEDURE checkNoteWithExistingContentProc
    @title VARCHAR(100),
    @content NVARCHAR(MAX)
AS
BEGIN
    SELECT * FROM Note WHERE Title = @title AND Content = @content
END
GO