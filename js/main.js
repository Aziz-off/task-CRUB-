let btn_add = document.querySelector(".btn_add");
let open_modal = document.querySelector(".open_modal");
let btn_save = document.querySelector(".btn_save");
let btn_cansel = document.querySelector(".btn_cansel");
let inp_name = document.querySelector("#inp_name");
let inp_phoneNum = document.querySelector("#inp_phoneNum");
let inp_imageLink = document.querySelector("#inp_imageLink");
let list = document.querySelector(".contact-list");
let my_contacts = document.querySelector(".my_contacts");
let mainModal = document.querySelector(".main-modal");
let inpEditName = document.querySelector(".inp-edit-name");
let inpEditPhone = document.querySelector(".inp-edit-phone");
let inpEditImage = document.querySelector(".inp-edit-imageLink");
let btnClose = document.querySelector(".btn-close");
let btnSave = document.querySelector(".btn-save");
let searchInput = document.querySelector(".search input");

btn_add.addEventListener("click", () => {
  open_modal.style.display = "flex";
});
btn_cansel.addEventListener("click", () => {
  open_modal.style.display = "none";
});

btn_save.addEventListener("click", () => {
  if (!inp_name.value.trim() || !inp_phoneNum.value.trim()) {
    alert("Заполните поля");
    return;
  }

  my_contacts.style.display = "block";

  let obj = {
    contact: inp_name.value,
    phone: inp_phoneNum.value,
    imageLink: inp_imageLink.value,
  };

  setItemToStorage(obj);
  createElement();
  inp_name.value = "";
  inp_phoneNum.value = "";
  inp_imageLink.value = "";
});

function setItemToStorage(contact) {
  let data = JSON.parse(localStorage.getItem("contacts")) || [];
  data.push(contact);
  localStorage.setItem("contacts", JSON.stringify(data));
}

function createElement() {
  list.innerHTML = "";

  let newData = JSON.parse(localStorage.getItem("contacts")) || [];

  newData.forEach((item, index) => {
    let li = document.createElement("li");
    li.className = "card";
    let btnDelete = document.createElement("button");
    btnDelete.className = "delete"
    let btnEdit = document.createElement("button");
    btnEdit.className = "edit"

    btnDelete.innerText = "Delete";
    btnEdit.innerText = "Edit";

    let contactImg = document.createElement("img");
    contactImg.classList.add("contact-img");
    contactImg.src = item.imageLink;
    let contactName = document.createElement("span");
    contactName.classList.add("contact-name");
    contactName.textContent = item.contact;
    let contactPhone = document.createElement("span");
    contactPhone.classList.add("contact-phone");
    contactPhone.textContent = item.phone;

    li.appendChild(contactImg);
    li.appendChild(document.createElement("br"));
    li.appendChild(document.createTextNode("Name: "));
    li.appendChild(contactName);
    li.appendChild(document.createElement("br"));
    li.appendChild(document.createTextNode("Phone: "));
    li.appendChild(contactPhone);
    li.appendChild(document.createElement("br"));

    btnDelete.addEventListener("click", () => {
      deleteElement(index);
    });
    btnEdit.addEventListener("click", () => {
      editElement(index);
    });

    li.append(btnDelete);
    li.append(btnEdit);
    list.append(li);
  });
}

function deleteElement(index) {
  let data = JSON.parse(localStorage.getItem("contacts")) || [];
  data.splice(index, 1);
  localStorage.setItem("contacts", JSON.stringify(data));
  createElement();
}

function editElement(index) {
  mainModal.style.display = "block";
  let data = JSON.parse(localStorage.getItem("contacts")) || [];
  inpEditName.setAttribute("data-index", index);
}

btnSave.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("contacts")) || [];
  let index = inpEditName.getAttribute("data-index");

  if (!inpEditName.value.trim()) {
    alert("Заполните поля!");
    return;
  }

  let newContact = {
    contact: inpEditName.value,
    phone: inpEditPhone.value,
    imageLink: inpEditImage.value,
  };

  data.splice(index, 1, newContact);
  localStorage.setItem("contacts", JSON.stringify(data));
  mainModal.style.display = "none";
  createElement();
});

btnClose.addEventListener("click", () => {
  mainModal.style.display = "none";
});

createElement();

searchInput.addEventListener("input", () => {
  let filter = searchInput.value.toLowerCase();
  let contacts = document.querySelectorAll(".contact-list li");

  contacts.forEach((contact) => {
    let name = contact.querySelector(".contact-name").textContent.toLowerCase();

    if (name.includes(filter)) {
      contact.style.display = "";
    } else {
      contact.style.display = "none";
    }
  });
});
