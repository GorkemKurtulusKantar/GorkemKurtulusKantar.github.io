import * as THREE from "three";

/**
 * This function transforms screen coordinates into world space coordinates at z plane specified by targetZ
 *
 * Originally from: https://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z
 * To understand "View Space" and "Clip Space", read https://learnopengl.com/Getting-started/Coordinate-Systems
 *
 * @param {object} screenCoord in {x: number, y: number} form, usually from mouse coordinates in the window
 * @param {number} targetZ the target z position of the transformed point in world space
 * @param {object} camera the camera currently in use with the scene
 */
export const screenToWorldSpace = (screenCoord, targetZ, camera) => {
  var vec = new THREE.Vector3(); // vector we use to do the calculations
  var pos = new THREE.Vector3(); // holder for the final vector position we want

  // 1. transforming screen space back to clip space
  vec.set(
    (screenCoord.x / window.innerWidth) * 2 - 1,
    -(screenCoord.y / window.innerHeight) * 2 + 1,
    0.5 // could be anything in this range: -1.0 < value < 1.0, because that doesn't affect the calculated outcome
  );

  // 2. transforming clip space back to view space,
  // now vec is already pointed at the actual world space coordinates "directly underneath" the screen coordinates
  // you could take this as the result if you don't care about the z value of vec
  // but if you want the point to be placed at a specific z, continue the rest of the calculations
  vec.unproject(camera);

  // 3. get vec to point from the camera position to the world space point, and normalize it
  vec.sub(camera.position).normalize();

  // 4. calculate the distance ratio needed for our vec to "get" to the target point with targetZ
  var distanceRatio = (targetZ - camera.position.z) / vec.z;

  // 5. extend the normalized vec until it reaches the target Z plane
  // finally we have a pos that is exactly where the original screen coordinates are and with a z value that matches the targetZ
  pos.copy(camera.position).add(vec.multiplyScalar(distanceRatio));

  return pos;
};
