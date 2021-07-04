/* eslint-disable react/prop-types */
import React from 'react';
import Scrollbar from 'react-scrollbars-custom';

/**
 * Wrapper around react-scrollbars-custom with styled scrollbars
 *
 * API and Docs: https://github.com/xobotyi/react-scrollbars-custom
 */
const Scrollbars = (props: any) => (
    <Scrollbar
        {...props}
        trackXProps={{
            // eslint-disable-next-line react/display-name
            renderer: ({ elementRef, style, ...restProps }) => (
                <div
                    {...restProps}
                    ref={elementRef}
                    style={{
                        ...style,
                        background: '#9e9e9e',
                        height: '11px',
                        left: 0,
                        width: '100%',
                    }}
                />
            ),
        }}
        trackYProps={{
            // eslint-disable-next-line react/display-name
            renderer: ({ elementRef, style, ...restProps }) => (
                <div
                    {...restProps}
                    ref={elementRef}
                    style={{
                        ...style,
                        background: '#9e9e9e',
                        height: '100%',
                        top: 0,
                        width: '11px',
                    }}
                />
            ),
        }}
    />
);

export default Scrollbars;
