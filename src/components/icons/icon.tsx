import clsx from "clsx";

type IconProps = React.ComponentPropsWithoutRef<"svg">;
export type FillableIconProps = { filled?: boolean } & IconProps;

export default function Icon({ className, ...props }: IconProps) {
  return (
    <svg
      {...props}
      className={clsx(
        "h-[1em] flex-shrink-0 fill-current stroke-current stroke-[3px] [stroke-linecap:round] [stroke-linejoin:round]",
        className,
      )}
    />
  );
}
