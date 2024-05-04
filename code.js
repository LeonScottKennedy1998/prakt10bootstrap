class Bread {
constructor(name, price, image) {
    this.name = name;
    this.price = price;
    this.image = image;
}
}

const breadForm = document.getElementById('breadForm');
const editForm = document.getElementById('editForm');

function addBreadToPage(bread) {
const breadList = document.getElementById('breadList');
const card = document.createElement('div');
card.classList.add('card', 'col-4');
const reader = new FileReader();
reader.onload = function(event) {
    card.innerHTML = `
    <img src="${event.target.result}" class="card-img-top" alt="${bread.name}">
    <div class="card-body">
        <h5 class="card-title">${bread.name}</h5>
        <p class="card-text">Цена: ${bread.price} руб.</p>
    </div>
    <div class="card-footer">
        <button class="btn btn-warning edit-btn">Редактировать</button>
        <button class="btn btn-danger delete-btn">Удалить</button>
    </div>`;
    breadList.appendChild(card);

    const editButton = card.querySelector('.edit-btn');
    const deleteButton = card.querySelector('.delete-btn');
    editButton.addEventListener('click', function() {
    editBread(card, bread);
    });
    deleteButton.addEventListener('click', function() {
    deleteBread(card);
    });
};
reader.readAsDataURL(bread.image);
}


function editBread(card, bread) {
document.getElementById('editBreadName').value = bread.name;
document.getElementById('editBreadPrice').value = bread.price;
editForm.classList.remove('d-none');
breadForm.classList.add('d-none');

document.getElementById('saveEditBtn').addEventListener('click', function() {
    const newName = document.getElementById('editBreadName').value.trim();
    const newPrice = parseFloat(document.getElementById('editBreadPrice').value.trim());
    const newImage = document.getElementById('editBreadImage').files[0];

    if (newName && !isNaN(newPrice) && newImage) {
    bread.name = newName;
    bread.price = newPrice;
    bread.image = newImage;

    card.querySelector('.card-title').textContent = newName;
    card.querySelector('.card-text').textContent = `Цена: ${newPrice} руб.`;
    const reader = new FileReader();
    reader.onload = function(event) {
        card.querySelector('.card-img-top').src = event.target.result;
    };
    reader.readAsDataURL(newImage);

    editForm.classList.add('d-none');
    breadForm.classList.remove('d-none');
    } else {
    alert('Пожалуйста, введите корректные данные.');
    }
});

document.getElementById('cancelEditBtn').addEventListener('click', function() {
    editForm.classList.add('d-none');
    breadForm.classList.remove('d-none');
});
}

function deleteBread(card) {
    card.remove();
}

document.getElementById('breadForm').addEventListener('submit', function(event) {
event.preventDefault();
const name = document.getElementById('breadName').value.trim();
const price = parseFloat(document.getElementById('breadPrice').value.trim());
const image = document.getElementById('breadImage').files[0];

if (name && !isNaN(price) && image) {
    const bread = new Bread(name, price, image);
    addBreadToPage(bread);
    this.reset();
} else {
    alert('Пожалуйста, введите корректные данные.');
}
});
