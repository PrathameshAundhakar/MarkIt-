
const notesState = [
    {
        noteName: "First Note",
        content: "Hello",
        id: "note1",
    },
    {
        noteName: "Second Note",
        content: "# Better hello",
        id: "note2",
    },
    {
        noteName: "Third Note",
        content: "Even better hello",
        id: "note3",
    },
    {
        noteName: "Fourth Note",
        content: "Best Hello",
        id: "note4",
    },
];
notesState[0].content = document.getElementById("note1").value;
notesState[1].content = document.getElementById("note2").value;
notesState[2].content = document.getElementById("note3").value;
notesState[3].content = document.getElementById("note4").value;

const inactiveTabName = "tab-s";
const activeTabName = "tab";

const renderActiveTab = (id) => {
    console.log("rendering active tab", id);
    const noteTabsContainer = document.querySelector(".note-tab");
    noteTabsContainer.innerHTML = "";
    notesState.forEach((noteData) => {
        const noteTab = document.createElement("button");
        if (noteData.id === id) {
            noteTab.classList.add(activeTabName);
        } else {
            noteTab.classList.add(inactiveTabName);
        }
        noteTab.innerText = noteData.noteName;
        noteTab.dataset.tabId = noteData.id;
        noteTabsContainer.appendChild(noteTab);
    });
    const noteTabs = document.querySelectorAll(".tab-s");
    noteTabs.forEach((noteTab) => {
        noteTab.addEventListener("click", (e) => {
            renderActiveTab(e.target.dataset?.tabId);
        });
    });

    const activeIndex = notesState.findIndex((noteData) => noteData.id === id);
    const textInput = document.querySelector("textarea");
    textInput.value = notesState[activeIndex].content;
    textInput.oninput = (e) => {
        notesState[activeIndex].content = e.target.value;
        document.getElementById(notesState[activeIndex].id).value = e.target.value;

        console.log(e.target.value);
        // console.log(notesState[activeIndex].id);
        // console.log(activeIndex, e.target.value, notesState[activeIndex]);
    };
};

renderActiveTab(notesState[0].id);
var op = 0;


function rendr() {

    if (op == 0) {
        document.getElementById('text').style.display = "none";
        document.getElementById('content').style.display = "block";
        document.getElementById('save').style.display = "none";
        document.getElementById('content').innerHTML = marked.parse(document.getElementById('text').value);
        // document.getElementById('content').innerHTML = "test"
        op = 1;
    } else {
        document.getElementById('text').style.display = "block";
        document.getElementById('content').style.display = "none";
        document.getElementById('save').style.display = "block";
        op = 0;
    }
}

function share() {
    document.getElementById('content').innerHTML = marked.parse(document.getElementById('text').value);
    var divContents = document.getElementById("content").innerHTML;
    var a = window.open('', '', 'height=500, width=500');
    a.document.write('<html>');
    a.document.write('<body >');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
    a.print();
}

