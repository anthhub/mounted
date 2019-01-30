import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { noop } from 'vtils'
import { component, RequiredProp } from '../component'
import { CUSTOM_CLASS } from '../const'
import _ from './index.module.scss'

/**
 * 动画过渡组件。
 */
class MTransition extends component({
  props: {
    /** 组件是否可见 */
    visible: true as any as RequiredProp<boolean>,
    /** 动画名称 */
    name: 'fade' as (
      /** 淡入 */
      'fade' |
      /** 上滑淡入 */
      'fadeUp' |
      /** 下滑淡入 */
      'fadeDown' |
      /** 左滑淡入 */
      'fadeLeft' |
      /** 右滑淡入 */
      'fadeRight' |
      /** 上滑进入 */
      'slideUp' |
      /** 下滑进入 */
      'slideDown' |
      /** 左滑进入 */
      'slideLeft' |
      /** 右滑进入 */
      'slideRight'
    ),
    /** 动画时长，单位: ms */
    duration: 300 as number,
    /** 动画结束事件 */
    onTransitionEnd: noop as () => void,
  },
  state: {
    /** 动画类型 */
    type: 'Enter' as 'Enter' | 'Leave',
    /** 是否展示组件 */
    display: false as boolean,
  },
}) {
  componentWillMount() {
    if (this.props.visible) {
      this.setState({
        display: true,
        type: 'Enter',
      })
    } else {
      this.setState({
        display: false,
      })
    }
  }

  componentWillReceiveProps(nextProps: MTransition['props']) {
    this.setState({
      display: true,
      type: nextProps.visible ? 'Enter' : 'Leave',
    })
  }

  handleAnimationEnd = () => {
    this.setState(
      { display: this.props.visible },
      () => {
        this.props.onTransitionEnd()
      }
    )
  }

  render() {
    const { name, duration, className } = this.props
    const { type, display } = this.state
    const animation = `${_[`${name}${type}`]} ${duration}ms both`
    return (
      <View
        className={`${_.transition} ${className} ${CUSTOM_CLASS}`}
        style={{
          WebkitAnimation: animation,
          animation: animation,
          ...(display ? {} : { display: 'none' }),
        }}
        onAnimationEnd={this.handleAnimationEnd}>
        {this.props.children}
      </View>
    )
  }
}

export default MTransition
