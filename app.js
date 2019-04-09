class App {
    constructor(el){
        this.canvas = document.querySelector(el);
        this.resize(); //한번 실행해서 캔버스 사이즈 잡아주고
        this.ctx = this.canvas.getContext("2d");
        this.prevTime = Date.now();

        this.particleList = [];

        window.addEventListener("resize", ()=>{
            this.resize();
        });

        window.requestAnimationFrame(()=>{
            this.frame();
        });

        this.canvas.addEventListener("click", (e)=>{
            this.getOrCreateParticle(250, {x:e.offsetX, y:e.offsetY});
        });
    }

    resize(){
        let rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    frame(){
        this.update();
        this.render(this.ctx);

        window.requestAnimationFrame(()=>{
            this.frame();
        });
    }

    getOrCreateParticle(speed, dest, pos=null){
        let particle = this.particleList.find(x => !x.active );
        if(particle === undefined){
            particle = new Particle();
            this.particleList.push(particle);
        }
        let x,y;
        if(pos == null){
            x = Math.random() * this.canvas.width;
            y = this.canvas.height;
        }else{
            x = pos.x;
            y = pos.y;
        }
        
        let d = Math.sqrt(Math.pow(dest.x - x, 2) + Math.pow(dest.y - y, 2));
        let dx = (dest.x - x) / d;
        let dy = (dest.y - y) / d;
        let color = this.getRandomColor(0.9);

        if(pos == null){
            particle.reset(x, y, speed, dx, dy, color, 1, dest);
        }else{
            particle.reset(x, y, speed, dx, dy, color, 0, dest);
        }
        
    }

    getRandomColor(alpha){
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;

    }

    update(){
        let now = Date.now();
        let delta = (now - this.prevTime) / 1000;

        this.prevTime  = now;

        for(let i = 0; i < this.particleList.length; i++){
            this.particleList[i].update(delta);

            if(this.particleList[i].getDistance() < 20 && this.particleList[i].lifeCount > 0){
                this.particleList[i].active = false;
                for(let j = 0; j < 30; j++){
                    let pos = this.particleList[i].getPosition();
                    let dx = Math.random() * 200 - 100;
                    let dy = Math.random() * 200 - 100;
                    this.getOrCreateParticle(200, {x:pos.x + dx, y: pos.y + dy} ,pos);
                }
            }else if(this.particleList[i].getDistance() < 20){
                this.particleList[i].active = false;
            }
        }
    }

    render(ctx){
        ctx.fillStyle = "#000";
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for(let i = 0; i < this.particleList.length; i++){
            this.particleList[i].render(ctx);
        }
    }

}
