/*
  Warnings:

  - A unique constraint covering the columns `[Identification]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[Patient] ADD CONSTRAINT [Patient_Identification_key] UNIQUE NONCLUSTERED ([Identification]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
