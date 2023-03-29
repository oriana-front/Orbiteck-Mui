import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { DrawerHeader } from "../components/Menu/MenuLista";
import { TableHead, Typography } from "@mui/material";
import { Build, Delete, Edit } from "@mui/icons-material";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(nombre, diaSemana, horaEnvio, correo, formato) {
  return { nombre, diaSemana, horaEnvio, correo, formato };
}

const rows = [
  createData(
    "Prueba1",
    "11/11/22",
    "00:00:15",
    "gerencia.ti@orbitec.pe",
    "pdf",
    ""
  ),
  createData(
    "Prueba2",
    "15/11/22",
    "01:00:15",
    "gerencia.ti@orbitec.pe",
    "pdf",
    ""
  ),
  createData(
    "Prueba3",
    "16/11/22",
    "00:50:15",
    "gerencia.ti@orbitec.pe",
    "pdf",
    ""
  ),
  createData(
    "Prueba4",
    "17/11/22",
    "00:40:35",
    "gerencia.ti@orbitec.pe",
    "pdf",
    ""
  ),
  createData(
    "Prueba5",
    "18/11/22",
    "02:30:15",
    "gerencia.ti@orbitec.pe",
    "pdf",
    ""
  ),
  createData(
    "Prueba6",
    "19/11/22",
    "09:10:15",
    "gerencia.ti@orbitec.pe",
    "pdf",
    ""
  ),
  createData(
    "Prueba7",
    "20/11/22",
    "04:10:15",
    "gerencia.ti@orbitec.pe",
    "pdf",
    ""
  ),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

export default function CustomPaginationActionsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <DrawerHeader />
      <Typography variant="h5" margin={1}>
        REPORTES GUARDADOS (plantillas)
      </Typography>
      {/*BUSCADOR*/}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>NOMBRE</TableCell>
              <TableCell align="right">DIA SEMANA</TableCell>
              <TableCell align="right">HORARIO ENVIO</TableCell>
              <TableCell align="right">CORREO</TableCell>
              <TableCell align="right">FORMATO</TableCell>
              <TableCell align="right">ACCIONES</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.nombre}>
                <TableCell component="th" scope="row">
                  {row.nombre}
                </TableCell>
                <TableCell align="right">{row.diaSemana}</TableCell>
                <TableCell align="right">{row.horaEnvio}</TableCell>
                <TableCell align="right"> {row.correo}</TableCell>
                <TableCell align="right">{row.formato}</TableCell>
                <TableCell align="right">
                  {[
                    <Build
                      sx={{ marginRight: 1 }}
                      onClick={(event, row) => {
                        alert("Has precionado el botòn ajustar");
                      }}
                    />,
                    <Edit
                      sx={{ marginRight: 1 }}
                      onClick={(event, row) => {
                        alert("Has precionado el botòn editar");
                      }}
                    />,
                    <Delete
                      onClick={(event, row) => {
                        alert("Estas seguro que quieres eliminar este reporte");
                      }}
                    />,
                  ]}
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={6}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
