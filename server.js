const express = require('express');
const path = require('path');
const fs = require('fs'); // Para manejar archivos
const app = express();
const port = 3000;

// Configura Express para analizar el cuerpo de las solicitudes como JSON
app.use(express.json()); // Esto es necesario para que el cuerpo del POST sea procesado como JSON

// Configura Express para servir archivos estáticos desde la carpeta 'assets'
app.use(express.static(path.join(__dirname, 'assets')));

// Ruta para renderizar el archivo HTML estático (index2.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', 'views', 'index2.html'));
});

// Ruta para guardar la reservación
app.post('/guardar-reservacion', (req, res) => {
    const reservationData = req.body;

    // Verificamos que los datos básicos estén presentes
    if (!reservationData.name || !reservationData.surname || !reservationData.cedula) {
        return res.status(400).json({ success: false, message: 'Faltan datos importantes.' });
    }

    // Datos que van a ir en el archivo 'reservaciones.txt'
    const reservationText = `Nombre: ${reservationData.name}\nApellido: ${reservationData.surname}\nCédula: ${reservationData.cedula}\nTeléfono: ${reservationData.phone}\nCorreo: ${reservationData.email}\nOcasión: ${reservationData.occasion}\nFecha: ${new Date().toISOString()}\n\n`;

    // Datos que van a ir en el archivo 'contactos.txt'
    const cocktailText = `Nombre: ${reservationData.name}\nOcasión: ${reservationData.occasion}\nSolicitud Especial: ${reservationData.specialRequest}\nFecha: ${new Date().toISOString()}\n\n`;

    // Ruta de la carpeta 'data' y los archivos donde se guardarán los datos
    const dataFolderPath = path.join(__dirname, 'data');
    const reservationFilePath = path.join(dataFolderPath, 'reservaciones.txt');
    const cocktailFilePath = path.join(dataFolderPath, 'contactos.txt');

    // Crear la carpeta 'data' si no existe
    if (!fs.existsSync(dataFolderPath)) {
        fs.mkdirSync(dataFolderPath);
    }

    // Guardamos los datos en 'reservaciones.txt'
    fs.appendFile(reservationFilePath, reservationText, (err) => {
        if (err) {
            console.error('Error al guardar en reservaciones.txt:', err);
            return res.status(500).json({ success: false, message: 'Error al guardar la reservación en reservaciones.txt.' });
        }

        // Guardamos los datos en 'contactos.txt'
        fs.appendFile(cocktailFilePath, cocktailText, (err) => {
            if (err) {
                console.error('Error al guardar en contactos.txt:', err);
                return res.status(500).json({ success: false, message: 'Error al guardar la reservación en contactos.txt.' });
            }

            // Responder con éxito
            res.json({ success: true, message: 'Reservación guardada con éxito en ambos archivos.' });
        });
    });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
