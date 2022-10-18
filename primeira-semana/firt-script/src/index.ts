let n1:number;
let n2:number;
n1=10
n2=20

type Person = {
    name: string,
    age: number,
}

const pessoas:Person[]=[
    {
    name:"José",
    age:28
    },
    {
    name:"Paula",
    age:28
    }
]

function soma (a:number,b:number):string{
  const soma= a+b
  return `A soma é ${soma}!`;
  
}

console.log(soma(100,28));
