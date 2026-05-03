# HealthPrism

**Child care with digital precision.**

HealthPrism is a mobile application that transforms a smartphone into an advanced nutritional assessment tool for children. Using computer vision, physiological signal processing, and AI, it evaluates anemia and malnutrition risk in under 8 minutes — with no internet required.

Built for the **GNEC Hackathon 2026** — SDG 3: Health and Well-being.

---

## The Problem

In Bolivia and Peru, anemia affects 40% of children under 5. Clinical diagnosis requires blood samples, a laboratory, and a doctor — all barriers in rural communities. HealthPrism provides early detection using only the camera and microphone already in every family's smartphone.

## How It Works

1. **Capture** — Guided photos of conjunctiva, face, and hands
2. **Analyze** — MobileNetV2 ML models + physiological signal algorithms (PPG, breathing, perfusion)
3. **Report** — Risk profile with WHO-based clinical rules + AI recommendations via Groq llama-4

## Key Features

- Multi-signal evaluation: anemia, malnutrition, general physiological state
- 100% offline-first — works without internet
- Real PPG heart rate detection via rear camera flash
- Breathing rate detection via microphone
- Capillary refill perfusion test
- AI-enhanced recommendations when online (Groq llama-4)
- Patient history with local + Firebase cloud sync
- Available in English and Spanish

## Tech Stack

**Frontend:** React + Vite + TailwindCSS + Capacitor (Android/iOS)
**ML:** MobileNetV2 (Python/Keras) → TF.js (runs on device)
**Backend:** FastAPI + Groq llama-4 (Railway/Render)
**Database:** Firebase Firestore + Capacitor Preferences (offline)

## Running Locally

```bash
cd frontend
npm install
npm run dev
```

## Building the APK

```bash
cd frontend
npm run build
npx cap sync android
npx cap open android
# Build > Generate Signed Bundle/APK in Android Studio
```

## ML Training

```bash
cd ml_training
python -m venv venv && venv/Scripts/activate
pip install -r requirements.txt
python prepare_dataset.py
python train_conjunctiva.py
python train_palm.py
python export_tfjs.py
```

## SDG Impact

- **SDG 3** (Health and Well-being): Early detection of anemia and malnutrition in children
- **SDG 2** (Zero Hunger): Nutritional recommendations adapted to local foods in Bolivia/Peru
- **SDG 10** (Reduced Inequalities): Free tool accessible to rural families with no medical infrastructure

---

*HealthPrism is a screening tool, not a clinical diagnosis. Results should be validated by a health professional.*



HealthPrism — Documento completo del proyecto

Inspiración
En América Latina y África, la anemia y la desnutrición infantil siguen siendo crisis de salud pública silenciosas. En Bolivia, Perú y otras regiones con comunidades rurales dispersas, miles de niños crecen con deficiencias nutricionales que afectan su desarrollo cognitivo, físico e inmunológico de forma irreversible. El problema no es solo la enfermedad — es que nadie la detecta a tiempo.
El diagnóstico clínico de anemia requiere una muestra de sangre, un laboratorio, un médico y dinero. En zonas rurales del altiplano boliviano o peruano, cualquiera de esos cuatro requisitos puede ser una barrera insuperable. Las familias no tienen forma de saber si su hijo tiene anemia hasta que los síntomas son severos: fatiga extrema, palidez notoria, retraso en el crecimiento. Para entonces, el daño ya está hecho.
Las soluciones digitales existentes son escasas, fragmentadas y enfocadas únicamente en una condición. AnemiaGuard, el proyecto más cercano al nuestro, detecta anemia a partir de imágenes de la conjuntiva. Es un avance real, pero limitado: detecta una sola condición, usa una sola señal visual, no mide señales fisiológicas y no genera recomendaciones adaptadas al contexto de cada familia.
HealthPrism nace de una pregunta simple: ¿qué pasaría si el teléfono que ya tienen las familias pudiera funcionar como una herramienta básica de evaluación de salud? No un reemplazo del médico, sino un sistema de alerta temprana accesible, offline, gratuito y accionable.

