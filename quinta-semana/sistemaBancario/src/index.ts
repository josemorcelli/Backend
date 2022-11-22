import {user} from "./type"
import {users} from "./data"
import express,{Request,Response} from "express"
import cors from 'cors'
import { convertDate, nowDate, verifyAge } from "./function";

const app = express()
app.use(express.json())
app.use(cors())

let errorCode = 422;

app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users);
  });

  //Criar Conta

app.post("/criarConta", (req: Request, res: Response) => {
    try {
      const { name, cpf, birthdayDate } = req.body;
  
      const newUser: user = {
        id: Date.now(),
        name,
        cpf,
        birthdayDate,
        balance: 0,
        statement: [],
      };
  
      if (!name || !cpf || cpf.length !== 11 || !birthdayDate) {
        errorCode = 400;
        if (cpf.length !== 11) {
          throw new Error("CPF deve conter 11 números");
        }
        throw new Error(
          "Necessário preencher body com nome, CPF e data de nascimento"
        );
      }
  
      for (let user of users) {
        if (user.cpf === cpf) {
          throw new Error("CPF já cadastro na base de dados");
        }
      }
  
      if (verifyAge(birthdayDate) >= 18) {
        users.push(newUser);
  
        res.status(201).send( "Usuário cadastrado com sucesso!" );
      } else {
        throw new Error("Cliente não possue idade igual ou superior a 18 anos");
      }
    } catch (error: any) {
      res.status(errorCode).send(error.message);
    }
  });

  //Pegar Saldo

  app.get("/:cpf/saldo", (req: Request, res: Response) => {
    try {
      const reqCpf = req.params.cpf as string;
  
      if (!reqCpf) {
        errorCode = 400;
        throw new Error("CPF não informado ou incorreto");
      }
  
      let balance;
  
      users.map((user) => {
        if (user.cpf === reqCpf) {
          balance = user.balance;
        }
      });
  
      res.status(200).send({ balance });
    } catch (error: any) {
      res.status(errorCode).send(error.message);
    }
  });

  //Adicionar Saldo

  app.put("/deposito", (req: Request, res: Response) => {
    try {
      const reqName = req.body.name;
      const reqCpf = req.body.cpf;
      const reqValue = Number(req.body.value);
  
      if (!reqCpf || !reqName || !reqValue) {
        errorCode = 400;
        throw new Error("Dados não informados");
      }
  
      for (let user of users) {
        if (
          user.cpf === reqCpf &&
          user.name.toLowerCase() === reqName.toLowerCase()
        ) {
          user.balance += reqValue;
          user.statement.push({
            date: new Date().toLocaleDateString(),
            value: reqValue,
            description: "Depósito em dinheiro",
          });
          res.status(200).send("Transação realizada com sucesso!" );
        } else {
          errorCode = 400;
          throw new Error("Dados incorretos");
        }
      }
    } catch (error: any) {
      res.status(errorCode).send(error.message);
    }
  });

  //Pagamento de Conta

  app.post("/pagamento", (req: Request, res: Response) => {
    try {
      const { date, description, value, cpf } = req.body;
  
      if (!description || !value || !cpf) {
        errorCode = 400;
        throw new Error("Dados incorretos ou não informados");
      }
  
      function verifyDate() {
        if (Date.parse(convertDate(date)) < Date.parse(convertDate(nowDate))) {
          throw new Error("A data não pode ser anterior a hoje");
        }
        return date;
      }
  
      for (let user of users) {
        if (user.balance < value) {
          errorCode = 422;
          throw new Error("Saldo insuficiente para realizar a transação");
        }
        if (user.cpf === cpf) {
          user.statement.push({
            date: date ? verifyDate() : nowDate,
            description,
            value,
          });
          res.status(201).send( "Sucesso!" );
        } else {
          errorCode = 400;
          throw new Error("CPF não encontrado ou incorreto");
        }
      }
    } catch (error: any) {
      res.status(errorCode).send(error.message);
    }
  });


/*type Statement = {
    date: string,
    bankBalance: number,
    description: string
}
type User = {
    name: string,
    cpf: number,
    age: number,
    balance: number;
    bankStatement: Statement[]
};

const users: User[] = [

]*/


/*app.post("/usuarios", (req:Request, res:Response) =>{
    let errorCode = 400
    try{
        const {name, cpf, age, balance, bankStatement} = req.body
        if (!name || !cpf || !age || !balance || !bankStatement) {
            errorCode = 422
            throw new Error ("Por favor, veirifique se todos os campos estão completos")
        }
        if (age < 18) {
            errorCode = 403
            throw new Error ("Necessário ter mais de 18 anos para criar conta neste banco.")
        }
        const newUser: User = {
            name,
            cpf,
            age,
            balance,
            bankStatement
        }
        users.push(newUser)
        res.status(201).send({message: "Conta criada com sucesso"})
    }catch(error:any){
        res.status(errorCode || 500).send({message: error.message})
    }
})*/

app.listen(3003, () => {
    console.log(`Servidor rodando na porta http://localhost:3003`);
});