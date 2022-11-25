import ItemRepositoryMemory from "../../src/Infra/Repository/Memory/ItemRepositoryMemory";
import Item from "../../src/Domain/Entity/Item";
import Dimensions from "../../src/Domain/Entity/Dimensions";
import GetItems from "../../src/Application/GetItems";

it("should get all items", async () => {
    const itemRepository = new ItemRepositoryMemory();
    await itemRepository.save(new Item(1, 'Guitarra', 1000, new Dimensions(100, 30, 10), 3))
    await itemRepository.save(new Item(2, 'Amplificador', 5000, new Dimensions(50, 50, 50), 20))
    await itemRepository.save(new Item(3, 'Cabo', 30, new Dimensions(10, 10, 10), 1))

    const getItems = new GetItems(itemRepository);
    const result = await getItems.execute();

    expect(result).toHaveLength(3)
})
