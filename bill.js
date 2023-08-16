document.getElementById("billForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const billName = document.getElementById("billName").value;
    const dueDate = document.getElementById("dueDate").value;

    // Save reminder to local storage
    const storedReminders = JSON.parse(localStorage.getItem("reminders")) || [];
    storedReminders.push({ billName, dueDate });
    localStorage.setItem("reminders", JSON.stringify(storedReminders));

    // Create and display reminder with countdown
    const reminderList = document.getElementById("reminderList");
    const reminderItem = document.createElement("div");
    reminderItem.classList.add("reminder-item");

    const currentDate = new Date();
    const dueDateObject = new Date(dueDate);
    const timeRemaining = dueDateObject - currentDate;
    const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));

    reminderItem.innerHTML = `<p><strong>${billName}</strong> - Due on ${dueDate} (${daysRemaining} days remaining)</p>`;
    reminderList.appendChild(reminderItem);

    // Clear form fields
    document.getElementById("billName").value = "";
    document.getElementById("dueDate").value = "";
});

document.addEventListener("DOMContentLoaded", function() {
    const storedReminders = JSON.parse(localStorage.getItem("reminders")) || [];
    const reminderList = document.getElementById("reminderList");

    storedReminders.forEach(reminder => {
        const reminderItem = document.createElement("div");
        reminderItem.classList.add("reminder-item");

        const currentDate = new Date();
        const dueDate = new Date(reminder.dueDate);
        const timeRemaining = dueDate - currentDate;
        const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));

        reminderItem.innerHTML = `<p><strong>${reminder.billName}</strong> - Due on ${reminder.dueDate} (${daysRemaining} days remaining)</p>`;
        reminderList.appendChild(reminderItem);
    });
});
