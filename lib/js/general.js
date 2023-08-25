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

//GowyContainer Starts
//To Change to height of empty div to push footer to the bottom
if(document.getElementsByClassName('glowycontainer').length)
{
	const cont = document.getElementsByClassName('glowycontainer');
	x = cont[0];
	let a = '';
	a = (window.innerHeight - 288) + 'px';
	if(window.innerHeight < 288)
	{
    	x.style.height = '0px'; 
	}
	else
	{
    	x.style.height = a; 
	}
	if(window.innerWidth < 727)
	{
    	const cont = document.getElementsByClassName('glowycontainer');
    	let x;
    	for(let n = 0;n < cont.length;n++)
    	{
        	x = cont[n];
        	x.style.width = '95%';
    	}
	}
}
//GlowyContainer Ends


