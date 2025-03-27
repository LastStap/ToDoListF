const token = localStorage.getItem("JWT");

if (token != null && !window.location.href.includes("createTask.html")) {
    location.href = "../pages/createTask.html";
}

const createTaskForm = document.querySelector("#createTaskForm");

const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const statusInput = document.querySelector("#status");
const priorityInput = document.querySelector("#priority");

createTaskForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    await createTask();
});

async function createTask() {

    const title = titleInput.value;
    const description = descriptionInput.value;
    const status = statusInput.value;
    const priority = priorityInput.value;

    const createTaskRequestBody = {
        title: title,
        description: description,
        status: status,
        priority: priority,
    };

    const response = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(createTaskRequestBody),
    });

    if (response.ok) {

        alert("Task created successfully.");
        location.href = "../pages/tasks.html";
    } else {
        alert("Task creation Failed!");
    }
}
