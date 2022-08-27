import { ProductBusiness } from "../../src/business/ProductBusiness"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { HashManagerMock } from "../mocks/services/HashManagerMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { ProductDatabaseMock } from "../mocks/ProductDatabaseMock"
import { IGetProductsInputDTO } from "../../src/models/Products"

describe("Testing ProductsBusiness", () => {
    const productsBusiness = new ProductBusiness(
        new ProductDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
    )

    test("Get products by search successfully", async () => {

        const input: IGetProductsInputDTO = {
            search: "curto"
        }

        const response = await productsBusiness.getProducts(input)

        expect(response.products.length).toEqual(2)
        expect(response.products[0].getId()).toEqual("8310")
        expect(response.products[0].getName()).toEqual("VESTIDO CURTO PONTO ROMA MANGA")
    })

}) 