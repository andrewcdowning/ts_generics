import React, { useState } from "react";
import people from "./mock-data/people";
import widgets from "./mock-data/widgets";

import "./App.css";
import genericSearch from "./utils/genericSearch";
import { SearchInput } from "./components/SearchInput";
import genericSort from "./utils/genericSort";
import IWidget from "./interfaces/IWidget";
import ISorter from "./interfaces/ISorters";
import IPerson from "./interfaces/IPerson";
import { Sorters } from "./components/Sorters";
import { WidgetRender } from "./components/renderers/WidgetRender";
import { PeopleRender } from "./components/renderers/PeopleRender";
import genericFilter from "./utils/genericFilter";
import { Filters } from "./components/Filters";
import IFilter from "./interfaces/IFilter";

function App() {
  const [query, setQuery] = useState<string>("");
  const [showPeople, setShowPeople] = useState<boolean>(false);
  const [widgetSortproperty, setWidgetSortProperty] = useState<
    ISorter<IWidget>
  >({
    property: "title",
    isDescending: true,
  });
  const [widgetFilterProperties, setWidgetFilterProperties] = useState<
    Array<IFilter<IWidget>>
  >([]);
  const [peopleSortproperty, setPeopleSortProperty] = useState<
    ISorter<IPerson>
  >({
    property: "firstName",
    isDescending: true,
  });
  const [peopleFilterProperties, setPeopleFilterProperties] = useState<
    Array<IFilter<IPerson>>
  >([]);
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
            setProperty={(propertyType) => {
              setWidgetSortProperty(propertyType);
            }}
            object={widgets[0]}
          />
          <br />
          <Filters
            object={widgets[0]}
            properties={widgetFilterProperties}
            onChangeFilter={(property) => {
              const propertyMatched = widgetFilterProperties.some(
                (widgetFilterProperty) =>
                  widgetFilterProperty.property === property.property
              );
              const fullMatch = widgetFilterProperties.some(
                (widgetFilterProperty) =>
                  widgetFilterProperty.property === property.property &&
                  widgetFilterProperty.isTruthySelected === property.isTruthySelected
              );
              if (fullMatch){
                setWidgetFilterProperties(
                  widgetFilterProperties.filter(
                    (widgetFilterProperty) =>
                      widgetFilterProperty.property !== property.property
                  )
                )
              } else if (propertyMatched) {
                setWidgetFilterProperties([
                  ...widgetFilterProperties.filter(
                    (widgetFilterProperty) =>
                      widgetFilterProperty.property !== property.property
                  ),
                  property
                  ])
              } else {
                setWidgetFilterProperties([
                  ...widgetFilterProperties,
                  property,
                ]);
              } 
            }}
          />
          {widgets
            .filter((widget) =>
              genericSearch(widget, ["title", "description"], query, false)
            )
            .filter((widget) => genericFilter(widget, widgetFilterProperties))
            .sort((a, b) => genericSort(a, b, widgetSortproperty))
            .map((widget) => {
              return <WidgetRender {...widget} />;
            })}
        </>
      )}
      {showPeople && (
        <>
          <h2>People:</h2>
          <Sorters
            setProperty={(propertyType) => {
              setPeopleSortProperty(propertyType);
            }}
            object={people[0]}
          />
          <br />
          <Filters
            object={people[0]}
            properties={peopleFilterProperties}
            onChangeFilter={(person) => {
              peopleFilterProperties.includes(person)
                ? setPeopleFilterProperties(
                    peopleFilterProperties.filter(
                      (peopleFilterProperty) => peopleFilterProperty !== person
                    )
                  )
                : setPeopleFilterProperties([
                    ...peopleFilterProperties,
                    person,
                  ]);
            }}
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
            .filter((person) => genericFilter(person, peopleFilterProperties))
            .sort((a, b) => genericSort(a, b, peopleSortproperty))
            .map((person) => {
              return <PeopleRender {...person} />;
            })}
        </>
      )}
    </div>
  );
}

export default App;
