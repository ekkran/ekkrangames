import Link from "next/link";

type NavItemProps = {
    href: string,
    name: String
}

const NavItem = (props: NavItemProps, key: number) => {
    return (
        <div className="text-black-pearl-50 focus:outline-none " >
            <Link href={props.href} className="">{props.name}</Link>
        </div>
    );
};

export default NavItem;