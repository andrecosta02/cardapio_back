const jwt = require('jsonwebtoken');
// const redisClient = require('../../redisClient'); // Descomente se for usar blacklist de token com Redis

// Certifique-se de ter JWT_SECRET_ADMIN em suas variáveis de ambiente (arquivo .env)
// Ex: JWT_SECRET_ADMIN=seuSegredoSuperSecretoParaAdmin
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;

const authAdminMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            statusCode: 401,
            message: 'Acesso negado. Token não fornecido ou mal formatado.',
            errors: [{ msg: 'Token de autenticação do tipo Bearer é esperado no cabeçalho Authorization.' }]
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            statusCode: 401,
            message: 'Acesso negado. Token não fornecido.',
            errors: [{ msg: 'Token não pode estar vazio.' }]
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET_ADMIN);

        // Verifica se o tipo de usuário no token é 'admin'
        if (decoded.type !== 'admin') {
            return res.status(403).json({
                statusCode: 403,
                message: 'Acesso negado. Permissões insuficientes.',
                errors: [{ msg: 'Este token não pertence a um administrador.' }]
            });
        }

        // OPCIONAL: Verificar se o token está na blacklist (para logout)
        // const isBlacklisted = await redisClient.get(`blacklist_${token}`);
        // if (isBlacklisted) {
        //     return res.status(401).json({
        //         statusCode: 401,
        //         message: 'Acesso negado. Token inválido/expirado (logout).',
        //         errors: [{ msg: 'Token foi invalidado.' }]
        //     });
        // }

        // Anexa os dados do admin decodificados ao objeto req para uso posterior nos controllers
        req.admin = decoded; // ou req.user = decoded; conforme sua preferência

        next(); // Se tudo estiver OK, passa para a próxima função (controller da rota)

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                statusCode: 401,
                message: 'Acesso negado. Token expirado.',
                errors: [{ msg: 'Seu token de acesso expirou. Por favor, faça login novamente.' }]
            });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                statusCode: 401,
                message: 'Acesso negado. Token inválido.',
                errors: [{ msg: 'O token fornecido é inválido ou malformado.' }]
            });
        }
        // Outros erros
        console.error("Erro no middleware de autenticação admin:", error);
        return res.status(500).json({
            statusCode: 500,
            message: 'Erro interno no servidor ao validar o token.',
            errors: [{ msg: 'Não foi possível processar sua autenticação.' }]
        });
    }
};

module.exports = authAdminMiddleware;