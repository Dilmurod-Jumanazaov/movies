const elForm = document.querySelector(".hero__form");
const elInputMovie = elForm.querySelector(".form-box__input-name");
const elInputYearFrom = elForm.querySelector(".form-box__input-year-from")
const elInputYearTo = elForm.querySelector(".form-box__input-year-to");
const elInputCategory = elForm.querySelector(".form-box__input-category");
const elList = document.querySelector(".hero__list");
const modalTitle = document.querySelector(".modal-title");
const modalBody = document.querySelector(".modal-body");

const new_movies = movies.slice(0,120);
renderMovie(new_movies);

function renderMovie(array) {
  array.forEach(element => {
    let liElement = document.createElement("li");
    let movieYear = document.createElement("time");
    let imgElement = document.createElement("img");
    let titleBoxElement = document.createElement("div");
    let titleElement = document.createElement("h3");
    let detailsElement = document.createElement("details");
    let summaryElement = document.createElement("summary");
    let textElement = document.createElement("p");
    let ratingElement = document.createElement("span");
    let languageElement = document.createElement("p");
    // let categoryElement = document.createElement("p");
    let linkBox = document.createElement("div");
    let movieLinkElement = document.createElement("a");
    let modalBtn = document.createElement("button");
    
    movieYear.textContent = `Movie year: ${element.movie_year}`;
    movieYear.setAttribute("datetime","2023-08-09");
    imgElement.setAttribute("src",`https://i3.ytimg.com/vi/${element.ytid}/maxresdefault.jpg`);
    imgElement.setAttribute("alt",element.fulltitle);
    titleElement.textContent = element.fulltitle;
    summaryElement.textContent = "Movie info";
    textElement.textContent = element.summary;
    ratingElement.textContent = `Movie rating: ${element.imdb_rating}`;
    languageElement.textContent = `Movie language: ${element.language}`;
    // categoryElement.textContent = `Categories: ${element.Categories}`;
    movieLinkElement.textContent = "Watch movie"
    movieLinkElement.setAttribute("target","blank");
    movieLinkElement.setAttribute("href",`https://www.imdb.com/title/${element.imdb_id}`);
    modalBtn.textContent = "More info"
    modalBtn.setAttribute("data-bs-toggle","modal");
    modalBtn.setAttribute("data-bs-target","#staticBackdrop");
    modalTitle.textContent = element.fulltitle;
    modalBody.textContent = element.Categories;
    modalBtn.dataset.id = element.ytid;
    
    liElement.classList.add("hero__item");
    movieYear.classList.add("hero__movie-year"); 
    imgElement.classList.add("hero__img");
    titleElement.classList.add("hero__subtitle");
    summaryElement.classList.add("hero__summary");
    languageElement.classList.add("hero__movie-lang");
    ratingElement.classList.add("hero__movie-rating","mb-auto","pb-3");
    // categoryElement.classList.add("hero__movie-category"); 
    linkBox.classList.add("hero__link-box","mb-3");
    movieLinkElement.classList.add("hero__movie-link");
    modalBtn.classList.add("modal-btn","btn","btn-succes");
    
    titleBoxElement.appendChild(titleElement);
    detailsElement.append(summaryElement,textElement);
    linkBox.appendChild(movieLinkElement);
    liElement.append(movieYear,imgElement,titleBoxElement,detailsElement,languageElement,ratingElement,linkBox,modalBtn);
    elList.appendChild(liElement);
  }); 
}
elInputMovie.addEventListener("keyup",function() {
  
  elList.innerHTML = "";
  
  let inputMovieValue = elInputMovie.value.trim().toLowerCase();
  
  let filteredMovieName = new_movies.filter(function (item) {
    let movieName = item.Title.toLocaleLowerCase();
    return movieName.includes(inputMovieValue);
  })
  renderMovie(filteredMovieName);
});
elForm.addEventListener("submit", function(evt) {
  evt.preventDefault();
  
  elList.innerHTML = "";
  
  let inputFromValue = elInputYearFrom.value.trim();
  let inputToValue = elInputYearTo.value.trim();
  
  let filteredMovieYear = new_movies.filter(function(item) {
    elInputYearFrom.value = "";
    elInputYearTo.value = "";
    return item.movie_year >= inputFromValue && item.movie_year <= inputToValue;
  })
  renderMovie(filteredMovieYear);
});
elList.addEventListener("click", (evt) => {
  if(evt.target.matches(".modal-btn")) {
    const modalBtnId = evt.target.dataset.id;
    const findMovie = new_movies.find(function(element) {
      return element.ytid == modalBtnId;
    });
    modalTitle.textContent = findMovie.fulltitle;
    modalBody.textContent = findMovie.Categories;
  }
})