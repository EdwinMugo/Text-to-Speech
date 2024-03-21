// grab a reference to the speechsynthesis controller
const synth = window.speechSynthesis;

// Dom Elements
const textArea = document.querySelector('textarea');
const speechBtn = document.querySelector('button');
const voiceSelect = document.querySelector('select');
const inputForm = document.querySelector('form');
const container = document.querySelector('.container');



// retrieve voices available and populate them in the dropdown for user to select
function populateTheVoices (){

    //retrieve list of voices available through getVoices() method
  const voices = synth.getVoices();

 for(let i = 0; i < voices.length; i++){
    const options = document.createElement('option');
    options.textContent = `${voices[i].name} (${voices[i].lang})`;

    if(voices[i].default){
        options.textContent +="--DEFAULT";
    }

    options.setAttribute('data-lang', voices[i].lang);
    options.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(options);
 
}
}

// to support old browsers and chrome browsers that have to wait for the voicechanged event to fire before populating the list
populateTheVoices();
if(speechSynthesis.onvoiceschanged !== undefined){
    speechSynthesis.onvoiceschanged = populateTheVoices;
}

// event handler triggered when listen btn is clicked to start speaking the text written
speechBtn.addEventListener('click', () =>{

    // check if there is text in the text area
    if(textArea.value.trim() !== ''){

    // disable the listening button when the speech is synthesized
    speechBtn.disabled = true;

    // Show the animated background
    container.style.background = 'url(\'./images/Wave.gif\')';

    // Create a new instance of the speechSyntheisUtterance Object
    const message = new SpeechSynthesisUtterance(textArea.value);
    
    // Set the selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
    const voices = synth.getVoices();
    for (const voice of voices) {
        if (voice.name === selectedVoice) {
            message.voice = voice;
            break;
        }
    }
    
    // Speech synthesis event listeners
    message.onend = function() {
        // Re-enable the listen button after speech synthesis ends
        speechBtn.disabled = false;

        // Hide the animated background after speech synthesis ends
        container.style.background = '';
    
    };
    
    // Use the SpeechSynthesis API to speak the text
    synth.speak(message);
} else{
    alert('Please enter some text to listen');
}
});

