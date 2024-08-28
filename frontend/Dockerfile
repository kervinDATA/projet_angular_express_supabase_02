# Étape 1: Utiliser l'image Node.js pour construire l'application
FROM node:18 AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances du projet Angular
RUN npm install

# Copier tout le reste des fichiers du projet
COPY . .

# Construire l'application Angular
RUN npm run build --prod

# Étape 2: Utiliser Nginx pour servir l'application
FROM nginx:alpine

# Copier les fichiers buildés dans le répertoire par défaut de Nginx
COPY --from=build /app/dist/frontend-app/browser /usr/share/nginx/html

# Exposer le port sur lequel Nginx tourne (par défaut, 80)
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
