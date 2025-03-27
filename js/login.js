const token = localStorage.getItem("JWT");

if (token != null) {
    location.href = "../pages/tasks.html";
}

const loginForm = document.querySelector("#loginForm");

const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

const alertsContainer = document.querySelector("#alerts");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    await login();
});

async function login() {

    const email = emailInput.value;
    const password = passwordInput.value;

    const loginRequestBody = {
        email: email,
        password: password,
    };

    const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginRequestBody),
    });

    if (response.ok) {

        const data = await response.json();

        localStorage.setItem("JWT", data.token);

        alertsContainer.innerHTML = `<div class="alert alert-success">Login Successful!</div>`;

        setTimeout(function () {
            location.href = "../pages/tasks.html"
        }, 2000);

    } else {
        alertsContainer.innerHTML = `
            <div class="alert alert-danger">
              Login Failed!
            </div>
        `;
    }
}
