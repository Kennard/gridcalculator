/**
 * GridCalculator v1 - Fluid Grid Calculator
 * 
 * Copyright 2014, Kennard McGill 
 * Developed for the FEDs - Front-End Developers. I thought it was cool so why not. 
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */


  $(document).ready(function(){

  	$("input#width").focus(function() {
 			if( $(this).val("px")){
 				$(this).val("");
 			}
		});



 	$('#calc').click(function(event){
 		event.preventDefault();

 		/************************************************************************* 
 		/ Calculate the page width from the form input. If no page width submitted 
 		/ then pass an error. If width submitted then check for conditions. If 
 		/ if conditions met then pass width. 
 		**************************************************************************/


 		var $pagewidth = parseInt($('input[name=pagewidth]').val(), 10);
 		if(!$pagewidth){
 			$('#width_message').show().html("Enter a width value.");
 			return false;
 		}
 		else if ($pagewidth < 320 || $pagewidth > 1280){
 			$('#width_message').show().html("Your page width is either to small or to large.");
 			return false;
 		}
 		else{
 			$('#width_message').hide();
 		}	



 		/*****************************************************************************
 		/ Calculate the number of columns from the form input. If no columns submitted
 		/ then pass an error. Check to see if conditions are met - if not pass error. 
 		/ If conditions are met then pass columns. 
		*****************************************************************************/

 		var $columns = parseInt($('input[name=columns]').val(),10);	
 		if(!$columns){
 			$('#column_message').show().html("Enter the number of columns.");
 			return false;
 		}
 		else if ($columns <= 0 || $columns > 14){
 			$('#column_message').show().html("Anything between 2 and 14 is okay!");
 			return false;	
 		}
 		else{
 			$('#column_message').hide();
 		}

 		/*****************************************************************************
 		/ Calculate the gutter size from the form input. If no gutter size submitted
 		/ then pass an error. Check to see if gutters conditions are met - if not pass 
 		/ an error.  If conditions are met then pass columns. 
		*****************************************************************************/

 		var $gutters = parseInt($('input[name=gutters]').val(),10);
 		if(!$gutters){
 			$('#gutter_message').show().html("Enter gutter space.");
 			return false;
 		}	
 		else if ($gutters < 1 || $gutters >= 101){
 			$('#gutter_message').show().text("100 is the max and 2 is the min.");
 			return false;	
 		}
 		else{
 			$('#gutter_message').hide();
 		}

 		/****************************************************************************
 		/ Here we do all the calculations for the grid columns and gutter numbers 
		/ pass the values into a variable.
		/
		***************************************************************************/
 		var $gutterSize = parseInt($columns - 1) * $gutters;
 		var $widthSize = parseInt($pagewidth - $gutterSize);
 		var $columnSize = $widthSize / $columns;

 		var $columnWidth = $columnSize / $pagewidth * 100;
		var $gutterMargin =  $gutters / $pagewidth * 100;


		/***************************************************************************** 
		/ Staging and testing code below delete from final production code
		/ Only used for checking number during calculations.
		/	
		******************************************************************************/
 		 $('.input').html( "<p>Width " + $pagewidth + "</p><p>Columns: " 
 		 	+ $columns + "</p><p>Gutters: " + $gutters +"</p> <p>Total gutter size: " + $gutterSize+"</p>" 
 		 	+ "<p>Remaining width: " + $widthSize + "</p>"  
 		    + "<p>First Column size: " + $columnWidth + "</p><p> Gutter Between columns: " + $gutterMargin+"%</p>");

 		 /******************************************************************************
 		 / Build the HTML for the page starting with the div and loop through the 
 		 / columns sizes adding margins up to 100%.
 		 *******************************************************************************/
		
		$('.output-css').html('<pre class="grid_css output"><code></code></pre>');

 		$('.output').html("");	
 		
 		$('.output').append(' /*CSS '+ $pagewidth+ 'px Responsive Grid */\n\n'); 

 		for(i = 1; i <= $columns; i++) {	
 			if( i == 1 ){
 				var $cols = $columnWidth * i ; 
 			}
 			else if(i == 2){
 				var $cols = ($columnWidth * i) + $gutterMargin; 
 			}
 			else{ 
 				var $cols = ($columnWidth * i) + ( (i - 1) * $gutterMargin);	
	 				if( i == $columns){
	 					var $cols = Math.ceil(($columnWidth * i) + ( (i - 1) * $gutterMargin ));
	 				}
 			}	

 			$('.output').append('.col_'+i+'{ width:'+$cols+'%;}\n'); 
		}

		/********************************************************************************
		/ First for loop outputs the css column margin right of -100% 
		********************************************************************************/
		
		for(x = 1; x <= $columns; x++) {
			
			if (x == $columns){					  
 	     		$('.output').append('.col_'+x+'{ margin-right: -100%; margin-bottom: 2%; float:left;}\n');				
 	     	} else {
 	     		$('.output').append('.col_'+x+', \n');
 	     	}
 	    } 	

 	    /********************************************************************************
		/ Second for loop outputs the css pad class for margins from the first column 
		********************************************************************************/

 	    for(n = 1; n <= $columns; n++) {
			if(n == 1){
				var $padcolumns = ($gutterMargin * 0); 
			}
			else if(n == 2){
 				var $padcolumns = ($columnWidth + $gutterMargin); 
 			}				
			else {
				var	$padcolumns = ($columnWidth + $gutterMargin) * ( n - 1 );		 	 	 
			} 

			$('.output').append('.pad'+n+'{margin-left:'+$padcolumns+'%;} \n');	
 	  } 

 	   /********************************************************************************
		/ Reset the html of page refresh and then output HTML for the page
		********************************************************************************/

 	    $('.row1').html("");	


 	


 	 });

 });