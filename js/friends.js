

// For changing the width of the container
if(window.innerWidth < 715)
{
    const cont = document.getElementsByClassName('container');
    let x;
    for(let n = 0;n < cont.length;n++)
    {
        x = cont[n];
        x.style.width = '95%';
    }
}

//To Change to height of empty div to push footer to the bottom
const cont = document.getElementsByClassName('container');
x = cont[0];
let a = '';
a = (window.innerHeight - 298) + 'px';
if(window.innerHeight < 298)
{
    x.style.height = '0px'; 
}
else
{
    x.style.height = a; 
}
