import { useContext } from 'react';
import { AppContext } from '~/context/AppContext';
import { theme } from '~/theme';
import FlickeringLight from '../FlickeringLight';
import FireSprite from '../FireSprite';
import SmokeSprite from '../SmokeSprite';
import Flashlight from '../Flashlight';

const Campground = () => {
  const {
    get: { isNightTime, isBookOpen },
    set: { setIsFireOn },
  } = useContext(AppContext);
  const disableInteraction = isBookOpen;

  return (
    <>
      {/* Fire effects */}
      {isNightTime && (
        <FlickeringLight
          position={[0, 0.03, 2.73]}
          color={{
            lit: theme.scene.fireLit,
            unlit: theme.scene.fireUnlit,
          }}
          baseIntensity={1}
        />
      )}
      <FireSprite position={[0, 0.025, 2.73]} />
      <SmokeSprite position={[0, -0.1, 2.73]} />

      {/* Flashlight */}
      <Flashlight />

      {/* Campfire logs bundle */}
      <group
        name='campfire'
        position={[0, 0.01, 2.73]}
        scale={[0.34, 0.34, 0.34]}
        rotation={[0, -0.26179938779914963, 0]}
      >
        {/* Invisible cube for click detection */}
        <mesh
          scale={[0.2, 0.2, 0.2]}
          position={[0, 0, 0]}
          visible={false}
          onClick={disableInteraction ? undefined : () => setIsFireOn((prev) => !prev)}
        >
          <boxGeometry />
          <meshStandardMaterial color={theme.scene.metal} />
        </mesh>
        {/* Log 1 - Right */}
        <mesh position={[0.06, 0.008, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.018, 0.018, 0.16, 8]} />
          <meshStandardMaterial color={theme.scene.woodDark} />
        </mesh>
        {/* Log 2 - Left */}
        <mesh position={[-0.06, 0.008, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.018, 0.018, 0.16, 8]} />
          <meshStandardMaterial color={theme.scene.woodMedium} />
        </mesh>
        {/* Log 3 - Front */}
        <mesh position={[0, 0.008, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.16, 8]} />
          <meshStandardMaterial color={theme.scene.woodDark} />
        </mesh>
        {/* Log 4 - Back */}
        <mesh position={[0, 0.008, -0.06]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.16, 8]} />
          <meshStandardMaterial color={theme.scene.woodMedium} />
        </mesh>
        {/* Log 5 - Front-Right diagonal */}
        <mesh position={[0.042, 0.008, 0.042]} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.018, 0.018, 0.16, 8]} />
          <meshStandardMaterial color={theme.scene.woodDark} />
        </mesh>
        {/* Log 6 - Front-Left diagonal */}
        <mesh position={[-0.042, 0.008, 0.042]} rotation={[Math.PI / 2, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.018, 0.018, 0.16, 8]} />
          <meshStandardMaterial color={theme.scene.woodMedium} />
        </mesh>
        {/* Log 7 - Back-Right diagonal */}
        <mesh position={[0.042, 0.008, -0.042]} rotation={[Math.PI / 2, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.018, 0.018, 0.16, 8]} />
          <meshStandardMaterial color={theme.scene.woodDark} />
        </mesh>
        {/* Log 8 - Back-Left diagonal */}
        <mesh position={[-0.042, 0.008, -0.042]} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.018, 0.018, 0.16, 8]} />
          <meshStandardMaterial color={theme.scene.woodMedium} />
        </mesh>
      </group>

      {/* Sitting log */}
      <mesh
        name={'log'}
        position={[0.1, 0.03, 2.52]}
        rotation={[3.0152557600895867e-17, -0.40142572795869585, 1.5707963267948966]}
        scale={[0.6, 0.39, 0.6]}
      >
        <cylinderGeometry args={[0.05, 0.05, 0.6, 16]} />
        <meshStandardMaterial color={theme.scene.woodDark} />
      </mesh>

      {/* Tent */}
      <group
        name='tent'
        position={[-0.23, 0.0075, 2.39]}
        rotation={[0, 0.4188790204786392, 0]}
        scale={[0.75, 0.68, 0.61]}
      >
        {/* Left slanted side of tent */}
        <mesh position={[-0.09, 0.1, 0.0100000000000002]} rotation={[0, 0, 2.5]}>
          <boxGeometry args={[0.01, 0.3, 0.5]} />
          <meshStandardMaterial color={theme.scene.tent} />
        </mesh>
        {/* Right slanted side of tent */}
        <mesh position={[0.08, 0.1, 0.0100000000000002]} rotation={[0, 0, -2.5]}>
          <boxGeometry args={[0.01, 0.3, 0.5]} />
          <meshStandardMaterial color={theme.scene.tent} />
        </mesh>
        {/* Back triangle */}
        <mesh
          position={[-0.01, 0, 0.0057728639021013]}
          rotation={[0, 0, 0]}
          scale={[1.06, 1.06, 1.63]}
        >
          <boxGeometry args={[0.3, 0.01, 0.3]} />
          <meshStandardMaterial color={theme.scene.tentDark} />
        </mesh>
        {/* Tent stakes - small cylinders */}
        <mesh
          position={[-0.17, 0, 0.25]}
          rotation={[Math.PI / 6, 0, Math.PI / 8]}
          scale={[1, 0.45, 1]}
        >
          <cylinderGeometry args={[0.01, 0.01, 0.15, 8]} />
          <meshStandardMaterial color={theme.scene.metal} />
        </mesh>
        <mesh
          position={[0.154342404307889, 0, 0.24]}
          rotation={[Math.PI / 6, 0, -Math.PI / 8]}
          scale={[1, 0.49, 1]}
        >
          <cylinderGeometry args={[0.01, 0.01, 0.15, 8]} />
          <meshStandardMaterial color={theme.scene.metal} />
        </mesh>
        <mesh
          position={[0.15, 0, -0.24]}
          rotation={[-Math.PI / 6, 0, -Math.PI / 8]}
          scale={[1, 0.4, 1]}
        >
          <cylinderGeometry args={[0.01, 0.01, 0.15, 8]} />
          <meshStandardMaterial color={theme.scene.metal} />
        </mesh>
        <mesh
          position={[-0.17, 0, -0.23]}
          rotation={[-Math.PI / 6, 0, Math.PI / 8]}
          scale={[1, 0.49, 1]}
        >
          <cylinderGeometry args={[0.01, 0.01, 0.15, 8]} />
          <meshStandardMaterial color={theme.scene.metal} />
        </mesh>
      </group>
    </>
  );
};

export default Campground;
