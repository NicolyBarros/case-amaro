import { UserBusiness} from "../../src/business/UserBusiness"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"
import { IdGeneratorMock} from "../mocks/services/IdGeneratorMock"
import { HashManagerMock } from "../mocks/services/HashManagerMock"
import { AuthenticatorMock} from "../mocks/services/AuthenticatorMock"
import { ILoginInputDTO } from "../../src/models/User"
import { BaseError } from "../../src/errors/BaseError"

describe("Testing UserBusiness", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
    )
    
    test("Login successfully", async () => {
        const input: ILoginInputDTO = {
            email: "nicoly@gmail.com",
            password: "asdfg123"
        }

        const response = await userBusiness.login(input)

        expect(response.message).toEqual("Login successfully!")
        expect(response.token).toEqual("token-nicoly")
    })

    test("retorna erro se email não for cadastrado", async () => {
        expect.assertions(2)
        try {
            const input: ILoginInputDTO = {
                email: "labenu@gmail.com",
                password: "labenu22"
            }

            await userBusiness.login(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(404)
                expect(error.message).toEqual("Email not registered.")
            }
        }
    })

    test("retorna erro se email tiver formato inválido ", async () => {
        expect.assertions(2)
        try {
            const input: ILoginInputDTO = {
                email: "nicolygmail.com",
                password: "asdfg123"
            }

            await userBusiness.login(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual("Invalid 'email' parameter.")
            }
        }
    })
    
    test("retorna erro se senha estiver incorreta", async () => {
        expect.assertions(2)
        try {
            const input: ILoginInputDTO = {
                email: "nicoly@gmail.com",
                password: "senhaerrada"
            }

            await userBusiness.login(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(401)
                expect(error.message).toEqual("Incorrect password.")
            }
        }
    })

})