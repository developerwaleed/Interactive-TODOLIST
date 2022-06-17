const inputNewTodo = document.getElementById('input-new-task');
const taskContainer = document.getElementById('Task-Container');
const targetDataDiv = document.getElementById('show-items-qty');
const errorField = document.getElementById('Display-Error');
const targetInputCheckBox = document.getElementById('input-check-Box');

let todo = JSON.parse(localStorage.getItem('Tasks')) || [];

function updateRemainingTaskLength() {
  const filteredArr = todo.filter((x) => x.completed !== true);
  targetDataDiv.innerHTML = `${filteredArr.length} Items Left`;
}

let i = 0;

const populateLocalStorage = () => {
  const data = JSON.stringify(todo);
  localStorage.setItem('Tasks', data);
};

const delTask = (del) => {
  todo.forEach((n) => {
    if (del.id === `del${n.index}`) {
      todo.splice(n.index - 1, 1);
    }
  });
  reAssignIndex();
  populateLocalStorage();
  display();
};

const editTask = (task) => {
  let targetInput = task.parentElement.parentElement.children[0].children[1];
  targetInput.disabled = false;
  task.parentElement.parentElement.classList.add('editable-task');
};

const toggleCheckBox = (checkBox) => {
  const checkboxidNumber = Number(checkBox.id.replace(/[^0-9]/g, ''));

  checkBox.classList.toggle('check-bg');
  checkBox.children[0].classList.toggle('show');
  checkBox.parentElement.children[1].classList.toggle('check-Task');

  todo.forEach((element) => {
    if (element.index === checkboxidNumber) {
      if (element.completed === false) {
        element.completed = true;
      } else {
        element.completed === true;
        element.completed = false;
      }
    }
  });
  populateLocalStorage();
  updateRemainingTaskLength();
};

const clearCompletedTask = () => {
  const filteredArr = todo.filter((x) => x.completed !== true);
  todo = filteredArr;
  reAssignIndex();
  populateLocalStorage();
  display();
};

const listItem = (index, iscompleted, description) => {
  return `<li id="Task${index}" class="list-item">
  <div class="sub-task">
    <div onclick = "toggleCheckBox(this)" class="checkbox ${
      iscompleted ? 'check-bg' : ''
    }" id="check-box ${index}"><img class="check-icon ${
    iscompleted ? 'show' : ''
  }" src="./images/icon-check.svg" alt=""></div>
    <input
      class="input-task ${iscompleted ? 'check-Task' : ''}"
      onkeypress = "saveEditValue(this)"
      id="Task${index}"
      for="Task ${index}"
      disabled
      value="${description}"
    />
  </div>
  <div class="btn-container">
    <span onclick= "editTask(this)" class="del-btn material-symbols-outlined edit-btn" id="edit${index}"> edit </span>
    <span onclick= "delTask(this)" class="del-btn material-symbols-outlined delete-btn" id="del${index}"> delete </span>
  </div>
</li>`;
};

const display = () => {
  taskContainer.innerHTML = '';
  todo.forEach((element, index) => {
    taskContainer.innerHTML += listItem(
      (index += 1),
      element.completed,
      element.description
    );
  });

  updateRemainingTaskLength();
};

const displayActive = () => {
  const filteredArr = todo.filter((x) => x.completed !== true);
  taskContainer.innerHTML = '';
  filteredArr.forEach((element, index) => {
    taskContainer.innerHTML += listItem(
      (index += 1),
      element.completed,
      element.description
    );
  });
};

const displaycomplete = () => {
  const filteredArr = todo.filter((x) => x.completed === true);
  taskContainer.innerHTML = '';
  filteredArr.forEach((element, index) => {
    taskContainer.innerHTML += listItem(
      (index += 1),
      element.completed,
      element.description
    );
  });
};

const reAssignIndex = () => {
  todo.forEach((elem, index) => {
    elem.index = index += 1;
  });
};

const saveEditValue = (element) => {
  if (window.event.code === 'Enter' || window.event.code === 'NumpadEnter') {
    if (element.value.length > 0) {
      element.disabled = true;
      element.parentElement.parentElement.classList.remove('editable-task');
      todo.forEach((n, index) => {
        if (element.id === `Task${n.index}`) {
          n.description = element.value;
        }
      });
    } else {
      errorField.innerHTML = 'Input Field cannot be empty!!';
      setTimeout(() => {
        errorField.innerHTML = '';
      }, 5000);
    }

    populateLocalStorage();
    display();
  }
};

let taskArrayLength = todo.length;

const add = (description, completed = false, index = (taskArrayLength += 1)) => {
  todo.push({ description, completed, index });
  populateLocalStorage();
  display();
};

const addNewTask = (element) => {
  if (window.event.code === 'Enter' || window.event.code === 'NumpadEnter') {
    if (element.value.length > 0) {
      add(element.value);
      element.value = '';
    } else {
      errorField.innerHTML = 'Input Field cannot be empty!!';
      setTimeout(() => {
        errorField.innerHTML = '';
      }, 5000);
    }
  }
};

targetInputCheckBox.addEventListener('click', () => {
  if (inputNewTodo.value.length > 0) {
    add(inputNewTodo.value);
    inputNewTodo.value = '';
  } else {
    errorField.innerHTML = 'Input Field cannot be empty!!';
    setTimeout(() => {
      errorField.innerHTML = '';
    }, 5000);
  }
});

display();
