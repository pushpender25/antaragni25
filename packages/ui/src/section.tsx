import cn from "clsx"

export function Section({
	spacer,
	children,
    className,
	id,
}: {
	spacer?: number;
	children: React.ReactNode;
    className?: string;
	id?: string;
}) {
	return (
		<div className="" >
			<div id={id} className={cn(className, "w-screen relative z-10 max-w-full")}>
                {children}
            </div>
            {spacer && <div style={{height: `${spacer}vh`}}/>}
		</div>	
	);
}
