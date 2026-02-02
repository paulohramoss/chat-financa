import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;
import qrcode from "qrcode-terminal";
import { handleMessage, handleNewChat } from "./handlers/messageHandler.js";

console.log("🤖 Finance Bot iniciando...\n");

// Variável global para armazenar o número do usuário autenticado
let authenticatedUserNumber = null;

/**
 * Função para obter o número do usuário autenticado
 */
export function getAuthenticatedUserNumber() {
  return authenticatedUserNumber;
}

/**
 * Inicializar cliente WhatsApp
 */
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--disable-gpu",
    ],
  },
});

/**
 * Evento: QR Code gerado
 */
client.on("qr", (qr) => {
  console.log("📱 Escaneie o QR Code abaixo com seu WhatsApp:\n");
  qrcode.generate(qr, { small: true });
  console.log(
    "\n💡 Abra o WhatsApp > Menu (⋮) > Aparelhos conectados > Conectar um aparelho\n",
  );
});

/**
 * Evento: Cliente pronto
 */
client.on("ready", async () => {
  // Obter o número do usuário autenticado
  const info = await client.info;
  authenticatedUserNumber = info.wid._serialized;

  console.log("✅ Finance Bot conectado e pronto para uso!");
  console.log(`📱 Seu número: ${authenticatedUserNumber}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("💬 Aguardando mensagens...\n");
});

/**
 * Evento: Cliente autenticado
 */
client.on("authenticated", () => {
  console.log("🔐 Autenticação bem-sucedida!");
});

/**
 * Evento: Falha na autenticação
 */
client.on("auth_failure", (msg) => {
  console.error("❌ Falha na autenticação:", msg);
  process.exit(1);
});

/**
 * Evento: Cliente desconectado
 */
client.on("disconnected", (reason) => {
  console.log("🔌 Cliente desconectado:", reason);
  console.log("Tentando reconectar...");
});

/**
 * Evento: Nova mensagem criada (enviada ou recebida)
 */
client.on("message_create", async (message) => {
  // Ignorar mensagens de grupos, status e newsletters
  if (
    message.from.includes("@g.us") ||
    message.from.includes("status@broadcast") ||
    message.from.includes("@newsletter")
  ) {
    return;
  }

  // Processar APENAS mensagens enviadas pelo próprio usuário
  if (!message.fromMe) {
    return;
  }

  // CRÍTICO: Ignorar mensagens enviadas pelo bot programaticamente
  // Mensagens do bot contêm emojis específicos ou formatação markdown
  const messageBody = message.body || "";
  const botSignatures = [
    "✅ Transação registrada!",
    "🤖 BEM-VINDO AO FINANCE BOT",
    "🤖 *BEM-VINDO AO FINANCE BOT",
    "👋 *Olá! Bem-vindo ao Finance Bot",
    "💰 *SEU SALDO*",
    "📊 *RESUMO",
    "📊 SALDO TOTAL",
    "💰 Resumo Financeiro",
    "❌ Comando não reconhecido",
    "❌ Erro ao",
    "❌ Desculpe",
    "❌ Não consegui entender",
    "Use */saldo* para ver",
    "Use */ajuda* para ver",
    "📝 REGISTRAR TRANSAÇÕES",
    "💰 CONSULTAS RÁPIDAS",
    "🏷️ CATEGORIAS",
    "transações registradas",
    "Para registrar uma transação",
    "━━━━━━━━━━━━━━━━", // Separador usado em todas as mensagens do bot
  ];

  // Se a mensagem contém assinatura do bot, ignorar
  for (const signature of botSignatures) {
    if (messageBody.includes(signature)) {
      console.log(
        `[BOT] Ignorando mensagem do próprio bot: ${messageBody.substring(0, 50)}...`,
      );
      return;
    }
  }

  await handleMessage(client, message);
});

/**
 * Evento: Loading screen
 */
client.on("loading_screen", (percent, message) => {
  console.log(`⏳ Carregando... ${percent}% - ${message}`);
});

/**
 * Tratamento de erros não capturados
 */
process.on("unhandledRejection", (error) => {
  console.error("❌ Erro não tratado:", error);
});

process.on("uncaughtException", (error) => {
  console.error("❌ Exceção não capturada:", error);
  process.exit(1);
});

/**
 * Inicializar cliente
 */
console.log("🔄 Inicializando WhatsApp Web...");
client.initialize();

/**
 * Graceful shutdown
 */
process.on("SIGINT", async () => {
  console.log("\n\n🛑 Encerrando Finance Bot...");
  await client.destroy();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n\n🛑 Encerrando Finance Bot...");
  await client.destroy();
  process.exit(0);
});
