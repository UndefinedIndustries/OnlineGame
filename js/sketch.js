(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
var gamelevelx = 85;
var gamelevely = 95;
var gamelevel = 2;
var startlength = 80;

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = window.innerWidth - 2,
    height = 200,
    startheight = -height,
    player = {
        x: width / width + 20,
        y: height - 15,
        width: 5,
        height: 5,
        speed: 2.5,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false
    },
    win = {
        x: gamelevelx,
        y: gamelevely
    },
    keys = [],
    friction = 0.75,
    gravity = 0.5;
    var boxes = [];
function createboundaries(){

    //boundaries
    boxes.push({
        x: 0,
        y: 0,
        width: 10,
        height: height
    });
    boxes.push({
        x: 0,
        y: -height - 2,
        width: width,
        height: 50
    });
    boxes.push({
        x: 0,
        y: height - 2,
        width: startlength,
        height: 50
    });
    boxes.push({
        x: width - 10,
        y: 0,
        width: 10,
        height: height
    });
}
function newlevel(){
    boxes = [];
    createboundaries();
    player.x = width / width + 20;
    player.y= height - 15;
}

//obstacles

function checkobstacles(level){
        // Blue rectangle


if(level == 1){
    newlevel();
    win.x = 85
    win.y = 95
    boxes.push({
        x: 70,
        y: height-30,
        width: 10,
        height: 5
    });
    boxes.push({
        x: 40,
        y: height-50,
        width: 10,
        height: 5
    });
    boxes.push({
        x: 20,
        y: height-70,
        width: 10,
        height: 5
    });
    boxes.push({
        x: 60,
        y: height-100,
        width: 30,
        height: 5
    });
        boxes.push({
            x: 90,
            y: 95,
            width: 1,
            height: 5
        });

} else if (level == 2){
    newlevel();
    boxes.push({
        x: startlength+20,
        y: height-20,
        width: 20,
        height: 5
<<<<<<< HEAD
    });   
    boxes.push({
        x: startlength+85,
        y: height-30,     
        width: 30,
        height: 5
    });   
    boxes.push({
        x: startlength+85,
        y: height-50,     
        width: 10,
        height: 5
    });   
    boxes.push({
        x: startlength+35,
        y: height-50,     
        width: 10,
        height: 5
    });  
=======
    });
        boxes.push({
            x: startlength+85,
            y: height-30,

            width: 30,
            height: 5
        });
>>>>>>> 00d0181dc55e8c2ff4e070d1ca075928328bbed1
    win.x = startlength+95;
    win.y = height-35;


//    win.x = 10;

}

}
canvas.width = width;
canvas.height = height;






function update() {

    if( Math.round(player.x) == win.x  || player.x+5 > win.x > player.x-5 && player.y == win.y ){
        console.log("win");

        checkobstacles(++gamelevel);

    }

    // check keys
    if (keys[38] || keys[32] || keys[87]) {
        // up arrow or space
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.speed * 2;
        }
    }
    if (keys[39] || keys[68]) {
        // right arrow
        if (player.velX < player.speed) {
            player.velX++;
        }
    }
    if (keys[37] || keys[65]) {
        // left arrow
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }

    player.velX *= friction;
    player.velY += gravity;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "black";
    ctx.beginPath();

    player.grounded = false;
    for (var i = 0; i < boxes.length; i++) {
        ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);

        var dir = colCheck(player, boxes[i]);

        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
            player.velY *= -1;
        }

    }

    if(player.grounded){
         player.velY = 0;
    }
    //console.log(player.y);
    player.x += player.velX;
    player.y += player.velY;

    ctx.fill();
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);


    ctx.fillStyle = "blue";
    ctx.fillRect(win.x, win.y, player.width, player.height);

    requestAnimationFrame(update);

    if(player.y >= 200){
        player.x = width / width + 20
        player.y =height - 15
        player.velX = 0;
    }
}

function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});


window.addEventListener("load", function () {
    update();
    checkobstacles(gamelevel);
});
