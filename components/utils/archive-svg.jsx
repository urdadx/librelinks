export const ArchiveSVG = () => {
  return (
    <>
      <div
        className="sm:inline-flex flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 px-0 sm:h-10 sm:w-10"
        data-state="closed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="h-4 w-4 text-gray-500 sm:h-5 sm:w-5"
        >
          <rect width="20" height="5" x="2" y="4" rx="2"></rect>
          <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9"></path>
          <path d="M10 13h4"></path>
        </svg>
      </div>
    </>
  );
};
