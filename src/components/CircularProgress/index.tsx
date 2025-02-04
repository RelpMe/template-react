import React from 'react';
import { Animated, View, StyleProp, ViewStyle } from 'react-native';
import { Svg, Path, G } from 'react-native-svg';

interface DashedConfig {
    width: number;
    gap: number;
}

interface CircularProgressProps {
    style?: StyleProp<ViewStyle>;
    size: number | Animated.Value;
    fill: number;
    width: number;
    backgroundWidth?: number;
    tintColor?: string;
    tintTransparency?: boolean;
    backgroundColor?: string;
    rotation?: number;
    lineCap?: string;
    fillLineCap?: string;
    arcSweepAngle?: number;
    children?: (fill: number) => React.ReactNode;
    childrenContainerStyle?: StyleProp<ViewStyle>;
    padding?: number;
    renderCap?: (props: { center: { x: number; y: number } }) => React.ReactNode;
    dashedBackground?: DashedConfig;
    dashedTint?: DashedConfig;
}

export default class CircularProgress extends React.PureComponent<CircularProgressProps> {
    static defaultProps: Partial<CircularProgressProps> = {
        tintColor: 'black',
        tintTransparency: true,
        rotation: 90,
        lineCap: 'butt',
        arcSweepAngle: 360,
        padding: 0,
        dashedBackground: { width: 0, gap: 0 },
        dashedTint: { width: 0, gap: 0 },
    };

    polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
        const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians),
        };
    }

    circlePath(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
        const start = this.polarToCartesian(x, y, radius, endAngle * 0.9999999);
        const end = this.polarToCartesian(x, y, radius, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
        return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
    }

    clampFill = (fill: number) => Math.min(100, Math.max(0, fill));

    render() {
        const {
            size,
            width,
            backgroundWidth,
            tintColor,
            tintTransparency,
            backgroundColor,
            style,
            rotation,
            lineCap,
            fillLineCap = lineCap,
            arcSweepAngle,
            fill,
            children,
            childrenContainerStyle,
            padding = 0,
            renderCap,
            dashedBackground = { width: 0, gap: 0 },
            dashedTint = { width: 0, gap: 0 },
        } = this.props;

        const maxWidthCircle = backgroundWidth ? Math.max(width, backgroundWidth) : width;
        const sizeWithPadding = (typeof size === 'number' ? size : 0) / 2 + padding / 2;
        const radius = (typeof size === 'number' ? size : 0) / 2 - maxWidthCircle / 2 - padding / 2;

        const currentFillAngle = (arcSweepAngle! * this.clampFill(fill)) / 100;
        const backgroundPath = this.circlePath(
            sizeWithPadding,
            sizeWithPadding,
            radius,
            tintTransparency ? 0 : currentFillAngle,
            arcSweepAngle!
        );
        const circlePath = this.circlePath(
            sizeWithPadding,
            sizeWithPadding,
            radius,
            0,
            currentFillAngle
        );
        const coordinate = this.polarToCartesian(
            sizeWithPadding,
            sizeWithPadding,
            radius,
            currentFillAngle
        );
        const cap = renderCap ? renderCap({ center: coordinate }) : null;

        const offset = (typeof size === 'number' ? size : 0) - maxWidthCircle * 2;

        const localChildrenContainerStyle: ViewStyle = {
            position: 'absolute',
            left: maxWidthCircle + padding / 2,
            top: maxWidthCircle + padding / 2,
            width: offset,
            height: offset,
            borderRadius: offset / 2,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            ...((childrenContainerStyle as ViewStyle) || {}),
        };

        const strokeDasharrayTint = dashedTint.gap > 0 ? [dashedTint.width, dashedTint.gap] : undefined;
        const strokeDasharrayBackground = dashedBackground.gap > 0 ? [dashedBackground.width, dashedBackground.gap] : undefined;

        return (
            <View style={style}>
                <Svg width={(typeof size === 'number' ? size : 0) + padding} height={(typeof size === 'number' ? size : 0) + padding}>
                    <G rotation={rotation} originX={(typeof size === 'number' ? size : 0) / 2} originY={(typeof size === 'number' ? size : 0) / 2}>
                        {backgroundColor && (
                            <Path
                                d={backgroundPath}
                                stroke={backgroundColor}
                                strokeWidth={backgroundWidth || width}
                                strokeLinecap={lineCap}
                                strokeDasharray={strokeDasharrayBackground}
                                fill="transparent"
                            />
                        )}
                        {fill > 0 && (
                            <Path
                                d={circlePath}
                                stroke={tintColor}
                                strokeWidth={width}
                                strokeLinecap={fillLineCap}
                                strokeDasharray={strokeDasharrayTint}
                                fill="transparent"
                            />
                        )}
                        {cap}
                    </G>
                </Svg>
                {children && <View style={localChildrenContainerStyle}>{children(fill)}</View>}
            </View>
        );
    }
}
