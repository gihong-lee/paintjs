const canvas = document.getElementById("jsCanvas"),
    colors = document.getElementsByClassName("jsColor"),
    range = document.getElementById("jsRange"),
    mode = document.getElementById("jsMode"),
    saveBtn = document.getElementById("jsSave"),
    ctx = canvas.getContext("2d");

const INITAIL_COLOR = "#2c2c2c";
let painting = false;
let filling = false;

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0,0,700,700);
ctx.strokeStyle = INITAIL_COLOR;
ctx.fillStyle = INITAIL_COLOR;
ctx.lineWidth = 2.5;

function startPainting()
{
    painting = true;

}

function stopPainting()
{
    painting = false;

}

function onMouseMove(event)
{
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting)
    {
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
    else
    {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function onMouseUp(event)
{
    stopPainting();
}

function clickColor(event)
{
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = event.target.style.backgroundColor;
}

function changeRange(event)
{
    ctx.lineWidth = event.target.value;
}

function clickMode(event)
{
    if(!filling)
    {
        filling = true;
        mode.innerText = "Paint";
    }
    else
    {
        filling = false;
        mode.innerText = "Fill";
    }
}

function handleClick(event)
{
    if(filling)
    {
        ctx.fillRect(0,0,700,700);
    }
}

function clickCM(event)
{
    event.preventDefault();
}

function clickSaveBtn()
{
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.click();
}

if(canvas)
{
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("contextmenu",clickCM);
}

Array.from(colors).forEach(color => color.addEventListener("click",clickColor));

if(range)
{
    range.addEventListener("change",changeRange);
}

if(mode)
{
    mode.addEventListener("click",clickMode);
}

if(saveBtn)
{
    saveBtn.addEventListener("click",clickSaveBtn);
}