# 🎮 ProbGame
### Plataforma educativa para el análisis de probabilidades en videojuegos

**Tema:** Simulación de experimentos discretos y contraste con probabilidades exactas.

**Videojuegos analizados:** Genshin Impact y Honkai: Star Rail.

**Tecnologías:** HTML5, CSS3, JavaScript y Python como herramienta auxiliar.

**Modalidad:** Página web educativa.

---

# 1. Presentación de ProbGame

## 1.1. ¿Qué es ProbGame?

ProbGame es una aplicación web educativa que desarrollamos con el propósito de estudiar la relación entre las probabilidades de obtención de recompensas anunciadas en videojuegos y las frecuencias observadas en registros históricos de aperturas.

Nuestro proyecto se centra en dos videojuegos que utilizan sistemas de recompensas aleatorias:

- **Genshin Impact**
- **Honkai: Star Rail**

Estos videojuegos incorporan mecanismos denominados *gacha*, mediante los cuales los jugadores realizan intentos para obtener personajes, armas u otros objetos de diferentes niveles de rareza.

Desde una perspectiva matemática, estos mecanismos permiten estudiar experimentos discretos, frecuencias relativas, distribuciones de probabilidad, incertidumbre estadística y simulaciones computacionales.

A través de ProbGame, buscamos convertir estos conceptos en una experiencia interactiva, comprensible y aplicable a situaciones relacionadas con los videojuegos.

## 1.2. Problema que abordamos

Las probabilidades de obtención de recompensas pueden resultar difíciles de interpretar cuando se comparan con los resultados individuales de los jugadores.

Por ejemplo, una recompensa con una probabilidad de referencia del 1,60 % no necesariamente aparecerá exactamente 16 veces en cada conjunto de 1 000 aperturas.

La variabilidad aleatoria, el tamaño de la muestra y los mecanismos de garantía influyen en los resultados.

Por ello, planteamos la siguiente pregunta:

**¿En qué medida las frecuencias observadas en historiales de aperturas se aproximan a las probabilidades de referencia y cómo podemos representar matemáticamente sus diferencias?**

ProbGame nos permite explorar esta pregunta mediante cálculos estadísticos y simulaciones educativas.

## 1.3. Alcance del proyecto

Nuestra aplicación permite analizar conjuntos de datos históricos, incorporar archivos CSV personales y comparar frecuencias observadas con probabilidades de referencia.

No desarrollamos una herramienta destinada a demostrar fraudes o certificar la justicia de un videojuego.

Nuestro objetivo es **estudiar experimentos discretos y mostrar las posibilidades y limitaciones del análisis probabilístico**.

---

# 2. Objetivos del proyecto

## 2.1. Objetivo general

Desarrollar una aplicación web educativa que permita analizar registros históricos de obtención de recompensas en videojuegos, comparar frecuencias observadas con probabilidades de referencia y representar la variabilidad de experimentos discretos mediante herramientas estadísticas y simulaciones computacionales.

## 2.2. Objetivos específicos

**Objetivo específico 1.**

Organizar y procesar registros históricos de aperturas correspondientes a Genshin Impact y Honkai: Star Rail, clasificándolos según el videojuego, tipo de banner y rareza de las recompensas.

**Objetivo específico 2.**

Implementar procedimientos matemáticos y estadísticos para calcular frecuencias relativas, comparar probabilidades e interpretar intervalos de confianza, considerando las características y limitaciones de los datos.

**Objetivo específico 3.**

Desarrollar una interfaz web interactiva que permita visualizar resultados, importar archivos CSV personales y ejecutar simulaciones Monte Carlo como complemento educativo del análisis.

---

# 3. Videojuegos y mecanismos analizados

Seleccionamos Genshin Impact y Honkai: Star Rail porque ambos utilizan sistemas de recompensas aleatorias con categorías diferenciadas, tasas de referencia y mecanismos de garantía.

Además, encontramos registros históricos publicados que permiten desarrollar análisis utilizando observaciones documentadas, en lugar de depender exclusivamente de datos generados artificialmente.

## 3.1. Genshin Impact

Genshin Impact es un videojuego desarrollado por HoYoverse que utiliza un sistema de deseos o *wishes* para obtener personajes y armas.

En nuestro conjunto de datos identificamos cuatro categorías:

| Banner | Aperturas registradas |
|---|---:|
| Personajes promocionales | 3 303 |
| Armas promocionales | 1 037 |
| Banner permanente | 870 |
| Principiantes | 40 |
| **Total** | **5 250** |

Los registros nos permiten estudiar la distribución de rarezas y calcular frecuencias observadas por banner.

