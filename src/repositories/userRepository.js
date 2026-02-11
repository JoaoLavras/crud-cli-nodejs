import chalk from "chalk";
import { writeFileSync, readFileSync, write } from "node:fs";

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

        toJSON() {
        return {
            cpf: this.#cpf,
            nome: this.#nome,
            idade: this.#idade
        };
    }

}


function armazenarUserRepository(cpf, nome, idade){
    const newUser = new User(cpf, nome, idade);
    const usersJSON = readFileSync(filePATH, "utf-8");
    const users = JSON.parse(usersJSON);

    users.push({
        cpf: newUser.getCpf(),
        nome: newUser.getNome(),
        idade: newUser.getIdade()
    });

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

    return users;
}

function hidrataRepository(userUpdate){//retransforma o objeto em instancia de classe para fazer alterações
    const user = new User(userUpdate.cpf, userUpdate.nome, userUpdate.idade);

    return user;
}

function atualizarUserRepository(userUpdate, newDado, option){
    const users = listarUsersRepository(); //array js com objetos padroes sem vinculo com a classe USER
    const index = users.findIndex(user => user.cpf === userUpdate.getCpf());

    switch(option){
        case 1:
            users[index] = {
                cpf: newDado,
                nome: userUpdate.getNome(),
                idade: userUpdate.getIdade()
            }
            break;
        case 2:
            users[index] = {
                cpf: userUpdate.getCpf(),
                nome: newDado,
                idade: userUpdate.getIdade()
            }
            break;
        case 3:
            users[index] = {
                cpf: userUpdate.getCpf(),
                nome: userUpdate.getNome(),
                idade: newDado,
            }
            break;
        default:
            console.log(chalk.red("Erro ao verificar a opção escolhida em userRepository()"));
            return false;
    }

    writeFileSync(filePATH, JSON.stringify(users, null, 2), "utf-8");

    return true;
}

function limparRepository(){
    const users = [];

    writeFileSync(filePATH,JSON.stringify(users, null, 2), "utf-8");

    return users;

}

export { armazenarUserRepository, listarUsersRepository, hidrataRepository, atualizarUserRepository, limparRepository }