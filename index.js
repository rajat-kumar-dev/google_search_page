const backgrounds = [
  './pics/w0.jpg',
  './pics/w1.jpg',
  './pics/w2.jpg',
  './pics/w3.jpg',
  './pics/w4.jpg',
  './pics/w5.jpg',
  './pics/w6.jpg',
];
document.body.style.backgroundImage = `url(${
  backgrounds[new Date().getDay()]
})`;

const searchField = document.getElementById('search-input');
const searchType = document.getElementById('search-type');
const searchMicBtn = document.getElementById('search-mic-btn');
const searchMicIcon = document.getElementById('search-mic-icon');
const micListeningIcon = document.getElementById('mic-listening-icon');
const searchForm = document.getElementById('search-form');
const errorBox = document.getElementById('err-msg');

let speechRecognitionActive = false;

searchMicBtn.onclick = () => {
  if (!speechRecognitionActive) {
    startListening();
  } else {
    abortListening();
  }
};

searchForm.onsubmit = (e) => {
  if (searchType.value === 'images') {
    // searchForm.action = 'https://www.google.com/search';
  }
  if (searchType.value === 'videos') {
  }
  // e.preventDefault();
};

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.maxAlternatives = 1;
recognition.interimResults = false;
recognition.continuous = false;

let speech = [];
recognition.onresult = function (e) {
  speech[0] = e.results[e.resultIndex][0].transcript.trim();
  if (searchField.value === undefined) {
    searchField.value += speech[0];
  } else {
    searchField.value += ' ' + speech[0];
  }
  searchField.focus();
  // searchForm.submit();
};
recognition.onstart = () => {
  errorBox.textContent = '';
  speechRecognitionActive = true;
  searchMicIcon.classList.add('hidden');
  micListeningIcon.classList.remove('hidden');
};
recognition.onend = () => {
  micListeningIcon.classList.add('hidden');
  searchMicIcon.classList.remove('hidden');
  speechRecognitionActive = false;
};

recognition.onerror = function (e) {
  speechRecognitionActive = false;
  let errorMsg = '';
  console.log(e.error);
  switch (e.error) {
    case 'aborted': {
      break;
    }
    case 'no-speech': {
      errorMsg = 'No Speech Detected';
      break;
    }
    case 'network': {
      errorMsg = 'Network connection Errror';
      break;
    }
    case 'audio-capture': {
      errorMsg = "Couldn't detect audio";
      break;
    }
    case 'not-allowed': {
      errorMsg = 'Allow necessary permissions';
      break;
    }
    case 'service-not-allowed': {
      errorMsg = 'Service blocked by the Browser';
      break;
    }
    default: {
      errorMsg = 'Error: ' + e.error;
    }
  }
  errorBox.textContent = errorMsg;
  setTimeout(() => {
    errorBox.textContent = '';
  }, 4000);
};

function startListening() {
  recognition.start();
}
function abortListening() {
  recognition.abort();
}
let placeholders = [
  'Search Google',
  'Press Ctrl+K to input',
  'Press Ctrl+Shift+K to voice input',
];
let placeI = 1;
setInterval(() => {
  if (placeI === 3) {
    placeI = 0;
  }
  searchField.placeholder = placeholders[placeI++];
}, 10000);

window.addEventListener('contextmenu', (event) => event.preventDefault());
window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.code === 'KeyK') {
    if (!speechRecognitionActive) {
      startListening();
    } else {
      abortListening();
    }
  } else if (e.ctrlKey && e.code === 'KeyK') {
    e.preventDefault();
    searchField.focus();
  } else if (e.ctrlKey && e.code === 'KeyU') {
    e.preventDefault();
  } else if (e.ctrlKey && e.shiftKey && e.code === 'KeyI') {
    e.preventDefault();
  }
});
// window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
// window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
