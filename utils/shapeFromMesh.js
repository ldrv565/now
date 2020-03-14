import CANNON from 'cannon';

const shapeFromMesh = mesh => {
  const vertices = [];
  const faces = [];

  const geo = mesh.geometry;

  const vpos = geo.attributes.position.array;

  for (let i = 0; i < geo.attributes.position.count; i += 1) {
    vertices.push(
      new CANNON.Vec3(-vpos[i * 3], vpos[i * 3 + 1], vpos[i * 3 + 2])
    );
  }

  for (let i = vertices.length - 1; i >= 0; i -= 3) {
    faces.push([i, i - 1, i - 2]);
  }

  const shape = new CANNON.ConvexPolyhedron(vertices, faces);

  return shape;
};

export default shapeFromMesh;
