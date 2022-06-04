function input_click(id)
{
	console.log("Clicked Button : ",id);	
	
	if (status == "play")
	{
		
		var flag = 0;
		for(var i = 0 ; i < cur_level ; i ++){
				if(choosen_tiles[i] == id)
				{
					console.log("good !");
					document.getElementById(id).style.backgroundColor = "#ff0000"; // red color to tile when clicked
					choosen_tiles.splice(i,1);
					possible_tiles.push(id);
					score += 5;
					flag = 1;
					break;
				}
				
		}
		
		console.log(document.getElementById(id).style.backgroundColor);
		if(document.getElementById(id).style.backgroundColor+"" == "rgb(255, 0, 0)")
		{
			// user selecting a already selected tile
			// do nothing
		}
		else if(flag == 0){	
			console.log("game over");
			alert("Game Over\nScore : "+score+" points.");
			status = "gameover";
		}
	}
	if(choosen_tiles.length == 0)
	{

		setTimeout(() => {
			for(var i = 1 ; i <= 4 ; i ++){
				for(var j = 1 ; j <= 4 ; j ++ ){
					var _id = i+""+j;
					if(document.getElementById(_id).style.backgroundColor+"" == "rgb(255, 0, 0)")
							document.getElementById(_id).style.backgroundColor = "#90E090";
				}
			}
		},100);
		
		setTimeout(() => {
			console.log("great you have done it , next level !");
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
	
	for(var i = 1 ; i <= 4 ; i ++){
		for(var j = 1 ; j <= 4 ; j ++ ){
			var _id = i+""+j;
			document.getElementById(_id).style.backgroundColor = "";
		}
	}
	status = "start";
	cur_level = 1;
	score = 0;
	possible_tiles = ["11" , "12" , "13" , "14" , "21" , "22" , "23" , "24" , "31" , "32" , "33" , "34" , "41" , "42" , "43" , "44"];
	choosen_tiles = []
	setTimeout(() => {
		alert("The game is going to start now! Be alert!");
		status = "set";
		set_tiles();
	},1000);
	
}

function set_tiles()
{
	
	// make all bgcolor of elements to default
	// disable hover effect when setting up the question
	
	for(var i = 1 ; i <= 4 ; i ++){
		for(var j = 1 ; j <= 4 ; j ++ ){
			var _id = i+""+j;
			document.getElementById(_id).style.backgroundColor = "";
			document.getElementById(_id).style.pointerEvents = "none";
		}
	}
	
	
	
	if (cur_level >= 16)
	{
		alert("Great ! You have cleared this game with maximum score of "+score+"\nYou can restart the game by clicking the below button!");
		return ;
	}
	
	for(var i = 0 ;i < cur_level ; i ++ ){
		
		var cur_pos = Math.floor(Math.random()*(16-i));
		var cur_box = possible_tiles[cur_pos];
		possible_tiles.splice(cur_pos,1);
		choosen_tiles.push(cur_box);
	}
	console.log("choosen tiles : ");
	print(choosen_tiles);
	display(choosen_tiles , 0);

}
function display(choosen_tiles , count)
{
	if (count == cur_level)
	{
		status = "play";
		// set hover properties of box to default
	
		for(var i = 1 ; i <= 4 ; i ++){
			for(var j = 1 ; j <= 4 ; j ++ ){
				var _id = i+""+j;
				document.getElementById(_id).style.pointerEvents = "auto";
			}
		}
			

		return ;
	}
	cur_box_id = choosen_tiles[count];
	console.log(cur_box_id);
	document.getElementById(cur_box_id).style.opacity = 0;
	document.getElementById(cur_box_id).style.backgroundColor = "#ffffff";
	
	// opacity effect to the box !
	animate(cur_box_id);
	setTimeout(() => {
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