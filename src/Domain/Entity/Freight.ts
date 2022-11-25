import Item from "./Item";

export default class Freight {
    private total: number = 0;
    private DISTANCE = 1000;
    private FACTOR = 100;
    private MIN_FREIGHT_VALUE = 10;

    addItem(item: Item, quantity: number) {
        const freight = item.getVolume() * this.DISTANCE * (item.getDensity() / this.FACTOR);
        this.total += freight * quantity;
    }

    public getTotal(): number {
        return this.total > 0 && this.total < this.MIN_FREIGHT_VALUE
            ? this.MIN_FREIGHT_VALUE
            : this.total
    }
}
