// Variables
const formInput = document.getElementById('input-text-feild')
const formSubmit = document.getElementById('search-button')
const monsterCards = document.getElementById('monster-cards')
const form = document.getElementById('search-form')

// Page initial load function call
initialMonstersFetch()
// Event listeners
form.addEventListener('submit', (e) => monsterSearch(e))
// Functions
function displayMonsters(monster){
    const h2 = document.createElement('h2')
    h2.innerText = monster.name

    const p = document.createElement('p')
    p.innerText = 'Alignment: ' + monster.alignment

    const p2 = document.createElement('p')
    p2.innerText = 'Challenge Rating: ' + monster.challenge_rating

    const p3 = document.createElement('p')
    p3.innerText = 'XP: ' + monster.xp

    const h4 = document.createElement('h4')
    h4.innerText = 'Hit Points: ' + monster.hit_points

    const btnSpan = document.createElement('span')
    btnSpan.className = `delete-button ${monster.name}`

    const btn = document.createElement('button')
    btn.innerText = 'Remove Monster'
    btn.addEventListener('click', (e) => deleteMonster(e))
    btnSpan.append(btn)

    const div = document.createElement('div')
    div.id = `${monster.name}`
    // div.hidden = true

    div.append(h2, h4, p, p2, p3, btnSpan)
    monsterCards.appendChild(div)
}

function deleteMonster(e){
    e.target.parentNode.parentNode.hidden = true
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
}

function singleMonsterFetch(URL){
    return fetch(`https:www.dnd5eapi.co${URL}`)
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        displayMonsters(data)
    })
}