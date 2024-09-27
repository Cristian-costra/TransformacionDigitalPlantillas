// Definir los pasos de la solución
const steps = [
  '\\(\\int x^2 dx\\)',
  '\\(\\frac{d}{dx} x^3 = 3x^2\\)',
  '\\(\\frac{x^3}{3} + C\\)'
];

let currentStep = 0;

// Mostrar el paso actual
function showStep(index) {
  document.getElementById('math').innerHTML = steps[index];
  MathJax.typesetPromise();  // Renderizar la ecuación actual con MathJax
}

// Función para ir al siguiente paso
function nextStep() {
  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
}

// Función para ir al paso anterior
function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
}

// Manejo de eventos para botones
document.getElementById('next').addEventListener('click', nextStep);
document.getElementById('prev').addEventListener('click', prevStep);

// Manejo de eventos de teclado
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowRight') {
    nextStep();
  } else if (event.key === 'ArrowLeft') {
    prevStep();
  }
});

// Mostrar el primer paso al cargar la página
showStep(currentStep);
