// Formulário
function populateUfs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json())
        .then(states => {

            for(const state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

            }

        })
}

populateUfs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true   

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
        .then( res => res.json())
        .then (cities => {
            
            for(const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        }) 
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// Ítens de coleta
// Pegar os li's

const itemsToCollect = document.querySelectorAll(".itens-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // adicionar ou remover a classe
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id
    

    // Verificar se existe itens selecionados, se sim
    // Pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })

    // Se estiver selecionado
    if(alreadySelected >= 0) {
        // Tirar da selecao
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems

    } else {
        // Se nao estiver selecionado 
        // adicionar à selecao
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems
}