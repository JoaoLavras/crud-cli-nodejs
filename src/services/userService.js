import { input } from '@inquirer/prompts';
import chalk from 'chalk';
import { armazenarUser, listarUsersRepository } from '../repositories/userRepository.js';

function validarCadastro(cpf, nome, idade){
    console.clear();
    console.log(`O CPF: ${cpf} chegou para validação em userService`);
    //tirar depois
    
    //validar tamanho
    if(cpf.length !== 11){
        console.log(cpf.length);
        console.log("Cpf Invalido - Min 11 caracteres!");
        return;
    }

    //validar existencia no sistema

    //armazenar
    armazenarUser(cpf, nome, idade);

    
}

function listarUsersService(){
    return console.log(listarUsersRepository());
}

export { validarCadastro, listarUsersService }

