//VARIABLES
var myGamePiece;
var myObstacle = [];
var expert_trajectory = [];
var score = 1000;
var coordinates = [];
var start_check = false;
var number_of_obstacles = 6;
var time_count = 0;
var end_comp;
var interval = 10;
var game_num = 0;
var results = [];
var systemTime = "";
var todayDate = "";
var hori = 0;
var vert = 0;
var arr = [];
var collide_counter = 0;
var starter_comp;

//
var speed = 1.7;
var x_velocity = 0.1;
var y_velocity = 0.1;


//
var theta_k = 1;
var alpha_k = 0;
var angle = 0;
var mod_angle = 0;
var u_mod_mult = 0;

//
var interval_test = null;
var interval_katie = 10;

var trial_it = 0; //trial iteration number - 0 = practice round
var max_dist = 0; //maximum game distance
var theta_list;
var study_num;

var game_done = false;
var assistanceLevelVal;

var obs_y = new Array(6); //array of obstacle avoidance distances
var obs_dist = new Array(6);
var rect; //gets window size property
var windForce=0; //horizontal pushing force
var total_trials = 10; //total trials
var total_games = total_trials;
var group_number;

//previous trial data
var prev1_rec_collide = " ";
var prev1_rec_time = " ";
var prev1_game = " ";
var prev1_rec_max_dist = " ";
var prev2_rec_collide = " ";
var prev2_rec_time = " ";
var prev2_game = " ";
var prev2_rec_max_dist = " ";
var prev3_rec_collide = " ";
var prev3_rec_time = " ";
var prev3_game = " ";
var prev3_rec_max_dist = " ";
var group_change = ['Change_1', 'Change_2', 'Change_3','Change_4'];
var group_const = ['Const_1','Const_2','Const_3'];

var rec_score_comp = 9; 

function group_check() {
    study_num = 1;

    if (study_num == 0){
        rand_group = Math.floor(Math.random() * (group_const.length));
        group_number = group_const[rand_group];
        final_sequence = random_theta_const();

    } else if (study_num == 1){
        rand_group = Math.floor(Math.random() * (group_change.length));
        group_number = group_change[rand_group];
        final_sequence = random_theta_change();
    }

    return final_sequence;
}

function addZero(x, n) {
    while (x.toString().length < n) {
        x = "0" + x;
    }
    return x;
}
function myTime() {
    var d = new Date();
    var h = addZero(d.getHours(), 2);
    var m = addZero(d.getMinutes(), 2);
    var s = addZero(d.getSeconds(), 2);
    var ms = addZero(d.getMilliseconds(), 3);
    systemTime = h + ":" + m + ":" + s + ":" + ms;
    return systemTime;
}
// Get system date
function mySystemDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    todayDate = mm + "/" + dd + "/" + yyyy;
    return todayDate;
}


