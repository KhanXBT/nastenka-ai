import express from 'express';
import cors from 'cors';
import { getProjectGrounding, saveSynapse } from './db.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/synapses/:project', (req, res) => {
  const projectName = req.params.project;
  const data = getProjectGrounding(projectName);
  res.json(data);
});

app.post('/api/synapses', (req, res) => {
  const { projectName, modelId, intent, context } = req.body;
  if (!projectName || !modelId || !intent || !context) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const result = saveSynapse(projectName, modelId, intent, context);
  res.json({ success: true, id: result.lastInsertRowid });
});

app.listen(port, () => {
  console.error(`Nastenka AI API running at http://localhost:${port}`);
});