¿Qué es HealthPrism?
HealthPrism es una aplicación móvil para Android e iOS que convierte el smartphone en un instrumento de evaluación nutricional y de salud básica para niños. Usando la cámara, el micrófono y datos simples ingresados por el usuario, la app analiza múltiples señales clínicas y genera un perfil de riesgo completo con recomendaciones nutricionales adaptadas al contexto familiar y regional.
La app evalúa tres riesgos principales: anemia, desnutrición y estado fisiológico general. Lo hace combinando visión por computadora, algoritmos de procesamiento de señales fisiológicas, reglas clínicas estructuradas e inteligencia artificial generativa cuando hay conexión a internet. Cuando no hay internet — que es el caso en la mayoría de comunidades rurales — la app funciona completamente de forma local, sin depender de ningún servidor externo.
HealthPrism no es un diagnóstico médico. Es una herramienta de detección de riesgos que ayuda a las familias a identificar señales de alerta tempranas y tomar decisiones informadas: mejorar la dieta, hacer seguimiento en el tiempo o buscar atención médica antes de que la condición se agrave.

El problema que resuelve
La anemia por deficiencia de hierro afecta al 40% de los niños menores de 5 años en Bolivia y supera el 30% en zonas rurales de Perú. La desnutrición crónica infantil alcanza cifras similares en comunidades indígenas y rurales de ambos países. Estas condiciones están directamente vinculadas al ODS 3 (Salud y Bienestar) y al ODS 2 (Hambre Cero), y representan uno de los mayores obstáculos para el desarrollo humano en la región.
El ciclo del problema es el siguiente: la familia no detecta la condición porque no tiene herramientas, el niño llega al sistema de salud cuando ya hay daño, el tratamiento es más costoso y menos efectivo, y el daño en desarrollo cognitivo es irreversible. La detección temprana rompe ese ciclo.
HealthPrism ataca específicamente el primer eslabón: la detección en casa, antes de que la condición se agrave, usando el único recurso que la mayoría de familias ya tiene — un smartphone.

Cómo funciona — Flujo completo de la app
La app guía al usuario a través de un chequeo estructurado de 10 pasos, similar a un examen clínico básico. Cada paso tiene instrucciones visuales claras para que cualquier persona pueda realizarlo sin conocimientos médicos. El proceso completo toma entre 5 y 8 minutos.
Paso 1 — Datos iniciales. El usuario ingresa la edad, peso y altura del niño, y selecciona su nivel de energía percibido. Con estos datos la app calcula el IMC, lo compara contra percentiles para la edad y detecta alertas básicas de bajo peso o talla baja.
Paso 2 — Análisis de rostro. El usuario toma una foto del rostro del niño siguiendo un overlay guiado. La app analiza el tono general de la piel, la presencia de ojeras y la apariencia general como señales de contexto que refuerzan o atenúan el perfil de riesgo.
Paso 3 — Análisis de conjuntiva. El usuario jala levemente el párpado inferior y toma una foto guiada. La conjuntiva palpebral es el indicador visual más confiable de anemia: en personas con niveles bajos de hemoglobina, la conjuntiva pierde su color rosado y se vuelve pálida. Un modelo de visión por computadora analiza el nivel de palidez y genera un score de 0 a 100.
Paso 4 — Análisis de mano. El usuario fotografía la palma y las uñas. La app analiza el tono de la palma, la palidez en el lecho ungueal y la perfusión visual general. Las uñas pálidas son un indicador secundario de anemia; la palma sin coloración rosada indica baja perfusión sanguínea.
Paso 5 — Test de perfusión automatizado. El usuario presiona el dedo índice contra la cámara durante 3 segundos y luego lo suelta. La app graba un video corto y mide automáticamente cuánto tiempo tarda en recuperarse el color normal del tejido. Un tiempo de recuperación mayor a 2 segundos indica baja perfusión, asociada con anemia y deshidratación. El proceso es completamente automatizado mediante análisis de video cuadro a cuadro.
Paso 6 — Frecuencia cardíaca (PPG). El usuario coloca el dedo índice sobre la cámara trasera con el flash activado. La luz ilumina el tejido y la cámara detecta las micro variaciones de color causadas por el flujo sanguíneo en cada latido. Un algoritmo calcula la frecuencia cardíaca en pulsaciones por minuto. Una frecuencia elevada en reposo es señal compensatoria de anemia severa.
Paso 7 — Frecuencia respiratoria. El usuario respira normalmente cerca del teléfono durante 15 segundos. La Web Audio API analiza el patrón sonoro y detecta los ciclos de inhalación y exhalación calculando las respiraciones por minuto. Una frecuencia respiratoria elevada en reposo es indicador de anemia severa, infección respiratoria o deshidratación.
Paso 8 — Síntomas finales. El usuario responde preguntas simples sobre nivel de apetito, frecuencia de fatiga, presencia de mareos y estado de ánimo general. Estas señales contextualizan los datos objetivos medidos en los pasos anteriores.
Paso 9 — Revisión completa. La app muestra un resumen de todos los datos recolectados. El usuario puede revisar y editar cualquier paso antes del análisis final, reduciendo errores por fotos mal tomadas o datos incorrectos.
Paso 10 — Análisis final con IA. El motor híbrido procesa todos los datos y genera el perfil de riesgo completo con recomendaciones.

