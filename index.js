// Global Variables
const formInput = document.getElementById('input-text-field')
const monsterCards = document.getElementById('monster-cards')
const form = document.getElementById('search-form')

// Page initial Fetch for loading Monster Cards
initialMonstersFetch()

// Global Event listeners
form.addEventListener('submit', (e) => monsterSearch(e))

// CREATION FUNCTION ------------------------------------------------------------------------------
// Creates all the monster cards based off of information from the initial fetch request
function displayMonsters(monster){
    console.log(monster)
    // Monster Name
    const h2 = document.createElement('h2')
    h2.innerText = monster.name

    // Monster Hit Dice
    const h3 = document.createElement('h4')
    h3.innerText = 'Hit Dice: ' + monster.hit_dice

    // Monster Alignment
    const p = document.createElement('p')
    p.innerText = 'Alignment: ' + monster.alignment

    // Challenge Rating
    const p2 = document.createElement('p')
    p2.innerText = 'Challenge Rating: ' + monster.challenge_rating

    // XP
    const p3 = document.createElement('p')
    p3.innerText = 'XP: ' + monster.xp

    // Hit Points
    const h4 = document.createElement('h4')
    h4.innerText = 'Hit Point Average: ' + monster.hit_points

    // Button Span
    const btnSpan2 = document.createElement('span')
    btnSpan2.classList = `${monster.name} buttons`

    // Creates Add Button & Event Listeners
    const btn2 = document.createElement('button')
    btn2.innerText = 'Add Monster'
    btn2.classList = 'add-btn'
    btn2.addEventListener('click', (e) => addCopyOfMonsterToSelection(e))
    btn2.addEventListener('mouseover', (e) => changeColor(e))
    btn2.addEventListener('mouseleave', (e) => changeColorBack(e))
    btnSpan2.append(btn2)

    // Div Creation
    const div = document.createElement('div')
    div.id = `${monster.name}`

    // Image => Only if there is an image
    if(monster.image){
        const img = document.createElement('img')
        img.src = `https://www.dnd5eapi.co${monster.image}`
        div.append(img)
    }

    div.append(h2, h4, h3, p, p2, p3, btnSpan2)
    monsterCards.appendChild(div)
}
// END OF CREATION FUNCTION------------------------------------------------------------------------

// Functions
// Deletes Monster from the Selected Monsters area
function deleteMonster(e){
    const selected = e.target.parentNode.parentNode
    selected.remove()
}

// Adds a copy of the selected monster to the Selected Monster Area
// Also adds the Event Listeners for the Remove Monster button
function addCopyOfMonsterToSelection(thisMonster){
    const newLocation = document.getElementById('monsters-field')
    const monsterClone = thisMonster.target.parentNode.parentNode.cloneNode(true)

    // Adding Class, Removing id, Removing Add Button
    monsterClone.classList.add('selected-monster')
    monsterClone.removeAttribute('id')
    monsterClone.querySelector('span').children[0].remove()

    // Creates new span for moving button with CSS
    const btnSpan = monsterClone.querySelector('span')
    const btn = document.createElement('button')

    // Creates Remove Button & Event Listeners
    btn.innerText = 'Remove Monster'
    btn.className = 'remove-btn'
    btn.addEventListener('click', (e) => deleteMonster(e))
    btn.addEventListener('mouseover', (e) => changeColor(e))
    btn.addEventListener('mouseleave', (e) => changeColorBack(e))

    // Appending
    btnSpan.append(btn)
    monsterClone.append(btnSpan)
    newLocation.appendChild(monsterClone)
}

// Functions for mouseover & mouseleave Event Listeners
// Changes the colors of the buttons when the mouse is over
// Changes the colors of the buttons back when mouse leaves
function changeColor(btn){
    if(btn.target.className === 'remove-btn'){
        btn.target.classList.toggle('red-btn-mouse-over')
    }
    if(btn.target.className === 'add-btn'){
        btn.target.classList.toggle('blue-btn-mouse-over')
    }
}
function changeColorBack(btn){
    if(btn.target.className === 'remove-btn red-btn-mouse-over'){
        btn.target.classList.toggle('red-btn-mouse-over')
    }
    if(btn.target.className === 'add-btn blue-btn-mouse-over'){
        btn.target.classList.toggle('blue-btn-mouse-over')
    }
}

// Monster Search Function, Allows for Name search, Search by letter, And Clears to show all Monster Cards
function monsterSearch(e){
    e.preventDefault()
    const monsterHeader = document.getElementById('monster-cards').querySelectorAll('div')
    monsterHeader.forEach(monster => {
        const input = formInput.value.toUpperCase()
        if(input === ''){
            monster.hidden = false
        }
        if(input.length === 1){
            input !== monster.id.charAt(0) ? monster.hidden = true: monster.hidden = false
        }
        if(input.length > 1){
            input !== monster.id.toUpperCase() ? monster.hidden = true : monster.hidden = false
        }
    })
}

// Fetch Functions For getting all the API Information for the monsters
function initialMonstersFetch(){
    return fetch('https://www.dnd5eapi.co/api/monsters/')
    .then(resp => resp.json())
    .then(data => {
        const monsterArray = data.results
        monsterArray.forEach(monster => {
            singleMonsterFetch(`${monster.url}`)
        })
    })
    .catch(err => console.log(err))
}

function singleMonsterFetch(URL){
    return fetch(`https://www.dnd5eapi.co${URL}`)
    .then(resp => resp.json())
    .then(data => {
        displayMonsters(data)
    })
    .catch(err => console.log(err))
}

