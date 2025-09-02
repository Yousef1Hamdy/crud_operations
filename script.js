const title = document.getElementById('title');
const price = document.getElementById('price');
const taxes = document.getElementById('taxes');
const ads = document.getElementById('abs');
const discount = document.getElementById('discount');
const total = document.getElementById('total');
const count = document.getElementById('count');
const category = document.getElementById('category');
const btnAdd = document.getElementById('btnAu');
const tableBody = document.getElementById('tbody');

let products = JSON.parse(localStorage.getItem('products')) || [];
let id = Number(localStorage.getItem('id')) || 1;
let tempId = null;

function getTotal() {
  let result =
    ((+price.value || 0) +
      (+taxes.value || 0) +
      (+ads.value || 0) -
      (+discount.value || 0)) *
    (count.value || 1);

  total.innerText = result;
}

[price, taxes, ads, discount, count].forEach(input => {
  input.addEventListener('input', getTotal);
});

// Add product

function addProduct() {
  const product = {
    id,
    title: title.value.trim(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerText,
    count: count.value,
    category: category.value.trim(),
  };

  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));
  displayProducts();

  localStorage.setItem('id', id + 1);
  restValue();
}

// Edit product

function editData(id) {
  const productEdit = products.find(el => el.id === id);

  if (productEdit === -1) return;
  title.value = productEdit.title;
  price.value = productEdit.price;
  taxes.value = productEdit.taxes;
  ads.value = productEdit.ads;
  discount.value = productEdit.discount;
  count.value = productEdit.count;
  category.value = productEdit.category;
  total.innerText = productEdit.total;

  btnAdd.classList.remove('add');
  btnAdd.classList.add('update');
  btnAdd.textContent = 'Update';

  tempId = id;
}

// delete Product

function deleteData(id) {
  products = products.filter(el => el.id !== id);
  localStorage.setItem('products', JSON.stringify(products));

  displayProducts();
  localStorage.setItem('id', id - 1);
}

// update product

function updateData(id) {
  const productIndex = products.findIndex(el => el.id === id);
  console.log(productIndex);
  if (productIndex === -1) return;

  const newData = {
    title: title.value.trim(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerText,
    count: count.value,
    category: category.value.trim(),
  };

  products[productIndex] = { ...products[productIndex], ...newData };
  localStorage.setItem('products', JSON.stringify(products));

  btnAdd.classList.remove('update');
  btnAdd.classList.add('add');
  btnAdd.textContent = 'Add';

  displayProducts();
  restValue();
}

// rest Value of input

function restValue() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  count.value = '';
  category.value = '';
  total.innerText = '0';
}

btnAdd.addEventListener('click', () => {
  if (btnAdd.textContent === 'Add') {
    addProduct();
  } else {
    updateData(tempId);
  }
});

// display product

function displayProducts() {
  tableBody.innerHTML = '';

  products.forEach(el => {
    tableBody.innerHTML += `
      <tr>
        <td>${el.id}</td>
        <td>${el.title}</td>
        <td>${el.price}</td>
        <td>${el.ads}</td>
        <td>${el.category}</td>
        <td>${el.total}</td>
        <td>
          <button class="btn btn-warning rounded-4" onClick="editData(${el.id})">Edit</button>
        </td>
        <td>
          <button class="btn btn-danger rounded-4" onClick="deleteData(${el.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

displayProducts();
