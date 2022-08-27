import { ProductBusiness } from "../../src/business/ProductBusiness"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { HashManagerMock } from "../mocks/services/HashManagerMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { ProductDatabaseMock } from "../mocks/ProductDatabaseMock"
import { IGetProductsInputDTO, IPostProductInputDTO } from "../../src/models/Products"
import { BaseError } from "../../src/errors/BaseError"

describe("Testing ProductsBusiness", () => {
    const productsBusiness = new ProductBusiness(
        new ProductDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
    )

    test("Post product successfully", async () => {

        const input: IPostProductInputDTO = {
            token: "token-nicoly",
            name: "Vestido azul"
        }

        const response = await productsBusiness.postProduct(input)

        expect(response.message).toEqual("Product added successfully!")
    })


    test("retorna erro se token ausente invalido", async () => {
        expect.assertions(2)
        try {
            const input: IPostProductInputDTO = {
                token: "",
                name: "Vestido azul"
            }

            await productsBusiness.postProduct(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(401)
                expect(error.message).toEqual("Missing or invalid token.")
            }
        }
    })

    test("retorna erro se nome do produto ausente", async () => {
        expect.assertions(2)
        try {
            const input: IPostProductInputDTO = {
                token: "token-nicoly",
                name: ""
            }

            await productsBusiness.postProduct(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual("Missing param.")
            }
        }
    })

    test("retorna erro se nome do produto for menor que 4 caracteres", async () => {
        expect.assertions(2)
        try {
            const input: IPostProductInputDTO = {
                token: "token-nicoly",
                name: "cal"
            } 

            await productsBusiness.postProduct(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual("Invalid name param.")
            }
        }
    })

})