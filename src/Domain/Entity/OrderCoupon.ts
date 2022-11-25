export default class OrderCoupon {
    constructor(readonly code: string, readonly percentage: number) {
    }

    calculateDiscount(price: number) {
        return (price / 100) * this.percentage
    }
}
