// goal.js

// Get a reference to the form element
const goalForm = document.getElementById('goalForm');

// Attach an event listener to the form's submit event
goalForm.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the input values
    const goalDescription = document.getElementById('goal').value;
    const targetAmount = parseFloat(document.getElementById('amount').value);
    const deadline = new Date(document.getElementById('deadline').value);

    // Calculate time remaining
    const now = new Date();
    const timeRemaining = deadline - now;
    const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));

    // Display a message with time remaining
    const message = `Goal "${goalDescription}" set successfully!\nTarget Amount: $${targetAmount.toFixed(2)}\nDeadline: ${deadline.toDateString()}\nDays Remaining: ${daysRemaining} days`;
    alert(message);
});
