import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Highlight from 'react-highlight';

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
 * https://github.com/tim-soft
 */

${JSON.stringify(datConfig, undefined, 2)}`}
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
  min-height: 900px;
  color: white;
  width: 352px;
  padding: 10px;
  height: 100%;
  user-select: text;
`;

const HighlightStyles = styled.div`
  height: 100%;
  width: 100%;
  margin: 0;
  > pre {
    height: 100%;
    margin: 0;
    > code {
      height: 100% !important;
      padding: 0 !important;
      height: 100% !important;
      background: inherit !important;
    }
  }
  .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    line-height: 1.3em;
    color: #abb2bf;
    background: #282c34;
    border-radius: 5px;
  }
  .hljs-keyword,
  .hljs-operator {
    color: #f92672;
  }
  .hljs-pattern-match {
    color: #f92672;
  }
  .hljs-pattern-match .hljs-constructor {
    color: #61aeee;
  }
  .hljs-function {
    color: #61aeee;
  }
  .hljs-function .hljs-params {
    color: #a6e22e;
  }
  .hljs-function .hljs-params .hljs-typing {
    color: #fd971f;
  }
  .hljs-module-access .hljs-module {
    color: #7e57c2;
  }
  .hljs-constructor {
    color: #e2b93d;
  }
  .hljs-constructor .hljs-string {
    color: #9ccc65;
  }
  .hljs-comment,
  .hljs-quote {
    color: #b18eb1;
    font-style: italic;
  }
  .hljs-doctag,
  .hljs-formula {
    color: #c678dd;
  }
  .hljs-section,
  .hljs-name,
  .hljs-selector-tag,
  .hljs-deletion,
  .hljs-subst {
    color: #e06c75;
  }
  .hljs-literal {
    color: #56b6c2;
  }
  .hljs-string,
  .hljs-regexp,
  .hljs-addition,
  .hljs-attribute,
  .hljs-meta-string {
    color: #98c379;
  }
  .hljs-built_in,
  .hljs-class .hljs-title {
    color: #e6c07b;
  }
  .hljs-attr,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-type,
  .hljs-selector-class,
  .hljs-selector-attr,
  .hljs-selector-pseudo,
  .hljs-number {
    color: #d19a66;
  }
  .hljs-symbol,
  .hljs-bullet,
  .hljs-link,
  .hljs-meta,
  .hljs-selector-id,
  .hljs-title {
    color: #61aeee;
  }
  .hljs-emphasis {
    font-style: italic;
  }
  .hljs-strong {
    font-weight: bold;
  }
  .hljs-link {
    text-decoration: underline;
  }
`;
