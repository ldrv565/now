/* eslint-disable new-cap */
import CANNON from 'cannon';

const initPhysicsWorld = () => {
  const physicsWorld = new CANNON.World();
  physicsWorld.gravity.set(0, 0, -100);
  physicsWorld.broadphase = new CANNON.NaiveBroadphase();

  const groundMaterial = new CANNON.Material();

  const material = new CANNON.Material();
  const contactMaterial = new CANNON.ContactMaterial(groundMaterial, material, {
    friction: 0.1,
    restitution: 0.7
  });

  physicsWorld.addContactMaterial(contactMaterial);

  return [physicsWorld, groundMaterial, material];
};

export default initPhysicsWorld;
