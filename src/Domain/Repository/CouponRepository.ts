import Coupon from "../Entity/Coupon";

export default interface CouponRepository {
    get(code: string): Promise<Coupon>;
    save(coupon: Coupon): Promise<void>;
}
