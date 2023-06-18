
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


//Main logic starts here

console.log("Hello World!")

//get the paragraph tags

let loctn = document.getElementById("loctn");

// get location
//
//
// WHAT HAPPENS IF I REMOVE THE ASYNC ??
// Actually nothing happens it seems it is not worth it
function getLocation() {
	if(navigator.geolocation) {
		loadspinanimate();
		navigator.geolocation.getCurrentPosition(callbackfunc);
		//console.log("Hello from getLocation()");
	}
	else {
		console.log("Geolocation is not supported in your browseer");
		loctn.innerHTML = "<p>Geolocation is not supported in your browseer</p>";	
	}
}

function loadspinanimate()
{
    loctn.style.visibility = "visible";
    loctn.style.display = "flex"; //centers the spinner
    loctn.style.flexDirection = "row";
    loctn.style.flexWrap = "wrap";
    loctn.style.justifyContent = "center";
    loctn.style.alignItems = "center";
    loctn.innerHTML = `<div class="spin"></div>`;
}


function callbackfunc(position) {
	loctn.innerHTML = "<p>Latitude : " + position.coords.latitude + "</br>Longitude : " + position.coords.longitude + "</p>";
}
//Main logic ends here
