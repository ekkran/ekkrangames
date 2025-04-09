import Link from "next/link"

/**
 * Represents the properties for the `menuItem` component.
 * 
 * @typedef {Object} MenuItemProps
 * @property {string} title - The title to be displayed in the menu item.
 * @property {() => void} onClick - The callback function to be executed when the menu item is clicked.
 */

/**
 * A functional React component that renders a menu item with a title and an onClick handler.
 * 
 * @param {MenuItemProps} props - The properties for the menu item component.
 * @returns {JSX.Element} A styled `div` element representing the menu item.
 * 
 * @example
 * ```tsx
 * <MenuItem title="Home" onClick={() => console.log('Home clicked')} />
 * ```
 */
type MenuItemProps = {
  title: string
  to: string
  onClick: () => void
}

const MenuItem = (props: MenuItemProps) => {
  return (
    <Link href={props.to} className="flex flex-shrink-0 w-32 items-center justify-center gap-2 p-2 cursor-pointer bg-woodsmoke-600 hover:bg-woodsmoke-400" >
      <span className="text-woodsmoke-300 hover:text-woodsmoke-200">{props.title}</span>
    </Link>
  )
}

export default MenuItem
export type { MenuItemProps }