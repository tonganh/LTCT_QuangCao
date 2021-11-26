import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class Advertisement1637931728165 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "advertisement",
      new TableColumn({
        name: "advertisement_position",
        type: "varchar",
        isNullable: true,
        default: null,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("advertisement", "advertisement_position");
  }
}
