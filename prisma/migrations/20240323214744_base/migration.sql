BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Patient] (
    [IdPatient] INT NOT NULL IDENTITY(1,1),
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
    CONSTRAINT [Patient_pkey] PRIMARY KEY CLUSTERED ([IdPatient])
);

-- CreateTable
CREATE TABLE [dbo].[Professional] (
    [IdProfessional] INT NOT NULL IDENTITY(1,1),
    [Name] VARCHAR(240) NOT NULL,
    [Register] VARCHAR(20) NOT NULL,
    [Identification] VARCHAR(10) NOT NULL,
    [specialty] VARCHAR(100) NOT NULL,
    CONSTRAINT [Professional_pkey] PRIMARY KEY CLUSTERED ([IdProfessional]),
    CONSTRAINT [Professional_Identification_key] UNIQUE NONCLUSTERED ([Identification])
);

-- CreateTable
CREATE TABLE [dbo].[Orders] (
    [IdOrders] INT NOT NULL IDENTITY(1,1),
    [DateOrder] DATETIME2 NOT NULL,
    [State] BIT NOT NULL,
    [IdPatient] INT NOT NULL,
    [IdProfessional] INT NOT NULL,
    [CodeDiagnostic] VARCHAR(4) NOT NULL,
    CONSTRAINT [Orders_pkey] PRIMARY KEY CLUSTERED ([IdOrders]),
    CONSTRAINT [Orders_IdPatient_key] UNIQUE NONCLUSTERED ([IdPatient]),
    CONSTRAINT [Orders_IdProfessional_key] UNIQUE NONCLUSTERED ([IdProfessional]),
    CONSTRAINT [Orders_CodeDiagnostic_key] UNIQUE NONCLUSTERED ([CodeDiagnostic])
);

-- CreateTable
CREATE TABLE [dbo].[ItemsOrder] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Service] VARCHAR(8) NOT NULL,
    [Description] VARCHAR(240) NOT NULL,
    [IdOrders] INT NOT NULL,
    CONSTRAINT [ItemsOrder_pkey] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [ItemsOrder_Service_key] UNIQUE NONCLUSTERED ([Service]),
    CONSTRAINT [ItemsOrder_IdOrders_key] UNIQUE NONCLUSTERED ([IdOrders])
);

-- CreateTable
CREATE TABLE [dbo].[Diagnostics] (
    [IdDiagnostic] INT NOT NULL IDENTITY(1,1),
    [CodeDiagnostic] VARCHAR(4) NOT NULL,
    [NameDiagnostic] VARCHAR(250) NOT NULL,
    CONSTRAINT [Diagnostics_pkey] PRIMARY KEY CLUSTERED ([IdDiagnostic]),
    CONSTRAINT [Diagnostics_CodeDiagnostic_key] UNIQUE NONCLUSTERED ([CodeDiagnostic])
);

-- CreateTable
CREATE TABLE [dbo].[Services] (
    [IdServices] INT NOT NULL IDENTITY(1,1),
    [CodeService] VARCHAR(8) NOT NULL,
    [NameService] VARCHAR(250) NOT NULL,
    CONSTRAINT [Services_pkey] PRIMARY KEY CLUSTERED ([IdServices]),
    CONSTRAINT [Services_CodeService_key] UNIQUE NONCLUSTERED ([CodeService])
);

-- AddForeignKey
ALTER TABLE [dbo].[Orders] ADD CONSTRAINT [Orders_IdPatient_fkey] FOREIGN KEY ([IdPatient]) REFERENCES [dbo].[Patient]([IdPatient]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Orders] ADD CONSTRAINT [Orders_IdProfessional_fkey] FOREIGN KEY ([IdProfessional]) REFERENCES [dbo].[Professional]([IdProfessional]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Orders] ADD CONSTRAINT [Orders_CodeDiagnostic_fkey] FOREIGN KEY ([CodeDiagnostic]) REFERENCES [dbo].[Diagnostics]([CodeDiagnostic]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ItemsOrder] ADD CONSTRAINT [ItemsOrder_IdOrders_fkey] FOREIGN KEY ([IdOrders]) REFERENCES [dbo].[Orders]([IdOrders]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ItemsOrder] ADD CONSTRAINT [ItemsOrder_Service_fkey] FOREIGN KEY ([Service]) REFERENCES [dbo].[Services]([CodeService]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
