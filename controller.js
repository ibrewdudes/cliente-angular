//--------------------------------------------------------------------------------
// Declaramos el módulo y su controladon (con la fución que le da servicio)
//
//--------------------------------------------------------------------------------
angular.module('app.controllers', []).controller('appController', funcionController);

//--------------------------------------------------------------------------------
// appController functions
//
//--------------------------------------------------------------------------------
function funcionController($scope, $http, IbusFactory){
	//$scope.ibus = IbusFactory.ibus();
	$scope.ibus = {
		tiempo_hervor: 0,
		tipo_lupulo: 0,
		gramos_lupulo: 0,
		alfa_acidos: 0,
		litros_mosto_post_hervor: 0,
		densidad_mosto_post_hervor: 0,
		ibus_calculados: 0,
	};

	//--------------------------------------------------------------------------------
  // Función para limpiar los datos del formulario
	//--------------------------------------------------------------------------------
	$scope.reset = function(){
		$scope.ibus = {
			tiempo_hervor: 60,
			tipo_lupulo: 0,
			gramos_lupulo: 15,
			alfa_acidos: 7.2,
			litros_mosto_post_hervor: 20,
			densidad_mosto_post_hervor: 1060,
			ibus_calculados: 0,
		};
	}

	//--------------------------------------------------------------------------------
  // Función que invoca al servicio para el cálculo de ibus
	//--------------------------------------------------------------------------------
	$scope.calcularIbus = function(misDatos){
		// Llamamos al servicio que calcula los ibus
		IbusFactory.ibusSimpleHttp(misDatos.tiempo_hervor,
															 misDatos.tipo_lupulo,
															 misDatos.gramos_lupulo,
															 misDatos.alfa_acidos,
															 misDatos.litros_mosto_post_hervor,
															 misDatos.densidad_mosto_post_hervor)
			.success(function(data,status,config,headers){
				$scope.ibus.ibus_calculados = data.ibus;
				console.log('Response from server: ' + data); //called when responses arrives from server
		}).error(function(data, status, config, headers){
			console.log('Some eror ocurred!!');
		});
	};

}
