import Cpf from "../../src/Domain/Entity/Cpf";

it("should thrown an error if cpf has less than 11 digits", () => {
    const cpf = '1234567890';
    expect(() => new Cpf(cpf)).toThrowError(new Error("Cpf inválido"));
})

it("should thrown an error if cpf has more than 14 digits", () => {
    const cpf = '11111111111111';
    expect(() => new Cpf(cpf)).toThrowError(new Error("Cpf inválido"));
})

it("should thrown an error if cpf is wrong formatted", () => {
    const cpf = '123.456-789-01';
    expect(() => new Cpf(cpf)).toThrowError(new Error("Cpf inválido"));
})

it("should create cpf with success", () => {
    const validCpf = '641.659.280-03';
    const cpfInstance = new Cpf(validCpf)

    expect(cpfInstance.toString()).toEqual(validCpf)
})
