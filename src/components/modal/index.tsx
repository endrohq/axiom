import { CloseOutlined } from '@shared/components/icons/CloseOutlined';
import clsx from 'clsx';
import { AnimatePresence, motion, Variant } from 'framer-motion';
import { ReactNode } from 'react';

type ModalProps = {
  children: ReactNode;
  close?(): void;
  title?: string;
  bodyClassName?: string;
  wrapperWidth?: 'max-w-lg' | 'max-w-xl' | 'max-w-2xl' | 'max-w-3xl' | 'max-w-4xl' | 'max-w-5xl';
  open: boolean;
  position?: 'top' | 'center' | 'bottom' | 'left' | 'right';
};

const variants = {
  top: {
    hidden: { y: '-100%' },
    visible: { y: 0, transition: { duration: 0.15 } },
    exit: { y: '-100%', transition: { duration: 0.15 } },
  },
  bottom: {
    hidden: { y: '100%' },
    visible: { y: 0, transition: { duration: 0.15 } },
    exit: { y: '100%', transition: { duration: 0.15 } },
  },
  left: {
    hidden: { x: '-100%' },
    visible: { x: 0, transition: { duration: 0.15 } },
    exit: { x: '-100%', transition: { duration: 0.15 } },
  },
  right: {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { duration: 0.15 } },
    exit: { x: '100%', transition: { duration: 0.15 } },
  },
};

export function Modal({
  children,
  close,
  title,
  open,
  position = 'bottom',
  wrapperWidth = 'max-w-lg',
}: ModalProps) {
  if (!open) return <></>;

  return (
    <div
      onClick={() => close?.()}
      className="fixed inset-0 z-10 m-0 h-full bg-black/25 p-0"
    >
      <AnimatePresence>
        <motion.div
          // @ts-ignore
          variants={variants[position || 'bottom']}
          className="flex h-full w-full items-center"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div
            onClick={e => e.stopPropagation()}
            className={clsx(
              'mx-auto flex w-full flex-col items-center overflow-scroll rounded bg-white p-6',
              {
                'absolute inset-0 z-10': !position,
                'fixed right-2 inset-y-2 left-auto': position === 'right',
              },
              wrapperWidth,
            )}
          >
            {title && (
              <div className="mb-2.5 flex w-full items-center justify-between border-b border-gray-100 pb-2.5">
                <div className="text-lg font-bold">{title}</div>
                <div>
                  <CloseOutlined
                    className="text-sm text-gray-400"
                    onClick={() => close?.()}
                  />
                </div>
              </div>
            )}
            <div className="flex h-full w-full flex-col">{children}</div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
