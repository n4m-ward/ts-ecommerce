import Item from "../Entity/Item";

export default interface ItemRepository {
    getItem(idItem: number): Promise<Item>;
    save(item: Item): Promise<void>;
    list(): Promise<Item[]>;
}
