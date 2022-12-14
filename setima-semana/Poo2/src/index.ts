import { ping } from './endpoints/ping'
import { createUser } from './endpoints/createUser'
import { getUsers } from './endpoints/getUsers'
import { createProduct } from './endpoints/createProduct'
import { getProducts } from './endpoints/getProducts'
import { Estudante } from './class/Estudante'
import app from './app';
import { Pessoa } from './class/Pessoa'

const estudante1 = new Estudante(`001`,`José Morcelli`, `josebarros@gmail.com`, new Date(`2022-02-02`),`JBL`,[`estudar`,`escutar música`]);

Pessoa.saudacao(`Paula`)
Estudante.saudacao(`Byruleibe`)
console.log(estudante1.getNome());

console.log(Estudante.soma(2,3));

estudante1.correr()
estudante1.reflexao()

app.get("/ping", ping)

// Exercício 1 - Create users
app.post("/users", createUser)

// Exercício 2 - Get users
app.get("/users", getUsers)

// Exercício 3 - Create product
app.post("/products", createProduct)

// Exercício 4 - Get products
app.get("/products", getProducts)































// const carro1=new Carro("Gol","vermelho");

// const carro2=new Carro("FUSCA","AMARELO");
// const carro3=new Carro("FUSCA");

// carro1.setMarca("Ferrari")
// console.log(carro1.getMarca());

// carro1.frear();

// // console.log("saida: ");

// // carro1.frear();
// // carro2.frear();
// // carro3.frear();













