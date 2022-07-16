import express from 'express';
import {StatusCodes} from 'http-status-codes';

const app = express();
const PORT = process.env.PORT || 3000;
let users = [
    {id: 1, name: 'Rafael Ribeiro', age: 31},
    {id: 2, name: 'Gabriel Custórdio', age: 27},
];

app.use(express.json()); //está criando um midleware pra definir que todas as requests vão enviar objetos no formato json

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/', (request, response) => {
    return response.send('<h1>Trabalhando com Servidor Express. <\h1>');
});
//Atéaqui foi criado o servidor pra rodar na porta 3000 e criou uma rota de get de exemplo pra conseguir acesssar
//a raiz e ter acesso à mensagem do <h1>

//Serão criadas duas rotas:
// Rota 1 - Pega a lista de Usuários
app.get('/users', (request, response) => {
    return response.send(users);
})

//Rota 2 - Selecina um usuário específico
app.get('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const user = users.find(user => {
        return (user.id === Number(userId))
    });
    return response.send(user);
});

//criando endpoint de post
app.post('/users', (request, response) => {
    const newUser = request.body;

    users.push(newUser);
    return response.status(StatusCodes.CREATED).send(newUser);
});

//Criando recurso de put
app.put('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const updatedUser = request.body;
    
    users = users.map(user => {
        if (Number(userId) === user.id) {
            return updatedUser;
        }
        return user;
    });

    return response.send(updatedUser);
});

app.delete('/users/:userId', (request, response) => {
    const userId = request.params.userId;

    users = users.filter((user) => user.id !== Number(userId));

    return response.status(StatusCodes.NO_CONTENT).send();
});