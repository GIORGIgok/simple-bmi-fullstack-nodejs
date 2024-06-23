
function sendForBmi() {

    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;

    fetch("http://localhost:3000/bmi?weight=" + weight + "&height=" + height, {
        method: "POST",
    })
}

function sendUserNames() {

    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;

    fetch("http://localhost:3000/user?name=" + name + "&surname=" + surname, {
        method: "POST",
    })
        .then((response) => response.json())
        .then((data) => {
            
            document.getElementById("calculated-bmi").innerHTML = data.bmi

        });
}

function getBmi (event) {

    event.preventDefault();

    fetch("http://localhost:3000/bmi")
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("calculated-bmi").innerHTML = `
            <span><b>Name:</b></span>: ${data.name}<br>
            <span><b>Surname:</b></span>: ${data.surname}<br>
            <span><b>BMI:</b></span>: ${data.bmi}
            `
        
        }).catch((error) => {
            console.log(error);
            document.getElementById("calculated-bmi").innerHTML = `<p>No data</p>`
        });
}