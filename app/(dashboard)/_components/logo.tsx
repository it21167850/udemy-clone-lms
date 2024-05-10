import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logo.svg"
        alt="logo"
        width={40}
        height={40}
        className="rounded-full"
      />
      <span>Udemy Clone</span>
    </div>
  );
}