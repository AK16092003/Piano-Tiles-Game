var selected_tiles = 0;
var time_interval_id;
var time_var = 0;

function input_click(id)
{
    console.log("Clicked Button : ",id);	
    if(document.getElementById(id).style.backgroundColor+"" != "rgb(255, 255, 255)")
	{
		// newly selected tile				
		tile_pressed_song();
		console.log("good !");
		document.getElementById(id).style.backgroundColor ="#ffffff"; // white color to tile when clicked
		document.getElementById(id).style.textAlign ="center"; // white color to tile when clicked
		document.getElementById(id).innerHTML = selected_tiles+1; // white color to tile when clicked
        selected_tiles+=1;
		choosen_tiles.push(id);
	}
	else{
		// user selecting a already selected tile
		// do nothing
		console.log("The user is selected an already selected tile !");
	}

}

var status = "";
var cur_level = 0;
var choosen_tiles = []

function proceed()
{
 	var s = ""
	for(var i = 0 ; i < choosen_tiles.length ; i ++)
	{
		s += choosen_tiles[i];
	}
	console.log(s);
	localStorage.setItem("Choosen_tiles" , s);
	window.location.replace("main.html");
}

function tile_pressed_song()
{
	var myAudio = new Audio('songs/tile_song.wav');
	myAudio.play();
}
