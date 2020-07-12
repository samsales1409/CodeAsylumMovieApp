const matchList = document.getElementById("match-list");
const search = document.getElementById("movieName").value;
const DispMovie=document.getElementById('movies');

// matchList.addEventListener("click", (e) => {
//     if (e.composedPath().find((element) => { 
//         return element.classList?.contains('movie-item');
//     })) {
//         console.log('movie clicked');
//     }

//     e.stopPropagation();
// });

const searchMovie = function getMovie() {
  let movieName = document.getElementById("movieName").value;

  let url = `https://api.themoviedb.org/3/search/movie?api_key=250e8ff824c99a9c497cf138f87d980b&query=${movieName}`;
   
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let matches = data.results.filter((movie) => {
        const regex = new RegExp(`^${movieName}`, "gi");
        return movie.title.match(regex);
      });
      console.log(matches);
      if (movieName.length === 0) {
        matches = [];
      }
      updateHtml(matches);
    });
};

const updateHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
            <div class="card card-body mb-1 movie-item" data-movie-id="">
                <a onclick="movieSelect('${match.id}')">${match.title}</a>
            </div>
          `
      )
      .join("");
    console.log(html);
    matchList.innerHTML = html;
  }
};

function movieSelect(id) {
    emptyMatchList();

    getMovie(id).then((response) => {
        console.log(response);
        displayMovieData(response);
    });
  
}

function displayMovieData(movie) {
    const html=`
        <div>
            <p>${movie.title}</p>
            <p>${movie.release_date}</p>

        </div>
    `
    DispMovie.innerHTML=html;
}

function emptyMatchList() {
    matchList.innerHTML='';
}

function getMovie(id) {
  let url=`https://api.themoviedb.org/3/movie/${id}?api_key=250e8ff824c99a9c497cf138f87d980b&language=en-US`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}


