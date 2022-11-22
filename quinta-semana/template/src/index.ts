import connection from './dataBase/connection'
import  express, { Request, Response} from 'express'

import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

/*app.post("/actor", async (req:Request, res:Response) : Promise<void> => {
    try {
        await connection.raw(``)
    }
})*/
// ---------- Retorna todos asinformações dos User ou algum de acordo com o id se passdo --------- 

app.get("/users",async (req:Request, res:Response) : Promise<void> => {
    const id = req.query.id;
    let result;
    try{
        if(id){
          result = await connection.raw(
                `SELECT * FROM Users 
                 WHERE id = ${id} `
            )
        }else {
            result = await connection.raw(
                `SELECT * FROM Users `
            )
        }
          res.status(200).send(result[0])  
    }catch (error : any) {
            console.log(error.message);
            
        }
    }
)

// -------------------ADD Products -------------

app.post("/products",async (req:Request, res:Response) : Promise<void> => {

    const {nome,price,fk_provider} = req.body

    try{
        
        // se dados do produto faltando
        if (!nome){
            //cofigurando erro
            const erro=new Error("O nome do produto informado!");
            erro.name="dataProductNotFound";
            //lanço erro
            throw erro;
        }
        if (!price){
            //cofigurando erro
            const erro=new Error("O preço do produto não foi informado!");
            erro.name="dataProductNotFound";
            //lanço erro
            throw erro;
        }
        if (!fk_provider){
            //cofigurando erro
            const erro=new Error("Id do fornecedotr não informado não foi informada!");
            erro.name="dataProductNotFound";
            //lanço erro
            throw erro;
        }

        await connection.raw(
            `   INSERT INTO Products (nome,price,fk_provider) 
                VALUES ("${nome}",${price},${fk_provider})`
        )

        res.status(201).send("Produto adicionado com êxito!")
    }catch(e:any){
        switch(e.name){
            case "AuthotizationError":
                res.status(401).send(e.message);
                break;
            case "dataProductNotFound":
                res.status(422).send(e.message);
                break;
            case "playlistNotFound":
                res.status(404).send(e.message);
                break;
            case "tracAreadyExist":
                res.status(409).send(e.message);
                break;
            default:
                res.status(500).send(e.message);
        
        }
    }
})
// -------------------modificar o preco do produto-------------

app.put("/products/price:id",async (req:Request, res:Response) : Promise<void> => {
    const productId=req.query.id
    const {price} = req.body
    try{
        //id não informado
        if (!productId){
                //cofigurando erro
                const erro=new Error("O id do produto não informado!");
                erro.name="idProductNotFound";
                //lanço erro
                throw erro;
            }
        
        // se dados do produto faltando
    
        if (!price){
            //cofigurando erro
            const erro=new Error("O preço do produto não foi informado!");
            erro.name="dataProductNotFound";
            //lanço erro
            throw erro;
        }
        await connection.raw(
            `UPDATE Products 
             SET price = (${price})
             WHERE id = ${productId}`
            )

            /*  */

        res.status(201).send("Produto modificado com êxito!")
    }catch(e:any){
        switch(e.name){
            case "idProductNotFound":
                res.status(401).send(e.message);
                break;
            case "dataProductNotFound":
                res.status(422).send(e.message);
                break;
            default:
                res.status(500).send(e.message);
        
        }
    }
})

// add user

app.post("/users/new",async (req:Request, res:Response) : Promise<void> => {
    const {nome,cpf,birthdate,fk_account} = req.body
    await connection("Users").insert(
    

        [{
            nome:nome,
            cpf:cpf,
            birthdate:birthdate,
            fk_account:fk_account
        }]
         
    
    )
})




// -------------------PORTA PARA VERIFICAR O SERVIDOR-------------

app.listen(3003,()=>{
    console.log('Servidor executando na porta 3003')
})