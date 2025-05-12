import { DB } from '@/database';
import { User } from '@/interfaces/user.interfaces';

export const repo = {
    getUserProfile: async (
        userId: string | undefined,
    ): Promise<User | null> => {
        return await DB.Users.findOne({
            where: { id: userId },
            include: [
                {
                    model: DB.Organizations,
                    as: 'organizations',
                    attributes: ['name'],
                },
                {
                    model: DB.Roles,
                    as: 'roles',
                    attributes: ['name'],
                },
                {
                    model: DB.Users,
                    as: 'managers',
                    attributes: ['email', 'name'],
                },
            ],
            attributes: ['email', 'name'],
        });
    },
};
