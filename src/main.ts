import GetItems from "./Application/GetItems";
import ExpressAdapter from "./Infra/Http/ExpressAdapter";
import ItemRepositoryDatabase from "./Infra/Repository/Database/ItemRepositoryDatabase";
import PgPromiseConnectionAdapter from "./Infra/Database/PgPromiseConnectionAdapter";
const http = new ExpressAdapter();

const connection = new PgPromiseConnectionAdapter();
const itemRepository = new ItemRepositoryDatabase(connection);

http.on("get", "/items", async (params: any, body: any) => {
    const getItems = new GetItems(itemRepository);
    return await getItems.execute();
});



http.listen(3000);

