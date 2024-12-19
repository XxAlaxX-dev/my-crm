import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';


// Création du contexte
const AuthContext = createContext();

// Composant AuthProvider pour envelopper l'application
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stockage de l'objet utilisateur
  const [loading, setLoading] = useState(true); // État de chargement pendant la récupération de l'utilisateur

  // Récupérer l'utilisateur actuel depuis le localStorage ou via l'API
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser); // Si l'utilisateur est trouvé dans localStorage, on le définit
    }
    setLoading(false); // Une fois l'utilisateur récupéré, on arrête le chargement
  }, []);

  // Fonction de connexion
  const login = async (email, password) => {
    const loggedInUser = await authService.login(email, password);
    setUser(loggedInUser); // Mettre à jour l'utilisateur après la connexion
    if(loggedInUser){

    }
  };

  // Fonction d'enregistrement
  const register = async (userData) => {
    const newUser = await authService.register(userData);
    setUser(newUser); // Mettre à jour l'utilisateur après l'enregistrement
  };

  // Fonction de déconnexion
  const logout = () => {
    authService.logout(); // Appel de la fonction de déconnexion dans authService
    setUser(null); // Effacer l'utilisateur de l'état
  };

  // Fournir les valeurs du contexte aux autres composants de l'application
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Export du contexte et du fournisseur
export { AuthContext, AuthProvider };
