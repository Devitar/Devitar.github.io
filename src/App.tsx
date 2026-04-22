import './App.css';
import { AppContextProvider, useAppContext } from '~/context/AppContext';
import { Canvas } from '@react-three/fiber';
import { Text, ErrorBoundary } from '~/components';
import { lazy, Suspense, useCallback, useMemo, useState, type JSX } from 'react';
import { useIsMobile, useSoundOnChange } from '~/hooks';
import { theme } from '~/theme';
import type { Vector3 } from '~/types';
import type { Tab } from '~/components';

/** Assets */

import CricketLoop from '~/assets/sounds/crickets.m4a';
import DaytimeAmbientLoop from '~/assets/sounds/daytime_ambient.m4a';
import FireLoop from '~/assets/sounds/fire.m4a';
import SasquatchGrowl from '~/assets/sounds/sasquatch_growl.m4a';
import SasquatchImage from '~/assets/images/sasquatch.webp';
import SoundOn from '~/assets/images/sound_on.webp';
import SoundOff from '~/assets/images/sound_off.webp';
import PageTurnSound from '~/assets/sounds/page_turn.m4a';

/** Three.js Components */

import {
  Campground,
  DeviceOrientationCamera,
  GlobalAudio,
  ImageSprite,
  Mountains,
  Skybox,
  SurvivalGuide,
  Trees,
} from '~/three';
import {
  BinderView,
  Button,
  Header,
  Tabs,
  ImageButton,
  PaperEffect,
  MobileModal,
} from '~/components';

/** Pages */

const Projects = lazy(() => import('~/pages/Projects/Projects'));
const Resume = lazy(() => import('~/pages/Resume/Resume'));
const Contact = lazy(() => import('~/pages/Contact/Contact'));

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

/** Constants */

const BOOK_OPEN_DELAY = 1000; // ms
const MOBILE_BOOK_OPEN_DELAY = 500; // ms

const REST_POSITION: Vector3 = [0.13, 0.025, 2.6];
const REST_ROTATION: Vector3 = [-Math.PI / 8, 0, 0.05];
const DESKTOP_CAMERA_POSITION: Vector3 = [0.21, 0.03, 3.04];
const DESKTOP_CAMERA_ROTATION: Vector3 = [0.27925268031909284, 0.13962634015954653, 0];
const MOBILE_CAMERA_ROTATION: Vector3 = [0.1, 0.125, 0];