El resultado — qué ve el usuario
El output está diseñado para ser claro, accionable y comprensible para cualquier persona sin formación médica. Incluye los siguientes elementos.
El estado general resume el resultado en una sola etiqueta: Estable, Vulnerable o Crítico. El perfil de riesgos muestra tres indicadores con nivel alto, medio o bajo para anemia, desnutrición y estado fisiológico. Los factores detectados explican qué señales llevaron al resultado, por ejemplo "palidez alta en conjuntiva y uñas", "frecuencia cardíaca elevada (98 BPM)", "energía baja reportada". El nivel de confianza refleja qué tan completos y claros fueron los datos recolectados. Las recomendaciones nutricionales están adaptadas al riesgo detectado y a los recursos disponibles en la región. La acción sugerida va desde "continúa monitoreando cada 15 días" hasta "busca atención médica hoy".
El modelo no toma decisiones aisladas, sino que combina múltiples señales débiles para construir una evaluación más robusta. Ninguna señal por sí sola determina el resultado — es la combinación de todas las que genera un perfil confiable.

Motor de inteligencia artificial
HealthPrism usa un sistema híbrido de tres capas que garantiza resultados útiles con o sin internet.
La primera capa es el modelo de visión por computadora. Una CNN ligera basada en MobileNetV2 fue entrenada en Python con Keras usando el dataset público "Eyes Defy Anemia" de Kaggle, complementado con datasets de imágenes de uñas y fotos propias tomadas en condiciones variables de luz y tono de piel. El modelo fue exportado a TensorFlow.js para correr directamente en el dispositivo sin internet.
La segunda capa son los algoritmos de señales fisiológicas. El algoritmo de PPG analiza la señal de color del video del dedo fotograma por fotograma, aplica un filtro de paso bajo para eliminar ruido y detecta los picos que corresponden a cada latido. El algoritmo de respiración usa la Web Audio API para detectar patrones rítmicos de la respiración. El test de perfusión analiza la recuperación del canal rojo en el video cuadro a cuadro. Todos estos algoritmos corren en JavaScript puro en el dispositivo sin dependencias externas.
La tercera capa es el motor de decisión que combina todos los scores usando reglas clínicas estructuradas basadas en criterios de la OMS para diagnóstico de anemia y desnutrición infantil, generando el perfil de riesgo final con su nivel de confianza.
Cuando hay internet disponible, el backend en FastAPI recibe el perfil completo del paciente incluyendo todos los scores, datos antropométricos, síntomas reportados e imágenes en formato base64. Este paquete completo se envía a la API de Groq usando el modelo llama-4, que tiene capacidad de análisis simultáneo de imágenes y texto. La IA genera recomendaciones personalizadas adaptadas a la región y los recursos disponibles de la familia.

