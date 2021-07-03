import {
    AdditiveBlending,
    BufferAttribute,
    BufferGeometry,
    ShaderMaterial,
} from 'three';
import {
    getLineVertexShader,
    getLineFragmentShader,
} from '../shaders/LineShaders';
import type { Particles, Lines } from '../types/config';

type ComputeLinesParams = {
    lines: Lines;
    particles: Particles;
};

const computeLines = ({ lines, particles }: ComputeLinesParams) => {
    const { count } = particles;
    const { color, colorMode, transparency, visible } = lines;

    // Line material
    const lineMeshMaterial = new ShaderMaterial({
        blending: AdditiveBlending,
        fragmentShader: getLineFragmentShader({ transparency }),
        transparent: true,
        vertexShader: getLineVertexShader({ color, colorMode }),
        visible,
    });

    // Line mesh geometry
    const lineMeshGeometry = new BufferGeometry();
    const segments = count * count;
    const positions = new Float32Array(segments * 3);
    const colors = new Float32Array(segments * 3);

    lineMeshGeometry.addAttribute(
        'position',
        new BufferAttribute(positions, 3).setDynamic(true)
    );
    lineMeshGeometry.addAttribute(
        'color',
        new BufferAttribute(colors, 3).setDynamic(true)
    );
    lineMeshGeometry.computeBoundingSphere();
    lineMeshGeometry.setDrawRange(0, 0);

    return [lineMeshGeometry, lineMeshMaterial, positions, colors];
};

export default computeLines;