import * as THREE from "three";
export const ThingType = {
  VENUE: 0,
  ACTIVITY: 1,
  BUILDING: 2,
  STUDENT: 3,
  INSTRUMENT: 4
};
class Thing extends THREE.Object3D{
  constructor(object, info = null) {
    super();
    this.object = object.clone();
    this.info = info;
    this.add(this.object);
  }

  pick() {
    console.log(this)
    return this.info
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
