# IM4_Trend Talk

## Team:
Suena Fischer
Rabih Haj-Hassan

## Kurzbeschreibung unseres Projekts:
Mit unserer WebApp „Trend Talk“ ermöglichen wir der älteren Generation einen einfachen Zugang zur Jugendsprache. Nutzer*innen können Begriffe nachschlagen, lernen und ihren Fortschritt im Quiz verfolgen. Zusätzlich bietet die App Artikel von jugendtrends.ch, um einen Einblick in die Lebenswelt der Jugend zu geben.

Technisch arbeiten wir mit drei Datenbanken: für Logins, Begriffe und zur Verknüpfung beider für die Fortschrittsanzeige. Die Artikelanbindung erfolgt über eine Schnittstelle von Beni Hanimann.

## Learnings:
Wir lernten, Datenbanken sinnvoll zu verknüpfen und Inhalte dynamisch darzustellen.
Die API-Integration (z. B. Text-to-Speech, Artikel-Feed) brachte uns ein besseres Verständnis für Schnittstellen und Ladezeiten.
Durch gezielte Fehlersuche konnten wir technische Herausforderungen selbstständig lösen.
Eine klare Aufgabenverteilung und gute Teamarbeit förderten den Projektfortschritt.
Wir entwickelten ein Gespür für benutzerfreundliches Design – speziell für ältere Zielgruppen.

## Schwierigkeiten:

Die grösste Herausforderung war die Verknüpfung von Logindaten mit Begriffen und deren korrekte Darstellung auf der Startseite – inklusive der Kategorien neu, üben und gelernt (nach 3 richtigen Quizantworten).
Auch die Einbindung der Text-to-Speech-Funktion in Jugendsprache 101 stellte sich als komplex heraus – insbesondere bei der Datenübergabe an tts.php und der Auswahl einer passenden API. Schlussendlich wurden wir bei puter.ai fündig und haben diese eingebunden. Uns blieb einiges an Programmieren erspart, weil diese API selber bereits viel macht.

## Genutzte Ressourcen:
- [ChatGPT](https://chat.openai.com)
- [W3Schools](https://www.w3schools.com)
- [Code-Along](https://github.com/Interaktive-Medien/2025-im4-bern-working-folder)
- [OPENAI-Playground] https://github.com/Interaktive-Medien/openai-playground
- Coachings

## API-Bugs:
Die Text-to-Speech-Funktion reagiert mit Verzögerung (ca. 1 Sekunde) und sollte nicht überlastet werden.