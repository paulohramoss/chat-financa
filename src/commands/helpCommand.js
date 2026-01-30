/**
 * Comando de ajuda - lista todos os comandos disponíveis
 */
export function getHelpMessage() {
  let message = "🤖 *BEM-VINDO AO FINANCE BOT!*\n\n";
  message +=
    "Gerencie suas finanças pelo WhatsApp de forma simples e rápida!\n\n";

  message += "━━━━━━━━━━━━━━━━\n";
  message += "*📝 REGISTRAR TRANSAÇÕES*\n\n";
  message += "Basta enviar uma mensagem natural:\n";
  message += '• "mercado 50 reais"\n';
  message += '• "gastei 20 com uber"\n';
  message += '• "recebi salário 3000"\n';
  message += '• "compras 150"\n\n';

  message += "━━━━━━━━━━━━━━━━\n";
  message += "*💰 CONSULTAS RÁPIDAS*\n\n";
  message += "*/saldo* - Ver saldo atual\n";
  message += "*/hoje* - Resumo do dia\n";
  message += "*/semana* - Resumo da semana\n";
  message += "*/mes* ou */mês* - Resumo do mês\n";
  message += "*/listar* - Últimas 10 transações\n";
  message += "*/listar 20* - Últimas 20 transações\n\n";

  message += "━━━━━━━━━━━━━━━━\n";
  message += "*📊 RELATÓRIOS*\n\n";
  message += "*/relatorio* - Relatório mensal com gráfico\n";
  message += "*/relatorio semana* - Relatório semanal\n";
  message += "*/relatorio categoria* - Por categoria\n\n";

  message += "━━━━━━━━━━━━━━━━\n";
  message += "*🏷️ CATEGORIAS*\n\n";
  message += "*/categorias* - Ver todas as categorias\n\n";

  message += "━━━━━━━━━━━━━━━━\n";
  message += "*ℹ️ OUTROS*\n\n";
  message += "*/ajuda* - Mostrar esta mensagem\n\n";

  message +=
    "💡 *Dica:* O bot detecta automaticamente se é despesa ou receita!\n";

  return message;
}

/**
 * Obter mensagem de boas-vindas
 */
export function getWelcomeMessage() {
  let message = "👋 *Olá! Bem-vindo ao Finance Bot!*\n\n";
  message +=
    "Eu vou te ajudar a controlar suas finanças pessoais de forma fácil e rápida!\n\n";
  message += "💬 Para registrar uma transação, basta enviar:\n";
  message += '• "mercado 50 reais"\n';
  message += '• "recebi salário 3000"\n\n';
  message += "📊 Use */ajuda* para ver todos os comandos disponíveis.\n";

  return message;
}
