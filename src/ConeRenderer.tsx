import  { useEffect, useRef } from 'react';
import * as THREE from 'three';

type ConeRendererPropsType = {
    vertices: Array<number>;
    indices: Array<number>;
}
const ConeRenderer = ({ vertices, indices }: ConeRendererPropsType) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        scene.background = new THREE.Color(0xEEEEEE);
        renderer.setSize(window.innerWidth, window.innerHeight);

        const geometry = new THREE.BufferGeometry();
        geometry.setIndex( indices );
        geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array(vertices), 3 ) );
        const material = new THREE.MeshBasicMaterial({ color: 0x474849 });

        const cone = new THREE.Mesh(geometry, material);

        scene.add(cone);

        camera.position.z = 5;

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1).normalize();
        scene.add(light);

        const animate = () => {
            requestAnimationFrame(animate);

            cone.rotation.x += 0.01;
            cone.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        animate();
    }, [indices, vertices]);

    return <canvas ref={canvasRef} />;
};

export default ConeRenderer;