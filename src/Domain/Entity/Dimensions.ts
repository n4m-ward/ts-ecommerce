export default class Dimensions {
    constructor(
        readonly width: number,
        readonly height: number,
        readonly length: number,
    ) {
    }

    getVolume(): number {
        return (this.width / 100) * (this.height / 100) * (this.length / 100);
    }
}
