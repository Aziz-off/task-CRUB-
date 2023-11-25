let btn_add = document.querySelector(".btn_add");
let open_modal = document.querySelector(".open_modal");
let btn_save = document.querySelector(".btn_save");
let inp_name = document.querySelector("#inp_name");
let inp_phoneNum = document.querySelector("#inp_phoneNum");
let list = document.querySelector(".contact-list");
let my_contacts = document.querySelector(".my_contacts");

let mainModal = document.querySelector(".main-modal");
let inpEdit = document.querySelector(".inp-edit");
let btnClose = document.querySelector(".btn-close");
let btnSave = document.querySelector(".btn-save");

btn_add.addEventListener("click", () => {
  open_modal.style.display = "flex";
});

btn_save.addEventListener("click", () => {
  if (!inp_name.value.trim() || !inp_phoneNum.value.trim()) {
    alert("Заполните поля");
    return;
  }

  my_contacts.style.display = "block";

  let obj = { contact: inp_name.value };
  setItemToStorage(obj);
  createElement();
  inp_name.value = "";
});

function setItemToStorage(contact) {
  let data = JSON.parse(localStorage.getItem("name")) || [];
  data.push(contact);
  localStorage.setItem("name", JSON.stringify(data));
}

function createElement() {
  if (!localStorage.getItem("name")) {
    localStorage.setItem("name", "[]");
  }
}

let newData = JSON.parse(localStorage.getItem("name"));
// list.innerHTML = '';
newData.forEach((item, index) => {
  let li = document.createElement("li");
  li.className = "card";
  let btnDelete = document.createElement("button");
  let btnEdit = document.createElement("button");

  // пока словами, потом в CSS вставлю картинками
  btnDelete.innerText = "Delete";
  btnEdit.innerText = "Edit";
  li.innerText = item.contact;

  btnDelete.addEventListener("click", () => {
    deleteElement(index);
  });
  btnEdit.addEventListener("click", () => {
    editElement(index);
  });

  li.appendChild(btnDelete);
  li.append(btnEdit);
  list.appendChild(li);
});

createElement();

function deleteElement(index) {
  let data = JSON.parse(localStorage.getItem("name"));
  data.splice(index, 1);
  localStorage.setItem("name", JSON.stringify(data));
  createElement();
}

function editElement(index) {
  mainModal.style.display = "block";
  let data = JSON.parse(localStorage.getItem("name"));
  inpEditName.setAttribute("id", index);
  inpEditName.value = data[index].contact;
}

btnSave.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("name"));
  let index = inpEditName.id;

  if (!inpEditName.value.trim()) {
    alert("Заполните поля!");
    return;
  }

  let newContact = {
    contact: inpEditName.value,
  };

  data.splice(index, 1, newContact);
  localStorage.setItem("name", JSON.stringify(data));
  mainModal.style.display = "none";
  createElement();
});

btnClose.addEventListener("click", () => {
  mainModal.style.display = "none";
});
