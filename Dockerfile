# Dockerfile

# Utilise l'image Docker officielle pour Node.js version 18 comme base
FROM node:18

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json (si disponible) dans le répertoire de travail du conteneur
COPY ./app/package*.json ./

# Installe les dépendances du projet à l'aide de npm
RUN npm install

# Copie le reste des fichiers de l'application dans le répertoire de travail du conteneur
COPY ./app/ .

# Expose le port 5173 pour que l'application puisse communiquer avec l'extérieur du conteneur
EXPOSE 5173

# Exécute la commande "npm run dev" lorsque le conteneur est démarré
CMD ["npm", "run", "dev"]
