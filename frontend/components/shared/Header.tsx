import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <div className="w-full border-b bg-gray-600">
      <div className="wrapper flex items-center justify-between text-white">
        <Link href="/" className="w-36">
          <Image
            src="/assets/images/LiteTicket.svg"
            width={80}
            height={80}
            alt="Lite Ticket Logo"
          />
        </Link>
        <nav className="md:flex-between hidden w-full max-w-xs">
          <NavItems />
        </nav>
        <div className="flex w-32 justify-end gap-3">
          <Button asChild className="rounded-full" size="lg">
            <Link href="/sign-in">Login</Link>
          </Button>

          <MobileNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
