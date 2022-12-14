import { Product_data } from "../models/Product";
import { User_data } from "../models/User";

export const users: User_data[] = [
    {   
        email: "astrodev@gmail.com",
        password: "bananinha"
    },
    {
        email: "fulano@gmail.com",
        password: "qwerty00"
    },
    {
        email: "ciclana@gmail.com",
        password: "asdfg123"
    }
]

export const products: Product_data[] = [
    {
        name: "Webcam",
        price: 99.00
    },
    {
        name: "Teclado Gamer",
        price: 250.00
    },
    {
        name: "Monitor",
        price: 459.99
    },
    {
        name: "Impressora",
        price: 275.25
    },
    {
        name: "Mouse Gamer",
        price: 399.99
    }
]
