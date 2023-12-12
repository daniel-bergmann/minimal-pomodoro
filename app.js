let countdown
let remainingTime = 0
const timerDisplay = document.querySelector("#timer")
const startButton = document.querySelector("#start")
const pauseButton = document.querySelector("#pause")
const resetButton = document.querySelector("#reset")
const timeSelect = document.querySelector("#time-select")

const timer = (seconds) => {
  clearInterval(countdown)

  const now = Date.now()
  const then = now + seconds * 1000
  displayTimeLeft(seconds)

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000)
    if (secondsLeft < 0) {
      clearInterval(countdown)
      return
    }
    displayTimeLeft(secondsLeft)
  }, 1000)
}

const displayTimeLeft = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainderSeconds = seconds % 60
  timerDisplay.textContent = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`
}

const pauseTimer = () => {
  clearInterval(countdown)
  remainingTime = timerDisplay.textContent
    .split(":")
    .reduce((acc, time) => 60 * acc + +time)
}

const resetTimer = () => {
  clearInterval(countdown)
  const selectedTime = parseInt(timeSelect.value)
  const minutes = Math.floor(selectedTime / 60)
  const remainderSeconds = selectedTime % 60
  timerDisplay.textContent = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`
  remainingTime = timeSelect.value
}

// evenrt listeners
startButton.addEventListener("click", () => timer(remainingTime || 1500))
pauseButton.addEventListener("click", pauseTimer)
resetButton.addEventListener("click", resetTimer)
timeSelect.addEventListener("change", () => {
  remainingTime = timeSelect.value
  displayTimeLeft(remainingTime)
})
