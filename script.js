// Configuración de cuotas e intereses
const configuracionCuotas = [
    { cuotas: 2, interes: 50 },
    { cuotas: 3, interes: 70 },
    { cuotas: 6, interes: 120 },
    { cuotas: 9, interes: 150 },
    { cuotas: 12, interes: 200 },
    { cuotas: 18, interes: 300 }
];

// Formatear número con puntos
function formatearNumero(input) {
    let valor = input.value.replace(/\./g, '');
    valor = parseInt(valor, 10);

    if (!isNaN(valor)) {
        input.value = valor.toLocaleString('es-AR');
    } else {
        input.value = '';
    }
}

// Calcular cuotas según el monto ingresado
function calcularCuotas() {
    const monto = parseFloat(document.getElementById("monto").value.replace(/\./g, ''));
    const resultadoDiv = document.getElementById("resultado");

    // Limpiar resultados previos
    resultadoDiv.innerHTML = "";

    // Validar monto ingresado
    if (isNaN(monto) || monto <= 0) {
        resultadoDiv.innerHTML = "<p>Por favor, ingrese un monto válido.</p>";
        return;
    }

    // Filtrar cuotas según el rango del monto
    const cuotasFiltradas = configuracionCuotas.filter(opcion => {
        if (monto < 30000) return opcion.cuotas <= 2;
        if (monto >= 30000 && monto < 80000) return opcion.cuotas <= 2;
        if (monto >= 80000 && monto < 150000) return opcion.cuotas <= 3;
        if (monto >= 150000 && monto < 250000) return opcion.cuotas <= 6;
        if (monto >= 250000 && monto < 350000) return opcion.cuotas <= 9;
        if (monto >= 350000 && monto < 500000) return opcion.cuotas <= 12;
        return true; // Si es mayor a 500000, mostrar hasta 18 cuotas
    });

    cuotasFiltradas.forEach(opcion => {
        const { cuotas, interes } = opcion;

        // Calcular el monto total con interés
        const montoConInteres = monto * (1 + interes / 100);

        // Calcular monto por cuota redondeado al millar más cercano
        const montoCuota = Math.round(montoConInteres / cuotas / 1000) * 1000;

        // Formatear monto de la cuota
        const montoCuotaFormateado = montoCuota.toLocaleString("es-AR");

        // Mostrar resultado en pantalla
        const cuotaTexto = document.createElement("p");
        cuotaTexto.textContent = `Para ${cuotas} cuotas: $${montoCuotaFormateado} por mes`;
        resultadoDiv.appendChild(cuotaTexto);
    });
}
