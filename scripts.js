const closeIcon = document.querySelector('#close-icon')
const coupon = document.querySelector('.coupon')

function closePopUp() {
    coupon.style.display = 'none'
}

closeIcon.addEventListener('click', closePopUp)

const restaurantWindow = document.querySelector('.restaurant-window')
const leftRestaurantButton = document.querySelector('.restaurant-left')
const rightRestaurantButton = document.querySelector('.restaurant-right')
const restaurantCards = document.querySelector('.restaurant-cards')

const widthRestaurantCards = restaurantCards.scrollWidth
const widthRestaurantWindow = restaurantWindow.offsetWidth
const maxRestaurantScroll = widthRestaurantCards - widthRestaurantWindow

let position = 0

function restaurantRightClick() {
    position -= 200

    position = Math.max(position, -maxRestaurantScroll)

    restaurantCards.style.transform = `translateX(${position}px)`

    if (position === -maxRestaurantScroll) {
        disabled(leftRestaurantButton, rightRestaurantButton)
    }
}

function restaurantLeftClick() {
    position += 200

    position = Math.min(position, 0)

    restaurantCards.style.transform = `translateX(${position}px)`

    if (position === 0) {
        disabled(rightRestaurantButton, leftRestaurantButton)
    }
}

rightRestaurantButton.addEventListener('click', restaurantRightClick)
leftRestaurantButton.addEventListener('click', restaurantLeftClick)

const marketWindow = document.querySelector('.market-window')
const leftMarketButton = document.querySelector('.market-left')
const rightMarketButton = document.querySelector('.market-right')
const marketCards = document.querySelector('.market-cards')

const widthMarketCards = marketCards.scrollWidth
const widthMarketWindow = marketWindow.offsetWidth
const maxMarketScroll = widthMarketCards - widthMarketWindow

function marketRightClick() {
    position -= 100

    position = Math.max(position, -maxMarketScroll)
    marketCards.style.transform = `translateX(${position}px)`

    if (position === -maxMarketScroll) {
        disabled(leftMarketButton, rightMarketButton)
    }

    leftMarketButton.disabled = false
}

function marketLeftClick() {
    position += 100

    position = Math.min(position, 0)
    marketCards.style.transform = `translateX(${position}px)`

    if (position === 0) {
        disabled(rightMarketButton, leftMarketButton)
    }
}

rightMarketButton.addEventListener('click', marketRightClick)
leftMarketButton.addEventListener('click', marketLeftClick)

function disabled(button1, button2) {
    button1.disabled = false
    button2.disabled = true
}

let startX
let isDragging = false

restaurantWindow.addEventListener('mousedown', (event) => {
    startX = event.clientX
    isDragging = true
    restaurantCards.style.cursor = 'grabbing'
})

marketWindow.addEventListener('mousedown', (event) => {
    startX = event.clientX
    isDragging = true
    marketCards.style.cursor = 'grabbing'
})

restaurantWindow.addEventListener('mousemove', (event) => {
    if (isDragging) {
        console.log('MOVENDO:', isDragging)
        currentX = event.clientX
        distance = currentX - startX
        position += distance
        position = Math.max(Math.min(position, 0), -maxRestaurantScroll)
        restaurantCards.style.transform = `translateX(${position}px)`
        startX = currentX
    }
})

marketWindow.addEventListener('mousemove', (event) => {
    if (isDragging) {
        currentX = event.clientX
        distance = currentX - startX
        position += distance
        position = Math.max(Math.min(position, 0), -maxMarketScroll)
        marketCards.style.transform = `translateX(${position}px)`
        startX = currentX
    }
})

document.addEventListener('mouseup', (event) => {
    isDragging = false
    restaurantCards.style.cursor = 'grab'
    marketCards.style.cursor = 'grab'
})

restaurantWindow.addEventListener('dragstart', (event) => {
    event.preventDefault()
})

marketWindow.addEventListener('dragstart', (event) => {
    event.preventDefault()
})