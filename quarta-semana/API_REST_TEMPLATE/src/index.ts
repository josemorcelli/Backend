import express,{Request,Response} from 'express'
import {users} from './data'
import cors from 'cors'
import { User} from './types'

//------- CONFIG. INICIAIS EXPRESS ----------

const app = express()
app.use(express.json())
app.use(cors())


//--------------------ENDPOINT 1 --------------------

app.get('/user',(req:Request,res:Response)=>{
   let errorCode = 400
    try {
        // pegar via query

        const userName = req.query.name as string

        // fazer verificação se recebe o dado

        if(!userName){
            errorCode = 422
            throw new Error("Falta passar o nome como parametro")
        }

        //procurar no banco de dados se existe

        const userSearched = users.find((user) =>{
            return user.name.toLowerCase() === userName.toLowerCase()
        })

        // verificar se o dado é o mesmo que queremos

        if(!userSearched){
            errorCode = 404
            throw new Error("Usuário não foi encontrado")
        }

        //informar o resultado recebido

        res.status(200).send(userSearched)
         
    } catch (error:any) {

        // colocar o status code de acordo com a tabela mandar uma mensagem de erro clara
        res.status(errorCode).send(error.message) 
    }

})

//--------------------ENDPOINT 2 --------------------

app.get('/users/:id',(req:Request, res:Response)=>{

    let errorCode = 422

    try {
        const userId = Number(req.params.id)
        if(isNaN(userId)){
            errorCode = 422
            throw new Error("Falta passar o id  como número no parametro buscado")
        }

        const userSearchedById = users.find((user) =>{
            return user.id === userId
        })

        if(!userSearchedById){
            errorCode = 404
            throw new Error("Id de usuário nao encontrado no banco")
        }

        res.status(200).send(userSearchedById)
        
    } catch (error:any) {
        res.status(errorCode).send(error.message)
    }

}) 

//--------------------ENDPOINT 3 --------------------

app.post('/users',(req:Request,res:Response)=>{
let errorCode = 400
    try {

        //pegar dados via body
     const {name, email, type, age} = req.body

        // verificar se passou os dados
     if(!name || !email || !type || !age){
        errorCode = 422
        throw new Error("Falta passar parametros, nome, email, tipo e idade");
     
     }

        // verificar se o tipo é valido (ADMIN/NORMAL)
     if(type.toUpperCase()!== 'ADMIN' && type.toUpperCase()!== 'NORMAL'){
        errorCode = 402
        throw new Error("Tipo de usuário inválido,insira um valido 'ADMIN' ou 'NORMAL'.");
     }

        // atualizar os dados com os dados enviados
        const newUser : User ={
            id: Math.random(),
            name: name,
            email: email,
            type: type,
            age: age
        }

        //atualizar com o push
        users.push(newUser)
        res.status(201).send(users)

        //mostrar erro especifico e a mensagem

    } catch (error:any) {
        res.status(errorCode).send(error.message)
    }
})

//--------------------ENDPOINT 4 --------------------

app.patch('/users/:id',(req:Request, res:Response)=>{
   let errorCode = 400
    try {

        //pegar dados via parametros

        let userId = Number (req.params.id)
        let {name, email}= req.body

        //verificar se o dado foi passado no parametro

        if(!name || !email){
            errorCode = 422
            throw new Error("Você deve passar os parametros a serem atualizados")
        }

        //verificar se existe no banco

        const userExists = users.find((user) =>{
            return user.id === userId
        })
        
        //se nao existir joga erro usuario

        if(!userExists){
            errorCode = 404
            throw new Error("Usuário não foi encontrado no banco de dados")
        }
        //percorrer a base e fazer a atualização no usuario desejado

        for(let user of users){
            if(userId === user.id){
                user.name = name
                user.email = email
        }
    }


        // dar a resposta do erro
    res.status(201).send(users)    
        
    } catch (error:any) {
        res.status(errorCode).send(error.message)
    }
})


//------- CONFIG. INICIAIS EXPRESS PORTA ----------

app.listen(3003,()=>{
    console.log('Servidor rodando na porta 3003')
})