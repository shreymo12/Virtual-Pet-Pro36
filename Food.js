class Food{
    constructor(){
        this.image = loadImage("Images2/Food Stock");
        this.foodStock=0;
        this.lastFed;
    }
    updateFoodStock(foodStock){
        this.foodStock=foodStock;
       }
      
       getFedTime(lastFed){
         this.lastFed=lastFed;
       }
      
       deductFood(){
         if(this.foodStock>0){
          this.foodStock=this.foodStock-1;
         }
        }
      
        getFoodStock(){
          return this.foodStock;
        }
    display(){
        backgorund(0);

        fill(255,255,254);
      textSize(15);
      if(lastFed>=12){
          text("Last Feed : "+ lastFed%12 + " PM", 50,30);
      }else if(lastFed==0){
          text("Last Feed : 12 AM",50,30);
      }else{
          text("Last Feed : "+ lastFed + " AM", 50,30);
      }
      var x=70,y=100; 
      imageMode(CENTER);
      if(this.foodStock!=0){
      for(var i=0;i<this.foodStock;i++){
        if(i%10==0){
          x=70;
          y=y+50;
        }
        image(this.image,x,y,50,50);
        x=x+50;
            }
        }
    }
    bedroom(){
        backgorund(bedroomImg, 550, 500);
    }
    garden(){
        backgorund(gardenImg, 550, 500);
    }
    washroom(){
        backgrounf(washroomImg, 550, 500)
    }
}