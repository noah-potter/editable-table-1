import React, { useMemo, useState, useReducer, useEffect } from "react";
import styled from "styled-components";
import {
  Table as MuiTable,
  TableBody,
  TableCell as MuiTableCell,
  TableHead,
  TableRow,
  Paper,
  InputBase,
  TableSortLabel,
  OutlinedInput,
  Button
} from "@material-ui/core";

// Further things I would do, accept an optional array of headers to display and fallback to
// the current behavior of displaying all keys in the first datum
// Also debouncing input would be nice since it's saving the changes to local storage every change

// **********
// Handle saving changes made to table
// **********

// Each change to a field
type DatumDelta = {
  [key: string]: string | number;
};

// All rows and their changes
type DatumDeltas = {
  [key: number]: DatumDelta;
};
const datumDeltaStorageLocation = "datumDelta";

const initialDatumDelta = JSON.parse(
  window.localStorage.getItem(datumDeltaStorageLocation) || "{}"
) as DatumDeltas;

type Action =
  | { type: "setDelta"; id: number; attr: string; newValue: string | number }
  | { type: "resetDeltas" };

// Reducer to handle side effect of saving to local storage
const datumDeltaReducer = (state: DatumDeltas, action: Action) => {
  switch (action.type) {
    case "setDelta": {
      const nextState = {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.attr]: action.newValue
        }
      };

      window.localStorage.setItem(
        datumDeltaStorageLocation,
        JSON.stringify(nextState)
      );

      return nextState;
    }
    case "resetDeltas": {
      const nextState = {};
      window.localStorage.setItem(
        datumDeltaStorageLocation,
        JSON.stringify({})
      );

      return nextState;
    }
    default:
      throw new Error();
  }
};
// **********
// General
// **********
enum SortDirection {
  Asc = "asc",
  Desc = "desc"
}

const getOppositeSortDirection = (sortDirection: SortDirection) => {
  if (sortDirection === SortDirection.Asc) {
    return SortDirection.Desc;
  }

  return SortDirection.Asc;
};

export type Datum = {
  [key: string]: string | number;
};

// Quick help from https://paulund.co.uk/how-to-capitalize-the-first-letter-of-a-string-in-javascript
function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// **********
// SearchBar
// **********

const SearchBarRoot = styled(Paper)``;

const SearchBarInput = styled(InputBase)`
  .MuiInputBase-input {
    padding: 12px;
  }
`;

type SearchBarProps = {
  query: string;
  onChange: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ query, onChange }) => {
  return (
    <SearchBarRoot>
      <SearchBarInput
        onChange={e => onChange(e.target.value)}
        value={query}
        fullWidth
        placeholder="Search..."
      />
    </SearchBarRoot>
  );
};

// **********
// Table
// **********

const Root = styled.div`
  & > * {
    margin-bottom: 12px;
  }
`;

// TODO conditionally show hover state for cells that can be hovered and aren't being edited
const TableCell = styled(MuiTableCell)<{ bold?: boolean }>`
  && {
    &:hover {
      cursor: pointer;
      background: #0000000f;
    }

    font-weight: ${({ bold }) => (bold ? 700 : 400)};
  }
`;

type Props = {
  data: Datum[];
  datumKey: string;
  // Allows fine grain control over bolding cells
  boldCellFuncs?: {
    [key: string]: (value: string | number) => boolean;
  };
  // Which columns to apply an upperCase filter on. Each string is a header
  upperCaseColumns?: string[];
};

