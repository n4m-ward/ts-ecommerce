import OrderRepository from "../../../Domain/Repository/OrderRepository";
import Order from "../../../Domain/Entity/Order";

export default class OrderRepositoryMemory implements OrderRepository {
    orders: Order[]

    constructor() {
        this.orders = [];
    }

    save(order: Order): Promise<void> {
        this.orders.push(order);
        return Promise.resolve(undefined);
    }

    async count(): Promise<number> {
        return this.orders.length;
    }

}
