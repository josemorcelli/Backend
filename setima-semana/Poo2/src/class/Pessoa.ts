export class Pessoa {
    private id: string;
    protected nome: string;
    private email: string;
    private dataNascimento: Date;
    private turma: string;
    constructor(id: string, nome: string, email: string, dataNascimento: Date, turma: string) { 
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.turma = turma;
}

public static saudacao(nome:string){
    console.log(`Olá ${nome} ! Prazer em conhecer você`);
    
}

protected existencia(){
    return `Eu sou uma pessoa`;
}
public correr():void{
    console.log(`${this.nome} está correndo!`);
    
}
}