document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  renderExpense();

  let toalalAmout = calculateTotalAmount();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name,
        amount,
      };
      expenses.push(newExpense);
      saveExpensesToLocalStorage();

      renderExpense(newExpense);

      // update total amount
      toalalAmout = calculateTotalAmount();
      totalAmountDisplay.textContent = `$${toalalAmout.toFixed(2)}`;

      // clear input fields
      expenseNameInput.value = "";
      expenseAmountInput.value = "";
    }
  });

  function calculateTotalAmount() {
    return expenses.reduce(
      (accumilator, expense) => accumilator + expense.amount,
      0
    );
  }

  function renderExpense(expense) {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `${expense.name} - $${expense.amount.toFixed(
        2
      )} <button class="remove-btn" data-id="${expense.id}">Delete</button>`;
      expenseList.appendChild(li);
    });
  }

  function saveExpensesToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const expenseId = parseInt(e.target.getAttribute("data-id"));
      expenses = expenses.filter((expense) => expense.id !== expenseId);
      saveExpensesToLocalStorage();
      renderExpense();
      toalalAmout = calculateTotalAmount();
      totalAmountDisplay.textContent = `$${toalalAmout.toFixed(2)}`;
    }
  });
});