Las diferentes modalidades pueden tener reglas de obtención y garantías distintas. Por ello, evitamos asumir que todas comparten un único modelo probabilístico.

## 3.2. Honkai: Star Rail

Honkai: Star Rail es otro videojuego desarrollado por HoYoverse que utiliza un sistema de *warps* para obtener personajes y conos de luz.

En los datos utilizados por ProbGame identificamos seis categorías:

| Banner | Aperturas registradas |
|---|---:|
| Personajes promocionales | 2 439 |
| Banner permanente | 702 |
| Conos de luz promocionales | 654 |
| Personajes de colaboración | 192 |
| Conos de luz de colaboración | 66 |
| Principiantes | 50 |
| **Total** | **4 103** |

Estos valores representan la distribución de los registros contenidos en el conjunto histórico utilizado, no el número total de aperturas realizadas por todos los jugadores del videojuego.

## 3.3. Categorías de recompensas

En ambos videojuegos trabajamos principalmente con recompensas de:

- Tres estrellas.
- Cuatro estrellas.
- Cinco estrellas.

Cada apertura se clasifica de acuerdo con su nivel de rareza.

La aplicación permite seleccionar una categoría de interés y calcular cuántas aperturas cumplen esa condición.

## 3.4. Sistemas de garantía (*pity*)

Los sistemas *pity* son mecanismos que modifican las condiciones de obtención de recompensas en función del historial de intentos.

En consecuencia, no siempre resulta adecuado representar todas las aperturas como ensayos independientes con una probabilidad constante.

Distinguimos dos conceptos fundamentales:

**Probabilidad base:** tasa inicial anunciada para una categoría de recompensa, antes de considerar los efectos de determinados mecanismos de garantía.

**Probabilidad consolidada:** tasa global de referencia que incorpora el efecto de las garantías bajo las condiciones establecidas por el sistema.

Esta distinción es importante porque una tasa consolidada no equivale a afirmar que cada apertura tenga exactamente esa misma probabilidad.

---

# 4. Procedencia y tratamiento de los datos

## 4.1. Fuente original

Para desarrollar ProbGame utilizamos archivos históricos publicados en el repositorio:

**noviardhana/history_gi**

Repositorio original:

https://github.com/noviardhana/history_gi

El repositorio reúne y procesa historiales relacionados con Genshin Impact y Honkai: Star Rail.

Reconocemos expresamente al responsable del repositorio como fuente de los conjuntos de datos utilizados.

Nuestro equipo desarrolla la aplicación y sus procedimientos de análisis, pero **no se atribuye la recopilación original de estos registros**.

## 4.2. Archivos utilizados

Trabajamos con los siguientes conjuntos:

| Archivo | Videojuego |
|---|---|
| `data_clean.csv` | Genshin Impact |
| `data_clean_hsr.csv` | Honkai: Star Rail |

Ambos archivos contienen registros procesados de aperturas y campos que permiten identificar aspectos como el banner y la rareza.

Los datos proceden de historiales exportados y publicados por terceros. No afirmamos haber verificado de manera independiente cada apertura en los servidores oficiales de los videojuegos.

## 4.3. Almacenamiento de los CSV

Para reducir la dependencia operativa de un repositorio externo, configuramos ProbGame para cargar los conjuntos históricos desde su propia carpeta:

`data/`

La estructura utilizada es:

```text
data/
├── data_clean.csv
└── data_clean_hsr.csv
```

Al ejecutar ProbGame mediante un servidor web, JavaScript solicita estos archivos desde las rutas del propio proyecto.

De este modo, la lectura de los registros no necesita realizar solicitudes a GitHub Raw del repositorio original.

Cuando publiquemos la aplicación, los archivos que tengamos autorización para redistribuir podrán alojarse junto al sitio en GitHub Pages.

## 4.4. Procesamiento de los registros

Para preparar los datos, implementamos procedimientos que permiten:

- Interpretar archivos CSV.
- Identificar las columnas requeridas.
- Normalizar información para su análisis.
- Clasificar aperturas por videojuego y banner.
- Reconocer los niveles de rareza.
- Detectar registros duplicados según las claves implementadas.
- Rechazar archivos que no cumplen los requisitos mínimos.

El sistema informa la cantidad de registros válidos y los duplicados omitidos durante la lectura.

## 4.5. Privacidad y protección de datos

Los archivos históricos pueden contener identificadores de cuentas u otros campos que no son necesarios para mostrar resultados estadísticos.

Por ello, distinguimos entre los archivos originales utilizados como fuente y las posibles versiones depuradas destinadas a publicación.

Antes de redistribuir los CSV públicamente, debemos confirmar que contamos con la autorización correspondiente y revisar los campos que puedan identificar a jugadores.

