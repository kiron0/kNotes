import Logo from "@/assets/notes.png";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Image src={Logo} draggable={false} alt="Logo" className="select-none" />
        <h1 className="text-2xl font-bold">
          Welcome to <Link href="/notes">KNotes!</Link>
        </h1>
        <p className="mt-3">
          <Link href="/notes" className="btn btn-sm bg-gradient-to-br md:bg-gradient-to-l to-[#4448E6] from-[#875FE7] text-white">Get started</Link> by{" "}
          creating a note
        </p>
      </div>
      <div className='flex justify-center items-center pb-3'>
        <p className="text-xs uppercase no-animation font-semibold select-none">
          Developed by <a href="https://toufiqhasankiron.com" target="_blank" rel="noreferrer" className='font-bold'>Toufiq Hasan Kiron</a>
        </p>
      </div>
    </div>
  )
}
