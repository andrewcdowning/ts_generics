import * as React from "react";
import IProperty from "../interfaces/ISorters";

export interface ISortersProps<T> {
  object: T;
  setProperty: (propertyType: IProperty<T>) => void;
}

export function Sorters<T>(props: ISortersProps<T>) {
  const { object, setProperty } = props;
  return (
    <div>
      <label htmlFor="sorters" className="mt-3">
        Sorters! Try us too!
      </label>
      <select
        id="sorters"
        className="custom-select"
        onChange={(event) => {
          const values = event.target.value.split("-");
          if (values.length === 2) {
            // safe any, value is always our key of property
            setProperty({
              property: values[0] as any,
              isDescending: values[1] === "true",
            });
          }
        }}
      >
        {Object.keys(object!).map((key) => {
          return (
            <>
              <option key={`${key}-true`} value={`${key}-true`}>
                Sort by '{key}' decscending!
              </option>
              <option key={`${key}-false`} value={`${key}-false`}>
                Sort by '{key}' ascending!
              </option>
            </>
          );
        })}
      </select>
    </div>
  );
}