La seudonimización puede reducir la exposición de identificadores, pero no reemplaza la necesidad de contar con derechos de redistribución.

## 4.6. Tratamiento de CSV personales

ProbGame permite que cada visitante seleccione su propio archivo CSV.

Estos archivos se leen y procesan localmente en el navegador.

Nuestra aplicación no implementa una base de datos para almacenar permanentemente los archivos personales ni permite que las contribuciones de los visitantes modifiquen automáticamente los conjuntos históricos compartidos.

Consideramos esta decisión importante para evitar incorporar registros ficticios, información privada, duplicados o datos pertenecientes a mecanismos incompatibles.

## 4.7. Limitaciones de las fuentes

Los conjuntos históricos utilizados no constituyen necesariamente una muestra aleatoria ni representativa de todos los jugadores.

Pueden existir diferencias entre cuentas, períodos, versiones de juego, banners y condiciones iniciales de garantía.

Por ello, interpretamos los resultados de manera descriptiva y evitamos generalizaciones que los datos no justifican.

---

# 5. Tecnologías utilizadas

Para implementar ProbGame utilizamos tecnologías de desarrollo web y una herramienta auxiliar de procesamiento.

| Tecnología | Función |
|---|---|
| HTML5 | Estructura de las páginas y formularios |
| CSS3 | Diseño visual, colores y adaptación de la interfaz |
| JavaScript | Procesamiento de datos, cálculos e interactividad |
| Python | Preparación auxiliar de conjuntos de datos |
| CSV | Almacenamiento tabular de registros históricos |
| Visual Studio Code | Entorno de desarrollo |
| Live Server | Ejecución y pruebas locales |
| GitHub | Control de versiones y alojamiento del código |
| GitHub Pages | Publicación de la aplicación web estática |

## 5.1. HTML

Utilizamos HTML para estructurar las pantallas, formularios, botones, menús y paneles de resultados.

La aplicación cuenta con una pantalla inicial y dos interfaces de análisis.

## 5.2. CSS

Utilizamos CSS para construir la identidad visual de ProbGame.

Implementamos una interfaz de colores oscuros, tarjetas para los videojuegos, botones de navegación y componentes destinados a presentar los resultados de manera comprensible.

También incorporamos imágenes ilustrativas de ambos videojuegos.

## 5.3. JavaScript

JavaScript constituye el núcleo funcional de la aplicación.

Lo utilizamos para leer archivos CSV, reconocer banners, calcular estadísticas, actualizar porcentajes de referencia, presentar gráficos y ejecutar simulaciones.

Los análisis se ejecutan en el navegador del visitante.

## 5.4. Python

Incluimos `preparar_datos.py` como herramienta auxiliar para preparar conjuntos de datos antes de utilizarlos.

Python no es necesario para ejecutar la interfaz pública de ProbGame ni se ejecuta automáticamente en GitHub Pages.

## 5.5. GitHub Pages

Elegimos GitHub Pages como alternativa de publicación para nuestra aplicación estática.

Esta plataforma permite compartir el proyecto mediante una dirección web y actualizar posteriormente su contenido conservando el enlace del sitio.

---

# 6. Arquitectura y estructura del proyecto

## 6.1. Arquitectura general

Desarrollamos ProbGame como una aplicación web estática que funciona sin un servidor propio de aplicación y sin una base de datos de usuarios.

Separamos el proyecto en componentes responsables de la presentación, configuración, procesamiento de datos y cálculo estadístico.

La secuencia general es:

1. El visitante selecciona un videojuego.
2. JavaScript carga los registros históricos del proyecto.
3. El sistema identifica los banners disponibles.
4. El visitante elige una recompensa y una modalidad de análisis.
5. ProbGame filtra los registros correspondientes.
6. El módulo estadístico calcula los resultados.
7. La interfaz presenta las frecuencias, comparaciones e interpretaciones.
8. Opcionalmente, el visitante ejecuta una simulación Monte Carlo.

## 6.2. Estructura de archivos

```text
ProbGame/
│
├── css/
│   └── styles.css
│
├── data/
│   ├── data_clean.csv
│   └── data_clean_hsr.csv
│
├── img/
│   ├── genshei.png
│   └── honkai.png
│
├── js/
│   ├── app.js
│   ├── config.js
│   ├── csv.js
│   ├── montecarlo.js
│   └── stats.js
│
├── index.html
├── genshin.html
├── honkai.html
├── preparar_datos.py
├── README.md
└── .gitignore
```

Esta estructura corresponde a la organización prevista para la versión publicable. Los CSV solo deben incluirse en un repositorio público cuando su redistribución esté autorizada y se haya revisado su contenido.

