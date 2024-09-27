const steps = [
  {
    current: '\\(\\int \\textcolor{rgba(255, 0, 0, 0.75)}{x^2} dx = \\frac{\\textcolor{rgba(255, 0, 0, 0.75)}{x^3}}{3} + C\\)',
    rule: '\\(\\int x^n dx = \\frac{x^{n+1}}{n+1}\\)'
  },
  {
    current: '\\(\\textcolor{rgba(255, 0, 0, 0.75)}{\\frac{d}{dx}} \\left( \\frac{x^3}{3} \\right) = x^2\\)',
    rule: '\\(\\frac{d}{dx}(x^n) = nx^{n-1}\\)'
  },
  {
    current: '\\(\\frac{d}{dx} \\left( \\textcolor{rgba(255, 0, 0, 0.75)}{x^3} \\right) = 3x^2\\)',
    rule: '\\((fg)\' = f\'g + fg\'\\)'
  },
  {
    current: '\\(\\int \\textcolor{rgba(255, 0, 0, 0.75)}{e^{x}} dx = \\textcolor{rgba(255, 0, 0, 0.75)}{e^{x}} + C\\)',
    rule: '\\(\\int e^{ax} dx = \\frac{1}{a}e^{ax} + C\\)'
  },
  {
    current: '\\(\\textcolor{rgba(255, 0, 0, 0.75)}{\\frac{d}{dx}} \\left( \\sin(x) \\right) = \\cos(x)\\)',
    rule: '\\(\\frac{d}{dx} \\sin(x) = \\cos(x)\\)'
  }
];

let currentStep = 0;

// Mostrar el paso actual
function showStep(index) {
  const mathElement = document.getElementById('math');
  const ruleElement = document.getElementById('rule-text');
  const ruleContainer = document.getElementById('rule');
  
  mathElement.innerHTML = steps[index].current;
  ruleElement.innerHTML = steps[index].rule;
  MathJax.typesetPromise();

  // Mostrar la regla como globo de texto al pasar el cursor
  const redText = document.querySelector('.text-red');
  redText.setAttribute('title', steps[index].rule);

  // Mostrar la regla
  ruleContainer.style.display = 'block';
  setTimeout(() => {
    ruleContainer.style.display = 'none';
  }, 1000);
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

// Manejo de eventos de teclado
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowDown') {
    nextStep();
  } else if (event.key === 'ArrowUp') {
    prevStep();
  }
});

// Manejo de eventos de clic en la ecuación
document.getElementById('equation').addEventListener('click', nextStep);

// Mostrar el primer paso al cargar la página
showStep(currentStep);
