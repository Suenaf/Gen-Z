console.log("Hello from Register JS!");

document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault(); // Formular‑Reload verhindern

    // ► Eingabewerte aus den Feldern holen
    const username = document.querySelector("#username").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;

    if (!username || !email || !password) {
      alert("Bitte fülle alle Felder aus");
      return;
    }

    // ► FormData füllt PHPs $_POST automatisch
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    // Fetch
    try {
      const res = await fetch("api/register.php", {
        method: "POST",
        body: formData,
      });
      const reply = await res.text(); // register.php schickt nur Klartext zurück
      console.log("Antwort vom Server:\n" + reply);

      if (reply === "Registrierung erfolgreich") {
        // Weiterleitung zur Login-Seite, wenn die Registrierung erfolgreich war
        window.location.href = "login.html"; 
      } else {
        alert(reply); // Zeigt Fehlermeldung an, falls die Registrierung fehlgeschlagen ist
      }
    } catch (err) {
      console.error("Fehler beim Senden:", err);
    }
  });
