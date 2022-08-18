var modal = document.getElementById("mymodal");
var span = document.getElementsByClassName("close");
span[0].onclick = function() {
	document.getElementById("rul0").style.display = "none";
	document.getElementById("rul2").style.display="block";
}
/*window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
		document.getElementById("rul2").style.display="block";
	}
}*/
var btn=document.getElementById("next1");
var rul0=document.getElementById("rul0");
var rul1=document.getElementById("rul1");
btn.onclick= function(){
	rul0.style.display="none";
	rul1.style.display="block";
	span[1].onclick = function() {
		rul1.style.display="none";
		document.getElementById("rul2").style.display="block";
	}
}
var btn1=document.getElementById("next2");
var rul2=document.getElementById("rul2");
btn1.onclick=function(){
	rul1.style.display="none";
	rul2.style.display="block";
}
var btn2=document.getElementById("prev1");
btn2.onclick=function(){
	rul1.style.display="none";
	rul0.style.display="block";
}
var btn3=document.getElementById("prev2");
btn3.onclick=function(){
	rul2.style.display="none";
	rul1.style.display="block";
}
var btn4=document.getElementById("prev3");
var rul3=document.getElementById("rul3");
btn4.onclick=function(){
	rul3.style.display="none";
	rul2.style.display="block";
	clr();
}
var btn5=document.getElementById("diff1");
btn5.onclick=function(){
	modal.style.display="block";
	rul2.style.display="block";
	clr();
}
span[2].onclick=function(){
	modal.style.display="none";
}
var f_btn=document.getElementById("gen_sud");
f_btn.onclick=function(){
	modal.style.display="none";
	st();
	return make_sud();
}
var ID=0;
var h=0;
var m=0;
var s=0;	
function timer1(){
	s++;
	if(s==60){
		m++;
		s=0;
	}
	if(m==60){
		h++;
		m=0;
	}
	document.getElementById("tim1").innerHTML=(h<10 ? "0":"")+h+":"+(m<10 ? "0":"")+m+":"+(s<10 ? "0":"")+s;
}
function st(){
	ID=window.setInterval(timer1,1000);
}

var globalSudoku;
var g_sud1;

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
	output.innerHTML = this.value;
}

function shuffle(array) {
	array.sort(() => Math.random() - 0.5);
}

function toOneD(row,col){
	return 9*row+col;
}

function toTwoD(idx){
	var row;
	var col;
	row=Math.floor(idx/9);
	col=idx%9;
	var coordinates=[row,col];
	return coordinates;
}

function initialize(){
	var newSudoku=new Array(9);
	globalSudoku=new Array(9);
	for(var i=0;i<9;i++){
		newSudoku[i]=new Array(9);
		globalSudoku[i]=new Array(9);
		for(var j=0;j<9;j++){
			newSudoku[i][j]=0;
		}
	}
	return newSudoku;
}

function search(avail,target){
	var x=avail.length;
	var start=0;
	var end=x-1;
	while(start<=end){
		var mid = Math.floor((start+end)/2);
		if(avail[mid]==target){
			return mid;
		}
		else if(avail[mid]>target){
			end=mid-1;
		}
		else{
			start=mid+1;
		}
	}
	return -1;
}

function getavail(row,col,sud,avail){
	for(var i=0;i<9;i++){
		if(i!=row){
			var t=search(avail,sud[i][col]);
			if(t!=-1){
				avail.splice(t,1);
			}
		}
	}
	for(var i=0;i<9;i++){
		if(i!=col){
			var t=search(avail,sud[row][i]);
			if(t!=-1){
				avail.splice(t,1);
			}
		}
	}
	var row_x=3*Math.floor(row/3);
	var row_y=3*Math.floor(col/3);
	for(var i=row_x;i<row_x+3;i++){
		for(var j=row_y;j<row_y+3;j++){
			if(!(i==row&&j==col)){
				var t=search(avail,sud[i][j]);
				if(t!=-1){
					avail.splice(t,1);
				}
			}
		}
	}
}

function helper(row,col,sud){
	if(row==9) return true;
	if(col==9) return helper(row+1,0,sud);
	var avail=[1,2,3,4,5,6,7,8,9];
	getavail(row,col,sud,avail);
	shuffle(avail);
	var x=avail.length;
	for(var y=0;y<x;y++){
		sud[row][col]=avail[y];
		if(helper(row,col+1,sud)==true){
			return true;
		}
	}
	return false;
}

