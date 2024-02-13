
const expenseForm = 
	document.getElementById("expense-form"); 
const expenseList = 
	document.getElementById("expense-list"); 
const totalAmountElement = 
	document.getElementById("total-amount"); 

let expenses = 
	JSON.parse(localStorage.getItem("expenses")) || []; 

function renderExpenses() { 

	
	expenseList.innerHTML = ""; 

	
	let totalAmount = 0; 
 
	for (let i = 0; i < expenses.length; i++) { 
		const expense = expenses[i]; 
		const expenseRow = document.createElement("tr"); 
		expenseRow.innerHTML = ` 
	<td>${expense.name}</td> 
	<td>$${expense.amount}</td> 
	<td class="delete-btn" data-id="${i}">Delete</td> 
	`; 
		expenseList.appendChild(expenseRow); 

		
		totalAmount += expense.amount; 
	} 


	totalAmountElement.textContent = 
		totalAmount.toFixed(2);
	localStorage.setItem("expenses", 
		JSON.stringify(expenses)); 
} 

function addExpense(event) { 
	event.preventDefault();
	const expenseNameInput = 
		document.getElementById("expense-name"); 
	const expenseAmountInput = 
		document.getElementById("expense-amount"); 
	const expenseName = 
		expenseNameInput.value; 
	const expenseAmount = 
		parseFloat(expenseAmountInput.value); 

	expenseNameInput.value = ""; 
	expenseAmountInput.value = ""; 

	// Validate inputs 
	if (expenseName === "" || isNaN(expenseAmount)) { 
		alert("Please enter valid expense details."); 
		return; 
	} 

	// Create new expense object 
	const expense = { 
		name: expenseName, 
		amount: expenseAmount, 
	}; 

	// Add expense to expenses array 
	expenses.push(expense); 

	// Render expenses 
	renderExpenses(); 
} 

// Function to delete expense 
function deleteExpense(event) { 
	if (event.target.classList.contains("delete-btn")) { 

		// Get expense index from data-id attribute 
		const expenseIndex = 
			parseInt(event.target.getAttribute("data-id")); 

		expenses.splice(expenseIndex, 1); 
		renderExpenses(); 
	} 
} 

expenseForm.addEventListener("submit", addExpense); 
expenseList.addEventListener("click", deleteExpense); 
renderExpenses();
