//npm run test
import {writeFileSync, readFileSync} from "node:fs"

console.log("arquivo de teste rodando...")

const person = {
    cpf: "12345678918",
    idade: 19,
    nome: "Joao Lavras"
}

const person2 = {
    cpf: "12345678918",
    idade: 81,
    nome: "Olavo Bilac"
}

const filePATH = "./src/testes/arquivo.json";
const usersJSON = readFileSync(filePATH, "utf-8");
const users = JSON.parse(usersJSON); //recebe tudo do arquivo original e vira objeto

users.push(person);
users.push(person2); // tudo isso esta indo para dentro de users

console.log(users);

console.log(users[1].nome);
console.log("users.cpf ->", users.cpf);

writeFileSync(filePATH, JSON.stringify(users, null, 2), "utf-8");

const NumeroFloat = 2.5;
console.log(NumeroFloat);
const NumeroInteiro = parseInt(NumeroFloat);
console.log(typeof NumeroFloat);
console.log(typeof NumeroInteiro);
const texto = "JoaoDev";
const textoInteiro = parseInt(texto);
console.log(textoInteiro)