## 6.3. Descripción de los archivos principales

| Archivo | Función |
|---|---|
| `index.html` | Pantalla inicial para seleccionar el videojuego |
| `genshin.html` | Interfaz de análisis de Genshin Impact |
| `honkai.html` | Interfaz de análisis de Honkai: Star Rail |
| `styles.css` | Presentación visual y diseño adaptable |
| `app.js` | Coordinación de formularios, eventos y resultados |
| `config.js` | Configuración de videojuegos, recompensas y tasas de referencia |
| `csv.js` | Lectura, normalización, validación y deduplicación |
| `stats.js` | Cálculos de frecuencias, Wilson y pruebas binomiales |
| `montecarlo.js` | Simulaciones estadísticas educativas |
| `preparar_datos.py` | Preparación auxiliar de los conjuntos de datos |
| `README.md` | Documentación del proyecto |
| `.gitignore` | Reglas para excluir archivos del control de versiones |

---

# 7. Funcionamiento de la aplicación

## 7.1. Pantalla principal

Al ingresar a ProbGame presentamos dos opciones:

**Genshin Impact:** análisis de personajes, armas y rarezas por banner.

**Honkai: Star Rail:** análisis de personajes, conos de luz y categorías disponibles en los registros.

Cada tarjeta incluye una imagen, una descripción breve y un enlace para iniciar el análisis.

También incorporamos un botón «Volver al inicio» que permite regresar desde cualquiera de las interfaces de juego.

## 7.2. Selección de banner y recompensa

En cada videojuego mostramos un formulario que permite seleccionar:

- Tipo de banner.
- Recompensa objetivo.
- Probabilidad de referencia.
- Modalidad de registros.

El sistema genera las opciones de banner según las categorías presentes en los datos cargados.

El selector de recompensa se actualiza automáticamente según el banner: en los
promocionales de personajes (incluidos los de colaboración) se oculta la opción
«Arma / cono de luz ★★★★★»; en los promocionales de armas o conos de luz
(incluidos los de colaboración) se oculta «Personaje ★★★★★». En los banners
permanentes y de principiantes se conservan todas las opciones, al igual que en
el banner recopilatorio, que puede incluir ambas clases de recompensa. La
selección de rareza general y las opciones de 3★ y 4★ no se modifican.

## 7.3. Probabilidades automáticas

Configuramos ProbGame para proponer tasas consolidadas de referencia en determinadas categorías de cinco estrellas, cuando contamos con una referencia documentada.

Entre las tasas configuradas están:

| Videojuego | Banner | Tasa base | Tasa consolidada |
|---|---|---:|---:|
| Genshin Impact | Personajes promocionales | 0,60 % | 1,60 % |
| Genshin Impact | Armas promocionales | 0,70 % | 1,85 % |
| Genshin Impact | Permanente | 0,60 % | 1,60 % |
| Honkai: Star Rail | Personajes promocionales | 0,60 % | 1,60 % |
| Honkai: Star Rail | Conos de luz promocionales | 0,80 % | 1,87 % |
| Honkai: Star Rail | Permanente | 0,60 % | 1,60 % |

Estas tasas requieren interpretarse conforme a la información oficial del banner y sus reglas aplicables.

La aplicación permite modificar manualmente el porcentaje de referencia.

Cuando seleccionamos una recompensa distinta de cinco estrellas o un banner sin tasa configurada, el sistema deja vacío el campo para evitar asignar automáticamente una probabilidad que no corresponde.

## 7.4. Modalidades de análisis

Implementamos tres opciones de uso dentro de dos métodos principales.

**Método A. Registros históricos del proyecto**

Analizamos las aperturas precargadas en los archivos CSV de ProbGame.

**Método B. CSV personal**

El visitante puede trabajar de dos formas:

- Analizar únicamente su archivo CSV personal.
- Combinar temporalmente sus registros con los históricos compatibles.

En la combinación, el programa filtra por banner y aplica las reglas de deduplicación implementadas.

La coincidencia del nombre del banner no garantiza por sí sola compatibilidad completa de versión, reglas, condiciones iniciales o período.

## 7.5. Visualización de resultados

El panel de resultados presenta:

- Probabilidad introducida.
- Frecuencia observada.
- Número de aperturas analizadas.
- Número de éxitos esperados (aperturas analizadas multiplicadas por la probabilidad declarada).
- Comparación visual de probabilidades con éxitos esperados y éxitos observados junto a los porcentajes.
- Intervalo de confianza de Wilson.
- Distribución de recompensas por rareza.
- Interpretación resumida.
- Advertencias sobre mecanismos de garantía.

## 7.6. Simulación Monte Carlo

Incluimos un apartado desplegable denominado:

