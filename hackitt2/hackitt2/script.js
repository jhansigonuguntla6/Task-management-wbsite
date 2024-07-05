document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("task-list");

    function attachEditEventListeners() {
        const editButtons = document.querySelectorAll(".edit-task");

        editButtons.forEach(function (editButton) {
            editButton.addEventListener("click", function () {
                const li = editButton.parentElement;
                const taskTextSpan = li.querySelector(".task-text");
                const taskDueDateSpan = li.querySelector(".due-date-text");
                const editInput = document.createElement("input");
                const editDueDateInput = document.createElement("input");
                const saveBtn = document.createElement("button");

                editInput.type = "text";
                editInput.className = "edit-input";
                editInput.value = taskTextSpan.textContent;

                editDueDateInput.type = "date"; // Use "date" input type for due date editing
                editDueDateInput.className = "edit-due-date-input";
                const dueDateValue = taskDueDateSpan ? taskDueDateSpan.textContent.replace("Due Date: ", "") : "";
                editDueDateInput.value = dueDateValue;

                saveBtn.textContent = "Save";
                saveBtn.className = "save-task";

                li.replaceChild(editInput, taskTextSpan);
                li.replaceChild(editDueDateInput, taskDueDateSpan);
                li.appendChild(saveBtn);

                editButton.style.display = "none"; // Hide the edit button while editing.
                saveBtn.addEventListener("click", function () {
                    const updatedTaskText = editInput.value;
                    const updatedDueDateValue = editDueDateInput.value;

                    const updatedTaskTextSpan = document.createElement("span");
                    updatedTaskTextSpan.className = "task-text";
                    updatedTaskTextSpan.textContent = updatedTaskText;

                    const updatedDueDateSpan = document.createElement("span");
                    updatedDueDateSpan.className = "due-date-text";
                    if (updatedDueDateValue.trim() !== "") {
                        updatedDueDateSpan.textContent = `Due Date: ${updatedDueDateValue}`;
                    }

                    li.replaceChild(updatedTaskTextSpan, editInput);
                    li.replaceChild(updatedDueDateSpan, editDueDateInput);
                    li.removeChild(saveBtn);
                    editButton.style.display = "inline"; // Show the edit button after saving.

                    attachEditEventListeners(); // Reattach event listeners after saving
                    attachCompleteEventListeners(); // Reattach event listeners for complete buttons
                    attachDeleteEventListeners(); // Reattach event listeners for delete buttons
                });
            });
        });
    }

    function attachDeleteEventListeners() {
        const deleteButtons = document.querySelectorAll(".delete-task");

        deleteButtons.forEach(function (deleteButton) {
            deleteButton.addEventListener("click", function () {
                const li = deleteButton.parentElement;
                li.remove();
            });
        });
    }

    function attachCompleteEventListeners() {
        const completeButtons = document.querySelectorAll(".complete-task");

        completeButtons.forEach(function (completeButton) {
            completeButton.addEventListener("click", function () {
                const li = completeButton.parentElement;
                li.classList.toggle("completed");
            });
        });
    }

    attachEditEventListeners();
    attachDeleteEventListeners();
    attachCompleteEventListeners();

    const addTaskBtn = document.getElementById("add-task");

    addTaskBtn.addEventListener("click", function () {
        const taskInput = document.getElementById("task-input");
        const dueDate = document.getElementById("due-date");
        const taskText = taskInput.value;
        const taskDueDate = dueDate.value;

        if (taskText.trim() === "") {
            alert("Task name cannot be empty.");
            return;
        }

        const li = document.createElement("li");
        const deleteBtn = document.createElement("button");
        const editBtn = document.createElement("button");
        const completeBtn = document.createElement("button");
        const taskTextSpan = document.createElement("span");
        const dueDateSpan = document.createElement("span");

        taskTextSpan.className = "task-text";
        taskTextSpan.textContent = taskText;

        const dueDateValue = taskDueDate.trim();
        if (dueDateValue !== "") {
            dueDateSpan.className = "due-date-text";
            dueDateSpan.textContent = `Due Date: ${dueDateValue}`;
        }

        deleteBtn.textContent = "Delete";
        editBtn.textContent = "Edit";
        completeBtn.textContent = "Complete";

        deleteBtn.className = "delete-task";
        editBtn.className = "edit-task";
        completeBtn.className = "complete-task";

        li.appendChild(taskTextSpan);
        li.appendChild(dueDateSpan);
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        li.appendChild(completeBtn);

        taskList.appendChild(li);

        taskInput.value = "";
        dueDate.value = "";

        attachEditEventListeners();
        attachDeleteEventListeners();
        attachCompleteEventListeners();
    });
});
