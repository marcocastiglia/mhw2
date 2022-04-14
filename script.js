/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function testRestart() {
    const section = document.querySelector('.results');
    section.classList.add('hidden');

    for(let e of elements) {
        e.addEventListener('click', select);
        e.classList.remove('selected');
        e.classList.remove('not-selected');
        e.querySelector('.checkbox').src = "./images/unchecked.png";
    }

    window.scroll({
        top: 0,
        behavior: "smooth"
    })

    console.log('Quiz restart.');
}

function show_results() {
    const answersId = [];
    for(let e of elements) {
        if(e.classList.contains('selected')) {
            answersId.push(e.dataset.choiceId);
        }
    }

    const count = [];
    for(let i = 0; i<answersId.length; i++) {
        count[i] = 0;
        for( let j = 0; j<answersId.length; j++) {
            if(answersId[i]==answersId[j])
                count[i]++;
        }
    }
    
    var ind = 0;
    for(let i=num_quest; i>0; i--) {
        if(count.includes(i)) {
            ind = count.indexOf(i);
            break;
        }
    }

    const cID = answersId[ind];
    const obj = RESULTS_MAP[cID];

    const section = document.querySelector('.results');

    const title = section.querySelector('h1');
    title.textContent = obj.title;
    const par = section.querySelector('p');
    par.textContent = obj.contents;

    section.classList.remove('hidden');


    /* Ho voluto aggiungere questa 'animazione' 
       anche se non è stata trattata a lezione,
       per rendere più visibile il risultato finale */
    
    /* Purtroppo però questa funzione potrebbe non 
       essere supportata da tutti i browsers*/
    window.scroll({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    })
}

function isComplete() {
    var num_selected = 0;
  
    for(let e of elements) {
        if(e.classList.contains('selected')) {
            num_selected++;
        }
    }
    
    if(num_selected==num_quest) {
        for(let e of elements) 
            e.removeEventListener('click',select);
        
        return 1;
    }
        
    return 0;
}

function select(event) {
    const sel_el = event.currentTarget;

    for (let e of elements)
        if(e.dataset.questionId == sel_el.dataset.questionId) {
            if(e.classList.contains('selected'))
                e.classList.remove('selected');

            e.classList.add('not-selected');
            e.querySelector('.checkbox').src = "./images/unchecked.png";
        }

    sel_el.classList.remove('not-selected');
    sel_el.classList.add('selected');  
    sel_el.querySelector('.checkbox').src = "./images/checked.png";

    console.log("Click.")

    if(isComplete()) {
        show_results();
        console.log('Quiz completed.');
    }   
}




const elements = document.querySelectorAll('.choice-grid div');
for (let i = 0; i<elements.length; i++) {
    elements[i].addEventListener('click', select);
}

let num_quest = 1;
for(let i = 1; i < elements.length; i++) {
    if(elements[i].dataset.questionId != elements[i-1].dataset.questionId)
    num_quest++;
}

const restart = document.querySelector('.results button');
restart.addEventListener('click', testRestart);