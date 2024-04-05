import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableCell } from "./table/table-cell";
import { TableHeader } from "./table/table-header";
import { TableRow } from "./table/table-row";

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Input } from "./input";

interface Attendee {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string | null;
}

export function AttendeeList() {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") ?? "";
    }

    return "";
  });
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page"));
    }

    return 1;
  });
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  const totalPages = Math.ceil(attendees.length / 10);

  useEffect(() => {
    const url = new URL(
      "http://localhost:3333/events/b8cdf168-97bc-4702-961d-d4d630be0a7b/attendees"
    );

    url.searchParams.set("pageIndex", String(page - 1));

    if (search.length > 0) url.searchParams.set("query", search);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAttendees(data.attendees);
      });
  }, [page, search]);

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());

    url.searchParams.set("search", search);

    window.history.pushState({}, "", url);
    setSearch(search);
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());

    url.searchParams.set("page", String(page));

    window.history.pushState({}, "", url);
    setPage(page);
  }

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value);
    setCurrentPage(1);
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }

  function goToLastPage() {
    setCurrentPage(totalPages);
  }

  function goToPreviousPage() {
    setCurrentPage(page - 1);
  }

  function goToNextPage() {
    setCurrentPage(page + 1);
  }

  function checkIn(attendeeId: string) {
    fetch(`http://localhost:3333/attendees/${attendeeId}/check-in`);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>

        <Input
          Icon={Search}
          onChange={onSearchInputChanged}
          value={search}
          type="text"
          placeholder="Buscar participante..."
        />
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              <input
                type="checkbox"
                className="size-4 bg-black/20 rounded border border-white/10"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 48 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee) => (
            <TableRow key={attendee.id}>
              <TableCell style={{ width: 48 }}>
                <input
                  type="checkbox"
                  className="size-4 bg-black/20 rounded border border-white/10 "
                />
              </TableCell>
              <TableCell>{attendee.id}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">
                    {attendee.name}
                  </span>
                  <span>{attendee.email}</span>
                </div>
              </TableCell>
              <TableCell>
                {formatDistanceToNow(attendee.createdAt, {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </TableCell>
              <TableCell>
                {attendee.checkedInAt === null ? (
                  <button 
                    className="text-green-light hover:underline hover:underline-offset-2"
                    onClick={() => checkIn(attendee.id)}
                  >
                    Confirmar check-in
                  </button>
                ) : (
                  formatDistanceToNow(attendee.checkedInAt, {
                    locale: ptBR,
                    addSuffix: true,
                  })
                )}
              </TableCell>
              <TableCell style={{ width: 64 }}>
                <IconButton transparent>
                  <MoreHorizontal className="size-4" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Mostrando {attendees.length} de {attendees.length} itens
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex gap-8 items-center">
                <span>
                  Página {page} de {totalPages}
                </span>
                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={page === totalPages}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
