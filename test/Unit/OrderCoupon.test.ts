import OrderCoupon from "../../src/Domain/Entity/OrderCoupon";

it("should apply discount", () => {
   const coupon = new OrderCoupon('20PILA', 20);
   const value = 100;

   expect(coupon.calculateDiscount(value)).toEqual(20);
})
