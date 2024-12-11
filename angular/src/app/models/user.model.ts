export interface User {
    id: number;
    name?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    paymentCard?: string | null;
    enabled?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}