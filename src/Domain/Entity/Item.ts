import Dimensions from "./Dimensions";

export default class Item {

    constructor(
        readonly id: number,
        readonly description: string,
        readonly price: number,
        readonly dimensions?: Dimensions,
        readonly weight?: number
    ) {
    }

    getVolume(): number {
        if (this.dimensions) {
            return this.dimensions.getVolume()
        }

        return 0;
    }

    getDensity() {
        if(this.dimensions && this.weight) {
            return this.weight / this.dimensions.getVolume()
        }

        return 0;
    }
}
