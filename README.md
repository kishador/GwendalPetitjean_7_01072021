# GwendalPetitjean_7_01072021


Pour lancer le projet :

dans le dossier server, creer un fichier .env , y mettre ces 2 lignes en remplissant entre les guillemets:  
CLIENT_URL="url coté client"  
JWT_KEY="votre clé json-web-token"

dans le fichier config/config.json, rentrer les données de votre base de données SQL: "password" "database".

dans la console et dans le dossier server, installer node et toute les dépendances:  
cd back-end/ && npm i

Ensuite, lancer le server:  
npm start

dans le dossier client, creer un fichier .env, y mettre cette ligne en remplissant entre les guillemets:  
REACT_APP_API_URL="url coté server"

Enfin, pour lancer le Front, ouvrir un nouveau terminal et se rendre dans le dossier client:  
cd client/ && npm i

puis lancer react:  
npm start
