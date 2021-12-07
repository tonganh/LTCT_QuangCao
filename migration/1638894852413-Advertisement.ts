import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

const startAtCol = new TableColumn({
  name: "start_at",
  type: "timestamptz",
  default: "now()",
});

const endAtCol = new TableColumn({
  name: "end_at",
  type: "timestamptz",
  default: "now()",
});

export class Advertisement1638894852413 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("advertisement", [startAtCol, endAtCol]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("advertisement", "start_at");
    await queryRunner.dropColumn("advertisement", "end_at");
  }
}
