import Dimensions from "../../src/Domain/Entity/Dimensions";

it("should create dimensions", () => {
    const dimensions = new Dimensions(100, 30, 10);
    expect(dimensions.getVolume()).toEqual(0.03)
})
