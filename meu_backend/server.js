// server.js


require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

if(!MONGO_URI){
  console.error("Erro: A Variavel MONGO_URI Não foi encontrada no arquivo .env")
}

const path = require('path')
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '..')))

// 1. Crie o Schema de ROUTE-MAP
const RouteMapSchema = new mongoose.Schema({
  "routeName": { type: String },
  "iframeUrl": { type: String }
}, { _id: false }); // _id false para evitar criação automática de _id nested

// 2. Crie o Schema de INGRESS MODE
const IngressModeSchema = new mongoose.Schema({
  mode: { type: String },
  text: { type: String }
}, { _id: false });

// 3. Crie o Schema de COURSE
const CourseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  coursePeriod: { type: String },
  courseTime: { type: String },
  subjects: [String]
}, { _id: false });

// 4. Crie o Schema de INSTITUTION
const InstitutionSchema = new mongoose.Schema({
  institutionName: { type: String, required: true },
  conciseInstitutionName: { type: String },
  institutionImageURL: { type: String },
  backgroundImage: { type: String },
  verified: { type: Boolean },
  "routeMaps": [RouteMapSchema],
  ingressModes: [IngressModeSchema],
  courses: [CourseSchema]
});

// 5. Crie o Modelo a partir do Schema da Instituição
const Institution = mongoose.model('Institution', InstitutionSchema);

// Conexão com o Banco de Dados

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB conectado com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// --- NOVAS ROTAS DA API ---

// Rota para BUSCAR TODAS as instituições
app.get('/institutions', async (req, res) => {
  try {
    const institutions = await Institution.find(); // Busca todas as instituições
    res.json(institutions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para BUSCAR UMA instituição pelo seu ID
app.get('/institutions/:id', async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id); // Busca pelo ID passado na URL
    if (!institution) {
      return res.status(404).json({ message: 'Instituição não encontrada' });
    }
    res.json(institution);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/addInstitution', async (req, res) => {
  try {
    const newInstitution = new Institution(req.body);
    await newInstitution.save();
    res.json({ message: 'Instituição adicionada com sucesso!' });
  } catch (error) {
    console.error('Erro ao adicionar instituição:', error);
    res.status(500).json({ error: 'Erro ao adicionar instituição' });
  }
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});