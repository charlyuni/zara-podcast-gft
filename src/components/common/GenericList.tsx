import React, { useContext, useEffect } from "react";
import { LoadingContext } from "@/context/LoadingContext";

type GenericListProps<T> = {
  items: T[];
  renderRow: (item: T, index: number) => React.ReactNode;
  columns: string[];
  isFetching: boolean;
  dataTestId?: string;
};

const GenericList = <T,>({
  items,
  renderRow,
  columns,
  isFetching,
  dataTestId = "generic-list",
}: GenericListProps<T>) => {
  const { setLoadingState } = useContext(LoadingContext);

  useEffect(() => {
    setLoadingState(isFetching);
  }, [isFetching, setLoadingState]);

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col grow w-3/4 ml-12" data-testid={dataTestId}>
      <div className="shadow-lg shadow-black-500/20 card flex flex-col text-lg mb-4 pb-2">
        <div className="font-bold text-2xl">Items: {items.length}</div>
      </div>
      <div className="shadow-lg shadow-black-500/20 card flex flex-col text-xs">
        <table className="min-w-full text-left">
          <thead className="bg-white font-medium border-b-gray-400 border-b-2">
            <tr>
              {columns.map((column) => (
                <th key={column} className="py-3 pl-2">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => renderRow(item, index))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GenericList;
