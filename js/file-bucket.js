
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
const db = firebase.firestore();

const check = document.getElementById("pass");
const ulist = document.getElementById("ulist");
var fileBucketRef;
let unsubscribe;

var files = [];
//function uploadfile(files)
//{
  //files = e.target.files;
//  for (let i = 0; i < files.length; i++) {
//    console.log(files[i]);
//  }
//}

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

function uploadfile(files)
{
  //checks if files are selected
  if (files.length != 0) {
    if(check.value === "helloworld1")
    {
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
              "status"
            ).innerHTML += `${files[i].name} uploaded <br />`;
            fileBucketRef = db.collection("file-bucket")
        const { serverTimestamp } = firebase.firestore.FieldValue;
        //get file url
        //var strg = firebase.storage().ref(files[i].name);
        storage
          .getDownloadURL()
          .then(function(url) {
            fileBucketRef.add(
              {
                fileName: String(files[i].name),
                uid: "helloadmin",
                url: String(url),
                createdAt: serverTimestamp()
              });
          })
          .catch(function(error) {
            console.log(error)
            console.log("error encountered");
          });
          }
        );
        
      }
      fileBucketRef = db.collection("file-bucket")
      unsubscribe = fileBucketRef
        .where("uid", "==", "helloadmin")
        .onSnapshot(data => 
        {
          console.log("inside list update")
          const items = data.docs.map(doc =>
          {
            return `<li><em style="border: 1px solid blueviolet;background-color: rgba(137, 43, 226, 0.1);border-radius: 3px;height: max-content;width: max-content;padding-left: 2px;padding-right: 2px;">${ doc.data().fileName }</em>   <a href="${ doc.data().url }">${ doc.data().fileName }</a>  </li>`
          });
          ulist.innerHTML = items.join('');
        });
        setTimeout(()=> {unsubscribe();console.log("unsubscried")}, 10000);
    }
    else
    {
      //unsubscribe && unsubscribe();
      document.getElementById(
        "status"
      ).innerHTML += `you don't have permission to upload!`;
    }
  } else {
    unsubscribe && unsubscribe();
    alert("No file chosen");
  }
}
console.log("before first load")
fileBucketRef = db.collection("file-bucket")
      unsubscribe = fileBucketRef
        .where("uid", "==", "helloadmin")
        .onSnapshot(data => 
        {
          console.log("inside list update")
          const items = data.docs.map(doc =>
          {
            return `<li><em style="border: 1px solid blueviolet;background-color: rgba(137, 43, 226, 0.1);border-radius: 3px;height: max-content;width: max-content;padding-left: 2px;padding-right: 2px;">${ doc.data().fileName }</em>   <a href="${ doc.data().url }">${ doc.data().fileName }</a>  </li>`
          });
          ulist.innerHTML = items.join('');
        });
        setTimeout(()=> {unsubscribe();console.log("unsubscried")}, 10000);

//User main starts
console.log(firebase);

//function deleteall()
//{
//  let list = [];
//  fileBucketRef = db.collection("file-bucket")
//      unsubscribe = fileBucketRef
//        .where("uid", "==", "helloadmin")
//        .onSnapshot(data => 
//        {
//          const items = data.docs.map(doc =>
//          {
//            list.push(doc);
//          });
//        })
//      .then( ()=> 
//      {
//        unsubscribe();
//        for(var k = 0; list.length(); k++)
//        {
//          var storage = firebase.storage().ref(list[k]);
//          storage.delete().then(() =>
//          {
//            console.log("Deleted in storage");
//         }).catch((err) =>
//          {
//            console.log(err);
//         })
//        }
//      });
//}

//User main ends


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
