import MenuItem, { MenuItemProps } from "./menuItem"

const MainMenu = () => {
  const menuItems : Array<MenuItemProps> = [
    { title: "Games", to: "/games", onClick: () => console.log("Games clicked") },
    { title: "Resources", to: "/resources", onClick: () => console.log("Resources clicked") },
    { title: "Contact", to: "/contact", onClick: () => console.log("Contact clicked") },
    { title: "About", to: "/about", onClick: () => console.log("About clicked") },
    { title: "Blog", to: "/blog", onClick: () => console.log("Blog clicked") },
  ]

  return (
    <div className="flex flex-col gap-2 p-4 justify-center items-center">
      {menuItems.map((item, index) => (
        <MenuItem to={item.to} title={item.title} onClick={item.onClick} key={index} />
      ))}
    </div>
  )
}

export default MainMenu
export type { MenuItemProps }