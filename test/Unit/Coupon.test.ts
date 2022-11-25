import Coupon from "../../src/Domain/Entity/Coupon";

it("should create a coupon successfully", () => {
   new Coupon('20PILA', 20, new Date())
});

it("should Not to apply discount if coupon is expired", () => {
   const expiration = new Date("2022-04-29");
   const coupon = new Coupon('20PILA', 20, expiration);

   expect(coupon.isExpired(new Date("2022-04-30"))).toBeTruthy()
})
