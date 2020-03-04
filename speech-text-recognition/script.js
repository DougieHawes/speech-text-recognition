const main = document.querySelector('main')
const voicesSelect = document.getElementById('voices')
const textArea = document.getElementById('text')
const readBtn = document.getElementById('read')
const toggleBtn = document.getElementById('toggle')
const closeBtn = document.getElementById('close')

const data = [
    {
        image: './img/thirsty.png',
        text: 'I\'m thirsty'
    },
    {
        image: './img/hungry.png',
        text: 'I\'m hungry'
    },
    {
        image: './img/tired.png',
        text: 'I\'m tired'
    },
    {
        image: './img/hurt.png',
        text: 'I\'m hurt'
    },
    {
        image: './img/happy.png',
        text: 'I\'m happy'
    },
    {
        image: './img/angry.png',
        text: 'I\'m angry'
    },
    {
        image: './img/sad.png',
        text: 'I\'m sad'
    },
    {
        image: './img/scared.png',
        text: 'I\'m scared'
    },
    {
        image: './img/outside.png',
        text: 'I want to go outside'
    },
    {
        image: './img/home.png',
        text: 'I want to go home'
    },
    {
        image: './img/school.png',
        text: 'I want to go to school'
    },
    {
        image: './img/grandma.png',
        text: 'I want to go to Grandmas'
    }
]

data.forEach(createBox)

function createBox(item) {
    const box = document.createElement('div')

    const { image, text } = item

    box.classList.add('box')
    box.innerHTML = `
        <img src='${image}' alt='${text}' />
        <p class='info'>${text}</p>
    `

    box.addEventListener('click', () => {
        setTextMessage(text)
        speakText()

        box.classList.add('active')
        setTimeout(() => box.classList.remove('active'), 700)
    })

    main.appendChild(box)
}

const message = new SpeechSynthesisUtterance()

let voices = []

function getVoices() {
    voices = speechSynthesis.getVoices();
  
    voices.forEach(voice => {
      const option = document.createElement('option');
  
      option.value = voice.name;
      option.innerText = `${voice.name} ${voice.lang}`;
  
      voicesSelect.appendChild(option);
    });
  }

function setTextMessage(text) {
    message.text = text
}

function speakText() {
    speechSynthesis.speak(message)
}

function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value)
}

speechSynthesis.addEventListener('voiceschanged', getVoices)

toggleBtn.addEventListener('click', () => 
    document.getElementById('text-box').classList.toggle('show')
    )

closeBtn.addEventListener('click', () => 
    document.getElementById('text-box').classList.remove('show')
    )

voicesSelect.addEventListener('change', setVoice)

readBtn.addEventListener('click', () => {
    setTextMessage(textArea.value)
    speakText()
})

getVoices()