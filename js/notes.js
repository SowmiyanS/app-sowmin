// Notes js file
const notes = document.getElementById('display');
const insertmessage = document.getElementById('insertmessage');
const deletemessage = document.getElementById('deletemessage');
let isdeleted = false;
let api = 'https://0ea1c539-cd71-43df-a403-51c2719593d9.us-east-1.cloud.genez.io';

loadspinanimate(notes);
getNotes().then(data => {
    console.log(data);
    displayNotes(notes, data)
});

function loadspinanimate(comp)
{
    comp.style.visibility = "visible";
    comp.style.display = "flex"; //centers the spinner
    comp.style.flexDirection = "row";
    comp.style.flexWrap = "wrap";
    comp.style.justifyContent = "center";
    comp.style.alignItems = "center";
    comp.innerHTML = `<div class="spin"></div>`;
}

function displayNotes(comp, array) {
    comp.removeAttribute('style');
    let displaytext = `<div class="notes">`;
    for(let j = 0;j < array.length;j++) {
        displaytext +=`
        <div id="note">
            <h4>${array[j].title}</h4>
            <p>${array[j].content}</p>
        </div>`;
    }
    displaytext += `</div>`;
    comp.innerHTML = displaytext;
}

function create(input, textarea) {
    let title = input;
    let content = textarea;
    const crt = document.getElementById('crt');
    crt.setAttribute('onclick', '');
    if(title.value !== "" && content.value !== "") {
        //console.log("Inside the if");
        //console.log("title :"+title);
        //console.log("textarea :"+textarea);
        loadspinanimate(insertmessage);
        createNote(api+'/note/create',title.value ,content.value).then((data) => {
            // resetting the form for next use
            title.value = "";
            content.value = "";
            insertmessage.removeAttribute('style');
            insertmessage.innerHTML = "<p>Note Created!!!! <em>Refresh the page to see the changes</em>.</p>";
            crt.setAttribute('onclick', 'create(input, textarea);');
        });
    }
    else {
        console.log("Input fields are empty!");
        insertmessage.removeAttribute('style');
        insertmessage.innerHTML = "<p style='color: red;'>Enter the title and content to create.</p>";
        crt.setAttribute('onclick', 'create(input, textarea);');
    }

}


async function getNotes() {
    const notes = await fetch(api+'/notes');
    const res = await notes.json();
    return res;
}

async function deleteNotes() {
    const dlt = document.getElementById('dlt');
    dlt.setAttribute('onclick','');
    if(!isdeleted) {
        loadspinanimate(deletemessage);
        const res = await fetch(api+'/note/delete/all', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        res.json().then((data) => {
            console.log(data);
            deletemessage.removeAttribute('style');
            deletemessage.innerHTML = `<p>All the notes are deleted successfully.</p>`;
            dlt.setAttribute('onclick','deleteNotes();');
        });
        isdeleted = true;
    }
    else {
        deletemessage.innerHTML = `<p style="color: red;">All the notes are already deleted.</p>`;
        dlt.setAttribute('onclick','deleteNotes();');
    }
}

// Example POST method implementation:
async function createNote(url = "", title, content) {
    data = {
        title: title,
        content: content
    };
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

