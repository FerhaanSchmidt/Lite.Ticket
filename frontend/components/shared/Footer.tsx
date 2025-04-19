import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t bg-gray-600 ">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 text-center sm:flex-row text-white">
        <Link href="/">
          <Image
            src="/assets/images/liteticket.svg"
            alt="lite ticket logo"
            width={80}
            height={80}
          />
        </Link>
        <p>2024 Lite Ticket. All Rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
