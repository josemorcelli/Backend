//import { Produto } from "./types"
import * as tipo from "./types"
export const produtos: tipo.Produto[]=[
    {
       name:"Mamão Papaia",
       category:"Fresco",
       price:4.45
    },
    {
        name:"Salsicha Perdigão",
        category:"Frios",
        price:5.89
    },
    {
        name:"Pão de alho",
        category:"Frios",
        price:5.89
    },
    {
        name:"Salsicha Sadia",
        category:"Frios",
        price:7.89
    },
    {
        name:"Salsicha Seara",
        category:"Frios",
        price:5.50
    },
    {
       name:"Mamão Americano",
       category:"Fresco",
       price:4.45
    },
    {
       name:"Pepino",
       category:"Fresco",
       price:4.45
    },
    {
       name:"Abóbora Doce",
       category:"Fresco",
       price:4.45
    },
    {
       name:"Abóbora Americana",
       category:"Fresco",
       price:4.45
    },
    {
       name:"Tomate",
       category:"Fresco",
       price:4.45
    },
    {
        name:"Queijo Qualho",
        category:"Frios",
        price:40.00
    },
    {
        name:"Queijo Mussarela",
        category:"Frios",
        price:50.50
    },
    {
        name:"Queijo Parmesão",
        category:"Frios",
        price:50.50
    },
    {
       name:"Pimenta Malagueta",
       category:"Fresco",
       price:3.50
    },
    {
       name:"Pimenta Calabresa",
       category:"Fresco",
       price:4.45
    },
    {
       name:"Peixe Serra",
       category:"Congelado",
       price:14.45
    },
    {
       name:"Peixe Tilápia",
       category:"Congelado",
       price:12.45
    },
    {
       name:"Sabão em pó",
       category:"Limpeza",
       price:7.45
    },
    {
       name:"Sabão em barra",
       category:"Limpeza",
       price:8.45
    },
    {
       name:"Sabonete",
       category:"Limpeza",
       price:2.45
    },
    {
       name:"Sabão em pó",
       category:"Limpeza",
       price:4.45
    },
]


export const colaboradores:tipo.Colaborador[]=[
   {
      name:"João",
      cpf:"021.098.090-09",
      rg:"031455766652265",
      setor:"Financeiro",
      idColaborador:"c01"
   },

   {
      name:"Maria",
      cpf:"013.013.013-13",
      rg:"01020304-2",
      setor:"Administrativo",
      idColaborador:"c02"
   },

   {
      name:"Carlos",
      cpf:"014.014.014-09",
      rg:"01030205-2",
      setor:"Vendas",
      idColaborador:"c03"
   },

   {
      name:"Priscila",
      cpf:"015.015.015-07",
      rg:"01040302-1",
      setor:"RH",
      idColaborador:"c04"
   }
]


export const clientes:tipo.Cliente[]=[
   {
      name:"Vanderleia",
      cpf:"022.022.022-22",
      rg:"01060702-3",
      idClient:"cli01",
      clientCard: false,
   },

   {
      name:"Valdir",
      cpf:"023.023.023-23",
      rg:"02030901-4",
      idClient:"cli02",
      clientCard: true,
   },

   {
      name:"Vanessa",
      cpf:"031.031.013-27",
      rg:"04080507-7",
      idClient:"cli03",
      clientCard: false,
   },

   {
      name:"Vando",
      cpf:"041.041.041-41",
      rg:"00010203-4",
      idClient:"cli04",
      clientCard: true,
   },

   {
      name:"Victoria",
      cpf:"055.055.055-55",
      rg:"09080706-5",
      idClient:"cli05",
      clientCard: false,
   },

 
]