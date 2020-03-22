import React from 'react';
import PropTypes from 'prop-types';
import DatGui, {
    DatBoolean,
    DatNumber,
    DatFolder,
    DatSelect,
    DatPresets,
    DatColor
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
                options={[
                    {
                        'Oort Cloud Stress Test': {
                            ...defaultConfig,
                            lines: {
                                ...datConfig.lines,
                                minDistance: 300,
                                visible: true
                            },
                            particles: {
                                ...defaultConfig.particles,
                                count: 1000,
                                maxSize: 125,
                                shape: 'circle'
                            },
                            cameraControls: {
                                ...defaultConfig.cameraControls,
                                autoRotate: true,
                                resetCameraFlag: false
                            }
                        },
                        ParticlesJS: {
                            ...defaultConfig,
                            dimension: '2D',
                            showCube: false,
                            lines: {
                                ...defaultConfig.lines,
                                minDistance: 110,
                                visible: true
                            },
                            particles: {
                                ...defaultConfig.particles,
                                count: 300,
                                maxSize: 50,
                                minSize: 20,
                                shape: 'circle',
                                boundingBox: 'canvas',
                                visible: true
                            },
                            cameraControls: {
                                ...defaultConfig.cameraControls,
                                autoRotate: false,
                                resetCameraFlag: true
                            }
                        },
                        Whirlpool: {
                            ...defaultConfig,
                            velocity: 10,
                            lines: {
                                ...defaultConfig.lines,
                                visible: false
                            },
                            particles: {
                                ...defaultConfig.particles,
                                count: 1500,
                                maxSize: 140,
                                shape: 'circle'
                            },
                            cameraControls: {
                                ...defaultConfig.cameraControls,
                                autoRotate: true,
                                autoRotateSpeed: 3,
                                resetCameraFlag: false
                            }
                        },
                        Snowfall: {
                            ...defaultConfig,
                            showCube: false,
                            dimension: '3D',
                            velocity: 2,
                            boundaryType: 'passthru',
                            direction: {
                                ...defaultConfig.direction,
                                xMin: -0.6,
                                xMax: 0.3,
                                yMin: -1,
                                yMax: -0.6,
                                zMin: -0.6,
                                zMax: 0.3
                            },
                            lines: {
                                ...defaultConfig.lines,
                                visible: false
                            },
                            particles: {
                                ...defaultConfig.particles,
                                colorMode: 'solid',
                                color: '#ffffff',
                                transparency: 0.9,
                                shape: 'circle',
                                boundingBox: 'canvas',
                                count: 2500,
                                minSize: 1,
                                maxSize: 25,
                                visible: true
                            },
                            cameraControls: {
                                ...defaultConfig.cameraControls,
                                autoRotate: false,
                                resetCameraFlag: true
                            }
                        }
                    }
                ]}
                onUpdate={handleDatUpdate}
            />
            <DatBoolean path="particles.visible" label="Show Particles" />
            <DatBoolean path="lines.visible" label="Show Lines" />
            <DatBoolean path="showCube" label="Show Cube" />
            <DatSelect
                label="Dimsion"
                path="dimension"
                options={['2D', '3D']}
            />
            <DatSelect
                label="Boundary Type"
                path="boundaryType"
                options={['bounce', 'passthru']}
            />
            <DatNumber
                path="velocity"
                label="Velocity"
                min={0}
                max={30}
                step={0.1}
            />

            <DatFolder title="Direction" closed={false}>
                <DatNumber
                    path="direction.xMin"
                    label="X Min"
                    min={-1}
                    max={1}
                    step={0.1}
                />
                <DatNumber
                    path="direction.xMax"
                    label="X Max"
                    min={-1}
                    max={1}
                    step={0.1}
                />

                <DatNumber
                    path="direction.yMin"
                    label="Y Min"
                    min={-1}
                    max={1}
                    step={0.1}
                />
                <DatNumber
                    path="direction.yMax"
                    label="Y Max"
                    min={-1}
                    max={1}
                    step={0.1}
                />

                <DatNumber
                    path="direction.zMin"
                    label="Z Min"
                    min={-1}
                    max={1}
                    step={0.1}
                />
                <DatNumber
                    path="direction.zMax"
                    label="Z Max"
                    min={-1}
                    max={1}
                    step={0.1}
                />
            </DatFolder>

            <DatFolder title="Lines" closed={false}>
                <DatSelect
                    path="lines.colorMode"
                    label="Color Mode"
                    options={['rainbow', 'solid']}
                />
                <DatColor path="lines.color" label="Solid Color" />
                <DatNumber
                    path="lines.transparency"
                    label="Transparency"
                    min={0.1}
                    max={0.9}
                    step={0.1}
                />
                <DatNumber
                    path="lines.minDistance"
                    label="Min Distance"
                    min={10}
                    max={250}
                    step={1}
                />
                <DatBoolean path="limitConnections" label="Limit Connections" />
                <DatNumber
                    path="maxConnections"
                    label="Max Connections"
                    min={0}
                    max={30}
                    step={1}
                />
            </DatFolder>

            <DatFolder title="Particles" closed={false}>
                <DatSelect
                    path="particles.colorMode"
                    label="Color Mode"
                    options={['rainbow', 'solid']}
                />
                <DatColor path="particles.color" label="Solid Color" />
                <DatNumber
                    path="particles.transparency"
                    label="Transparency"
                    min={0}
                    max={1}
                    step={0.1}
                />
                <DatNumber
                    path="particles.count"
                    label="Particle Count"
                    min={0}
                    max={5500}
                    step={1}
                />
                <DatNumber
                    path="particles.minSize"
                    label="Min Size"
                    min={0}
                    max={400}
                    step={1}
                />
                <DatNumber
                    path="particles.maxSize"
                    label="Max Size"
                    min={0}
                    max={400}
                    step={1}
                />
                <DatSelect
                    label="Bounding Box"
                    path="particles.boundingBox"
                    options={['canvas', 'cube']}
                />
                <DatSelect
                    label="Shape"
                    path="particles.shape"
                    options={['circle', 'square']}
                />
            </DatFolder>

            <DatFolder title="Camera Controls" closed={false}>
                <DatBoolean path="cameraControls.enabled" label="Enable" />
                <DatBoolean
                    path="cameraControls.enableDamping"
                    label="Damping"
                />
                <DatNumber
                    path="cameraControls.dampingFactor"
                    label="Damping Factor"
                    min={0}
                    max={1}
                    step={0.05}
                />
                <DatBoolean path="cameraControls.enableZoom" label="Zoom" />
                <DatBoolean
                    path="cameraControls.autoRotate"
                    label="Auto Rotate"
                />
                <DatNumber
                    path="cameraControls.autoRotateSpeed"
                    label="Rotate Speed"
                    min={0}
                    max={10}
                    step={0.1}
                />
                <DatBoolean
                    path="cameraControls.resetCameraFlag"
                    label="Reset Cam Flag"
                />
            </DatFolder>
        </DatGui>
    </DatContainer>
);

DatUIPane.propTypes = {
    datConfig: PropTypes.object.isRequired,
    handleDatUpdate: PropTypes.func.isRequired
};

export default DatUIPane;
