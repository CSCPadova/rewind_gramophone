var $t  = jQuery.noConflict();

$t(document).ready(function(){
	var $a  = jQuery.noConflict();
	
	
var box=$a("#arm");
var boxCenter=[box.offset().left+box.width()/2, box.offset().top+box.height()/2];

var active = false;
var boxClick = false;

box.click(function(){
	
	boxClick = true;

if(active)
{
	active = false;
}
else
{
	active = true;
}

console.log(active);

	$a(document).mousemove(function(e){    
    
      if(active){  
	var angle = Math.atan2(e.pageX- boxCenter[0],- (e.pageY- boxCenter[1]) )*(180/Math.PI);	    
    
    box.css({ "-webkit-transform": 'rotate(' + angle + 'deg)'});    
    box.css({ '-moz-transform': 'rotate(' + angle + 'deg)'});
    box.css({ 'transform': 'rotate(' + angle + 'deg)'});
    
    }
    
});





});

$a("#player").click(function(){
	
	if(boxClick) {
    console.log("yes");
}else
{
	active = false;
	console.log('vin');
}
	
	
	boxClick = false;
});


});