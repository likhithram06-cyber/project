import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface Avatar3DProps {
  isListening: boolean;
  isSpeaking: boolean;
  isFullscreen: boolean;
}

const AvatarModel: React.FC<{ isListening: boolean; isSpeaking: boolean }> = ({ 
  isListening, 
  isSpeaking 
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const [mixer, setMixer] = useState<THREE.AnimationMixer | null>(null);
  
  // For now, we'll use a placeholder 3D model since we can't load external .glb files
  // In a real implementation, you would load your avatar .glb file here
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Subtle breathing animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Rotate slightly when listening
      if (isListening) {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
    }
    
    if (mixer) {
      mixer.update(delta);
    }
  });

  return (
    <group ref={meshRef} position={[0, -1, 0]}>
      {/* Placeholder avatar - replace with your .glb model */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[1, 1.5, 0.8]} />
        <meshStandardMaterial 
          color="#8B4513" 
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial 
          color="#FDBCB4" 
          roughness={0.8}
          metalness={0.0}
        />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.15, 2.3, 0.35]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.15, 2.3, 0.35]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Mouth - changes when speaking */}
      <mesh position={[0, 2.1, 0.35]} scale={isSpeaking ? [1.2, 0.8, 1] : [1, 1, 1]}>
        <sphereGeometry args={[0.08, 16, 8]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>
      
      {/* Glasses */}
      <mesh position={[0, 2.25, 0.3]}>
        <torusGeometry args={[0.12, 0.02, 8, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.15, 2.25, 0.3]}>
        <torusGeometry args={[0.12, 0.02, 8, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.15, 2.25, 0.3]}>
        <torusGeometry args={[0.12, 0.02, 8, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Suit jacket */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[1.1, 1.6, 0.9]} />
        <meshStandardMaterial color="#654321" roughness={0.6} />
      </mesh>
      
      {/* Tie */}
      <mesh position={[0, 1.2, 0.45]}>
        <boxGeometry args={[0.15, 0.8, 0.05]} />
        <meshStandardMaterial color="#8B0000" roughness={0.7} />
      </mesh>
    </group>
  );
};

const Avatar3D: React.FC<Avatar3DProps> = ({ isListening, isSpeaking, isFullscreen }) => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        shadows
        className="bg-transparent"
      >
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#FFD700" />
        
        <AvatarModel isListening={isListening} isSpeaking={isSpeaking} />
        
        <ContactShadows 
          position={[0, -2, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={1} 
          far={10} 
          resolution={256} 
          color="#000000" 
        />
        
        <Environment preset="studio" />
        
        {!isFullscreen && (
          <OrbitControls 
            enablePan={false} 
            enableZoom={false} 
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        )}
      </Canvas>
      
      {/* Golden glow effect when listening */}
      {isListening && (
        <div className="absolute inset-0 bg-gradient-radial from-golden-400/20 via-transparent to-transparent pointer-events-none animate-golden-pulse" />
      )}
    </div>
  );
};

export default Avatar3D;