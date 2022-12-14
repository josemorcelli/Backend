import { ping } from './endpoints/ping'
import { createUser } from './endpoints/createUser'
import { getUsers } from './endpoints/getUsers'
import { createProduct } from './endpoints/createProduct'
import { getProducts } from './endpoints/getProducts'

import app from './app';
import { Carro } from './class/Carros'

app.get("/ping", ping)

// Exercício 1 - Create users
app.post("/users", createUser)

// Exercício 2 - Get users
app.get("/users", getUsers)

// Exercício 3 - Create product
app.post("/products", createProduct)

// Exercício 4 - Get products
app.get("/products", getProducts)

//------------------------------------------------------------------------------------------------

const carro1 = new Carro("Gol","preto");
const carro2 = new Carro("Fusca","azul");
const carro3 = new Carro("Fiat","Branco");
//carro1.acelerar();
//carro2.frear();
//carro3.acelerar();

carro1.setMarca("Ferrari")
console.log(carro1.getMarca());
