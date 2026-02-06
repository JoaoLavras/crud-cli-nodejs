import chalk from "chalk";
import { writeFileSync, readFileSync } from "node:fs";

const filePATH = "./src/database/users.json"

class User{
    #cpf;
    #nome;
    #idade;

    constructor(cpf,nome,idade){
        this.#cpf = cpf;
        this.#nome = nome;
        this.#idade = idade;
    }

    //gets
    getCpf(){
        return this.#cpf;
    }

    getNome(){
        return this.#nome;
    }

    getIdade(){
        return this.#idade;
    }

    //sets
    setCpf(newCpf){
        this.#cpf = newCpf;
    }

    setNome(newNome){
        this.#nome = newNome;
    }

    setIdade(newIdade){
        this.#idade = newIdade;
    }

}


function armazenarUser(cpf, nome, idade){
    const newUser = new User(cpf, nome, idade);

    const usersJSON = readFileSync(filePATH, "utf-8");

    const users = JSON.parse(usersJSON);

    users.push(newUser);

    writeFileSync(filePATH,JSON.stringify(users, null, 2), "utf-8");

    console.log(chalk.green("Usuario adicionado com sucesso!"));
    console.log(chalk.yellowBright("Dados Adicionados:"));
    console.log(chalk.yellowBright("CPF: ", cpf));
    console.log(chalk.yellowBright("Nome: ", nome));
    console.log(chalk.yellowBright("Idade: ", idade));
}

function listarUsersRepository(){
    const listJSON = readFileSync(filePATH, "utf-8");
    const users = JSON.parse(listJSON); //esta recebendo um array
    let i = 0;

    for(i = 0; i <= users.length; i++){
        console.log("to passando aqui...");
        console.log(users[i].name);
    }
    console.log(users);

    return listJSON;
}

export { armazenarUser, listarUsersRepository }