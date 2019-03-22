import './Popup.scss'
import Taro, { Config } from '@tarojs/taro'
import { component } from '../components/component'
import { MPopup } from '../components'
import { View } from '@tarojs/components'

type PopupPosition = MPopup['props']['position']

const positionList: PopupPosition[] = [
  'bottom',
  'center',
  'left',
  'right',
  'top',
]

export default class Popup extends component({
  disableGlobalClass: true,
  state: {
    position: 'top' as PopupPosition,
    visible: false as boolean,
  },
}) {
  config: Config = {
    navigationBarTitleText: 'Popup',
  }

  handleToggleClick = (position: PopupPosition) => {
    this.setState(_ => ({
      position: position,
      visible: !_.visible,
    }))
  }

  render() {
    const { visible, position } = this.state
    return (
      <View>
        <View className='container'>
          {positionList.map(position => (
            <View
              key={position}
              className={`toggle ${position}`}
              hoverClass='active'
              hoverStayTime={100}
              onClick={this.handleToggleClick.bind(this, position)}>
              {position}
            </View>
          ))}
        </View>
        <MPopup
          visible={visible}
          position={position}
          onVisibleChange={visible => this.setState({ visible })}>
          <View className={`popup ${position}`}>
            {position.toUpperCase()}
          </View>
        </MPopup>
      </View>
    )
  }
}
