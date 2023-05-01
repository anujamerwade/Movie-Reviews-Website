// reviews page
const url = new URL(location.href);
const movieId = url.searchParams.get("id")
const movieTitle = url.searchParams.get("title")
const movieOverview = url.searchParams.get("overview")

const APILINK = 'https://original-review-backend.anujamerwade.repl.co/api/v1/reviews/';


const main = document.getElementById("section");
const title = document.getElementById("title");
const overview = document.getElementById("overview");

title.innerText = movieTitle;
overview.innerText = movieOverview;

const div_new = document.createElement('div');
div_new.innerHTML = `
  <div class="row">
    <div class="column">
      <div class="card1">
          Add rating and review
          <p><strong>Rating(1 to 5): </strong>
            <input type="number" id="new_rating" value="">
          </p>
          <p><strong>Review: </strong>
            <input type="text" id="new_review" value="">
          </p>
          <p><strong>User: </strong>
            <input type="text" id="new_user" value="">
          </p>
          <p><a href="#" onclick="saveReview('new_rating','new_review', 'new_user')">💾</a>
          </p>
      </div>
    </div>
  </div>
`
main.appendChild(div_new)

returnReviews(APILINK);

function curr_ts() {
  var date = new Date();
  var curr_date = date.getDate() + "/"
    + (date.getMonth() + 1) + "/"
    + date.getFullYear();
  var curr_time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  // const curr_date = Date.now();

  var timestamp = curr_date + " " + curr_time;
  return timestamp;
}

function returnReviews(url) {
  fetch(url + "movie/" + movieId).then(res => res.json())
    .then(function(data) {
      console.log(data);
      data.forEach(review => {
        const div_card = document.createElement('div');
        div_card.innerHTML = `
          <div class="row">
            <div class="column">
              <div class="card1" id="${review._id}">
                <p><strong>Rating(1 to 5): </strong>${review.rating}</p>
                <p><strong>Review: </strong>${review.review}</p>
                <p><strong>User: </strong>${review.user}</p>
                <p><a href="#"onclick="editReview('${review._id}','${review.rating}','${review.review}','${review.user}')">✏️</a> <a href="#" onclick="deleteReview('${review._id}')">🗑</a></p>
              </div>
            </div>
          </div>
        `

        main.appendChild(div_card);
      });
    });
}

function editReview(id, rating, review, user) {

  const element = document.getElementById(id);
  const ratingInputId = rating + id
  const reviewInputId = "review" + id
  const userInputId = "user" + id
  const upd_timestamp = curr_ts();

  element.innerHTML = `
              <p><strong>Rating(1 to 5):</strong>
                <input type = "number" id="${ratingInputId}" value="${rating}">
              </p>
              <p><strong>Review:</strong>
                <input type = "text" id="${reviewInputId}" value="${review}">
              </p>
              <p><strong>User:</strong>
                <input type = "text" id="${userInputId}" value="${user}">
              </p>
              <p><a href="#" onclick="saveReview('${ratingInputId}','${reviewInputId}','${userInputId}','${id}',)">💾</a>
              </p>
              <p align=right>Edited on: ${upd_timestamp}</p>
  
  `
}

function saveReview(ratingInputId, reviewInputId, userInputId, id = "") {
  const rating = document.getElementById(ratingInputId).value;
  const review = document.getElementById(reviewInputId).value;
  const user = document.getElementById(userInputId).value;
  const element = document.getElementById(id);

  if (id) {
    fetch(APILINK + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "rating": rating, "review": review, "user": user })
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
      });
  } else {
    fetch(APILINK + "new", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "rating": rating, "review": review, "user": user, "movieId": movieId })
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
      });
  }
}

function deleteReview(id) {
  fetch(APILINK + id, {
    method: 'DELETE'
  }).then(res => res.json())
    .then(res => {
      console.log(res)
      location.reload();
    });
}