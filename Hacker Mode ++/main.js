var selected_tiles = 0;
var time_interval_id;
var time_var = 0;

function input_click(id)
{

	console.log("Clicked Button : ",id);	

	if (status == "play")
	{
		var flag = 0;
		if(choosen_tiles[selected_tiles] == id && document.getElementById(id).style.backgroundColor+"" != "rgb(255, 0, 0)")
		{
					// newly selected tile
					
					tile_pressed_song();
					console.log("good !");
					document.getElementById(id).style.backgroundColor = "#ff0000"; // red color to tile when clicked
					//choosen_tiles.splice(i,1);
					//possible_tiles.push(id);
					selected_tiles+=1;
					score += 5;
					document.getElementById("_score").innerHTML = score+ " points";
					flag = 1;
		}
				
		
		if(flag == 0 && document.getElementById(id).style.backgroundColor+"" == "rgb(255, 0, 0)")
		{
			// user selecting a already selected tile
			// do nothing
			console.log("The user is selected an already selected tile !");

		}
		if(flag == 0 && document.getElementById(id).style.backgroundColor+"" != "rgb(255, 0, 0)"){	
			game_over();
			game_termination_song();
		}

	}
	if(selected_tiles == cur_level)
	{
		// selected all tiles
		// goto next level
		clearInterval(time_interval_id);
		setTimeout(() => {
			for(var i = 1 ; i <= 6 ; i ++){
				for(var j = 1 ; j <= 6 ; j ++ ){
					var _id = i+""+j;
					if(document.getElementById(_id).style.backgroundColor+"" == "rgb(255, 0, 0)")
							document.getElementById(_id).style.backgroundColor = "#90E090";
							//  green for correct tile!
				}
			}
		},100);
		
		setTimeout(() => {
			console.log("great you have done it , next level !");
			document.getElementById("_score").innerHTML = score+" points";
			cur_level += 1;
			status = "set";
			set_tiles();
		},500);
	
	}
	
}

var status = "";
var cur_level = 0;

var score = 0;
var possible_tiles = [];
var choosen_tiles = []
restart();

var time_1 = 2200;   // time difference between display of each box
var time_2 = 1100;   // time difference between opacity_increase and opacity_decrease animation
var time_3 = 10;   // time difference for opacity to decrease step wise
var counter = 0.01;   // amount by which opacity of box increases or decreases

function restart()
{
	possible_tiles = [];

	for(var i = 1 ; i <= 6 ; i ++){
		for(var j = 1 ; j <= 6; j ++ ){
			var _id = i+""+j;
			possible_tiles.push(_id)
			document.getElementById(_id).style.backgroundColor = "";
		}
	}
	status = "start";
	cur_level = 1;
	score = 0;
	// set score to 0 in ui
	document.getElementById("_score").innerHTML = " 0 points";
	document.getElementById("_time").innerHTML = "---- s";
	
	choosen_tiles = []
	setTimeout(() => {
		alert("The game is going to start now! Be alert!");
		status = "set";
		set_tiles();
		
	},1000);
	
}

function extract(s)
{
	s = localStorage.getItem(s);
	console.log(s);
	var n = s.length / 2;
	max_level = n;
	var l = []
	for(var i = 0 ; i < n ; i ++)
	{
		l.push(s.substr(2*i , 2));
	}
	return l;
}
function set_tiles()
{

	clearInterval(time_interval_id);
	possible_tiles = extract("Choosen_tiles");
	selected_tiles = 0;
	// make all bgcolor of elements to default
	// disable hover effect when setting up the question
	print(possible_tiles);	
	for(var i = 1 ; i <= 6; i ++){
		for(var j = 1 ; j <= 6 ; j ++ ){
			var _id = i+""+j;
			document.getElementById(_id).style.backgroundColor = "";
			document.getElementById(_id).style.pointerEvents = "none";
		}
	}
	
	if (cur_level >= max_level+1)
	{
		alert("Great ! You have cleared this game");
		win_game();
		return ;
	}

	var cur_box = possible_tiles[cur_level-1]; // cur box to be added
	choosen_tiles.push(cur_box);
		
	console.log("choosen tiles : ");
	print(choosen_tiles);
	display(choosen_tiles , 0);

}
function display(choosen_tiles , count)
{
	if (count == cur_level)
	{
		status = "play";
		// display of all tiles completed
		// set hover properties of box to default

		time_interval_id =  setInterval(() => {
			time_var += 0.01;
			document.getElementById("_time").innerHTML = time_var.toFixed(2) + " s";
		},10);

		for(var i = 1 ; i <= 6; i ++){
			for(var j = 1 ; j <= 6; j ++ ){
				var _id = i+""+j;
				document.getElementById(_id).style.pointerEvents = "auto";
			}
		}
		return ;
	}

	cur_box_id = choosen_tiles[count];
	console.log(cur_box_id);
	document.getElementById(cur_box_id).className = "glow";
	document.getElementById(cur_box_id).style.opacity = 0;
	document.getElementById(cur_box_id).style.backgroundColor = "#ffffff";
	// opacity effect to the box !
	animate(cur_box_id);
	
	setTimeout(() => {
		
			document.getElementById(cur_box_id).className = "tiles";
			display(choosen_tiles , count + 1);
		} , time_1);	

}

function animate(id)
{
	console.log("start increase");
	opacity_increase(id , 0);
	setTimeout(() => {
		console.log("start decrease!");
		opacity_decrease(id , 1);
	} , time_2);
		
}

function opacity_increase(id , t)
{	
	if (t >= 1)
	{
		console.log("increase opacity completed");
		return ;
	}
	else{
		setTimeout(() => {
			document.getElementById(id).style.opacity = t;
			//console.log(t);
			opacity_increase(id , t + counter);
		} , time_3);
	}
}


function opacity_decrease(id , t)
{	

	if (t <= 0)
	{
		console.log("decrease opacity completed");
		document.getElementById(id).style.backgroundColor = "";
		document.getElementById(id).style.opacity = 1;
		return ;
	}
	else{
		setTimeout(() => {
			document.getElementById(id).style.opacity = t;
			//console.log(t);
			opacity_decrease(id , t - counter);
		} , time_3);
	}
}

function print(l)
{
	var len = l.length;
	var s = "";
	for(var i = 0 ; i < len ; i ++){
		s += l[i]+" , ";
	}
	console.log(s);	
}



function tile_pressed_song()
{
	var myAudio = new Audio('songs/tile_song.wav');
	myAudio.play();
}

var gameend_audio = document.getElementById("myAudio");
function game_termination_song()
{
	gameend_audio.play();
}
function game_over()
{
	status = "gameover";
	document.getElementById("_time").innerHTML = "0.00 s";
	clearInterval(time_interval_id);
	localStorage.setItem("score" , score);
	localStorage.setItem("time" , time_var.toFixed(2));
	game_termination_song();
	setTimeout(()=>{
		window.location.replace("game_over.html");
	} , 1000);
}
function win_game()
{
	status = "game win";
	document.getElementById("_time").innerHTML = "0.00 s";
	clearInterval(time_interval_id);
	localStorage.setItem("score" , score);
	localStorage.setItem("time" , time_var.toFixed(2));
	setTimeout(()=>{
		window.location.replace("win_game.html");
	} , 1000);
}