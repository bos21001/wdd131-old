let input = document.getElementById('favchap');
let error = document.getElementById('error');
let submitButton = document.querySelector('button');
let list = document.getElementById('list');

submitButton.onclick = function() {
    if (input.value.trim() === '') {
        input.style.borderColor = 'red';
        error.textContent = 'This field is required';
        error.style.color = 'red';
    } else {
        const li = document.createElement('li');
        li.textContent = input.value;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';

        li.append(deleteButton);

        list.append(li);

        deleteButton.onclick = function() {
            list.removeChild(li);
        }

        input.style.borderColor = 'black';
        error.textContent = '';
        input.value = '';
    }
    input.focus();
}