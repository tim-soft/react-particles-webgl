import React from 'react';
import DatGui, {
    DatBoolean,
    DatNumber,
    DatFolder,
    DatSelect,
    DatPresets,
    DatColor,
} from '@tim-soft/react-dat-gui';
import { defaultConfig } from 'react-particles-webgl';
import DatContainer from './DatContainer';

/**
 * The DatUI config window
 *
 * @param {object} datConfig current configuration for particle field
 * @param {function} handleDatUpdate a function for writing the current state of config UI to ParticleField
 */
const DatUIPane = ({ datConfig, handleDatUpdate }) => (
    <DatContainer>
        <DatGui data={datConfig} onUpdate={handleDatUpdate}>
            <DatPresets
                label="Presets"
                onUpdate={handleDatUpdate}
                options={[
                    {
                        'Oort Cloud Stress Test': {
                            ...defaultConfig,
                            cameraControls: {
                                ...defaultConfig.cameraControls,
                                autoRotate: true,
                                resetCameraFlag: false,
                            },
                            lines: {
                                ...datConfig.lines,
                                minDistance: 300,
                                visible: true,
                            },
                            particles: {
                                ...defaultConfig.particles,
                                count: 1000,
                                maxSize: 125,
                                shape: 'circle',
                            },
                        },
                        ParticlesJS: {
                            ...defaultConfig,
                            cameraControls: {
                                ...defaultConfig.cameraControls,
                                autoRotate: false,
                                resetCameraFlag: true,
                            },
                            dimension: '2D',
                            lines: {
                                ...defaultConfig.lines,
                                minDistance: 110,
                                visible: true,
                            },
                            particles: {
                                ...defaultConfig.particles,
                                boundingBox: 'canvas',
                                count: 300,
                                maxSize: 50,
                                minSize: 20,
                                shape: 'circle',
                                visible: true,
                            },
                            showCube: false,
                        },
                        Snowfall: {
                            ...defaultConfig,
                            boundaryType: 'passthru',
                            cameraControls: {
                                ...defaultConfig.cameraControls,
                                autoRotate: false,
                                resetCameraFlag: true,
                            },
                            dimension: '3D',
                            direction: {
                                ...defaultConfig.direction,
                                xMax: 0.3,
                                xMin: -0.6,
                                yMax: -0.6,
                                yMin: -1,
                                zMax: 0.3,
                                zMin: -0.6,
                            },
                            lines: {
                                ...defaultConfig.lines,
                                visible: false,
                            },
                            particles: {
                                ...defaultConfig.particles,
                                boundingBox: 'canvas',
                                color: '#ffffff',
                                colorMode: 'solid',
                                count: 2500,
                                maxSize: 25,
                                minSize: 1,
                                shape: 'circle',
                                transparency: 0.9,
                                visible: true,
                            },
                            showCube: false,
                            velocity: 2,
                        },
                        Whirlpool: {
                            ...defaultConfig,
                            cameraControls: {
                                ...defaultConfig.cameraControls,
                                autoRotate: true,
                                autoRotateSpeed: 3,
                                resetCameraFlag: false,
                            },
                            lines: {
                                ...defaultConfig.lines,
                                visible: false,
                            },
                            particles: {
                                ...defaultConfig.particles,
                                count: 1500,
                                maxSize: 140,
                                shape: 'circle',
                            },
                            velocity: 10,
                        },
                    },
                ]}
            />
            <DatBoolean label="Show Particles" path="particles.visible" />
            <DatBoolean label="Show Lines" path="lines.visible" />
            <DatBoolean label="Show Cube" path="showCube" />
            <DatSelect
                label="Dimsion"
                options={['2D', '3D']}
                path="dimension"
            />
            <DatSelect
                label="Boundary Type"
                options={['bounce', 'passthru']}
                path="boundaryType"
            />
            <DatNumber
                label="Velocity"
                max={30}
                min={0}
                path="velocity"
                step={0.1}
            />

            <DatFolder closed={false} title="Direction">
                <DatNumber
                    label="X Min"
                    max={1}
                    min={-1}
                    path="direction.xMin"
                    step={0.1}
                />
                <DatNumber
                    label="X Max"
                    max={1}
                    min={-1}
                    path="direction.xMax"
                    step={0.1}
                />

                <DatNumber
                    label="Y Min"
                    max={1}
                    min={-1}
                    path="direction.yMin"
                    step={0.1}
                />
                <DatNumber
                    label="Y Max"
                    max={1}
                    min={-1}
                    path="direction.yMax"
                    step={0.1}
                />

                <DatNumber
                    label="Z Min"
                    max={1}
                    min={-1}
                    path="direction.zMin"
                    step={0.1}
                />
                <DatNumber
                    label="Z Max"
                    max={1}
                    min={-1}
                    path="direction.zMax"
                    step={0.1}
                />
            </DatFolder>

            <DatFolder closed={false} title="Lines">
                <DatSelect
                    label="Color Mode"
                    options={['rainbow', 'solid']}
                    path="lines.colorMode"
                />
                <DatColor label="Solid Color" path="lines.color" />
                <DatNumber
                    label="Transparency"
                    max={0.9}
                    min={0.1}
                    path="lines.transparency"
                    step={0.1}
                />
                <DatNumber
                    label="Min Distance"
                    max={250}
                    min={10}
                    path="lines.minDistance"
                    step={1}
                />
                <DatBoolean label="Limit Connections" path="limitConnections" />
                <DatNumber
                    label="Max Connections"
                    max={30}
                    min={0}
                    path="maxConnections"
                    step={1}
                />
            </DatFolder>

            <DatFolder closed={false} title="Particles">
                <DatSelect
                    label="Color Mode"
                    options={['rainbow', 'solid']}
                    path="particles.colorMode"
                />
                <DatColor label="Solid Color" path="particles.color" />
                <DatNumber
                    label="Transparency"
                    max={1}
                    min={0}
                    path="particles.transparency"
                    step={0.1}
                />
                <DatNumber
                    label="Particle Count"
                    max={5500}
                    min={0}
                    path="particles.count"
                    step={1}
                />
                <DatNumber
                    label="Min Size"
                    max={400}
                    min={0}
                    path="particles.minSize"
                    step={1}
                />
                <DatNumber
                    label="Max Size"
                    max={400}
                    min={0}
                    path="particles.maxSize"
                    step={1}
                />
                <DatSelect
                    label="Bounding Box"
                    options={['canvas', 'cube']}
                    path="particles.boundingBox"
                />
                <DatSelect
                    label="Shape"
                    options={['circle', 'square']}
                    path="particles.shape"
                />
            </DatFolder>

            <DatFolder closed={false} title="Camera Controls">
                <DatBoolean label="Enable" path="cameraControls.enabled" />
                <DatBoolean
                    label="Damping"
                    path="cameraControls.enableDamping"
                />
                <DatNumber
                    label="Damping Factor"
                    max={1}
                    min={0}
                    path="cameraControls.dampingFactor"
                    step={0.05}
                />
                <DatBoolean label="Zoom" path="cameraControls.enableZoom" />
                <DatBoolean
                    label="Auto Rotate"
                    path="cameraControls.autoRotate"
                />
                <DatNumber
                    label="Rotate Speed"
                    max={10}
                    min={0}
                    path="cameraControls.autoRotateSpeed"
                    step={0.1}
                />
                <DatBoolean
                    label="Reset Cam Flag"
                    path="cameraControls.resetCameraFlag"
                />
            </DatFolder>
        </DatGui>
    </DatContainer>
);

export default DatUIPane;
