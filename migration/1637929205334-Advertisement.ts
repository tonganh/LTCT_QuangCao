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
export class Advertisement1637929205334 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "advertisement",
        columns: [
          idCol,
          new TableColumn({
            name: "title",
            type: "varchar",
            isNullable: true,
            default: null,
          }),
          new TableColumn({
            name: "content",
            type: "varchar",
            isNullable: true,
            default: null,
          }),
          new TableColumn({
            name: "advertisment_url",
            type: "varchar",
            isNullable: true,
            default: null,
          }),
          new TableColumn({
            name: "image_url",
            type: "varchar",
            isNullable: true,
            default: null,
          }),
          new TableColumn({
            name: "type",
            type: "varchar",
            isNullable: true,
            default: null,
          }),
          new TableColumn({
            name: "advertising_display_type",
            type: "varchar",
            isNullable: true,
            default: null,
          }),
          new TableColumn({
            name: "status",
            type: "varchar",
            isNullable: true,
            default: null,
          }),
          createdAtCol,
          updatedAtCol,
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("advertisement", true, true);
  }
}
