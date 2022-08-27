import { ProductBusiness } from "../../src/business/ProductBusiness"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { HashManagerMock } from "../mocks/services/HashManagerMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { ProductDatabaseMock } from "../mocks/ProductDatabaseMock"
import { IGetProductsInputDTO } from "../../src/models/Products"
import { BaseError } from "../../src/errors/BaseError"

describe("Testing ProductsBusiness", () => {
    const productsBusiness = new ProductBusiness(
        new ProductDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
    )

    test("Get products by tag successfully", async () => {

        const input: IGetProductsInputDTO = {
            search:"balada"
        }

        const response = await productsBusiness.getProductsTags(input)

        expect(response.products?.length).toEqual(2)
        expect(response.products[0].id).toEqual("8371")
        expect(response.products[0].name).toEqual("VESTIDO TRICOT CHEVRON")
    })

    test("retorna erro se tag de busca nao existir no banco de dados", async () => {
        expect.assertions(2)
        try {
            const input: IGetProductsInputDTO = {
                search: "verao"
            }
    
            await productsBusiness.getProductsTags(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(404)
                expect(error.message).toEqual("Tag not registered.")
            }
        }
    })

}) 