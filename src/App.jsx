import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const App = () => {
	const scene = useRef(null);
	const camera = useRef(null);
	const renderer = useRef(null);

	const init = useCallback(() => {
		scene.current = new THREE.Scene();
		camera.current = new THREE.PerspectiveCamera(
			55,
			window.innerWidth / window.innerHeight,
			45,
			30000,
		);
		camera.current.position.set(-900, -200, -900);

		renderer.current = new THREE.WebGLRenderer({ antialias: true });
		renderer.current.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.current.domElement);

		let controls = new OrbitControls(camera.current, renderer.current.domElement);
		controls.minDistance = 400;
		controls.maxDistance = 4000;

		let materialArray = [];
		let texture_nx = new THREE.TextureLoader().load("/images/negx.jpg");
		let texture_ny = new THREE.TextureLoader().load("/images/negy.jpg");
		let texture_nz = new THREE.TextureLoader().load("/images/negz.jpg");
		let texture_px = new THREE.TextureLoader().load("/images/posx.jpg");
		let texture_py = new THREE.TextureLoader().load("/images/posy.jpg");
		let texture_pz = new THREE.TextureLoader().load("/images/posz.jpg");

		materialArray.push(new THREE.MeshBasicMaterial({ map: texture_px }));
		materialArray.push(new THREE.MeshBasicMaterial({ map: texture_nx }));
		materialArray.push(new THREE.MeshBasicMaterial({ map: texture_py }));
		materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ny }));
		materialArray.push(new THREE.MeshBasicMaterial({ map: texture_pz }));
		materialArray.push(new THREE.MeshBasicMaterial({ map: texture_nz }));

		for (let i = 0; i < 6; i++) {
			materialArray[i].side = THREE.BackSide;
		}

		let skyBoxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
		let skyBox = new THREE.Mesh(skyBoxGeo, materialArray);
		scene.current.add(skyBox);

		animate();
	}, []);

	useEffect(() => {
		init();
		return () => {
			cleanUp();
		};
	}, [init]);

	function animate() {
		renderer.current.render(scene.current, camera.current);
		requestAnimationFrame(animate);
	}

	const cleanUp = useCallback(() => {
		renderer.current.dispose();
		document.body.removeChild(renderer.current.domElement);
	}, []);

	return <></>;
};

export default App;
