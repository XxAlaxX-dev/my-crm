import axios from 'axios';

// Remplacer par l'URL de votre API
const API_URL = 'http://localhost:4000/api/tasks/';

// Récupérer le token depuis le localStorage ou le contexte d'authentification
const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Ou obtenir l'utilisateur depuis un contexte d'authentification
  const token = user ? user.token : null; // Récupérer le token
  return token ? { Authorization: `Bearer ${token}` } : {}; // Ajouter le token à l'en-tête si disponible
};

// Récupérer toutes les tâches
const getTasks = async () => {
  const response = await axios.get(API_URL, { headers: getAuthHeaders() });
  return response.data;
};

// Créer une nouvelle tâche
const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData, { headers: getAuthHeaders() });
  return response.data;
};

// Mettre à jour une tâche existante
const updateTask = async (taskId, taskData) => {
  const response = await axios.put(`${API_URL}${taskId}`, taskData, { headers: getAuthHeaders() });
  return response.data;
};

// Supprimer une tâche
const deleteTask = async (taskId) => {
  const response = await axios.delete(`${API_URL}${taskId}`, { headers: getAuthHeaders() });
  return response.data;
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
