import connection from "./connection"
import { products, users } from "./data"
const createTables = async () => {
    await connection.raw(`
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS Labe_Products, Labe_Users;

CREATE TABLE IF NOT EXISTS Labe_Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Labe_Products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(6,2) NOT NULL
    );
SET FOREIGN_KEY_CHECKS=1;
`)
    .then(() => {
        console.log(`Tables created successfully!`)
        insertData()
    })
    .catch((error: any) => printError(error))
}

const insertData = async () => {
    try {
        await connection("Labe_Users")
            .insert(users)
            .then(() => console.log(`"Labe_Users populated!`))
            .catch((error: any) => printError(error))

        await connection("Labe_Products")
            .insert(products)
            .then(() => console.log(`"Labe_Products populated!`))
            .catch((error: any) => printError(error))

    } catch (error: any) {
        console.log(error.sqlMessage || error.message)
    } finally {
        console.log("Ending connection!")

        return connection.destroy()
    }
}

const printError = (error: any) => {
    console.log(error.sqlMessage || error.message)
}

createTables()