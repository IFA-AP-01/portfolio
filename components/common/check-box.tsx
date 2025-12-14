import classNames from "classnames";

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const Checkbox = ({ checked, onChange }: CheckboxProps) => {
  return (
    <label>
      <input
        type="checkbox"
        className={classNames(
          "appearance-none outline-none block relative text-center cursor-pointer m-auto w-5 h-5 before:block before:absolute before:content-[''] before:bg-[#FFC29F] before:w-5 before:h-5 before:rounded-sm before:border-black before:border-2 before:hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] after:block after:content-[''] after:absolute after:left-1.5 after:top-0.5 after:w-2 after:h-3 after:border-black after:border-r-2 after:border-b-2 after:origin-center after:rotate-45",
          {
            "after:opacity-100 before:bg-[#FF965B]": checked,
            "after:opacity-0": !checked,
          }
        )}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
};

export default Checkbox;
