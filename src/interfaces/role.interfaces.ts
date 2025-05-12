export interface Role {
    id?: string;
    organizationId: string;
    name: string;
    level: number;
    created_at: string | undefined;
    updated_at: string | undefined;
}
