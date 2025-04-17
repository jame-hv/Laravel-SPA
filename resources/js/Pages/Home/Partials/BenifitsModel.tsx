"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

export function BenefitsModel() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            <group ref={groupRef}>
                {/* Laravel representation */}
                <mesh position={[-1.5, 0, 0]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="#FF2D20" />
                </mesh>

                {/* Plus sign */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[0.5, 0.5, 0.5]} />
                    <meshStandardMaterial color="#FFFFFF" />
                </mesh>

                {/* React representation */}
                <mesh position={[1.5, 0, 0]}>
                    <sphereGeometry args={[0.7, 32, 32]} />
                    <meshStandardMaterial color="#61DAFB" />
                </mesh>

                {/* Orbiting particles */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <mesh
                        key={i}
                        position={[
                            Math.sin(i * 0.5) * 3,
                            Math.cos(i * 0.5) * 3,
                            Math.sin(i * 0.3) * Math.cos(i * 0.5) * 3,
                        ]}
                    >
                        <sphereGeometry args={[0.05, 16, 16]} />
                        <meshStandardMaterial
                            color={i % 2 === 0 ? "#FF2D20" : "#61DAFB"}
                            emissive={i % 2 === 0 ? "#FF2D20" : "#61DAFB"}
                            emissiveIntensity={0.5}
                        />
                    </mesh>
                ))}
            </group>
        </>
    );
}
