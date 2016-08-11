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

	$scope.ibus = {
		tiempo_hervor: '',
		tipo_lupulo: {id: 0, descripcion: 'Flor'},
		gramos_lupulo: '',
		alfa_acidos: '',
		litros_mosto_post_hervor: '',
		densidad_mosto_post_hervor: '',
		ibus_calculados: 0
	};

	// Para mostrar el combo con los tipos de lúpulo (flor/pellet)
  $scope.tipos_lupulo = [
		{id: 0, descripcion: 'Flor'},
		{id: 1, descripcion: 'Pellet'}
	];


	//--------------------------------------------------------------------------------
  // Función para limpiar los datos del formulario
	//--------------------------------------------------------------------------------
	$scope.reset = function(){
		$scope.ibus = {
			tiempo_hervor: 60,
			tipo_lupulo: {id: 0, descripcion: 'Flor'},
			gramos_lupulo: 15,
			alfa_acidos: 7.2,
			litros_mosto_post_hervor: 20,
			densidad_mosto_post_hervor: 1060,
			ibus_calculados: 0,
		};

		$scope.tipo_lupulo_seleccionado = {id: 0, descripcion: 'Flor'};
	}

	//--------------------------------------------------------------------------------
  // Función que invoca al servicio para el cálculo de ibus
	//--------------------------------------------------------------------------------
	$scope.calcularIbus = function(misDatos){
		// Llamamos al servicio que calcula los ibus
//alert("Tiempo: " + misDatos.tiempo_hervor);
//alert("Tipo lúpulo: " + misDatos.tipo_lupulo.id);
//alert("Gramos: " + misDatos.gramos_lupulo);
//alert("Alfa ácidos: " + misDatos.alfa_acidos);
//alert("Mosto post-hervor: " + misDatos.litros_mosto_post_hervor);
//alert("Densidad mosto: "+ misDatos.densidad_mosto_post_hervor);  


		IbusFactory.ibusSimpleHttp(misDatos.tiempo_hervor,
															 misDatos.tipo_lupulo.id,
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
