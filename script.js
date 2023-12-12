
let calcular = document.getElementById("calcular");
const FLU = document.getElementById("flu");
const MAN = document.getElementById("man");
const ERROR = document.getElementById("error");
const RESULTADOS_SUPERFICIE = document.getElementById("resultadosSuperficie");
const SUPERFICIE = document.getElementById("superficie");

calcular.addEventListener("click", () => {
    let dato = document.getElementById("peso").valueAsNumber;

    if (isNaN(dato) || dato <= 0) {
        mostrarError();
        ocultarResultados();
        return;
    }

    let superficie = calcularSuperficieCorporal(dato);
    let resultadoSuperficie = Math.round(superficie * 100) / 100; // Redondea a dos decimales

    RESULTADOS_SUPERFICIE.innerHTML = "Resultados de Superficie Corporal";
    SUPERFICIE.innerHTML = `Superficie Corporal: ${resultadoSuperficie}`;

    if (dato > 30) {
        let vol1 = Math.round(superficieCorporal(dato) * 1500);
        let volt2 = Math.round(superficieCorporal(dato) * 2000);

        FLU.innerHTML = `Para mayores de 30 kg se calcula por SC\n Volumen Diario: ${vol1} cc/hr, ${volt2} cc/hr`;
        MAN.innerHTML = ""; 
        ERROR.style.display = 'none';
        ocultarError();
        mostrarResultados();
    } else if (dato <= 30) {
        let resultado = Math.round(hollidaySegar(dato));
        let mantenimiento = Math.round(calcularMantenimiento(resultado));
        let medMantenimiento = Math.round(mantenimiento * 1.5);
        let mantOfi = Math.round(mantenimiento + medMantenimiento);
        console.log(resultado, mantOfi);

        FLU.innerHTML = `Para menores de 30kg se calcula por Holliday-Segar\nVolumen Diario: ${resultado} cc`;
        MAN.innerHTML = `Mantenimiento: ${mantenimiento} cc/hr, Medio Mantenimiento: ${medMantenimiento} cc/hr`;

        ocultarError();
        mostrarResultados();
    }
});

function calcularSuperficieCorporal(peso) {
    return (peso * 4 + 7) / (peso + 90);
}
function superficieCorporal(peso) {
    let superficieCorporal = ((peso * 4 + 7) / (peso + 90));
    return superficieCorporal;
}

function hollidaySegar(peso) {
    if (peso <= 10) {
        let volDiario = peso * 100;
        return volDiario;
    } else if (peso <= 20) {
        let volDiario = (peso - 10) * 50 + 1000;
        return volDiario;
    } else {
        let volDiario = (peso - 20) * 20 + 1000 + 500;
        return volDiario;
    }
}

function calcularMantenimiento(resultado) {
    let flujoHorario = resultado / 24;
    return flujoHorario;
}

function mostrarError() {
    ERROR.style.display = 'block';
}

function ocultarError() {
    ERROR.style.display = 'none';
}

function ocultarResultados() {
    FLU.style.display = 'none';
    MAN.style.display = 'none';
}

function mostrarResultados() {
    FLU.style.display = 'block';
    MAN.style.display = 'block';
}

