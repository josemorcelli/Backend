import {carros,CarsModel} from "./data"

function buscarCarrosPorMarca(frota:CarsModel[], marca?:string):CarsModel[] {
    if (marca === undefined) {
        return frota
    }
    return frota.filter((carro: CarsModel) => {
            return carro.marca === marca
        }
    )
 }

 console.table(buscarCarrosPorMarca(carros))
 console.table(buscarCarrosPorMarca(carros,"tradicional"))

 