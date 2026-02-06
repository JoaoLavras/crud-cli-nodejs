import { input } from '@inquirer/prompts';
import chalk from 'chalk';
import { armazenarUserRepository, listarUsersRepository } from '../repositories/userRepository.js';

function validarCadastro(cpf, nome, idade){
    console.clear();
    
    //validar tamanho
    if(cpf.length !== 11){
        console.log(cpf.length);
        console.log("Cpf Invalido - Min 11 caracteres!");
        return;
    }

    //validar existencia no sistema

    //armazenar
    armazenarUserRepository(cpf, nome, idade);
}

function listarUsersService(){
    console.clear();

    const userList = listarUsersRepository();

    console.log(chalk.bold.redBright("LISTA DE USUARIOS"))
    for(let i = 0; i < userList.length; i++){
        console.log(chalk.red("---------------"));
        console.log(chalk.yellow("NOME: ", userList[i].nome));
        console.log(chalk.yellow("CPF: ", userList[i].cpf));
        console.log(chalk.yellow("IDADE: ", userList[i].idade));
    }

    return true;
}

function buscarUserService(cpfKey){;
    const listUsers = listarUsersRepository(); //listUsers ja esta como array JS
    const userSearch = listUsers.find(listUsers => listUsers.cpf === cpfKey);

    if(userSearch){
        console.log(chalk.bold.green("User Encontrado!"));
        console.log(chalk.yellow("NOME: ", userSearch.nome));
        console.log(chalk.yellow("CPF: ", userSearch.cpf));
        console.log(chalk.yellow("IDADE: ", userSearch.idade));
    }
    else{
        console.log("usuario nao encontrado!");
        return false;
    }

    return true;
}

export { validarCadastro, listarUsersService, buscarUserService }

