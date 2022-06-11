class BallManager {
    constructor(ballArray){
        this.ballArray = ballArray;
    }
    update(){
        this.ballArray.foreach(ballUpdate());
    }
}