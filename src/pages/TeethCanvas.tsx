import React, {useEffect} from 'react';
import styled from "styled-components";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {STLLoader} from "three/examples/jsm/loaders/STLLoader";
import {WebGLRenderer} from "three";

const TeethCanvas = () => {
    useEffect(() => {
        const canvas = document.getElementById("3d");
        const backgroundColor = 0xafeeee;


        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.1,
            800
        );
        camera.position.set(5, 5, 5);

        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, (window.innerHeight * 0.8));
        renderer.setClearColor(backgroundColor); //0x );

        renderer.toneMapping = THREE.LinearToneMapping;
        renderer.toneMappingExposure = Math.pow(0.94, 5.0);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        if (canvas) {
            canvas.appendChild(renderer.domElement);
        }


        const controls = new OrbitControls(camera, renderer.domElement);


        const light = new THREE.PointLight(0xffffff, 2, 100);
        light.position.set(4, 5, -30);
        scene.add(light);

        const light2 = new THREE.PointLight(0xffffff, 2, 100);
        light2.position.set(4, 5, 30);
        scene.add(light2);


        // const loader = new GLTFLoader();
        // loader.parse(model.buffer,null,(gltf)=>{
        //     console.log({gltf})
        // })


        const loader = new STLLoader();
        loader.load(
            "static/test.stl",
            geometry => {
                // console.log("loaded", {geometry});
                const material = new THREE.MeshStandardMaterial({
                    color: 0xFFFFFF,
                    side: THREE.DoubleSide,
                    // wireframe: true,
                    emissive: 0x000000,
                    roughness: 1,
                    flatShading: true
                });
                const object = new THREE.Mesh(geometry, material);
                object.castShadow = true;
                object.scale.set(0.15, 0.15, 0.15);
                object.position.set(-0.3, -1.5, 0);
                object.rotateX(-1.5);
                object.rotateZ(0.7);
                // object.scale(0.9,0.9,0.9);
                scene.add(object);
            },
            console.error
        );

        const render = (time: number) => {
            const resizeRendererToDisplaySize = (renderer: WebGLRenderer) => {
                const canvas = renderer.domElement;
                const width = canvas.clientWidth;
                const height = canvas.clientHeight;
                const needResize = canvas.width !== width || canvas.height !== height;
                if (needResize) {
                    renderer.setSize(width, height, false);
                }
                return needResize;
            }
            time *= 0.001; // convert time to seconds


            if (resizeRendererToDisplaySize(renderer)) {
                const canvas = renderer.domElement;
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }

            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }

        requestAnimationFrame(render);

    }, [])
    return (
        <AppCanvas id="3d"/>
    );
};


const AppCanvas = styled.div`
    height: 72vh;
`


export {TeethCanvas};
