// Variables
const formInput = document.getElementById('input-text-feild')
const formSubmit = document.getElementById('search-button')

// Event Listeners
formSubmit.addEventListener('click', displayMonsters)

// Functions
function displayMonsters(e){
    e.preventDefault()
    getMonstersFetch()
}


// Fetch Functions
function getMonstersFetch(){
    return fetch('https://www.dnd5eapi.co/api/monsters/')
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        const monsterArray = data.id
        console.log(monsterArray)
    })
}