import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
const idCol = new TableColumn({
  name: 'id',
  type: 'integer',
  isPrimary: true,
  isGenerated: true,
  generationStrategy: 'increment',
});
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

const deletedAtCol = new TableColumn({
  name: 'deleted_at',
  type: 'timestamptz',
  default: null,
  isNullable: true,
});
const deletedByCol = new TableColumn({
  name: 'deleted_by',
  type: 'integer',
  isNullable: true,
  default: null,
});
const deletedByForeignKey = new TableForeignKey({
  columnNames: ['deleted_by'],
  referencedTableName: 'users',
  referencedColumnNames: ['id'],
});
export class User1632194572797 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          idCol,
          createdAtCol,
          updatedAtCol,
          deletedAtCol,
          deletedByCol,
          new TableColumn({
            name: 'full_name',
            type: 'varchar',
            default: null,
            isNullable: true,
          }),
          new TableColumn({
            name: 'email',
            default: null,
            isNullable: true,
            type: 'varchar',
          }),
          new TableColumn({
            name: 'username',
            default: null,
            isNullable: true,
            type: 'varchar',
          }),
          new TableColumn({
            name: 'password',
            default: null,
            isNullable: true,
            type: 'varchar',
          }),
          new TableColumn({
            name: 'role_key',
            type: 'varchar',
            default: null,
          }),
          new TableColumn({
            name: 'salt',
            type: 'varchar',
            isNullable: true,
            default: null,
          }),
          new TableColumn({
            name: 'is_blocked',
            type: 'boolean',
            isNullable: true,
            default: null,
          }),
          new TableColumn({
            name: 'blocked_at',
            type: 'timestamptz',
            default: null,
            isNullable: true,
          }),
          new TableColumn({
            name: 'blocked_by',
            type: 'integer',
            default: null,
            isNullable: true,
          }),
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys('users', [
      new TableForeignKey({
        referencedTableName: 'roles',
        referencedColumnNames: ['key'],
        columnNames: ['role_key'],
      }),
      new TableForeignKey({
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['blocked_by'],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('roles', true, true);
  }
}
