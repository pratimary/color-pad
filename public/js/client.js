/**
 * Created by pratima on 12/26/2015.
 */
jQuery(function($)
{
    var socket=io.connect();


    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var paint;
    var context = $("#MainCanvas")[0].getContext("2d");
    var ownColor='#'+Math.random().toString(16).substr(-6);
    context.strokeStyle = ownColor;
    context.lineJoin = "round";
    context.lineWidth = 5;
    //socket.emit('new user',context);

    $("#user-form").submit(function(e)
    {

    });

    $("#MainCanvas").mousedown(function(e){
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    });
    $("#MainCanvas").mousemove(function(e){
        if(paint){
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });
    $("#MainCanvas").mouseup(function(e){
        paint = false;
        clickX=[];
        clickY=[];
        clickDrag=[];
    });

    $("#MainCanvas").mouseleave(function(e){
        paint = false;
    });
    function addClick(x, y, dragging)
    {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
    }

    function redraw(){
        //context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
        context.strokeStyle=ownColor;
        context.beginPath();
        if(clickX.length>1)
        {
            var drawpath={};

            if(clickDrag[clickX.length-1]) {
                context.moveTo(clickX[clickX.length - 2], clickY[clickX.length - 2]);
                drawpath.moveToX=clickX[clickX.length - 2];
                drawpath.moveToY=clickY[clickX.length - 2];
            }
            else
            {
                context.moveTo(clickX[clickX.length-2]-1, clickY[clickX.length-1]);
                drawpath.moveToX=clickX[clickX.length-2]-1;
                drawpath.moveToY=clickY[clickX.length-1];

            }
            context.lineTo(clickX[clickX.length-1], clickY[clickX.length-1]);
            drawpath.lineToX=clickX[clickX.length-1];
            drawpath.lineToY=clickY[clickX.length-1];
            drawpath.color=ownColor;
            socket.emit('send coordinates',drawpath);
        }
        context.closePath();
        context.stroke();

    }

    socket.on('draw', function(data){
        context.beginPath();
        //console.log(data);
        context.strokeStyle=data['color'];
        context.moveTo(data['moveToX'],data['moveToY']);
        context.lineTo(data['lineToX'],data['lineToY']);
        context.closePath();
        context.stroke();

    });
});