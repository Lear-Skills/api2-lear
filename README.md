# API-LEAR



# Rotas da API


## Usuário

| Metodo | Rota     | Descrição |
|--------|-----------------------|------------------------|
| POST   | [/user/register](#adiciona-novo-usuário) | adiciona novo usuário | 
| POST   | [/user/login](#login-no-sistema) | login no sistema |
| PUT    | [/user/update](#atualiza-dados-usuário) | atualiza dados usuário |
| PUT    | [/user/update/password](#atualiza-senha-usuário) | atualiza senha usuário |
| DELETE | [/user/delete](#remove-usuário) | remove usuário |


<br>
<br>

### adiciona novo usuário
---
**Request**
- (POST) `/user/register`
+  Body (application/json)

        {
            "name": "fulano",
            "email": "fulano@detal.com",
            "phone": "11999887766",
            "password": "123Qwerty",
            "confirmPassword": "123Qwerty"
        }

<br>

**Response**
| Status | Descrição |
|---|---|
| 200 | Sucesso |
| 400 | Validação formulário |
| 500 | Erro ao salvar |

**Body (json)**
```
{
    "messenge": "uma mensagem na resposta"
}
```



<br>
<br>

### login no sistema
---
**Request**
- (POST) `/user/login`
+  Body (application/json)

        {
            "email": "fulano@detal.com",
            "password": "123Qwerty"
        }

<br>

**Response**
| Status | Descrição |
|---|---|
| 200 | Sucesso |
| 400 | Validação formulário |
| 500 | Erro ao salvar |

**Body (json)**
```
{
    "messenge": "uma mensagem na resposta"
}
```


<br>
<br>

### atualiza dados usuário
---
**Request**
- (PUT) `/user/update`
+  Body (application/json)

        {
            "name": "fulano",
            "email": "fulano@detal.com",
            "phone": "11999887766"
        }

<br>

**Response**
| Status | Descrição |
|---|---|
| 200 | Sucesso |
| 400 | Validação formulário |
| 500 | Erro ao salvar |

**Body (json)**
```
{
    "messenge": "uma mensagem na resposta"
}
```


<br>
<br>

### atualiza senha usuário
---
**Request**
- (PUT) `/user/update/password`
+  Body (application/json)

        {
            "email": "fulano@detal.com",
            "password": "123Qwerty",
            "newPassword": "456Asdfg",
            "confirmPassword": "456Asdfg"
        }

<br>

**Response**
| Status | Descrição |
|---|---|
| 200 | Sucesso |
| 400 | Validação formulário |
| 500 | Erro ao salvar |

**Body (json)**
```
{
    "messenge": "uma mensagem na resposta"
}
```


<br>
<br>

### remove usuário
---
**Request**
- (DELETE) `/user/delete`
+  Body (application/json)

        {
            "user_Id": "1234"
        }

<br>

**Response**
| Status | Descrição |
|---|---|
| 200 | Sucesso |
| 500 | Erro ao deletar |

**Body (json)**
```
{
    "messenge": "uma mensagem na resposta"
}
```