Funcionamiento offline
El offline-first no es una característica opcional — es el núcleo de la propuesta de valor. Todo el procesamiento de señales, el análisis de imágenes, el motor de decisión y las recomendaciones básicas corren localmente en el dispositivo. La base de datos nutricional es un archivo JSON embebido en la app con cientos de combinaciones de alimentos clasificados por disponibilidad regional, contenido de hierro, proteínas, micronutrientes e interacciones de absorción.
El historial de pacientes se guarda localmente usando Capacitor Preferences. Cuando el dispositivo se conecta a internet, los datos se sincronizan automáticamente con Firebase Firestore, permitiendo respaldo y acceso desde otros dispositivos.
En términos de métricas clave: el chequeo completo toma menos de 8 minutos, funciona sin necesidad de internet y tiene costo cero por evaluación para el usuario final.

Safety & Limitations
HealthPrism es una herramienta de evaluación de riesgo, no un instrumento de diagnóstico clínico. Sus resultados no reemplazan en ningún caso la evaluación de un profesional de salud.
El sistema puede generar falsos positivos: detectar riesgo donde no existe, especialmente en condiciones de mala iluminación, tonos de piel muy oscuros o fotos mal tomadas. También puede generar falsos negativos en casos de condiciones leves o en etapa muy temprana. El nivel de confianza que muestra la app refleja parcialmente esta incertidumbre, pero no la elimina.
Cada resultado incluye de forma explícita la recomendación de consultar a un profesional de salud si el riesgo detectado es medio o alto. La app está diseñada para aumentar la probabilidad de que una familia busque atención médica a tiempo, no para reemplazar esa atención.

Validación
Durante el desarrollo se realizaron pruebas básicas con personas reales para validar el funcionamiento de cada módulo en condiciones reales de uso. Se documentaron los resultados del análisis visual comparando las predicciones del modelo contra evaluaciones observacionales simples, se verificó el funcionamiento del algoritmo PPG comparando los resultados con aplicaciones de referencia establecidas, y se validó el algoritmo de respiración cronometrando manualmente los ciclos respiratorios en paralelo con la medición de la app.
Esta validación no constituye un estudio clínico formal. Representa evidencia básica de funcionamiento en condiciones reales y sirve como base para futuras iteraciones con validación clínica rigurosa en colaboración con instituciones de salud.

Características adicionales
Historial de pacientes. La app permite gestionar múltiples perfiles de niños. Cada evaluación queda guardada con su fecha, resultado y recomendaciones, con gráficos simples que muestran la evolución del riesgo en el tiempo.
Guía visual en cada paso. Cada medición tiene un overlay animado que guía al usuario exactamente cómo posicionar el teléfono y dónde enfocar, reduciendo errores y mejorando la calidad de los datos.
Posibilidad de repetir mediciones. Si una foto queda mal tomada o una medición da un resultado inesperado, el usuario puede repetir ese paso específico sin reiniciar el chequeo completo.
Multilingual. La app soporta español e inglés desde el inicio, con estructura preparada para agregar quechua y aymara en versiones futuras dado el contexto de comunidades indígenas en Bolivia y Perú.

Escalabilidad y visión post-hackathon
HealthPrism está diseñado desde su arquitectura para escalar más allá de un proyecto individual. La primera línea de expansión son las organizaciones no gubernamentales y los programas de salud comunitaria: promotores de salud que visitan comunidades rurales podrían usar la app para evaluar decenas de niños por día y generar datos agregados sobre el estado nutricional de una comunidad entera.
La segunda línea es la integración con sistemas de salud pública. Los datos anonimizados recolectados por la app constituyen un dataset propio en crecimiento que mejora continuamente los modelos de ML y permite detectar patrones epidemiológicos a nivel regional. Gobiernos locales y ministerios de salud podrían usar esta información para focalizar intervenciones nutricionales donde más se necesitan.
La tercera línea es la expansión geográfica. El modelo es directamente aplicable a otras regiones de alta prevalencia de anemia y desnutrición infantil en África subsahariana y Asia del Sur, con adaptación del módulo nutricional a los alimentos y culturas locales.

