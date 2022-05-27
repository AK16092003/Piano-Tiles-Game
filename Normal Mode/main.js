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
					choosen_tiles.splice(i,1);
					possible_tiles.push(id);
					score += 5;
					flag = 1;
					break;
				}
		}
		if(flag == 0){	
			console.log("game over");
			alert("Game Over\nScore : "+score+" points.");
			status = "gameover";
		}
	}
	if(choosen_tiles.length == 0)
	{
		console.log("great you have done it , next level !");
		cur_level += 1;
		status = "set";
		set_tiles();
	}
	
}

var status = "";
var cur_level = 0;
var score = 0;
var possible_tiles = [];
var choosen_tiles = []
restart();

function restart()
{
	status = "start";
	cur_level = 1;
	score = 0;
	possible_tiles = ["11" , "12" , "13" , "14" , "21" , "22" , "23" , "24" , "31" , "32" , "33" , "34" , "41" , "42" , "43" , "44"];
	choosen_tiles = []
	setTimeout(() => {
		alert("Hello friend , Click ok to proceed to PIANO TILES GAME!");
		status = "set";
		set_tiles();
	},1000);
	
}

function set_tiles()
{
	if (cur_level == 16)
	{
		alert("Great ! You have cleared this game with maximum score of !"+score);
		
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
		return ;
	}
	cur_box_id = choosen_tiles[count];
	//console.log(cur_box_id);
	document.getElementById(cur_box_id).style.backgroundColor = "#ff0000";
	setTimeout(() => {
		console.log("Delayed for 1 second.");
		document.getElementById(cur_box_id).style.backgroundColor = "";
		display(choosen_tiles , count + 1);
	}, "1000");
		
		
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
