import CouponRepository from "../../../Domain/Repository/CouponRepository";
import Coupon from "../../../Domain/Entity/Coupon";

export default class CouponRepositoryMemory implements CouponRepository {
    private coupons: Coupon[] = [];

    async get(code: string): Promise<Coupon> {
        const coupon = this.coupons.find(coupon => coupon.name === code);
        if(!coupon) {
            throw new Error('Coupon Not Found')
        }

        return coupon;
    }

    async save(coupon: Coupon): Promise<void> {
        this.coupons.push(coupon);
    }

}
