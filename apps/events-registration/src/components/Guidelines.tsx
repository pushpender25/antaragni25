export const Guidelines = () => {
  return (
    // A container with a subtle background and border to make the section distinct
    <div className="bg-foreground/5 p-8 rounded-lg border border-primary/10">
      <ul className="list-none space-y-4">
        {/* Each list item now has a custom, theme-aligned bullet point */}
        <li className="flex items-start pl-8 relative before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-secondary before:rounded-full">
          <span>Teams must follow the Time Limits and strictly stick to the allowed styles. Teams shall be penalized for not doing so.</span>
        </li>
        <li className="flex items-start pl-8 relative before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-secondary before:rounded-full">
          <span>Any kind of fluid, flame, powders, glitters, heavy or sharp objects or any material which has the possibility of tampering/damaging the stage is <strong className="text-secondary font-bold">STRICTLY</strong> not allowed.</span>
        </li>
        <li className="flex items-start pl-8 relative before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-secondary before:rounded-full">
          <span>All the slotting will be done by lottery system.</span>
        </li>
        <li className="flex items-start pl-8 relative before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-secondary before:rounded-full">
          <span>The decision of the judges shall be final and binding.</span>
        </li>
        <li className="flex items-start pl-8 relative before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-secondary before:rounded-full">
          <span>Obscenity of any kind is not allowed and will lead to immediate disqualification.</span>
        </li>
        <li className="flex items-start pl-8 relative before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-secondary before:rounded-full">
          <span>Pre-recorded music should be brought in a pen drive in .mp3 format only.</span>
        </li>
        <li className="flex items-start pl-8 relative before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-secondary before:rounded-full">
          <span>Scoresheet of each judge will be provided to the participating teams.</span>
        </li>
        <li className="flex items-start pl-8 relative before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-secondary before:rounded-full">
          <span>"Decision of the judges will be final and binding".</span>
        </li>
        <li className="flex items-start pl-8 relative before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-secondary before:rounded-full">
          <span>The organizing team reserves the right to change or modify the rules.</span>
        </li>
      </ul>
    </div>
  );
};
