import React, { ReactElement, ReactNode, Children, isValidElement, FC, cloneElement, useContext } from 'react'
import classNames from 'classnames'
import { TimelineItem, TimelineItemProps } from './TimelineItem'

type AnyObject = Record<any, any>

type RenderProps = undefined | AnyObject | ((originProps: AnyObject) => AnyObject | undefined)

function replaceElement(
  element: ReactNode,
  replacement: ReactNode,
  props: RenderProps,
): React.ReactNode {
  if (!isValidElement(element)) return replacement

  return cloneElement(
    element,
    typeof props === 'function' ? props(element.props || {}) : props,
  )
}

export function _cloneElement(element: ReactNode, props?: RenderProps): ReactElement {
  return replaceElement(element, element, props) as ReactElement
}

export interface TimelineProps {
  children?: ReactNode
  className?: string
}

interface TimelineType extends FC<TimelineProps> {
  Item: FC<TimelineItemProps>
}

export const Timeline: TimelineType = (props: TimelineProps) => {
  const { children, className, ...restProps } = props

  const timeLineItems = Children.toArray(children)
  const truthyItems = timeLineItems.filter(item => !!item)
  const items = React.Children.map(truthyItems, (ele: React.ReactElement<any>, idx) => {
    return _cloneElement(ele, {
      className: classNames([
        ele.props.className
      ])
    })
  })

  return <ul {...restProps}>
    {items}
  </ul>
}

Timeline.Item = TimelineItem
