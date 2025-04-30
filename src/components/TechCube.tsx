"use client";

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Define expanded shape types, removing sphere
type ShapeType = 'cube' | 'tetrahedron' | 'torus' | 'octahedron' | 'dodecahedron' | 'icosahedron';

interface AnimatedShapeProps {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  speed: number;
  shapeType: ShapeType;
}

const AnimatedShape = ({ position, size, color, speed, shapeType }: AnimatedShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * speed * 0.3);
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * speed * 0.5);
    }
  });

  // Render different geometries based on shapeType
  const renderGeometry = () => {
    switch (shapeType) {
      case 'tetrahedron':
        // For triangular pyramids, use tetrahedronGeometry with radius and detail
        return <tetrahedronGeometry args={[size[0] * 0.7, 0]} />;
      case 'torus':
        // For donut shapes, use torusGeometry with radius, tube, radialSegments, tubularSegments
        return <torusGeometry args={[size[0] * 0.4, size[0] * 0.2, 16, 32]} />;
      case 'octahedron':
        // For 8-faced diamond shapes, use octahedronGeometry with radius and detail
        return <octahedronGeometry args={[size[0] * 0.6, 0]} />;
      case 'dodecahedron':
        // For 12-faced shapes, use dodecahedronGeometry with radius and detail
        return <dodecahedronGeometry args={[size[0] * 0.6, 0]} />;
      case 'icosahedron':
        // For 20-faced shapes, use icosahedronGeometry with radius and detail
        return <icosahedronGeometry args={[size[0] * 0.6, 0]} />;
      case 'cube':
      default:
        // Default to cube
        return <boxGeometry args={size} />;
    }
  };

  return (
    <mesh position={position} ref={meshRef}>
      {renderGeometry()}
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
    </mesh>
  );
}

const TechCube = () => {
  // Add state to track current shape type
  const [currentShape, setCurrentShape] = useState<ShapeType>('cube');
  
  // Technology data
  const technologies = [
    { name: "React", color: "#61DAFB", position: [-2, 0, 0] as [number, number, number] },
    { name: "Next.js", color: "#000000", position: [0, 0, -2] as [number, number, number] },
    { name: "TypeScript", color: "#3178C6", position: [2, 0, 0] as [number, number, number] },
    { name: "Node.js", color: "#339933", position: [0, 0, 2] as [number, number, number] },
    { name: "TailwindCSS", color: "#06B6D4", position: [0, 2, 0] as [number, number, number] },
    { name: "Three.js", color: "#FF0000", position: [0, -2, 0] as [number, number, number] },
  ];
  
  // Function to cycle through shape types
  const cycleShapeType = () => {
    setCurrentShape(prev => {
      switch(prev) {
        case 'cube': return 'tetrahedron';
        case 'tetrahedron': return 'torus';
        case 'torus': return 'octahedron';
        case 'octahedron': return 'dodecahedron';
        case 'dodecahedron': return 'icosahedron';
        case 'icosahedron': return 'cube';
        default: return 'cube';
      }
    });
  };
  
  // Get a more user-friendly shape name for display
  const getShapeName = (shape: ShapeType): string => {
    switch(shape) {
      case 'cube': return 'Cubes';
      case 'tetrahedron': return 'Triangles';
      case 'torus': return 'Donuts';
      case 'octahedron': return 'Octahedrons';
      case 'dodecahedron': return 'Dodecahedrons';
      case 'icosahedron': return 'Icosahedrons';
      default: return 'Cubes';
    }
  };
  
  return (
    <div className="relative h-full w-full">
      {/* Shape switcher button */}
      <button 
        onClick={cycleShapeType}
        className="absolute bottom-4 right-4 z-10 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
      >
        Shapes: {getShapeName(currentShape)}
      </button>

      <Canvas camera={{ position: [4, 4, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        {/* Tech shapes */}
        {technologies.map((tech, index) => (
          <AnimatedShape 
            key={tech.name}
            position={tech.position}
            size={[1, 1, 1]}
            color={tech.color}
            speed={(index + 1) * 0.2}
            shapeType={currentShape}
          />
        ))}
        
        <OrbitControls enableZoom={false} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default TechCube;