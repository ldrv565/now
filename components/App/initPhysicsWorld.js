/* eslint-disable new-cap */
import CANNON from 'cannon';

const initPhysicsWorld = () => {
  const physicsWorld = new CANNON.World();

  physicsWorld.quatNormalizeSkip = 0;
  physicsWorld.quatNormalizeFast = false;

  const solver = new CANNON.GSSolver();

  physicsWorld.defaultContactMaterial.contactEquationStiffness = 25000;
  physicsWorld.defaultContactMaterial.contactEquationRelaxation = 2;

  solver.iterations = 10;
  solver.tolerance = 1;
  const split = true;
  if (split) physicsWorld.solver = new CANNON.SplitSolver(solver);
  else physicsWorld.solver = solver;

  physicsWorld.gravity.set(0, -100, 0);
  physicsWorld.broadphase = new CANNON.NaiveBroadphase();
  physicsWorld.broadphase.useBoundingBoxes = true;

  // Create a slippery material (friction coefficient = 0.0)
  const physicsMaterial = new CANNON.Material('slipperyMaterial');
  const physicsContactMaterial = new CANNON.ContactMaterial(
    physicsMaterial,
    physicsMaterial
  );
  // We must add the contact materials to the world
  physicsWorld.addContactMaterial(physicsContactMaterial);

  return physicsWorld;
};

export default initPhysicsWorld;
