function Field() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    
    canvas.backgroundColor = "#4f4646";
    canvas.width = 700;
    canvas.height = 500;

    ctx.fillStyle = "#4f4646";
    ctx.fillRect(0, 0, canvas.width , canvas.height);
}

export {Field};