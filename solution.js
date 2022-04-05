function solve() {
    //get references to elements of interest
    //configure event listeners
    const fields = document.querySelectorAll('#container input');
    const addBtn = document.querySelector('#container button');
    const petList = document.querySelector('#adoption ul');
    const adoptedList = document.querySelector('#adopted ul');

    const input = {
        name: fields[0],
        age: fields[1],
        kind: fields[2],
        owner: fields[3],
    }

    addBtn.addEventListener('click',addPet);

    //#Add new pet:
    //Read input fields and validate values
    //Create new list element.
    //Configure event listener for new created element.
    function addPet(event){

        event.preventDefault();

        const name = input.name.value.trim();
        const age = Number(input.age.value.trim());
        const kind = input.kind.value.trim();
        const owner = input.owner.value.trim();

        if (name == '' || Number.isNaN(age) || input.age.value == '' || kind == '' || owner =='') {
            return;
        }

        const contactBtn = e('button',{},'Contact with owner');

        const pet = e('li',{},
        e('p',{},
            e('strong',{},name),
            ' is a ',
            e('strong',{},age),
            ' year old ',
            e('strong',{},kind)),
        e('span', {},`Owner: ${owner}`),
        contactBtn
        );

        contactBtn.addEventListener('click',contact);

        petList.appendChild(pet);

        //Cleaning of the form: 
        input.name.value = '';
        input.age.value = '';
        input.kind.value = '';
        input.owner.value = '';

        //OR
       // Array.from(fields).forEach(f=> f.value = '');
       
       //OR.
    //    const form = document.querySelector('form');
    //    form.reset();

        //#Contact owner:
        //Create confirmation div
        //Configure event listener for new button.
        //Replace existing button with confirmation div.
        function contact(){
            const confirmInput = e('input', {placeholder: 'Enter your names'});
            const confirmBtn = e('button',{},'Yes! I take it!');
            const confirmDiv = e('div', {},
            confirmInput,
            confirmBtn
            );

            confirmBtn.addEventListener('click',adopt.bind(null,confirmInput,pet));

            contactBtn.remove();
            pet.appendChild(confirmDiv);
        }
    }


    
    //#Adopt a pet:
    //When button is clicked: read and validate Input
    //Create "Checked" button
    //Configure event listener for new button.
    //Replace confirmation div with new button.
    //Change text content of the owner <span>
    //Move element to the other list
    function adopt(input,pet){
        const newOwner = input.value.trim();

        if (newOwner == '') {
            return;
        }

        const checkBtn = e('button',{},'Checked');
        checkBtn.addEventListener('click',check.bind(null,pet));

        pet.querySelector('div').remove();

        pet.appendChild(checkBtn);

        pet.querySelector('span').textContent = `New Owner: ${newOwner}`;

        adoptedList.appendChild(pet);

    }

    //#Checking of adopted pet:
    //Remove element from the DOM.
    function check(pet){
        pet.remove();
    }

    function e(type,attributes, ...content) {
        const element = document.createElement(type);

        for (let prop in attributes) {
           element[prop] = attributes[prop];
        }

        for (let item of content) {
            if (typeof item =='string' || typeof item == 'number') {
                item = document.createTextNode(item);
            }
            element.appendChild(item);
        }

        return element;
    }
}

