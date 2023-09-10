// Define a class for the combined input
class CombinedInput {
    constructor(inputId, optionsListId) {
        //Selected important elements to manipulate the DOM
        this.input = document.getElementById(inputId);
        this.optionsList = document.getElementById(optionsListId);
        this.optionElements = this.optionsList.getElementsByTagName('li');
        this.btn = document.querySelector('button')
        
        // Event listeners
        this.input.addEventListener('click', this.toggleOptionsList.bind(this));
        
        this.btn.addEventListener('click', ()=>{
        this.optionsList.classList.add('hidden');
        })
        
        for (const option of this.optionElements) {
            option.addEventListener('click', () => this.selectOption(option));
        }

    }

    //Class Methods

    toggleOptionsList() {
        this.optionsList.classList.toggle('hidden');
    }

    selectOption(option) {
        this.input.value = option.textContent;
        this.toggleOptionsList();
    }
}

// Create an instance of the CombinedInput class
const combinedInput = new CombinedInput('customInput', 'optionsList');

class jokesMachine {
    constructor(inputVal){
        //Selected important elements to manipulate the DOM and variables
        this.inputVal = document.querySelector('#customInput')
        this.form = document.querySelector('form')
        this.jokes = document.querySelector('.jokes')
        this.categories = ['Any', 'Programming', 'Misc', 'Dark', 'Pun', 'Spooky']  

        //Event Listeners   
        this.form.addEventListener('submit', (e)=>{
            e.preventDefault()
            this.flag = 0
            // console.log(this.inputVal.value); ------- debugger
            this.formValue = this.inputVal.value
            // console.log(this.formValue); ------------ debugger

            //Loop through the options to check whether its a custom input or not and call the api accordingly
            for(const option in this.categories){
                if(this.categories[option] === this.formValue){
                    // console.log(`https://v2.jokeapi.dev/joke/${this.formValue}`); ----- debugger
                    const data = fetch(`https://v2.jokeapi.dev/joke/${this.formValue}`)
                    .then(Response => Response.json())
                    .then(data => this.display(data))
                    .catch(error => console.log(error))
                    this.flag = 1;
                }
            }
            // console.log(this.flag); --------- debugger
            if(this.flag === 0){
                // console.log(`https://v2.jokeapi.dev/joke/Any?contains=${this.formValue}`); ------- debugger
                    const data = fetch(`https://v2.jokeapi.dev/joke/Any?contains=${this.formValue}`)
                    .then(Response => Response.json())
                    .then(data => this.display(data))
                    .catch(error => console.log(error))
            }
            this.inputVal.value = '';
        })
        
        // console.log("class is called"); ----- debugger    
    }
    // Display method to display the output or the error on the page
    display(data){
        if(data.type === 'twopart'){
            this.jokes.innerHTML =`<p>${data.setup}</p> <p>${data.delivery}</p>`
            // console.log(data.setup); --------- debugger
        } else if(data.type === 'single') {
            this.jokes.innerHTML =`<p>${data.joke}</p>`
        } else{
            this.jokes.innerHTML =`<p>${data.message}</p>`
        };
    };
}

// Create an instance of the jokeMachine class
const JokesMachine = new jokesMachine('customInput');