function sampleSudoku(k,sudokuTemp){
	var reservoir=new Array(k);
	var temp=new Array(81);
	for(var i=0;i<81;i++){
		temp[i]=i;
	}
	for(var i=0;i<k;i++){
		reservoir[i]=temp[i];
	}
	for(var i=k;i<81;i++){
		var j=Math.floor(i*Math.random());
		if(j<=k){
			reservoir[j]=temp[i];
		}
	}
	for(var i=0;i<k;i++){
		var coordinates=toTwoD(reservoir[i]);
		sudokuTemp[coordinates[0]][coordinates[1]]=0;
	}
	return sudokuTemp;
}

function Generate(k){
	var sudoku = initialize();
	var sampledSudoku;
	while(helper(0,0,sudoku)==false){
		sudoku = initialize();
	}
	for(var i=0;i<9;i++){
		for(var j=0;j<9;j++){
			globalSudoku[i][j]=sudoku[i][j];
		}
	}
    sampledSudoku=sampleSudoku(k,sudoku);
	return sampledSudoku;

	/*document.write("<br><br>");
	for(var i=0;i<9;i++){
		for(var j=0;j<9;j++){
			document.write(sampledSudoku[i][j]+"  ");
		}
		document.write("<br>");
	}*/
}
			
function sudoko(k){
	var sud=Generate(k);
	g_sud1=sud;
	return sud;
	//var sud[9][9];
}

function sudoko_solver(){
	var res=globalSudoku;
	return res;	
}

function check(){
	var result=sudoko_solver();
	//var sud1=document.getElementById("mytable");
	var x=0;
	for(var i=0 ; i<9 ; i++){
		for(var j=0 ; j<9 ; j++){
			if(g_sud1[i][j]==0){
				var p=document.getElementById("v"+i+j);
				if(p.value!=result[i][j]){
					document.getElementById("x"+i+j).style.backgroundColor="#f5bcba";
					document.getElementById("v"+i+j).style.backgroundColor="#f5bcba";
					x=5;
				}
				else{
					document.getElementById("x"+i+j).style.backgroundColor="rgba(222, 237, 243, 0.575)";
					document.getElementById("v"+i+j).style.backgroundColor="rgba(222, 237, 243, 0.575)";
				}
			}
		}
	}
	if(x==5) return false;
	else{
		document.getElementById("mymodal").style.display="block";
		document.getElementById("rul2").style.display="none";
		document.getElementById("rul3").style.display="block";
		window.clearTimeout(ID);					
		return true
	}
}

function ref(){
	//document.body.removeChild(document.getElementById("gen_sud"));
	clr();
	//st();
	make_sud();
	st();
}

function clr(){
	document.body.removeChild(document.getElementById("mytable"));
	document.body.removeChild(document.getElementById("sub_but"));
	document.body.removeChild(document.getElementById("gen_antr"));
	document.body.removeChild(document.getElementById("tim1"));
	h=0,m=0,s=0;
	window.clearTimeout(ID);
}

function make_sud(){
	var tough=document.getElementById("toughness")
	var slide=tough.value;
	var hardness=43+5*(slide-1)+4*Math.floor(Math.random());
	var sud=sudoko(hardness);
	var x=document.createElement("TABLE");
	x.setAttribute("id","mytable");
	document.body.appendChild(x);
	for(var i=0 ; i<9 ; i++){
		var y=document.createElement("TR");
		y.setAttribute("id","a"+i);
		document.getElementById("mytable").appendChild(y);
		for(var j=0 ; j<9 ; j++){
			var z=document.createElement("TD");
			z.setAttribute("id","x"+i+j);
			if(sud[i][j]==0){
				document.getElementById("a"+i).appendChild(z);
				var t=document.createElement("INPUT");
				t.setAttribute("type","number");
				t.setAttribute("min","1");
				t.setAttribute("max","9");
				t.setAttribute("id","v"+i+j);
				document.getElementById("x"+i+j).appendChild(t);
			}
			else{
				var t=document.createTextNode(sud[i][j]);
				z.appendChild(t);
				document.getElementById("a"+i).appendChild(z);
			}
		} 
	}
	var but=document.createElement("button");
	but.setAttribute("type","submit");
	but.setAttribute("onclick","check()");
	but.setAttribute("id","sub_but");
	but.setAttribute("class","insud");
	document.body.appendChild(but);
	document.getElementById("sub_but").innerHTML="Submit";
	//document.write("<br>");
	var but_1=document.createElement("button");
	but_1.setAttribute("onclick","ref()");
	but_1.setAttribute("id","gen_antr");
	but_1.setAttribute("class","insud");
	document.body.appendChild(but_1);
	document.getElementById("gen_antr").innerHTML="Refresh";
	var par1=document.createElement("p");
	par1.setAttribute("id","tim1");
	document.body.appendChild(par1);
	document.getElementById("tim1").innerHTML="00:00:00";
}

