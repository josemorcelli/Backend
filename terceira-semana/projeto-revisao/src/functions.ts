import * as tipo from "./types"
//func ordena por nome
export function buscaPorNome(produtos:tipo.Produto[],nome?:string,desconto?:number):void{
    let produtosFiltrados:tipo.Produto[];
    //filtra
    if (nome){
        produtosFiltrados=produtos.filter((produto)=>{
            return produto.name.toLowerCase().includes(nome.toLowerCase())
        })
    }else{
        produtosFiltrados=produtos;
    }
    //ordenar
    produtosFiltrados=produtosFiltrados.sort(
        (a:tipo.Produto,b:tipo.Produto)=>{
            return a.name>b.name?1:a.name<b.name?-1:0;
        })
    //aplicar desconco
    if(desconto){
        produtosFiltrados=produtosFiltrados.map((produto)=>{
            //aplicar desconto
            produto.price=produto.price-(produto.price*(desconto/100))
            //arredondar
            produto.price=Number(produto.price.toFixed(2));

            return produto
        })
    }
    //finalizando a funçao
    console.table(produtosFiltrados)
}

//func ordena por categoria
export function buscaPorCategoria(produtos:tipo.Produto[],categoria?:tipo.CATEGORIA,desconto?:number):void{
    let produtosFiltrados:tipo.Produto[];
    //filtra
    if (categoria){
        produtosFiltrados=produtos.filter((produto)=>{
            return produto.category=categoria;
        })
    }else{
        produtosFiltrados=produtos;
    }
    //ordenar
    produtosFiltrados=produtosFiltrados.sort(
        (a:tipo.Produto,b:tipo.Produto)=>{
            return a.name>b.name?1:a.name<b.name?-1:0;
        })
    //aplicar desconco
    if(desconto){
        produtosFiltrados=produtosFiltrados.map((produto)=>{
            //aplicar desconto
            produto.price=produto.price-(produto.price*(desconto/100))
            //arredondar
            produto.price=Number(produto.price.toFixed(2));

            return produto
        })
    }
    //finalizando a funçao
    console.table(produtosFiltrados)
}

//cadastro de clientes
export function addCliente(clientes:tipo.Cliente[],name:string,cpf:string,rg:string,idClient:string,clientCard:boolean):void{
    const newCliente: tipo.Cliente ={
        name,
        cpf,
        rg,
        idClient,
        clientCard
    }

    //adiciona novo cliente
    clientes.push(newCliente)
    retornarClientes(clientes)
}

//Cadastro de colaboradores
export function addColaboradores(colaboradores:tipo.Colaborador[],name:string,cpf:string,rg:string,idColaborador:string,setor:tipo.SETOR):void{
    const newColaborador: tipo.Colaborador ={
        name,
        cpf,
        rg,
        idColaborador,
        setor
    }

    //adiciona novo colaborador
    colaboradores.push(newColaborador)
    retornarColaboradores(colaboradores)
}

//Retorna Clientes
export function retornarClientes(clientes:tipo.Cliente[]):void{
    const clientesOrdenados=clientes.sort(
        (a:tipo.Cliente,b:tipo.Cliente)=>{
            return a.name>b.name?1:a.name<b.name?-1:0;
        })
        console.table(clientesOrdenados)
}

//Retorna Colaboradores
export function retornarColaboradores(colaboradores:tipo.Colaborador[]):void{
    const colaboradoresOrdenados=colaboradores.sort(
        (a:tipo.Colaborador,b:tipo.Colaborador)=>{
            return a.name>b.name?1:a.name<b.name?-1:0;
        })
        console.table(colaboradoresOrdenados)
}
