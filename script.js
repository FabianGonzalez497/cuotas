function formatearNumero(input) {
    // Eliminar puntos existentes para procesar el número
    let valor = input.value.replace(/\./g, '');
  
    // Si el campo está vacío, no hacer nada y dejarlo en blanco
    if (valor === "") {
      input.value = "";
      return;
    }
  
    // Convertir el valor a número y formatearlo con puntos
    valor = parseInt(valor, 10);
  
    // Validar si es un número antes de formatearlo
    if (!isNaN(valor)) {
      input.value = valor.toLocaleString('es-AR');
    } else {
      input.value = "";
    }
  }
  
  function calcularCuotas() {
    // Obtener el valor ingresado y remover puntos
    const monto = parseFloat(document.getElementById("monto").value.replace(/\./g, ''));
    const resultadoDiv = document.getElementById("resultado");
  
    // Limpiar resultado previo
    resultadoDiv.innerHTML = "";
  
    // Validar que el monto sea un valor numérico válido
    if (isNaN(monto) || monto <= 0) {
      resultadoDiv.innerHTML = "<p>Por favor, ingrese un monto válido.</p>";
      return;
    }
  
    // Opciones de cuotas con sus respectivos intereses
    const opcionesCuotas = [
      { cuotas: 2, interes: 50 },
      { cuotas: 4, interes: 80 },
      { cuotas: 6, interes: 120 },
      { cuotas: 9, interes: 150 },
      { cuotas: 12, interes: 200 }
    ];
  
    // Filtrar opciones de cuotas en función del monto
    const opcionesFiltradas = opcionesCuotas.filter(opcion => {
      if (monto <= 50000) return opcion.cuotas <= 4;
      if (monto > 50000 && monto <= 80000) return opcion.cuotas <= 6;
      if (monto > 80000 && monto <= 100000) return opcion.cuotas <= 9;
      return true; // Mostrar todas las cuotas si el monto es mayor a 100000
    });
  
    opcionesFiltradas.forEach(opcion => {
      const { cuotas, interes } = opcion;
  
      // Calcular el monto total con interés específico para la cantidad de cuotas
      const montoConInteres = monto * (1 + interes / 100);
  
      // Calcular el valor de cada cuota, redondeado al número de mil más cercano
      const montoCuota = Math.round(montoConInteres / cuotas / 1000) * 1000;
  
      // Formatear el monto de la cuota con puntos para miles
      const montoCuotaFormateado = montoCuota.toLocaleString("es-AR");
  
      // Mostrar resultado en pantalla
      const cuotaTexto = document.createElement("p");
      cuotaTexto.textContent = `Para ${cuotas} cuotas: $${montoCuotaFormateado} por mes`;
      resultadoDiv.appendChild(cuotaTexto);
    });
  }
  