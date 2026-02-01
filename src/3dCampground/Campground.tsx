import './Campground.css';
import { useAppContext } from '~/global/AppContext';
import { Canvas } from '@react-three/fiber';
import { Text } from '~/components';
import { useCallback, useState, type JSX } from 'react';
import { useSoundOnChange } from '~/utils';
import type { Vector3 } from '~/types';
import type { Tab } from './subcomponents/UI/Tabs';

/** Assets */

import CricketLoop from '~/assets/sounds/crickets.m4a';
import DaytimeAmbientLoop from '~/assets/sounds/daytime_ambient.m4a';
import FireLoop from '~/assets/sounds/fire.m4a';
import SasquatchGrowl from '~/assets/sounds/sasquatch_growl.m4a';
import SasquatchImage from '~/assets/images/sasquatch.webp';
import SoundOn from '~/assets/images/sound_on.webp';
import SoundOff from '~/assets/images/sound_off.webp';
import PageTurnSound from '~/assets/sounds/page_turn.m4a';

/** Subcomponents */

import GlobalAudio from './subcomponents/GlobalAudio';
import SurvivalGuide from './subcomponents/SurvivalGuide';
import Campground from './subcomponents/scenery/Campground';
import DeviceOrientationCamera from './subcomponents/DeviceOrientationCamera';
import ImageSprite from './subcomponents/ImageSprite';
import Mountains from './subcomponents/scenery/Mountains';
import Skybox from './subcomponents/scenery/Skybox';
import Trees from './subcomponents/scenery/Trees';
import { BinderView, Button, Header, Tabs, ImageButton } from './subcomponents/UI';

/** Pages */

import { Projects, Resume, Contact } from './pages';
const PAGE_MAP: Record<number, JSX.Element | undefined> = {
  1: <Projects />,
  2: <Resume />,
  3: <Contact />,
};
const TAB_MAP: Tab[] = [
  { id: 1, label: 'Projects' },
  { id: 2, label: 'Resume' },
  { id: 3, label: 'Contact' },
];

/** Renders a 3D camping scene. */
export default function Scene() {
  /** Global state */

  const { isFireOn, isFlashlightOn, isNightTime, isBookOpen, isMuted, setIsBookOpen, setIsMuted } =
    useAppContext();

  /** State */

  const [activeTab, setActiveTab] = useState<Tab>({ id: 1, label: 'Projects' });

  /** Audio */

  // Play page turn sound on tab change
  useSoundOnChange(PageTurnSound, activeTab.id, { volume: 0.5, isMuted });

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

  const cameraPosition: Vector3 = isMobile ? [0.075, getCameraY(), 3] : [0.21, 0.03, 3.04];

  const cameraRotation: Vector3 = isMobile
    ? [0.1, 0.125, 0]
    : [0.27925268031909284, 0.13962634015954653, 0];

  return (
    <>
      <ImageButton
        image={isMuted ? SoundOff : SoundOn}
        alt="mute and unmute"
        height="5rem"
        width="6rem"
        onClick={() => setIsMuted((prev: boolean) => !prev)}
      />
      <Canvas
        className="main-canvas"
        dpr={[1, 2]}
        gl={{
          antialias: !isMobile,
          powerPreference: isMobile ? 'low-power' : 'high-performance',
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
          enabled={isMobile && !isBookOpen}
        />
        <GlobalAudio url={FireLoop} isPlaying={isFireOn} volume={isMuted ? 0 : 1.5} />
        <GlobalAudio
          url={CricketLoop}
          isPlaying={isNightTime}
          volume={isMuted ? 0 : 0.01}
          fadeDuration={2000}
        />
        <GlobalAudio
          url={DaytimeAmbientLoop}
          isPlaying={!isNightTime}
          volume={isMuted ? 0 : 1.5}
          fadeDuration={2000}
        />

        {/* Reading light for the journal at night */}
        {isNightTime && isBookOpen && (
          <pointLight
            position={[isMobile ? 0.125 : 0.25, 0.2, 3]}
            intensity={0.25}
            distance={0.3}
            color="#fffaf0"
          />
        )}

        {/* BOOK */}
        <SurvivalGuide
          restPosition={[0.13, 0.025, 2.6]}
          restRotation={[-Math.PI / 8, 0, 0.05]}
          restScale={0.3}
          activeRotation={[isMobile ? 0.1 : 0.2, 0.125, 0]}
          fitToViewport
          maxScale={2}
          minScale={0.1}
          viewportPadding={isMobile ? 0.9 : 0.95}
          isActive={isBookOpen}
          isOpen={isBookOpen}
          isMobile={isMobile}
          onClick={() => setIsBookOpen(true)}
          coverText={{
            title: 'Survival Guide',
            subtitle: 'by Devin Curtis',
            backgroundColor: '#8b1e2f',
          }}
          coverInsideContent={
            <BinderView>
              <Header>Survival Guide</Header>
              <br />
              <Text bold fontSize={4} className="handwritten-text">
                Thank you for visiting my <span className="custom-strike">portfolio</span> campsite!
                <br />
                <br />
                This guide contains tips and tricks for surviving the wilderness of web development.
                <br />
                <br />
                If at any time you'd like to stop reading and explore the environment, simply click
                the close button below. Happy camping!
                <br />
                <br />
                <i>P.S. Don't make eye contact with the sasquatch.</i>
              </Text>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button onClick={() => setIsBookOpen(false)}>Close</Button>
              </div>
            </BinderView>
          }
          pageContent={
            <>
              <Tabs
                activeTab={activeTab.id}
                onTabChange={(tab) => setActiveTab(tab)}
                tabs={TAB_MAP}
              />
              <BinderView>
                <Header>{activeTab.label}</Header>
                {PAGE_MAP[activeTab.id]}
              </BinderView>
            </>
          }
        />

        {/* CAMP */}
        <Campground />

        {/* SASQUATCH - visible only when dark (night, no fire, no flashlight) */}
        <ImageSprite
          imagePath={SasquatchImage}
          position={isMobile ? [0.15, 0.05, 2.15] : [0.3, 0.075, 2.15]}
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
        <Skybox />
        <Mountains />
        <Trees />
      </Canvas>
    </>
  );
}
