const skills = [
  "JavaScript",
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "Express",
  "Tailwind CSS",
  "Dart",
  "Flutter",
  "C#/.NET",
  "Python",
  "Java",
  "HTML/CSS",
  "SQL",
  "MongoDB",
  "Git/GitHub",
];

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-5xl py-12">
      <h1 className="mb-6 text-3xl font-bold text-[#143A52] dark:text-white">Ky nang lap trinh</h1>

      <div className="rounded-2xl border border-[#CDE3EB] bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
        <p className="mb-5 text-[#6E828A] dark:text-gray-300">
          Day la cac ky nang chinh minh da hoc va ap dung trong cac du an.
        </p>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-lg border border-[#CDE3EB] bg-[#E3EFF3] px-4 py-3 text-[#143A52] dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
