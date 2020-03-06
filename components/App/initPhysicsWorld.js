/* eslint-disable new-cap */
import AmmoLibrary from 'utils/js/libs/ammo';

const Ammo = AmmoLibrary();

const initPhysicsWorld = () => {
  // Physics configuration
  const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
  const dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
  const broadphase = new Ammo.btDbvtBroadphase();
  const solver = new Ammo.btSequentialImpulseConstraintSolver();
  const physicsWorld = new Ammo.btDiscreteDynamicsWorld(
    dispatcher,
    broadphase,
    solver,
    collisionConfiguration
  );

  physicsWorld.setGravity(new Ammo.btVector3(0, -6, 0));

  return [physicsWorld, Ammo];
};

export default initPhysicsWorld;
