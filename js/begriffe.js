console.log("Hello from Begriffe JS!");

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('jugendwoerter');
    const searchInput = document.getElementById('search-input');

    if (!container) {
        console.error("Container 'jugendwoerter' nicht gefunden!");
        return;
    }

    let begriffeData = [];

    fetch('api/begriffe.php')
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
            begriffeData = data;
            begriffeData.sort((a, b) => a.wort.localeCompare(b.wort));
            renderBegriffe(begriffeData);
        })
        .catch(error => {
            console.error("Fehler beim Abrufen der Daten:", error);
            container.innerHTML = "Es gab ein Problem beim Laden der Begriffe.";
        });

    function renderBegriffe(begriffe) {
        container.innerHTML = '';
        begriffe.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.classList.add(index % 2 === 0 ? 'green' : 'orange');
            card.innerHTML = `
                <h2 class="sprechwort" style="cursor:pointer;">${item.wort}</h2>
                <p>${item.bedeutung}</p>
            `;
            container.appendChild(card);
        });

        // Klick-Listener für Text-to-Speech mit puter.ai.txt2speech
        const wortElements = container.querySelectorAll('.sprechwort');
        wortElements.forEach((el, i) => {
            el.addEventListener('click', () => {
                const text = begriffe[i].wort;
                if (window.puter && puter.ai && puter.ai.txt2speech) {
                    puter.ai.txt2speech(text).then(audio => {
                        audio.play();
                    }).catch(e => {
                        console.error('TTS Fehler:', e);
                    });
                } else {
                    console.warn('puter.ai.txt2speech ist nicht verfügbar');
                }
            });
        });
    }

    searchInput.addEventListener('input', function () {
        const searchQuery = searchInput.value.toLowerCase();
        const filteredBegriffe = begriffeData.filter(item =>
            item.wort.toLowerCase().includes(searchQuery) ||
            item.bedeutung.toLowerCase().includes(searchQuery)
        );
        renderBegriffe(filteredBegriffe);
    });
});
