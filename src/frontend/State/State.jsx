import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite';
import ReactJson from 'react-json-view';
import { cloneDeep } from 'lodash';

export default class State extends React.PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      store: {},
    };
  }

  componentDidMount = () => {
    // eslint-disable-next-line no-underscore-dangle
    const store = window.__MOBX_DEVTOOLS_STORE;
    this.setState({ store });
  };

  render() {
    const { store } = this.state;
    const newStore = cloneDeep(store);
    return (
      <div style={{ padding: 8 }}>
        <h1>State</h1>
        <ReactJson
          src={newStore}
          indentWidth={2}
          collapsed={false}
          displayDataTypes={false}
          displayObjectSize={false}
        />
      </div>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
  },
  panelBody: {
    display: 'flex',
    flex: '1 1 auto',
  },
  leftPane: {
    width: '100%',
    flex: '1 1 auto',
  },
  rightPane: {
    width: '100%',
    flex: '1 1 auto',
    padding: 10,
  },
});
