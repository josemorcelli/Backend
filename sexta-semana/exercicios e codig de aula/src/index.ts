import  express, { Request, Response} from 'express'
import connection from './dataBase/connection'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

// ---------- Retorna todos asinformações dos User ou algum de acordo com o id se passdo --------- 

app.get("/users",async(req:Request, res:Response):Promise<void>=>{
    const id = req.query.id;
    let result;
    try{
        if (id){
            result=await connection.raw(
                `
                    SELECT * FROM Users
                    WHERE id=${id}
                `
            )
        }else{
            result=await connection.raw(
                `
                    SELECT * FROM Users
                `
            )
        }
        res.status(200).send(result[0])
    }catch(error:any){
        console.log(error.message);
        
    }

    }
)

// -------------------ADD Products -------------

app.post("/products",async(req :Request, res:Response):Promise<void>=>{

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
            `
            INSERT INTO Products (nome,price,fk_provider)
            VALUES ("${nome}",${price},${fk_provider})
            `
        )

        res.status(201).send("Produto adicionado com êxito!")
    }catch(e:any){
        switch(e.name){
           
            case "dataProductNotFound":
                res.status(422).send(e.message);
                break;
            default:
                res.status(500).send(e.message);
        
        }
    }
})
// -------------------Modificar o preço do Produto -------------

app.put("/products/price",async(req :Request, res:Response):Promise<void>=>{
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
        // await connection.raw(
        //     `UPDATE Products
        //      SET price=(${price}) 
        //      WHERE id=${productId}
        //     `
        // )
        await connection("Products").update(
            {
                price:price
            }
        ).where(
            {
                id:productId
            }
        )

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


//add uSER
app.post("/users",async(req :Request, res:Response):Promise<void>=>{
    const {nome,cpf,birth_date,fk_account}=req.body;
    try{
        await connection.insert(
            [{  nome:nome,
                cpf:cpf,
                birth_date:birth_date,
                fk_account:fk_account
            }]
        ).into("Users")
        res.send("Deus certo!"); 
    }catch(error){
        console.log(error);
        
    }
})

//anome de user e produc
app.get("/users/products",async(req:Request, res:Response):Promise<void>=>{
    try{
        //o E3RRO ESTAVA APENAS NA CONTRUÇÃO DO JSON ELE ESTAVA USANDO A MESMA CHAVE "nome", PARA CORRIGIR BASTA USAR UM APELIDO COLOCANDO O 'as'
         const result=await connection.raw(
            `
                SELECT Users.nome as u_name, Products.nome FROM Users
                JOIN Compras 
                ON Users.id=Compras.fk_user
                JOIN Products
                ON Compras.fk_product=Products.id 
                ORDER BY Compras.compra_date
            ` 
         )
                
        res.status(200).send(result)
    }catch(error:any){
        console.log(error.message);
        
    }

    }
)

// -------------------PORTA PARA VERIFICAR O SERVIDOR-------------

app.listen(3003,()=>{
    console.log('Servidor executando na porta 3003')
})