//GAMESTARTING Loop to initilize obstacles and gamepiece,updates every frame to ouput those same objects
function startGame() {
    myGamePiece = new component(35, 35, "images/penguin.png", 0, 200, 0.4, 0.35, "image"); //component(width, height, color, x, y, gravity, gravitySpeed, type)
    starter_comp = new component(22, 22, "red", 0, 200, 0, 0);
    end_comp = new component(40, 40, "images/igloo.png", 1210, 400, 0, 0, "image");

    for (i = 0; i < number_of_obstacles; i++) {
        if (i == 0)
            myObstacle.push(new component(20, 350, "red", 150, 0, 0, 0));
        else if (i == 1)
            myObstacle.push(new component(20, 330, "red", 350, 270, 0, 0));
        else if (i == 2)
            myObstacle.push(new component(20, 450, "red", 550, 0, 0, 0));
        else if (i == 3)
            myObstacle.push(new component(20, 330, "red", 750, 270, 0, 0));
        else if (i == 4)
            myObstacle.push(new component(20, 430, "red", 950, 0, 0, 0));
        else if (i == 5)
            myObstacle.push(new component(20, 330, "red", 1100, 270, 0, 0));
    }

    myGameArea.start();
    return;
}
//Main canvas and event listener loop
var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        if (game_num == 0) {
            this.canvas.width = 1250;
            this.canvas.height = 600;
            this.canvas.style.display = "block"; //ADDED
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            interval_test = setInterval(updateGameArea, interval_katie);
			

            this.context.font = "30px Verdana green";
            this.context.fillText("Click and hold your mouse to start playing!", this.canvas.width / 2 - 250, this.canvas.height / 2);
            myGamePiece.update();
            end_comp.update();
            starter_comp.update();
            window.addEventListener('mousedown', function (event) {
				rect = myGameArea.canvas.getBoundingClientRect();
                if (game_num == 0 && (event.clientX -rect.left>= 0) && (event.clientX -rect.left<= 50) && (event.clientY >= 150)&& (event.clientY <= 250)) {
                    start_check = true;
                    game_num = 1;
                }
            })
            window.addEventListener('mousemove', function (e) {
                rect = myGameArea.canvas.getBoundingClientRect();
                mouse_pos_x = e.clientX-rect.left;
                mouse_pos_y = e.clientY;         //multiplier can be used to control the speed of the y coordinate
            })
        }
        else {
            this.canvas.width = 1250;
            this.canvas.height = 600;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.context.font = "40px Verdana green";
            this.context.fillText("Well done! Click next to play again!", this.canvas.width / 2 - 250, this.canvas.height / 2);
            myGamePiece.update();
            end_comp.update();
            window.removeEventListener('mousedown', function (event) {
                if (event.keyCode == 80) {
                    start_check = false;
                }
            })
            return;
        }

    },
    //display on screen
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#000";
        this.context.font = "bold 16px Times";
        this.context.fillText("Time : " + time_count / 100 + "secs", 20, 40);
		this.context.fillText("Collisions : " + collide_counter, 20, 20);
		

    }
}
//COMPONENT MAKING FUNCTION
function component(width, height, color, x, y, gravity, gravitySpeed, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;
    this.collide = false;
    this.passed = false;
    this.gravity = gravity; //initial gravity value, depend and adust later accordingly
    this.gravitySpeed = gravitySpeed; //speed of initial gravity value
    this.update = function () {
		
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.hitBottom();
    }
    this.hitBottom = function () {
        var rockbottom = myGameArea.canvas.height - myGamePiece.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
        }
    }

}
//OBJECT COLLISION AND DETECTION LOOP
function detectCollision(gp) {
    for (i = 0; i < myObstacle.length; i++) {
        if ((myObstacle[i].x - myObstacle[i].width / 2) <= (gp.x + gp.width/1.5) && (myObstacle[i].x + myObstacle[i].width / 2) >= (gp.x-gp.width/2.75) ){
            if (myObstacle[i].y <= gp.y + gp.height && (myObstacle[i].y + myObstacle[i].height) >= gp.y) {
                if (myObstacle[i].collide == false) {    //change this to true if you want multiple object collision at the same object if it goes through
                    score = score - (750 / number_of_obstacles);  //75% of score
                    obs_y[i] = gp.y;

                    if (i%2 == 0){
                        obs_dist[i] = (gp.y) - myObstacle[i].height;
                    }else{
                        obs_dist[i] = (-gp.y - gp.height)+ myObstacle[i].y;
                    }
                    myObstacle[i].collide = true;
                    collide_counter += 1;
                    myObstacle[i].color = "yellow";
                }
            }else{
                if(myObstacle[i].collide == false && myObstacle[i].passed == false) {
                    //console.log(gp.y);
                obs_y[i] = gp.y;
                //console.log("else");
                //console.log(obs_y[i]);
                
                if (i%2 == 0){
                    obs_dist[i] = (gp.y) - myObstacle[i].height;
                    
                }else{
                    obs_dist[i] =  myObstacle[i].y - gp.y - gp.height;
                }
                myObstacle[i].passed = true;

                }
			}
        }
    }
}

