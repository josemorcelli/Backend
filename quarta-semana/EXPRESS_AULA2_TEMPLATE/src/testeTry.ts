const userInput = require("readline-sync")
let op=1
while(op!=0) {
    let n1=userInput.question("Digite o primeiro numero:\n")
    let n2=userInput.question("Digite o segundo numero:\n")
    try{
        n1=Number(n1)
        n2=Number(n2)
        if(isNaN(n1)){
         //lançar um novo erro
            throw new Error("O valor do primeiro numero é invalido!")
        }
        if(isNaN(n2)){
         //lançar um novo erro
            throw new Error("O valor do segundo numero é invalido!")
        }
        if(!isFinite(n1/n2)){
            //lançar um novo erro
               throw new Error("Não é possivel fazer divisao por zero!")
           }
        console.log(`A divisão de ${n1} por ${n2} é:`, n1/n2)
    }catch(e:any){
        console.log("Eita! Deu erro : ", e.message);
        
    }finally{
        console.log("----------------\n VAMOS DE NOVO? \n");
        
    }

    op=userInput.question("Deseja continuar?\n 1 -> Sim\n 0 -> Nao\n Op:")
}