const popupContainer = document.querySelector('.popup__container');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.form');
const formAdd = document.querySelector('.form__add');
const edit = document.querySelector('.profile__edit-button');
const popupExit = document.querySelector('.popup__container-exit');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const nameInput = formElement.querySelector('.form__input_profile_name');
const subnameInput = formElement.querySelector('.form__input_profile_subname');
const profile = document.querySelector('.profile');
const addCard = document.querySelector('.profile__button-add');
const pictureName = document.querySelector('.popup__picture-name');
const fullSize = document.getElementById('popup-fullsize');
const fotoTemplate = document.querySelector('.fotos')
const picture = document.querySelector('.popup__picture');
const popupProfile = document.getElementById('popup-profile');
const addPicture = document.getElementById('add-picture');
const fullPictureClose = document.querySelector('.popup__pictrure-close');
const inputName = document.getElementById('namePicture');
const inputLink = document.getElementById('linkPicture');
const addCardExit = document.getElementById('add-card-exit');
const closeFullSize = document.getElementById('close-fullsize');
const formAddCard = document.getElementById('form-add');
const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',

    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',

    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',

    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',

    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',

    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',

    }
];


//Функция добавления карточек, с функцией лайков, удаления карточек, открытия попапа (большая картинка)
function getItem(name, link) {
    const fotoTemplate = document.querySelector('.fotos').content;
    newCard = fotoTemplate.querySelector('.foto').cloneNode(true);

    newCard.querySelector('.foto__title').textContent = name;
    let fotoImage = newCard.querySelector('.foto__image').src = link;
    fotoImage.alt = name;

    newCard.querySelector('.foto__like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('foto__active');
    });

    newCard.querySelector('.foto__delete').addEventListener('click', function(evt) {
        evt.target.closest('.foto').remove();
    });

    newCard.querySelector('.foto__image').addEventListener('click', function(openFull) {
        pictureName.textContent = name;
        picture.alt = name;
        picture.src = link;
        openPopup(fullSize);

    });
    return newCard;
}

function openPopup(popupName) {
    popupName === fullSize ? popupName.classList.add('popup_opened-full') : popupName.classList.add('popup_opened');
    if (popupName === popupProfile) {
        nameInput.value = profileTitle.textContent;
        subnameInput.value = profileSubtitle.textContent;

    }
};

function closePopup(popupName) {
    popupName === fullSize ? popupName.classList.remove('popup_opened-full') : popupName.classList.remove('popup_opened');
};



initialCards.forEach(function(item) {
    const newCard = getItem(item.name, item.link);
    fotoTemplate.append(newCard);
});

//Функция создание пользователем новой карточки, с помощью вызова функции addCard и обработчика событий сабмит
function newFoto() {
    getItem(inputName.value, inputLink.value);
    const newCard = getItem(inputName.value, inputLink.value);
    fotoTemplate.prepend(newCard);
    closePopup(addPicture);
    formElement.reset();
};

// Popup profile
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = subnameInput.value;
    closePopup(popupProfile);
    formElement.reset();
}
//Popup Card
function addCardSubmitHandler(evt) {
    evt.preventDefault();
    const newCard = getItem(inputName.value, inputLink.value);
    closePopup(addPicture);
    formElement.reset();
};



closeFullSize.addEventListener('click', () => { closePopup(fullSize) }); // Закрывает большую картинку
edit.addEventListener('click', () => { openPopup(popupProfile) }); // Открывает попап изменения профиля
popupExit.addEventListener('click', () => { closePopup(popupProfile) }); // Закрывает попап профиля
addCard.addEventListener('click', () => { openPopup(addPicture) }); //Открывает попап добавления картинки
addCardExit.addEventListener('click', () => { closePopup(addPicture) }); //Закрывает попап добавления картинки
formElement.addEventListener('submit', formSubmitHandler); //Сохраняет инфу профиля
formAddCard.addEventListener('submit', (evt) => { //Добавляет новую карточку
    evt.preventDefault();
    newFoto()
});