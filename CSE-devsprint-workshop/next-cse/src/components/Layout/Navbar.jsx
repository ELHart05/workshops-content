import Link from "next/link";
import { useRouter } from "next/router";

const navItems = [
    {
        name: 'Home',
        link: '/'
    },
    {
        name: 'About',
        link: '/about'
    },
    {
        name: 'News',
        link: '/news'
    },
    {
        name: 'Todos',
        link: '/todo'
    },
]
export default function Navbar() {
    const router = useRouter();
    return (
        <nav className="bg-red-500 text-white p-6 text-4xl flex justify-between">
            <Link href={'/'} className="font-extrabold">LOGO</Link>
            <ul className="flex gap-10">
                {
                    navItems.map((item, index) => (
                        <li key={index}>
                            <Link href={item.link} className={`hover:text-black transition-all ${(item.link == router.pathname) ? 'text-black' : ''}`}>{item.name}</Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}
