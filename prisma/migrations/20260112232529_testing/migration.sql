/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `teams_members` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[team_id]` on the table `teams_members` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "teams_members_user_id_team_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "teams_members_user_id_key" ON "teams_members"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "teams_members_team_id_key" ON "teams_members"("team_id");
