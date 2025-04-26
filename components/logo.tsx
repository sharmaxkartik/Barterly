import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
        <Image
          src="/logo.img" // Replace with your local image path
          alt="Logo"
          className="h-6 w-6 rounded-full"
          width={24}
          height={24}
        />
      </div>
      <span className="font-bold text-xl">Skill Mint</span>
    </div>
  );
}
