import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

const createdAtCol = new TableColumn({
  name: 'created_at',
  type: 'timestamptz',
  default: 'now()',
});
const updatedAtCol = new TableColumn({
  name: 'updated_at',
  type: 'timestamptz',
  default: 'now()',
});

export class Roles1631777491696 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles',
        columns: [
          new TableColumn({
            name: 'key',
            type: 'varchar',
            isNullable: true,
            default: null,
            isPrimary: true,
          }),
          new TableColumn({
            name: 'name',
            type: 'varchar',
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
    await queryRunner.dropTable('roles', true, true);
  }
}
