import { Role } from '@/interfaces/role.interfaces';
import { Models } from '@/interfaces/models.interfaces';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export type RoleCreationAttributes = Optional<Role, 'id'>;

export class RoleModel
    extends Model<Role, RoleCreationAttributes>
    implements Role
{
    public id!: string;
    public organizationId!: string;
    public name!: string;
    public level!: number;
    public created_at: string | undefined;
    public updated_at: string | undefined;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public static associate = (models: Models) => {
        RoleModel.belongsTo(models.Organizations, {
            as: 'organizations',
            foreignKey: 'organizationId',
        });
    };
}

export default function (sequelize: Sequelize): typeof RoleModel {
    RoleModel.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            organizationId: {
                field: 'organization_id',
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'organizations',
                    key: 'id',
                },
            },
            name: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            level: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            tableName: 'roles',
            sequelize,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true,
        },
    );

    return RoleModel;
}
