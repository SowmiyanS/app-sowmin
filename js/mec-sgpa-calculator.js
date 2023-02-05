
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

//Main logic starts

function fetchdata(dept, reg, sem)
{
    //firebase fetch subjects, credit points for dept, reg, sem
    let subjects = ["19GES29 - Wireless Communication", "19ITC21 - Cloud Computing", "19ITC23 - Computer Networks", "19ITE07 - Salesforce CRM and Platform", "19ITE23 - Angular JS", "19ITC30 - Artificial Intelligence", "19ITC22 - Cloud Computing Laboratory", "19ITE08 - Salesforce CRM and platforms Laboratory", "19ITE24 - Angular JS Laboratory"];
    let credits = [4,3,3,3,4,3,1,1,1,];
    let data = {
        subjects,
        credits
    }
    return data
}

function creditsum(credits)
{
    let sum = 0;
    for(let j = 0; j < credits.length; j++)
    {
        sum = credits[j] + sum;
    }
    return sum;
}

const grade = document.getElementById('grade');

// getting the form1 values

const form1 = document.getElementsByClassName('form1');
const sub = document.getElementsByClassName('sub');

const subcd = document.getElementsByClassName('sub-cd');

console.log(subcd);
function next()
{
    // fetch the data required for form2
    console.log(form1[0].value,
    form1[1].value,
    form1[2].value);
    //fetch data for form 2
    let data = fetchdata(form1[0].value, form1[1].value, form1[2].value);
    //Update the form2 subject values

    for(let j = 0; j < 10 ; j = j + 1)
    {
        if(data.subjects[j])
        {
            sub[j].innerHTML = data.subjects[j];
            subcd[j].value = data.credits[j];
        }
        else
        {
            sub[j].innerHTML = "N/A";
        }
    }

    // dependency - grade constant above
    grade.style.visibility = "visible";
    console.log(subcd.option);
}



const result = document.getElementById('result');
const resulttext = document.getElementById('result-text');

const subgd = document.getElementsByClassName('sub-gd'); 

function calculate()
{
    //Calculate the sgpa
    //get data
    const data = fetchdata(form1[0].value, form1[1].value, form1[2].value);
    //let credit_sum = creditsum(data.credits);
    let credit_sum = 0;
    let dummy = 0;
    for(let j = 0; j < data.subjects.length; j++)
    {
        dummy = subcd[j].value;
        credit_sum = Number(dummy) + credit_sum;
        console.log(credit_sum, subcd[j].value);
    }
    console.log(credit_sum);
    let grade_sum = 0.0;
    for(let j = 0; j < data.subjects.length; j++)
    {
        grade_sum = (subgd[j].value * subcd[j].value) + grade_sum;
        console.log(subcd[j].value);
    }
    let sgpa = grade_sum / credit_sum;

    // dependency - resulttext constant above
    resulttext.innerHTML = "Your SGPA is : <em>" + sgpa +"</em>";

    // dependency - result constant above
    result.style.visibility = "visible";
}

//Main logic ends