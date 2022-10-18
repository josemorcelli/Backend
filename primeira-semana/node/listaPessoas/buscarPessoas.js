import listaPessoas from "./listaPessoas.js"

const nome = process.argv[2]

function buscaNome (nome) {
    let busca = []
    listaPessoas.forEach((item) => {
        if(item.name.includes(nome)){
            busca.push(item)
        }
        
    })
    return busca
}

console.table(buscaNome(nome))

