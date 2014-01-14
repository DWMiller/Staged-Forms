// Version 0.5
/*
NEXT STEPS
- Add automatic fieldset shifting on input focus 
-- For example, user pressing tab key will cycle inputs regardless of visibility, 
-- so fields should swap accordingly

- Add convenient way to show validation

 */
(function($)
{
	$.fn.stagedForms = function(options)
	{
		var defaults = 
		{
			createControls: true
		}

		var settings = $.extend({},defaults,options);

		return this.each(function() 
		{ // Plugin logic container
			var $form = $(this);
			var $stages = $form.find('fieldset');
			$stages.hide();

			var $curStage = $stages.first().addClass('stage-first stage-current').show();
			$stages.last().addClass('stage-last');

			if(settings.createControls)
			{
				var $backButton = $('<button>',{class:'stage-control-back', text:'Back', disabled:'true'}).appendTo($form);
				var $nextButton = $('<button>',{class:'stage-control-next', text:'Next'}).appendTo($form);
			} else {
				var $backButton = $('.stage-control-back');
				var $nextButton = $('.stage-control-next');				
			}

			$backButton.add($nextButton).on('click', function(event) 
			{
				event.preventDefault();

				$backButton.removeAttr('disabled');
				$nextButton.removeAttr('disabled');

				$curStage.removeClass('stage-current')

				if ($(this).hasClass('stage-control-next'))
				{
						$nextStage = $curStage.next('fieldset').fadeIn('slow').addClass('stage-current');
				} else if ($(this).hasClass('stage-control-back'))
				{
						$curStage.removeClass('stage-current')
						$nextStage = $curStage.prev('fieldset').fadeIn('slow').addClass('stage-current');	
				} 

				$curStage.hide();

				$curStage = $nextStage;

				if ($curStage.hasClass('stage-last'))
				{
					$nextButton.attr('disabled','true');
				}
				if ($curStage.hasClass('stage-first'))
				{
					$backButton.attr('disabled','true');
				}

			});


		}) // End plugin logic container

	} // Ending plugin main container

})(jQuery);	//ending plugin
