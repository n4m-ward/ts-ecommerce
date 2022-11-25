import Order from "../Domain/Entity/Order";
import ItemRepository from "../Domain/Repository/ItemRepository";
import Item from "../Domain/Entity/Item";
import OrderRepository from "../Domain/Repository/OrderRepository";
import Coupon from "../Domain/Entity/Coupon";
import CouponRepository from "../Domain/Repository/CouponRepository";

export default class PlaceOrder {
    constructor(
        readonly itemRepository: ItemRepository,
        readonly orderRepository: OrderRepository,
        readonly couponRepository: CouponRepository
    ) {
    }

    async execute(input: Input): Promise<Output> {
        const sequence = await this.orderRepository.count() + 1
        const order = new Order(input.cpf, input.date, sequence);

        for(const orderItem of input.orderItems) {
            const item: Item = await this.itemRepository.getItem(orderItem.idItem);
            order.addItem(item, orderItem.quantity);
        }

        if(input.coupon) {
            const coupon: Coupon = await this.couponRepository.get(input.coupon);
            order.addCoupon(coupon);
        }

        await this.orderRepository.save(order)
        return {
            total: order.getTotalValue(),
            code: order.code.value
        }
    }
}

type Input = {
    cpf: string,
    orderItems: {idItem: number, quantity: number}[],
    coupon?: string,
    date?: Date
}


type Output = {
    total: number,
    code: string
}
