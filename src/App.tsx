import React, { useState } from "react";
import people from "./mock-data/people";
import widgets from "./mock-data/widgets";

import "./App.css";
import genericSearch from "./utils/genericSearch";
import { SearchInput } from "./components/SearchInput";
import genericSort from "./utils/genericSort";
import IWidget from "./interfaces/IWidget";
import IProperty from "./interfaces/IProperty";
import IPerson from "./interfaces/IPerson";
import { Sorters } from "./components/Sorters";
import { WidgetRender } from "./components/rederers/WidgetRender";
import { PeopleRender } from "./components/rederers/PeopleRender";

function App() {
  const [query, setQuery] = useState<string>("");
  const [showPeople, setShowPeople] = useState<boolean>(false);
  const [widgetSortproperty, setWidgetSortProperty] = useState<
    IProperty<IWidget>
  >({
    property: "title",
  });
  const [peopleSortproperty, setPeopleSortProperty] = useState<
    IProperty<IPerson>
  >({
    property: "firstName",
  });
  const buttonText = showPeople ? "Show Widgets" : "Show People";
  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => {
          setShowPeople(!showPeople);
        }}
      >
        {buttonText}
      </button>
      <SearchInput setSearchQuery={setQuery} />
      {!showPeople && (
        <>
          <h2>Widgets:</h2>
          <Sorters
            setProperty={(property) => {
              setWidgetSortProperty({ property });
            }}
            object={widgets[0]}
          />
          {widgets
            .filter((widget) =>
              genericSearch(widget, ["title", "description"], query, false)
            )
            .sort((a, b) => genericSort(a, b, widgetSortproperty.property))
            .map((widget) => {
              return <WidgetRender {...widget} />;
            })}
        </>
      )}
      {showPeople && (
        <>
          <h2>People:</h2>
          <Sorters
            setProperty={(property) => {
              setPeopleSortProperty({ property });
            }}
            object={people[0]}
          />
          {people
            .filter((person) =>
              genericSearch(
                person,
                ["firstName", "lastName", "eyeColor"],
                query,
                false
              )
            )
            .sort((a, b) => genericSort(a, b, peopleSortproperty.property))
            .map((person) => {
              return <PeopleRender {...person} />;
            })}
        </>
      )}
    </div>
  );
}

export default App;
