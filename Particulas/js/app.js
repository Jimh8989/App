document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expense-form');
    const expense = document.getElementById('expense');
    const description = document.getElementById('description');
    const category = document.getElementById('category');
    const amount = document.getElementById('amount');
    const date = document.getElementById('date');
    const message = document.getElementById('message');
    const search = document.getElementById('search');
    const expensesList = document.getElementById('expenses-list');
    
    loadExpenses();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addExpense();
    });

    search.addEventListener('input', searchExpenses);

    function addExpense() {
        const expenseData = {
            expense: expense.value,
            description: description.value,
            category: category.value,
            amount: parseFloat(amount.value),
            date: date.value,
        };

        if (validateExpense(expenseData)) {
            saveExpense(expenseData);
            showMessage('Gasto añadido con éxito', 'success');
            form.reset();
            loadExpenses();
        } else {
            showMessage('Por favor, completa todos los campos correctamente', 'error');
        }
    }

    function validateExpense(expense) {
        return expense.expense && expense.description && expense.category && expense.amount > 0 && expense.date;
    }

    function showMessage(msg, type) {
        message.textContent = msg;
        message.className = type;
        setTimeout(() => message.textContent = '', 3000);
    }

    function saveExpense(expense) {
        const expenses = getExpenses();
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function getExpenses() {
        return localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];
    }

    function loadExpenses() {
        const expenses = getExpenses();
        expensesList.innerHTML = '';
        expenses.forEach(expense => {
            const expenseCard = document.createElement('div');
            expenseCard.className = 'expense-card';
            expenseCard.innerHTML = `
                <p>Gasto: ${expense.expense}</p>
                <p>Descripción: ${expense.description}</p>
                <p>Categoría: ${expense.category}</p>
                <p>Monto: $${expense.amount.toFixed(2)}</p>
                <p>Fecha: ${expense.date}</p>
                <button onclick="deleteExpense('${expense.expense}')">Eliminar</button>
            `;
            expensesList.appendChild(expenseCard);
        });
    }

    function searchExpenses() {
        const searchText = search.value.toLowerCase();
        const expenses = getExpenses();
        const filteredExpenses = expenses.filter(expense => 
            expense.expense.toLowerCase().includes(searchText) || 
            expense.description.toLowerCase().includes(searchText) || 
            expense.category.toLowerCase().includes(searchText)
        );
        expensesList.innerHTML = '';
        filteredExpenses.forEach(expense => {
            const expenseCard = document.createElement('div');
            expenseCard.className = 'expense-card';
            expenseCard.innerHTML = `
                <p>Gasto: ${expense.expense}</p>
                <p>Descripción: ${expense.description}</p>
                <p>Categoría: ${expense.category}</p>
                <p>Monto: $${expense.amount.toFixed(2)}</p>
                <p>Fecha: ${expense.date}</p>
                <button onclick="deleteExpense('${expense.expense}')">Eliminar</button>
            `;
            expensesList.appendChild(expenseCard);
        });
    }
    
    window.editExpense = (expenseName) => {
            const expenses = getExpenses();
            const expense = expenses.find(e => e.expense === expenseName);

            expenseForm.expense.value = expense.expense;
            expenseForm.description.value = expense.description;
            expenseForm.category.value = expense.category;
            expenseForm.amount.value = expense.amount;
            expenseForm.date.value = expense.date;

            isEditing = true;
            editingExpenseName = expenseName;


    };
    
    

    window.deleteExpense = (expenseName) => {
        const expenses = getExpenses();
        const filteredExpenses = expenses.filter(expense => expense.expense !== expenseName);
        localStorage.setItem('expenses', JSON.stringify(filteredExpenses));
        loadExpenses();
        showMessage('Gasto eliminado', 'success');
    }
});