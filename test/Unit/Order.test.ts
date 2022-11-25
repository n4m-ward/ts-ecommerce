import Order from "../../src/Domain/Entity/Order";
import Item from "../../src/Domain/Entity/Item";
import Coupon from "../../src/Domain/Entity/Coupon";
import Dimensions from "../../src/Domain/Entity/Dimensions";

it('should create a cart with empty order list success', () => {
    const cart = new Order('218.585.200-02');

    expect(cart.getOrderList()).toEqual([])
})

it('method getTotalValue should return price of all purchases sum', () => {
    const cart = new Order('218.585.200-02');
    cart.addItem(new Item(1, 'foo', 20), 1)
    cart.addItem(new Item(2, 'foo', 20), 1)
    cart.addItem(new Item(3, 'foo', 20), 1)

    expect(cart.getTotalValue()).toEqual(60)
})

it('method getTotalValue should apply coupon discount in single product', () => {
    const couponDiscountInPercentage = 20
    const date = new Date();
    const coupon = new Coupon('foo', couponDiscountInPercentage, date);
    const cart = new Order('218.585.200-02', date);
    cart.addCoupon(coupon);
    cart.addItem(new Item(1, 'foo', 100), 1)

    expect(cart.getTotalValue()).toEqual(80)
})

it('method getTotalValue should apply cupom discount with multiple products', () => {
    const couponDiscountInPercentage = 20
    const coupon = new Coupon('foo', couponDiscountInPercentage, new Date());
    const cart = new Order('218.585.200-02');
    cart.addCoupon(coupon);

    cart.addItem(new Item(1, 'foo', 100), 1)
    cart.addItem(new Item(1, 'foo', 100), 1)

    expect(cart.getTotalValue()).toEqual(160)
})


it('method getTotalValue should apply not apply expired cupom', () => {
    const couponDiscountInPercentage = 20
    const coupon = new Coupon('foo', couponDiscountInPercentage, new Date("2022-04-29"));
    const order = new Order('218.585.200-02', new Date("2022-04-30"));
    order.addCoupon(coupon);
    order.addItem(new Item(1, 'foo', 100), 1)

    expect(order.getTotalValue()).toEqual(100)
})

it('should get total value with freight', () => {
    const order = new Order('218.585.200-02');

    order.addItem(new Item(1, 'Guitarra', 100, new Dimensions(100, 30, 10), 3), 1)
    order.addItem(new Item(1, 'Amplificador', 100, new Dimensions(50, 50, 50), 20), 1)
    order.addItem(new Item(1, 'Cabo', 100, new Dimensions(10, 10, 10), 1), 3)

    expect(order.getTotalValue()).toEqual(760)
})



it('should create an order and generate a code using the pattern AAAAPPPPPPPP', () => {
    const order = new Order('218.585.200-02', new Date('2022-04-30'));

    expect(order.code.value).toEqual('202200000001')
})