export const Table: React.FC<Props> = ({
  data,
  datumKey,
  boldCellFuncs,
  upperCaseColumns
}) => {
  const [dataDelta, dispatch] = useReducer(
    datumDeltaReducer,
    initialDatumDelta
  );

  // On unmount remove any changes, this way it doesn't interfere with the multiple datasets
  // TODO store each set of changes in a unique location for each dataset so this won't be necessary
  useEffect(() => {
    return () => {
      dispatch({
        type: "resetDeltas"
      });
    };
  }, []);

  const [query, setQuery] = useState("");
  // When searching to filter rows, compare against a normalized query, in this case, lowerCased value
  const normalizedQuery = useMemo(() => {
    return query.toLowerCase();
  }, [query]);

  // Column sorting variables
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.Asc
  );
  const [sortHeader, setSortHeader] = useState<string | null>(null);

  // Keeps track of which row and column is being edited
  const [editingCell, setEditingCell] = useState<{
    rowId: string | number;
    header: string;
  } | null>(null);

  // Get a list of all the headers based on the keys in the data provided
  // This makes the table reusable across datasets as demoed by the data set selection buttons
  const headers = useMemo(() => {
    if (data.length) {
      const firstDatum = data[0];
      return Object.keys(firstDatum).map(header => header);
    }

    return [];
  }, [data]);

  // Apply changes, filter on query, and sort
  const filteredData = useMemo(() => {
    let result = data
      .map(datum => {
        const id = datum[datumKey] as number;

        return {
          ...datum,
          ...dataDelta[id]
        };
      })
      .filter(datum => {
        return headers.some(header => {
          const value = datum[header];

          return (
            value &&
            value
              .toString()
              .toLowerCase()
              .includes(normalizedQuery)
          );
        });
      });

    if (sortHeader) {
      result = result.sort((a, b) =>
        a[sortHeader].toString().localeCompare(b[sortHeader].toString())
      );
    }

    if (sortDirection === SortDirection.Desc) {
      result.reverse();
    }

    return result;
  }, [
    data,
    dataDelta,
    headers,
    normalizedQuery,
    sortHeader,
    sortDirection,
    datumKey
  ]);

  // Update sort direction/column
  const onHeaderClick = (header: string) => {
    if (header === sortHeader) {
      setSortDirection(getOppositeSortDirection(sortDirection));
    } else {
      setSortDirection(SortDirection.Asc);
    }

    setSortHeader(header);
  };

  return (
    <Root>
      <SearchBar query={query} onChange={value => setQuery(value)} />
      <Paper>
        <MuiTable>
          <TableHead>
            <TableRow>
              {headers.map(header => (
                <TableCell key={header}>
                  <TableSortLabel
                    active={sortHeader === header}
                    direction={sortDirection}
                    onClick={() => onHeaderClick(header)}
                  >
                    {capitalize(header)}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map(datum => {
              const id = datum[datumKey] as number;

              return (
                <TableRow key={id}>
                  {headers.map(header => {
                    let value = datum[header].toString();

                    if (
                      editingCell &&
                      editingCell.rowId === id &&
                      editingCell.header === header
                    ) {
                      // Render the editable cell
                      return (
                        <TableCell
                          key={header}
                          onBlur={() => setEditingCell(null)}
                          onKeyDown={e => {
                            if (e.key === "Enter") {
                              setEditingCell(null);
                            }
                          }}
                        >
                          <OutlinedInput
                            value={value}
                            autoFocus
                            labelWidth={0}
                            onChange={e => {
                              dispatch({
                                type: "setDelta",
                                attr: header,
                                id,
                                newValue: e.target.value
                              });
                            }}
                          />
                        </TableCell>
                      );
                    } else {
                      // Render the normal cell
                      let shouldBold = false;

                      if (
                        upperCaseColumns &&
                        upperCaseColumns.includes(header)
                      ) {
                        value = value.toUpperCase();
                      }

                      if (boldCellFuncs) {
                        const boldFunc = boldCellFuncs[header];
                        if (boldFunc) {
                          shouldBold = boldFunc(value);
                        }
                      }

                      return (
                        <TableCell
                          key={header}
                          bold={shouldBold}
                          onClick={() => {
                            // Dont let the user change the identifying key
                            if (header !== datumKey) {
                              setEditingCell({
                                rowId: datum[datumKey],
                                header
                              });
                            }
                          }}
                        >
                          {value}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MuiTable>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          dispatch({
            type: "resetDeltas"
          })
        }
      >
        Reset Changes
      </Button>
    </Root>
  );
};

export default Table;
