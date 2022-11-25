import ItemRepository from "../Domain/Repository/ItemRepository";
import Freight from "../Domain/Entity/Freight";

export default class SimulateFreight {
    constructor(readonly itemRepository: ItemRepository) {
    }

    async execute(input: Input): Promise<Output> {
        const freight = new Freight();
        for(const orderItem of input.orderItems) {
            const item = await this.itemRepository.getItem(orderItem.idItem);
            freight.addItem(item, orderItem.quantity);
        }

        return {
            total: freight.getTotal()
        }
    }
}

type Output = {
    total: number
}

type Input = {
    orderItems: OrderItems[]
}

type OrderItems = {
    idItem: number,
    quantity: number
}
