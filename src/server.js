require("dotenv").config({ path: "./variable.env" });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const request = require("request");
const net = require("net");

const routes = require("./routes/routes.js");
const server = express();

server.use(bodyParser.json());
server.use(cors());
server.use("/siteCardapio", routes);

let publicIP;

// Verifica se a porta está livre
function portaEstaLivre(porta) {
  return new Promise((resolve) => {
    const tester = net.createServer()
      .once("error", (err) => {
        if (err.code === "EADDRINUSE") resolve(false);
        else resolve(false);
      })
      .once("listening", () => {
        tester.close(() => resolve(true));
      })
      .listen(porta);
  });
}

// Encontra a próxima porta livre
async function encontrarPortaDisponivel(portaInicial = 8080, limite = 8100) {
  for (let porta = portaInicial; porta <= limite; porta++) {
    const livre = await portaEstaLivre(porta);
    if (livre) return porta;
  }
  throw new Error("Nenhuma porta disponível encontrada.");
}

// Obtém IP público e inicia servidor
request("https://api64.ipify.org?format=json", async (error, response, body) => {
  if (!error && response.statusCode === 200) {
    const data = JSON.parse(body);
    publicIP = data.ip;
  } else {
    console.error("Erro ao obter IP público:", error);
    publicIP = "localhost";
  }

  try {
    const portaDesejada = parseInt(process.env.PORT) || 8080;
    const porta = await encontrarPortaDisponivel(portaDesejada);

    startServer(porta);
  } catch (err) {
    console.error("Erro ao iniciar servidor:", err.message);
  }
});

// Inicia servidor apenas com porta confirmada como livre
function startServer(porta) {
  server.listen(porta, () => {
    const agora = new Date();
    const horaBrasil = agora.toLocaleString("pt-BR", {
      timeZone: "America/Recife",
    });

    console.log(`Servidor rodando em http://${publicIP}:${porta}/siteCardapio, iniciado às ${horaBrasil}`);
  });
}


