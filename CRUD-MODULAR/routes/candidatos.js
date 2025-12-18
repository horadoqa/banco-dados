const express = require('express');
const router = express.Router();

const { criarCandidato } = require('../controllers/candidatosController');
const { listarCandidatos } = require('../controllers/listarCandidatosController');
const { excluirCandidato } = require('../controllers/excluirCandidatoController');
const { buscarCandidatoPorCpf } = require('../controllers/buscarCandidatoPorCpf');


// Criar candidatos
router.post('/', criarCandidato);

// Listar todos os candidatos
router.get('/', listarCandidatos);

// Buscar candidato pelo CPF
router.get('/cpf/:cpf', buscarCandidatoPorCpf);

// Excluir candidato pelo ID
router.delete('/:id', excluirCandidato);

module.exports = router;
