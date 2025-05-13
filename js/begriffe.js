console.log("Hello from Begriffe JS!");

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('jugendwoerter');

    if (!container) {
        console.error("Container 'jugendwoerter' nicht gefunden!");
        return;
    }

    fetch('api/begriffe.php')  // → Pfad zur PHP-Datei, vom HTML aus gesehen!
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                container.innerHTML = "Fehler: " + data.error;
                return;
            }

            if (data.length === 0) {
                container.innerHTML = "Keine Begriffe gefunden.";
                return;
            }

            data.forEach(item => {
                const element = document.createElement('p');
                element.innerHTML = `<strong>${item.wort}</strong>: ${item.bedeutung}`;
                container.appendChild(element);
            });
        })
        .catch(error => {
            console.error("Fehler beim Abrufen der Daten:", error);
            container.innerHTML = "Es gab ein Problem beim Laden der Begriffe.";
        });
});
