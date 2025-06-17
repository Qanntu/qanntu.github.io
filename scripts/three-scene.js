export function initializeThreeJS() {
    // Obtener el canvas del HTML
    const canvas = document.getElementById('backgroundCanvas');

    // Crear la escena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({canvas, alpha: true});

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // transparente



    //  Crear estrellas como partículas
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1,
        transparent: true,
        opacity: 0.8,
        depthWrite: false, // ⚠ Evita que los puntos se solapen de manera incorrecta
        blending: THREE.AdditiveBlending, //  Hace que los puntos se mezclen con el fondo
        alphaTest: 0.5 //  Difumina los bordes y evita efectos visuales duros
    });

    const starVertices = [];
    for (let i = 0; i < 2000; i++) {
        let x = (Math.random() - 0.5) * 2000;
        let y = (Math.random() - 0.5) * 2000;
        let z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    //  Posicionar la cámara
    camera.position.z = 500;

    //  Animación del fondo
    function animate() {
        requestAnimationFrame(animate);

        // Rotación sutil para un efecto realista
        starField.rotation.y += 0.0005;
        starField.rotation.x += 0.0003;
        renderer.render(scene, camera);
    }

    //  Ajustar el tamaño de la ventana
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });



    animate();
}