//TRAJECTORY CALCULTOR FUNCTION
function trajectory(xx, yy) {
    var u = 100;  //speed of the pixel per seconds
    var h;
    var v;
    var p1 = {
        h: 0,
        v: 0
    };
    var p2 = {
        h: xx,
        v: yy
    }
    var angleRadians = Math.atan2(p2.v - p1.v, p2.h - p1.h);
    hori = u * Math.cos(angleRadians);
    vert = u * Math.sin(angleRadians);
    arr = [hori, vert]
    return arr;

}

//THE ESSENTIAL GAME LOOP WHICH UPDATES THE SCORES,SAVES THEM in ARRAY and UPATES POSITIONS,etc
function updateGameArea() {
	rect = myGameArea.canvas.getBoundingClientRect();
    if (start_check == true) {
        myGameArea.clear();
        end_comp.update();
        for (i = 0; i < myObstacle.length; i++) {
            myObstacle[i].update();
        }
        this.detectCollision(myGamePiece);
        myTime();
        mySystemDate();
        //trajectory(myGamePiece.x,myGamePiece.y);
        coordinates.push(systemTime, todayDate, ((time_count / 100).toPrecision(3)))
        coordinates.push(myGamePiece.x)
        coordinates.push(-1 * myGamePiece.y)
        coordinates.push(score, collide_counter, "\n")

        time_count += 1;
        myGamePiece.update();
        if (myGamePiece.x <= 1200 - myGamePiece.width / 2) {
            if (time_count % 1 == 0)     //Number of ms frames after which to update the score
                if (time_count > 950) //If time is greater than 9.50 seconds.
                    score -= 2

            if (myGamePiece.y >= 400){
                windForce = 0.75;
            } else if (myGamePiece.y >= 300 && myGamePiece.y < 400){
                windForce = 1.25;
            }else if (myGamePiece.y >= 200 && myGamePiece.y < 300){
                windForce = 1.75;
            }  else{
                windForce = 2;
            }

            dx = mouse_pos_x - myGamePiece.x;
            dy = mouse_pos_y - myGamePiece.y;
            angle = Math.atan2(dy, dx);
            mod_angle = (1 - alpha_k * (1 - theta_k)) * angle;

            x_velocity = Math.cos(mod_angle) * speed;
            y_velocity = Math.sin(mod_angle) * speed;
            myGamePiece.x += x_velocity + windForce;
            myGamePiece.y += y_velocity;
			
            myGamePiece.newPos();
        }

        //WHEN PENGUIN REACHES END
        if (myGamePiece.x > 1200 - myGamePiece.width / 2) {
            game_done = true;
            save_final();
            this.myGameArea.clear();
            start_check = false;
            myGamePiece = null;
            myObstacle = [];
            score = 1000;
            collide_counter = 0;
            coordinates = [];
            time_count = 0;
            end_comp = null;
            interval *= 7.5;
            clearInterval(interval_test);
            game_num = 1;
            this.startGame();
        }
    }
}


function killGame() {
    game_done = false;
    myGameArea.canvas.style.display = "none"; //hide
    return;

}

function restartGame() {
    myGameArea.canvas.style.display = "block";
    this.myGameArea.clear();
    myGamePiece = null;
    myObstacle = [];
    score = 1000;
    collide_counter = 0;
    coordinates = [];
    start_check = false;
    time_count = 0;
    end_comp = null;
    interval *= 7.5;
    clearInterval(interval_test);
    game_num = 0;

    this.startGame();
    return;
}

function create_result_file(id, group_number) {
    $.ajax({
        type: "POST",
        url: "create_server.php",
        data: { workerid: id, trans: group_number }
    })
}

function save_result(workerid, assistanceLevelVal, trustVal, confVal, group_number, autoAgreeVal) {
    trial_val = trial_it - 1;
    $.ajax({
        type: "POST",
        url: "server.php",
        data: { workerid: workerid, trial: trial_val, trans: group_number, control: theta_k, score: rec_score, d1:obs_dist[0],d2:obs_dist[1],d3:obs_dist[2], d4:obs_dist[3], d5:obs_dist[4], d6:obs_dist[5], time: rec_time, collision: rec_collide, reliance: assistanceLevelVal, trust: trustVal, conf: confVal, perform: rec_score_comp, autoAgree: autoAgreeVal }
    })
}

