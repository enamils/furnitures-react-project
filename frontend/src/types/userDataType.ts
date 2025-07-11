export type UserData = {
    token: string;
    userId: string;
    expiration: string;
}

export type LoginParams = {
    token: string;
    userId: string;
    expirationTime?: number;
}