Stack tecnológico completo
Para el frontend y la app móvil se usa React con Vite y TailwindCSS. Capacitor empaqueta el proyecto como APK para Android y app para iOS. TensorFlow.js corre el modelo de visión por computadora en el dispositivo. La Web Audio API y MediaDevices API manejan el micrófono y la cámara.
Para el backend se usa FastAPI con Python desplegado en Railway en el tier gratuito. Este backend recibe los datos del paciente cuando hay internet, llama a la API de Groq con llama-4 y devuelve recomendaciones enriquecidas a la app.
Para el entrenamiento del modelo ML se usa Python con Keras y TensorFlow, MobileNetV2 como arquitectura base y el converter de TensorFlow.js para exportar el modelo al formato que corre en el dispositivo.
Para la base de datos se usa Firebase Firestore para historial en la nube en el tier gratuito, Capacitor Preferences para storage local offline y archivos JSON embebidos para la base nutricional y las reglas clínicas.
Todo el stack es 100% gratuito para desarrollo y para el hackathon.

Diferencial competitivo
AnemiaGuard es el benchmark directo. Detecta anemia a partir de imágenes de la conjuntiva con un modelo entrenado en TypeScript — tuvieron que reentrenarlo en TypeScript porque tuvieron problemas exportando desde Python. HealthPrism entrena en Python correctamente y exporta a TF.js sin ese problema. Más importante, AnemiaGuard detecta una sola condición con una sola señal visual. HealthPrism evalúa tres riesgos usando cuatro zonas visuales más tres señales fisiológicas más datos antropométricos más síntomas reportados. La diferencia no es incremental — es de categoría.
La frase que resume el diferencial: HealthPrism turns a smartphone into a multi-signal early warning system for child health — accessible anywhere, even offline.

Plan de desarrollo — 10 fases
Fase 1 — Setup y estructura base (Días 1-2). Configurar React + Vite + TailwindCSS + Capacitor. Conectar Firebase y Railway desde el inicio. Objetivo: proyecto corriendo en navegador y en dispositivo Android real.
Fase 2 — Flujo de UI completo sin lógica (Días 3-5). Construir los 10 pasos con UI completa, overlays guiados, formularios y transiciones. Sin lógica real todavía — solo estructura visual y navegación. Al final la app debe verse como producto terminado.
Fase 3 — Integración de cámara y micrófono (Días 6-8). Integrar MediaDevices API para fotos y video. Implementar Web Audio API para respiración. Implementar algoritmo PPG para frecuencia cardíaca. Todos los datos crudos quedan almacenados en el estado de la app.
Fase 4 — Motor de reglas clínicas (Días 9-11). Implementar toda la lógica de evaluación con reglas hardcodeadas: IMC, percentiles, algoritmos de PPG y respiración, perfusión y combinación de señales para generar el perfil de riesgo. Este es el MVP core funcional.
Fase 5 — Base de datos local y offline (Días 12-13). Construir el JSON nutricional con alimentos por región, contenido de hierro y combinaciones de absorción. Implementar recomendaciones offline. Implementar Capacitor Preferences para historial local. App completamente funcional offline.
Fase 6 — Modelo ML de visión (Días 14-17). Entrenar CNN con MobileNetV2 en Python usando datasets de Kaggle. Exportar a TF.js. Integrar en la app para análisis de conjuntiva, uñas y palma. Fase de mayor riesgo técnico — si el modelo no da buenos resultados en el tiempo disponible, se mantienen las reglas hardcodeadas.
Fase 7 — Backend y Groq API (Días 18-19). Implementar endpoint FastAPI que recibe perfil completo con imágenes en base64. Integrar Groq llama-4 para recomendaciones enriquecidas. Implementar detección de conectividad en la app. Desplegar en Railway.
Fase 8 — Firebase e historial (Días 20-21). Implementar sincronización con Firestore. Construir pantalla de historial con perfiles de niños y evolución de evaluaciones en el tiempo. Sincronización automática cuando hay internet.
Fase 9 — Validación y ajustes (Días 22-23). Probar con personas reales. Documentar resultados. Ajustar pesos del motor de decisión basándose en resultados reales. Esta evidencia básica es lo que separa el proyecto de los que solo funcionan en condiciones perfectas de demo.
Fase 10 — Polish, APK final y Devpost (Días 24-21). Pulir UI, corregir bugs, optimizar rendimiento en gamas bajas. Generar APK firmado. Grabar video demo con flujo completo y caso real. Escribir Devpost completo incluyendo Safety & Limitations, validación y escalabilidad.