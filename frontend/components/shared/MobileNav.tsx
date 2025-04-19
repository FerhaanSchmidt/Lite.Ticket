import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            src="/assets/icons/menu.svg"
            alt="lite ticket menu"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col gap-6 bg-white md:hidden"
        >
          <div className="flex items-center justify-center">
            <Image
              src="/assets/images/liteticket.svg"
              alt="lite ticket menu logo"
              width={90}
              height={90}
            />
            <h1 className="mx-4 text-center flex flex-col">
              كل ما تحتاجه لحياة مليئة بالترفيه
              <span className="">Get Your Ticket, And Get Going !</span>
            </h1>
          </div>
          <Separator />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