//set alpha value from html selection
function set_alpha(level) {
    alpha_k = parseFloat(level);
    theta_k = theta_list[trial_it];
}

//save final values
function save_final() {
	max_dist = Math.max.apply(Math, obs_dist);
    if (trial_it == 0) {
        rec_score = parseFloat(score);
        rec_time = parseFloat((time_count / 100)).toPrecision(3);
        rec_collide = parseFloat(collide_counter);

        document.getElementById("practice_time").innerHTML = parseFloat((time_count / 100)).toPrecision(3);
        document.getElementById("practice_collision").innerHTML = parseFloat(collide_counter);
        document.getElementById("practice_number").innerHTML = parseFloat(trial_it);
        document.getElementById("practice_dist").innerHTML = parseFloat(max_dist).toPrecision(4);
    } else {     
        rec_score_past = rec_score;
        rec_score = parseFloat(score);
        rec_time = parseFloat((time_count / 100)).toPrecision(4);
        rec_collide = parseFloat(collide_counter);
        rec_max_dist = parseFloat(max_dist).toPrecision(4);
        current_game = trial_it;

        if (rec_score < rec_score_past) {
            rec_score_comp = 0;
        } else {
            rec_score_comp = 1;
        }

        document.getElementById("game_time").innerHTML = rec_time;
        document.getElementById("game_collision").innerHTML = rec_collide;
        document.getElementById("game_dist").innerHTML = rec_max_dist;
        document.getElementById("game_number").innerHTML = current_game;

        document.getElementById("prev1_game_time").innerHTML = prev1_rec_time;
        document.getElementById("prev1_game_collision").innerHTML = prev1_rec_collide;
        document.getElementById("prev1_game_dist").innerHTML = prev1_rec_max_dist;
        document.getElementById("prev1_game_number").innerHTML = prev1_game;

        document.getElementById("prev2_game_time").innerHTML = prev2_rec_time;
        document.getElementById("prev2_game_collision").innerHTML = prev2_rec_collide;
        document.getElementById("prev2_game_dist").innerHTML = prev2_rec_max_dist;
        document.getElementById("prev2_game_number").innerHTML = prev2_game;

        document.getElementById("prev3_game_time").innerHTML = prev3_rec_time;
        document.getElementById("prev3_game_collision").innerHTML = prev3_rec_collide;
        document.getElementById("prev3_game_dist").innerHTML = prev3_rec_max_dist;
        document.getElementById("prev3_game_number").innerHTML = prev3_game;
        
        if(trial_it == 1){
            prev1_rec_collide = collide_counter;
            prev1_rec_time =  rec_time;
            prev1_rec_max_dist = rec_max_dist;
            prev1_game = current_game;
        } else if(trial_it == 2){
            prev2_rec_collide = prev1_rec_collide;
            prev2_rec_time = prev1_rec_time
            prev2_rec_max_dist = prev1_rec_max_dist;
            prev2_game = prev1_game;

            prev1_rec_collide = collide_counter;
            prev1_rec_time =  rec_time;
            prev1_rec_max_dist = rec_max_dist;
            prev1_game = current_game;
        } else {
            prev3_rec_collide = prev2_rec_collide;
            prev3_rec_time = prev2_rec_time  
            prev3_rec_max_dist = prev2_rec_max_dist;
            prev3_game = prev2_game;

            prev2_rec_collide = prev1_rec_collide;
            prev2_rec_time = prev1_rec_time;
            prev2_rec_max_dist = prev1_rec_max_dist;
            prev2_game = prev1_game;

            prev1_rec_collide = collide_counter;
            prev1_rec_time =  rec_time;
            prev1_rec_max_dist = rec_max_dist;
            prev1_game = current_game;
        }

    }


    //Resetting forms for trust, conf, and assistance levels
    if (trial_it == 1) {
        document.getElementById("game1assistance_form").reset();
    } else if (trial_it > 1) {
        document.getElementById("gameassistance_form").reset();
    }

}

