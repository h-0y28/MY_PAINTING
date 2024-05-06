const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const fileInput = document.getElementById("file");
const earseBtn = document.getElementById("eraser-btn");
const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
);
const fontSizeSelect = document.getElementById("font-size");
const fontFamilySelect = document.getElementById("font-family");
const fontStyleSelect = document.getElementById("font-style");

const textType = document.getElementById("textType-btn");

const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 900;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap= "round";
ctx.miterLimit = 1;
let isPainting = false;
let isFilling = false;
let fontSize = "48px";
let fontFamily = "serif";   
let fontStyle = "normal";
let textFillType = false;

function onModeClick(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "🪣Fill";
    } else{
        isFilling = true;
        modeBtn.innerText = "🖌️Draw";
    }

}

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting(){
    isPainting = true;
}

function cancelPainting(){
    isPainting = false;
    ctx.beginPath();
}

function onLineWidthChange(event){
    ctx.lineWidth=event.target.value;   
}

function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle=event.target.value;    
}

function onColorClick(event){
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle= colorValue;
    color.value = colorValue;
}

function onCanvnasClick(){
    if(isFilling){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}

function onDestroyClick(){
    ctx.save();
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.restore();
}

function onTextTypeCilck(){
    if(textFillType){
        textFillType = false;
        textType.innerText = "Text Type > Fill🪣"
    }
    else{
        textFillType = true; 
        textType.innerText = "Text Type > Stroke☐"
    }
}

function onEraserClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
}

function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };
}

function onDoubleClick(event) {
    const text = textInput.value;
    if (text !== "") {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = `${fontStyle} ${fontSize} ${fontFamily}`;
        
        if(textFillType)
            ctx.fillText(text, event.offsetX, event.offsetY);
        else{
            ctx.strokeStyle = ctx.fillStyle;
            ctx.strokeText(text, event.offsetX, event.offsetY);
        }
        ctx.restore();
    }
}

function onSaveClick(){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

function onFontSizeChange() {
    fontSize = `${fontSizeSelect.value}px`;
}

function onFontFamilyChange() {
    fontFamily = fontFamilySelect.value;
}

function onFontStyleChange() {
    fontStyle = fontStyleSelect.value;
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove",onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click",onCanvnasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
earseBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
fontSizeSelect.addEventListener("change", onFontSizeChange);
fontStyleSelect.addEventListener("change", onFontStyleChange);
fontFamilySelect.addEventListener("change", onFontFamilyChange);

textType.addEventListener("click", onTextTypeCilck);