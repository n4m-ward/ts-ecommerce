import ItemRepositoryMemory from "../../src/Infra/Repository/Memory/ItemRepositoryMemory";
import Item from "../../src/Domain/Entity/Item";
import Dimensions from "../../src/Domain/Entity/Dimensions";
import SimulateFreight from "../../src/Application/SimulateFreight";

it("should simulate freight", async () => {
   const itemRepository = new ItemRepositoryMemory();
   await itemRepository.save(new Item(1, 'Guitarra', 1000, new Dimensions(100, 30, 10), 3))
   await itemRepository.save(new Item(2, 'Amplificador', 5000, new Dimensions(50, 50, 50), 20))
   await itemRepository.save(new Item(3, 'Cabo', 30, new Dimensions(10, 10, 10), 1))
   const input = {
      orderItems: [
         {idItem: 1, quantity: 1},
         {idItem: 2, quantity: 1},
         {idItem: 3, quantity: 3},
      ]
   }
   const simulateFreight = new SimulateFreight(itemRepository);
   const output = await simulateFreight.execute(input);
   expect(output.total).toBe(260)
});
