import React, {useEffect} from 'react';
import styled from "styled-components";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {STLLoader} from "three/examples/jsm/loaders/STLLoader";

const TeethCanvas = () => {
    useEffect(() => {
        const canvas = document.getElementById("3d");
        const backgroundColor = 0xafeeee;

        /*////////////////////////////////////////*/

        var scene = new THREE.Scene();

        var camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.1,
            800
        );
        camera.position.set(5, 5, 5);

        var renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, (window.innerHeight * 0.8));
        renderer.setClearColor(backgroundColor); //0x );

        renderer.toneMapping = THREE.LinearToneMapping;
        renderer.toneMappingExposure = Math.pow(0.94, 5.0);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;

// window.addEventListener(
//     "resize",
//     () => {
//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, (window.innerHeight*0.8));
//     },
//     false
// );

        canvas.appendChild(renderer.domElement);

        /* ////////////////////////////////////////////////////////////////////////// */

        var controls = new OrbitControls(camera, renderer.domElement);

// controls.rotateSpeed = 0.3;
// controls.zoomSpeed = 0.9;
//
// controls.minDistance = 3;
// controls.maxDistance = 20;
//
// controls.minPolarAngle = 0; // radians
// controls.maxPolarAngle = Math.PI / 2; // radians
//
// controls.enableDamping = true;
// controls.dampingFactor = 0.05;

        /* ////////////////////////////////////////////////////////////////////////// */

        var light = new THREE.PointLight(0xffffff, 2, 100);
        light.position.set(4, 5, -30);
        scene.add(light);

        var light = new THREE.PointLight(0xffffff, 2, 100);
        light.position.set(4, 5, 30);
        scene.add(light);

// var light2 = new THREE.AmbientLight(0xFFFFFF, 1, 100);
// light2.position.set(4, -5, 30);
// scene.add(light2);

        /* ////////////////////////////////////////////////////////////////////////// */

        var loader = new STLLoader();
// loader.crossOrigin = true;
        loader.load(
            // "https://upload.wikimedia.org/wikipedia/commons/3/3c/3D_partial_human_mandible_with_teeth.stl",
            "https://ormcotestglfx.s3.eu-central-1.amazonaws.com/stl/107515U50.stl",
            geometry => {
                console.log("loaded", {geometry});
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
            console.log,
            console.err
        );

        function render(time) {
            time *= 0.001; // convert time to seconds
            function resizeRendererToDisplaySize(renderer) {
                const canvas = renderer.domElement;
                const width = canvas.clientWidth;
                const height = canvas.clientHeight;
                const needResize = canvas.width !== width || canvas.height !== height;
                if (needResize) {
                    renderer.setSize(width, height, false);
                }
                return needResize;
            }

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
        <AppCanvas id="3d"></AppCanvas>
    );
};


const AppCanvas = styled.div`
    height: 80vh;
`


export {TeethCanvas};
