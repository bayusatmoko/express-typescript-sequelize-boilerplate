export interface User {
    id?: string;
    organizationId: string;
    managerId?: string;
    roleId: string;
    email: string;
    name: string;
    username: string;
    password: string;
    created_at: string | undefined;
    updated_at: string | undefined;
}
