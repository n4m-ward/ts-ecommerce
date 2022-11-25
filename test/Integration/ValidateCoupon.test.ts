import CouponRepositoryMemory from "../../src/Infra/Repository/Memory/CouponRepositoryMemory";
import Coupon from "../../src/Domain/Entity/Coupon";
import ValidateCoupon from "../../src/Application/ValidateCoupon";

it("should validate an expired coupon", async () => {
    const code = 'VALE20'
    const couponRepository = new CouponRepositoryMemory();
    await couponRepository.save(new Coupon(code, 20, new Date("2022-04-30")))
    const validateCoupon = new ValidateCoupon(couponRepository);
    const output = await validateCoupon.execute({code, date: new Date("2023-04-30")});
    expect(output.isExpired).toBeTruthy();
})

it("should validate a valid coupon", async () => {
    const code = '20PILA'
    const couponRepository = new CouponRepositoryMemory();
    await couponRepository.save(new Coupon(code, 20, new Date("2023-04-30")))
    const validateCoupon = new ValidateCoupon(couponRepository);
    const output = await validateCoupon.execute({code, date: new Date("2022-04-30")});
    expect(output.isExpired).toBeFalsy();
})
