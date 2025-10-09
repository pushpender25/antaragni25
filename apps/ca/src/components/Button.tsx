export default function Button({text} : {
    text: string,
}) {
    return (
        <div className="flex items-center justify-between relative text-black overflow-hidden text-center after:absolute after:top-0 after:left-0 after:content-[''] after:size-full after:scale-y-0 after:bg-[var(--white)] z-0 after:transition-transform-[var(--ease-out-expo)] after:duration-500 after:origin-top before:absolute before:inset-0 before:content-[''] before:size-full before:bg-[var(--pink)] text-xl font-bold px-5 hover:after:scale-y-100 hover:after:origin-bottom group cursor-none">
            <div className="relative z-10 flex-1 ">
								<div className="flex items-center justify-center h-full relative transition-transform-[var(--ease-out-expo)] transition-opacity-[var(--ease-out-expo)] duration-500 scale-y-100 origin-bottom group-hover:scale-y-0 group-hover:opacity-0 group-hover:origin-top">
									{text}
								</div>
								<div
									className="origin-top absolute inset-0 w-full scale-y-0 opacity-0 transition-transform-[var(--ease-out-expo)] transition-opacity-[var(--ease-out-expo)] duration-500 group-hover:scale-y-100 group-hover:opacity-100 group-hover:origin-bottom"
									aria-hidden
								>
									{text}
								</div>
							</div>
        </div>
    )
}