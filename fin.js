let transactions = [];
let currentBalance = 0;

const transactionForm = document.getElementById("transactionForm");
const transactionTableBody = document.getElementById("transactionTableBody");
const balanceElement = document.getElementById("balance");

transactionForm.addEventListener("submit", addTransaction);

function addTransaction(event) {
  event.preventDefault();

  const transactionType = document.getElementById("transactionType").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const description = document.getElementById("description").value;

  if (transactionType && amount && description) {
    const transaction = {
      id: generateID(),
      type: transactionType,
      amount: amount,
      description: description,
    };

    transactions.push(transaction);
    updateBalance(transaction);
    renderTransaction(transaction);
    clearFormInputs();
  }
}

function updateBalance(transaction) {
  if (transaction.type === "income") {
    currentBalance += transaction.amount;
  } else if (transaction.type === "expense") {
    currentBalance -= transaction.amount;
  }
  balanceElement.textContent = "Current Balance: $" + currentBalance.toFixed(2);
}

function renderTransaction(transaction) {
  const row = document.createElement("tr");
  row.setAttribute("data-id", transaction.id);

  const typeCell = document.createElement("td");
  typeCell.textContent = transaction.type;
  row.appendChild(typeCell);

  const amountCell = document.createElement("td");
  amountCell.textContent = "$" + transaction.amount.toFixed(2);
  row.appendChild(amountCell);

  const descriptionCell = document.createElement("td");
  descriptionCell.textContent = transaction.description;
  row.appendChild(descriptionCell);

  const actionsCell = document.createElement("td");
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => editTransaction(transaction.id));
  actionsCell.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteTransaction(transaction.id));
  actionsCell.appendChild(deleteButton);

  row.appendChild(actionsCell);

  transactionTableBody.appendChild(row);
}

function editTransaction(id) {
  const transaction = transactions.find((transaction) => transaction.id === id);

  if (transaction) {
    const transactionType = document.getElementById("transactionType");
    const amount = document.getElementById("amount");
    const description = document.getElementById("description");

    transactionType.value = transaction.type;
    amount.value = transaction.amount;
    description.value = transaction.description;

    deleteTransaction(id);
  }
}

function deleteTransaction(id) {
  const index = transactions.findIndex((transaction) => transaction.id === id);

  if (index !== -1) {
    const deletedTransaction = transactions.splice(index, 1)[0];
    updateBalance(deletedTransaction);

    const row = document.querySelector(`[data-id="${id}"]`);
    row.remove();
  }
}

function generateID() {
  return Math.random().toString(36).substr(2, 9);
}

function clearFormInputs() {
  transactionForm.reset();
}

