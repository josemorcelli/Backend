import pessoas from "./data.js"
const res2 = []
const user = process.argv[2]
pessoas.forEach((p) => {
    if (p.nome.includes(user)) {
        res2.push(p)
    }
})

console.table(res2);