import { input } from '@inquirer/prompts';
import chalk from 'chalk';
import { validarCadastro, listarUsersService } from "../services/userService.js";

//user { id: string, nome: string, idade }

async function cadastrarUsers(){
    console.log(chalk.bold.white.bgGreen("CadastrarUsers()"));
    
    console.log(chalk.whiteBright("Preencha os campos abaixo ..."));
    const cpf = await input({message: chalk.greenBright("CPF: ")});
    const nome = await input({message: chalk.greenBright("Nome: ")});
    const idade = await input({message: chalk.greenBright("Idade: ")});

    validarCadastro(cpf, nome, idade);
}

function listarUsers(){
    console.log("userController chamando listarUsers()");
    console.log("Listando users...");

    listarUsersService();
}

function buscarUsers(){
    console.log("userController chamando buscarUsers()");
    console.log("Buscando users...");
}

function atualizarUser(){
    console.log("userController chamando atualizarUsers()");
    console.log("Atualizar users...");
}

function deletarUser(){
    console.log("userController chamando deletarUsers()");
    console.log("Deletando users...");
}

export { cadastrarUsers, listarUsers, buscarUsers, atualizarUser, deletarUser }