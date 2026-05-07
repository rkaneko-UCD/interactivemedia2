(function () {
    'use strict';
    console.log('Reading JS'); 

    const myForm = document.querySelector('#madlibsForm');
    const storyOutput = document.querySelector('#storyOutput');

    myForm.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const adj1 = document.querySelector('#adjective1').value;
        const place = document.querySelector('#place').value;
        const noun = document.querySelector('#noun').value;
        const verb = document.querySelector('#verbIng').value;
        const adj2 = document.querySelector('#adjective2').value;
        const pluralNoun = document.querySelector('#pluralNoun').value;
        const emotion = document.querySelector('#emotion').value;

        let myText; 
        
      
        if (adj1 == '') {
            myText = "<span class='error-msg'>Please provide an adjective</span>";
            document.querySelector('#adjective1').focus();
        } 
        else if (place == '') {
            myText = "<span class='error-msg'>Please provide a place</span>";
            document.querySelector('#place').focus();
        } 
        else if (noun == '') {
            myText = "<span class='error-msg'>Please provide a noun</span>";
            document.querySelector('#noun').focus();
        } 
        else if (verb == '') {
            myText = "<span class='error-msg'>Please provide a verb</span>";
            document.querySelector('#verbIng').focus();
        } 
        else if (adj2 == '') {
            myText = "<span class='error-msg'>Please provide another adjective</span>";
            document.querySelector('#adjective2').focus();
        } 
        else if (pluralNoun == '') {
            myText = "<span class='error-msg'>Please provide a plural noun</span>";
            document.querySelector('#pluralNoun').focus();
        } 
        else if (emotion == '') {
            myText = "<span class='error-msg'>Please provide an emotion</span>";
            document.querySelector('#emotion').focus();
        } 
        
        else {
        
            myText = `<h2>A Dream in Marshmallow Land</h2>
            <p>On one lovely morning, I woke up feeling extremely <span class="user-word">${adj1}</span> and embarked on a journey to the enigmatic <span class="user-word">${place}</span>. Upon arrival, I was warmly welcomed by an amiable <span class="user-word">${noun}</span> who was <span class="user-word">${verb}</span> atop a humongous marshmallow. Everything appeared utterly <span class="user-word">${adj2}</span>! In a sudden flurry, showers of <span class="user-word">${pluralNoun}</span> rained down from above, shining in every hue of the spectrum. I was deeply moved by a strong sense of <span class="user-word">${emotion}</span>, realizing that anything was achievable in this surreal world.</p>`;

       
            myForm.reset();
        }

        storyOutput.innerHTML = myText;
    });
})();
