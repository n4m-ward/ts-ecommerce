export default class Coupon {

    readonly name: string;
    public readonly percentage: number;
    private readonly expiration: Date;

    constructor(name: string, percentage: number, expiration: Date = new Date()) {
        this.name = name
        this.percentage = percentage
        this.expiration = expiration
    }

    isExpired(today: Date): boolean {
        return this.expiration.getTime() < today.getTime()
    }
}
