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
    const btnSpan2 = document.createElement('span')
    btnSpan2.classList = `${monster.name} buttons`
    // Remove Button
    // const btn = document.createElement('button')
    // btn.innerText = 'Remove Monster'
    // btn.className = 'remove-btn'
    // btn.hidden = true
    // btn.addEventListener('click', (e) => deleteMonster(e))
    // btn.addEventListener('mouseover', (e) => changeColor(e))
    // btn.addEventListener('mouseleave', (e) => changeColorBack(e))

    const btn2 = document.createElement('button')
    btn2.innerText = 'Add Monster'
    btn2.classList = 'add-btn'
    btn2.addEventListener('click', (e) => addCopyOfMonsterToSelection(e))
    btn2.addEventListener('mouseover', (e) => changeColor(e))
    btn2.addEventListener('mouseleave', (e) => changeColorBack(e))
    btnSpan2.append(btn2)
    
    const div = document.createElement('div')
    div.id = `${monster.name}`

    if(monster.image){
        const img = document.createElement('img')
        img.src = `https://www.dnd5eapi.co${monster.image}`
        div.append(img)
    }

    div.append(h2, h4, p, p2, p3, btnSpan2)
    monsterCards.appendChild(div)
}

function displayMonsterCopy(){
    // Recreate monster card as new element using (previous div, new fetch) with remove btn
}

function deleteMonster(e){
    let selected = e.target.parentNode.parentNode
    selected.remove()
}

function addCopyOfMonsterToSelection(thisMonster){
    let newLocation = document.getElementById('monsters-field')
    let monsterClone = thisMonster.target.parentNode.parentNode.cloneNode(true)
    monsterClone.classList.add('selected-monster')
    monsterClone.removeAttribute('id')

    const btnSpan = monsterClone.querySelector('span')
    const btn = document.createElement('button')
    btn.innerText = 'Remove Monster'
    btn.className = 'remove-btn'
    btn.addEventListener('click', (e) => deleteMonster(e))
    btn.addEventListener('mouseover', (e) => changeColor(e))
    btn.addEventListener('mouseleave', (e) => changeColorBack(e))
    btnSpan.append(btn)
    monsterClone.append(btnSpan)

    newLocation.appendChild(monsterClone)
}

function changeColor(e){
    if(e.target.className === 'remove-btn'){
        e.target.className = 'red-btn-mouse-over'
    }
    if(e.target.className === 'add-btn'){
        e.target.className = 'blue-btn-mouse-over'
    }
}
function changeColorBack(e){
    if(e.target.className === 'red-btn-mouse-over'){
        e.target.classList.remove('red-btn-mouse-over')
    }
    if(e.target.className === 'blue-btn-mouse-over'){
        e.target.classList.remove('blue-btn-mouse-over')
    }
}

function monsterSearch(e){
    e.preventDefault()
    let MonsterHeader = document.getElementById('monster-cards').querySelectorAll('div')
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
    // .catch(err => console.alert(err))
}

function singleMonsterFetch(URL){
    return fetch(`https:www.dnd5eapi.co${URL}`)
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        displayMonsters(data)
    })
    // .catch(err => console.alert(err))
}