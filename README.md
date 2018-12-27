# react-native-custom-progress

```
  npm install --save react-native-custom-progress
```

## How to use

```jsx harmony
 import React from 'react'
 import {View, Text} from 'react-native'
 import AnimatedCircleProgress from './CircleProgress'
 
 export default class DemoProgress extends React.Component {
     state = {
         step: 0
     }
 
     componentDidMount() {
         this.timer = setInterval(() => {
             let nextStep = this.state.step += Math.ceil(Math.random() * 10)
             console.log(nextStep)
             if (nextStep >= 100) {
                 nextStep = 100
                 clearInterval(this.timer)
             }
             this.setState({
                 step: nextStep
             })
         }, 1000)
     }
 
     render() {
         return (
             <AnimatedCircleProgress
                 size={250}
                 step={this.state.step}
                 onAnimationComplete={() => {
                     console.log('onAnimationComplete')
                 }}
             >
                 {
                     (step) => {
                         return (
                             <View style={{
                                 flex: 1,
                                 justifyContent: 'center',
                                 alignItems: 'center'
                             }}>
                                 <Text style={{
                                     fontSize: 24
                                 }}>
                                     {step}
                                 </Text>
                             </View>
                         )
                     }
                 }
             </AnimatedCircleProgress>
         )
     }
 }
```