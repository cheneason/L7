/**
 * 针对绘制圆形的优化
 * 手动构建点阵坐标系，便于实现描边、反走样效果
 */
import * as THREE from '../../../core/three';
import * as PointBuffer from '../../../geom/buffer/point/index';
import CircleMaterial from '../../../geom/material/circleMaterial';
export default function drawCircle(layerData, layer) {
  const style = layer.get('styleOptions');
  const activeOption = layer.get('activedOptions');

  const { aColor, aExtrude, aPickingId, aPosition, index, aRadius } = PointBuffer.CircleBuffer(layerData, style);
  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(index);
  geometry.addAttribute('position', new THREE.Float32BufferAttribute(aPosition, 3));
  geometry.addAttribute('a_color', new THREE.Float32BufferAttribute(aColor, 4));
  geometry.addAttribute('pickingId', new THREE.Float32BufferAttribute(aPickingId, 1));
  geometry.addAttribute('a_shape', new THREE.Float32BufferAttribute(aExtrude, 2));
  geometry.addAttribute('a_radius', new THREE.Float32BufferAttribute(aRadius, 1));

  const material = new CircleMaterial({
    u_opacity: style.opacity,
    u_activeColor: activeOption.fill,
    u_zoom: layer.scene.getZoom(),
    u_stroke_color: style.stroke,
    u_stroke_width: style.strokeWidth,
    u_stroke_opacity: style.strokeOpacity
  });
  material.depthTest = false;
  const fillMesh = new THREE.Mesh(geometry, material);
  return fillMesh;
}
