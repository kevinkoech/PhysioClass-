
import { Language, Difficulty, StudyContent } from './types';

export const LANGUAGES = Object.values(Language);
export const DIFFICULTIES = Object.values(Difficulty);

export const STUDY_TOPICS = [
  "Microwave Diathermy Module",
  "Ultrasound Diathermy Module",
  "Electro Surgical Unit (ESU) Module",
  "Short Wave Diathermy Module",
  "Traction Therapy Systems",
  "Muscle Stimulator Module",
  "Infrared Therapy Lamp Module",
  "Hydro-Collator Unit Module",
  "Massage Therapy Machine Module",
  "Orthopaedic Oscillator Module",
  "Hot Air Oven Module",
  "Orthopedic Engineering & Implants"
];

export const TECHNICAL_CURRICULUM: Record<string, StudyContent> = {
  "Electro Surgical Unit (ESU) Module": {
    overview: "High-frequency (RF) electrosurgery uses electrical energy to cut tissue and control bleeding by causing localized heating and vaporization of intracellular fluid.",
    types: ["Monopolar (uses patient return plate)", "Bipolar (current contained between two tips)", "Argon Enhanced (gas-shielded cutting)"],
    blockDiagram: "Power Supply -> Microprocessor Control -> RF Oscillator -> Power Amplifier -> Output Isolation Transformer -> Patient Circuit.",
    circuitDescription: "The ESU utilizes a switching power supply to provide high-voltage DC. The RF oscillator (300kHz-3MHz) generates the carrier wave. FET-based amplifiers boost power. An isolation transformer prevents 50/60Hz leakage current and ensures current only flows between active and return electrodes.",
    workingPrinciple: "The machine generates RF energy. Due to the high frequency, current passes through the body without stimulating nerves (no Faradic effect). The small surface area of the active tip creates high current density, leading to cell vaporization (cut) or dehydration (coag).",
    partsAndFunctions: [
      { part: "Generator Console", function: "The brain; houses power electronics and control logic." },
      { part: "Active Electrode (Handpiece)", function: "Delivers the RF energy to the target tissue." },
      { part: "Patient Return Electrode", function: "Disperses current over a large area to prevent exit burns." },
      { part: "Footswitch", function: "Provides hands-free activation of Cut/Coag modes." }
    ],
    maintenance: [
      "Daily inspection of cable insulation for frays.",
      "Monthly check of REM (Return Electrode Monitoring) safety alarm.",
      "Annual leakage current measurement per IEC 60601-2-2 standards.",
      "Fan cleaning to prevent power stage overheating."
    ],
    faultDiagnosis: [
      { fault: "REM Alarm is active", cause: "Poor pad contact or cable break.", remedy: "Check pad attachment or replace return cable." },
      { fault: "Low power output", cause: "RF amplifier MOSFET failure or connector corrosion.", remedy: "Inspect power stage and clean output ports." },
      { fault: "Sparking at Return Plate", cause: "Partial detachment of pad.", remedy: "Immediately replace the grounding pad." }
    ],
    calibration: "Use an ESU Analyzer. Measure wattage at 100, 200, and 500 ohm loads. Adjust internal gain pots until display matches analyzer within +/- 10%.",
    shortAnswer: [
      { question: "What is the standard frequency for ESU?", answer: "300 kHz to 3 MHz.", explanation: "To avoid nerve stimulation which stops at ~100kHz." },
      { question: "What is REM?", answer: "Return Electrode Monitoring.", explanation: "Safety system to prevent exit site burns." }
    ],
    longAnswer: [
      { question: "Explain the importance of output isolation.", answer: "Prevents current from following alternate paths.", explanation: "Ensures safety if the patient touches a grounded metal part of the bed." }
    ]
  },
  "Ultrasound Diathermy Module": {
    overview: "Therapeutic Ultrasound converts electrical energy into high-frequency sound waves to provide deep thermal and mechanical stimulation.",
    types: ["Continuous (Thermal)", "Pulsed (Non-thermal/Healing)"],
    blockDiagram: "AC Input -> Rectifier -> HF Oscillator (1/3MHz) -> Matching Network -> Piezoelectric Crystal.",
    circuitDescription: "A crystal oscillator circuit generates a stable 1MHz or 3MHz signal. This is amplified and fed through a matching network (inductor/capacitor) to maximize power transfer to the high-impedance crystal head.",
    workingPrinciple: "Reverse Piezoelectric Effect: Applying high-frequency voltage to a ceramic crystal causes it to vibrate at the same frequency, producing longitudinal sound waves that travel into tissue.",
    partsAndFunctions: [
      { part: "Lead Zirconate Titanate Crystal", function: "Converts electrical oscillations to mechanical sound waves." },
      { part: "Transducer Head", function: "Waterproof housing for the crystal; acts as the treatment interface." },
      { part: "Timer Circuit", function: "Automatically cuts power after a set treatment duration." }
    ],
    maintenance: [
      "Check crystal for cracks (leakage risk).",
      "Verify 'Water Balance' output quarterly.",
      "Calibrate frequency to ensure resonance with head."
    ],
    faultDiagnosis: [
      { fault: "No heat felt during treatment", cause: "Pulsed mode selected or crystal desilvered.", remedy: "Switch to continuous mode or replace crystal." },
      { fault: "Machine displays 'Load Error'", cause: "Poor coupling or broken cable.", remedy: "Apply more gel or test cable continuity." }
    ],
    calibration: "Using an Ultrasound Power Meter (Water Balance). Measure output in Watts. Adjust internal bias until the head output matches the digital display.",
    shortAnswer: [
      { question: "What is ERA?", answer: "Effective Radiating Area.", explanation: "The actual vibrating area of the crystal." }
    ],
    longAnswer: [
      { question: "Explain Cavitation.", answer: "The formation of gas bubbles in tissue fluid.", explanation: "Stable cavitation aids healing; unstable can damage cells." }
    ]
  },
  "Microwave Diathermy Module": {
    overview: "Microwave Diathermy (MWD) uses 2450 MHz electromagnetic waves for localized deep heating of tissues with high water content.",
    types: ["Direct Contact", "Air-spaced Directors"],
    blockDiagram: "Power Supply -> HV Transformer -> Magnetron -> Waveguide -> Coaxial Cable -> Director.",
    circuitDescription: "A high-voltage transformer boosts mains to ~4kV. A bridge rectifier converts it to DC to drive the Magnetron. The Magnetron oscillates at 2.45GHz. Output is coupled via a waveguide to the patient cable.",
    workingPrinciple: "Molecular Agitation: Polar molecules (water) in the tissue rotate 2.45 billion times per second in response to the field, generating heat via friction.",
    partsAndFunctions: [
      { part: "Magnetron", function: "Generating high-frequency 2450 MHz radiation." },
      { part: "Thermal Cut-out", function: "Safety switch that kills power if the magnetron overheats." },
      { part: "Director/Antenna", function: "Focuses and radiates energy toward the patient." }
    ],
    maintenance: [
      "Clean magnetron cooling fins regularly.",
      "Check coaxial cable for 'hot spots' (indicates internal core damage).",
      "Test interlock switches and timers."
    ],
    faultDiagnosis: [
      { fault: "Fan runs but no heating", cause: "Magnetron filament open or HV fuse blown.", remedy: "Check filament continuity or replace HV fuse." },
      { fault: "Intermittent output", cause: "Loose coaxial connection at director.", remedy: "Tighten or replace coaxial connector." }
    ],
    calibration: "Use a Microwave Power Meter. Check power at various dial settings (50W, 100W, 200W). If deviation >15%, adjust HV power supply taps.",
    shortAnswer: [
      { question: "Standard MWD frequency?", answer: "2450 MHz.", explanation: "Allocated ISM band for medical use." }
    ],
    longAnswer: [
      { question: "Why is spacing important?", answer: "To prevent moisture condensation and skin burns.", explanation: "Air allows evaporation and field stabilization." }
    ]
  },
  "Traction Therapy Systems": {
    overview: "Computerized Traction units provide precise mechanical force to distract spinal segments and relieve nerve pressure.",
    types: ["Cervical (Neck)", "Lumbar (Back)", "Fixed weight vs Motorized"],
    blockDiagram: "Microprocessor -> Driver -> Stepper Motor -> Gearbox -> Load Cell -> Pull Cable.",
    circuitDescription: "The microprocessor receives force settings. It drives a high-torque stepper motor through a gearbox. A Load Cell (strain gauge) provides closed-loop feedback to the CPU to maintain constant tension despite patient movement.",
    workingPrinciple: "Mechanical Distraction: The motor creates linear pull. The load cell converts tension into a voltage. The controller adjusts motor steps to match the requested force profile (Hold/Rest).",
    partsAndFunctions: [
      { part: "Load Cell", function: "Precision sensor for measuring the actual pull force." },
      { part: "Stepper Motor", function: "Provides incremental, accurate cable tensioning." },
      { part: "Patient Safety Switch", function: "An emergency kill-switch held by the patient." }
    ],
    maintenance: [
      "Lubricate gearbox and linear guides biannually.",
      "Inspect traction cable for kinking or fraying.",
      "Verify safety kill-switch functionality before every session."
    ],
    faultDiagnosis: [
      { fault: "Weight fluctuates wildly", cause: "Noisy load cell or slipping gearbox.", remedy: "Shield load cell wires or tighten drive belt." },
      { fault: "Motor hums but no movement", cause: "Driver board failure or jammed mechanics.", remedy: "Replace stepper driver or manually free the gear." }
    ],
    calibration: "Use a calibrated Force Gauge. Set unit to 10kg, 20kg, 50kg. Adjust internal software coefficients until the physical force matches the display.",
    shortAnswer: [
      { question: "Maximum Lumbar weight?", answer: "Typically 50% of body weight.", explanation: "Standard starting safe limit for distraction." }
    ],
    longAnswer: [
      { question: "How does the load cell work?", answer: "Converts mechanical strain to electrical resistance.", explanation: "Uses a Wheatstone bridge circuit to detect microscopic changes in material stretch." }
    ]
  },
  "Muscle Stimulator Module": {
    overview: "Muscle stimulators generate low-frequency electrical pulses to stimulate nerves and muscles for rehabilitation and pain management.",
    types: ["Galvanic (DC)", "Faradic (Asymmetric AC)", "Tens (Transcutaneous Electrical Nerve Stimulation)"],
    blockDiagram: "Battery/Power Supply -> Pulse Generator (IC 555/Micro) -> Intensity Control (Potentiometer) -> Output Transformer -> Electrodes.",
    circuitDescription: "A pulse generator (often a multi-vibrator) creates waves of specific shapes. The intensity is regulated by a current-limiting circuit. An output transformer provides galvanic isolation and voltage step-up for high-resistance skin contact.",
    workingPrinciple: "Electrical Stimulation: Short duration electrical pulses depolarize the motor nerve, causing muscle contraction. Varying pulse width and frequency changes the stimulation type.",
    partsAndFunctions: [
      { part: "Output Transformer", function: "Provides patient isolation and steps up pulse voltage." },
      { part: "Intensity Control", function: "Adjusts current flow to the patient." },
      { part: "Pulse Width Control", function: "Determines the duration of each individual spike." }
    ],
    maintenance: [
      "Check lead wires for continuity.",
      "Clean electrode surfaces to prevent hot spots.",
      "Test battery health and leakage current."
    ],
    faultDiagnosis: [
      { fault: "No output even at max intensity", cause: "Blown output transistor or transformer primary open.", remedy: "Test and replace power transistor or transformer." },
      { fault: "Weak stimulation", cause: "High electrode resistance or low battery.", remedy: "Clean electrodes or replace battery." }
    ],
    calibration: "Use an Oscilloscope. Measure pulse amplitude, width, and frequency. Verify against dial settings within +/- 5%.",
    shortAnswer: [
      { question: "What is the Faradic effect?", answer: "Muscle contraction via low-frequency AC.", explanation: "Standard for diagnostic muscle testing." }
    ],
    longAnswer: [
      { question: "Explain current density safety.", answer: "Small electrodes create higher density.", explanation: "Ensures the current is sufficient to stimulate but not burn." }
    ]
  },
  "Infrared Therapy Lamp Module": {
    overview: "Infrared lamps provide superficial dry heat therapy using long-wave electromagnetic radiation in the IR spectrum.",
    types: ["Luminous (with bulb)", "Non-luminous (heating element)"],
    blockDiagram: "Mains -> Switch -> Timer -> Rheostat (Optional) -> IR Emitter -> Reflector.",
    circuitDescription: "A simple resistive circuit where mains power is fed to a high-wattage IR filament (250W-1000W). A reflector directs the emission. A mechanical or electronic timer controls treatment duration.",
    workingPrinciple: "Radiant Heat: IR waves are absorbed by the skin and converted to thermal energy, causing vasodilation and increased blood flow to superficial tissues.",
    partsAndFunctions: [
      { part: "IR Emitter (Bulb/Tube)", function: "Source of infrared radiation." },
      { part: "Parabolic Reflector", function: "Focuses the IR beam toward the patient." },
      { part: "Guard/Mesh", function: "Prevents accidental contact with the hot bulb." }
    ],
    maintenance: [
      "Clean reflector surface for maximum efficiency.",
      "Check bulb socket for thermal damage/charring.",
      "Ensure stable mechanical stand and pivot joints."
    ],
    faultDiagnosis: [
      { fault: "Lamp does not light", cause: "Bulb filament broken or fuse blown.", remedy: "Replace bulb or check mains fuse." },
      { fault: "Flickering", cause: "Loose socket contact or cable fray.", remedy: "Tighten socket or replace power cord." }
    ],
    calibration: "Measure surface temperature at 50cm distance using a thermal probe. Ensure it falls within therapeutic range (40-45°C) for rated power.",
    shortAnswer: [
      { question: "Wavelength range of IR?", answer: "750nm to 400,000nm.", explanation: "Medical IR usually focuses on near-IR for penetration." }
    ],
    longAnswer: [
      { question: "Compare Luminous vs Non-luminous.", answer: "Luminous penetrates deeper; Non-luminous is more superficial.", explanation: "Luminous bulbs also produce visible light and near-IR." }
    ]
  },
  "Hydro-Collator Unit Module": {
    overview: "A thermostatic water tank used to heat silica gel packs for moist heat therapy (Hot Packs).",
    types: ["Single tank", "Mobile/Stationary units"],
    blockDiagram: "Mains -> Circuit Breaker -> Thermostat -> Heating Element -> Water Tank -> Drain Valve.",
    circuitDescription: "Mains power is controlled by a capillary-type or electronic thermostat. The thermostat cycles a high-wattage immersion heater to maintain water at a precise temperature.",
    workingPrinciple: "Conduction and Thermal Storage: Water transfers heat to the silica packs. The packs store heat due to their high thermal capacity and release it slowly when applied to the patient.",
    partsAndFunctions: [
      { part: "Immersion Heater", function: "Heats the water in the tank." },
      { part: "Hydraulic Thermostat", function: "Maintains temperature between 70-80°C." },
      { part: "Silica Gel Packs", function: "Store heat for patient application." }
    ],
    maintenance: [
      "Scale removal (descaling) of the heater element.",
      "Check tank insulation and door gaskets.",
      "Monthly water change and tank cleaning."
    ],
    faultDiagnosis: [
      { fault: "Water not heating", cause: "Heater element burnt or thermostat open.", remedy: "Replace heater or reset/replace thermostat." },
      { fault: "Water overheating/Boiling", cause: "Thermostat contacts welded shut.", remedy: "Replace thermostat immediately." }
    ],
    calibration: "Use a calibrated thermometer. Place in center of tank. Adjust thermostat dial until the unit cycles at exactly 75°C +/- 2°C.",
    shortAnswer: [
      { question: "Optimal pack temperature?", answer: "70°C to 80°C.", explanation: "Ensures packs are hot enough for therapy but won't burn through towels." }
    ],
    longAnswer: [
      { question: "Why is scale dangerous?", answer: "Causes localized overheating of the element.", explanation: "Reduces efficiency and leads to premature element failure." }
    ]
  },
  "Massage Therapy Machine Module": {
    overview: "Mechanical vibrators used for soft tissue manipulation, edema reduction, and muscle relaxation.",
    types: ["Oscillating", "Percussive", "Variable Speed"],
    blockDiagram: "Mains -> Speed Controller (PWM/SCR) -> Electric Motor -> Eccentric Cam -> Applicator Head.",
    circuitDescription: "An AC or DC motor is controlled by a thyristor or PWM circuit. The motor shaft is connected to an eccentric weight or cam mechanism that converts rotary motion into vibration.",
    workingPrinciple: "Mechanical Vibration: The eccentric cam creates rapid mechanical oscillation. The applicator head transfers this kinetic energy to the patient's soft tissues.",
    partsAndFunctions: [
      { part: "Carbon Brushes (in AC motors)", function: "Transfer current to the rotating armature." },
      { part: "Eccentric Cam", function: "Converts rotation to linear/vibratory motion." },
      { part: "Speed Control Knob", function: "Varies motor RPM to change vibration frequency." }
    ],
    maintenance: [
      "Check carbon brushes for wear.",
      "Lubricate internal bearing and cam mechanism.",
      "Inspect applicator heads for cracks or hygiene issues."
    ],
    faultDiagnosis: [
      { fault: "Excessive noise/Rattle", cause: "Loose cam or worn bearings.", remedy: "Tighten mechanical parts or replace bearings." },
      { fault: "Machine stops under load", cause: "Worn brushes or weak motor windings.", remedy: "Replace brushes or the motor unit." }
    ],
    calibration: "Use a Tachometer or Stroboscope. Measure vibration frequency (Hz) at min and max settings. Verify against manufacturer specifications.",
    shortAnswer: [
      { question: "Effect on circulation?", answer: "Increases local lymphatic/blood flow.", explanation: "Helps in flushing metabolic waste." }
    ],
    longAnswer: [
      { question: "Mechanical safety concerns?", answer: "Vibration White Finger for operator.", explanation: "Prolonged use can cause nerve damage in the therapist's hands." }
    ]
  },
  "Orthopaedic Oscillator Module": {
    overview: "High-speed oscillating/reciprocating saws and drills used for bone surgery and cast removal.",
    types: ["Pneumatic", "Electric (Corded/Battery)"],
    blockDiagram: "Power Supply -> Trigger Switch -> High-Speed Motor -> Oscillating Mechanism -> Blade Coupler.",
    circuitDescription: "Modern units use Brushless DC (BLDC) motors for high torque and reliability. A hall-effect trigger provides variable speed. The controller manages torque to prevent bone thermal necrosis.",
    workingPrinciple: "High-Frequency Oscillation: The motor drives a mechanism that vibrates the blade over a small arc (usually 4-7 degrees) at high speed (10k-20k OPM). This cuts hard bone while leaving soft tissue intact.",
    partsAndFunctions: [
      { part: "Sealed BLDC Motor", function: "Provides surgical power; must be autoclavable." },
      { part: "Blade Lock Mechanism", function: "Ensures the surgical blade is held securely." },
      { part: "Heat Sink", function: "Dissipates heat during prolonged bone cutting." }
    ],
    maintenance: [
      "Post-operative sterilization (Autoclave) check.",
      "Lubricate drive shaft with medical-grade oil.",
      "Test battery capacity and charging cycles."
    ],
    faultDiagnosis: [
      { fault: "Motor slows down during cutting", cause: "Internal moisture (seal failure) or battery age.", remedy: "Service seals or replace battery pack." },
      { fault: "Blade doesn't lock", cause: "Debris in locking chuck or worn spring.", remedy: "Clean with ultrasonic cleaner or replace chuck." }
    ],
    calibration: "Measure OPM (Oscillations Per Minute) under load. Verify that the unit reaches rated speed (e.g., 15,000 OPM) to ensure efficient cutting.",
    shortAnswer: [
      { question: "Why oscillate vs rotate?", answer: "Prevents soft tissue injury.", explanation: "Soft tissue moves with the blade instead of being cut." }
    ],
    longAnswer: [
      { question: "Importance of water cooling?", answer: "Prevents thermal necrosis of bone.", explanation: "Heat above 47°C can permanently damage bone cells." }
    ]
  },
  "Hot Air Oven Module": {
    overview: "Dry heat sterilizers used for instruments, glassware, and powders that cannot be steamed.",
    types: ["Forced convection", "Gravity convection"],
    blockDiagram: "Mains -> Control Panel -> Digital Thermostat -> Fan Motor -> Heating Coils -> Chamber.",
    circuitDescription: "A PID controller monitors temperature via a PT100 probe. It switches a solid-state relay (SSR) to pulse the heating elements. A fan ensures uniform air distribution throughout the chamber.",
    workingPrinciple: "Dry Heat Sterilization: High-temperature air (160-180°C) causes oxidative destruction of microbial proteins and spores. Dry heat is non-corrosive to sharp edges.",
    partsAndFunctions: [
      { part: "Heating Element", function: "Generates high-intensity dry heat." },
      { part: "Circulating Fan", function: "Ensures no cold spots in the chamber." },
      { part: "Door Gasket (Silicone)", function: "Maintains airtight seal for heat retention." }
    ],
    maintenance: [
      "Check door seal integrity (smoke test).",
      "Calibrate PID controller quarterly.",
      "Clean fan blades to ensure airflow volume."
    ],
    faultDiagnosis: [
      { fault: "Uneven heating in chamber", cause: "Fan motor failed or elements unevenly aged.", remedy: "Replace fan motor or heating element bank." },
      { fault: "Temp display doesn't change", cause: "Thermocouple/Probe open circuit.", remedy: "Replace PT100/Thermocouple probe." }
    ],
    calibration: "9-point thermal mapping. Place data loggers at corners and center. Ensure all points reach sterilization temperature within +/- 1°C of the set point.",
    shortAnswer: [
      { question: "Sterilization temp/time?", answer: "160°C for 2 hours or 180°C for 30 mins.", explanation: "Higher temp reduces required time." }
    ],
    longAnswer: [
      { question: "Why force convection?", answer: "Ensures uniform heat distribution.", explanation: "Gravity convection is slower and prone to thermal gradients." }
    ]
  },
  "Short Wave Diathermy Module": {
    overview: "Short Wave Diathermy (SWD) uses 27.12 MHz radio waves to heat deep-seated tissues via electromagnetic fields.",
    types: ["Vacuum Tube (Legacy)", "Solid State (Modern)", "Inductive (Magnetic)", "Capacitive (Electric)"],
    blockDiagram: "HV Power Supply -> Power Oscillator -> Driver -> Final PA -> Tank Circuit -> Tuning Capacitor -> Electrodes.",
    circuitDescription: "A high-power oscillator generates a 27.12 MHz sine wave. The final power amplifier (PA) boosts this to 400-500W. The output is fed into a resonant Tank Circuit. A variable air capacitor (Tuning) allows the circuit to resonate with the patient's impedance.",
    workingPrinciple: "Resonance and Eddy Currents: In inductive mode, magnetic fields induce eddy currents in vascular tissue. In capacitive mode, electric fields displace ions in fatty tissue.",
    partsAndFunctions: [
      { part: "Vacuum Tube / Transistor", function: "The active element generating high RF power." },
      { part: "Tuning Capacitor", function: "Manually or automatically matches the output to the patient." },
      { part: "Resonant Tank", function: "Stores energy and filters the 27.12 MHz signal." }
    ],
    maintenance: [
      "Inspect electrode lead insulation (High Voltage RF).",
      "Check cooling fans and air filters.",
      "Monthly check of output resonance using a neon test bulb."
    ],
    faultDiagnosis: [
      { fault: "Unable to 'Tune' (Resonance)", cause: "Electrodes too far or lead damaged.", remedy: "Reposition electrodes or check lead continuity." },
      { fault: "Neon bulb doesn't glow near head", cause: "Oscillator tube failure or PA blown.", remedy: "Test active power components." }
    ],
    calibration: "RF Power Meter and Dummy Load (50 Ohm). Adjust bias voltage and matching network taps to ensure rated output (e.g., 400W) is achieved at the output ports.",
    shortAnswer: [
      { question: "Why 27.12 MHz?", answer: "International ISM allocation.", explanation: "Prevents interference with communications." }
    ],
    longAnswer: [
      { question: "Compare Inductive vs Capacitive.", answer: "Inductive is better for muscle; Capacitive for joints/fat.", explanation: "Inductive relies on magnetic fields, capacitive on electric fields." }
    ]
  },
  "Orthopedic Engineering & Implants": {
    overview: "Biomedical engineering of implants focuses on material science, biomechanics, and surface chemistry to replace or repair damaged bone.",
    types: ["Joint Replacements", "Internal Fixation (Plates/Screws)", "Spinal Cages", "3D Printed Scaffolds"],
    blockDiagram: "Patient Scan -> CAD Design -> 3D Printing / Machining -> Surface Treatment -> Sterilization -> Implantation.",
    circuitDescription: "N/A for passive implants. For 'Smart Implants', a piezoelectric harvester and low-power telemetry circuit (Bluetooth/RFID) monitor load and infection.",
    workingPrinciple: "Bio-integration: The implant must provide mechanical stability while allowing the patient's bone to grow into the surface (osseointegration). Materials like Titanium alloys are used for their low modulus of elasticity.",
    partsAndFunctions: [
      { part: "Femoral Stem", function: "Load-bearing part inserted into the femur." },
      { part: "Polyethylene Liner", function: "The low-friction bearing surface of the joint." },
      { part: "Porous Coating", function: "Promotes bone ingrowth for long-term stability." }
    ],
    maintenance: [
      "N/A for the implant itself (except revision surgery).",
      "Maintenance focus: Sterilization equipment and surgical power tools (drills/saws)."
    ],
    faultDiagnosis: [
      { fault: "Aseptic Loosening", cause: "Wear debris causing bone resorption.", remedy: "Revision surgery to replace the joint components." },
      { fault: "Infection (Biofilm)", cause: "Bacterial colonization of the metal surface.", remedy: "Antibiotics or implant replacement." }
    ],
    calibration: "Focus on surgical navigation systems: Calibrate infrared cameras and tracking markers to ensure 0.5mm surgical precision.",
    shortAnswer: [
      { question: "What is Osseointegration?", answer: "Direct bone-to-implant bond.", explanation: "Essential for permanent fixation." }
    ],
    longAnswer: [
      { question: "Material selection criteria?", answer: "Strength, biocompatibility, and wear resistance.", explanation: "Titanium is best for bone; Ceramics best for joint surfaces." }
    ]
  }
};