**¿Qué tan probable es este resultado por azar? — Monte Carlo**

El visitante puede ejecutar experimentos virtuales repetidos y observar la variabilidad de sus resultados bajo el modelo seleccionado.

Las simulaciones no se incorporan a los registros históricos ni se presentan como aperturas reales.

---

# 8. Fundamento matemático y simulación Monte Carlo

## 8.1. Experimentos aleatorios discretos

Un experimento aleatorio es un procedimiento cuyo resultado no puede predecirse con certeza antes de su realización.

Las aperturas de recompensas permiten estudiar resultados pertenecientes a categorías discretas, como distintos niveles de rareza.

## 8.2. Variable de Bernoulli

Para estudiar una recompensa objetivo definimos una variable indicadora:

\[
X_i =
\begin{cases}
1, & \text{si la apertura cumple el objetivo},\\
0, & \text{en caso contrario}.
\end{cases}
\]

Por ejemplo, si buscamos cualquier recompensa de cinco estrellas:

- Éxito: obtener una recompensa de cinco estrellas.
- No éxito: obtener una recompensa de otra rareza.

Esta representación es útil para contar éxitos, aunque no implica automáticamente independencia entre aperturas.

## 8.3. Frecuencia relativa observada

Sea:

- \(n\): número de aperturas analizadas.
- \(k\): cantidad de aperturas que cumplen el objetivo.

Calculamos:

\[
\hat{p}=\frac{k}{n}
\]

Y en porcentaje:

\[
\hat{p}_{\%}=\frac{k}{n}\times100
\]

### Ejemplo con Genshin Impact

En el banner de personajes promocionales registramos:

\[
n=3303,\qquad k=55
\]

Entonces:

\[
\hat{p}=\frac{55}{3303}\times100
\]

\[
\hat{p}\approx1.67\%
\]

Esta es la frecuencia observada para recompensas de cinco estrellas en el conjunto analizado.

## 8.4. Comparación con una probabilidad de referencia

Para comparar el resultado observado con una probabilidad documentada utilizamos:

\[
\Delta=\hat{p}-p_0
\]

Donde:

- \(\hat{p}\) representa la frecuencia observada.
- \(p_0\) representa la probabilidad de referencia.

La diferencia permite expresar cuántos puntos porcentuales separan ambos valores.

El panel también muestra los **éxitos esperados** como `n × p₀`, donde `n` es el número de aperturas y `p₀` es la probabilidad declarada expresada entre 0 y 1. Este valor puede ser decimal y cambia al modificar la probabilidad introducida. Los **éxitos observados** corresponden a `k` y se calculan únicamente a partir de los registros, sin depender de la probabilidad declarada. Ambas cantidades se visualizan junto a sus porcentajes correspondientes.

No obstante, una diferencia pequeña o grande no determina por sí sola si un mecanismo cumple sus reglas, pues intervienen las condiciones de muestreo y el modelo probabilístico.

## 8.5. Intervalo de confianza de Wilson

Implementamos el intervalo de Wilson para describir la incertidumbre de una proporción.

Para una proporción observada \(\hat p\), el intervalo se calcula mediante:

\[
\frac{
\hat p+\frac{z^2}{2n}
\pm
z\sqrt{
\frac{\hat p(1-\hat p)}{n}
+
\frac{z^2}{4n^2}
}
}{
1+\frac{z^2}{n}
}
\]

Para un nivel de confianza del 95 % utilizamos aproximadamente:

\[
z=1.96
\]

Este intervalo resulta útil para estudiar proporciones, aunque su interpretación inferencial exige considerar los supuestos de muestreo y dependencia.

## 8.6. Distribución binomial

Bajo un modelo hipotético de ensayos independientes con probabilidad fija \(p\), la variable que cuenta éxitos puede modelarse mediante:

\[
X\sim Bin(n,p)
\]

Su función de probabilidad es:

\[
P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}
\]

ProbGame permite ejecutar una prueba binomial exacta bilateral bajo esos supuestos.

**No presentamos esa prueba como una auditoría definitiva de los videojuegos**, porque los mecanismos *pity* pueden producir probabilidades variables y dependencia entre aperturas.

## 8.7. Método de Monte Carlo

La simulación Monte Carlo consiste en repetir experimentos aleatorios computacionales para observar la variabilidad de sus resultados.

En ProbGame utilizamos este método como complemento educativo.

El procedimiento general consiste en:

1. Definir un modelo de probabilidad.
2. Establecer el número de aperturas por experimento.
3. Ejecutar numerosas repeticiones virtuales.
4. Contabilizar los éxitos en cada repetición.
5. Comparar la distribución simulada con el resultado histórico.

