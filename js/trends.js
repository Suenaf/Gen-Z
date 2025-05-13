const API_URL = "https://jugendtrends.ch/ghost/api/content/posts/?key=9857a72b05b8c66dc2add7b613";

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    const posts = data.posts;
    const container = document.getElementById('artikel-container');

    posts.forEach(post => {
      const article = document.createElement('div');
      article.classList.add('artikel');

      article.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.excerpt}</p>
        <a href="${post.url}" target="_blank">Mehr lesen</a>
      `;

      container.appendChild(article);
    });
  })
  .catch(error => {
    console.error("Fehler beim Laden der Artikel:", error);
  });
