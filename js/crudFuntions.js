const inputNewTodo = document.getElementById('input-new-task');
const taskContainer = document.getElementById('Task-Container');
const targetDataDiv = document.getElementById('show-items-qty');
const delBtn = document.querySelectorAll('.delete-btn');
const errorField = document.getElementById('Display-Error');
const TargetNavAllBtn = document.getElementById('Nav-bar-All');
const TargetNavActiveBtn = document.getElementById('Nav-bar-Active');
const TargetNavCompleteBtn = document.getElementById('Nav-bar-complete');

let todo = JSON.parse(localStorage.getItem('Tasks')) || [];

function updateRemainingTaskLength() {
  const filteredArr = todo.filter((x) => x.completed !== true);
  remainingTask = filteredArr.length;
  targetDataDiv.innerHTML = `${remainingTask} Items Left`;
}

let i = 0;

const populateLocalStorage = () => {
  const data = JSON.stringify(todo);
  localStorage.setItem('Tasks', data);
};

const listItem = (index, iscompleted, description) => {
  return `<li id="Task${index}" class="list-item">
  <div class="sub-task">
    <div class="checkbox ${
      iscompleted ? 'check-bg' : ''
    }" id="check-box ${index}"><img class="check-icon ${
iscompleted ? 'show' : ''
}" src="./images/icon-check.svg" alt=""></div>
    <input
      class="input-task ${iscompleted ? 'check-Task' : ''}"
      id="Task${index}"
      for="Task ${index}"
      disabled
      value="${description}"
    />
  </div>
  <div class="btn-container">
    <span class="del-btn material-symbols-outlined edit-btn" id=""edit${index}> edit </span>
    <span class="del-btn material-symbols-outlined delete-btn" id=del${index}> delete </span>
  </div>
</li>`
}

const display = () => {
  taskContainer.innerHTML = '';
  let j = 0;
  todo.forEach((element) => {
    j += 1;
    taskContainer.innerHTML += listItem(j, element.completed, element.description );
  });
  registerElements();
};

const displayActive = () => {
  const filteredArr = todo.filter((x) => x.completed !== true);
  taskContainer.innerHTML = '';
  let j = 0;
  filteredArr.forEach((element) => {
    j += 1;
    taskContainer.innerHTML += listItem(j, element.completed, element.description )
  });
  registerElements();
};

const displaycomplete = () => {
  const filteredArr = todo.filter((x) => x.completed === true);
  taskContainer.innerHTML = '';
  let j = 0;
  filteredArr.forEach((element) => {
    j += 1;
    taskContainer.innerHTML += listItem(j, element.completed, element.description );
  });
  registerElements();
};

const reAssignIndex = () => {
  let k = 0;
  todo.forEach((elem) => {
    k += 1;
    elem.index = k;
  });
};

const registerElements = () => {
  if (todo.length > 0) {
    const checkboxes = document.querySelectorAll('.checkbox');
    const targetTaskField = document.querySelectorAll('.input-task');
    //   const kebabMenu = document.querySelectorAll('.vertical-dots');
    //   const doneBtn = document.querySelectorAll('.done-btn');
    const delBtn = document.querySelectorAll('.delete-btn');
    const editBtn = document.querySelectorAll('.edit-btn');
    const clearBtn = document.getElementById('clear-btn');

    delBtn.forEach((del) => {
      del.addEventListener('click', () => {
        const delBtn = del;
        todo.forEach((n) => {
          if (delBtn.id === `del${n.index}`) {
            todo.splice(n.index - 1, 1);
          }
        });
        reAssignIndex();
        populateLocalStorage();
        display();
      });
    });
    //   dragging();

    targetTaskField.forEach((task) => {
      task.addEventListener('keypress', (e) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
          if (task.value.length > 0) {
            task.disabled = true;
            task.parentElement.parentElement.classList.remove('editable-task');
            todo.forEach((n) => {
              if (task.id === `Task${n.index}`) {
                n.description = task.value;
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
      });
    });

    editBtn.forEach((edit) => {
      edit.addEventListener('click', () => {
        const editBtn = edit;
        let targetInput =
          editBtn.parentElement.parentElement.children[0].children[1];
        targetInput.disabled = false;
        editBtn.parentElement.parentElement.classList.add('editable-task');
        // populateLocalStorage();
        // display();
      });
    });

    checkboxes.forEach((box) => {
      box.addEventListener('click', () => {
        const checkbox = box;
        const checkboxid = box.id;
        const checkboxidNumber = Number(checkboxid.replace(/[^0-9]/g, ''));

        checkbox.classList.toggle('check-bg');
        checkbox.children[0].style.display = 'block';
        checkbox.parentElement.children[1].classList.toggle('check-Task');

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
      });
    });

    clearBtn.addEventListener('click', () => {
      const filteredArr = todo.filter((x) => x.completed !== true);
      todo = filteredArr;
      console.table('filtered Array=', filteredArr);
      console.table('todo Array=', todo);
      reAssignIndex();
      populateLocalStorage();
      display();
    });
  }
};

let k = todo.length;

const add = (description, completed = false, index = (k += 1)) => {
  todo.push({ description, completed, index });
  populateLocalStorage();
  display();
};

inputNewTodo.addEventListener('keypress', (e) => {
  if (e.code === 'Enter' || e.code === 'NumpadEnter') {
    if (inputNewTodo.value.length > 0) {
      add(inputNewTodo.value);
      inputNewTodo.value = '';
    } else {
      errorField.innerHTML = 'Input Field cannot be empty!!';
      setTimeout(() => {
        errorField.innerHTML = '';
      }, 5000);
    }
  }
});

const targetInputCheckBox = document.getElementById('input-check-Box');

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

TargetNavAllBtn.addEventListener('click', () => {
  display();
});

TargetNavActiveBtn.addEventListener('click', () => {
  displayActive();
});

TargetNavCompleteBtn.addEventListener('click', () => {
  displaycomplete();
});

updateRemainingTaskLength();
display();