El motor incluye un modelo de probabilidad fija y una alternativa simplificada con techo de garantía.

La alternativa simplificada no reproduce necesariamente todas las reglas oficiales, como las variaciones de *soft pity*, los estados iniciales de cada cuenta o las condiciones promocionales.

## 8.8. Importancia del tamaño muestral

Una frecuencia obtenida a partir de pocas aperturas puede presentar mayor variabilidad que otra calculada a partir de una muestra extensa.

Sin embargo, aumentar el número de registros no elimina automáticamente problemas de selección, duplicación, dependencia o falta de representatividad.

Por ello, interpretamos el tamaño muestral junto con las demás condiciones del análisis.

---

# 9. Instalación y ejecución

## 9.1. Requisitos

Para ejecutar ProbGame localmente necesitamos:

- Una computadora con un navegador web moderno.
- Visual Studio Code o un editor equivalente.
- Un servidor web local, como Live Server.
- Los archivos del proyecto.
- Los conjuntos históricos ubicados dentro de `data/`.

No es necesario instalar Python para utilizar la interfaz de análisis.

## 9.2. Instalación en Visual Studio Code

**Paso 1.** Descargamos o clonamos el repositorio de ProbGame.

**Paso 2.** Abrimos Visual Studio Code.

**Paso 3.** Seleccionamos `File → Open Folder` y elegimos la carpeta del proyecto.

**Paso 4.** Verificamos que `index.html` se encuentre en la raíz.

**Paso 5.** Instalamos la extensión Live Server de Ritwick Dey si todavía no está disponible.

**Paso 6.** Abrimos `index.html` mediante Live Server.

La dirección local normalmente presenta una estructura semejante a:

`http://127.0.0.1:5500/index.html`

## 9.3. Carga de los datos

Antes de ejecutar los análisis debemos contar con:

`data/data_clean.csv`

`data/data_clean_hsr.csv`

ProbGame intenta leer estos archivos desde la carpeta del propio proyecto.

Si alguno no está disponible, la aplicación informa el problema en lugar de descargar automáticamente el conjunto histórico desde el repositorio de terceros.

## 9.4. Ejecución del análisis

Una vez abierta la aplicación:

1. Seleccionamos el videojuego.
2. Esperamos la carga de los registros.
3. Elegimos el banner.
4. Seleccionamos la recompensa objetivo.
5. Revisamos o modificamos la tasa de referencia.
6. Elegimos los registros que deseamos analizar.
7. Presionamos «Analizar probabilidades».
8. Revisamos los resultados y las advertencias matemáticas.

## 9.5. Uso desde un sitio publicado

Cuando el proyecto esté publicado en GitHub Pages, podremos acceder directamente mediante el enlace web sin instalar Visual Studio Code.

Los conjuntos históricos publicados deberán estar disponibles en las rutas esperadas por JavaScript.

---

# 10. Pruebas y validación del software

Durante el desarrollo realizamos pruebas funcionales para comprobar distintos comportamientos de ProbGame.

## 10.1. Pruebas realizadas

| Prueba | Comportamiento comprobado |
|---|---|
| Apertura de la página principal | Visualización de los dos videojuegos |
| Navegación | Acceso a cada videojuego y regreso al inicio |
| Carga de Genshin Impact | Lectura de 5 250 registros |
| Carga de Honkai: Star Rail | Lectura de 4 103 registros |
| Selección de banners | Actualización de categorías y conteos |
| Cálculo de frecuencias | Resultados coherentes con los conteos |
| CSV personal válido | Lectura y análisis del archivo |
| Combinación de registros | Suma de registros compatibles |
| Duplicados internos | Exclusión de dos aperturas repetidas en una prueba controlada |
| CSV mal formado | Rechazo por falta de columnas obligatorias |
| Probabilidad inválida | Rechazo de un valor de 150 % |
| Monte Carlo | Ejecución de experimentos virtuales |
| Probabilidades automáticas | Actualización de la tasa al cambiar de banner |
| Cambio de recompensa | Limpieza de resultados anteriores |
| Archivos CSV locales | Carga de los conjuntos desde `data/` |

Estas pruebas se realizaron durante el desarrollo local. No afirmamos haber comprobado todos los posibles casos límite ni todos los modelos de probabilidad del juego.

## 10.2. Ejemplo de prueba con datos ficticios

Creamos un archivo CSV de demostración con diez aperturas ficticias:

- Siete recompensas de tres estrellas.
- Dos recompensas de cuatro estrellas.
- Una recompensa de cinco estrellas.

El resultado esperado era:

\[
\hat p=\frac{1}{10}\times100=10\%
\]

ProbGame mostró correctamente una frecuencia del 10 %.

