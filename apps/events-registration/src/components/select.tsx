"use client";

import * as React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { FaCheck } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { cn } from "@repo/ui/util";

interface SelectProps {
	value: string;
	onValueChange: (val: string) => void;
	placeholder?: string;
	options: { label: string; value: string }[];
}

export function Select({
	value,
	onValueChange,
	placeholder = "Select an option",
	options,
}: SelectProps) {
	return (
		<RadixSelect.Root value={value} onValueChange={onValueChange}>
			<RadixSelect.Trigger asChild>
				<button
					className={cn(
						"group/select inline-flex h-10 w-full items-center justify-between rounded-md border border-primary/20 bg-foreground/10 px-3 py-2 text-sm text-foreground transition duration-300 placeholder:text-foreground/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
					)}
				>
					<RadixSelect.Value placeholder={placeholder} />
					<RadixSelect.Icon asChild>
						<FaChevronDown className="h-4 w-4 opacity-50 transition-transform duration-200 group-data-[state=open]:rotate-180" />
					</RadixSelect.Icon>
				</button>
			</RadixSelect.Trigger>

			<RadixSelect.Portal>
				<RadixSelect.Content
					className={cn(
						"z-50 mt-2 max-h-60 w-[var(--radix-select-trigger-width)] overflow-y-auto rounded-md border border-primary/20 bg-background shadow-lg"
					)}
					position="popper"
					sideOffset={5}
					data-lenis-prevent
				>
					<RadixSelect.Viewport className="p-1">
						{options.map((option) => (
							<RadixSelect.Item
								key={option.value}
								value={option.value}
								className={cn(
									"relative flex cursor-pointer select-none items-center rounded-sm py-2 pl-8 pr-4 text-sm text-foreground/80 outline-none transition-colors hover:bg-primary hover:text-background data-[state=checked]:bg-primary/20 data-[state=checked]:text-primary"
								)}
							>
								<RadixSelect.ItemIndicator className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
									<FaCheck className="h-4 w-4" />
								</RadixSelect.ItemIndicator>
								<RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
							</RadixSelect.Item>
						))}
					</RadixSelect.Viewport>
				</RadixSelect.Content>
			</RadixSelect.Portal>
		</RadixSelect.Root>
	);
}
