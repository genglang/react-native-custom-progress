import React from 'react'
import {View, ART, Animated} from 'react-native'
import PropTypes from 'prop-types'

const {Surface, Shape, Path, Group} = ART

class CircleProgress extends React.Component {
    static propTypes = {
        step: PropTypes.number.isRequired,
        size: PropTypes.number,
        strokeColor: PropTypes.string,
        strokeWidth: PropTypes.number,
        progressWidth: PropTypes.number,
        progressMargin: PropTypes.number,
        progressColor: PropTypes.string,
    }
    static defaultProps = {
        step: 0,
        size: 212,
        strokeColor: '#eef1f3',
        strokeWidth: 6,
        progressWidth: 16,
        progressMargin: 10, // 圆形中线到外边的距离
        progressColor: '#09b2fb',
    }


    getCirclePath() {
        const {size, progressMargin} = this.props
        const circleWidth = size - progressMargin * 2
        const circleHeight = size - progressMargin * 2
        return Path()
            .moveTo(circleWidth / 2 + progressMargin, 0 + progressMargin)
            .arc(0, circleHeight, circleHeight / 2)
            .arc(0, -circleHeight, circleHeight / 2)
            .close()
    }

    getProgressCirclePath() {
        const {size, progressMargin, step} = this.props
        const circleSize = size - (progressMargin * 2)
        const radius = (size - (progressMargin * 2)) / 2
        const radian = step / 100 * 2 * Math.PI
        if (step > 0 && step <= 25) {
            return Path()
                .moveTo(circleSize / 2 + progressMargin, circleSize + progressMargin)
                .arcTo(
                    size / 2 - radius * Math.sin(radian),
                    size / 2 + radius * Math.cos(radian),
                    radius, radius, 0)
        } else if (step <= 50) {
            return Path()
                .moveTo(circleSize / 2 + progressMargin, circleSize + progressMargin)
                .arcTo(
                    size / 2 - radius * Math.sin(radian),
                    size / 2 + radius * Math.cos(radian),
                    radius, radius, 0)
        } else if (step <= 100) {
            return Path()
                .moveTo(circleSize / 2 + progressMargin, circleSize + progressMargin)
                .arcTo(size / 2, progressMargin, radius, radius, 0)
                .arcTo(
                    size / 2 + radius * Math.sin(radian - Math.PI),
                    size / 2 - radius * Math.cos(radian - Math.PI),
                    radius, radius, 0)
        } else {
            return Path()
                .moveTo(circleSize / 2 + progressMargin, circleSize + progressMargin)
                .arcTo(size / 2, progressMargin, radius, radius, 0)
                .arcTo(size / 2, size - progressMargin, radius, radius, 0)
        }
    }


    render() {
        const {
            size,
            step,
            progressMargin,
            strokeColor,
            strokeWidth,
            progressColor,
            progressWidth,
            children
        } = this.props
        const radius = (size - (progressMargin * 2)) / 2
        const childrenSize = (radius - progressMargin) / Math.sin(Math.PI / 4)
        return (
            <View style={{
                width: size,
                height: size,
            }}>
                <Surface width={size} height={size}>
                    <Group>
                        <Shape
                            d={this.getCirclePath()}
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                        />
                        <Shape
                            d={this.getProgressCirclePath()}
                            stroke={progressColor}
                            strokeWidth={progressWidth}
                        />
                    </Group>
                </Surface>
                {children && (
                    <View style={{
                        position: 'absolute',
                        width: childrenSize,
                        height: childrenSize,
                        top: (size - childrenSize) / 2,
                        left: (size - childrenSize) / 2,
                    }}>
                        {children(Math.round(step))}
                    </View>
                )}
            </View>
        )
    }
}

const AnimatedProgress = Animated.createAnimatedComponent(CircleProgress)

class AnimatedCircleProgress extends React.Component {
    static propTypes = {
        tension: PropTypes.number,
        friction: PropTypes.number,
        onAnimationComplete: PropTypes.func,
        onLinearAnimationComplete: PropTypes.func,
        ...CircleProgress.propTypes
    }
    state = {
        progress: new Animated.Value(0),
        tension: 7,
        friction: 10
    }


    componentDidMount() {
        this.changeProgressAnimate()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.step !== this.props.step) {
            this.changeProgressAnimate()
        }
    }

    changeProgressAnimate() {
        const {tension, friction, onAnimationComplete} = this.props

        Animated.spring(
            this.state.progress,
            {
                toValue: this.props.step,
                tension,
                friction
            }
        ).start(onAnimationComplete)
    }


    render() {
        return (
            <AnimatedProgress
                {...this.props}
                step={this.state.progress}
            />
        )
    }
}

export default AnimatedCircleProgress