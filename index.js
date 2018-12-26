/** @format */

import {AppRegistry} from 'react-native'
import App from './App'
import {name as appName} from './app.json'
import AnimatedCircleProgress from './src/CircleProgress'

// AppRegistry.registerComponent(appName, () => App)

module.exports = {
    CircleProgress: AnimatedCircleProgress
}