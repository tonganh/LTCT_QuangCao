import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class Advertisement1638893939827 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "advertisement",
      new TableColumn({
        name: "access_number",
        type: "integer",
        isNullable: true,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("advertisement", "access_number");
  }
}
