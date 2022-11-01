import { users } from './data'
import * as allTypes from './type'
import  express, { Request, Response} from 'express'

import cors from 'cors'
import { ifError } from 'assert'

const app = express()

app.use(express.json())
app.use(cors())




// ---------- EXPLICAÇÃO EXPRESS --------- 

app.get("/teste/:id",(req:Request, res:Response)=>{

 const id = req.params.id
 const password = req.headers.password

 console.log(id, password)

 res.status(201).send('Deu bom')
})

// ----------- GET ALL PLAYLIST ----------

app.get("/playlist",(req:Request, res:Response)=>{

    const playlists = users.map((user)=>{
        return user.playlists
    })

    res.status(200).send(playlists)
})


//------------ GET PLAYLIST TRACKS --------

app.get("/playlists/tracks",(req:Request, res:Response)=>{

    const playlistId = req.query.idPlaylist 
    const userId = req.headers.iduser


    if(!playlistId && !userId){
        res.status(400).send("Colocar obrigatoriament um id")
    }

    const userFiltered = users.find((user)=>{
        return user.id === userId
    })
    
    let playlistFiltered 

    if(userFiltered){
    
        playlistFiltered = userFiltered.playlists.find((playlist)=>{
            return playlist.id === playlistId
        })
        
    }else{
        res.status(200).send("Não há um usuário com o id informado")
    }

    if(playlistFiltered ){
       const allTracks = playlistFiltered.tracks
        res.status(200).send(allTracks)
    }else{
        res.status(200).send("Não há um playlist com o id informado")
    }  
})

//------------ DELETE PLAYLIST -----------

app.delete("/playlists/playlist",(req:Request, res:Response)=>{
    
        const playlistId = req.query.idPlaylist 
        const userId = req.headers.iduser
    
        if(!playlistId && !userId){
            res.status(400).send("Colocar obrigatoriament um id")
        }
    
        const userFiltered = users.find((user)=>{
            return user.id === userId
        })
        
        let playlistsActual
    
        if(userFiltered){

            playlistsActual = userFiltered.playlists.filter((playlist)=>{
                return playlist.id !== playlistId
            })
            userFiltered.playlists = playlistsActual
            res.status(200).send(userFiltered)
        }else{
            res.status(200).send("Não há um usuário com o id informado")
        }   
    
    })

    

//------------- DELETE TRACK --------------

app.delete("/playlists/track",(req:Request, res:Response)=>{
    
        const playlistId = req.query.idPlaylist 
        const userId = req.headers.iduser
        const trackId = req.query.idtrack
    
        if(!playlistId && !userId && !trackId ){
            res.status(400).send("Colocar obrigatoriament um id")
        }
    
        const userFiltered = users.find((user)=>{
            return user.id === userId
        })
        let playlistFiltered 
    
        if(userFiltered){

            playlistFiltered = userFiltered.playlists.find((playlist)=>{
                return playlist.id === playlistId
            })

        }else{
            res.status(200).send("Não há um usuário com o id informado")
        }
        
        let trackDeleted 

        if(playlistFiltered ){
            trackDeleted = playlistFiltered.tracks.find((track)=>{
                return track.id === trackId

            })
        }else{
            res.status(200).send("Não há um playlist com o id informado")
        }  
        if(trackDeleted && playlistFiltered){

            const tracksActual = playlistFiltered.tracks.filter((track)=>{
                return track.id !== trackId
            })
    
            playlistFiltered.tracks = tracksActual
            
            res.status(200).send(playlistFiltered)

        }else{
            res.status(200).send("Não há uma faixa com o id informado, portanto ela não poderá ser deleta")
        }

    
    })

// --------------------- Explicacao das rotas  -------------------- 


app.get('/test/hello', (req: Request, res: Response) => {
    res.send(`Olá, mundo!`)
})

app.get('/test/:number', (req: Request, res: Response) => {
    
    res.send(
    `Seu número da sorte é ${Number(req.params.number) + 3}!
    `)
})



// --------------------- SEARCH PLAYLIST --------------------

app.get("/playlists",(req :Request,res:Response)=>{
// o que quer que aconteca quando bater no caminho 

const queriedName = req.query.name

if(!queriedName){
    res.status(400).send('Deu ruim, passe o nome da playlist')
}

let allPlaylists = users.map((user)=>{
    return user.playlists
}).flat(1)

allPlaylists = allPlaylists.filter((playlist)=>{
    return playlist.name === queriedName
})

//resposta dada do servidor para cliente 
res.status(200).send(allPlaylists)
})


