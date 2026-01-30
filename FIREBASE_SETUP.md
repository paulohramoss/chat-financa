# 🔥 Configuração do Firebase Admin SDK

## ⚠️ Diferença Importante

Você forneceu a configuração do **Firebase Client SDK**, mas o bot precisa do **Firebase Admin SDK**:

- **Client SDK**: Para apps web/frontend (React, Vue, etc.)
- **Admin SDK**: Para apps Node.js/servidor ← **É isso que precisamos!**

## 📝 Passo a Passo

### 1. Acessar o Console do Firebase

Acesse diretamente:

```
https://console.firebase.google.com/project/notas-homologacoes/settings/serviceaccounts/adminsdk
```

### 2. Gerar Nova Chave Privada

1. Clique no botão **"Generate New Private Key"** (Gerar nova chave privada)
2. Confirme clicando em **"Generate Key"**
3. Um arquivo JSON será baixado automaticamente (algo como `notas-homologacoes-firebase-adminsdk-xxxxx.json`)

### 3. Configurar o arquivo .env

O arquivo JSON terá este formato:

```json
{
  "type": "service_account",
  "project_id": "notas-homologacoes",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIB...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@notas-homologacoes.iam.gserviceaccount.com",
  "client_id": "123456789",
  ...
}
```

### 4. Copiar os Valores para o .env

Abra o arquivo `.env` que acabei de criar e preencha:

```env
FIREBASE_PROJECT_ID=notas-homologacoes
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIB...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@notas-homologacoes.iam.gserviceaccount.com
```

**IMPORTANTE:**

- A `FIREBASE_PRIVATE_KEY` deve estar entre aspas duplas
- Mantenha os `\n` na chave privada (não remova!)
- Copie a chave privada COMPLETA incluindo `-----BEGIN` e `-----END`

### 5. Ativar o Firestore

1. No console do Firebase, vá em **Firestore Database**
2. Clique em **"Create database"** se ainda não existir
3. Escolha **"Start in test mode"** para começar (você pode ajustar as regras depois)
4. Escolha a localização (recomendo `southamerica-east1` para Brasil)

## ✅ Exemplo Completo do .env

Aqui está um exemplo de como deve ficar (com dados fictícios):

```env
FIREBASE_PROJECT_ID=notas-homologacoes
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7W...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc123@notas-homologacoes.iam.gserviceaccount.com
BOT_LANGUAGE=pt-BR
```

## 🚀 Testar a Configuração

Depois de configurar, teste com:

```bash
npm start
```

Se tudo estiver correto, você verá o QR code do WhatsApp aparecendo no terminal!

## ❓ Problemas Comuns

### Erro: "Error: Cannot parse"

- Verifique se a `PRIVATE_KEY` está entre aspas duplas
- Certifique-se de que não removeu os `\n`

### Erro: "Invalid project ID"

- Confirme que o `project_id` está correto (notas-homologacoes)

### Erro: "Permission denied"

- Verifique se o Firestore está ativado no projeto
- Confirme que as credenciais foram copiadas corretamente

## 🔒 Segurança

⚠️ **NUNCA compartilhe ou faça commit do arquivo `.env`!**

O arquivo `.gitignore` já está configurado para proteger suas credenciais.
