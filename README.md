
# Blogs API

Neste projeto você vai encontrar um CRUD para os conteúdos de um blog e foi feito utilizando o modelo MSC, Model, Service e Controller.



## Stack utilizada

**Back-end:** Node, Express ,Mysql, Docker e JWT


## Documentação da API

#### Realiza Login checkando os dados do usúario no banco e retornando um token JWT
```http
  POST /login
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. Email Válido |
`password` | `string` | **Obrigatório**. Password Válido |


#### Realiza cadastro de um novo USER
```http
  POST /user
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `displayName` | `string` | **Obrigatório**. DisplayName Válido |
`email` | `string` | **Obrigatório**. Email Válido |
`password` | `string` | **Obrigatório**. Password Válido |
`image` | `string` | **Opcional**. URL da Imagem |

#### Realiza a busca de um USER por ID
```http
  GET /user/${id}
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório**. ID do usúario |

#### Realiza a busca de todos os Users cadastrados
```http
  GET /user
```

#### Realiza cadastro de uma nova CATEGORIA
```http
  POST /categories
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Nome da categoria |

#### Realiza a busca de todos as CATEGORIAS cadastradas
```http
  GET /categories
```

#### Realiza cadastro de uma nova POSTAGEM
```http
  POST /post
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `tittle` | `string` | **Obrigatório**. Título da Postagem |
| `content` | `string` | **Obrigatório**. Conteúdo da Postagem |
| `categoryIds` | `object` | **Obrigatório**. Array de números de cada categoria |

#### Realiza a busca de todos as POSTAGENS
```http
  GET /post
```

#### Realiza a busca de uma POSTAGEM por ID
```http
  GET /post/${id}
```
#### Realiza a edição de uma POSTAGEM por ID
```http
  PUT /post
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `tittle` | `string` | **Obrigatório**. Título da Postagem |
| `content` | `string` | **Obrigatório**. Conteúdo da Postagem |

#### Realiza a remoção de uma POSTAGEM por ID
```http
  DELETE /post/${id}
```




