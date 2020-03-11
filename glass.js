var Sframe=document.getElementById('Sframe');
var Rframe=document.getElementById('Rframe');
var sendProfileData=false;
var ProfileX,ProfileY,ProfileSID;
var send=function(url){
	Sframe.src=url;
    return Sframe.contentDocument.getElementById('output');
};
send('https://gemgames.github.io/');
var sketchProc = function(processingInstance) {
with (processingInstance){
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
size(400, 400); frameRate(60);
//gp vars
var i,j,
    k=[0,0,0,0,0,0,0,0,0,0,0],
    s=0,
    x=0,y=0,
    stk=0,stkt=0,
    stkb=0,
    stkc=0;
//keypad vars
var keymap=[38,37,40,39,87,65,83,68,49,50,51,52,32,10,81,69];

//html
var html=true;

//functions
var SIN           =function(x){
    if(html){
        return sin(radians(x));
    }else{
        return sin(x);
    }
};
var COS           =function(x){
	if(html){
    	return cos(radians(x));
    }else{
    	return cos(x);
    }
};
var r             =function(x){return Math.floor(Math.random()*360);};
var square        =function(x,y,s,angle){
    var X=function(p){return x+SIN(angle+p)*s;};
    var Y=function(p){return y+COS(angle+p)*s;};
    quad(X(45),Y(45),X(135),Y(135),X(225),Y(225),X(315),Y(315));
};
var polygon       =function(x,y,s,p,angle){
    var X=function(P){return x+SIN(angle+P)*s/2;};
    var Y=function(P){return y+COS(angle+P)*s/2;};
    beginShape();
    for(i=0;i<p;i++){vertex(X(i*(360/p)),Y(i*(360/p)));}
    endShape(CLOSE);
};
var spaceGrid     =function(){
    for(i=0;i<9;i++){
        for(j=0;j<9;j++){
            line(((i-4)*48)+200,((j-4)*48)+200,(i*50),(j*50));
        }
    }
};
var grid          =function(){
    for(i=0;i<12;i++){
        line(i*50+cos(stkc*2)*30-stkb,0-stkb,50+i*50-stkb,600-stkb);
        //cos(stkc*2)*30
    }
    for(i=0;i<12;i++){
        line(0-stkb,i*50+sin(stkc*2)*30-stkb,600-stkb,50+i*50-stkb);
        //sin(stkc*2)*30
    }
};
var angTriangle   =function(x,y,s,a,b,c){
        var aTX=function(P){return x+SIN(P)*s/2;};
        var aTY=function(P){return y+COS(P)*s/2;};
        var A=[a,b,c];
        beginShape();
        for(j=0;j<3;j++){vertex(aTX(A[j]),aTY(A[j]));}
        endShape(CLOSE);
    };
var glassCircle   =function(gCx,gCy,gCs,TK,angle,gcP){
    var Ax=[],Ay=[];
    var gX=function(S,P){return gCx+SIN(angle+P)*S/2;};
    var gY=function(S,P){return gCy+COS(angle+P)*S/2;};
    fill(225,225,225,200);stroke(225,225,225,220);
    if(TK<2){polygon(gCx,gCy,gCs,12,0);angTriangle(200,200,gCs*0.3,r(360),r(360),r(360));}
    if(TK===1){stroke(0,0,0);line(gCx,gCy,gCx,gCy);}
    if(TK>1){
        for(i=0;i<gcP;i++){
            Ax=gX(gCs*TK/8,i*(360/gcP));Ay=gY(gCs*TK/8,i*(360/gcP));
            fill(225,225,225,200-SIN(TK*3)*200);stroke(225,225,225,220-SIN(TK*3)*220);
            angTriangle(Ax,Ay,gCs*0.4,Math.floor(Math.random()*360),Math.floor(Math.random()*360),Math.floor(Math.random()*360));
        }
    }
};
//keypress/release
keyPressed        =function(){
    if(keyCode===keymap[14]){k[4]=1;}
    if(keyCode===keymap[15]){k[5]=1;}
    if(keyCode===keymap[12]||keyCode===keymap[13]){k[10]=1;}
    for(i=0;i<4;i++){
        if(keyCode===keymap[i]||keyCode===keymap[i+4]){k[i]=1;}
        if(keyCode===keymap[i+8]){k[i+6]=1;}
    }
};
keyReleased       =function(){
    if(keyCode===keymap[14]){k[4]=0;}
    if(keyCode===keymap[15]){k[5]=0;}
    if(keyCode===keymap[12]||keyCode===keymap[13]){k[10]=0;}
    for(i=0;i<4;i++){
        if(keyCode===keymap[i]||keyCode===keymap[i+4]){k[i]=0;}
        if(keyCode===keymap[i+8]){k[i+6]=0;}
    }
};
//setup
ProfileSID=r(360);
//draw
draw = function(){
    if(s===0){
        background(0,0,0);
        stroke(255, 255, 255);strokeWeight(10);
        line(250-stkt*100,0,           150+stkt*50, stkt*200);
        line(150+stkt*100,400,         250-stkt*50, 400-stkt*200);
        line(0,           150+stkt*100,stkt*200,    250-stkt*50);
        line(400,         250-stkt*100,400-stkt*200,150+stkt*50);
        //circle
        fill(225,225,225,200);stroke(225,225,225,220);
        ellipse(200,200,100,100);
        fill(0,0,0);noStroke();
        polygon(200,200,50,3,90);
        //text
        fill(255,255,255,sin(stk*3)*255);
        textSize(25);
        text("Press Enter",139,360);
        //tk
        if(stk<30){stk++;stkt=SIN(stk*3);}
        fill(255, 0, 0);
        text(k,20,20);
    }
    if(s===0&&k[10]){stk=0;s=1;}
    if(s===1){
    	//server
        sendProfileData=true;
        background(255, 0, 255);
        //transitions
        fill(0,0,0);stroke(255, 255, 255);
        square(-54, 47,  297-stkt*250, 14+stkt*90);
        square(47,  455, 297-stkt*250, 14+stkt*90);
        square(352, -55, 297-stkt*250, 14+stkt*90);
        square(455, 353, 297-stkt*250, 14+stkt*90);
        glassCircle(200,200,stkt*150,stk,3,30);
        //tk
        if(stk<30){stk++;stkt=SIN(stk*3);}
        fill(255,0,0);
        if(k[0]){y-=2;}
        if(k[1]){x-=2;}
        if(k[2]){y+=2;}
        if(k[3]){x+=2;}
        ellipse(200+x,200+y,20,20);
        ProfileX=x;
        ProfileY=y;
    }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}};
var canvas = document.getElementById("canvas");
var processingInstance = new Processing(canvas, sketchProc);
//if(sendProfileData){
	//send('https://gemgames.github.io/profileData.html?x='+ProfileX+'&y='+ProfileY+'&id='ProfileID);
//}
