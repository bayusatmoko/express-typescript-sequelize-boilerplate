import { Organization } from '@/interfaces/organization.interfaces';
import { Models } from '@/interfaces/models.interfaces';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export type OrganizationCreationAttributes = Optional<Organization, 'id'>;

export class OrganizationModel
    extends Model<Organization, OrganizationCreationAttributes>
    implements Organization
{
    public id!: string;
    public name!: string;
    public created_at: string | undefined;
    public updated_at: string | undefined;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public static associate = (models: Models) => {
        OrganizationModel.hasMany(models.Users, {
            foreignKey: 'organizationId',
            as: 'users',
        });
        OrganizationModel.hasMany(models.Roles, {
            foreignKey: 'organizationId',
            as: 'roles',
        });
    };
}

export default function (sequelize: Sequelize): typeof OrganizationModel {
    OrganizationModel.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            tableName: 'organizations',
            sequelize,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true,
        },
    );

    return OrganizationModel;
}
