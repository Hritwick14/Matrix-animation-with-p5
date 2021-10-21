let minrc = 30
let columns, rows, fontSize

let symbols = []
let streams = []

function setup()
{
    createCanvas(windowWidth,windowHeight)
    background('black')
    //frameRate(1)
    
    if(windowWidth<=windowHeight)
    {
        columns = minrc
        rows = round(minrc / windowWidth * windowHeight)
    }
    else
    {
        rows = minrc
        columns = round(minrc / windowHeight * windowWidth)
    }
    
    fontSize = round(windowHeight / rows)
    textSize(fontSize)
    
    for(let i=0;i<rows;i++)
    {
        symbols[i] = []
        for(let j=0;j<columns;j++)
        {
            symbols[i][j] = new Symbols(round(width/columns*j), round(height/rows*i))
        }
    }
    
    let msg ="HELLO WORLD"
    let tr = Math.floor(rows/2)
    let tc = Math.floor(columns/2) - Math.floor(msg.length/2)
    for(let i=0;i<msg.length;i++)
    {
        symbols[tr][tc+i].changefreq = 0
        symbols[tr][tc+i].ch = msg[i]
        symbols[tr][tc+i].col = color(0,255,0)
    }
    
    for(let i=0;i<columns;i++)
    {
        streams[i] = new Streams(i, round(random(0,rows)), round(random(20,30)))
    }
}
function draw()
{
    background(0)
    
    for(let i=0;i<streams.length;i++)
    {
        streams[i].show()
    }
    
    for(let i=0;i<rows;i++)
    {
        for(let j=0;j<columns;j++)
        {
            symbols[i][j].show()
        }
    }
    
    for(let i=0;i<streams.length;i++)
    {
        streams[i].incr()
    }
}
class Symbols
{
    constructor(x,y)
    {
        this.x = x
        this.y = y
        this.ch = String.fromCharCode(0x30A0 + round(random(0,96)))
        this.changefreq = round(random(0,20))
        this.counter = 0
        this.visible = false
        this.hd = false
        this.col = color("green")
    }
    
    show()
    {
        if(this.visible)
        {
            if(this.hd)
            {
                fill(120,200,120)
            }
            else
            {
                fill(this.col)
            }
            text(this.ch,this.x,this.y)
        }
        
        if(this.changefreq != 0)
        {
            if(this.counter == this.changefreq)
            {
                this.ch = String.fromCharCode(0x30A0 + round(random(0,96)))
                this.counter = 0
            }
            this.counter += 1
        }
    }
    toggle(val)
    {
        this.visible = val
    }
    head(val)
    {
        this.hd = val
    }
}

class Streams
{
    constructor(y,h,l)
    {
        this.y = y
        this.phead = h
        this.len = l
        this.speed = round(random(1,3))
        this.counter = 0
    }
    show()
    {
        for(let i=this.phead;i>=this.phead-this.len;i--)
        {
            if((i>=0)&&(i<rows))
            {
                symbols[i][this.y].toggle(true)
                if(i==this.phead)
                {
                    symbols[i][this.y].head(true)
                }
                else
                {
                    symbols[i][this.y].head(false)
                }
            }
        }
    }
    incr()
    {
        if(this.phead-this.len>=0)
        {
            symbols[this.phead-this.len][this.y].toggle(false)
        }
        
        if(this.phead-this.len==rows-1)
        {
            this.phead=0
        }
        
        if(this.counter == this.speed)
        {
            this.phead += 1
            this.counter = 0
        }
        this.counter += 1
    }
}
