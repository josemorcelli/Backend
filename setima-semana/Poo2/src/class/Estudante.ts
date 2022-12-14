import { Pessoa } from "./Pessoa";

export class Estudante extends Pessoa {
    hobbies: string[];
    constructor (id: string, nome: string, email: string, dataNascimento: Date, turma: string, hobbies: string[]){
        super (id, nome, email, dataNascimento, turma)
        this.hobbies = hobbies;
    }


public getNome(){
    return this.nome;
}

public static soma (n1:number, n2:number){
    return n1+n2;
}

public reflexao():void{
    console.log(`${this.getNome()} Penso logo existo! ${this.existencia()}`);
    
    }
}