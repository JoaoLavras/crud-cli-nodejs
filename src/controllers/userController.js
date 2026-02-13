import { input } from '@inquirer/prompts';
import chalk from 'chalk';
import { validarCadastroService, listarUsersService, buscarUserService, atualizarUserService, limparService, deletarUserService } from "../services/userService.js";
import { menu } from "../cli/menu.js";

//user { id: string, nome: string, idade }
let message = chalk.whiteBright("Preencha os campos abaixo ...");

function menuBack(){
    return menu();
}

async function cadastrarUserController(){ 
    
    console.log(message);
    const cpf = await input({message: chalk.greenBright("CPF: ")});
    const nome = await input({message: chalk.greenBright("Nome: ")});
    const idade = await input({message: chalk.greenBright("Idade: ")});

    if(!validarCadastroService(cpf,nome,idade)){
        message = chalk.yellow("Preencha novamente os campos abaixo...");
        cadastrarUserController();
    }

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

async function deletarUserController(){
    const cpfKey = await input({message: "Digite o CPF do usuario que deseja deletar: "});
    const resultado = deletarUserService(cpfKey);

    if(!resultado){
        return deletarUserController();
    }

    return true;
}

function limparController(){
    limparService();
}

export { cadastrarUserController, listarUsersController, buscarUserController, atualizarUserController, deletarUserController, limparController }