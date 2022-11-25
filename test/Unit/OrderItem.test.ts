import OrderItem from "../../src/Domain/Entity/OrderItem";

it('should create a order with success', () => {
    const productPrice = 20.00;
    const productQuantity = 1;

    const order = new OrderItem(1, productPrice, productQuantity);

    expect(order.price).toEqual(productPrice)
    expect(order.quantity).toEqual(productQuantity)
});

it('should return price multiplied by the quantity', () => {
    const productPrice = 20.00;
    const productQuantity = 2;
    const expectedProductTotalPrice = productPrice * productQuantity

    const order = new OrderItem(1, productPrice, productQuantity)

    expect(order.getTotal()).toEqual(expectedProductTotalPrice)
})
