let pageNumber = 1
const limitLength = 50

document.addEventListener('DOMContentLoaded',()=>{
    fetch(`http://localhost:3000/monsters?_limit=${limitLength}&_page=${pageNumber}`)
    .then(resp=>resp.json())
    .then(data=>{
        data.forEach(monster=>printMonster(monster))
    })

    createMonsterForm()

    document.getElementById('monster-form').addEventListener('submit',e=>{
        e.preventDefault()
        const name = document.querySelector('input#name-input').value
        const age = document.querySelector('input#age-input').value
        const description = document.querySelector('input#description-input').value
        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({name: name, age: age, description: description})
        })
    })

    const forwardButton = document.getElementById('forward')
    forwardButton.addEventListener('click', e=>nextPage(e))
    const backButton = document.getElementById('back')
    backButton.addEventListener('click', e=>previousPage(e))
})

function printMonster(monsterInfo){
    const monsterContainer = document.getElementById('monster-container')
    const monsterDiv = document.createElement('div')
    const monsterName = document.createElement('h2')
    const monsterAge = document.createElement('h4')
    const monsterBio = document.createElement('p')

    monsterName.innerText = monsterInfo.name
    monsterAge.innerText = `Age: ${monsterInfo.age}`
    monsterBio.innerText = `Bio: ${monsterInfo.description}`

    monsterDiv.appendChild(monsterName)
    monsterDiv.appendChild(monsterAge)
    monsterDiv.appendChild(monsterBio)

    monsterContainer.appendChild(monsterDiv)
 }

 function createMonsterForm(){
    const formContainer = document.getElementById('create-monster')
    const monsterForm = document.createElement('form')
    monsterForm.id = 'monster-form'
    
    const nameInput = document.createElement('input')
    nameInput.id = 'name-input'
    nameInput.type = 'text'
    nameInput.name = 'Name'
    nameInput.placeholder = 'Name'

    const ageInput = document.createElement('input')
    ageInput.id = 'age-input'
    ageInput.type = 'text'
    ageInput.name = 'Age'
    ageInput.placeholder = 'Age'

    const descriptionInput = document.createElement('input')
    descriptionInput.id = 'description-input'
    descriptionInput.type = 'text'
    descriptionInput.name = 'Description'
    descriptionInput.placeholder = 'Description'

    const submitButton = document.createElement('input')
    submitButton.type = 'submit'
    submitButton.name = 'Create monster'

    monsterForm.appendChild(nameInput)
    monsterForm.appendChild(ageInput)
    monsterForm.appendChild(descriptionInput)
    monsterForm.appendChild(submitButton)
    formContainer.appendChild(monsterForm)
 }
 function nextPage(event){
    pageNumber+=1
    fetch(`http://localhost:3000/monsters?_limit=${limitLength}&_page=${pageNumber}`)
    .then(resp=>resp.json())
    .then(data=>{
        if(data.length>0){
            document.getElementById('monster-container').innerText = ''
            data.forEach(monster=>printMonster(monster))
            console.log(data)
        } else {
            pageNumber-=1
        }
    })
 }

 function previousPage(event){
    if(pageNumber-1>0){
        document.getElementById('monster-container').innerText = ''
        pageNumber-=1
        fetch(`http://localhost:3000/monsters?_limit=${limitLength}&_page=${pageNumber}`)
        .then(resp=>resp.json())
        .then(data=>{data.forEach(monster=>printMonster(monster))})
    }
 }