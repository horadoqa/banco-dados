const express = require('express');
const router = express.Router();

const { criarCandidato } = require('../controllers/candidatosController');
const { listarCandidatos } = require('../controllers/listarCandidatosController');

// Criar candidatos
router.post('/', criarCandidato);

// Listar todos os candidatos
router.get('/', listarCandidatos);

module.exports = router;
