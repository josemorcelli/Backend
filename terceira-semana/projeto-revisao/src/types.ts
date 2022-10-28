export enum CATEGORIA{
   FRIOS="Frios",
   CONGELADO="Congelado",
   FRESCO="Fresco",
   LIMPEZA="Limpeza"
 }
 
export enum SETOR{
   FINANCEIRO="Financeiro",
   ADMINISTRATIVO="Administrativo",
   VENDAS="Vendas",
   RH="RH"
}

 export type Produto={
    name:string,
    category:string,
    price:number
 }
 
type Pessoa ={
   name: string,
   cpf: string,
   rg: string
 }
type InfoColaborador = {
   idColaborador: string,
   setor: string
 }

type InfoCliente = {
   idClient: string,
   clientCard: boolean
 }

 export type Cliente = Pessoa & InfoCliente 
 export type Colaborador = Pessoa & InfoColaborador