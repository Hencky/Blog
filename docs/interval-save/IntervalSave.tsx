import React from 'react';
import moment from 'moment';
import copy from 'copy-to-clipboard';
import serialize from 'serialize-javascript';

interface IntervalSaveProps {
  getConfig: () => any;
  request: Promise<any>;
  error: boolean;
  delay?: number;
}

interface IntervalSaveState {
  isSaving: boolean;
  tips: string;
}

class IntervalSave extends React.Component<IntervalSaveProps, IntervalSaveState> {
  timer!: NodeJS.Timeout;

  state = {
    isSaving: false,
    tips: '',
    error: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onHotKeyClick);
    this.intervalSave(false);

    window.addEventListener('visibilitychange', this.onVisibilityStateChange);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onHotKeyClick);
    window.removeEventListener('visibilitychange', this.onVisibilityStateChange);
    clearTimeout(this.timer);
  }

  private onHotKeyClick = (e: KeyboardEvent) => {
    if (e.code == 'KeyS' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      this.handleSave();
      return;
    }
  };

  private onVisibilityStateChange = () => {
    const tabsVisible = document.visibilityState === 'visible';
    if (tabsVisible) {
      this.intervalSave(false);
    } else {
      clearTimeout(this.timer);
      this.setState({
        isSaving: false,
      });
    }
  };

  private delay = (timeout: number) => {
    return new Promise((resolve, reject) => {
      this.timer = setTimeout(resolve, timeout);
      // 如果timer被清除则reject 释放内存
      setTimeout(reject, timeout + 500);
    });
  };

  // 远程保存
  private remoteSave = () => {
    const { getConfig, request, error } = this.props;
    const config = getConfig();
    if (!config) return Promise.reject();
    if (error) return Promise.resolve();

    return request;
  };

  private intervalSave = (requestNow: boolean = true) => {
    clearTimeout(this.timer);

    const { delay = 1000 * 10 } = this.props;

    const autoSave = () => {
      this.delay(delay)
        .then(() => {
          this.intervalSave();
        })
        .catch(() => {});
    };

    if (requestNow) {
      this.remoteSave().then(() => {
        this.setState({ tips: `${moment().format('HH:mm:ss')} 自动保存成功` });
        autoSave();
      });
    } else {
      autoSave();
    }
  };

  public handleSave = (tip: boolean = true) => {
    if (this.state.isSaving) return;

    clearTimeout(this.timer);

    this.setState({ isSaving: true, tips: '正在保存...' });

    this.remoteSave()
      .then(() => {
        const { getConfig } = this.props;
        const config = getConfig();
        tip && copy(serialize(config, { space: 2, unsafe: true }));

        console.log('config', config);

        this.setState({
          tips: `${moment().format('HH:mm:ss')} 保存成功${tip ? ',配置已复制到剪贴板' : ''}`,
          isSaving: false,
        });
        this.intervalSave(false);
      })
      .catch(() => {
        this.intervalSave();
      });
  };

  render() {
    const { tips } = this.state;
    return <div style={{ fontSize: 12, color: 'rgba(0, 0, 0, .45)' }}>{tips}</div>;
  }
}

export default IntervalSave;
