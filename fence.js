import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05
const FENCE_INTERVAL_MIN = 500
const FENCE_INTERVAL_MAX = 2000
const worldElem = document.querySelector("[data-world]")

let nextFenceTime
export function setupFence() {
  nextFenceTime = FENCE_INTERVAL_MIN
  document.querySelectorAll("[data-fence]").forEach(fence => {
    fence.remove()
  })
}

export function updateFence(delta, speedScale) {
  document.querySelectorAll("[data-fence]").forEach(fence=> {
    incrementCustomProperty(fence, "--left", delta * speedScale * SPEED * -1)
    if (getCustomProperty(fence, "--left") <= -100) {
      fence.remove()
    }
  })

  if (nextFenceTime <= 0) {
    createFence()
    nextFenceTime =
      randomNumberBetween(FENCE_INTERVAL_MIN, FENCE_INTERVAL_MAX) / speedScale
  }
  nextFenceTime -= delta
}

export function getFenceRects() {
  return [...document.querySelectorAll("[data-fence]")].map(fence => {
    return fence.getBoundingClientRect()
  })
}

function createFence() {
  const fence = document.createElement("img")
  fence.dataset.fence = true
  fence.src = "imgs/fence.png"
  fence.classList.add("fence")
  setCustomProperty(fence, "--left", 100)
  worldElem.append(fence)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
