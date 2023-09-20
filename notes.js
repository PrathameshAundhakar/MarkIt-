const addBtn = document.getElementById('add');
addBtn.addEventListener('click', () => {
    addNewNote();
});
let values = [];
for (let i = 0; i < values.length; i++) {
    addNewNote(values[i]);
}
function addNewNote(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
    <div class="notes">
        <div class="tools">
            <button class="edit"><i class="fa-solid fa-marker"></i></button>
            <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        <div class="main hidden"></div>
        <textarea name="" id="" cols="30" rows="10"></textarea>
    </div>`

    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');

    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    main.innerHTML = marked.parse(text);

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    deleteBtn.addEventListener('click', () => {
        note.remove();
    });

    textArea.addEventListener('input', (e) => {
        const { value } = e.target;
        main.innerHTML = marked.parse(value);
        updateLocal();
    });

    document.body.appendChild(note);
}

function updateLocal() {
    const note = document.querySelectorAll('textarea');
    let notes = [];

}
