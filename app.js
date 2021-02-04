const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector(".count");
const total = document.querySelector(".total");
const movieSelect = document.querySelector("#movie");

let ticketPrice = +movieSelect.value;

populateUI();

function setMovieData (index, price) {
    localStorage.setItem('selectedValue', index);
    localStorage.setItem("moviePrice", price);

}


const updateCount = () => {
    const selected = document.querySelectorAll(".row .selected.seat");
    const counts = selected.length;

    count.innerText = counts;
    total.innerText = counts * ticketPrice;

    const seatIndex = [...selected].map((seat) => [...seats].indexOf(seat));
    localStorage.setItem("selected", JSON.stringify(seatIndex));

}

function populateUI () {
    const seatss = JSON.parse(localStorage.getItem("selected"));

    if (seatss !== null && seatss.length > 0) {
        seats.forEach((seat, index) => {
            if (seatss.indexOf(index) > -1){
                seat.classList.add("selected");
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem("selectedValue");

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

movieSelect.addEventListener("change", (e) => {
    ticketPrice = +e.target.value;   

    setMovieData(e.target.selectedIndex, e.target.value); 
    updateCount();
})

container.addEventListener("click", (e) => {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");

        updateCount();
    }
});

updateCount();