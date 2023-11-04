var h1=document.getElementById("h1")
var h2=document.getElementById("h2")
var h3=document.getElementById("h3")
var h4=document.getElementById("h4")
var h5=document.getElementById("h5")
var leaf=document.getElementById("leaf")
var plant=document.getElementById("plant")
var tree=document.getElementById("tree")
var down=document.getElementById("down")
var dino=document.getElementById("dino")
var imgCont=document.getElementById("imgCont")
var obstacle=document.getElementById("obstacle")
var goaltext=document.getElementById("goal")
var start=document.getElementById("startB")
var obstacle_img=document.getElementById("obstacle_img")


const ran=20//the error (px)

var g=9.8
var time_s=0
var goal=0


const interval=50
const obstacle_left_0=1700
// const obstacle_height_0=50
var obstacle_left=obstacle_left_0

const addPx_per=2//is useless now because movePx_per is random
const movePx_per_0=20
var movePx_per=movePx_per_0

const dino_top_0=340
const imgCont_top_0=300
const dino_left=700
const dino_width=100
const dino_left_center=dino_left+(dino_width/2)
var vUp_ms=10//speed when jump

var state=0//0 is on the ground 1 is flying

var fly_id//define here because it is global so that function can see it
var obstacle_id//define here because it is global so that function can see it



//start
start.onclick=function()
{
    console.log("start")
    //初始化参数
    time_s=0
    obstacle_left=obstacle_left_0
    movePx_per=movePx_per_0
    state=0
    goal=0
    per=0
    //初始化dino位置
    imgCont.style.top=imgCont_top_0//here has a bug,I don't know why
    imgCont_top=imgCont_top_0
    //初始化得分为0
    goaltext.innerHTML=goal
    //初始化obstacle图片路径
    obstacle_img.src="obstacle.png"
    //关闭定时器
    clearInterval(fly_id)
    clearInterval(obstacle_id)
    //obstacle's move
    obstacle_id=setInterval(move,interval)
}



//差速图层效果
window.addEventListener('scroll',()=>
{
    let value=window.scrollY

    leaf.style.top=value*0.3+"px"
    h1.style.top=value*0.2+"px"
    h2.style.top=value*0.1+"px"
    h3.style.top=value*-0.1+"px"
    h4.style.top=value*-0.3+"px"
    h5.style.top=value*-0.5+"px"
    
    tree.style.top=value*-0.6+"px"
    down.style.top=value*-0.6+"px"
    plant.style.top=value*-0.6+"px"
  
    dino.style.top=dino_top_0+value*-0.6+"px"
    obstacle.style.top=695+value*-0.6+"px"

})


//a function - obstacle's move
function move()
{
    if(obstacle_left<-50)
    {obstacle_left=obstacle_left_0
    movePx_per=10+Math.random()*10//random 10 to 20
    obstacle_img.src="obstacle.png"
    }
    obstacle_left=obstacle_left-movePx_per
    obstacle.style.left=obstacle_left+"px"
    //判断是否撞到
    if((obstacle_left-dino_left_center)<ran&&2<(obstacle_left-dino_left_center)&&state==0)//here has a bug,a conflict,so I change 0< to 2<
    {
        console.log("dead")
        gameover()
    }
}




//jump
window.onkeydown=function(event)
{
    console.log("window.onkeydown")
    
    event.preventDefault();
    if(state==0)
    {
        switch(event.keyCode)//不同数字对应不同vUp_ms
        {
            case 49:
                state=1
                vUp_ms=5
                console.log("vUp_ms="+vUp_ms)
                fly_id=setInterval(fly,interval)
                break
            case 50:
                state=1
                vUp_ms=6
                console.log("vUp_ms="+vUp_ms)
                fly_id=setInterval(fly,interval)
                break
            case 51:
                state=1
                vUp_ms=7
                console.log("vUp_ms="+vUp_ms)
                fly_id=setInterval(fly,interval)
                break
            case 52:
                state=1
                vUp_ms=8
                console.log("vUp_ms="+vUp_ms)
                fly_id=setInterval(fly,interval)
                break
            case 53:
                state=1
                vUp_ms=9
                console.log("vUp_ms="+vUp_ms)
                fly_id=setInterval(fly,interval)
                break
        }
    }


    ///////////////////////////////////这是以前用空格键的旧代码
    // if(event.keyCode==32)
    // {
    //     console.log("if(event.keyCode==32)")
    //     if(state==0)
    //     {
    //         state=1
    //         vUp_ms=per/2
    //         if(vUp_ms>=10){vUp_ms=10}
    //         console.log("vUp_ms="+vUp_ms)
    //         fly_id=setInterval(fly,interval)
    //     }
    // }
}
function fly()
{
    console.log("function fly()")

    time_s=time_s+interval*0.001//time accumulate

    var x_m=vUp_ms*time_s-((1/2)*g*time_s*time_s)//count the x  According to the formula: x=v0t-1/2gt^2
    // console.log(x_m)
    
    var imgCont_top=imgCont_top_0-x_m*33//count the top

    imgCont.style.top=imgCont_top+"px"//draw


    if(imgCont_top>=imgCont_top_0)//when land
    {
        console.log("if(dino_top<=dino_top_0)")
        state=0
        time_s=0
        imgCont_top=imgCont_top_0
        imgCont.style.top=imgCont_top_0
        clearInterval(fly_id)
        //落地时判断是否踩到
        if((obstacle_left-dino_left_center)<ran&&(-ran)<(obstacle_left-dino_left_center))
        {
            ifhit()
        }
    }
}




function gameover()
{
    //关闭定时器
    clearInterval(fly_id)
    clearInterval(obstacle_id)
}


function ifhit()
{
    console.log("hit!!!!")
    goal=goal+(vUp_ms-4)//加上对应按键数字值
    goaltext.innerHTML=goal

    obstacle_img.src="obstacle_dead.png"
}