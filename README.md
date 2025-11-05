# TV-Tracker

TV-Tracker est une application backend fait avec nodejs 
qui permet de gerer des donnes relier a une application de streaming de film et srie 

---

## 🛠️ Installation & Utilisation



git clone -b integrationMongo https://github.com/SamuelRobillard/collecte

```
collecte/
│
├── Postman
└── src/
    ├── config/
    │       # mettre le /env icic            
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


cd collecte

npm install


dev: npm run dev 
(utilisé celui ci pour postman)

test: npm run test-env

prod: npm run start




---


---
## 🛠️ Postman

Simplement importer la collection et run la collection en entière.

---


## fonctionnalitées
1 creation et connexion a des comptes utilisateur

2 recherche de films et series par leur titre et d'autre champ.




