// Variables
const formInput = document.getElementById('input-text-feild')
const formSubmit = document.getElementById('search-button')
const monsterCards = document.getElementById('monster-cards')
// Event Listeners
// formSubmit.addEventListener('click', initialMonstersFetch)

initialMonstersFetch()

// Functions
// function fetchMonsters(e){
//     e.preventDefault()
//     initialMonstersFetch()
// }

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

    const div = document.createElement('div')
    div.id = `${monster.name}`
    div.append(h2, h4, p, p2, p3)
    monsterCards.appendChild(div)
}


// Fetch Functions
function initialMonstersFetch(){
    return fetch('https://www.dnd5eapi.co/api/monsters/')
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
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
        console.log(data)
        displayMonsters(data)
    })
}