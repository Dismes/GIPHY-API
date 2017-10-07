
var movies = [];

function displayMovieInfo() {
    var animal = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
            url: queryURL,
            method: "GET"
        })

        .done(function (response) {
            console.log(queryURL);

            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var animalDiv = $("<div>");
                var animalImage = $("<img class='picture'>");   
                console.log(results[i].images.fixed_height.url);
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url); 
                animalImage.attr("data-animate",  results[i].images.fixed_height.url);
                animalImage.attr("data-state", "still");
                animalImage.attr("class", "gif");
                animalDiv.append(animalImage);
                $("#movies-view").prepend(animalImage);
            }

            $(".gif").on("click", function() {
                console.log("Click on gif");
                var state = $(this).attr("data-state");
                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
              });
        });

}

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < movies.length; i++) {

    
        var a = $("<button class='row button btn btn-block' style='padding:auto'>");

        a.addClass("movie");

        a.attr("data-name", movies[i]);

        a.text(movies[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-movie").on("click", function (event) {
    console.log("This button");
    event.preventDefault();

    var movie = $("#movie-input").val().trim();

    movies.push(movie);

    renderButtons();
});

$(document).on("click", ".movie", displayMovieInfo);

renderButtons();