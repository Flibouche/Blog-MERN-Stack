// Importation des fonctions nécessaires de Redux Toolkit pour configurer le store et combiner les réducteurs
import { configureStore, combineReducers } from '@reduxjs/toolkit';

// Importation du réducteur utilisateur depuis le fichier userSlice
import userReducer from './user/userSlice';

// Importation des fonctions de redux-persist pour gérer la persistance du store
import { persistReducer, persistStore } from 'redux-persist';

// Importation du type de stockage, ici le stockage local du navigateur
import storage from 'redux-persist/lib/storage';

// Combinaison des différents réducteurs (reducers) en un seul réducteur principal
const rootReducer = combineReducers({
    user: userReducer,  // On associe le réducteur userReducer à la clé 'user' dans le state global
});

// Configuration de la persistance du store
const persistConfig = {
    key: 'root',    // Clé racine utilisée pour stocker l'état persistant
    storage,        // Type de stockage utilisé (ici, localStorage)
    version: 1,     // Version de la configuration de persistance
}

// Création du réducteur persistant en utilisant persistReducer
// Ceci permet de combiner le rootReducer avec la configuration de persistance
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configuration du store Redux avec le réducteur persistant
export const store = configureStore({
    reducer: persistedReducer,  // Utilisation du réducteur persistant
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false, // Désactivation du contrôle de sérialisation pour éviter des erreurs avec les objets non sérialisables dans l'état
        }),
});

// Création du persistor qui va permettre de gérer la persistance du store
export const persistor = persistStore(store);
