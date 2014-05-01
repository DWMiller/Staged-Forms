// Version 0.1.0
/*
NEXT STEPS
- Add automatic fieldset shifting on input focus 
-- For example, user pressing tab key will cycle inputs regardless of visibility, 
-- so fields should swap accordingly

- Option to specifiy divider tag other than fieldset

- Add convenient way to show validation

 */
(function($) {

	$.fn.stagedForms = function(options) {	

		// Implement settings 
		var defaults = 
		{
			stage: '.formStage'
		}

		var settings = $.extend({},defaults,options);

		return this.each(implement);

		function implement() {
			var form = $(this);

			var $stages = form.find(settings.stage);
			var stageIndex = 0;

			$stages.hide();

			var $curStage = $stages.eq(stageIndex).addClass('stage-first stage-current').show();
			$stages.last().addClass('stage-last');

			var controls = {
				back: form.find('.stageControl-back'),
				next: form.find('.stageControl-next'),				
				submit: form.find('.stageControl-submit')		
			}

			controls.back.add(controls.next).on('click', cycle);

			function cycle(event) {
				event.preventDefault();
				var control = $(this);
				controls.back.removeAttr('disabled');
				controls.next.removeAttr('disabled');

				$curStage.hide().removeClass('stage-current')

				if (control.hasClass('stageControl-next')) {
						$nextStage = $stages.eq(++stageIndex).fadeIn('slow').addClass('stage-current');
				} else if (control.hasClass('stageControl-back')) {
						$nextStage = $stages.eq(--stageIndex).fadeIn('slow').addClass('stage-current');	
				} 

				$curStage = $nextStage;

				if ($curStage.hasClass('stage-last')) {
					controls.next.attr('disabled','true');
				}
				if ($curStage.hasClass('stage-first')) {
					controls.back.attr('disabled','true');
				}
			}
		} // End implementation


	} // End plugin main container




})(jQuery);	//ending plugin






