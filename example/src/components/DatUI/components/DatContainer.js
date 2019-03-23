import styled from 'styled-components';

export default styled.div`
  .react-dat-gui {
    height: 100%;
    z-index: 20;
    width: 100%;
    font-size: 14px;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
  }

  .react-dat-gui *,
  .react-dat-gui *:before,
  .react-dat-gui *:after {
    box-sizing: inherit;
  }

  .react-dat-gui .dg {
    margin: 0;
    padding: 0;
    color: #eee;
    overflow: hidden;
  }

  .react-dat-gui .dg ul {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    clear: both;
  }

  .react-dat-gui .dg.main::-webkit-scrollbar {
    width: 5px;
    background: #1a1a1a;
  }

  .react-dat-gui .dg.main::-webkit-scrollbar-corner {
    height: 0;
    display: none;
  }

  .react-dat-gui .dg.main::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #676767;
  }

  .react-dat-gui .cr {
    display: block;
    background-color: #1a1a1ad4;
    user-select: none;
  }

  .react-dat-gui .cr:not(:last-child) {
    border-bottom: 1px solid #272727;
  }

  .react-dat-gui .cr label {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 1px 2px 1px 8px;
  }

  .react-dat-gui .cr .label-text {
    width: 40%;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
  }

  .react-dat-gui .cr input[type='text'],
  .react-dat-gui .cr input[type='number'] {
    background: #303030;
    border: 3px solid #1a1a1a;
    border-radius: 0;
    margin: 0;
    outline: none;
    font-size: inherit;
  }

  .react-dat-gui .cr input[type='text']:hover,
  .react-dat-gui .cr input[type='number']:hover {
    background: #3c3c3c;
  }

  .react-dat-gui .cr input[type='text']:focus,
  .react-dat-gui .cr input[type='number']:focus {
    background: #494949;
    color: #fff;
  }

  .react-dat-gui .cr input[type='text']::-ms-clear,
  .react-dat-gui .cr input[type='number']::-ms-clear {
    display: none;
  }

  .react-dat-gui .cr.boolean {
    position: relative;
    border-left: 5px solid #806787;
  }

  .react-dat-gui .cr.boolean label {
    cursor: pointer;
  }

  .react-dat-gui .cr.boolean .label-text {
    display: block;
    padding: 5px 0;
  }

  .react-dat-gui .cr.boolean input[type='checkbox'] {
    margin: 0;
  }

  .react-dat-gui .cr.button {
    border-left: 5px solid #e61d5f;
  }

  .react-dat-gui .cr.button:hover {
    background: #111;
  }

  .react-dat-gui .cr.button .label-text {
    display: block;
    width: 100%;
    padding: 6px 2px 6px 8px;
    cursor: pointer;
  }

  .react-dat-gui li.folder {
    display: block;
    padding: 0;
  }

  .react-dat-gui li.folder .title {
    font-weight: bold;
    user-select: none;
    display: block;
    cursor: pointer;
    padding: 5px 5px 5px 16px;
    background: #000
      url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==)
      6px 48% no-repeat;
  }

  .react-dat-gui li.folder ul {
    margin-left: 4px;
    width: calc(100% - 4px);
  }

  .react-dat-gui li.folder.closed .title {
    background: #000
      url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)
      6px 48% no-repeat;
  }

  .react-dat-gui li.folder.closed ul {
    display: none;
  }

  .react-dat-gui .cr.number {
    border-left: 5px solid #2fa1d6;
  }

  .react-dat-gui .cr.number input[type='text'],
  .react-dat-gui .cr.number input[type='number'] {
    color: #2fa1d6;
    height: 25px;
  }

  .react-dat-gui .cr.number .slider {
    display: block;
    position: relative;
    border: 3px solid #1a1a1a;
    border-right-width: 1px;
    background-color: #303030;
    background-image: linear-gradient(90deg, #2fa1d6, #2fa1d6);
    background-size: 0% 100%;
    background-repeat: no-repeat;
    cursor: ew-resize;
    height: 25px;
  }

  .react-dat-gui .cr.string {
    border-left: 5px solid #1ed36f;
  }

  .react-dat-gui .cr.string input[type='text'] {
    color: #1ed36f;
    padding: 2px 5px;
  }

  .react-dat-gui .cr.select {
    border-left: 5px solid #f4d450;
  }

  .react-dat-gui .cr.select label {
    padding: 6px 2px 6px 8px;
  }

  .react-dat-gui .cr.color {
    border-left: 5px solid #1a1a1a;
  }

  .react-dat-gui .cr.color .swatch {
    text-align: center;
    font-weight: bold;
    color: white;
    text-shadow: rgba(0, 0, 0, 0.7) 0px 1px 1px;
    padding: 2px 5px;
    border: 3px solid #1a1a1a;
    cursor: pointer;
  }

  .react-dat-gui .cr.color .popover {
    position: absolute;
    z-index: 2;
    right: 5px;
  }

  .react-dat-gui .cr.color .cover {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  }

  .react-dat-gui .cr.color .picker {
    background: '#fff';
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.3);
    box-sizing: initial;
    width: auto;
    font-family: 'Menlo';
    margin-top: -3px;
  }

  .react-dat-gui .cr.color .picker .body {
    padding: 0px;
  }

  .react-dat-gui .cr.color .picker .body .controls {
    display: flex;
  }

  .react-dat-gui .cr.color .picker .body .controls .toggles {
    flex: 1;
  }

  .react-dat-gui .cr.color .picker .body .controls .toggles .hue-wrap {
    height: 10px;
    position: relative;
  }

  .react-dat-gui .cr.color .picker .body .controls .toggles .hue-wrap .hue {
    radius: 2px;
  }

  .react-dat-gui .cr.color .picker .saturation-wrap {
    width: 100%;
    padding-bottom: 55%;
    position: relative;
    overflow: hidden;
  }

  .react-dat-gui .cr.color .picker .saturation-wrap .saturation {
    radius: 2px 2px 0 0;
  }

  .react-dat-gui .cr.color .fields-wrap {
    display: flex;
  }

  .react-dat-gui .cr.color .fields-wrap .fields {
    flex: 1;
    display: flex;
    margin-left: -6px;
  }

  .react-dat-gui .cr.color .fields-wrap .fields .field {
    padding-left: 6px;
    width: 100%;
  }

  .react-dat-gui .cr.color .fields-wrap .fields .field input {
    font-size: 11px;
    color: #333;
    border-radius: 2px;
    border: none;
    box-shadow: inset 0 0 0 1px #dadada;
    height: 21px;
    text-align: center;
  }

  .react-dat-gui .cr.color .fields-wrap .fields .field input:focus {
    outline: none;
  }

  .react-dat-gui .cr.color .fields-wrap .fields .field label {
    text-transform: uppercase;
    font-size: 11px;
    line-height: 11px;
    color: #969696;
    text-align: center;
    display: block;
    margin-top: 12px;
  }

  .react-dat-gui .cr.color .pointer {
    width: 12px;
    height: 12px;
    border-radius: 6px;
    transform: translate(-6px, -1px);
    background-color: #f8f8f8;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
    position: absolute;
    z-index: 3;
  }

  .react-dat-gui .cr.color .pointer-circle {
    width: 12px;
    height: 12px;
    border-radius: 6px;
    box-shadow: inset 0 0 0 1px #fff;
    transform: translate(-6px, -6px);
  }

  .react-dat-gui .cr.presets {
    border-left: 5px solid #dad5cb;
  }

  .react-dat-gui .cr.presets label {
    padding: 6px 2px 6px 8px;
  }

  .react-dat-gui .cr.presets label select {
    width: 100%;
  }
`;
