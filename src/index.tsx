import * as React from 'react';
import { Canvas } from '@react-three/fiber';
import merge from 'lodash.merge';
import ParticleField from './ParticleField';
import initialConfig from './config';
import type { Config } from './types/config';

type Props = {
    config?: Config;
};

/**
 * Creates a 2D/3D particle field with react-three-fiber, three.js and WebGL
 *
 * Documentation on the configuration object can be found in the github repo
 * @see https://github.com/tim-soft/react-particles-webgl
 *
 * For a real-time configuration generator and various demos
 * @see https://timellenberger.com/particles
 */
const ParticleCanvas = ({ config }: Props) => {
    const { antialias = false, ...particleFieldConfig } = merge(
        {},
        initialConfig,
        config
    ) as Required<Config>;

    return (
        <Canvas gl={{ antialias }}>
            <ParticleField {...particleFieldConfig} />
        </Canvas>
    );
};

export { ParticleCanvas as default, initialConfig as defaultConfig };

export type ParticlesConfig = Config;
