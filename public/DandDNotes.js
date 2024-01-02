let notes = []
const drop_down = document.getElementById("list")
var username = document.getElementById("name")
var note_field = document.getElementById("notes")
var id_field = document.getElementById("id")
var reset = document.getElementById("reset_button")

//validate data
function checkdata()
{

    if(username.value == "")
    {
        alert("Please enter the name")
        fname.focus()
        return false
    }

    if(note_field.value == "")
    {
        alert("Please enter the notes")
        note_field.focus()
        return false
    }

    return true;
}

//this is the form
const form = document.getElementById("form1")


//when the form is submitted do this
form.addEventListener("submit", (event) => {
    event.preventDefault()

    //get all the for data
    //the "event" carries all the data from the form
    const f_data = new FormData(event.target)
    console.log({note_name: f_data.get("note_name"), note_content: f_data.get("note_content")})
    axios.post(`/notes?id=${f_data.get("id")||""}&note_name=${f_data.get("note_name")}&note_content=${f_data.get("note_content")}`, )
    .then(() => {
      //rerender the page
        getNotes()
    })
    .catch(console.error)
})

//render the webpage
//render the notes
function getNotes() {

    drop_down.innerHTML = `<option></option>`
    axios.get("/notes").then((res) => {
        notes = res.data //assigning the data to a global variable
        notes.forEach(note => {
            drop_down.innerHTML += `
            <option value="${note.id}">${note.note_name}</option>`
        })

    }).catch(console.error)
}
getNotes()


//do something when the dropdown menu changes options
drop_down.addEventListener("change", (event) => {
    const {value} = event.target; //get value from what was selected
    const note = notes.find((note) => {
        return note.id == value
    })

    //updating teh html with the note value
    if(note){
        username.value = note.note_name
        note_field.value = note.note_content
        id_field.value = note.id
    }
})

reset.addEventListener("click", (event) => {
    event.preventDefault()
    event.stopPropagation()
    username.value = ""
    note_field.value = ""
    id_field.value = ""
})

// html,css - sass - flexbox - responsive
// -neat code - parallax
// vscode - emmet
// javascript - docs website - scope - forEach - try/catch
//creative circle
