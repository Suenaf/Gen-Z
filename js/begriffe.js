console.log("Hello from Begriffe JS!");

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('jugendwoerter');
    const searchInput = document.getElementById('search-input'); // Das Suchfeld

    if (!container) {
        console.error("Container 'jugendwoerter' nicht gefunden!");
        return;
    }

    let begriffeData = []; // Hier speichern wir alle Begriffe, um sie bei der Suche zu verwenden.

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

            begriffeData = data; // Speichern der Begriffe in der globalen Variable

            // Begriffe nach Wort alphabetisch sortieren
            begriffeData.sort((a, b) => a.wort.localeCompare(b.wort));

            // Begriffe anzeigen
            renderBegriffe(begriffeData);
        })
        .catch(error => {
            console.error("Fehler beim Abrufen der Daten:", error);
            container.innerHTML = "Es gab ein Problem beim Laden der Begriffe.";
        });

    // Funktion zum Rendern der Begriffe
    function renderBegriffe(begriffe) {
        container.innerHTML = ''; // Container leeren

        begriffe.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
    
            // Abwechselnd Farben durch Klasse "green" oder "orange"
            card.classList.add(index % 2 === 0 ? 'green' : 'orange');
    
            card.innerHTML = `
                <h2>${item.wort}</h2>
                <p>${item.bedeutung}</p>
            `;
    
            container.appendChild(card);
        });
    }

    // Eventlistener für das Suchfeld
    searchInput.addEventListener('input', function () {
        const searchQuery = searchInput.value.toLowerCase();

        // Filtere die Begriffe basierend auf der Eingabe
        const filteredBegriffe = begriffeData.filter(item => 
            item.wort.toLowerCase().includes(searchQuery) ||
            item.bedeutung.toLowerCase().includes(searchQuery)
        );

        // Zeige die gefilterten Begriffe
        renderBegriffe(filteredBegriffe);
    });
});
