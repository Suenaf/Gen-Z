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
        "Willkommen<br><span class='username-highlight'>" + data.username + "</span>";
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
