$(document).ready(function(){

$("body").append("<div class='startText' id='title'>WIZARD PEOPLE</div>")
$("body").append("<div class='startText' id='instructions'>CLICK TO SELECT A WIZARD</div>")
$("body").append("<div class='startText' id='instructions2'>WAIT FOR OTHER PLAYERS</div>")
$("body").append("<div class='startText' id='instructions3'>PRESS ENTER TO BEGIN</div>")

$("body").append("<div class='startText' id='instructions4'>A,S,W,D TO MOVE</div>")
$("body").append("<div class='startText' id='instructions5'>SPACEBAR TO ATTACK</div>")
// $("body").append("<h1 id='instruction' class='centered'>CLICK TO SELECT A WIZARD, ENTER TO PLAY</h1>")


var uidDict;
var canvas;
var ctx;
var rectList;
var prizeList; 
var baddieList; 
var bonesList; 
var colsDict;


var coin = new Image();
var ruby = new Image();
var goblin_left = new Image();
var goblin_right = new Image();
var wizard_red_left = new Image();
var wizard_red_right = new Image();
var wizard_blu_left = new Image();
var wizard_blu_right = new Image();
var wizard_gre_left = new Image();
var wizard_gre_right = new Image();
var wizard_yel_left = new Image();
var wizard_yel_right = new Image();
var bones = new Image();
var rat_left = new Image();
var rat_right = new Image();
var gobking_left = new Image();
var gobking_right = new Image();
var potion = new Image();

// coin.src = "static/images/coin.png";
// ruby.src = "static/images/ruby.png";
// goblin_left.src = "static/images/goblin_left.png";
// goblin_right.src = "static/images/goblin_right.png";
// wizard_red_left.src = "static/images/wiz_red_left.png";
// wizard_red_right.src = "static/images/wiz_red_right.png";
// wizard_blu_left.src = "static/images/wiz_blu_left.png";
// wizard_blu_right.src = "static/images/wiz_blu_right.png";
// wizard_gre_left.src = "static/images/wiz_gre_left.png";
// wizard_gre_right.src = "static/images/wiz_gre_right.png";
// wizard_yel_left.src = "static/images/wiz_yel_left.png";
// wizard_yel_right.src = "static/images/wiz_yel_right.png";
// bones.src = "static/images/bones.png";
// rat_left.src = "static/images/rat_left.png";
// rat_right.src = "static/images/rat_right.png";

//album: http://i.imgur.com/wkONQZ8.png
//http://imgur.com/a/lvhHu

// gobking_left.src = "static/images/gobking_left.png";
// gobking_right.src = "static/images/gobking_right.png";
// potion.src = "static/images/potion.png";






gobking_left.src = "http://i.imgur.com/alUMAKk.png";
gobking_right.src = "http://i.imgur.com/9Bwvh9H.png";
potion.src = "http://i.imgur.com/zLS5Tqf.png";

coin.src = "https://i.imgur.com/wOxaRHq.png";
ruby.src = "https://i.imgur.com/bAsFNAZ.png"
goblin_left.src = "https://i.imgur.com/gB7lEU5.png";
goblin_right.src = "https://i.imgur.com/WYwdG3Z.png";
wizard_red_left.src = "https://i.imgur.com/ZDSfndn.png";
wizard_red_right.src = "https://i.imgur.com/wkONQZ8.png";
wizard_blu_left.src = "https://i.imgur.com/k2ob4Wl.png";
wizard_blu_right.src = "https://i.imgur.com/HLY8Ipk.png";
wizard_gre_left.src = "https://i.imgur.com/HsyJz43.png";
wizard_gre_right.src = "https://i.imgur.com/QvhDDL5.png";
wizard_yel_left.src = "https://i.imgur.com/b3oV1mG.png";
wizard_yel_right.src = "https://i.imgur.com/ICC5ViR.png";
bones.src = "https://i.imgur.com/cXrOQAK.png";
rat_left.src = "https://i.imgur.com/GqhYJ7I.png";
rat_right.src = "https://i.imgur.com/rg33icE.png";


var wizColorDict = {"red":[wizard_red_left,wizard_red_right],
					"blu":[wizard_blu_left,wizard_blu_right],
					"gre":[wizard_gre_left,wizard_gre_right],
					"yel":[wizard_yel_left,wizard_yel_right],
					}

var typeDict = {"coin":coin,
				"ruby":ruby,
				"potion":potion,}

var googleColorDict = {'blu':'#0266C8', 'red':'#F90101', 'yel':'#F2B50F', 'gre':'#00933B'}

canvas = document.getElementById("canvas");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
ctx = canvas.getContext("2d");

var redTextToPrint = 0;
var bluTextToPrint = 0;
var greTextToPrint = 0;
var yelTextToPrint = 0;


function drawstartScreen(){

	// ctx.clearRect(0, 0, canvas.width, canvas.height);

	// console.log(redSize);
	wizard_yel_right.onload = function() {
  		ctx.drawImage(wizard_red_right, 0, 0, canvas.width/2, canvas.height/2);
  		ctx.drawImage(wizard_blu_right, canvas.width-canvas.width/2, 0, canvas.width/2, canvas.height/2);
  		ctx.drawImage(wizard_yel_right, 0, canvas.height-canvas.height/2, canvas.width/2, canvas.height/2);
  		ctx.drawImage(wizard_gre_right, canvas.width-canvas.width/2, canvas.height-canvas.height/2, canvas.width/2, canvas.height/2);

  	}


}


function updatestartScreen(){

  	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	ctx.drawImage(wizard_red_right, 0, 0, canvas.width/2, canvas.height/2);
	ctx.drawImage(wizard_blu_right, canvas.width-canvas.width/2, 0, canvas.width/2, canvas.height/2);
	ctx.drawImage(wizard_yel_right, 0, canvas.height-canvas.height/2, canvas.width/2, canvas.height/2);
	ctx.drawImage(wizard_gre_right, canvas.width-canvas.width/2, canvas.height-canvas.height/2, canvas.width/2, canvas.height/2);


	ctx.fillStyle = "#ffffff";
  	ctx.font = "bold 50px Arial";
  	ctx.fillText(redTextToPrint, 0, canvas.height/2);

  	ctx.fillStyle = "#ffffff";
  	ctx.font = "bold 50px Arial";
  	ctx.fillText(bluTextToPrint, canvas.width/2, canvas.height/2);

  	ctx.fillStyle = "#ffffff";
  	ctx.font = "bold 50px Arial";
  	ctx.fillText(greTextToPrint, canvas.width/2, canvas.height);

  	ctx.fillStyle = "#ffffff";
  	ctx.font = "bold 50px Arial";
  	ctx.fillText(yelTextToPrint, 0, canvas.height);

}	
	


	




function clicker(){

	$("body").click(function(event){  

	$( ".startText" ).fadeOut( "slow", function() {
    // Animation complete.
  	});



	x = event.pageX;
	y = event.pageY;

	if (x >= canvas.width/2){
		if (y >= canvas.height/2) {
			col = "gre"
		}
		else {
			col = "blu"
		}
	}
	else {
		if (y >= canvas.height/2) {
			col = "yel"
		}
		else {
			col = "red"
		}
	}

	if (uidDict == undefined){
		socket.emit('playerChooseRequest', {"col":col});
	}
	
});

}

clicker();

$(document).keypress(function(e) {
    if(e.which == 13) {
		socket.emit('createCanvasRequest', {"w":document.body.clientWidth, "h":document.body.clientHeight});
    }
});


//connection Request
var socket = io.connect('http://' + document.domain + ':' + location.port + '/test');



socket.on('playerChoosePush', function(d) {

    colsDict = d.colsDict
    // console.log(colsDict)

    redTextToPrint = colsDict['red'];
	bluTextToPrint = colsDict['blu'];
	greTextToPrint = colsDict['gre'];
	yelTextToPrint = colsDict['yel'];

    updatestartScreen();

});




window.onbeforeunload = function() {
    socket.emit('popPlayerRequest', {});
}






//connection Push
socket.on('connectPush', function(d) {
    console.log(d.msg);
    

    colsDict = d.colsDict
    redTextToPrint = colsDict['red'];
	bluTextToPrint = colsDict['blu'];
	greTextToPrint = colsDict['gre'];
	yelTextToPrint = colsDict['yel'];

    updatestartScreen();

});

drawstartScreen();
updatestartScreen();


//refresh global variables Push
socket.on('refreshGlobalsPush', function(d) {

    console.log(d.msg);
    clearTimeout(timer);
    location.reload();

});

var uid;
socket.on('assignUIDPush', function(d) {

    console.log(d.uid);
    uid = d.uid

});


//refresh global variables Push
socket.on('gameInProgressPush', function(d) {
    alert(d.msg);
});




socket.on('popPlayerPush', function(d) {
    console.log(d.msg);
});


//create canvas Push
var bgcolor;
var globalHeaduid = -1;
socket.on('createCanvasPush', function(d) {

    $("body").css({"backgroundColor":"#35373b"});
    globalHeaduid = d.globalHeaduid;
    bgcolor = d['bgcolor'];
    canvas.width = d.canvasDim['w'];
	canvas.height = d.canvasDim['h'];
    // createCanvas(d.rectList, d.prizeList, d.baddieList);

    globalHeaduid = d.globalHeaduid;
    console.log(globalHeaduid);

    rectList = d.rectList;
	prizeList = d.prizeList;
	baddieList = d.baddieList;
	listenForKeypressLoop();

});

//game loop Push
socket.on('gameLoopPush', function(d) {
    baddieList = d.baddieList;
    bonesList = d.bonesList;
    uidDict = d.uidDict;
    draw();
});

//keypress Push
socket.on('keypressPush', function(d) {

	prizeList = d.prizeList;
	baddieList = d.baddieList;
	bonesList = d.bonesList;
    uidDict = d.uidDict;
    draw();

});






// function createCanvas(rL,pL,bL) {

// 	// rectList = rL;
// 	// prizeList = pL;
// 	// baddieList = bL;
// 	// listenForKeypressLoop();

// }



function draw() {



	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = bgcolor;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//rectangles
	for (i = 0; i < rectList.length; i++) { 
		ctx.fillStyle = rectList[i].c;
		ctx.fillRect(rectList[i].x, rectList[i].y, rectList[i].w, rectList[i].h);
	}

	//prizes
	for (i = 0; i < prizeList.length; i++) { 

		ctx.drawImage(typeDict[prizeList[i].type], prizeList[i].x, prizeList[i].y, prizeList[i].w, prizeList[i].h);
	
	}

	//bones
	for (i = 0; i < bonesList.length; i++) { 
		
		image = bones;

		ctx.drawImage(image, bonesList[i].x, bonesList[i].y, bonesList[i].h*0.8, bonesList[i].h*0.8);
	}

	//baddies
	for (i = 0; i < baddieList.length; i++) { 
		
			

			if (baddieList[i]['type'] == 'goblin'){
				img_right = goblin_right;
				img_left = goblin_left;
			}
			else if (baddieList[i]['type'] == 'rat'){
				img_right = rat_right;
				img_left = rat_left;
			}
			else if (baddieList[i]['type'] == 'gobking'){

				img_right = gobking_right;
				img_left = gobking_left;
			}


			if (baddieList[i]['dx']>=0){
				image = img_right;
			}
			else{
				image = img_left;
			}

			cx = baddieList[i]['x'] + baddieList[i]['w']/2
			cy = baddieList[i]['y'] + baddieList[i]['h']/2

			ctx.fillStyle = "#CC1100";
			ctx.beginPath();
			ctx.arc(
				cx,
				cy,
				baddieList[i]['r'],
				0, 
				Math.PI * 2
			);
			ctx.closePath();
			ctx.fill();

		ctx.drawImage(image, baddieList[i].x, baddieList[i].y, baddieList[i].w, baddieList[i].h);
	}



	//players
	offset = 0
	uidList = Object.keys(uidDict)
	for (i = 0; i < uidList.length; i++) { 

		p = uidDict[uidList[i]]

		cx = p['x'] + p['w']/2
		cy = p['y'] + p['h']/2

		textColor = googleColorDict[p['c']]

			ctx.fillStyle = p['cc'];
			ctx.beginPath();
			ctx.arc(
				cx,
				cy,
				p['r'],
				0, 
				Math.PI * 2
			);
			ctx.closePath();
			ctx.fill();

			if (p['dx']>=0){
				wiz_image = wizColorDict[p['c']][1];
			}
			else if (p['dx']<0){
				wiz_image = wizColorDict[p['c']][0];
			}
			else {
				wiz_image = wizColorDict[p['c']][0];
			}

			ctx.drawImage(wiz_image, p['x'], p['y'], p['w'], p['h']);

			
			if (p['score'] == undefined) {
				score = 0
			}
			else{
				score = p['score']
			}

			textToPrint = score + " " + reverse(p['health']['hearts']) + " "
	    	ctx.fillStyle = textColor;
		  	ctx.font = "bold 50px Arial";
		  	ctx.fillText(textToPrint, 20 + offset, canvas.height - 20);
		  	offset += 300
		
	}
}


//keypresses
var keyState = {};
var mult;
var gameCount=1;
var timer;

window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);    
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);

