(function(){
'use strict';

//--------------------------------------------------------------------------------
// Declaramos el módulo y su controladon (con la fución que le da servicio)
//
//--------------------------------------------------------------------------------
angular
	.module('app.controllers', [])
	.controller('appController', funcionController);

//--------------------------------------------------------------------------------
// appController functions
//
//--------------------------------------------------------------------------------
function funcionController($scope, $http, IbusFactory){
	var vm = this;

	vm.mensaje_ibus_calculados = 'Ibus calculados: ';
  vm.ibus_calculados = 0;

	// Datos del formulario
	vm.calculadoraModel = {};


	// Para mostrar el combo con los tipos de lúpulo (flor/pellet)
  vm.tipos_lupulo = [
		{id: 0, descripcion: 'Flor'},
		{id: 1, descripcion: 'Pellet'}
	];


	//--------------------------------------------------------------------------------
  // Función para limpiar los datos del formulario
	//--------------------------------------------------------------------------------
	vm.reset = function(){
		console.log('reset');

		vm.calculadoraModel = {
			tiempo_hervor: '60',
			factor_forma_lupulo: '0',
			cantidad_lupulo: '10',
			alfa_acidos: '5.80',
			cantidad_mosto: '20',
			densidad_post_hervor: '1060'
		};

		vm.mensaje_ibus_calculados = 'Ibus calculados: ';
		vm.ibus_calculados = 0;

	}


	//--------------------------------------------------------------------------------
  // Función que invoca al servicio para el cálculo de ibus
	//--------------------------------------------------------------------------------
	vm.submit = function(){
		//alert(JSON.stringify(vm.calculadoraModel));

		console.log(JSON.stringify(vm.calculadoraModel));

		if($scope.formularioCalculadora.$valid){

			// Llamamos al servicio que calcula los ibus
			IbusFactory.ibusSimpleHttp(vm.calculadoraModel.tiempo_hervor,
																 vm.calculadoraModel.factor_forma_lupulo,
																 vm.calculadoraModel.cantidad_lupulo,
																 vm.calculadoraModel.alfa_acidos,
																 vm.calculadoraModel.cantidad_mosto,
																 vm.calculadoraModel.densidad_post_hervor)
				.success(function(data,status,config,headers){
					vm.ibus_calculados = data.ibus;
					console.log('Response from server: ' + data.ibus); //called when responses arrives from server
			}).error(function(data, status, config, headers){
				console.log('Some eror ocurred!!');
			});
		}else{
			//alert('Complete el formulario!');
			vm.mensaje_ibus_calculados = 'Error: ';
			vm.ibus_calculados = 'datos incorrectos';
		}
	};


}

})();
