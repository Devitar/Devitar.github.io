import { memo, useLayoutEffect, useRef } from 'react';
import {
  BoxGeometry,
  Euler,
  InstancedMesh,
  Matrix4,
  MeshStandardMaterial,
  Quaternion,
  ShapeGeometry,
  Vector3,
} from 'three';
import { theme } from '~/theme';

type TreePlacement = {
  pos: [number, number, number];
  rotY?: number;
};

const TREES: TreePlacement[] = [
  { pos: [0.24, 0, 2.01] },
  { pos: [0.13, 0, 1.79] },
  { pos: [0.34, 0, 1.79] },
  { pos: [-0.08, 0, 1.79] },
  { pos: [-0.28, 0, 1.79] },
  { pos: [0.55, 0, 1.79] },
  { pos: [0.04, 0, 2.01] },
  { pos: [-0.17, 0, 2.01] },
  { pos: [-0.39, 0, 2.01] },
  { pos: [-0.65, 0, 2.07], rotY: 1.0297442586766545 },
  { pos: [-0.67, 0, 1.88], rotY: 1.0297442586766545 },
  { pos: [-0.85, 0, 2.1], rotY: 1.0297442586766545 },
  { pos: [-0.76, 0, 2.26], rotY: 1.0297442586766545 },
  { pos: [-0.59, 0, 1.68], rotY: 1.0297442586766545 },
  { pos: [0.66, 0, 2.01] },
  { pos: [0.86, 0, 2.15] },
  { pos: [1.03, 0, 1.99] },
  { pos: [0.84, 0, 1.83] },
  { pos: [1.22, 0, 2.15] },
  { pos: [1.01, 0, 2.33] },
  { pos: [1.3, 0, 2.37] },
  { pos: [0.71, 0, 2.37] },
  { pos: [1.16, 0, 2.61] },
  { pos: [0.85, 0, 2.61] },
  { pos: [1.41, 0, 2.9] },
  { pos: [1.21, 0, 3.07] },
  { pos: [1.41, 0, 2.63] },
  { pos: [1, 0, 2.86] },
  { pos: [0.45, 0, 2.01] },
];

const OUTER_SCALE = new Vector3(0.15, 0.39, 1);

const FOLIAGE_LAYERS: Array<{ pos: Vector3; scale: Vector3 }> = [
  { pos: new Vector3(-0.9, 0.5, 0), scale: new Vector3(1.07, 0.5, 1) },
  { pos: new Vector3(-0.9, 0.67, 0), scale: new Vector3(0.85, 0.5, 1) },
  { pos: new Vector3(-0.9, 0.85, 0), scale: new Vector3(0.66, 0.5, 1) },
];

const TRUNK_LOCAL = {
  pos: new Vector3(-0.9, 0.25, -0.01),
  scale: new Vector3(0.3, 0.5, 0.01),
};

const foliageGeometry = new ShapeGeometry();
const trunkGeometry = new BoxGeometry();
const foliageMaterial = new MeshStandardMaterial({ color: theme.scene.treeFoliage });
const trunkMaterial = new MeshStandardMaterial({ color: theme.scene.treeTrunk });

const FOLIAGE_COUNT = TREES.length * FOLIAGE_LAYERS.length;
const TRUNK_COUNT = TREES.length;

const Trees = () => {
  const foliageRef = useRef<InstancedMesh>(null);
  const trunkRef = useRef<InstancedMesh>(null);

  useLayoutEffect(() => {
    const foliage = foliageRef.current;
    const trunk = trunkRef.current;
    if (!foliage || !trunk) return;

    const parent = new Matrix4();
    const local = new Matrix4();
    const out = new Matrix4();
    const quat = new Quaternion();
    const euler = new Euler();
    const pos = new Vector3();
    const identityQuat = new Quaternion();

    TREES.forEach((tree, treeIdx) => {
      euler.set(0, tree.rotY ?? 0, 0);
      quat.setFromEuler(euler);
      pos.set(tree.pos[0], tree.pos[1], tree.pos[2]);
      parent.compose(pos, quat, OUTER_SCALE);

      FOLIAGE_LAYERS.forEach((layer, layerIdx) => {
        local.compose(layer.pos, identityQuat, layer.scale);
        out.multiplyMatrices(parent, local);
        foliage.setMatrixAt(treeIdx * FOLIAGE_LAYERS.length + layerIdx, out);
      });

      local.compose(TRUNK_LOCAL.pos, identityQuat, TRUNK_LOCAL.scale);
      out.multiplyMatrices(parent, local);
      trunk.setMatrixAt(treeIdx, out);
    });

    foliage.instanceMatrix.needsUpdate = true;
    trunk.instanceMatrix.needsUpdate = true;
    foliage.computeBoundingSphere();
    trunk.computeBoundingSphere();
  }, []);

  return (
    <>
      <instancedMesh
        ref={foliageRef}
        args={[foliageGeometry, foliageMaterial, FOLIAGE_COUNT]}
        name='trees_foliage'
      />
      <instancedMesh
        ref={trunkRef}
        args={[trunkGeometry, trunkMaterial, TRUNK_COUNT]}
        name='trees_trunk'
      />
    </>
  );
};

export default memo(Trees);
