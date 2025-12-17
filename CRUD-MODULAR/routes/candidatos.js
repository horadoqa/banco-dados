const express = require('express');
const router = express.Router();

const { criarCandidato } = require('../controllers/candidatosController');
const { listarCandidatos } = require('../controllers/listarCandidatosController');
const { excluirCandidato } = require('../controllers/excluirCandidatoController');

// Criar candidatos
router.post('/', criarCandidato);

// Listar todos os candidatos
router.get('/', listarCandidatos);

// Excluir candidato pelo ID
router.delete('/:id', excluirCandidato);

module.exports = router;
