const { body, param } = require('express-validator');

module.exports = {

    validation: () => {
        return new Promise((resolve, reject) => {

            const registerValidation = [
                body('nome')
                    .notEmpty().withMessage('O nome não pode estar vazio')
                    .isString().withMessage('O nome deve ser uma string')
                    .isLength({ min: 3, max: 60 }).withMessage('O nome deve ter entre 3 e 60 caracteres'),
                body('sobrenome')
                    .notEmpty().withMessage('O sobrenome não pode estar vazio')
                    .isString().withMessage('O sobrenome deve ser uma string')
                    .isLength({ min: 3, max: 60 }).withMessage('O sobrenome deve ter entre 3 e 60 caracteres'),
                body('email')
                    .notEmpty().withMessage('O e-mail não pode estar vazio')
                    .isString().withMessage('O e-mail deve ser uma string')
                    .isEmail().withMessage('O e-mail deve ser um endereço de e-mail válido')
                    .isLength({ min: 3, max: 60 }).withMessage('O e-mail deve ter entre 3 e 60 caracteres'),
                body('senha')
                    .notEmpty().withMessage('A senha não pode estar vazia')
                    .isString().withMessage('A senha deve ser uma string')
                    .isLength({ min: 8 }).withMessage('A senha deve ter no mínimo 8 caracteres')
                    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('A senha deve conter ao menos um caractere especial'),
                body('cpf')
                    .notEmpty().withMessage('O CPF não pode estar vazio')
                    .isString().withMessage('O CPF deve ser uma string')
                    .isLength({ min: 11, max: 11 }).withMessage('O CPF deve conter 11 caracteres')
                    .matches(/^\d+$/).withMessage('O CPF deve conter apenas números'),
                body('telefone_contato')
                    .notEmpty().withMessage('O telefone é obrigatório')
                    .matches(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/)
                    .withMessage('Telefone inválido. Ex: (11) 91234-5678'),
                body('nivel')
                    .notEmpty().withMessage('O nivel é obrigatório')
                    .isString().withMessage('Nivel deve ser uma string')
                    .isIn(['1', '2', '3']).withMessage('Nível inválido'),
            ];

            resolve(registerValidation);
        });
    }
    
}