import React from 'react';
import Scrollbar from 'react-scrollbars-custom';

/**
 * Wrapper around react-scrollbars-custom with styled scrollbars
 *
 * API and Docs: https://github.com/xobotyi/react-scrollbars-custom
 */
export default ({ ...props }) => (
    <Scrollbar
        {...props}
        trackXProps={{
            // eslint-disable-next-line react/prop-types
            renderer: ({ elementRef, style, ...restProps }) => (
                <div
                    {...restProps}
                    ref={elementRef}
                    style={{
                        ...style,
                        background: '#9e9e9e',
                        height: '11px',
                        width: '100%',
                        left: 0
                    }}
                />
            )
        }}
        trackYProps={{
            // eslint-disable-next-line react/prop-types
            renderer: ({ elementRef, style, ...restProps }) => (
                <div
                    {...restProps}
                    ref={elementRef}
                    style={{
                        ...style,
                        background: '#9e9e9e',
                        height: '100%',
                        width: '11px',
                        top: 0
                    }}
                />
            )
        }}
    />
);
