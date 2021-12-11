import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";
const idCol = new TableColumn({
  name: "id",
  type: "integer",
  isPrimary: true,
  isGenerated: true,
  generationStrategy: "increment",
});
const createdAtCol = new TableColumn({
  name: "created_at",
  type: "timestamptz",
  default: "now()",
});
const updatedAtCol = new TableColumn({
  name: "updated_at",
  type: "timestamptz",
  default: "now()",
});
export class Custormer1639228646318 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "custormers",
        columns: [
          idCol,
          new TableColumn({
            name: "name",
            type: "varchar",
            isNullable: true,
            default: null,
          }),
          new TableColumn({
            name: "email",
            type: "varchar",
            isNullable: true,
            default: null,
          }),
          new TableColumn({
            name: "receive_email",
            type: "boolean",
            isNullable: true,
            default: false,
          }),
          createdAtCol,
          updatedAtCol,
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("custormers", true, true);
  }
}
