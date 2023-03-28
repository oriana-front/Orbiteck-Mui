import { tokenTest } from "./config";

export const converResponseToDT = (res) => {
    const header = [];
    if (res.length > 0) {
      Object.keys(res[0]).map((key) => {
        let obj = {
          accessorKey: key,
          header: key,
        };
        if (key === "index") {
          obj = {
            accessorKey: key,
            header: "Nro",
            size: 40,
          };
        } else if (key === "Ubicación") {
          obj = {
            accessorKey: key,
            header: key,
            Cell: ({ cell, row }) => (
              <a href={cell.getValue<string>()} target="_blank">
                Ver En Mapa
              </a>
            ),
          };
        }
        header.push(obj);
      });
    }
    return header;
  };
  