'use strict'

var nums
var size
var startTime
var timerInterval
var isRunning = false

function onInit(boardSize) {
  var elNextNum = document.querySelector('.num')
  elNextNum.innerHTML = '1'
  nums = numsToUse(boardSize)
  console.log('nums', nums)
  createBoard(boardSize)
  nums = numsToUse(boardSize)
  resetTimer()
}

function onCellClicked(elCell, clickedNum) {
  var elNextNum = document.querySelector('.num')
  if (clickedNum === 1 && !isRunning) {
    startTimer()
  }
  if (clickedNum === nums[0]) {
    elCell.classList.add('clicked')
    nums.splice(0, 1)
    console.log('num', nums)
    var nextNum = nums[0]
    if (nums.length === 0) {
      elNextNum.innerHTML = 'finished'
      stopTimer()
    } else {
      elNextNum.innerHTML = nextNum
    }
  }
}

function createBoard(boardSize) {
  var strHTML = ''
  var elTable = document.querySelector('table')
  for (var i = 0; i < Math.sqrt(boardSize); i++) {
    strHTML += '\n <tr>'
    for (var j = 0; j < Math.sqrt(boardSize); j++) {
      var currNum = numSelect()
      strHTML += `<td class="cell" onclick="onCellClicked(this, ${currNum})">${currNum}</td>`
    }
    strHTML += ' </tr>'
  }
  elTable.innerHTML = strHTML
}

function numsToUse(size) {
  var nums = []
  for (var i = 1; i <= size; i++) {
    nums.push(i)
  }

  return nums
}

function numSelect() {
  var currNumIdx = getRandomInt(0, nums.length)
  var currNum = nums[currNumIdx]
  nums.splice(currNumIdx, 1)
  return currNum
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

// Start the timer
function startTimer() {
  startTime = Date.now() // Record the start time in milliseconds
  timerInterval = setInterval(updateTimer, 50) // Update the timer every 50 milliseconds
  isRunning = true // Set the flag indicating the timer is running
}

// Update the timer display
function updateTimer() {
  var elapsedTime = Date.now() - startTime // Calculate the elapsed time
  var minutes = Math.floor(elapsedTime / (1000 * 60)) // Calculate the minutes
  var seconds = Math.floor((elapsedTime / 1000) % 60) // Calculate the seconds
  var milliseconds = Math.floor(elapsedTime % 1000) // Calculate the milliseconds

  minutes = String(minutes).padStart(2, '0') // Format minutes to always have two digits
  seconds = String(seconds).padStart(2, '0') // Format seconds to always have two digits
  milliseconds = String(milliseconds).padStart(3, '0') // Format milliseconds to always have three digits

  // Update the timer display to show minutes, seconds, and milliseconds
  document.querySelector(
    '.stopWatch'
  ).textContent = `${minutes}:${seconds}:${milliseconds}`
}

// Stop the timer
function stopTimer() {
  clearInterval(timerInterval) // Clear the interval to stop updating the timer
  isRunning = false // Set the flag indicating the timer is no longer running
}

// Reset the timer
function resetTimer() {
  clearInterval(timerInterval) // Clear the interval
  isRunning = false // Set the flag indicating the timer is not running
  startTime = 0 // Reset the start time
  document.querySelector('.stopWatch').textContent = '00:00:000' // Reset the timer display
}
