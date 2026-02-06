import { input } from '@inquirer/prompts';
import chalk from 'chalk';
import { validarCadastro, listarUsersService, buscarUserService } from "../services/userService.js";

//user { id: string, nome: string, idade }

async function cadastrarUserController(){ 
    console.log(chalk.whiteBright("Preencha os campos abaixo ..."));
    const cpf = await input({message: chalk.greenBright("CPF: ")});
    const nome = await input({message: chalk.greenBright("Nome: ")});
    const idade = await input({message: chalk.greenBright("Idade: ")});

    validarCadastro(cpf, nome, idade);
}

function listarUsersController(){
    listarUsersService();
}

async function buscarUserController(){
    const cpfKey = await input({message: "Digite o CPF que deseja buscar: "});

    buscarUserService(cpfKey);
}

function atualizarUserController(){
    console.log("userController chamando atualizarUsers()");
    console.log("Atualizar users...");
}

function deletarUserController(){
    console.log("userController chamando deletarUsers()");
    console.log("Deletando users...");
}

export { cadastrarUserController, listarUsersController, buscarUserController, atualizarUserController, deletarUserController }