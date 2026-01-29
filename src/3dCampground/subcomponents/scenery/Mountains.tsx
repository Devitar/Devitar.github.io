const Mountains = () => (
  <>

    <group name='mountain' position={[3.05, 0, 0]} scale={[1.49, 1, 1]}>
      <mesh position={[-1.54, 0.5, -0.1]} name={"mountain_left"}>
        <shapeGeometry />
        <meshStandardMaterial color={"#a89d9e"} />
      </mesh>
      <mesh position={[-1.54, 0.86, -0.09]} scale={[0.31, 0.29, 1.03]} name={"snow_left"}>
        <shapeGeometry />
        <meshStandardMaterial color={"#fafcfa"} />
      </mesh>
      <mesh position={[-0.3, 0.86, -0.09]} scale={[0.31, 0.29, 1.03]} name={"snow_right"}>
        <shapeGeometry />
        <meshStandardMaterial color={"#fafcfa"} />
      </mesh>
      <mesh position={[-0.9, 1.3, 0.01]} scale={[0.53, 0.56, 1.03]} name={"snow_main"}>
        <shapeGeometry />
        <meshStandardMaterial color={"#fafcfa"} />
      </mesh>
      <mesh position={[-0.3, 0.5, -0.1]} name={"mountain_right"}>
        <shapeGeometry />
        <meshStandardMaterial color={"#a89d9e"} />
      </mesh>
      <mesh position={[-0.9, 0.5, 0]} scale={[1.97, 2.16, 1]} name={"mountain_main"}>
        <shapeGeometry />
        <meshStandardMaterial color={"#a89d9e"} />
      </mesh>
    </group>
    <group name='mountain' position={[-0.29, 0, 0]} scale={[1.49, 1, 1]}>
      <mesh position={[-1.54, 0.5, -0.1]} name={"mountain_left"}>
        <shapeGeometry />
        <meshStandardMaterial color={"#a89d9e"} />
      </mesh>
      <mesh position={[-1.54, 0.86, -0.09]} scale={[0.31, 0.29, 1.03]} name={"snow_left"}>
        <shapeGeometry />
        <meshStandardMaterial color={"#fafcfa"} />
      </mesh>
      <mesh position={[-0.3, 0.86, -0.09]} scale={[0.31, 0.29, 1.03]} name={"snow_right"}>
        <shapeGeometry />
        <meshStandardMaterial color={"#fafcfa"} />
      </mesh>
      <mesh position={[-0.9, 1.3, 0.01]} scale={[0.53, 0.56, 1.03]} name={"snow_main"}>
        <shapeGeometry />
        <meshStandardMaterial color={"#fafcfa"} />
      </mesh>
      <mesh position={[-0.3, 0.5, -0.1]} name={"mountain_right"}>
        <shapeGeometry />
        <meshStandardMaterial color={"#a89d9e"} />
      </mesh>
      <mesh position={[-0.9, 0.5, 0]} scale={[1.97, 2.16, 1]} name={"mountain_main"}>
        <shapeGeometry />
        <meshStandardMaterial color={"#a89d9e"} />
      </mesh>
    </group>
  </>
);

export default Mountains;