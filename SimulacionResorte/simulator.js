let weight, damping, k, initialVelocity;
let position = 300; // Posición inicial
let velocity = 0;
let acceleration = 0;
let restPosition = 300; // Posición de equilibrio

let isRunning = false; // Bandera para controlar la simulación
let positions = []; // Array para guardar el rastro de posiciones
const maxPositions = 100; // Máximo de posiciones a mostrar en el rastro

function setup() {
  createCanvas(800, 400);

  // Obtener los controles y actualizar variables al cambiar
  const weightSlider = select("#weight");
  const dampingSlider = select("#damping");
  const kSlider = select("#k");
  const initialVelocitySlider = select("#initialVelocity");

  const weightNumber = select("#weightNumber");
  const dampingNumber = select("#dampingNumber");
  const kNumber = select("#kNumber");
  const initialVelocityNumber = select("#initialVelocityNumber");

  const maxWeightInput = select("#maxWeight");
  const maxDampingInput = select("#maxDamping");
  const maxKInput = select("#maxK");
  const maxVelocityInput = select("#maxVelocity");

  const startButton = select("#startButton");
  const resetButton = select("#resetButton");

  syncSliderWithInput(weightSlider, weightNumber);
  syncSliderWithInput(dampingSlider, dampingNumber);
  syncSliderWithInput(kSlider, kNumber);
  syncSliderWithInput(initialVelocitySlider, initialVelocityNumber);

  // Actualizar el rango de sliders con valores de entrada
  maxWeightInput.input(() => { weightSlider.attribute('max', maxWeightInput.value()); });
  maxDampingInput.input(() => { dampingSlider.attribute('max', maxDampingInput.value()); });
  maxKInput.input(() => { kSlider.attribute('max', maxKInput.value()); });
  maxVelocityInput.input(() => { initialVelocitySlider.attribute('max', maxVelocityInput.value()); });

  weight = weightSlider.value();
  damping = dampingSlider.value();
  k = kSlider.value();
  initialVelocity = initialVelocitySlider.value();

  weightSlider.input(() => { weight = weightSlider.value(); weightNumber.value(weight); });
  dampingSlider.input(() => { damping = dampingSlider.value(); dampingNumber.value(damping); });
  kSlider.input(() => { k = kSlider.value(); kNumber.value(k); });
  initialVelocitySlider.input(() => { initialVelocity = initialVelocitySlider.value(); initialVelocityNumber.value(initialVelocity); });

  weightNumber.input(() => { weight = weightNumber.value(); weightSlider.value(weight); });
  dampingNumber.input(() => { damping = dampingNumber.value(); dampingSlider.value(damping); });
  kNumber.input(() => { k = kNumber.value(); kSlider.value(k); });
  initialVelocityNumber.input(() => { initialVelocity = initialVelocityNumber.value(); initialVelocitySlider.value(initialVelocity); });

  startButton.mousePressed(() => {
    startSimulation();
  });

  resetButton.mousePressed(() => {
    resetToDefault();
  });
}

function draw() {
  background(255);

  if (isRunning) {
    // Calcular la fuerza de restitución del resorte: F = -k * x
    let force = -k * (position - restPosition);

    // Ley de Newton: F = m * a  =>  a = F / m
    acceleration = force / weight;

    // Calcular velocidad y aplicar amortiguación (damping)
    velocity += acceleration;
    velocity *= 1 - damping;

    // Actualizar posición
    position += velocity;

    // Guardar posición actual en el rastro
    positions.push(position);

    // Limitar la longitud del rastro
    if (positions.length > maxPositions) {
      positions.shift();
    }
  }

  // Dibujar el resorte
  drawSpring(position);

  // Dibujar la masa
  fill(127);
  stroke(0);
  rectMode(CENTER);
  rect(width / 2, position, 40, 40);

  // Dibujar el rastro de posiciones pasadas fijo
  drawTrace();
}

function drawSpring(y) {
  // Dibujar el resorte dentado
  stroke(0);
  noFill();
  beginShape();
  const coils = 8;
  const coilWidth = 10;
  const springHeight = y - 20;
  for (let i = 0; i <= coils; i++) {
    const x = width / 2 + (i % 2 === 0 ? -coilWidth : coilWidth);
    const y = (i / coils) * springHeight;
    vertex(x, y);
  }
  endShape();
}

function drawTrace() {
  // Dibujar el rastro de posiciones fijas
  noFill();
  stroke(0, 0, 255);
  beginShape();
  for (let i = 0; i < positions.length; i++) {
    let x = width / 2 + (positions.length - i - 1) * 5; // Invertir la dirección del movimiento
    vertex(x, positions[i]);
  }
  endShape();
}

function startSimulation() {
  // Iniciar la simulación con la velocidad inicial
  velocity = float(initialVelocity);
  position = 300; // Resetear la posición al iniciar
  positions = []; // Limpiar el rastro de posiciones
  isRunning = true;
}

// Función para sincronizar sliders con inputs numéricos
function syncSliderWithInput(slider, input) {
  slider.input(() => input.value(slider.value()));
  input.input(() => slider.value(input.value()));
}

// Función para restablecer valores predeterminados
function resetToDefault() {
  weight = defaultWeight;
  damping = defaultDamping;
  k = defaultK;
  initialVelocity = defaultVelocity;

  // Restablecer valores de sliders e inputs
  select("#weight").value(weight);
  select("#weightNumber").value(weight);
  select("#damping").value(damping);
  select("#dampingNumber").value(damping);
  select("#k").value(k);
  select("#kNumber").value(k);
  select("#initialVelocity").value(initialVelocity);
  select("#initialVelocityNumber").value(initialVelocity);

  // Restablecer rangos
  select("#maxWeight").value(defaultMaxWeight);
  select("#weight").attribute('max', defaultMaxWeight);
  select("#maxDamping").value(defaultMaxDamping);
  select("#damping").attribute('max', defaultMaxDamping);
  select("#maxK").value(defaultMaxK);
  select("#k").attribute('max', defaultMaxK);
  select("#maxVelocity").value(defaultMaxVelocity);
  select("#initialVelocity").attribute('max', defaultMaxVelocity);
}
