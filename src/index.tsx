import React, { useEffect, useState } from 'react';
import { Canvas } from 'react-three-fiber';
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
    const [clientSide, setClientSide] = useState(false);
    useEffect(() => {
        setClientSide(true);
    }, []);

    if (!clientSide) return null;

    return (
        <Canvas
            gl={{
                antialias: Object.prototype.hasOwnProperty.call(
                    config,
                    'antialias'
                )
                    ? config.antialias
                    : initialConfig.antialias,
            }}
        >
            <ParticleField {...merge({}, initialConfig, config)} />
        </Canvas>
    );
};

export { ParticleCanvas as default, initialConfig as defaultConfig };

// export const defaultConfig = { ...initialConfig };
