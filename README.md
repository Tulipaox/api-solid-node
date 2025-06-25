## APP

## RFs (Requisitos Funcionais)

- [] Deve ser possível se cadastrar;
- [] Deve ser possível se autenticar;
- [] Deve ser possível obeter o perfil de um usuário logado;
- [] Deve ser possível obter o número de check-in realiazados pelo usuários logado;
- [] Deve ser possível o usuário buscar academias próximas;
- [] Deve ser possível o usuário buscar academias pelo nome;
- [] Deve ser possível o usuário realizar check-in em uma academia;
- [] Deve ser possível validar o check-in de um usuário;
- [] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [] o usuário não deve poder se cadastrar com um e-mail duplicado;
- [] o usuário nao pode fazer 2 check-ins no mesmo dia;
- [] o usuário não pode fazer check-in se não estiver perto (100m);
- [] O check-in só pode ser validado até 20 minutos após criado;
- [] o check-in só pode ser validado por administradores;
- [] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [] A senha do usáirio precisa esta criptografada;
- [] os dados da aplicação precisam estar persistidos em um banco de dados PostgreSQl;
- [] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [] o usuário deve ser indentificado por um JWT (Json web Token)
