# Instituto Tecnológico de Pachuca
## Ing. Sistemas Computacionales
## Graficación
###  Examen 2do Seguimiento
##  Monster Hunter
### Fecha de entrega: 20 de Octubre 2025

## Contexto
El proyecto consiste en el desarrollo de un videojuego 2D implementado con la **API Canvas** de JavaScript, con estilos y estructura de layout con **Bootstrap 5**. La escena principal corre dentro de un `<canvas>` que se ajusta al tamaño de la ventana y contiene objetos animados (calaveras, catrinas, cempasúchiles, fantasmas, mariposas) representados por imágenes en la carpeta `assets`.  
El código implementa una clase `MovingObject` que gestiona la creación, movimiento (horizontal, vertical, diagonal, circular, zigzag), dibujo y detección de clics de cada objeto. La interfaz incluye un marcador en pantalla (`#score`), un encabezado visual y un footer con la información del equipo. Para mejorar la experiencia se añadieron: cursor personalizado, imagen de fondo del canvas, y música de fondo con reproducción controlada por interacción del usuario. Se implementaron manejos de carga de imágenes y fallback para iniciar el juego aunque alguna imagen falle al cargar.
## Objetivo
Desarrollar un videojuego 2D interactivo con una temática de Día de Muertos y Halloween en la que el usuario pueda divertirse haciendo una cacería de espantos por medio de métodos aplicados al mouse.
El objetivo técnico es aplicar y demostrar conocimiento sobre:

-   Renderizado y animación en Canvas.
    
-   Gestión de recursos (imágenes y audio) y robustez ante fallos de carga.
    
-   Interacción usuario–juego (detección de clics y efectos visuales).
    
-   Diseño responsivo y presentación con Bootstrap.  

 Además, se pretende fomentar el trabajo colaborativo (equipo de tres integrantes) integrando diseño, programación y testing en el flujo de desarrollo.
## Justificación
El proyecto combina aprendizaje técnico con una temática cultural y lúdica. Implementar movimientos variados y detección precisa de clics permite practicar técnicas de física simple y manejo de eventos del DOM. El uso de Bootstrap agiliza la maquetación del header/footer y hace el prototipo más presentable sin invertir tiempo excesivo en CSS básico, lo cual es importante en proyectos de equipo donde se prioriza funcionalidad y entrega.  
También se buscó controlar estéticamente los colores y la legibilidad: contenedor negro con texto blanco y elementos contrastantes para mantener visibilidad en diferentes pantallas. 
## Operación del videojuego
**Estructura y arranque**

-   Al cargar la página, el header y footer se pintan con Bootstrap; el `<canvas id="canvas">` cubre el área central (`#gameContainer`) y se escala con `canvas.width = window.innerWidth` y `canvas.height = window.innerHeight`.
    
-   Las imágenes en `assets` se cargan y se hace conteo (`imagesLoaded`) para iniciar `generateObjects()` y `animate()` cuando todas están listas. Si alguna falla, se usa un fallback que para no bloquear el inicio, inicia el juego tras superar el tiempo de espera.
    

**Lógica de objetos**

-   `MovingObject` selecciona tipo, tamaño y velocidad aleatoria, y un tipo de movimiento (horizontal/vertical/diagonal/circular/zigzag).
    
-   `update()` aplica la física/posición por tipo de movimiento y llama a `draw()` que usa `ctx.drawImage(...)`.
    
-   `isClicked(mouseX, mouseY)` calcula la distancia entre clic y centro del objeto y devuelve true si está dentro del radio (detección circular).
    

**Interacción**

-   `canvas.addEventListener("click", ...)` obtiene coordenadas de clic relativas al canvas y revisa cada objeto con `isClicked`. Al acertar: `hide()` (oculta y reinicia luego), se incrementa `score`, se actualiza `#score` y se dibuja un efecto visual (un círculo naranja con `globalAlpha` reducido).
    

**Audio y UX**

-   `backgroundMusic` está en autoplay bloqueado por navegadores: se reproduce con `document.addEventListener('click', ..., { once:true })` para cumplir la política de interacción del usuario antes de reproducir audio y así evitar bloqueos.
    

**Responsividad y usabilidad**

-   Se usa`resize` para reajustar el canvas. El diseño mantiene contraste (fondo negro/ texto blanco) y usa cursor personalizado con fallback.
## Conclusiones
El proyecto cumplió el objetivo de aplicar la API Canvas para construir un juego 2D interactivo con movimientos variados, detección de clics y feedback visual. 
El uso de Bootstrap agilizó el diseño de la interfaz (header/footer e instrucciones), mejorando la presentación sin sacrificar el tiempo invertido en la lógica del juego.  
Trabajar en equipo de tres integrantes, permitió dividir responsabilidades (programación de la lógica, diseño de assets y maquetación con Bootstrap), lo que resultó en una entrega más completa y con mayor calidad visual. Técnicamente, se reforzaron conceptos de animación frame-by-frame, gestión de recursos y eventos del DOM.
