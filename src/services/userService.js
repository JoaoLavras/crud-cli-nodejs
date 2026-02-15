import { input } from '@inquirer/prompts';
import chalk from 'chalk';
import { armazenarUserRepository, listarUsersRepository, hidrataRepository, atualizarUserRepository, limparRepository, deleterUserRepository } from '../repositories/userRepository.js';
import { validaTamanhoCpf, validaTipagemCpf, validaIdade, validaExistencia } from '../utils/validation.js'
import { parse } from 'node:path';
import { limparTerminal } from '../controllers/userController.js';

let count = 1;

function validarCadastroService(cpf, nome, idade){
    console.clear();

    const idadeInt = parseInt(idade);

    if(!validaTamanhoCpf(cpf)){
        return false;
    } else if(!validaTipagemCpf(cpf)){
        return false;
    } else if(!validaIdade(idade)){
        return false;
    } else if(!validaExistencia(cpf)){
        return false;
    }

    //armazenar
    return armazenarUserRepository(cpf, nome, idadeInt);
}

function listarUsersService(){
    console.clear();

    const userList = listarUsersRepository();

    if(userList.length === 0){
        return false;
    }

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

    userUpdate = hidrataRepository(userUpdate); //transforma o userUpdate em uma instancia da classe User

    
    console.log(chalk.bgYellowBright.black("--------{ATUALIZAÇÃO DE DADOS}--------"));
    console.log(chalk.bold.yellowBright("----DADOS ATE A ULTIMA ATUALIZAÇÃO----"));
    console.log(chalk.yellow("CPF - ",userUpdate.getCpf()));
    console.log(chalk.yellow("NOME - ",userUpdate.getNome()));
    console.log(chalk.yellow("IDADE - ",userUpdate.getIdade()));
    console.log(chalk.bold.yellowBright("-------------------------------------"));
    console.log(chalk.bold("1 - CPF"));
    console.log(chalk.bold("2 - NOME"));
    console.log(chalk.bold("3 - IDADE"));

    const optionUpdateString = await input({message: chalk.yellow("Digite a opção que deseja atualizar: ")});
    const optionUpdate = parseInt(optionUpdateString);

    if(optionUpdate !== 1 && optionUpdate !== 2 && optionUpdate !== 3 ){
        console.clear();
        console.log(chalk.red(`[${count}] Erro: Digite uma opcao valida!`));
        count++;
        return atualizarUserService(cpfKey);
    }

    restauraCount();

    let newDado = undefined;

    switch(optionUpdate){
        case 1:
            console.log(chalk.bold.green("< ATUALIZAR CPF SELECIONADO >"))
            newDado = await input({message: "Digite o novo CPF: "});
            //reutilizar funções de validação

            if(!validaTamanhoCpf(newDado)){
                return atualizarUserService(cpfKey);

            } else if(!validaTipagemCpf(newDado)){
                return atualizarUserService(cpfKey);

            } else if(!validaExistencia(newDado)){
                return atualizarUserService(cpfKey);
            }

            break;
        case 2:
            console.log(chalk.bold.green("< ATUALIZAR NOME SELECIONADO >"))
            newDado = await input({message: "Digite o novo NOME: "});

            break;
        case 3:
            console.log(chalk.bold.green("< ATUALIZAR IDADE SELECIONADO >"))
            newDado = await input({message: "Digite a nova IDADE: "});

            if(!validaIdade(newDado)){
                return atualizarUserService(cpfKey);
            }

            break;

        default:
            console.clear()
            console.log(chalk.red("\nErro Inesperado - option recebeu um numero fora das opções válidas!! Por favor siga as instruções do"));
            return atualizarUserService(cpfKey);
    }

    if(newDado === undefined){
        console.log(chalk.red("Error: NewDado continua Undefined mesmo apos a seleção de opções"));
        return false;
    }

    return atualizarUserRepository(userUpdate, newDado, optionUpdate);

}

function deletarUserService(cpfKey){

    if(!buscarUserService(cpfKey)){ //buscar nao é assincrono entao funciona deboas
        console.clear();
        console.log(chalk.red(`[Error ${count}] Erro Usuario nao Encontrado! -> deletarUserServiceError()`)); //count apenas para estetica e entendimento
        count++; 
        return false;
    }

    let userDelete = buscarUserService(cpfKey);
    userDelete = hidrataRepository(userDelete);

    if(!deleterUserRepository(userDelete)){
        console.log(chalk.red("Erro ao deletar o Usuario"));
        return false;
    }

    console.log(chalk.green("Usuario deletado com sucesso!"));

    return true;

};

function isVazio(){
    return listarUsersRepository();
}

function limparService(){
    limparRepository();
    console.log(chalk.bgMagenta("Limpeza Concluida!\n"));
}

function restauraCount(){
    count = 1;
}

export { validarCadastroService, listarUsersService, buscarUserService, atualizarUserService, limparService, deletarUserService, isVazio }

