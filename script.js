const prezidentaSelectorBtn = document.querySelector('#prezidenta-selector')
const dakataSelectorBtn = document.querySelector('#dakata-selector')
const chatHeader = document.querySelector('.header')
const chatSuobshteniq = document.querySelector('.chat-suobshteniq')
const chatInputBtn = document.querySelector('.chat-input-button')
const chatInput = document.querySelector('.input')
const btnClear = document.querySelector('.button-clear')

const suobshteniq = JSON.parse(localStorage.getItem('suobshteniq')) || []

const napraviSuobshtenie = (suobshtenie) => `
<div class="suobshtenie ${suobshtenie.sender === 'Prezidenta' ? 'izprateni' : 'polucheni'}">
    <div class="sender">${suobshtenie.sender}</div>
    <div class="text">${suobshtenie.text}</div>
    <div class="timestamp">${suobshtenie.timestamp}</div>
</div>
`

window.onload = () => 
{
  suobshteniq.forEach((suobshtenie) => {
    chatSuobshteniq.innerHTML += napraviSuobshtenie(suobshtenie)
  })
}

let sender = 'Prezidenta'

const updateSender = (name) => 
{
  sender = name
  chatHeader.innerText = `${sender}`
  chatInput.placeholder = `Pishi tuk, ${sender}...`

  if (name === 'Prezidenta') {
    prezidentaSelectorBtn.classList.add('active-chat')
    dakataSelectorBtn.classList.remove('active-chat')
  }
  if (name === 'Dakata') {
    dakataSelectorBtn.classList.add('active-chat')
    prezidentaSelectorBtn.classList.remove('active-chat')
  }

  chatInput.focus()
}

prezidentaSelectorBtn.onclick = () => updateSender('Prezidenta')
dakataSelectorBtn.onclick = () => updateSender('Dakata')

const izprati = (e) => 
{
  e.preventDefault()

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const suobshtenie = 
  {
    sender: sender,
    text: chatInput.value, timestamp
  }

  suobshteniq.push(suobshtenie)
  localStorage.setItem('suobshteniq', JSON.stringify(suobshteniq))

  chatSuobshteniq.innerHTML += napraviSuobshtenie(suobshtenie)

  chatInputBtn.reset()

  chatSuobshteniq.scrollTop = chatSuobshteniq.scrollHeight
}

chatInputBtn.addEventListener('submit', izprati)

btnClear.addEventListener('click', () => 
{
  localStorage.clear()
  chatSuobshteniq.innerHTML = ''
})