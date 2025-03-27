const token = localStorage.getItem("JWT");

if (token == null) {
    logout();
}

const logoutButton = document.querySelector("#logoutButton");

logoutButton.addEventListener("click", function() {
    logout();
});

function logout() {
    localStorage.removeItem("JWT");
    localStorage.removeItem("userId");
    location.href = "/pages/login.html";
}

const tasksTableBody = document.querySelector("#tasksTableBody");

async function getTasks() {
    const response = await fetch("http://localhost:8080/tasks", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });

    if (response.ok) {

        const tasks = await response.json();

        let tableBodyHtml = "";
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            tableBodyHtml += `
            <tr id="${task.id}">
                <td>${task.title}</td>
                <td>${task.description}</td>
                <td>${task.status}</td>
                <td>${task.priority}</td>
                <td>${task.due_date}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteTask('${task.id}')">Delete</button>
                </td>
            </tr>
        `;
        }

        tasksTableBody.innerHTML = tableBodyHtml;

    } else {
        alert("Can not get tasks!");

        logout();
    }
}

getTasks();

async function deleteTask(taskId) {
    const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });

    if (response.ok) {

        alert("Task deleted successfully.");
        document.getElementById(taskId).remove();
    } else {
        alert("Task was not deleted!");
    }
}
