// Variables
const formInput = document.getElementById('input-text-feild')
const formSubmit = document.getElementById('search-button')
const monsterCards = document.getElementById('monster-cards')
// Event Listeners
formSubmit.addEventListener('click', initialMonstersFetch)

// Functions
function fetchMonsters(e){
    e.preventDefault()
    initialMonstersFetch()
}

function displayMonsters(monster){
    const h3 = document.createElement('h3')
    h3.innerText = monster.name

    const p = document.createElement('p')
    p.innerText = monster.alignment

    const h4 = document.createElement('h4')
    h4.innerText = monster.hit_points

    const div = document.createElement('div')
    div.id = `${monster.name}`
    div.append(h3, h4, p)
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