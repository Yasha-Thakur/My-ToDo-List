
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("list");
const delBtn = document.getElementById("del-btn");

addBtn.addEventListener("click", () => {
    const todoList = JSON.parse(localStorage.getItem("todoList"));
    const todoItem = document.getElementById("input").value;
    if (todoList.length >= 20) alert("limit reached");
    else {
        const isDuplicate = todoList.find(e => e == todoItem)
        if (isDuplicate) {
            alert("duplicate item found");
        }
        else {
            todoList.push(todoItem);
            localStorage.setItem("todoList", JSON.stringify(todoList));
            list.innerHTML += `
            <div class="list-item">
                <p>${todoItem}</p>
                <button class="edit"> EDIT </buttonvalue=>
                <button class="delete"> DELETE </button>
            </div>`
        }
    }
    document.getElementById("input").value = "";
})

window.addEventListener("load", () => {
    let todoList = JSON.parse(localStorage.getItem("todoList"));
    if (!todoList) {
        todoList = [];
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }
    else {
        todoList.forEach(item => {
            list.innerHTML += `
            <div class="list-item">
                <p>${item}</p>
                <button class="edit"> EDIT </buttonvalue=>
                <button class="delete"> DELETE </button>
            </div>`
        });
    }
})

list.addEventListener("click", (e) => {
    if (e.target.className == 'delete') {
        const str = e.target.previousElementSibling.previousElementSibling.innerText;
        let todoList = JSON.parse(localStorage.getItem("todoList"));
        const itemIndex = todoList.findIndex(e => e == str);
        todoList.splice(itemIndex, 1);
        localStorage.setItem("todoList", JSON.stringify(todoList));
        list.removeChild(e.target.parentElement);
    }
    if (e.target.className == 'edit') {
        const newNode = document.createElement('div');
        newNode.className = "edit-info";

        newNode.innerHTML += `
            <input
            type="text"
            name="edit"
            placeholder="Edit elements"
            id="edit-input"
            />
            <button class="submit">SUBMIT</button>`
        const existingNode = e.target.parentElement;
        e.target.parentElement.removeChild(e.target);
        existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    }
    if (e.target.className == 'submit') {
        const todoList = JSON.parse(localStorage.getItem("todoList"));
        const newtodoItem = document.getElementById("edit-input").value;
        const oldtodoItem = e.target.parentElement.previousElementSibling.children[0].innerText;
        const isDuplicate = todoList.find(e => e == newtodoItem)
        if (isDuplicate) {
            alert("duplicate item found");
        }
        else {
            const itemIndex = todoList.findIndex(e => e == oldtodoItem);
            todoList[itemIndex] = newtodoItem;
            localStorage.setItem("todoList", JSON.stringify(todoList));
            e.target.parentElement.previousElementSibling.innerHTML = `
                <p>${newtodoItem}</p>
                <button class="edit"> EDIT </buttonvalue=>
                <button class="delete"> DELETE </button>`
            e.target.parentElement.parentElement.removeChild(e.target.parentElement);
        }
    }

})
