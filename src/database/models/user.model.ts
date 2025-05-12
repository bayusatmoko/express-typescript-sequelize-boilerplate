import { User } from '@/interfaces/user.interfaces';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export type UserCreationAttributes = Optional<
    User,
    'id' | 'username' | 'managerId'
>;

export class UserModel
    extends Model<User, UserCreationAttributes>
    implements User
{
    public id!: string;
    public organizationId!: string;
    public managerId?: string;
    public roleId!: string;
    public email!: string;
    public name!: string;
    public username!: string;
    public password!: string;
    public created_at: string | undefined;
    public updated_at: string | undefined;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public static associate = models => {
        UserModel.belongsTo(models.Organizations, {
            as: 'organizations',
            foreignKey: 'organizationId',
        });
        UserModel.belongsTo(models.Roles, {
            as: 'roles',
            foreignKey: 'roleId',
        });
        UserModel.hasMany(models.Users, {
            as: 'managers',
            foreignKey: 'managerId',
        });
    };
}

export default function (sequelize: Sequelize): typeof UserModel {
    UserModel.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUIDV4,
                defaultValue: DataTypes.UUIDV4,
            },
            organizationId: {
                allowNull: false,
                type: DataTypes.UUID,
                references: {
                    model: 'organizations',
                    key: 'id',
                },
            },
            managerId: {
                allowNull: true,
                type: DataTypes.UUID,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            roleId: {
                allowNull: false,
                type: DataTypes.UUID,
                references: {
                    model: 'roles',
                    key: 'id',
                },
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            username: {
                allowNull: true,
                type: DataTypes.STRING,
                unique: true,
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING(255),
            },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            tableName: 'users',
            sequelize,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true,
        },
    );

    return UserModel;
}
