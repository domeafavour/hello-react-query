import classNames from 'classnames';
import React from 'react';

export const Button = React.forwardRef<
  React.ComponentRef<'button'> | null,
  React.ComponentProps<'button'> & { loading?: boolean }
>(function Button(
  { className, loading, disabled, children, ...props },
  forwardedRef
) {
  return (
    <button
      ref={forwardedRef}
      type="button"
      className={classNames(
        'border border-black px-2 py-1 disabled:opacity-50 rounded-md',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {children}
      {loading ? '...' : null}
    </button>
  );
});
