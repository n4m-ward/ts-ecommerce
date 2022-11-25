import OrderCode from "../../src/Domain/Entity/OrderCode";

it("should generate new code using pattern AAAAPPPPPPPP", () => {
    const orderCode = new OrderCode(new Date("2022-04-30T10:00:00"), 1);
    expect(orderCode.value).toEqual('202200000001');
})
