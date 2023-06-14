import SelectDropdown from "./SelectDropdown";

export default function ProductOptions({ options, productTitle }) {
  if (options.colors !== undefined) {
    return (
      <div className="w-full">
        {options.colors.map((color, index) => {
          if (index <= 6) {
            return (
              <label key={Math.random()} htmlFor={color.color_name}>
                <div className="inline-block -ml-2 min-h-[1.5rem] pl-[1.5rem] pt-3">
                  <input
                    value={color.color_name}
                    className="inline-block p-3 bg-cover bg-center bg-no-repeat hover:border-slate-600 hover:border-2 -ml-[0.5rem] cursor-pointer appearance-none border-2 rounded-full transition-all checked:border-slate-900 checked:border-2"
                    type="radio"
                    name={"color-picker" + productTitle}
                    style={{
                      background:
                        color.code
                    }}
                  />
                </div>
              </label>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  }
  if (options.styles !== undefined) {
    return <SelectDropdown list={options.styles} />;
  }
}
