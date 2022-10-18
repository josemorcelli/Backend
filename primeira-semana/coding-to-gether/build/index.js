"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
function buscarCarrosPorMarca(frota, marca) {
    if (marca === undefined) {
        return frota;
    }
    return frota.filter((carro) => {
        return carro.marca === marca;
    });
}
console.table(buscarCarrosPorMarca(data_1.carros));
console.table(buscarCarrosPorMarca(data_1.carros, "tradicional"));
//# sourceMappingURL=index.js.map