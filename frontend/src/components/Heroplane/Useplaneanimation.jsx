import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Tunable constants live up top - these are the "personality" of the
// plane. Keep every value small; the brief calls for calm, not motion.
const IDLE_FLOAT_SPEED = 0.6
const IDLE_FLOAT_AMPLITUDE = 0.06
const IDLE_ROTATION_SPEED = 0.35
const IDLE_ROTATION_AMPLITUDE = 0.035
const BREATHE_SPEED = 0.8
const BREATHE_AMPLITUDE = 0.012

const POINTER_MAX_YAW = 0.18 // radians - how far the nose turns toward the cursor
const POINTER_MAX_PITCH = 0.1
const POINTER_DAMPING = 2.5 // higher = snappier, lower = dreamier

// Resting pose: nose tipped down slightly, banked toward the camera,
// so the raised wings and center crease are visible instead of the
// plane presenting its flat belly straight at the viewer.
const REST_ROTATION = new THREE.Euler(0.18, 0.5, -0.22)

/**
 * Drives the idle life of the plane: a slow float, a whisper of
 * rotation, a breathing scale, and a gentle turn toward the cursor.
 * Everything is additive and frame-rate independent (delta-based),
 * so it stays calm at 30fps or 144fps alike.
 *
 * @param {React.RefObject<THREE.Group>} groupRef
 */
export function usePlaneAnimation(groupRef) {
  const pointer = useThree((state) => state.pointer)
  const basePosition = useRef(new THREE.Vector3(0, 0, 0))
  const restQuaternion = useRef(new THREE.Quaternion().setFromEuler(REST_ROTATION))
  const targetQuaternion = useRef(new THREE.Quaternion())
  const idleQuaternion = useRef(new THREE.Quaternion())
  const elapsed = useRef(0)

  useFrame((_, delta) => {
    const group = groupRef.current
    if (!group) return

    elapsed.current += delta
    const t = elapsed.current

    // --- Idle float + breathe -------------------------------------
    group.position.y =
      basePosition.current.y + Math.sin(t * IDLE_FLOAT_SPEED) * IDLE_FLOAT_AMPLITUDE

    const breathe = 1 + Math.sin(t * BREATHE_SPEED) * BREATHE_AMPLITUDE
    group.scale.setScalar(breathe)

    // --- Idle rotation (a slow, lazy sway independent of the cursor) --
    idleQuaternion.current.setFromEuler(
      new THREE.Euler(
        Math.sin(t * IDLE_ROTATION_SPEED * 0.7) * IDLE_ROTATION_AMPLITUDE * 0.5,
        Math.sin(t * IDLE_ROTATION_SPEED) * IDLE_ROTATION_AMPLITUDE,
        Math.cos(t * IDLE_ROTATION_SPEED * 0.5) * IDLE_ROTATION_AMPLITUDE * 0.4
      )
    )

    // --- Cursor influence (subtle turn, never a full follow) ------
    const targetYaw = REST_ROTATION.y - pointer.x * POINTER_MAX_YAW
    const targetPitch = REST_ROTATION.x + pointer.y * POINTER_MAX_PITCH
    targetQuaternion.current.setFromEuler(
      new THREE.Euler(targetPitch, targetYaw, REST_ROTATION.z)
    )

    // Rest pose is the anchor; idle sway and cursor lean are both
    // blended relative to it so the plane always settles back toward
    // the same "held, banked toward camera" pose.
    const withIdle = restQuaternion.current.clone().multiply(idleQuaternion.current)
    const blended = withIdle.slerp(targetQuaternion.current, 0.6)
    group.quaternion.slerp(blended, 1 - Math.exp(-POINTER_DAMPING * delta))
  })
}