Posteriormente agregamos dos filas duplicadas. El sistema informó que había omitido dos duplicados internos y conservó diez aperturas válidas.

## 10.3. Prueba de combinación

Combinamos temporalmente los registros históricos del banner de personajes promocionales de Genshin Impact con diez aperturas ficticias destinadas exclusivamente a probar el programa.

Obtuvimos:

\[
3303+10=3313
\]

El total de recompensas de cinco estrellas fue:

\[
55+1=56
\]

Por tanto:

\[
\hat p=\frac{56}{3313}\times100\approx1.69\%
\]

El resultado coincidió con el cálculo esperado.

**Esta prueba corresponde a validación funcional del software. No forma parte de los resultados empíricos utilizados para describir el videojuego.**

## 10.4. Evidencias de prueba

Conservamos capturas y archivos de prueba para documentar el desarrollo y sustentar las comprobaciones realizadas.

Los archivos ficticios de demostración se mantienen separados de los conjuntos históricos utilizados en el análisis público.

---

# 11. Limitaciones del análisis

Reconocemos que ProbGame tiene limitaciones metodológicas y técnicas que deben considerarse al interpretar sus resultados.

## 11.1. Representatividad

Los registros disponibles no constituyen necesariamente una muestra aleatoria de todos los jugadores.

Por ello, las frecuencias observadas describen los historiales analizados y no permiten generalizar automáticamente sus resultados a toda la población.

## 11.2. Dependencia entre aperturas

Los mecanismos de garantía pueden modificar las probabilidades a lo largo de una secuencia de intentos.

En consecuencia, no siempre se satisfacen los supuestos de independencia y probabilidad fija de una distribución binomial.

## 11.3. Tasas base y consolidadas

Las tasas base y consolidadas no deben interpretarse como cantidades equivalentes.

Las tasas consolidadas dependen de condiciones definidas por cada mecanismo y no describen necesariamente la probabilidad de una apertura individual.

## 11.4. Versiones y banners

Los videojuegos pueden modificar eventos, promociones y reglas con el tiempo.

Por ello, una comparación rigurosa requiere comprobar la correspondencia entre el historial observado y la versión del mecanismo utilizada como referencia.

## 11.5. Calidad y procedencia de los datos

Los archivos proceden de historiales publicados por terceros y no cuentan, dentro de nuestro proyecto, con una auditoría independiente de cada apertura.

También pueden existir secuencias incompletas, diferencias entre cuentas y limitaciones de trazabilidad.

## 11.6. Compatibilidad de conjuntos combinados

Aunque ProbGame permite combinar registros y detectar ciertos duplicados, estas operaciones no garantizan por sí solas que los archivos compartan exactamente las mismas condiciones históricas y probabilísticas.

## 11.7. Alcance de las simulaciones

Los modelos Monte Carlo implementados son educativos.

No reproducen completamente todas las reglas de garantía, las tasas dinámicas ni los estados iniciales de los jugadores.

## 11.8. Interpretación responsable

ProbGame no ofrece veredictos automáticos de fraude, manipulación o justicia de los videojuegos.

Consideramos que cualquier conclusión debe fundamentarse en los datos disponibles, los supuestos matemáticos y las limitaciones reconocidas.

---

# 12. Publicación en GitHub Pages

## 12.1. Plataforma de publicación

Elegimos GitHub Pages para alojar ProbGame como aplicación web estática.

Esta opción permite compartir el proyecto mediante un enlace y conservar su código fuente en un repositorio.

## 12.2. Procedimiento de publicación

El procedimiento previsto es:

1. Crear un repositorio llamado `ProbGame`.
2. Incorporar los archivos HTML, CSS, JavaScript y recursos visuales.
3. Incluir únicamente los conjuntos de datos cuya publicación esté autorizada y revisada.
4. Comprobar que `index.html` se encuentre en la raíz del repositorio.
5. Entrar a `Settings → Pages`.
6. Seleccionar la publicación desde la rama `main` y la carpeta raíz.
7. Guardar la configuración.
8. Abrir la dirección del sitio proporcionada por GitHub.
9. Comprobar nuevamente las funciones principales.

La URL tendrá una estructura semejante a:

`https://USUARIO.github.io/ProbGame/`

## 12.3. Actualizaciones posteriores

GitHub Pages permite modificar la aplicación después de publicarla.

Podremos corregir errores, actualizar el diseño o incorporar mejoras mediante nuevas versiones del código, conservando normalmente el mismo enlace del sitio.

Antes de publicar cambios importantes, conservaremos respaldos y realizaremos pruebas locales.

## 12.4. Consideraciones de publicación

