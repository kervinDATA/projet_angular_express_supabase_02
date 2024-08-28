# Utiliser une image Node officielle comme image de base
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers de package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le fichier .env dans le conteneur
COPY .env .env

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel le serveur Express tourne
EXPOSE 3000

# Commande pour démarrer l'application
CMD [ "node", "index.js" ]
