// we start by initializing Phaser
// Parameters: width of the game, height of the game, how to render the game, 
// The HTML div that will contain the game

var game = new Phaser.Game(500,600,Phaser.AUTO,'game_div');

// And now we define our first and only state, I'll call it 'main'.
// A state is a specific scene of a game like a menu, a game over screen, etc.

var main_state = {

	preload: function(){
		        // Everything in this function will be executed at the beginning. 
		        // That’s where we usually load the game’s assets (images, sounds, etc.)
				
				// change the background color of the game
				this.game.stage.backgroundColor = '#CDBA96';
          
                //load the bird sprite
                this.game.load.image('bird','assets/bird_ot.png');

                //load the pipe sprite
                this.game.load.image('pipe','assets/pipe_ot.png');
                
                this.game.load.audio('jump','assets/jump.wav');

	},

	create: function(){
		 // This function will be called after the preload function. 
		 // Here we set up the game, display sprites, add labels, etc.

		 // display the bird on the screen
		 this.bird = this.game.add.sprite(100,245,'bird');

		 // add gravity to the bird to make it fall
		 this.bird.body.gravity.y = 1000;

		 // call the 'jump' function when the spacekey is hit
		 var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		 space_key.onDown.add(this.jump,this);

		 // create a number of pipes
		 this.pipes = game.add.group();
		 this.pipes.createMultiple(20,'pipe');
		 this.timer = this.game.time.events.loop(1500,this.add_row_of_pipes,this);

		 this.score = 0;
		 var style = { font: "50px Arial", fill: "#404040"};
		 this.label_score = this.game.add.text(20,20,"0",style);

		 this.bird.anchor.setTo(-0.2, 0.5); 

		 this.jump_sound = this.game.add.audio('jump');
	},

	update: function(){
		   // This is where we will spend the most of our time. 
		   // This function is called 60 times per second to update the game.

		   // If the bird is out of the world (too high or too low), 
		   // call the 'restart_game' function
		   if(this.bird.inWorld == false){
		   	this.restart_game();
		   }
		   this.game.physics.overlap(this.bird,this.pipes,this.hit_pipe,null,this);
		   
		   if(this.bird.angle < 20){
		   	this.bird.angle += 1;
		   }
	},
	jump: function(){
        if(this.bird.alive == false){
        	return;
        }

		// add a vertical velocity to the bird
		this.bird.body.velocity.y = -350;

		var animation = this.game.add.tween(this.bird);
		animation.to({angle:-20},100);
		animation.start();

		this.jump_sound.play();

	},

	restart_game: function(){
		// start the 'main' state, which restarts the game
		this.game.state.start('main');
		this.game.time.events.remove(this.timer);
	},

	add_one_pipe: function(x,y){
		// get the first dead pipe of our group
		var pipe = this.pipes.getFirstDead();

		// set the new position of the pipe
		pipe.reset(x,y);

		// add velocity to the pipt to make it move left
		pipe.body.velocity.x = -200;

		// kill the pipe when it's no longer visible
		pipe.outOfBoundsKill = true;


	},

	add_row_of_pipes: function(){
		var hole = Math.floor(Math.random()*5)+1;

		for (var i = 0; i < 8; i++){
			if (i!= hole && i!=hole+1)
			{
				this.add_one_pipe(400,i*60+10);
			}
		}
	    this.score += 1;
		this.label_score.content = this.score;
	},

	hit_pipe: function(){
		// set the alive property of the bird to false
		this.bird.alive = false;

		this.game.time.events.remove(this.timer);

		this.pipes.forEachAlive(function(p){
			p.body.velocity.x = 0;
		},this);
	}
}

// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', main_state);  
game.state.start('main'); 