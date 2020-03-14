/* *
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 */

import { MathUtils, Spherical, Vector3 } from 'three';

function FirstPersonControls(object, domElement) {
  this.object = object;
  this.domElement = domElement;

  // API

  this.enabled = true;

  this.movementSpeed = 1.0;
  this.lookSpeed = 0.005;

  this.lookVertical = true;
  this.autoForward = false;

  this.activeLook = true;

  this.heightSpeed = false;
  this.heightCoef = 1.0;
  this.heightMin = 0.0;
  this.heightMax = 1.0;

  this.constrainVertical = false;
  this.verticalMin = 0;
  this.verticalMax = Math.PI;

  this.mouseDragOn = false;

  // internals

  this.autoSpeedFactor = 0.0;

  this.mouseX = 0;
  this.mouseY = 0;

  this.moveForward = false;
  this.moveBackward = false;
  this.moveLeft = false;
  this.moveRight = false;

  this.viewHalfX = 0;
  this.viewHalfY = 0;

  // private constiables

  let lat = 0;
  let lon = 0;

  const lookDirection = new Vector3();
  const spherical = new Spherical();
  const target = new Vector3();

  //

  if (this.domElement !== document) {
    this.domElement.setAttribute('tabindex', -1);
  }

  //

  this.handleResize = () => {
    if (this.domElement === document) {
      this.viewHalfX = window.innerWidth / 2;
      this.viewHalfY = window.innerHeight / 2;
    } else {
      this.viewHalfX = this.domElement.offsetWidth / 2;
      this.viewHalfY = this.domElement.offsetHeight / 2;
    }
  };

  this.onMouseDown = event => {
    if (this.domElement !== document) {
      this.domElement.focus();
    }

    event.preventDefault();
    event.stopPropagation();

    if (this.activeLook) {
      switch (event.button) {
        case 0:
          this.moveForward = true;
          break;
        case 2:
          this.moveBackward = true;
          break;
        default:
          break;
      }
    }

    this.mouseDragOn = true;
  };

  this.onMouseUp = event => {
    event.preventDefault();
    event.stopPropagation();

    if (this.activeLook) {
      switch (event.button) {
        case 0:
          this.moveForward = false;
          break;
        case 2:
          this.moveBackward = false;
          break;
        default:
          break;
      }
    }

    this.mouseDragOn = false;
  };

  this.onMouseMove = event => {
    if (this.domElement === document) {
      this.mouseX = event.pageX - this.viewHalfX;
      this.mouseY = event.pageY - this.viewHalfY;
    } else {
      this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
      this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;
    }
  };

  this.onKeyDown = event => {
    // event.preventDefault();

    switch (event.keyCode) {
      case 38: /* up */
      case 87:
        /* W */ this.moveForward = true;
        break;

      case 37: /* left */
      case 65:
        /* A */ this.moveLeft = true;
        break;

      case 40: /* down */
      case 83:
        /* S */ this.moveBackward = true;
        break;

      case 39: /* right */
      case 68:
        /* D */ this.moveRight = true;
        break;

      case 82:
        /* R */ this.moveUp = true;
        break;
      case 70:
        /* F */ this.moveDown = true;
        break;
      default:
        break;
    }
  };

  this.onKeyUp = event => {
    switch (event.keyCode) {
      case 38: /* up */
      case 87:
        /* W */ this.moveForward = false;
        break;

      case 37: /* left */
      case 65:
        /* A */ this.moveLeft = false;
        break;

      case 40: /* down */
      case 83:
        /* S */ this.moveBackward = false;
        break;

      case 39: /* right */
      case 68:
        /* D */ this.moveRight = false;
        break;

      case 82:
        /* R */ this.moveUp = false;
        break;
      case 70:
        /* F */ this.moveDown = false;
        break;
      default:
        break;
    }
  };

  function setOrientation(controls) {
    const { quaternion } = controls.object;

    lookDirection.set(0, 0, -1).applyQuaternion(quaternion);
    spherical.setFromVector3(lookDirection);

    lat = 90 - MathUtils.radToDeg(spherical.phi);
    lon = MathUtils.radToDeg(spherical.theta);
  }

  this.lookAt = (x, y, z) => {
    if (x.isVector3) {
      target.copy(x);
    } else {
      target.set(x, y, z);
    }

    this.object.lookAt(target);

    setOrientation(this);

    return this;
  };

  this.update = (() => {
    const targetPosition = new Vector3();

    return function update(delta) {
      if (this.enabled === false) return;

      if (this.heightSpeed) {
        const y = MathUtils.clamp(
          this.object.position.y,
          this.heightMin,
          this.heightMax
        );
        const heightDelta = y - this.heightMin;

        this.autoSpeedFactor = delta * (heightDelta * this.heightCoef);
      } else {
        this.autoSpeedFactor = 0.0;
      }

      const actualMoveSpeed = delta * this.movementSpeed;

      if (this.moveForward || (this.autoForward && !this.moveBackward))
        this.object.translateZ(-(actualMoveSpeed + this.autoSpeedFactor));
      if (this.moveBackward) this.object.translateZ(actualMoveSpeed);

      if (this.moveLeft) this.object.translateX(-actualMoveSpeed);
      if (this.moveRight) this.object.translateX(actualMoveSpeed);

      if (this.moveUp) this.object.translateY(actualMoveSpeed);
      if (this.moveDown) this.object.translateY(-actualMoveSpeed);

      let actualLookSpeed = delta * this.lookSpeed;

      if (!this.activeLook) {
        actualLookSpeed = 0;
      }

      let verticalLookRatio = 1;

      if (this.constrainVertical) {
        verticalLookRatio = Math.PI / (this.verticalMax - this.verticalMin);
      }

      lon -= this.mouseX * actualLookSpeed;
      if (this.lookVertical)
        lat -= this.mouseY * actualLookSpeed * verticalLookRatio;

      lat = Math.max(-85, Math.min(85, lat));

      const theta = MathUtils.degToRad(lon);
      let phi = MathUtils.degToRad(90 - lat);

      if (this.constrainVertical) {
        phi = MathUtils.mapLinear(
          phi,
          0,
          Math.PI,
          this.verticalMin,
          this.verticalMax
        );
      }

      const { position } = this.object;

      targetPosition.setFromSphericalCoords(1, phi, theta).add(position);

      this.object.lookAt(targetPosition);
    };
  })();

  function contextmenu(event) {
    event.preventDefault();
  }

  this.onMouseMove = this.onMouseMove.bind(this);
  this.onMouseDown = this.onMouseDown.bind(this);
  this.onMouseUp = this.onMouseUp.bind(this);
  this.onKeyDown = this.onKeyDown.bind(this);
  this.onKeyUp = this.onKeyUp.bind(this);

  this.dispose = () => {
    this.domElement.removeEventListener('contextmenu', contextmenu, false);
    this.domElement.removeEventListener('mousedown', this.onMouseDown, false);
    this.domElement.removeEventListener('mousemove', this.onMouseMove, false);
    this.domElement.removeEventListener('mouseup', this.onMouseUp, false);

    window.removeEventListener('keydown', this.onKeyDown, false);
    window.removeEventListener('keyup', this.onKeyUp, false);
  };

  this.domElement.addEventListener('contextmenu', contextmenu, false);
  this.domElement.addEventListener('mousemove', this.onMouseMove, false);
  this.domElement.addEventListener('mousedown', this.onMouseDown, false);
  this.domElement.addEventListener('mouseup', this.onMouseUp, false);

  window.addEventListener('keydown', this.onKeyDown, false);
  window.addEventListener('keyup', this.onKeyUp, false);

  this.handleResize();

  setOrientation(this);
}

export { FirstPersonControls };
