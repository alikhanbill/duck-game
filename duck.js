import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const duckElem = document.querySelector("[data-duck]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DUCK_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let duckFrame
let currentFrameTime
let yVelocity
export function setupDuck() {
  isJumping = false
  duckFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(duckElem, "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
}

export function updateDuck(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getDuckRect() {
  return duckElem.getBoundingClientRect()
}

export function setDuckLose() {
  duckElem.src = "imgs/duck-lose.PNG"
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    duckElem.src = `imgs/duck-jump.PNG`
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    duckFrame = (duckFrame + 1) % DUCK_FRAME_COUNT
    duckElem.src = `imgs/duck-run-${duckFrame}.PNG`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}

function handleJump(delta) {
  if (!isJumping) return

  incrementCustomProperty(duckElem, "--bottom", yVelocity * delta)

  if (getCustomProperty(duckElem, "--bottom") <= 0) {
    setCustomProperty(duckElem, "--bottom", 0)
    isJumping = false
  }

  yVelocity -= GRAVITY * delta
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return

  yVelocity = JUMP_SPEED
  isJumping = true
}
