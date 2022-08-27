import { BaseDatabase } from "../../src/database/BaseDatabase"
import { IUserDB, User, USER_ROLES } from "../../src/models/User"

export class UserDatabaseMock extends BaseDatabase {
    public static TABLE_USERS = "Amaro_Users"

    public toUserDBModel = (user: User) => {
        const userDB: IUserDB = {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole()
        }

        return userDB
    }

    public findByEmail = async (email: string) => {
        switch (email) {
            case "nicoly@gmail.com":
                return {
                    id: "101",
                    name: "Nicoly",
                    email: "nicoly@gmail.com",
                    password: "$2a$12$LkWMqS3oPhP2iVMcZOVvWer9ahUPulxjB0EA4TWPxWaRuEEfYGu/i", //asdfg123
                    role: USER_ROLES.ADMIN
                } as IUserDB
            default:
                return undefined
        }
    }

    public createUser = async (user: User) => {

    }
}