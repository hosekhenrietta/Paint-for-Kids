const canvas = document.querySelector("#canvas")
canvas.width = window.innerWidth-(window.innerWidth/4)
canvas.height = window.innerHeight-200

let context = canvas.getContext('2d')
context.fillStyle = "white"
context.fillRect(0,0,canvas.width,canvas.height)

canvas.addEventListener('mousedown', start_draw_line, false)
canvas.addEventListener('mousemove', draw_line, false)
canvas.addEventListener('mouseup', stop_draw_line, false)
canvas.addEventListener('mouseout', stop_draw_line, false)


canvas.addEventListener('touchstart_draw_line', start_draw_line, false)
canvas.addEventListener('touchmove', draw_line, false)
canvas.addEventListener('touchend', stop_draw_line, false)


let brush_color = "black"
let brush_size = "3"
let is_drawing = false
let lines_array = [];


function pick_color(element){
    brush_color = element.style.backgroundColor
}


function start_draw_line(event){
    is_drawing = true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
    event.preventDefault()
    draw_line(event);
}

function draw_line(event){
    if (is_drawing) {
        context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
        context.strokeStyle = brush_color
        context.lineWidth = brush_size
        context.lineCap = "round"
        context.lineJoin = "round"
        context.stroke()
    }
}

let line_counter = -1;
function stop_draw_line(event){
    if (is_drawing) {
        context.stroke()
        context.closePath()
        is_drawing = false
    }
    event.preventDefault()
    if (event.type != 'mouseout') {
        lines_array.push(context.getImageData(0, 0, canvas.width, canvas.height))
        line_counter += 1
    }
}
function clear_canvas(){
    line_counter = -1
    lines_array = []
    context.fillStyle = "white"
    context.clearRect(0,0,canvas.width,canvas.height)
    context.fillRect(0,0,canvas.width,canvas.height)
  
}

function undo_last_line(){
    if (line_counter <= 0) {
        clear_canvas();
    } else{
        line_counter -= 1
        lines_array.pop()
        context.putImageData(lines_array[line_counter],0, 0)
        
    }
}