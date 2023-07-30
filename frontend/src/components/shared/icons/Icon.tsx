import * as React from 'react';

const svgBaseClass =
  'overflow-hidden resize-x h-auto flex-no-shrink fill-current inline-block not-italic';

export interface IconProps {
  className?: string;
  viewBox?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  style?: React.CSSProperties;
  scaleWithParent?: boolean;
  children?: React.ReactNode;
}

const baseSvgProps = {
  fontSizeAdjust: 'size',
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '',
};

const baseSvgTextSize = '1em';
const baseSvgWidthSize = '100%';

export function Icon({
  className,
  style,
  onClick,
  children,
  viewBox = '0 0 1024 1024',
  scaleWithParent = false,
}: IconProps) {
  return (
    <svg
      onClick={onClick}
      className={`${svgBaseClass} ${className}`}
      style={style}
      {...baseSvgProps}
      viewBox={viewBox}
      width={scaleWithParent ? baseSvgWidthSize : baseSvgTextSize}
      height={scaleWithParent ? baseSvgWidthSize : baseSvgTextSize}
    >
      {children}
    </svg>
  );
}
