export default function NavChildren({
  icon,
  title,
  active,
}: {
  icon: string;
  title: string;
  active: boolean;
}) {
  return (
    <li
      className={`hover:bg-indigo-400 my-2 cursor-pointer p-3 rounded-md ${
        active ? "bg-indigo-400 text-white" : ""
      }`}
    >
      <i
        className={` fa-solid ${icon} ${
          active ? "bg-indigo-400 text-white" : "text-gray-500"
        }`}
      ></i>
      <span className="text-lg ml-3">{title}</span>
    </li>
  );
}
