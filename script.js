let boxes = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg'];
let basket = document.querySelector('.box-2');


let randInt = function (min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
};


for (let i = 0; i < boxes.length; i++) {
    let shuffle = function () {
        boxes.sort(() => Math.random() - 0.5);
    };

    let card = document.createElement('div');
    card.classList.add('card');
    basket.append(card);
    card.style.transform = `rotate(${randInt(-75, 75)}deg) translate(${randInt(-150, 150)}px, ${randInt(-70, 70)}px)`;

    card.innerHTML = `<img  src='images/${boxes[i]}' class = "img_hidden ">`;
    // присваиваем атрибуты
    card.setAttribute('draggable', true);
    shuffle();
}

let btn = document.querySelector('.btn');
btn.addEventListener('click', function () {
    window.location.reload();
    console.log(boxes);
});


let zone = document.querySelector('.zone');
let cards = document.querySelectorAll('.card');



let dragCard = '';

for (let i = 0; i < cards.length; i++) {
    let card = cards[i];


    card.addEventListener('dragstart', function () {
        dragCard = card;


        setTimeout(function () {
            card.classList.add('hide');
        }, 0);

    });

    card.addEventListener('dragend', function () {

        setTimeout(function () {
            card.classList.remove('hide');
        }, 0);
    });

    let text = document.querySelector('.text');

    zone.addEventListener('dragover', function (e) {
        e.preventDefault();
        text.classList.add('text_hidden');

    });

    zone.addEventListener('dragenter', function (e) {
        e.preventDefault();

    });

    let count = '';
    zone.addEventListener('drop', function () {
        if (count <= 3) {
            this.append(dragCard);
            dragCard.classList.add('move');
            dragCard.classList.remove('card');
            dragCard.style.transform = 'rotate(0deg) translate(0px, 0px)';

        }
        count++;

        if (count > 2) {
            card.setAttribute('draggable', false);
            let boxTwo = document.querySelector('.box-2');
            boxTwo.classList.add('hidden');

            let pictures = document.querySelectorAll('img');
            for (let j = 0; j < pictures.length; j++) {
                let picture = pictures[j];
                picture.classList.remove('img_hidden');
                picture.classList.add('img_visible');
                picture.style.transform = 'rotate(0deg) translate(0px, 0px)';
                picture.classList.add('big_img');

            }

            let moves = document.querySelectorAll('.move');
            for (let m = 0; m < moves.length; m++) {
                let move = moves[m];
                move.classList.remove('move');
                move.classList.add('big_move');
                move.style.transform = 'rotate(0deg) translate(0px, 0px)';

            }

            let zone = document.querySelector('.zone');
            zone.style.justifyContent = 'center';
            let contaner = document.querySelector('.contaner');
            contaner.classList.add('contaner_big');
            let normalBox = document.querySelectorAll('.box');
            normalBox[0].classList.add('box_big');
            normalBox[0].classList.remove('box-1');
            let head = document.querySelector('.header_hidden');
            head.classList.remove('header_hidden');
            head.classList.add('header_visibl');

        }
    });



    basket.addEventListener('dragover', function (e) {
        e.preventDefault();

    });

    basket.addEventListener('dragenter', function (e) {
        e.preventDefault();
    });

    basket.addEventListener('drop', function () {
        card.setAttribute('draggable', true);
        this.append(dragCard);
        dragCard.classList.add('card');
        dragCard.classList.remove('move');
        count--;

    });

}