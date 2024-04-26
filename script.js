document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // предотвратить отправку формы

    const movieTitle = document.getElementById('movieTitle').value.trim();
    if (movieTitle === '') {
        displayError('Пожалуйста, введите название фильма.');
        return;
    }

    searchMovie(movieTitle)
        .then(displayMovieInfo)
        .catch(displayError);
});

function searchMovie(title) {
    const apiKey = '7d462ca6'; // ваш API ключ с omdbapi.com
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`;
    
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при запросе к серверу.');
            }
            return response.json();
        })
        .then(data => {
            if (data.Response === 'False') {
                throw new Error(data.Error);
            }
            return data;
        });
}

function displayMovieInfo(movie) {
    const movieInfoContainer = document.getElementById('movieInfo');
    movieInfoContainer.innerHTML = `
        <h2>${movie.Title}</h2>
        <p><strong>Год:</strong> ${movie.Year}</p>
        <p><strong>Жанр:</strong> ${movie.Genre}</p>
        <p><strong>Режиссер:</strong> ${movie.Director}</p>
        <p><strong>Актеры:</strong> ${movie.Actors}</p>
        <p><strong>Описание:</strong> ${movie.Plot}</p>
    `;
}

function displayError(message) {
    const errorMessageContainer = document.getElementById('errorMessage');
    errorMessageContainer.textContent = message;
}