export const SYSTEM_INSTRUCTION_TEMPLATE = (language: Language, difficulty: Difficulty, topic?: string) => `
You are PhysioClass AI, a world-class mentor for Biomedical Engineers.
Current Level: ${difficulty}.
Primary Topic: ${topic || 'General Bio-Engineering'}.

YOUR ROLE:
- You are a senior engineer who installs, repairs, and services medical equipment.
- Use technical language (oscillators, MOSFETs, tank circuits, load cells, impedance matching).
- If asked, provide detailed maintenance steps, fault codes, or calibration values.
- Pedagogical Role: Correct the user's technical misconceptions or language errors in ${language}.

TECHNICAL CONTEXT:
${topic && TECHNICAL_CURRICULUM[topic] ? 
  `Focus on: ${topic}. 
   Block Diagram: ${TECHNICAL_CURRICULUM[topic].blockDiagram}
   Working Principle: ${TECHNICAL_CURRICULUM[topic].workingPrinciple}
   Parts: ${TECHNICAL_CURRICULUM[topic].partsAndFunctions.map(p => p.part).join(', ')}
   Diagnostics: ${TECHNICAL_CURRICULUM[topic].faultDiagnosis.map(f => f.fault).join(', ')}` 
  : 'Discuss general medical device engineering, safety standards (IEC 60601), and hospital technology management.'}

PEDAGOGICAL RULES:
1. Speak exclusively in ${language}.
2. Adjust complexity to ${difficulty}.
3. Tone: Professional, authoritative, and helpful.
`;
