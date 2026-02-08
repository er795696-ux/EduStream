import MainButton from "@/components/ui/MainButton";
import Image, { type ImageProps } from "next/image";

export default function Home() {
  return (
    <div className="h-full gradient-bg border-b-2 border-b-blue-950">
      <div className="h-full flex justify-around items-center">
        <div>
          {/* The new sections */}
          <div className="text-main inline-flex w-fit items-center gap-2 rounded-full border border-action-blue/30 bg-action-blue/10 px-3 py-1 text-xs font-semibold text-action-blue">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-main opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-main"></span>
            </span>
            New: Real-time video and chat
          </div>

          <div className="mt-3">
            <h1 className="text-white text-8xl font-bold">Learn.</h1>
            <h1 className="text-8xl font-bold bg-linear-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent">
              Collaborate.
            </h1>
            <h1 className="text-white text-8xl font-bold">Succeed.</h1>

            <p className="text-slate-400 mt-5 max-w-100">
              Modern problems require modern solutions and for that. Learning
              Managements System designed to unify compus leanring, drive
              students to success, and simplify administration
            </p>

            <MainButton text={"Request Demo"} />
          </div>
        </div>
        <Image
          src={"/landing.webp"}
          width={600}
          height={600}
          alt="hero section"
          className="aspect-video object-cover h-96 rounded-xl shadow-lg shadow-main"
        />
      </div>
    </div>
  );
}
