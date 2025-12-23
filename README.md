# Dodôtel
---

## 🛠️ Installation & Utilisation



git clone https://github.com/SamuelRobillard/collecteProjetFinal

```
collecte/
│
├── Postman
└── src/
    ├── config/
    │       # mettre le /env ici
                        puis -> development.env
                        ou      production.env
                        ou      test.env
                                   
    │   
    │
    ├── controllers/         
    ├── middlewares/         
    ├── models/             
    ├── routes/              
    ├── services/             
    │
    ├── utils/               
    │   
    │   
    │   
    │
    ├── winston/              
    │   
    │
    └── index.ts

│
│
├── node_modules/          
├── package.json
├── tsconfig.json
├── .gitignore
├── generateKeyCert.js       # Script de génération des certificats
└── README.md        
```
---

## Commandes utiles
### Rentrer dans le dossier du projet
```bash
cd collecte
```
### Installer les dépendances
```bash
npm install
```
### Lancer l'environnemnent de developpement
```bash
npm run dev 
```
### Lancer les testes
```bash
npm test
```


ps : Par préférence, utiliser bash. Sinon, verifier que openssl est installé.
---
---

## 🛠️ Postman

Simplement importer la collection et run la collection en entière.

---

## fonctionnalitées
- Lister les hôtels disponibles par ville. 

- Filtrer et trier selon des champs sélectionnés par l’utilisateur. 

- Ajouter et supprimer des réservations en choisissant le nombre de adultes, enfants et chambres. 

- Création et authentification de compte utilisateur. 

- Suppression d’utilisateur pour un compte administrateur. 

- Voir les informations de son propre compte. 

- Visualisation des graphes.

---

## Configuration

L'application utilise `config` pour une configuration multi-environnement.

### Configuration Files

situé dans le dossier  `/config`:
- `default.json` - Configuration de base
- `development.json` - Environnement de developpement
- `test.json` - Environnement de test
- `production.json` - Paramètres de production
- `custom-environment-variables.json` - Variables d'environnement





