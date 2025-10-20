// ==========================================
//  JUEGO: CAZA DE CALAVERAS - DÍA DE MUERTOS
// ==========================================

// --- CONFIGURACIÓN DEL CANVAS ---
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const backgroundMusic = document.getElementById("backgroundMusic");

// Ajustar canvas al tamaño de la ventana
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- VARIABLES GLOBALES ---
const objects = [];
let score = 0;
const scoreDisplay = document.getElementById("score");
const maxObjects = 15;

// Cargar imágenes
const images = {
    calavera: new Image(),
    catrina: new Image(),
    cempasuchil: new Image(),
    fantasma: new Image(),
    mariposa: new Image()
};

// Rutas de las imágenes (debes crear estas imágenes en la carpeta assets)
images.calavera.src = 'assets/crucubila.png';
images.catrina.src = 'assets/cempacuchitl.png';
images.cempasuchil.src = 'assets/pin.png';
images.fantasma.src = 'assets/fantasma.png';
images.mariposa.src = 'assets/calabaza.png';

// --- CLASE: OBJETO EN MOVIMIENTO ---
class MovingObject {
    constructor() {
        this.type = this.getRandomType();
        this.image = images[this.type];
        this.size = this.getSizeByType();
        this.reset();
        this.speed = this.getSpeedByType();
        this.movementType = this.getRandomMovement();
        this.angle = 0;
        this.circleRadius = 100 + Math.random() * 200;
        this.circleSpeed = 0.01 + Math.random() * 0.02;
        this.circleCenterX = Math.random() * canvas.width;
        this.circleCenterY = Math.random() * canvas.height;
    }

    getRandomType() {
        const types = ['calavera', 'catrina', 'cempasuchil', 'fantasma', 'mariposa'];
        return types[Math.floor(Math.random() * types.length)];
    }

    getSizeByType() {
        const sizes = {
            'calavera': 40 + Math.random() * 30,
            'catrina': 50 + Math.random() * 40,
            'cempasuchil': 30 + Math.random() * 20,
            'fantasma': 45 + Math.random() * 35,
            'mariposa': 25 + Math.random() * 15
        };
        return sizes[this.type];
    }

    getSpeedByType() {
        const speeds = {
            'calavera': 1 + Math.random() * 2,
            'catrina': 0.5 + Math.random() * 1.5,
            'cempasuchil': 2 + Math.random() * 3,
            'fantasma': 1.5 + Math.random() * 2.5,
            'mariposa': 3 + Math.random() * 4
        };
        return speeds[this.type];
    }

    getRandomMovement() {
        const movements = ['horizontal', 'vertical', 'diagonal', 'circular', 'zigzag'];
        return movements[Math.floor(Math.random() * movements.length)];
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        
        // Direcciones aleatorias
        this.dx = (Math.random() - 0.5) * 4;
        this.dy = (Math.random() - 0.5) * 4;
        
        // Asegurar movimiento mínimo
        if (Math.abs(this.dx) < 1) this.dx = Math.sign(this.dx) * 1;
        if (Math.abs(this.dy) < 1) this.dy = Math.sign(this.dy) * 1;
        
        this.visible = true;
        this.zigzagCounter = 0;
    }

    update() {
        if (!this.visible) return;

        switch(this.movementType) {
            case 'horizontal':
                this.x += this.dx;
                if (this.x > canvas.width + this.size) this.x = -this.size;
                if (this.x < -this.size) this.x = canvas.width + this.size;
                break;
                
            case 'vertical':
                this.y += this.dy;
                if (this.y > canvas.height + this.size) this.y = -this.size;
                if (this.y < -this.size) this.y = canvas.height + this.size;
                break;
                
            case 'diagonal':
                this.x += this.dx;
                this.y += this.dy;
                if (this.x > canvas.width + this.size || this.x < -this.size ||
                    this.y > canvas.height + this.size || this.y < -this.size) {
                    this.reset();
                }
                break;
                
            case 'circular':
                this.angle += this.circleSpeed;
                this.x = this.circleCenterX + Math.cos(this.angle) * this.circleRadius;
                this.y = this.circleCenterY + Math.sin(this.angle) * this.circleRadius;
                break;
                
            case 'zigzag':
                this.zigzagCounter += 0.1;
                this.x += this.dx;
                this.y += this.dy + Math.sin(this.zigzagCounter) * 2;
                if (this.x > canvas.width + this.size || this.x < -this.size ||
                    this.y > canvas.height + this.size || this.y < -this.size) {
                    this.reset();
                }
                break;
        }

        this.draw();
    }

    draw() {
        if (!this.visible) return;
        
        ctx.drawImage(
            this.image,
            this.x - this.size/2,
            this.y - this.size/2,
            this.size,
            this.size
        );
    }

    isClicked(mouseX, mouseY) {
        if (!this.visible) return false;
        
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.size / 2;
    }

    hide() {
        this.visible = false;
        setTimeout(() => {
            this.reset();
        }, 1000 + Math.random() * 2000);
    }
}

// --- FUNCIONES DEL JUEGO ---
function generateObjects() {
    for (let i = 0; i < maxObjects; i++) {
        setTimeout(() => {
            objects.push(new MovingObject());
        }, i * 500);
    }
}

function animate() {
    // Limpiar canvas con transparencia para efecto de rastro
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Actualizar y dibujar objetos
    objects.forEach(obj => obj.update());

    requestAnimationFrame(animate);
}

// --- EVENTOS ---
canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Verificar clic en objetos
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].isClicked(mouseX, mouseY)) {
            objects[i].hide();
            score++;
            scoreDisplay.textContent = "💀 Espantos: "+ score;
            
            // Efecto visual al eliminar
            ctx.fillStyle = '#ff6b00';
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.arc(mouseX, mouseY, objects[i].size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;
            
            break;
        }
    }
});

// Redimensionar ventana
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Reproducir música con interacción del usuario
document.addEventListener('click', function() {
    backgroundMusic.volume = 0.3;
    backgroundMusic.play().catch(e => {
        console.log('Reproducción automática bloqueada, el usuario debe interactuar primero');
    });
}, { once: true });

// --- INICIALIZACIÓN ---
// Esperar a que carguen las imágenes
let imagesLoaded = 0;
const totalImages = Object.keys(images).length;

Object.values(images).forEach(img => {
    img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === totalImages) {
            generateObjects();
            animate();
        }
    };
    img.onerror = () => {
        console.log('Error cargando imagen:', img.src);
        imagesLoaded++;
        if (imagesLoaded === totalImages) {
            generateObjects();
            animate();
        }
    };
});

// Si no hay imágenes, iniciar igualmente
setTimeout(() => {
    if (objects.length === 0) {
        generateObjects();
        animate();
    }
}, 1000);