// -------------------CREATE PLAYLIST -----------------------

app.post("/playlists",(req:Request, res: Response)=>{
    const playlistName = req.body.name
    const userToAdd = req.headers.authorization

    // O que eu quero que faca quando bate no caminho

    if(!playlistName || !userToAdd){
        res.status(400).send('Deu ruim, passe o nome da playlist e o ide do usuario ')
    }

    for(let i = 0; i < users.length; i ++){
        if(users[i].id === userToAdd ){
            users[i].playlists.push({
                id: Date.now().toString(),
                name :playlistName ,
                tracks: []
            })
        }

    }

    // Resposta do servidor 
    res.status(200).send(users)
})


// -------------------ADD TRACK NA PLAYLIST -------------

app.post("/playlists/:playlistId/tracks",(req :Request, res:Response)=>{

    const playlistIdToAdd = req.params.playlistId
    const userIdToAdd = req.headers.authorization
    const {name,artist,url} = req.body

    //if(!playlistIdToAdd || !userIdToAdd|| !name || !artist || !url){
    //    res.status(400).send('Deu ruim, passe os parametros ')
   // }
try{
    //SE FALTAR DADOS DA MUSICA
    if(!name){
         //CONFIGURANDO ERRO
         const erro = new Error('O nome da música não foi encontrado!')
         erro.name = "DataMusicNotFound"
         //LANÇAR ERRO
         throw erro
    }
    if(!artist){
        //CONFIGURANDO ERRO
        const erro = new Error('O artista da música não foi encontrado!')
        erro.name = "DataMusicNotFound"
        //LANÇAR ERRO
        throw erro
    }
    if(!url){
        //CONFIGURANDO ERRO
        const erro = new Error('A URL da música não foi encontrado!')
        erro.name = "DataMusicNotFound"
        //LANÇAR ERRO
        throw erro
    }

    //teste de Authorization
    //QUANDO NÃO É PASSADO O AUTHORIZATION
    if(!userIdToAdd){
        //CONFIGURANDO ERRO
        const erro = new Error('Authorization não encontrado!')
        erro.name = "AuthorizationError"
        //LANÇAR ERRO
        throw erro
    }
    //PROCURA USUARIO
    const userSelectedById = users.find((user)=>{
        return user.id === userIdToAdd
    })

    let playlistSelected 
    //CASO DE O USUARIO NÃO EXISTIR 
    if(!userSelectedById){
         //CONFIGURANDO ERRO
         const erro = new Error('Usuario não encontrado!')
         erro.name = "AuthorizationError"
         //LANÇAR ERRO
         throw erro

    }else{
        playlistSelected = userSelectedById.playlists.find((playlist)=>{
            return playlist.id === playlistIdToAdd
        })
    }
//SE A PLAYLIST NÃO EXISTIR
    if(!playlistSelected ){
            //CONFIGURANDO ERRO
            const erro = new Error('A playlist não foi encontrado!')
            erro.name = "PlaylistNotFound"
            //LANÇAR ERRO
            throw erro
    }else{
        //TESTE SE A MÚSICA JA EXISTE
        playlistSelected.tracks.forEach(element =>{
            if(element.name === name && element.artist === artist){
            //CONFIGURANDO ERRO
            const erro = new Error('A música já existe!')
            erro.name = "TrackAlreadyExist"
            //LANÇAR ERRO
            throw erro
            }
        })
        playlistSelected.tracks.push({
            id:Date.now().toString(),
            name:name,
            artist:artist,
            url:url
        })
    }
    

    res.status(201).send(playlistSelected)
}catch(e: any){
    if(e.name === 'AuthorizationError'){
        res.status(401).send(e.message)
    }else if(e.name === "DataMusicNotFound"){
        res.status(422).send(e.message)
    }else if(e.name === "PlaylistNotFound"){
        res.status(404).send(e.message)
    }else if(e.name === "TrackAlreadyExist"){
        res.status(409).send(e.message)
    }else {
        res.status(500).send(e.message)
    }
}
})




// -------------------PORTA PARA VERIFICAR O SERVIDOR-------------

app.listen(3003,()=>{
    console.log('Servidor executando na porta 3003')
})