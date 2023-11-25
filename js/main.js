// ! РЕБЯТА, Я ДЕЛАЛ КОД ПОЭТАПНО, ВРОДЕ ШЕЛ ХОРОШО, КОД ОТРИСОВЫВАЛ НОВЫЙ li, ПОТОМ ХОТЕЛ ДАЛЬШЕ ПОЙТИ И ЗАВЕРШИТЬ ЛОГИКУ УДАЛЕНИЯ И ИЗМЕНЕНИЯ. НО ЧТО-ТО ПОШЛО НЕ ТАК И ПОЯВИЛАСЬ ОШИБКА, КОТОРУЮ Я НЕ НАШЕЛ. В ИТОГЕ МЕНЯЛ СВОЙ КОД 1000 РАЗ И ЗАБЫЛ ГДЕ НАЧАЛО, ГДЕ КОНЕЦ. ПОЭТОМУ ДАЛЬШЕ НЕ СМОГ РЕАЛИЗОВАТЬ ТЗ. ПРИШЛОСЬ СДАТЬ В ТАКОМ ВИДЕ
let btn_add = document.querySelector(".btn_add");
let open_modal = document.querySelector(".open_modal");
let btn_save = document.querySelector(".btn_save");
let inp_name = document.querySelector("#inp_name");
let inp_phoneNum = document.querySelector("#inp_phoneNum");
let list = document.querySelector(".contact-list");
let my_contacts = document.querySelector(".my_contacts");
let mainModal = document.querySelector(".main-modal");
let inpEditName = document.querySelector(".inp-edit-name");
let inpEditPhone = document.querySelector(".inp-edit-phone");
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

  let obj = {
    name: inp_name.value,
    phone: inp_phoneNum.value,
  };

  setItemToStorage(obj);
  createElement();
  inp_name.value = "";
  inp_phoneNum.value = "";
});

function setItemToStorage(name) {
  let data = JSON.parse(localStorage.getItem("name")) || [];
  data.push(name);
  localStorage.setItem("name", JSON.stringify(data));
}

function createElement() {
  if (!localStorage.getItem("name")) {
    localStorage.setItem("name", "[]");
  }
}

let newData = JSON.parse(localStorage.getItem("name"));
list.innerHTML = "";
newData.forEach((item, index) => {
  let li = document.createElement("li");
  li.className = "card";
  let btnDelete = document.createElement("button");
  let btnEdit = document.createElement("button");

  // пока словами, потом в CSS вставлю картинками
  btnDelete.innerText = "Delete";
  btnEdit.innerText = "Edit";
  li.innerText = item.contact + item.phone;

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
  inpEditName.value = data[index].name;
}

btnSave.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("name"));
  let index = inpEditName.id;

  if (!inpEditName.value.trim()) {
    alert("Заполните поля!");
    return;
  }

  let newContact = {
    name: inpEditName.value,
  };

  data.splice(index, 1, newContact);
  localStorage.setItem("name", JSON.stringify(data));
  mainModal.style.display = "none";
  createElement();
});

btnClose.addEventListener("click", () => {
  mainModal.style.display = "none";
});
