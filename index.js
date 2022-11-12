// Variables
const formInput = document.getElementById('input-text-feild')
const monsterCards = document.getElementById('monster-cards')
const form = document.getElementById('search-form')
const battleField = document.getElementById('monsters-field')

// Page initial load function call
initialMonstersFetch()

// Event listeners
form.addEventListener('submit', (e) => monsterSearch(e))

// Functions
function displayMonsters(monster){
    // Monster Name
    const h2 = document.createElement('h2')
    h2.innerText = monster.name
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
    h4.innerText = 'Hit Points: ' + monster.hit_points
    // Button Span
    const btnSpan = document.createElement('span')
    btnSpan.className = `${monster.name} buttons`
    // Remove Button
    const btn = document.createElement('button')
    btn.innerText = 'Remove Monster'
    btn.id = 'remove-btn'
    btn.hidden = true
    btn.addEventListener('click', (e) => deleteMonster(e))
    btn.addEventListener('mouseover', (e) => changeColor(e))
    btn.addEventListener('mouseleave', (e) => changeColorBack(e))

    const btn2 = document.createElement('button')
    btn2.innerText = 'Add Monster'
    btn2.id = 'add-btn'
    btn2.addEventListener('click', (e) => addCopyOfMonsterToSelection(e))
    btn2.addEventListener('mouseover', (e) => changeColor(e))
    btn2.addEventListener('mouseleave', (e) => changeColorBack(e))
    btnSpan.append(btn, btn2)
    
    const div = document.createElement('div')
    div.id = `${monster.name}`

    if(monster.image){
        const img = document.createElement('img')
        img.src = `https://www.dnd5eapi.co${monster.image}`
        div.append(img)
    }

    div.append(h2, h4, p, p2, p3, btnSpan)
    monsterCards.appendChild(div)
}

function deleteMonster(e){
    e.target.parentNode.parentNode.hidden = true
}

function addCopyOfMonsterToSelection(thisMonster){
    let newLocation = document.getElementById('monsters-field')
    let monsterClone = thisMonster.target.parentNode.parentNode.cloneNode(true)
    newLocation.appendChild(monsterClone)
}

function changeColor(e){
    if(e.target.id === 'remove-btn'){
        e.target.className = 'red-btn-mouse-over'
    }
    if(e.target.id === 'add-btn'){
        e.target.className = 'blue-btn-mouse-over'
    }
}
function changeColorBack(e){
    e.target.className = ''
}

function monsterSearch(e){
    e.preventDefault()
    let MonsterHeader = document.querySelectorAll('div')
    MonsterHeader.forEach(monster => {
        let input = formInput.value.toUpperCase()
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

// Fetch Functions
function initialMonstersFetch(){
    return fetch('https://www.dnd5eapi.co/api/monsters/')
    .then(resp => resp.json())
    .then(data => {
        const monsterArray = data.results
        monsterArray.forEach(monster => {
            singleMonsterFetch(`${monster.url}`)
        })
    })
    .catch(err => console.alert(err))
}

function singleMonsterFetch(URL){
    return fetch(`https:www.dnd5eapi.co${URL}`)
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        displayMonsters(data)
    })
}