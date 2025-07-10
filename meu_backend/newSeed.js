// seed.js

const mongoose = require('mongoose');
const dadosInstituicoes = require('./courses.json');

// --- CRIAÇÃO DOS NOVOS SCHEMAS (MOLDES) ---

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

const mongoURI = "mongodb+srv://marcello:TK3dzdg6K3KMVXKf@maincluster.3hcozbc.mongodb.net/?retryWrites=true&w=majority&appName=MainCluster";

async function popularBanco() {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB conectado para popular os dados...');

    // Limpa a coleção de instituições para evitar duplicatas
    await Institution.deleteMany({});
    console.log('Instituições antigas removidas.');

    // Insere os novos dados do arquivo JSON
    await Institution.insertMany(dadosInstituicoes);
    console.log('Novas instituições e cursos inseridos com sucesso!');

  } catch (err) {
    console.error('Erro ao popular o banco de dados:', err);
  } finally {
    mongoose.connection.close();
    console.log('Conexão com o MongoDB fechada.');
  }
}

popularBanco();
