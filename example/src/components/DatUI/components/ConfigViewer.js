import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Highlight from 'react-highlight';
import stringifyObject from 'stringify-object';

/**
 * A code viewer which pretty prints the current ParticleField config
 *
 * @param {object} datConfig The current configuration of the ParticleField
 */
const ConfigViewer = ({ datConfig }) => (
    <ConfigContainer>
        <HighlightStyles>
            <Highlight className="javascript">
                {`/**
 * Tim Ellenberger
 * 
 * `}
                <StyledCommentLink
                    href="https://github.com/tim-soft/react-particles-webgl#usage"
                    target="__blank"
                >
                    docs@tim-soft/react-particles-webgl
                </StyledCommentLink>
                {`
 */

const config = ${stringifyObject(datConfig, {
                    indent: '  ',
                    singleQuotes: true
                })}
`}
            </Highlight>
        </HighlightStyles>
    </ConfigContainer>
);

ConfigViewer.propTypes = {
    datConfig: PropTypes.object.isRequired
};

export default ConfigViewer;

const ConfigContainer = styled.div`
    position: absolute;
    background: #1a1a1ad4;
    min-height: 950px;
    color: white;
    width: 372px;
    height: 100%;
    user-select: text;
    > div > pre {
        margin-top: 0;
        > code {
            background: unset !important;
        }
    }
`;

const StyledCommentLink = styled.a`
    text-decoration: none;
    border-style: dashed;
    border-color: #57a64a;
    border-width: 1px;
    padding: 2px;
    margin-left: 2px;
    transition: border-color 0.2s linear;
    > span > span {
        transition: color 0.2s linear;
    }
    :hover {
        border-color: #9cdcfe;
        > span > span {
            color: #9cdcfe !important;
        }
    }
`;

const HighlightStyles = styled.div`
    .hljs {
        display: block;
        overflow-x: auto;
        padding: 0.5em;
        background: #1e1e1e;
        color: #dcdcdc;
    }

    .hljs-keyword,
    .hljs-literal,
    .hljs-symbol,
    .hljs-name {
        color: #569cd6;
    }
    .hljs-link {
        color: #569cd6;
        text-decoration: underline;
    }

    .hljs-built_in,
    .hljs-type {
        color: #4ec9b0;
    }

    .hljs-number,
    .hljs-class {
        color: #b8d7a3;
    }

    .hljs-string,
    .hljs-meta-string {
        color: #d69d85;
    }

    .hljs-regexp,
    .hljs-template-tag {
        color: #9a5334;
    }

    .hljs-subst,
    .hljs-function,
    .hljs-title,
    .hljs-params,
    .hljs-formula {
        color: #dcdcdc;
    }

    .hljs-comment,
    .hljs-quote {
        color: #57a64a;
        font-style: italic;
    }

    .hljs-doctag {
        color: #608b4e;
    }

    .hljs-meta,
    .hljs-meta-keyword,
    .hljs-tag {
        color: #9b9b9b;
    }

    .hljs-variable,
    .hljs-template-variable {
        color: #bd63c5;
    }

    .hljs-attr,
    .hljs-attribute,
    .hljs-builtin-name {
        color: #9cdcfe;
    }

    .hljs-section {
        color: gold;
    }

    .hljs-emphasis {
        font-style: italic;
    }

    .hljs-strong {
        font-weight: bold;
    }

    .hljs-code {
        font-family: 'Monospace';
    }

    .hljs-bullet,
    .hljs-selector-tag,
    .hljs-selector-id,
    .hljs-selector-class,
    .hljs-selector-attr,
    .hljs-selector-pseudo {
        color: #d7ba7d;
    }

    .hljs-addition {
        background-color: #144212;
        display: inline-block;
        width: 100%;
    }

    .hljs-deletion {
        background-color: #600;
        display: inline-block;
        width: 100%;
    }
`;
