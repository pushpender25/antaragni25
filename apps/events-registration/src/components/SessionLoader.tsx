'use client';

const SessionLoader = () => {
  return (
    <div
      className="
        fixed top-0 left-0 w-full h-full 
        bg-background/50 backdrop-blur-md 
        flex items-center justify-center 
        z-40 transition-opacity duration-300
      "
      aria-label="Loading session data"
      role="status"
    >
      <div className="w-4 h-4 bg-accent rounded-full animate-pulse"></div>
    </div>
  );
};

export default SessionLoader;
