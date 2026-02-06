import { input } from '@inquirer/prompts';
import chalk from 'chalk';
import { cadastrarUserController, listarUsersController, buscarUserController, atualizarUserController, deletarUserController } from '../controllers/userController.js';

async function menu(){
    console.log(chalk.bold.cyan("CLI - GERENCIAMENTO DE USERS"));
    console.log("1 - Cadastrar User");
    console.log("2 - Listar Users");
    console.log("3 - Buscar User");
    console.log("4 - Atualizar User");
    console.log("5 - Deletar User");

    const optionString = await input({ message: chalk.bgYellowBright('Digite uma opção >> ') });
    const option = parseInt(optionString);

    switch(option){
        case 1:
            console.clear();
            cadastrarUserController();
            break;
        case 2:
            console.clear();
            listarUsersController();
            break;
        case 3:
            console.clear();
            buscarUserController();
            break;
        case 4:
            console.clear();
            atualizarUserController();
            break;
        case 5:
            console.clear();
            deletarUserController();
            break;
        default:
            console.clear();
            console.log(chalk.red("Opção inválida! Tente Novamente...\n"));
            menu();
    }
    
}

export { menu }