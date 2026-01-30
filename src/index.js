import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;
import qrcode from "qrcode-terminal";
import { handleMessage, handleNewChat } from "./handlers/messageHandler.js";

console.log("🤖 Finance Bot iniciando...\n");

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
client.on("ready", () => {
  console.log("✅ Finance Bot conectado e pronto para uso!");
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
 * Evento: Nova mensagem recebida
 */
client.on("message", async (message) => {
  // Ignorar mensagens de grupos e status
  if (
    message.from.includes("@g.us") ||
    message.from.includes("status@broadcast")
  ) {
    return;
  }

  // Ignorar mensagens do próprio bot
  if (message.fromMe) {
    return;
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
