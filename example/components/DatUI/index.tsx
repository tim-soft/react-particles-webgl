/* eslint-disable no-shadow */
import React from 'react';
import styled from 'styled-components';
import { Transition, animated } from '@react-spring/web';
import Scrollbar from './components/Scrollbars';
import ConfigViewer from './components/ConfigViewer';
import DatUIPane from './components/DatUIPane';
import type { ParticlesConfig } from 'react-particles-webgl';

type Props = {
    datConfig: ParticlesConfig;
    handleDatUpdate: (config: ParticlesConfig) => void;
};

/**
 * A DatGUI for tweaking the ParticleField settings
 *
 * @param {object} datConfig current configuration for particle field
 * @param {function} handleDatUpdate a function for writing the current state of config UI to ParticleField
 */
const DatUI = ({ datConfig, handleDatUpdate }: Props) => {
    const [isOpen, setIsOpen] = React.useState(true);
    const [showConfig, setShowConfig] = React.useState(false);

    return (
        <StyledScrollWrapper>
            <ControlContainer>
                <ControlButton
                    onClick={() => {
                        setIsOpen(true);
                        setShowConfig(!showConfig);
                    }}
                >
                    Config
                </ControlButton>
                <ControlButton onClick={() => setIsOpen(!isOpen)}>
                    Show/Hide
                </ControlButton>
            </ControlContainer>
            <Transition
                enter={{ opacity: 1 }}
                from={{ opacity: 0 }}
                items={isOpen}
                leave={{ opacity: 0 }}
            >
                {({ opacity }, isOpen) =>
                    isOpen && (
                        <animated.div
                            style={{
                                opacity,
                            }}
                        >
                            <StyledScrollbar>
                                <ScrollbarContentContainer>
                                    <Transition
                                        enter={{ opacity: 1 }}
                                        from={{
                                            opacity: 0,
                                            position: 'absolute',
                                        }}
                                        initial={{
                                            opacity: 1,
                                            position: 'absolute',
                                        }}
                                        items={showConfig}
                                        leave={{ opacity: 0 }}
                                    >
                                        {({ opacity, position }, showConfig) =>
                                            showConfig ? (
                                                <animated.div
                                                    style={{
                                                        opacity,
                                                        position,
                                                        width: '100%',
                                                    }}
                                                >
                                                    <ConfigViewer
                                                        datConfig={datConfig}
                                                    />
                                                </animated.div>
                                            ) : (
                                                <animated.div
                                                    style={{
                                                        opacity,
                                                        position,
                                                        width: '100%',
                                                    }}
                                                >
                                                    <DatUIPane
                                                        datConfig={datConfig}
                                                        handleDatUpdate={
                                                            handleDatUpdate
                                                        }
                                                    />
                                                </animated.div>
                                            )
                                        }
                                    </Transition>
                                </ScrollbarContentContainer>
                            </StyledScrollbar>
                        </animated.div>
                    )
                }
            </Transition>
        </StyledScrollWrapper>
    );
};

export default DatUI;

const ControlContainer = styled.div`
    max-width: 370px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #1a1a1ad4;
    height: 34px;
    margin: 0 18px 10px 10px;
    border: 1px solid #dad5cb;
    overflow: hidden;
`;

const ControlButton = styled.button`
    background: none;
    color: #eeeeee;
    font-size: 1.4em;
    transition: color 0.2s linear;
    border: none;
    :hover {
        cursor: pointer;
        color: cyan;
    }
    :focus {
        outline: none;
    }
`;

const ScrollbarContentContainer = styled.div`
    position: relative;
    height: 100%;
    min-height: 100%;
    margin: 0 10px;
`;

const StyledScrollWrapper = styled.div`
    z-index: 20;
    position: absolute;
    right: 10px;
    top: 30px;
    max-width: 400px;
    width: 100%;

    @media (max-width: 512px) {
        top: 180px;
    }
`;

const StyledScrollbar = styled(Scrollbar)`
    width: 100%;
    height: calc(100vh - 180px) !important;

    @media (max-width: 512px) {
        height: calc(100vh - 260px) !important;
    }
`;
