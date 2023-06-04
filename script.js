//  Get DOM elements

let budgetAmount = document.getElementById('budget-input');
    let expenseInput = document.getElementById('expense-input');
    const errormessage = document.getElementById('budgeterror');
    const amountExpense = document.getElementById('amount-expense');
    const expenseDate = document.getElementById('expense-date');
    const setBudgetBtn = document.getElementById('set-budget-btn');
    const addexpensebtn = document.getElementById('addexpense-btn');
    const amountbutton = document.getElementById('amount');
    const expenseAmount = document.getElementById('expense-amount');
    const balanceAmount = document.getElementById('balance-amount');
    const list = document.getElementById('list');

   //  function to set budget

    let tbudget = 0;

    setBudgetBtn.addEventListener("click", () => {
      tbudget = budgetAmount.value;
      if (tbudget === "" || tbudget < 0) {
        errormessage.classList.remove('hide');
      } else {
        errormessage.classList.add('hide');

        amountbutton.innerHTML = tbudget;
        balanceAmount.innerText = tbudget - expenseAmount.innerText;
        budgetAmount.value = "";
      }
    });

   //  function to disableb edit or delete button

    function disableButtons(bool) {
      let editButtons = document.getElementsByClassName('edit');
      Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
      });
    }
// function to modify list element

    function modifyElement(element, edit = false) {
      let parentDiv = element.parentElement;
      let currentBalance = balanceAmount.innerText;
      let currentExpense = expenseAmount.innerText;
      let parentAmount = parentDiv.querySelector('.amount').innerText;
      if (edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        expenseInput.value = parentText;
        amountExpense.value = parentAmount;
        disableButtons(true);
      }
      balanceAmount.innerText = parseInt(parentAmount) + parseInt(currentBalance);
      expenseAmount.innerText = parseInt(currentExpense) - parseInt(parentAmount);
      parentDiv.remove();
    }

   //  function to create expense list

    const listCreator = (expenseName, expenseValue, expenseDate) => {
      let subListContent = document.createElement('div');
      subListContent.classList.add('subList-content', 'flex-space', 'expense-entry');
      list.appendChild(subListContent);
      subListContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}<p class="date">${expenseDate}</p></p>`;
      let editButton = document.createElement("button");
      editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
      editButton.style.fontSize = "24px";
      editButton.addEventListener("click", () => {
        modifyElement(editButton, true);
      });
      let deleteButton = document.createElement("button");
      deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
      deleteButton.style.fontSize = "24px";
      deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton);
      });
      subListContent.appendChild(editButton);
      subListContent.appendChild(deleteButton);
      document.getElementById("list").appendChild(subListContent);
    };
// functin to calculate expence

    addexpensebtn.addEventListener("click", () => {
      if (!expenseInput.value || !amountExpense.value) {
        errormessage.classList.remove("hide");
        return false;
      }
      disableButtons(false);
      let expenditure = parseInt(amountExpense.value);
      let sum = parseInt(expenseAmount.innerText) + expenditure;
      expenseAmount.innerText = sum;
      balanceAmount.innerText = tbudget - sum;
      listCreator(expenseInput.value, amountExpense.value, expenseDate.value);
      expenseInput.value = "";
      amountExpense.value = "";
      expenseDate.value = "";
    });
  