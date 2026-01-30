# 🚀 Guia de Início Rápido

## ⚡ Setup em 5 Minutos

### 1️⃣ Instalar Dependências (1 min)

```bash
cd "c:\Users\Flexpro\Desktop\chat financa"
npm install
```

### 2️⃣ Configurar Firebase (2 min)

1. Acesse: https://console.firebase.google.com/
2. Crie um projeto novo
3. Ative o **Firestore Database** (modo de teste)
4. Vá em **Project Settings** > **Service Accounts**
5. Clique em **Generate New Private Key**
6. Baixe o arquivo JSON

### 3️⃣ Configurar .env (1 min)

```bash
copy .env.example .env
notepad .env
```

Cole as credenciais do Firebase:

```env
FIREBASE_PROJECT_ID=seu-projeto-123
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQI...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc@seu-projeto.iam.gserviceaccount.com
```

> 💡 **Dica**: Copie do arquivo JSON baixado no passo 2

### 4️⃣ Iniciar o Bot (1 min)

```bash
npm start
```

### 5️⃣ Conectar WhatsApp (30 seg)

1. QR Code aparecerá no terminal
2. Abra WhatsApp > **⋮ Menu** > **Aparelhos conectados**
3. Escaneie o QR Code
4. Pronto! ✅

---

## 📱 Teste Rápido

Envie para o bot:

```
/ajuda
```

Depois teste registrar uma transação:

```
mercado 50 reais
```

Veja o saldo:

```
/saldo
```

---

## 🎯 Próximos Passos

1. Explore os comandos com `/ajuda`
2. Registre algumas transações de teste
3. Gere um relatório com `/relatorio`
4. Veja a documentação completa no [README.md](README.md)

---

## ⚠️ Problemas Comuns

### QR Code não aparece

```bash
npm install
npm start
```

### Erro no Firebase

- Verifique se copiou corretamente as credenciais
- Certifique-se de que o Firestore está ativado

### Bot não responde

- Verifique se está rodando sem erros
- Confirme que escaneou o QR Code

---

**🎉 Tudo pronto! Comece a controlar suas finanças agora!**