/** The main scene content. */
function Scene() {
  const { isFireOn, isFlashlightOn, isNightTime, isBookOpen, isMuted, setIsBookOpen, setIsMuted } =
    useAppContext();

  /** State */

  const [activeTab, setActiveTab] = useState<Tab>({ id: 1, label: 'Projects' });
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const [isModalClosed, setIsModalClosed] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [resetTrigger, setResetTrigger] = useState(0);

  const resetZoom = useCallback(() => {
    setResetTrigger((prev) => prev + 1);
  }, []);

  const handleCloseBook = useCallback(() => {
    resetZoom();
    setIsBookOpen(false);
  }, [resetZoom, setIsBookOpen]);

  const handleOpenBook = useCallback(() => setIsBookOpen(true), [setIsBookOpen]);

  const coverText = useMemo(
    () => ({
      title: 'Survival Guide',
      subtitle: 'by Devin Curtis',
      backgroundColor: theme.scene.bookCover,
    }),
    []
  );

  const coverInsideContent = useMemo(
    () => (
      <BinderView>
        <div className='text-section'>
          <PaperEffect>
            <Text fontSize={4} className='handwritten-text'>
              Thank you for visiting my <span className='custom-strike'>portfolio</span> campsite!
              <br />
              <br />
              This guide contains tips and tricks for surviving the wilderness of web development.
              <br />
              <br />
              If at any time you'd like to stop reading and explore the environment, simply click
              the close button below. Happy camping!
              <br />
              <br />
            </Text>
            <Text bold fontSize={3} className='handwritten-text'>
              <i style={{ textDecoration: 'underline' }}>
                P.S. Don't make eye contact with the sasquatch.
              </i>
            </Text>
          </PaperEffect>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button variant='secondary' onClick={handleCloseBook}>
            Close
          </Button>
        </div>
      </BinderView>
    ),
    [handleCloseBook]
  );

  const pageContent = useMemo(
    () => (
      <>
        <Tabs activeTab={activeTab.id} onTabChange={setActiveTab} tabs={TAB_MAP} />
        <BinderView>
          <Header>{activeTab.label}</Header>
          <Suspense fallback={null}>{PAGE_MAP[activeTab.id]}</Suspense>
        </BinderView>
      </>
    ),
    [activeTab]
  );

  /** Audio */

  // Play page turn sound on tab change
  useSoundOnChange(PageTurnSound, activeTab.id, { volume: 0.5, isMuted });

  /** Flags */

  // Show sasquatch only when it's dark (night, no fire, no flashlight)
  const showSasquatch = isNightTime && !isFireOn && !isFlashlightOn;

  const isMobile = useIsMobile();

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

  const cameraPosition = useMemo<Vector3>(
    () => (isMobile ? [0.075, getCameraY(), 3] : DESKTOP_CAMERA_POSITION),
    [isMobile, getCameraY]
  );

  const cameraRotation = useMemo<Vector3>(
    () => (isMobile ? MOBILE_CAMERA_ROTATION : DESKTOP_CAMERA_ROTATION),
    [isMobile]
  );

  const activeRotation = useMemo<Vector3>(() => [isMobile ? 0.1 : 0.2, 0.125, 0], [isMobile]);

  return (
    <>
      <ImageButton
        image={isMuted ? SoundOff : SoundOn}
        alt='mute and unmute'
        height='5rem'
        width='6rem'
        onClick={() => setIsMuted((prev: boolean) => !prev)}
      />
      <MobileModal
        title='Welcome!'
        content={`
          Thanks for visiting my portfolio! It looks like you're viewing this on a mobile device -
          It should still work, but you'll get the best experience on a larger screen.
        `}
        buttonText='Got it'
        onClose={() => {
          setIsModalClosed(true);
          if (isCanvasReady) {
            setTimeout(() => setIsBookOpen(true), MOBILE_BOOK_OPEN_DELAY);
          }
        }}
      />
      {isMobile && zoomScale > 1.1 && (
        <div className='reset-zoom-container'>
          <Button variant='secondary' onClick={resetZoom}>
            Reset Zoom
          </Button>
        </div>
      )}
      <Canvas
        className='main-canvas'
        dpr={[1, 2]}
        gl={{
          antialias: !isMobile,
          powerPreference: isMobile ? 'low-power' : 'high-performance',
        }}
        onCreated={() => {
          setIsCanvasReady(true);
          if (!isMobile) {
            setTimeout(() => setIsBookOpen(true), BOOK_OPEN_DELAY);
          } else if (isModalClosed) {
            setTimeout(() => setIsBookOpen(true), MOBILE_BOOK_OPEN_DELAY);
          }
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
          enablePinchZoom={isMobile && isBookOpen}
          minFov={25}
          onZoomChange={setZoomScale}
          resetTrigger={resetTrigger}
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
            color={theme.scene.readingLight}
          />
        )}

        {/* BOOK */}
        <SurvivalGuide
          restPosition={REST_POSITION}
          restRotation={REST_ROTATION}
          restScale={0.3}
          activeRotation={activeRotation}
          fitToViewport
          maxScale={2}
          minScale={0.1}
          viewportPadding={isMobile ? 0.9 : 0.95}
          isActive={isBookOpen}
          isOpen={isBookOpen}
          isMobile={isMobile}
          zoomScale={zoomScale}
          baseFov={isMobile ? 60 : 50}
          onClick={handleOpenBook}
          coverText={coverText}
          coverInsideContent={coverInsideContent}
          pageContent={pageContent}
        />

        {/* CAMP */}
        <Campground />

        {/* SASQUATCH - visible only when dark (night, no fire, no flashlight) */}
        <ImageSprite
          imagePath={SasquatchImage}
          position={isMobile ? [0.15, 0.05, 2.15] : [0.3, 0.075, 2.15]}
          scale={[0.15, 0.15, 1]}
          isVisible={showSasquatch}
          name='sasquatch'
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

/** The root application component. */
const App = () => {
  return (
    <div className='app'>
      <ErrorBoundary>
        <AppContextProvider>
          <div className='app_background_container'>
            <Scene />
          </div>
        </AppContextProvider>
      </ErrorBoundary>
    </div>
  );
};

export default App;
