// Validate form inputs before submiting data
function validateForm() {
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let address = document.getElementById("address").value;
  let email = document.getElementById("email").value;

  if (name === "") {
    alert("Debes ingresar el nombre");
    return false;
  }

  if (age === "") {
    alert("Debes ingresar la edad");
    return false;
  } else if (age < 1) {
    alert("La edad debe ser mayor a 0");
    return false;
  }

  if (address === "") {
    alert("Debes ingresar la dirección");
    return false;
  }
  if (email === "") {
    alert("Debes ingresar el correo electrónico");
    return falase;
  } else if (!email.includes("@")) {
    alert("Dirección de correo electrónico invalida");
    return false;
  }

  return true;
}

// function to show Data from local storage
function showData() {
  let peopleList;
  if (localStorage.getItem("peopleList") === null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  let html = "";

  peopleList.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.age + "</td>";
    html += "<td>" + element.address + "</td>";
    html += "<td>" + element.email + "</td>";
    html +=
      '<td><button onclick="deleteData(' +
      index +
      ')" class="btn btn-danger">Borrar</button><button onclick="updateData(' +
      index +
      ')" class="btn btn-warning m-2">Editar</button></td>';
    html += "</tr>";
  });

  document.querySelector("#crudTable tbody").innerHTML = html;
}

//Load All data from local storage when document or page loaded
document.onload = showData();

// function to add Data to local storage
function AddData() {
  // if form es validate
  if (validateForm() === true) {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;

    let peopleList;
    if (localStorage.getItem("peopleList") === null) {
      peopleList = [];
    } else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.push({
      name: name,
      age: age,
      address: address,
      email: email,
    });

    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";
  }
}

// function to delete data from local storage
function deleteData(index) {
  let peopleList;
  if (localStorage.getItem("peopleList") === null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  peopleList.splice(index, 1);
  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  showData();
}

//funtion to update/edit data in locl storage
function updateData(index) {
  // Submit button will hide and update button will show for updating of Data in local storage
  document.getElementById("Submit").style.display = "none";
  document.getElementById("Update").style.display = "block";

  let peopleList;
  if (localStorage.getItem("peopleList") === null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  document.getElementById("name").value = peopleList[index].name;
  document.getElementById("age").value = peopleList[index].age;
  document.getElementById("address").value = peopleList[index].address;
  document.getElementById("email").value = peopleList[index].email;

  document.querySelector("#Update").onclick = function () {
    if (validateForm() === true) {
      peopleList[index].name = document.getElementById("name").value;
      peopleList[index].age = document.getElementById("age").value;
      peopleList[index].address = document.getElementById("address").value;
      peopleList[index].email = document.getElementById("email").value;

      localStorage.setItem("peopleList", JSON.stringify(peopleList));

      showData();

      document.getElementById("name").value = "";
      document.getElementById("age").value = "";
      document.getElementById("address").value = "";
      document.getElementById("email").value = "";

      // Update button will hide and submit button will show for updating of Data in local storage
      document.getElementById("Submit").style.display = "block";
      document.getElementById("Update").style.display = "none";
    }
  };
}
