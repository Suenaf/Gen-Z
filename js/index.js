console.log("index.js loaded");

// fetch
fetch("api/index.php")
.then((response) => response.json())
.then((data) => {
    console.log(data);

    if (data.status === "error") {
     //redirect to login page
        window.location.href = "login.html";
    } else {
        // write welcome message to html
        document.getElementById("welcome-message").innerHTML =
        "Slay, good to see you <span class='username-highlight'>" + data.username + "</span>";
    }
})
.catch((error) => {
    console.error("Fehler beim Senden", error);
});

function ladeLernstatus() {
    fetch("api/kategorien.php")
        .then(r => r.json())
        .then(data => {
            document.getElementById("neu-count").innerText = data.neu;
            document.getElementById("ueben-count").innerText = data.ueben;
            document.getElementById("gelernt-count").innerText = data.gelernt;
        })
        .catch(err => console.error("Fehler beim Laden des Lernstatus:", err));
}

ladeLernstatus(); // <- Das ruft die Anzeige der Zahlen auf

function ladeZufaelligesWort() {
    fetch("api/aktuell.php")
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                document.getElementById("slang-liste").innerText = "Fehler beim Laden.";
                return;
            }

            const slangListe = document.getElementById("slang-liste");
            slangListe.innerHTML = `<strong>${data.wort}</strong>`;
        })
        .catch((error) => {
            console.error("Fehler beim Laden eines Begriffs:", error);
            document.getElementById("slang-liste").innerText = "Fehler beim Laden.";
        });
}

ladeZufaelligesWort();
