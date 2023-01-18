/*
  Warnings:

  - Changed the type of `week_day` on the `habit_week_days` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "habit_week_days" DROP COLUMN "week_day",
ADD COLUMN     "week_day" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "habit_week_days_habit_id_week_day_key" ON "habit_week_days"("habit_id", "week_day");
