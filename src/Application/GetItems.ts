import ItemRepository from "../Domain/Repository/ItemRepository";

export default class GetItems {
    constructor(readonly itemRepository: ItemRepository) {
    }

    async execute(): Promise<Output[]> {
        const output: Output[] = [];
        const items = await this.itemRepository.list();

        for (const item of items) {
            output.push({
                idItem: item.id,
                description: item.description,
                price: item.price
            });
        }

        return output;
    }
}

type Output = {
    idItem: number,
    description: string,
    price: number
}
