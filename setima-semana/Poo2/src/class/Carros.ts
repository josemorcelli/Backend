export class Carro{
    // public marca:string;
    // public cor:string;

    constructor(private marca:string,private cor:string="AZUL"){
        this.marca = marca;  
        this.cor= cor;    
    }

    public getMarca(){
        return this.marca;
    }
    public getCor(){
        return this.cor;
    }
    
    public setMarca(newMarca:string){
        this.marca=newMarca;
    }
    public setCor(newCor:string){
        this.cor=newCor;
    }


    public acelerar(){
        console.log(`O carro de cor ${this.cor} e modelo ${this.marca} está acelerando!`);
    }
    public frear(){
        console.log(`O carro de cor ${this.cor} e modelo ${this.marca} está freando!`);
    }
} 