'use strict';

let movies = [];
let number_of_movies = prompt("How many movies do you want to rate? ");

while (number_of_movies.trim() === "" || isNaN(number_of_movies) || !(number_of_movies >= 0)) {
    alert("Please enter a valid number greater than or equals to 0!");
    number_of_movies = prompt("How many movies do you want to rate? ");
}

let movie_title;
let movie_rating;

for (let i = 0; i < number_of_movies; i++) {
    while (true) {
        movie_title = prompt(`Enter the title of movie ${i + 1}: `);
        if (movie_title.trim() !== "") {
            break;
        } else {
            alert("Your input cannot be empty!");
        }
    }
    
    while (true) {
        movie_rating = prompt(`Enter the rating (1-5) for ${movie_title} movie: `);
        if (movie_rating >= 1 && movie_rating <= 5) {
            break;
        } else {
            alert("Please enter a rating between 1 and 5!");
        }
    }

    movies.push({"title": movie_title, "rating": movie_rating});
}

movies.sort((a, b) => b.rating - a.rating);

const target = document.getElementById("target");

if (movies.length > 0) {
    const h2_sortedList = document.createElement("h2");
    h2_sortedList.innerHTML = "Sorted List:"
    target.append(h2_sortedList);
    
    for (let i = 0; i < movies.length; i++) {
        const p = document.createElement("p");
        p.innerHTML = movies[i].title + " - " + movies[i].rating;
        target.append(p);
    }

    const h2_highestRating = document.createElement("h2");
    h2_highestRating.innerHTML = "Highest rated movie:";
    target.append(h2_highestRating);

    const p = document.createElement("p");
    p.innerHTML = `${movies[0].title} - ${movies[0].rating}`;
    target.append(p);
} else {
    target.innerHTML = "Movie list is empty.";
}
