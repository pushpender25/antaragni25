import ReactMarkdown from "react-markdown";

interface ContactProps {
	contacts: string;
}

export const Contacts = ({ contacts }: ContactProps) => {
	return (
		<div className="bg-foreground/5 p-6 sm:p-8 rounded-lg border border-primary/10">
			<div className="prose prose-invert prose-lg max-w-none text-foreground/80 prose-a:text-primary hover:prose-a:text-secondary">
				<ReactMarkdown>{contacts}</ReactMarkdown>
			</div>
		</div>
	);
};
