import { Pessoa } from "./Pessoa";

export class Docente extends Pessoa{
    especialidades: string[];
    
    constructor (id: string, nome: string, email: string, dataNascimento: Date, turma: string, hobbies: string[]){
        super (id, nome, email, dataNascimento, turma);
        this.especialidades = hobbies

    }
    public getNome():string{
        return this.nome;
    }

    
}
