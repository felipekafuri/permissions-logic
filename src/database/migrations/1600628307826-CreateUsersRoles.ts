import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreateUsersRoles1600628307826 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users_roles",
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: 'uuid_generate_v4()'
                },
                {
                    name: "role_id",
                    type: 'uuid'
                },
                {
                    name: "user_id",
                    type: 'uuid'
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()"
                }
            ]
        }))


        await queryRunner.createForeignKey('users_roles', new TableForeignKey({
            columnNames: ['role_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'roles',
            name: "fk_roles_user_",
            onDelete: 'CASCADE',
            onUpdate: 'SET NULL'

        }))
        await queryRunner.createForeignKey('users_roles', new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            name: "fk_users_roles_",
            onDelete: 'CASCADE',
            onUpdate: 'SET NULL'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users_roles', 'fk_users_roles_')
        await queryRunner.dropForeignKey('users_roles', 'fk_roles_user_')
        await queryRunner.dropTable('users_roles')
    }
}
