BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[patient] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [TipeId] NVARCHAR(1000) NOT NULL,
    [Identification] VARCHAR(10) NOT NULL,
    [FirstName] VARCHAR(20) NOT NULL,
    [SecondName] VARCHAR(20) NOT NULL,
    [FirstLastName] VARCHAR(30) NOT NULL,
    [SecondLastName] VARCHAR(30) NOT NULL,
    [Birthdate] DATETIME2 NOT NULL,
    [Age] INT NOT NULL,
    [Phone] VARCHAR(10) NOT NULL,
    [Email] VARCHAR(60) NOT NULL,
    [Gender] VARCHAR(30) NOT NULL,
    CONSTRAINT [patient_Id_key] UNIQUE NONCLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[professional] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Name] VARCHAR(240) NOT NULL,
    [Register] VARCHAR(20) NOT NULL,
    [Identification] VARCHAR(10) NOT NULL,
    [specialty] VARCHAR(100) NOT NULL,
    CONSTRAINT [professional_Id_key] UNIQUE NONCLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[Orders] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [DateOrder] DATETIME2 NOT NULL,
    [State] BIT NOT NULL,
    [Diagnostic] VARCHAR(4) NOT NULL,
    CONSTRAINT [Orders_Id_key] UNIQUE NONCLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[ItemsOrder] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Service] VARCHAR(8) NOT NULL,
    [Description] VARCHAR(240) NOT NULL,
    CONSTRAINT [ItemsOrder_Id_key] UNIQUE NONCLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[Diagnostics] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [CodeDiagnostic] VARCHAR(4) NOT NULL,
    [NameDiagnostic] VARCHAR(250) NOT NULL,
    CONSTRAINT [Diagnostics_Id_key] UNIQUE NONCLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[Services] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [CodeService] VARCHAR(8) NOT NULL,
    [NameService] VARCHAR(250) NOT NULL,
    CONSTRAINT [Services_Id_key] UNIQUE NONCLUSTERED ([Id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
