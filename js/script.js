document.getElementById("button-add").onclick = addtext;

function addtext() {
  let nameValue = document.getElementById("nameInput").value;
  if (/^([a-zA-Z0-9]+=[a-zA-Z0-9]+)$/.test(nameValue)) {
    let x = document.getElementById("list");

    let option = document.createElement("option");
    option.text = nameValue;
    x.add(option);
    document.getElementById("nameInput").value = "";
  } else alert("Wrong Name/Value pair format.");
}

document.getElementById("sortByName").onclick = sortByName;

function sortByName() {
  let myList = document.getElementById("list");
  let values = new Array();
  for (let i = 0; i < myList.options.length; i++) {
    values[i] = myList.options[i].text;
  }
  values.sort(function (a, b) {
    if (a != "" && b != "") {
      return a.split("=")[0].localeCompare(b.split("=")[0]);
    } else {
      return 0;
    }
  });

  clearList(myList);

  fillList(myList, values);
}

document.getElementById("sortByValue").onclick = sortByValue;

function sortByValue() {
  let myList = document.getElementById("list");
  let values = new Array();
  for (let i = 0; i < myList.options.length; i++) {
    values[i] = myList.options[i].text;
  }
  values.sort(function (a, b) {
    if (a != "" && b != "") {
      return a.split("=")[1].localeCompare(b.split("=")[1]);
    } else {
      return 0;
    }
  });

  clearList(myList);

  fillList(myList, values);
}

document.getElementById("deleteButton").onclick = deleteEntry;

function deleteEntry() {
  let myList = document.getElementById("list");
  let i;
  for (i = myList.length - 1; i >= 0; i--) {
    if (myList.options[i].selected) {
      myList.remove(i);
    }
  }
}

document.getElementById("showAsXml").onclick = showAsXml;

function showAsXml() {
  let myList = document.getElementById("list");
  
  let xmlOutput = '';

  if (myList.options.length === 0) {
      xmlOutput = "Please add at least one Name=Value pair before showing as XML.";
  }

  for (let i = 0; i < myList.options.length; i++) {
      let [name, value] = myList.options[i].text.split('=');
      xmlOutput += `<name>${name.trim()}</name>\n<value>${value.trim()}</value>\n\n`;
  }
  document.getElementById("xmlOutput").textContent = xmlOutput;
}

function clearList(list) {
  while (list.options.length > 0) {
    list.options[0] = null;
  }
}

function fillList(myList, values) {
  for (let i = 0; i < values.length; i++) {
    let option = document.createElement("option");
    option.text = values[i];
    myList.options[i] = option;
  }
}

(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
    document.body.classList.toggle('no-scroll');
  }
})();