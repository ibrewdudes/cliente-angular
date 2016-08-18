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
function funcionController($http, IbusFactory){
	var vm = this;

  vm.ibus_calculados = 0;

	vm.calculadoraModel = {};

	vm.calculadoraFields = [
		// Primer campo: tiempo de hervor en minutos
		{
			key: 'tiempo_hervor',
			type: 'input',
			templateOptions: {
				type: 'text',
				label: 'Tiempo hervor',
				placeholder: 'minutos',
				required: true
			}
		},

		// Segundo campo: tipo del lúpulo (0-Flor, 1-Pellet)
		{
			key: 'factor_forma_lupulo',
			type: 'input',
			templateOptions: {
				type: 'text',
				label: 'Tipo de lúpulo',
				placeholder: '0-flor, 1-pellet',
				required: true
			}
		},

		// Cantidad de lúpulo en gramos
		{
			key: 'cantidad_lupulo',
			type: 'input',
			templateOptions: {
				type: 'text',
				label: 'Cantidad de lúpulo',
				placeholder: 'gramos',
				required: true
			}
		},

		// Porcentaje alfa-ácidos
		{
			key: 'alfa_acidos',
			type: 'input',
			templateOptions: {
				type: 'text',
				label: 'Porcentaje alfa-ácidos',
				placeholder: 'en %',
				required: true
			}
		},

		// Mosto tras hervor en litros
		{
			key: 'cantidad_mosto',
			type: 'input',
			templateOptions: {
				type: 'text',
				label: 'Mosto tras hervor',
				placeholder: 'litros',
				required: true
			}
		},

		// Densidad del mosto tras hervor
		{
			key: 'densidad_post_hervor',
			type: 'input',
			templateOptions: {
				type: 'text',
				label: 'Densidad del mosto tras hervor',
				placeholder: 'unidades?',
				required: true
			}
		}
	];

	// Para mostrar el combo con los tipos de lúpulo (flor/pellet)
  vm.tipos_lupulo = [
		{id: 0, descripcion: 'Flor'},
		{id: 1, descripcion: 'Pellet'}
	];


	//--------------------------------------------------------------------------------
  // Función para limpiar los datos del formulario
	//--------------------------------------------------------------------------------
	vm.reset = function(){
		vm.calculadoraModel = {};
		/*
			tiempo_hervor: 60,
			factor_forma_lupulo: 0,
			cantidad_lupulo: 15,
			alfa_acidos: 7.2,
			cantidad_mosto: 20,
			densidad_post_hervor: 1060
			//ibus_calculados: 0,
		};*/

		//vm.tipo_lupulo_seleccionado = {id: 0, descripcion: 'Flor'};
	}


	//--------------------------------------------------------------------------------
  // Función que invoca al servicio para el cálculo de ibus
	//--------------------------------------------------------------------------------
	vm.submit = function(){
		//alert(JSON.stringify(vm.calculadoraModel));

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
	};


}

})();
