const express = require("express")
const router = express.Router()
const showdown = require("showdown");

const converter = new showdown.Converter();


const empresaRoutes = require("../clients/empresa/empresaRoutes.js")
const adminRoutes = require("../clients/admin/adminRoutes.js")


router.use("/empresa", empresaRoutes)  // Registro - Aluno
router.use("/admin", adminRoutes)  // Registro - Aluno

module.exports = router