var hierarchical = {};

hierarchical.world = new ro.World( 'ro-canvas', {

	 debug: true

     ,movers: []
     ,baseRadius: 0
     ,ringCount: 1

    // called at the end of ro.World constructor
    ,init: function(){
    
        var self = this
            ,baseWidth = 10
            ,baseHeight = 10;

		this.broadPhase = new ro.coltech.HierarchicalSpatialHashGrid();

        this.baseRadius = this.screen.size.y / 2 * 1/6; // 1/6th of half of the height
        this.createRingOfEntities( 15, this.baseRadius, baseWidth, baseHeight );

		self.ringCount += 1;
		self.createRingOfEntities( 
			Math.floor(15 * self.ringCount * 0.65)
			,self.baseRadius * self.ringCount
			,baseWidth
			,baseHeight
		);

		self.ringCount += 1;
		self.createRingOfEntities( 
			Math.floor(15 * self.ringCount * 0.65)
			,self.baseRadius * self.ringCount
			,baseWidth * 10
			,baseHeight * 10
		);

		self.ringCount += 1;
		self.createRingOfEntities( 
			Math.floor(15 * self.ringCount * 0.65)
			,self.baseRadius * self.ringCount
			,baseWidth * 100
			,baseHeight * 100
		);

		self.ringCount += 1;
		self.createRingOfEntities( 
			Math.floor(15 * self.ringCount * 0.65)
			,self.baseRadius * self.ringCount
			,baseWidth * 1000
			,baseHeight * 1000
		);

		self.ringCount += 1;
		self.createRingOfEntities( 
			Math.floor(15 * self.ringCount * 0.65)
			,self.baseRadius * self.ringCount
			,baseWidth
			,baseHeight
		);

		self.ringCount += 1;
		self.createRingOfEntities( 
			Math.floor(15 * self.ringCount * 0.65)
			,self.baseRadius * self.ringCount
			,baseWidth
			,baseHeight
		);

		self.ringCount += 1;
		self.createRingOfEntities( 
			Math.floor(150 * self.ringCount * 0.65)
			,self.baseRadius * self.ringCount
			,baseWidth * 1000
			,baseHeight * 1000
		);
	}

    // called at each update step
    ,update: function(){

        var mover, offsetX, offsetY;

        // move all of the moving boxes around the circle
        for(i = 0; i < this.movers.length; i++){

            mover = this.movers[i];

            offsetX = this.screen.size.x/2 - mover.size.x/2;
            offsetY = this.screen.size.y/2 - mover.size.y/2;

            mover.period += 0.02;
            mover.pos.x = Math.cos( mover.period ) * mover.radius + offsetX;
            mover.pos.y = Math.sin( mover.period ) * mover.radius + offsetY;
        }
    }
    
    // called automatically by ro
    ,handleCollisions: function(dt, collisionList){
    	
    	var i, pair, objA, objB;

    	for(i = 0; i < collisionList.length; i++){
    		pair = collisionList[i];
    		objA = pair[0];
    		objB = pair[1];

    		objA.draw( dt, ro.colors.kred05 );
    		objB.draw( dt, ro.colors.kred05 );
    	}
    }

    ,createRingOfEntities: function( count, radius, width, height  ){

        var  offsetX = this.screen.size.x/2 - width/2
            ,offsetY = this.screen.size.y/2 - height/2
            ,i
            ,box
            ,angle;
        
        var movingBox = new ro.Entity( offsetX, offsetY, width, height );
        movingBox.period = 0;
        movingBox.radius = radius;
        this.addEntity( movingBox );

        this.movers.push( movingBox );

        for(i = 0; i < count; i++){
            // compute angle to evenly space out boxes
            angle = (i/count) * Math.PI*2;
            box = new ro.Entity(
                 Math.cos(angle) * radius + offsetX
                ,Math.sin(angle) * radius + offsetY
                ,width, height );
            this.addEntity( box );
        }
    }
});
