
// For changing the width of the container
if(window.innerWidth < 727)
{
    const cont = document.getElementsByClassName('container');
    let x;
    for(let n = 0;n < cont.length;n++)
    {
        x = cont[n];
        x.style.width = '95%';
    }
}

//Main logic starts here
var files = [];
document.getElementById("files").addEventListener("change", function(e) {
  files = e.target.files;
  for (let i = 0; i < files.length; i++) {
    console.log(files[i]);
  }
});

document.getElementById("send").addEventListener("click", function() {
  //checks if files are selected
  if (files.length != 0) {
    //Loops through all the selected files
    for (let i = 0; i < files.length; i++) {
      //create a storage reference
      var storage = firebase.storage().ref(files[i].name);

      //upload file
      var upload = storage.put(files[i]);

      //update progress bar
      upload.on(
        "state_changed",
        function progress(snapshot) {
          var percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          document.getElementById("progress").value = percentage;
        },

        function error() {
          alert("error uploading file");
        },

        function complete() {
          document.getElementById(
            "uploading"
          ).innerHTML += `${files[i].name} upoaded <br />`;
        }
      );
    }
  } else {
    alert("No file chosen");
  }
});

function getFileUrl(filename) {
  //create a storage reference
  var storage = firebase.storage().ref(filename);

  //get file url
  storage
    .getDownloadURL()
    .then(function(url) {
      console.log(url);
    })
    .catch(function(error) {
      console.log("error encountered");
    });
}

//User Authentication starts
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js'
import { getAuth } from ''

const firebaseConfig = {
  apiKey: "AIzaSyDDYSRTfoGnvxogfMSe7gcFoQT4_av5dD0",
  authDomain: "app-sowmin.firebaseapp.com",
  projectId: "app-sowmin",
  storageBucket: "app-sowmin.appspot.com",
  messagingSenderId: "350978195358",
  appId: "1:350978195358:web:de003f3383da8d538c208f",
  measurementId: "G-L1GFMVF1YZ"
};

//const app = initializeApp(firebaseConfig); //returns a firebase app object ?




//User Authentication ends


//For Popup BoxStart
//This state variable is a dependancy for the popup component
let state = 0;
function popupon()
{
    if(state == 0)
    {
        //Setting the state to active so that popupoff will run.
        state = 1;
        const popup = document.getElementById('popup-box');
        //Note: the visibility property of this element must be set to 'invisible' before itself
        popup.style.visibility = "visible";
        popup.style.width = "120px";
        popup.style.height = "140px";
        popup.style.background = "white";
    //    popup.style.border = "1px solid blueviolet;";
    //    popup.style.borderradius = "8px";
    //    popup.style.top = "10%";
    //    popup.style.left = "77%";
        popup.style.top = "100%";
        popup.style.left = "100%";
        if(/Mobi/i.test(window.navigator.userAgent))
        {
            //this case works for desktop browser
            //After refreshing the page, the window.innerHeight and .outerHeight are different
            //For desktop browsers [I beleive] alone the difference between these heights is 
            //Greater than 105.
            popup.style.transform = "translate(-130px, -"+(window.outerHeight-65)+"px)";
        }
        else
        {
            //this case works for mobile browser
            popup.style.transform = "translate(-130px, -"+(window.innerHeight-65)+"px)";
        }
    }
    else
    {
        popupoff()
    }

/*    if(window.innerWidth < 715)
    {
        popup.style.top = "100%";
        popup.style.left = "100%";
        popup.style.transform = "translate(-130px, -346%)";
    }
    else
    {
        let factor = 0;
        factor = (window.innerWidth * 0.1)-(window.innerWidth*0.0325);
        popup.style.transform = "translate("+factor+"%, 0%)";
        console.log("translate(-"+factor+"%, 0%)");
    }*/
    //popup.style.transform = "translate(10%, 10%, 1%)";
}

function popupoff()
{
    //This state is used to verify that the popup is currently active
    state = 0;
    //We set the state again to inactive so that poupon will run [see popupon]
    const popup = document.getElementsByClassName('popup');
    for(let i = 0;i < popup.length;i++)
    {
        popup[i].style = "visibility: collapse;";
    }
    
    /*popup.style.color = "transparent";
    popup.style.width = "0px";
    popup.style.height = "0px"; */
    //console.log("ha ha")
}

//Popup Box Ends
