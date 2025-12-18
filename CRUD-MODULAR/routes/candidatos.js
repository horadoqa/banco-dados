const express = require('express');
const router = express.Router();

const { criarCandidato } = require('../controllers/candidatosController');
const { listarCandidatos } = require('../controllers/listarCandidatosController');
const { excluirCandidato } = require('../controllers/excluirCandidatoController');
const { buscarCandidatoPorId } = require('../controllers/buscarCandidatoPorId');

// Criar candidatos
router.post('/', criarCandidato);

// Listar todos os candidatos
router.get('/', listarCandidatos);

// Buscar candidato pelo ID
router.get('/:id', buscarCandidatoPorId);

// Excluir candidato pelo ID
router.delete('/:id', excluirCandidato);

module.exports = router;
