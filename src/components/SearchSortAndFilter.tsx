import * as React from "react";
import { Filters } from "./Filters";
import { WidgetRenderer } from "./renderers/WidgetRender";
import { SearchInput } from "./SearchInput";
import { Sorters } from "./Sorters";

export interface ISearchSortAndFilterProps {}

export function SearchSortAndFilter(props: ISearchSortAndFilterProps) {
  return (
    <>
      <h2>Widgets:</h2>
      <SearchInput
        dataSource={widgets}
        searchKeys={["title", "description"]}
      />
      {children &&
        dataSource
          .filter((person) =>
            genericSearch(person, searchKeys, searchQuery, false)
          )
          .map((widget) => children(widget))}
      <Sorters dataSource={widgets} initialSortProperty="title"/>
      {children &&
        dataSource
          .sort((a, b) => genericSort(a, b, sortProperty))
          .map((widget) => children(widget))}
      <Filters dataSource={widgets}/>
      children &&
        dataSource
          .filter((widget) => genericFilter(widget, filterProperties))
          .map((widget) => children(widget))}
    </>
  );
}
