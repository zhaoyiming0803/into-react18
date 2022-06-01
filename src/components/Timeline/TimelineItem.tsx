import React, { ReactElement, ReactNode } from 'react'

export interface TimelineItemProps {
  className?: string;
  color?: string;
  dot?: React.ReactNode;
  style?: React.CSSProperties;
  label?: React.ReactNode;
  children?: React.ReactNode;
}

export function TimelineItem (props: TimelineItemProps): ReactElement {
  const { label, dot, children, color, ...restProps } = props
  const customColor = /blue|red|green|gray/.test(color || '') 
    ? undefined 
    : color

  return <li {...restProps}>
    {label && <div>{label}</div>}
    <div></div>
    <div style={{ borderColor: customColor, color: customColor }}>
      {dot}
    </div>
    <div>{children}</div>
  </li>
}
