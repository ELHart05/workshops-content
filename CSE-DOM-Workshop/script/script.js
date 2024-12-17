const input = document.getElementById("myInput")
const box = document.getElementById("myDiv")

function colorChange (e) {
    console.log(e.target.value)
    box.style.backgroundColor = e.target.value
}

input.addEventListener('input', colorChange)


/////////////////////////////////////////////////

const counterTitle = document.querySelector(".counter_title")
const counterIncrement = document.querySelector(".counter_increment")
const counterDecrement = document.querySelector(".counter_decrement")

let counter = 0;

function IncrementCounter () {
    console.log(counter)
    counter = counter + 1
    counterTitle.textContent = counter;
}

function DecrementCounter () {
    console.log(counter)
    counter = counter - 1
    counterTitle.textContent = counter
}

counterIncrement.addEventListener('click', IncrementCounter)
counterDecrement.addEventListener('click', DecrementCounter)