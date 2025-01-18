document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('date');
    const hourInput = document.getElementById('hour');
    const personsSelect = document.getElementById('persons');
    const reservationSelection = document.getElementById('reservation-selection');
    const reservationConfirmation = document.getElementById('reservation-confirmation');
    const availableTables = document.getElementById('availableTables');
    const reservationDetails = document.getElementById('reservationDetails');
    const tablesList = document.getElementById('tablesList');
    const tableSelectionForm = document.getElementById('tableSelectionForm');
    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    const cedulaInput = document.getElementById('cedula');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const occasionInput = document.getElementById('occasion');
    const specialRequestInput = document.getElementById('specialRequest');
    const themeToggle = document.getElementById('themeToggle');
    
    // Establecer la fecha mínima como la fecha actual
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Función para mostrar mesas disponibles
    function showAvailableTables() {
        const selectedDate = dateInput.value;
        const selectedPersons = personsSelect.value;
        const selectedHour = hourInput.value;

        if (selectedDate && selectedPersons && selectedHour) {
            tablesList.innerHTML = '';
            const tables = getAvailableTables(selectedPersons, selectedHour);

            tables.forEach((table, index) => {
                const tableDiv = document.createElement('div');
                tableDiv.classList.add('table-item');
                tableDiv.innerHTML = `
                    <p><strong>Mesa ${index + 1}:</strong> ${table.time}</p>
                    <button class="selectTableBtn" data-time="${table.time}">Seleccionar Mesa</button>
                `;
                tablesList.appendChild(tableDiv);
            });

            availableTables.classList.remove('hidden');
            reservationSelection.classList.add('hidden');
        }
    }

    // Función para obtener las mesas disponibles
    function getAvailableTables(persons, selectedHour) {
        const availableTimes = [
            "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
        ];

        // Filtrar solo las mesas disponibles a partir de la hora seleccionada
        const filteredTimes = availableTimes.filter(time => time >= selectedHour);

        return filteredTimes.map(time => ({ time }));
    }

    // Mostrar mesas disponibles al enviar el formulario
    tableSelectionForm.addEventListener('submit', function (e) {
        e.preventDefault();
        showAvailableTables();
    });

    // Manejador de selección de mesa
    tablesList.addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('selectTableBtn')) {
            const selectedTime = e.target.getAttribute('data-time');
            // Mostrar los detalles de la mesa seleccionada en la pantalla de confirmación
            reservationDetails.innerHTML = `
                <p>Has seleccionado la mesa para las <strong>${selectedTime}</strong></p>
            `;
            availableTables.classList.add('hidden');
            reservationConfirmation.classList.remove('hidden');
        }
    });

    // Guardar los datos en el localStorage
    function saveToLocalStorage() {
        const reservationData = {
            name: nameInput.value,
            surname: surnameInput.value,
            cedula: cedulaInput.value,
            phone: phoneInput.value,
            email: emailInput.value,
            occasion: occasionInput.value,
            specialRequest: specialRequestInput.value,
        };
        localStorage.setItem('reservationData', JSON.stringify(reservationData));
    }

    // Confirmar reservación
    const reservationForm = document.getElementById('reservationForm'); // Asegúrate de que el formulario tenga este id
    reservationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        saveToLocalStorage();
        alert("¡Reservación confirmada!");
    });

    // Modo oscuro/claro
    themeToggle.addEventListener('change', function () {
        if (themeToggle.checked) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
    });
});
