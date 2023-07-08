import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

const TooltipDemo = ({ component, title }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={2} avoidCollisions={true}>
        <Tooltip.Trigger asChild>
              { component }
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade 
              data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade 
              data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade 
              data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade
              shadow-md select-none rounded-[4px] bg-slate-700 text-white px-[15px] py-[10px]
              text-[15px] leading-none will-change-[transform,opacity]" sideOffset={11}>
                 {title}
            <Tooltip.Arrow className="fill-slate-700" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipDemo;