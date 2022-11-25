import OrderRepository from "../../../Domain/Repository/OrderRepository";
import Order from "../../../Domain/Entity/Order";
import Connection from "../../Database/Connection";

export default class OrderRepositoryDatabase implements OrderRepository {

    constructor(readonly connection: Connection) {
    }

    async count(): Promise<number> {
        const [row] = await this.connection.query('select count(*)::int from "order"');
        return row;
    }

    async save(order: Order): Promise<void> {
        const [orderData] = await this.connection.query(
            `
                insert into "order"(code, cpf, issue_date, freight, sequence, total, coupon)
                values ($1, $2, $3, $4, $5, $6, $7)
                returning *
            `,
            [
                order.code.value,
                order.cpf.toString(),
                order.date,
                order.freight.getTotal(),
                order.sequence,
                order.getTotalValue(),
                order.coupon?.code
            ]);

        for(const orderItem of order.orderList) {
            await this.connection.query(
                `
                    insert into order_item(id_order, id_item, price, quantity)
                    values ($1, $2, $3, $4)`,
                [
                    orderData.id_order,
                    orderItem.idItem,
                    orderItem.getTotal(),
                    orderItem.quantity
                ]
            )
        }
    }

}
