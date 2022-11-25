import Order from "../Entity/Order";

export default interface OrderRepository {
    save(order: Order): Promise<void>;
    count(): Promise<number>;
}
