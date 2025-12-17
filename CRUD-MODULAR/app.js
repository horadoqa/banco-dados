const express = require('express');
const app = express();
const candidatosRoutes = require('./routes/candidatos');

app.use(express.json());
app.use('/api/candidatos', candidatosRoutes);

// Rota de Healthcheck
app.get('/healthcheck', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'API funcionando normalmente'
  });
});

app.listen(8080, () => {
  console.log('API rodando em http://localhost:8080');
});
