import { buscarUserService } from "../services/userService.js";
import chalk from 'chalk';

function validaTamanhoCpf(cpf){
    if(cpf.length !== 11){
        console.clear();
        console.log(chalk.red("Cpf Invalido - Min 11 caracteres!"));
        return false;
    }

    return true;
}


function validaTipagemCpf(cpf){
    if(!(parseInt(cpf) == cpf)){
        console.clear();
        console.log(chalk.red("Cpf Invalido - Comportamento incomum - entrada de dados rejeitada pelo sistema"));

        return false;
    }

    return true;
}

function validaIdade(idade){
    const idadeInt = parseInt(idade);

    if(idadeInt === undefined || idadeInt > 116 || !Number.isInteger(idadeInt) || idadeInt < 0) {
        //validaIdade(idadeInt)
        console.clear();
        console.log(chalk.redBright("Idade inválida - verique e tente novamente!"));

        return false;
    }

    return true;
}

function validaExistencia(cpf){
    if(buscarUserService(cpf)){  //validar existencia no sistema
        console.log(chalk.red("Esse CPF ja existe no sistema!"));

        return false;
    }

    return true;
}

export { validaTamanhoCpf, validaTipagemCpf, validaIdade, validaExistencia }