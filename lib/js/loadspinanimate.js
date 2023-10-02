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
