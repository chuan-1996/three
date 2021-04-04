import * as THREE from "three";
class Thing extends THREE.Object3D{
  constructor(object, info) {
    super();
    this.object = object;
    this.info = info;
    this.add(object);
  }

  pick() {
    console.log(this.info)
  }

  static findThing(obj3d) {
    let thing = obj3d;
    while(!(thing instanceof Thing) && thing.parent) {
      thing = thing.parent;
    }
    return thing;
  }
}

export { Thing }
