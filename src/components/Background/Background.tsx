import "./Background.css";
import { Canvas } from '@react-three/fiber';
import { useCallback, useContext, useState } from "react";
import { AppContext } from "~/global/AppContext";
import { Text } from "~/components";

/** Assets */

import FireLoop from "~/assets/sounds/fire.m4a";
import CricketLoop from "~/assets/sounds/crickets.m4a";
import DaytimeAmbientLoop from "~/assets/sounds/daytime_ambient.m4a"
import SasquatchImage from "~/assets/images/sasquatch.webp";
import SasquatchGrowl from "~/assets/sounds/sasquatch_growl.m4a"

/** Subcomponents */

import Audio from "./subcomponents/Audio";
import ImageSprite from "./subcomponents/ImageSprite";
import DeviceOrientationCamera from "./subcomponents/DeviceOrientationCamera";
import Binder from "./subcomponents/Binder";
import { BinderView, Button, Header, Tabs } from "./subcomponents/BinderUI";
import Trees from "./subcomponents/scenery/Trees";
import Mountains from "./subcomponents/scenery/Mountains";
import Skybox from "./subcomponents/scenery/Skybox";
import Campground from "./subcomponents/scenery/Campground";

/** Renders a 3D camping scene. */
export default function Scene() {
  /** Global state */

  const {
    get: {
      isFireOn,
      isFlashlightOn,
      isNightTime,
      isBookOpen,
    },
    set: {
      setIsFireOn,
      setIsFlashlightOn,
      setIsNightTime,
      setIsBookOpen,
    }
  } = useContext(AppContext);

  /** State */

  const [activeTab, setActiveTab] = useState<string>("projects");
  
  /** Flags */

  // Show sasquatch only when it's dark (night, no fire, no flashlight)
  const showSasquatch = isNightTime && !isFireOn && !isFlashlightOn;

  const isMobile = window.innerWidth < 768;

  /** Camera manipulation */

  /** Calculate camera y-position based on screen aspect ratio to prevent ground clipping. */
  const getCameraY = useCallback(() => {
    const baseHeight = 0.03;

    if (!isMobile) return baseHeight;

    const aspectRatio = window.innerWidth / window.innerHeight;
    // For narrower screens (portrait), we need to position camera higher to prevent the bottom of the view from clipping through ground
    const adjustment = (1 - aspectRatio) * 0.15; // Adjusts based on how 'portrait' the screen is

    return baseHeight + Math.max(0, adjustment);
  }, [isMobile]);

  const cameraPosition: [number, number, number] = isMobile
    ? [0.075, getCameraY(), 3]
    : [0.21, 0.03, 3.04];

  const cameraRotation: [number, number, number] = isMobile
    ? [0.1, 0.125, 0]
    : [0.27925268031909284, 0.13962634015954653, 0];

  return (
    <Canvas
      className='main-canvas'
      dpr={[1, 2]}
      gl={{
        antialias: !isMobile,
        powerPreference: isMobile ? 'low-power' : 'high-performance'
      }}
      onCreated={() => {
        setTimeout(() => setIsBookOpen(true), 1000);
      }}
    >
      {/* GLOBAL */}

      <DeviceOrientationCamera
        position={cameraPosition}
        baseRotation={cameraRotation}
        fov={isMobile ? 60 : 50}
        maxRotationY={0.15}
        maxRotationX={0.15}
        maxTiltAngle={25}
        smoothing={0.06}
        enabled={isMobile}
      />
      <Audio url={FireLoop} isPlaying={isFireOn} volume={1.5} />
      <Audio url={CricketLoop} isPlaying={isNightTime} volume={0.01} fadeDuration={2000} />
      <Audio url={DaytimeAmbientLoop} isPlaying={!isNightTime} volume={1.5} fadeDuration={2000} />

      {/* Reading light for the journal at night */}
      {isNightTime && isBookOpen && (
        <pointLight
          position={[0.25, 0.2, 2.9]}
          intensity={0.25}
          distance={0.3}
          color="#fffaf0"
        />
      )}

      {/* BOOK */}
      <Binder
        restPosition={[0.13, 0.025, 2.6]}
        restRotation={[-Math.PI / 8, 0, 0.05]}
        restScale={0.3}
        activePosition={[0.25, 0.09, 2.85]}
        activeRotation={[0.2, 0.115, 0]}
        activeScale={1.075}
        isActive={isBookOpen}
        isOpen={isBookOpen}
        onClick={() => setIsBookOpen(true)}
        coverText={{
          title: "Survival Guide",
          subtitle: "by Devin Curtis",
          backgroundColor: "#8b1e2f",
        }}
        coverInsideContent={
          <BinderView>
            <Header>Survival Guide</Header>
            <br />
            <Text bold fontSize={4} className="handwritten-text">
              Thank you for visiting my <span className="custom-strike">portfolio</span> campsite!<br /><br />
              This guide contains tips and tricks for surviving the wilderness of web development.<br /><br />
              If at any time you'd like to stop reading and explore the environment, simply click the close button below. Happy camping!<br /><br />
              <i>P.S. Don't make eye contact with the sasquatch.</i>
            </Text>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button onClick={() => setIsBookOpen(false)} >Close</Button>
            </div>
          </BinderView>
        }
        pageContent={
          <>
            <Tabs
              activeTab={activeTab}
              onTabChange={(tabId) => setActiveTab(tabId.toString())}
              tabs={[
                { id: "projects", label: "Projects" },
                { id: "resume", label: "Resume" },
                { id: "contact", label: "Contact" }
              ]}
            />
            <BinderView>
              <Header>My Projects</Header>
              <Text bold fontSize={10}>Devin Curtis</Text>
            </BinderView>
          </>
        }
      />

      {/* CAMP */}
      <Campground
        isNightTime={isNightTime}
        isFireOn={isFireOn}
        isFlashlightOn={isFlashlightOn}
        onToggleFire={() => setIsFireOn((prev) => !prev)}
        onToggleFlashlight={() => setIsFlashlightOn((prev) => !prev)}
      />

      {/* SASQUATCH - visible only when dark (night, no fire, no flashlight) */}
      <ImageSprite
        imagePath={SasquatchImage}
        position={isMobile
          ? [0.15, 0.05, 2.15]
          : [0.3, 0.075, 2.15]
        }
        scale={[0.15, 0.15, 1]}
        isVisible={showSasquatch}
        name="sasquatch"
        sound={{
          soundPath: SasquatchGrowl,
          volume: 0.1,
        }}
        affectedByLighting={true}
        brightness={5}
      />

      {/* SKYBOX & ENVIRONMENT */}
      <Skybox
        isNightTime={isNightTime}
        onToggleNightTime={() => setIsNightTime((prev) => !prev)}
      />
      <Mountains />
      <Trees />
    </Canvas>
  );
}
