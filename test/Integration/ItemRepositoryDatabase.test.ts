import PgPromiseConnectionAdapter from "../../src/Infra/Database/PgPromiseConnectionAdapter";
import ItemRepositoryDatabase from "../../src/Infra/Repository/Database/ItemRepositoryDatabase";
import Item from "../../src/Domain/Entity/Item";
import Dimensions from "../../src/Domain/Entity/Dimensions";

it.skip("should return items from database", async () => {
    const connection = new PgPromiseConnectionAdapter();
    const itemRepository = new ItemRepositoryDatabase(connection);

    await itemRepository.save(new Item(1, 'Guitarra', 1000, new Dimensions(100, 30, 10), 3));
    await itemRepository.save(new Item(2, 'Amplificador', 5000, new Dimensions(50, 50, 50), 20));
    await itemRepository.save(new Item(3, 'Cabo', 30, new Dimensions(10, 10, 10), 1));

    const items = await itemRepository.list();
    expect(items).toHaveLength(3);
})
