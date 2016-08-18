angular.module('app.services', [])

//-------------------------------------------------------------------------------
// Factoría para la calculadora de amargor
//
//-------------------------------------------------------------------------------
.factory('IbusFactory', function($http){
	return{

		//---------------------------------------------------------------------------
		// Devuelve los ibus de la mezcla como una promesa
		//---------------------------------------------------------------------------
		ibusSimpleHttp: function(tiempo_hervor_ent,
						  							 tipo_lupulo_ent,
						  						 	 gramos_lupulo_ent,
														 alfa_acidos_ent,
														 litros_mosto_post_hervor_ent,
														 densidad_mosto_post_hervor_ent){
			return $http({
				method:'GET',
					url:'http://localhost:5000/ibus',
				//url:'https://stark-sea-67061.herokuapp.com/ibus',
				params: {tiempo_hervor: tiempo_hervor_ent,
								 tipo_lupulo: tipo_lupulo_ent,
								 gramos_lupulo: gramos_lupulo_ent,
								 alfa_acidos: alfa_acidos_ent,
								 litros_mosto_post_hervor: litros_mosto_post_hervor_ent,
								 densidad_mosto_post_hervor: densidad_mosto_post_hervor_ent}});
		}

	}
});
