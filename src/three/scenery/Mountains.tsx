import { memo } from 'react';
import { MeshStandardMaterial } from 'three';
import { theme } from '~/theme';

const rockMaterial = new MeshStandardMaterial({ color: theme.scene.mountainRock });
const snowMaterial = new MeshStandardMaterial({ color: theme.scene.mountainSnow });

const Mountains = () => (
  <>
    <group name='mountain' position={[3.05, 0, 0]} scale={[1.49, 1, 1]}>
      <mesh position={[-1.54, 0.5, -0.1]} name={'mountain_left'} material={rockMaterial}>
        <shapeGeometry />
      </mesh>
      <mesh
        position={[-1.54, 0.86, -0.09]}
        scale={[0.31, 0.29, 1.03]}
        name={'snow_left'}
        material={snowMaterial}
      >
        <shapeGeometry />
      </mesh>
      <mesh
        position={[-0.3, 0.86, -0.09]}
        scale={[0.31, 0.29, 1.03]}
        name={'snow_right'}
        material={snowMaterial}
      >
        <shapeGeometry />
      </mesh>
      <mesh
        position={[-0.9, 1.3, 0.01]}
        scale={[0.53, 0.56, 1.03]}
        name={'snow_main'}
        material={snowMaterial}
      >
        <shapeGeometry />
      </mesh>
      <mesh position={[-0.3, 0.5, -0.1]} name={'mountain_right'} material={rockMaterial}>
        <shapeGeometry />
      </mesh>
      <mesh
        position={[-0.9, 0.5, 0]}
        scale={[1.97, 2.16, 1]}
        name={'mountain_main'}
        material={rockMaterial}
      >
        <shapeGeometry />
      </mesh>
    </group>
    <group name='mountain' position={[-0.29, 0, 0]} scale={[1.49, 1, 1]}>
      <mesh position={[-1.54, 0.5, -0.1]} name={'mountain_left'} material={rockMaterial}>
        <shapeGeometry />
      </mesh>
      <mesh
        position={[-1.54, 0.86, -0.09]}
        scale={[0.31, 0.29, 1.03]}
        name={'snow_left'}
        material={snowMaterial}
      >
        <shapeGeometry />
      </mesh>
      <mesh
        position={[-0.3, 0.86, -0.09]}
        scale={[0.31, 0.29, 1.03]}
        name={'snow_right'}
        material={snowMaterial}
      >
        <shapeGeometry />
      </mesh>
      <mesh
        position={[-0.9, 1.3, 0.01]}
        scale={[0.53, 0.56, 1.03]}
        name={'snow_main'}
        material={snowMaterial}
      >
        <shapeGeometry />
      </mesh>
      <mesh position={[-0.3, 0.5, -0.1]} name={'mountain_right'} material={rockMaterial}>
        <shapeGeometry />
      </mesh>
      <mesh
        position={[-0.9, 0.5, 0]}
        scale={[1.97, 2.16, 1]}
        name={'mountain_main'}
        material={rockMaterial}
      >
        <shapeGeometry />
      </mesh>
    </group>
  </>
);

export default memo(Mountains);
