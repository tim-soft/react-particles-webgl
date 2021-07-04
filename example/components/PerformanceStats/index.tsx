/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import styled from 'styled-components';

/**
 * Component that displays an FPS indicator
 *
 * The FPS measurement comes from requestAnimationFrame and performance.now()
 * https://developer.mozilla.org/en-US/docs/Web/API/Performance/now
 */
class FPSStats extends Component<
    any,
    { fps: number[]; frames: number; prevTime: number }
> {
    constructor(props) {
        super(props);
        // eslint-disable-next-line no-undef
        const currentTime = performance.now();
        this.state = {
            fps: [],
            frames: 0,
            prevTime: currentTime,
        };
    }

    afRequest: number;

    componentDidMount() {
        const onRequestAnimationFrame = () => {
            this.calcFPS();
            this.afRequest = window.requestAnimationFrame(
                onRequestAnimationFrame
            );
        };
        this.afRequest = window.requestAnimationFrame(onRequestAnimationFrame);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.fps !== nextState.fps || this.props !== nextProps;
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this.afRequest);
    }

    calcFPS = () => {
        const { frames, prevTime } = this.state;

        // Snapshot current time
        // eslint-disable-next-line no-undef
        const currentTime = performance.now();

        // Add frame for perf snapshot
        this.setState((state) => ({
            frames: state.frames + 1,
        }));

        // Calculate FPS every second
        if (currentTime > prevTime + 1000) {
            const currentFps = Number(
                ((frames * 1000) / (currentTime - prevTime)).toFixed(1)
            );
            const fps = this.state.fps.concat(currentFps);

            // Set new frame time
            this.setState({
                fps,
                frames: 0,
                prevTime: currentTime,
            });
        }
    };

    render() {
        const { fps } = this.state;

        return (
            <GraphContainer>
                <GraphTitle>{fps[fps.length - 1]} FPS</GraphTitle>
            </GraphContainer>
        );
    }
}

export default FPSStats;

const GraphTitle = styled.h2`
    font-size: 18px;
`;

const GraphContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 20;
    position: fixed;
    max-height: 100%;
    max-width: 100%;
    padding: 3px;
    background: #4d18ab80;
    min-width: 85px;
    color: #00ffff;
    box-sizing: border-box;
    pointer-events: none;
    top: 30px;
    right: auto;
    bottom: auto;
    left: 10px;
`;
