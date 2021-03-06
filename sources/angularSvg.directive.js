(function() {

	angular
		.module( 'angular.svg' )
		.directive( 'angularSvg', directiveDefinition );

	directiveDefinition.$inject = [ '$rootScope' ];

	function directiveDefinition( $rootScope ) {
		return {
			link: link,
			replace: true,
			restrict: 'AE',
			template: '<div class="angularSvg"></div>',
			type: 'svg'
		};

		function link( scope, element, attrs ) {
			var symbolSource = document.getElementById( attrs.ref );

			if ( symbolSource ) {
				initialize( symbolSource );
			} else {
				// the svg symbol is not in the DOM yet,
				// so use a service to initialize this directive lazily
			}

			function initialize( symbolSource ) {
				var symbol = angular.element( symbolSource ).clone();
				var svg = angular.element( document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ) );
				var svgContent = angular.element( '<div class="angularSvg_content"></div>' );

				svg.append( symbol.children() );
				svg[0].setAttribute( 'viewBox', symbol[0].getAttribute( 'viewBox' ) );

				svgContent.append( svg );

				element.append( svgContent );
			}
		}
	}

})();