const token = localStorage.getItem("JWT");

if (token != null) {
    location.href = "/pages/tasks.html";
}

const signUpForm = document.querySelector("#signUpForm");

const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const alertsContainer = document.querySelector("#alerts");

signUpForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    await signUp();
});

async function signUp() {

    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    const signUpRequestBody = {
        username: username,
        email: email,
        password: password,
    };

    const response = await fetch("http://localhost:8080/sign-up", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signUpRequestBody),
    });

    if (response.ok) {

        alertsContainer.innerHTML = `
            <div class="alert alert-success">
              Sign Up Successfully!
            </div>
        `;

        setTimeout(function () {
            location.href = "/pages/login.html";
        }, 2000);

    } else {
        alertsContainer.innerHTML = `
            <div class="alert alert-danger">
              Sign up Failed!
            </div>
        `;
    }
}
