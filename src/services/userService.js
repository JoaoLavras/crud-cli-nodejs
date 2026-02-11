import { input } from '@inquirer/prompts';
import chalk from 'chalk';
import { armazenarUserRepository, listarUsersRepository, hidrataRepository, atualizarUserRepository, limparRepository } from '../repositories/userRepository.js';

let count = 1;

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
        return userSearch;
    }

    return false;
}

async function atualizarUserService(cpfKey){

    if(!buscarUserService(cpfKey)){ //buscar nao é assincrono entao funciona deboas
        console.clear();
        console.log(chalk.red(`[Error ${count}] Erro Usuario nao Encontrado!`)); //count apenas para estetica e entendimento
        count++; 
        return false;
    }

    restauraCount();

    let userUpdate = buscarUserService(cpfKey);

    if(!userUpdate){
        console.log(chalk.red("Ocorreu um erro inesperado ao buscar o User na Base de Dados!"))
        return false;
    }

    userUpdate = hidrataRepository(userUpdate);

    console.log("ATUALIZAÇÃO DE DADOS");
    console.log("----DADOS ATE A ULTIMA ATUALIZAÇÃO----");
    console.log(chalk.yellow(userUpdate.getCpf()));
    console.log(chalk.yellow(userUpdate.getNome()));
    console.log(chalk.yellow(userUpdate.getIdade()));
    console.log("-------------------------------------");
    console.log("1 - CPF");
    console.log("2 - NOME");
    console.log("3 - IDADE");

    const optionUpdateString = await input({message: "Digite a opção que deseja atualizar: "});
    const optionUpdate = parseInt(optionUpdateString);

    if(optionUpdate !== 1 && optionUpdate !== 2 && optionUpdate !== 3 ){
        console.clear();
        console.log(chalk.red(`[${count}] Erro: Digite uma opcao valida!`));
        atualizarUserService(cpfKey);
    }

    restauraCount();

    let newDado = undefined;

    switch(optionUpdate){
        case 1:
            console.log(chalk.green("< ATUALIZAR CPF SELECIONADO >"))
            newDado = await input({message: "Digite o novo CPF: "});
            break;
        case 2:
            console.log(chalk.green("< ATUALIZAR NOME SELECIONADO >"))
            newDado = await input({message: "Digite o novo NOME: "});
            break;
        case 3:
            console.log(chalk.green("< ATUALIZAR CPF SELECIONADO >"))
            newDado = await input({message: "Digite a nova IDADE: "});
            break;
        default:
            console.clear()
            console.log(chalk.red("\nErro Inesperado - option recebeu um numero fora das opções válidas!!"));
            atualizarUserService(cpfKey);
    }

    if(newDado === undefined){
        console.log(chalk.red("Error: NewDado continua Undefined mesmo apos a seleção de opções"));
        return false;
    }

    return atualizarUserRepository(userUpdate, newDado, optionUpdate);

}

function limparService(){
    limparRepository();
    console.log(chalk.bgMagenta("Limpeza Concluida!\n"));
}

function restauraCount(){
    count = 1;
}

export { validarCadastro, listarUsersService, buscarUserService, atualizarUserService, limparService }