No incluiremos archivos de prueba ficticios dentro de los conjuntos históricos.

Tampoco publicaremos copias de respaldo, archivos auxiliares de Windows o información privada innecesaria.

La publicación de los conjuntos históricos estará condicionada a la autorización de redistribución y a la revisión de identificadores.

---

# 13. Referencias bibliográficas

Para desarrollar ProbGame consultamos documentación técnica, información de los videojuegos y recursos sobre los métodos matemáticos implementados.

Las referencias siguientes se presentan en un formato bibliográfico basado en IEEE. Su numeración puede adaptarse al orden de citación del informe académico.

**[1]** noviardhana, “Gacha Analytics: Genshin Impact & Honkai: Star Rail,” *GitHub Repository*. [En línea]. Disponible en: https://github.com/noviardhana/history_gi. [Consultado: 22-nov-2026].

**[2]** HoYoverse, “How does the Wish guarantee system work?”, *HoYoverse Help Center*. [En línea]. Disponible en: https://support.hoyoverse.com/hc/en-us/articles/50333940684953-How-does-the-Wish-guarantee-system-work. [Consultado: 22-nov-2026].

**[3]** HoYoverse, “How does the pity system work for different banners and reruns?”, *HoYoverse Help Center*. [En línea]. Disponible en: https://support.hoyoverse.com/hc/en-us/articles/50913710696217-How-does-the-pity-system-work-for-different-banners-and-reruns. [Consultado: 22-nov-2026].

**[4]** GitHub, “Creating a GitHub Pages site,” *GitHub Docs*. [En línea]. Disponible en: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site. [Consultado: 22-nov-2026].

**[5]** E. B. Wilson, “Probable inference, the law of succession, and statistical inference,” *Journal of the American Statistical Association*, vol. 22, no. 158, pp. 209–212, 1927.

**[6]** R. Y. Rubinstein y D. P. Kroese, *Simulation and the Monte Carlo Method*, 3.ª ed. Hoboken, NJ, EE. UU.: John Wiley & Sons, 2017.

**[7]** A. W. F. Edwards, *The Doctrine of Chances: Probabilistic Aspects of Gambling*. Cambridge, Reino Unido: Cambridge University Press, 1985.

Estas referencias permiten identificar la procedencia de los datos, la documentación de los mecanismos de juego, los fundamentos estadísticos y la plataforma de publicación.

Para el informe académico, cada afirmación específica sobre una tasa, banner o procedimiento debe vincularse con la fuente que realmente la respalda.

---

# 14. Créditos del equipo

## 14.1. Desarrollo académico

Desarrollamos ProbGame como proyecto grupal de la asignatura **Estructuras Discretas I**, mediante un equipo de cuatro integrantes.

Nuestro trabajo integra conocimientos de programación, análisis de datos, probabilidad discreta y simulación computacional.

## 14.2. Contribuciones

Durante el desarrollo organizamos actividades relacionadas con:

- Diseño e implementación de la aplicación web.
- Integración de conjuntos de datos históricos.
- Configuración de banners y probabilidades.
- Implementación y comprobación de procedimientos estadísticos.
- Pruebas funcionales y revisión de resultados.
- Investigación bibliográfica y elaboración del informe académico.
- Documentación y preparación de la publicación.

Las responsabilidades individuales y los nombres completos de los integrantes se consignarán según la distribución efectiva del trabajo realizado.

## 14.3. Reconocimientos

Reconocemos al responsable del repositorio `noviardhana/history_gi` por la publicación de los conjuntos de datos que utilizamos como fuente.

Asimismo, reconocemos a HoYoverse como desarrolladora de los videojuegos Genshin Impact y Honkai: Star Rail y como fuente de documentación sobre sus mecanismos.

Las imágenes, denominaciones y elementos identificativos de los videojuegos pertenecen a sus respectivos titulares.

ProbGame es un proyecto académico independiente y no representa una aplicación oficial de HoYoverse.

## 14.4. Declaración de integridad académica

En nuestro proyecto diferenciamos los registros históricos publicados por terceros, los archivos ficticios utilizados para comprobar el software y las simulaciones computacionales generadas con fines educativos.

No presentamos datos simulados como si fueran aperturas reales.

Tampoco atribuimos al equipo la creación original de conjuntos de datos externos.

Los resultados se comunican junto con sus supuestos y limitaciones, con el propósito de promover una interpretación responsable de la probabilidad.

---

**ProbGame — Proyecto académico de Estructuras Discretas I**

*Simulación de experimentos discretos y contraste con probabilidades de referencia.*

---

**ProbGame — Proyecto académico de Estructuras Discretas I**

*Simulación de experimentos discretos y contraste con probabilidades de referencia.*
