//definindo tipos
type Person={
    id:number,
    name:string,
    email:string,
    password:string
}

/*const pessoa1:Person={
    id:555566,
    name:"José",
    email:"jose@barros.com",
    password:"123456"
}*/

type AdmninAccount={
    account:AccountType.Admin,
    permission:PermissionType.Admin
}

type NormalAccount={
    account:AccountType.Normal,
    permission:PermissionType.Normal
}

enum AccountType {
   Admin="Admin_User",
   Normal="Normal_User"
}

enum PermissionType {
    Admin= 1,
    Normal= 0
}

type AdminUser = Person & AdmninAccount
type NormalUser = Person & NormalAccount

const user1: AdminUser ={
    id: 1,
    name:"José",
    email:"jose@barros.com",
    password:"123456",
    account: AccountType.Admin,
    permission: PermissionType.Admin
}

const user2: NormalUser = {
    id: 2,
    name: "Junior",
    email: "junior@labenu.com",
    password: "123456",
    account: AccountType.Normal,
    permission: PermissionType.Normal
}

type UserList = AdminUser[] & NormalUser[]

let users: UserList = []

users.push(user1)
users.push(user2)

console.table(users)
