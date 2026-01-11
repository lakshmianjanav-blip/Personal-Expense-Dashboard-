function getExpenses() {
  let data = localStorage.getItem("expenses");
  if (data == null) return [];
  return JSON.parse(data);
}

function saveExpenses(expenses) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense() {
  let amount = document.getElementById("amount").value;
  let category = document.getElementById("category").value;
  let note = document.getElementById("note").value;

  if (amount == "" || category == "") {
    alert("Enter amount and category!");
    return;
  }

  let expenses = getExpenses();

  expenses.push({
    amount: amount,
    category: category,
    note: note
  });

  saveExpenses(expenses);

  document.getElementById("amount").value = "";
  document.getElementById("category").value = "";
  document.getElementById("note").value = "";

  showExpenses();
}

function showExpenses() {
  let expenses = getExpenses();
  let list = document.getElementById("list");
  list.innerHTML = "";

  let total = 0;

  for (let i = 0; i < expenses.length; i++) {
    let e = expenses[i];
    total = total + Number(e.amount);

    let item = document.createElement("li");
    item.innerText = "₹" + e.amount + " - " + e.category + " - " + e.note;
    list.appendChild(item);
  }

  document.getElementById("total").innerText = "Total: ₹" + total;
}

function downloadCSV() {
  let expenses = getExpenses();
  if (expenses.length == 0) {
    alert("No expenses to export!");
    return;
  }

  let csv = "amount,category,note\n";

  for (let i = 0; i < expenses.length; i++) {
    let e = expenses[i];
    csv = csv + e.amount + "," + e.category + "," + e.note + "\n";
  }

  let blob = new Blob([csv], { type: "text/csv" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "expenses.csv";
  link.click();
}

showExpenses();
