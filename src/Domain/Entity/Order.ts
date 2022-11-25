import Cpf from "./Cpf";
import Coupon from "./Coupon";
import Item from "./Item";
import OrderItem from "./OrderItem";
import Freight from "./Freight";
import OrderCode from "./OrderCode";
import OrderCoupon from "./OrderCoupon";

export default class Order {
    orderList: OrderItem[] = [];
    readonly freight: Freight = new Freight();
    coupon: OrderCoupon | null = null;
    readonly cpf: Cpf;
    readonly code: OrderCode;

    constructor(
        cpf: string,
        readonly date: Date = new Date(),
        readonly sequence: number = 1
    ) {
        this.cpf = new Cpf(cpf);
        this.code = new OrderCode(date, sequence);
    }

    addItem(item: Item, quantity: number) {
        this.freight.addItem(item, quantity);
        this.orderList.push(new OrderItem(item.id, item.price, quantity))
    }
    addCoupon(coupon: Coupon) {
        if (!coupon.isExpired(this.date)) {
            this.coupon = new OrderCoupon(coupon.name, coupon.percentage);
        }
    }

    getTotalValue(): number {
        let totalValue = this.orderList.reduce((total: number, orderItem: OrderItem) => {
            total += orderItem.getTotal()
            return total;
        }, 0);

        if (this.coupon) {
            totalValue -= this.coupon.calculateDiscount(totalValue)
        }
        totalValue += this.freight.getTotal()

        return totalValue
    }

    getOrderList(): OrderItem[] {
        return this.orderList
    }
}
