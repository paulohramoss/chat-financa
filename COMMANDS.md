# 📖 Comandos do Finance Bot

Referência completa de todos os comandos disponíveis no bot.

## 📝 Registro de Transações

### Formato Natural

Não é necessário usar comandos especiais. Basta enviar mensagens como:

```
mercado 50 reais
gastei 20 com uber
recebi salário 3000
compras 150
paguei 80 na farmácia
freelance 500
```

### Como Funciona

O bot analisa sua mensagem e extrai:

- **Valor**: Qualquer número mencionado (ex: 50, 20.50, R$ 100)
- **Tipo**: Detecta automaticamente se é despesa ou receita
  - Palavras como "gastei", "paguei", "comprei" = Despesa
  - Palavras como "recebi", "ganho", "salário" = Receita
- **Categoria**: Detecta com base em palavras-chave
  - "mercado", "supermercado" = Alimentação
  - "uber", "taxi", "gasolina" = Transporte
  - E assim por diante...

### Confirmação

Após registrar, você receberá uma confirmação:

```
✅ Transação registrada!

🔴 Despesa
💵 Valor: R$ 50,00
📝 Descrição: mercado
🍔 Categoria: alimentação

Use /saldo para ver seu saldo atualizado.
```

---

## 💰 Comandos de Consulta

### `/saldo`

Mostra seu saldo atual.

**Exemplo:**

```
/saldo
```

**Resposta:**

```
💰 SEU SALDO

📅 janeiro de 2026
🟢 Receitas: R$ 5.000,00
🔴 Despesas: R$ 3.200,00
━━━━━━━━━━━━━━━━
✅ Saldo: R$ 1.800,00

━━━━━━━━━━━━━━━━
📊 SALDO TOTAL

✅ R$ 1.800,00
📝 45 transações registradas
```

---

### `/hoje`

Resumo das transações do dia atual.

**Exemplo:**

```
/hoje
```

**Resposta:**

```
📊 RELATÓRIO DIÁRIO
📅 30/01/2026

🟢 Receitas: R$ 0,00
🔴 Despesas: R$ 120,00
━━━━━━━━━━━━━━━━
⚠️ Saldo: R$ -120,00

📝 Total de transações: 3
```

---

### `/semana`

Resumo da semana atual.

**Exemplo:**

```
/semana
```

**Resposta:**

- Mensagem com resumo financeiro
- Gráfico de barras (Receitas vs Despesas)

---

### `/mes` ou `/mês`

Resumo do mês atual.

**Exemplo:**

```
/mes
```

**Resposta:**

- Mensagem com resumo financeiro completo
- Top 5 categorias de despesas
- Média diária de gastos
- Gráfico de pizza por categoria

---

### `/listar [quantidade]`

Lista as últimas transações.

**Exemplos:**

```
/listar           # Últimas 10 transações
/listar 5         # Últimas 5 transações
/listar 20        # Últimas 20 transações
```

**Resposta:**

```
📋 ÚLTIMAS 5 TRANSAÇÕES

1. 🔴 R$ 50,00
   🍔 mercado
   📅 Hoje
   🏷️ alimentação

2. 🔴 R$ 20,00
   🚗 uber
   📅 Hoje
   🏷️ transporte

...
```

**Nota:** Máximo de 100 transações por vez.

---

## 📊 Comandos de Relatórios

### `/relatorio` ou `/relatório`

Gera relatório mensal completo com gráfico.

**Exemplo:**

```
/relatorio
```

**Saída:**

- Resumo financeiro do mês
- Top 5 categorias de despesas
- Gráfico de pizza por categoria

---

### `/relatorio semana`

Gera relatório semanal com gráfico.

**Exemplo:**

```
/relatorio semana
```

**Saída:**

- Resumo financeiro da semana
- Gastos por categoria
- Gráfico de barras

---

### `/relatorio categoria`

Relatório detalhado por categoria.

**Exemplo:**

```
/relatorio categoria
```

**Resposta:**

```
📊 RELATÓRIO POR CATEGORIA
📅 janeiro de 2026

1. 🍔 alimentação 🔴
   R$ 800,00
   15 transação(ões)

2. 🚗 transporte 🔴
   R$ 600,00
   12 transação(ões)

...
```

**Saída:**

- Lista completa de categorias
- Total gasto por categoria
- Número de transações
- Gráfico de pizza

---

## 🏷️ Comandos de Categorias

### `/categorias`

Lista todas as categorias disponíveis.

**Exemplo:**

```
/categorias
```

**Resposta:**

```
🏷️ CATEGORIAS DISPONÍVEIS

🔴 Despesas:
🍔 alimentação
🚗 transporte
🏥 saúde
📚 educação
🎮 lazer
🏠 moradia
👕 vestuário
📦 outros

🟢 Receitas:
💰 salário
💻 freelance
📈 investimentos
🎁 presentes
📦 outros

━━━━━━━━━━━━━━━━
💡 O bot detecta automaticamente a categoria com base na descrição!
```

---

## ℹ️ Comandos de Ajuda

### `/ajuda` ou `/help`

Mostra a mensagem de ajuda completa com todos os comandos.

**Exemplo:**

```
/ajuda
```

---

### `/start`, `/inicio`, `/começar`

Mensagem de boas-vindas ao bot.

**Exemplo:**

```
/start
```

---

## 🎯 Dicas de Uso

### 1. Seja Natural

Não precisa se preocupar com formato exato:

- ✅ "mercado 50 reais"
- ✅ "mercado R$ 50"
- ✅ "gastei 50 no mercado"
- ✅ "50 reais mercado"

Todos funcionam!

### 2. Palavras-Chave para Receitas

Use palavras como:

- "recebi"
- "salário"
- "ganho"
- "freelance"

Exemplo: `recebi 3000 de salário`

### 3. Palavras-Chave para Despesas

Use palavras como:

- "gastei"
- "paguei"
- "comprei"
- Ou apenas mencione o item

Exemplo: `gastei 50 no uber`

### 4. Auto-Categorização

O bot categoriza automaticamente. Palavras-chave:

- **Alimentação**: mercado, restaurante, lanche, comida
- **Transporte**: uber, taxi, gasolina, ônibus
- **Saúde**: farmácia, médico, consulta
- **Educação**: curso, livro, escola
- **Lazer**: cinema, jogo, netflix
- **Moradia**: aluguel, água, luz, internet

### 5. Verificação Rápida

Após registrar várias transações, use:

```
/hoje
```

Para verificar o resumo do dia.

---

## 📊 Tipos de Gráficos

### Gráfico de Pizza

- Usado em relatórios mensais e por categoria
- Mostra distribuição percentual de gastos

### Gráfico de Barras

- Usado em relatórios semanais
- Compara receitas vs despesas

### Gráfico de Linha

- Usado em relatórios personalizados
- Mostra evolução ao longo do tempo

---

## ❓ Perguntas Frequentes

### O bot entende valores com vírgula?

Sim! Tanto "50,50" quanto "50.50" funcionam.

### Posso editar uma transação?

Atualmente não, mas você pode deletar e criar uma nova.

### O bot funciona em grupos?

Não, apenas em conversas individuais para manter privacidade.

### Os dados ficam salvos?

Sim! Tudo fica salvo no Firebase/Firestore.

### Preciso usar comandos toda vez?

Não! Para registrar transações, basta mandar a mensagem natural.

---

**💡 Lembre-se**: Use `/ajuda` a qualquer momento para ver os comandos principais!
