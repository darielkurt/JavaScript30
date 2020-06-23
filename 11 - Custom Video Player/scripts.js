const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')

function togglePlay() {
    video.paused ? video.play() : video.pause()
}

function updateButton() {
    toggle.textContent = this.paused ? '►' : '❚ ❚'
}

function skip() {
    console.log(this.dataset.skip)
    video.currentTime += parseFloat(this.dataset.skip)
}

let rangeMouse = false

function handleRangeUpdate() {
    if (!rangeMouse) return
    video[this.name] = this.value
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime
}

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

toggle.addEventListener('click', togglePlay)

skipButtons.forEach(button => button.addEventListener('click', skip))

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mouseup', () => rangeMouse = false))
ranges.forEach(range => range.addEventListener('mouseout',  () => rangeMouse = false))
ranges.forEach(range => range.addEventListener('mousedown', () => rangeMouse = true))
// progressBar.addEventListener('change', handleRangeUpdate)
// progressBar.addEventListener('mousemove', handleRangeUpdate)
// range.addEventListener('mouseup', () => rangeMouse = false)
// range.addEventListener('mouseout',  () => rangeMouse = false)
// range.addEventListener('mousedown', () => rangeMouse = true)
let mousedown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)
