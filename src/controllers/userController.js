import { input } from '@inquirer/prompts';
import chalk from 'chalk';
import { validarCadastro, listarUsersService, buscarUserService, atualizarUserService, limparService } from "../services/userService.js";

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

    const userSearch = buscarUserService(cpfKey);

    if(userSearch){
        console.log(chalk.bold.green("User Encontrado!"));
        console.log(chalk.yellow("NOME: ", userSearch.nome));
        console.log(chalk.yellow("CPF: ", userSearch.cpf));
        console.log(chalk.yellow("IDADE: ", userSearch.idade));

        return true;
    }

    console.log(chalk.red("Erro Usuário nao encontrado!"));

    return false;
}

async function atualizarUserController(){
    const cpfKey = await input({message: "Digite o CPF do usuario que deseja atualizar: "});
    const resultado = await atualizarUserService(cpfKey); //por a função ser async é necessario esssa sintaxe

    if(!resultado){ 
        atualizarUserController();
    }
    else{
        console.log("Usuario atualizado com sucesso!");
    }

}

function deletarUserController(){
    console.log("userController chamando deletarUsers()");
    console.log("Deletando users...");
}

function limparController(){
    limparService();
}

export { cadastrarUserController, listarUsersController, buscarUserController, atualizarUserController, deletarUserController, limparController }