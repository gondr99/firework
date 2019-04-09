class Particle {
    constructor(){
        this.pos;
        this.speed;
        this.dir;
        this.color;
        this.lifeCount;
        this.dest;
        this.active = false;
    }

    reset(x, y, speed, dx, dy, color, lifeCount, dest= {x:0, y:0}){
        this.pos = [{x:x, y:y}, {x:x, y:y}, {x:x, y:y}, {x:x, y:y}, {x:x, y:y},{x:x, y:y},{x:x, y:y},{x:x, y:y}];
        this.speed = speed;
        this.dir = {dx:dx, dy:dy};
        this.color = color;
        this.lifeCount = lifeCount;
        this.dest = dest;
        this.active = true;
    }

    update(delta){
        if(!this.active) return;

        for(let i = this.pos.length - 1; i > 0; i--){
            this.pos[i].x = this.pos[i-1].x;
            this.pos[i].y = this.pos[i-1].y;
        }
        this.pos[0].x += this.dir.dx * delta * this.speed;
        this.pos[0].y += this.dir.dy * delta * this.speed;
    }

    getPosition(){
        return {x:this.pos[0].x, y:this.pos[0].y};
    }

    getDistance(){
        return Math.sqrt(Math.pow(this.pos[0].x - this.dest.x, 2) + Math.pow(this.pos[0].y - this.dest.y, 2));
    }

    render(ctx) {
        if(!this.active) return;
        ctx.save();
        ctx.fillStyle = this.color;
        for(let i = 0; i < this.pos.length; i++){
            ctx.beginPath();
            ctx.arc(this.pos[i].x, this.pos[i].y, 2-i/10, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();
    }
}