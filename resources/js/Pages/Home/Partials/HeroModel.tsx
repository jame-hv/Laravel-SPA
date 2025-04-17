import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import type * as THREE from "three";
import { Color } from "three";

const bloomColor = new Color("#fff");
bloomColor.multiplyScalar(1.5);

export function HeroModel() {
    const particle = useRef<THREE.Group>(null);

    const particles = useMemo(() => {
        const temp = [];
        const particleCount = 500;
        const radius = 2.7;

        for (let i = 0; i < particleCount; i++) {
            const randomPosition = [
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
            ];

            // Calculate sphere positions
            const phi = Math.acos(-1 + (2 * i) / particleCount);
            const theta = Math.sqrt(particleCount * Math.PI) * phi;
            const spherePosition = [
                radius * Math.cos(theta) * Math.sin(phi),
                radius * Math.sin(theta) * Math.sin(phi),
                radius * Math.cos(phi),
            ];

            temp.push({
                initialPosition: randomPosition,
                spherePosition: spherePosition,
            });
        }
        return temp;
    }, []);

    // Animation spring with slower, smoother configuration
    const [springs, api] = useSpring(() => ({
        from: { progress: 0 },
        to: { progress: 1 },
        config: {
            mass: 2,
            tension: 80,
            friction: 20,
            duration: 2000,
        },
    }));

    useFrame((state, delta) => {
        if (particle.current) {
            particle.current.rotation.x += delta * 0.25;
        }
    });

    // Component to represent each animated particle
    const AnimatedParticle = animated("mesh");

    return (
        <>
            <color attach="background" args={["#000000"]} />
            <ambientLight intensity={0.5} />
            {/* <directionalLight position={[5, 5, 5]} intensity={1} /> */}

            <group ref={particle}>
                {particles.map((particle, i) => (
                    <AnimatedParticle
                        key={i}
                        position={springs.progress.to((p) => [
                            particle.initialPosition[0] * (1 - p) +
                                particle.spherePosition[0] * p,
                            particle.initialPosition[1] * (1 - p) +
                                particle.spherePosition[1] * p,
                            particle.initialPosition[2] * (1 - p) +
                                particle.spherePosition[2] * p,
                        ])}
                    >
                        <sphereGeometry args={[0.03, 16, 16]} />{" "}
                        <meshBasicMaterial
                            color={bloomColor}
                            toneMapped={false}
                        />
                    </AnimatedParticle>
                ))}
            </group>
        </>
    );
}
