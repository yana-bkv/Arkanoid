function Board() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    
    canvas.width = 700;
    canvas.height = 500;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width , canvas.height);
}

export {Board};