import Item from "../../src/Domain/Entity/Item";
import Freight from "../../src/Domain/Entity/Freight";
import Dimensions from "../../src/Domain/Entity/Dimensions";

it("should calculate the freight", () => {
    const freight  = new Freight();
    freight.addItem(new Item(1, 'Guitarra', 100, new Dimensions(100, 30, 10), 3), 1)
    freight.addItem(new Item(1, 'Amplificador', 100, new Dimensions(50, 50, 50), 20), 1)
    freight.addItem(new Item(1, 'Cabo', 30, new Dimensions(10, 10, 10), 1), 3)

    expect(freight.getTotal()).toBe(260)
})

it("should calculate the freight with minimum price", () => {
    const freight  = new Freight();
    freight.addItem(new Item(1, 'Cabo', 30, new Dimensions(10, 10, 10), 0.9), 1)

    expect(freight.getTotal()).toBe(10)
})
