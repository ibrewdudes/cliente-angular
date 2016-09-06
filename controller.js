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

	// Campos del formulario (se repiten 0-n veces)
  var formulario = {
    tiempo_hervor: '60',
    factor_forma_lupulo: '0',
    cantidad_lupulo: '45',
    alfa_acidos: '9',
    mosto_post_hervor: '40',
    densidad_post_hervor: '1060'
  }

	var ibus_iniciales = {coccion: '1', valor: '0'};

	// Colección de formularios, que inicialmente sólo tendrá 1
	var formularios = [formulario];

	// Datos usados en los formularios
	$scope.formData = {};
	$scope.formData.formularios = formularios;

	$scope.mensaje_ibus_calculados = 'Ibus calculados: ';
	$scope.ibus_calculados = [ibus_iniciales];

	// Para mostrar el combo con los tipos de lúpulo (flor/pellet)
  $scope.tipos_lupulo = [
		{id: 0, descripcion: 'Flor'},
		{id: 1, descripcion: 'Pellet'}
	];

	// Estados de los botones
	$scope.buttonDisabled = false;
	$scope.botonEliminarDisabled = true;

	//--------------------------------------------------------------------------------
  // Función para limpiar los datos del formulario
	//--------------------------------------------------------------------------------
	$scope.reset = function(){
		console.log('reset');

		$scope.mensaje_ibus_calculados = 'Ibus calculados: ';
		$scope.ibus_calculados = [ibus_iniciales];

		// Eliminamos todos los formularios menos el primero
		var numFormularios = formularios.length;
		var i = 0;

		for(i=1;i<numFormularios;i++){
			console.log('Eliminando formulario ' + i);
			formularios.pop();
		}

		// Volvemos a habilitar el botón de "calcular" y deshabilitamos el de eliminar
		$scope.buttonDisabled = false;
		$scope.botonEliminarDisabled = true;

	}

	//----------------------------------------------------------------------
	// Añade un formulario al json
	//----------------------------------------------------------------------
	$scope.nuevoFormulario = function(){
		var nuevoFormulario = angular.copy(formulario);

		nuevoFormulario.tiempo_hervor = '';
		nuevoFormulario.factor_forma_lupulo = 'Elija un formato';
		nuevoFormulario.cantidad_lupulo = '';
		nuevoFormulario.alfa_acidos = '';
		nuevoFormulario.mosto_post_hervor = '';
		nuevoFormulario.densidad_post_hervor = '';

		formularios.push(nuevoFormulario);

		// Añadimos los ibus calculados inicializandolos a 0
		$scope.ibus_calculados.push({coccion: formularios.length, valor: '0'});

		// Habilitamos el botón de eliminar formulario por si estaba deshabilitado
		// (podríamos comprobar si está deshabilitado pero da una pereza...)
		$scope.botonEliminarDisabled = false;

	}

	//----------------------------------------------------------------------
	// Elimina el último elemento del json con los formularios
	//----------------------------------------------------------------------
	$scope.eliminarFormulario = function(){
		// No dejamos eliminarlos todos!
		if(formularios.length > 1){
			formularios.pop();

			// Tras la eliminación sólo queda 1 => deshabilitamos el botón "-"
			if(formularios.length == 1){
				$scope.botonEliminarDisabled = true;
			}
		}

		// Eliminamos el resultado del formulario borrado
		$scope.ibus_calculados.pop();
	}


	//--------------------------------------------------------------------------------
  // Función que invoca al servicio para el cálculo de ibus una vez por cada
	// formulario de cocción y calcula la media
	//--------------------------------------------------------------------------------
	$scope.calcularIbus = function(){

		if($scope.formularioCalculadora.$valid){
			// Deshabilitamos el botón de click
			$scope.buttonDisabled = true;

			// Limpiamos los resultados de la ejecución anterior
			$scope.ibus_calculados = [];

			//------------------------------------------------------------------------
			// Guardamos las peticiones a enviar y luego vamos contando la
			// tratadas. Cuando sean iguales => habilitamos el botón de "calcular"
			// Así evitamos que hagan click varias veces y las llamadas al
			// servicio se "atropellen"
			//------------------------------------------------------------------------
			var peticionesAEnviar = $scope.formData.formularios.length;
			var peticionesCompletadas = 0;

			for(var i in $scope.formData.formularios){

				// Llamamos al servicio que calcula los ibus
				IbusFactory.ibusSimpleHttp($scope.formData.formularios[i].tiempo_hervor,
																	 $scope.formData.formularios[i].factor_forma_lupulo,
																	 $scope.formData.formularios[i].cantidad_lupulo,
																 	 $scope.formData.formularios[i].alfa_acidos,
																	 $scope.formData.formularios[i].mosto_post_hervor,
																	 $scope.formData.formularios[i].densidad_post_hervor)
					.success(function(data,status,config,headers){

						// Añadimos el resultado al array del modelo
						$scope.ibus_calculados.push({coccion: peticionesCompletadas+1, valor: data.ibus});

						console.log('Response: ' + data.ibus); //called when responses arrives from server
				})
				.error(function(data, status, config, headers){
					console.log('Ocurrió un error al invocar al servicio!!');
					console.log(status);
				})
				//--------------------------------------------------------------------------
				// Comprobamos si se atendieron todas las peticiones y si se atendieron
				// habilitamos el botón de "calcular"
				//--------------------------------------------------------------------------
				.finally(function(){
					peticionesCompletadas++;

					// Si se trataron todas las peticiones => habilitamos el botón de "calcular"
					if(peticionesAEnviar == peticionesCompletadas){
						$scope.buttonDisabled = false;
					}
				});
			}

		}else{
			//alert('Complete el formulario!');
			$scope.mensaje_ibus_calculados = 'Error: datos incorrectos';
			$scope.ibus_calculados = [];
		}
	};

}

})();
