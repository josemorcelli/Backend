import { users } from './data';
import  express, { Request, response, Response} from 'express'

import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())




// ---------- EXPLICAÇÃO EXPRESS --------- 

// app => variável do express ätivacao"
// ger => metodo http (get/ post delete) 
// "/teste/:id" => caminho para fazer a nossa requisiçao 
//  o que tiver dentro da callback => o que vc quer que faca ao bater no endpoint 
// res.status(201) => status code do gatinho 
// send('Deu bom') => Resposta que  a  gente dá para o nosso cliente 

app.get("/teste/:id",(req:Request, res:Response)=>{
 // o que a gente quer que aconteca quando bater no nosso caminho 
 const id = req.params.id
 const password = req.headers.password

 console.log(id, password)
 // Resposta que será retornada da nossa requisiçao
 res.status(201).send('Deu bom')
})

// ----------- GET ALL PLAYLIST ----------

app.get("/playlist",(req:Request, res:Response)=>{
    //o que eu vou fazer
    const playlists = users.map((user)=>{
        return user.playlists
    })
    res.status(200).send(playlists)
})

//------------ GET PLAYLIST TRACKS --------

app.get("/playlists/tracks",(req:Request, res:Response)=>{
// o que vc quer que aconteca quando bater no caminho
    //console.log("bananinha")
    const playlistId = req.query.idPlaylist 
    const userId = req.headers.iduser

    // Verificar se foram passados, se não retorna o erro
    if(!playlistId && !userId){
        res.status(400).send("Colocar obrigatoriament um id")
    }
    
    // Procurar o usuário no banco de dados no id, caso não ache retornará 
    // indefinido, caso ache retorna o usuário 

    const userFiltered = users.find((user)=>{
        return user.id === userId
    })
    
    // Variável que receberá a playlisyt filtrada 
    let playlistFiltered 

   
   
    // if(userFiltered) => verifica se o usuário foi encontrado

    if(userFiltered){
        // Usuário sendo encontrado, vamos procurar a playlist condizente 
        // com o id informado via parametro
        playlistFiltered = userFiltered.playlists.find((playlist)=>{
            return playlist.id === playlistId
        })
        // Se não encontra o usuário, informa para o cliente que não há 
        // usuário com id informado
    }else{
        res.status(200).send("Não há um usuário com o id informado")
    }

    // if(playlistFiltered ) => TEsta se achou a playlist procurada
    if(playlistFiltered ){

        // Caso a playlist seja encontrada,retorna todas as faixas da playlist
       const allTracks = playlistFiltered.tracks
        res.status(200).send(allTracks)
    }else{
        // Se não encontrada, informa que a não há uma playlist com id informado
        res.status(200).send("Não há um playlist com o id informado")
    }  
    
    // Os dois ifs, são verificações dos parametros passados na requisição (headers/ query)

})

//------------ DELETE PLAYLIST ------------

    // 1. busca o usuario 
    // 2. Testa se o usuario foi encontrado 
    // 3.busca playlist dentro do usuario do item dois 
    // 4. Testa se a playlist do item 3 foi encotrado
    // 5. Se a playlist foi encontrada, será retirada da lista de playlist
    // 6. Retorna uma lista de playlists com o id diferente do que foi passado 

app.delete("/playlists/playlist",(req:Request, res:Response)=>{
    // o que vc quer que aconteca quando bater no caminho

        const playlistId = req.query.idPlaylist 
        const userId = req.headers.iduser
    
        // Verificar se foram passados, se não retorna o erro
        if(!playlistId && !userId){
            res.status(400).send("Colocar obrigatoriament um id")
        }
        
        // Procurar o usuário no banco de dados no id, caso não ache retornará 
        // indefinido, caso ache retorna o usuário 
    
        const userFiltered = users.find((user)=>{
            return user.id === userId
        })
        
        // Variável que receberá a playlisyt atual, sem a playlist apagada
        let playlistsActual
    
       
       
        // if(userFiltered) => verifica se o usuário foi encontrado
    
        if(userFiltered){
            // Usuário sendo encontrado, vamos procurar a playlist diferente
            // do id informado via parametro, pois esse será deletado
            playlistsActual = userFiltered.playlists.filter((playlist)=>{
                return playlist.id !== playlistId
            })
            // Atualiza a lista de playlists mantendo apenas as playlists não deletadas
            userFiltered.playlists = playlistsActual
            res.status(200).send(userFiltered)

            // Se não encontra o usuário, informa para o cliente que não há 
            // usuário com id informado
        }else{
            res.status(200).send("Não há um usuário com o id informado")
        }
    
    
    })

    

//------------- DELETE TRACK --------------

app.delete("/playlists/track",(req:Request, res:Response)=>{
    // o que vc quer que aconteca quando bater no caminho
        //console.log("bananinha")
        const playlistId = req.query.idPlaylist 
        const userId = req.headers.iduser
        const trackId = req.query.idtrack
    
        // Verificar se foram passados, se não retorna o erro
        if(!playlistId && !userId && !trackId ){
            res.status(400).send("Colocar obrigatoriament um id")
        }
        
        // Procurar o usuário no banco de dados no id, caso não ache retornará 
        // indefinido, caso ache retorna o usuário 
    
        const userFiltered = users.find((user)=>{
            return user.id === userId
        })
        
        // Variável que receberá a playlisyt filtrada 
        let playlistFiltered 
    
       
       
        // if(userFiltered) => verifica se o usuário foi encontrado
    
        if(userFiltered){
            // Usuário sendo encontrado, vamos procurar a playlist condizente 
            // com o id informado via parametro
            playlistFiltered = userFiltered.playlists.find((playlist)=>{
                return playlist.id === playlistId
            })
            // Se não encontra o usuário, informa para o cliente que não há 
            // usuário com id informado
        }else{
            res.status(200).send("Não há um usuário com o id informado")
        }
        
        // Declara a track a ser deletada 
        let trackDeleted 

        // if(playlistFiltered ) => TEsta se achou a playlist procurada
        if(playlistFiltered ){
            trackDeleted = playlistFiltered.tracks.find((track)=>{
                return track.id === trackId

            })
        }else{
            // Se não encontrada, informa que a não há uma playlist com id informado
            res.status(200).send("Não há um playlist com o id informado")
        }  

        // Testa se a faixa a ser deletada foi encontrada e se a playlist filtrada foi encontrada 
        if(trackDeleted && playlistFiltered){

            //tracksActual => conjunto de faixas sem a playlist apagada, não modificada
            const tracksActual = playlistFiltered.tracks.filter((track)=>{
                return track.id !== trackId
            })
            
            // Estamos atualizando a lista de faixas da playlist informa via id 
    
            playlistFiltered.tracks = tracksActual
            console.log('AAAAAAAAAAAA')
            res.status(200).send(playlistFiltered)

        }else{
            // Se não encontrada, informa que a não há uma playlist com id informado
            res.status(200).send("Não há uma faixa com o id informado, portanto ela não poderá ser deleta")
        }
        
        // Os dois ifs, são verificações dos parametros passados na requisição (headers/ query)

    
    })

// ----------------------------------

app.listen(3003,()=>{
    console.log('Servidor executando na porta 3003')
})