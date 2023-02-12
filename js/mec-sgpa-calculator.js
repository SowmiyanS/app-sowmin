
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

var credits = [0,0];

async function fetchdata(dept, reg, sem)
{
    //firebase fetch subjects, credit points for dept, reg, sem
    let url = "https://app-sowmin-backend-pass1234.cyclic.app/"+reg.toString()+"/"+dept.toUpperCase()+"-"+sem.toString();
    const response = await fetch(url);
    console.log(response);
    let results = await response.json();//.then((data) =>
    //{
    //    console.log(data);
    //    let results = Array(data);
    //    console.log(results);
    //    return results;
    //})
    console.log(results);
    return Promise.all(results);
}

function loadspinanimate()
{
    grade.style.visibility = "visible";
    grade.style.display = "flex"; //centers the spinner
    grade.style.flexDirection = "row";
    grade.style.flexWrap = "wrap";
    grade.style.justifyContent = "center";
    grade.style.alignItems = "center";
    grade.innerHTML = `<div class="spin"></div>`;
}


function creditsum(credits, length)
{
    let sum = 0;
    for(let j = 0; j < length; j++)
    {
        sum = Number(credits[j].value) + Number(sum);
    }
    return sum;
}

const grade = document.getElementById('grade');

// getting the form1 values

const form1 = document.getElementsByClassName('form1');
//const sub = document.getElementsByClassName('sub'); //not available before next()

//const subcd = document.getElementsByClassName('sub-cd'); //not available before next()

//console.log(subcd); //not available
function next()
{
    loadspinanimate();
    let gradetable = `
    <table id="grade-table">
        <tr>
        <td style="border: none;">
            <p style="font-size: small; text-align: center;"><b>Subject</b></p>
        </td>
        <td style="border: none;">
            <p style="font-size: small; text-align: center;"><b>Credit</b></p>
        </td>
        <td style="border: none;">
            <p style="font-size: small; text-align: center;"><b>Grade</b></p>
        </td>
    </tr>`;

    // fetch the data required for form2
    console.log(form1[0].value,form1[1].value,form1[2].value);
    //fetch data for form 2
    fetchdata(form1[0].value, form1[1].value, form1[2].value).then((results) =>
    {
        var selected = `selected="selected"`;
        credits = results.map(result => result.credit); // storing the credits in global for future use
        grade.style = "visibilit: visible";
        for(let sub of results)
        {
            gradetable +=
            `   <tr>
                    <td>
                    <select name="sub" style="border-style: none; box-sizing: content-box; background-color: rgba(252, 244, 252, 0.829); border-top-right-radius: 4px; border-top-left-radius: 4px;">`;
            for(let subject of sub.subjectname)
            {
                gradetable +=
                `
                    <option value="${subject}">${subject}</option>`;
            }

            gradetable +=
            `
            </select>
                    </td>`;

            gradetable +=
            `
                    <td>
                        <select name="sub1-cd" class="sub-cd" data-selected="${sub.credit}">
                            <option value=" " `;
                            if(sub.credit == ""){gradetable += selected;}; gradetable += `></option>
                            <option value="10" `;
                            if(sub.credit == 10){gradetable += selected;}; gradetable += `>10</option>
                            <option value="9" `;
                            if(sub.credit == 9){gradetable += selected;}; gradetable += `>9</option>
                            <option value="8" `;
                            if(sub.credit == 8){gradetable += selected;}; gradetable += `>8</option>
                            <option value="7" `;
                            if(sub.credit == 7){gradetable += selected;}; gradetable += `>7</option>
                            <option value="6" `;
                            if(sub.credit == 6){gradetable += selected;}; gradetable += `>6</option>
                            <option value="5" `;
                            if(sub.credit == 5){gradetable += selected;}; gradetable += `>5</option>
                            <option value="4" `;
                            if(sub.credit == 4){gradetable += selected;}; gradetable += `>4</option>
                            <option value="3" `;
                            if(sub.credit == 3){gradetable += selected;}; gradetable += `>3</option>
                            <option value="2" `;
                            if(sub.credit == 2){gradetable += selected;}; gradetable += `>2</option>
                            <option value="1" `;
                            if(sub.credit == 1){gradetable += selected;}; gradetable += `>1</option>
                        </select>
                    </td>
                    <td>
                        <select name="sub1-gd" class="sub-gd">
                            <option value="">choose the grade</option>
                            <option value="10">O</option>
                            <option value="9">A+</option>
                            <option value="8">A</option>
                            <option value="7">B+</option>
                            <option value="6">B</option>
                            <option value="5">U</option>
                            <option value="0">U+</option>
                        </select>
                    </td>
                </tr>
            `;
            
        }
        gradetable += `
        <tr>
            <td colspan="2" id="marigin-bottom">
                <div class="button" align="center" onclick="calculate()">
                    <h5>Calculate</h5>
                </div>
            </td>
        </tr>
        </table>
        <script>
        document.querySelectorAll('[data-selected]').forEach(e => {
            e.value = e.dataset.selected
        });
        </script>`;
        grade.innerHTML = gradetable;
        //for(let j = 0; j < 10 ; j = j + 1)
        //{
        //    if(data.subjects[j])
        //    {
        //        sub[j].innerHTML = data.subjects[j];
        //        subcd[j].value = data.credits[j];
        //    }
        //    else
        //    {
        //        sub[j].innerHTML = "N/A";
        //    }
        //}
        //
        //grade.style.visibility = "visible";
    })
    //console.log("Hello world");

    // dependency - grade constant above
    
    //console.log(subcd.option);
}



const result = document.getElementById('result');
const resulttext = document.getElementById('result-text');

const subgd = document.getElementsByClassName('sub-gd'); 
const subcd = document.getElementsByClassName('sub-cd');

function calculate()
{
    //Calculate the sgpa
    //get data
    //console.log(credits);
    //const data = fetchdata(form1[0].value, form1[1].value, form1[2].value); //no need to call as we already have credits array :)
    let credit_sum = creditsum(subcd, credits.length);  

    console.log(credit_sum);
    let grade_sum = 0.0;
    for(let j = 0; j < credits.length; j++)
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