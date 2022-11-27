import PlaceOrder from "../../src/Application/PlaceOrder";
import ItemRepositoryMemory from "../../src/Infra/Repository/Memory/ItemRepositoryMemory";
import Item from "../../src/Domain/Entity/Item";
import Dimensions from "../../src/Domain/Entity/Dimensions";
import OrderRepositoryMemory from "../../src/Infra/Repository/Memory/OrderRepositoryMemory";
import CouponRepositoryMemory from "../../src/Infra/Repository/Memory/CouponRepositoryMemory";
import Coupon from "../../src/Domain/Entity/Coupon";
import OrderRepositoryDatabase from "../../src/Infra/Repository/Database/OrderRepositoryDatabase";
import PgPromiseConnectionAdapter from "../../src/Infra/Database/PgPromiseConnectionAdapter";

it("should create an order", async () => {
    const itemRepository = new ItemRepositoryMemory();
    const connection = new PgPromiseConnectionAdapter();
    const orderRepository = new OrderRepositoryDatabase(connection);
    const couponRepository = new CouponRepositoryMemory();

    const item1 = new Item(1, 'Guitarra', 1000, new Dimensions(100, 30, 10), 3)
    const item2 = new Item(2, 'Amplificador', 5000, new Dimensions(50, 50, 50), 20)
    const item3 = new Item(3, 'Cabo', 30, new Dimensions(10, 10, 10), 1)
    await itemRepository.save(item1);
    await itemRepository.save(item2);
    await itemRepository.save(item3);

    const input = {
        cpf: '641.659.280-03',
        orderItems: [
            {idItem: item1.id, quantity: 1},
            {idItem: item2.id, quantity: 1},
            {idItem: item3.id, quantity: 3},
        ],
        date: new Date('2022-04-30')
    }
    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
    const result = await placeOrder.execute(input);

    expect(result.total).toBe(6350)
    expect(result.code).toBe('202200000001');
})

it("should create an order with discount coupon", async () => {
    const itemRepository = new ItemRepositoryMemory();
    const orderRepository = new OrderRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory();

    const item1 = new Item(1, 'Guitarra', 1000, new Dimensions(100, 30, 10), 3)
    const item2 = new Item(2, 'Amplificador', 5000, new Dimensions(50, 50, 50), 20)
    const item3 = new Item(3, 'Cabo', 30, new Dimensions(10, 10, 10), 1)
    await itemRepository.save(item1);
    await itemRepository.save(item2);
    await itemRepository.save(item3);
    await couponRepository.save(new Coupon("VALE20", 20))

    const input = {
        cpf: '641.659.280-03',
        orderItems: [
            {idItem: item1.id, quantity: 1},
            {idItem: item2.id, quantity: 1},
            {idItem: item3.id, quantity: 3},
        ],
        date: new Date('2022-04-30'),
        coupon: "VALE20"
    }
    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
    const result = await placeOrder.execute(input);

    expect(result.total).toBe(5132)
    expect(result.code).toBe('202200000001');
})
