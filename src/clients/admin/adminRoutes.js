const express = require("express")
const router = express.Router()

const adminController = require("./adminController.js")
const authAdminMiddleware = require("./adminAuthMiddleware.js");
// const authMiddleware = require("../clients/auth/authMiddleware.js")  // Middleware de autenticação

// router.post("/login", adminController.login)  // Login - Aluno
router.post("/register", adminController.register)  // Registro - Aluno
// router.post("/confirm-email", adminController.confirmEmail); // Confirmação de e-mail - Aluno
// router.put('/update', authMiddleware, adminController.update);  // Update - Aluno
// router.post("/forgot-pass", adminController.forgotPass)  // Esqueci senha - Aluno
// router.post("/reset-pass", adminController.resetPass)  // Resetar senha - Aluno

module.exports = router