
  $(document).ready( function() {
    var handle = $("#custom-handle");
	var handleCh1 = $("#handle-ch1");
	
	
	
	timer.addEventListener('secondsUpdated', function (e) {
		var $st = jQuery.noConflict();
		$st('#timer').html(timer.getTimeValues().toString());
		console.log(timer.getTimeValues().toString());
	});
	
	
    $("#slider").slider({
	  min: 70.0,
      max: 80.0,
      create: function() {
        handle.text( $( this ).slider( "value" ) );
      },
      slide: function( event, ui ) {
        console.log( ui.value );
		gram.changeRotation(ui.value, 1);
      }
    });
	
	
	
	$("#slider-ch1").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch1").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)"});
		$("#slider-ch1").css({"left": "100px"}); 
      },
      slide: function( event, ui ) {
        console.log( "ch1:"+ui.value );
		gram.changeCh(100-ui.value, 0, 1);
      }
    });
	
	$("#slider-ch2").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch2").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)"});
		$("#slider-ch2").css({"top":"-190px", "left": "130px" });
      },
      slide: function( event, ui ) {
        console.log( "ch2:"+ui.value );
		gram.changeCh(100-ui.value, 1, 1);
      }
    });
	
	$("#slider-ch3").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch3").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)"});
		$("#slider-ch3").css({"top":"-504px", "left": "160px"});
      },
      slide: function( event, ui ) {
        console.log( "ch3:"+ui.value );
		gram.changeCh(100-ui.value, 2, 1);
      }
    });
	
	$("#slider-ch4").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch4").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)"});
		$("#slider-ch4").css({"top":"-818px", "left": "190px"});
      },
      slide: function( event, ui ) {
        console.log( "ch4:"+ui.value );
		gram.changeCh(100-ui.value, 3, 1);
      }
    });
	
	$("#slider-ch5").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch5").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)"});
		$("#slider-ch5").css({"top":"-1132px", "left": "218px"});
      },
      slide: function( event, ui ) {
        console.log( "ch5:"+ui.value );
		gram.changeCh(100-ui.value, 4, 1);
      }
    });
  
  
	$("#slider-ch6").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch6").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch6").css({"top":"-1446px", "left": "245px"});
      },
      slide: function( event, ui ) {
        console.log( "ch6:"+ui.value );
		gram.changeCh(100-ui.value, 5, 1);
      }
    });
	
	$("#slider-ch7").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch7").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch7").css({"top":"-1760px", "left": "275px"});
      },
      slide: function( event, ui ) {
        console.log( "ch7:"+ui.value );
		gram.changeCh(100-ui.value, 6, 1);
      }
    });
	
	$("#slider-ch8").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch8").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch8").css({"top":"-2074px", "left": "303px"});
      },
      slide: function( event, ui ) {
        console.log( "ch8:"+ui.value );
		gram.changeCh(100-ui.value, 7, 1);
      }
    });
	
	$("#slider-ch9").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch9").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch9").css({"top":"-2388px", "left": "333px"});
      },
      slide: function( event, ui ) {
        console.log( "ch9:"+ui.value );
		gram.changeCh(100-ui.value, 8, 1);
      }
    });
	
	$("#slider-ch10").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch10").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch10").css({"top":"-2702px", "left": "361px"});
      },
      slide: function( event, ui ) {
        console.log( "ch10:"+ui.value );
		gram.changeCh(100-ui.value, 9, 1);
      }
    });
	
	$("#slider-ch11").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch11").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch11").css({"top":"-3016px", "left": "391px"});
      },
      slide: function( event, ui ) {
        console.log( "ch11:"+ui.value );
		gram.changeCh(100-ui.value, 10, 1);
      }
    });
	
	$("#slider-ch12").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch12").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch12").css({"top":"-3330px", "left": "419px"});
      },
      slide: function( event, ui ) {
        console.log( "ch12:"+ui.value );
		gram.changeCh(100-ui.value, 11, 1);
      }
    });
	
	$("#slider-ch13").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch13").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)"});
		$("#slider-ch13").css({"top":"-3644px", "left": "448px"});
      },
      slide: function( event, ui ) {
        console.log( "ch13:"+ui.value );
		gram.changeCh(100-ui.value, 12, 1);
      }
    });
	
	$("#slider-ch14").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch14").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch14").css({"top":"-3958px", "left": "478px"});
      },
      slide: function( event, ui ) {
        console.log( "ch14:"+ui.value );
		gram.changeCh(100-ui.value, 13, 1);
      }
    });
	
	$("#slider-ch15").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch15").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch15").css({"top":"-4272px", "left": "507px"});
      },
      slide: function( event, ui ) {
        console.log( "ch15:"+ui.value );
		gram.changeCh(100-ui.value, 14, 1);
      }
    });
	
	$("#slider-ch16").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch16").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch16").css({"top":"-4586px", "left": "536px"});
      },
      slide: function( event, ui ) {
        console.log( "ch16:"+ui.value );
		gram.changeCh(100-ui.value, 15, 1);
      }
    });
	
	$("#slider-ch17").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch17").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch17").css({"top":"-4900px", "left": "565px"});
      },
      slide: function( event, ui ) {
        console.log( "ch17:"+ui.value );
		gram.changeCh(100-ui.value, 16, 1);
      }
    });
	
	$("#slider-ch18").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch18").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch18").css({"top":"-5214px", "left": "593px"});
      },
      slide: function( event, ui ) {
        console.log( "ch18:"+ui.value );
		gram.changeCh(100-ui.value, 17, 1);
      }
    });
	
	$("#slider-ch19").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch19").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch19").css({"top":"-5528px", "left": "622px"});
      },
      slide: function( event, ui ) {
        console.log( "ch19:"+ui.value );
		gram.changeCh(100-ui.value, 18, 1);
      }
    });
	
	$("#slider-ch20").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch20").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch20").css({"top":"-5842px", "left": "651px"});
      },
      slide: function( event, ui ) {
        console.log( "ch20:"+ui.value );
		gram.changeCh(100-ui.value, 19, 1);
      }
    });
	
	$("#slider-ch21").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch21").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch21").css({"top":"-6156px", "left": "681px"});
      },
      slide: function( event, ui ) {
        console.log( "ch21:"+ui.value );
		gram.changeCh(100-ui.value, 20, 1);
      }
    });
	
	$("#slider-ch22").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch22").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch22").css({"top":"-6470px", "left": "710px"});
      },
      slide: function( event, ui ) {
        console.log( "ch22:"+ui.value );
		gram.changeCh(100-ui.value, 21, 1);
      }
    });
	
	$("#slider-ch23").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch23").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch23").css({"top":"-6784px", "left": "738px"});
      },
      slide: function( event, ui ) {
        console.log( "ch23:"+ui.value );
		gram.changeCh(100-ui.value, 22, 1);
      }
    });
	
	$("#slider-ch24").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch24").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch24").css({"top":"-7098px", "left": "767px"});
      },
      slide: function( event, ui ) {
        console.log( "ch24:"+ui.value );
		gram.changeCh(100-ui.value, 23, 1);
      }
    });
});
	