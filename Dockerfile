# Usa la imagen de Node.js
FROM node:14

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto de la aplicación
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["npm", "start"]
