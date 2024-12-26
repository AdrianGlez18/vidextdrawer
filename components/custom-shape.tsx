"use client"

import { HTMLContainer, Rectangle2d, ShapeUtil, TLBaseShape, BaseBoxShapeTool } from "tldraw";

type VidextShape = TLBaseShape<'vidext', { w: number; h: number; color: string }>

export class VidextShapeTool extends BaseBoxShapeTool {
    static override id = 'vidextShape'
    static override initial = 'idle'
    override shapeType = 'vidextShape'
}

export class CustomShapeUtil extends ShapeUtil<VidextShape> {
    static override type = 'vidextShape' as const

    override getDefaultProps(): VidextShape['props'] {
        return {
            w: 100,
            h: 100,
            color: 'black',
        }
    }

    override getGeometry(shape: VidextShape) {
        return new Rectangle2d({
            width: shape.props.w,
            height: shape.props.h,
            isFilled: true,
        })
    }

    override component(shape: VidextShape) {
        const { w, h, color } = shape.props
        return (
            <HTMLContainer>
                <svg width={w} height={h}>
                    <path d="M32.9371 97.6065L67.2831 79.882C67.9822 79.5326 68.46 78.8201 68.46 77.9968C68.46 77.1285 67.9295 76.3848 67.1707 76.0597L33.3762 58.6119C33.2357 58.5358 33.0917 58.4631 32.9476 58.3905H32.9406C29.8984 56.8616 26.4522 56.0002 22.8023 56.0002C10.4648 56.0002 0.459961 65.8484 0.459961 78.0002C0.459961 90.1521 10.4613 100 22.8023 100C26.4522 100 29.8984 99.1389 32.9406 97.61L32.9371 97.6065Z" fill={color} />
                    <path d="M88.3808 30.5033C99.3847 36.127 103.648 49.4104 97.904 60.1806C92.1599 70.9507 78.5804 75.1187 67.5729 69.4985L12.5391 41.4967C1.53517 35.873 -2.72815 22.5896 3.01594 11.8194C8.76003 1.04926 22.3395 -3.11874 33.347 2.50154L88.3808 30.4999V30.5033Z" fill={color} />

                </svg>
            </HTMLContainer>
        )
    }

    override indicator(shape: VidextShape) {
        const { w, h } = shape.props
        return <rect width={w} height={h} />
    }
}

