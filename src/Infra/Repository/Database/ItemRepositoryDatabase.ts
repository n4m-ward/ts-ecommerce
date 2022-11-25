import ItemRepository from "../../../Domain/Repository/ItemRepository";
import Connection from "../../Database/Connection";
import Item from "../../../Domain/Entity/Item";

export default class ItemRepositoryDatabase implements ItemRepository {

    constructor(readonly connection: Connection) {
    }

    async getItem(idItem: number): Promise<Item> {
        const [itemData] = await this.connection.query("select * from item where id_item = ?", [idItem]);
        return new Item(itemData.id_item, itemData.description, parseFloat(itemData.price))
    }

    async list(): Promise<Item[]> {
        const itemsData = await this.connection.query("select * from item limit 50;");
        const items: Item[] = []
        for(const itemData of itemsData) {
            items.push(new Item(itemData.id_item, itemData.description, parseFloat(itemData.price)))
        }

        return items;
    }

    async save(item: Item): Promise<void> {
        await this.connection.query(
            "insert into items(description, price) values(?, ?);",
            [item.description, item.price]
        )
    }

}
