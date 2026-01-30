# 🤖 WhatsApp Finance Bot

Um chatbot completo de finanças pessoais integrado ao WhatsApp que permite registrar despesas e receitas através de mensagens simples e gerar relatórios detalhados.

## 📋 Características

- 💬 **Registro Natural**: Registre transações com mensagens simples como "mercado 50 reais"
- 🤖 **Auto-Categorização**: O bot detecta automaticamente a categoria e tipo da transação
- 📊 **Relatórios Completos**: Relatórios diários, semanais e mensais com gráficos
- 💰 **Controle de Saldo**: Acompanhe seu saldo em tempo real
- 📈 **Gráficos Visuais**: Visualize seus gastos com gráficos de pizza, barras e linhas
- 🎯 **Fácil de Usar**: Interface conversacional intuitiva via WhatsApp

## 🚀 Instalação

### Pré-requisitos

- Node.js 18+ instalado
- Conta no Firebase (gratuita)
- WhatsApp instalado no celular

### Passo 1: Clonar o Projeto

```bash
cd "c:\Users\Flexpro\Desktop\chat financa"
```

### Passo 2: Instalar Dependências

```bash
npm install
```

### Passo 3: Configurar Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto (ou use um existente)
3. Vá em **Project Settings** > **Service Accounts**
4. Clique em **Generate New Private Key**
5. Baixe o arquivo JSON com as credenciais

### Passo 4: Configurar Variáveis de Ambiente

1. Copie o arquivo de exemplo:

   ```bash
   copy .env.example .env
   ```

2. Abra o arquivo `.env` e preencha com as credenciais do Firebase:

   ```env
   FIREBASE_PROJECT_ID=seu-projeto-id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nsua-chave-privada\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk@seu-projeto.iam.gserviceaccount.com
   ```

   > 💡 **Dica**: Copie os valores diretamente do arquivo JSON baixado no Passo 3.

### Passo 5: Iniciar o Bot

```bash
npm start
```

### Passo 6: Conectar ao WhatsApp

1. O bot exibirá um QR Code no terminal
2. Abra o WhatsApp no celular
3. Vá em **Menu (⋮)** > **Aparelhos conectados** > **Conectar um aparelho**
4. Escaneie o QR Code
5. Aguarde a mensagem "✅ Finance Bot conectado e pronto para uso!"

## 📱 Como Usar

### Registrar Transações

Basta enviar uma mensagem natural para o bot:

```
mercado 50 reais
gastei 20 com uber
recebi salário 3000
compras 150
```

O bot irá:

- ✅ Detectar o valor
- ✅ Identificar se é despesa ou receita
- ✅ Categorizar automaticamente
- ✅ Confirmar o registro

### Comandos Disponíveis

#### 💰 Consultas Rápidas

- `/saldo` - Ver saldo atual
- `/hoje` - Resumo do dia
- `/semana` - Resumo da semana
- `/mes` ou `/mês` - Resumo do mês
- `/listar` - Últimas 10 transações
- `/listar 20` - Últimas 20 transações

#### 📊 Relatórios

- `/relatorio` - Relatório mensal com gráfico
- `/relatorio semana` - Relatório semanal
- `/relatorio categoria` - Por categoria

#### 🏷️ Categorias

- `/categorias` - Ver todas as categorias disponíveis

#### ℹ️ Ajuda

- `/ajuda` - Mostrar todos os comandos

## 🎯 Categorias Disponíveis

### 🔴 Despesas

- 🍔 Alimentação (mercado, restaurante, lanche)
- 🚗 Transporte (uber, gasolina, ônibus)
- 🏥 Saúde (farmácia, médico, consulta)
- 📚 Educação (curso, livro, escola)
- 🎮 Lazer (cinema, jogo, streaming)
- 🏠 Moradia (aluguel, contas, internet)
- 👕 Vestuário (roupa, sapato)
- 📦 Outros

### 🟢 Receitas

- 💰 Salário
- 💻 Freelance
- 📈 Investimentos
- 🎁 Presentes
- 📦 Outros

## 📊 Exemplos de Relatórios

### Relatório Mensal

```
📊 RELATÓRIO MENSAL
📅 janeiro de 2026

🟢 Receitas: R$ 5.000,00
🔴 Despesas: R$ 3.200,00
━━━━━━━━━━━━━━━━
✅ Saldo: R$ 1.800,00

📝 Total de transações: 45
📉 Média diária: R$ 106,67

━━━━━━━━━━━━━━━━
Top 5 Categorias (Despesas):

1. 🍔 alimentação
   R$ 800,00 (25.0%)
2. 🚗 transporte
   R$ 600,00 (18.8%)
...
```

_+ Gráfico de pizza anexado_

## 🛠️ Estrutura do Projeto

```
chat financa/
├── src/
│   ├── index.js                 # Entrada principal
│   ├── config/
│   │   └── firebase.js          # Configuração Firebase
│   ├── handlers/
│   │   └── messageHandler.js    # Handler de mensagens
│   ├── commands/
│   │   ├── helpCommand.js       # Comando de ajuda
│   │   ├── balanceCommand.js    # Comando de saldo
│   │   ├── reportCommand.js     # Comando de relatórios
│   │   ├── listCommand.js       # Comando de listagem
│   │   └── categoriesCommand.js # Comando de categorias
│   ├── services/
│   │   ├── transactionService.js # Serviço de transações
│   │   ├── categoryService.js    # Serviço de categorias
│   │   └── reportService.js      # Serviço de relatórios
│   └── utils/
│       ├── messageParser.js      # Parser de mensagens
│       ├── formatters.js         # Formatadores
│       ├── validators.js         # Validadores
│       └── chartGenerator.js     # Gerador de gráficos
├── package.json
├── .env
├── .env.example
└── README.md
```

## 🔒 Segurança

- ✅ Variáveis de ambiente para credenciais sensíveis
- ✅ Firebase com autenticação
- ✅ Dados isolados por usuário
- ✅ `.gitignore` configurado para proteger credenciais

## 🐛 Troubleshooting

### QR Code não aparece

- Certifique-se de que o Node.js está instalado corretamente
- Verifique se todas as dependências foram instaladas (`npm install`)

### Erro ao conectar no Firebase

- Verifique se as credenciais no `.env` estão corretas
- Confirme que o projeto existe no Firebase Console
- Verifique se o Firestore está ativado no projeto

### Bot não responde

- Verifique se o bot está rodando (sem erros no terminal)
- Confirme que a mensagem foi enviada para o número correto
- Verifique os logs no terminal para identificar erros

### Erro ao gerar gráficos

- Certifique-se de que há transações registradas
- Verifique se o `chartjs-node-canvas` foi instalado corretamente

## 📝 Notas Importantes

- O bot usa WhatsApp Web, então mantenha o terminal aberto enquanto estiver em uso
- A primeira vez que você rodar, será necessário escanear o QR Code
- As sessões ficam salvas na pasta `.wwebjs_auth/`
- Para desconectar, pressione `Ctrl+C` no terminal

## 🎓 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **whatsapp-web.js** - Integração com WhatsApp Web
- **Firebase/Firestore** - Banco de dados em nuvem
- **Chart.js** - Geração de gráficos
- **Moment.js** - Manipulação de datas

## 📄 Licença

MIT

## 🤝 Suporte

Para dúvidas ou problemas:

1. Verifique a seção de Troubleshooting acima
2. Revise os logs no terminal
3. Teste com o comando `/ajuda` no WhatsApp

---

**Desenvolvido com ❤️ para facilitar o controle de suas finanças pessoais**
