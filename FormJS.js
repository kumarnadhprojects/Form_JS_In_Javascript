let myForm = document.getElementById("myForm");

let formData = {
    name: "",
    email: "",
    status: "Active",
    gender: "Male"
};

let nameEl = document.getElementById("name");
let nameErrormsg = document.getElementById("nameErrormsg");
nameEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        nameErrormsg.textContent = "Required*";
    } else {
        nameErrormsg.textContent = "";
    }
    formData.name = event.target.value;
});

let emailEl = document.getElementById("email");
let emailErrormsg = document.getElementById("emailErrormsg");
emailEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        emailErrormsg.textContent = "Required*";
    } else {
        emailErrormsg.textContent = "";
    }
    formData.email = event.target.value;
});

let workingStatus = document.getElementById("status");
workingStatus.addEventListener("change", function(event) {
    formData.status = event.target.value;
});

let genderMale = document.getElementById("genderMale");
genderMale.addEventListener("change", function() {
    formData.gender = event.target.value;
});

let genderFemale = document.getElementById("genderFemale");
genderFemale.addEventListener("change", function() {
    formData.gender = event.target.value;
});

function validationData(formData) {
    let {
        name,
        email
    } = formData;
    if (name === "") {
        nameErrormsg.textContent = "Required*";
    }
    if (email === "") {
        emailErrormsg.textContent = "Required*";
    }
}

function submitionData(formData) {
    let successMsg = document.getElementById("successMsg");

    let options = {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            Accept: "application/json",
            Authorization: "Bearer bce02a79b1e2c6847a0dedb6e342d32f1196f3b720342228626844715d715ecc"
        },
        body: JSON.stringify(formData)
    };
    let url = "https://gorest.co.in/public-api/users";

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            if (jsonData.code === 422) {
                if (jsonData.data[0].message === "has already been taken") {
                    emailErrormsg.textContent = "Email already taken!!";
                }
            }
            if (jsonData.code === 201) {
                successMsg.textContent = "Data Successfylly inserted.";
            }
        });
}

myForm.addEventListener("submit", function(event) {
    event.preventDefault();
    validationData(formData);
    submitionData(formData);
});