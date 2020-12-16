import Line from './Line.js';
import Dot from './Dot.js';

export default class Canvas{
    /**
     * @param id {string}
     * @param lines {[]}
     */
    constructor(id, lines = [] ) {
        this.lines = lines;
        this.canvasElement = document.getElementById(id);
        this.canvasContext = this.canvasElement.getContext("2d");

        this.timer=0;



        setInterval(()=>{
            this.timer+=0.01;
            this.render();
        },1000/60);

    }

    drawLine(line){
        this.canvasContext.strokeStyle=line.color;
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(line.dot1.x+0.5, line.dot1.y+0.5);
        this.canvasContext.lineTo(line.dot2.x+0.5, line.dot2.y+0.5);
        this.canvasContext.stroke();
    }

    /**
     * Lines generator
     * @param count {number}
     */
    generateLines(count){
        for (let i = 0; i < count; i++) {
            let randomLine = Line.getRandomInstance();
            console.log(randomLine)

            if( i === 1 ){
                // randomLine.checkIntersect( this.lines[0] )
            }

            this.lines.push( randomLine );
        }
    }

    reset(){
        this.canvasContext.clearRect(0,0, this.canvasElement.width, this.canvasElement.height);
    }

    render(){
        this.canvasContext.lineWidth=1
        this.reset();


        let line = new Line(new Dot(10,10), new Dot(10,500));
        line.color='black';
        this.drawLine(line);

        for (const line of this.lines) {
            this.drawLine(line);
        }


        for(let i=0; i<this.lines.length; i++){
            for(let j=i; j<this.lines.length; j++){
                const {x,y} = this.lines[i].getIntersectPoint(this.lines[j]);
                if(isNaN(x) || isNaN(y)){
                    continue;
                }

                this.canvasContext.beginPath();
                this.canvasContext.strokeStyle='brown';
                this.canvasContext.arc(x,y, 3, 0, Math.PI*2);
                this.canvasContext.stroke();


                // console.log(intersectPoint);
            }
        }



        this.canvasContext.lineWidth=5
        this.canvasContext.beginPath();
        this.canvasContext.strokeStyle='red';
        this.canvasContext.arc(150,150, 100, Math.sin(this.timer)*(1+Math.cos(this.timer)), Math.cos(this.timer)*2);
        this.canvasContext.stroke();

        this.canvasContext.beginPath();
        this.canvasContext.strokeStyle='blue';
        this.canvasContext.arc(150,150, 100, Math.cos(this.timer)*2, Math.sin(this.timer)*(1+Math.cos(this.timer)));
        this.canvasContext.stroke();

    }
}