// function gameLoop() {
	function listenForKeypressLoop() {
	
		// draw();

		//n 110
		if(keyState[78]) {
			socket.emit('refreshGlobalsRequest', {});
		}

		//l 76 space 32
		else if(keyState[32]) {

			if (!mult) {
		        mult = true;
		        setTimeout(function() {
		            mult = false;
		        }, 500)
		        socket.emit('attackRequest', {});
		    }
    	}
			
		else if (keyState[87] || keyState[65] || keyState[83] || keyState[68]) {

				x = 0;
				y = 0;
				stepSize = 4;

				//w 119
				if(keyState[87]) {
					y -= stepSize;
				}
				//a 97
				if(keyState[65]) {
					x -= stepSize;
				}
				// s 115
				if(keyState[83]){
					y += stepSize;
				}
				// d 100
				if(keyState[68]) {
					x += stepSize;
				}

				//speed up uni-diectional movement 
				//since you travel farther in diagnola
				if (x == 0){
					y = y*1.35
				}
				if (y == 0){
					x = x*1.35
				}

				socket.emit('keypressRequest', {"dx": x, "dy": y});


		}

		timer  = setTimeout(listenForKeypressLoop, 20);

		gameCount = gameCount + 1;

		if (gameCount == 5){
			if (uid == globalHeaduid){
				socket.emit('gameLoopRequest', {});
				gameCount = 1
			}
		}

}





});



function reverse(s){
    return s.split("").reverse().join("");
}





