import ItemRepository from "../../../Domain/Repository/ItemRepository";
import Item from "../../../Domain/Entity/Item";

export default class ItemRepositoryMemory implements ItemRepository{
    items: Item[];

    constructor() {
        this.items = []
    }

    getItem(idItem: number): Promise<Item> {
        const item =  this.items.find(item => item.id === idItem);
        if (!item) throw new Error("item not found");

        return Promise.resolve(item);
    }

    save(item: Item): Promise<void> {
        this.items.push(item);
        return Promise.resolve(undefined);
    }

    list(): Promise<Item[]> {
        return Promise.resolve(this.items);
    }

}
