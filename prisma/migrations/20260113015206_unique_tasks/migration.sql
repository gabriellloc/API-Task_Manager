/*
  Warnings:

  - A unique constraint covering the columns `[assigned_to,team_id]` on the table `Tasks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tasks_assigned_to_team_id_key" ON "Tasks"("assigned_to", "team_id");
