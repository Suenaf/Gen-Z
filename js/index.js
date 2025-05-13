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